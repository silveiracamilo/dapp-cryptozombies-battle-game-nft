import { isEmpty } from "lodash";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import LayoutAuthentication from "src/template/LayoutAuthentication";

const withLayoutAuthentication = (children: ReactElement) => {
    return <LayoutAuthentication>{children}</LayoutAuthentication>;
}

const RoutePrivate = () => {
    const { address } = useAuthContext();

    // useEffect(() => {
    //     if (address) {
    //         navigate(Paths.HOME);
    //     }
    // }, [address]);

    if (isEmpty(address)) {
        return <Navigate to="/login" replace={true} />;
    }

    return withLayoutAuthentication(<Outlet />);
}

export default RoutePrivate;
