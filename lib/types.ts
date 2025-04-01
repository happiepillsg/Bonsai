export interface BookmarkItem {
  id: string
  title: string
  url: string
  favicon?: string
  dateAdded?: number
}

export interface BookmarkCategory {
  id: string
  title: string
  items: BookmarkItem[]
}

