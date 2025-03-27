import { createContext, ReactNode, useContext, useMemo } from "react";

interface IZombieFeedingContext {
}

const ZombieFeedingContext = createContext<IZombieFeedingContext>({} as IZombieFeedingContext);

export const useZombieFeedingContext = () => {
    const context = useContext(ZombieFeedingContext);
    if (!context) {
        throw new Error("useZombieFeedingContext must be used within an ZombieFeedingContextProvider");
    }
    return context;
}

const ZombieFeedingContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <ZombieFeedingContext.Provider value={contextValue}>
            {children}
        </ZombieFeedingContext.Provider>
    )
}

export default ZombieFeedingContextProvider;