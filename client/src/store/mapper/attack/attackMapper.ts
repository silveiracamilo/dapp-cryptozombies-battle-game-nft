import { Contract } from "ethers";
import { last } from "lodash";
import { IAttackResult } from "@/store/interface/attack/IAttackResult";

export const attackResultMap = async (tx: any, contract: Contract): Promise<IAttackResult> => {
    const receipt = await tx.wait();
    const log: any = last(receipt.logs);
    const parsed = contract.interface.parseLog(log);
    const result: IAttackResult = { victory: false, newDna: 0 };

    if (parsed?.name === "onAttackVitory") {
        result.victory = true;
        result.newDna = parsed.args[3];
    }

    return result;
}