import { createContext, ReactNode, useContext, useMemo } from "react";

interface IRankingContext {
}

const RankingContext = createContext<IRankingContext>({} as IRankingContext);

export const useRankingContext = () => {
    const context = useContext(RankingContext);
    if (!context) {
        throw new Error("useRankingContext must be used within an RankingContextProvider");
    }
    return context;
}

const RankingContextProvider = ({ children }: { children: ReactNode }) => {

    const contextValue = useMemo(() => ({ }), []);

    return (
        <RankingContext.Provider value={contextValue}>
            {children}
        </RankingContext.Provider>
    )
}

export default RankingContextProvider;