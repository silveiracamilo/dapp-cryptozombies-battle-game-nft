import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { Paths } from "src/router/RouteConsts";
import ContractService from "src/store/services/ContractService";

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
    const navigate = useNavigate();

    const create = useCallback(async (name: string) => {
        await ContractService.instance.createRandomZombie(name);
        navigate(Paths.HOME);
    }, []);

    const contextValue = useMemo(() => ({ create }), []);

    return (
        <ZombieCreateContext.Provider value={contextValue}>
            {children}
        </ZombieCreateContext.Provider>
    )
}

export default ZombieCreateContextProvider;