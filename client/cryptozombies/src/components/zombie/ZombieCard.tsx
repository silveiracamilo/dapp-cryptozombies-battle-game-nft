import { IZombie } from "src/store/interface/zombie/IZombie";
import { Zombie } from "./Zombie";
import styled from "styled-components";
import { ConfigProvider, Progress, Row } from "antd";

interface IZombieCard {
    zombie: IZombie
    zombieHeight?: number
    zombieScale?: number
}

const ZombieCard: React.FC<IZombieCard> = ({ zombie, zombieHeight = 338, zombieScale = 1 }) => {
    
    if (!zombie) {
        return <></>;
    }

    return (
        <Card>
            <Row justify="center" style={{ height: `${zombieHeight}px` }}>
                <div style={{ transform: `scale(${zombieScale})`, transformOrigin: 'top' }}>
                    <Zombie dna={zombie.dna} />
                </div>
            </Row>
            <ConfigProvider
                theme={{
                    components: {
                        Progress: {
                            lineBorderRadius: 0
                        },
                    },
                }}
            >
                <CardFooterStyle>
                    <div>{zombie.id} # {zombie.name}</div>
                    <div>Level: {zombie.level} | Score: {zombie.score}</div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        Strength:
                        <Progress 
                            percent={+zombie.strength.toPrecision(4)}
                            percentPosition={{ align: 'end', type: 'inner' }}
                            size={['100%', 12]}
                            // strokeColor="#426613"
                            strokeColor="#7ba149"
                            trailColor="#999"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        Agility:
                        <Progress 
                            percent={+zombie.agility.toPrecision(4)}
                            percentPosition={{ align: 'end', type: 'inner' }}
                            size={['100%', 12]}
                            // strokeColor="#1c645d"
                            strokeColor="#16cdbb"
                            trailColor="#999"
                        />
                    </div>
                    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                        Resilience:
                        <Progress 
                            percent={+zombie.resilience.toPrecision(4)}
                            percentPosition={{ align: 'end', type: 'inner' }}
                            size={['100%', 12]}
                            // strokeColor="#a15f12"
                            strokeColor="#d17d1b"
                            trailColor="#999"
                        />
                    </div>
                </CardFooterStyle>
            </ConfigProvider>
        </Card>
    )
}

const Card = styled.div`
    border-radius: 8px;
    background: url("src/assets/images/textured-paper.png");
    background-color: #86835d88;
    background-blend-mode: darken;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const CardFooterStyle = styled(Row)`
    width: 100%;
    background-color: #262819;
    color: #b6a764;
    font-size: 16px;
    font-weight: bold;
    width: '100%';
    padding: 8px;
    display: block;
`;

export default ZombieCard;
