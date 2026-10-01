import React from 'react';

export type StatusTone = 'primary' | 'success' | 'warning' | 'error' | 'neutral';

export interface VelvetStatusLabelProps {
  label: string;
  tone?: StatusTone;
  showDot?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
}

export const VelvetStatusLabel: React.FC<VelvetStatusLabelProps> = ({
  label,
  tone = 'neutral',
  showDot = true,
  prefix,
  suffix,
  className = '',
}) => {
  const dotStyles: Record<StatusTone, string> = {
    primary: 'bg-[#2563EB]',
    success: 'bg-[#10B981]',
    warning: 'bg-[#F59E0B]',
    error: 'bg-[#F43F5E]',
    neutral: 'bg-[#64748B]',
  };

  const textStyles: Record<StatusTone, string> = {
    primary: 'text-[#1D4ED8]',
    success: 'text-[#059669]',
    warning: 'text-[#B45309]',
    error: 'text-[#E11D48]',
    neutral: 'text-[#475569]',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${textStyles[tone]} ${className}`}>
      {prefix}
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotStyles[tone]}`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
      {suffix}
    </span>
  );
};

export interface VelvetMetadataRowProps {
  items: (React.ReactNode | string)[];
  separator?: string;
  className?: string;
}

export const VelvetMetadataRow: React.FC<VelvetMetadataRowProps> = ({
  items,
  separator = '·',
  className = '',
}) => {
  const validItems = items.filter(Boolean);

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs text-[#64748B] font-medium ${className}`}>
      {validItems.map((item, index) => (
        <React.Fragment key={index}>
          <span>{item}</span>
          {index < validItems.length - 1 && (
            <span className="text-[#94A3B8] select-none" aria-hidden="true">
              {separator}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
