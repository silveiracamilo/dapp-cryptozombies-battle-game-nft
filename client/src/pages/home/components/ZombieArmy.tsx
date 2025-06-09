import { useCallback, useEffect, useMemo, useState } from "react";
import { notification, Statistic } from "antd";
import { IZombie } from "@/store/interface/zombie/IZombie";
import { useNavigate } from "react-router";
import { Paths } from "@/router/RouteConsts";
import { useHomeContext } from "../context/HomeContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faCat, faRadiation } from "@fortawesome/free-solid-svg-icons";
import ZombieCard from "@/components/zombie/ZombieCard";
import CardButtonAction from "@/components/button/CardButtonAction";
import { CardFooterStyled, CardStyled } from "./styles";

const { Countdown } = Statistic;

const ZombieArmy = ({ id }: { id: number }) => {
    const { getZombieById } = useHomeContext();
    const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();
    const [fedDisabled, setFedDisabled] = useState(true);
    const [battleDisabled, setBattleDisabled] = useState(true);

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

    const fedReadyTime = useMemo(() => (zombie?.fedReadyTime || 1) * 1000, [zombie]);

    useEffect(() => {
        setFedDisabled(Date.now() < fedReadyTime);
    }, [fedReadyTime]);

    const fedCountdownFinish = useCallback(() => {
        setFedDisabled(false);
    }, []);
    
    const attackReadyTime = useMemo(() => (zombie?.attackReadyTime || 1) * 1000, [zombie]);

    useEffect(() => {
        setBattleDisabled(Date.now() < attackReadyTime);
    }, [attackReadyTime]);

    const attackCountdownFinish = useCallback(() => {
        setBattleDisabled(false);
    }, []);

    return (
        <CardStyled>
            <ZombieCard zombie={zombie as IZombie} />
            <CardFooterStyled justify="space-between">
                <CardButtonAction icon={<FontAwesomeIcon icon={faCat} />} onClick={fedDisabled ? undefined : feed} size="small">
                    {!fedDisabled ?
                    'Feed' :
                    <Countdown value={fedReadyTime} valueStyle={{ fontSize: 13 }} onFinish={fedCountdownFinish} />
                    }
                </CardButtonAction>
                <CardButtonAction icon={<FontAwesomeIcon icon={faRadiation} />} onClick={battleDisabled ? undefined : battle} size="small">
                    {!battleDisabled ?
                    'Battle' :
                    <Countdown value={attackReadyTime} valueStyle={{ fontSize: 13 }} onFinish={attackCountdownFinish} />
                    }
                    
                </CardButtonAction>
                <CardButtonAction icon={<FontAwesomeIcon icon={faAddressCard} />} onClick={detail} size="small">
                    Detail
                </CardButtonAction>
            </CardFooterStyled>
        </CardStyled>
    )
}

export default ZombieArmy;
