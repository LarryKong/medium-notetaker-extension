// Create the floating div
const floatingDiv = document.createElement('div');
floatingDiv.id = 'dialog-popup';
document.body.appendChild(floatingDiv);

// Apply styles to the floating div
floatingDiv.style.all = 'unset';
floatingDiv.style.position = 'fixed';
floatingDiv.style.transition = 'opacity 0.04s ease 0s';
floatingDiv.style.background = 'black';
floatingDiv.style.border = '0px';
floatingDiv.style.borderRadius = '5px';
floatingDiv.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 0px 0px 5px';
floatingDiv.style.clip = 'auto';
floatingDiv.style.display = 'block';
floatingDiv.style.height = 'auto';
floatingDiv.style.overflow = 'hidden';
floatingDiv.style.right = '12px';
floatingDiv.style.top = '12px';
floatingDiv.style.userSelect = 'none';
floatingDiv.style.width = '380px';
floatingDiv.style.zIndex = '1000';
floatingDiv.style.backgroundColor = 'transparent';

// Create the child div (dialog top)
const dialogTop = document.createElement('div');
dialogTop.id = 'dialog-popup';
floatingDiv.appendChild(dialogTop);

// Apply styles to the dialog top
dialogTop.style.all = 'unset';
dialogTop.style.alignItems = 'center';
dialogTop.style.backgroundColor = 'rgb(255, 255, 255)';
dialogTop.style.boxShadow = 'rgb(234, 234, 234) 0px -1px inset';
dialogTop.style.cursor = 'grab';
dialogTop.style.display = 'inline-flex';
dialogTop.style.height = '40px';
dialogTop.style.left = '0px';
dialogTop.style.padding = '0px 8px 0px 12px';
dialogTop.style.position = 'absolute';
dialogTop.style.right = '0px';
dialogTop.style.top = '0px';

// Add more elements or content as needed

// Create the iframe
const iframe = document.createElement('iframe');
iframe.src = 'chrome-extension://gmjoggipfbhjpjmcopmmeaagghnpmmoj'; // Replace with your desired URL
iframe.style.width = '100%';
iframe.style.height = '100%';
iframe.style.border = 'none';

// Append the iframe to the floating div
floatingDiv.appendChild(iframe);

let isVisible = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleFloatingDiv") {
        isVisible = !isVisible;
        floatingDiv.style.display = isVisible ? 'block' : 'none';
    }
});
