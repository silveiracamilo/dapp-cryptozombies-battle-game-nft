import { notification } from "antd";
import { orderBy } from "lodash";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IRanking } from "src/store/interface/ranking/IRanking";
import ContractService from "src/store/services/ContractService";

interface IRankingContext {
    ranking: IRanking[]
}

const RankingContext = createContext<IRankingContext>({} as IRankingContext);

export const useRankingContext = () => {
    const context = useContext(RankingContext);
    if (!context) {
        throw new Error("useRankingContext must be used within an RankingContextProvider");
    }
    return context;
}

const RankingContextProvider = ({ children }: { children: ReactNode }) => {
    const [ranking, setRanking] = useState<IRanking[]>([]);

    useEffect(() => {
        loadRanking();
    }, []);

    const loadRanking = useCallback(async () => {
        try {
            const ranking = await ContractService.instance.getRanking();
            
            setRanking(
                orderBy(ranking, ['score'], ['desc'])
            );
        } catch (error: any) {
            notification.error({
                message: 'Error in get accounts',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    console.log('ranking: ', ranking);

    const contextValue = useMemo(() => ({ ranking }), [ranking]);

    return (
        <RankingContext.Provider value={contextValue}>
            {children}
        </RankingContext.Provider>
    )
}

export default RankingContextProvider;