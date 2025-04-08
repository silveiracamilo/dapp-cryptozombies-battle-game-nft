import { IRanking } from "src/store/interface/ranking/IRanking";

export const rankingMapper = (ranking: (string | number)[]): IRanking => {
    return {
        account: `${ranking[0]}`,
        score: +ranking[1].toString(),
        zombieCount: +ranking[2].toString(),
        winCount: +ranking[3].toString(),
        lossCount: +ranking[4].toString(),
    };
};
