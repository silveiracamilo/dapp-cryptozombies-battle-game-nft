import React from "react";
import Marketplace from "./Marketplace";
import MarketplaceContextProvider from "./context/MarketplaceContextProvider";

export const MarketplacePage: React.FC = () => {
    return (
        <MarketplaceContextProvider>
            <Marketplace />
        </MarketplaceContextProvider>
    );
}
