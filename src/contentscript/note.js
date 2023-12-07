function toggleTimestampsOff() {
    // Selector for the transcript panel
    const transcriptPanelSelector = '#content ytd-transcript-search-panel-renderer.style-scope.ytd-transcript-renderer';
    
    // Try to find the panel using the selector
    let transcriptPanel = document.querySelector(transcriptPanelSelector);
    if (transcriptPanel && !transcriptPanel.hasAttribute('hide-timestamps')) {
        // If found and timestamps are visible, hide them
        transcriptPanel.setAttribute('hide-timestamps', '');
        console.log('Timestamps toggled off');
        // After timestamps are toggled off, extract the transcript
        extractTranscriptAndHandle(); // Changed this to call a new function
    } else {
        // If the panel isn't found, log an error message
        console.error('Transcript panel not found after waiting.');
    }
}


// STEP 4
// Function to extract the transcript text and handle it
function extractTranscriptAndHandle(retryCount = 0) {
    const transcriptText = extractTranscript();
    if (transcriptText) {
        console.log('Transcript extracted:', transcriptText);
        // Do something with the transcriptText
    } else if (retryCount < maxRetries) {
        console.error('Failed to extract transcript, retrying...');
        setTimeout(() => extractTranscriptAndHandle(retryCount + 1), 1000);
    } else {
        console.error('Failed to extract transcript after maximum retries.');
    }
}


module.exports = {
    entry: {
      udemy: './src/contentscript/udemy.js',
      coursera: './src/contentscript/coursera.js',
    },
}

// This event is triggered when the extension icon is clicked.
chrome.action.onClicked.addListener((tab) => {
    // Check if the current tab is a YouTube page
    if (tab.url.includes("youtube.com")) {
        // Execute the youtube_transcript.js script first
        console.log('Youtube transcript script is being executed');
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["youtube_transcript.js"]
        }).then(() => {
            console.log('Youtube chapters script is being executed');
            // After the first script executes successfully, execute the youtube_description.js script
            return chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["youtube_chapters.js"]
            });
        }).catch((error) => {
            // Handle any errors that occurred during execution
            console.error('Script execution failed:', error);
        });
    }
});




// After transcript is executed, execute youtube_chapters.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'transcriptExtracted') {
        transcriptYoutube = message.transcript;
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["youtube_chapters.js"]
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'chaptersExtracted') {
        chaptersYoutube = message.chapters;
        chrome.scripting.executeScript({
            target: { tabId: sender.tab.id },
            files: ["youtube_formatter.js"]
        });
    }
});



// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'transcriptExtracted') {
        transcriptData = message.transcript;
        // Check if chapters have been extracted
        if (chaptersData) {
            saveTranscript(transcriptData, chaptersData);
            transcriptData = null;
            chaptersData = null;
        }
    } else if (message.action === 'chaptersExtracted') {
        chaptersData = message.chapters;
        // Check if the transcript has been extracted
        if (transcriptData) {
            saveTranscript(transcriptData, chaptersData);
            transcriptData = null;
            chaptersData = null;
        }
    }
});

    // Send the transcript to the background script
    chrome.runtime.sendMessage({ action: 'transcriptExtracted', transcript: transcriptText });

        // Send the chapters text to the background script
        chrome.runtime.sendMessage({ action: 'chaptersExtracted', chapters: chaptersArray });


        let transcriptPanel = document.querySelector(transcriptPanelSelector);
    if (transcriptPanel && !transcriptPanel.hasAttribute('hide-timestamps')) {
        // If found and timestamps are visible, hide them
        console.log('Timestamps were present');
        transcriptPanel.setAttribute('hide-timestamps', '');
        console.log('Timestamps toggled off');
        console.log('Now extracting transcript');
        // After timestamps are toggled off, extract the transcript
        extractTranscript();
    } else if (transcriptPanel && transcriptPanel.hasAttribute('hide-timestamps')) {
        console.log('Timestamps were already toggled off');
        console.log('Now extracting transcript');
        extractTranscript();
    } else {
        // If the panel isn't found, log an error message
        console.error('Transcript panel not found after waiting.');
    }

        
    // Split the transcript into lines for easier processing.
    const transcriptLines = transcriptText.split('\n');
    console.log(transcriptLines);

    function formatTranscriptToPlainText(transcriptText, chaptersArray) {
        if (!transcriptText) {
            console.error('No transcript text provided');
            return '';
        }
    
        // Split the transcript into lines for easier processing.
        const transcriptLines = transcriptText.split('\n');
    
        // Initialize the formatted transcript as an array of lines.
        let formattedTranscript = '';
        let currentChapterIndex = 0;
        let currentText = '';
    
        // Iterate over the transcript lines.
        transcriptLines.forEach((line) => {
            // Check if this line matches the beginning of a chapter.
            if (currentChapterIndex < chaptersArray.length &&
                line.trim() === chaptersArray[currentChapterIndex].title.trim()) {
                // If it's a match and not the first chapter, process the previous chapter.
                if (currentChapterIndex > 0) {
                    // Append the previous chapter's title and text to the formatted transcript.
                    formattedTranscript += `### ${chaptersArray[currentChapterIndex - 1].title}\n`;
                    formattedTranscript += `${currentText.trim()}\n\n`;
                }
                // Reset the text for the next chapter and increment the chapter index.
                currentText = '';
                currentChapterIndex++;
            } else {
                // If it's not a chapter title, accumulate the line into the current text.
                currentText += (currentText ? ' ' : '') + line;
            }
        });
    
        // After the loop, process the last chapter.
        if (currentChapterIndex > 0 && currentText) {
            formattedTranscript += `### ${chaptersArray[currentChapterIndex - 1].title}\n`;
            formattedTranscript += `${currentText.trim()}\n\n`;
        }
    
        // Trim any excess whitespace from the start/end of the formatted transcript.
        return formattedTranscript.trim();
    }
    
    // Example usage:
    const transcriptText = '...'; // Your transcript text here
    const chaptersArray = [
        { title: 'Chapter 1', timestamp: '0:00' },
        { title: 'Chapter 2', timestamp: '1:00' },
        // ... other chapters
    ];
    
    const plainTextTranscript = formatTranscriptToPlainText(transcriptText, chaptersArray);
    console.log(plainTextTranscript);
    