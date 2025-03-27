import React from "react";
import HomeContextProvider from "./context/HomeContextProvider";
import Home from "./Home";

export const HomePage: React.FC = () => {
    return (
        <HomeContextProvider>
            <Home />
        </HomeContextProvider>
    );
}
