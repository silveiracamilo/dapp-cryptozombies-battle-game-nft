
import { Contract } from 'ethers';
import CryptozombiesBattleMarket from './CryptozombiesBattleMarket.json';
import ContractBaseService from '../ContractBaseService';

class ContractService extends ContractBaseService {
    public contractAddress: string = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_MARKET_CONTRACT_ADDRESS;
    protected pageSize = 20;

    public async getContract(isTransaction: boolean = false): Promise<Contract> {
        const provider = isTransaction ? await this.providerSigner.getSigner() : this.providerPublic;
        return new Contract(this.contractAddress, CryptozombiesBattleMarket.abi, provider);
    }
} 

export default ContractService;
