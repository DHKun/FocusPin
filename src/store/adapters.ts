import { LazyStore } from '@tauri-apps/plugin-store';
import type { StoreKey, StoreSchema } from './schema';
import type { Store } from './store';

// 生产适配器:tauri-plugin-store,数据落盘为应用数据目录下的真实文件,
// 不再依赖 webview 的 localStorage。
export function createTauriStore(filename = 'focuspin.json'): Store {
  const file = new LazyStore(filename);
  return {
    async load<K extends StoreKey>(key: K, fallback: StoreSchema[K]): Promise<StoreSchema[K]> {
      const value = await file.get<StoreSchema[K]>(key);
      return value === undefined || value === null ? fallback : value;
    },
    async save<K extends StoreKey>(key: K, value: StoreSchema[K]): Promise<void> {
      await file.set(key, value);
      await file.save();
    },
    async has(key: StoreKey): Promise<boolean> {
      return file.has(key);
    },
  };
}

export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>;

// 浏览器适配器:脱离 Tauri 直接 `npm run dev` 时的降级。
export function createWebStorageStore(storage: StorageLike, prefix = 'focuspin-store-'): Store {
  return {
    async load<K extends StoreKey>(key: K, fallback: StoreSchema[K]): Promise<StoreSchema[K]> {
      const raw = storage.getItem(prefix + key);
      if (raw === null) return fallback;
      try {
        return JSON.parse(raw) as StoreSchema[K];
      } catch {
        return fallback;
      }
    },
    async save<K extends StoreKey>(key: K, value: StoreSchema[K]): Promise<void> {
      storage.setItem(prefix + key, JSON.stringify(value));
    },
    async has(key: StoreKey): Promise<boolean> {
      return storage.getItem(prefix + key) !== null;
    },
  };
}

// 内存假实现:测试用。
export function createMemoryStore(initial?: Partial<StoreSchema>): Store {
  const data = new Map<string, unknown>(initial ? Object.entries(initial) : []);
  return {
    async load<K extends StoreKey>(key: K, fallback: StoreSchema[K]): Promise<StoreSchema[K]> {
      return data.has(key) ? (data.get(key) as StoreSchema[K]) : fallback;
    },
    async save<K extends StoreKey>(key: K, value: StoreSchema[K]): Promise<void> {
      data.set(key, value);
    },
    async has(key: StoreKey): Promise<boolean> {
      return data.has(key);
    },
  };
}
