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
        <Row>
            <h1 style={{ color: '#b6a764' }}>Choose a zombie to fight {zombie?.name}</h1>
        </Row>
        <Row>
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {zombies?.length ?
                <Row gutter={[8, 8]}>
                { map(zombies, zomb => (
                    <Col key={zomb.id}>
                        <ZombieEnemy zombie={zomb} />
                    </Col>
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