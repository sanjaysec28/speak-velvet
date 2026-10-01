import React from 'react';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface VelvetSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function VelvetSegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className = '',
}: VelvetSegmentedControlProps<T>) {
  const sizeStyles = {
    sm: 'p-1 gap-1 text-xs',
    md: 'p-1.5 gap-1.5 text-sm',
    lg: 'p-2 gap-2 text-base',
  };

  const itemSizeStyles = {
    sm: 'px-3 py-1 text-xs min-h-[32px]',
    md: 'px-4 py-1.5 text-sm min-h-[38px]',
    lg: 'px-5 py-2 text-base min-h-[44px]',
  };

  return (
    <div
      role="radiogroup"
      className={`inline-flex items-center bg-[#F1F5F9] border border-[#E2E8F0]/70 rounded-full ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={`relative flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${itemSizeStyles[size]} ${fullWidth ? 'flex-1' : ''} ${
              isSelected
                ? 'bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.08)] scale-[1.02]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/50'
            }`}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
