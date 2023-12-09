import { chatGPTClient } from '../api/ChatGPTClient.js';
import { v4 as uuidv4 } from 'uuid';

class ChatGPTWebBot {
    constructor() {
        this.accessToken = null;
        this.parentMessageIds = {}; // Map to track parent message IDs for each conversation
        this.requestMap = new Map(); // Map to track ongoing requests
    }

    _generateMessageId() {
        return uuidv4(); // Generates a unique UUID
    }

    async startConversation() {
        try {
            this.accessToken = await chatGPTClient.getAccessToken();
            console.log('ChatGPTWebBot: Conversation started with new access token.');
        } catch (error) {
            console.error('ChatGPTWebBot: Error starting conversation:', error);
        }
    }

    async sendMessage(text, conversationId = null) {
        try {
            if (!this.accessToken) {
                throw new Error('Access token not found. Please start a conversation first.');
            }

            // Generate a new conversation ID if not provided
            if (!conversationId) {
                conversationId = this._generateMessageId();
                this.parentMessageIds[conversationId] = this._generateMessageId();
            }

            const combinedText = text;
            const messageId = this._generateMessageId(); // Generate a new message ID for each request
            this.requestMap.set(messageId, conversationId); // Track the request

            const message = {
                id: messageId,
                author: { role: 'user' },
                content: { content_type: 'text', parts: [combinedText] },
            };

            console.log(`ChatGPTWebBot: Sending message for conversation ID ${conversationId}`);

            const response = await chatGPTClient.sendMessage(this.accessToken, {
                action: 'next',
                messages: [message],
                parent_message_id: this.parentMessageIds[conversationId],
                arkose_token: null,
                conversation_mode: { kind: 'primary_assistant' },
                model: 'text-davinci-002-render-sha',
            }, messageId);

            this.requestMap.delete(messageId); // Remove the request from tracking
            return response;

        } catch (error) {
            console.error('ChatGPTWebBot: Error sending message:', error);
            return null; // Return null to signify an error occurred
        }
    }

    resetConversation(conversationId) {
        if (this.parentMessageIds[conversationId]) {
            delete this.parentMessageIds[conversationId];
            console.log(`ChatGPTWebBot: Conversation with ID ${conversationId} reset.`);
        } else {
            console.log(`ChatGPTWebBot: No conversation found with ID ${conversationId} to reset.`);
        }
    }
}

export const chatGPTWebBot = new ChatGPTWebBot();
