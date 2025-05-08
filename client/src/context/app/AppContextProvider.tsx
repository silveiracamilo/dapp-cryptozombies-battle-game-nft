import { notification } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

interface IAppContext {
    totalAttackVictoryToGetReward: number
    totalFedToGetReward: number
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [totalAttackVictoryToGetReward, setTotalAttackVictoryToGetReward] = useState(0);
    const [totalFedToGetReward, setTotalFedToGetReward] = useState(0);
    
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = useCallback(async () => {
        try {
            const totalAttackVictoryToGetReward = await CryptozombiesBattleService.instance.getTotalAttackVictoryToGetReward();
            const totalFedToGetReward = await CryptozombiesBattleService.instance.getTotalFedToGetReward();
            setTotalAttackVictoryToGetReward(parseInt(totalAttackVictoryToGetReward.toString()));
            setTotalFedToGetReward(parseInt(totalFedToGetReward.toString()));
        } catch (error: any) {
            notification.error({
                message: 'Error in get settings',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const contextValue = useMemo(() => ({ 
        totalAttackVictoryToGetReward,
        totalFedToGetReward,
    }), [totalAttackVictoryToGetReward, totalFedToGetReward]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
