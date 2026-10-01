import React from 'react';

export interface VelvetInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const VelvetInput: React.FC<VelvetInputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  onClear,
  inputSize = 'md',
  className = '',
  disabled,
  id,
  value,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs rounded-xl',
    md: 'h-11 px-4 text-sm rounded-xl',
    lg: 'h-12 px-4 text-base rounded-2xl',
  };

  const hasLeft = Boolean(leftIcon);
  const hasRight = Boolean(rightIcon || onClear);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-[#1E293B] flex items-center justify-between tracking-wide"
        >
          <span>{label}</span>
        </label>
      )}

      <div className="relative flex items-center w-full">
        {hasLeft && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          value={value}
          disabled={disabled}
          className={`w-full bg-white text-[#0F172A] border font-normal placeholder-[#94A3B8] transition-all duration-200 outline-none
            ${error ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15'}
            ${sizeStyles[inputSize]}
            ${hasLeft ? (inputSize === 'sm' ? 'pl-9' : 'pl-11') : ''}
            ${hasRight ? (inputSize === 'sm' ? 'pr-9' : 'pr-11') : ''}
            disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:cursor-not-allowed
            shadow-[0_1px_2px_rgba(15,23,42,0.02)]
            ${className}`}
          {...props}
        />

        {onClear && value && !disabled && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 text-[#94A3B8] hover:text-[#0F172A] p-0.5 rounded-md transition-colors"
            title="Clear text"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {!onClear && rightIcon && (
          <div className="absolute right-3.5 flex items-center text-[#64748B] pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-[#E11D48] font-medium' : 'text-[#64748B]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
