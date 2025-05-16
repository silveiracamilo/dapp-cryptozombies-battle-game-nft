import AttackService from "./AttackService";

// class OwnershipService extends RankingService {
class OwnershipService extends AttackService {
    
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
    
    public async getBalanceOf(owner: string): Promise<bigint> {
        const contract = await this.getContract(true);
        return contract.balanceOf(owner);
    }
    
}

export default OwnershipService;
