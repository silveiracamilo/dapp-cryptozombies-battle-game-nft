import { Image, notification, Row, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { addressFormat } from "utils/formatter";
import { useZombieBattleContext } from "../context/ZombieBattleContextProvider";
import styled from "styled-components";
import CardButtonAction from "src/components/button/CardButtonAction";


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
        <Card>
            <Row justify="center">
                <Image src={`https://robohash.org/${account}?set=set2`} placeholder={<Spin spinning />} preview={false} />
            </Row>
            
            <CardFooterStyle>
                <div>{addressFormat(account)} | Score: {infos.score}</div>
                <div>Zombies Total: {infos.total}</div>
                <div>Level more high: {infos.levelHigh}</div>
                <div>Level more down: {infos.levelDown}</div>
            </CardFooterStyle>
            <CardFooterStyle>
                <CardButtonAction 
                    onClick={() => navigate(
                        Paths.ZOMBIE_ATTACK
                            .replace(':id', id)
                            .replace(':addressEnemie', account)
                    )}
                >
                    Attack that
                </CardButtonAction>
            </CardFooterStyle>
        </Card>
    );
}

export default AccountEnemie;

const Card = styled.div`
    width: 100%;
    border-radius: 8px;
    background: url("src/assets/images/textured-paper.png");
    background-color: #86835dCC;
    background-blend-mode: darken;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const CardFooterStyle = styled(Row)`
    width: 100%;
    background-color: #262819;
    color: #b6a764;
    font-size: 16px;
    font-weight: bold;
    width: '100%';
    padding: 8px;
    display: block;
`;