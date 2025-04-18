import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { ethers } from 'ethers';
import { notification } from 'antd';
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { useNavigate, useSearchParams } from "react-router";
import { Paths } from "src/router/RouteConsts";

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
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const returnTo = searchParams.get('returnTo');

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
        navigate(returnTo ? returnTo : Paths.HOME);
    }, [setAddress]);

    const contextValue = useMemo(() => ({ doAuth }), [doAuth]);

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;