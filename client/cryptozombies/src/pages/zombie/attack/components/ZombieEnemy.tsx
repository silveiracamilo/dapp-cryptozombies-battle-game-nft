import { Button, Card, Row } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useZombieAttackContext } from "../context/ZombieAttackContextProvider";
import { debounce } from "lodash";
import ZombieCard from "src/components/zombie/ZombieCard";

const ZombieEnemy = ({ zombie }: { zombie: IZombie }) => {
    const { attack } = useZombieAttackContext();

    return (
        <Card
            style={{ width: 300 }}
            cover={<ZombieCard zombie={zombie} />}
        >
            <Row justify="center">
                <Button onClick={debounce(() => attack(zombie.id), 200)}>Attack that</Button>
            </Row>
        </Card>
    )
}

export default ZombieEnemy;
