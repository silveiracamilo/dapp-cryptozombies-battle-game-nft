import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface IZombieDetailContext {
    zombie: IZombie | undefined;
    loading: boolean;
    levelUp: () => Promise<void>
    changeName: (newName: string) => Promise<void>
    changeDna: (newDna: number) => Promise<void>
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            getZombieById();
        }
    }, [id]);

    const getZombieById = useCallback(async () => {
        try {
            const zombie = await CryptoZombiesService.instance.getZombieById(+id);
            setZombie(zombie);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
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


    const contextValue = useMemo(() => ({ 
        zombie,
        loading,
        levelUp,
        changeName,
        changeDna,
     }), [zombie, loading]);

    return (
        <ZombieDetailContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieDetailContext.Provider>
    )
}

export default ZombieDetailContextProvider;

