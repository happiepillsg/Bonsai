// Background script for Bonsai Dashboard Chrome Extension

import { BookmarksAPI } from './api/bookmarks.js';
import { CryptoAPI } from './api/crypto.js';
import { WalletAPI } from './api/wallet.js';
import { PreferencesStorage } from './storage/preferences.js';
import { CacheStorage } from './storage/cache.js';

// Initialize extension
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('Bonsai Dashboard installed');
    await initializeExtension();
  }
});

async function initializeExtension() {
  try {
    // Set default preferences
    await PreferencesStorage.updatePreferences({});
    
    // Initialize cache
    await CacheStorage.clearCache();
    
    // Set up initial data
    await updateAllData();
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
}

async function updateAllData() {
  try {
    // Update market data
    const marketData = await CryptoAPI.getMarketData();
    await CacheStorage.setMarketDataCache(marketData);
    
    // Update bookmarks
    const bookmarks = await BookmarksAPI.getBookmarks();
    await CacheStorage.setBookmarksCache(bookmarks);
    
    // Update cache timestamp
    await chrome.storage.local.set({
      bonsai_data_last_updated: Date.now()
    });
  } catch (error) {
    console.error('Error updating data:', error);
  }
}

// Set up periodic data refresh
chrome.alarms.create('refreshData', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshData') {
    updateAllData();
  }
});

// Listen for messages from the frontend
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender, sendResponse);
  return true; // Keep the messaging channel open for async response
});

async function handleMessage(request, sender, sendResponse) {
  try {
    switch (request.action) {
      case 'getBookmarks':
        const bookmarks = await BookmarksAPI.getBookmarks();
        sendResponse({ success: true, bookmarks });
        break;
        
      case 'getMarketData':
        const marketData = await CryptoAPI.getMarketData();
        sendResponse({ success: true, marketData });
        break;
        
      case 'getWalletData':
        const walletData = await WalletAPI.getTokenBalances(request.address);
        sendResponse({ success: true, walletData });
        break;
        
      case 'getPreferences':
        const preferences = await PreferencesStorage.getPreferences();
        sendResponse({ success: true, preferences });
        break;
        
      case 'updatePreferences':
        await PreferencesStorage.updatePreferences(request.preferences);
        sendResponse({ success: true });
        break;
        
      case 'refreshData':
        await updateAllData();
        sendResponse({ success: true });
        break;
        
      case 'connectWallet':
        const address = await WalletAPI.connectWallet();
        sendResponse({ success: true, address });
        break;
        
      case 'getGasPrice':
        const gasPrice = await WalletAPI.getGasPrice();
        sendResponse({ success: true, gasPrice });
        break;
        
      default:
        sendResponse({ success: false, error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Handle bookmark changes
chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
  try {
    const bookmarks = await BookmarksAPI.getBookmarks();
    await CacheStorage.setBookmarksCache(bookmarks);
  } catch (error) {
    console.error('Error handling bookmark creation:', error);
  }
});

chrome.bookmarks.onRemoved.addListener(async (id, removeInfo) => {
  try {
    const bookmarks = await BookmarksAPI.getBookmarks();
    await CacheStorage.setBookmarksCache(bookmarks);
  } catch (error) {
    console.error('Error handling bookmark removal:', error);
  }
});

chrome.bookmarks.onChanged.addListener(async (id, changeInfo) => {
  try {
    const bookmarks = await BookmarksAPI.getBookmarks();
    await CacheStorage.setBookmarksCache(bookmarks);
  } catch (error) {
    console.error('Error handling bookmark change:', error);
  }
});

// Initial data fetch
updateAllData();

