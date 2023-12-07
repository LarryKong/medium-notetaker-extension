chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extractText") {
        const extractedText = extractArticleText();
        // Here, you can either store the text, send it back to the background script, or take another action
        console.log(extractedText); // For demonstration
        sendTextToBackground(extractedText);
    }
});

function extractArticleText() {
    const articleText = document.querySelector('#root').innerText;

    return articleText;
}

// This function sends the extracted text to the background
function sendTextToBackground(text) {
    chrome.runtime.sendMessage({ action: "extractedText", text: text });
}