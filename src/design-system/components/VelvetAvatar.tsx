import React from 'react';

export interface VelvetAvatarProps {
  name: string;
  subtext?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
  badgeText?: string;
  isOnline?: boolean;
  className?: string;
}

export const VelvetAvatar: React.FC<VelvetAvatarProps> = ({
  name,
  subtext,
  size = 'md',
  imageUrl,
  badgeText,
  isOnline = true,
  className = '',
}) => {
  const sizeStyles = {
    sm: { container: 'w-8 h-8 text-xs', dot: 'w-2 h-2 ring-1' },
    md: { container: 'w-10 h-10 text-sm', dot: 'w-2.5 h-2.5 ring-2' },
    lg: { container: 'w-14 h-14 text-base', dot: 'w-3.5 h-3.5 ring-2' },
    xl: { container: 'w-20 h-20 text-xl', dot: 'w-4 h-4 ring-3' },
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div
          className={`${sizeStyles[size].container} rounded-full flex items-center justify-center font-bold bg-gradient-to-tr from-[#DBEAFE] via-[#BFDBFE] to-[#93C5FD] text-[#1D4ED8] ring-2 ring-white shadow-[0_2px_8px_rgba(15,23,42,0.08)] overflow-hidden`}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {isOnline && (
          <span
            className={`absolute bottom-0 right-0 ${sizeStyles[size].dot} bg-[#10B981] rounded-full ring-white`}
            title="Online"
          />
        )}
      </div>

      {(name || subtext || badgeText) && size !== 'sm' && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#0F172A] truncate">
              {name}
            </span>
            {badgeText && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]/60">
                {badgeText}
              </span>
            )}
          </div>
          {subtext && (
            <span className="text-xs text-[#64748B] truncate">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
