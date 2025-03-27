import React from "react";
import LoginContextProvider from "./context/LoginContextProvider";
import Login from "./Login";

export const LoginPage: React.FC = () => {
    return (
        <LoginContextProvider>
            <Login />
        </LoginContextProvider>
    );
}
