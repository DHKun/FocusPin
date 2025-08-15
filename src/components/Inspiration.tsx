import React, { useState, useEffect } from 'react';
import TimestampDisplay from './TimestampDisplay';

interface InspirationItem {
  id: string;
  text: string;
  createdAt: Date;
}

function Inspiration() {
  const [inspirations, setInspirations] = useState<InspirationItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // 从本地存储加载灵感
  useEffect(() => {
    const savedInspirations = localStorage.getItem('focuspin-inspirations');
    if (savedInspirations) {
      try {
        const parsedInspirations = JSON.parse(savedInspirations);
        // 将时间字符串转换为Date对象
        const inspirationsWithDates = parsedInspirations.map((inspiration: any) => ({
          ...inspiration,
          createdAt: new Date(inspiration.createdAt)
        }));
        setInspirations(inspirationsWithDates);
      } catch (e) {
        console.error('Failed to parse inspirations from localStorage', e);
      }
    }
  }, []);

  // 保存灵感到本地存储
  useEffect(() => {
    localStorage.setItem('focuspin-inspirations', JSON.stringify(inspirations));
  }, [inspirations]);

  // 添加新灵感
  const addInspiration = () => {
    if (inputValue.trim() !== '') {
      const newInspiration: InspirationItem = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        createdAt: new Date()
      };
      
      setInspirations([newInspiration, ...inspirations]); // 新的在前面
      setInputValue('');
    }
  };

  // 开始编辑灵感
  const startEditing = (id: string, text: string) => {
    setIsEditing(id);
    setEditValue(text);
  };

  // 保存编辑的灵感
  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      setInspirations(inspirations.map(inspiration => 
        inspiration.id === id ? { ...inspiration, text: editValue.trim() } : inspiration
      ));
    }
    setIsEditing(null);
    setEditValue('');
  };

  // 取消编辑
  const cancelEdit = () => {
    setIsEditing(null);
    setEditValue('');
  };

  // 删除灵感
  const deleteInspiration = (id: string) => {
    setInspirations(inspirations.filter(inspiration => inspiration.id !== id));
  };

  // 处理输入框按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addInspiration();
    }
  };

  // 计算灵感统计
  const totalInspirations = inspirations.length;

  return (
    <div className="inspiration-container">
      {/* 灵感输入区域 */}
      <div className="inspiration-input-container">
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Record a new inspiration..."
            className="modern-input"
            style={{
              flex: 1,
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--spacing-sm)',
              border: '1px solid var(--glass-border)',
              background: 'var(--glass-bg)',
              color: 'var(--text-primary)',
              fontSize: 'calc(var(--font-size) * 0.9)',
              outline: 'none',
              transition: 'var(--transition-fast)'
            }}
          />
          <button 
            onClick={addInspiration}
            className="add-button"
            style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--spacing-sm)',
              border: 'none',
              background: 'var(--text-primary)',
              color: 'white',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              marginLeft: 'var(--spacing-sm)',
              fontWeight: '500',
              alignSelf: 'flex-start'
            }}
          >
            Add
          </button>
        </div>
      </div>
      
      {/* 灵感统计 */}
      {totalInspirations > 0 && (
        <div className="inspiration-stats" style={{ 
          textAlign: 'left',
          marginBottom: 'var(--spacing-md)',
          fontSize: 'calc(var(--font-size) * 0.8)',
          color: 'var(--text-tertiary)'
        }}>
          <span>{totalInspirations} inspiration{totalInspirations !== 1 ? 's' : ''}</span>
        </div>
      )}
      
      {/* 灵感列表 */}
      <div className="inspiration-list" style={{ 
        maxHeight: '300px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {inspirations.length === 0 ? (
          <div style={{ 
            padding: 'var(--spacing-2xl)', 
            textAlign: 'center', 
            color: 'var(--text-tertiary)',
            fontStyle: 'italic'
          }}>
            No inspirations yet. Add a new inspiration to get started!
          </div>
        ) : (
          inspirations.map(inspiration => (
            <div 
              key={inspiration.id} 
              className="inspiration-item fade-in"
              style={{ 
                padding: 'var(--spacing-md) 0',
                borderBottom: '1px solid var(--glass-border)',
                transition: 'var(--transition-normal)'
              }}
            >
              {isEditing === inspiration.id ? (
                // 编辑模式
                <div className="edit-mode">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-textarea"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--spacing-xs)',
                      border: '1px solid var(--text-secondary)',
                      background: 'var(--glass-bg)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-sm)',
                      outline: 'none',
                      minHeight: '80px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        saveEdit(inspiration.id);
                      } else if (e.key === 'Escape') {
                        cancelEdit();
                      }
                    }}
                  />
                  <div className="edit-actions" style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button 
                      onClick={() => saveEdit(inspiration.id)}
                      style={{
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--spacing-xs)',
                        border: 'none',
                        background: 'var(--text-primary)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: 'calc(var(--font-size) * 0.8)'
                      }}
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      style={{
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--spacing-xs)',
                        border: '1px solid var(--text-tertiary)',
                        background: 'transparent',
                        color: 'var(--text-tertiary)',
                        cursor: 'pointer',
                        fontSize: 'calc(var(--font-size) * 0.8)'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 显示模式
                <div className="display-mode">
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    <div 
                      className="inspiration-text" 
                      style={{ 
                        flex: 1,
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                        marginRight: 'var(--spacing-md)',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}
                    >
                      {inspiration.text}
                    </div>
                    <div className="inspiration-actions" style={{ 
                      display: 'flex',
                      gap: 'var(--spacing-xs)'
                    }}>
                      <button 
                        onClick={() => startEditing(inspiration.id, inspiration.text)}
                        className="action-button"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-tertiary)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          padding: 'var(--spacing-xs)',
                          borderRadius: 'var(--spacing-xs)',
                          transition: 'var(--transition-fast)'
                        }}
                        title="Edit inspiration"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteInspiration(inspiration.id)}
                        className="action-button delete-button"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-tertiary)',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: 'var(--spacing-xs)',
                          borderRadius: 'var(--spacing-xs)',
                          transition: 'var(--transition-fast)'
                        }}
                        title="Delete inspiration"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <TimestampDisplay timestamp={inspiration.createdAt} />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Inspiration;