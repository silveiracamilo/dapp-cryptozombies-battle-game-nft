import FeedingService from "./FeedingService";
import { IZombie } from "src/store/interface/zombie/IZombie";

class HelperService extends FeedingService {

    public async getZombiesByOwner(owner: string) {
        const contract = await this.getContract();
        return contract.getZombiesByOwnerPaginated(owner, 0, this.pageSize);
    }

    public async getZombiesByOwnerMapped(accountAddress: string)  {
        const zombiesId = await this.getZombiesByOwner(accountAddress);
        const promiseAllZombies = zombiesId.map((zombieId: number) => this.getZombieById(zombieId))
        return Promise.all<IZombie[]>(promiseAllZombies);
    }

    public async getAccounts() {
        const contract = await this.getContract();
        return contract.getAccountsPaginated(0, this.pageSize);
    }

    public async levelUp(zombieId: number) {
        const contract = await this.getContract(true);
        const fee = await this.getLevelUpFee();
        const tx = await contract.levelUp(zombieId, { value: fee });
        return tx.wait();
    }

    public async changeName(zombieId: number, newName: string) {
        const contract = await this.getContract(true);
        const fee = await this.getChangeNameFee();
        const tx = await contract.changeName(zombieId, newName, { value: fee });
        return tx.wait();
    }

    public async changeDna(zombieId: number, newDna: number) {
        const contract = await this.getContract(true);
        const fee = await this.getChangeDNAFee();
        const tx = await contract.changeDna(zombieId, newDna, { value: fee });
        return tx.wait();
    }

    public async setLevelUpFee(fee: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setLevelUpFee(fee);
        return tx.wait();
    }
    
    public async setChangeNameFee(fee: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setChangeNameFee(fee);
        return tx.wait();
    }

    public async setChangeDNAFee(fee: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setChangeDNAFee(fee);
        return tx.wait();
    }

    public async getLevelUpFee() {
        const contract = await this.getContract();
        return contract.levelUpFee();
    }

    public async getChangeNameFee() {
        const contract = await this.getContract();
        return contract.changeNameFee();
    }

    public async getChangeDNAFee() {
        const contract = await this.getContract();
        return contract.changeDNAFee();
    }
    
    public async withdraw() {
        const contract = await this.getContract(true);
        const tx = await contract.withdraw();
        return tx.wait();
    }
}

export default HelperService;
