import { Image, Row } from 'antd';
import React from 'react';
import { useLoginContext } from './context/LoginContextProvider';
import { debounce } from 'lodash';
import logo from "/images/cryptozombies_battle_logo_400.png";
import ButtonAction from 'src/components/button/ButtonAction';

const Login: React.FC = () => {
    const { doAuth } = useLoginContext();

    return (
        <Row style={{ width: '100%', height: '65vh' }} align="middle"  justify="center">
            <Row style={{ width: '400px' }} justify="center">
                <Image src={logo} width={400} preview={false} />
                <ButtonAction onClick={debounce(doAuth, 200)} style={{marginTop: '40px'}}>Connect Wallet to Play</ButtonAction>
            </Row>
        </Row>
    )
}

export default Login;