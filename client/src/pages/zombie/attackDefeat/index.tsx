import React from "react";
import ZombieAttackDefeat from "./ZombieAttackDefeat";
import ZombieAttackDefeatContextProvider from "./context/ZombieAttackDefeatContextProvider";

export const ZombieAttackDefeatPage: React.FC = () => {
    return (
        <ZombieAttackDefeatContextProvider>
            <ZombieAttackDefeat />
        </ZombieAttackDefeatContextProvider>
    );
}
