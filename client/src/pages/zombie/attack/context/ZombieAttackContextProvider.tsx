import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import { ERROR_PAGE_OUT_OF_RANGE } from "utils/error/Constants";

interface IZombieAttackContext {
    zombie: IZombie | undefined
    zombies: IZombie[]
    getZombieById: (id: number) => Promise<IZombie>
    attack: (targetId: number) => Promise<void>
}

const ZombieAttackContext = createContext<IZombieAttackContext>({} as IZombieAttackContext);

export const useZombieAttackContext = () => {
    const context = useContext(ZombieAttackContext);
    if (!context) {
        throw new Error("useZombieAttackContext must be used within an ZombieAttackContextProvider");
    }
    return context;
}

const ZombieAttackContextProvider = ({ children }: { children: ReactNode }) => {
    const { id = '', addressEnemie = '' } = useParams();
    const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();
    const [zombies, setZombies] = useState<IZombie[]>([]);
    const [loading, setLoading] = useState(false);
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
            const zombies = await CryptozombiesBattleService.instance.getZombiesByOwnerMapped(addressEnemie);
            setZombies([...zombies]);
        } catch (error: any) {
            if(error.reason !== ERROR_PAGE_OUT_OF_RANGE) {
                notification.error({
                    message: 'Error in get zombies',
                    description: error.reason || 'Error generic'
                });
            }
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const attack = useCallback(async (targetId: number) => {
        setLoading(true);
        try {
            const result = await CryptozombiesBattleService.instance.attack(parseInt(id), targetId);
            
            if (result.victory) {
                navigate(
                    Paths.ZOMBIE_ATTACK_VITORY
                        .replace(':fromId', id)
                        .replace(':targetId', targetId.toString())
                        .replace(':newDna', result.newDna.toString())
                );
                return;
            }

            navigate(
                Paths.ZOMBIE_ATTACK_DEFEAT
                    .replace(':fromId', id)
                    .replace(':targetId', targetId.toString())
            )
        } catch (error: any) {
            notification.error({
                message: 'Error attack zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, [id]);

    const contextValue = useMemo(() => ({ 
        zombies,
        getZombieById,
        zombie,
        attack,
    }), [zombies, zombie, attack]);

    return (
        <ZombieAttackContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieAttackContext.Provider>
    )
}

export default ZombieAttackContextProvider;