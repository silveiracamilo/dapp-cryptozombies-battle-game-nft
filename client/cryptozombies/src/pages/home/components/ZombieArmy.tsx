import { Zombie } from "src/components/zombie/Zombie";
import { useCallback, useEffect, useState } from "react";
import { Button, Card, notification } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useNavigate } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { useHomeContext } from "../context/HomeContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCat, faRadiation } from "@fortawesome/free-solid-svg-icons";

const { Meta } = Card;

const ZombieArmy = ({ id }: { id: number }) => {
    const { getZombieById } = useHomeContext();
    const navigate = useNavigate();
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

    const feed = useCallback(() => {
        navigate(Paths.ZOMBIE_FEED.replace(':id', id.toString()));
    }, []);

    const battle = useCallback(() => {
        navigate(Paths.ZOMBIE_BATTLE.replace(':id', id.toString()));
    }, []);

    const detail = useCallback(() => {
        navigate(Paths.ZOMBIE_DETAIL.replace(':id', id.toString()));
    }, []);

    return (
        <Card
            style={{ width: 300 }}
            cover={zombie ? <Zombie dna={zombie.dna} /> : null}
            actions={[
                <Button icon={<FontAwesomeIcon icon={faCat} />} onClick={feed}>Feed</Button>,
                <Button icon={<FontAwesomeIcon icon={faRadiation} />} onClick={battle}>Battle</Button>,
                <Button icon={<FontAwesomeIcon icon={faAddressCard} />} onClick={detail}>Detail</Button>,
            ]}
        >
            <Meta
                title={`${zombie?.name} - ${zombie?.dna}`}
                description={`#${id} - Level: ${zombie?.level} Score: ${zombie?.score}`}
            />
        </Card>
    )
}

export default ZombieArmy;
