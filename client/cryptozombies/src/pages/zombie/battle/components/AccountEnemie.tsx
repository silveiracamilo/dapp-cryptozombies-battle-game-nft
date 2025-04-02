import { Button, Card, Image, notification, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { addressFormat } from "utils/formatter";
import { useZombieBattleContext } from "../context/ZombieBattleContextProvider";

const { Meta } = Card;

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
        <Card
            style={{ width: 300 }}
            cover={<Image src={`https://robohash.org/${account}?set=set2`} placeholder={<Spin spinning />} />}
            actions={[
                <Button 
                    onClick={() => navigate(
                        Paths.ZOMBIE_ATTACK
                            .replace(':id', id)
                            .replace(':addressEnemie', account)
                    )}
                >
                    Attach that
                </Button>,
            ]}
        >
            <Meta
                title={addressFormat(account)}
                description={`Zombies Total: ${infos.total}, Level more high: ${infos.levelHigh}, Level more down: ${infos.levelDown}, Score: ${infos.score}`}
            />
        </Card>
    );
}

export default AccountEnemie;
