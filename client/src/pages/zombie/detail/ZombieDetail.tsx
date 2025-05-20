import { Breadcrumb, Col, Row, Tooltip } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { useZombieDetailContext } from './context/ZombieDetailContextProvider';
import { debounce, isNil } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faCat, faCircleInfo, faDna, faRadiation, faSignature, faTag } from '@fortawesome/free-solid-svg-icons';
import { Paths } from 'src/router/RouteConsts';
import { useNavigate, useParams } from 'react-router';
import ChangeNameModal from './components/ChangeNameModal';
import ChangeDNAModal from './components/ChangeDNAModal';
import PutForSaleModal from './components/PutForSaleModal';
import { formatEther } from 'ethers';
import ZombieStatistic from 'src/components/zombie/statistics/ZombieStatistic';
import SimpleLoading from 'src/components/loading/SimpleLoading';
import CardButtonAction from 'src/components/button/CardButtonAction';

const ZombieDetail: React.FC = () => {
    const { zombie, zombieSale, cancelSaleZombie, levelUp, fees, loadingActivities, activities } = useZombieDetailContext();
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const [showChangeNameModal, setShowChangeNameModal] = useState(false);
    const [showChangeDNAModal, setShowChangeDNAModal] = useState(false);
    const [showPutForSaleModal, setShowPutForSaleModal] = useState(false);
    const breadcrumbItems = useMemo(() => [
        {
            title: <a onClick={() => navigate(Paths.HOME)}>Play to earn</a>,
        },
        {
            title: 'Zombie Detail',
        },
    ], []);

    const feed = useCallback(() => {
        navigate(Paths.ZOMBIE_FEED.replace(':id', id));
    }, []);

    const battle = useCallback(() => {
        navigate(Paths.ZOMBIE_BATTLE.replace(':id', id));
    }, []);

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
                    <CardButtonAction icon={<FontAwesomeIcon icon={faCat} />} onClick={feed}>Feed</CardButtonAction>
                    <CardButtonAction icon={<FontAwesomeIcon icon={faRadiation} />} onClick={battle}>Battle</CardButtonAction>
                    <CardButtonAction icon={<FontAwesomeIcon icon={faArrowUp} />} onClick={debounce(levelUp, 200)}>
                        Level Up
                        <Tooltip title={`Price ${ formatEther(fees.levelUpFee) } ETH`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </CardButtonAction>
                    <CardButtonAction icon={<FontAwesomeIcon icon={faSignature} />} onClick={() => setShowChangeNameModal(true)}>
                        Change Name
                        <Tooltip title={`Price ${ formatEther(fees.changeNameFee) } ETH`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </CardButtonAction>
                    <CardButtonAction icon={<FontAwesomeIcon icon={faDna} />} onClick={() => setShowChangeDNAModal(true)}>
                        Change DNA
                        <Tooltip title={`Price ${ formatEther(fees.changeDNAFee) } ETH`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </CardButtonAction>
                    {isNil(zombieSale) &&
                    <CardButtonAction 
                        icon={<FontAwesomeIcon icon={faTag} />}
                        onClick={() => setShowPutForSaleModal(true)}
                        disabled={!isNil(zombieSale)}
                    >
                        Put for Sale
                        &nbsp;
                        <Tooltip title={`Price ${ formatEther(fees.tax) } ETH`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </CardButtonAction>
                    }
                    {!isNil(zombieSale) &&
                    <CardButtonAction 
                        icon={<FontAwesomeIcon icon={faTag} />}
                        onClick={debounce(() => cancelSaleZombie(zombieSale.zombieId), 200)}
                        disabled={isNil(zombieSale)}
                    >
                        Cancel Sale
                    </CardButtonAction>
                    }
                </Row>
            </Col>
        </Row>
        <ZombieStatistic zombie={zombie} loadingActivities={loadingActivities} activities={activities} />
        <ChangeNameModal showChangeNameModal={showChangeNameModal} setShowChangeNameModal={setShowChangeNameModal} />
        <ChangeDNAModal showChangeDNAModal={showChangeDNAModal} setShowChangeDNAModal={setShowChangeDNAModal} />
        <PutForSaleModal showPutForSaleModal={showPutForSaleModal} setShowPutForSaleModal={setShowPutForSaleModal} />
        </>
    )
}

export default ZombieDetail;