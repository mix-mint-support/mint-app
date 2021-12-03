import { BigNumber } from "ethers";
import KlubsArmyArtifact from "./abi/klubs-army/artifacts/contracts/KlubsArmy.sol/KlubsArmy.json";
import Contract from "./Contract";

class KlubsArmyContract extends Contract {

    constructor() {
        super("0x7cBF6b413722cb84672516027A8bA97bd4A6b58F", KlubsArmyArtifact.abi);
    }

    public async totalSupply(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalSupply"));
    }
}

export default new KlubsArmyContract();
