import React from "react";
import ZombieFeeding from "./ZombieFeeding";
import ZombieFeedingContextProvider from "./context/ZombieFeedingContextProvider";

export const ZombieFeedingPage: React.FC = () => {
    return (
        <ZombieFeedingContextProvider>
            <ZombieFeeding />
        </ZombieFeedingContextProvider>
    );
}
