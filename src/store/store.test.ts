import { describe, expect, it } from 'vitest';
import { createMemoryStore, createWebStorageStore, type StorageLike } from './adapters';
import { migrateLegacyLocalStorage } from './migrate';
import type { Store } from './store';
import type { Item } from './schema';

function fakeStorage(initial: Record<string, string> = {}): StorageLike {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key) => (data.has(key) ? data.get(key)! : null),
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
}

const sampleTodos: Item[] = [
  { id: '1', text: 'write tests', completed: false, createdAt: '2026-07-26T08:00:00.000Z' },
];

const adapters: [string, () => Store][] = [
  ['memory', () => createMemoryStore()],
  ['webStorage', () => createWebStorageStore(fakeStorage())],
];

describe.each(adapters)('Store 契约: %s 适配器', (_name, makeStore) => {
  it('缺键时返回 fallback', async () => {
    const store = makeStore();
    expect(await store.load('todos', [])).toEqual([]);
    expect(await store.load('pinned', true)).toBe(true);
  });

  it('save 后 load 原样返回', async () => {
    const store = makeStore();
    await store.save('todos', sampleTodos);
    await store.save('pinned', true);
    expect(await store.load('todos', [])).toEqual(sampleTodos);
    expect(await store.load('pinned', false)).toBe(true);
  });

  it('has 反映键是否存在', async () => {
    const store = makeStore();
    expect(await store.has('inspirations')).toBe(false);
    await store.save('inspirations', []);
    expect(await store.has('inspirations')).toBe(true);
  });
});

describe('migrateLegacyLocalStorage', () => {
  it('把合法的旧数据搬进 Store', async () => {
    const legacy = fakeStorage({
      'focuspin-todos': JSON.stringify([
        { id: '1', text: 'old task', completed: true, createdAt: '2025-01-01T00:00:00.000Z' },
      ]),
      'focuspin-inspirations': JSON.stringify([
        { id: '2', text: 'old idea', createdAt: '2025-01-02T00:00:00.000Z' },
      ]),
      'focuspin-pinned': 'true',
    });
    const store = createMemoryStore();

    await migrateLegacyLocalStorage(store, legacy);

    expect(await store.load('todos', [])).toEqual([
      { id: '1', text: 'old task', completed: true, createdAt: '2025-01-01T00:00:00.000Z' },
    ]);
    expect(await store.load('inspirations', [])).toEqual([
      { id: '2', text: 'old idea', createdAt: '2025-01-02T00:00:00.000Z' },
    ]);
    expect(await store.load('pinned', false)).toBe(true);
  });

  it('Store 已有数据时不覆盖', async () => {
    const legacy = fakeStorage({
      'focuspin-todos': JSON.stringify([
        { id: 'legacy', text: 'stale', completed: false, createdAt: '2025-01-01T00:00:00.000Z' },
      ]),
    });
    const store = createMemoryStore({ todos: sampleTodos });

    await migrateLegacyLocalStorage(store, legacy);

    expect(await store.load('todos', [])).toEqual(sampleTodos);
  });

  it('丢弃损坏的 JSON 与畸形条目', async () => {
    const legacy = fakeStorage({
      'focuspin-todos': '{not json',
      'focuspin-inspirations': JSON.stringify([
        { id: '3', text: 'valid', createdAt: '2025-01-03T00:00:00.000Z' },
        { id: 4, text: 'id 不是字符串' },
        'not an object',
        { id: '5' },
      ]),
      'focuspin-pinned': '"yes"',
    });
    const store = createMemoryStore();

    await migrateLegacyLocalStorage(store, legacy);

    expect(await store.has('todos')).toBe(false);
    expect(await store.load('inspirations', [])).toEqual([
      { id: '3', text: 'valid', createdAt: '2025-01-03T00:00:00.000Z' },
    ]);
    expect(await store.has('pinned')).toBe(false);
  });

  it('缺失 createdAt 时补纪元起点而不是当前时间', async () => {
    const legacy = fakeStorage({
      'focuspin-inspirations': JSON.stringify([{ id: '6', text: 'no date' }]),
    });
    const store = createMemoryStore();

    await migrateLegacyLocalStorage(store, legacy);

    expect(await store.load('inspirations', [])).toEqual([
      { id: '6', text: 'no date', createdAt: '1970-01-01T00:00:00.000Z' },
    ]);
  });
});
