import { notification, Spin } from "antd";
import { formatEther } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Paths } from "src/router/RouteConsts";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [mintFee, setMintFee] = useState('');

    useEffect(() => {
        getMintFee();
    }, []);
    
    const getMintFee = useCallback(async () => {
        setLoading(true);
        try {
            const mintFee = await CryptozombiesBattleService.instance.getMintFee();
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
            const result = await CryptozombiesBattleService.instance.mint(name);
            navigate(
                Paths.ZOMBIE_MINTED
                    .replace(':id', result.zombieId.toString())
                    .replace(':name', name)
                    .replace(':dna', result.dna.toString())
            )
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