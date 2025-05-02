import { notification, Spin } from "antd";
import { orderBy } from "lodash";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";
import { IBuy, ICancelSale, ISale } from "src/store/interface/marketplace/MarketEvents";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { INewZombie } from "src/store/interface/zombie/ZombieEvents";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import CryptozombiesBattleMarketService from "src/store/services/contract/cryptozombiesBattleMarket/CryptozombiesBattleMarketService";

interface IZombieAboutContext {
    zombie: IZombie | undefined;
    zombieSale: IZombieSale | undefined
    loading: boolean;
    loadingActivities: boolean;
    activities: (ISale | ICancelSale | IBuy | INewZombie)[]
    buyZombie: (zombieId: number, price: bigint) => Promise<void>
}

const ZombieAboutContext = createContext<IZombieAboutContext>({} as IZombieAboutContext);

export const useZombieAboutContext = () => {
    const context = useContext(ZombieAboutContext);
    if (!context) {
        throw new Error("useZombieAboutContext must be used within an ZombieAboutContextProvider");
    }
    return context;
}

const ZombieAboutContextProvider = ({ children }: { children: ReactNode }) => {
    const { id = '' } = useParams();
    const [zombie, setZombie] = useState<IZombie>();
    const [loading, setLoading] = useState(false);
    const [loadingActivities, setLoadingActivities] = useState(false);
    const [activities, setActivities] = useState<(INewZombie | ISale | ICancelSale | IBuy)[]>([]);
    const [zombieSale, setZombieSale] = useState<IZombieSale>();

    useEffect(() => {
        if (id) {
            getZombieById();
        }
    }, [id]);

    useEffect(() => {
        if (zombie) {
            getSalesAndBuys();
        }
    }, [zombie])

    const getZombieById = useCallback(async () => {
        try {
            const zombie = await CryptozombiesBattleService.instance.getZombieById(+id);
            setZombie(zombie);

            const zombieInShop = await CryptozombiesBattleMarketService.instance.getZombieByIdInSale(zombie.id);
            if (zombieInShop.seller != '0x0000000000000000000000000000000000000000') {
                setZombieSale(zombieInShop);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, [id]);

    const getSalesAndBuys = useCallback(async () => {
        setLoadingActivities(true);
        try {
            const [newZombie, sales, cancelSales, buys] = await Promise.all([
                CryptozombiesBattleService.instance.getLogsNewZombieByZombieId(+id),
                CryptozombiesBattleMarketService.instance.getLogsSaleZombieByZombieId(+id),
                CryptozombiesBattleMarketService.instance.getLogsCancelSaleByZombieId(+id),
                CryptozombiesBattleMarketService.instance.getLogsBuyShopZombieByZombieId(+id),
            ])

            setActivities(
                orderBy([
                    ...newZombie,
                    ...sales, 
                    ...cancelSales,
                    ...buys,
                ], ['timestamp'], ['asc'])
            );
        } catch (error: any) {
            notification.error({
                message: 'Error in get activities',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoadingActivities(false);
        }
    }, [id, zombie]);

    const buyZombie = useCallback(async (zombieId: number, price: bigint) => {
        setLoading(true);
        try {
            await CryptozombiesBattleMarketService.instance.buyZombie(zombieId, price);
            setZombieSale(undefined);
            getZombieById();
            getSalesAndBuys();
        } catch (error: any) {
            notification.error({
                message: 'Error in buy shop zombie',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);


    const contextValue = useMemo(() => ({ 
        zombie,
        zombieSale,
        loading,
        loadingActivities,
        activities,
        buyZombie,
     }), [zombie, zombieSale, loading, activities]);

    return (
        <ZombieAboutContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieAboutContext.Provider>
    )
}

export default ZombieAboutContextProvider;

