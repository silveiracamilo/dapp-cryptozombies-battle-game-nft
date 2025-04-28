import { notification } from "antd";
import { filter } from "lodash";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import { ERROR_PAGE_OUT_OF_RANGE } from "utils/error/Constants";

interface IZombieBattleContext {
    zombie: IZombie | undefined
    accounts: string[]
    getZombiesByOwnerMapped: (accountAddress: string) => Promise<IZombie[]>
}

const ZombieBattleContext = createContext<IZombieBattleContext>({} as IZombieBattleContext);

export const useZombieBattleContext = () => {
    const context = useContext(ZombieBattleContext);
    if (!context) {
        throw new Error("useZombieBattleContext must be used within an ZombieBattleContextProvider");
    }
    return context;
}

const ZombieBattleContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const { id = '' } = useParams();
    const [zombie, setZombie] = useState<IZombie>();
    const [accounts, setAccounts] = useState<string[]>([]);

    useEffect(() => {
        loadAccounts();
        loadZombieById(+id);
    }, []);

    const loadAccounts = useCallback(async () => {
        try {
            const accounts = await CryptozombiesBattleService.instance.getAccounts();
            const accountsFiltered = filter([...accounts], account => account !== address);
            setAccounts(accountsFiltered);
        } catch (error: any) {
            if(error.reason !== ERROR_PAGE_OUT_OF_RANGE) {
                notification.error({
                    message: 'Error in get accounts',
                    description: error.reason || 'Error generic'
                });
            }
        }
    }, []);

    const loadZombieById = useCallback(async (id: number) => {
        try {
            const zombie = await getZombieById(id);
            setZombie(zombie);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const getZombiesByOwnerMapped = useCallback(async (accountAddress: string) => {
        return CryptozombiesBattleService.instance.getZombiesByOwnerMapped(accountAddress);
    }, []);

    const contextValue = useMemo(() => ({ zombie, accounts, getZombiesByOwnerMapped }), [zombie, accounts]);

    return (
        <ZombieBattleContext.Provider value={contextValue}>
            {children}
        </ZombieBattleContext.Provider>
    )
}

export default ZombieBattleContextProvider;