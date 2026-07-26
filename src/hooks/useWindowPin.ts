import { useCallback, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { isTauri, usePersistentState } from '../store';

// Pin 状态持久化在 Store 里,窗口同步走 WindowChrome 的 set_pinned 命令。
// pinSupported=false 表示当前会话(Wayland)下置顶不生效,按钮据此提示。
export function useWindowPin() {
  const [isPinned, setIsPinned, ready] = usePersistentState('pinned', false);
  const [pinSupported, setPinSupported] = useState(true);

  useEffect(() => {
    if (!isTauri()) {
      setPinSupported(false);
      return;
    }
    invoke<boolean>('pin_supported')
      .then(setPinSupported)
      .catch(() => setPinSupported(true));
  }, []);

  useEffect(() => {
    if (!ready || !isTauri()) return;
    invoke('set_pinned', { pinned: isPinned }).catch((error) => {
      console.error('Failed to set pinned:', error);
    });
  }, [ready, isPinned]);

  const togglePin = useCallback(() => {
    setIsPinned((pinned) => !pinned);
  }, [setIsPinned]);

  return { isPinned, togglePin, pinSupported };
}
