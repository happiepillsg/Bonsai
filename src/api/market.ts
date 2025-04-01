interface MarketData {
  prices: Record<string, number>;
  marketCaps: Record<string, number>;
  lastUpdated: number;
}

const COINGECKO_API = "https://api.coingecko.com/api/v3";
const SUPPORTED_COINS = ["bitcoin", "ethereum", "binancecoin", "cardano", "solana"];

export async function fetchMarketData(): Promise<MarketData> {
  try {
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${SUPPORTED_COINS.join(
        ","
      )}&vs_currencies=usd&include_market_cap=true`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch market data");
    }

    const data = await response.json();
    const prices: Record<string, number> = {};
    const marketCaps: Record<string, number> = {};

    SUPPORTED_COINS.forEach((coin) => {
      if (data[coin]) {
        prices[coin] = data[coin].usd;
        marketCaps[coin] = data[coin].usd_market_cap;
      }
    });

    return {
      prices,
      marketCaps,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
} 