
import { Contract, JsonRpcProvider } from 'ethers';
import CryptozombiesBattleRanking from './CryptozombiesBattleRanking.json';

class ContractService {
    private _provider!: JsonRpcProvider;
    public contractAddress: string = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_RANKING_CONTRACT_ADDRESS;

    protected constructor() {}
    
    public get provider(): JsonRpcProvider {
        if(!this._provider) {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('No Ethereum provider found');
            }
            this._provider = new JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        }
        return this._provider;
    } 

    public async getContract(isTransaction: boolean = false): Promise<Contract> {
        const provider = isTransaction ? await this.provider.getSigner() : this.provider;
        return new Contract(this.contractAddress, CryptozombiesBattleRanking.abi, provider);
    }
} 

export default ContractService;
