"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface CryptoData {
  name: string
  symbol: string
  price: number
  change24h: number
  data: { timestamp: number; price: number }[]
}

interface MarketPanelProps {
  expanded?: boolean
}

export function MarketPanel({ expanded = false }: MarketPanelProps) {
  const [cryptocurrencies, setCryptocurrencies] = useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for development purposes - in actual extension this would fetch real data
    setIsLoading(true)

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setCryptocurrencies([
        {
          name: "Bitcoin",
          symbol: "BTC",
          price: 50234.56,
          change24h: 2.34,
          data: generateChartData(50000, 5, 24),
        },
        {
          name: "Ethereum",
          symbol: "ETH",
          price: 3456.78,
          change24h: -0.87,
          data: generateChartData(3400, 3, 24),
        },
        {
          name: "Solana",
          symbol: "SOL",
          price: 103.45,
          change24h: 5.67,
          data: generateChartData(100, 8, 24),
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className={expanded ? "h-full" : ""}>
      <CardHeader>
        <CardTitle className="text-lg">Market Data</CardTitle>
        <CardDescription>Top cryptocurrencies by market cap</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              ))
          : cryptocurrencies.map((crypto) => (
              <div key={crypto.symbol} className="space-y-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{crypto.name}</h3>
                    <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${crypto.price.toLocaleString()}</div>
                    <Badge variant={crypto.change24h > 0 ? "outline" : "destructive"} className="text-xs">
                      {crypto.change24h > 0 ? "+" : ""}
                      {crypto.change24h}%
                    </Badge>
                  </div>
                </div>
                <div className="h-16 bg-muted/30 rounded-md flex items-center justify-center">
                  <div
                    className={`h-8 w-full mx-4 rounded-sm ${crypto.change24h > 0 ? "bg-green-500/20" : "bg-red-500/20"}`}
                  >
                    <div
                      className={`h-full ${crypto.change24h > 0 ? "bg-green-500" : "bg-red-500"} rounded-sm`}
                      style={{ width: `${Math.abs(crypto.change24h) * 5}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Data refreshes every 5 minutes</CardFooter>
    </Card>
  )
}

// Helper function to generate mock chart data
function generateChartData(basePrice: number, volatility: number, points: number) {
  const now = Date.now()
  const data = []

  for (let i = 0; i < points; i++) {
    // Go back in time, in 1-hour increments
    const timestamp = now - (points - i) * 3600 * 1000

    // Random price around base with some volatility
    const randomVariation = (((Math.random() - 0.5) * 2 * volatility) / 100) * basePrice
    const price = basePrice + basePrice * (((i / points) * volatility) / 100) + randomVariation

    data.push({ timestamp, price })
  }

  return data
}

