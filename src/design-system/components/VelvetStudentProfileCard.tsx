import React from 'react';
import { VelvetAvatar } from './VelvetAvatar.tsx';
import { VelvetProgressBar } from './VelvetProgressBar.tsx';
import { Award, Flame } from 'lucide-react';

export interface VelvetStudentProfileCardProps {
  name: string;
  classNameLabel?: string;
  schoolName?: string;
  levelName?: string;
  currentXP?: number;
  targetXP?: number;
  streakDays?: number;
  avatarUrl?: string;
  onViewProfile?: () => void;
  className?: string;
}

export const VelvetStudentProfileCard: React.FC<VelvetStudentProfileCardProps> = ({
  name = 'Arjun S',
  classNameLabel = 'Class 8A',
  schoolName = 'Vivekanandha School',
  levelName = 'Level 3 · Growing Speaker',
  currentXP = 1240,
  targetXP = 2000,
  streakDays = 7,
  avatarUrl,
  onViewProfile,
  className = '',
}) => {
  return (
    <div
      onClick={onViewProfile}
      className={`rounded-3xl bg-white border border-[#E2E8F0] p-5 shadow-[0_2px_14px_rgba(15,23,42,0.04)] space-y-4 ${
        onViewProfile ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''
      } ${className}`}
    >
      {/* Top Profile Header */}
      <div className="flex items-center justify-between">
        <VelvetAvatar
          name={name}
          subtext={schoolName}
          badgeText={classNameLabel}
          imageUrl={avatarUrl}
          size="md"
        />

        {streakDays > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A] text-xs font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{streakDays}d Streak</span>
          </div>
        )}
      </div>

      {/* Level & XP Bar */}
      <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A]">
            <Award className="w-4 h-4 text-[#F59E0B]" />
            <span>{levelName}</span>
          </div>
          <span className="text-xs font-mono font-bold text-[#2563EB]">
            {currentXP.toLocaleString()} / {targetXP.toLocaleString()} XP
          </span>
        </div>

        <VelvetProgressBar
          value={currentXP}
          max={targetXP}
          color="blue"
          size="sm"
          showValueText={false}
        />
      </div>
    </div>
  );
};
