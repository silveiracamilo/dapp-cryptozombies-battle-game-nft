import React from 'react';
import { Button, Card, Col, Image, Row } from 'antd';
import { debounce, map } from 'lodash';
import { useZombieFeedContext } from './context/ZombieFeedContextProvider';
import { Zombie } from 'src/components/zombie/Zombie';

const { Meta } = Card;

const ZombieFeed: React.FC = () => {
    const { zombie, kitties, feedOnKitty } = useZombieFeedContext();

    return (
        <>
            <Row justify="center">
                <h1>Feed zombie {zombie?.name} with CryptoKitties</h1>
            </Row>
            <Row justify="center" align="middle">
                <Col span={4}>
                    <Zombie dna={zombie?.dna || ''} />
                </Col>
                <Col span={20}>
                    {kitties?.length ?
                    <Row justify="center">
                        {map(kitties, kitty => (
                            <Col span={4} key={kitty.id}>
                                <Card
                                    style={{ width: 200 }}
                                    cover={<Image src={kitty.image_url_cdn} width={200} />}
                                    actions={[
                                        <Button 
                                            onClick={debounce(() => feedOnKitty(kitty.genes, kitty.id), 200)}
                                        >
                                            Eat this
                                        </Button>,
                                    ]}
                                >
                                    <Meta
                                        title={`${kitty.name}`}
                                        description={`#${kitty.id}`}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row> :
                    <Row justify="center" align="middle">
                        <p>Loading kitties...</p>
                    </Row>
                    }
                </Col>
            
            </Row>
        </>
    )
}

export default ZombieFeed;