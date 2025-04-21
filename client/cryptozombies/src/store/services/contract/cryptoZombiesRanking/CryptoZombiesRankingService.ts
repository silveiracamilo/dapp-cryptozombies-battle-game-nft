import { IRanking } from "src/store/interface/ranking/IRanking";
import { map } from "lodash";
import { rankingMapper } from "src/store/mapper/ranking/RankingMapper";
import ContractService from "./ContractService";

class CryptoZombiesRankingService extends ContractService {
    static _instance: CryptoZombiesRankingService;

    public static get instance(): CryptoZombiesRankingService {
        return this._instance || (this._instance = new CryptoZombiesRankingService());
    }

    public async getRanking(): Promise<IRanking[]> {
        const contract = await this.getContract();
        const ranking = await contract.getRanking();
        return map(ranking, rankingMapper);
    }
}

export default CryptoZombiesRankingService;
