import { IZombieEvent } from "../event/ZombieEvent"

export interface ISale extends IZombieEvent {
    zombieId: bigint
    price: bigint
    seller: string
}

export interface IBuy extends IZombieEvent {
    zombieId: bigint
    buyer: string
    seller: string
}