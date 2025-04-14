import HelperService from "./HelperService";

class AttackService extends HelperService {
    
    public async attack(zombieId: number, targetId: number) {
        const contract = await this.getContract();
        const tx = await contract.attack(zombieId, targetId);
        return tx.wait();
    }
}

export default AttackService;
