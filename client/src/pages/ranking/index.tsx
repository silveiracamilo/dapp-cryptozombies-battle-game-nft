import React from "react";
import Ranking from "./Ranking";
import RankingContextProvider from "./context/RankingContextProvider";

export const RankingPage: React.FC = () => {
    return (
        <RankingContextProvider>
            <Ranking />
        </RankingContextProvider>
    );
}
