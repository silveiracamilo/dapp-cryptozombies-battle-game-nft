import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieMintedContext {
}

const ZombieMintedContext = createContext<IZombieMintedContext>({} as IZombieMintedContext);

export const useZombieMintedContext = () => {
    const context = useContext(ZombieMintedContext);
    if (!context) {
        throw new Error("useZombieMintedContext must be used within an ZombieMintedContextProvider");
    }
    return context;
}

const ZombieMintedContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieMintedContext.Provider value={contextValue}>
            {children}
        </ZombieMintedContext.Provider>
    )
}

export default ZombieMintedContextProvider;