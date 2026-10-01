import React from 'react';

export interface VelvetSparkleStarProps {
  size?: number; // pixel width/height (default 24)
  color?: 'gold' | 'blue' | 'green' | 'pink' | 'lavender';
  className?: string;
}

export const VelvetSparkleStar: React.FC<VelvetSparkleStarProps> = ({
  size = 24,
  color = 'gold',
  className = '',
}) => {
  const colorMap = {
    gold: '#F59E0B',
    blue: '#2563EB',
    green: '#10B981',
    pink: '#F43F5E',
    lavender: '#8B5CF6',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
    >
      <path
        d="M12 2 C12 7.5 7.5 12 2 12 C7.5 12 12 16.5 12 22 C12 16.5 16.5 12 22 12 C16.5 12 12 7.5 12 2 Z"
        fill={colorMap[color]}
      />
    </svg>
  );
};

export interface VelvetSoundArcProps {
  size?: number;
  color?: string;
  className?: string;
}

export const VelvetSoundArc: React.FC<VelvetSoundArcProps> = ({
  size = 32,
  color = '#2563EB',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
    >
      <path d="M8 8 Q16 16 8 24" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 4 Q26 16 14 28" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M20 2 Q34 16 20 30" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
};

export interface VelvetSpeechBubbleWrapperProps {
  speakerName?: string;
  avatarNode?: React.ReactNode;
  children: React.ReactNode;
  hint?: string;
  tint?: 'white' | 'sky' | 'amber';
  className?: string;
}

export const VelvetSpeechBubbleWrapper: React.FC<VelvetSpeechBubbleWrapperProps> = ({
  speakerName = 'Velvet',
  avatarNode,
  children,
  hint,
  tint = 'white',
  className = '',
}) => {
  const tintStyles = {
    white: 'bg-white border-[#E2E8F0]',
    sky: 'bg-[#F0F6FF] border-[#BFDBFE]',
    amber: 'bg-[#FFFBEB] border-[#FDE68A]',
  };

  return (
    <div className={`relative flex items-start gap-3 ${className}`}>
      {avatarNode && (
        <div className="shrink-0 mt-1">
          {avatarNode}
        </div>
      )}

      <div className={`flex-1 p-4 rounded-3xl border shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-1.5 ${tintStyles[tint]}`}>
        {speakerName && (
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-[#2563EB]">
              {speakerName}
            </span>
            {hint && (
              <span className="text-[10px] text-[#64748B]">
                {hint}
              </span>
            )}
          </div>
        )}

        <div className="text-sm font-medium text-[#0F172A] leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
