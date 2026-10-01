/**
 * Speak Velvet Central Visual Asset Registry
 *
 * This central registry maps each screen to its dedicated mobile & desktop visual slots.
 * When custom artwork is added to any folder (e.g. src/assets/speak-velvet/home/hero-mobile.png),
 * simply place the asset and reference it here. All screens read from this registry.
 */

import loginMobileArtwork from './login/login-mobile.png';

export interface VisualAssetSlotConfig {
  src?: string;
  alt: string;
  aspectRatio: '9:16' | '16:9' | '4:3' | '1:1' | '3:4' | 'auto';
  fitMode: 'cover' | 'contain' | 'fill';
  fallbackDescription: string;
}

export const SPEAK_VELVET_ASSETS = {
  login: {
    heroPortrait: {
      src: loginMobileArtwork,
      alt: 'Speak Velvet - Your Speaking Companion by Vivekanandha School',
      aspectRatio: '9:16' as const,
      fitMode: 'contain' as const,
      fallbackDescription: 'Cheerful student Arjun waving in front of Vivekanandha School with Speak Velvet logo',
    },
  },
  home: {
    heroWelcome: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/home/hero-mobile.png
      alt: "Velvet welcoming Arjun to today's English practice",
      aspectRatio: '16:9' as const,
      fitMode: 'cover' as const,
      fallbackDescription: 'Velvet welcoming student for daily practice routine',
    },
  },
  conversation: {
    companionVisual: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/conversation/conversation-mobile.png
      alt: 'Velvet listening and conversing with student',
      aspectRatio: '1:1' as const,
      fitMode: 'contain' as const,
      fallbackDescription: 'Velvet voice listening and speaking interaction visual',
    },
  },
  topics: {
    libraryHero: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/topics/topics-mobile.png
      alt: 'Speak Velvet Practice Library topics and scenarios',
      aspectRatio: '16:9' as const,
      fitMode: 'cover' as const,
      fallbackDescription: 'Practice library exploration banner',
    },
  },
  progress: {
    growthCelebration: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/progress/progress-mobile.png
      alt: "Arjun's spoken English growth and streak journey",
      aspectRatio: '16:9' as const,
      fitMode: 'cover' as const,
      fallbackDescription: 'Speaking streak and skills growth visual',
    },
  },
  profile: {
    avatarHero: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/profile/profile-mobile.png
      alt: 'Arjun Sundararajan student speaker profile',
      aspectRatio: '1:1' as const,
      fitMode: 'contain' as const,
      fallbackDescription: 'Student profile companion avatar artwork',
    },
  },
  onboarding: {
    welcomeStep: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/onboarding/welcome-mobile.png
      alt: 'Welcome to Speak Velvet onboarding',
      aspectRatio: '4:3' as const,
      fitMode: 'contain' as const,
      fallbackDescription: 'First-time onboarding greeting visual',
    },
  },
  sessionComplete: {
    celebrationBanner: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/session-complete/celebration-mobile.png
      alt: 'Velvet celebrating completed practice session',
      aspectRatio: '16:9' as const,
      fitMode: 'contain' as const,
      fallbackDescription: 'Session completed celebration illustration',
    },
  },
  practiceInsights: {
    coachRecommendation: {
      src: undefined as string | undefined, // Ready for src/assets/speak-velvet/practice-insights/insights-mobile.png
      alt: 'Velvet smart practice recommendations',
      aspectRatio: '16:9' as const,
      fitMode: 'cover' as const,
      fallbackDescription: 'Personalized practice recommendations coach banner',
    },
  },
};
