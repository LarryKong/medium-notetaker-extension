import { chatGPTWebBot } from '../models/ChatGPTWebBot.js';

// Initialize the bot and start a conversation
chatGPTWebBot.startConversation().catch(console.error);

// Store selected tabs and user prompt
let selectedTabs = [];
let userPrompt = "";

// Object to keep track of processed tabs
let processedTabs = {};

// Handler for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "processTabs") {
        selectedTabs = message.tabIds.map(id => parseInt(id));
        console.log(`Selected tabs: ${selectedTabs}`);
        userPrompt = message.prompt;
        console.log(`User prompt: ${userPrompt}`);
        processSelectedTabs();
    } else if (message.action === "extractedText") {
        const extractedText = message.text;
        // Send each extracted text along with the user prompt to ChatGPT as a single API request
        sendExtractedTextToChatGPT(extractedText, userPrompt);
        // Reset selected tabs and user prompt after processing
        selectedTabs = [];
        userPrompt = "";
        processedTabs = {}; // Reset processed tabs
    }
});

function processSelectedTabs() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            if (selectedTabs.includes(tab.id) && !tab.url.startsWith('chrome://')) {
                if (processedTabs[tab.id]) {
                    console.log(`Tab ${tab.id} already processed.`);
                    return;
                }
                processedTabs[tab.id] = true; // Mark tab as processed
                console.log(`Injecting script into tab ${tab.id}`);
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['extractText.js'],
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error(`Script injection failed for tab ${tab.id}: ${chrome.runtime.lastError.message}`);
                        processedTabs[tab.id] = false; // Unmark tab if script injection fails
                        return;
                    }
                    chrome.tabs.sendMessage(tab.id, { action: "extractText" });
                });
            }
        });
    });
}

async function sendExtractedTextToChatGPT(text, prompt) {
    try {
        if (!chatGPTWebBot) {
            console.error('ChatGPTWebBot is not initialized');
            return;
        }
        const combinedText = prompt + "\n\n" + text;
        const response = await chatGPTWebBot.sendMessage(combinedText);
        console.log('ChatGPT response:', response);
    } catch (error) {
        console.error('Error sending text to ChatGPT:', error);
    }
}
