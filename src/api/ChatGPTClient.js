import {
	globalFetchRequester,
	proxyFetchRequester,
} from '../utils/Requesters.js';
import { createParser } from 'eventsource-parser';
import { streamAsyncIterable } from '../utils/StreamAsyncIterable.js';

class ChatGPTClient {
	constructor() {
		this.requester = globalFetchRequester;
		this.doneReceived = false; // Moved doneReceived to be a class property

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
		const resp = await this.fetch(
			'https://chat.openai.com/api/auth/session'
		);
		if (resp.status === 403) {
			throw new Error('Access denied: Please pass Cloudflare check');
		}
		const data = await resp.json();
		if (!data.accessToken) {
			throw new Error(
				'No logged-in ChatGPT account found in this browser.'
			);
		}
		return data.accessToken;
	}

	async sendMessage(accessToken, message) {
		try {
			console.log('Sending request to ChatGPT:', message);

			const resp = await this.fetch(
				'https://chat.openai.com/backend-api/conversation',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify(message),
				}
			);

			if (!resp.ok) {
				throw new Error(`HTTP error! status: ${resp.status}`);
			}

			this.relevantMessages = []; // Array to store relevant messages

			await this.parseSSEResponse(resp, (message) => {
				console.debug('Received SSE message:', message);

				if (message.trim() === '[DONE]') {
					this.doneReceived = true;
					// Process stored messages here
					this.relevantMessages.forEach((msg) => {
						console.log('Relevant message:', msg);
						// Perform actions with each relevant message
					});
					return;
				}

				if (!this.doneReceived) {
					try {
						let parsedMessage = JSON.parse(message);

						if (
							parsedMessage.message &&
							parsedMessage.message.metadata &&
							parsedMessage.message.metadata.is_complete ===
								true &&
							parsedMessage.message.status ===
								'finished_successfully' &&
							parsedMessage.message.metadata.timestamp_ ===
								'absolute'
						) {
							this.relevantMessages.push(
								parsedMessage.message.content
							);
						}
					} catch (error) {
						console.error('Error parsing message:', error);
					}
				}
			});
		} catch (error) {
			console.error('Error in sendMessage:', error);
			throw error;
		}
	}

	async parseSSEResponse(resp, onMessage) {
		if (!resp.ok) {
			const error = await resp.json().catch(() => ({}));
			if (error && Object.keys(error).length !== 0) {
				throw new Error(JSON.stringify(error));
			}
			throw new Error(`HTTP error! status: ${resp.status}`);
		}

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
