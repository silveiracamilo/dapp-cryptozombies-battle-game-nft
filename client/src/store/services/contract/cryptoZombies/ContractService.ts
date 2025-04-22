
import { BrowserProvider, Contract } from 'ethers';
import CryptoZombies from './CryptoZombies.json';

class ContractService {
    private _provider!: BrowserProvider;
    public contractAddress: string = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_CONTRACT_ADDRESS;

    protected constructor() {}
    
    public get provider(): BrowserProvider {
        if(!this._provider) {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('No Ethereum provider found');
            }
            this._provider = new BrowserProvider(window.ethereum);
        }
        return this._provider;
    }    

    public async getContract(isTransaction: boolean = false): Promise<Contract> {
        const provider = isTransaction ? await this.provider.getSigner() : this.provider;
        return new Contract(this.contractAddress, CryptoZombies.abi, provider);
    }
} 

export default ContractService;
