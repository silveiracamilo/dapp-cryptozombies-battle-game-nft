import { IZombie } from "src/store/interface/zombie/IZombie";
import { Zombie } from "./Zombie";
import styled from "styled-components";
import { ConfigProvider, Progress, ProgressProps, Row } from "antd";

interface IZombieCard {
    zombie: IZombie
    zombieHeight?: number
    zombieScale?: number
    showWinAndFed?: boolean
}

const winColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '40%': '#ffe58f',
    '60%': '#adfc8e',
    '100%': '#87d068',
};

const fedColors: ProgressProps['strokeColor'] = {
    '0%': '#ffccc7',
    '40%': '#ffe58f',
    '60%': '#87d068',
    '100%': '#87d068',
};

const ZombieCard: React.FC<IZombieCard> = ({ zombie, zombieHeight = 338, zombieScale = 1, showWinAndFed = true }) => {

    if (!zombie) {
        return <></>;
    }

    return (
        <Card>
            <Row justify="center" style={{ height: `${zombieHeight}px` }}>
                <div style={{ transform: `scale(${zombieScale})`, transformOrigin: 'top' }}>
                    <Zombie dna={zombie.dna} />
                </div>
                {showWinAndFed &&
                <div style={{ position: 'absolute', marginLeft: "calc(100% - 65px)", top: 245, textAlign: 'center' }}>
                    <Progress
                        type="dashboard"
                        size={45}
                        percent={((zombie.winCount % 7) / 7) * 100}
                        strokeColor={winColors}
                        trailColor="#00000055"
                        format={() => <strong style={{ color:'#FFF'}}>Win</strong>}
                    />
                    <Progress
                        type="dashboard"
                        size={45}
                        percent={((zombie.fedCount % 10) / 10) * 100}
                        strokeColor={fedColors}
                        trailColor="#00000055"
                        format={() => <strong style={{ color:'#FFF'}}>Fed</strong>}
                    />
                </div>
                }
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
