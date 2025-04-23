import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { ConfigProvider, Image, Layout, Menu, MenuProps } from "antd";
import logo from "assets/images/cryptozombies-logo.png";
import { useLocation, useNavigate } from "react-router";
import { findIndex, map } from "lodash";
import { Paths } from "src/router/RouteConsts";
import AccountDropdown from "src/components/account/AccountDropdown";
import styled from "styled-components";
import { useAuthContext } from "src/context/auth/AuthContextProvider";
import { OWNER_ADDRESS } from "src/store/Constants";

const { Header, Content, Footer } = Layout;

const LayoutAuthentication = ({ children }: { children: ReactNode }) => {
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

    const goHome = () => {
        navigate(Paths.HOME);
    }

    return (
        <ConfigProvider
            theme={{
                components: {
                    Layout: {
                        // bodyBg: 'url("src/assets/images/grunge-scratched-cracked-texture-background_dark.jpg")',
                        bodyBg: '#000',
                        colorText: '#FFF'
                    },
                    Menu: {
                        darkItemSelectedBg: '#666',
                    }
                },
            }}
        >
            <LayoutStyled>
                <Header style={{ display: 'flex', alignItems: 'center', background: '#000' }}>
                    <div>
                        <Image src={logo} width={150} preview={false} onClick={goHome} />
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={selectedKeys}
                        items={menuItems}
                        onClick={onClickMenu}
                        style={{ flex: 1, minWidth: 0, background: '#000' }}
                    />
                    <AccountDropdown />
                </Header>
                <Content style={{ padding: 20 }}>{children}</Content>
                <Footer style={{ textAlign: 'center', background: '#000' }}>
                    <Image src={logo} width={150} preview={false} /> 
                    <span>| Powered by <a href="https://silveiracamilo.com.br" target="_blank">silveiracamilo.com.br</a></span>
                </Footer>
            </LayoutStyled>
        </ConfigProvider>
    )
}

export default LayoutAuthentication;

const LayoutStyled = styled(Layout)`
    width: 100%;
    min-height: 100vh;
    height: 100%;
`;
