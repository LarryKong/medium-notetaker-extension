// This event is triggered when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(function () {
    // Perform some initialization if necessary
    console.log('Extension installed or updated');
});

// When extension is clicked, execute youtube_transcript.js
chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("youtube.com")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["youtube.js"]
        });
    }
});

// Download txt file
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'downloadTranscript') {
        const blob = new Blob([request.data], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);

        // Use the chrome.downloads API
        chrome.downloads.download({
            url: url,
            filename: 'transcript.txt',
            saveAs: true
        }, function(downloadId) {
            // If you want to do something with the downloadId or handle errors
            if (downloadId) {
                console.log('Download initiated with ID:', downloadId);
            } else {
                console.error('Failed to initiate download:', chrome.runtime.lastError);
            }
            // Revoke the URL to clean up memory
            URL.revokeObjectURL(url);
        });
    }
});
