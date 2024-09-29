// Paths to asset folders (use this for future extensions if needed)
const assetPaths = {
    background: './assets/Background/',
    shank: './assets/Shank/',
    eyes: './assets/Eyes/',
    enamel: './assets/Enamel/'
};

// Component selections to store the images for each component
const components = {
    background: [],
    shank: [],
    eyes: [],
    enamel: []
};

// Fetch components from JSON files and populate selection dropdowns
async function loadComponents() {
    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        components[component] = await fetchComponentList(component);
        populateSelect(component);
    }
    updatePreview();  // Initial preview update after loading components
}

// Fetch component list from JSON files, which contain base64-encoded image data
async function fetchComponentList(component) {
    try {
        const response = await fetch(`./data/${component}.json`);
        if (response.ok) {
            const jsonData = await response.json();
            // Return an array of objects, each containing the filename and base64 data
            return jsonData.map(item => ({
                filename: item.filename,
                data: `data:${item.filetype};base64,${item.data}`
            }));
        } else {
            console.error(`Error loading ${component} JSON: ${response.status}`);
        }
    } catch (error) {
        console.error(`Fetch failed for ${component} JSON: ${error}`);
    }
    return [];
}

// Populate the select dropdowns with options based on the JSON data
function populateSelect(component) {
    const select = document.getElementById(`${component}-select`);
    components[component].forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;  // Use the index to reference the correct base64 data later
        option.textContent = item.filename;
        select.appendChild(option);
    });

    // Add event listener to update the preview whenever a new option is selected
    select.addEventListener('change', updatePreview);
}

// Update the preview canvas based on the selected components
function updatePreview() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const promises = [];

    // Loop through each component (background, shank, eyes, enamel)
    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        const select = document.getElementById(`${component}-select`);
        const selectedIndex = select.value;
        
        if (selectedIndex !== "") {
            const selectedImage = components[component][selectedIndex].data;  // Get the base64 image data
            const img = new Image();
            img.src = selectedImage;
            
            const promise = new Promise(resolve => {
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);  // Draw the image on the canvas
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image: ${img.src}`);
                    resolve();
                };
            });
            promises.push(promise);
        }
    }

    // Wait for all images to be loaded and drawn on the canvas
    Promise.all(promises);
}

// Randomize component selections
function randomizeSelections() {
    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        const select = document.getElementById(`${component}-select`);
        const randomIndex = Math.floor(Math.random() * components[component].length);
        select.selectedIndex = randomIndex;
    }
    updatePreview();  // Re-draw the preview with the random selections
}

// Download the composed image from the canvas
function downloadImage() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = 'custom-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listeners for buttons
document.getElementById('randomize-btn').addEventListener('click', randomizeSelections);
document.getElementById('download-btn').addEventListener('click', downloadImage);

// Initialize the application by loading the components
loadComponents();
