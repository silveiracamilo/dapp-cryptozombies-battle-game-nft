import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { useZombieAttackDefeatContext } from './context/ZombieAttackDefeatContextProvider';
import { useNavigate } from 'react-router';
import { Zombie } from 'src/components/zombie/Zombie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Paths } from 'src/router/RouteConsts';

const { Meta } = Card;

const ZombieAttackDefeat: React.FC = () => {
    const { zombieFrom, zombieTarget } = useZombieAttackDefeatContext();
    const navigate = useNavigate();

    return (
        <>
        <Row justify="center">
            <h1>You Loser!</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={5}>
                <Card
                    style={{ width: 300 }}
                    cover={<Zombie dna={zombieFrom?.dna || ''} />}
                >
                    <Meta
                        avatar={<FontAwesomeIcon icon={faXmark} />}
                        title={`${zombieFrom?.name} - ${zombieFrom?.dna}`}
                        description={`Level: ${zombieFrom?.level} Score: ${zombieFrom?.score}`}
                    />
                </Card>
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>X</Col>
            <Col span={5}>
                <Card
                    style={{ width: 300 }}
                    cover={<Zombie dna={zombieTarget?.dna || ''} />}
                >
                    <Meta
                        avatar={<FontAwesomeIcon icon={faCheck} />}
                        title={`${zombieTarget?.name} - ${zombieTarget?.dna}`}
                        description={`Level: ${zombieTarget?.level} Score: ${zombieTarget?.score}`}
                    />
                </Card>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 60 }}>
            <Button type="primary" key="army" onClick={() => navigate(Paths.HOME)}>
                Go Army
            </Button>
        </Row>
        </>
    )
}

export default ZombieAttackDefeat;