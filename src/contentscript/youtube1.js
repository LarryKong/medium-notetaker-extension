// Script for youtube

// EXTRACT TRANSCRIPT: Script to extract transcript from Youtube video
// STEP 1. Click on the transcript button
// STEP 2. Toggle timestamps off
// STEP 3. Extract the transcript from the page
// STEP 4. Send the transcript to the background script

// Define global variables
// let transcriptText = null;
// let chaptersArray = null;

// Define a maximum number of retries
const maxRetries = 10;

// STEP 1. Click on the transcript button
// Function to simulate a click on the transcript button
function clickTranscriptButton(retries = 0) {

    // Selector for the button with the specific classes and aria-label
    const buttonSelector = `button.yt-spec-button-shape-next.yt-spec-button-shape-next--outline.yt-spec-button-shape-next--call-to-action.yt-spec-button-shape-next--size-m[aria-label="Show transcript"]`;
    
    // Try to find the button with the selector
    const button = document.querySelector(buttonSelector);

    if (button) {
        // If found, click the button
        button.click();
        console.log('Transcript button clicked');
        // Wait for the transcript panel to appear after clicking the button
        waitForTranscriptElement('#content ytd-transcript-search-panel-renderer.style-scope.ytd-transcript-renderer', toggleTimestampsOff, retries);
    } else if (retries < maxRetries) {
            console.error('Transcript button not found, retrying...');
            setTimeout(() => clickTranscriptButton(retries + 1), 3000);
    } else {
        // If the button isn't found after retrying, log an error message
        console.error('Transcript button not found, reached maximum retries.');
    }
}

// Function to wait for the transcript panel to load and then extract transcript
function waitForTranscriptElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        console.log('Element found:', selector);
        callback(); // Call extractTranscript here
    } else {
        setTimeout(() => waitForTranscriptElement(selector, callback), 3000);
    }
}


// STEP 2. Toggle timestamps off
// Function to toggle timestamps off in the transcript panel
function toggleTimestampsOff() {
    // Selector for the transcript panel
    const transcriptPanelSelector = '#content ytd-transcript-search-panel-renderer.style-scope.ytd-transcript-renderer';
    
    // Try to find the panel using the selector
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
}

// STEP 3. Extract the transcript from the page
// Function to extract the transcript text
function extractTranscript(callback) {
    // Selector for the container holding transcript text
    const transcriptContainerSelector = '#segments-container';

    // Try to find the container using the selector
    const transcriptContainer = document.querySelector(transcriptContainerSelector);
    
    if (transcriptContainer) {
    // If found, extract the text
    const transcriptText = transcriptContainer.innerText;

    // Log transcript text
    console.log('Transcript extracted')
    console.log(transcriptText); 
    
    // // Initiate Chapter extraction
    // clickChaptersButton();

    if (callback) {
        callback(transcriptText, extractChapters); // Pass extractChapters as the next step
    }

    return transcriptText;
    
    } else {
    // If the container isn't found, it could be because the panel hasn't opened yet or it doesn't exist
    console.error('Transcript container not found');
    // Indicate failure to find the container
    return null; 
    }
}

// EXTRACT CHAPTERS: Script to extract chapter from Youtube video
// STEP 1. Click on the 'View all' chapters button
// STEP 2. Extract the Chapters from the page

// STEP 1. Click on the 'View all' Chapters button
// Function to simulate a click on the View all button
function clickChaptersButton(retries = 0) {

    // Selector for the button with the specific classes and aria-label
    const buttonSelector = `#navigation-button > ytd-button-renderer > yt-button-shape > button[aria-label="View all"]`;
    
    // Try to find the button with the selector
    const button = document.querySelector(buttonSelector);

    if (button) {
        // If found, click the button
        button.click();
        console.log('Chapters button clicked');
        // Wait for the Chapters panel to expand after clicking the button
        waitForChaptersElement('#content > ytd-macro-markers-list-renderer', function() {
            extractChapters(callback); // Pass the original callback to extractChapters
        }, retries);
    } else {
        // If the element isn't found, retry
        if (retries < maxRetries) {
            console.error('Chapters panel not found, retrying...');
            setTimeout(() => clickChaptersButton(retries + 1), 3000);
        } else {
            // If the button isn't found after retrying, log an error message
            console.error('Chapters panel not found, reached maximum retries.');
        }
    }
}

// Function to wait for the Chapters panel to expand
function waitForChaptersElement(selector, callback, retries = 0) {
    const element = document.querySelector(selector);
    if (element) {
        console.log('Element found:', selector);
        callback();
    } else {
        if (retries < maxRetries) {
            console.log('Waiting for element:', selector);
            setTimeout(() => waitForChaptersElement(selector, callback, retries + 1), 3000);
        } else {
            console.error('Element not found, reached maximum retries:', selector);
        }
    }
}

// STEP 2. Extract the Chapters from the page
// Function to extract the chapters text
function extractChapters(transcriptText, callback) {
    // Selector for the container holding transcript text
    const chaptersContainerSelector = '#content > ytd-macro-markers-list-renderer';

    // Try to find the container using the selector
    const chaptersContainer = document.querySelector(chaptersContainerSelector);
    
    if (chaptersContainer) {
    // If found, extract the text
    const chaptersText = chaptersContainer.innerText;

    // Log description text
    console.log('Chapters extracted')
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

    // Log the array to see the structure
    console.log('Formatted Chapters:', chaptersArray);

    // return chaptersArray;

    } else {
    // If the container isn't found, it could be because the panel hasn't opened yet or it doesn't exist
    console.error('Chapters container not found');
    // Indicate failure to find the container
    return null; 
    }

    // Initiate formatting
    if (callback) {
        callback(transcriptText, chaptersArray);
    }
}


function formatTranscript(transcriptText, chaptersArray) {
    if (!transcriptText) {
        console.error('No transcript text provided');
        return '';
    }
    
    // Split the transcript into lines for easier processing.
    const transcriptLines = transcriptText.split('\n');

    // Initialize the formatted transcript as an array of lines.
    let formattedTranscript = [];

    // Iterate over the transcript lines.
    transcriptLines.forEach((line) => {
        // Check if this line matches the beginning of a chapter.
        const chapterIndex = chaptersArray.findIndex(chapter => line.trim() === chapter.title.trim());
        if (chapterIndex !== -1) {
            // If it's a match, add the chapter timestamp and title.
            formattedTranscript.push('\n' + chaptersArray[chapterIndex].timestamp + ' ' + chaptersArray[chapterIndex].title + '\n');
        } else {
            // Otherwise, add the line as is.
            formattedTranscript.push(line);
        }
    });

    // Join the array back into a single string with newlines.
    return formattedTranscript.join('\n');
}

// Now, you orchestrate the calls to ensure data is passed correctly
clickTranscriptButton(function(transcriptText, nextStep) {
    // This callback will be called by extractTranscript
    clickChaptersButton(function(chaptersArray) {
        // This callback will be called by extractChapters
        const formattedText = formatTranscript(transcriptText, chaptersArray);
        console.log('Formatted Transcript:', formattedText);
        // Do something with the formatted transcript
    });
});

// Start the operation sequence
clickTranscriptButton();