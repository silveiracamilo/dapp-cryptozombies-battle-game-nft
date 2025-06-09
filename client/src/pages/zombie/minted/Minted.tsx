import { Button, Result, Row } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Zombie } from '@/components/zombie/Zombie';
import { Paths } from '@/router/RouteConsts';

const ZombieMinted: React.FC = () => {
    const { id, name, dna = ''} = useParams();
    const navigate = useNavigate();

    return (
        <Row justify="center">
            <Result
                status="success"
                title={`Successfully Created Zombie ${name} #${id}`}
                subTitle={`DNA: ${dna}, blockchain write 1-5 minutes, please wait.`}
                extra={[
                    <Zombie dna={dna} key={dna} />,
                    <Button type="primary" key="army" onClick={() => navigate(Paths.HOME)}>
                        Go Army
                    </Button>,
                ]}
            />
        </Row>
    )
}

export default ZombieMinted;