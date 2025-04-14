import { notification } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface IZombieAttackDefeatContext {
    zombieFrom: IZombie | undefined
    zombieTarget: IZombie | undefined
}

const ZombieAttackDefeatContext = createContext<IZombieAttackDefeatContext>({} as IZombieAttackDefeatContext);

export const useZombieAttackDefeatContext = () => {
    const context = useContext(ZombieAttackDefeatContext);
    if (!context) {
        throw new Error("useZombieAttackDefeatContext must be used within an ZombieAttackDefeatContextProvider");
    }
    return context;
}

const ZombieAttackDefeatContextProvider = ({ children }: { children: ReactNode }) => {
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
        return CryptoZombiesService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ zombieFrom, zombieTarget }), [zombieFrom, zombieTarget]);

    return (
        <ZombieAttackDefeatContext.Provider value={contextValue}>
            {children}
        </ZombieAttackDefeatContext.Provider>
    )
}

export default ZombieAttackDefeatContextProvider;