import React from 'react';
import { Card, Container, Description, Info, SectionTitle, Steps, Title } from './styles';
import { useAuthContext } from 'src/context/auth/AuthContextProvider';
import { debounce, isEmpty } from 'lodash';
import { useZombieMintFreeContext } from './context/ZombieMintFreeContextProvider';
import { addressFormat } from 'utils/formatter';
import ButtonAction from 'src/components/button/ButtonAction';


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
                    <li>2. Like and comment on the pinned post by tagging 2 friends</li>
                    <li>3. Fill out the <a href="https://docs.google.com/forms/d/e/1FAIpQLSdynCzYM143at1uNEFUkFkbj1MkQxHva-zsdqZpHqzjPxLE3A/viewform?usp=header" target="_blank" rel="noreferrer">entry form</a> with your wallet address and X address</li>
                    <li><i>After submitting the form, wait 24 hours for validation</i></li>
                </Steps>

                <Info>
                📅 Entries until: June 30th<br />
                👾 Limited free mints<br />
                </Info>

                <ButtonAction onClick={debounce(doAuth, 150)} disabled={!isEmpty(address)}>
                    {address ? `Connected: ${addressFormat(address)}` : "Connect Wallet"}
                </ButtonAction>
                <ButtonAction onClick={debounce(mintFree, 200)} disabled={!address}>
                    Mint Free
                </ButtonAction>
            </Card>
        </Container>
    )
}

export default ZombieMintFree;