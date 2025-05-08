import { notification, Spin } from "antd";
import { isEmpty } from "lodash";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { Paths } from "src/router/RouteConsts";
import { useGetProofAddressQuery } from "src/store/api/cryptozombiesBattle/api";
import { IGetProofAddressResponse } from "src/store/api/cryptozombiesBattle/types";
import CryptozombiesBattleService from "src/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";

interface IZombieMintFreeContext {
    mintFree: () => void
    proofAddress: IGetProofAddressResponse | undefined
    proofAddressLoading: boolean
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
    const [loading, setLoading] = useState(false);
    const {
        data: proofAddress, 
        isLoading: proofAddressLoading
    } = useGetProofAddressQuery(address, { skip: isEmpty(address) });

    const mintFree = useCallback(async () => {
        if (!proofAddress?.valid) {
            notification.error({
                message: 'Account not approved',
                description: 'Finish the proofs'
            });
            return;
        }

        setLoading(true);
        try {
            const result = await CryptozombiesBattleService.instance.mintFree(proofAddress?.proof);
            navigate(
                Paths.ZOMBIE_MINTED
                    .replace(':id', result.zombieId.toString())
                    .replace(':name', result.name)
                    .replace(':dna', result.dna.toString())
            )
        } catch (error: any) {
            notification.error({
                message: 'Error in mint free zombie',
                description: error.reason || 'Error generic'
            });
            setLoading(false);
        }
    }, [proofAddress]);

    const contextValue = useMemo(() => ({
        mintFree,
        proofAddress,
        proofAddressLoading
    }), [proofAddress, proofAddressLoading]);

    return (
        <ZombieMintFreeContext.Provider value={contextValue}>
            <Spin spinning={loading}>
                {children}
            </Spin>
        </ZombieMintFreeContext.Provider>
    )
}

export default ZombieMintFreeContextProvider;