import { notification, Spin } from "antd";
import { Contract } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

interface IZombieMintFreeContext {
    mintFree: () => void
}

const ZombieMintFreeContext = createContext<IZombieMintFreeContext>({} as IZombieMintFreeContext);

export const useZombieMintFreeContext = () => {
    const context = useContext(ZombieMintFreeContext);
    if (!context) {
        throw new Error("useZombieMintFreeContext must be used within an ZombieMintFreeContextProvider");
    }
    return context;
}

const ZombieMintFreeContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const navigate = useNavigate();
    const contract = useRef<Contract>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // addEventListener();
        
        return () => {
            removeEventListener();
        }
    }, []);

    const addEventListener = useCallback(async () => {
        const ctct = await CryptozombiesBattleService.instance.getContract();
        contract.current = ctct;
        ctct.on('NewZombie', handleNewZombie);
    }, []);

    const removeEventListener = useCallback(() => {
        if(contract.current) {
            contract.current.off('NewZombie', handleNewZombie);
        }
    }, []);

    const handleNewZombie = useCallback((from: string, zombieId: number, name: string, dna: number) => {
        if (from === address) {
            removeEventListener();
            navigate(
                Paths.ZOMBIE_MINTED
                    .replace(':id', zombieId.toString())
                    .replace(':name', name)
                    .replace(':dna', dna.toString())
            )
        }
    }, []);

    const mintFree = useCallback(async () => {
        setLoading(true);
        try {
            addEventListener();
            await CryptozombiesBattleService.instance.mintFree();
        } catch (error: any) {
            notification.error({
                message: 'Error in mint free zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ mintFree }), []);

    return (
        <ZombieMintFreeContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieMintFreeContext.Provider>
    )
}

export default ZombieMintFreeContextProvider;