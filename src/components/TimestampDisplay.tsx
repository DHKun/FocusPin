interface TimestampDisplayProps {
  timestamp: Date | string;
  format?: 'time' | 'date' | 'datetime';
  className?: string;
}

function TimestampDisplay({ 
  timestamp, 
  format = 'time',
  className = ''
}: TimestampDisplayProps) {
  const formatTimestamp = (ts: Date | string): string => {
    const date = typeof ts === 'string' ? new Date(ts) : ts;
    
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (format === 'time' && isToday) {
      return date.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      });
    }
    
    if (format === 'date') {
      return date.toLocaleDateString('zh-CN');
    }
    
    if (format === 'datetime') {
      return date.toLocaleString('zh-CN');
    }
    
    // 默认显示今天的时间，其他日期显示日期
    if (isToday) {
      return `今天 ${date.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      })}`;
    } else {
      return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <span className={`timestamp ${className}`}>
      {formatTimestamp(timestamp)}
    </span>
  );
}

export default TimestampDisplay;