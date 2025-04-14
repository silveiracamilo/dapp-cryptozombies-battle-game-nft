import { BrowserProvider, Contract } from 'ethers';
import CryptoZombies from './CryptoZombies.json';

class ContractService {
    private _provider!: BrowserProvider;
    public contractAddress: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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

    public async getContract(): Promise<Contract> {
        const signer = await this.provider.getSigner();
        return new Contract(this.contractAddress, CryptoZombies.abi, signer);
    }
} 

export default ContractService;
