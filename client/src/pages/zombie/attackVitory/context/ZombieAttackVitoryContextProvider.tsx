import { notification } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { IZombie } from "@/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "@/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

interface IZombieAttackVitoryContext {
    zombieFrom: IZombie | undefined
    zombieTarget: IZombie | undefined
}

const ZombieAttackVitoryContext = createContext<IZombieAttackVitoryContext>({} as IZombieAttackVitoryContext);

export const useZombieAttackVitoryContext = () => {
    const context = useContext(ZombieAttackVitoryContext);
    if (!context) {
        throw new Error("useZombieAttackVitoryContext must be used within an ZombieAttackVitoryContextProvider");
    }
    return context;
}

const ZombieAttackVitoryContextProvider = ({ children }: { children: ReactNode }) => {
    const { fromId = '', targetId = '' } = useParams();
    const [zombieFrom, setZombieFrom] = useState<IZombie>();
    const [zombieTarget, setZombieTarget] = useState<IZombie>();

    useEffect(() => {
        loadZombiesFight();
    }, []);

    const loadZombiesFight = useCallback(async () => {
        try {
            const zFrom = await getZombieById(+fromId);
            const zTarget = await getZombieById(+targetId);
            setZombieFrom(zFrom);
            setZombieTarget(zTarget);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies fight',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ zombieFrom, zombieTarget }), [zombieFrom, zombieTarget]);

    return (
        <ZombieAttackVitoryContext.Provider value={contextValue}>
            {children}
        </ZombieAttackVitoryContext.Provider>
    )
}

export default ZombieAttackVitoryContextProvider;