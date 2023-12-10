import { chatGPTClient } from '../api/ChatGPTClient.js'; // Import the ChatGPT client from the specified path
import { v4 as uuidv4 } from 'uuid'; // Import the uuidv4 function for generating unique UUIDs

class ChatGPTWebBot {
    constructor() {
        this.accessToken = null; // Initialize accessToken to null; it will be set when a conversation starts
        this.parentMessageIds = {}; // Object to store parent message IDs keyed by conversation ID
        this.requestMap = new Map(); // Map to keep track of ongoing requests
    }

    _generateMessageId() {
        return uuidv4(); // Private method to generate a unique message ID using UUID
    }

    async startConversation() {
        try {
            this.accessToken = await chatGPTClient.getAccessToken(); // Attempt to get an access token from the ChatGPT client
            console.log('ChatGPTWebBot: Conversation started with new access token.');
        } catch (error) {
            console.error('ChatGPTWebBot: Error starting conversation:', error); // Log any errors encountered during the process
        }
    }

    async sendMessage(text, conversationId = null) {
        try {
            if (!this.accessToken) {
                throw new Error('Access token not found. Please start a conversation first.'); // Check for accessToken before proceeding
            }

            // Generate a new conversation ID if not provided
            if (!conversationId) {
                conversationId = this._generateMessageId(); // Generate a unique conversation ID
                this.parentMessageIds[conversationId] = this._generateMessageId(); // Generate a parent message ID for the conversation
            }

            const combinedText = text; // Prepare the text to be sent; can be customized or combined with other data
            const messageId = this._generateMessageId(); // Generate a unique message ID for this request
            this.requestMap.set(messageId, conversationId); // Track this request in the request map

            const message = {
                id: messageId,
                author: { role: 'user' },
                content: { content_type: 'text', parts: [combinedText] }, // Construct the message payload
            };

            console.log(`ChatGPTWebBot: Sending message for conversation ID ${conversationId}`);

            const response = await chatGPTClient.sendMessage(this.accessToken, {
                action: 'next',
                messages: [message],
                parent_message_id: this.parentMessageIds[conversationId], // Use the parent message ID associated with the conversation
                arkose_token: null,
                conversation_mode: { kind: 'primary_assistant' },
                model: 'text-davinci-002-render-sha',
            }, messageId);

            this.requestMap.delete(messageId); // Remove this request from tracking after completion
            return response; // Return the response received from the ChatGPT client

        } catch (error) {
            console.error('ChatGPTWebBot: Error sending message:', error); // Log any errors encountered during sending the message
            return null; // Return null to indicate an error occurred
        }
    }

    resetConversation(conversationId) {
        if (this.parentMessageIds[conversationId]) {
            delete this.parentMessageIds[conversationId]; // Remove the parent message ID for the specified conversation ID
            console.log(`ChatGPTWebBot: Conversation with ID ${conversationId} reset.`);
        } else {
            console.log(`ChatGPTWebBot: No conversation found with ID ${conversationId} to reset.`); // Log if no conversation with the specified ID was found
        }
    }
}

export const chatGPTWebBot = new ChatGPTWebBot(); // Export an instance of the ChatGPTWebBot
