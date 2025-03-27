import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieFeedContext {
}

const ZombieFeedContext = createContext<IZombieFeedContext>({} as IZombieFeedContext);

export const useZombieFeedContext = () => {
    const context = useContext(ZombieFeedContext);
    if (!context) {
        throw new Error("useZombieFeedContext must be used within an ZombieFeedContextProvider");
    }
    return context;
}

const ZombieFeedContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieFeedContext.Provider value={contextValue}>
            {children}
        </ZombieFeedContext.Provider>
    )
}

export default ZombieFeedContextProvider;