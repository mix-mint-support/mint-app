"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const KlitsMinterContract_1 = __importDefault(require("../contracts/KlitsMinterContract"));
const MixContract_1 = __importDefault(require("../contracts/MixContract"));
const Wallet_1 = __importDefault(require("../klaytn/Wallet"));
class Home {
    constructor() {
        this.TODAY_COUNT = 4000;
        this.container = (0, skynode_1.el)(".home-view", this.mintPrice = (0, skynode_1.el)(".mint-price", "mint price:"), this.balance = (0, skynode_1.el)(".mint-price", "your mix:"), (0, skynode_1.el)("img.logo", { src: "/images/logo.png" }), this.connectButton = (0, skynode_1.el)("button.connect", "Connect Wallet", {
            click: async () => {
                if (await Wallet_1.default.connected() !== true) {
                    await Wallet_1.default.connect();
                }
            }
        }), (0, skynode_1.el)(".input-container", (0, skynode_1.el)(".label", "Address"), this.addressInput = (0, skynode_1.el)("input.address", { placeholder: "0x1234...", readonly: "readonly" })), (0, skynode_1.el)("button.mint", "Mint", {
            click: async () => {
                await KlitsMinterContract_1.default.mint(1);
            }
        }), (0, skynode_1.el)(".bottom-container", (0, skynode_1.el)("a.go-klubs", (0, skynode_1.el)("img", { src: "/images/klubs.png" }), (0, skynode_1.el)("a.link", "Go to Klubs"), { href: "https://klu.bs/pfp/0x0a412f094C15010bbd413BE0fC07b8da26b0B05F", target: "_blank" }), (0, skynode_1.el)(".progress", this.bar = (0, skynode_1.el)(".progress__bar"), (0, skynode_1.el)(".text-container", (0, skynode_1.el)(".progress-text", "mint progress"), this.progressText = (0, skynode_1.el)(".progress-text"))), (0, skynode_1.el)("a", (0, skynode_1.el)("a.go-home"), (0, skynode_1.el)("img", { src: "/images/home.png" }), (0, skynode_1.el)("a.link", "Go to Home"), { href: "https://klits.xyz", target: "_blank" }))).appendTo(skynode_1.BodyNode);
        this.loadPrice();
        Wallet_1.default.on("connect", () => this.loadBalance());
        this.progress();
        this.interval = setInterval(() => this.progress(), 1000);
    }
    async loadPrice() {
        const price = await KlitsMinterContract_1.default.mintPrice();
        this.mintPrice.empty().appendText(`mint price: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(price))} MIX`);
    }
    async loadBalance() {
        const address = await Wallet_1.default.loadAddress();
        if (address !== undefined) {
            this.connectButton.style({ display: "none" });
            this.addressInput.domElement.value = address;
            const balance = await MixContract_1.default.balanceOf(address);
            this.balance.empty().appendText(`your mix: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance))} MIX`);
        }
    }
    async progress() {
        const remains = (await KlitsMinterContract_1.default.remains()).toNumber();
        this.bar.style({ width: `${(this.TODAY_COUNT - remains) / this.TODAY_COUNT * 100}%` });
        this.progressText.empty().appendText(`${this.TODAY_COUNT - remains}/${this.TODAY_COUNT}`);
    }
    changeParams(params, uri) { }
    close() {
        clearInterval(this.interval);
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map