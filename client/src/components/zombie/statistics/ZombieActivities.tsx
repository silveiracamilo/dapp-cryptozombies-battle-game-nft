import React, { useMemo } from "react";
import { map } from "lodash";
import { INewZombie, ZombieActivitiesType } from "src/store/interface/zombie/ZombieEvents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCancel, faMoneyCheckDollar, faTag } from "@fortawesome/free-solid-svg-icons";
import { IBuy, ISale } from "src/store/interface/marketplace/MarketEvents";
import { formatEther } from "ethers";
import { ZombieEventTypes } from "src/store/interface/event/ZombieEvent";
import { Spin, Timeline } from "antd";
import moment from "moment";
import { addressFormat } from "utils/formatter";

const dateFormat = (date: string) => moment(date).format('LLL');

const itemMapper = {
    [ZombieEventTypes.NewZombie]: {
        children: (event: INewZombie) => `${dateFormat(event.date)} : Birth by ${addressFormat(event.from)}`,
        dot: <FontAwesomeIcon icon={faBirthdayCake} color="#FFF" />
    },
    [ZombieEventTypes.SaleZombie]: {
        children: (event: ISale) => `${dateFormat(event.date)} : Sale ${formatEther(event.price)} ETH by ${addressFormat(event.seller)}`,
        dot: <FontAwesomeIcon icon={faTag} color="#FFF" />
    },
    [ZombieEventTypes.CancelSaleZombie]: {
        children: (event: ISale) => `${dateFormat(event.date)} : Cancel Sale by ${addressFormat(event.seller)}`,
        dot: <FontAwesomeIcon icon={faCancel} color="#FFF" />
    },
    [ZombieEventTypes.BuyZombie]: {
        children: (event: IBuy) => `${dateFormat(event.date)} : Buy by ${addressFormat(event.buyer)}`,
        dot: <FontAwesomeIcon icon={faMoneyCheckDollar} color="#FFF" />
    },
};

interface IZombieActivities {
    loading: boolean
    activities: ZombieActivitiesType
}

const ZombieActivities: React.FC<IZombieActivities> = ({ loading, activities }) => {
    const items = useMemo(() => map(activities, activity => ({
        children: itemMapper[activity.event].children(activity as any),
        dot: itemMapper[activity.event].dot,
    })), [activities]);

    return (
        <Spin spinning={loading}>
            <h2>Activities</h2>
            <Timeline
                style={{ width: '100%' }}
                items={items}
            />
        </Spin>
    );
}

export default ZombieActivities;
