import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieDetailContext {
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

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieDetailContext.Provider value={contextValue}>
            {children}
        </ZombieDetailContext.Provider>
    )
}

export default ZombieDetailContextProvider;