import type { StoreKey, StoreSchema } from './schema';

// 持久化的接缝:调用方只依赖这个接口,不接触具体存储。
export interface Store {
  load<K extends StoreKey>(key: K, fallback: StoreSchema[K]): Promise<StoreSchema[K]>;
  save<K extends StoreKey>(key: K, value: StoreSchema[K]): Promise<void>;
  has(key: StoreKey): Promise<boolean>;
}
