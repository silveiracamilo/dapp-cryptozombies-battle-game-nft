import { Col, Row } from 'antd';
import React from 'react';
import { useZombieAttackContext } from './context/ZombieAttackContextProvider';
import { map } from 'lodash';
import ZombieEnemy from './components/ZombieEnemy';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';

const ZombieAttack: React.FC = () => {
    const { zombie, zombies } = useZombieAttackContext();

    return (
        <>
        <Row justify="center">
            <h1>Choose a zombie to fight {zombie?.name}</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {zombies?.length ?
                <Row justify="center">
                { map(zombies, zomb => (
                    <ZombieEnemy zombie={zomb} key={zomb.id} />
                )) }
                </Row> :
                <Row justify="center" align="middle">
                    <p>Loading enemies...</p>
                </Row>
                }
            </Col>
        </Row>
        </>
    )
}

export default ZombieAttack;