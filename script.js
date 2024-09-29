// Load components from JSON files
async function loadComponents() {
    for (const component of ['background', 'shank', 'eyes', 'enamel']) {
        components[component] = await fetchComponentList(component);
        populateSelect(component);
    }
    updatePreview();
}

// Fetch component list from JSON files
async function fetchComponentList(component) {
    const response = await fetch(`data/${component}.json`);
    if (response.ok) {
        return await response.json();
    } else {
        console.error(`Failed to load ${component} data.`);
        return [];
    }
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
                img.onerror = () => {
                    console.error(`Failed to load image: ${img.src}`);
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

