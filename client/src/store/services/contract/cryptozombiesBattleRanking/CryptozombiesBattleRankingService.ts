import { IRanking } from "@/store/interface/ranking/IRanking";
import { map } from "lodash";
import { rankingMapper } from "@/store/mapper/ranking/RankingMapper";
import ContractService from "./ContractService";

class CryptozombiesBattleRankingService extends ContractService {
    static _instance: CryptozombiesBattleRankingService;

    public static get instance(): CryptozombiesBattleRankingService {
        return this._instance || (this._instance = new CryptozombiesBattleRankingService());
    }

    public async getRanking(): Promise<IRanking[]> {
        const contract = await this.getContract();
        const ranking = await contract.getRanking();
        return map(ranking, rankingMapper);
    }
}

export default CryptozombiesBattleRankingService;
