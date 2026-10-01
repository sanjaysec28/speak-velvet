import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export interface VelvetPasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  inputSize?: 'sm' | 'md' | 'lg';
}

export const VelvetPasswordInput: React.FC<VelvetPasswordInputProps> = ({
  label = 'Password',
  helperText,
  error,
  inputSize = 'md',
  className = '',
  disabled,
  id,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = React.useId();
  const inputId = id || generatedId;

  const sizeStyles = {
    sm: 'h-9 px-3 pl-9 pr-9 text-xs rounded-xl',
    md: 'h-11 px-4 pl-11 pr-11 text-sm rounded-xl',
    lg: 'h-12 px-4 pl-12 pr-12 text-base rounded-2xl',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

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
        {/* Leading Lock Icon */}
        <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748B]">
          <Lock className={iconSizes[inputSize]} />
        </div>

        <input
          id={inputId}
          type={showPassword ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          className={`w-full bg-white text-[#0F172A] border font-normal placeholder-[#94A3B8] transition-all duration-200 outline-none
            ${error ? 'border-[#F43F5E] focus:ring-2 focus:ring-[#F43F5E]/20' : 'border-[#E2E8F0] hover:border-[#CBD5E1] focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/15'}
            ${sizeStyles[inputSize]}
            disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:cursor-not-allowed
            shadow-[0_1px_2px_rgba(15,23,42,0.02)]
            ${className}`}
          {...props}
        />

        {/* Password Visibility Toggle */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 text-[#64748B] hover:text-[#0F172A] p-1 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className={iconSizes[inputSize]} />
          ) : (
            <Eye className={iconSizes[inputSize]} />
          )}
        </button>
      </div>

      {(error || helperText) && (
        <p className={`text-xs ${error ? 'text-[#E11D48] font-medium' : 'text-[#64748B]'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};
