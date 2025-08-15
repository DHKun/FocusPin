import React, { useState, useEffect } from 'react';
import ModernCheckbox from './ModernCheckbox';
import TimestampDisplay from './TimestampDisplay';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // 从本地存储加载任务
  useEffect(() => {
    const savedTodos = localStorage.getItem('focuspin-todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        // 将时间字符串转换为Date对象
        const todosWithDates = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
        setTodos(todosWithDates);
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
      }
    }
  }, []);

  // 保存任务到本地存储
  useEffect(() => {
    localStorage.setItem('focuspin-todos', JSON.stringify(todos));
  }, [todos]);

  // 添加新任务
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      
      // 新任务添加到列表前面
      setTodos([newTodo, ...todos]);
      setInputValue('');
    }
  };

  // 切换任务完成状态
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // 删除任务
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 开始编辑任务
  const startEditing = (id: string, text: string) => {
    setIsEditing(id);
    setEditValue(text);
  };

  // 保存编辑的任务
  const saveEdit = (id: string) => {
    if (editValue.trim()) {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, text: editValue.trim() } : todo
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

  // 清空已完成任务
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // 处理输入框按键事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // 计算任务统计
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="todo-container">
      {/* 任务输入区域 */}
      <div className="todo-input-container">
        <div className="input-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
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
            onClick={addTodo}
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
              fontWeight: '500'
            }}
          >
            Add
          </button>
        </div>
      </div>
      
      {/* 任务统计 */}
      {totalTasks > 0 && (
        <div className="todo-stats" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 'var(--spacing-md)',
          fontSize: 'calc(var(--font-size) * 0.8)',
          color: 'var(--text-tertiary)'
        }}>
          <span>{pendingTasks} pending, {completedTasks} completed</span>
          {completedTasks > 0 && (
            <button 
              onClick={clearCompleted}
              className="clear-button"
              style={{
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                borderRadius: 'var(--spacing-xs)',
                border: '1px solid var(--text-tertiary)',
                background: 'transparent',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                fontSize: 'calc(var(--font-size) * 0.75)',
                transition: 'var(--transition-fast)'
              }}
            >
              Clear Completed
            </button>
          )}
        </div>
      )}
      
      {/* 任务列表 */}
      <div className="todo-list" style={{ 
        maxHeight: '300px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {todos.length === 0 ? (
          <div style={{ 
            padding: 'var(--spacing-2xl)', 
            textAlign: 'center', 
            color: 'var(--text-tertiary)',
            fontStyle: 'italic'
          }}>
            No tasks yet. Add a new task to get started!
          </div>
        ) : (
          todos.map(todo => (
            <div 
              key={todo.id} 
              className="todo-item fade-in"
              style={{ 
                padding: 'var(--spacing-md) 0',
                borderBottom: '1px solid var(--glass-border)',
                transition: 'var(--transition-normal)'
              }}
            >
              {isEditing === todo.id ? (
                // 编辑模式
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="edit-input"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--spacing-xs)',
                      border: '1px solid var(--text-secondary)',
                      background: 'var(--glass-bg)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--spacing-sm)',
                      outline: 'none'
                    }}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveEdit(todo.id);
                      } else if (e.key === 'Escape') {
                        cancelEdit();
                      }
                    }}
                  />
                  <div className="edit-actions" style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button 
                      onClick={() => saveEdit(todo.id)}
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
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-sm)'
                  }}>
                    <ModernCheckbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      label={todo.text}
                    />
                    <div className="todo-actions" style={{ 
                      marginLeft: 'auto',
                      display: 'flex',
                      gap: 'var(--spacing-xs)'
                    }}>
                      <button 
                        onClick={() => startEditing(todo.id, todo.text)}
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
                        title="Edit task"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deleteTodo(todo.id)}
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
                        title="Delete task"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div style={{ marginLeft: '26px', marginTop: 'var(--spacing-xs)' }}>
                    <TimestampDisplay timestamp={todo.createdAt} />
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

export default TodoList;