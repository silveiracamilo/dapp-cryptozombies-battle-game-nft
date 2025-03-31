import { BrowserProvider, Contract } from 'ethers';
import CryptoZombies from './CryptoZombies.json';

class ContractService {
    static _instance: ContractService;
    private _provider!: BrowserProvider;
    private contractAddress: string = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
    // private feeCreate = ethers.parseEther("0.0001");
    // private gasLimit = ethers.parseEther("0.000001");
    // public static signer: JsonRpcSigner;

    private constructor() {}

    public static get instance(): ContractService {
        return this._instance || (this._instance = new ContractService());
    }
    
    private get provider(): BrowserProvider {
        if(!this._provider) {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('No Ethereum provider found');
            }
            this._provider = new BrowserProvider(window.ethereum);
        }
        return this._provider;
    }    

    private async getContract(): Promise<Contract> {
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

    public async getZombieById(id: number) {
        console.log('getZombieById: ', id);
        const contract = await this.getContract();
        return contract.zombies(id);
    }
} 

export default ContractService;
