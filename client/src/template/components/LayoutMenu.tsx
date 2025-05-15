import { useCallback, useEffect, useMemo, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { findIndex, map } from "lodash";
import { Paths } from "src/router/RouteConsts";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { OWNER_ADDRESS } from "src/store/Constants";

const LayoutMenu = () => {
    const navigate = useNavigate();
    const { address } = useAuthContext();
    const { pathname } = useLocation();
    const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
    const items = useMemo(() => [
        { label: "Play to Earn", route: Paths.HOME },
        { label: "Mint", route: Paths.ZOMBIE_MINT },
        { label: "Mint Free", route: Paths.ZOMBIE_MINT_FREE },
        { label: "Marketplace", route: Paths.MARKETPLACE },
        { label: "Ranking", route: Paths.RANKING },
        { label: "Learn to play", route: Paths.LEARN_TO_PLAY },
        { label: "About", route: Paths.ABOUT },
        ...(address === OWNER_ADDRESS ? [
            { label: "Settings", route: Paths.ADMIN_SETTINGS },
        ] : [])
    ], [address]);
    const menuItems = useMemo(
        () => map(items, ({ label }, i) => ({ key: i + 1, label })), 
        [items]
    );

    useEffect(() => {
        const indexItem = findIndex(items, ({ route }) => route === pathname);
        if (!isNaN(indexItem)) {
            setSelectedKeys([(indexItem + 1).toString()]);
        }
    }, [pathname]);

    const onClickMenu: MenuProps['onClick'] = useCallback((e: any) => {
        const item = items[+e.key - 1];
        item && navigate(item.route);
    }, [items]);

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={onClickMenu}
            style={{ flex: 1, minWidth: 0, background: '#000' }}
        />
    )
}

export default LayoutMenu;
