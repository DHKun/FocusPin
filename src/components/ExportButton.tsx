import { useState } from 'react';

interface ExportButtonProps {
  onExport?: (format: 'txt' | 'md') => void;
}

function ExportButton({ onExport }: ExportButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  // 从本地存储获取数据并导出
  const exportData = (format: 'txt' | 'md') => {
    // 获取任务数据
    const todosData = localStorage.getItem('focuspin-todos');
    const todos = todosData ? JSON.parse(todosData) : [];
    
    // 获取灵感数据
    const inspirationsData = localStorage.getItem('focuspin-inspirations');
    const inspirations = inspirationsData ? JSON.parse(inspirationsData) : [];
    
    // 格式化数据
    let content = '';
    
    if (format === 'txt') {
      content += 'FocusPin Export\n';
      content += '===============\n\n';
      
      content += 'TASKS\n';
      content += '-----\n';
      todos.forEach((todo: any, index: number) => {
        const status = todo.completed ? '[x]' : '[ ]';
        const date = new Date(todo.createdAt).toLocaleString();
        content += `${index + 1}. ${status} ${todo.text} (${date})\n`;
      });
      
      content += '\nINSPIRATIONS\n';
      content += '-----------\n';
      inspirations.forEach((inspiration: any, index: number) => {
        const date = new Date(inspiration.createdAt).toLocaleString();
        content += `${index + 1}. ${inspiration.text} (${date})\n`;
      });
    } else {
      content += '# FocusPin Export\n\n';
      
      content += '## Tasks\n';
      todos.forEach((todo: any) => {
        const status = todo.completed ? '[x]' : '[ ]';
        const date = new Date(todo.createdAt).toLocaleString();
        content += `- ${status} ${todo.text} (${date})\n`;
      });
      
      content += '\n## Inspirations\n';
      inspirations.forEach((inspiration: any) => {
        const date = new Date(inspiration.createdAt).toLocaleString();
        content += `- ${inspiration.text} (${date})\n`;
      });
    }
    
    // 创建并下载文件
    const blob = new Blob([content], { type: format === 'txt' ? 'text/plain' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `focuspin-export.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // 调用回调函数
    if (onExport) {
      onExport(format);
    }
  };

  return (
    <div style={{ 
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      zIndex: 1001,
    }}>
      {showOptions ? (
        <div style={{
          display: 'flex',
          gap: '5px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '5px',
          borderRadius: '4px',
        }}>
          <button 
            onClick={() => exportData('txt')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)',
              cursor: 'pointer',
            }}
          >
            .txt
          </button>
          <button 
            onClick={() => exportData('md')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)',
              cursor: 'pointer',
            }}
          >
            .md
          </button>
          <button 
            onClick={() => setShowOptions(false)}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--text-color)',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setShowOptions(true)}
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'var(--text-color)',
            cursor: 'pointer',
          }}
        >
          Export
        </button>
      )}
    </div>
  );
}

export default ExportButton;