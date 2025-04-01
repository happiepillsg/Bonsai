import { MarketData } from '../types';

const API_BASE = 'https://api.coingecko.com/api/v3';

export const getMarketData = async (): Promise<MarketData> => {
  try {
    const response = await fetch(`${API_BASE}/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`);
    const data = await response.json();
    
    return {
      price: data.ethereum.usd,
      priceChange24h: data.ethereum.usd_24h_change,
      marketCap: data.ethereum.usd_market_cap
    };
  } catch (error) {
    console.error('Failed to fetch market data:', error);
    throw error;
  }
}; 