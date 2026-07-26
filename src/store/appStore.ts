import { createTauriStore, createWebStorageStore } from './adapters';
import { migrateLegacyLocalStorage } from './migrate';
import type { Store } from './store';

export function isTauri(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

let instance: Promise<Store> | null = null;

// 应用唯一的 Store 实例。首次获取时选择适配器并完成旧数据迁移,
// 调用方不感知迁移的存在。
export function getAppStore(): Promise<Store> {
  if (instance === null) {
    instance = (async () => {
      const store = isTauri() ? createTauriStore() : createWebStorageStore(window.localStorage);
      await migrateLegacyLocalStorage(store, window.localStorage);
      return store;
    })();
  }
  return instance;
}
