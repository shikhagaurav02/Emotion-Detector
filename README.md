# Emotion Detector | Deep Learning & NLP

A text-based emotion classification application that uses a Bidirectional Gated Recurrent Unit (BiGRU) deep learning model to predict emotions expressed in text. The project combines natural language processing with a web interface built using HTML, CSS, and JavaScript.

## Overview

The Emotion Detector analyzes user-provided text and predicts one of six emotion categories. It demonstrates the application of deep learning and NLP techniques to text classification.

## Features

- Text-based emotion prediction
- Six emotion categories: Joy, Sadness, Love, Anger, Fear, and Surprise
- Text preprocessing and tokenization
- Trained BiGRU model for sequence classification
- Interactive web interface
- Python backend for model inference

## Technologies Used

- **Programming Language:** Python
- **Deep Learning:** TensorFlow / Keras
- **NLP:** Text preprocessing and tokenization
- **Model Architecture:** Bidirectional GRU (BiGRU)
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python (FastAPI, if configured)
- **Tools:** VS Code, Git, GitHub

## Project Structure

```text
Emotion-Detector/
├── Artifacts/
│   ├── BiGRU_model.keras
│   └── tokenizer.pkl
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── main.py
├── requirements.txt
├── README.md
└── .gitignore
```

*Note: The model and tokenizer filenames above are examples. Keep the actual filenames from your project.*

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Emotion-Detector.git
cd Emotion-Detector
```

Replace `YOUR_USERNAME` with your GitHub username and use your actual repository name.

### 2. Create a virtual environment

**Windows:**

```powershell
python -m venv venv
```

Activate it:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Ensure that `requirements.txt` contains the dependencies required by your application.

### 4. Run the application

If the backend uses FastAPI, start it with:

```bash
python -m uvicorn main:app --reload
```

Open the local application at the URL configured by your backend, commonly `http://127.0.0.1:8000`.

If your project uses a different backend framework or entry point, follow the corresponding startup command.

## How to Use

1. Start the Python backend.
2. Open the application's web interface in your browser.
3. Enter a sentence in the text input field.
4. Submit the text for analysis.
5. View the predicted emotion returned by the model.

## Model Information

The application uses a BiGRU architecture to process sequences of text. Bidirectional recurrent layers learn contextual information from both directions of a sequence, making them useful for text classification.

The input text is preprocessed and converted into token sequences using a tokenizer before being passed to the trained model.

### Supported Emotion Categories

| Emotion | Description |
|---|---|
| Joy | Happiness or positive feelings |
| Sadness | Sorrow or disappointment |
| Love | Affection or care |
| Anger | Frustration or irritation |
| Fear | Worry or apprehension |
| Surprise | Unexpected events or reactions |

Actual predictions depend on the model's training data and performance.

## Limitations

- Predictions may be inaccurate for ambiguous, sarcastic, or context-dependent sentences.
- The model may not generalize well to text that differs from its training data.
- The predicted emotion is a model output, not a definitive assessment of a person's feelings.
- Model accuracy should be reported only after evaluation on an appropriate labelled test dataset.

## Future Improvements

- Evaluate the model using precision, recall, F1-score, and a confusion matrix.
- Improve training data quality and class balance.
- Optimize text preprocessing and model performance.
- Improve the user interface and deployment workflow.
- Deploy the application for public access.

## License

This project is intended for educational and portfolio purposes. Add a license file if you intend to distribute or reuse the project under specific terms.
