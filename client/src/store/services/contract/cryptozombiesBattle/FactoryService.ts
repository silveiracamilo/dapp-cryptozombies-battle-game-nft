import { INewZombie } from "@/store/interface/zombie/ZombieEvents";
import ContractService from "./ContractService";
import { zombieMapper } from "@/store/mapper/zombie/ZombieMapper";
import { LogDescription, toBeHex, zeroPadValue } from "ethers";
import { ZombieEventTypes } from "@/store/interface/event/ZombieEvent";
import { IMintResult } from "@/store/interface/mint/IMintResult";
import { mintResultMap } from "@/store/mapper/mint/mintMapper";
import { getGasLimit } from "@/utils/contract/gasLimit";

class FactoryService extends ContractService {

    public async mint(name: string): Promise<IMintResult> {
        const contract = await this.getContract(true);
        const mintFee = await this.getMintFee();
        const estimatedGas = await contract.mint.estimateGas(name, { value: mintFee });
        const gasLimit = getGasLimit(estimatedGas);
        const tx = await contract.mint(name, { value: mintFee, gasLimit });
        return mintResultMap(tx, contract);
    }
    
    public async mintFree(proof: string[] = []): Promise<IMintResult> {
        const contract = await this.getContract(true);
        const estimatedGas = await contract.mintFree.estimateGas(proof);
        const gasLimit = getGasLimit(estimatedGas);
        const tx = await contract.mintFree(proof, { gasLimit });
        return mintResultMap(tx, contract);
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
        const topics = [eventTopic, null, topicZombieId];

        const mapper = (v: LogDescription | null, timestamp: number = 0, date: Date): INewZombie =>  {
            return {
                event: ZombieEventTypes.NewZombie,
                zombieId: v?.args.zombieId,
                from: v?.args.from,
                name: v?.args.name,
                dna: v?.args.dna,
                timestamp: timestamp,
                date: date.toISOString(),
            }
        }

        return this.getLogs<INewZombie>(topics, mapper);
    }

    public async getMerkleRoot() {
        const contract = await this.getContract();
        return contract.merkleRoot();
    }

    public async setMerkleRoot(root: string) {
        const contract = await this.getContract(true);
        const tx = await contract.setMerkleRoot(root);
        return tx.wait();
    }
}

export default FactoryService;
