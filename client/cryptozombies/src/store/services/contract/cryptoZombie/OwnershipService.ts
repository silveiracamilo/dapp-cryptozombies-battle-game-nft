import RankingService from "./RankingService";

class OwnershipService extends RankingService {
    
    public async setBaseUrlTokenURI(baseUrl: string) {
        const contract = await this.getContract(true);
        const tx = await contract.setBaseUrlTokenURI(baseUrl);
        return tx.wait();
    }

    public async getBaseUrlTokenURI() {
        const contract = await this.getContract();
        return contract.baseUrlTokenURI();
    }
    
    public async getBalance() {
        const contract = await this.getContract(true);
        return contract.balance();
    }
    
}

export default OwnershipService;
