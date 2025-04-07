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
        <Row justify="center">
            <h1>Choose a account to fight {zombie?.name}</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {accounts?.length ?
                <Row justify="center">
                {map(accounts, (account, i) => (
                    <AccountEnemie account={account} key={`${account}_${i}`} />
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