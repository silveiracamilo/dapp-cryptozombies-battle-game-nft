import { Card, Col, Row, Statistic } from "antd";
import { Zombie } from "../Zombie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import moment from "moment";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { faArrowDown, faArrowsToEye, faArrowUp, faBirthdayCake, faDna, faDumbbell, faEye, faGaugeSimpleHigh, faHandFist, faHeadSideCough, faPerson, faPersonRays, faStairs, faStopwatch, faTShirt } from '@fortawesome/free-solid-svg-icons';
import ZombieActivities from "./ZombieActivities";
import { ZombieActivitiesType } from "src/store/interface/zombie/ZombieEvents";

interface IZombieStatistic {
    zombie: IZombie
    loadingActivities: boolean
    activities: ZombieActivitiesType
}

const ZombieStatistic: React.FC<IZombieStatistic> = ({ zombie, loadingActivities, activities }) => {
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

    return (
        <>
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
        <Row style={{ marginLeft: 30, marginTop: 32 }}>
            <ZombieActivities loading={loadingActivities} activities={activities} />
        </Row>
        </>
    );
}

export default ZombieStatistic;
