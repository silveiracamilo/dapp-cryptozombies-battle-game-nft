const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const HEAD_VARIATIONS = 7;
const EYES_VARIATIONS = 11;
const SHIRT_VARIATIONS = 6;

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

const generateZombieImage = async (dna) => {
    const genes = zombieGenesMapper(dna);
    const canvas = createCanvas(280, 338); // Adjust size as needed
    const ctx = canvas.getContext('2d');

    // Load images for each part
    const headImage = await loadImage(path.join(__dirname, `public/images/zombieparts/head-${genes.head}@2x.png`));
    const eyesImage = await loadImage(path.join(__dirname, `public/images/zombieparts/eyes-${genes.eye}@2x.png`));
    const shirtImage = await loadImage(path.join(__dirname, `public/images/zombieparts/shirt-${genes.shirt}@2x.png`));
    const mouthImage = await loadImage(path.join(__dirname, `public/images/zombieparts/mouth-1@2x.png`));
    const torsoImage = await loadImage(path.join(__dirname, `public/images/zombieparts/torso-1@2x.png`));

    let leftFeetImage;
    let rightFeetImage;
    let leftLegImage;
    let rightLegImage;
    let leftThighImage;
    let rightThighImage;
    let catLegsImage;

    if (!genes.catMode) {
        leftFeetImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-feet-1@2x.png`));
        rightFeetImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-feet-1@2x.png`));
        leftLegImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-leg-1@2x.png`));
        rightLegImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-leg-1@2x.png`));
        leftThighImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-thigh-1@2x.png`));
        rightThighImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-thigh-1@2x.png`));
    } else {
        catLegsImage = await loadImage(path.join(__dirname, `public/images/zombieparts/catlegs.png`));

    }

    const leftUpperArmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-upper-arm-1@2x.png`));
    const rightUpperArmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-upper-arm-1@2x.png`));
    const leftForearmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-forearm-1@2x.png`));
    const rightForearmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-forearm-1@2x.png`));
    const leftHandImage = await loadImage(path.join(__dirname, `public/images/zombieparts/hand1-1@2x.png`));
    const rightHandImage = await loadImage(path.join(__dirname, `public/images/zombieparts/hand-2-1@2x.png`));

    // Draw the parts on the canvas with adjusted sizes and positions
    if (!genes.catMode) {
        ctx.drawImage(leftThighImage, 42, 219, 60, 72); // Left Thigh
        ctx.drawImage(rightThighImage, 73, 219, 59, 71); // Right Thigh
    } else {
        ctx.drawImage(catLegsImage, 23, 179, 100, 123); // Cat Legs
    }

    ctx.drawImage(torsoImage, 26, 129, 130, 130); // Torso
    ctx.drawImage(rightUpperArmImage, 103, 159, 60, 72); // Right Upper Arm
    ctx.drawImage(shirtImage, 25, 129, 130, 130); // Shirt
    ctx.drawImage(headImage, 0, -40, 280, 280); // Head
    ctx.drawImage(eyesImage, 99, 80, 129, 83); // Eyes
    ctx.drawImage(mouthImage, 135, 149, 60, 48); // Mouth

    if (!genes.catMode) {
        ctx.drawImage(leftFeetImage, 52, 299, 40, 27); // Left Feet
        ctx.drawImage(rightFeetImage, 92, 302, 33, 22); // Right Feet
        ctx.drawImage(leftLegImage, 52, 269, 39, 47); // Left Leg
        ctx.drawImage(rightLegImage, 92, 275, 33, 40); // Right Leg
        // ctx.drawImage(leftThighImage, 42, 219, 60, 72); // Left Thigh
        // ctx.drawImage(rightThighImage, 73, 219, 59, 71); // Right Thigh
    }
    ctx.drawImage(leftUpperArmImage, 62, 159, 60, 72); // Left Upper Arm
    // ctx.drawImage(rightUpperArmImage, 103, 159, 60, 72); // Right Upper Arm

    ctx.drawImage(leftForearmImage, 92, 199, 40, 22); // Left Forearm
    ctx.drawImage(rightForearmImage, 133, 199, 40, 22); // Right Forearm
    ctx.drawImage(leftHandImage, 112, 189, 40, 28); // Left Hand
    ctx.drawImage(rightHandImage, 153, 189, 40, 28); // Right Hand
28
    // Save the image
    const buffer = canvas.toBuffer('image/png');
    require('fs').writeFileSync(path.join(__dirname, `zombie_${dna}.png`), buffer);
};

// Example usage
// generateZombieImage('3159355705162381').then(() => {
generateZombieImage('4741282571143299').then(() => {
    console.log('Zombie image generated!');
}).catch(err => {
    console.error('Error generating zombie image:', err);
});
