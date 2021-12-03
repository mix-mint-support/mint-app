import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { KlubsArmy } from "../KlubsArmy";
export declare class KlubsArmy__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<KlubsArmy>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): KlubsArmy;
    connect(signer: Signer): KlubsArmy__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): KlubsArmy;
}
//# sourceMappingURL=KlubsArmy__factory.d.ts.map