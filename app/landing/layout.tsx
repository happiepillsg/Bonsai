import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bonsai Dashboard - Transform Your Browser Experience",
  description:
    "A Chrome extension that transforms your new tab into a powerful command center for developers and professionals.",
}

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen">{children}</div>
}

