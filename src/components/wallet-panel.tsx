import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { WalletData } from '../types';

export const WalletPanel: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  const fetchWalletData = async () => {
    if (!connected) return;
    setLoading(true);
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_WALLET_DATA' });
      setWalletData(response);
    } catch (error) {
      console.error('Failed to fetch wallet data:', error);
    }
    setLoading(false);
  };

  const handleConnect = async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'CONNECT_WALLET' });
      if (response.success) {
        setConnected(true);
        setWalletData(response.walletData);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchWalletData();
      const interval = setInterval(fetchWalletData, 30000);
      return () => clearInterval(interval);
    }
  }, [connected]);

  if (!connected) {
    return (
      <div className="p-4 rounded-lg bg-card">
        <button
          onClick={handleConnect}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="p-4">Loading wallet data...</div>;
  }

  if (!walletData) {
    return <div className="p-4">Failed to load wallet data</div>;
  }

  return (
    <div className="p-4 rounded-lg bg-card">
      <h2 className="text-xl font-semibold mb-4">Wallet</h2>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground break-all">
          {walletData.address}
        </div>
        <div className="space-y-2">
          {walletData.balances.map((token) => (
            <div key={token.symbol} className="flex justify-between">
              <span>{token.symbol}</span>
              <span>{token.balance} (${token.value.toLocaleString()})</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          Gas Price: {walletData.gasPrice} GWEI
        </div>
      </div>
    </div>
  );
}; 