import { IZombie } from "src/store/interface/zombie/IZombie"

const HEAD_VARIATIONS = 7
const EYES_VARIATIONS = 11
const SHIRT_VARIATIONS = 6

export const zombieMapper = (id: number, zombie: (string | number)[]): IZombie => {
    const name = zombie[0].toString();
    const dna = zombie[1].toString();
    const score = +zombie[2].toString();
    const birthTime = +zombie[3].toString();
    const level = +zombie[4].toString();
    const attackReadyTime = +zombie[5].toString();
    const fedReadyTime = +zombie[6].toString();
    const winCount = +zombie[7].toString();
    const lossCount = +zombie[8].toString();
    const attackVictoryCount = +zombie[9].toString();
    const fedCount = +zombie[10].toString();
    return {
        id: parseInt(id.toString()),
        name,
        dna,
        score,
        birthTime,
        level,
        attackReadyTime,
        fedReadyTime,
        winCount,
        lossCount,
        attackVictoryCount,
        fedCount,
        ...zombieGenesMapper(dna),
    };
};

const getHueColor = (value: string) => {
    return parseInt(`${Number(value) / 100 * 360}`, 10)
}

// const getStatValue = (value: string, min: number, max: number) => {
//     return min + (Number(value) % (max - min + 1)) // Garante um valor entre min e max
// }

export const zombieGenesMapper = (dna: string = '') => {
    const zombieDna = dna.padStart(16, '0')
    const catMode = zombieDna.endsWith('99')
    const dnaUint = +dna;

    const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
    const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
    const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
    const skinColor = getHueColor(zombieDna.substring(6, 8))
    const eyeColor = getHueColor(zombieDna.substring(8, 10))
    const clothesColor = getHueColor(zombieDna.substring(10, 12))
    
    // const strength = getStatValue(zombieDna.substring(12, 14), 50, 99) // Força entre 50-99
    // const agility = getStatValue(zombieDna.substring(14, 16), 50, 99) // Agilidade entre 50-99
    // const resilience = getStatValue(zombieDna.substring(10, 12), 50, 99) // Resiliência entre 50-99
    const strength = 50 + (dnaUint % 50); // Força entre 50-99
    const agility = 50 + ((dnaUint / 100) % 50); // Agilidade entre 50-99
    const resilience = 50 + ((dnaUint / 10000) % 50); // Resistência entre 50-99

    return {
        head,
        eye,
        shirt,
        skinColor,
        eyeColor,
        clothesColor,
        catMode,
        strength,
        agility,
        resilience,
    }
}