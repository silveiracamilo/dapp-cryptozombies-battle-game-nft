import { IZombie } from "src/store/interface/zombie/IZombie";
import { useZombieAttackContext } from "../context/ZombieAttackContextProvider";
import { debounce } from "lodash";
import ZombieCard from "src/components/zombie/ZombieCard";
import CardButtonAction from "src/components/button/CardButtonAction";
import { CardFooterStyled, CardStyled } from "./styles";

const ZombieEnemy = ({ zombie }: { zombie: IZombie }) => {
    const { attack } = useZombieAttackContext();

    return (
        <CardStyled>
            <ZombieCard zombie={zombie} />
            <CardFooterStyled>
                <CardButtonAction onClick={debounce(() => attack(zombie.id), 200)}>Attack that</CardButtonAction>
            </CardFooterStyled>
        </CardStyled>
    )
}

export default ZombieEnemy;
