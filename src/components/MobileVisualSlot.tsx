import React, { useState } from 'react';
import { VelvetMascot, MascotState } from '../design-system/illustrations/VelvetMascot.tsx';
import { Sparkles } from 'lucide-react';

export interface MobileVisualSlotProps {
  /** Optional image URL or imported asset */
  src?: string;
  /** Accessible description of the artwork */
  alt: string;
  /** Aspect ratio constraint */
  aspectRatio?: '9:16' | '16:9' | '4:3' | '1:1' | '3:4' | 'auto';
  /** How the image fits its slot container */
  fitMode?: 'cover' | 'contain' | 'fill';
  /** Border radius styling */
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  /** Velvet mascot state for subtle placeholder */
  fallbackMascotState?: MascotState;
  /** Short contextual label displayed in subtle placeholder */
  fallbackTitle?: string;
  /** Supporting contextual note */
  fallbackSubtitle?: string;
  /** Extra CSS classes */
  className?: string;
  /** Elements rendered on top of the slot (e.g. badges, speech bubbles) */
  overlayContent?: React.ReactNode;
  /** Inner children */
  children?: React.ReactNode;
  /** Whether to show a soft border */
  border?: boolean;
}

const ASPECT_RATIO_CLASSES: Record<NonNullable<MobileVisualSlotProps['aspectRatio']>, string> = {
  '9:16': 'aspect-[9/16]',
  '16:9': 'aspect-[16/9]',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:4': 'aspect-[3/4]',
  'auto': '',
};

const ROUNDED_CLASSES: Record<NonNullable<MobileVisualSlotProps['rounded']>, string> = {
  none: 'rounded-none',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-2xl',
  '2xl': 'rounded-3xl',
  '3xl': 'rounded-[32px]',
  full: 'rounded-full',
};

const FIT_MODE_CLASSES: Record<NonNullable<MobileVisualSlotProps['fitMode']>, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
};

export const MobileVisualSlot: React.FC<MobileVisualSlotProps> = ({
  src,
  alt,
  aspectRatio = '16:9',
  fitMode = 'cover',
  rounded = '2xl',
  fallbackMascotState = 'happy',
  fallbackTitle,
  fallbackSubtitle,
  className = '',
  overlayContent,
  children,
  border = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const hasValidImage = Boolean(src && !imageError);

  const aspectClass = ASPECT_RATIO_CLASSES[aspectRatio] || '';
  const roundedClass = ROUNDED_CLASSES[rounded] || 'rounded-3xl';
  const fitClass = FIT_MODE_CLASSES[fitMode] || 'object-cover';
  const borderClass = border ? 'border border-[#BFDBFE]/70' : '';

  return (
    <div
      className={`relative w-full overflow-hidden ${aspectClass} ${roundedClass} ${borderClass} ${className}`}
      data-visual-slot="true"
    >
      {hasValidImage ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImageError(true)}
          className={`w-full h-full block ${fitClass}`}
          loading="lazy"
        />
      ) : (
        /* Subtle Temporary Placeholder (Soft Sky/Cream Surface matching Speak Velvet identity) */
        <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFD] to-[#FEF3C7]/40 flex flex-col items-center justify-center p-4 text-center select-none relative">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute w-32 h-32 rounded-full bg-[#DBEAFE]/60 blur-xl -z-1" />

          {/* Velvet Mascot SVG Placeholder */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <VelvetMascot
              state={fallbackMascotState}
              size="md"
              animated={true}
            />

            {(fallbackTitle || fallbackSubtitle) && (
              <div className="max-w-xs space-y-0.5">
                {fallbackTitle && (
                  <span className="font-display font-bold text-xs text-[#0F172A] block leading-tight">
                    {fallbackTitle}
                  </span>
                )}
                {fallbackSubtitle && (
                  <span className="text-[10px] text-[#64748B] block leading-snug">
                    {fallbackSubtitle}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Optional Overlay Content (Floating Badge, Speech Bubble, or Children) */}
      {overlayContent && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {overlayContent}
        </div>
      )}

      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};
