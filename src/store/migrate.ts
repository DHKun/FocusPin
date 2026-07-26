import type { Item } from './schema';
import type { StorageLike } from './adapters';
import type { Store } from './store';

// v2.0 及之前的数据存在 webview 的 localStorage 里,首次启动时搬进 Store。
// 幂等保护:Store 里已有该键就不再写入。旧数据保留不删。
const LEGACY_KEYS = {
  todos: 'focuspin-todos',
  inspirations: 'focuspin-inspirations',
  pinned: 'focuspin-pinned',
} as const;

export async function migrateLegacyLocalStorage(
  target: Store,
  legacy: Pick<StorageLike, 'getItem'>
): Promise<void> {
  const todos = readLegacyArray(legacy, LEGACY_KEYS.todos, normalizeTodo);
  if (todos !== null && !(await target.has('todos'))) {
    await target.save('todos', todos);
  }

  const inspirations = readLegacyArray(legacy, LEGACY_KEYS.inspirations, normalizeInspiration);
  if (inspirations !== null && !(await target.has('inspirations'))) {
    await target.save('inspirations', inspirations);
  }

  const rawPinned = legacy.getItem(LEGACY_KEYS.pinned);
  if (rawPinned !== null && !(await target.has('pinned'))) {
    const pinned = safeParse(rawPinned);
    if (typeof pinned === 'boolean') {
      await target.save('pinned', pinned);
    }
  }
}

function readLegacyArray<T>(
  legacy: Pick<StorageLike, 'getItem'>,
  key: string,
  normalize: (raw: unknown) => T | null
): T[] | null {
  const raw = legacy.getItem(key);
  if (raw === null) return null;
  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) return null;
  return parsed.map(normalize).filter((item): item is T => item !== null);
}

function normalizeTodo(raw: unknown): Item | null {
  const base = normalizeBase(raw);
  if (base === null) return null;
  const completed = (raw as Record<string, unknown>).completed;
  return { ...base, completed: completed === true };
}

function normalizeInspiration(raw: unknown): Item | null {
  return normalizeBase(raw);
}

function normalizeBase(raw: unknown): Item | null {
  if (typeof raw !== 'object' || raw === null) return null;
  const record = raw as Record<string, unknown>;
  if (typeof record.id !== 'string' || typeof record.text !== 'string') return null;
  return {
    id: record.id,
    text: record.text,
    // 旧数据的 createdAt 是 Date 序列化出的 ISO 字符串;缺失时给纪元起点,避免伪造成今天
    createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date(0).toISOString(),
  };
}

function safeParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}
