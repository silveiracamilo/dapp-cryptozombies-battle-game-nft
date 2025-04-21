export enum ZombieEventTypes {
    NewZombie = 'NewZombie',
    SaleZombie = 'SaleZombie',
    BuyZombie = 'BuyZombie',
}

type ZombieEventType = keyof typeof ZombieEventTypes;

export interface IZombieEvent {
    event: ZombieEventType
    timestamp: number
    date: string
}
