import React from "react";
import ZombieCreateSuccess from "./CreateSuccess";
import ZombieCreateSuccessContextProvider from "./context/ZombieCreateSuccessContextProvider";

export const ZombieCreateSuccessPage: React.FC = () => {
    return (
        <ZombieCreateSuccessContextProvider>
            <ZombieCreateSuccess />
        </ZombieCreateSuccessContextProvider>
    );
}
