import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { MarketData } from '../types';

export const MarketDataPanel: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_MARKET_DATA' });
      setMarketData(response);
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading market data...</div>;
  }

  if (!marketData) {
    return <div className="p-4">Failed to load market data</div>;
  }

  return (
    <div className="p-4 rounded-lg bg-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Market Data</h2>
        <button onClick={fetchMarketData} className="p-2 hover:bg-accent rounded-full">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Price:</span>
          <span>${marketData.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>24h Change:</span>
          <span className={marketData.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}>
            {marketData.priceChange24h.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span>Market Cap:</span>
          <span>${marketData.marketCap.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}; 