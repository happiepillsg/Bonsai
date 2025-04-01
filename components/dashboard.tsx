import { useState } from "react";
import { MarketDataPanel } from "./market-data-panel";
import { WalletPanel } from "./wallet-panel";
import { DeveloperToolsPanel } from "./developer-tools-panel";
import { SettingsPanel } from "./settings-panel";
import { LayoutGrid, Wallet, Code, Settings } from "lucide-react";

type Panel = "market" | "wallet" | "dev" | "settings";

export function Dashboard() {
  const [activePanel, setActivePanel] = useState<Panel>("market");

  const panels = [
    {
      id: "market" as Panel,
      title: "Market Data",
      icon: LayoutGrid,
      component: MarketDataPanel,
    },
    {
      id: "wallet" as Panel,
      title: "Wallet",
      icon: Wallet,
      component: WalletPanel,
    },
    {
      id: "dev" as Panel,
      title: "Developer Tools",
      icon: Code,
      component: DeveloperToolsPanel,
    },
    {
      id: "settings" as Panel,
      title: "Settings",
      icon: Settings,
      component: SettingsPanel,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-16 border-r bg-card flex flex-col items-center py-4">
        {panels.map((panel) => {
          const Icon = panel.icon;
          return (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                activePanel === panel.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              title={panel.title}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {panels.map((panel) => {
          const Component = panel.component;
          return (
            <div
              key={panel.id}
              className={`${activePanel === panel.id ? "block" : "hidden"}`}
            >
              <Component />
            </div>
          );
        })}
      </main>
    </div>
  );
} 