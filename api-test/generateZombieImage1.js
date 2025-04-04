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

    // Draw the parts on the canvas
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