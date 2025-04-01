// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings
  chrome.storage.local.set({
    settings: {
      theme: 'system',
    }
  });
}); 