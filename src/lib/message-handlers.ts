import { getMarketData } from '../api/coingecko';
import { getWalletData } from '../api/ethereum';

export const setupMessageListeners = () => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    switch (message.type) {
      case 'GET_MARKET_DATA':
        getMarketData().then(sendResponse);
        return true;
      case 'GET_WALLET_DATA':
        getWalletData().then(sendResponse);
        return true;
      default:
        return false;
    }
  });
}; 