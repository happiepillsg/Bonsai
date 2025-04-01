// Bookmarks API module for Bonsai Dashboard

export class BookmarksAPI {
  static async getBookmarks() {
    try {
      const bookmarks = await chrome.bookmarks.getTree();
      return this.processBookmarks(bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      throw error;
    }
  }

  static async addBookmark(bookmark) {
    try {
      const newBookmark = await chrome.bookmarks.create({
        parentId: bookmark.parentId || '1',
        title: bookmark.title,
        url: bookmark.url,
        index: bookmark.index
      });
      return newBookmark;
    } catch (error) {
      console.error('Error adding bookmark:', error);
      throw error;
    }
  }

  static async updateBookmark(id, changes) {
    try {
      const updatedBookmark = await chrome.bookmarks.update(id, changes);
      return updatedBookmark;
    } catch (error) {
      console.error('Error updating bookmark:', error);
      throw error;
    }
  }

  static async removeBookmark(id) {
    try {
      await chrome.bookmarks.removeTree(id);
    } catch (error) {
      console.error('Error removing bookmark:', error);
      throw error;
    }
  }

  static async searchBookmarks(query) {
    try {
      const results = await chrome.bookmarks.search({
        query: query,
        maxResults: 100
      });
      return results;
    } catch (error) {
      console.error('Error searching bookmarks:', error);
      throw error;
    }
  }

  static processBookmarks(bookmarks) {
    return bookmarks.map(bookmark => ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      children: bookmark.children ? this.processBookmarks(bookmark.children) : [],
      parentId: bookmark.parentId,
      index: bookmark.index,
      dateAdded: bookmark.dateAdded,
      dateGroupModified: bookmark.dateGroupModified
    }));
  }
} 