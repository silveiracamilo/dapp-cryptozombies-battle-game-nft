import { Breadcrumb, Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { useZombieBattleContext } from './context/ZombieBattleContextProvider';
import { map } from 'lodash';
import AccountEnemie from './components/AccountEnemie';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';
import { Paths } from 'src/router/RouteConsts';
import { useNavigate } from 'react-router';

const ZombieBattle: React.FC = () => {
    const { zombie, accounts } = useZombieBattleContext();
    const navigate = useNavigate();
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: 'Battle',
        },
    ], []);

    return (
        <>
        <Breadcrumb items={breadcrumbItems} />
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