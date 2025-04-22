import React from "react";
import ZombieAbout from "./ZombieAbout";
import ZombieAboutContextProvider from "./context/ZombieAboutContextProvider";

export const ZombieAboutPage: React.FC = () => {
    return (
        <ZombieAboutContextProvider>
            <ZombieAbout />
        </ZombieAboutContextProvider>
    );
}
