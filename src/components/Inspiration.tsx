import React, { useState, useEffect } from 'react';

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
    setInspirations(inspirations.map(inspiration => 
      inspiration.id === id ? { ...inspiration, text: editValue } : inspiration
    ));
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

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  // 处理输入框按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addInspiration();
    }
  };

  return (
    <div className="inspiration">
      <h2>Inspiration</h2>
      <div className="inspiration-input">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Record a new inspiration..."
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--text-color)',
            width: '70%',
            marginRight: '10px',
            minHeight: '60px',
            resize: 'vertical'
          }}
        />
        <button 
          onClick={addInspiration}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)',
            cursor: 'pointer',
            height: 'fit-content',
            alignSelf: 'flex-start'
          }}
        >
          Add
        </button>
      </div>
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        textAlign: 'left',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {inspirations.map(inspiration => (
          <li 
            key={inspiration.id} 
            style={{ 
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {isEditing === inspiration.id ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-color)',
                    marginBottom: '8px',
                    minHeight: '60px',
                    resize: 'vertical'
                  }}
                  autoFocus
                />
                <div>
                  <button 
                    onClick={() => saveEdit(inspiration.id)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-color)',
                      cursor: 'pointer',
                      marginRight: '8px'
                    }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEdit}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-color)',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <p style={{ 
                    margin: '0 10px 5px 0',
                    flex: 1,
                    color: 'var(--text-color)'
                  }}>
                    {inspiration.text}
                  </p>
                  <div>
                    <button 
                      onClick={() => startEditing(inspiration.id, inspiration.text)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-color)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        marginRight: '8px'
                      }}
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteInspiration(inspiration.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-color)',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <small style={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '12px'
                }}>
                  {formatTime(inspiration.createdAt)}
                </small>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inspiration;