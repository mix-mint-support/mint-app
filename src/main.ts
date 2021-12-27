import { BodyNode, el } from "@hanul/skynode";
import Wallet from "./klaytn/Wallet";
import KDGC from "./pfps/KDGC";

(async () => {

    BodyNode.append(
        el("main",
            new KDGC(),
            el(".soldout", el("img", {
                src: "/images/klubs-army/soldout.png",
                srcset: "/images/klubs-army/soldout@2x.png 2x",
            })),
        ),
    );

    if (await Wallet.connected() !== true) {
        await Wallet.connect();
    }
})();