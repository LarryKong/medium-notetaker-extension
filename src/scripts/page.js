chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "checkScript") {
        sendResponse({ scriptInjected: true });
    }
    else if (request.action === "extractText") {
        const extractedText = extractArticleText();
        // Here, you can either store the text, send it back to the background script, or take another action
        console.log(extractedText); 

        sendTextToBackground(extractedText);
        console.log("Text sent to background");
    }
});

function extractArticleText() {
    const articleText = document.querySelector('#root').innerText;
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