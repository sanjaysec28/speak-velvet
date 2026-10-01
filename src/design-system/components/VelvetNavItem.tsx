import React from 'react';

export interface VelvetSidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string | number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const VelvetSidebarNavItem: React.FC<VelvetSidebarNavItemProps> = ({
  icon,
  label,
  badge,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
        isActive
          ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_4px_16px_rgba(37,99,235,0.30)]'
          : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#EFF6FF]/60'
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`shrink-0 transition-transform duration-200 ${
            isActive ? 'text-white scale-105' : 'text-[#64748B] group-hover:text-[#2563EB]'
          }`}
        >
          {icon}
        </span>
        <span className="truncate">{label}</span>
      </div>

      {badge !== undefined && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-bold ${
            isActive
              ? 'bg-white/20 text-white'
              : 'bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export interface VelvetBottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const VelvetBottomNavItem: React.FC<VelvetBottomNavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-xl ${
        isActive
          ? 'text-[#2563EB] font-bold'
          : 'text-[#64748B] hover:text-[#0F172A] font-medium'
      } ${className}`}
    >
      <div
        className={`p-1.5 rounded-xl transition-all duration-200 ${
          isActive ? 'bg-[#EFF6FF] text-[#2563EB] scale-110 shadow-sm' : ''
        }`}
      >
        {icon}
      </div>
      <span className="text-[11px] leading-none tracking-tight">{label}</span>
    </button>
  );
};
