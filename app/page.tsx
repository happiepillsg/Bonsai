"use client"

import { useState } from "react"
import { BookmarkGrid } from "@/components/bookmark-grid"
import { Sidebar } from "@/components/sidebar"
import { SearchInput } from "@/components/search-input"
import type { BookmarkCategory } from "@/lib/types"
import { DashboardLayout } from "@/components/dashboard-layout"
import { BookmarksPanel } from "@/components/bookmarks-panel"
import { MarketDataPanel } from "@/components/market-data-panel"
import { WalletPanel } from "@/components/wallet-panel"
import { DeveloperToolsPanel } from "@/components/developer-tools-panel"
import { DeFiPanel } from "@/components/defi-panel"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <BookmarksPanel />
        <MarketDataPanel />
        <WalletPanel />
        <DeveloperToolsPanel />
        <DeFiPanel />
      </div>
    </DashboardLayout>
  )
}

// Helper function to generate mock bookmark data
function generateMockBookmarks(): BookmarkCategory[] {
  const categories = [
    {
      id: "1",
      title: "Development Tools",
      items: [
        { id: "1-1", title: "GitHub", url: "https://github.com", favicon: "https://github.com/favicon.ico" },
        {
          id: "1-2",
          title: "StackOverflow",
          url: "https://stackoverflow.com",
          favicon: "https://stackoverflow.com/favicon.ico",
        },
        { id: "1-3", title: "CodePen", url: "https://codepen.io", favicon: "https://codepen.io/favicon.ico" },
        {
          id: "1-4",
          title: "VS Code",
          url: "https://code.visualstudio.com",
          favicon: "https://code.visualstudio.com/favicon.ico",
        },
        { id: "1-5", title: "GitLab", url: "https://gitlab.com", favicon: "https://gitlab.com/favicon.ico" },
      ],
    },
    {
      id: "2",
      title: "Blockchain",
      items: [
        { id: "2-1", title: "Etherscan", url: "https://etherscan.io", favicon: "https://etherscan.io/favicon.ico" },
        {
          id: "2-2",
          title: "CoinMarketCap",
          url: "https://coinmarketcap.com",
          favicon: "https://coinmarketcap.com/favicon.ico",
        },
        { id: "2-3", title: "MetaMask", url: "https://metamask.io", favicon: "https://metamask.io/favicon.ico" },
        { id: "2-4", title: "Uniswap", url: "https://app.uniswap.org", favicon: "https://app.uniswap.org/favicon.ico" },
        { id: "2-5", title: "OpenSea", url: "https://opensea.io", favicon: "https://opensea.io/favicon.ico" },
      ],
    },
    {
      id: "3",
      title: "Productivity",
      items: [
        { id: "3-1", title: "Notion", url: "https://notion.so", favicon: "https://notion.so/favicon.ico" },
        { id: "3-2", title: "Trello", url: "https://trello.com", favicon: "https://trello.com/favicon.ico" },
        { id: "3-3", title: "Slack", url: "https://slack.com", favicon: "https://slack.com/favicon.ico" },
        { id: "3-4", title: "Asana", url: "https://asana.com", favicon: "https://asana.com/favicon.ico" },
        {
          id: "3-5",
          title: "Google Drive",
          url: "https://drive.google.com",
          favicon: "https://drive.google.com/favicon.ico",
        },
      ],
    },
  ]

  return categories
}

