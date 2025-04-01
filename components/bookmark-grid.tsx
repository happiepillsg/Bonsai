"use client"
import type { BookmarkCategory } from "@/lib/types"
import { BookmarkCard } from "./bookmark-card"
import { Skeleton } from "@/components/ui/skeleton"

interface BookmarkGridProps {
  categories: BookmarkCategory[]
  isLoading: boolean
}

export function BookmarkGrid({ categories, isLoading }: BookmarkGridProps) {
  if (isLoading) {
    return <BookmarkGridSkeleton />
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
        <p className="text-muted-foreground">Add some bookmarks or adjust your search query.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <h2 className="text-lg font-medium">{category.title}</h2>
          <div className="flex flex-wrap gap-4">
            {category.items.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BookmarkGridSkeleton() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((category) => (
        <div key={category} className="space-y-4">
          <Skeleton className="h-7 w-48" />
          <div className="flex flex-wrap gap-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[100px] w-[120px]" />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

