import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { zombieMapper } from "src/store/mapper/zombie/ZombieMapper";
import ContractService from "src/store/services/ContractService";

interface IZombieDetailContext {
    zombie: IZombie | undefined;
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

    useEffect(() => {
        if (id) {
            getZombieById();
        }
    }, [id]);

    const getZombieById = useCallback(async () => {
        const zombie = await ContractService.instance.getZombieById(+id);
        setZombie(zombieMapper(zombie));
    }, []);

    const contextValue = useMemo(() => ({ zombie }), [zombie]);

    return (
        <ZombieDetailContext.Provider value={contextValue}>
            {children}
        </ZombieDetailContext.Provider>
    )
}

export default ZombieDetailContextProvider;