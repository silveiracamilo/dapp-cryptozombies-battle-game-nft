import { Breadcrumb, Button, Col, Row, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { useZombieAboutContext } from './context/ZombieAboutContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { Paths } from '@/router/RouteConsts';
import { useNavigate } from 'react-router';
import { debounce, isNil } from 'lodash';
import { formatEther } from 'ethers';
import ZombieStatistic from '@/components/zombie/statistics/ZombieStatistic';
import SimpleLoading from '@/components/loading/SimpleLoading';

const ZombieAbout: React.FC = () => {
    const { zombie, zombieSale, buyZombie, loadingActivities, activities } = useZombieAboutContext();
    const navigate = useNavigate();
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: 'Zombie About',
        },
    ], []);

    if (!zombie) {
        return <SimpleLoading />;
    }

    return (
        <>
        <Breadcrumb items={breadcrumbItems} />
        <Row justify="space-evenly" align="middle" gutter={30}>
            <Col span={8}>
                <h1 style={{ color: '#b6a764' }}>{zombie.id}#{zombie.name}</h1>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
                <Row style={{ gap: 16 }} justify="end">
                    {!isNil(zombieSale) &&
                    <Button 
                        icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />}
                        onClick={debounce(() => buyZombie(zombie.id, zombieSale?.price || 0n), 200)}
                        disabled={isNil(zombieSale)}
                    >
                        Buy by { formatEther(zombieSale?.price || 0) } ETH
                        <Tooltip title={`Price ${ formatEther(zombieSale?.price || 0) } ETH`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </Button>
                    }
                </Row>
            </Col>
        </Row>
        <ZombieStatistic zombie={zombie} loadingActivities={loadingActivities} activities={activities} />
        </>
    )
}

export default ZombieAbout;