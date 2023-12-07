// This event is triggered when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(function () {
    // Perform some initialization if necessary
    console.log('Extension installed or updated');
});

// When extension is clicked, execute medium.js
chrome.browserAction.onClicked.addListener(function() {
    // Query all tabs with Medium articles
    chrome.tabs.query({url: "*://*.medium.com/*"}, function(tabs) {
        tabs.forEach(function(tab) {
            // Send a message to the content script in this tab
            chrome.tabs.sendMessage(tab.id, {action: "extractText"});
        });
    });
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
