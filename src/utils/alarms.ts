export function setupAlarms() {
  // Set up market data update alarm (every 5 minutes)
  chrome.alarms.create("updateMarketData", {
    periodInMinutes: 5,
  });

  // Set up wallet data update alarm (every 30 seconds)
  chrome.alarms.create("updateWalletData", {
    periodInMinutes: 0.5,
  });
} 