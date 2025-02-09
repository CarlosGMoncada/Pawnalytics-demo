document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an image.');
        return;
    }

    // Convert the image to a base64 URL
    const reader = new FileReader();
    reader.onload = async (e) => {
        const imageUrl = e.target.result;
        console.log(imageUrl);
        // Call the Roboflow API
        const response = await fetch('https://detect.roboflow.com/infer/workflows/pawnalytics/custom-workflow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                api_key: 'VPDCKZ9xwFPaaBoBXyi2',
                inputs: {
                    "image": {"type": "base64", "value": imageUrl.split(',')[1]} // Use base64 for uploaded images
                }
            })
        });

        const result = await response.json();

        console.log(result);
        // Display the results
        displayResults(result, imageUrl);
    };
    reader.readAsDataURL(file);
});

function displayResults(result, imageUrl) {
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
    resultsDiv.innerHTML = `
        <h3>Analysis Results</h3>
        <img src="${imageUrl}" alt="Uploaded Image" style="max-width: 100%; height: auto;">
    `;

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

