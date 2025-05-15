import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import { ERROR_PAGE_OUT_OF_RANGE } from "utils/error/Constants";

interface IHomeContext {
    zombiesId: number[]
    mintFreeDisponible: boolean
    mintFreeLeft: number
    getZombieById: (id: number) => Promise<IZombie>
}

const HomeContext = createContext<IHomeContext>({} as IHomeContext);

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error("useHomeContext must be used within an HomeContextProvider");
    }
    return context;
}

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const [zombiesId, setZombiesId] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [mintFreeDisponible, setMintFreeDisponible] = useState(false);
    const [mintFreeLeft, setMintFreeLeft] = useState(0);

    useEffect(() => {
        getZombiesByOwner();
        getMintFreeDisponible();
    }, []);

    const getZombiesByOwner = useCallback(async () => {
        try {
            const zombies = await CryptozombiesBattleService.instance.getZombiesByOwner(address);
            setZombiesId([...zombies]);
        } catch (error: any) {
            if(error.reason !== ERROR_PAGE_OUT_OF_RANGE) {
                notification.error({
                    message: 'Error in get zombies',
                    description: error.reason || 'Error generic'
                });
            }
        }
    }, []);

    const getMintFreeDisponible = useCallback(async () => {
        setLoading(true);
        try {
            const mintFreeLimit = await CryptozombiesBattleService.instance.getMintFreeLimit();
            const mintedFreeCount = await CryptozombiesBattleService.instance.getMintedFreeCount();
            setMintFreeDisponible(mintFreeLimit > mintedFreeCount);
            setMintFreeLeft(mintFreeLimit - mintedFreeCount);
        } catch (error: any) {
            notification.error({
                message: 'Error in get mint free disponible',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ 
        zombiesId,
        mintFreeDisponible,
        mintFreeLeft,
        getZombieById 
    }), [zombiesId, mintFreeDisponible, mintFreeLeft]);

    return (
        <HomeContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;