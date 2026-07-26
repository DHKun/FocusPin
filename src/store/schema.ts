// 持久化数据的 schema。createdAt 一律存 ISO 8601 字符串,
// 保证 JSON 直接往返,不需要在各调用方做日期还原。

// 条目:待办与灵感的统称。completed 仅待办条目存在。
export interface Item {
  id: string;
  text: string;
  createdAt: string;
  completed?: boolean;
}

// 主题模式:默认跟随系统,手动切换后固定
export type ThemeMode = 'system' | 'light' | 'dark';

export interface StoreSchema {
  todos: Item[];
  inspirations: Item[];
  pinned: boolean;
  theme: ThemeMode;
}

export type StoreKey = keyof StoreSchema;

// 存放条目列表的键
export type ItemKey = 'todos' | 'inspirations';
