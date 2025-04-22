import React from "react";
import ZombieBattle from "./ZombieBattle";
import ZombieBattleContextProvider from "./context/ZombieBattleContextProvider";

export const ZombieBattlePage: React.FC = () => {
    return (
        <ZombieBattleContextProvider>
            <ZombieBattle />
        </ZombieBattleContextProvider>
    );
}
