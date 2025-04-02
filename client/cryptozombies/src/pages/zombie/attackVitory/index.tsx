import React from "react";
import ZombieAttackVitory from "./ZombieAttackVitory";
import ZombieAttackVitoryContextProvider from "./context/ZombieAttackVitoryContextProvider";

export const ZombieAttackVitoryPage: React.FC = () => {
    return (
        <ZombieAttackVitoryContextProvider>
            <ZombieAttackVitory />
        </ZombieAttackVitoryContextProvider>
    );
}
