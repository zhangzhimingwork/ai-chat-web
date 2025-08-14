import { useEffect, useState } from 'react';
import { Theme, UseThemeReturn } from '../types';
import { STORAGE_KEYS } from '../utils/constants';

export const useTheme = (): UseThemeReturn => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      // 如果没有保存的主题，使用系统偏好
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setThemeState(systemTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // 应用主题到document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // 保存到localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    mounted,
    setTheme,
    toggleTheme
  };
};