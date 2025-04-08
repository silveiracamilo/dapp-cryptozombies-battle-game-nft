import { Row } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useZombieAttackContext } from "../context/ZombieAttackContextProvider";
import { debounce } from "lodash";
import ZombieCard from "src/components/zombie/ZombieCard";
import styled from "styled-components";
import CardButtonAction from "src/components/button/CardButtonAction";

const ZombieEnemy = ({ zombie }: { zombie: IZombie }) => {
    const { attack } = useZombieAttackContext();

    return (
        <Card>
            <ZombieCard zombie={zombie} />
            <CardFooterStyle>
                <CardButtonAction onClick={debounce(() => attack(zombie.id), 200)}>Attack that</CardButtonAction>
            </CardFooterStyle>
        </Card>
    )
}

export default ZombieEnemy;

const Card = styled.div`
    width: 100%;
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
