// Wallet API module for Bonsai Dashboard

export class WalletAPI {
  static async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      return accounts[0];
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  static async getBalance(address) {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });

      return this.formatBalance(balance);
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }

  static async getTokenBalances(address) {
    try {
      // This would typically use an ERC20 token contract to get balances
      // For now, we'll return a mock implementation
      return {
        tokens: [
          {
            symbol: 'ETH',
            balance: await this.getBalance(address),
            decimals: 18
          }
        ]
      };
    } catch (error) {
      console.error('Error getting token balances:', error);
      throw error;
    }
  }

  static async getGasPrice() {
    try {
      const gasPrice = await window.ethereum.request({
        method: 'eth_gasPrice'
      });

      return this.formatGasPrice(gasPrice);
    } catch (error) {
      console.error('Error getting gas price:', error);
      throw error;
    }
  }

  static formatBalance(balance) {
    // Convert from Wei to ETH
    return (parseInt(balance, 16) / 1e18).toFixed(4);
  }

  static formatGasPrice(gasPrice) {
    // Convert from Wei to Gwei
    return (parseInt(gasPrice, 16) / 1e9).toFixed(2);
  }

  static async getTransactionHistory(address) {
    try {
      // This would typically use an API like Etherscan to get transaction history
      // For now, we'll return a mock implementation
      return {
        transactions: []
      };
    } catch (error) {
      console.error('Error getting transaction history:', error);
      throw error;
    }
  }
} 