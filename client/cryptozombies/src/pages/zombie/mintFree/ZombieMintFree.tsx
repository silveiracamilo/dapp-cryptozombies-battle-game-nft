import { Button, Col, Form, Row } from 'antd';
import React, { useCallback } from 'react';
import { useZombieMintFreeContext } from './context/ZombieMintFreeContextProvider';
import { debounce } from 'lodash';

const ZombieMintFree: React.FC = () => {
    const { mintFree } = useZombieMintFreeContext();

    const onFinish = useCallback(() => {
        debounce(() => mintFree(), 200)();
    }, []);

    return (
        <Row>
            <h1 style={{ color: '#b6a764' }}>Mint Free your zombie NFT</h1>
            <Row style={{ width: '100%' }}>
                <Col span={8}>
                    <Form
                        onFinish={onFinish}
                    >
                        <Row>
                            <Button htmlType="submit">Mint Free</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Row>
    )
}

export default ZombieMintFree;
