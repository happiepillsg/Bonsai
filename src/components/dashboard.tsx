import { useEffect, useState } from 'react';
import { Search, Folder, Edit2, Check, X, Plus } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface BookmarkNode {
  id: string;
  title: string;
  url?: string;
  children?: BookmarkNode[];
  dateAdded?: number;
  parentId?: string;
  index?: number;
}

interface Category {
  id: string;
  title: string;
  bookmarks: BookmarkNode[];
  isEditing?: boolean;
}

function getFaviconUrl(url: string) {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
  } catch {
    return '';
  }
}

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [tempCategoryTitle, setTempCategoryTitle] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = () => {
    chrome.bookmarks.getTree((tree) => {
      if (!tree || tree.length === 0) {
        setError('No bookmarks found');
        setLoading(false);
        return;
      }

      const root = tree[0];
      const allCategories: Category[] = [];

      root.children?.forEach((folder) => {
        if (folder.children && folder.children.length > 0) {
          const bookmarks = folder.children.filter(child => child.url || (child.children && child.children.length > 0));
          
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
      setLoading(false);
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      chrome.bookmarks.search(query, (results) => {
        if (results.length === 0) {
          setCategories([]);
          return;
        }

        const bookmarks = results.filter(result => result.url);
        
        setCategories([{
          id: 'search-results',
          title: 'Search Results',
          bookmarks
        }]);
      });
    } else {
      loadBookmarks();
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    // Make a copy of categories
    const newCategories = [...categories];

    // Find source and destination category indices
    const sourceCategoryIndex = newCategories.findIndex(cat => cat.id === sourceDroppableId);
    const destCategoryIndex = newCategories.findIndex(cat => cat.id === destDroppableId);

    if (sourceCategoryIndex === -1 || destCategoryIndex === -1) return;

    // Get the bookmark being dragged
    const [movedBookmark] = newCategories[sourceCategoryIndex].bookmarks.splice(source.index, 1);

    // Insert the bookmark at the new position
    newCategories[destCategoryIndex].bookmarks.splice(destination.index, 0, movedBookmark);

    // Update Chrome bookmarks
    chrome.bookmarks.move(movedBookmark.id, {
      parentId: destDroppableId,
      index: destination.index
    });

    setCategories(newCategories);
  };

  const startEditingCategory = (categoryId: string, currentTitle: string) => {
    setEditingCategory(categoryId);
    setTempCategoryTitle(currentTitle);
  };

  const saveEditedCategory = (categoryId: string) => {
    if (!tempCategoryTitle.trim()) return;

    chrome.bookmarks.update(categoryId, { title: tempCategoryTitle }, () => {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, title: tempCategoryTitle }
          : cat
      ));
      setEditingCategory(null);
    });
  };

  const cancelEditingCategory = () => {
    setEditingCategory(null);
    setTempCategoryTitle('');
  };

  const handleAddCategory = () => {
    setIsAddingCategory(true);
    setNewCategoryTitle('');
  };

  const saveNewCategory = () => {
    if (!newCategoryTitle.trim()) {
      setIsAddingCategory(false);
      return;
    }

    // Get the Bookmarks Bar folder first
    chrome.bookmarks.getTree((tree) => {
      if (!tree || !tree[0].children) {
        setError('Could not access bookmarks');
        return;
      }

      // Find the Bookmarks Bar folder (usually the first child)
      const bookmarksBar = tree[0].children.find(child => child.title === 'Bookmarks bar');
      
      if (!bookmarksBar) {
        setError('Could not find Bookmarks bar');
        return;
      }

      // Create the new folder in the Bookmarks Bar
      chrome.bookmarks.create({
        title: newCategoryTitle,
        parentId: bookmarksBar.id
      }, (newFolder) => {
        if (chrome.runtime.lastError) {
          setError('Failed to create category: ' + chrome.runtime.lastError.message);
          return;
        }

        setCategories([...categories, {
          id: newFolder.id,
          title: newFolder.title,
          bookmarks: []
        }]);
        setIsAddingCategory(false);
        setNewCategoryTitle('');
        setError(null);
      });
    });
  };

  const cancelAddCategory = () => {
    setIsAddingCategory(false);
    setNewCategoryTitle('');
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/icons/icon.svg" alt="Bonsai" className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Bookmarks</h1>
            </div>
            <button
              onClick={handleAddCategory}
              className="flex items-center gap-2 px-3 py-2 bg-[#238636] hover:bg-[#2ea043] rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Category
            </button>
          </div>
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="space-y-8">
              {isAddingCategory && (
                <div className="mb-8 p-4 bg-[#161B22] rounded-lg border border-[#30363D]">
                  <div className="flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      placeholder="Enter category name..."
                      className="bg-[#0D1117] border border-[#30363D] rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={saveNewCategory}
                      className="p-1 hover:bg-[#1F2937] rounded-full"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                    </button>
                    <button
                      onClick={cancelAddCategory}
                      className="p-1 hover:bg-[#1F2937] rounded-full"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
              
              {categories.map((category) => (
                <div key={category.id} className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Folder className="w-5 h-5" />
                    {editingCategory === category.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempCategoryTitle}
                          onChange={(e) => setTempCategoryTitle(e.target.value)}
                          className="bg-[#161B22] border border-[#30363D] rounded px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEditedCategory(category.id)}
                          className="p-1 hover:bg-[#1F2937] rounded-full"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </button>
                        <button
                          onClick={cancelEditingCategory}
                          className="p-1 hover:bg-[#1F2937] rounded-full"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{category.title}</h2>
                        <button
                          onClick={() => startEditingCategory(category.id, category.title)}
                          className="p-1 hover:bg-[#1F2937] rounded-full"
                        >
                          <Edit2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <Droppable droppableId={category.id} direction="horizontal">
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                      >
                        {category.bookmarks.map((bookmark, index) => (
                          bookmark.url ? (
                            <Draggable key={bookmark.id} draggableId={bookmark.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <a
                                    href={bookmark.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 bg-[#161B22] rounded-lg hover:bg-[#1F2937] transition-colors text-center group"
                                  >
                                    <img 
                                      src={bookmark.url ? getFaviconUrl(bookmark.url) : ''}
                                      alt=""
                                      className="w-8 h-8 mb-2"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                      }}
                                    />
                                    <div className="text-sm font-medium truncate w-full">
                                      {bookmark.title || (bookmark.url ? new URL(bookmark.url).hostname : 'Unknown')}
                                    </div>
                                  </a>
                                </div>
                              )}
                            </Draggable>
                          ) : null
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        )}
      </div>
    </div>
  );
} 