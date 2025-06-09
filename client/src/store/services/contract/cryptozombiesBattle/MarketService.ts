import IZombieFees from "@/store/interface/zombie/IZombieFees";
import OwnershipService from "./OwnershipService";
import { map } from "lodash";
import { zombieSaleMapper } from "@/store/mapper/marketplace/zombieSaleMapper";
import IZombieSale from "@/store/interface/marketplace/IZombieSale";
import { LogDescription, toBeHex, zeroPadValue } from "ethers";
import { IBuy, ICancelSale, ISale } from "@/store/interface/marketplace/MarketEvents";
import { ZombieEventTypes } from "@/store/interface/event/ZombieEvent";

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
    
    public async getZombieByIdInSale(zombieId: number): Promise<IZombieSale> {
        const contract = await this.getContract();
        const zombieSale = await contract.getZombieByIdInSale(zombieId);
        return zombieSaleMapper(zombieSale);
    }
    
    public async getAllZombiesInShop(): Promise<IZombieSale[]> {
        const contract = await this.getContract();
        const result = await contract.getZombiesInShopPaginated(0, this.pageSize);
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
        const contract = await this.getContract();
        const contractInterface = contract.interface;
        const eventTopic = contractInterface.getEvent('SaleZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const topics = [eventTopic, topicZombieId];

        const mapper = (v: LogDescription | null, timestamp: number = 0, date: Date): ISale =>  {
            return {
                event: ZombieEventTypes.SaleZombie,
                zombieId: v?.args.zombieId,
                price: v?.args.price,
                seller: v?.args.seller,
                timestamp: timestamp,
                date: date.toISOString(),
            }
        }

        return this.getLogs<ISale>(topics, mapper);
    }

    public async getLogsCancelSaleByZombieId(zombieId: number): Promise<ICancelSale[]> {
        const contract = await this.getContract();
        const contractInterface = contract.interface;
        const eventTopic = contractInterface.getEvent('CancelSaleZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const topics = [eventTopic, topicZombieId];

        const mapper = (v: LogDescription | null, timestamp: number = 0, date: Date): ICancelSale =>  {
            return {
                event: ZombieEventTypes.CancelSaleZombie,
                zombieId: v?.args.zombieId,
                seller: v?.args.seller,
                timestamp: timestamp,
                date: date.toISOString(),
            }
        }

        return this.getLogs<ICancelSale>(topics, mapper);
    }

    public async getLogsBuyShopZombieByZombieId(zombieId: number): Promise<IBuy[]> {
        const contract = await this.getContract();
        const contractInterface = contract.interface;
        const eventTopic = contractInterface.getEvent('BuyZombie')?.topicHash || '';
        const topicZombieId = zeroPadValue(toBeHex(zombieId), 32);
        const topics = [eventTopic, topicZombieId];

        const mapper = (v: LogDescription | null, timestamp: number = 0, date: Date): IBuy =>  {
            return {
                event: ZombieEventTypes.BuyZombie,
                zombieId: v?.args.zombieId,
                buyer: v?.args.buyer,
                seller: v?.args.seller,
                timestamp: timestamp,
                date: date.toISOString(),
            }
        }

        return this.getLogs<IBuy>(topics, mapper);
    }
}

export default MarketService;
