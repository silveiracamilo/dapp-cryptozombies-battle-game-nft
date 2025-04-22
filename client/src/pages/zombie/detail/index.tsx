import React from "react";
import ZombieDetail from "./ZombieDetail";
import ZombieDetailContextProvider from "./context/ZombieDetailContextProvider";

export const ZombieDetailPage: React.FC = () => {
    return (
        <ZombieDetailContextProvider>
            <ZombieDetail />
        </ZombieDetailContextProvider>
    );
}
