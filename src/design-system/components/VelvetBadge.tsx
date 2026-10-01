import React from 'react';

export type VelvetBadgeTone = 'primary' | 'accent' | 'green' | 'pink' | 'lavender' | 'neutral';
export type VelvetBadgeSize = 'sm' | 'md' | 'lg';

export interface VelvetBadgeProps {
  label: string;
  icon?: React.ReactNode;
  tone?: VelvetBadgeTone;
  size?: VelvetBadgeSize;
  pill?: boolean;
  className?: string;
}

export const VelvetBadge: React.FC<VelvetBadgeProps> = ({
  label,
  icon,
  tone = 'neutral',
  size = 'md',
  pill = true,
  className = '',
}) => {
  const toneStyles: Record<VelvetBadgeTone, string> = {
    primary: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]/70',
    accent: 'bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]/80 font-bold',
    green: 'bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]/70 font-semibold',
    pink: 'bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]/70 font-semibold',
    lavender: 'bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]/70 font-semibold',
    neutral: 'bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0]',
  };

  const sizeStyles: Record<VelvetBadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  };

  const radiusStyle = pill ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      className={`inline-flex items-center select-none whitespace-nowrap leading-none ${sizeStyles[size]} ${toneStyles[tone]} ${radiusStyle} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
