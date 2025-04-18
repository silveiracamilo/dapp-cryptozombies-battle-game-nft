import React from "react";
import ZombieMinted from "./Minted";
import ZombieMintedContextProvider from "./context/ZombieMintedContextProvider";

export const ZombieMintedPage: React.FC = () => {
    return (
        <ZombieMintedContextProvider>
            <ZombieMinted />
        </ZombieMintedContextProvider>
    );
}
