import { BrowserProvider, Contract, parseEther } from 'ethers';
import CryptoZombies from './CryptoZombies.json';
import { zombieMapper } from '../mapper/zombie/ZombieMapper';
import { IZombie } from '../interface/zombie/IZombie';
import { map } from 'lodash';
import { rankingMapper } from '../mapper/ranking/RankingMapper';
import { IRanking } from '../interface/ranking/IRanking';
import ISettings from '../interface/admin/ISettings';

class ContractService {
    static _instance: ContractService;
    private _provider!: BrowserProvider;
    public contractAddress: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    // private feeCreate = ethers.parseEther("0.0001");
    // private gasLimit = ethers.parseEther("0.000001");
    // public static signer: JsonRpcSigner;

    private constructor() {}

    public static get instance(): ContractService {
        return this._instance || (this._instance = new ContractService());
    }
    
    public get provider(): BrowserProvider {
        if(!this._provider) {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('No Ethereum provider found');
            }
            this._provider = new BrowserProvider(window.ethereum);
        }
        return this._provider;
    }    

    public async getContract(): Promise<Contract> {
        const signer = await this.provider.getSigner();
        return new Contract(this.contractAddress, CryptoZombies.abi, signer);
    }

    public async createRandomZombie(name: string) {
        const contract = await this.getContract();
        const tx = await contract.createRandomZombie(name);
        return tx.wait();
    }
    
    public async getZombiesByOwner(owner: string) {
        const contract = await this.getContract();
        return contract.getZombiesByOwner(owner);
    }

    public async getZombiesByOwnerMapped(accountAddress: string)  {
        const zombiesId = await this.getZombiesByOwner(accountAddress);
        const promiseAllZombies = zombiesId.map((zombieId: number) => this.getZombieById(zombieId))
        return Promise.all<IZombie[]>(promiseAllZombies);
    }

    public async getZombieById(id: number) {
        const contract = await this.getContract();
        const zombie = await contract.zombies(id);
        return zombieMapper(id, zombie);
    }

    public async feedOnKitty(zombieId: number, kittyDna: number, kittyId: number) {
        const contract = await this.getContract();
        const tx = await contract.feedOnKitty(zombieId, kittyDna, kittyId);
        return tx.wait();
    }

    public async attack(zombieId: number, targetId: number) {
        const contract = await this.getContract();
        const tx = await contract.attack(zombieId, targetId);
        return tx.wait();
    }

    public async getAccounts() {
        const contract = await this.getContract();
        return contract.getAccounts();
    }

    public async levelUp(zombieId: number) {
        const contract = await this.getContract();
        const tx = await contract.levelUp(zombieId, { value: parseEther('0.001') });
        return tx.wait();
    }

    public async changeName(zombieId: number, newName: string) {
        const contract = await this.getContract();
        const tx = await contract.changeName(zombieId, newName, { value: parseEther('0.002') });
        return tx.wait();
    }

    public async changeDna(zombieId: number, newDna: number) {
        const contract = await this.getContract();
        const tx = await contract.changeDna(zombieId, newDna, { value: parseEther('0.004') });
        return tx.wait();
    }

    public async getRanking(): Promise<IRanking[]> {
        const contract = await this.getContract();
        const ranking = await contract.getRanking();
        return map(ranking, rankingMapper);
    }

    public async getCooldownTime() {
        const contract = await this.getContract();
        return contract.cooldownTime();
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

    public async getBaseUrlTokenURI() {
        const contract = await this.getContract();
        return contract.baseUrlTokenURI();
    }

    public async getTax() {
        const contract = await this.getContract();
        return contract.tax();
    }

    public async getMinPrice() {
        const contract = await this.getContract();
        return contract.minPrice();
    }
    
    public async getSettings(): Promise<ISettings> {
        const settingsList = await Promise.all([
            this.getCooldownTime(),
            this.getLevelUpFee(),
            this.getChangeNameFee(),
            this.getChangeDNAFee(),
            this.getBaseUrlTokenURI(),
            this.getTax(),
            this.getMinPrice(),
        ]);

        return {
            cooldownTime: parseInt(settingsList[0]),
            levelUpFee: settingsList[1],
            changeNameFee: settingsList[2],
            changeDNAFee: settingsList[3],
            baseUrlTokenURI: settingsList[4],
            tax: settingsList[5],
            minPrice: settingsList[6],
        };
    }

    public async setCooldownTime(cooldownTime: number) {
        const contract = await this.getContract();
        const tx = await contract.setCooldownTime(cooldownTime);
        return tx.wait();
    }

    public async setLevelUpFee(fee: bigint) {
        const contract = await this.getContract();
        const tx = await contract.setLevelUpFee(fee);
        return tx.wait();
    }
    
    public async setChangeNameFee(fee: bigint) {
        const contract = await this.getContract();
        const tx = await contract.setChangeNameFee(fee);
        return tx.wait();
    }

    public async setChangeDNAFee(fee: bigint) {
        const contract = await this.getContract();
        const tx = await contract.setChangeDNAFee(fee);
        return tx.wait();
    }
    
    public async setBaseUrlTokenURI(baseUrl: string) {
        const contract = await this.getContract();
        const tx = await contract.setBaseUrlTokenURI(baseUrl);
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
} 

export default ContractService;
