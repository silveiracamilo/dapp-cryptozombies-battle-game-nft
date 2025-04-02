import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieAttackVitoryContext } from './context/ZombieAttackVitoryContextProvider';
import { useNavigate, useParams } from 'react-router';
import { Paths } from 'src/router/RouteConsts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const { Meta } = Card;

const ZombieAttackVitory: React.FC = () => {
    const { zombieFrom, zombieTarget } = useZombieAttackVitoryContext();
    const { newDna = '' } = useParams();
    const navigate = useNavigate();

    return (
        <>
        <Row justify="center">
            <h1>You Victory! Now you can to see, a new zombie.</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={5}>
                <Card
                    style={{ width: 300 }}
                    cover={<Zombie dna={zombieFrom?.dna || ''} />}
                >
                    <Meta
                        avatar={<FontAwesomeIcon icon={faCheck} />}
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
                        avatar={<FontAwesomeIcon icon={faXmark} />}
                        title={`${zombieTarget?.name} - ${zombieTarget?.dna}`}
                        description={`Level: ${zombieTarget?.level} Score: ${zombieTarget?.score}`}
                    />
                </Card>
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>=</Col>
            <Col span={5}>
                <Zombie dna={newDna} />
            </Col>
            <Col span={7}>
                <p>New Zombie NoName!</p>
                <Card title="DNA Winner">
                    {zombieFrom?.dna || ''}
                </Card>
                <Card title="DNA Loser">
                    {zombieTarget?.dna || ''}
                </Card>
                <Card title="DNA New Zombie">
                    {newDna}
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

export default ZombieAttackVitory;