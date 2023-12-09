import {
    globalFetchRequester,
    proxyFetchRequester,
} from '../utils/Requesters.js';
import { createParser } from 'eventsource-parser';
import { streamAsyncIterable } from '../utils/StreamAsyncIterable.js';

class ChatGPTClient {
    constructor() {
        this.requester = globalFetchRequester;
        this.doneReceived = false; // Track when [DONE] is received
        this.relevantMessages = []; // Store relevant messages for each request

        proxyFetchRequester.findExistingProxyTab().then((tab) => {
            if (tab) {
                this.switchRequester(proxyFetchRequester);
            }
        });
    }

    switchRequester(newRequester) {
        console.debug('ChatGPTClient: Switching requester', newRequester);
        this.requester = newRequester;
    }

    async fetch(url, options) {
        return this.requester.fetch(url, options);
    }

    async getAccessToken() {
        const resp = await this.fetch('https://chat.openai.com/api/auth/session');
        if (resp.status === 403) {
            throw new Error('Access denied: Please pass Cloudflare check');
        }
        const data = await resp.json();
        if (!data.accessToken) {
            throw new Error('No logged-in ChatGPT account found in this browser.');
        }
        return data.accessToken;
    }

    async sendMessage(accessToken, message, messageId) {
        try {
            console.log('Sending request to ChatGPT:', messageId, message);
            const resp = await this.fetch('https://chat.openai.com/backend-api/conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(message),
            });

            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }

            this.relevantMessages = []; // Reset relevant messages array
            this.doneReceived = false; // Reset done flag

            await this.parseSSEResponse(resp, (receivedMessage) => {
                console.debug('Received SSE message:', message);

                if (receivedMessage.trim() === '[DONE]') {
                    this.doneReceived = true;
                    return this.processMessages(messageId);
                }

                if (!this.doneReceived) {
                    this.handleMessage(receivedMessage, messageId);
                }
            });
        } catch (error) {
            console.error('Error in sendMessage:', error);
            throw error;
        }
    }

    handleMessage(message, messageId) {
        try {
            let parsedMessage = JSON.parse(message);
            if (
                parsedMessage.message &&
                parsedMessage.message.status === 'finished_successfully' &&
                parsedMessage.message.metadata.is_complete === true &&
                parsedMessage.message.metadata.timestamp_ === 'absolute' 
            ) {
                this.relevantMessages.push({messageId, message: parsedMessage.message});
                console.log('Relevant message:', parsedMessage.message.content);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    }

    processMessages(messageId) {
        // Process and return messages along with the messageId
        return this.relevantMessages.map(msg => {
            return { messageId: msg.messageId, content: msg.message.content };
        });
    }

    async parseSSEResponse(resp, onMessage) {
        const parser = createParser((event) => {
            if (event.type === 'event') {
                onMessage(event.data);
            }
        });

        const decoder = new TextDecoder();
        for await (const chunk of streamAsyncIterable(resp.body)) {
            const str = decoder.decode(chunk);
            parser.feed(str);
        }
    }
}

export const chatGPTClient = new ChatGPTClient();
