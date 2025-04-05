import { Button, Card, Col, Row, Statistic } from 'antd';
import React, { useMemo } from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieDetailContext } from './context/ZombieDetailContextProvider';
import moment from 'moment';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsToEye, faArrowUp, faDna, faDumbbell, faEye, faGaugeSimpleHigh, faHandFist, faHeadSideCough, faPerson, faPersonRays, faStairs, faStopwatch, faTShirt } from '@fortawesome/free-solid-svg-icons';

const ZombieDetail: React.FC = () => {
    const { zombie, levelUp, changeName, changeDna } = useZombieDetailContext();
    

    if (!zombie) {
        return <div>loading...</div>;
    }
    
    const parseReadyTime = useMemo(
        () => moment(zombie.readyTime * 1000).fromNow(), 
        [zombie.readyTime]
    );

    console.log('zombie: ', zombie);

    return (
        <>
        <Row justify="space-evenly" align="middle" gutter={30}>
            <Col span={12}>
                <h1>{zombie.id}#{zombie.name} </h1>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
                <Row style={{ gap: 16 }} justify="end">
                    <Button onClick={debounce(levelUp, 200)}>Level Up</Button>
                    <Button onClick={debounce(() => changeName('Camilo Novo Nome'), 200)}>Change Name</Button>
                    <Button onClick={debounce(() => changeDna(3169225795162389), 200)}>Change DNA</Button>
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
                {/* <p><strong>DNA</strong>: {zombie.dna}</p>
                <p><strong>Level</strong>: {zombie.level}</p>
                <p><strong>Wins</strong>: {zombie.winCount}</p>
                <p><strong>Losses</strong>: {zombie.lossCount}</p>

                <p><strong>Ready Time</strong>: {parseReadyTime}</p>
                <p><strong>Strength</strong>: {zombie.strength}</p>
                <p><strong>Agility</strong>: {zombie.agility}</p>
                <p><strong>Resilience</strong>: {zombie.resilience}</p>

                <p><strong>Head gene</strong>: {zombie.head}</p>
                <p><strong>Eye gene</strong>: {zombie.eye}</p>
                <p><strong>Shirt gene</strong>: {zombie.shirt}</p>

                <p><strong>Skin color gene</strong>: {zombie.skinColor}</p>
                <p><strong>Eye color gene</strong>: {zombie.eyeColor}</p>
                <p><strong>Clothes color gene</strong>: {zombie.clothesColor}</p> */}
            </Col>
        </Row>
        </>
    )
}

export default ZombieDetail;