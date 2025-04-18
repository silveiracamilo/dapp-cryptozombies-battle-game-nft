import { notification } from "antd";
import { ethers } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface IAuthContext {
    address: string
    setAddress: React.Dispatch<React.SetStateAction<string>>
    doAuth: () => Promise<void>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [address, setAddress] = useState<string>("");

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
    }, [setAddress]);

    const contextValue = useMemo(() => ({ address, setAddress, doAuth }), [address, setAddress]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
