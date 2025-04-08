import { Col, Row } from 'antd';
import React from 'react';
import { useZombieBattleContext } from './context/ZombieBattleContextProvider';
import { map } from 'lodash';
import AccountEnemie from './components/AccountEnemie';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';

const ZombieBattle: React.FC = () => {
    const { zombie, accounts } = useZombieBattleContext();

    return (
        <>
        <Row>
            <h1 style={{ color: '#b6a764' }}>Choose a account to fight {zombie?.name}</h1>
        </Row>
        <Row align="middle">
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {accounts?.length ?
                <Row gutter={[8, 8]}>
                {map(accounts, (account, i) => (
                    <Col key={`${account}_${i}`} span={6}>
                        <AccountEnemie account={account} />
                    </Col>
                ))}
                </Row> :
                <Row justify="center" align="middle">
                    <p>Loading enemies account...</p>
                </Row>
                }
            </Col>
            
        </Row>
        </>
    )
}

export default ZombieBattle;