import OwnershipService from "./OwnershipService";

class MarketService extends OwnershipService {
    
    public async saleMyZombie(zombieId: number, price: number) {
        const contract = await this.getContract();
        const tx = await contract.saleMyZombie(zombieId, price);
        return tx.wait();
    }

    public async buyShopZombie(zombieId: number, price: number) {
        const contract = await this.getContract();
        const tx = await contract.buyShopZombie(zombieId, { value: price });
        return tx.wait();
    }

    public async setTax(tax: bigint) {
        const contract = await this.getContract();
        const tx = await contract.setTax(tax);
        return tx.wait();
    }
    
    public async setMinPrice(price: bigint) {
        const contract = await this.getContract();
        const tx = await contract.setMinPrice(price);
        return tx.wait();
    }

    public async getTax() {
        const contract = await this.getContract();
        return contract.tax();
    }

    public async getMinPrice() {
        const contract = await this.getContract();
        return contract.minPrice();
    }
}

export default MarketService;
