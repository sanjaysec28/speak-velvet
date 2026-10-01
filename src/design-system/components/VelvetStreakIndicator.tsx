import React from 'react';
import { Flame, Check } from 'lucide-react';

export interface DayStreakItem {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  completed: boolean;
  isToday?: boolean;
}

export interface VelvetStreakIndicatorProps {
  days?: DayStreakItem[];
  streakCount?: number;
  streakStatusText?: string;
  onClick?: () => void;
  className?: string;
}

const DEFAULT_DAYS: DayStreakItem[] = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: false, isToday: true },
  { day: 'Sun', completed: false },
];

export const VelvetStreakIndicator: React.FC<VelvetStreakIndicatorProps> = ({
  days = DEFAULT_DAYS,
  streakCount = 7,
  streakStatusText = 'Keep going!',
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]/80 p-4 shadow-[0_2px_12px_rgba(245,158,11,0.06)] space-y-3 ${onClick ? 'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md' : ''} ${className}`}
    >
      {/* Top Banner Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(245,158,11,0.30)]">
            <Flame className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-[#0F172A] tracking-tight">
                {streakCount} Day Streak
              </span>
              <span className="text-sm">🔥</span>
            </div>
            <p className="text-[11px] font-medium text-[#B45309]">
              {streakStatusText}
            </p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-full bg-white/80 border border-[#FDE68A] flex items-center justify-center text-[#B45309] text-xs font-bold">
          🎯
        </div>
      </div>

      {/* 7-Day Dots Grid */}
      <div className="grid grid-cols-7 gap-1.5 pt-1">
        {days.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all duration-200 ${
                item.completed
                  ? 'bg-[#10B981] text-white shadow-[0_1px_4px_rgba(16,185,129,0.30)]'
                  : item.isToday
                  ? 'bg-white border-2 border-[#F59E0B] text-[#D97706] font-bold shadow-sm'
                  : 'bg-white/60 border border-[#E2E8F0] text-[#94A3B8]'
              }`}
            >
              {item.completed ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : item.isToday ? (
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              ) : null}
            </div>
            <span
              className={`text-[10px] font-semibold ${
                item.isToday ? 'text-[#B45309] font-bold' : 'text-[#64748B]'
              }`}
            >
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
