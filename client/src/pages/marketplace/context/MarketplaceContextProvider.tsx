import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "@/router/RouteConsts";
import IZombieSale from "@/store/interface/marketplace/IZombieSale";
import { IZombie } from "@/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "@/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import CryptozombiesBattleMarketService from "@/store/services/contract/cryptozombiesBattleMarket/CryptozombiesBattleMarketService";
import { ERROR_PAGE_OUT_OF_RANGE } from "@/utils/error/Constants";

interface IMarketplaceContext {
    allZombiesInShop: IZombieSale[]
    total: number
    pageSize: number
    getZombiesInShop: (page: number) => Promise<void>
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
    const [total, setTotal] = useState(0);
    const pageSize = useMemo(() => 18, []);
    const navigate = useNavigate();

    useEffect(() => {
        getZombiesInShopTotal();
        getZombiesInShop(1);
    }, []);

    const getZombiesInShopTotal = useCallback(async () => {
        setLoading(true);
        try {
            const total = await CryptozombiesBattleMarketService.instance.getZombiesInShopTotal();
            setTotal(+total.toString());
        } catch (error: any) {
            if(error.reason !== ERROR_PAGE_OUT_OF_RANGE) {
                notification.error({
                    message: 'Error in get zombies in shop total',
                    description: error.reason || 'Error generic'
                });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const getZombiesInShop = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const allZombiesInShop = await CryptozombiesBattleMarketService.instance.getZombiesInShop((page - 1), pageSize);
            setAllZombiesInShop(allZombiesInShop);
        } catch (error: any) {
            if(error.reason !== ERROR_PAGE_OUT_OF_RANGE) {
                notification.error({
                    message: 'Error in get all zombies in shop',
                    description: error.reason || 'Error generic'
                });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const buyZombie = useCallback(async (zombieId: number, price: bigint) => {
        setLoading(true);
        try {
            await CryptozombiesBattleMarketService.instance.buyZombie(zombieId, price);
            setTimeout(() => navigate(Paths.HOME), 1000);
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
        return CryptozombiesBattleService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ 
        total,
        pageSize,
        allZombiesInShop,
        getZombiesInShop,
        getZombieById,
        buyZombie,
     }), [total, allZombiesInShop]);

    return (
        <MarketplaceContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </MarketplaceContext.Provider>
    )
}

export default MarketplaceContextProvider;