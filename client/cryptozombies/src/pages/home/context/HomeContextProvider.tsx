import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { ethers } from 'ethers';
import { notification } from 'antd';
import { useAuthContext } from "src/context/auth/AuthContextProvider";

interface IHomeContext {
    doAuth: () => void;
}

const HomeContext = createContext<IHomeContext>({} as IHomeContext);

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    if (!context) {
        throw new Error("useHomeContext must be used within an HomeContextProvider");
    }
    return context;
}

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
    const { setAddress } = useAuthContext();

    const doAuth = useCallback(async () => {
        console.log('doAuth window.ethereum: ', window.ethereum);
        let signer = null;
        let provider;
        if (typeof window.ethereum === 'undefined') {
            notification.warning({
                message: 'MetaMask not installed.',
                description: <p>Please install MetaMask.</p>
            });
            // provider = ethers.getDefaultProvider();
        } else {
            provider = new ethers.BrowserProvider(window.ethereum)
            signer = await provider.getSigner();
            const myAddress = await signer.getAddress();
            console.log('myAddress: ', myAddress);
            setAddress(myAddress);
        }
    }, []);

    const contextValue = useMemo(() => ({ doAuth }), []);

    return (
        <HomeContext.Provider value={contextValue}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;