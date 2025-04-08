import { useCallback, useEffect, useState } from "react";
import { notification, Row } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useNavigate } from "react-router";
import { Paths } from "src/router/RouteConsts";
import { useHomeContext } from "../context/HomeContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCat, faRadiation } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import ZombieCard from "src/components/zombie/ZombieCard";
import CardButtonAction from "src/components/button/CardButtonAction";

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
        <CardStyle>
            <ZombieCard zombie={zombie as IZombie} />
            <CardFooterStyle justify="space-between">
                <CardButtonAction icon={<FontAwesomeIcon icon={faCat} />} onClick={feed}>
                    Feed
                </CardButtonAction>
                <CardButtonAction icon={<FontAwesomeIcon icon={faRadiation} />} onClick={battle}>
                    Battle
                </CardButtonAction>
                <CardButtonAction icon={<FontAwesomeIcon icon={faAddressCard} />} onClick={detail}>
                    Detail
                </CardButtonAction>
            </CardFooterStyle>
        </CardStyle>
    )
}

export default ZombieArmy;

const CardStyle = styled.div`
    width: 100%;
`;

const CardFooterStyle = styled(Row)`
    width: 100%;
    background-color: #262819;
    gap: 8px; 
    padding: 8px;
`;