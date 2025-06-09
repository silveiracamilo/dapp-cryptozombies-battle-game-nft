import HelperService from "./HelperService";
import { IAttackResult } from "@/store/interface/attack/IAttackResult";
import { attackResultMap } from "@/store/mapper/attack/attackMapper";
import { getGasLimit } from "@/utils/contract/gasLimit";

class AttackService extends HelperService {
    
    public async attack(zombieId: number, targetId: number): Promise<IAttackResult> {
        const contract = await this.getContract(true);
        const estimatedGas = await contract.attack.estimateGas(zombieId, targetId);
        const gasLimit = getGasLimit(estimatedGas, 160n);
        const tx = await contract.attack(zombieId, targetId, { gasLimit });
        return attackResultMap(tx, contract);
    }
}

export default AttackService;
