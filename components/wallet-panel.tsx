"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, RefreshCw } from "lucide-react"

interface TokenBalance {
  symbol: string
  balance: string
  decimals: number
}

interface WalletData {
  address: string
  tokens: TokenBalance[]
  gasPrice: string
}

export function WalletPanel() {
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ action: "getWalletData" })
        if (response.success) {
          setWalletData(response.walletData)
        }
      } catch (error) {
        console.error("Failed to load wallet data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWalletData()
    const interval = setInterval(fetchWalletData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const handleConnect = async () => {
    setIsConnecting(true)
    try {
      const response = await chrome.runtime.sendMessage({ action: "connectWallet" })
      if (response.success) {
        setWalletData((prev) => prev ? { ...prev, address: response.address } : null)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const formatBalance = (balance: string, decimals: number) => {
    const num = parseFloat(balance)
    return num.toFixed(decimals > 4 ? 4 : decimals)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Wallet</CardTitle>
        <CardDescription>Connect your wallet to view balances</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">Loading wallet data...</div>
        ) : !walletData ? (
          <div className="text-center py-8">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-mono text-sm truncate">{walletData.address}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Token Balances</h3>
              {walletData.tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <span className="font-medium">{token.symbol}</span>
                  <span>{formatBalance(token.balance, token.decimals)}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg border bg-card">
              <p className="text-sm text-muted-foreground">Gas Price</p>
              <p className="font-medium">{walletData.gasPrice} Gwei</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

