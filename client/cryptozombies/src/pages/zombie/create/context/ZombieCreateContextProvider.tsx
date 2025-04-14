import { notification, Spin } from "antd";
import { Contract } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import CryptoZombiesService from "src/store/services/contract/cryptoZombie/CryptoZombiesService";

interface IZombieCreateContext {
    create: (name: string) => void
}

const ZombieCreateContext = createContext<IZombieCreateContext>({} as IZombieCreateContext);

export const useZombieCreateContext = () => {
    const context = useContext(ZombieCreateContext);
    if (!context) {
        throw new Error("useZombieCreateContext must be used within an ZombieCreateContextProvider");
    }
    return context;
}

const ZombieCreateContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const navigate = useNavigate();
    const contract = useRef<Contract>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        addEventListener();
        
        return () => {
            removeEventListener();
        }
    }, []);

    const addEventListener = useCallback(async () => {
        const ctct = await CryptoZombiesService.instance.getContract();

        // const eventTopic = ethers.id("NewZombie(address,uint,string,uint)");
        // const ownerAddress = address; // Endereço do owner
        // const filter = {
        //     address: CryptoZombiesService.instance.contractAddress, // Opcional: filtra eventos apenas deste contrato
        //     topics: [
        //         eventTopic, // Tópico do evento
        //         ethers.zeroPadValue(ownerAddress, 32) // Filtra eventos onde `from == owner`
        //     ]
        // };


        ctct.on('NewZombie', handleNewZombie);
        // CryptoZombiesService.instance.provider.on(filter, handleNewZombie);
        contract.current = ctct;
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
                Paths.ZOMBIE_CREATE_SUCCESS
                    .replace(':id', zombieId.toString())
                    .replace(':name', name)
                    .replace(':dna', dna.toString())
            )
        }
    }, []);
    

    const create = useCallback(async (name: string) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.createRandomZombie(name);
        } catch (error: any) {
            notification.error({
                message: 'Error in create zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ create }), []);

    return (
        <ZombieCreateContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieCreateContext.Provider>
    )
}

export default ZombieCreateContextProvider;