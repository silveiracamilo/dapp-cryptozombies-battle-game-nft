
import { Contract } from 'ethers';
import CryptozombiesBattleRanking from './CryptozombiesBattleRanking.json';
import ContractBaseService from '../ContractBaseService';

class ContractService extends ContractBaseService {
    public contractAddress: string = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_RANKING_CONTRACT_ADDRESS;

    public async getContract(): Promise<Contract> {
        return new Contract(this.contractAddress, CryptozombiesBattleRanking.abi, this.providerPublic);
    }
} 

export default ContractService;
