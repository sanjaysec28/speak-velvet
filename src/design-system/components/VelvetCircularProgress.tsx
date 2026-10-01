import React from 'react';

export type CircularColor = 'blue' | 'green' | 'pink' | 'amber';

export interface VelvetCircularProgressProps {
  value: number; // 0 to 100
  size?: number; // pixel diameter (default 80)
  strokeWidth?: number; // default 8
  color?: CircularColor;
  label?: string;
  showValueText?: boolean;
  centerIcon?: React.ReactNode;
  className?: string;
}

export const VelvetCircularProgress: React.FC<VelvetCircularProgressProps> = ({
  value,
  size = 80,
  strokeWidth = 8,
  color = 'blue',
  label,
  showValueText = true,
  centerIcon,
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedValue / 100) * circumference;

  const colorConfig: Record<CircularColor, { stroke: string; track: string; text: string }> = {
    blue: { stroke: '#2563EB', track: '#EFF6FF', text: 'text-[#1D4ED8]' },
    green: { stroke: '#10B981', track: '#ECFDF5', text: 'text-[#059669]' },
    pink: { stroke: '#F43F5E', track: '#FFF1F2', text: 'text-[#E11D48]' },
    amber: { stroke: '#F59E0B', track: '#FFFBEB', text: 'text-[#D97706]' },
  };

  const selected = colorConfig[color];

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-1.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={selected.track}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Foreground Animated Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={selected.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerIcon ? (
            <span className={selected.text}>{centerIcon}</span>
          ) : showValueText ? (
            <span className="font-bold text-sm text-[#0F172A] font-mono tabular-nums leading-none">
              {Math.round(clampedValue)}%
            </span>
          ) : null}
        </div>
      </div>

      {label && (
        <span className="text-xs font-semibold text-[#0F172A] text-center tracking-tight">
          {label}
        </span>
      )}
    </div>
  );
};
