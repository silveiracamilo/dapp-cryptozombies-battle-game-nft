import { notification } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { IZombie } from "src/store/interface/zombie/IZombie";
import ContractService from "src/store/services/ContractService";

interface IZombieBattleContext {
    zombie: IZombie | undefined
    zombiesId: number[]
    getZombieById: (id: number) => Promise<IZombie>
    attack: (targetId: number) => Promise<void>
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
    const [zombiesId, setZombiesId] = useState<number[]>([]);
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) {
            start();
            isFirst.current = false;
        }
    }, []);

    useEffect(() => {
        if (id) {
            loadZombieById(+id);
        }
    }, [id]);


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

    const start = useCallback(async () => {
        try {
            const zombies = await ContractService.instance.getZombiesOtherOwner(address);
            setZombiesId([...zombies]);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return ContractService.instance.getZombieById(id);
    }, []);

    const attack = useCallback(async (targetId: number) => {
        try {
            await ContractService.instance.attack(parseInt(id), targetId);
        } catch (error: any) {
            notification.error({
                message: 'Error attack zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, [id]);

    const contextValue = useMemo(() => ({ 
        zombiesId,
        getZombieById,
        zombie,
        attack,
    }), [zombiesId, zombie, attack]);

    return (
        <ZombieBattleContext.Provider value={contextValue}>
            {children}
        </ZombieBattleContext.Provider>
    )
}

export default ZombieBattleContextProvider;