import { IZombie } from "src/store/interface/zombie/IZombie";
import { Zombie } from "./Zombie";
import styled from "styled-components";
import { Row, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faGaugeSimpleHigh, faHandFist, faStairs, faStar } from "@fortawesome/free-solid-svg-icons";

interface IZombieCard {
    zombie: IZombie
}

const ZombieCard: React.FC<IZombieCard> = ({ zombie }) => {
    
    if (!zombie) {
        return <></>;
    }

    return (
        <Card>
            <Row style={{ width: '100%', gap: 5, padding: 5 }}>
                <Tooltip title="Level">
                    <Stat><FontAwesomeIcon icon={faStairs} /> { zombie.level }</Stat>
                </Tooltip>
                <Tooltip title="Score">
                    <Stat><FontAwesomeIcon icon={faStar} /> { zombie.score }</Stat>
                </Tooltip>
            </Row>
            <Row>
                <Zombie dna={zombie.dna} />
            </Row>
            <Row style={{ gap: 5, padding: 5 }}>
                <Tooltip title="Strength">
                    <Stat><FontAwesomeIcon icon={faDumbbell} /> { zombie.strength.toPrecision(2) }%</Stat>
                </Tooltip>
                <Tooltip title="Agility">
                    <Stat>
                        <FontAwesomeIcon icon={faGaugeSimpleHigh} /> { zombie.agility.toPrecision(2) }%
                    </Stat>
                </Tooltip>
                <Tooltip title="Resilience">
                    <Stat><FontAwesomeIcon icon={faHandFist} /> { zombie.resilience.toPrecision(2) }%</Stat>
                </Tooltip>
            </Row>
        </Card>
    )
}

const Card = styled.div`
    border: 1px solid #ccc;
    /* background-color: #000; */
    /* background-color: #FFF; */
    background-color: #000E58;
    border-radius: 15px;
`;

const Stat = styled.div`
    /* border: solid 1px black; */
    border-radius: 50px;
    padding: 10px;
    /* background-color: #222; */
    /* background: linear-gradient(260deg, #000, #666); */
    background: linear-gradient(260deg, #002344, #000c18);
    /* color: black; */
    color: white;
    font-weight: bold;
    font-size: 16px;
    /* filter: drop-shadow(10px 10px 16px #000099); */
    /* filter: drop-shadow(10px 10px 16px #000099); */
    /* filter: drop-shadow(5px 5px 7px #333); */
    filter: drop-shadow(5px 5px 15px #00670c);
`;

export default ZombieCard;
