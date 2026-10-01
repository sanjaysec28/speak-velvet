import React from 'react';

export type VelvetProgressColor = 'blue' | 'green' | 'pink' | 'amber';
export type VelvetProgressSize = 'sm' | 'md' | 'lg';

export interface VelvetProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  sublabel?: string;
  icon?: React.ReactNode;
  color?: VelvetProgressColor;
  size?: VelvetProgressSize;
  showValueText?: boolean;
  className?: string;
}

export const VelvetProgressBar: React.FC<VelvetProgressBarProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  icon,
  color = 'blue',
  size = 'md',
  showValueText = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeStyles: Record<VelvetProgressSize, { track: string; text: string }> = {
    sm: { track: 'h-2', text: 'text-xs' },
    md: { track: 'h-3', text: 'text-sm' },
    lg: { track: 'h-4', text: 'text-base' },
  };

  const fillGradients: Record<VelvetProgressColor, string> = {
    blue: 'bg-gradient-to-r from-[#60A5FA] to-[#2563EB] shadow-[0_2px_8px_rgba(37,99,235,0.30)]',
    green: 'bg-gradient-to-r from-[#34D399] to-[#059669] shadow-[0_2px_8px_rgba(16,185,129,0.30)]',
    pink: 'bg-gradient-to-r from-[#FB7185] to-[#E11D48] shadow-[0_2px_8px_rgba(244,63,94,0.30)]',
    amber: 'bg-gradient-to-r from-[#FDE68A] to-[#F59E0B] shadow-[0_2px_8px_rgba(245,158,11,0.30)]',
  };

  const trackBg: Record<VelvetProgressColor, string> = {
    blue: 'bg-[#EFF6FF]',
    green: 'bg-[#ECFDF5]',
    pink: 'bg-[#FFF1F2]',
    amber: 'bg-[#FFFBEB]',
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showValueText) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon && <span className="text-[#475569]">{icon}</span>}
            {label && (
              <span className="font-semibold text-xs md:text-sm text-[#0F172A] tracking-tight">
                {label}
              </span>
            )}
            {sublabel && (
              <span className="text-xs text-[#64748B]">
                {sublabel}
              </span>
            )}
          </div>
          {showValueText && (
            <span className="font-bold text-xs md:text-sm text-[#0F172A] font-mono tabular-nums">
              {percentage}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className={`w-full ${trackBg[color]} ${sizeStyles[size].track} rounded-full overflow-hidden p-[2px] border border-black/[0.04]`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full ${fillGradients[color]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
