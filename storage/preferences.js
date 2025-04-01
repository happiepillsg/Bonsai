// Preferences storage module for Bonsai Dashboard

export class PreferencesStorage {
  static async getPreferences() {
    try {
      const result = await chrome.storage.sync.get('bonsai_preferences');
      return result.bonsai_preferences || this.getDefaultPreferences();
    } catch (error) {
      console.error('Error getting preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  static async updatePreferences(preferences) {
    try {
      await chrome.storage.sync.set({
        bonsai_preferences: {
          ...this.getDefaultPreferences(),
          ...preferences
        }
      });
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }

  static async getTheme() {
    try {
      const preferences = await this.getPreferences();
      return preferences.theme;
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'system';
    }
  }

  static async setTheme(theme) {
    try {
      await this.updatePreferences({ theme });
    } catch (error) {
      console.error('Error setting theme:', error);
      throw error;
    }
  }

  static async getWidgetPreferences() {
    try {
      const preferences = await this.getPreferences();
      return preferences.widgets;
    } catch (error) {
      console.error('Error getting widget preferences:', error);
      return this.getDefaultWidgetPreferences();
    }
  }

  static async updateWidgetPreferences(widgets) {
    try {
      await this.updatePreferences({ widgets });
    } catch (error) {
      console.error('Error updating widget preferences:', error);
      throw error;
    }
  }

  static getDefaultPreferences() {
    return {
      theme: 'system',
      compactMode: false,
      showFavicons: true,
      widgets: this.getDefaultWidgetPreferences(),
      refreshInterval: 5, // minutes
      defaultCurrency: 'USD',
      language: 'en',
      notifications: {
        enabled: true,
        priceAlerts: true,
        walletUpdates: true
      }
    };
  }

  static getDefaultWidgetPreferences() {
    return {
      bookmarks: {
        enabled: true,
        layout: 'grid',
        showFavicons: true
      },
      marketData: {
        enabled: true,
        defaultCoins: ['bitcoin', 'ethereum', 'binancecoin'],
        showCharts: true
      },
      wallet: {
        enabled: true,
        showBalance: true,
        showGasPrice: true
      },
      developerTools: {
        enabled: true,
        showGitHub: true,
        showSnippets: true
      },
      defi: {
        enabled: true,
        showPositions: true,
        showYields: true
      }
    };
  }
} 