import { useCallback, useEffect, useState } from "react";
import { Card, notification } from "antd";
import { IZombie } from "src/store/interface/zombie/IZombie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import CardButtonAction from "src/components/button/CardButtonAction";
import { useMarketplaceContext } from "../context/MarketplaceContextProvider";
import IZombieSale from "src/store/interface/marketplace/IZombieSale";
import { addressFormat } from "utils/formatter";
import { formatEther } from "ethers";
import { debounce } from "lodash";
import ZombieCard from "src/components/zombie/ZombieCard";

const { Meta } = Card;

interface IZombieSaleProps {
    zombieSale: IZombieSale
}

const ZombieSale: React.FC<IZombieSaleProps> = ({ zombieSale }) => {
    const { getZombieById, buyZombie } = useMarketplaceContext();
    // const navigate = useNavigate();
    const [zombie, setZombie] = useState<IZombie>();

    useEffect(() => {
        handleGetZombieById();
    }, [zombieSale]);

    const handleGetZombieById = useCallback(async () => {
        try {
            const zombie = await getZombieById(zombieSale.zombieId);
            setZombie(zombie);
        } catch (error: any) {
            notification.error({
                message: 'Error in get zombie',
                description: error.reason || 'Error generic'
            });
        }
    }, [zombieSale]);

    // const detail = useCallback(() => {
    //     navigate(Paths.ZOMBIE_DETAIL.replace(':id', zombieSale.zombieId.toString()));
    // }, []);

    return (
        <Card
            cover={<ZombieCard zombie={zombie as IZombie} zombieHeight={180} zombieScale={0.5} />}
            actions={[
                <CardButtonAction 
                    icon={<FontAwesomeIcon icon={faTag} />}
                    onClick={debounce(() => buyZombie(zombieSale.zombieId, zombieSale.price), 200)}
                >
                    Buy with ETH
                </CardButtonAction>,
            ]}
        >
            <Meta
                title={`Price: ${ formatEther(zombieSale.price) } ETH`}
                // title={`${zombie?.id} # ${zombie?.name}`}
                description={`Seller: ${ addressFormat(zombieSale.seller) }`}
            />
        </Card>
    )
}

export default ZombieSale;
