import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import KlubsArmyContract from "../contracts/KlubsArmyContract";
import KlubsArmyMinterContract from "../contracts/KlubsArmyMinterContract";
import MixContract from "../contracts/MixContract";
import Wallet from "../klaytn/Wallet";

export default class KlubsArmy extends DomNode {

    private TODAY_COUNT = 3000;

    private interval: any;

    private mintPrice: DomNode;
    private mixBalance: DomNode;
    private mintCount: DomNode;
    private walletAddress: DomNode;
    private countInput: DomNode<HTMLInputElement>;
    private bar: DomNode;

    constructor() {
        super(".mint-panel.klubs-army");
        this.append(
            this.mintPrice = el(".mint-price", "MINT PRICE:"),
            this.mixBalance = el(".mix-balance", "YOUR MIX:"),
            el("img.title", { src: "/images/klubs-army/title.png", srcset: "/images/klubs-army/title@2x.png 2x" }),
            el("img.image", { src: "/images/klubs-army/image.png", srcset: "/images/klubs-army/image@2x.png 2x" }),
            el(".wallet-address-container",
                el("h3", "ADDRESS"),
                this.walletAddress = el(".wallet-address"),
            ),
            el(".count-input-container",
                el("h3", "MINT LIMIT"),
                this.countInput = el("input.count-input", { value: "1" }),
            ),
            el("a.mint-button",
                el("img", { src: "/images/klubs-army/mint.png", srcset: "/images/klubs-army/mint@2x.png 2x" }),
                {
                    click: () => {
                        const count = parseInt(this.countInput.domElement.value, 10);
                        if (isNaN(count)) {
                            alert("Mint Limit 숫자를 입력해주시기 바랍니다.");
                        } else if (count > 10) {
                            alert("한번에 최대 10개의 NFT만 민팅할 수 있습니다.");
                        } else {
                            KlubsArmyMinterContract.mint(count);
                        }
                    },
                },
            ),
            el(".mint-count-container",
                el("span", "MINT PROGRESS"),
                this.mintCount = el("span"),
            ),
            el(".mint-bar-container",
                this.bar = el(".mint-bar"),
            ),
        );

        this.loadPrice();
        Wallet.on("connect", () => this.loadBalance());
        this.progress();
        this.interval = setInterval(() => this.progress(), 1000);
    }

    private async loadPrice() {
        const price = await KlubsArmyMinterContract.mintPrice();
        this.mintPrice.empty().appendText(`mint price: ${CommonUtil.numberWithCommas(utils.formatEther(price))} MIX`);
    }

    private async loadBalance() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.walletAddress.empty().appendText(CommonUtil.shortenAddress(address));
            const balance = await MixContract.balanceOf(address);
            this.mixBalance.empty().appendText(`your mix: ${CommonUtil.numberWithCommas(utils.formatEther(balance))} MIX`);
        }
    }

    private async progress() {
        const remains = (await KlubsArmyMinterContract.limit()).toNumber();
        const d = this.TODAY_COUNT - remains > this.TODAY_COUNT ? this.TODAY_COUNT : this.TODAY_COUNT - remains;
        this.bar.style({ width: `${d / this.TODAY_COUNT * 100}%` });
        this.mintCount.empty().appendText(`${d}/${this.TODAY_COUNT}`);
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = await MixContract.balanceOf(address);
            this.mixBalance.empty().appendText(`YOUR MIX: ${CommonUtil.numberWithCommas(utils.formatEther(balance))} MIX`);
        }
    }

    public delete(): void {
        clearInterval(this.interval);
        super.delete();
    }
}