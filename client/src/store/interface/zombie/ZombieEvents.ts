import { IZombieEvent } from "../event/ZombieEvent"
import { IBuy, ICancelSale, ISale } from "../marketplace/MarketEvents"

export interface INewZombie extends IZombieEvent {
    zombieId: bigint
    from: string
    name: string
    dna: number
}

export type ZombieActivityType = INewZombie | ISale | IBuy | ICancelSale;

export type ZombieActivitiesType = ZombieActivityType[];
