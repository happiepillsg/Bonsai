import { WalletData } from '../types';

export const getWalletData = async (): Promise<WalletData> => {
  try {
    // This is a mock implementation
    // In a real app, you would use ethers.js or web3.js to interact with the blockchain
    return {
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      balances: [
        { symbol: 'ETH', balance: '1.5', value: 3000 },
        { symbol: 'USDC', balance: '1000', value: 1000 },
      ],
      gasPrice: '25'
    };
  } catch (error) {
    console.error('Failed to fetch wallet data:', error);
    throw error;
  }
}; 