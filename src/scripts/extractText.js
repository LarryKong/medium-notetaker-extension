chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extractText") {
        const extractedText = extractArticleText();
        if (extractedText) {
            sendTextToBackground(extractedText);
            console.log("Text sent to background");
        }
    }
});

let alreadyExtracted = false;

function extractArticleText() {
    if (alreadyExtracted) {
        console.log("Extraction already performed.");
        return null; // Explicitly return null
    }
    const articleText = document.querySelector('#root').innerText;
    alreadyExtracted = true;
    return articleText;
}


// This function sends the extracted text to the background
function sendTextToBackground(text) {
    chrome.runtime.sendMessage({ action: "extractedText", text: text }, function(response) {
        if (response?.success) {
            console.log("Text successfully sent to background");
        }
    });
}