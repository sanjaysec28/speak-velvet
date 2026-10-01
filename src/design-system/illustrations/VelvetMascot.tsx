import React from 'react';

export type MascotState = 'listening' | 'speaking' | 'thinking' | 'happy' | 'encouraging' | 'celebration';
export type MascotSize = 'sm' | 'md' | 'lg' | 'hero';

export interface VelvetMascotProps {
  state?: MascotState;
  size?: MascotSize;
  animated?: boolean;
  speechText?: string;
  showSpeechBubble?: boolean;
  className?: string;
}

export const VelvetMascot: React.FC<VelvetMascotProps> = ({
  state = 'happy',
  size = 'md',
  animated = true,
  speechText,
  showSpeechBubble = false,
  className = '',
}) => {
  const pixelSizes: Record<MascotSize, number> = {
    sm: 44,
    md: 92,
    lg: 148,
    hero: 220,
  };

  const px = pixelSizes[size];

  return (
    <div className={`relative inline-flex items-center gap-3 select-none ${className}`}>
      
      {/* Speech Bubble (if requested) */}
      {showSpeechBubble && speechText && (
        <div className="relative max-w-xs p-3.5 rounded-2xl bg-white border border-[#BFDBFE] shadow-[0_4px_16px_rgba(37,99,235,0.08)] text-[#0F172A] z-10 animate-fade-in">
          <p className="text-xs md:text-sm font-semibold leading-relaxed">
            {speechText}
          </p>
          {/* Speech bubble tail pointing to mascot */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[9px] border-l-[#BFDBFE] -z-1" />
        </div>
      )}

      {/* Mascot Vector Graphics Stage */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: px, height: px }}
      >
        <svg
          viewBox="0 0 200 200"
          width={px}
          height={px}
          className={`w-full h-full overflow-visible transition-transform duration-300 ${
            animated && state === 'listening' ? 'animate-[svBreathe_3s_ease-in-out_infinite]' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Ambient Shadow Filter */}
            <filter id="velvetShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.08" />
            </filter>
            {/* Hoodie Gradient */}
            <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            {/* Golden Star Glow */}
            <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ======================================================== */}
          {/* BACKGROUND DECORATIVE ACCENTS BASED ON STATE */}
          {/* ======================================================== */}

          {/* Active Listening Blue Soundwaves */}
          {state === 'listening' && (
            <g className={animated ? 'animate-pulse' : ''}>
              <circle cx="100" cy="95" r="88" stroke="#DBEAFE" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.7" />
              <path d="M165 80 Q180 95 165 110" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              <path d="M175 72 Q194 95 175 118" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M35 80 Q20 95 35 110" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            </g>
          )}

          {/* Companion Speaking Sound Pulses */}
          {state === 'speaking' && (
            <g className={animated ? 'animate-pulse' : ''}>
              <path d="M152 75 Q168 85 152 95" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              <path d="M162 68 Q182 85 162 102" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="168" cy="62" r="3" fill="#F59E0B" />
            </g>
          )}

          {/* Thinking Lightbulb / Sparkle */}
          {state === 'thinking' && (
            <g transform="translate(138, 20)">
              <circle cx="12" cy="12" r="16" fill="url(#starGlow)" />
              {/* Spark Icon */}
              <path d="M12 2 L14 9 L21 11 L14 13 L12 20 L10 13 L3 11 L10 9 Z" fill="#F59E0B" />
              <circle cx="2" cy="22" r="2" fill="#FBBF24" />
              <circle cx="22" cy="4" r="1.5" fill="#FBBF24" />
            </g>
          )}

          {/* Celebration Stars & Confetti */}
          {state === 'celebration' && (
            <g>
              {/* Golden Stars */}
              <path d="M40 35 L42 41 L48 43 L42 45 L40 51 L38 45 L32 43 L38 41 Z" fill="#F59E0B" />
              <path d="M160 30 L162 36 L168 38 L162 40 L160 46 L158 40 L152 38 L158 36 Z" fill="#FBBF24" />
              <path d="M175 65 L176 69 L180 70 L176 71 L175 75 L174 71 L170 70 L174 69 Z" fill="#10B981" />
              <circle cx="30" cy="70" r="3" fill="#F43F5E" />
              <circle cx="145" cy="20" r="2.5" fill="#8B5CF6" />
              <circle cx="55" cy="22" r="2" fill="#3B82F6" />
            </g>
          )}

          {/* Encouraging Green Thumbs Spark */}
          {state === 'encouraging' && (
            <g transform="translate(150, 48)">
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="#10B981" />
            </g>
          )}

          {/* ======================================================== */}
          {/* BODY & ROYAL BLUE HOODIE */}
          {/* ======================================================== */}
          <g filter="url(#velvetShadow)">
            {/* Shoulder Base */}
            <path
              d="M48 152 C48 136 68 130 100 130 C132 130 152 136 152 152 L158 195 C158 198 155 200 152 200 L48 200 C45 200 42 198 42 195 Z"
              fill="url(#hoodieGrad)"
            />

            {/* Crisp White Inner Collar / Undershirt */}
            <path
              d="M84 130 L100 154 L116 130 C110 128 90 128 84 130 Z"
              fill="#FFFFFF"
            />

            {/* Signature White "V" Emblem for Velvet / Vivekanandha */}
            <path
              d="M93 158 L100 172 L107 158 L111 158 L102 176 C101 178 99 178 98 176 L89 158 Z"
              fill="#FFFFFF"
            />

            {/* Hoodie Pocket Seam / Zipper Accent */}
            <line x1="100" y1="178" x2="100" y2="198" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Encouraging Hand Gesture (Thumbs Up) */}
          {state === 'encouraging' && (
            <g transform="translate(142, 134)" filter="url(#velvetShadow)">
              <rect x="0" y="8" width="18" height="22" rx="9" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
              {/* Upright Thumb */}
              <rect x="4" y="0" width="8" height="14" rx="4" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
            </g>
          )}

          {/* Celebration Hands Raised */}
          {state === 'celebration' && (
            <g>
              {/* Left Hand Raised */}
              <circle cx="38" cy="115" r="9" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
              {/* Right Hand Raised */}
              <circle cx="162" cy="115" r="9" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
            </g>
          )}

          {/* ======================================================== */}
          {/* HEAD & HAIR (WARM, FRIENDLY, MODERN STUDENT PERSONA) */}
          {/* ======================================================== */}

          {/* Ears with Audio Companion Earring */}
          <g>
            {/* Left Ear */}
            <circle cx="56" cy="96" r="10" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
            {/* Right Ear */}
            <circle cx="144" cy="96" r="10" fill="#FDDEC0" stroke="#0F172A" strokeWidth="2" />
            {/* Velvet Golden Ear Charm (Audio/Star motif) */}
            <circle cx="146" cy="102" r="3" fill="#F59E0B" />
          </g>

          {/* Face Base: Friendly Rounded Pebble */}
          <g filter="url(#velvetShadow)">
            <path
              d="M60 85 C60 52 76 44 100 44 C124 44 140 52 140 85 C140 114 126 128 100 128 C74 128 60 114 60 85 Z"
              fill="#FDDEC0"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>

          {/* Soft Rose Cheeks (Human Warmth) */}
          <ellipse cx="73" cy="98" rx="8" ry="5" fill="#FECDD3" opacity="0.8" />
          <ellipse cx="127" cy="98" rx="8" ry="5" fill="#FECDD3" opacity="0.8" />

          {/* ======================================================== */}
          {/* EYES & BROWS BASED ON STATE */}
          {/* ======================================================== */}
          <g>
            {/* HAPPY / CELEBRATION: Joyful Crescent Smiling Eyes (^^) */}
            {(state === 'happy' || state === 'celebration') && (
              <>
                <path d="M72 88 Q81 78 90 88" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M110 88 Q119 78 128 88" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
                {/* Brows */}
                <path d="M72 78 Q81 72 90 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M110 76 Q119 72 128 78" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* LISTENING: Focused, Attentive Wide Eyes with Dual Highlights */}
            {state === 'listening' && (
              <>
                {/* Left Eye */}
                <circle cx="81" cy="85" r="7.5" fill="#0F172A" />
                <circle cx="79" cy="83" r="2.5" fill="#FFFFFF" />
                <circle cx="83" cy="87" r="1.2" fill="#FFFFFF" />
                {/* Right Eye */}
                <circle cx="119" cy="85" r="7.5" fill="#0F172A" />
                <circle cx="117" cy="83" r="2.5" fill="#FFFFFF" />
                <circle cx="121" cy="87" r="1.2" fill="#FFFFFF" />
                {/* Attentive Brows */}
                <path d="M72 75 Q81 70 90 74" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M110 74 Q119 70 128 75" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* SPEAKING: Expressive Open Pupils */}
            {state === 'speaking' && (
              <>
                <circle cx="81" cy="85" r="7.5" fill="#0F172A" />
                <circle cx="79" cy="83" r="2.5" fill="#FFFFFF" />
                <circle cx="119" cy="85" r="7.5" fill="#0F172A" />
                <circle cx="117" cy="83" r="2.5" fill="#FFFFFF" />
                {/* Lively Brows */}
                <path d="M72 74 Q81 68 90 73" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M110 73 Q119 68 128 74" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* THINKING: Pupils Looking Upward-Right */}
            {state === 'thinking' && (
              <>
                <circle cx="83" cy="81" r="7" fill="#0F172A" />
                <circle cx="82" cy="79" r="2" fill="#FFFFFF" />
                <circle cx="121" cy="81" r="7" fill="#0F172A" />
                <circle cx="120" cy="79" r="2" fill="#FFFFFF" />
                {/* Asymmetrical Brows (Contemplative) */}
                <path d="M72 74 Q81 72 90 76" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M110 70 Q119 66 128 72" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* ENCOURAGING: Gentle Kind Pupils */}
            {state === 'encouraging' && (
              <>
                <circle cx="81" cy="85" r="7" fill="#0F172A" />
                <circle cx="79" cy="83" r="2.5" fill="#FFFFFF" />
                <circle cx="119" cy="85" r="7" fill="#0F172A" />
                <circle cx="117" cy="83" r="2.5" fill="#FFFFFF" />
                {/* Supportive Brows */}
                <path d="M73 75 Q81 71 89 74" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M111 74 Q119 71 127 75" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>

          {/* ======================================================== */}
          {/* MOUTH BASED ON STATE */}
          {/* ======================================================== */}
          <g>
            {/* SPEAKING: Open Talking Mouth with Tongue & Teeth */}
            {state === 'speaking' && (
              <g>
                <path
                  d="M90 98 C90 98 94 112 100 112 C106 112 110 98 110 98 Z"
                  fill="#0F172A"
                  stroke="#0F172A"
                  strokeWidth="2"
                />
                {/* White Teeth Line */}
                <path d="M93 100 Q100 102 107 100" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                {/* Pink Tongue */}
                <path d="M95 109 Q100 106 105 109" fill="#F43F5E" />
              </g>
            )}

            {/* LISTENING: Gentle Closed Smile (Patient, Attentive) */}
            {state === 'listening' && (
              <path d="M92 102 Q100 107 108 102" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* THINKING: Small Pensive Mouth Curve */}
            {state === 'thinking' && (
              <path d="M94 104 Q100 105 106 102" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* HAPPY / ENCOURAGING / CELEBRATION: Wide Joyful Smile */}
            {(state === 'happy' || state === 'encouraging' || state === 'celebration') && (
              <path
                d="M88 98 Q100 114 112 98"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="#FFFFFF"
              />
            )}
          </g>

          {/* ======================================================== */}
          {/* HAIR (CLEAN, MODERN TOUSLED CUT IN DARK NAVY) */}
          {/* ======================================================== */}
          <g filter="url(#velvetShadow)">
            {/* Main Hair Volume */}
            <path
              d="M58 82 C54 62 68 36 98 34 C128 32 144 54 142 80 C140 70 134 50 118 46 C102 42 78 50 72 64 C68 54 62 68 58 82 Z"
              fill="#0F172A"
            />
            {/* Front Tousled Bangs Framing Forehead */}
            <path
              d="M62 64 C70 54 84 52 94 62 C102 52 118 52 126 66 C124 58 116 50 102 50 C88 50 74 54 62 64 Z"
              fill="#1E293B"
            />
            {/* Friendly Top Swoosh Lock */}
            <path
              d="M92 36 C92 24 108 26 112 34 C104 32 96 32 92 36 Z"
              fill="#0F172A"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
