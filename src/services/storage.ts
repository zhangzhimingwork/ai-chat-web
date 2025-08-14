import { Conversation, UserPreferences } from '../types';
import { STORAGE_KEYS, DEFAULT_CONFIG } from '../utils/constants';

class StorageService {
  // 对话存储
  saveConversations(conversations: Conversation[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversations:', error);
      throw new Error('保存对话失败');
    }
  }

  getConversations(): Conversation[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load conversations:', error);
      return [];
    }
  }

  saveCurrentConversationId(id: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CONVERSATION, id);
    } catch (error) {
      console.error('Failed to save current conversation ID:', error);
    }
  }

  getCurrentConversationId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_CONVERSATION);
    } catch (error) {
      console.error('Failed to get current conversation ID:', error);
      return null;
    }
  }

  // 用户偏好设置
  saveUserPreferences(preferences: Partial<UserPreferences>): void {
    try {
      const current = this.getUserPreferences();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
      throw new Error('保存设置失败');
    }
  }

  getUserPreferences(): UserPreferences {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      const saved = data ? JSON.parse(data) : {};
      return { ...DEFAULT_CONFIG, ...saved };
    } catch (error) {
      console.error('Failed to load user preferences:', error);
      return DEFAULT_CONFIG;
    }
  }

  // 主题设置
  saveTheme(theme: 'light' | 'dark'): void {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }

  getTheme(): 'light' | 'dark' {
    try {
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return (theme as 'light' | 'dark') || DEFAULT_CONFIG.theme;
    } catch (error) {
      console.error('Failed to load theme:', error);
      return DEFAULT_CONFIG.theme;
    }
  }

  // 数据导出
  exportData(): string {
    try {
      const data = {
        conversations: this.getConversations(),
        preferences: this.getUserPreferences(),
        theme: this.getTheme(),
        exportDate: new Date().toISOString()
      };
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Failed to export data:', error);
      throw new Error('导出数据失败');
    }
  }

  // 数据导入
  importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.conversations) {
        this.saveConversations(data.conversations);
      }
      
      if (data.preferences) {
        this.saveUserPreferences(data.preferences);
      }
      
      if (data.theme) {
        this.saveTheme(data.theme);
      }
    } catch (error) {
      console.error('Failed to import data:', error);
      throw new Error('导入数据失败，请检查文件格式');
    }
  }

  // 清空所有数据
  clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear data:', error);
      throw new Error('清空数据失败');
    }
  }
}

export const storageService = new StorageService();