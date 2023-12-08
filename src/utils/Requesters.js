import Browser from 'webextension-polyfill';

// GlobalFetchRequester for making standard fetch requests
export class GlobalFetchRequester {
    fetch(url, options) {
        return fetch(url, options);
    }
}

// ProxyFetchRequester for handling fetch requests through a proxy tab
export class ProxyFetchRequester {
    async findExistingProxyTab() {
        const tabs = await Browser.tabs.query({ pinned: true });
        for (const tab of tabs) {
            if (tab.url && tab.url.startsWith('https://chat.openai.com')) {
                return tab;
            }
        }
        return null;
    }

    async createProxyTab() {
        const tab = await Browser.tabs.create({ url: 'https://chat.openai.com', pinned: true });
        return tab;
    }

    async getProxyTab() {
        let tab = await this.findExistingProxyTab();
        if (!tab) {
            tab = await this.createProxyTab();
        }
        return tab;
    }

    async fetch(url, options) {
        const proxyTab = await this.getProxyTab();
        if (!proxyTab.id) throw new Error('Proxy tab ID not found');

        // Sending a message to the content script in the proxy tab to perform the fetch operation
        const response = await Browser.tabs.sendMessage(proxyTab.id, {
            action: 'fetch',
            url: url,
            options: options
        });

        return new Response(new Blob([response.body]), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });
    }
}

export const globalFetchRequester = new GlobalFetchRequester();
export const proxyFetchRequester = new ProxyFetchRequester();
