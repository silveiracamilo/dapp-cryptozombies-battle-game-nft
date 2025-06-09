import { Contract } from "ethers";
import { last } from "lodash";
import { IMintResult } from "@/store/interface/mint/IMintResult";

export const mintResultMap = async (tx: any, contract: Contract): Promise<IMintResult> => {
    const receipt = await tx.wait();
    const log: any = last(receipt.logs);
    const parsed = contract.interface.parseLog(log);
    const result: IMintResult = { zombieId: -1, dna: 0, name: '' };

    if (parsed?.name === "NewZombie") {
        result.zombieId = parsed.args[1];
        result.name = parsed.args[2];
        result.dna = parsed.args[3];
    }

    return result;
}