import ContractService from "./ContractService";
import { zombieMapper } from "src/store/mapper/zombie/ZombieMapper";

class FactoryService extends ContractService {

    public async createRandomZombie(name: string) {
        const contract = await this.getContract(true);
        const tx = await contract.createRandomZombie(name);
        return tx.wait();
    }

    public async getZombieById(id: number) {
        const contract = await this.getContract();
        const zombie = await contract.zombies(id);
        return zombieMapper(id, zombie);
    }

    public async setCooldownTime(cooldownTime: number) {
        const contract = await this.getContract(true);
        const tx = await contract.setCooldownTime(cooldownTime);
        return tx.wait();
    }

    public async getCooldownTime() {
        const contract = await this.getContract();
        return contract.cooldownTime();
    }
}

export default FactoryService;
