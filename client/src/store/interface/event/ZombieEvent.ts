export enum ZombieEventTypes {
    NewZombie = 'NewZombie',
    SaleZombie = 'SaleZombie',
    BuyZombie = 'BuyZombie',
    CancelSaleZombie = 'CancelSaleZombie',
}

type ZombieEventType = keyof typeof ZombieEventTypes;

export interface IZombieEvent {
    event: ZombieEventType
    timestamp: number
    date: string
}
