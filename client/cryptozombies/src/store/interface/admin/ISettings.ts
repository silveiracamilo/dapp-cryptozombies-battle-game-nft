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
    tax: bigint
    minPrice: bigint
}

export default ISettings;