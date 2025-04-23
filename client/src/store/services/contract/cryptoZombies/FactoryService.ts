import { INewZombie } from "src/store/interface/zombie/ZombieEvents";
import ContractService from "./ContractService";
import { zombieMapper } from "src/store/mapper/zombie/ZombieMapper";
import { toBeHex, zeroPadValue } from "ethers";
import { ZombieEventTypes } from "src/store/interface/event/ZombieEvent";
import { FROM_BLOCK } from "src/store/Constants";

class FactoryService extends ContractService {

    public async mint(name: string) {
        const contract = await this.getContract(true);
        const mintFee = await this.getMintFee();
        const tx = await contract.mint(name, { value: mintFee });
        return tx.wait();
    }
    
    public async mintFree() {
        const contract = await this.getContract(true);
        const tx = await contract.mintFree();
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

    public async setMintFee(fee: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setMintFee(fee);
        return tx.wait();
    }

    public async getMintFee(): Promise<bigint> {
        const contract = await this.getContract();
        return contract.mintFee();
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
    
    public async getMintFreeLimit() {
        const contract = await this.getContract();
        return contract.mintFreeLimit();
    }
    
    public async getMintedFreeCount() {
        const contract = await this.getContract();
        return contract.mintedFreeCount();
    }

    public async getLogsNewZombieByZombieId(zombieId: number): Promise<INewZombie[]> {
        const contract = await this.getContract();
        const contractInterface = contract.interface;
        const eventTopic = contractInterface.getEvent('NewZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const filter = {
            address: this.contractAddress,
            fromBlock: FROM_BLOCK,
            toBlock: 'latest',
            topics: [eventTopic, null, topicZombieId]
        };
        const logs = await this.provider.getLogs(filter);
        const logsMapped = await Promise.all(
            logs.map(async (log) => {
                const parsed = contractInterface.parseLog(log);
                const block = await this.provider.getBlock(log.blockHash);
                const date = new Date((block?.timestamp || 1) * 1000);

                return {
                    event: ZombieEventTypes.NewZombie,
                    zombieId: parsed?.args.zombieId,
                    from: parsed?.args.from,
                    name: parsed?.args.name,
                    dna: parsed?.args.dna,
                    timestamp: block?.timestamp || 0,
                    date: date.toISOString(),
                };
            })
        );
        return logsMapped;
    }
}

export default FactoryService;
