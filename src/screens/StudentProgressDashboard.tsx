import React, { useState } from 'react';
import { DailyGoalsStreaksScreen } from './DailyGoalsStreaksScreen.tsx';
import { AchievementsBadgesScreen } from './AchievementsBadgesScreen.tsx';
import { ProgressHistoryScreen } from './ProgressHistoryScreen.tsx';
import { StudentPracticeInsightsScreen } from './StudentPracticeInsightsScreen.tsx';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetCircularProgress,
  VelvetStreakIndicator,
  VelvetMascot,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  TrendingUp,
  Award,
  Trophy,
  History,
  Clock,
  CheckCircle2,
  Mic,
  ArrowRight,
  Flame,
  Sparkles,
  BookOpen,
  Volume2,
  Calendar,
  ChevronRight,
  Check,
  RotateCcw,
  Zap,
  Target,
  Smile,
  Lightbulb,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export interface StudentProgressDashboardProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  initialSubTab?: 'insights' | 'analytics' | 'streaks' | 'achievements' | 'history';
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  schoolName?: string;
}

export const StudentProgressDashboard: React.FC<StudentProgressDashboardProps> = ({
  languageMode = 'en',
  onOpenConversation,
  initialSubTab = 'insights',
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  studentId = 'VS2026-001',
  schoolName = 'Vivekanandha School',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'insights' | 'analytics' | 'streaks' | 'achievements' | 'history'>(initialSubTab);

  // Synchronize when initialSubTab changes from parent
  React.useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Bilingual strings dictionary
  const t = {
    title: languageMode === 'en_ta' ? 'திறன் மற்றும் பகுப்பாய்வு' : 'Skills & Speaking Analytics',
    subtitle:
      languageMode === 'en_ta'
        ? 'உங்கள் நான்கு முக்கிய ஆங்கிலப் பேச்சுத் திறன்கள் எவ்வாறு வளர்ந்து வருகின்றன என்பதை இங்கே காணலாம்.'
        : 'Explore how your four core spoken-English skills are growing through friendly daily practice.',
    velvetGreeting:
      languageMode === 'en_ta'
        ? 'அருமையாக முன்னேறுகிறீர்கள், அர்ஜுன்! உங்கள் பதில்கள் இப்போது மிகவும் சரளமாகவும் நம்பிக்கையுடனும் உள்ளன.'
        : "You're doing great, Arjun! Your answers are smoother and you're pausing less during our chats.",
    overallScoreLabel: languageMode === 'en_ta' ? 'ஒட்டுமொத்த பேச்சுத் திறன் வளர்ச்சி' : 'Overall Speaking Growth',
    levelLabel: languageMode === 'en_ta' ? 'நம்பிக்கையான பேச்சாளர் · நிலை 4' : 'Level 4 · Confident Speaker',
    xpLabel: '1,240 / 2,000 XP',
    skillsHeading: languageMode === 'en_ta' ? 'நான்கு முக்கிய பேச்சுத் திறன்கள்' : 'Four Core Speaking Skills',
    whatImprovedHeading: languageMode === 'en_ta' ? 'இந்த வாரம் என்ன முன்னேறியுள்ளது?' : 'What Improved This Week?',
    strengthsHeading: languageMode === 'en_ta' ? 'உங்கள் பலங்களும் முன்னேற்றக் குறிப்புகளும்' : 'Recent Strengths & Next Steps',
    weeklyCompHeading: languageMode === 'en_ta' ? 'வாராந்திர திறன் ஒப்பீடு' : 'Weekly Skill Growth Comparison',
    recentHeading: languageMode === 'en_ta' ? 'சமீபத்திய பயிற்சி அமர்வுகள்' : 'Recent Practice Sessions',
    startPracticeCTA: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பயிற்சி செய்க' : 'Practice with Velvet',
  };

  // Four Core Skills with student-friendly explanations, levels, improvement suggestions, and recent activity
  const coreSkills = [
    {
      id: 'speaking',
      topicId: 'school',
      name: languageMode === 'en_ta' ? 'பேச்சு வேகம் / சரளம் (Speaking)' : 'Speaking / Fluency',
      percentage: 74,
      lastWeekPercentage: 70,
      level: languageMode === 'en_ta' ? 'சரள பேச்சாளர் (Smooth Communicator)' : 'Smooth Communicator',
      color: 'blue' as const,
      colorHex: '#2563EB',
      badgeColor: 'bg-[#EFF6FF] text-[#2563EB]',
      improvement: '+4% this week',
      explanation:
        languageMode === 'en_ta'
          ? 'உங்கள் பதில்கள் மிகவும் சரளமாகவும் குறைவான இடைநிறுத்தங்களுடனும் வருகின்றன.'
          : 'Your answers are becoming smoother and you are pausing less.',
      suggestion:
        languageMode === 'en_ta'
          ? 'பள்ளி முடிந்ததும் என்ன செய்தீர்கள் என்பதை இடைநிறுத்தமின்றி 3 வாக்கியங்களில் பேசிப் பாருங்கள்.'
          : 'Try answering in 3 connected sentences without pausing in between.',
      recentActivity:
        languageMode === 'en_ta'
          ? 'சமீபத்திய பயிற்சி: பள்ளி வாழ்க்கை தலைப்பில் 5 கேள்விகளுக்கு சரளமாக பதிலளித்தீர்கள்.'
          : 'Recent activity: Answered 5 school questions with smooth sentence flow.',
      icon: <Mic className="w-5 h-5 text-[#2563EB]" />,
    },
    {
      id: 'vocabulary',
      topicId: 'food',
      name: languageMode === 'en_ta' ? 'சொல்லகராதி (Vocabulary)' : 'Vocabulary',
      percentage: 68,
      lastWeekPercentage: 62,
      level: languageMode === 'en_ta' ? 'வார்த்தை ஆய்வாளர் (Word Explorer)' : 'Word Explorer',
      color: 'green' as const,
      colorHex: '#059669',
      badgeColor: 'bg-[#ECFDF5] text-[#059669]',
      improvement: '+6 new words',
      explanation:
        languageMode === 'en_ta'
          ? 'சமீபத்திய உரையாடல்களில் நீங்கள் அதிக புதிய வார்த்தைகளைப் பயன்படுத்தினீர்கள்.'
          : 'You used more new words during your recent conversations.',
      suggestion:
        languageMode === 'en_ta'
          ? 'பதிலளிக்கும்போது "magnificent", "delicious", "fascinating" போன்ற வர்ணனை வார்த்தைகளைப் பயன்படுத்துங்கள்.'
          : 'Use exciting descriptive words like "delicious", "creative", and "fascinating".',
      recentActivity:
        languageMode === 'en_ta'
          ? 'பயன்படுத்திய புதிய வார்த்தைகள்: "attracted", "repelled", "experiments".'
          : 'Recently used: "attracted", "repelled", "delicious", and "experiments".',
      icon: <BookOpen className="w-5 h-5 text-[#059669]" />,
    },
    {
      id: 'pronunciation',
      topicId: 'sports',
      name: languageMode === 'en_ta' ? 'உச்சரிப்பு (Pronunciation)' : 'Pronunciation',
      percentage: 82,
      lastWeekPercentage: 77,
      level: languageMode === 'en_ta' ? 'தெளிவான பேச்சாளர் (Clear Speaker)' : 'Clear Speaker',
      color: 'pink' as const,
      colorHex: '#E11D48',
      badgeColor: 'bg-[#FFF1F2] text-[#E11D48]',
      improvement: '+5% clarity',
      explanation:
        languageMode === 'en_ta'
          ? 'உங்கள் வார்த்தைகள் மிகவும் தெளிவாகவும் எளிதில் புரிந்துகொள்ளும் வகையிலும் உள்ளன.'
          : 'Your words are becoming clearer and easier to understand.',
      suggestion:
        languageMode === 'en_ta'
          ? 'வார்த்தைகளின் கடைசி ஒலிகளான "-ed" மற்றும் "-ing" உச்சரிப்பில் கூடுதல் கவனம் செலுத்துங்கள்.'
          : 'Pay gentle attention to word-ending sounds like "play-ed" and "jump-ing".',
      recentActivity:
        languageMode === 'en_ta'
          ? 'உயர்ந்த உச்சரிப்பு பதிவு: விளையாட்டு தலைப்பில் தெளிவான உச்சரிப்பு.'
          : 'High clarity recorded during Sports & Games cricket dialogue.',
      icon: <Volume2 className="w-5 h-5 text-[#E11D48]" />,
    },
    {
      id: 'confidence',
      topicId: 'friends',
      name: languageMode === 'en_ta' ? 'நம்பிக்கை (Confidence)' : 'Confidence',
      percentage: 80,
      lastWeekPercentage: 72,
      level: languageMode === 'en_ta' ? 'தைரியமான பேச்சாளர் (Brave Speaker)' : 'Brave Speaker',
      color: 'amber' as const,
      colorHex: '#D97706',
      badgeColor: 'bg-[#FFFBEB] text-[#D97706]',
      improvement: '+8% confidence',
      explanation:
        languageMode === 'en_ta'
          ? 'நீங்கள் தயக்கமின்றி விரைவாகப் பேசத் தொடங்குகிறீர்கள் மற்றும் அதிக நேரம் பேசுகிறீர்கள்.'
          : 'You are starting your answers faster and speaking for longer.',
      suggestion:
        languageMode === 'en_ta'
          ? 'உங்களுக்குப் பிடித்த நண்பர்களைப் பற்றி 1 நிமிடம் தொடர்ந்து இடைநிறுத்தமின்றி பேசிப் பாருங்கள்!'
          : 'Challenge yourself to give a 1-minute enthusiastic answer with Velvet!',
      recentActivity:
        languageMode === 'en_ta'
          ? 'கடந்த 3 கேள்விகளில் எந்தவித தயக்கமும் இன்றி உடனடி பதில் அளிக்கப்பட்டது.'
          : 'Fast answer response (under 2 seconds) on all 3 Friends questions.',
      icon: <Award className="w-5 h-5 text-[#D97706]" />,
    },
  ];

  // “What Improved This Week?” Celebratory Highlights
  const weeklyHighlights = [
    {
      id: 'h1',
      title: languageMode === 'en_ta' ? 'குறைவான இடைநிறுத்தம்' : 'Smoother Sentence Flow',
      desc:
        languageMode === 'en_ta'
          ? 'வாக்கியங்களுக்கு இடையே இருந்த யோசிக்கும் நேரம் 3.2 வினாடிகளிலிருந்து 1.1 வினாடிகளாக குறைந்துள்ளது!'
          : 'Average thinking pause between phrases reduced from 3.2s down to 1.1s.',
      icon: <Zap className="w-4 h-4 text-[#2563EB]" />,
      tint: 'bg-[#EFF6FF] border-[#BFDBFE]',
    },
    {
      id: 'h2',
      title: languageMode === 'en_ta' ? 'புதிய வார்த்தைப் பயன்பாடு' : 'New Words in Action',
      desc:
        languageMode === 'en_ta'
          ? 'பள்ளி மற்றும் உணவு பற்றிய உரையாடல்களில் 6 புதிய வர்ணனை வார்த்தைகளை வெற்றிகரமாக பயன்படுத்தியுள்ளீர்கள்.'
          : 'Successfully introduced 6 descriptive adjectives into classroom conversations.',
      icon: <Sparkles className="w-4 h-4 text-[#059669]" />,
      tint: 'bg-[#ECFDF5] border-[#A7F3D0]',
    },
    {
      id: 'h3',
      title: languageMode === 'en_ta' ? 'விரைவான பேச்சுத் தொடக்கம்' : 'Faster Response Starts',
      desc:
        languageMode === 'en_ta'
          ? 'வெல்வெட்டின் கேள்வி முடிந்ததும் தயங்காமல் உடனடியாக ஆங்கிலத்தில் பதில் பேச தொடங்குகிறீர்கள்!'
          : "Starting speaking within 2 seconds of Velvet's prompt without hesitation.",
      icon: <Flame className="w-4 h-4 text-[#D97706]" />,
      tint: 'bg-[#FFFBEB] border-[#FDE68A]',
    },
  ];

  // Recent Strengths & "Keep Practicing" Personal Suggestions
  const strengths = [
    languageMode === 'en_ta'
      ? 'பொதுவான வினைச்சொற்களில் சிறந்த உயிர் எழுத்து ஒலி தெளிவு'
      : 'Natural vowel clarity when describing daily school activities',
    languageMode === 'en_ta'
      ? 'எண்ணங்களை இணைக்க "because" மற்றும் "and" போன்ற வார்த்தைகளின் சிறந்த பயன்பாடு'
      : 'Great use of connecting words like "because" and "and" to build compound thoughts',
    languageMode === 'en_ta'
      ? 'விளையாட்டு மற்றும் நண்பர்கள் பற்றி பேசும்போது இயல்பான குரல் ஏற்ற இறக்கம்'
      : 'Warm, expressive vocal cadence when speaking about sports and friendships',
  ];

  const keepPracticing = [
    languageMode === 'en_ta'
      ? 'கடந்த கால வினைச்சொற்களின் கடைசி ஒலிகள் (-ed, -s)'
      : 'Ending consonant sounds on past-tense verbs (e.g., "walked", "played")',
    languageMode === 'en_ta'
      ? 'ஒவ்வொரு வாக்கியத்திலும் குறைந்தபட்சம் ஒரு புதிய வர்ணனை வார்த்தை சேர்த்தல்'
      : 'Adding at least one descriptive adjective to make stories richer',
    languageMode === 'en_ta'
      ? 'வெல்வெட்டிடம் இறுதியில் ஒரு கேள்வி திரும்பக் கேட்டு உரையாடலை நீட்டித்தல்'
      : 'Asking Velvet a friendly question back to keep the dialogue flowing',
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Sub-navigation Switcher between Skills Analytics, Streaks & Daily Goals, and Achievements */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        <div
          role="tablist"
          aria-label="Progress navigation tabs"
          className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#E2E8F0] shadow-2xs overflow-x-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'insights'}
            onClick={() => setActiveSubTab('insights')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              activeSubTab === 'insights'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Practice Insights</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'analytics'}
            onClick={() => setActiveSubTab('analytics')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              activeSubTab === 'analytics'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Skills & Analytics</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'streaks'}
            onClick={() => setActiveSubTab('streaks')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              activeSubTab === 'streaks'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Streaks & Goals</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'achievements'}
            onClick={() => setActiveSubTab('achievements')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              activeSubTab === 'achievements'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Achievements & Badges</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeSubTab === 'history'}
            onClick={() => setActiveSubTab('history')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              activeSubTab === 'history'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD]'
            }`}
          >
            <History className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Progress History</span>
          </button>
        </div>

        <span className="text-xs text-[#64748B] font-medium hidden md:inline">
          {activeSubTab === 'analytics'
            ? 'Detailed 4-core competencies & improvement tips'
            : activeSubTab === 'streaks'
            ? 'Daily consistency, 7-day streak & habit calendar'
            : activeSubTab === 'achievements'
            ? '24 personal badges & speaking milestones'
            : 'Longitudinal growth timeline & session history'}
        </span>
      </div>

      {activeSubTab === 'insights' ? (
        <StudentPracticeInsightsScreen
          languageMode={languageMode}
          studentName={studentName}
          studentClass={studentClass}
          onOpenConversation={onOpenConversation || (() => {})}
        />
      ) : activeSubTab === 'streaks' ? (
        <DailyGoalsStreaksScreen
          languageMode={languageMode}
          onOpenConversation={onOpenConversation}
          onViewProgress={() => setActiveSubTab('analytics')}
          onViewAchievements={() => setActiveSubTab('achievements')}
          onViewHistory={() => setActiveSubTab('history')}
          studentName={studentName}
          studentClass={studentClass}
          schoolName={schoolName}
        />
      ) : activeSubTab === 'achievements' ? (
        <AchievementsBadgesScreen
          languageMode={languageMode}
          onOpenConversation={onOpenConversation}
          onNavigateToTab={(tab) => setActiveSubTab(tab)}
          studentName={studentName}
          studentClass={studentClass}
          schoolName={schoolName}
        />
      ) : activeSubTab === 'history' ? (
        <ProgressHistoryScreen
          languageMode={languageMode}
          onOpenConversation={onOpenConversation}
          onNavigateToTab={(tab) => setActiveSubTab(tab)}
          studentName={studentName}
          studentClass={studentClass}
          schoolName={schoolName}
        />
      ) : (
        <div className="space-y-8 animate-fade-in">
          {/* ======================================================== */}
          {/* 1. HEADER & PERSONAL PROGRESS BANNER                     */}
          {/* ======================================================== */}
          <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Zone */}
          <div className="space-y-2.5 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{schoolName} · {studentClass} Spoken English Analytics</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              {t.title}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {t.subtitle}
            </p>

            {/* Supportive speech bubble from Velvet */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#BFDBFE] shadow-2xs text-xs text-[#1E40AF] font-medium flex items-center gap-2">
              <VelvetSparkleStar size={14} color="blue" />
              <span>"{t.velvetGreeting}"</span>
            </div>
          </div>

          {/* Right Mascot Representation */}
          <div className="shrink-0 relative flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
            <VelvetMascot state="happy" size="lg" animated={true} />
          </div>
        </div>
      </div>

      {/* Mobile-Dedicated Progress & Growth Celebration Visual Slot (< 640px) */}
      <div className="sm:hidden w-full">
        <MobileVisualSlot
          src={SPEAK_VELVET_ASSETS.progress.growthCelebration.src}
          alt={SPEAK_VELVET_ASSETS.progress.growthCelebration.alt}
          aspectRatio="16:9"
          fitMode="cover"
          rounded="2xl"
          fallbackMascotState="celebration"
          fallbackTitle="76% Spoken English Growth!"
          fallbackSubtitle="Arjun has advanced by +5.8% this week with 7 continuous active days"
          className="shadow-2xs"
        />
      </div>

      {/* ======================================================== */}
      {/* 2. OVERALL SKILL OVERVIEW & GROWTH VISUALIZATION         */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Growth Summary Card (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {t.overallScoreLabel}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-[#2563EB]">
                    76%
                  </span>
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-0.5 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+5.8% this week</span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] inline-block">
                  Personal Best Record 🌟
                </span>
                <span className="text-[11px] text-[#64748B] block mt-1">
                  Measured across 4 core skills
                </span>
              </div>
            </div>

            {/* Composite 4-Skill Growth Comparison Bars */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-[#0F172A] block">
                Growth Across All 4 Skills:
              </span>

              <div className="space-y-2.5">
                {coreSkills.map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-[#334155] font-semibold">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#94A3B8] font-mono text-[11px]">
                          Last week: {skill.lastWeekPercentage}%
                        </span>
                        <span className="font-mono font-bold" style={{ color: skill.colorHex }}>
                          {skill.percentage}%
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${skill.badgeColor}`}>
                          {skill.improvement}
                        </span>
                      </div>
                    </div>
                    <VelvetProgressBar value={skill.percentage} color={skill.color} size="sm" showValueText={false} />
                  </div>
                ))}
              </div>
            </div>

            {/* Level & XP Box */}
            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#F59E0B]" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">
                    {t.levelLabel}
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Speaking XP: <strong className="text-[#2563EB] font-mono">{t.xpLabel}</strong>
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-[#2563EB] bg-white px-3 py-1.5 rounded-xl border border-[#BFDBFE] shadow-2xs">
                760 XP to Level 5
              </span>
            </div>
          </VelvetCard>
        </div>

        {/* Weekly Skill Comparison Visual Gauge (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          
          {/* Weekly Gain Summary Card */}
          <VelvetCard tint="white" padding="lg" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base text-[#0F172A]">
                  {t.weeklyCompHeading}
                </h3>
                <p className="text-xs text-[#64748B]">
                  Positive progress made in all areas
                </p>
              </div>

              <span className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </span>
            </div>

            {/* Simple Visual Comparison Columns */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center">
              {coreSkills.map((skill) => {
                const diff = skill.percentage - skill.lastWeekPercentage;
                return (
                  <div key={skill.id} className="p-2.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex flex-col justify-between h-28">
                    <span className="text-[10px] font-bold text-[#64748B] truncate">
                      {skill.id.toUpperCase()}
                    </span>
                    <div className="my-auto">
                      <span className="font-mono font-bold text-lg block" style={{ color: skill.colorHex }}>
                        {skill.percentage}%
                      </span>
                      <span className="text-[10px] font-bold text-[#059669] block">
                        +{diff}%
                      </span>
                    </div>
                    <span className="text-[9px] text-[#94A3B8]">vs last week</span>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-[#64748B] pt-2 border-t border-[#F1F5F9] leading-relaxed">
              💡 <strong>Coach Note:</strong> Your confidence and fluency had the highest gains this week due to your daily conversations!
            </p>
          </VelvetCard>

          {/* Quick Streak & Confidence Boost Pill */}
          <VelvetStreakIndicator
            streakCount={7}
            streakStatusText="7-day speaking streak active! Your confidence is soaring."
          />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. FOUR CORE SKILLS DEEP DIVE CARDS                      */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
              {t.skillsHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Detailed breakdown with personalized practice tips and recent activities.
            </p>
          </div>

          <span className="text-xs font-bold text-[#059669] flex items-center gap-1 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Encouraging Steady Progress</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {coreSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-6 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              {/* Header: Icon, Name, Level, Progress Bar */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center shrink-0">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-base text-[#0F172A]">
                        {skill.name}
                      </h3>
                      <span className="text-xs font-medium text-[#64748B]">
                        Level: <strong className="text-[#0F172A]">{skill.level}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-extrabold text-2xl" style={{ color: skill.colorHex }}>
                      {skill.percentage}%
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full block mt-0.5 ${skill.badgeColor}`}>
                      {skill.improvement}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <VelvetProgressBar
                  value={skill.percentage}
                  color={skill.color}
                  size="md"
                  showValueText={false}
                />

                {/* Student Friendly Explanation */}
                <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0]/80 text-xs text-[#0F172A] leading-relaxed">
                  <span className="font-bold text-[#2563EB] block mb-0.5">
                    How you're doing:
                  </span>
                  "{skill.explanation}"
                </div>

                {/* Practical Improvement Suggestion */}
                <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE]/60 text-xs text-[#1E40AF] leading-relaxed space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-[#2563EB]">
                    <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Coach Tip to Improve:</span>
                  </span>
                  <p>{skill.suggestion}</p>
                </div>

                {/* Recent Practice Activity */}
                <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  <span className="truncate">{skill.recentActivity}</span>
                </div>
              </div>

              {/* Direct Practice Link Action */}
              <div className="pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenConversation) onOpenConversation(skill.topicId);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow-xs group"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Practice {skill.id === 'speaking' ? 'Fluency' : skill.id.charAt(0).toUpperCase() + skill.id.slice(1)} with Velvet</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. “WHAT IMPROVED THIS WEEK?” SECTION                    */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.whatImprovedHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Key milestones you reached during your daily speaking practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weeklyHighlights.map((highlight) => (
            <div
              key={highlight.id}
              className={`p-5 rounded-3xl border ${highlight.tint} shadow-2xs space-y-2 flex flex-col justify-between`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs">
                  {highlight.icon}
                </div>
                <h4 className="font-bold text-sm text-[#0F172A]">
                  {highlight.title}
                </h4>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                {highlight.desc}
              </p>

              <span className="text-[10px] font-bold text-[#059669] flex items-center gap-1 pt-1 border-t border-black/5">
                <Check className="w-3 h-3" />
                <span>Verified in Spoken Dialogue</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. RECENT STRENGTHS & "KEEP PRACTICING" SUGGESTIONS     */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.strengthsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Celebrated habits you've built, along with gentle next steps for next week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: What You're Doing Great */}
          <VelvetCard tint="white" padding="lg" className="space-y-4 border-l-4 border-l-[#10B981]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#059669]">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              <span>Your Current Strengths (Great Habits!)</span>
            </div>

            <ul className="space-y-3">
              {strengths.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#334155] leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </VelvetCard>

          {/* Right: Keep Practicing Next */}
          <VelvetCard tint="white" padding="lg" className="space-y-4 border-l-4 border-l-[#2563EB]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2563EB]">
              <Target className="w-4 h-4 text-[#2563EB]" />
              <span>Keep Practicing (Gentle Next Steps)</span>
            </div>

            <ul className="space-y-3">
              {keepPracticing.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#334155] leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    →
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </VelvetCard>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. MOTIVATING HERO CALL-TO-ACTION                        */}
      {/* ======================================================== */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 sm:p-8 text-white shadow-[0_12px_36px_rgba(37,99,235,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
            <Zap className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Ready for Today's Speaking Conversation?</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Practice with Velvet to boost your Fluency!
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            Spend 3 minutes chatting with Velvet on any of the 8 everyday topics. Your progress will automatically update here!
          </p>
        </div>

        <VelvetButton
          variant="accent"
          size="lg"
          onClick={() => {
            if (onOpenConversation) onOpenConversation('school');
          }}
          leftIcon={<Mic className="w-5 h-5 text-[#0F172A]" />}
          className="bg-gradient-to-tr from-[#FBBF24] to-[#F59E0B] text-[#0F172A] border-none shadow-[0_8px_24px_rgba(245,158,11,0.50)] hover:scale-105 active:scale-95 shrink-0"
        >
          {t.startPracticeCTA}
        </VelvetButton>
      </div>
        </div>
      )}
    </div>
  );
};
