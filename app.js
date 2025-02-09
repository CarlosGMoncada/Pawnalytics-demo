document.querySelectorAll('input[name="inputType"]').forEach((elem) => {
    elem.addEventListener('change', (event) => {
        const value = event.target.value;
        if (value === 'file') {
            document.getElementById('fileInputContainer').style.display = 'block';
            document.getElementById('urlInputContainer').style.display = 'none';
        } else {
            document.getElementById('fileInputContainer').style.display = 'none';
            document.getElementById('urlInputContainer').style.display = 'block';
        }
    });
});

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const urlInput = document.getElementById('urlInput');
    const file = fileInput.files[0];
    const imageUrl = urlInput.value;

    if (!file && !imageUrl) {
        alert('Please select an image or enter a URL.');
        return;
    }

    if (file) {
        // Convert the image to a base64 URL
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Image = e.target.result.split(',')[1];
            await callApi(base64Image, true);
        };
        reader.readAsDataURL(file);
    } else {
        await callApi(imageUrl, false);
    }
});

async function callApi(imageData, isBase64) {
    const response = await fetch('https://detect.roboflow.com/infer/workflows/pawnalytics/custom-workflow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_key: 'VPDCKZ9xwFPaaBoBXyi2',
            inputs: {
                "image": {"type": isBase64 ? "base64" : "url", "value": imageData} // Use base64 for uploaded images or URL for image URL
            }
        })
    });

    const result = await response.json();
    console.log(result);
    // Display the results
    displayResults(result, imageData, isBase64);
}

function displayResults(result, imageUrl, isBase64) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    //console.log(result);
    // Handle errors
    if (result.error) {
        resultsDiv.innerHTML = `<p>Error: ${result.error}</p>`;
        return;
    }
//<pre>${JSON.stringify(result, null, 2)}</pre>
    // Display the results (customize based on your workflow output)
    /*resultsDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; height: auto;">
    `;*/

    // Check if outputs array and polygon_visualization exist
    if (result.outputs && result.outputs.length > 0 && result.outputs[0].polygon_visualization) {
        const polygonVisualization = result.outputs[0].polygon_visualization;
        if (polygonVisualization.type === "base64" && polygonVisualization.value) {
            const base64Image = `data:image/jpeg;base64,${polygonVisualization.value}`;
            const prediction = result.outputs[0].prediction.predictions.predictions[0].confidence;
            const confidencePercentage = (prediction * 100).toFixed(2);
            resultsDiv.innerHTML += `
                <h3>Visualization</h3>
                <div style="position: relative; display: inline-block;">
                <img src="${base64Image}" alt="Visualization Image" style="max-width: 100%; height: auto;">
                    <div id="tag" style="position: absolute; top: 10px; left: 10px; background-color: rgba(255, 255, 255, 0.7); padding: 5px; border-radius: 3px;">
                        Health status: ${result.outputs[0].prediction.predictions.predictions[0].class}<br>
                        Confidence: ${confidencePercentage}%
                    </div>
                </div>
            `;
        } else {
            resultsDiv.innerHTML += `<p>No valid visualization available.</p>`;
        }
    } else {
        resultsDiv.innerHTML += `<p>No visualization available.</p>`;
    }
}

