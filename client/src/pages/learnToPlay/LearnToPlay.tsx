import React from 'react';
import { Image } from "antd";
import ButtonAction from '@/components/button/ButtonAction';
import { useNavigate } from 'react-router';
import { Paths } from '@/router/RouteConsts';
import logo from "/images/cryptozombies_battle_logo_400.png";
import { CardContentStyled, ContainerStyled, ParagraphStyled, SectionStyled, TitleStyled } from './styles';

const LearnToPlay: React.FC = () => {
    const navigate = useNavigate();

    return (
        <ContainerStyled>
            <div style={{ width: '100%', textAlign: 'center' }}> 
                <Image src={logo} width={300} preview={false} onClick={() => navigate(Paths.HOME)} />
            </div>
            
            <TitleStyled level={2}>🧟 Learn to Play — Survivor's Guide</TitleStyled>

            <SectionStyled>
                <CardContentStyled>
                    <TitleStyled level={3}>🔬 ZOMBIE GENES</TitleStyled>
                    <ParagraphStyled>
                        Each zombie is born with a <strong>unique 16-digit decimal gene</strong>. The last digit is a <strong>special marker</strong>. The gene is generated based on the chosen name and a random number.
                    </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>🧍 OWNING A ZOMBIE</TitleStyled>
                <ParagraphStyled>
                    Every player can <strong>adopt 1 zombie for free</strong>. To have more than one, you need to buy or generate new zombies.
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>⚔️ BATTLES</TitleStyled>
                <ParagraphStyled>
                    You can start battles against other accounts once per day. Choose a <strong>target account</strong> and an <strong>opponent zombie</strong> to fight. The chance of victory is based on level, strength, agility, and resilience.
                </ParagraphStyled>
                <ParagraphStyled>
                    Winning a battle allows your zombie to <strong>level up</strong> and <strong>generate a new zombie</strong>: if you are on a winning streak of 7 (your winning streak changes when your opponents attack you and lose), after 7 wins the streak resets. Wins and losses are recorded.
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>🍖 FEEDING</TitleStyled>
                <ParagraphStyled>
                    You can <strong>feed your zombie once per 6 hour</strong>. After <strong>10 feedings</strong>, a new zombie will be generated automatically.
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>🛒 TRADING & MARKET</TitleStyled>
                <ParagraphStyled>
                    Zombies are <strong>NFTs</strong>. You can <strong>sell them on the marketplace</strong>, setting a price above <strong>0.0002 EHT</strong>. A tax of <strong>0.0002 EHT</strong> is charged per sale.
                </ParagraphStyled>
                <ParagraphStyled>
                    The sale amount (after tax) is sent to the original owner.
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>💳 PAID UPGRADES</TitleStyled>
                <ParagraphStyled>
                    - Level up: <strong>0.001 ether</strong><br/>
                    - Change name: <strong>0.002 ether</strong><br/>
                    - Change DNA: <strong>0.003 ether</strong>
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>🧾 QUERIES</TitleStyled>
                <ParagraphStyled>
                    You can query:
                    <ul>
                    <li>Number of your zombies</li>
                    <li>List of your zombies</li>
                    <li>Individual zombie details</li>
                    <li>Zombies by address</li>
                    <li>Zombies activities</li>
                    <li>Zombies listed in the store</li>
                    <li>Zombies by ID</li>
                    <li>Marketplace</li>
                    <li>Ranking</li>
                    </ul>
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <SectionStyled>
                <CardContentStyled>
                <TitleStyled level={3}>🏆 RANKING</TitleStyled>
                <ParagraphStyled>
                    Accounts with the highest scores appear in the ranking. Zombie score is calculated as:
                </ParagraphStyled>
                <ParagraphStyled>
                    <pre>
                        uint32 score = (level * 10) + (wins * 5) - (losses * 3);
                        <br/>
                        if (score &lt; 10) score = 10;
                    </pre>
                </ParagraphStyled>
                </CardContentStyled>
            </SectionStyled>

            <ButtonAction onClick={() => navigate(Paths.HOME)}>Play Now</ButtonAction>
        </ContainerStyled>
    )
}

export default LearnToPlay;
