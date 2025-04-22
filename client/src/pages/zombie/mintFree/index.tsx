import React from "react";
import ZombieMintFree from "./ZombieMintFree";
import ZombieMintFreeContextProvider from "./context/ZombieMintFreeContextProvider";

export const ZombieMintFreePage: React.FC = () => {
    return (
        <ZombieMintFreeContextProvider>
            <ZombieMintFree />
        </ZombieMintFreeContextProvider>
    );
}
