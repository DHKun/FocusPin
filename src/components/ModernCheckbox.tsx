interface ModernCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

function ModernCheckbox({ 
  checked, 
  onChange, 
  label,
  disabled = false,
  className = ''
}: ModernCheckboxProps) {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <label className={`modern-checkbox-container ${className}`}>
      <input
        type="checkbox"
        className="modern-checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      {label && (
        <span 
          className={`checkbox-label ${checked ? 'checked' : ''}`}
          style={{ 
            textDecoration: checked ? 'line-through' : 'none',
            color: checked ? 'var(--text-tertiary)' : 'var(--text-secondary)'
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
}

export default ModernCheckbox;