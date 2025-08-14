import React, { useState, useEffect } from 'react';

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
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: editValue } : todo
    ));
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

  // 格式化时间显示
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString();
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
    <div className="todo-list">
      <h2>Tasks</h2>
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--text-color)',
            width: '70%',
            marginRight: '10px'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      
      {/* 任务统计 */}
      {totalTasks > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '10px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          <span>{pendingTasks} pending, {completedTasks} completed</span>
          {completedTasks > 0 && (
            <button 
              onClick={clearCompleted}
              style={{
                padding: '4px 8px',
                borderRadius: '4px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'var(--text-color)',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Clear Completed
            </button>
          )}
        </div>
      )}
      
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        textAlign: 'left',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        {todos.length === 0 ? (
          <li style={{ 
            padding: '20px', 
            textAlign: 'center', 
            color: 'rgba(255, 255, 255, 0.6)' 
          }}>
            No tasks yet. Add a new task to get started!
          </li>
        ) : (
          todos.map(todo => (
            <li 
              key={todo.id} 
              style={{ 
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {isEditing === todo.id ? (
                // 编辑模式
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={{
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-color)',
                      marginBottom: '8px'
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
                  <div>
                    <button 
                      onClick={() => saveEdit(todo.id)}
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
                // 显示模式
                <div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    marginBottom: '4px'
                  }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      style={{ 
                        marginRight: '10px',
                        transform: 'scale(1.2)'
                      }}
                    />
                    <span 
                      style={{ 
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        flex: 1,
                        color: todo.completed ? 'rgba(255, 255, 255, 0.6)' : 'var(--text-color)'
                      }}
                    >
                      {todo.text}
                    </span>
                    <div>
                      <button 
                        onClick={() => startEditing(todo.id, todo.text)}
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
                        onClick={() => deleteTodo(todo.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--text-color)',
                          cursor: 'pointer',
                          fontSize: '16px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <small style={{ 
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '12px',
                    marginLeft: '26px'
                  }}>
                    {formatTime(todo.createdAt)}
                  </small>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;