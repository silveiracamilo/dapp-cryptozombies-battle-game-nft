const sharp = require('sharp');
const path = require('path');

const HEAD_VARIATIONS = 7;
const EYES_VARIATIONS = 11;
const SHIRT_VARIATIONS = 6;
const basePath = 'public/images/zombieparts';

const getHueColor = (value) => {
    return parseInt(`${Number(value) / 100 * 360}`, 10);
};

const zombieGenesMapper = (dna = '') => {
    const zombieDna = dna.padStart(16, '0')
    const catMode = zombieDna.endsWith('99')
    const dnaUint = +dna;

    const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1
    const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1
    const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1
    const skinColor = getHueColor(zombieDna.substring(6, 8))
    const eyeColor = getHueColor(zombieDna.substring(8, 10))
    const clothesColor = getHueColor(zombieDna.substring(10, 12))
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

const generateZombieImage = async (dna) => {
    const genes = zombieGenesMapper(dna);
    
    const headImage = sharp(path.join(__dirname, `${basePath}/head-${genes.head}@2x.png`)).resize(280, 280);
    const eyesImage = sharp(path.join(__dirname, `${basePath}/eyes-${genes.eye}@2x.png`)).resize(129, 83);
    const shirtImage = sharp(path.join(__dirname, `${basePath}/shirt-${genes.shirt}@2x.png`)).resize(130, 130);
    const mouthImage = sharp(path.join(__dirname, `${basePath}/mouth-1@2x.png`)).resize(60, 48);
    const torsoImage = sharp(path.join(__dirname, `${basePath}/torso-1@2x.png`)).resize(130, 130);

    let leftFeetImage, rightFeetImage, leftLegImage, rightLegImage, leftThighImage, rightThighImage, catLegsImage;

    if (!genes.catMode) {
        leftFeetImage = sharp(path.join(__dirname, `${basePath}/left-feet-1@2x.png`)).resize(40, 27);
        rightFeetImage = sharp(path.join(__dirname, `${basePath}/right-feet-1@2x.png`)).resize(33, 22);
        leftLegImage = sharp(path.join(__dirname, `${basePath}/left-leg-1@2x.png`)).resize(39, 47);
        rightLegImage = sharp(path.join(__dirname, `${basePath}/right-leg-1@2x.png`)).resize(33, 40);
        leftThighImage = sharp(path.join(__dirname, `${basePath}/left-thigh-1@2x.png`)).resize(60, 72);
        rightThighImage = sharp(path.join(__dirname, `${basePath}/right-thigh-1@2x.png`)).resize(59, 71);
    } else {
        catLegsImage = sharp(path.join(__dirname, `${basePath}/catlegs.png`)).resize(100, 123);
    }

    const leftUpperArmImage = sharp(path.join(__dirname, `${basePath}/left-upper-arm-1@2x.png`)).resize(60, 72);
    const rightUpperArmImage = sharp(path.join(__dirname, `${basePath}/right-upper-arm-1@2x.png`)).resize(60, 72);
    const leftForearmImage = sharp(path.join(__dirname, `${basePath}/left-forearm-1@2x.png`)).resize(40, 22);
    const rightForearmImage = sharp(path.join(__dirname, `${basePath}/right-forearm-1@2x.png`)).resize(40, 22);
    const leftHandImage = sharp(path.join(__dirname, `${basePath}/hand1-1@2x.png`)).resize(40, 28);
    const rightHandImage = sharp(path.join(__dirname, `${basePath}/hand-2-1@2x.png`)).resize(40, 28);

    let compositeImages = [];

    if (!genes.catMode) {
        compositeImages.push(
            { input: await leftFeetImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 299, left: 52 },
            { input: await rightFeetImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 302, left: 92 },
            { input: await leftLegImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 269, left: 52 },
            { input: await rightLegImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 275, left: 92 },
            { input: await leftThighImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 219, left: 42 },
            { input: await rightThighImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 219, left: 73 },
        );
    } else {
        compositeImages.push(
            { input: await catLegsImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 179, left: 23 }
        );
    }

    compositeImages.push(
        { input: await torsoImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 129, left: 26 },
        { input: await rightUpperArmImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 159, left: 103 },
        { input: await shirtImage.modulate({ hue: genes.clothesColor }).toBuffer(), top: 129, left: 25 },
        { input: await headImage.modulate({ hue: genes.skinColor }).toBuffer(), top: -40, left: 0 },
        { input: await eyesImage.modulate({ hue: genes.eyeColor }).toBuffer(), top: 80, left: 99 },
        { input: await mouthImage.toBuffer(), top: 149, left: 135 },
        { input: await leftUpperArmImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 159, left: 62 },
        { input: await leftForearmImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 199, left: 92 },
        { input: await rightForearmImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 199, left: 133 },
        { input: await leftHandImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 189, left: 112 },
        { input: await rightHandImage.modulate({ hue: genes.skinColor }).toBuffer(), top: 189, left: 153 },
    );

    const finalImage = sharp({
        create: {
            width: 280,
            height: 338,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        }
    });

    await finalImage.composite(compositeImages).toFile(path.join(__dirname, `zombie_${dna}_v2.png`));
};

// generateZombieImage('3159355705162381').then(() => {
generateZombieImage('4741282571143299').then(() => {
    console.log('Zombie image generated!');
}).catch(err => {
    console.error('Error generating zombie image:', err);
});
