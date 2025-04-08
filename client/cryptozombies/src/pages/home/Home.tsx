import { Col, Row } from 'antd';
import { map } from 'lodash';
import React from 'react';
import { useHomeContext } from './context/HomeContextProvider';
import ZombieArmy from './components/ZombieArmy';

const Home: React.FC = () => {
    const { zombiesId } = useHomeContext();

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
        </>
    )
}

export default Home;