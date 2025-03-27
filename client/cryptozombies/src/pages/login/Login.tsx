import { Button, Image, Layout } from 'antd';
import React from 'react';
import { useLoginContext } from './context/LoginContextProvider';
import { debounce } from 'lodash';
import logo from "assets/images/cryptozombies-logo.png";

const Login: React.FC = () => {
    const { doAuth } = useLoginContext();

    return (
        <Layout style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <Image src={logo} width={300} preview={false} />
            <Button onClick={debounce(doAuth, 150)} style={{marginTop: '40px'}}>Conectar sua carteira</Button>
        </Layout>
    )
}

export default Login;