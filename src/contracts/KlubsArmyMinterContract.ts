import { BigNumber } from "@ethersproject/bignumber";
import { utils } from "ethers";
import Wallet from "../klaytn/Wallet";
import KlubsArmyMinterArtifact from "./abi/klubs-army/artifacts/contracts/KlubsArmyMinter.sol/KlubsArmyMinter.json";
import Contract from "./Contract";
import MixContract from "./MixContract";

class KlubsArmyMinterContract extends Contract {

    constructor() {
        super("0xcec1fA032a3c3Dbe9587147ebA98D608e619691C", KlubsArmyMinterArtifact.abi);
    }

    public async mintPrice(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("mintPrice"));
    }

    public async limit(): Promise<BigNumber> {
        return BigNumber.from(await this.runMethod("limit"));
    }

    public async mint(count: number): Promise<void> {
        const limit = (await this.limit()).toNumber();
        if (count > limit) {
            alert(`남은 개수는 ${limit}개입니다.`);
        } else {
            const owner = await Wallet.loadAddress();
            if (owner !== undefined) {
                const price = (await this.mintPrice()).mul(count);
                const balance = await MixContract.balanceOf(owner);
                if (balance.lt(price)) {
                    if (confirm(`${String(parseInt(utils.formatEther(price), 10))} 믹스가 필요합니다. 믹스를 구매하시겠습니까?`)) {
                        open("https://klayswap.com/exchange/swap?input=0x0000000000000000000000000000000000000000&output=0xdd483a970a7a7fef2b223c3510fac852799a88bf");
                    }
                } else if ((await MixContract.allowance(owner, this.address)).lt(price)) {
                    await MixContract.approve(this.address, price);
                    await new Promise<void>((resolve) => {
                        setTimeout(async () => {
                            await this.runWalletMethod("mint", count);
                            resolve();
                        }, 2000);
                    });
                } else {
                    await this.runWalletMethod("mint", count);
                }
            }
        }
    }
}

export default new KlubsArmyMinterContract();
