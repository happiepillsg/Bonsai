import { useEffect, useState } from 'react';
import { Search, Folder } from 'lucide-react';

interface BookmarkNode {
  id: string;
  title: string;
  url?: string;
  children?: BookmarkNode[];
  dateAdded?: number;
  parentId?: string;
}

interface Category {
  id: string;
  title: string;
  bookmarks: BookmarkNode[];
}

function getFaviconUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=32`;
  } catch {
    return '';
  }
}

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get all bookmarks
    chrome.bookmarks.getTree((tree) => {
      if (!tree || tree.length === 0) {
        setError('No bookmarks found');
        setLoading(false);
        return;
      }

      const root = tree[0];
      const allCategories: Category[] = [];

      // Process all children of root
      root.children?.forEach((folder) => {
        // Add the folder itself as a category if it has items
        if (folder.children && folder.children.length > 0) {
          // Filter out empty folders and sort bookmarks
          const bookmarks = folder.children.filter(child => child.url || (child.children && child.children.length > 0));
          
          if (bookmarks.length > 0) {
            allCategories.push({
              id: folder.id,
              title: folder.title || 'Bookmarks',
              bookmarks
            });
          }

          // Process subfolders
          folder.children.forEach((node) => {
            if (!node.url && node.children && node.children.length > 0) {
              const subBookmarks = node.children.filter(child => child.url);
              if (subBookmarks.length > 0) {
                allCategories.push({
                  id: node.id,
                  title: node.title,
                  bookmarks: subBookmarks
                });
              }
            }
          });
        }
      });

      setCategories(allCategories);
      setLoading(false);
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      chrome.bookmarks.search(query, (results) => {
        if (results.length === 0) {
          setCategories([]);
          return;
        }

        // Filter out folders from search results
        const bookmarks = results.filter(result => result.url);
        
        setCategories([{
          id: 'search-results',
          title: 'Search Results',
          bookmarks
        }]);
      });
    } else {
      // Reset to show all bookmarks
      chrome.bookmarks.getTree((tree) => {
        const root = tree[0];
        const allCategories: Category[] = [];

        root.children?.forEach((folder) => {
          if (folder.children && folder.children.length > 0) {
            const bookmarks = folder.children.filter(child => child.url);
            if (bookmarks.length > 0) {
              allCategories.push({
                id: folder.id,
                title: folder.title || 'Bookmarks',
                bookmarks
              });
            }

            folder.children.forEach((node) => {
              if (!node.url && node.children && node.children.length > 0) {
                const subBookmarks = node.children.filter(child => child.url);
                if (subBookmarks.length > 0) {
                  allCategories.push({
                    id: node.id,
                    title: node.title,
                    bookmarks: subBookmarks
                  });
                }
              }
            });
          }
        });

        setCategories(allCategories);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Bookmarks</h1>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              className="w-full pl-10 pr-4 py-2 bg-[#161B22] border border-[#30363D] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {searchQuery ? 'No bookmarks found for your search' : 'No bookmarks found'}
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category.id} className="mb-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Folder className="w-5 h-5" />
                  {category.title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {category.bookmarks.map((bookmark) => (
                    bookmark.url ? (
                      <a
                        key={bookmark.id}
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 bg-[#161B22] rounded-lg hover:bg-[#1F2937] transition-colors text-center group"
                      >
                        <img 
                          src={getFaviconUrl(bookmark.url)}
                          alt=""
                          className="w-8 h-8 mb-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <div className="text-sm font-medium truncate w-full">
                          {bookmark.title || new URL(bookmark.url).hostname}
                        </div>
                      </a>
                    ) : null
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 