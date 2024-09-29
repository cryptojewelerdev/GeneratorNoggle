document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawAsset');
    const ctx = canvas.getContext('2d');

    // Define paths for the various customization options
    const layers = {
        background: 'assets/background/',
        shank: 'assets/shank/',
        enamel: 'assets/enamel/',
        eyes: 'assets/eyes/'
    };

    // Placeholder selected values for each category
    let selectedBackground = 'background1.png';
    let selectedShank = 'shank1.png';
    let selectedEnamel = 'enamel1.png';
    let selectedEyes = 'eyes1.png';

    // Function to load the selected assets onto the canvas
    function drawImage() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const background = new Image();
        const shank = new Image();
        const enamel = new Image();
        const eyes = new Image();

        background.src = layers.background + selectedBackground;
        shank.src = layers.shank + selectedShank;
        enamel.src = layers.enamel + selectedEnamel;
        eyes.src = layers.eyes + selectedEyes;

        background.onload = () => {
            ctx.drawImage(background, 0, 0);
            shank.onload = () => ctx.drawImage(shank, 0, 0);
            enamel.onload = () => ctx.drawImage(enamel, 0, 0);
            eyes.onload = () => ctx.drawImage(eyes, 0, 0);
        };
    }

    // Call drawImage initially to load the default assets
    drawImage();

    // Function to handle the randomization of assets
    document.querySelector('.randomize-btn').addEventListener('click', () => {
        // Randomize selected options
        selectedBackground = 'background' + Math.floor(Math.random() * 3 + 1) + '.png';
        selectedShank = 'shank' + Math.floor(Math.random() * 3 + 1) + '.png';
        selectedEnamel = 'enamel' + Math.floor(Math.random() * 3 + 1) + '.png';
        selectedEyes = 'eyes' + Math.floor(Math.random() * 3 + 1) + '.png';

        // Redraw the image with randomized selections
        drawImage();
    });

    // Function to handle resetting the image
    document.querySelector('.reset-btn').addEventListener('click', () => {
        // Reset selections to default values
        selectedBackground = 'background1.png';
        selectedShank = 'shank1.png';
        selectedEnamel = 'enamel1.png';
        selectedEyes = 'eyes1.png';

        // Redraw the image with the default selections
        drawImage();
    });

    // Function to handle downloading the image
    document.querySelector('.download-btn').addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'custom-image.png';
        link.href = canvas.toDataURL();
        link.click();
    });
});
