// Cryptocurrency API module for Bonsai Dashboard

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export class CryptoAPI {
  static async getMarketData(coins = ['bitcoin', 'ethereum', 'binancecoin']) {
    try {
      const response = await fetch(
        `${COINGECKO_API_BASE}/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
      );
      const data = await response.json();
      return this.processMarketData(data);
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw error;
    }
  }

  static async getHistoricalData(coinId, days = 7) {
    try {
      const response = await fetch(
        `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      return this.processHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  static async getTrendingCoins() {
    try {
      const response = await fetch(`${COINGECKO_API_BASE}/search/trending`);
      const data = await response.json();
      return data.coins.map(coin => coin.item);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
      throw error;
    }
  }

  static processMarketData(data) {
    return Object.entries(data).map(([coinId, coinData]) => ({
      id: coinId,
      price: coinData.usd,
      priceChange24h: coinData.usd_24h_change,
      marketCap: coinData.usd_market_cap
    }));
  }

  static processHistoricalData(data) {
    return {
      prices: data.prices.map(([timestamp, price]) => ({
        timestamp: new Date(timestamp).toISOString(),
        price
      })),
      marketCaps: data.market_caps.map(([timestamp, marketCap]) => ({
        timestamp: new Date(timestamp).toISOString(),
        marketCap
      })),
      volumes: data.total_volumes.map(([timestamp, volume]) => ({
        timestamp: new Date(timestamp).toISOString(),
        volume
      }))
    };
  }
} 