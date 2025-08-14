import { useEffect, useRef, useCallback } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

interface WindowControlsProps {
  onClose?: () => void;
}

function WindowControls({ onClose }: WindowControlsProps) {
  const dragAreaRef = useRef<HTMLDivElement>(null);

  // 启动时设置窗口为置顶
  useEffect(() => {
    const setAlwaysOnTop = async () => {
      try {
        const appWindow = getCurrentWindow();
        await appWindow.setAlwaysOnTop(true);
      } catch (error) {
        console.error('Failed to set window always on top:', error);
      }
    };
    
    setAlwaysOnTop();
  }, []);

  // 处理拖动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 确保不是点击关闭按钮
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
      e.preventDefault();
      try {
        const appWindow = getCurrentWindow();
        appWindow.startDragging().catch(error => {
          console.error('Failed to start dragging:', error);
        });
      } catch (error) {
        console.error('Error in handleMouseDown:', error);
      }
    }
  }, []);

  // 处理关闭
  const handleClose = useCallback(async () => {
    if (onClose) {
      onClose();
    } else {
      try {
        const appWindow = getCurrentWindow();
        await appWindow.close();
      } catch (error) {
        console.error('Failed to close window:', error);
      }
    }
  }, [onClose]);
  
  return (
    <div 
      ref={dragAreaRef}
      className="window-controls"
      onMouseDown={handleMouseDown}
    >
      <button 
        onClick={handleClose}
        className="window-control-button"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default WindowControls;