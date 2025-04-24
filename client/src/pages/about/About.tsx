import React from 'react';
import styled from 'styled-components';
import { Card, Typography, Divider, Space } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const About: React.FC = () => {
  return (
    <Container>
      <StyledCard>
        <Typography>
          <Title level={2}>About the Game</Title>
          <Paragraph>
            This game was born out of a desire for knowledge and hands-on learning. It started after I completed the
            <Link href="https://cryptozombies.io/" target="_blank" rel="noopener noreferrer"> CryptoZombies </Link>
            course, which inspired me to turn the concepts I learned into a real, functional project.
          </Paragraph>

          <Paragraph>
            The project is <Text strong>open source</Text>, with the goal of promoting transparency and giving others the opportunity to learn, explore the code, and see how a course can evolve into a production-level project.
            You can check out the full repository here:
            <br />
            <Link href="https://github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft" target="_blank" rel="noopener noreferrer">
              github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft
            </Link>
          </Paragraph>

          <Paragraph>
            The game's <Text strong>small fees exist solely to cover server costs</Text> and keep the project online. None of the fees are for personal profit — the focus here is on learning, building, and sharing.
          </Paragraph>

          <Paragraph>
            Play, explore the game, keep the marketplace active, and share it with the community!
          </Paragraph>

          <Paragraph>
            If you find any bugs or unexpected behavior, please report them by opening an issue here:
            <br />
            <Link href="https://github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft/issues" target="_blank" rel="noopener noreferrer">
              github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft/issues
            </Link>
          </Paragraph>

          <Paragraph>
            Special thanks ❤️ to <Link href="https://cryptozombies.io/" target="_blank" rel="noopener noreferrer"> CryptoZombies </Link> for the knowledge foundation that made all of this possible.
          </Paragraph>
          
          <Paragraph>
            Thanks ❤️ to <Link href="https://www.cryptokitties.co/" target="_blank" rel="noopener noreferrer"> CryptoKitties </Link> for the public api and feeding zombies with kitties.
          </Paragraph>

          <Divider />

          <Title level={4}>Network</Title>
          <Paragraph>
            <Text strong>Network Name:</Text> Base Testnet (Sepolia) <br />
            <Text strong>Description:</Text> A public testnet for Base <br />
            <Text strong>RPC Endpoint:</Text> https://sepolia.base.org (rate limited, not for production) <br />
            <Text strong>Chain ID:</Text> 84532 <br />
            <Text strong>Currency Symbol:</Text> ETH <br />
            <Text strong>Block Explorer:</Text> <Link href="https://sepolia-explorer.base.org" target="_blank" rel="noopener noreferrer">https://sepolia-explorer.base.org</Link>
          </Paragraph>

          <Divider />

          <Title level={4}>Contracts</Title>
          <Paragraph>
            <Space direction="vertical">
              <Text><Text strong>CryptozombiesBattle:</Text> <Link href="https://base-sepolia.blockscout.com/address/0xAFDcaba9d11BbbA54F4288a7A261cC70f4EAFf47" target="_blank" rel="noopener noreferrer">0xAFDcaba9d11BbbA54F4288a7A261cC70f4EAFf47</Link></Text>
              <Text><Text strong>CryptozombiesBattleRanking:</Text> <Link href="https://base-sepolia.blockscout.com/address/0x7f45227025F2c39491D5e393a380062A4e6fcb7e" target="_blank" rel="noopener noreferrer">0x7f45227025F2c39491D5e393a380062A4e6fcb7e</Link></Text>
            </Space>
          </Paragraph>
        </Typography>
      </StyledCard>
    </Container>
  );
};

export default About;
