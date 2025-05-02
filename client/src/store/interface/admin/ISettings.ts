interface ISettings {
    cooldownTimeAttack: number
    cooldownTimeFeeding: number
    mintFee: bigint
    totalAttackVictoryToGetReward: number
    totalFedToGetReward: number
    levelUpFee: bigint
    changeNameFee: bigint
    changeDNAFee: bigint
    baseUrlTokenURI: string
    merkleRoot: string  
    tax: bigint
    minPrice: bigint
    balanceMarket: bigint
}

export default ISettings;