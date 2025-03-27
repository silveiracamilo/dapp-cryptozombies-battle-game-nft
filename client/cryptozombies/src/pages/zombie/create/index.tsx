import React from "react";
import ZombieCreate from "./ZombieCreate";
import ZombieCreateContextProvider from "./context/ZombieCreateContextProvider";

export const ZombieCreatePage: React.FC = () => {
    return (
        <ZombieCreateContextProvider>
            <ZombieCreate />
        </ZombieCreateContextProvider>
    );
}
