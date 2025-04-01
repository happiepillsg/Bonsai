import { Message } from '../types';
import { getMarketData } from '../api/coingecko';
import { getWalletData } from '../api/ethereum';

export const setupMessageHandlers = () => {
  chrome.runtime.onMessage.addListener(
    (message: Message, _sender, sendResponse) => {
      switch (message.type) {
        case 'GET_MARKET_DATA':
          getMarketData().then(sendResponse);
          return true;
        case 'GET_WALLET_DATA':
          getWalletData().then(sendResponse);
          return true;
        default:
          sendResponse({ success: false });
          return false;
      }
    }
  );
}; 