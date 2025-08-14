import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

function ThemeToggle({ onThemeChange }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('focuspin-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark') => {
    const transparency = localStorage.getItem('focuspin-transparency') || '0.25';
    const lightBg = `rgba(255, 255, 255, ${transparency})`;
    const darkBg = `rgba(30, 30, 30, ${transparency})`;
    
    if (selectedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.setProperty('--background-color', darkBg);
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.style.setProperty('--background-color', lightBg);
    }
    
    // 保存到本地存储
    localStorage.setItem('focuspin-theme', selectedTheme);
    
    // 调用回调函数
    if (onThemeChange) {
      onThemeChange(selectedTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme}
      style={{
        position: 'absolute',
        top: '5px',
        right: '40px',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color, black)',
        cursor: 'pointer',
        fontSize: '16px',
        zIndex: 1001,
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeToggle;