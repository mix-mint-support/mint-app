import { BigNumber } from "@ethersproject/bignumber";
import Contract from "./Contract";
declare class KlubsArmyMinterContract extends Contract {
    constructor();
    mintPrice(): Promise<BigNumber>;
    limit(): Promise<BigNumber>;
    mint(count: number): Promise<void>;
}
declare const _default: KlubsArmyMinterContract;
export default _default;
//# sourceMappingURL=KlubsArmyMinterContract.d.ts.map