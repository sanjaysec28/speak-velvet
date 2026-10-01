import React, { useState } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetMascot,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Sparkles,
  Trophy,
  Award,
  Clock,
  Flame,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Home,
  TrendingUp,
  HelpCircle,
  ThumbsUp,
  MessageSquare,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface SessionReflectionScreenProps {
  languageMode?: LanguageMode;
  studentName?: string;
  studentClass?: string;
  topicTitle?: string;
  topicEmoji?: string;
  sessionDuration?: string;
  questionsCount?: number;
  xpEarned?: number;
  dailyGoalProgress?: string;
  streakDays?: number;
  onPracticeAgain: () => void;
  onTryAnotherTopic: () => void;
  onBackToHome: () => void;
  onViewProgress: () => void;
}

export const SessionReflectionScreen: React.FC<SessionReflectionScreenProps> = ({
  languageMode = 'en_ta',
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  topicTitle = 'School Life',
  topicEmoji = '🏫',
  sessionDuration = '4m 32s',
  questionsCount = 5,
  xpEarned = 40,
  dailyGoalProgress = '4.5 / 5 min',
  streakDays = 7,
  onPracticeAgain,
  onTryAnotherTopic,
  onBackToHome,
  onViewProgress,
}) => {
  // Reflection state: 'great' | 'good' | 'okay' | 'difficult' | null
  const [reflectionSelected, setReflectionSelected] = useState<
    'great' | 'good' | 'okay' | 'difficult' | null
  >(null);

  const firstName = studentName.split(' ')[0] || 'Arjun';

  // Bilingual copy
  const t = {
    completeHeader: languageMode === 'en_ta' ? 'பயிற்சி முடிந்தது!' : 'Session Complete!',
    niceWorkMsg:
      languageMode === 'en_ta'
        ? `சிறப்பாக செய்தாய், ${firstName}! உரையாடலை தொடர்ந்து நடத்தினாய்.`
        : `Nice work, ${firstName}! You kept the conversation going.`,
    speakingSnapshot: languageMode === 'en_ta' ? 'உன் பேச்சு முன்னேற்றம்' : 'Your Speaking Snapshot',
    youDidWellHeading: languageMode === 'en_ta' ? 'நன்றாக செய்தவை' : 'You did well',
    velvetTipHeading: languageMode === 'en_ta' ? 'வெல்வெட்டின் குறிப்பு' : "Velvet's Tip",
    tipBody:
      languageMode === 'en_ta'
        ? 'அடுத்த முறை, ஒவ்வொரு பதிலுக்கும் ஒரு சிறிய கூடுதல் விவரத்தைச் சேர்த்து பேசிப் பாரு.'
        : 'Next time, try adding one extra detail or example to each answer.',
    reflectionHeading: languageMode === 'en_ta' ? 'இன்று பேசுவது எப்படி இருந்தது?' : 'How did speaking feel today?',
    reflectionThanks:
      languageMode === 'en_ta'
        ? 'நன்றி! உங்கள் அடுத்த பயிற்சியை இன்னும் எளிதாக்க வெல்வெட் இதை பயன்படுத்தும்.'
        : 'Thanks! Velvet will use this to make future practice more comfortable.',
    practiceAgainCTA: languageMode === 'en_ta' ? 'மீண்டும் பேசுக' : 'Practice Again',
    tryAnotherCTA: languageMode === 'en_ta' ? 'வேறு தலைப்பு' : 'Try Another Topic',
    backToHomeCTA: languageMode === 'en_ta' ? 'முகப்புக்குச் செல்க' : 'Back to Home',
    viewProgressCTA: languageMode === 'en_ta' ? 'முன்னேற்றத்தைக் காண்க' : 'View Progress',
    streakBadge: languageMode === 'en_ta' ? '7 நாள் தொடர் சாதனை!' : '7 day streak!',
    dailyGoalClose:
      languageMode === 'en_ta'
        ? 'இன்றைய இலக்கு 90% முடிந்தது! 🎉'
        : 'Daily goal 90% complete! Just 30s to go 🎉',
  };

  const reflectionOptions = [
    { id: 'great' as const, emoji: '😄', label: 'Great', ta: 'சிறப்பு' },
    { id: 'good' as const, emoji: '🙂', label: 'Good', ta: 'நன்று' },
    { id: 'okay' as const, emoji: '😐', label: 'Okay', ta: 'சரி' },
    { id: 'difficult' as const, emoji: '😅', label: 'A little difficult', ta: 'சற்று கடினம்' },
  ];

  const skillCards = [
    {
      name: 'Speaking',
      score: 76,
      feedback: 'You kept your answers flowing naturally.',
      color: 'blue' as const,
      sub: 'Fluency & pacing',
    },
    {
      name: 'Vocabulary',
      score: 71,
      feedback: 'You used 3 new words today.',
      color: 'blue' as const,
      sub: 'Classroom terms',
    },
    {
      name: 'Pronunciation',
      score: 83,
      feedback: 'Your words were clear and easy to understand.',
      color: 'green' as const,
      sub: 'Phonetic clarity',
    },
    {
      name: 'Confidence',
      score: 81,
      feedback: 'You responded faster than before.',
      color: 'amber' as const,
      sub: 'Low pause rate',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0F172A] py-8 px-4 sm:px-6 lg:px-8 animate-fade-in flex flex-col justify-between">
      
      {/* Container */}
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* ======================================================== */}
        {/* 1. TOP CELEBRATION HERO BANNER                           */}
        {/* ======================================================== */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE] p-6 sm:p-8 shadow-sm overflow-hidden text-center sm:text-left">
          
          {/* Subtle Ambient Confetti Effect */}
          <div className="absolute top-3 right-6 flex items-center gap-1.5 opacity-60 pointer-events-none">
            <VelvetSparkleStar size={16} color="gold" />
            <VelvetSparkleStar size={12} color="blue" />
            <VelvetSparkleStar size={20} color="green" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Left Copy */}
            <div className="space-y-2 max-w-xl z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{t.completeHeader}</span>
                <span className="text-[#A7F3D0]">·</span>
                <span className="font-mono text-[#D97706]">+{xpEarned} XP</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#0F172A] tracking-tight leading-tight">
                {t.completeHeader}
              </h1>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {t.niceWorkMsg}
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[#64748B]">
                <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                  <span>{topicEmoji}</span>
                  <span>{topicTitle}</span>
                </span>
                <span>·</span>
                <span>{studentClass}</span>
                <span>·</span>
                <span className="text-[#059669] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{questionsCount} questions completed</span>
                </span>
              </div>
            </div>

            {/* Right Mascot Representation */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
                <VelvetMascot state="celebration" size="lg" animated={true} />
              </div>

              {/* Animated XP Micro-Celebration Badge */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] text-xs font-extrabold border border-[#FDE68A] shadow-xs animate-bounce">
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>+{xpEarned} XP Earned!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Dedicated Celebration Visual Slot (< 640px) */}
        <div className="sm:hidden w-full">
          <MobileVisualSlot
            src={SPEAK_VELVET_ASSETS.sessionComplete.celebrationBanner.src}
            alt={SPEAK_VELVET_ASSETS.sessionComplete.celebrationBanner.alt}
            aspectRatio="16:9"
            fitMode="cover"
            rounded="2xl"
            fallbackMascotState="celebration"
            fallbackTitle="Practice Completed! 🎉"
            fallbackSubtitle={`You earned +${xpEarned} XP and kept your 7-day streak going!`}
            className="shadow-2xs"
          />
        </div>

        {/* ======================================================== */}
        {/* 2. COMPACT SESSION METRICS BREAKDOWN                     */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Duration */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
              Speaking Time
            </span>
            <span className="font-display font-extrabold text-xl text-[#0F172A] block">
              {sessionDuration}
            </span>
            <span className="text-[10px] text-[#059669] font-semibold flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Full Answers</span>
            </span>
          </div>

          {/* Questions */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
              Questions
            </span>
            <span className="font-display font-extrabold text-xl text-[#2563EB] block">
              {questionsCount} / {questionsCount}
            </span>
            <span className="text-[10px] text-[#64748B]">100% completed</span>
          </div>

          {/* Daily Goal */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
              Daily Goal
            </span>
            <span className="font-display font-extrabold text-xl text-[#0F172A] block">
              {dailyGoalProgress}
            </span>
            <span className="text-[10px] text-[#059669] font-bold">90% Done today</span>
          </div>

          {/* Streak */}
          <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">
              Habit Streak
            </span>
            <span className="font-display font-extrabold text-xl text-[#D97706] flex items-center justify-center gap-1">
              <span>🔥</span>
              <span>{streakDays} Days</span>
            </span>
            <span className="text-[10px] text-[#D97706] font-semibold">Streak extended!</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SPEAKING SNAPSHOT (4 SKILL CARDS)                     */}
        {/* ======================================================== */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                {t.speakingSnapshot}
              </h2>
              <p className="text-xs text-[#64748B]">
                Private coaching analysis from today's speaking responses.
              </p>
            </div>

            <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Overall: 78% Session Score
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillCards.map((skill, idx) => (
              <VelvetCard key={idx} tint="white" padding="md" className="space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#0F172A]">{skill.name}</span>
                    <span className="font-mono font-bold text-sm text-[#2563EB]">
                      {skill.score}%
                    </span>
                  </div>

                  <VelvetProgressBar
                    value={skill.score}
                    color={skill.color}
                    size="sm"
                    showValueText={false}
                  />

                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    "{skill.feedback}"
                  </p>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block pt-2 border-t border-[#F1F5F9]">
                  {skill.sub}
                </span>
              </VelvetCard>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. WHAT YOU DID WELL & VELVET'S COACH TIP ROW            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* What You Did Well (7 cols) */}
          <div className="md:col-span-7">
            <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#059669]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>{t.youDidWellHeading}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-[#0F172A]">
                  Positive Highlights from Today
                </h3>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    icon: '🌟',
                    title: 'Kept the conversation going',
                    desc: 'You answered promptly without stopping or giving up.',
                  },
                  {
                    icon: '💬',
                    title: 'Used complete sentences',
                    desc: 'Formed structured phrases connecting your thoughts with "because".',
                  },
                  {
                    icon: '🚀',
                    title: 'Responded more quickly',
                    desc: 'Your average pause before speaking decreased by 1.2 seconds.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-start gap-3"
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-xs text-[#0F172A]">{item.title}</h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </VelvetCard>
          </div>

          {/* Velvet's Tip Card (5 cols) */}
          <div className="md:col-span-5">
            <VelvetCard
              tint="white"
              padding="lg"
              className="h-full flex flex-col justify-between space-y-4 border-[#BFDBFE] bg-gradient-to-br from-white to-[#EFF6FF]"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    <VelvetSparkleStar size={14} color="blue" />
                    <span>{t.velvetTipHeading}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#2563EB] border border-[#BFDBFE]">
                    Personal Coach
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#BFDBFE] flex items-center justify-center shrink-0 shadow-2xs">
                    <VelvetMascot state="happy" size="sm" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0F172A]">
                      For Your Next Chat:
                    </h3>
                    <p className="text-xs text-[#64748B]">One simple habit to try next time.</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[#1E40AF] leading-relaxed pt-2 p-3 bg-white rounded-2xl border border-[#BFDBFE]/80">
                  "{t.tipBody}"
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white/70 border border-[#BFDBFE]/60 text-[11px] text-[#475569] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>Small everyday steps create lasting confidence!</span>
              </div>
            </VelvetCard>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. OPTIONAL SESSION REFLECTION CONTROLS                  */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs space-y-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-base text-[#0F172A]">
              {t.reflectionHeading}
            </h3>
            <p className="text-xs text-[#64748B]">
              Optional quick check-in. Helps Velvet adjust prompt difficulty for you.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {reflectionOptions.map((opt) => {
              const isSelected = reflectionSelected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setReflectionSelected(opt.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1 ${
                    isSelected
                      ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-2xs scale-102'
                      : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#BFDBFE] hover:bg-[#F8FAFD]'
                  }`}
                >
                  <span className="text-2xl">{opt.emoji}</span>
                  <span className="font-bold text-xs">{opt.label}</span>
                  {languageMode === 'en_ta' && (
                    <span className="text-[10px] text-[#64748B]">{opt.ta}</span>
                  )}
                </button>
              );
            })}
          </div>

          {reflectionSelected && (
            <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] font-medium flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>{t.reflectionThanks}</span>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 6. PRIMARY & SECONDARY SESSION ACTIONS                   */}
        {/* ======================================================== */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Primary & Replay Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <VelvetButton
              variant="primary"
              size="lg"
              onClick={onPracticeAgain}
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.practiceAgainCTA}</span>
            </VelvetButton>

            <VelvetButton
              variant="outline"
              size="lg"
              onClick={onTryAnotherTopic}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#2563EB]" />
              <span>{t.tryAnotherCTA}</span>
            </VelvetButton>
          </div>

          {/* Tertiary Return Actions */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onViewProgress}
              className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1 px-2 py-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.viewProgressCTA}</span>
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] hover:underline cursor-pointer flex items-center gap-1 px-2 py-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.backToHomeCTA}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center py-6 text-xs text-[#94A3B8]">
        Vivekanandha School Spoken English Lab · Private Student Session
      </footer>

    </div>
  );
};
