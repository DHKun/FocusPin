import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';

export function useWindowPin() {
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 初始化时获取当前Pin状态
  useEffect(() => {
    const initPinState = async () => {
      try {
        // Tauri窗口默认不置顶，所以初始状态为false
        setIsPinned(false);
      } catch (error) {
        console.error('Failed to get initial pin state:', error);
      }
    };
    
    initPinState();
  }, []);

  const togglePin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const newPinState = !isPinned;
      
      // 调用Tauri API设置窗口置顶状态
      await invoke('set_always_on_top', { alwaysOnTop: newPinState });
      
      setIsPinned(newPinState);
      
      // 保存状态到localStorage
      localStorage.setItem('focuspin-pinned', JSON.stringify(newPinState));
    } catch (error) {
      console.error('Failed to toggle pin state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 恢复Pin状态（应用启动时）
  const restorePinState = async () => {
    try {
      const savedState = localStorage.getItem('focuspin-pinned');
      if (savedState) {
        const pinState = JSON.parse(savedState);
        await invoke('set_always_on_top', { alwaysOnTop: pinState });
        setIsPinned(pinState);
      }
    } catch (error) {
      console.error('Failed to restore pin state:', error);
    }
  };

  return {
    isPinned,
    isLoading,
    togglePin,
    restorePinState
  };
}