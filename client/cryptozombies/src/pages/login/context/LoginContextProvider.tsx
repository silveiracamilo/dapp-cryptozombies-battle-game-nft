import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { ethers } from 'ethers';
import { notification } from 'antd';
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { useNavigate } from "react-router";

interface ILoginContext {
    doAuth: () => void;
}

const LoginContext = createContext<ILoginContext>({} as ILoginContext);

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLoginContext must be used within an LoginContextProvider");
    }
    return context;
}

const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    const { setAddress } = useAuthContext();
    const navigate = useNavigate();

    const doAuth = useCallback(async () => {
        if (typeof window.ethereum === 'undefined') {
            notification.warning({
                message: 'No Ethereum provider found',
                description: <p>Please install a browser wallet, something like: Metamask, Taho, Phantom, Coinbase and TrustWallet</p>
            });
            return;
        } 
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myAddress = await signer.getAddress();
        setAddress(myAddress);
        navigate('/');
    }, [setAddress]);

    const contextValue = useMemo(() => ({ doAuth }), [doAuth]);

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;