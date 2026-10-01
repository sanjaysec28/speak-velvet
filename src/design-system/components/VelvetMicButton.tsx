import React from 'react';

export interface VelvetMicButtonProps {
  isListening?: boolean;
  onClick?: () => void;
  size?: 'md' | 'lg' | 'hero';
  label?: string;
  sublabel?: string;
  className?: string;
}

export const VelvetMicButton: React.FC<VelvetMicButtonProps> = ({
  isListening = false,
  onClick,
  size = 'lg',
  label = 'Tap to speak',
  sublabel = "I'm listening...",
  className = '',
}) => {
  const sizeConfig = {
    md: { button: 'w-16 h-16', icon: 'w-7 h-7' },
    lg: { button: 'w-24 h-24', icon: 'w-10 h-10' },
    hero: { button: 'w-28 h-28', icon: 'w-12 h-12' },
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 select-none ${className}`}>
      {/* Outer Ripple / Halo when active */}
      <div className="relative flex items-center justify-center">
        {isListening && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-30 animate-ping" />
            <span className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#60A5FA]/40 to-[#2563EB]/40 blur-md animate-pulse" />
          </>
        )}

        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          aria-pressed={isListening}
          className={`${sizeConfig[size].button} relative flex items-center justify-center rounded-full bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_10px_30px_rgba(37,99,235,0.40)] hover:shadow-[0_14px_36px_rgba(37,99,235,0.50)] active:scale-95 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#93C5FD] border-4 border-white`}
        >
          {/* Inner Mic Icon */}
          <svg
            className={`${sizeConfig[size].icon} transition-transform duration-200 ${isListening ? 'scale-110' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
            />
          </svg>
        </button>
      </div>

      {label && (
        <div className="text-center">
          <p className="font-bold text-base md:text-lg text-[#0F172A] tracking-tight">
            {isListening ? "Listening..." : label}
          </p>
          {sublabel && (
            <p className="text-xs font-medium text-[#64748B]">
              {isListening ? "Speak clearly into your microphone" : sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
