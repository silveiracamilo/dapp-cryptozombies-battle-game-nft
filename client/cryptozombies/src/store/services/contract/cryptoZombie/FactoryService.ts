import ContractService from "./ContractService";
import { zombieMapper } from "src/store/mapper/zombie/ZombieMapper";

class FactoryService extends ContractService {

    public async createRandomZombie(name: string) {
        const contract = await this.getContract(true);
        const createFee = await this.getCreateZombieFee();
        const tx = await contract.createRandomZombie(name, { value: createFee });
        return tx.wait();
    }

    public async getZombieById(id: number) {
        const contract = await this.getContract();
        const zombie = await contract.zombies(id);
        return zombieMapper(id, zombie);
    }

    public async setCooldownTimeAttack(cooldownTime: number) {
        const contract = await this.getContract(true);
        const tx = await contract.setCooldownTimeAttack(cooldownTime);
        return tx.wait();
    }

    public async getCooldownTimeAttack() {
        const contract = await this.getContract();
        return contract.cooldownTimeAttack();
    }

    public async setCooldownTimeFeeding(cooldownTime: number) {
        const contract = await this.getContract(true);
        const tx = await contract.setCooldownTimeFeeding(cooldownTime);
        return tx.wait();
    }

    public async getCooldownTimeFeeding() {
        const contract = await this.getContract();
        return contract.cooldownTimeFeeding();
    }

    public async setCreateZombieFee(fee: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setCreateZombieFee(fee);
        return tx.wait();
    }

    public async getCreateZombieFee() {
        const contract = await this.getContract();
        return contract.createZombieFee();
    }

    public async setTotalAttackVictoryToGetReward(total: number) {
        const contract = await this.getContract(true);
        const tx = await contract.setTotalAttackVictoryToGetReward(total);
        return tx.wait();
    }

    public async getTotalAttackVictoryToGetReward() {
        const contract = await this.getContract();
        return contract.totalAttackVictoryToGetReward();
    }

    public async setTotalFedToGetReward(total: number) {
        const contract = await this.getContract(true);
        const tx = await contract.setTotalFedToGetReward(total);
        return tx.wait();
    }

    public async getTotalFedToGetReward() {
        const contract = await this.getContract();
        return contract.totalFedToGetReward();
    }
}

export default FactoryService;
