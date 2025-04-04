const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const HEAD_VARIATIONS = 7;
const EYES_VARIATIONS = 11;
const SHIRT_VARIATIONS = 6;

const getHueColor = (value) => {
    return parseInt(`${Number(value) / 100 * 360}`, 10);
};

const zombieGenesMapper = (dna = '') => {
    const zombieDna = dna.padStart(16, '0');
    const head = Number(zombieDna.substring(0, 2)) % HEAD_VARIATIONS + 1;
    const eye = Number(zombieDna.substring(2, 4)) % EYES_VARIATIONS + 1;
    const shirt = Number(zombieDna.substring(4, 6)) % SHIRT_VARIATIONS + 1;
    const skinColor = getHueColor(zombieDna.substring(6, 8));
    const eyeColor = getHueColor(zombieDna.substring(8, 10));
    const clothesColor = getHueColor(zombieDna.substring(10, 12));

    return {
        head,
        eye,
        shirt,
        skinColor,
        eyeColor,
        clothesColor,
    };
};

const generateZombieImage = async (dna) => {
    const genes = zombieGenesMapper(dna);
    const canvas = createCanvas(200, 400); // Adjust size as needed
    const ctx = canvas.getContext('2d');

    // Load images for each part
    const headImage = await loadImage(path.join(__dirname, `public/images/zombieparts/head-${genes.head}@2x.png`));
    const eyesImage = await loadImage(path.join(__dirname, `public/images/zombieparts/eyes-${genes.eye}@2x.png`));
    const shirtImage = await loadImage(path.join(__dirname, `public/images/zombieparts/shirt-${genes.shirt}@2x.png`));
    const leftFeetImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-feet-1@2x.png`));
    const rightFeetImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-feet-1@2x.png`));
    const leftLegImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-leg-1@2x.png`));
    const rightLegImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-leg-1@2x.png`));
    const leftThighImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-thigh-1@2x.png`));
    const rightThighImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-thigh-1@2x.png`));
    const leftUpperArmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-upper-arm-1@2x.png`));
    const rightUpperArmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-upper-arm-1@2x.png`));
    const leftForearmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/left-forearm-1@2x.png`));
    const rightForearmImage = await loadImage(path.join(__dirname, `public/images/zombieparts/right-forearm-1@2x.png`));
    const leftHandImage = await loadImage(path.join(__dirname, `public/images/zombieparts/hand1-1@2x.png`));
    const rightHandImage = await loadImage(path.join(__dirname, `public/images/zombieparts/hand-2-1@2x.png`));

    // Draw the parts on the canvas
    ctx.drawImage(leftFeetImage, 50, 300); // Adjust position as needed
    ctx.drawImage(rightFeetImage, 100, 300); // Adjust position as needed
    ctx.drawImage(leftLegImage, 50, 250); // Adjust position as needed
    ctx.drawImage(rightLegImage, 100, 250); // Adjust position as needed
    ctx.drawImage(leftThighImage, 50, 200); // Adjust position as needed
    ctx.drawImage(rightThighImage, 100, 200); // Adjust position as needed
    ctx.drawImage(leftUpperArmImage, 0, 150); // Adjust position as needed
    ctx.drawImage(rightUpperArmImage, 150, 150); // Adjust position as needed
    ctx.drawImage(leftForearmImage, 0, 100); // Adjust position as needed
    ctx.drawImage(rightForearmImage, 150, 100); // Adjust position as needed
    ctx.drawImage(leftHandImage, 0, 50); // Adjust position as needed
    ctx.drawImage(rightHandImage, 150, 50); // Adjust position as needed
    ctx.drawImage(headImage, 50, 0); // Adjust position as needed
    ctx.drawImage(eyesImage, 50, 20); // Adjust position as needed
    ctx.drawImage(shirtImage, 50, 100); // Adjust position as needed

    // Save the image
    const buffer = canvas.toBuffer('image/png');
    require('fs').writeFileSync(path.join(__dirname, 'zombie.png'), buffer);
};

// Example usage
generateZombieImage('1234567890123456').then(() => {
    console.log('Zombie image generated!');
}).catch(err => {
    console.error('Error generating zombie image:', err);
});