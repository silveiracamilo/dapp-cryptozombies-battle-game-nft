import { Button, Col, Form, Input, Row } from 'antd';
import React, { useCallback } from 'react';
import { useZombieMintContext } from './context/ZombieMintContextProvider';
import { debounce } from 'lodash';
import { FormItemStyled } from '@/pages/admin/settings/components/forms/styles';

interface IFormFields {
    name: string
}

const ZombieMint: React.FC = () => {
    const { mintFee, mint } = useZombieMintContext();

    const onFinish = useCallback(({ name }: IFormFields) => {
        debounce(() => mint(name.trim()), 200)();
    }, []);

    return (
        <Row>
            <h1 style={{ color: '#b6a764' }}>Mint your zombie NFT</h1>
            <Row style={{ width: '100%' }}>
                <Col span={8}>
                    <Form
                        onFinish={onFinish}
                    >
                        <p>Price: {mintFee} ETH</p>
                        <FormItemStyled 
                            label="Name"
                            name="name"
                            layout="vertical"
                            normalize={value => value.replace(/[^a-zA-Z0-9 ]/g, '')}
                            rules={[
                                { required: true, message: 'Please input your Zombie Name!' },
                                { pattern: new RegExp(/^[a-zA-Z0-9 ]*$/), message: "No Special Characters Allowed" }
                            ]}
                        >
                            <Input 
                                placeholder="Zombie name" 
                                maxLength={30}
                            />
                        </FormItemStyled>
                        <Row>
                            <Button htmlType="submit">Mint</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Row>
    )
}

export default ZombieMint;
