export interface TokenBalance {
  symbol: string;
  balance: string;
  value: number;
}

export interface WalletData {
  address: string;
  balances: TokenBalance[];
  gasPrice: string;
}

export interface MarketData {
  price: number;
  priceChange24h: number;
  marketCap: number;
}

export interface Message {
  type: string;
  data?: any;
} 