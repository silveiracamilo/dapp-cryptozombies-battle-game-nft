import { ReactNode, useCallback, useEffect, useState } from "react";
import { Image, notification } from "antd";
import logo from "/images/cryptozombies_battle_logo_150.png";
import { useNavigate } from "react-router";
import { isEmpty, reduce } from "lodash";
import { Paths } from "@/router/RouteConsts";
import AccountDropdown from "@/components/account/AccountDropdown";
import { useAuthContext } from "@/context/auth/AuthContextProvider";
import CryptozombiesBattleService from "@/store/services/contract/cryptozombiesBattle/CryptozombiesBattleService";
import { ContentStyled, FooterStyled, HeaderStyled, LayoutStyled, ScoreStyled } from "./styles";
import LayoutMenu from "./components/LayoutMenu";

const LayoutAuthentication = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const { address } = useAuthContext();
    const [accountScore, setAccountScore] = useState(0);
    
    useEffect(() => {
        if (!isEmpty(address)){
            loadZombiesByOwner();
        }
    }, [address]);

    const loadZombiesByOwner = useCallback(async () => {
        try {
            const zombies = await CryptozombiesBattleService.instance.getZombiesAllByOwner(address);
            setAccountScore(reduce(zombies, (acc, z) => acc + z.score, 0));
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies by account',
                description: error.reason || 'Error generic'
            });
        }
    }, [address]);

    const goHome = useCallback(() => {
        navigate(Paths.HOME);
    }, []);

    return (
        <LayoutStyled>
            <HeaderStyled>
                <Image src={logo} width={150} preview={false} onClick={goHome} />
                <LayoutMenu />
                {!isEmpty(address) && <>
                    <ScoreStyled><strong>Score</strong>: {accountScore}</ScoreStyled>
                    <AccountDropdown />
                </>}
            </HeaderStyled>
            <ContentStyled>{children}</ContentStyled>
            <FooterStyled>
                <Image src={logo} width={80} preview={false} /> 
                &nbsp;
                <span>| Powered by <a href="https://silveiracamilo.com.br" target="_blank">silveiracamilo.com.br</a></span>
            </FooterStyled>
        </LayoutStyled>
    )
}

export default LayoutAuthentication;
