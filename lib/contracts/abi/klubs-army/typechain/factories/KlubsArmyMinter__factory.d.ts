import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { KlubsArmyMinter } from "../KlubsArmyMinter";
export declare class KlubsArmyMinter__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<KlubsArmyMinter>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): KlubsArmyMinter;
    connect(signer: Signer): KlubsArmyMinter__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): KlubsArmyMinter;
}
//# sourceMappingURL=KlubsArmyMinter__factory.d.ts.map