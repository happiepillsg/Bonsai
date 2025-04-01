import { useState, useEffect } from "react";
import { LineChart, TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
}

export function MarketDataPanel() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ action: "getMarketData" });
        if (response.success) {
          setMarketData(response.marketData);
        }
      } catch (error) {
        console.error("Failed to load market data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Market Data</h2>
        <button
          onClick={() => chrome.runtime.sendMessage({ action: "refreshData" })}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Refresh
        </button>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading market data...</div>
        ) : marketData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No market data available
          </div>
        ) : (
          marketData.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  {coin.symbol.slice(0, 1)}
                </div>
                <div>
                  <h3 className="font-medium">{coin.name}</h3>
                  <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatPrice(coin.price)}</p>
                <div className="flex items-center gap-1 text-sm">
                  {coin.priceChange24h >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={coin.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(coin.priceChange24h).toFixed(2)}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{formatMarketCap(coin.marketCap)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 