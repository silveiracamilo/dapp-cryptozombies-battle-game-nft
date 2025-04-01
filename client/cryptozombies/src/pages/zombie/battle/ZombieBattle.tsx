import { Col, Row } from 'antd';
import React from 'react';
import { useZombieBattleContext } from './context/ZombieBattleContextProvider';
import { map } from 'lodash';
import ZombieEnemy from './components/ZombieEnemy';
import { Zombie } from 'src/components/zombie/Zombie';

const ZombieBattle: React.FC = () => {
    const { zombie, zombiesId } = useZombieBattleContext();

    return (
        <>
        <Row justify="center">
            <h1>Choose a zombie to fight {zombie?.name}</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={4}>
                <Zombie dna={zombie?.dna || ''} />
            </Col>
            <Col span={20}>
                {zombiesId?.length ?
                <Row justify="center">
                { map(zombiesId, id => (
                    <ZombieEnemy id={id} key={id} />
                )) }
                </Row> :
                <Row justify="center" align="middle">
                    <p>Loading kitties...</p>
                </Row>
                }
            </Col>
        </Row>
        </>
    )
}

export default ZombieBattle;