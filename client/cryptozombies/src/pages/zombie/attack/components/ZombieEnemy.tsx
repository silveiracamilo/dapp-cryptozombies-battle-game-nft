import { Zombie } from "src/components/zombie/Zombie";
import { Button, Card } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { useZombieAttackContext } from "../context/ZombieAttackContextProvider";
import { debounce } from "lodash";

const { Meta } = Card;

const ZombieEnemy = ({ zombie }: { zombie: IZombie }) => {
    const { attack } = useZombieAttackContext();

    return (
        <Card
            style={{ width: 300 }}
            cover={zombie ? <Zombie dna={zombie.dna} /> : null}
            actions={[
                <Button onClick={debounce(() => attack(zombie.id), 200)}>Attach that</Button>,
            ]}
        >
            <Meta
                title={`${zombie?.name} - ${zombie?.dna}`}
                description={`Level: ${zombie?.level} Score: ${zombie?.score}`}
            />
        </Card>
    )
}

export default ZombieEnemy;
