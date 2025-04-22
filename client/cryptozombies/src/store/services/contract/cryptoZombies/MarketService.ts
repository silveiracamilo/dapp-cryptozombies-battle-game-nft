import IZombieFees from "src/store/interface/zombie/IZombieFees";
import OwnershipService from "./OwnershipService";
import { map } from "lodash";
import { zombieSaleMapper } from "src/store/mapper/marketplace/zombieSaleMapper";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";
import { toBeHex, zeroPadValue } from "ethers";
import { IBuy, ICancelSale, ISale } from "src/store/interface/marketplace/MarketEvents";
import { ZombieEventTypes } from "src/store/interface/event/ZombieEvent";

class MarketService extends OwnershipService {
    
    public async saleZombie(zombieId: number, price: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.saleZombie(zombieId, price);
        return tx.wait();
    }

    public async cancelSaleZombie(zombieId: number) {
        const contract = await this.getContract(true);
        const tx = await contract.cancelSaleZombie(zombieId);
        return tx.wait();
    }

    public async buyZombie(zombieId: number, price: bigint) {
        const contract = await this.getContract(true);
        const tx = await contract.buyZombie(zombieId, { value: price });
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
    
    // public async hasZombieInShop(zombieId: number): Promise<boolean> {
    //     const contract = await this.getContract();
    //     return await contract.hasZombieInShop(zombieId);
    // }
    
    public async getZombieByIdInSale(zombieId: number): Promise<IZombieSale> {
        const contract = await this.getContract();
        const zombieSale = await contract.getZombieByIdInSale(zombieId);
        return zombieSaleMapper(zombieSale);
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

    public async getLogsSaleZombieByZombieId(zombieId: number): Promise<ISale[]> {
        const contractInterface = (await this.getContract()).interface;
        const eventTopic = contractInterface.getEvent('SaleZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const filter = {
            address: this.contractAddress,
            fromBlock: 0, // TODO update block number when started contract
            toBlock: 'latest',
            topics: [eventTopic, topicZombieId]
        };
        const logs = await this.provider.getLogs(filter);
        const logsMapped = await Promise.all(
            logs.map(async (log) => {
              const parsed = contractInterface.parseLog(log);
              const block = await this.provider.getBlock(log.blockHash);
              const date = new Date((block?.timestamp || 1) * 1000);

              return {
                event: ZombieEventTypes.SaleZombie,
                zombieId: parsed?.args.zombieId,
                price: parsed?.args.price,
                seller: parsed?.args.seller,
                timestamp: block?.timestamp || 0,
                date: date.toISOString(),
              };
            })
        );
        return logsMapped;
    }

    public async getLogsCancelSaleByZombieId(zombieId: number): Promise<ICancelSale[]> {
        const contractInterface = (await this.getContract()).interface;
        const eventTopic = contractInterface.getEvent('CancelSaleZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const filter = {
            address: this.contractAddress,
            fromBlock: 0, // TODO update block number when started contract
            toBlock: 'latest',
            topics: [eventTopic, topicZombieId]
        };
        const logs = await this.provider.getLogs(filter);
        const logsMapped = await Promise.all(
            logs.map(async (log) => {
              const parsed = contractInterface.parseLog(log);
              const block = await this.provider.getBlock(log.blockHash);
              const date = new Date((block?.timestamp || 1) * 1000);

              return {
                event: ZombieEventTypes.CancelSaleZombie,
                zombieId: parsed?.args.zombieId,
                seller: parsed?.args.seller,
                timestamp: block?.timestamp || 0,
                date: date.toISOString(),
              };
            })
        );
        return logsMapped;
    }

    public async getLogsBuyShopZombieByZombieId(zombieId: number): Promise<IBuy[]> {
        const contractInterface = (await this.getContract()).interface;
        const eventTopic = contractInterface.getEvent('BuyZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const filter = {
            address: this.contractAddress,
            fromBlock: 0, // TODO update block number when started contract
            toBlock: 'latest',
            topics: [eventTopic, topicZombieId]
        };
        const logs = await this.provider.getLogs(filter);
        const logsMapped = await Promise.all(
            logs.map(async (log) => {
              const parsed = contractInterface.parseLog(log);
              const block = await this.provider.getBlock(log.blockHash);
              const date = new Date((block?.timestamp || 1) * 1000);

              return {
                event: ZombieEventTypes.BuyZombie,
                zombieId: parsed?.args.zombieId,
                buyer: parsed?.args.buyer,
                seller: parsed?.args.seller,
                timestamp: block?.timestamp || 0,
                date: date.toISOString(),
              };
            })
        );
        return logsMapped;
    }
}

export default MarketService;
