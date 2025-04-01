import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieCreateSuccessContext {
}

const ZombieCreateSuccessContext = createContext<IZombieCreateSuccessContext>({} as IZombieCreateSuccessContext);

export const useZombieCreateSuccessContext = () => {
    const context = useContext(ZombieCreateSuccessContext);
    if (!context) {
        throw new Error("useZombieCreateSuccessContext must be used within an ZombieCreateSuccessContextProvider");
    }
    return context;
}

const ZombieCreateSuccessContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieCreateSuccessContext.Provider value={contextValue}>
            {children}
        </ZombieCreateSuccessContext.Provider>
    )
}

export default ZombieCreateSuccessContextProvider;