import React from 'react';
import { Card, Container, Description, Info, SectionTitle, Steps, Title } from './styles';
import { useAuthContext } from 'src/context/auth/AuthContextProvider';
import { debounce, isEmpty } from 'lodash';
import { useZombieMintFreeContext } from './context/ZombieMintFreeContextProvider';
import { addressFormat } from 'utils/formatter';
import ButtonAction from 'src/components/button/ButtonAction';
import CardButtonAction from 'src/components/button/CardButtonAction';
import { Row } from 'antd';


const ZombieMintFree: React.FC = () => {
    const { address, doAuth } = useAuthContext();
    const { mintFree } = useZombieMintFreeContext();

    return (
        <Container>
            <Card>
                <Title>Mint Free Zombie 🧟‍♂️</Title>
                <Description>
                    Win a free exclusive NFT from our post-apocalyptic game! Follow the instructions below to enter.
                </Description>

                <SectionTitle>📌 How to take part</SectionTitle>
                <Steps>
                    <li>1. Follow <a href="https://x.com/zombiesbattle" target="_blank" rel="noreferrer">@zombiesbattle</a> on X</li>
                    <li>2. Repost on the <a href="https://x.com/zombiesbattle/status/1919743975319031912" target="_blank" rel="noreferrer">pinned post</a> by commenting tagging 2 friends your comment</li>
                    <li>3. Fill out the <a href="https://docs.google.com/forms/d/e/1FAIpQLSdynCzYM143at1uNEFUkFkbj1MkQxHva-zsdqZpHqzjPxLE3A/viewform?usp=header" target="_blank" rel="noreferrer">entry form</a> with your wallet address, X address and repost id</li>
                    <li><i>After submitting the form, wait 24 hours for validation</i></li>
                </Steps>

                <Info>
                📅 Entries until: June 30th<br />
                👾 Limited free mints<br />
                </Info>

                <Row justify="center" align="middle">
                    <CardButtonAction onClick={debounce(doAuth, 150)} disabled={!isEmpty(address)} style={{ marginRight: 16 }}>
                        {address ? `Connected: ${addressFormat(address)}` : "Connect Wallet"}
                    </CardButtonAction>
                    <ButtonAction onClick={debounce(mintFree, 200)} disabled={!address}>
                        Mint Free
                    </ButtonAction>
                </Row>
                
            </Card>
        </Container>
    )
}

export default ZombieMintFree;
