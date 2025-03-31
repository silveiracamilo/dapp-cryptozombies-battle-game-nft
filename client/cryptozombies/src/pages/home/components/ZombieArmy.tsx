import { Zombie } from "src/components/zombie/Zombie";
import { useCallback, useEffect, useState } from "react";
import ContractService from "src/store/services/ContractService";
import { Button, Card } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { zombieMapper } from "src/store/mapper/zombie/ZombieMapper";
import { useNavigate } from "react-router";
import { Paths } from "src/router/RouteConsts";

const { Meta } = Card;

const ZombieArmy = ({ id }: { id: number }) => {
    const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();

    useEffect(() => {
        getZombieById(id);
    }, [id]);

    const getZombieById = useCallback(async (id: number) => {
        const zombie = await ContractService.instance.getZombieById(id);
        setZombie(zombieMapper(zombie));
    }, []);

    return (
        <Card
            style={{ width: 300 }}
            cover={zombie ? <Zombie dna={zombie.dna} /> : null}
            actions={[
                <Button onClick={() => navigate(Paths.ZOMBIE_FEED)}>Feed</Button>,
                <Button onClick={() => navigate(Paths.ZOMBIE_BATTLE)}>Battle</Button>,
                <Button onClick={() => navigate(Paths.ZOMBIE_DETAIL.replace(':id', id.toString()))}>Detail</Button>,
            ]}
        >
            <Meta
                title={`${zombie?.name} - ${zombie?.dna}`}
                description={`Level: ${zombie?.level} Score: ${zombie?.score}`}
            />
        </Card>
    )
}

export default ZombieArmy;
