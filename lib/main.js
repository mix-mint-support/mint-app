"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Wallet_1 = __importDefault(require("./klaytn/Wallet"));
const KlubsArmy_1 = __importDefault(require("./pfps/KlubsArmy"));
(async () => {
    skynode_1.BodyNode.append(new KlubsArmy_1.default());
    if (await Wallet_1.default.connected() !== true) {
        await Wallet_1.default.connect();
    }
})();
//# sourceMappingURL=main.js.map