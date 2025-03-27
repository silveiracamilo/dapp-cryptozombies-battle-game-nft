import React from "react";
import ZombieFeed from "./ZombieFeed";
import ZombieFeedContextProvider from "./context/ZombieFeedContextProvider";

export const ZombieFeedPage: React.FC = () => {
    return (
        <ZombieFeedContextProvider>
            <ZombieFeed />
        </ZombieFeedContextProvider>
    );
}
