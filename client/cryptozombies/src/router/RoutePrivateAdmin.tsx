import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import LayoutAuthentication from "src/template/LayoutAuthentication";
import { Paths } from "./RouteConsts";
import { OWNER_ADDRESS } from "src/store/Constants";

const withLayoutAuthentication = (children: ReactElement) => {
    return <LayoutAuthentication>{children}</LayoutAuthentication>;
}

const RoutePrivateAdmin = () => {
    const { address } = useAuthContext();

    if (address !== OWNER_ADDRESS) {
        return <Navigate to={Paths.HOME} replace={true} />;
    }

    return withLayoutAuthentication(<Outlet />);
}

export default RoutePrivateAdmin;
