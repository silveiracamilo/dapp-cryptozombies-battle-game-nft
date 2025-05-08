import { Contract } from "ethers";
import { last } from "lodash";
import { IFeedResult } from "src/store/interface/feed/IFeedResult";

export const feedResultMap = async (tx: any, contract: Contract): Promise<IFeedResult> => {
    const receipt = await tx.wait();
    const log: any = last(receipt.logs);
    const parsed = contract.interface.parseLog(log);
    const result: IFeedResult = { fromDna: 0, targetDna: 0, kittyId: -1, newDna: 0 };

    if (parsed?.name === "onFeed") {
        result.fromDna = parsed.args[1];
        result.targetDna = parsed.args[2];
        result.kittyId = parsed.args[3];
        result.newDna = parsed.args[4];
    }

    return result;
}