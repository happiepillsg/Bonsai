import { useState, useEffect } from "react";
import { SearchInput } from "./search-input";
import { BookmarkCard } from "./bookmark-card";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export function BookmarksPanel() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await chrome.runtime.sendMessage({ action: "getBookmarks" });
        if (response.success) {
          const processedBookmarks = processBookmarks(response.bookmarks);
          setBookmarks(processedBookmarks);
          setFilteredBookmarks(processedBookmarks);
        }
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredBookmarks(bookmarks);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(lowerCaseQuery) ||
        bookmark.url.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBookmarks(filtered);
  };

  const processBookmarks = (bookmarkTree: any[]): Bookmark[] => {
    const processed: Bookmark[] = [];
    
    const processNode = (node: any) => {
      if (node.url) {
        processed.push({
          id: node.id,
          title: node.title,
          url: node.url,
        });
      }
      
      if (node.children) {
        node.children.forEach(processNode);
      }
    };
    
    bookmarkTree.forEach(processNode);
    return processed;
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Bookmarks</h2>
        <SearchInput onSearch={handleSearch} placeholder="Search bookmarks..." />
      </header>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading bookmarks...</div>
        ) : filteredBookmarks.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No bookmarks found
          </div>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))
        )}
      </div>
    </div>
  );
} 