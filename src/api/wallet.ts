interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  usdValue: number;
}

interface WalletData {
  address: string | null;
  balances: TokenBalance[];
  gasPrice: number | null;
}

const ETHERSCAN_API = "https://api.etherscan.io/api";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

export async function fetchWalletData(): Promise<WalletData> {
  try {
    // Get wallet address from storage
    const { wallet } = await chrome.storage.local.get("wallet");
    const address = wallet?.address || null;

    if (!address) {
      return {
        address: null,
        balances: [],
        gasPrice: null,
      };
    }

    // Fetch token balances
    const balancesResponse = await fetch(
      `${ETHERSCAN_API}?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!balancesResponse.ok) {
      throw new Error("Failed to fetch token balances");
    }

    const balancesData = await balancesResponse.json();
    const balances: TokenBalance[] = [];

    // Process token balances
    if (balancesData.result) {
      const uniqueTokens = new Map<string, TokenBalance>();
      balancesData.result.forEach((tx: any) => {
        if (!uniqueTokens.has(tx.contractAddress)) {
          uniqueTokens.set(tx.contractAddress, {
            symbol: tx.tokenSymbol,
            balance: "0",
            decimals: parseInt(tx.tokenDecimal),
            usdValue: 0,
          });
        }
      });
      balances.push(...Array.from(uniqueTokens.values()));
    }

    // Fetch gas price
    const gasResponse = await fetch(
      `${ETHERSCAN_API}?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
    );

    if (!gasResponse.ok) {
      throw new Error("Failed to fetch gas price");
    }

    const gasData = await gasResponse.json();
    const gasPrice = gasData.result?.SafeGasPrice || null;

    return {
      address,
      balances,
      gasPrice: gasPrice ? parseInt(gasPrice) : null,
    };
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
} 