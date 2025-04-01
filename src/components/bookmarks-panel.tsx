import { useEffect, useState } from 'react';
import { Bookmark, Star, Search, Trash2 } from 'lucide-react';

interface BookmarkItem {
  id: string;
  title: string;
  url?: string;
  dateAdded?: number;
  parentId?: string;
  index?: number;
  dateGroupModified?: number;
  children?: BookmarkItem[];
}

export function BookmarksPanel() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load bookmarks when component mounts
    chrome.bookmarks.getRecent(20, (recent) => {
      setBookmarks(recent);
      setLoading(false);
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      chrome.bookmarks.search(query, (results) => {
        setBookmarks(results);
      });
    } else {
      // If search is cleared, show recent bookmarks again
      chrome.bookmarks.getRecent(20, (recent) => {
        setBookmarks(recent);
      });
    }
  };

  const handleDelete = (id: string) => {
    chrome.bookmarks.remove(id, () => {
      setBookmarks(bookmarks.filter(b => b.id !== id));
    });
  };

  return (
    <div className="p-4 min-w-[400px] max-h-[600px] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bookmark className="w-6 h-6" />
          Bookmarks
        </h2>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="space-y-2">
          {bookmarks.map((bookmark) => (
            bookmark.url ? (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <Star className="w-4 h-4 flex-shrink-0 text-yellow-500" />
                  <div className="truncate">
                    <div className="font-medium truncate">{bookmark.title || bookmark.url}</div>
                    <div className="text-sm text-gray-500 truncate">{bookmark.url}</div>
                  </div>
                </a>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                  title="Delete bookmark"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
} 