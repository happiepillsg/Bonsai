"use client"

import { useState } from "react"
import type { BookmarkItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"

interface BookmarkCardProps {
  bookmark: BookmarkItem
  className?: string
}

export function BookmarkCard({ bookmark, className }: BookmarkCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleClick = () => {
    window.open(bookmark.url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors w-full text-left",
        className
      )}
    >
      {bookmark.favicon ? (
        <img
          src={bookmark.favicon}
          alt=""
          className="w-5 h-5"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
          }}
        />
      ) : (
        <div className="w-5 h-5 bg-muted rounded" />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{bookmark.title}</h3>
        <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
    </button>
  )
}

