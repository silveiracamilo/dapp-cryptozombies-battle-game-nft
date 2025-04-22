import React from "react";
import Settings from "./Settings";
import SettingsContextProvider from "./context/SettingsContextProvider";

export const SettingsPage: React.FC = () => {
    return (
        <SettingsContextProvider>
            <Settings />
        </SettingsContextProvider>
    );
}
