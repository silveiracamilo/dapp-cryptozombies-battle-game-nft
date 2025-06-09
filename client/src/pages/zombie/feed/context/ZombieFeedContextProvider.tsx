import { notification, Spin } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Paths } from "@/router/RouteConsts";
import { useGetKittiesQuery } from "@/store/api/cryptokitties/api";
import { IKitty } from "@/store/interface/cryptokitties/IKitty";
import { IZombie } from "@/store/interface/zombie/IZombie";
import CryptozombiesBattleService from "@/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

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
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();
    const [loading, setLoading] = useState(false);
    const {
        data: kitties,
        isLoading: isKittiesLoading,
    } = useGetKittiesQuery();

    useEffect(() => {
        if (id) {
            getZombieById();
        }
    }, [id]);

    const getZombieById = useCallback(async () => {
        try {
            const zombie = await CryptozombiesBattleService.instance.getZombieById(+id);
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
            const result = await CryptozombiesBattleService.instance.feedOnKitty(+id, parseInt(kittyGenes.substring(0, 16)), kittyId);
            navigate(
                Paths.ZOMBIE_FEEDING
                    .replace(':fromDna', result.fromDna.toString())
                    .replace(':targetDna', result.targetDna.toString())
                    .replace(':kittyId', result.kittyId.toString())
                    .replace(':newDna', result.newDna.toString())
            )
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