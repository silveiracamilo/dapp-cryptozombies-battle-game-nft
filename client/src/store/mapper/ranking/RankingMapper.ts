import { IRanking } from "@/store/interface/ranking/IRanking";

export const rankingMapper = (ranking: (string | number)[]): IRanking => {
    return {
        account: `${ranking[0]}`,
        position: +ranking[1].toString(),
        score: +ranking[2].toString(),
        zombieCount: +ranking[3].toString(),
        winCount: +ranking[4].toString(),
        lossCount: +ranking[5].toString(),
    };
};
