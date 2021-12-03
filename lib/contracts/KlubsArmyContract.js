"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const KlubsArmy_json_1 = __importDefault(require("./abi/klubs-army/artifacts/contracts/KlubsArmy.sol/KlubsArmy.json"));
const Contract_1 = __importDefault(require("./Contract"));
class KlubsArmyContract extends Contract_1.default {
    constructor() {
        super("0x7cBF6b413722cb84672516027A8bA97bd4A6b58F", KlubsArmy_json_1.default.abi);
    }
    async totalSupply() {
        return ethers_1.BigNumber.from(await this.runMethod("totalSupply"));
    }
}
exports.default = new KlubsArmyContract();
//# sourceMappingURL=KlubsArmyContract.js.map