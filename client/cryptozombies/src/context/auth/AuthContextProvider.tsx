import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface IAuthContext {
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
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

    // useEffect(() => {
    //     checkHasConnected();
    // }, []);

    // const checkHasConnected = async () => {
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //     const signer = await provider.getSigner();
    //     const myAddress = await signer.getAddress();
    //     if (myAddress) {
    //         setAddress(myAddress);
    //     }
    // }

    const contextValue = useMemo(
        () => ({ address, setAddress }), 
        [address, setAddress]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
