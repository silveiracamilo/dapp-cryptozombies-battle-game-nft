import { IRanking } from "src/store/interface/ranking/IRanking";
import AttackService from "./AttackService";
import { map } from "lodash";
import { rankingMapper } from "src/store/mapper/ranking/RankingMapper";

class RankingService extends AttackService {

    public async getRanking(): Promise<IRanking[]> {
        const contract = await this.getContract();
        const ranking = await contract.getRanking();
        return map(ranking, rankingMapper);
    }
}

export default RankingService;
