"use client"
import { useState } from "react";
import { Bookmark, LineChart, Wallet, Code, Coins } from "lucide-react";

// import {
//   SidebarProvider,
//   Sidebar as ShadcnSidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarGroupContent,
//   SidebarTrigger,
// } from "@/components/ui/sidebar"

interface SidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

export function Sidebar({ activeSection = "bookmarks", onSectionChange }: SidebarProps) {
  const sections = [
    { id: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { id: "market", label: "Market Data", icon: LineChart },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "developer", label: "Developer Tools", icon: Code },
    { id: "defi", label: "DeFi", icon: Coins },
  ];

  return (
    <aside className="w-64 bg-card border-r">
      <div className="p-4">
        <h1 className="text-xl font-bold">Bonsai</h1>
      </div>
      <nav className="space-y-1 p-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange?.(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

