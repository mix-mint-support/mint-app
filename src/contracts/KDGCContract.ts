import { BigNumber } from "ethers";
import KDGCArtifact from "./abi/kdgc/artifacts/contracts/KDGC.sol/KDGC.json";
import Contract from "./Contract";

class KDGCContract extends Contract {

    constructor() {
        super("0x22b99Ff14B888739547F8f38548a866CC8b3A1bc", KDGCArtifact.abi);
    }

    public async totalSupply(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("totalSupply"));
    }
}

export default new KDGCContract();
