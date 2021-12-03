import { BodyNode } from "@hanul/skynode";
import Wallet from "./klaytn/Wallet";
import KlubsArmy from "./pfps/KlubsArmy";

(async () => {

    BodyNode.append(
        new KlubsArmy(),
    );

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
})();