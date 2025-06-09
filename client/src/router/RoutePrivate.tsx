import { isEmpty } from "lodash";
import { ReactElement } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthContext } from "@/context/auth/AuthContextProvider";
import LayoutAuthentication from "@/template/LayoutAuthentication";
import { Paths } from "./RouteConsts";

const withLayoutAuthentication = (children: ReactElement) => {
    return <LayoutAuthentication>{children}</LayoutAuthentication>;
}

const RoutePrivate = () => {
    const { address } = useAuthContext();
    const { pathname } = useLocation();

    if (isEmpty(address)) {
        return <Navigate to={`${Paths.LOGIN}${pathname ? `?returnTo=${pathname}` : ''}`} replace={true} />;
    }

    return withLayoutAuthentication(<Outlet />);
}

export default RoutePrivate;
