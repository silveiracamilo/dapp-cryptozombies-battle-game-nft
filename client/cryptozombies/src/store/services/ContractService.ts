import { BrowserProvider, Contract, parseEther } from 'ethers';
import CryptoZombies from './CryptoZombies.json';
import { zombieMapper } from '../mapper/zombie/ZombieMapper';
import { IZombie } from '../interface/zombie/IZombie';

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
    
    public async getZombiesOtherOwner(owner: string) {
        const contract = await this.getContract();
        return contract.getZombiesOtherOwner(owner, 5);
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
} 

export default ContractService;
