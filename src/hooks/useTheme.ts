import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, DEFAULT_CONFIG } from '../utils/constants';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeStorage] = useLocalStorage<Theme>(
    STORAGE_KEYS.THEME, 
    DEFAULT_CONFIG.THEME
  );
  
  const [mounted, setMounted] = useState(false);

  // 防止hydration错误
  useEffect(() => {
    setMounted(true);
  }, []);

  // 设置主题
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeStorage(newTheme);
    
    // 更新document的class
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    }
  }, [setThemeStorage]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  // 初始化主题
  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme, mounted]);

  return {
    theme,
    setTheme,
    toggleTheme,
    mounted
  };
}