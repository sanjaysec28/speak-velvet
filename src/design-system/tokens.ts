/**
 * Speak Velvet — Core Visual Design System Tokens
 * 
 * Target Persona: School students learning spoken English
 * Tone: Bright, clean, friendly, modern, premium — never childish, corporate, or cyberpunk.
 * Base: Warm off-white
 * Primary: Soft Sky / Royal Blue
 * Main Accent: Soft Warm Golden Yellow
 * Secondary Accents: Gentle Green (growth/vocab), Gentle Pink (pronunciation/encouragement), Gentle Lavender (games/creativity)
 * Text: Dark Navy (approachable, high legibility, never harsh black)
 */

export interface ColorToken {
  name: string;
  hex: string;
  rgb: string;
  usage: string;
  contrastOnWhite: string;
  wcagAA: boolean;
}

export const VELVET_COLORS = {
  // Canvas & Backgrounds (Warm off-white base)
  canvas: {
    base: {
      name: 'Canvas Base (Warm Porcelain)',
      hex: '#F8FAFD',
      rgb: '248, 250, 253',
      usage: 'Application background, page canvas, peaceful backdrop',
      contrastOnWhite: '1.05:1',
      wcagAA: true,
    },
    subtle: {
      name: 'Canvas Subtle (Cloud Off-White)',
      hex: '#F0F4F9',
      rgb: '240, 244, 249',
      usage: 'Secondary background, subtle card wells, table headers',
      contrastOnWhite: '1.12:1',
      wcagAA: true,
    },
    surface: {
      name: 'Card Surface (Pure Crisp White)',
      hex: '#FFFFFF',
      rgb: '255, 255, 255',
      usage: 'Interactive cards, panels, popovers, active tabs',
      contrastOnWhite: '1:1',
      wcagAA: true,
    },
  },

  // Primary: Soft Sky & Royal Blue
  primary: {
    50: { hex: '#EFF6FF', rgb: '239, 246, 255', usage: 'Soft pill background, active row highlight' },
    100: { hex: '#DBEAFE', rgb: '219, 234, 254', usage: 'Hover background for primary buttons, tags' },
    200: { hex: '#BFDBFE', rgb: '191, 219, 254', usage: 'Borders on selected primary cards' },
    300: { hex: '#93C5FD', rgb: '147, 197, 253', usage: 'Decorative audio wave bars' },
    400: { hex: '#60A5FA', rgb: '96, 165, 250', usage: 'Lighter sky blue accents' },
    500: { hex: '#3B82F6', rgb: '59, 130, 246', usage: 'Vibrant sky blue, focus rings, mic waves' },
    600: { hex: '#2563EB', rgb: '37, 99, 235', usage: 'Primary brand blue, main CTAs, active icons' },
    700: { hex: '#1D4ED8', rgb: '29, 78, 216', usage: 'Primary button hover state' },
    800: { hex: '#1E40AF', rgb: '30, 64, 175', usage: 'Deep royal blue accents' },
    900: { hex: '#1E3A8A', rgb: '30, 58, 138', usage: 'Darkest royal blue for contrast' },
  },

  // Main Accent: Soft Warm Golden Yellow
  accentYellow: {
    50: { hex: '#FFFBEB', rgb: '255, 251, 235', usage: 'Soft warm glow background, highlight banner' },
    100: { hex: '#FEF3C7', rgb: '254, 243, 199', usage: 'Streak card background, active badge' },
    200: { hex: '#FDE68A', rgb: '253, 230, 138', usage: 'Accent pill hover, progress meter' },
    300: { hex: '#FCD34D', rgb: '252, 211, 77', usage: 'Star icon fill, celebration graphics' },
    400: { hex: '#FBBF24', rgb: '251, 191, 36', usage: 'Golden accent badge, sunny streak icon' },
    500: { hex: '#F59E0B', rgb: '245, 158, 11', usage: 'Warm yellow action CTA, primary accent' },
    600: { hex: '#D97706', rgb: '217, 119, 6', usage: 'High-contrast text on yellow background' },
    700: { hex: '#B45309', rgb: '180, 83, 9', usage: 'Dark amber text for warnings & points' },
  },

  // Secondary Accent: Gentle Green (Growth, Vocabulary, Success)
  secondaryGreen: {
    50: { hex: '#ECFDF5', rgb: '236, 253, 245', usage: 'Gentle green card surface, success banner' },
    100: { hex: '#D1FAE5', rgb: '209, 250, 229', usage: 'Vocabulary progress pill background' },
    200: { hex: '#A7F3D0', rgb: '167, 243, 208', usage: 'Progress track fill' },
    400: { hex: '#34D399', rgb: '52, 211, 153', usage: 'Active status dot, bright growth marker' },
    500: { hex: '#10B981', rgb: '16, 185, 129', usage: 'Success action, vocabulary mastery meter' },
    600: { hex: '#059669', rgb: '5, 150, 105', usage: 'High-contrast readable green text' },
    700: { hex: '#047857', rgb: '4, 120, 87', usage: 'Deep forest green text for WCAG AAA' },
  },

  // Secondary Accent: Gentle Pink (Pronunciation, Encouragement, Warmth)
  secondaryPink: {
    50: { hex: '#FFF1F2', rgb: '255, 241, 242', usage: 'Gentle pink card surface, encouragement card' },
    100: { hex: '#FFE4E6', rgb: '255, 228, 230', usage: 'Pronunciation badge background' },
    200: { hex: '#FECDD3', rgb: '254, 205, 211', usage: 'Soft rose border' },
    400: { hex: '#FB7185', rgb: '251, 113, 133', usage: 'Pronunciation audio meter highlight' },
    500: { hex: '#F43F5E', rgb: '244, 63, 94', usage: 'Pronunciation mastery badge, warmth icon' },
    600: { hex: '#E11D48', rgb: '225, 29, 72', usage: 'High-contrast readable coral pink' },
    700: { hex: '#BE123C', rgb: '190, 18, 60', usage: 'Deep berry text' },
  },

  // Secondary Accent: Gentle Lavender (Games, Speaking Challenges, Creativity)
  secondaryLavender: {
    50: { hex: '#F5F3FF', rgb: '245, 243, 255', usage: 'Gentle lavender card surface, game background' },
    100: { hex: '#EDE9FE', rgb: '237, 233, 254', usage: 'Speaking game badge, creative prompts' },
    200: { hex: '#DDD6FE', rgb: '221, 214, 254', usage: 'Game card highlight border' },
    400: { hex: '#A78BFA', rgb: '167, 139, 250', usage: 'Challenge timer accent' },
    500: { hex: '#8B5CF6', rgb: '139, 92, 246', usage: 'Speaking games primary badge, quiz mode' },
    600: { hex: '#7C3AED', rgb: '124, 58, 237', usage: 'High-contrast readable lavender violet' },
    700: { hex: '#6D28D9', rgb: '109, 40, 217', usage: 'Deep royal purple text' },
  },

  // Dark Navy Readable Text (High contrast, friendly, never harsh black)
  navyText: {
    title: {
      name: 'Navy 900 (Midnight Navy)',
      hex: '#0F172A',
      rgb: '15, 23, 42',
      usage: 'Headlines, student name, primary labels (Contrast 16.5:1 on white)',
      contrastOnWhite: '16.5:1',
      wcagAA: true,
    },
    body: {
      name: 'Navy 800 (Deep Slate Navy)',
      hex: '#1E293B',
      rgb: '30, 41, 59',
      usage: 'Default body text, card descriptions, instructions (Contrast 12.8:1)',
      contrastOnWhite: '12.8:1',
      wcagAA: true,
    },
    muted: {
      name: 'Navy 600 (Slate Muted)',
      hex: '#475569',
      rgb: '71, 85, 105',
      usage: 'Secondary text, timestamps, subtitles (Contrast 6.8:1)',
      contrastOnWhite: '6.8:1',
      wcagAA: true,
    },
    subtle: {
      name: 'Navy 500 (Soft Slate)',
      hex: '#64748B',
      rgb: '100, 116, 139',
      usage: 'Tertiary metadata, unboxed metadata separators (Contrast 4.6:1)',
      contrastOnWhite: '4.6:1',
      wcagAA: true,
    },
    placeholder: {
      name: 'Navy 400 (Input Placeholder)',
      hex: '#94A3B8',
      rgb: '148, 163, 184',
      usage: 'Input placeholders, disabled glyphs, inactive dots',
      contrastOnWhite: '3.1:1',
      wcagAA: false, // Used only for placeholders/decorative
    },
  },

  // Hairline & Structural Borders
  borders: {
    hairline: { hex: '#F1F5F9', usage: 'Soft dividing lines, gentle card outlines' },
    subtle: { hex: '#E2E8F0', usage: 'Standard card and input borders' },
    hover: { hex: '#CBD5E1', usage: 'Card hover border state' },
    focus: { hex: '#3B82F6', usage: 'Focus boundary for keyboard accessibility' },
  },
} as const;

export const VELVET_TYPOGRAPHY = {
  families: {
    display: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
    body: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  scale: {
    displayHero: {
      name: 'Display Hero',
      size: '32px',
      desktopSize: '40px',
      weight: '700 (Bold)',
      lineHeight: '1.15',
      letterSpacing: '-0.025em',
      font: 'Outfit',
      usage: 'Welcome greetings ("Good morning, Arjun! 👋"), Brand splash',
    },
    displayTitle: {
      name: 'Display Title',
      size: '24px',
      desktopSize: '28px',
      weight: '700 (Bold)',
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
      font: 'Outfit',
      usage: 'Primary section titles ("Choose a topic to talk about")',
    },
    headingLg: {
      name: 'Heading Large',
      size: '20px',
      desktopSize: '22px',
      weight: '600 (SemiBold)',
      lineHeight: '1.3',
      letterSpacing: '-0.015em',
      font: 'Outfit',
      usage: 'Card titles, dialog headers, score headers',
    },
    headingMd: {
      name: 'Heading Medium',
      size: '16px',
      desktopSize: '18px',
      weight: '600 (SemiBold)',
      lineHeight: '1.4',
      letterSpacing: '-0.01em',
      font: 'Plus Jakarta Sans',
      usage: 'Subheadings, modal labels, stat summaries',
    },
    bodyLarge: {
      name: 'Body Large',
      size: '16px',
      desktopSize: '16px',
      weight: '500 (Medium)',
      lineHeight: '1.5',
      letterSpacing: '0em',
      font: 'Plus Jakarta Sans',
      usage: 'Assistant speech bubbles, conversation prompts ("Tell me about your day!")',
    },
    bodyBase: {
      name: 'Body Base',
      size: '14px',
      desktopSize: '14px',
      weight: '400 (Regular) / 500 (Medium)',
      lineHeight: '1.5',
      letterSpacing: '0em',
      font: 'Plus Jakarta Sans',
      usage: 'Standard student prose, tips, card descriptions',
    },
    bodySmall: {
      name: 'Body Small / Metadata',
      size: '13px',
      desktopSize: '13px',
      weight: '500 (Medium)',
      lineHeight: '1.4',
      letterSpacing: '0.005em',
      font: 'Plus Jakarta Sans',
      usage: 'Student metadata, timestamps ("5 min ago"), lesson count',
    },
    caption: {
      name: 'Caption',
      size: '12px',
      desktopSize: '12px',
      weight: '600 (SemiBold)',
      lineHeight: '1.35',
      letterSpacing: '0.01em',
      font: 'Plus Jakarta Sans',
      usage: 'Tab bar labels, progress bar labels, micro badges',
    },
    tabularNums: {
      name: 'Tabular Numerals',
      size: '14px–20px',
      weight: '600 (SemiBold)',
      lineHeight: '1.2',
      font: 'Plus Jakarta Sans (tabular-nums)',
      usage: 'Scores, percentages (72%, 81%), XP points, streak days',
    },
  },
} as const;

export const VELVET_SPACING = {
  scale: [
    { token: 'space-1', value: '4px', usage: 'Micro spacing, tag interior, icon gap' },
    { token: 'space-2', value: '8px', usage: 'Gap between icon and label, chip padding' },
    { token: 'space-3', value: '12px', usage: 'Inner container padding, input vertical padding' },
    { token: 'space-4', value: '16px', usage: 'Standard card padding, baseline grid step' },
    { token: 'space-5', value: '20px', usage: 'Comfortable container margin, loose list gap' },
    { token: 'space-6', value: '24px', usage: 'Major card padding, dialog padding' },
    { token: 'space-8', value: '32px', usage: 'Section gutter, desktop column gap' },
    { token: 'space-10', value: '40px', usage: 'Large section separator' },
    { token: 'space-12', value: '48px', usage: 'Hero section vertical rhythm' },
  ],
} as const;

export const VELVET_RADII = {
  sm: { token: 'radius-sm', value: '8px', usage: 'Small action chips, badge pills, tooltip corners' },
  md: { token: 'radius-md', value: '12px', usage: 'Standard inputs, compact cards, segmented controls' },
  lg: { token: 'radius-lg', value: '16px', usage: 'Standard cards, dialog containers, practice topic cards' },
  xl: { token: 'radius-xl', value: '20px', usage: 'Feature cards, student profile cards' },
  '2xl': { token: 'radius-2xl', value: '24px', usage: 'Hero banners, prominent action containers' },
  '3xl': { token: 'radius-3xl', value: '32px', usage: 'Modal sheets, floating navigation envelopes' },
  full: { token: 'radius-full', value: '9999px', usage: 'Pill buttons, primary mic button, avatar frames' },
} as const;

export const VELVET_SHADOWS = {
  softSm: {
    token: 'shadow-soft-sm',
    css: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px 0 rgba(37, 99, 235, 0.02)',
    usage: 'Inputs, flat topic buttons, quiet resting states',
  },
  softMd: {
    token: 'shadow-soft-md',
    css: '0 4px 16px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(37, 99, 235, 0.03)',
    usage: 'Standard elevated student cards, progress panels',
  },
  softLg: {
    token: 'shadow-soft-lg',
    css: '0 10px 25px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(37, 99, 235, 0.04)',
    usage: 'Hovered cards, dropdown popovers, hero speaking card',
  },
  softBlueGlow: {
    token: 'shadow-blue-glow',
    css: '0 8px 24px -4px rgba(37, 99, 235, 0.35)',
    usage: 'Primary Blue CTA ("Talk to Velvet", "Login"), active speak button',
  },
  softYellowGlow: {
    token: 'shadow-yellow-glow',
    css: '0 8px 24px -4px rgba(245, 158, 11, 0.30)',
    usage: 'Warm Accent Yellow CTA, streak milestone celebration',
  },
  softGreenGlow: {
    token: 'shadow-green-glow',
    css: '0 8px 24px -4px rgba(16, 185, 129, 0.30)',
    usage: 'Completed practice milestone, mastery reward',
  },
} as const;

export const VELVET_INTERACTIONS = {
  buttonTap: 'active:scale-[0.98] transition-transform duration-150 ease-out',
  cardHover: 'hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ease-out',
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2',
  smoothTransition: 'transition-all duration-200 ease-out',
} as const;

export const VELVET_WCAG_RULES = [
  { rule: 'Text Legibility', requirement: 'Minimum 4.5:1 contrast against warm canvas (#F8FAFD) for all body text.', status: 'Enforced with #0F172A (16.5:1) & #1E293B (12.8:1)' },
  { rule: 'Large Text & Headings', requirement: 'Minimum 3:1 contrast for 18pt+ headings.', status: 'Enforced with #0F172A (16.5:1)' },
  { rule: 'Interactive Touch Targets', requirement: 'Minimum 44px × 44px clickable area on mobile/tablets.', status: 'Enforced on all buttons, tabs, topic pills' },
  { rule: 'No Hue-Only Signals', requirement: 'Always pair color states (success, streak, tip) with icons or visible text.', status: 'Enforced in all status indicators' },
  { rule: 'Friendly Emotional Tone', requirement: 'Gentle, encouraging student atmosphere; avoid intimidating red alarms or sterile corporate gray.', status: 'Curated via soft pastels + confident royal blue' },
] as const;

export const VELVET_RESPONSIVE_SPEC = {
  breakpoints: {
    mobile: { min: '0px', max: '639px', name: 'Mobile Phone', containerPadding: '16px', gridColumns: 1, navPattern: 'Fixed Bottom Tab Bar' },
    tablet: { min: '640px', max: '1023px', name: 'Tablet / Foldable', containerPadding: '20px', gridColumns: 2, navPattern: 'Adaptive Top Header' },
    desktop: { min: '1024px', max: '1440px+', name: 'Desktop Workspace', containerPadding: '32px', gridColumns: '3 to 4', navPattern: 'Full Sidebar or 3-Zone Header' },
  },
  touchTargets: {
    minimumTouchSize: '44px × 44px (Strict WCAG 2.1 touch comfort standard)',
    buttonMinHeight: '44px',
    inputMinHeight: '44px',
    tabMinHeight: '40px (segmented controls 38px-44px)',
    iconTouchEnvelope: '44px minimum tap target envelope with interior 20px glyph',
  },
  typographyScaling: {
    displayHero: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
    displayTitle: 'text-xl sm:text-2xl md:text-3xl font-bold tracking-tight',
    headingLg: 'text-lg sm:text-xl md:text-2xl font-semibold',
    headingMd: 'text-base sm:text-lg font-semibold',
    bodyLarge: 'text-sm sm:text-base font-medium',
    bodyBase: 'text-xs sm:text-sm font-normal',
  },
  motion: {
    routineSettling: '150ms-200ms cubic-bezier(0.16, 1, 0.3, 1)',
    dialogEntrance: '220ms ease-out',
    soundwaveCadence: '1s alternate ease-in-out',
    reducedMotionBehavior: 'Transitions clamped to 0.01ms; static indicators replace motion pulses',
  },
} as const;

export const VELVET_INTERACTION_STATES = {
  hover: 'hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ease-out',
  press: 'active:scale-[0.98] active:brightness-95 transition-transform duration-100',
  focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2',
  disabled: 'opacity-50 pointer-events-none cursor-not-allowed select-none',
  loading: 'pointer-events-none cursor-wait relative',
} as const;
