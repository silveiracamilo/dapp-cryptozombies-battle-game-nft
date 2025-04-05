import { ReactNode, useCallback } from "react";
import { Image, Layout, Menu, MenuProps } from "antd";
import logo from "assets/images/cryptozombies-logo.png";
import { useNavigate } from "react-router";
import { map } from "lodash";
import { Paths } from "src/router/RouteConsts";
import AccountDropdown from "src/components/account/AccountDropdown";

const { Header, Content, Footer } = Layout;

const items = [
    { label: "Army", route: Paths.HOME },
    { label: "Ranking", route: Paths.RANKING },
];
const menuItems = map(items, ({ label }, i) => ({ key: i + 1, label }));

const LayoutAuthentication = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const onClickMenu: MenuProps['onClick'] = useCallback((e: any) => {
        const item = items[+e.key - 1];
        item && navigate(item.route);
    }, []);

    const goHome = () => {
        navigate(Paths.HOME);
    }

    return (
        <Layout style={{ width: "100vw", height: "100vh" }}>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <Image src={logo} width={150} preview={false} onClick={goHome} />
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={menuItems}
                    onClick={onClickMenu}
                    style={{ flex: 1, minWidth: 0 }}
                />
                <AccountDropdown />
            </Header>
            <Content style={{ padding: 20, height: '90%' }}>{children}</Content>
            <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
    )
}

export default LayoutAuthentication;
