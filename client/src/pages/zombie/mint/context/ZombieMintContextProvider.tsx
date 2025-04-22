import { notification, Spin } from "antd";
import { Contract, formatEther } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import CryptoZombiesService from "src/store/services/contract/cryptoZombies/CryptozombiesBattleService";

interface IZombieMintContext {
    mintFee: string
    mint: (name: string) => void
}

const ZombieMintContext = createContext<IZombieMintContext>({} as IZombieMintContext);

export const useZombieMintContext = () => {
    const context = useContext(ZombieMintContext);
    if (!context) {
        throw new Error("useZombieMintContext must be used within an ZombieMintContextProvider");
    }
    return context;
}

const ZombieMintContextProvider = ({ children }: { children: ReactNode }) => {
    const { address } = useAuthContext();
    const navigate = useNavigate();
    const contract = useRef<Contract>();
    const [loading, setLoading] = useState(false);
    const [mintFee, setMintFee] = useState('');

    useEffect(() => {
        addEventListener();
        getMintFee();
        
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
                Paths.ZOMBIE_MINTED
                    .replace(':id', zombieId.toString())
                    .replace(':name', name)
                    .replace(':dna', dna.toString())
            )
        }
    }, []);
    
    const getMintFee = useCallback(async () => {
        setLoading(true);
        try {
            const mintFee = await CryptoZombiesService.instance.getMintFee();
            setMintFee(formatEther(mintFee));
        } catch (error: any) {
            notification.error({
                message: 'Error in get mint fee',
                description: error.reason || 'Error generic'
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const mint = useCallback(async (name: string) => {
        setLoading(true);
        try {
            await CryptoZombiesService.instance.mint(name);
        } catch (error: any) {
            notification.error({
                message: 'Error in mint zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, []);

    const contextValue = useMemo(() => ({ mintFee, mint }), [mintFee]);

    return (
        <ZombieMintContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieMintContext.Provider>
    )
}

export default ZombieMintContextProvider;