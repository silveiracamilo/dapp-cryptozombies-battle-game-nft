const HEAD_VARIATIONS = 7;
const EYES_VARIATIONS = 11;
const SHIRT_VARIATIONS = 6;

export default class ZombieGenesMapper {
    protected static getHueColor(value: string) {
        return parseInt(`${Number(value) / 100 * 360}`, 10);
    };

    static mapper(dna = '') {
        const zombieDna = dna.padStart(16, '0')
        const catMode = zombieDna.endsWith('99')
        const dnaUint = +dna;
    
        const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
        const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
        const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
        const skinColor = this.getHueColor(zombieDna.substring(6, 8))
        const eyeColor = this.getHueColor(zombieDna.substring(8, 10))
        const clothesColor = this.getHueColor(zombieDna.substring(10, 12))
        const strength = 50 + (dnaUint % 50); // strength entre 50-99
        const agility = 50 + ((dnaUint / 100) % 50); // agility entre 50-99
        const resilience = 50 + ((dnaUint / 10000) % 50); // resilience entre 50-99
    
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
}

