import { useCallback } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useWindowPin } from '../hooks/useWindowPin';
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, PinIcon, SunIcon, XIcon } from './icons';

interface WindowControlsProps {
  onClose?: () => void;
}

function WindowControls({ onClose }: WindowControlsProps) {
  const { isPinned, togglePin, pinSupported } = useWindowPin();
  const { isDark, toggleTheme } = useTheme();

  // 处理拖动
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') === null) {
      e.preventDefault();
      try {
        const appWindow = getCurrentWindow();
        appWindow.startDragging().catch((error) => {
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
    <div className="window-controls" onMouseDown={handleMouseDown}>
      <button
        onClick={toggleTheme}
        className="window-control-button theme-button"
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
        title={isDark ? 'Light theme' : 'Dark theme'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
      <button
        onClick={togglePin}
        className={`window-control-button pin-button${isPinned ? ' pinned' : ''}`}
        aria-label={isPinned ? 'Unpin from desktop' : 'Pin to desktop'}
        aria-pressed={isPinned}
        title={
          pinSupported
            ? isPinned
              ? 'Unpin'
              : 'Pin on top'
            : 'Always-on-top is ignored by Wayland; use a KWin window rule instead (see README)'
        }
      >
        <PinIcon />
      </button>
      <button
        onClick={handleClose}
        className="window-control-button close-button"
        aria-label="Close"
        title="Close"
      >
        <XIcon />
      </button>
    </div>
  );
}

export default WindowControls;
