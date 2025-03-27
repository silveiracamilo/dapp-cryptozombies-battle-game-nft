import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieCreateContext {
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

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieCreateContext.Provider value={contextValue}>
            {children}
        </ZombieCreateContext.Provider>
    )
}

export default ZombieCreateContextProvider;