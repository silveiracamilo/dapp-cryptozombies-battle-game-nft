import { BrowserProvider, Contract } from 'ethers';
import CryptoZombies from './CryptoZombies.json';
import { zombieMapper } from '../mapper/zombie/ZombieMapper';

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
        console.log('createRandomZombie name: ', name);
        const contract = await this.getContract();
        const tx = await contract.createRandomZombie(name);
        console.log('tx: ', tx);
        return tx.wait();
    }
    
    public async getZombiesByOwner(owner: string) {
        console.log('getZombiesByOwner owner: ', owner);
        const contract = await this.getContract();
        return contract.getZombiesByOwner(owner);
    }
    
    public async getZombiesOtherOwner(owner: string) {
        console.log('getZombiesOtherOwner owner: ', owner);
        const contract = await this.getContract();
        return contract.getZombiesOtherOwner(owner, 5);
    }

    public async getZombieById(id: number) {
        console.log('getZombieById: ', id);
        const contract = await this.getContract();
        const zombie = await contract.zombies(id);
        return zombieMapper(zombie);
    }

    public async feedOnKitty(zombieId: number, kittyGenes: number, kittyId: number) {
        console.log('feedOnKitty: ', zombieId, kittyGenes, kittyId);
        const contract = await this.getContract();
        const tx = await contract.feedOnKitty(zombieId, kittyGenes, kittyId);
        console.log('tx: ', tx);
        return tx.wait();
    }
    // public async feedOnKitty(zombieId: number, kittyId: number) {
    //     console.log('feedOnKitty: ', zombieId, kittyId);
    //     const contract = await this.getContract();
    //     const tx = await contract.feedOnKitty('0x06012c8cf97bead5deae237070f9587f8e7a266d', zombieId, kittyId);
    //     console.log('tx: ', tx);
    //     return tx.wait();
    // }

    public async attack(zombieId: number, targetId: number) {
        console.log('attack: ', zombieId, targetId);
        const contract = await this.getContract();
        const tx = await contract.attack(zombieId, targetId);
        console.log('tx: ', tx);
        return tx.wait();
    }
} 

export default ContractService;
