export enum Paths {
    LOGIN = '/login',
    HOME = '/',
    RANKING = '/ranking',
    ZOMBIE_CREATE = '/zombie/create',
    ZOMBIE_CREATE_SUCCESS = '/zombie/create/success/:id/:name/:dna',
    ZOMBIE_DETAIL = '/zombie/detail/:id',
    ZOMBIE_FEED = '/zombie/feed/:id',
    ZOMBIE_FEEDING = '/zombie/feeding/:fromDna/:targetDna/:kittyId/:newDna',
    ZOMBIE_ATTACK = '/zombie/attack/:id/:addressEnemie',
    ZOMBIE_ATTACK_VITORY = '/zombie/attack/vitory/:fromId/:targetId/:newDna',
    ZOMBIE_ATTACK_DEFEAT = '/zombie/attack/defeat/:fromId/:targetId',
    ZOMBIE_BATTLE = '/zombie/battle/:id',
}
