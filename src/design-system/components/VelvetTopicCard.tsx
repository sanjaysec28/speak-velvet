import React from 'react';

export type TopicTint = 'white' | 'sky' | 'amber' | 'mint' | 'rose' | 'lavender';

export interface VelvetTopicCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  tint?: TopicTint;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const VelvetTopicCard: React.FC<VelvetTopicCardProps> = ({
  title,
  subtitle,
  icon,
  tint = 'white',
  isSelected = false,
  onClick,
  className = '',
}) => {
  const tintMap: Record<TopicTint, { bg: string; iconBg: string; border: string }> = {
    white: { bg: 'bg-white', iconBg: 'bg-[#EFF6FF]', border: 'border-[#E2E8F0]' },
    sky: { bg: 'bg-[#F0F6FF]', iconBg: 'bg-white', border: 'border-[#BFDBFE]' },
    amber: { bg: 'bg-[#FFFBEB]', iconBg: 'bg-white', border: 'border-[#FDE68A]' },
    mint: { bg: 'bg-[#F0FDF4]', iconBg: 'bg-white', border: 'border-[#BBF7D0]' },
    rose: { bg: 'bg-[#FFF1F2]', iconBg: 'bg-white', border: 'border-[#FECDD3]' },
    lavender: { bg: 'bg-[#F5F3FF]', iconBg: 'bg-white', border: 'border-[#DDD6FE]' },
  };

  const current = tintMap[tint];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border text-center transition-all duration-200 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${current.bg} ${current.border} ${
        isSelected
          ? '!border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-[0_4px_16px_rgba(37,99,235,0.15)] scale-[1.02]'
          : 'shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:-translate-y-1 hover:shadow-md'
      } ${className}`}
    >
      {/* Icon / Emoji Stage */}
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2.5 transition-transform duration-200 group-hover:scale-110 shadow-xs ${current.iconBg}`}
      >
        {icon}
      </div>

      {/* Title */}
      <span className="font-bold text-sm text-[#0F172A] tracking-tight group-hover:text-[#2563EB] transition-colors">
        {title}
      </span>

      {/* Subtitle */}
      {subtitle && (
        <span className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
          {subtitle}
        </span>
      )}
    </button>
  );
};
