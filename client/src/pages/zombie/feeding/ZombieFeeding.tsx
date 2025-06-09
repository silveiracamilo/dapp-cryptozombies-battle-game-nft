import { Button, Card, Col, Image, Row, Spin } from 'antd';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Zombie } from '@/components/zombie/Zombie';
import { Paths } from '@/router/RouteConsts';

const ZombieFeeding: React.FC = () => {
    const { fromDna = '', targetDna = '', kittyId = '', newDna = '' } = useParams();
    const navigate = useNavigate();
    const hasNewZombie = useMemo(() => +newDna !== 0, [newDna]);
    
    return (
        <>
        <Row justify="center">
            <h1 style={{ color: '#b6a764' }}>Zombie feeding {hasNewZombie && ', and created new zombie'}</h1>
        </Row>
        <Row justify="center" align="middle">
            <Col span={5}>
                <Zombie dna={fromDna} />
            </Col>
            <Col span={1} style={{ fontSize: 40 }}>+</Col>
            <Col span={5}>
                <Image 
                    src={`https://img.cn.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/${kittyId}.svg`} 
                    width={250} 
                    placeholder={<Spin spinning />}
                    preview={false}
                />
            </Col>
            { hasNewZombie &&
            <>
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
            </>
            }
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