// ================================================
// Emotion Detector - Frontend JavaScript
// ================================================


// ------------------------------------------------
// DOM Elements
// ------------------------------------------------

const textInput = document.getElementById("textInput");

const predictBtn = document.getElementById("predictBtn");

const charCount = document.getElementById("charCount");

const loading = document.getElementById("loading");

const resultCard = document.getElementById("resultCard");

const errorBox = document.getElementById("error");

const emotionElement = document.getElementById("emotion");

const emotionEmoji = document.getElementById("emotionEmoji");

const confidenceElement =
    document.getElementById("confidence");

const confidenceBar =
    document.getElementById("confidenceBar");

const probabilitiesContainer =
    document.getElementById("probabilities");


// ------------------------------------------------
// Emotion Emojis
// ------------------------------------------------

const EMOTION_EMOJIS = {

    sadness: "😢",

    joy: "😄",

    love: "❤️",

    anger: "😠",

    fear: "😨",

    surprise: "😲"

};


// ------------------------------------------------
// Emotion CSS Classes
// ------------------------------------------------

const EMOTION_CLASSES = {

    sadness: "emotion-sadness",

    joy: "emotion-joy",

    love: "emotion-love",

    anger: "emotion-anger",

    fear: "emotion-fear",

    surprise: "emotion-surprise"

};


// ------------------------------------------------
// Character Counter
// ------------------------------------------------

textInput.addEventListener("input", () => {

    const length = textInput.value.length;

    charCount.textContent =
        `${length} / 2000`;

});


// ------------------------------------------------
// Predict Button
// ------------------------------------------------

predictBtn.addEventListener(
    "click",
    predictEmotion
);


// ------------------------------------------------
// Prediction Function
// ------------------------------------------------

async function predictEmotion() {

    const text =
        textInput.value.trim();


    // --------------------------------------------
    // Validate input
    // --------------------------------------------

    if (!text) {

        showError(
            "Please enter some text first."
        );

        return;
    }


    // --------------------------------------------
    // Reset UI
    // --------------------------------------------

    hideError();

    resultCard.classList.add(
        "hidden"
    );

    loading.classList.remove(
        "hidden"
    );

    predictBtn.disabled = true;


    try {

        // ----------------------------------------
        // Send request to FastAPI
        // ----------------------------------------

        const response =
            await fetch(
                "/predict",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        text: text
                    })
                }
            );


        // ----------------------------------------
        // Handle API error
        // ----------------------------------------

        if (!response.ok) {

            let errorMessage =
                `Server error: ${response.status}`;

            try {

                const errorData =
                    await response.json();

                if (errorData.detail) {

                    errorMessage =
                        errorData.detail;
                }

            } catch {

                // Keep default error message

            }

            throw new Error(
                errorMessage
            );
        }


        // ----------------------------------------
        // Convert response to JSON
        // ----------------------------------------

        const data =
            await response.json();


        console.log(
            "Prediction response:",
            data
        );


        // ----------------------------------------
        // Display result
        // ----------------------------------------

        displayResult(data);


    } catch (error) {

        console.error(
            "Prediction error:",
            error
        );

        showError(
            `Unable to get prediction. ${error.message}`
        );

    } finally {

        loading.classList.add(
            "hidden"
        );

        predictBtn.disabled = false;

    }

}


// ------------------------------------------------
// Display Prediction Result
// ------------------------------------------------

function displayResult(data) {

    const emotion =
        data.predicted_emotion;

    const confidence =
        Number(data.confidence);

    const probabilities =
        data.all_probabilites;


    // --------------------------------------------
    // Main Emotion
    // --------------------------------------------

    emotionElement.textContent =
        capitalize(emotion);


    // --------------------------------------------
    // Emotion Emoji
    // --------------------------------------------

    emotionEmoji.textContent =
        EMOTION_EMOJIS[emotion] || "😊";


    // --------------------------------------------
    // Confidence
    // --------------------------------------------

    const confidencePercent =
        confidence * 100;


    confidenceElement.textContent =
        `${confidencePercent.toFixed(2)}%`;


    confidenceBar.style.width =
        `${confidencePercent}%`;


    // --------------------------------------------
    // Confidence Bar Color
    // --------------------------------------------

    confidenceBar.className =
        "progress-bar";


    if (EMOTION_CLASSES[emotion]) {

        confidenceBar.classList.add(
            EMOTION_CLASSES[emotion]
        );

    }


    // --------------------------------------------
    // Find Highest Probability
    // --------------------------------------------

    const highestEmotion =
        Object.entries(probabilities)
            .reduce(
                (highest, current) =>
                    current[1] > highest[1]
                        ? current
                        : highest
            )[0];


    // --------------------------------------------
    // Clear Previous Probability Bars
    // --------------------------------------------

    probabilitiesContainer.innerHTML = "";


    // --------------------------------------------
    // Create Probability Bars
    // --------------------------------------------

    for (
        const [label, probability]
        of Object.entries(probabilities)
    ) {

        const percentage =
            Number(probability) * 100;


        // Create row

        const row =
            document.createElement(
                "div"
            );

        row.className =
            "probability-row";


        // Highlight highest probability

        if (label === highestEmotion) {

            row.classList.add(
                "top-emotion"
            );

        }


        // Create probability info

        const info =
            document.createElement(
                "div"
            );

        info.className =
            "probability-info";


        const labelSpan =
            document.createElement(
                "span"
            );

        labelSpan.textContent =
            `${EMOTION_EMOJIS[label] || ""} ${capitalize(label)}`;


        const percentageStrong =
            document.createElement(
                "strong"
            );

        percentageStrong.textContent =
            `${percentage.toFixed(2)}%`;


        info.appendChild(
            labelSpan
        );

        info.appendChild(
            percentageStrong
        );


        // ----------------------------------------
        // Probability Background
        // ----------------------------------------

        const background =
            document.createElement(
                "div"
            );

        background.className =
            "probability-background";


        // ----------------------------------------
        // Probability Bar
        // ----------------------------------------

        const bar =
            document.createElement(
                "div"
            );

        bar.className =
            "probability-bar";


        if (EMOTION_CLASSES[label]) {

            bar.classList.add(
                EMOTION_CLASSES[label]
            );

        }


        bar.style.width =
            `${percentage}%`;


        // ----------------------------------------
        // Build row
        // ----------------------------------------

        background.appendChild(
            bar
        );

        row.appendChild(
            info
        );

        row.appendChild(
            background
        );

        probabilitiesContainer.appendChild(
            row
        );

    }


    // --------------------------------------------
    // Show Result Card
    // --------------------------------------------

    resultCard.classList.remove(
        "hidden"
    );

}


// ------------------------------------------------
// Capitalize Text
// ------------------------------------------------

function capitalize(text) {

    return (
        text.charAt(0).toUpperCase()
        + text.slice(1)
    );

}


// ------------------------------------------------
// Show Error
// ------------------------------------------------

function showError(message) {

    errorBox.textContent =
        `❌ ${message}`;

    errorBox.classList.remove(
        "hidden"
    );

}


// ------------------------------------------------
// Hide Error
// ------------------------------------------------

function hideError() {

    errorBox.classList.add(
        "hidden"
    );

}