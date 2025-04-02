import { Button, Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieDetailContext } from './context/ZombieDetailContextProvider';
import moment from 'moment';

const ZombieDetail: React.FC = () => {
    const { zombie } = useZombieDetailContext();
    

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
        <Row justify="center" align="middle" gutter={20}>
            <h1>{zombie.name}</h1>
            <Button>Change Name</Button>
        </Row>
        <Row justify="center" align="middle">        
            <Col span={6} style={{ float: 'right' }}>
                <Zombie dna={zombie.dna} />
            </Col>
            <Col span={6}>
                <p><strong>DNA</strong>: {zombie.dna}</p>
                <p><strong>Level</strong>: {zombie.level}</p>
                <p><strong>Wins</strong>: {zombie.winCount}</p>
                <p><strong>Losses</strong>: {zombie.lossCount}</p>
                {/* <p><strong>Ready Time</strong>: {zombie.readyTime}</p> */}
                {/* <p><strong>Ready Time</strong>: {moment.duration(zombie.readyTime - moment().millisecond(),'milliseconds').humanize()}</p> */}
                <p><strong>Ready Time</strong>: {parseReadyTime}</p>
                
                <p><strong>Strength</strong>: {zombie.strength}</p>
                <p><strong>Agility</strong>: {zombie.agility}</p>
                <p><strong>Resilience</strong>: {zombie.resilience}</p>

                <p><strong>Head gene</strong>: {zombie.head}</p>
                <p><strong>Eye gene</strong>: {zombie.eye}</p>
                <p><strong>Shirt gene</strong>: {zombie.shirt}</p>
                <p><strong>Skin color gene</strong>: {zombie.skinColor}</p>
                <p><strong>Eye color gene</strong>: {zombie.eyeColor}</p>
                <p><strong>Clothes color gene</strong>: {zombie.clothesColor}</p>
            </Col>
        </Row>
        </>
    )
}

export default ZombieDetail;