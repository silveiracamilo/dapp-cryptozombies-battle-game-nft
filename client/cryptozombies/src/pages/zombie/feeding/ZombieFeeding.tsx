import { Button, Card, Col, Image, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Zombie } from 'src/components/zombie/Zombie';
import { Paths } from 'src/router/RouteConsts';

const ZombieFeeding: React.FC = () => {
    const { fromDna = '', targetDna = '', kittyId = '', newDna = '' } = useParams();
    const navigate = useNavigate();
    
    return (
        <>
        <Row justify="center">
            <h1>Zombie fed, and created new zombie</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={5}>
                <Zombie dna={fromDna} />
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>+</Col>
            <Col span={5}>
                {/* <Zombie dna={targetDna} /> */}
                <Image 
                    src={`https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyId}.svg`} 
                    width={250} 
                    preview={false}
                />
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>=</Col>
            <Col span={5}>
                <Zombie dna={newDna} />
            </Col>
            <Col span={7}>
                <p>New Zombie Kitty Generate!</p>
                <Card title="DNA Feeding">
                    {fromDna}
                </Card>
                <Card title="DNA CryptoKitty">
                    {targetDna}
                </Card>
                <Card title="DNA New Zombie Kitty">
                    {newDna}
                </Card>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: 60 }}>
            <Button type="primary" key="army" onClick={() => navigate(Paths.HOME)}>
                Go Army
            </Button>
        </Row>
        </>
    )
}

export default ZombieFeeding;