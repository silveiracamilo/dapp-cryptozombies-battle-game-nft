import { Row } from 'antd';
import { map } from 'lodash';
import React from 'react';
import { useHomeContext } from './context/HomeContextProvider';
import ZombieArmy from './components/ZombieArmy';

const Home: React.FC = () => {
    const { zombiesId } = useHomeContext();

    return (
        <>
            <Row justify="center">
                <h1>Army</h1>
            </Row>
            <Row>
            { map(zombiesId, id => (
                <ZombieArmy id={id} key={id} />
            )) }
            </Row>
        </>
    )
}

export default Home;