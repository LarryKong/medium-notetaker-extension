import { chatGPTClient } from '../api/ChatGPTClient.js';
import { v4 as uuidv4 } from 'uuid';

class ChatGPTWebBot {
    constructor() {
        this.accessToken = null;
        this.parentMessageId = null; // Initialize parent message ID as null
    }

    _generateMessageId() {
        return uuidv4(); // Generates a unique UUID
    }

    async startConversation() {
        this.accessToken = await chatGPTClient.getAccessToken();
        this.parentMessageId = this._generateMessageId(); // Reset parent message ID for a new conversation
    }

    async sendMessage(text) {
        try {
            if (!this.accessToken) {
                throw new Error('Access token not found. Please start a conversation first.');
            }

            const prompt = 'Please summarize the following article: ';
            const combinedText = prompt + text;
            const messageId = this._generateMessageId(); // Generate a new message ID for each request

            const message = {
                id: messageId,
                author: { role: 'user' },
                content: { content_type: 'text', parts: [combinedText] },
            };

            const response = await chatGPTClient.sendMessage(this.accessToken, {
                action: 'next',
				messages: [message],
				parent_message_id: this.parentMessageId,  // Use the stored parent message ID
				arkose_token: null, // Set arkose_token to null
				conversation_mode: { kind: 'primary_assistant' },
				// force_paragen: false,
				// force_rate_limit: false,
				// history_and_training_disabled: false,
                model: 'text-davinci-002-render-sha',
                
            });

            return response;

        } catch (error) {
            console.error('Error sending message to ChatGPT:', error);
        }
    }

    resetConversation() {
        this.accessToken = null;
        this.parentMessageId = null;
    }
}

export const chatGPTWebBot = new ChatGPTWebBot();
