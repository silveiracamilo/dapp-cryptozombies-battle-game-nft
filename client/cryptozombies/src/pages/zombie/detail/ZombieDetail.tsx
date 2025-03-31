import { Button, Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { Zombie } from 'src/components/zombie/Zombie';
import { useZombieDetailContext } from './context/ZombieDetailContextProvider';
import { zombieGenesMapper } from 'src/store/mapper/zombie/ZombieMapper';

const ZombieDetail: React.FC = () => {
    const { zombie } = useZombieDetailContext();
    

    if (!zombie) {
        return <div>loading...</div>;
    }

    const genes = useMemo(() => zombieGenesMapper(zombie.dna), [zombie.dna]);

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
                <p><strong>Ready Time</strong>: {zombie.readyTime}</p>
                <p><strong>Head gene</strong>: {genes.head}</p>
                <p><strong>Eye gene</strong>: {genes.eye}</p>
                <p><strong>Shirt gene</strong>: {genes.shirt}</p>
                <p><strong>Skin color gene</strong>: {genes.skinColor}</p>
                <p><strong>Eye color gene</strong>: {genes.eyeColor}</p>
                <p><strong>Clothes color gene</strong>: {genes.clothesColor}</p>
            </Col>
        </Row>
        </>
    )
}

export default ZombieDetail;