import { Zombie } from "src/components/zombie/Zombie";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, notification } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useZombieBattleContext } from "../context/ZombieBattleContextProvider";
import { debounce } from "lodash";

const { Meta } = Card;

const ZombieEnemy = ({ id }: { id: number }) => {
    const { getZombieById, attack } = useZombieBattleContext();
    const [zombie, setZombie] = useState<IZombie>();

    useEffect(() => {
        handleGetZombieById();
    }, [id]);

    const handleGetZombieById = useCallback(async () => {
        try {
            const zombie = await getZombieById(id);
            setZombie(zombie);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, []);

    return (
        <Card
            style={{ width: 300 }}
            cover={zombie ? <Zombie dna={zombie.dna} /> : null}
            actions={[
                <Button onClick={debounce(() => attack(id), 200)}>Attach that</Button>,
            ]}
        >
            <Meta
                title={`${zombie?.name} - ${zombie?.dna}`}
                description={`Level: ${zombie?.level} Score: ${zombie?.score}`}
            />
        </Card>
    )
}

export default ZombieEnemy;
