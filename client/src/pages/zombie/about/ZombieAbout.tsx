import { Breadcrumb, Button, Card, Col, Row, Statistic, Tooltip } from 'antd';
import React, { useMemo } from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieAboutContext } from './context/ZombieAboutContextProvider';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsToEye, faArrowUp, faBirthdayCake, faCircleInfo, faDna, faDumbbell, faEye, faGaugeSimpleHigh, faHandFist, faHeadSideCough, faMoneyCheckDollar, faPerson, faPersonRays, faStairs, faStopwatch, faTShirt } from '@fortawesome/free-solid-svg-icons';
import { Paths } from 'src/router/RouteConsts';
import { useNavigate } from 'react-router';
import Activities from './components/Activities';
import { debounce, isNil } from 'lodash';
import { formatEther } from 'ethers';

const ZombieAbout: React.FC = () => {
    const { zombie, zombieSale, buyZombie } = useZombieAboutContext();
    const navigate = useNavigate();
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: 'Zombie About',
        },
    ], []);
    
    const parseBirthTime = useMemo(
        () => (zombie ? moment(zombie.birthTime * 1000) : moment()).format('lll'), 
        [zombie]
    );

    const parseAttackReadyTime = useMemo(
        () => (zombie ? moment(zombie.attackReadyTime * 1000) : moment()).fromNow(), 
        [zombie]
    );
    
    const parseFedReadyTime = useMemo(
        () => (zombie ? moment(zombie.fedReadyTime * 1000) : moment()).fromNow(), 
        [zombie]
    );

    if (!zombie) {
        return <div>loading...</div>;
    }

    console.log("zombieSale: ", zombieSale);

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
        <Row justify="center" align="middle">        
            <Col span={4}>
                <Zombie dna={zombie.dna} />
            </Col>
            <Col span={20}>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="DNA"
                                value={zombie.dna}
                                formatter={v => v}
                                prefix={<FontAwesomeIcon icon={faDna} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Birth"
                                value={parseBirthTime}
                                formatter={v => v}
                                prefix={<FontAwesomeIcon icon={faBirthdayCake} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Attack Ready Time"
                                value={parseAttackReadyTime}
                                formatter={v => v}
                                prefix={<FontAwesomeIcon icon={faStopwatch} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Fed Ready Time"
                                value={parseFedReadyTime}
                                formatter={v => v}
                                prefix={<FontAwesomeIcon icon={faStopwatch} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Head gene"
                                value={zombie.head}
                                prefix={<FontAwesomeIcon icon={faHeadSideCough} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Eye color gen"
                                value={zombie.eyeColor}
                                prefix={<FontAwesomeIcon icon={faEye} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Level"
                                value={zombie.level}
                                prefix={<FontAwesomeIcon icon={faStairs} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Strength"
                                value={zombie.strength}
                                suffix="%"
                                prefix={<FontAwesomeIcon icon={faDumbbell} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Eye gene"
                                value={zombie.eye}
                                prefix={<FontAwesomeIcon icon={faArrowsToEye} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Clothes color gene"
                                value={zombie.clothesColor}
                                prefix={<FontAwesomeIcon icon={faPerson} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Wins"
                                value={zombie.winCount}
                                prefix={<FontAwesomeIcon icon={faArrowUp} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Agility"
                                value={zombie.agility}
                                suffix="%"
                                precision={2}
                                prefix={<FontAwesomeIcon icon={faGaugeSimpleHigh} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Shirt gene"
                                value={zombie.shirt}
                                prefix={<FontAwesomeIcon icon={faTShirt} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Losses"
                                value={zombie.lossCount}
                                prefix={<FontAwesomeIcon icon={faArrowDown} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Resilience"
                                value={zombie.resilience}
                                suffix="%"
                                precision={2}
                                prefix={<FontAwesomeIcon icon={faHandFist} />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card variant="borderless">
                            <Statistic
                                title="Skin color gene"
                                value={zombie.skinColor}
                                formatter={v => v}
                                prefix={<FontAwesomeIcon icon={faPersonRays} />}
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row style={{ width: '100%', marginLeft: 30, marginTop: 32 }}>
            <Activities />
        </Row>
        </>
    )
}

export default ZombieAbout;