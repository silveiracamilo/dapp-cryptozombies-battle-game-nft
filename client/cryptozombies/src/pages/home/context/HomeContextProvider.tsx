import { notification } from "antd";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import { IZombie } from "src/store/interface/zombie/IZombie";
import ContractService from "src/store/services/ContractService";

interface IHomeContext {
    zombiesId: number[]
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
    const navigate = useNavigate();
    const [zombiesId, setZombiesId] = useState<number[]>([]);
    const isFirst = useRef(true);

    useEffect(() => {
        if (isFirst.current) {
            start();
            isFirst.current = false;
        }
    }, []);

    const start = useCallback(async () => {
        try {
            const zombies = await ContractService.instance.getZombiesByOwner(address);
            if (!zombies?.length) {
                navigate(Paths.ZOMBIE_CREATE);
            } else {
                setZombiesId([...zombies]);
            }
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies',
                description: error.reason || 'Error generic'
            });
            navigate(Paths.ZOMBIE_CREATE);
        }
    }, []);

    const getZombieById = useCallback(async (id: number) => {
        return ContractService.instance.getZombieById(id);
    }, []);

    const contextValue = useMemo(() => ({ zombiesId, getZombieById }), [zombiesId]);

    return (
        <HomeContext.Provider value={contextValue}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;