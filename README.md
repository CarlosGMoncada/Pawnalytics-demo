# Pawnalytics
<p align="center">
  <img src="https://pawnalytics.com/wp-content/uploads/2025/01/icon.png" />
</p>
  <h2 align="center">Peace of mind, healthier pets.</h2>

**Pawnalytics** is an **AI agent** designed to revolutionize pet care by proactively monitoring your dog's behavior and vital signs. Using state-of-the-art sensors (such as **olfactory** and **UWB vital signs sensors**) and advanced machine learning algorithms, **Pawnalytics** analyzes data from wearable devices, user inputs, and environmental factors to detect anomalies, predict potential health risks, and provide actionable insights.
![Mock](https://pawnalytics.com/wp-content/uploads/2025/02/Captura-de-pantalla-2025-02-09-025530.png)

## Demo

Pawnalytics demo is a web application for analyzing images for Canine Hip Dysplasia (CHD) with model [YOLOv11 By Ultralytics](https://docs.ultralytics.com/models/yolo11/) trained with a custom dataset (mostly from [Stanford Vision and Learning Lab](https://svl.stanford.edu/)).

You can try it right now at https://pawnalytics.com/demo/

## Features

- Image analysis for Canine Hip Dysplasia (CHD) using fine tuned YOLOv11 trained in and hosted by Roboflow.
- The application displays the analysis results, including a visualization of the detected features and the confidence level of the prediction.

## Dataset limitations

- Due to time constrains we picked the 4 breeds most prone to CHD; Great dane, German Shepherd, Labrador Retriever and Saint Bernard.
- By not having a trained veterinary physician in the team, we created an arbitrary standard for labeling the dataset: dogs with their hind paws turning outwards, standing dogs with the hind legs flexed and the butt pointing to the ground, dogs that looked awkward or painful poses. (There is a number of photos of dogs confirmed to suffer from CHD included in the dataset).
-	The data is skewed. It is more likely to get a positive from German Shepherds because of the dataset had a relatively high count of elements with extreme pelvic limb angulation, a trait known to cause issues like CHD.

**If you are a professional on veterinary medicine and you are interested in collaborating, e-mail us at contact@pawnalytics.com**

## Installation

1. Clone the repository
2. E-mail me at dev@pawnalytics.com for API key

## Usage

1. Open index.html

## Known issues to be fixed

If the web app doesn't display anything it may not have found a dog.
