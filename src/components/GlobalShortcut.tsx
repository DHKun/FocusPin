import { useEffect } from 'react';

interface GlobalShortcutProps {
  onToggleVisibility?: () => void;
}

function GlobalShortcut({ onToggleVisibility }: GlobalShortcutProps) {
  useEffect(() => {
    // 全局快捷键现在在Rust层实现，这里只需要处理回调
    
    // 监听窗口可见性变化
    let isVisible = true;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // 检查是否按下了Ctrl+Shift+F
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        isVisible = !isVisible;
        
        // 调用回调函数
        if (onToggleVisibility) {
          onToggleVisibility();
        }
      }
    };

    // 添加键盘事件监听器
    window.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleVisibility]);

  return null; // 这个组件不渲染任何UI
}

export default GlobalShortcut;