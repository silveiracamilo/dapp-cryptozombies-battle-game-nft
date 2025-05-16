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
    accountsTotal: number
    pageSize: number
    getZombiesByOwnerMapped: (accountAddress: string) => Promise<IZombie[]>
    getAccounts: (page: number) => Promise<void>
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
    const [accountsTotal, setAccountsTotal] = useState(0);
    const [accounts, setAccounts] = useState<string[]>([]);
    const pageSize = useMemo(() => 16, []);

    useEffect(() => {
        getAccountsTotal();
        getAccounts(1);
        getZombie();
    }, []);

    const getAccountsTotal = useCallback(async () => {
        try {
            const accountsTotal = await CryptozombiesBattleService.instance.getAccountsTotal();
            const total = (+accountsTotal.toString()) - 1;
            setAccountsTotal(total);
        } catch (error: any) {
            notification.error({
                message: 'Error in get accounts total',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getAccounts = useCallback(async (page: number) => {
        try {
            const accounts = await CryptozombiesBattleService.instance.getAccounts((page - 1), pageSize);
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

    const getZombie = useCallback(async () => {
        try {
            const zombie = await getZombieById(+id);
            setZombie(zombie);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, [id]);

    const getZombieById = useCallback(async (id: number) => {
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const getZombiesByOwnerMapped = useCallback(async (accountAddress: string) => {
        return CryptozombiesBattleService.instance.getZombiesAllByOwner(accountAddress);
    }, []);

    const contextValue = useMemo(() => ({ 
        zombie,
        accounts,
        accountsTotal,
        pageSize,
        getZombiesByOwnerMapped,
        getAccounts
    }), [zombie, accounts, accountsTotal, pageSize]);

    return (
        <ZombieBattleContext.Provider value={contextValue}>
            {children}
        </ZombieBattleContext.Provider>
    )
}

export default ZombieBattleContextProvider;