import React from 'react';

export type LanguageMode = 'en' | 'en_ta' | 'auto';

export interface VelvetLanguageSwitcherProps {
  value: LanguageMode;
  onChange: (mode: LanguageMode) => void;
  showAuto?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const VelvetLanguageSwitcher: React.FC<VelvetLanguageSwitcherProps> = ({
  value,
  onChange,
  showAuto = false,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: { container: 'p-1 gap-1', btn: 'px-2.5 py-1 text-xs min-h-[30px]' },
    md: { container: 'p-1.5 gap-1.5', btn: 'px-3.5 py-1.5 text-xs sm:text-sm min-h-[36px]' },
  };

  return (
    <div
      role="radiogroup"
      aria-label="Spoken language preference"
      className={`inline-flex items-center bg-[#F1F5F9] border border-[#E2E8F0] rounded-full shadow-inner ${sizeStyles[size].container} ${className}`}
    >
      {/* English Option */}
      <button
        type="button"
        role="radio"
        aria-checked={value === 'en'}
        onClick={() => onChange('en')}
        className={`flex items-center gap-1.5 font-bold rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${sizeStyles[size].btn} ${
          value === 'en'
            ? 'bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.08)] scale-[1.02]'
            : 'text-[#64748B] hover:text-[#0F172A]'
        }`}
      >
        <span className="text-sm">🇬🇧</span>
        <span>English</span>
      </button>

      {/* English + தமிழ் Option */}
      <button
        type="button"
        role="radio"
        aria-checked={value === 'en_ta'}
        onClick={() => onChange('en_ta')}
        className={`flex items-center gap-1.5 font-bold rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${sizeStyles[size].btn} ${
          value === 'en_ta'
            ? 'bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]/60 shadow-[0_2px_8px_rgba(37,99,235,0.12)] scale-[1.02]'
            : 'text-[#64748B] hover:text-[#0F172A]'
        }`}
      >
        <span className="text-sm">🌐</span>
        <span>English + தமிழ்</span>
      </button>

      {/* Auto Switcher (Optional) */}
      {showAuto && (
        <button
          type="button"
          role="radio"
          aria-checked={value === 'auto'}
          onClick={() => onChange('auto')}
          className={`flex items-center gap-1 font-bold rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${sizeStyles[size].btn} ${
            value === 'auto'
              ? 'bg-white text-[#0F172A] shadow-[0_2px_8px_rgba(15,23,42,0.08)] scale-[1.02]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <span className="text-xs">✨</span>
          <span>Auto</span>
        </button>
      )}
    </div>
  );
};
