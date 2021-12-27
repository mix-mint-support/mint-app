import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../CommonUtil";
import KDGCMinterContract from "../contracts/KDGCMinterContract";
import ExtWallet from "../klaytn/ExtWallet";
import Wallet from "../klaytn/Wallet";

export default class KDGC extends DomNode {

    private TODAY_COUNT = 8687;

    private interval: any;

    private mintPrice: DomNode;
    private klayBalance: DomNode;
    private mintCount: DomNode;
    private walletAddress: DomNode;
    private countInput: DomNode<HTMLInputElement>;
    private bar: DomNode;

    constructor() {
        super(".mint-panel.kdgc");
        this.append(
            this.mintPrice = el(".mint-price", "MINT PRICE:"),
            this.klayBalance = el(".klay-balance", "YOUR KLAY:"),
            el("img.title", { src: "/images/kdgc/title.png", srcset: "/images/kdgc/title@2x.png 2x" }),
            el("img.image", { src: "/images/kdgc/image.png", srcset: "/images/kdgc/image@2x.png 2x" }),
            el(".wallet-address-container",
                el("h3", "ADDRESS"),
                this.walletAddress = el(".wallet-address"),
            ),
            el(".count-input-container",
                el("h3", "MINT LIMIT"),
                this.countInput = el("input.count-input", { value: "1" }),
            ),
            el("a.mint-button",
                el("img", { src: "/images/kdgc/mint.png", srcset: "/images/kdgc/mint@2x.png 2x" }),
                {
                    click: () => {
                        const count = parseInt(this.countInput.domElement.value, 10);
                        if (isNaN(count)) {
                            alert("Mint Limit 숫자를 입력해주시기 바랍니다.");
                        } else if (count > 5) {
                            alert("한번에 최대 5개의 NFT만 민팅할 수 있습니다.");
                        } else {
                            KDGCMinterContract.mint(count);
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
        const price = await KDGCMinterContract.mintPrice();
        this.mintPrice.empty().appendText(`mint price: ${CommonUtil.numberWithCommas(utils.formatEther(price))} KLAY`);
    }

    private async loadBalance() {
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            this.walletAddress.empty().appendText(CommonUtil.shortenAddress(address));
            const balance = await ExtWallet.loadBalance();
            this.klayBalance.empty().appendText(`your klay: ${CommonUtil.numberWithCommas(utils.formatEther(balance))} KLAY`);
        }
    }

    private async progress() {
        const remains = (await KDGCMinterContract.limit()).toNumber();
        const d = this.TODAY_COUNT - remains > this.TODAY_COUNT ? this.TODAY_COUNT : this.TODAY_COUNT - remains;
        this.bar.style({ width: `${d / this.TODAY_COUNT * 100}%` });
        this.mintCount.empty().appendText(`${d}/${this.TODAY_COUNT}`);
        const address = await Wallet.loadAddress();
        if (address !== undefined) {
            const balance = await ExtWallet.loadBalance();
            this.klayBalance.empty().appendText(`YOUR KLAY: ${CommonUtil.numberWithCommas(utils.formatEther(balance))} KLAY`);
        }
    }

    public delete(): void {
        clearInterval(this.interval);
        super.delete();
    }
}