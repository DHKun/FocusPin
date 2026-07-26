import { useEffect, useRef, useState } from 'react';
import { getAppStore } from './appStore';
import type { StoreKey, StoreSchema } from './schema';

// 挂在 Store 上的 React 状态。加载完成(ready)之前不回写,
// 避免用初始值覆盖已存数据。
export function usePersistentState<K extends StoreKey>(key: K, initial: StoreSchema[K]) {
  const [value, setValue] = useState<StoreSchema[K]>(initial);
  const [ready, setReady] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    let cancelled = false;
    getAppStore()
      .then((store) => store.load(key, initialRef.current))
      .then((loaded) => {
        if (!cancelled) {
          setValue(loaded);
          setReady(true);
        }
      })
      .catch((error) => {
        console.error(`Failed to load "${key}" from store:`, error);
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    getAppStore()
      .then((store) => store.save(key, value))
      .catch((error) => console.error(`Failed to save "${key}" to store:`, error));
  }, [key, value, ready]);

  return [value, setValue, ready] as const;
}
