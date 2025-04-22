import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptoZombiesService from "src/store/services/contract/cryptoZombies/CryptoZombiesService";

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
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) {
            start();
            getMintFreeDisponible();
            isFirst.current = false;
        }
    }, []);

    const start = useCallback(async () => {
        try {
            const zombies = await CryptoZombiesService.instance.getZombiesByOwner(address);
            setZombiesId([...zombies]);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    const getMintFreeDisponible = useCallback(async () => {
        setLoading(true);
        try {
            const mintFreeLimit = await CryptoZombiesService.instance.getMintFreeLimit();
            const mintedFreeCount = await CryptoZombiesService.instance.getMintedFreeCount();
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
        return CryptoZombiesService.instance.getZombieById(id);
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