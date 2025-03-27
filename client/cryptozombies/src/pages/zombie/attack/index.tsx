import React from "react";
import ZombieAttack from "./ZombieAttack";
import ZombieAttackContextProvider from "./context/ZombieAttackContextProvider";

export const ZombieAttackPage: React.FC = () => {
    return (
        <ZombieAttackContextProvider>
            <ZombieAttack />
        </ZombieAttackContextProvider>
    );
}
