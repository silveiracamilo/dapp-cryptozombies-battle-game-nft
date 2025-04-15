import { Button, Card, Col, Row, Statistic, Tooltip } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieDetailContext } from './context/ZombieDetailContextProvider';
import moment from 'moment';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsToEye, faArrowUp, faCat, faCircleInfo, faDna, faDumbbell, faEye, faGaugeSimpleHigh, faHandFist, faHeadSideCough, faMoneyCheckDollar, faPerson, faPersonRays, faRadiation, faSignature, faStairs, faStopwatch, faTShirt } from '@fortawesome/free-solid-svg-icons';
import { Paths } from 'src/router/RouteConsts';
import { useNavigate, useParams } from 'react-router';
import ChangeNameModal from './components/ChangeNameModal';
import ChangeDNAModal from './components/ChangeDNAModal';
import PutForSaleModal from './components/PutForSaleModal';

const ZombieDetail: React.FC = () => {
    const { zombie, levelUp } = useZombieDetailContext();
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const [showChangeNameModal, setShowChangeNameModal] = useState(false);
    const [showChangeDNAModal, setShowChangeDNAModal] = useState(false);
    const [showPutForSaleModal, setShowPutForSaleModal] = useState(false);
    
    const parseReadyTime = useMemo(
        () => (zombie ? moment(zombie.readyTime * 1000) : moment()).fromNow(), 
        [zombie]
    );

    const feed = useCallback(() => {
        navigate(Paths.ZOMBIE_FEED.replace(':id', id));
    }, []);

    const battle = useCallback(() => {
        navigate(Paths.ZOMBIE_BATTLE.replace(':id', id));
    }, []);

    if (!zombie) {
        return <div>loading...</div>;
    }

    return (
        <>
        <Row justify="space-evenly" align="middle" gutter={30}>
            <Col span={8}>
                <h1 style={{ color: '#b6a764' }}>{zombie.id}#{zombie.name} </h1>
            </Col>
            <Col span={16} style={{ textAlign: 'right' }}>
                <Row style={{ gap: 16 }} justify="end">
                    <Button icon={<FontAwesomeIcon icon={faCat} />} onClick={feed}>Feed</Button>
                    <Button icon={<FontAwesomeIcon icon={faRadiation} />} onClick={battle}>Battle</Button>
                    <Button icon={<FontAwesomeIcon icon={faArrowUp} />} onClick={debounce(levelUp, 200)}>
                        Level Up
                        <Tooltip title={'Price 0.001 ether'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </Button>
                    <Button icon={<FontAwesomeIcon icon={faSignature} />} onClick={() => setShowChangeNameModal(true)}>
                        Change Name
                        <Tooltip title={'Price 0.002 ether'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </Button>
                    <Button icon={<FontAwesomeIcon icon={faDna} />} onClick={() => setShowChangeDNAModal(true)}>
                        Change DNA
                        <Tooltip title={'Price 0.004 ether'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </Button>
                    <Button icon={<FontAwesomeIcon icon={faMoneyCheckDollar} />} onClick={() => setShowPutForSaleModal(true)}>
                        Put for Sale
                        <Tooltip title={'Price 0.0001 ether'}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </Button>
                </Row>
            </Col>
        </Row>
        <Row justify="center" align="middle">        
            <Col span={4}>
                <Zombie dna={zombie.dna} />
            </Col>
            <Col span={20}>
                <Row gutter={16}>
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
                                title="Ready Time"
                                value={parseReadyTime}
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
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
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
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
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
                </Row>
                <Row gutter={16} style={{ marginTop: 16 }}>
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
        <ChangeNameModal showChangeNameModal={showChangeNameModal} setShowChangeNameModal={setShowChangeNameModal} />
        <ChangeDNAModal showChangeDNAModal={showChangeDNAModal} setShowChangeDNAModal={setShowChangeDNAModal} />
        <PutForSaleModal showPutForSaleModal={showPutForSaleModal} setShowPutForSaleModal={setShowPutForSaleModal} />
        </>
    )
}

export default ZombieDetail;