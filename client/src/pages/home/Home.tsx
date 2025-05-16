import { Col, PaginationProps, Row, Tooltip } from 'antd';
import { map } from 'lodash';
import React, { useCallback } from 'react';
import { useHomeContext } from './context/HomeContextProvider';
import ZombieArmy from './components/ZombieArmy';
import { useNavigate } from 'react-router';
import { Paths } from 'src/router/RouteConsts';
import CardButtonAction from 'src/components/button/CardButtonAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import CZBPagination from 'src/components/pagination/CZBPagination';

const Home: React.FC = () => {
    const { zombiesId, mintFreeDisponible, mintFreeLeft, balanceOf, pageSize, getZombiesByOwner } = useHomeContext();
    const navigate = useNavigate();

    const onChange: PaginationProps['onChange'] = useCallback((page: number) => {
        getZombiesByOwner(page);
    }, []);

    if (!zombiesId.length) {
        return (
            <Row align="middle" style={{ height: '65vh' }}>
                <Row justify="center" style={{ width: '100%' }}>
                    <h1 style={{ color: '#b6a764' }}>To play you need a Zombie NFT</h1>
                </Row>
                <Row justify="center" style={{ width: '100%' }}>
                    <CardButtonAction onClick={() => navigate(Paths.MARKETPLACE)}>
                        Buy some zombies
                    </CardButtonAction>
                </Row>
                <Row justify="center" style={{ width: '100%' }}>
                    <CardButtonAction onClick={() => navigate(Paths.ZOMBIE_MINT)}>
                        Mint your zombie
                    </CardButtonAction>
                </Row>
                {mintFreeDisponible &&
                <Row justify="center" style={{ width: '100%' }}>
                    <CardButtonAction onClick={() => navigate(Paths.ZOMBIE_MINT_FREE)}>
                        Mint Free your zombie
                        <Tooltip title={`hurry up only ${mintFreeLeft} left`}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Tooltip>
                    </CardButtonAction>
                </Row>
                }
            </Row>
        );
    }

    return (
        <>
            <Row>
                <h1 style={{ color: '#b6a764' }}>Your Zombie Army</h1>
            </Row>
            <Row gutter={[8, 8]}>
            { map(zombiesId, id => (
                <Col key={id} md={6} xxl={4}>
                    <ZombieArmy id={id} />
                </Col>
            )) }
            </Row>
            <CZBPagination pageSize={pageSize} total={balanceOf} onChange={onChange} />
        </>
    )
}

export default Home;