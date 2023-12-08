import { chatGPTWebBot } from '../models/ChatGPTWebBot.js';

// Initialize the bot and start a conversation
chatGPTWebBot.startConversation().catch(console.error);

chrome.action.onClicked.addListener(function() {
    // Query all tabs 
    chrome.tabs.query({url:"https://pub.aimind.so/linear-algebra-that-every-data-scientist-should-know-eb585e0ef18d"}, function(tabs) {
        tabs.forEach(function(tab) {
            // Check if the tab's URL is not a chrome:// URL
            if (!tab.url.startsWith('chrome://')) {
                // First, try sending a message to the content script
                chrome.tabs.sendMessage(tab.id, { action: "checkScript" }, function(response) {
                    if (chrome.runtime.lastError || !response?.scriptInjected) {
                        // No response or an error indicates the script isn't there yet, so inject it
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            files: ['page.js']
                        }, () => {
                            // Check for injection errors
                            if (chrome.runtime.lastError) {
                                console.error(`Script injection failed for tab ${tab.id}: ${chrome.runtime.lastError.message}`);
                                return;
                            }
                            // After the script is injected, send the message to extract text
                            chrome.tabs.sendMessage(tab.id, { action: "extractText" });
                        });
                    } else {
                        // Script is already injected, just send the message to extract text
                        chrome.tabs.sendMessage(tab.id, { action: "extractText" });
                    }
                });
            }
        });
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractedText") {
        const extractedText = message.text;
        // Send each extracted text to ChatGPT as a single API request
        sendExtractedTextToChatGPT(extractedText);
    }
});

async function sendExtractedTextToChatGPT(text) {
    try {
        if (!chatGPTWebBot) {
            console.error('ChatGPTWebBot is not initialized');
            return;
        }
        // Send the text to ChatGPT and await the response for each article separately
        const response = await chatGPTWebBot.sendMessage(text);
        console.log('ChatGPT response:', response);
    } catch (error) {
        console.error('Error sending text to ChatGPT:', error);
    }
}

