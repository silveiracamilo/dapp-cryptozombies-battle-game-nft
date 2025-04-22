import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptoZombiesService from "src/store/services/contract/cryptoZombies/CryptozombiesBattleService";

interface IMarketplaceContext {
    allZombiesInShop: IZombieSale[]
    getZombieById: (id: number) => Promise<IZombie>
    buyZombie: (zombieId: number, price: bigint) => Promise<void>
}

const MarketplaceContext = createContext<IMarketplaceContext>({} as IMarketplaceContext);

export const useMarketplaceContext = () => {
    const context = useContext(MarketplaceContext);
    if (!context) {
        throw new Error("useMarketplaceContext must be used within an MarketplaceContextProvider");
    }
    return context;
}

const MarketplaceContextProvider = ({ children }: { children: ReactNode }) => {
    const [allZombiesInShop, setAllZombiesInShop] = useState<IZombieSale[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllZombiesInShop();
    }, []);

    const getAllZombiesInShop = useCallback(async () => {
        setLoading(true);
        try {
            const allZombiesInShop = await CryptoZombiesService.instance.getAllZombiesInShop();
            
            setAllZombiesInShop(allZombiesInShop);
        } catch (error: any) {
            notification.error({
                message: 'Error in get all zombies in shop',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const buyZombie = useCallback(async (zombieId: number, price: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.buyZombie(zombieId, price);
            getAllZombiesInShop();
        } catch (error: any) {
            notification.error({
                message: 'Error in buy shop zombie',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return CryptoZombiesService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ allZombiesInShop, getZombieById, buyZombie }), [allZombiesInShop]);

    return (
        <MarketplaceContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </MarketplaceContext.Provider>
    )
}

export default MarketplaceContextProvider;