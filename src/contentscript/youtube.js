// Define a maximum number of retries
const maxRetries = 10;

// Function that returns a promise that resolves when the element is found
function waitForElement(selector, retries = 0) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
        } else if (retries < maxRetries) {
            setTimeout(() => resolve(waitForElement(selector, retries + 1)), 3000);
        } else {
            reject(new Error('Element not found, reached maximum retries: ' + selector));
        }
    });
}

// Click on the transcript button and wait for the transcript element
async function clickTranscriptButton() {
    const buttonSelector = `button.yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m[aria-label="Show transcript"]`;
    const button = document.querySelector(buttonSelector);

    if (!button) {
        throw new Error('Transcript button not found');
    }

    button.click();
    console.log('Transcript button clicked');
    await waitForElement('#content ytd-transcript-search-panel-renderer.style-scope.ytd-transcript-renderer');
}

// Toggle timestamps off
async function toggleTimestampsOff() {
    const transcriptPanelSelector = '#content ytd-transcript-search-panel-renderer.style-scope.ytd-transcript-renderer';
    const transcriptPanel = await waitForElement(transcriptPanelSelector);

    if (!transcriptPanel.hasAttribute('hide-timestamps')) {
        transcriptPanel.setAttribute('hide-timestamps', '');
        console.log('Timestamps toggled off');
    }
}

// Extract the transcript from the page
function extractTranscript() {
    const transcriptContainerSelector = '#segments-container';
    const transcriptContainer = document.querySelector(transcriptContainerSelector);
    const transcriptText = transcriptContainer.innerText;

    if (!transcriptContainer) {
        throw new Error('Transcript container not found');
    }

    console.log('Transcript extracted');
    console.log(transcriptText);
    return transcriptText;
}

// Click on the 'View all' chapters button and wait for the chapters element
async function clickChaptersButton() {
    const buttonSelector = `#navigation-button > ytd-button-renderer > yt-button-shape > button[aria-label="View all"]`;
    const button = document.querySelector(buttonSelector);

    if (!button) {
        throw new Error('Chapters button not found');
    }

    button.click();
    console.log('Chapters button clicked');
    await waitForElement('#content > ytd-macro-markers-list-renderer');
}

// Extract the chapters from the page
function extractChapters() {
    const chaptersContainerSelector = '#content > ytd-macro-markers-list-renderer';
    const chaptersContainer = document.querySelector(chaptersContainerSelector);

    if (!chaptersContainer) {
        throw new Error('Chapters container not found');
    }

    console.log('Chapters extracted');
    const chaptersText = chaptersContainer.innerText;
    console.log(chaptersText);

    // Split the chapters text into lines
    const lines = chaptersText.split('\n');

    // Initialize an empty array to hold the chapter objects
    const chaptersArray = [];

    // Assume that titles are at even indices and timestamps at odd indices
    for (let i = 0; i < lines.length; i += 2) {
        const title = lines[i];
        const timestamp = lines[i + 1];
        // Add the chapter object to the array
        chaptersArray.push({ title, timestamp });
    }
    console.log(chaptersArray);
    return chaptersArray;
}

// Format the transcript with chapters
function formatTranscript(transcriptText, chaptersArray) {

    if (!transcriptText) {
        console.error('No transcript text provided');
        return '';
    }

    // Split the transcript into lines for easier processing.
    const transcriptLines = transcriptText.split('\n');
    console.log(transcriptLines);

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
                formattedTranscript += `### ${chaptersArray[currentChapterIndex - 1].title}\n${currentText.trim()}\n\n\n`;
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
        formattedTranscript += `### ${chaptersArray[currentChapterIndex - 1].title}\n${currentText.trim()}\n\n`;
    }

    // Trim any excess whitespace from the start/end of the formatted transcript.
    console.log(formattedTranscript.trim());
    formattedText = formattedTranscript.trim();
    console.log(formattedText);

    // Save the formatted transcript to Chrome's local storage
    chrome.storage.local.set({ 'formattedYoutubeTranscript': formattedText }, function() {
        console.log('Formatted Youtube transcript saved to local storage.');
    });

    // Send a message to the background script to download the file
    chrome.runtime.sendMessage({
        action: 'downloadTranscript',
        data: formattedText
    });
    
    return formattedText
}



// Orchestrator function that uses async/await to run all steps in sequence
async function processYouTubeVideo() {
    try {
        await clickTranscriptButton();
        await toggleTimestampsOff();
        const transcriptText = extractTranscript();
        await clickChaptersButton();
        const chaptersArray = extractChapters();
        const formattedText = formatTranscript(transcriptText, chaptersArray);
        // Do something with formattedTranscript
    } catch (error) {
        console.error(error);
    }
}

// Start the operation sequence
processYouTubeVideo();
