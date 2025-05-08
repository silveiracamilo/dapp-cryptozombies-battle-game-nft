export const getGasLimit = (estimatedGas: bigint, addPercentage:bigint = 20n) => {
    const buffer = (estimatedGas * addPercentage) / 100n;
    const gasLimit = estimatedGas + buffer;
    return gasLimit;
}