# Pawnalytics
<p align="center">
  <img src="https://pawnalytics.com/wp-content/uploads/2025/01/icon.png" />
</p>
  <h2 align="center">Peace of mind, healthier pets.</h2>

**Pawnalytics** es un **Agente Inteligente** diseñado para revolucionar el cuidado de tus mascotas al monitorear de manera proactiva el comportamiento y los signos vitales de tu perro. Utilizando sensores de última generación (como sensores **olfativos** y **de signos vitales UWB**) y algoritmos avanzados de Machine Learning, **Pawnalytics** analiza datos de wearables, entradas del usuario y factores ambientales para detectar anomalías, predecir riesgos potenciales para la salud y proporcionar información accionable.
![Mock](https://pawnalytics.com/wp-content/uploads/2025/02/Captura-de-pantalla-2025-02-09-025530.png)

## Demo

El demo es una web app para analizar imágenes en busca de Displasia de Cadera Canina (DCC) con un modelo [YOLOv11 de Ultralytics](https://docs.ultralytics.com/models/yolo11/) entrenado con un conjunto de datos personalizado (en su mayoría tomado del [Stanford Vision and Learning Lab](https://svl.stanford.edu/)).

Puedes probarlo ahora mismo en https://pawnalytics.com/demo/

## Características

- Análisis de imágenes para Displasia Canina de Cadera (DCC) utilizando YOLOv11 ajustado y entrenado en Roboflow, y alojado en la misma plataforma.
- La aplicación muestra los resultados del análisis, incluyendo una visualización de las características detectadas y el nivel de confianza de la predicción.

## Limitantes del dataset

- Debido a limitaciones de tiempo, seleccionamos las 4 razas más propensas a la DCC: Gran Danés, Pastor Alemán, Labrador Retriever y San Bernardo.
- Al no contar con un médico veterinario capacitado en el equipo, creamos un estándar arbitrario para etiquetar el conjunto de datos: perros con las patas traseras hacia afuera, perros de pie con las patas traseras flexionadas y la cola apuntando hacia el suelo, perros que parecían en posturas incómodas o dolorosas. (Se incluyeron varias fotos de perros diagnosticados con DCC en el conjunto de datos).
-	Los datos están sesgados. Es más probable obtener un resultado positivo en Pastores Alemanes debido a que el conjunto de datos tenía un número relativamente alto de elementos con angulación extrema en las extremidades pélvicas, una característica conocida por causar problemas como la DCC.

**Si eres un profesional de la medicina veterinaria y estás interesado en colaborar, escríbenos a contact@pawnalytics.com**

## Instalación

1. Clona el repositorio
2. Envia un correo a dev@pawnalytics.com pidiendo la API key 

## Uso

1. Abre index.html

## Problemas conocidos por resolver

Si la web app no funciona, es probable que el modelo no reconozca ningún perro.
