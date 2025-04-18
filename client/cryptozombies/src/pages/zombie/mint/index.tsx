import React from "react";
import ZombieMint from "./ZombieMint";
import ZombieMintContextProvider from "./context/ZombieMintContextProvider";

export const ZombieMintPage: React.FC = () => {
    return (
        <ZombieMintContextProvider>
            <ZombieMint />
        </ZombieMintContextProvider>
    );
}
