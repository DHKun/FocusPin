import { useRef, useCallback } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useWindowPin } from '../hooks/useWindowPin';

interface WindowControlsProps {
  onClose?: () => void;
}

function WindowControls({ onClose }: WindowControlsProps) {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const { isPinned, isLoading, togglePin } = useWindowPin();

  // 处理拖动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 确保不是点击按钮
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

  // 处理Pin按钮点击
  const handlePinClick = useCallback(async () => {
    await togglePin();
  }, [togglePin]);
  
  return (
    <div 
      ref={dragAreaRef}
      className="window-controls"
      onMouseDown={handleMouseDown}
    >
      <button 
        onClick={handlePinClick}
        className="window-control-button pin-button"
        aria-label={isPinned ? "Unpin from desktop" : "Pin to desktop"}
        disabled={isLoading}
        style={{
          fontSize: '16px',
          opacity: isLoading ? 0.6 : 1,
          marginRight: '8px'
        }}
      >
        {isPinned ? '📌' : '📍'}
      </button>
      <button 
        onClick={handleClose}
        className="window-control-button close-button"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default WindowControls;