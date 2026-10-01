import React from 'react';

export type VelvetCardTint = 'white' | 'sky' | 'amber' | 'mint' | 'rose' | 'lavender' | 'subtle-slate';
export type VelvetCardRadius = 'md' | 'lg' | 'xl' | '2xl';
export type VelvetCardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface VelvetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tint?: VelvetCardTint;
  radius?: VelvetCardRadius;
  padding?: VelvetCardPadding;
  interactive?: boolean;
  selected?: boolean;
  children: React.ReactNode;
}

export const VelvetCard: React.FC<VelvetCardProps> = ({
  tint = 'white',
  radius = 'lg',
  padding = 'md',
  interactive = false,
  selected = false,
  className = '',
  children,
  ...props
}) => {
  const radiusStyles: Record<VelvetCardRadius, string> = {
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-[20px]',
    '2xl': 'rounded-3xl',
  };

  const paddingStyles: Record<VelvetCardPadding, string> = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8',
  };

  const tintStyles: Record<VelvetCardTint, string> = {
    white: 'bg-white border-[#E2E8F0]/80 shadow-[0_2px_12px_rgba(15,23,42,0.04)]',
    sky: 'bg-[#F0F6FF] border-[#BFDBFE]/60 shadow-[0_2px_12px_rgba(37,99,235,0.04)]',
    amber: 'bg-[#FFFBEB] border-[#FDE68A]/60 shadow-[0_2px_12px_rgba(245,158,11,0.04)]',
    mint: 'bg-[#F0FDF4] border-[#BBF7D0]/60 shadow-[0_2px_12px_rgba(16,185,129,0.04)]',
    rose: 'bg-[#FFF1F2] border-[#FECDD3]/60 shadow-[0_2px_12px_rgba(244,63,94,0.04)]',
    lavender: 'bg-[#F5F3FF] border-[#DDD6FE]/60 shadow-[0_2px_12px_rgba(139,92,246,0.04)]',
    'subtle-slate': 'bg-[#F8FAFC] border-[#E2E8F0] shadow-none',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] active:translate-y-0'
    : '';

  const selectedStyles = selected
    ? '!border-[#2563EB] !ring-2 !ring-[#2563EB]/20 shadow-[0_4px_16px_rgba(37,99,235,0.12)]'
    : '';

  return (
    <div
      className={`border ${radiusStyles[radius]} ${paddingStyles[padding]} ${tintStyles[tint]} ${interactiveStyles} ${selectedStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
