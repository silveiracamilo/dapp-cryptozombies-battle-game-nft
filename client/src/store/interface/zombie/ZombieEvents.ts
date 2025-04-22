import { IZombieEvent } from "../event/ZombieEvent"

export interface INewZombie extends IZombieEvent {
    zombieId: bigint
    from: string
    name: string
    dna: number
}