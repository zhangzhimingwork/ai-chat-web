import { useState, useEffect, useCallback } from 'react';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  // 获取初始值
  const [storedValue, setStoredValue] = useState<T>(() => {
    return getLocalStorage(key, initialValue);
  });

  // 设置值
  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      setLocalStorage(key, value);
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  // 删除值
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      removeLocalStorage(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}