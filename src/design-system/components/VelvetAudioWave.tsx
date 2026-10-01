import React from 'react';

export interface VelvetAudioWaveProps {
  isPlaying?: boolean;
  barCount?: number;
  color?: 'blue' | 'yellow' | 'gradient' | 'green';
  className?: string;
}

export const VelvetAudioWave: React.FC<VelvetAudioWaveProps> = ({
  isPlaying = true,
  barCount = 9,
  color = 'blue',
  className = '',
}) => {
  // Pre-calculated calm waveform heights
  const heights = [35, 60, 45, 90, 75, 100, 70, 50, 30, 85, 40];

  const colorStyles = {
    blue: 'bg-[#3B82F6]',
    yellow: 'bg-[#F59E0B]',
    green: 'bg-[#10B981]',
    gradient: 'bg-gradient-to-t from-[#2563EB] to-[#60A5FA]',
  };

  return (
    <div className={`inline-flex items-center justify-center gap-1 h-8 px-2 select-none ${className}`}>
      {Array.from({ length: barCount }).map((_, i) => {
        const height = heights[i % heights.length];
        const animationDelay = `${(i * 0.12).toFixed(2)}s`;

        return (
          <span
            key={i}
            className={`w-1 rounded-full ${colorStyles[color]} transition-all duration-300 ease-in-out`}
            style={{
              height: isPlaying ? `${Math.max(20, height)}%` : '25%',
              animationName: isPlaying ? 'svPulse' : 'none',
              animationDuration: '1.2s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
};
