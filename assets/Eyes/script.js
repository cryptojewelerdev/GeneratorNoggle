// script.js

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

// Populate component arrays by fetching file names from the server
async function loadComponents() {
    for (const [component, path] of Object.entries(assetPaths)) {
        // Fetch the file list (this requires server-side scripting or a predefined list)
        // For this example, we'll use predefined lists
        components[component] = await fetchComponentList(component);
        populateSelect(component);
    }
    updatePreview();
}

// Mock function to fetch component lists (replace with actual server-side logic)
async function fetchComponentList(component) {
    // This should be replaced with an AJAX call to fetch the list of files
    // For example purposes, we use hardcoded file names
    return ['1.png', '2.png', '3.png']; // Replace with actual file names
}

// Populate the select elements with options
function populateSelect(component) {
    const select = document.getElementById(`${component}-select`);
    components[component].forEach(fileName => {
        const option = document.createElement('option');
        option.value = fileName;
        option.textContent = fileName;
        select.appendChild(option);
    });

    // Add event listener
    select.addEventListener('change', updatePreview);
}

// Update the preview canvas
function updatePreview() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const promises = [];

    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        const select = document.getElementById(`${component}-select`);
        const fileName = select.value;
        if (fileName) {
            const img = new Image();
            img.src = `${assetPaths[component]}${fileName}`;
            const promise = new Promise(resolve => {
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve();
                };
            });
            promises.push(promise);
        }
    }

    // Wait for all images to load
    Promise.all(promises);
}

// Randomize selections
function randomizeSelections() {
    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        const select = document.getElementById(`${component}-select`);
        const options = select.options;
        const randomIndex = Math.floor(Math.random() * options.length);
        select.selectedIndex = randomIndex;
    }
    updatePreview();
}

// Download the image
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listeners
document.getElementById('randomize-btn').addEventListener('click', randomizeSelections);
document.getElementById('download-btn').addEventListener('click', downloadImage);

// Initialize
loadComponents();
