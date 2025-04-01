// Cache storage module for Bonsai Dashboard

export class CacheStorage {
  static async getCachedData(key) {
    try {
      const result = await chrome.storage.local.get(key);
      const data = result[key];
      
      if (!data) return null;
      
      // Check if cache is expired
      if (Date.now() - data.timestamp > data.ttl) {
        await this.removeCachedData(key);
        return null;
      }
      
      return data.value;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  static async setCachedData(key, value, ttl = 5 * 60 * 1000) {
    try {
      await chrome.storage.local.set({
        [key]: {
          value,
          timestamp: Date.now(),
          ttl
        }
      });
    } catch (error) {
      console.error('Error setting cached data:', error);
      throw error;
    }
  }

  static async removeCachedData(key) {
    try {
      await chrome.storage.local.remove(key);
    } catch (error) {
      console.error('Error removing cached data:', error);
      throw error;
    }
  }

  static async clearCache() {
    try {
      const data = await chrome.storage.local.get(null);
      const cacheKeys = Object.keys(data).filter(key => key.startsWith('cache_'));
      await chrome.storage.local.remove(cacheKeys);
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  static async getMarketDataCache() {
    return this.getCachedData('cache_market_data');
  }

  static async setMarketDataCache(data) {
    return this.setCachedData('cache_market_data', data, 5 * 60 * 1000); // 5 minutes
  }

  static async getBookmarksCache() {
    return this.getCachedData('cache_bookmarks');
  }

  static async setBookmarksCache(data) {
    return this.setCachedData('cache_bookmarks', data, 30 * 60 * 1000); // 30 minutes
  }

  static async getFaviconCache(url) {
    return this.getCachedData(`cache_favicon_${url}`);
  }

  static async setFaviconCache(url, data) {
    return this.setCachedData(`cache_favicon_${url}`, data, 24 * 60 * 60 * 1000); // 24 hours
  }

  static async getWalletDataCache(address) {
    return this.getCachedData(`cache_wallet_${address}`);
  }

  static async setWalletDataCache(address, data) {
    return this.setCachedData(`cache_wallet_${address}`, data, 1 * 60 * 1000); // 1 minute
  }
} 