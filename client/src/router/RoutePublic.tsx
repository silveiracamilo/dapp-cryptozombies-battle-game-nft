import { ReactElement } from "react";
import { Outlet } from "react-router";;
import LayoutAuthentication from "@/template/LayoutAuthentication";

const withLayoutAuthentication = (children: ReactElement) => {
    return <LayoutAuthentication>{children}</LayoutAuthentication>;
}

const RoutePublic = () => {
    return withLayoutAuthentication(<Outlet />);
}

export default RoutePublic;
