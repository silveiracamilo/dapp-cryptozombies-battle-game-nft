import { notification } from "antd";
import { ethers } from "ethers";
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";

interface IAuthContext {
    address: string
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
            notification.error({
                message: 'No Ethereum provider found',
                description: 'Please install a browser wallet, something like: Metamask, Taho, Phantom, Coinbase or TrustWallet'
            });
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const network = await signer.provider.getNetwork();

        if (network.chainId !== BigInt(import.meta.env.VITE_CHAIN_ID)) {
            notification.error({
                message: 'Network incompatible',
                description: `Please use network: ${import.meta.env.VITE_NETWORK_NAME} (chainID: ${import.meta.env.VITE_CHAIN_ID})`
            });
            return;
        }
        
        setAddress(signer.address);
    }, []);

    const contextValue = useMemo(() => ({ address, doAuth }), [address]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
