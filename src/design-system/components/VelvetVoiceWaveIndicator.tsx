import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

export type VoiceState = 'idle' | 'listening' | 'speaking' | 'processing';

export interface VelvetVoiceWaveIndicatorProps {
  state: VoiceState;
  title?: string;
  subtitle?: string;
  barCount?: number;
  className?: string;
}

export const VelvetVoiceWaveIndicator: React.FC<VelvetVoiceWaveIndicatorProps> = ({
  state = 'idle',
  title,
  subtitle,
  barCount = 11,
  className = '',
}) => {
  const heights = [30, 65, 45, 95, 70, 100, 75, 55, 85, 40, 60, 35, 90];

  const stateConfig: Record<VoiceState, { color: string; icon: React.ReactNode; defaultTitle: string; defaultSubtitle: string; pulseClass: string }> = {
    idle: {
      color: 'bg-[#94A3B8]',
      icon: <Mic className="w-4 h-4 text-[#64748B]" />,
      defaultTitle: 'Ready to speak',
      defaultSubtitle: 'Tap the microphone to start',
      pulseClass: 'opacity-40',
    },
    listening: {
      color: 'bg-[#2563EB]',
      icon: <Mic className="w-4 h-4 text-[#2563EB]" />,
      defaultTitle: "I'm listening...",
      defaultSubtitle: 'Speak naturally in English',
      pulseClass: 'animate-pulse',
    },
    speaking: {
      color: 'bg-[#10B981]',
      icon: <Volume2 className="w-4 h-4 text-[#059669]" />,
      defaultTitle: 'Velvet is speaking',
      defaultSubtitle: 'Listen closely to pronunciation',
      pulseClass: 'animate-pulse',
    },
    processing: {
      color: 'bg-[#F59E0B]',
      icon: <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />,
      defaultTitle: 'Analyzing speech...',
      defaultSubtitle: 'Preparing friendly feedback',
      pulseClass: '',
    },
  };

  const current = stateConfig[state];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.04)] space-y-4 max-w-sm w-full mx-auto select-none ${className}`}
    >
      {/* Icon + Title Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-[#F8FAFD] border border-[#E2E8F0]">
          {current.icon}
        </div>
        <div className="text-left">
          <p className="font-bold text-sm text-[#0F172A] tracking-tight">
            {title || current.defaultTitle}
          </p>
          <p className="text-xs text-[#64748B]">
            {subtitle || current.defaultSubtitle}
          </p>
        </div>
      </div>

      {/* Dynamic Waveform Bars */}
      <div className="flex items-center justify-center gap-1.5 h-12 w-full px-4 py-2 bg-[#F8FAFD] rounded-2xl border border-[#E2E8F0]/70">
        {Array.from({ length: barCount }).map((_, i) => {
          const height = heights[i % heights.length];
          const isActive = state === 'listening' || state === 'speaking';
          const animationDelay = `${(i * 0.1).toFixed(2)}s`;

          return (
            <span
              key={i}
              className={`w-1.5 rounded-full ${current.color} transition-all duration-200`}
              style={{
                height: isActive ? `${height}%` : '20%',
                animationName: isActive ? 'svPulse' : 'none',
                animationDuration: '1s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDirection: 'alternate',
                animationDelay,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
