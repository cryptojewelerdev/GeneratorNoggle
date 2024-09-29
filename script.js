// Paths to asset folders
const assetPaths = {
    background: 'assets/Background/',
    shank: 'assets/Shank/',
    eyes: 'assets/Eyes/',
    enamel: 'assets/Enamel/'
};

// Component selections
const components = {
    background: [],
    shank: [],
    eyes: [],
    enamel: []
};

// Initialize
loadComponents();

// Event listeners
document.getElementById('randomize-btn').addEventListener('click', randomizeSelections);
document.getElementById('download-btn').addEventListener('click', downloadImage);
