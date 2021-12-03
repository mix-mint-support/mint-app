"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const KlubsArmyContract_1 = __importDefault(require("../contracts/KlubsArmyContract"));
const KlubsArmyMinterContract_1 = __importDefault(require("../contracts/KlubsArmyMinterContract"));
const MixContract_1 = __importDefault(require("../contracts/MixContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
class KlubsArmy extends skynode_1.DomNode {
    constructor() {
        super(".klubs-army");
        this.TODAY_COUNT = 3000;
        this.append(this.mintPrice = (0, skynode_1.el)(".mint-price", "MINT PRICE:"), this.mixBalance = (0, skynode_1.el)(".mix-balance", "YOUR MIX:"), (0, skynode_1.el)("img.title", { src: "/images/klubs-army/title.png", srcset: "/images/klubs-army/title@2x.png 2x" }), (0, skynode_1.el)("img.image", { src: "/images/klubs-army/image.png", srcset: "/images/klubs-army/image@2x.png 2x" }), (0, skynode_1.el)(".wallet-address-container", (0, skynode_1.el)("h3", "ADDRESS"), this.walletAddress = (0, skynode_1.el)(".wallet-address")), (0, skynode_1.el)(".count-input-container", (0, skynode_1.el)("h3", "MINT LIMIT"), this.countInput = (0, skynode_1.el)("input.count-input", { value: "1" })), (0, skynode_1.el)("a.mint-button", (0, skynode_1.el)("img", { src: "/images/klubs-army/mint.png", srcset: "/images/klubs-army/mint@2x.png 2x" }), {
            click: () => {
                const count = parseInt(this.countInput.domElement.value, 10);
                if (isNaN(count)) {
                    alert("Mint Limit 숫자를 입력해주시기 바랍니다.");
                }
                else if (count > 10) {
                    alert("한번에 최대 10개의 NFT만 민팅할 수 있습니다.");
                }
                else {
                    KlubsArmyMinterContract_1.default.mint(count);
                }
            },
        }), (0, skynode_1.el)(".mint-count-container", (0, skynode_1.el)("span", "MINT PROGRESS"), this.mintCount = (0, skynode_1.el)("span")), (0, skynode_1.el)(".mint-bar-container", this.bar = (0, skynode_1.el)(".mint-bar")));
        this.loadPrice();
        Wallet_1.default.on("connect", () => this.loadBalance());
        this.progress();
        this.interval = setInterval(() => this.progress(), 1000);
    }
    async loadPrice() {
        const price = await KlubsArmyMinterContract_1.default.mintPrice();
        this.mintPrice.empty().appendText(`mint price: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(price))} MIX`);
    }
    async loadBalance() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.walletAddress.empty().appendText(CommonUtil_1.default.shortenAddress(address));
            const balance = await MixContract_1.default.balanceOf(address);
            this.mixBalance.empty().appendText(`your mix: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance))} MIX`);
        }
    }
    async progress() {
        const remains = (await KlubsArmyMinterContract_1.default.limit()).sub(await KlubsArmyContract_1.default.totalSupply()).toNumber();
        const d = this.TODAY_COUNT - remains > this.TODAY_COUNT ? this.TODAY_COUNT : this.TODAY_COUNT - remains;
        this.bar.style({ width: `${d / this.TODAY_COUNT * 100}%` });
        this.mintCount.empty().appendText(`${d}/${this.TODAY_COUNT}`);
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            const balance = await MixContract_1.default.balanceOf(address);
            this.mixBalance.empty().appendText(`YOUR MIX: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance))} MIX`);
        }
    }
    delete() {
        clearInterval(this.interval);
        super.delete();
    }
}
exports.default = KlubsArmy;
//# sourceMappingURL=KlubsArmy.js.map