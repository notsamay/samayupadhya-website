document.addEventListener("DOMContentLoaded", function () {
    const binaryElements = document.querySelectorAll(".binary-content");

    function populateH3WithRandomBinaryContent(h3Element) {
        const binaryContent = Array.from({ length: 102 }, () => (Math.random() < 0.5 ? "0 " : "1 ")).join(""); // Note the space after each binary digit
        h3Element.textContent = binaryContent;
    }

    if (binaryElements) {
        binaryElements.forEach(function (h3Element) {
            populateH3WithRandomBinaryContent(h3Element);
        });

        setInterval(function () {
            binaryElements.forEach(function (h3Element) {
                let binaryContent = h3Element.textContent;
                binaryContent = binaryContent.charAt(binaryContent.length - 1) + binaryContent.slice(0, binaryContent.length - 1);
                h3Element.textContent = binaryContent;
            });
        }, 100); // Adjust the interval as needed
    }
});
// Function to generate a random binary sequence with the same length as the text
function generateRandomBinary(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
            binary += ' '; // Preserve spaces
        } else {
            binary += Math.random() < 0.5 ? '0' : '1';
        }
    }
    return binary;
}

// Store original text for each element with binary content
const originalTextMap = new Map();

// Function to translate text to binary on hover
function translateToBinary(element) {
    const originalText = element.textContent;
    const binaryText = generateRandomBinary(originalText);
    originalTextMap.set(element, originalText); // Store original text
    element.textContent = binaryText;
    element.classList.add('translated'); // Add a class for the fade-in effect
}

// Function to translate binary back to text on hover out
function translateToText(element) {
    if (originalTextMap.has(element)) {
        const originalText = originalTextMap.get(element);
        element.textContent = originalText;
        element.classList.remove('translated'); // Remove the class to reset opacity
    }
}

// Apply hover effect to all elements with the .binary-content class
const binaryContentElements = document.querySelectorAll('.binary-content');
binaryContentElements.forEach((element) => {
    element.addEventListener('mouseover', () => {
        translateToBinary(element);
    });
    element.addEventListener('mouseout', () => {
        translateToText(element);
    });
});
;
