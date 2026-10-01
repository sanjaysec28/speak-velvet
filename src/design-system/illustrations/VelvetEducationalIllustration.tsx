import React from 'react';

export type EducationalIllustrationType = 
  | 'school-hall'
  | 'conversation-mic'
  | 'daily-streak-flame'
  | 'vocabulary-book'
  | 'pronunciation-audio'
  | 'speaking-trophy'
  | 'confidence-compass'
  | 'scenario-restaurant';

export interface VelvetEducationalIllustrationProps {
  type: EducationalIllustrationType;
  size?: number; // pixel width/height (default 120)
  className?: string;
}

export const VelvetEducationalIllustration: React.FC<VelvetEducationalIllustrationProps> = ({
  type,
  size = 120,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="illBlueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="illGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="illGreenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="illPinkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
        </defs>

        {/* 1. School Hall Illustration (Vivekanandha School Clock Tower Motif) */}
        {type === 'school-hall' && (
          <g>
            {/* Background Daylight Aura */}
            <circle cx="80" cy="80" r="70" fill="#EFF6FF" />
            <circle cx="80" cy="80" r="54" fill="#DBEAFE" opacity="0.6" />
            
            {/* Main School Building */}
            <rect x="36" y="86" width="88" height="50" rx="8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            
            {/* Clock Tower Center */}
            <rect x="64" y="44" width="32" height="42" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            
            {/* Tower Roof Pyramid */}
            <path d="M60 44 L80 18 L100 44 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
            
            {/* School Clock */}
            <circle cx="80" cy="58" r="9" fill="#FEF3C7" stroke="#0F172A" strokeWidth="2" />
            <line x1="80" y1="58" x2="80" y2="52" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="80" y1="58" x2="84" y2="58" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />

            {/* School Entrance Arch */}
            <path d="M72 136 V116 C72 110 88 110 88 116 V136 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="2" />

            {/* Windows */}
            <rect x="44" y="98" width="12" height="14" rx="3" fill="#BFDBFE" stroke="#0F172A" strokeWidth="1.8" />
            <rect x="104" y="98" width="12" height="14" rx="3" fill="#BFDBFE" stroke="#0F172A" strokeWidth="1.8" />

            {/* Decorative Sunshine Sparks */}
            <circle cx="28" cy="40" r="3" fill="#F59E0B" />
            <circle cx="132" cy="36" r="2.5" fill="#F59E0B" />
          </g>
        )}

        {/* 2. Conversation Microphone */}
        {type === 'conversation-mic' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#EFF6FF" />
            <circle cx="80" cy="80" r="50" fill="#DBEAFE" opacity="0.6" />

            {/* Radiating Sound Waves */}
            <path d="M124 55 Q136 80 124 105" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M136 46 Q154 80 136 114" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M36 55 Q24 80 36 105" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
            <path d="M24 46 Q6 80 24 114" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />

            {/* Microphone Body */}
            <rect x="65" y="40" width="30" height="52" rx="15" fill="url(#illBlueGrad)" stroke="#0F172A" strokeWidth="2.5" />
            
            {/* Mic Grille Texture */}
            <line x1="72" y1="52" x2="88" y2="52" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="72" y1="62" x2="88" y2="62" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="72" y1="72" x2="88" y2="72" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

            {/* Mic Cradle */}
            <path d="M54 74 C54 94 65 106 80 106 C95 106 106 94 106 74" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            
            {/* Stand Base */}
            <line x1="80" y1="106" x2="80" y2="124" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            <path d="M60 126 C60 122 100 122 100 126 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
          </g>
        )}

        {/* 3. Daily Streak Flame */}
        {type === 'daily-streak-flame' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#FFFBEB" />
            
            {/* Outer Flame Glow */}
            <path
              d="M80 24 C80 24 108 58 108 88 C108 114 94 128 80 128 C66 128 52 114 52 88 C52 64 74 44 80 24 Z"
              fill="url(#illGoldGrad)"
              stroke="#0F172A"
              strokeWidth="2.5"
            />

            {/* Inner Core Flame */}
            <path
              d="M80 56 C80 56 94 76 94 94 C94 110 88 118 80 118 C72 118 66 110 66 94 C66 80 76 68 80 56 Z"
              fill="#FFFFFF"
            />

            {/* Milestone Star in Center */}
            <path
              d="M80 82 L82 87 L87 88 L83 92 L84 97 L80 94 L76 97 L77 92 L73 88 L78 87 Z"
              fill="#F59E0B"
            />

            {/* Floating Sparks */}
            <circle cx="44" cy="52" r="3" fill="#F59E0B" />
            <circle cx="118" cy="48" r="3.5" fill="#FBBF24" />
          </g>
        )}

        {/* 4. Vocabulary Book */}
        {type === 'vocabulary-book' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#ECFDF5" />
            
            {/* Open Book Pages */}
            <path
              d="M32 60 C56 56 76 66 80 70 C84 66 104 56 128 60 L128 116 C104 112 84 122 80 124 C76 122 56 112 32 116 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Center Spine */}
            <line x1="80" y1="70" x2="80" y2="124" stroke="#0F172A" strokeWidth="2" />

            {/* Book Lines (Left) */}
            <line x1="42" y1="76" x2="68" y2="74" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="86" x2="68" y2="84" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="96" x2="62" y2="94" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />

            {/* Book Lines (Right) */}
            <line x1="92" y1="74" x2="118" y2="76" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="84" x2="118" y2="86" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
            <line x1="92" y1="94" x2="112" y2="96" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />

            {/* Sprouting Growth Leaf (Vocabulary Mastery) */}
            <path
              d="M80 66 C72 52 70 36 84 32 C86 46 84 58 80 66 Z"
              fill="url(#illGreenGrad)"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </g>
        )}

        {/* 5. Pronunciation Audio Speaker */}
        {type === 'pronunciation-audio' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#FFF1F2" />
            
            {/* Speaker Cone */}
            <path
              d="M48 66 H62 L82 48 V112 L62 94 H48 Z"
              fill="url(#illPinkGrad)"
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Coral Sound Arcs */}
            <path d="M96 66 Q106 80 96 94" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
            <path d="M108 56 Q122 80 108 104" stroke="#FB7185" strokeWidth="3" strokeLinecap="round" />
            <path d="M120 46 Q138 80 120 114" stroke="#FECDD3" strokeWidth="2.5" strokeLinecap="round" />

            {/* Accent Spark */}
            <circle cx="128" cy="40" r="3" fill="#F43F5E" />
          </g>
        )}

        {/* 6. Speaking Trophy */}
        {type === 'speaking-trophy' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#FFFBEB" />

            {/* Trophy Cup */}
            <path
              d="M52 46 H108 V78 C108 94 96 104 80 104 C64 104 52 94 52 78 Z"
              fill="url(#illGoldGrad)"
              stroke="#0F172A"
              strokeWidth="2.5"
            />

            {/* Trophy Handles */}
            <path d="M52 54 C38 54 38 74 52 74" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M108 54 C122 54 122 74 108 74" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />

            {/* Stem & Pedestal Base */}
            <rect x="74" y="104" width="12" height="16" fill="#0F172A" />
            <rect x="58" y="120" width="44" height="12" rx="3" fill="#2563EB" stroke="#0F172A" strokeWidth="2" />

            {/* Star on Cup */}
            <path
              d="M80 62 L82 67 L87 68 L83 72 L84 77 L80 74 L76 77 L77 72 L73 68 L78 67 Z"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* 7. Confidence Compass */}
        {type === 'confidence-compass' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#EFF6FF" />
            <circle cx="80" cy="80" r="48" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            
            {/* Cardinal Marks */}
            <line x1="80" y1="36" x2="80" y2="42" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <line x1="80" y1="118" x2="80" y2="124" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <line x1="36" y1="80" x2="42" y2="80" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <line x1="118" y1="80" x2="124" y2="80" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

            {/* Compass Needle (Pointing North / Growth) */}
            <polygon points="80,46 88,80 80,74" fill="#2563EB" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="80,46 72,80 80,74" fill="#60A5FA" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="80,114 88,80 80,86" fill="#E2E8F0" stroke="#0F172A" strokeWidth="1.5" />
            <polygon points="80,114 72,80 80,86" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1.5" />

            {/* Center Pivot */}
            <circle cx="80" cy="80" r="4" fill="#0F172A" />
          </g>
        )}

        {/* 8. Real Life Scenario Restaurant / Cafe Table */}
        {type === 'scenario-restaurant' && (
          <g>
            <circle cx="80" cy="80" r="68" fill="#FFFBEB" />

            {/* Restaurant Menu / Order Card */}
            <rect x="44" y="60" width="28" height="42" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="50" y1="70" x2="66" y2="70" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="78" x2="62" y2="78" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="86" x2="66" y2="86" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />

            {/* Friendly Burger / Meal Plate */}
            <ellipse cx="104" cy="98" rx="24" ry="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            
            {/* Top Bun */}
            <path d="M90 84 C90 74 118 74 118 84 Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
            {/* Lettuce */}
            <path d="M88 84 Q94 88 100 84 Q106 88 112 84 Q118 88 120 84" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            {/* Bottom Bun */}
            <rect x="91" y="88" width="26" height="6" rx="3" fill="#F59E0B" stroke="#0F172A" strokeWidth="1.5" />

            {/* Speech Bubble: "Order food in English!" */}
            <circle cx="120" cy="46" r="3" fill="#2563EB" />
          </g>
        )}
      </svg>
    </div>
  );
};
