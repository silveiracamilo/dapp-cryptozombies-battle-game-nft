import { feedResultMap } from "@/store/mapper/feed/feedMapper";
import FactoryService from "./FactoryService";
import { getGasLimit } from "@/utils/contract/gasLimit";

class FeedingService extends FactoryService {
    
    public async feedOnKitty(zombieId: number, kittyDna: number, kittyId: number) {
        const contract = await this.getContract(true);
        const estimatedGas = await contract.feedOnKitty.estimateGas(zombieId, kittyDna, kittyId);
        const gasLimit = getGasLimit(estimatedGas, 70n);
        const tx = await contract.feedOnKitty(zombieId, kittyDna, kittyId, { gasLimit });
        return feedResultMap(tx, contract);
    }
}

export default FeedingService;
