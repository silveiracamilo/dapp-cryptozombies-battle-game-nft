import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieAttackContext {
}

const ZombieAttackContext = createContext<IZombieAttackContext>({} as IZombieAttackContext);

export const useZombieAttackContext = () => {
    const context = useContext(ZombieAttackContext);
    if (!context) {
        throw new Error("useZombieAttackContext must be used within an ZombieAttackContextProvider");
    }
    return context;
}

const ZombieAttackContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieAttackContext.Provider value={contextValue}>
            {children}
        </ZombieAttackContext.Provider>
    )
}

export default ZombieAttackContextProvider;