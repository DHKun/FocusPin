import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  onClick?: () => void;
  animation?: 'fade-in' | 'slide-up' | 'bounce-in';
}

function GlassCard({ 
  children, 
  title, 
  className = '', 
  onClick,
  animation = 'slide-up'
}: GlassCardProps) {
  const cardClasses = [
    'glass-card',
    animation,
    onClick ? 'interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default GlassCard;