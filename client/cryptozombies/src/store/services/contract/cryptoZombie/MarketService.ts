import IZombieFees from "src/store/interface/zombie/IZombieFees";
import OwnershipService from "./OwnershipService";
import { map } from "lodash";
import { zombieSaleMapper } from "src/store/mapper/marketplace/zombieSaleMapper";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";

class MarketService extends OwnershipService {
    
    public async saleMyZombie(zombieId: number, price: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.saleMyZombie(zombieId, price);
        return tx.wait();
    }

    public async buyShopZombie(zombieId: number, price: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.buyShopZombie(zombieId, { value: price });
        return tx.wait();
    }

    public async setTax(tax: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.setTax(tax);
        return tx.wait();
    }
    
    public async setMinPrice(price: bigint) {
        const contract = await this.getContract(true);
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
    
    public async hasZombieInShop(zombieId: number): Promise<boolean> {
        const contract = await this.getContract();
        return await contract.hasZombieInShop(zombieId);
    }
    
    public async getAllZombiesInShop(): Promise<IZombieSale[]> {
        const contract = await this.getContract();
        const result = await contract.getAllZombiesInShop();
        return map(result, zombieSaleMapper);
    }

    public async getFees(): Promise<IZombieFees> {
        const feesList = await Promise.all([
            this.getLevelUpFee(),
            this.getChangeNameFee(),
            this.getChangeDNAFee(),
            this.getTax(),
            this.getMinPrice(),
        ]);

        return {
            levelUpFee: feesList[0],
            changeNameFee: feesList[1],
            changeDNAFee: feesList[2],
            tax: feesList[3],
            minPrice: feesList[4],
        };
    }
}

export default MarketService;
