import React, { useState } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetCircularProgress,
  VelvetStreakIndicator,
  VelvetMascot,
  VelvetAudioWave,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Mic,
  Clock,
  Sparkles,
  Flame,
  Award,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Trophy,
  History,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Radio,
  ChevronRight,
  Compass,
  Play,
  RotateCcw,
} from 'lucide-react';
import { AppTab } from '../components/AppShell.tsx';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface StudentHomeScreenProps {
  languageMode?: LanguageMode;
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  schoolName?: string;
  onOpenConversation: (topicId?: string) => void;
  onNavigateTab: (tab: AppTab) => void;
  onStartOnboarding?: () => void;
}

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({
  languageMode = 'en',
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  studentId = 'VS2026-001',
  schoolName = 'Vivekanandha School',
  onOpenConversation,
  onNavigateTab,
  onStartOnboarding,
}) => {
  // New student mode toggle for prototype demonstration
  const [isNewStudentMode, setIsNewStudentMode] = useState<boolean>(false);

  const firstName = studentName.split(' ')[0] || 'Arjun';

  // Bilingual strings
  const t = {
    greeting: languageMode === 'en_ta' ? 'இனிய காலை வணக்கம்' : 'Good morning',
    tagline:
      languageMode === 'en_ta'
        ? 'இன்றைய இலக்கில் நீங்கள் ஏற்கனவே 70% முடித்துவிட்டீர்கள். தொடர்ந்து பேசலாம்!'
        : "You're already 70% through today's goal. Let's keep going!",
    talkTitle: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பேசுங்கள்' : 'Talk with Velvet',
    talkSub:
      languageMode === 'en_ta'
        ? 'இயல்பாக ஆங்கிலத்தில் பேசுங்கள். வெல்வெட் அன்பாகக் கேட்டு, நீங்கள் நம்பிக்கையுடன் பேச உதவும்.'
        : 'Have a friendly voice conversation in English. Velvet listens patiently and helps you speak with confidence.',
    startTalkingCTA: languageMode === 'en_ta' ? 'பேச தொடங்குங்கள்' : 'Start Talking',
    continueHeading: languageMode === 'en_ta' ? 'விட்ட இடத்திலிருந்து தொடருங்கள்' : 'Continue where you left off',
    continueBtn: languageMode === 'en_ta' ? 'மீண்டும் பேசுக' : 'Continue with Velvet',
    todayProgressHeading: languageMode === 'en_ta' ? 'இன்றைய முன்னேற்றம்' : "Today's Progress Snapshot",
    viewProgressBtn: languageMode === 'en_ta' ? 'முன்னேற்றத்தைக் காண்க' : 'View Progress',
    recHeading: languageMode === 'en_ta' ? 'உங்களுக்கான பரிந்துரை' : 'Recommended for You',
    recBadge: languageMode === 'en_ta' ? 'பள்ளி உரையாடல்கள் பிடிப்பதால்' : 'Because you enjoy School discussions',
    exploreHeading: languageMode === 'en_ta' ? 'தலைப்புகளைத் தேடுங்கள்' : 'Explore Topics',
    viewAllTopics: languageMode === 'en_ta' ? 'அனைத்து தலைப்புகளும்' : 'View All Topics',
    skillsHeading: languageMode === 'en_ta' ? 'உங்கள் திறன் நிலவரம்' : 'Your Skills Snapshot',
    skillsInsight:
      languageMode === 'en_ta'
        ? 'இந்த வாரம் உங்கள் நம்பிக்கை அதிகமாக வளர்ந்துள்ளது.'
        : 'Your confidence has grown the most this week (+8%).',
    viewFullProgress: languageMode === 'en_ta' ? 'முழு விவரம்' : 'View Full Progress',
    achievementHeading: languageMode === 'en_ta' ? 'சமீபத்திய சாதனை' : 'Latest Achievement',
    viewAchievements: languageMode === 'en_ta' ? 'சாதனைகளைக் காண்க' : 'View Achievements',
    coachHeading: languageMode === 'en_ta' ? 'தினசரி வழிகாட்டி குறிப்பு' : 'Velvet Daily Coach',
    coachMessage:
      languageMode === 'en_ta'
        ? 'நீங்கள் ஒரு நல்ல பழக்கத்தை உருவாக்கி வருகிறீர்கள். இன்றைய உரையாடலைத் தொடருங்கள்.'
        : "You're building a great habit. Keep your conversation going today.",
    recentHeading: languageMode === 'en_ta' ? 'சமீபத்திய பயிற்சி வரலாறு' : 'Recent Activity',
    viewHistory: languageMode === 'en_ta' ? 'வரலாற்றைக் காண்க' : 'View History',
    newStudentGreeting: languageMode === 'en_ta' ? 'முதல் உரையாடலுக்கு தயாரா?' : 'Ready for your first conversation?',
    newStudentSub:
      languageMode === 'en_ta'
        ? 'ஒரு எளிய தலைப்பைத் தேர்ந்தெடுங்கள், வெல்வெட் உங்களுக்கு அன்பாக வழிகாட்டும்.'
        : 'Start with a simple everyday topic and Velvet will guide you step by step.',
  };

  // Quick topics shortcuts
  const quickTopics = [
    { id: 'school', title: 'School Life', emoji: '🏫', sub: 'Favorite subjects & teachers' },
    { id: 'friends', title: 'Friends & Fun', emoji: '👥', sub: 'Recess chats & games' },
    { id: 'sports', title: 'Sports & Games', emoji: '⚽', sub: 'Cricket, athletic events' },
    { id: 'food', title: 'Food & Cooking', emoji: '🍔', sub: 'Tiffin snacks & lunches' },
    { id: 'movies', title: 'Movies & Cinema', emoji: '🎬', sub: 'Heroes & animations' },
    { id: 'games', title: 'Video & Board Games', emoji: '🎮', sub: 'Puzzles, chess & mobile' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. PERSONALIZED WELCOME & CONTEXTUAL BANNER              */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Greeting & Status */}
          <div className="space-y-2.5 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A] shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Level 4 · Confident Speaker</span>
              <span className="text-[#FDE68A]">·</span>
              <span className="text-[#059669]">7-Day Streak 🔥</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight leading-tight">
              {t.greeting}, {firstName}! 👋
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {isNewStudentMode ? t.newStudentSub : t.tagline}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">{studentClass}</span>
              <span>·</span>
              <span className="text-[#2563EB] font-bold">{schoolName}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#059669] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Microphone ready</span>
              </span>
            </div>
          </div>

          {/* Right Mascot Representation & Demo Mode Toggle */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
              <VelvetMascot state="happy" size="md" animated={true} />
            </div>

            {/* Subtle Demo Toggle */}
            <button
              type="button"
              onClick={() => setIsNewStudentMode(!isNewStudentMode)}
              className="text-[11px] font-semibold text-[#64748B] hover:text-[#2563EB] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full shadow-2xs cursor-pointer flex items-center gap-1"
              title="Toggle to test first-day onboarding vs regular returning student state"
            >
              <RotateCcw className="w-3 h-3 text-[#2563EB]" />
              <span>{isNewStudentMode ? 'Switch to Active Student' : 'Preview New Student State'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE-DEDICATED VISUAL HERO SLOT (< 640px)              */}
      {/* ======================================================== */}
      <div className="sm:hidden w-full">
        <MobileVisualSlot
          src={SPEAK_VELVET_ASSETS.home.heroWelcome.src}
          alt={SPEAK_VELVET_ASSETS.home.heroWelcome.alt}
          aspectRatio="16:9"
          fitMode="cover"
          rounded="2xl"
          fallbackMascotState="happy"
          fallbackTitle="Welcome back, Arjun!"
          fallbackSubtitle="Ready for today's spoken English practice?"
          className="shadow-xs"
        />
      </div>

      {/* ======================================================== */}
      {/* 2. PRIMARY DAILY HERO ACTION: "TALK WITH VELVET"         */}
      {/* ======================================================== */}
      <div className="relative rounded-[32px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 sm:p-8 text-white shadow-[0_12px_36px_rgba(37,99,235,0.40)] overflow-hidden transition-all duration-300 hover:shadow-[0_16px_44px_rgba(37,99,235,0.50)]">
        
        {/* Subtle Decorative Audio Waves in background */}
        <div className="absolute -right-8 -bottom-8 opacity-20 pointer-events-none hidden sm:block">
          <VelvetAudioWave isPlaying={true} barCount={20} color="blue" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Main Info */}
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#FDE68A]" />
              <span>{isNewStudentMode ? 'Day 1 Welcome Conversation' : '3.5 / 5 min completed today'}</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight">
              {t.talkTitle}
            </h2>

            <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
              {isNewStudentMode ? t.newStudentSub : t.talkSub}
            </p>

            {/* Daily Goal Status Strip */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-blue-200">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Clock className="w-4 h-4 text-[#FDE68A]" />
                <span>{isNewStudentMode ? 'Takes ~2-3 minutes' : 'Just 1.5 minutes to reach your goal'}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                <span>Instant coach feedback</span>
              </span>
              <span>·</span>
              <span className="text-blue-100">Private & Secure</span>
            </div>
          </div>

          {/* Tactile Big Action Button */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenConversation('school')}
              className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B] text-[#0F172A] p-1 shadow-[0_8px_30px_rgba(245,158,11,0.50)] hover:shadow-[0_12px_40px_rgba(245,158,11,0.70)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center border-4 border-white"
              aria-label="Start speaking with Velvet"
            >
              <span className="absolute inset-0 rounded-full bg-[#F59E0B] opacity-30 animate-ping pointer-events-none" />
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-[#0F172A] transition-transform group-hover:scale-110" />
            </button>

            <span className="text-xs font-bold text-white tracking-wide uppercase mt-1">
              {t.startTalkingCTA}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. CONTINUE PRACTICE OR NEW STUDENT WELCOME CARD         */}
      {/* ======================================================== */}
      {!isNewStudentMode ? (
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-13 h-13 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-2xl flex items-center justify-center shrink-0 shadow-2xs">
              🏫
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB] block">
                {t.continueHeading}
              </span>
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                School Life · Classroom Conversations
              </h3>
              <p className="text-xs text-[#64748B]">
                5 speaking questions · Last practiced yesterday (3.5 min)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenConversation('school')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{t.continueBtn}</span>
          </button>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#BFDBFE] text-2xl flex items-center justify-center shrink-0">
              🌱
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#0F172A]">
                {t.newStudentGreeting}
              </h3>
              <p className="text-xs text-[#475569]">
                Velvet will ask you friendly questions about your school day. Take your time!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => (onStartOnboarding ? onStartOnboarding() : onOpenConversation('school'))}
            className="px-5 py-2.5 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start Onboarding Tour</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TODAY'S PROGRESS SNAPSHOT & RECOMMENDED TOPIC ROW     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Today's Progress Snapshot Card (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {t.todayProgressHeading}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#2563EB]">
                    {isNewStudentMode ? '0.0' : '3.5'}{' '}
                    <span className="text-lg font-normal text-[#64748B]">/ 5.0 min</span>
                  </span>
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-0.5 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isNewStudentMode ? '0% complete' : '70% complete'}</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('progress')}
                className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{t.viewProgressBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#475569]">
                <span>Daily Practice Progress</span>
                <span className="font-mono text-[#0F172A]">{isNewStudentMode ? '5.0 min remaining' : '1.5 min remaining'}</span>
              </div>
              <VelvetProgressBar value={isNewStudentMode ? 0 : 70} color="blue" size="md" showValueText={false} />
            </div>

            {/* 4 Mini Stat Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#F1F5F9]">
              <div className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-center">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Daily Goal</span>
                <span className="font-display font-extrabold text-base text-[#0F172A]">5.0 Min</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-center">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Streak</span>
                <span className="font-display font-extrabold text-base text-[#D97706] flex items-center justify-center gap-1">
                  <span>🔥</span>
                  <span>{isNewStudentMode ? '0 Days' : '7 Days'}</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-center">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Questions</span>
                <span className="font-display font-extrabold text-base text-[#2563EB]">
                  {isNewStudentMode ? '0' : '7'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] text-center">
                <span className="text-[10px] uppercase font-bold text-[#64748B] block">Sessions</span>
                <span className="font-display font-extrabold text-base text-[#059669]">
                  {isNewStudentMode ? '0' : '2'}
                </span>
              </div>
            </div>
          </VelvetCard>
        </div>

        {/* Recommended Topic Feature Card (5 cols) */}
        <div className="md:col-span-5">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-4 border-[#BFDBFE]">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{t.recHeading}</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                  Beginner · ~4-5m
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-3xl flex items-center justify-center shrink-0 shadow-2xs">
                  🏫
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl text-[#0F172A]">
                    School Life
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Talk about your favorite subjects, teachers, and fun lunch breaks with classmates.
                  </p>
                </div>
              </div>

              {/* Rationale Pill */}
              <div className="p-2 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[11px] text-[#92400E] font-medium flex items-center gap-1.5">
                <VelvetSparkleStar size={12} color="gold" />
                <span>{t.recBadge}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenConversation('school')}
              className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Practice with Velvet</span>
            </button>
          </VelvetCard>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. EXPLORE QUICK TOPICS (4-6 SHORTCUTS)                  */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-[#0F172A] tracking-tight">
              {t.exploreHeading}
            </h2>
            <p className="text-xs text-[#64748B]">
              Quick conversation starters for today's practice session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('topics')}
            className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>{t.viewAllTopics}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickTopics.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenConversation(item.id)}
              className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group text-left"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-2xs">
                {item.emoji}
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                  {item.sub}
                </p>
              </div>

              <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-bold text-[#2563EB]">
                <span>Speak</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. SKILL SNAPSHOT & LATEST ACHIEVEMENT ROW               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Skill Snapshot Card (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {t.skillsHeading}
                </span>
                <h3 className="font-display font-bold text-lg text-[#0F172A] mt-0.5">
                  Overall Speaking Growth: <span className="text-[#2563EB]">76%</span>
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onNavigateTab('progress')}
                className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{t.viewFullProgress}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Skill Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                  <span>Speaking Fluency</span>
                  <span className="font-bold text-[#0F172A]">74%</span>
                </div>
                <VelvetProgressBar value={74} color="blue" size="sm" showValueText={false} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                  <span>Vocabulary Usage</span>
                  <span className="font-bold text-[#0F172A]">68%</span>
                </div>
                <VelvetProgressBar value={68} color="blue" size="sm" showValueText={false} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                  <span>Pronunciation</span>
                  <span className="font-bold text-[#0F172A]">82%</span>
                </div>
                <VelvetProgressBar value={82} color="green" size="sm" showValueText={false} />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#334155]">
                  <span>Confidence</span>
                  <span className="font-bold text-[#0F172A]">80%</span>
                </div>
                <VelvetProgressBar value={80} color="amber" size="sm" showValueText={false} />
              </div>
            </div>

            {/* Velvet Insight */}
            <div className="p-3 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>{t.skillsInsight}</span>
            </div>
          </VelvetCard>
        </div>

        {/* Latest Achievement & Daily Coach Cards (5 cols) */}
        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Latest Achievement Card */}
          <VelvetCard tint="white" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                {t.achievementHeading}
              </span>
              <button
                type="button"
                onClick={() => onNavigateTab('achievements')}
                className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
              >
                {t.viewAchievements}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-[#FDE68A] text-2xl flex items-center justify-center shrink-0">
                  🔥
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#0F172A]">
                    7-Day Streak Hero
                  </h4>
                  <span className="text-[11px] text-[#059669] font-medium block">
                    Unlocked today · +150 XP
                  </span>
                </div>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white text-[#D97706] border border-[#FDE68A]">
                Level 4
              </span>
            </div>
          </VelvetCard>

          {/* Velvet Daily Coach Card */}
          <VelvetCard tint="white" padding="md" className="space-y-2 bg-gradient-to-br from-white to-[#F8FAFD]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <VelvetSparkleStar size={14} color="blue" />
                <span>{t.coachHeading}</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('progress')}
                className="text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>Practice Insights →</span>
              </button>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed italic">
              "{t.coachMessage}"
            </p>
          </VelvetCard>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 7. RECENT ACTIVITY COMPACT LIST                          */}
      {/* ======================================================== */}
      {!isNewStudentMode && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#2563EB]" />
              <h2 className="font-display font-bold text-lg text-[#0F172A]">
                {t.recentHeading}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('progress')}
              className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{t.viewHistory}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                time: 'Today',
                title: 'School Life',
                details: '5 questions answered',
                duration: '3.5 min',
                emoji: '🏫',
                id: 'school',
              },
              {
                time: 'Yesterday',
                title: 'Sports & Games',
                details: '5 questions answered',
                duration: '4.2 min',
                emoji: '⚽',
                id: 'sports',
              },
              {
                time: '2 days ago',
                title: 'Friends & Fun',
                details: '4 questions answered',
                duration: '3.8 min',
                emoji: '👥',
                id: 'friends',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs flex items-center justify-between gap-3 hover:border-[#BFDBFE] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <span className="text-[10px] font-bold text-[#2563EB] uppercase block">
                      {item.time}
                    </span>
                    <span className="font-bold text-xs text-[#0F172A] block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-[#64748B]">
                      {item.details} · {item.duration}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenConversation(item.id)}
                  className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-[11px] font-bold transition-colors cursor-pointer"
                >
                  Speak
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
