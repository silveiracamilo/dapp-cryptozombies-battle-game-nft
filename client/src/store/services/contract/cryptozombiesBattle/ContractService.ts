
import { BrowserProvider, Contract, JsonRpcProvider, LogDescription } from 'ethers';
import CryptozombiesBattle from './CryptozombiesBattle.json';
import { FROM_BLOCK } from 'src/store/Constants';

class ContractService {
    private _providerPublic!: JsonRpcProvider;
    private _providerSigner!: BrowserProvider;
    public contractAddress: string = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_CONTRACT_ADDRESS;
    protected pageSize = 20;

    protected constructor() {}
    
    public get providerPublic(): JsonRpcProvider {
        if(!this._providerPublic) {
            this._providerPublic = new JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        }
        return this._providerPublic;
    }    
    
    public get providerSigner(): BrowserProvider {
        if(!this._providerSigner) {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('No Ethereum provider found');
            }
            this._providerSigner = new BrowserProvider(window.ethereum);
        }
        return this._providerSigner;
    }    

    public async getContract(isTransaction: boolean = false): Promise<Contract> {
        const provider = isTransaction ? await this.providerSigner.getSigner() : this.providerPublic;
        return new Contract(this.contractAddress, CryptozombiesBattle.abi, provider);
    }

    public async getLogs<T>(
        topics: any[], 
        mapper: (v: LogDescription | null, timestamp: number | undefined, date: Date) => T
    ): Promise<T[]> {
        const startBlock = +FROM_BLOCK;
        const endBlock = await this.providerPublic.getBlockNumber();
        const range = 10000;
        const contract = await this.getContract();
        const contractInterface = contract.interface;
        const logsMapped: T[] = [];

        for (let i = startBlock; i <= endBlock; i += range) {
            const fromBlock = i;
            const toBlock = Math.min(i + range - 1, endBlock);

            const filter = {
                fromBlock,
                toBlock,
                address: this.contractAddress,
                topics
            };

            const logs = await this.providerPublic.getLogs(filter);
            const logsM = await Promise.all(
                logs.map(async (log) => {
                    const parsed = contractInterface.parseLog(log);
                    const block = await this.providerPublic.getBlock(log.blockHash);
                    const date = new Date((block?.timestamp || 1) * 1000);
                    
                    return mapper(parsed, block?.timestamp, date);
                })
            );
            logsMapped.push(...logsM);
        }

        return logsMapped;
    }
} 

export default ContractService;
