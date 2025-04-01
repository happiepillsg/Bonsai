export const setupAlarms = () => {
  // Set up alarm for market data updates (every 5 minutes)
  chrome.alarms.create('marketDataUpdate', {
    periodInMinutes: 5
  });

  // Set up alarm for wallet data updates (every 30 seconds)
  chrome.alarms.create('walletDataUpdate', {
    periodInMinutes: 0.5
  });

  // Listen for alarm events
  chrome.alarms.onAlarm.addListener((alarm) => {
    switch (alarm.name) {
      case 'marketDataUpdate':
        chrome.runtime.sendMessage({ type: 'GET_MARKET_DATA' });
        break;
      case 'walletDataUpdate':
        chrome.runtime.sendMessage({ type: 'GET_WALLET_DATA' });
        break;
    }
  });
}; 