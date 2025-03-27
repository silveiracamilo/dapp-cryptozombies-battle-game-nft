import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieBattleContext {
}

const ZombieBattleContext = createContext<IZombieBattleContext>({} as IZombieBattleContext);

export const useZombieBattleContext = () => {
    const context = useContext(ZombieBattleContext);
    if (!context) {
        throw new Error("useZombieBattleContext must be used within an ZombieBattleContextProvider");
    }
    return context;
}

const ZombieBattleContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieBattleContext.Provider value={contextValue}>
            {children}
        </ZombieBattleContext.Provider>
    )
}

export default ZombieBattleContextProvider;