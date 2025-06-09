import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useAuthContext } from "@/context/auth/AuthContextProvider";
import { useNavigate, useSearchParams } from "react-router";
import { Paths } from "@/router/RouteConsts";

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
    const { doAuth: handleDoAuth } = useAuthContext();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const returnTo = searchParams.get('returnTo');

    const doAuth = useCallback(async () => {
        await handleDoAuth();
        navigate(returnTo ? returnTo : Paths.HOME);
    }, []);

    const contextValue = useMemo(() => ({ doAuth }), [doAuth]);

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;