import { notification, Spin } from "antd";
import { parseEther } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { IZombie } from "src/store/interface/zombie/IZombie";
import IZombieFees from "src/store/interface/zombie/IZombieFees";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface IZombieDetailContext {
    zombie: IZombie | undefined;
    fees: IZombieFees
    loading: boolean;
    levelUp: () => Promise<void>
    changeName: (newName: string) => Promise<void>
    changeDna: (newDna: number) => Promise<void>
    saleMyZombie: (zombieId: number, price: bigint) => Promise<void>
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
    const [fees, setFees] = useState<IZombieFees>({ tax: parseEther('0.00001'), minPrice: parseEther('0.000015') } as IZombieFees);
    const [loading, setLoading] = useState(false);
    const [zombieForSale, setZombieForSale] = useState();

    useEffect(() => {
        if (id) {
            getZombieById();
            getFees();
        }
    }, [id]);

    const getZombieById = useCallback(async () => {
        try {
            const zombie = await CryptoZombiesService.instance.getZombieById(+id);
            setZombie(zombie);

            const zombieInShop = await CryptoZombiesService.instance.getZombieInShop(zombie.id);
            if (zombieInShop) {
                setZombieForSale(zombieInShop);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, []);
    
    const getFees = useCallback(async () => {
        try {
            const fees = await CryptoZombiesService.instance.getFees();
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
            await CryptoZombiesService.instance.levelUp(+id);
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
            await CryptoZombiesService.instance.changeName(+id, newName);
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
            await CryptoZombiesService.instance.changeDna(+id, newDna);
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
    
    const saleMyZombie = useCallback(async (zombieId: number, price: bigint) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.saleMyZombie(zombieId, price);
        } catch (error: any) {
            notification.error({
                message: 'Error in sale my zombie',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);


    const contextValue = useMemo(() => ({ 
        zombie,
        fees,
        loading,
        levelUp,
        changeName,
        changeDna,
        saleMyZombie,
     }), [zombie, fees, loading]);

    return (
        <ZombieDetailContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieDetailContext.Provider>
    )
}

export default ZombieDetailContextProvider;

