import { IZombie } from "src/store/interface/zombie/IZombie"

const HEAD_VARIATIONS = 7
const EYES_VARIATIONS = 11
const SHIRT_VARIATIONS = 6

export const zombieMapper = (zombie: any[]): IZombie => {
    const level = +zombie[2].toString();
    const winCount = +zombie[4].toString();
    const lossCount = +zombie[5].toString();
    const score = level + winCount + lossCount;
    return {
        name: zombie[0],
        dna: zombie[1].toString(),
        readyTime: +zombie[3].toString(),
        level,
        winCount,
        lossCount,
        score,
    };
};

const getHueColor = (value: string) => {
    return parseInt(`${Number(value) / 100 * 360}`, 10)
}

export const zombieGenesMapper = (dna: string) => {
    const zombieDna = dna.padStart(16, '0')
    const catMode = zombieDna.endsWith('99')

    const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
    const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
    const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
    const skinColor = getHueColor(zombieDna.substring(6, 8))
    const eyeColor = getHueColor(zombieDna.substring(8, 10))
    const clothesColor = getHueColor(zombieDna.substring(10, 12))

    return {
        head,
        eye,
        shirt,
        skinColor,
        eyeColor,
        clothesColor,
        catMode,
    }
}