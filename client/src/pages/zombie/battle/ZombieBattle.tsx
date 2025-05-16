import { Breadcrumb, Col, PaginationProps, Row } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { useZombieBattleContext } from './context/ZombieBattleContextProvider';
import { map } from 'lodash';
import AccountEnemie from './components/AccountEnemie';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';
import { Paths } from 'src/router/RouteConsts';
import { useNavigate } from 'react-router';
import CZBPagination from 'src/components/pagination/CZBPagination';

const ZombieBattle: React.FC = () => {
    const { zombie, accounts, accountsTotal, pageSize, getAccounts } = useZombieBattleContext();
    const navigate = useNavigate();
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: 'Battle',
        },
    ], []);

    const onChange: PaginationProps['onChange'] = useCallback((page: number) => {
        getAccounts(page);
    }, []);

    return (
        <>
        <Breadcrumb items={breadcrumbItems} />
        <Row>
            <h1 style={{ color: '#b6a764' }}>Choose a account to fight {zombie?.name}</h1>
        </Row>
        <Row gutter={24}>
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
                <CZBPagination pageSize={pageSize} total={accountsTotal} onChange={onChange} />
            </Col>
        </Row>
        </>
    )
}

export default ZombieBattle;