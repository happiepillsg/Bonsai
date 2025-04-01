import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateUrl(url: string, maxLength = 30): string {
  if (!url) return ""

  // Remove protocol
  let shortened = url.replace(/^(https?:\/\/)?(www\.)?/i, "")

  // Remove trailing slash
  shortened = shortened.replace(/\/+$/, "")

  if (shortened.length <= maxLength) {
    return shortened
  }

  // Truncate and add ellipsis
  return shortened.substring(0, maxLength) + "..."
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function getFaviconUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)
    return `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=64`
  } catch (error) {
    return "/placeholder.svg?height=32&width=32"
  }
}

