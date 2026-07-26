import { useCallback, useEffect, useRef, useState } from 'react';
import { usePersistentState } from '../store';

// 主题模式持久化在 Store 里:默认跟随系统,手动切换后固定为 light/dark。
// 生效方式:把解析好的 data-theme 写在根元素上(CSS 不用 color-scheme,
// 否则 WebKitGTK 画不透明画布毁掉窗口透明,见 index.css 注释)。
export function useTheme() {
  const [theme, setTheme] = usePersistentState('theme', 'system');
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  const appliedOnce = useRef(false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    // 首次应用不需要;之后每次切换强制 #root 整层重绘:
    // WebKitGTK 共享内存渲染在整面换色时会残留旧主题的像素(上半区尤甚)
    if (!appliedOnce.current) {
      appliedOnce.current = true;
      return;
    }
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.display = 'none';
      void rootElement.offsetHeight;
      rootElement.style.display = '';
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme]);

  return { isDark, toggleTheme };
}
