import { Card, Col, Row } from 'antd';
import React from 'react';
import { useZombieAttackDefeatContext } from './context/ZombieAttackDefeatContextProvider';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Paths } from 'src/router/RouteConsts';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';
import CardButtonAction from 'src/components/button/CardButtonAction';

const { Meta } = Card;

const ZombieAttackDefeat: React.FC = () => {
    const { zombieFrom, zombieTarget } = useZombieAttackDefeatContext();
    const navigate = useNavigate();

    return (
        <>
        <Row justify="center">
            <h1 style={{ color: '#b6a764' }}>You Loser!</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={5}>
                <Card
                    style={{ width: 300 }}
                    cover={<ZombieCard zombie={zombieFrom as IZombie} />}
                >
                    <Meta
                        avatar={<FontAwesomeIcon icon={faXmark} size="xl" color="red" />}
                        title="Loss"
                    />
                </Card>
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>X</Col>
            <Col span={5}>
                <Card
                    style={{ width: 300 }}
                    cover={<ZombieCard zombie={zombieTarget as IZombie} />}
                >
                    <Meta
                        avatar={<FontAwesomeIcon icon={faCheck} size="xl" color="green" />}
                        title="Win"
                    />
                </Card>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 60 }}>
            <CardButtonAction onClick={() => navigate(Paths.HOME)}>
                Go Army
            </CardButtonAction>
        </Row>
        </>
    )
}

export default ZombieAttackDefeat;