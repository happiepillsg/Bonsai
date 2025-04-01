// Content script for interacting with web pages
console.log('Bonsai Dashboard content script loaded');

interface Message {
  type: string;
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message: Message, _sender, sendResponse) => {
  if (message.type === 'GET_PAGE_DATA') {
    // Handle page data requests
    sendResponse({ success: true });
  }
  return true;
}); 