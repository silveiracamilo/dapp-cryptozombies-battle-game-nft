import FactoryService from "./FactoryService";

class FeedingService extends FactoryService {
    
    public async feedOnKitty(zombieId: number, kittyDna: number, kittyId: number) {
        const contract = await this.getContract(true);
        const tx = await contract.feedOnKitty(zombieId, kittyDna, kittyId);
        return tx.wait();
    }
}

export default FeedingService;
