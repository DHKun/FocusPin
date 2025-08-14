import React, { useState, useEffect } from 'react';

interface SettingsPanelProps {
  onSettingsChange?: (settings: {
    transparency: number;
    fontSize: number;
  }) => void;
}

function SettingsPanel({ onSettingsChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [transparency, setTransparency] = useState(0.25);
  const [fontSize, setFontSize] = useState(16);

  // 从本地存储加载设置
  useEffect(() => {
    const savedTransparency = localStorage.getItem('focuspin-transparency');
    const savedFontSize = localStorage.getItem('focuspin-fontSize');
    
    if (savedTransparency) {
      const transparencyValue = parseFloat(savedTransparency);
      setTransparency(transparencyValue);
    }
    
    if (savedFontSize) {
      const fontSizeValue = parseInt(savedFontSize, 10);
      setFontSize(fontSizeValue);
    }
  }, []);

  // 更新透明度
  const updateTransparency = (value: number) => {
    const lightBg = `rgba(255, 255, 255, ${value})`;
    const darkBg = `rgba(30, 30, 30, ${value})`;
    
    document.documentElement.style.setProperty('--background-color', 
      document.documentElement.getAttribute('data-theme') === 'dark' ? darkBg : lightBg);
    
    // 保存到本地存储
    localStorage.setItem('focuspin-transparency', value.toString());
    
    // 调用回调函数
    if (onSettingsChange) {
      onSettingsChange({ transparency: value, fontSize });
    }
  };

  // 更新字体大小
  const updateFontSize = (value: number) => {
    document.documentElement.style.setProperty('--font-size', `${value}px`);
    
    // 保存到本地存储
    localStorage.setItem('focuspin-fontSize', value.toString());
    
    // 调用回调函数
    if (onSettingsChange) {
      onSettingsChange({ transparency, fontSize: value });
    }
  };

  // 处理透明度变化
  const handleTransparencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setTransparency(value);
    updateTransparency(value);
  };

  // 处理字体大小变化
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
    updateFontSize(value);
  };

  return (
    <div style={{ 
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      zIndex: 1001,
    }}>
      {isOpen ? (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '10px',
          borderRadius: '8px',
          minWidth: '200px',
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '10px'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: 'var(--font-size, 16px)',
              color: 'var(--text-color)'
            }}>
              Settings
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              ×
            </button>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: 'var(--font-size, 16px)',
              color: 'var(--text-color)'
            }}>
              Transparency: {Math.round(transparency * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={transparency}
              onChange={handleTransparencyChange}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '5px',
              fontSize: 'var(--font-size, 16px)',
              color: 'var(--text-color)'
            }}>
              Font Size: {fontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="24"
              step="1"
              value={fontSize}
              onChange={handleFontSizeChange}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)',
            cursor: 'pointer',
            fontSize: 'var(--font-size, 16px)',
          }}
        >
          ⚙️
        </button>
      )}
    </div>
  );
}

export default SettingsPanel;