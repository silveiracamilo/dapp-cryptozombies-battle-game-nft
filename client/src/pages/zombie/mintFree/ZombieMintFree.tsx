import React from 'react';
import { Button, Card, Container, Description, Info, SectionTitle, Steps, Title } from './styles';
import { useAuthContext } from 'src/context/auth/AuthContextProvider';
import { debounce, isEmpty } from 'lodash';
import { useZombieMintFreeContext } from './context/ZombieMintFreeContextProvider';
import { addressFormat } from 'utils/formatter';


const ZombieMintFree: React.FC = () => {
    const { address, doAuth } = useAuthContext();
    const { mintFree } = useZombieMintFreeContext();

    return (
        <Container>
            <Card>
                <Title>Mint Free Zombie 🧟‍♂️</Title>
                <Description>
                Ganhe 1 NFT exclusivo e gratuito do nosso jogo pós-apocalíptico! Siga as instruções abaixo para participar.
                </Description>

                <SectionTitle>📌 Como Participar</SectionTitle>
                <Steps>
                    <li>1. Siga o <a href="https://instagram.com/sua_pagina" target="_blank" rel="noreferrer">@sua_pagina</a> no Instagram</li>
                    <li>2. Curta e comente o post fixado marcando 2 amigos</li>
                    <li>3. Preencha o <a href="https://seuformulario.com" target="_blank" rel="noreferrer">formulário de participação</a> com sua wallet e Instagram</li>
                </Steps>

                <Info>
                📅 Participações até: 30 de Abril<br />
                👾 Mints gratuitos limitados<br />
                </Info>

                <Button onClick={debounce(doAuth, 150)} disabled={!isEmpty(address)}>
                    {address ? `Connected: ${addressFormat(address)}` : "Connect Wallet"}
                </Button>
                <Button onClick={debounce(mintFree, 200)} disabled={!address}>
                    Mint Free
                </Button>
            </Card>
        </Container>
    )
}

export default ZombieMintFree;