import { Button, Col, Row } from 'antd';
import React, { useCallback, useRef } from 'react';
import { useZombieAttackContext } from './context/ZombieAttackContextProvider';
import { map } from 'lodash';
import ZombieEnemy from './components/ZombieEnemy';
import ZombieCard from 'src/components/zombie/ZombieCard';
import { IZombie } from 'src/store/interface/zombie/IZombie';
import Chat, { IChatRef } from './components/Chat';
import { useParams } from 'react-router';
import { useAuthContext } from 'src/context/auth/AuthContextProvider';

const ZombieAttack: React.FC = () => {
    const { address } = useAuthContext();
    const { addressEnemie } = useParams();
    const { zombie, zombies } = useZombieAttackContext();
    const chatRef = useRef<IChatRef>(null);

    const showChat = useCallback(() => {
        chatRef.current?.showChat();
    }, [chatRef])

    return (
        <>
        <Row justify="space-between" align="middle">
            <h1 style={{ color: '#b6a764' }}>Choose a zombie to fight {zombie?.name}</h1>
            <Button onClick={showChat}>
                Battle Chat
            </Button>
        </Row>
        <Row>
            <Col span={4}>
                <ZombieCard zombie={zombie as IZombie} />
            </Col>
            <Col span={20}>
                {zombies?.length ?
                <Row gutter={[8, 8]}>
                { map(zombies, zomb => (
                    <Col key={zomb.id}>
                        <ZombieEnemy zombie={zomb} />
                    </Col>
                )) }
                </Row> :
                <Row justify="center" align="middle">
                    <p>Loading enemies...</p>
                </Row>
                }
            </Col>
        </Row>
        <Chat ref={chatRef} from={address} to={addressEnemie || ''} />
        </>
    )
}

export default ZombieAttack;
