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
  ArrowRight,
  TrendingUp,
  Clock,
  Compass,
  CheckCircle2,
  BookOpen,
  Volume2,
  Mic,
  Award,
  Zap,
  Play,
  RotateCcw,
  Lightbulb,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { AppTab } from '../components/AppShell.tsx';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface StudentPracticeInsightsScreenProps {
  languageMode?: LanguageMode;
  studentName?: string;
  studentClass?: string;
  onOpenConversation: (topicId?: string) => void;
  onNavigateTab?: (tab: AppTab) => void;
}

export const StudentPracticeInsightsScreen: React.FC<StudentPracticeInsightsScreenProps> = ({
  languageMode = 'en_ta',
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  onOpenConversation,
  onNavigateTab,
}) => {
  // Toggle for testing new student empty state vs active student recommendations
  const [isNewStudentView, setIsNewStudentView] = useState<boolean>(false);

  const firstName = studentName.split(' ')[0] || 'Arjun';

  // Bilingual strings
  const t = {
    headerTitle: languageMode === 'en_ta' ? 'பயிற்சி குறிப்புகள்' : 'Practice Insights',
    headerSub:
      languageMode === 'en_ta'
        ? 'உன் சமீபத்திய பயிற்சியில் இருந்து வெல்வெட் சில விஷயங்களை கவனித்திருக்கிறது.'
        : 'Velvet noticed a few things from your recent practice.',
    velvetRecommends: languageMode === 'en_ta' ? 'வெல்வெட்டின் பரிந்துரை' : 'Velvet recommends',
    recTopicTitle: languageMode === 'en_ta' ? 'School Life-ஐ மீண்டும் முயற்சி செய்' : 'Try School Life again',
    recTopicDesc:
      languageMode === 'en_ta'
        ? 'பள்ளி தொடர்பான கேள்விகளுக்கு நீ இன்னும் நன்றாக பதிலளிக்கிறாய். இன்னொரு சிறிய பயிற்சி உன் நம்பிக்கையை அதிகரிக்க உதவும்.'
        : "You're getting more comfortable answering school-related questions. One more short practice can help you build lasting confidence.",
    startPracticeCTA: languageMode === 'en_ta' ? 'பயிற்சியைத் தொடங்குக' : 'Start Practice',
    recentProgressTitle: languageMode === 'en_ta' ? 'சமீபத்திய முன்னேற்றம்' : 'Your Recent Progress',
    whatToPracticeNext: languageMode === 'en_ta' ? 'அடுத்ததாக என்ன பயிற்சி செய்யலாம்?' : 'What to Practice Next',
    keepBuildingSkill: languageMode === 'en_ta' ? 'இந்த திறனை தொடர்ந்து வளர்க்கவும்' : 'Keep Building This Skill',
    confidenceInsight:
      languageMode === 'en_ta'
        ? 'நீ வேகமாக பதிலளிக்க ஆரம்பித்துவிட்டாய். அடுத்ததாக கொஞ்சம் நீளமான பதில்களை முயற்சி செய்.'
        : "You're responding faster. Now try giving slightly longer answers.",
    practiceConfidenceCTA: languageMode === 'en_ta' ? 'நம்பிக்கைப் பயிற்சி' : 'Practice Confidence',
    weeklyInsightHeading: languageMode === 'en_ta' ? 'இந்த வாரம்' : 'This Week',
    weeklyStats: languageMode === 'en_ta' ? '12 உரையாடல்கள் · 48 கேள்விகள் · 24.5 நிமிடங்கள்' : '12 conversations · 48 questions · 24.5 minutes',
    biggestImprovementLabel: languageMode === 'en_ta' ? 'உன் மிகப்பெரிய முன்னேற்றம்:' : 'Your biggest improvement:',
    biggestImprovementVal: languageMode === 'en_ta' ? 'பதில் வேகம் (இடைவெளி 1.2 வினாடிகள் குறைந்துள்ளது)' : 'Response speed (pauses reduced by 1.2s)',
    nextSmallGoalLabel: languageMode === 'en_ta' ? 'அடுத்த சிறிய இலக்கு:' : 'Your next small goal:',
    nextSmallGoalVal:
      languageMode === 'en_ta'
        ? 'ஒரு தலைப்பில் 5 நிமிடங்கள் மாற்றாமல் தொடர்ந்து பேசுதல்.'
        : 'Speak for 5 minutes on one topic without switching.',
    emptyHeading: languageMode === 'en_ta' ? 'உன் பேச்சின் பலத்தை கண்டுபிடிப்போம்.' : "Let's discover your speaking strengths.",
    emptySub:
      languageMode === 'en_ta'
        ? 'சில உரையாடல்களுக்குப் பிறகு, நீங்கள் விரும்பும் தலைப்புகளை ஆராய்ந்து, உங்களுக்கேற்ற தனிப்பயனாக்கப்பட்ட குறிப்புகளை வெல்வெட் வழங்கும்.'
        : 'After a few short conversations, Velvet will analyze what you enjoy and provide personalized recommendations tailored to you.',
    emptyCTA: languageMode === 'en_ta' ? 'முதல் பயிற்சியைத் தொடங்குக' : 'Start My First Practice',
  };

  const nextTopics = [
    {
      id: 'school',
      title: 'School Life',
      emoji: '🏫',
      level: 'Intermediate',
      duration: '5 min',
      reason: 'Build confidence in everyday school conversations.',
    },
    {
      id: 'friends',
      title: 'Friends & Fun',
      emoji: '👥',
      level: 'Beginner',
      duration: '4 min',
      reason: 'Practice natural casual responses and jokes.',
    },
    {
      id: 'tech',
      title: 'Technology & Inventions',
      emoji: '💡',
      level: 'Intermediate',
      duration: '5 min',
      reason: 'Try explaining ideas with more descriptive detail.',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. SCREEN HEADER WITH VELVET IN ENCOURAGING/THINKING STATE */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE] p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Header Copy */}
          <div className="space-y-2 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Personalized Speaking Coach</span>
              <span className="text-[#BFDBFE]">·</span>
              <span>{studentClass}</span>
            </div>

            <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#0F172A] tracking-tight leading-tight">
              {t.headerTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {isNewStudentView ? t.emptySub : t.headerSub}
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-[#64748B]">
              <span className="font-semibold text-[#0F172A]">Arjun Sundararajan</span>
              <span>·</span>
              <span className="text-[#059669] font-bold">100% Private to You</span>
              <span>·</span>
              <span>No Class Leaderboards</span>
            </div>
          </div>

          {/* Right Mascot & Demo View Toggle */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-36 h-36 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
              <VelvetMascot state="thinking" size="md" animated={true} />
            </div>

            {/* Discreet Demo Switch for Evaluators */}
            <button
              type="button"
              onClick={() => setIsNewStudentView(!isNewStudentView)}
              className="text-[11px] font-semibold text-[#64748B] hover:text-[#2563EB] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full shadow-2xs cursor-pointer flex items-center gap-1"
              title="Toggle to test first-day empty state vs active student recommendations"
            >
              <RotateCcw className="w-3 h-3 text-[#2563EB]" />
              <span>{isNewStudentView ? 'Switch to Active Insights' : 'Preview New Student Insights'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-Dedicated Practice Insights Visual Slot (< 640px) */}
      <div className="sm:hidden w-full">
        <MobileVisualSlot
          src={SPEAK_VELVET_ASSETS.practiceInsights.coachRecommendation.src}
          alt={SPEAK_VELVET_ASSETS.practiceInsights.coachRecommendation.alt}
          aspectRatio="16:9"
          fitMode="cover"
          rounded="2xl"
          fallbackMascotState="thinking"
          fallbackTitle="Velvet's Practice Coach"
          fallbackSubtitle="Smart recommendations based on your speaking pace & accuracy"
          className="shadow-2xs"
        />
      </div>

      {/* ======================================================== */}
      {/* EMPTY STATE: FOR FIRST-TIME OR NEW STUDENTS              */}
      {/* ======================================================== */}
      {isNewStudentView ? (
        <VelvetCard tint="white" padding="xl" className="text-center py-12 space-y-5 border-[#BFDBFE]">
          <div className="w-16 h-16 rounded-3xl bg-[#EFF6FF] text-[#2563EB] text-3xl flex items-center justify-center mx-auto shadow-xs">
            🌱
          </div>

          <div className="max-w-md mx-auto space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-[#0F172A]">
              {t.emptyHeading}
            </h2>
            <p className="text-sm text-[#64748B] leading-relaxed">
              {t.emptySub}
            </p>
          </div>

          <div className="pt-2">
            <VelvetButton
              variant="primary"
              size="lg"
              onClick={() => onOpenConversation('school')}
              className="inline-flex items-center gap-2 shadow-md"
            >
              <Mic className="w-4 h-4" />
              <span>{t.emptyCTA}</span>
            </VelvetButton>
          </div>
        </VelvetCard>
      ) : (
        <>
          {/* ======================================================== */}
          {/* 2. VELVET'S PROMINENT HERO RECOMMENDATION CARD           */}
          {/* ======================================================== */}
          <div className="relative rounded-3xl bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 sm:p-8 text-white shadow-[0_12px_36px_rgba(37,99,235,0.35)] overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                  <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
                  <span>{t.velvetRecommends}</span>
                  <span className="text-blue-200">·</span>
                  <span className="text-[#FDE68A]">Based on Recent Accuracy</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-3xl">🏫</span>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {t.recTopicTitle}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-normal">
                  {t.recTopicDesc}
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs text-blue-200">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/25 text-white font-medium">
                    Intermediate
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#FDE68A]" />
                    <span>~5 min session</span>
                  </span>
                  <span>·</span>
                  <span className="text-white font-bold">5 speaking questions</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenConversation('school')}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#D97706] text-[#0F172A] font-display font-extrabold text-sm transition-all duration-200 cursor-pointer shadow-[0_8px_24px_rgba(245,158,11,0.50)] hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{t.startPracticeCTA}</span>
                </button>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. YOUR RECENT PROGRESS (4 COMPACT FRIENDLY INSIGHTS)    */}
          {/* ======================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                  {t.recentProgressTitle}
                </h2>
                <p className="text-xs text-[#64748B]">
                  Friendly coaching notes on your spoken responses this week.
                </p>
              </div>

              <span className="text-xs font-bold text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                Overall Growth: 76%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Speaking */}
              <VelvetCard tint="white" padding="md" className="space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                        <Mic className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">Speaking</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#2563EB]">74%</span>
                  </div>
                  <VelvetProgressBar value={74} color="blue" size="sm" showValueText={false} />
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    "Answers are becoming more natural."
                  </p>
                </div>
                <span className="text-[10px] text-[#059669] font-bold block pt-1 border-t border-[#F1F5F9]">
                  Smoother pauses
                </span>
              </VelvetCard>

              {/* Vocabulary */}
              <VelvetCard tint="white" padding="md" className="space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">Vocabulary</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#2563EB]">68%</span>
                  </div>
                  <VelvetProgressBar value={68} color="blue" size="sm" showValueText={false} />
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    "You used 8 new words this week."
                  </p>
                </div>
                <span className="text-[10px] text-[#2563EB] font-bold block pt-1 border-t border-[#F1F5F9]">
                  +8 new words
                </span>
              </VelvetCard>

              {/* Pronunciation */}
              <VelvetCard tint="white" padding="md" className="space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-[#059669]" />
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">Pronunciation</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#059669]">82%</span>
                  </div>
                  <VelvetProgressBar value={82} color="green" size="sm" showValueText={false} />
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    "Your pronunciation remains one of your strongest skills."
                  </p>
                </div>
                <span className="text-[10px] text-[#059669] font-bold block pt-1 border-t border-[#F1F5F9]">
                  High phonetic clarity
                </span>
              </VelvetCard>

              {/* Confidence */}
              <VelvetCard tint="white" padding="md" className="space-y-2.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-[#D97706]" />
                      </div>
                      <span className="font-bold text-sm text-[#0F172A]">Confidence</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#D97706]">80%</span>
                  </div>
                  <VelvetProgressBar value={80} color="amber" size="sm" showValueText={false} />
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    "You are starting conversations faster."
                  </p>
                </div>
                <span className="text-[10px] text-[#D97706] font-bold block pt-1 border-t border-[#F1F5F9]">
                  +8% confidence gain
                </span>
              </VelvetCard>

            </div>
          </section>

          {/* ======================================================== */}
          {/* 4. WHAT TO PRACTICE NEXT (3 PERSONALIZED TOPIC CARDS)    */}
          {/* ======================================================== */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
                  {t.whatToPracticeNext}
                </h2>
                <p className="text-xs text-[#64748B]">
                  Tailored based on your profile interests and speaking growth.
                </p>
              </div>

              {onNavigateTab && (
                <button
                  type="button"
                  onClick={() => onNavigateTab('topics')}
                  className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Explore all topics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nextTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="p-5 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 text-left group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs">
                        {topic.emoji}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                          {topic.level}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#64748B]">
                          {topic.duration}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-bold text-base text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        {topic.reason}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenConversation(topic.id)}
                    className="w-full py-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#2563EB] text-[#2563EB] hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Practice Topic</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ======================================================== */}
          {/* 5. KEEP BUILDING THIS SKILL & WEEKLY MINI INSIGHT ROW    */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Keep Building This Skill (7 cols) */}
            <div className="md:col-span-7">
              <VelvetCard
                tint="white"
                padding="lg"
                className="h-full flex flex-col justify-between space-y-4 border-[#BFDBFE] bg-gradient-to-br from-white to-[#F8FAFD]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{t.keepBuildingSkill}</span>
                    </span>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                      81% Fluency
                    </span>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-13 h-13 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-2xl flex items-center justify-center shrink-0">
                      ⚡
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-xl text-[#0F172A]">
                        Confidence & Response Length
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                        "{t.confidenceInsight}"
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#64748B]">
                      <span>Confidence Level Progress</span>
                      <span className="text-[#0F172A]">81%</span>
                    </div>
                    <VelvetProgressBar value={81} color="amber" size="md" showValueText={false} />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenConversation('friends')}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{t.practiceConfidenceCTA}</span>
                  </button>
                </div>
              </VelvetCard>
            </div>

            {/* Weekly Mini Insight (5 cols) */}
            <div className="md:col-span-5">
              <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                      {t.weeklyInsightHeading}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                      Active Routine
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0]">
                    <span className="text-xs font-semibold text-[#0F172A] block">
                      {t.weeklyStats}
                    </span>
                  </div>

                  {/* Biggest Improvement */}
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block">
                      {t.biggestImprovementLabel}
                    </span>
                    <p className="text-xs font-semibold text-[#0F172A]">
                      {t.biggestImprovementVal}
                    </p>
                  </div>

                  {/* Next Small Goal */}
                  <div className="space-y-0.5 pt-2 border-t border-[#F1F5F9]">
                    <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">
                      {t.nextSmallGoalLabel}
                    </span>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      {t.nextSmallGoalVal}
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EFF6FF] text-[11px] text-[#1E40AF] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span>Personal insights update after every 2 conversations.</span>
                </div>
              </VelvetCard>
            </div>

          </div>
        </>
      )}

    </div>
  );
};
