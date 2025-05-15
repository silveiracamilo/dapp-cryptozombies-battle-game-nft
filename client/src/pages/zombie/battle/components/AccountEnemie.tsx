import { Image, notification, Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { addressFormat } from "utils/formatter";
import { useZombieBattleContext } from "../context/ZombieBattleContextProvider";
import CardButtonAction from "src/components/button/CardButtonAction";
import { CardFooterStyled, CardStyled } from "./styles";


const AccountEnemie = ({ account }: { account: string }) => {
    const { id = '' } = useParams();
    const { getZombiesByOwnerMapped } = useZombieBattleContext();
    const navigate = useNavigate();
    const [infos, setInfos] = useState({
        total: 1,
        levelHigh: 1,
        levelDown: 1,
        score: 1,
    })

    useEffect(() => {
        loadZombiesByOwner();
    }, []);

    const loadZombiesByOwner = useCallback(async () => {
        try {
            const zombies = await getZombiesByOwnerMapped(account);

            setInfos({
                total: zombies.length,
                levelHigh: Math.max(...zombies.map(z => z.level)),
                levelDown: Math.min(...zombies.map(z => z.level)),
                score: zombies.reduce((acc, z) => acc + z.score, 0),
            });
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombies by enemie account',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    return (
        <CardStyled>
            <Row justify="center">
                <Image 
                    src={`https://robohash.org/${account}?set=set2`}
                    placeholder={<Spin spinning />}
                    preview={false} 
                />
            </Row>
            
            <CardFooterStyled>
                <div>{addressFormat(account)} | Score: {infos.score}</div>
                <div>Zombies Total: {infos.total}</div>
                <div>Level more high: {infos.levelHigh}</div>
                <div>Level more down: {infos.levelDown}</div>
            </CardFooterStyled>
            <CardFooterStyled>
                <CardButtonAction 
                    onClick={() => navigate(
                        Paths.ZOMBIE_ATTACK
                            .replace(':id', id)
                            .replace(':addressEnemie', account)
                    )}
                >
                    Attack that
                </CardButtonAction>
            </CardFooterStyled>
        </CardStyled>
    );
}

export default AccountEnemie;
