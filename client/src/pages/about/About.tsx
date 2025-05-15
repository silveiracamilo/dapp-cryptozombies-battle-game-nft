import React from 'react';
import { Typography, Divider, Space } from 'antd';
import { CardStyled, ContainerStyled } from './styles';

const { Title, Paragraph, Text, Link } = Typography;

const cryptozombiesBattleContractAddress = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_CONTRACT_ADDRESS;
const cryptozombiesBattleRankingContractAddress = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_RANKING_CONTRACT_ADDRESS;
const cryptozombiesBattleMarketContractAddress = import.meta.env.VITE_CRYPTOZOMBIES_BATTLE_MARKET_CONTRACT_ADDRESS;
const baseUrlContract = 'https://base-sepolia.blockscout.com/address/';

const About: React.FC = () => {
  return (
    <ContainerStyled>
      <CardStyled>
        <Typography>
          <Title level={2}>About the Game</Title>
          <Paragraph>
            This game was born out of a desire for knowledge and hands-on learning. It started after I completed the
            <Link href="https://cryptozombies.io/" target="_blank"> CryptoZombies </Link>
            course, which inspired me to turn the concepts I learned into a real, functional project.
          </Paragraph>

          <Paragraph>
            The project is <Text strong>open source</Text>, with the goal of promoting transparency and giving others the opportunity to learn, explore the code, and see how a course can evolve into a production-level project.
            You can check out the full repository here:
            <br />
            <Link href="https://github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft" target="_blank">
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
            <Link href="https://github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft/issues" target="_blank">
              github.com/silveiracamilo/dapp-cryptozombies-battle-game-nft/issues
            </Link>
          </Paragraph>

          <Paragraph>
            Special thanks ❤️ to <Link href="https://cryptozombies.io/" target="_blank"> CryptoZombies </Link> for the knowledge foundation that made all of this possible.
          </Paragraph>
          
          <Paragraph>
            Thanks ❤️ to <Link href="https://www.cryptokitties.co/" target="_blank"> CryptoKitties </Link> for the public api and feeding zombies with kitties.
          </Paragraph>

          <Divider />

          <Title level={4}>Network</Title>
          <Paragraph>
            <Text strong>Network Name:</Text> Base Testnet (Sepolia) <br />
            <Text strong>Description:</Text> A public testnet for Base <br />
            <Text strong>RPC Endpoint:</Text> https://sepolia.base.org (rate limited, not for production) <br />
            <Text strong>Chain ID:</Text> 84532 <br />
            <Text strong>Currency Symbol:</Text> ETH <br />
            <Text strong>Block Explorer:</Text> <Link href="https://sepolia-explorer.base.org" target="_blank">https://sepolia-explorer.base.org</Link> <br />
            <Text strong>Faucets:</Text> <Link href="https://docs.base.org/chain/network-faucets" target="_blank">https://docs.base.org/chain/network-faucets</Link>
          </Paragraph>

          <Divider />

          <Title level={4}>Contracts</Title>
          <Paragraph>
            <Space direction="vertical">
              <Text>
                <Text strong>CryptozombiesBattle: </Text>
                <Link href={`${baseUrlContract}${cryptozombiesBattleContractAddress}`} target="_blank">
                  {cryptozombiesBattleContractAddress}
                </Link>
              </Text>
              <Text>
                <Text strong>CryptozombiesBattleRanking: </Text>
                <Link href={`${baseUrlContract}${cryptozombiesBattleRankingContractAddress}`} target="_blank">
                  {cryptozombiesBattleRankingContractAddress}
                </Link>
              </Text>
              <Text>
                <Text strong>CryptozombiesBattleMarket: </Text>
                <Link href={`${baseUrlContract}${cryptozombiesBattleMarketContractAddress}`} target="_blank">
                  {cryptozombiesBattleMarketContractAddress}
                </Link>
              </Text>
            </Space>
          </Paragraph>
        </Typography>
      </CardStyled>
    </ContainerStyled>
  );
};

export default About;
