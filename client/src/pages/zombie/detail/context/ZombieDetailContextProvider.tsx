import { notification, Spin } from "antd";
import { parseEther } from "ethers";
import { orderBy } from "lodash";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";
import { IBuy, ICancelSale, ISale } from "src/store/interface/marketplace/MarketEvents";
import { IZombie } from "src/store/interface/zombie/IZombie";
import IZombieFees from "src/store/interface/zombie/IZombieFees";
import { ZombieActivitiesType, INewZombie } from "src/store/interface/zombie/ZombieEvents";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import CryptozombiesBattleMarketService from "src/store/services/contract/cryptozombiesBattleMarket/CryptozombiesBattleMarketService";

interface IZombieDetailContext {
    zombie: IZombie | undefined;
    zombieSale: IZombieSale | undefined
    fees: IZombieFees
    loading: boolean;
    loadingActivities: boolean;
    levelUp: () => Promise<void>
    changeName: (newName: string) => Promise<void>
    changeDna: (newDna: number) => Promise<void>
    saleZombie: (zombieId: number, price: bigint) => Promise<void>
    cancelSaleZombie: (zombieId: number) => Promise<void>
    activities: ZombieActivitiesType
}

const ZombieDetailContext = createContext<IZombieDetailContext>({} as IZombieDetailContext);

export const useZombieDetailContext = () => {
    const context = useContext(ZombieDetailContext);
    if (!context) {
        throw new Error("useZombieDetailContext must be used within an ZombieDetailContextProvider");
    }
    return context;
}

const ZombieDetailContextProvider = ({ children }: { children: ReactNode }) => {
    const { id = '' } = useParams();
    const [zombie, setZombie] = useState<IZombie>();
    const [fees, setFees] = useState<IZombieFees>({ 
        tax: parseEther('0.00001'),
        minPrice: parseEther('0.000015'),
        levelUpFee: parseEther('0.001'),
        changeNameFee: parseEther('0.002'),
        changeDNAFee: parseEther('0.004'),
    } as IZombieFees);
    const [loading, setLoading] = useState(false);
    const [loadingActivities, setLoadingActivities] = useState(false);
    const [zombieSale, setZombieSale] = useState<IZombieSale>();
    const [activities, setActivities] = useState<(INewZombie | ISale | ICancelSale | IBuy)[]>([]);

    useEffect(() => {
        getFees();
    }, []);

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
    
    const getFees = useCallback(async () => {
        try {
            const marketFees = await CryptozombiesBattleMarketService.instance.getFees();
            const zombieFees = await Promise.all([
                CryptozombiesBattleService.instance.getLevelUpFee(),
                CryptozombiesBattleService.instance.getChangeNameFee(),
                CryptozombiesBattleService.instance.getChangeDNAFee(),
            ]);
            const [levelUpFee, changeNameFee, changeDNAFee] = zombieFees;
            const fees = {
                levelUpFee,
                changeNameFee,
                changeDNAFee,
                ...marketFees,
            }
            setFees(fees);
        } catch (error: any) {
            notification.error({
                message: 'Error in get fees',
                description: error.reason || 'Error generic'
            });
        }
    }, []);
    
    const levelUp = useCallback(async () => {
        setLoading(true);
        try {
            await CryptozombiesBattleService.instance.levelUp(+id);
            await getZombieById();
        } catch (error: any) {
            notification.error({
                message: 'Error in level up',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const changeName = useCallback(async (newName: string = 'Camilo Novo') => {
        setLoading(true);
        try {
            await CryptozombiesBattleService.instance.changeName(+id, newName);
            await getZombieById();
        } catch (error: any) {
            notification.error({
                message: 'Error in change name',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const changeDna = useCallback(async (newDna: number = 3169225795162389) => {
        setLoading(true);
        try {
            await CryptozombiesBattleService.instance.changeDna(+id, newDna);
            await getZombieById();
        } catch (error: any) {
            notification.error({
                message: 'Error in change dna',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const saleZombie = useCallback(async (zombieId: number, price: bigint) => {
        setLoading(true);
        try {
            await CryptozombiesBattleMarketService.instance.saleZombie(zombieId, price);
            getZombieById();
            getSalesAndBuys();
        } catch (error: any) {
            notification.error({
                message: 'Error in sale my zombie',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);
    
    const cancelSaleZombie = useCallback(async (zombieId: number) => {
        setLoading(true);
        try {
            await CryptozombiesBattleMarketService.instance.cancelSaleZombie(zombieId);
            getZombieById();
            getSalesAndBuys();
        } catch (error: any) {
            notification.error({
                message: 'Error in sale my zombie',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

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


    const contextValue = useMemo(() => ({ 
        zombie,
        zombieSale,
        fees,
        loading,
        loadingActivities,
        levelUp,
        changeName,
        changeDna,
        saleZombie,
        cancelSaleZombie,
        activities,
     }), [zombie, zombieSale, fees, loading, activities]);

    return (
        <ZombieDetailContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieDetailContext.Provider>
    )
}

export default ZombieDetailContextProvider;

