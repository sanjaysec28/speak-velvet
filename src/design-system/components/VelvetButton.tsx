import React from 'react';

export type VelvetButtonVariant = 
  | 'primary'         // Solid Royal Blue (#2563EB)
  | 'accent'          // Golden Warm Yellow (#F59E0B)
  | 'accent-soft'     // Gentle Warm Cream/Yellow background
  | 'gentle-green'    // Gentle Mint Green (#10B981)
  | 'gentle-green-soft'
  | 'gentle-pink'     // Gentle Coral Pink (#F43F5E)
  | 'gentle-pink-soft'
  | 'gentle-lavender' // Gentle Lavender (#8B5CF6)
  | 'gentle-lavender-soft'
  | 'outline'         // Crisp white with subtle border
  | 'ghost';          // Quiet transparent hover

export type VelvetButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface VelvetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VelvetButtonVariant;
  size?: VelvetButtonSize;
  pill?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const VelvetButton: React.FC<VelvetButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer';

  const sizeStyles: Record<VelvetButtonSize, string> = {
    sm: 'text-xs h-8 px-3.5 gap-1.5 font-semibold',
    md: 'text-sm h-11 px-5 gap-2 font-semibold',
    lg: 'text-base h-12 px-6 gap-2.5 font-semibold',
    xl: 'text-lg h-14 px-8 gap-3 font-bold',
  };

  const roundedStyles = pill ? 'rounded-full' : (size === 'sm' ? 'rounded-xl' : size === 'xl' ? 'rounded-2xl' : 'rounded-xl');

  const variantStyles: Record<VelvetButtonVariant, string> = {
    primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_14px_rgba(37,99,235,0.30)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.40)] active:bg-[#1E40AF]',
    accent: 'bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-[#0F172A] hover:brightness-105 shadow-[0_4px_14px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.35)] font-bold',
    'accent-soft': 'bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A] border border-[#FDE68A]/60',
    'gentle-green': 'bg-[#10B981] text-white hover:bg-[#059669] shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.35)]',
    'gentle-green-soft': 'bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5] border border-[#A7F3D0]/60',
    'gentle-pink': 'bg-[#F43F5E] text-white hover:bg-[#E11D48] shadow-[0_4px_14px_rgba(244,63,94,0.25)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.35)]',
    'gentle-pink-soft': 'bg-[#FFF1F2] text-[#E11D48] hover:bg-[#FFE4E6] border border-[#FECDD3]/60',
    'gentle-lavender': 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-[0_4px_14px_rgba(139,92,246,0.25)] hover:shadow-[0_6px_20px_rgba(139,92,246,0.35)]',
    'gentle-lavender-soft': 'bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] border border-[#DDD6FE]/60',
    outline: 'bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFD] hover:border-[#CBD5E1] shadow-sm',
    ghost: 'bg-transparent text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${roundedStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {rightIcon && !isLoading && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
};
