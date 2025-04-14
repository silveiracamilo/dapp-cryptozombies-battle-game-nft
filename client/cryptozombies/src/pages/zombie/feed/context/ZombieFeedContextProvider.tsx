import { notification, Spin } from "antd";
import { Contract } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import { useGetKittiesQuery } from "src/store/cryptokitties/api";
import { IKitty } from "src/store/interface/cryptokitties/IKitty";
import { IZombie } from "src/store/interface/zombie/IZombie";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface IZombieFeedContext {
    zombie: IZombie | undefined
    kitties: IKitty[] | undefined
    isKittiesLoading: boolean
    feedOnKitty: (kittyGenes: string, kittyId: number) => Promise<void>
}

const ZombieFeedContext = createContext<IZombieFeedContext>({} as IZombieFeedContext);

export const useZombieFeedContext = () => {
    const context = useContext(ZombieFeedContext);
    if (!context) {
        throw new Error("useZombieFeedContext must be used within an ZombieFeedContextProvider");
    }
    return context;
}

const ZombieFeedContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();
    const [loading, setLoading] = useState(false);
    const contract = useRef<Contract>();
    const {
        data: kitties,
        isLoading: isKittiesLoading,
    } = useGetKittiesQuery();

    useEffect(() => {
        if (id) {
            getZombieById();
        }
    }, [id]);

    useEffect(() => {
        addEventListener();
        
        return () => {
            removeEventListener();
        }
    }, []);

    const addEventListener = useCallback(async () => {
        const ctct = await CryptoZombiesService.instance.getContract();
        ctct.on('onFeed', handleOnFeed);
        contract.current = ctct;
    }, []);

    const removeEventListener = useCallback(() => {
        if(contract.current) {
            contract.current.off('onFeed', handleOnFeed);
        }
    }, []);

    const handleOnFeed = useCallback((from: string, fromDna: number, targetDna: number, kittyId: number, newDna: number) => {
        if (from === address) {
            navigate(
                Paths.ZOMBIE_FEEDING
                    .replace(':fromDna', fromDna.toString())
                    .replace(':targetDna', targetDna.toString())
                    .replace(':kittyId', kittyId.toString())
                    .replace(':newDna', newDna.toString())
            )
        }
    }, []);

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
    }, [id]);

    const feedOnKitty = useCallback(async (kittyGenes: string, kittyId: number) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.feedOnKitty(+id, parseInt(kittyGenes.substring(0, 16)), kittyId);
        } catch (error: any) {
            notification.error({
                message: 'Error in feed zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, [id]);

    const contextValue = useMemo(() => ({ 
        zombie, 
        kitties,
        isKittiesLoading,
        feedOnKitty,
    }), [zombie, feedOnKitty, kitties, isKittiesLoading]);

    return (
        <ZombieFeedContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieFeedContext.Provider>
    )
}

export default ZombieFeedContextProvider;