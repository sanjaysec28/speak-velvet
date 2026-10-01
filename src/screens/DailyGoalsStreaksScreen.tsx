import React, { useState } from 'react';
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
  Flame,
  Clock,
  Target,
  CheckCircle2,
  Mic,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Zap,
  Check,
  Trophy,
  Play,
  RotateCcw,
  Smile,
  Compass,
  Star,
} from 'lucide-react';

export interface DailyGoalsStreaksScreenProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  onViewProgress?: () => void;
  onViewAchievements?: () => void;
  onViewHistory?: () => void;
  studentName?: string;
  studentClass?: string;
  schoolName?: string;
}

export const DailyGoalsStreaksScreen: React.FC<DailyGoalsStreaksScreenProps> = ({
  languageMode = 'en',
  onOpenConversation,
  onViewProgress,
  onViewAchievements,
  onViewHistory,
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  schoolName = 'Vivekanandha School',
}) => {
  // Bilingual copy dictionary
  const t = {
    screenTag: languageMode === 'en_ta' ? 'தொடர் பயிற்சி & தினசரி இலக்கு' : 'Streaks & Daily Goals',
    screenTitle: languageMode === 'en_ta' ? 'தினசரி பேச்சுப் பழக்கம்' : 'Daily Speaking Habit',
    screenSub:
      languageMode === 'en_ta'
        ? 'தினமும் சில நிமிடங்கள் பேசி உங்கள் ஆங்கிலப் பேச்சுப் பழக்கத்தை உறுதியாக்குங்கள்.'
        : 'Build a steady, relaxed English-speaking routine one conversation at a time.',
    velvetCoachMsg:
      languageMode === 'en_ta'
        ? 'நீங்கள் 7 நாள் தொடர் பழக்கத்தை உருவாக்கியுள்ளீர்கள்! இன்றும் உங்கள் உரையாடலைத் தொடருங்கள்.'
        : "You've built a 7-day habit! Keep your conversation going today.",
    velvetCoachSub:
      languageMode === 'en_ta'
        ? 'இன்னும் கொஞ்சம் தான்! Velvet உடன் 1.5 நிமிடங்கள் பேசுங்கள்.'
        : "You're almost there! Just 1.5 more minutes with Velvet.",
    todayGoalHeading: languageMode === 'en_ta' ? 'இன்றைய பேசும் இலக்கு' : "Today's Speaking Goal",
    streakHeading: languageMode === 'en_ta' ? 'தொடர் பேச்சு நாட்கள்' : 'Personal Speaking Streak',
    weekConsistencyHeading: languageMode === 'en_ta' ? 'இந்த வார நிலைத்தன்மை' : 'This Week Consistency',
    monthHabitHeading: languageMode === 'en_ta' ? 'மாதாந்திர பழக்க நாள்காட்டி' : 'Monthly Habit Calendar',
    milestonesHeading: languageMode === 'en_ta' ? 'தனிப்பட்ட மைல்கற்கள்' : 'Personal Speaking Milestones',
    quickActionsHeading: languageMode === 'en_ta' ? 'விரைவுச் செயல்கள்' : 'Quick Practice Actions',
    talkWithVelvetCTA: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பேசுங்கள்' : 'Talk with Velvet',
    continueGoalCTA: languageMode === 'en_ta' ? 'இன்றைய இலக்கை முடிக்க' : "Continue Today's Goal",
    viewProgressCTA: languageMode === 'en_ta' ? 'என் முன்னேற்றத்தைப் பார்க்க' : 'View My Progress',
    viewAchievementsCTA: languageMode === 'en_ta' ? 'சாதனைகளைப் பார்க்க' : 'View Achievements',
  };

  // Mock student stats
  const dailyTargetMins = 5.0;
  const completedMins = 3.5;
  const remainingMins = 1.5;
  const completionPercentage = Math.round((completedMins / dailyTargetMins) * 100);
  const questionsToday = 7;
  const conversationsToday = 2;

  // Streak details
  const currentStreak = 7;
  const longestStreak = 12;
  const daysPracticedThisMonth = 18;

  // Monday to Sunday activity for "This Week"
  const weekDays = [
    { day: 'Mon', fullDay: 'Monday', mins: 4.2, goalMet: false, practiced: true, percentage: 84 },
    { day: 'Tue', fullDay: 'Tuesday', mins: 3.8, goalMet: false, practiced: true, percentage: 76 },
    { day: 'Wed', fullDay: 'Wednesday', mins: 5.0, goalMet: true, practiced: true, percentage: 100 },
    { day: 'Thu', fullDay: 'Thursday', mins: 3.5, goalMet: false, practiced: true, percentage: 70 },
    { day: 'Fri', fullDay: 'Friday', mins: 4.5, goalMet: false, practiced: true, percentage: 90 },
    { day: 'Sat', fullDay: 'Saturday', mins: 3.5, goalMet: false, practiced: true, percentage: 70 },
    { day: 'Sun', fullDay: 'Sunday (Today)', mins: 3.5, goalMet: false, practiced: true, percentage: 70, isToday: true },
  ];

  // 30-Day Monthly Habit Calendar Grid (Realistic mock data for September 2026)
  // Intensity: 0 = none, 1 = light (1-2.9m), 2 = good (3-4.9m), 3 = goal met (5m+)
  const monthDays = [
    { day: 1, mins: 4.5, intensity: 2 },
    { day: 2, mins: 5.0, intensity: 3 },
    { day: 3, mins: 3.2, intensity: 2 },
    { day: 4, mins: 5.5, intensity: 3 },
    { day: 5, mins: 0.0, intensity: 0 },
    { day: 6, mins: 4.0, intensity: 2 },
    { day: 7, mins: 5.0, intensity: 3 },
    { day: 8, mins: 3.8, intensity: 2 },
    { day: 9, mins: 5.2, intensity: 3 },
    { day: 10, mins: 4.0, intensity: 2 },
    { day: 11, mins: 0.0, intensity: 0 },
    { day: 12, mins: 3.5, intensity: 2 },
    { day: 13, mins: 5.0, intensity: 3 },
    { day: 14, mins: 4.2, intensity: 2 },
    { day: 15, mins: 0.0, intensity: 0 },
    { day: 16, mins: 5.0, intensity: 3 },
    { day: 17, mins: 3.8, intensity: 2 },
    { day: 18, mins: 4.5, intensity: 2 },
    { day: 19, mins: 5.0, intensity: 3 },
    { day: 20, mins: 0.0, intensity: 0 },
    { day: 21, mins: 5.0, intensity: 3 },
    { day: 22, mins: 4.2, intensity: 2 },
    { day: 23, mins: 3.8, intensity: 2 },
    { day: 24, mins: 5.0, intensity: 3 },
    { day: 25, mins: 3.5, intensity: 2 },
    { day: 26, mins: 4.5, intensity: 2 },
    { day: 27, mins: 3.5, intensity: 2 },
    { day: 28, mins: 5.0, intensity: 3 },
    { day: 29, mins: 3.5, intensity: 2, isToday: true },
    { day: 30, mins: 0.0, intensity: 0, isFuture: true },
  ];

  // Personal Milestones
  const personalMilestones = [
    {
      id: 'm1',
      title: '7-Day Streak',
      desc: 'Spoke English 7 consecutive days',
      status: 'Unlocked today! 🔥',
      unlocked: true,
      color: 'border-[#F59E0B] bg-[#FFFBEB] text-[#D97706]',
      icon: <Flame className="w-5 h-5 text-[#F59E0B]" />,
    },
    {
      id: 'm2',
      title: 'First 5-Minute Practice',
      desc: 'Completed a full 5-minute daily session',
      status: 'Completed 🏆',
      unlocked: true,
      color: 'border-[#10B981] bg-[#ECFDF5] text-[#059669]',
      icon: <Award className="w-5 h-5 text-[#10B981]" />,
    },
    {
      id: 'm3',
      title: '10 Conversations Completed',
      desc: '12 conversations finished with Velvet',
      status: '12 / 10 Completed 💬',
      unlocked: true,
      color: 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />,
    },
    {
      id: 'm4',
      title: '50 Questions Answered',
      desc: '48 questions answered across topics',
      status: '48 / 50 (Just 2 more!) 🎯',
      unlocked: false,
      color: 'border-[#E2E8F0] bg-white text-[#475569]',
      icon: <Target className="w-5 h-5 text-[#2563EB]" />,
    },
    {
      id: 'm5',
      title: '30 Minutes Spoken',
      desc: 'Accumulated 68.5 total speaking minutes',
      status: '68.5m Spoken ⭐',
      unlocked: true,
      color: 'border-[#8B5CF6] bg-[#F5F3FF] text-[#7C3AED]',
      icon: <Star className="w-5 h-5 text-[#8B5CF6]" />,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. HEADER & VELVET COACH SUPPORTIVE BANNER               */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Zone */}
          <div className="space-y-2.5 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{t.screenTag} · {schoolName}</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
              {t.screenTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              {t.screenSub}
            </p>

            {/* Supportive speech bubble from Velvet */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#BFDBFE] shadow-2xs text-xs text-[#1E40AF] font-medium flex items-center gap-2 text-left">
              <VelvetSparkleStar size={14} color="blue" />
              <div>
                <p className="font-bold text-[#0F172A]">"{t.velvetCoachMsg}"</p>
                <p className="text-[11px] text-[#2563EB] mt-0.5">{t.velvetCoachSub}</p>
              </div>
            </div>
          </div>

          {/* Right Mascot Representation */}
          <div className="shrink-0 relative flex items-center justify-center">
            <div className="absolute w-44 h-44 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
            <VelvetMascot state="happy" size="lg" animated={true} />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TODAY'S SPEAKING GOAL & CURRENT STREAK HERO CARDS    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* TODAY'S GOAL RING CARD (7 cols) */}
        <div className="lg:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {t.todayGoalHeading}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] mt-0.5">
                  {completedMins} <span className="text-sm font-normal text-[#64748B]">/ {dailyTargetMins} mins</span>
                </h3>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{completionPercentage}% Done Today</span>
              </span>
            </div>

            {/* Circular Ring Progress with Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              
              {/* Circular Ring Gauge */}
              <div className="relative flex items-center justify-center">
                <VelvetCircularProgress
                  value={completionPercentage}
                  size={140}
                  strokeWidth={12}
                  color="blue"
                  showValueText={false}
                />
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <Clock className="w-5 h-5 text-[#2563EB] mb-0.5" />
                  <span className="font-display font-extrabold text-2xl text-[#0F172A] leading-none">
                    {completedMins}m
                  </span>
                  <span className="text-[10px] font-semibold text-[#64748B] mt-0.5">
                    {remainingMins}m left
                  </span>
                </div>
              </div>

              {/* Today's Context Metrics */}
              <div className="space-y-3 w-full sm:w-auto">
                <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs shrink-0">
                    7
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">Questions Answered</span>
                    <span className="text-[10px] text-[#64748B]">Across School & Friends</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">Conversations Completed</span>
                    <span className="text-[10px] text-[#64748B]">Natural school dialogues</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Encouraging helper & CTA */}
            <div className="pt-2 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#475569] text-center sm:text-left">
                💡 <strong>Coach Tip:</strong> Just one 2-minute chat completes your daily goal!
              </span>

              <VelvetButton
                variant="primary"
                size="md"
                onClick={() => {
                  if (onOpenConversation) onOpenConversation('school');
                }}
                leftIcon={<Mic className="w-4 h-4 text-white" />}
                className="w-full sm:w-auto shadow-xs"
              >
                {t.talkWithVelvetCTA}
              </VelvetButton>
            </div>
          </VelvetCard>
        </div>

        {/* PROMINENT PERSONAL STREAK CARD (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-5 border-l-4 border-l-[#F59E0B]">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  {t.streakHeading}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#D97706] flex items-center gap-1.5">
                    <Flame className="w-8 h-8 text-[#F59E0B] fill-[#F59E0B] animate-pulse" />
                    <span>{currentStreak} Days</span>
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]">
                Unbroken Streak 🔥
              </span>
            </div>

            {/* Streak Metrics Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Longest Streak</span>
                <span className="font-display font-extrabold text-xl text-[#0F172A] mt-0.5 block">
                  {longestStreak} Days
                </span>
                <span className="text-[10px] text-[#059669]">Personal record</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0]">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">This Month</span>
                <span className="font-display font-extrabold text-xl text-[#2563EB] mt-0.5 block">
                  {daysPracticedThisMonth} Days
                </span>
                <span className="text-[10px] text-[#64748B]">Active practice</span>
              </div>
            </div>

            {/* 7-Day Mini Streak Calendar Circles */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#475569] block">
                Last 7 Days Consistency:
              </span>
              <div className="flex items-center justify-between gap-1 pt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((letter, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-[#FFFBEB] border-2 border-[#F59E0B] flex items-center justify-center shadow-2xs">
                      <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#64748B]">{letter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Encouraging Non-Competitive Statement */}
            <p className="text-xs text-[#64748B] pt-2 border-t border-[#F1F5F9] leading-relaxed">
              🌱 Every little conversation helps your spoken English grow naturally. No pressure, just practice!
            </p>
          </VelvetCard>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. WEEKLY CONSISTENCY (MONDAY–SUNDAY ACTIVITY)          */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
              {t.weekConsistencyHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Day-by-day speaking minutes and goal completions for this week.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] self-start sm:self-auto">
            Target Met 5 of 7 Days
          </span>
        </div>

        {/* 7-Day Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div
              key={day.day}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between space-y-3 ${
                day.isToday
                  ? 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                  : 'bg-white border-[#E2E8F0] shadow-2xs'
              }`}
            >
              {/* Day header */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${day.isToday ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                  {day.day}
                </span>

                {day.goalMet ? (
                  <span className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center text-[10px] font-bold" title="Goal Completed!">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-[10px] font-bold" title="Practiced">
                    ●
                  </span>
                )}
              </div>

              {/* Minutes */}
              <div>
                <span className="font-display font-extrabold text-xl text-[#0F172A] block">
                  {day.mins}m
                </span>
                <span className="text-[10px] text-[#64748B]">
                  {day.goalMet ? '5m Target hit' : 'of 5m target'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="pt-1 border-t border-[#F1F5F9]">
                <VelvetProgressBar
                  value={day.percentage}
                  color={day.goalMet ? 'green' : 'blue'}
                  size="sm"
                  showValueText={false}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. MONTHLY HABIT VIEW & SUMMARY STATS                    */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.monthHabitHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Consistency view across all 30 days of this month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Monthly Habit Heatmap Grid (7 cols) */}
          <div className="lg:col-span-7">
            <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-4">
              
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#2563EB]" />
                  <span>September 2026</span>
                </span>

                {/* Intensity Legend */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#64748B]">
                  <span>Less</span>
                  <span className="w-3 h-3 rounded-md bg-[#F1F5F9] border border-[#E2E8F0]" title="No practice" />
                  <span className="w-3 h-3 rounded-md bg-[#DBEAFE]" title="1-3 mins" />
                  <span className="w-3 h-3 rounded-md bg-[#93C5FD]" title="3-4.9 mins" />
                  <span className="w-3 h-3 rounded-md bg-[#2563EB]" title="5m+ Target hit" />
                  <span>More</span>
                </div>
              </div>

              {/* Calendar Grid 6 cols x 5 rows */}
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 pt-2">
                {monthDays.map((m) => {
                  let bgStyle = 'bg-[#F1F5F9] text-[#94A3B8]';
                  if (m.intensity === 1) bgStyle = 'bg-[#DBEAFE] text-[#1E40AF]';
                  if (m.intensity === 2) bgStyle = 'bg-[#93C5FD] text-[#1E3A8A]';
                  if (m.intensity === 3) bgStyle = 'bg-[#2563EB] text-white font-bold';

                  return (
                    <div
                      key={m.day}
                      className={`h-10 rounded-xl flex flex-col items-center justify-center text-xs transition-all relative group cursor-default ${bgStyle} ${
                        m.isToday ? 'ring-2 ring-[#F59E0B] ring-offset-1 font-extrabold' : ''
                      }`}
                      title={`Day ${m.day}: ${m.mins > 0 ? `${m.mins} minutes spoken` : 'Rest day'}`}
                    >
                      <span>{m.day}</span>
                      {m.mins >= 5.0 && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-white" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer note */}
              <p className="text-[11px] text-[#64748B] pt-2 border-t border-[#F1F5F9]">
                ⭐ <strong>Tip:</strong> Darker blue squares highlight days where you completed your full 5-minute speaking goal!
              </p>
            </VelvetCard>
          </div>

          {/* Simple Month Summary Stats (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            
            <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase">Practice Days</span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#059669]">
                18 <span className="text-sm font-normal text-[#64748B]">/ 30</span>
              </span>
              <span className="text-[10px] text-[#059669] font-medium">60% active rate</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase">Total Minutes</span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#2563EB]">
                68.5m
              </span>
              <span className="text-[10px] text-[#64748B] font-medium">Spoken in English</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase">Average / Day</span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#D97706]">
                3.8m
              </span>
              <span className="text-[10px] text-[#059669] font-medium">+0.6m vs August</span>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-1">
              <span className="text-[11px] font-bold text-[#64748B] uppercase">Goals Met</span>
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#10B981]">
                14 Days
              </span>
              <span className="text-[10px] text-[#059669] font-medium">5m goal hit</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PERSONAL SPEAKING MILESTONES                          */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.milestonesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Celebrated individual speaking achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {personalMilestones.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-3xl border transition-all space-y-2 flex flex-col justify-between shadow-2xs ${m.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-2xs shrink-0">
                  {m.icon}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F172A] leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-tight">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-xs font-bold">
                <span>{m.status}</span>
                {m.unlocked && <span className="text-[10px] text-[#059669]">Personal Best</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. QUICK PRACTICE ACTIONS & MOTIVATING HERO BANNER       */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
          {t.quickActionsHeading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Action 1: Talk with Velvet */}
          <button
            type="button"
            onClick={() => {
              if (onOpenConversation) onOpenConversation('school');
            }}
            className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              🎙️
            </div>
            <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors block">
              {t.talkWithVelvetCTA}
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">Start daily English chat</p>
          </button>

          {/* Action 2: Continue Today's Goal */}
          <button
            type="button"
            onClick={() => {
              if (onOpenConversation) onOpenConversation('friends');
            }}
            className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#10B981] hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              🎯
            </div>
            <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#059669] transition-colors block">
              {t.continueGoalCTA}
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">1.5 mins left to reach 5m</p>
          </button>

          {/* Action 3: View My Progress */}
          <button
            type="button"
            onClick={() => {
              if (onViewProgress) onViewProgress();
            }}
            className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#F59E0B] hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              📊
            </div>
            <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#D97706] transition-colors block">
              {t.viewProgressCTA}
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">Check fluency & skills</p>
          </button>

          {/* Action 4: View Achievements */}
          <button
            type="button"
            onClick={() => {
              if (onViewAchievements) onViewAchievements();
            }}
            className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#8B5CF6] hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              🏆
            </div>
            <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#7C3AED] transition-colors block">
              {t.viewAchievementsCTA}
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">Badges & level trophies</p>
          </button>

          {/* Action 5: View Progress History */}
          <button
            type="button"
            onClick={() => {
              if (onViewHistory) onViewHistory();
            }}
            className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
              🕒
            </div>
            <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors block">
              Progress History
            </span>
            <p className="text-xs text-[#64748B] mt-0.5">Timeline & session logs</p>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. HERO CTA: PROTECT YOUR STREAK                         */}
      {/* ======================================================== */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 sm:p-8 text-white shadow-[0_12px_36px_rgba(37,99,235,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
            <Flame className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>7-Day Streak Active!</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Keep your speaking momentum going!
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            Spend just 1.5 more minutes with Velvet today to finish your daily speaking target and protect your streak.
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
          {t.talkWithVelvetCTA}
        </VelvetButton>
      </div>

    </div>
  );
};
