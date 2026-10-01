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
  History,
  TrendingUp,
  Clock,
  Calendar,
  CheckCircle2,
  Mic,
  Award,
  Sparkles,
  Flame,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Volume2,
  Zap,
  X,
  Compass,
  Lightbulb,
  Check,
  Target,
  Trophy,
} from 'lucide-react';

export type HistoryPeriod = 'this_week' | 'this_month' | 'last_3_months' | 'all_time';

export interface PracticeSessionRecord {
  id: string;
  date: string;
  topic: string;
  topicId: string;
  title: string;
  emoji: string;
  duration: string;
  durationMins: number;
  questions: number;
  skillFocus: string;
  score: string;
  xpEarned: number;
  feedback: string;
  feedbackTa: string;
  suggestion: string;
  suggestionTa: string;
}

export interface ProgressHistoryScreenProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  onNavigateToTab?: (tab: 'analytics' | 'streaks' | 'achievements') => void;
  studentName?: string;
  studentClass?: string;
  schoolName?: string;
}

export const ProgressHistoryScreen: React.FC<ProgressHistoryScreenProps> = ({
  languageMode = 'en',
  onOpenConversation,
  onNavigateToTab,
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  schoolName = 'Vivekanandha School',
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<HistoryPeriod>('this_month');
  const [selectedSession, setSelectedSession] = useState<PracticeSessionRecord | null>(null);

  // Bilingual strings
  const t = {
    screenTag: languageMode === 'en_ta' ? 'முன்னேற்ற வரலாறு' : 'Progress History',
    screenTitle: languageMode === 'en_ta' ? 'உங்கள் பேச்சு வளர்ச்சி வரலாறு' : 'Progress History',
    screenSub:
      languageMode === 'en_ta'
        ? 'நீங்கள் பேசிய ஒவ்வொரு உரையாடலும் எவ்வாறு உங்கள் நம்பிக்கையை உயர்த்தியது என்பதை இங்கே பாருங்கள்.'
        : 'See how your English-speaking consistency and confidence have evolved over time.',
    velvetGreeting:
      languageMode === 'en_ta'
        ? 'நீங்கள் எவ்வளவு தூரம் முன்னேறியுள்ளீர்கள் என்று பாருங்கள்! உங்கள் பேச்சுப் பயணம் ஒவ்வொரு உரையாடலிலும் வளர்ந்து வருகிறது.'
        : "Look how far you've come! Your speaking journey is growing one conversation at a time.",
    velvetInsightTitle: languageMode === 'en_ta' ? 'வெல்வெட்டின் பயிற்சியாளர் குறிப்பு' : 'Velvet Coach Insight',
    velvetInsight:
      languageMode === 'en_ta'
        ? 'இந்த மாதம் நீங்கள் மிக சீராகப் பயிற்சி செய்துள்ளீர்கள். உங்கள் தன்னம்பிக்கை உயர்ந்துள்ளது, அடுத்ததாக நீண்ட பதில்களைப் பேசிப் பாருங்கள்!'
        : 'You practiced more consistently this month. Your confidence has grown steadily. Try longer answers next!',
    periodHeading: languageMode === 'en_ta' ? 'காலகட்டம்' : 'Select Time Period',
    timelineHeading: languageMode === 'en_ta' ? 'பேச்சு வளர்ச்சி காலவரிசை' : 'Speaking Growth Timeline',
    skillHistoryHeading: languageMode === 'en_ta' ? 'திறன் வளர்ச்சி வரலாறு' : 'Skill Progress History',
    practiceHistoryHeading: languageMode === 'en_ta' ? 'பயிற்சி அமர்வுகள்' : 'Recent Practice History',
    milestonesHeading: languageMode === 'en_ta' ? 'தனிப்பட்ட மைல்கற்கள் காலவரிசை' : 'Personal Milestones Timeline',
    monthlySummaryHeading: languageMode === 'en_ta' ? 'மாதாந்திர செயல்பாட்டுச் சுருக்கம்' : 'Monthly Summary & Growth',
    quickActionsHeading: languageMode === 'en_ta' ? 'விரைவுச் செயல்கள்' : 'Quick Actions',
    talkWithVelvetCTA: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பேசுக' : 'Talk with Velvet',
    practiceAgainCTA: languageMode === 'en_ta' ? 'மீண்டும் பயிற்சி செய்க' : 'Practice Again with Velvet',
  };

  // Mock data varying by time period
  const periodData = {
    this_week: {
      speakingScore: 76,
      scoreGain: '+4.2%',
      totalTime: '24.5 Mins',
      timeDelta: '+6.5 mins vs last week',
      totalConversations: 5,
      questionsAnswered: 22,
      xpEarned: 320,
      practiceDays: 5,
      goalsCompleted: 4,
    },
    this_month: {
      speakingScore: 76,
      scoreGain: '+8.0%',
      totalTime: '68.5 Mins',
      timeDelta: '+12.5 mins vs August',
      totalConversations: 12,
      questionsAnswered: 48,
      xpEarned: 1240,
      practiceDays: 18,
      goalsCompleted: 14,
    },
    last_3_months: {
      speakingScore: 76,
      scoreGain: '+18.5%',
      totalTime: '154 Mins',
      timeDelta: '+45 mins across term',
      totalConversations: 34,
      questionsAnswered: 136,
      xpEarned: 2850,
      practiceDays: 46,
      goalsCompleted: 38,
    },
    all_time: {
      speakingScore: 76,
      scoreGain: '+26.0%',
      totalTime: '210 Mins',
      timeDelta: 'From Day 1 of Class 8',
      totalConversations: 48,
      questionsAnswered: 192,
      xpEarned: 3950,
      practiceDays: 64,
      goalsCompleted: 52,
    },
  }[selectedPeriod];

  // 4 Core Skills Comparison (Past vs Current)
  const skillHistory = [
    {
      id: 'fluency',
      name: languageMode === 'en_ta' ? 'பேச்சு வேகம் / சரளம் (Speaking)' : 'Speaking / Fluency',
      prevValue: 68,
      currValue: 74,
      gain: '+6%',
      colorHex: '#2563EB',
      color: 'blue' as const,
      explanation:
        languageMode === 'en_ta'
          ? 'உங்கள் பதில்கள் மிகவும் சரளமாகி வருகின்றன மற்றும் யோசிக்கும் இடைநிறுத்தம் குறைந்துள்ளது.'
          : 'Your answers are becoming smoother and you are pausing less between thoughts.',
      icon: <Mic className="w-4 h-4 text-[#2563EB]" />,
    },
    {
      id: 'vocabulary',
      name: languageMode === 'en_ta' ? 'சொல்லகராதி (Vocabulary)' : 'Vocabulary',
      prevValue: 62,
      currValue: 68,
      gain: '+6%',
      colorHex: '#059669',
      color: 'green' as const,
      explanation:
        languageMode === 'en_ta'
          ? 'சமீபத்திய உரையாடல்களில் 28 புதிய அன்றாட வார்த்தைகளைப் பயன்படுத்தியுள்ளீர்கள்.'
          : 'You are using more new descriptive words like "delicious", "attracted", and "experiments".',
      icon: <BookOpen className="w-4 h-4 text-[#059669]" />,
    },
    {
      id: 'pronunciation',
      name: languageMode === 'en_ta' ? 'உச்சரிப்பு (Pronunciation)' : 'Pronunciation',
      prevValue: 77,
      currValue: 82,
      gain: '+5%',
      colorHex: '#E11D48',
      color: 'pink' as const,
      explanation:
        languageMode === 'en_ta'
          ? 'உங்கள் வார்த்தை உச்சரிப்பும் கடைசி ஒலிகளும் மிகவும் தெளிவாக உள்ளன.'
          : 'Your words are becoming clearer and ending sounds are easy to understand.',
      icon: <Volume2 className="w-4 h-4 text-[#E11D48]" />,
    },
    {
      id: 'confidence',
      name: languageMode === 'en_ta' ? 'நம்பிக்கை (Confidence)' : 'Confidence',
      prevValue: 72,
      currValue: 80,
      gain: '+8%',
      colorHex: '#D97706',
      color: 'amber' as const,
      explanation:
        languageMode === 'en_ta'
          ? 'தயக்கமின்றி உடனடியாக ஆங்கிலத்தில் பேசத் தொடங்குகிறீர்கள்.'
          : 'You are starting answers faster without hesitation or switching to Tamil.',
      icon: <Award className="w-4 h-4 text-[#D97706]" />,
    },
  ];

  // Timeline datapoints for graph
  const timelinePoints = [
    { label: 'Week 1', date: 'Sep 7', score: 62, vocab: 56, pron: 72, conf: 64 },
    { label: 'Week 2', date: 'Sep 14', score: 67, vocab: 60, pron: 75, conf: 68 },
    { label: 'Week 3', date: 'Sep 21', score: 71, vocab: 64, pron: 78, conf: 74 },
    { label: 'Week 4', date: 'Sep 28', score: 76, vocab: 68, pron: 82, conf: 80 },
  ];

  // Chronological Practice Session Records
  const practiceSessions: PracticeSessionRecord[] = [
    {
      id: 'ps-1',
      date: 'Today · Sep 29, 3:45 PM',
      topic: 'School Life',
      topicId: 'school',
      title: 'Science Lab Magnet Activity',
      emoji: '🏫',
      duration: '5.5 min',
      durationMins: 5.5,
      questions: 5,
      skillFocus: 'Fluency + Confidence',
      score: '94%',
      xpEarned: 45,
      feedback: 'Excellent conversational pace! You described your science project with natural connecting words.',
      feedbackTa: 'அற்புதமான பேச்சு வேகம்! அறிவியல் திட்டத்தை "because" மற்றும் "then" கொண்டு அழகாக விவரித்தீர்கள்.',
      suggestion: 'Try describing how the magnet experiment made you feel using 2 new emotion words.',
      suggestionTa: 'அறிவியல் சோதனையின் போது உங்கள் மனநிலையை விவரிக்க 2 புதிய உணர்ச்சி வார்த்தைகளைப் பயன்படுத்துங்கள்.',
    },
    {
      id: 'ps-2',
      date: 'Yesterday · Sep 28, 4:15 PM',
      topic: 'Sports & Games',
      topicId: 'sports',
      title: 'Cricket Batting & Team Play',
      emoji: '⚽',
      duration: '4.2 min',
      durationMins: 4.2,
      questions: 5,
      skillFocus: 'Pronunciation',
      score: '88%',
      xpEarned: 35,
      feedback: 'Very clear consonant endings when saying "played", "bowled", and "batting".',
      feedbackTa: '"played", "bowled" போன்ற கடந்த கால வினைச்சொற்களை மிகவும் தெளிவாக உச்சரித்தீர்கள்.',
      suggestion: 'Practice asking Velvet what her favorite position on the team would be!',
      suggestionTa: 'வெல்வெட்டிடம் அவளுக்குப் பிடித்த விளையாட்டு நிலை என்ன என்று ஒரு கேள்வி கேட்டுப் பாருங்கள்!',
    },
    {
      id: 'ps-3',
      date: 'Sep 27, 5:30 PM',
      topic: 'Friends',
      topicId: 'friends',
      title: 'Recess Conversations with Classmates',
      emoji: '👥',
      duration: '3.8 min',
      durationMins: 3.8,
      questions: 4,
      skillFocus: 'Vocabulary',
      score: '90%',
      xpEarned: 30,
      feedback: 'You comfortably used descriptive words like "cheerful", "energetic", and "supportive".',
      feedbackTa: '"cheerful", "energetic" போன்ற அருமையான வர்ணனை வார்த்தைகளைப் பயன்படுத்தினீர்கள்.',
      suggestion: 'Try combining two short sentences into one compound sentence using "while" or "although".',
      suggestionTa: '"while" அல்லது "although" பயன்படுத்தி இரண்டு சிறிய வாக்கியங்களை ஒன்றாக இணைக்க முயற்சிக்கவும்.',
    },
    {
      id: 'ps-4',
      date: 'Sep 26, 6:00 PM',
      topic: 'Food & Cooking',
      topicId: 'food',
      title: 'South Indian Breakfast Discussion',
      emoji: '🍔',
      duration: '4.5 min',
      durationMins: 4.5,
      questions: 4,
      skillFocus: 'Confidence',
      score: '92%',
      xpEarned: 40,
      feedback: 'Spoke completely in English without pausing to translate from Tamil. Remarkable bravery!',
      feedbackTa: 'தமிழில் இருந்து மொழிபெயர்க்காமல் நேரடியாக முழுமையாக ஆங்கிலத்தில் பதிலளித்தீர்கள். அருமை!',
      suggestion: 'Describe your grandmother\'s secret sambar recipe in 3 step-by-step instructions.',
      suggestionTa: 'பாட்டியின் ரகசிய சாம்பார் செய்முறையை 3 படிநிலைகளில் ஆங்கிலத்தில் விவரிக்கவும்.',
    },
    {
      id: 'ps-5',
      date: 'Sep 25, 4:00 PM',
      topic: 'Movies & Stories',
      topicId: 'movies',
      title: 'Favorite Animation Hero Discussion',
      emoji: '🎬',
      duration: '3.5 min',
      durationMins: 3.5,
      questions: 4,
      skillFocus: 'Fluency',
      score: '86%',
      xpEarned: 30,
      feedback: 'Smooth voice delivery and natural enthusiasm throughout the discussion.',
      feedbackTa: 'உரையாடல் முழுவதும் இயல்பான குரல் ஏற்ற இறக்கமும் உற்சாகமும் வெளிப்பட்டது.',
      suggestion: 'Use linking phrases like "In my opinion" when recommending a film to a friend.',
      suggestionTa: 'ஒரு படத்தை நண்பருக்கு பரிந்துரைக்கும் போது "In my opinion" போன்ற சொற்றொடர்களைப் பயன்படுத்தவும்.',
    },
  ];

  // Personal Milestones Timeline
  const milestoneTimeline = [
    {
      date: 'Sep 22, 2026',
      title: 'First Conversation Completed',
      desc: 'Completed your very first 2-minute dialogue on School life with Velvet.',
      icon: '🎙️',
      color: 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]',
    },
    {
      date: 'Sep 23, 2026',
      title: 'First 5-Minute Practice Session',
      desc: 'Reached your full 5-minute daily practice goal in a single day.',
      icon: '⏱️',
      color: 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]',
    },
    {
      date: 'Sep 24, 2026',
      title: '3-Day Streak Achieved',
      desc: 'Built a 3-day continuous habit of speaking English every single day.',
      icon: '⚡',
      color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]',
    },
    {
      date: 'Sep 26, 2026',
      title: '30 Minutes Spoken Milestone',
      desc: 'Accumulated half an hour of active English voice conversations.',
      icon: '⏳',
      color: 'bg-[#F5F3FF] border-[#DDD6FE] text-[#7C3AED]',
    },
    {
      date: 'Sep 28, 2026',
      title: '10 Conversations Completed',
      desc: 'Completed 10 full conversations across 5 different topics.',
      icon: '💬',
      color: 'bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]',
    },
    {
      date: 'Sep 29, 2026 (Today)',
      title: '7-Day Streak & Level 4 Reached',
      desc: 'Protected your 7-day unbroken streak and reached Level 4 Confident Speaker with 1,240 XP!',
      icon: '🔥',
      color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. HEADER & VELVET COACH MESSAGE BANNER                  */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Zone */}
          <div className="space-y-2.5 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
              <History className="w-3.5 h-3.5 text-[#2563EB]" />
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
                <p className="font-bold text-[#0F172A]">"{t.velvetGreeting}"</p>
                <p className="text-[11px] text-[#2563EB] mt-0.5">{t.velvetInsight}</p>
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
      {/* 2. TIME PERIOD SELECTOR BAR                              */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#2563EB]" />
          <span className="text-xs font-bold text-[#0F172A]">{t.periodHeading}:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: 'this_week', label: 'This Week' },
            { id: 'this_month', label: 'This Month' },
            { id: 'last_3_months', label: 'Last 3 Months' },
            { id: 'all_time', label: 'All Time' },
          ].map((period) => (
            <button
              key={period.id}
              type="button"
              onClick={() => setSelectedPeriod(period.id as HistoryPeriod)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                selectedPeriod === period.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFD] text-[#64748B] hover:text-[#0F172A] hover:bg-[#EFF6FF]'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SPEAKING GROWTH TIMELINE & OVERVIEW CARDS             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Speaking Growth Trend Visualization (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Overall Speaking Growth
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#2563EB]">
                    {periodData.speakingScore}%
                  </span>
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-0.5 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{periodData.scoreGain} growth</span>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                  {languageMode === 'en_ta' ? 'நிலை 4 · நம்பிக்கையான பேச்சாளர்' : 'Level 4 · Confident Speaker'}
                </span>
                <span className="text-[11px] text-[#64748B] block mt-1">
                  1,240 / 2,000 XP (760 XP to Level 5)
                </span>
              </div>
            </div>

            {/* Simple Student-Friendly Visual Timeline Chart */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0F172A] block">
                Progress by Week:
              </span>

              {/* Bar Growth Visualization */}
              <div className="grid grid-cols-4 gap-3 pt-3 items-end h-36">
                {timelinePoints.map((pt, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[11px] font-mono font-bold text-[#2563EB]">
                      {pt.score}%
                    </span>
                    <div
                      className={`w-full rounded-t-xl transition-all duration-300 ${
                        idx === timelinePoints.length - 1
                          ? 'bg-[#2563EB] shadow-xs'
                          : 'bg-[#93C5FD] hover:bg-[#60A5FA]'
                      }`}
                      style={{ height: `${pt.score}%` }}
                    />
                    <div className="text-center">
                      <span className="text-xs font-bold text-[#0F172A] block leading-none">
                        {pt.label}
                      </span>
                      <span className="text-[10px] text-[#64748B] block mt-0.5">
                        {pt.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Legend */}
            <div className="flex items-center justify-between text-[11px] text-[#64748B] pt-2 border-t border-[#F1F5F9]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                <span>Current Week (76%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]" />
                <span>Prior Weeks</span>
              </span>
              <span className="text-[#059669] font-bold">
                Steady personal climb
              </span>
            </div>
          </VelvetCard>
        </div>

        {/* Period Summary Quick Grid (5 cols) */}
        <div className="md:col-span-5 grid grid-cols-2 gap-3">
          
          <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">Total Speaking Time</span>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#2563EB]">
              {periodData.totalTime}
            </span>
            <span className="text-[10px] text-[#059669] font-medium">{periodData.timeDelta}</span>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">Conversations</span>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#059669]">
              {periodData.totalConversations}
            </span>
            <span className="text-[10px] text-[#64748B] font-medium">With Velvet</span>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">Questions Answered</span>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#D97706]">
              {periodData.questionsAnswered}
            </span>
            <span className="text-[10px] text-[#64748B] font-medium">Active answers</span>
          </div>

          <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase">Practice Days</span>
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#8B5CF6]">
              {periodData.practiceDays} Days
            </span>
            <span className="text-[10px] text-[#059669] font-medium">{periodData.goalsCompleted} goals met</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. SKILL HISTORY SECTION                                 */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.skillHistoryHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            How your core English speaking abilities improved over time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillHistory.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs hover:border-[#BFDBFE] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center">
                    {skill.icon}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                    {skill.gain}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-sm text-[#0F172A]">
                    {skill.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono text-sm text-[#94A3B8] line-through">
                      {skill.prevValue}%
                    </span>
                    <span className="text-xs text-[#64748B]">→</span>
                    <span className="font-mono font-extrabold text-xl" style={{ color: skill.colorHex }}>
                      {skill.currValue}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  "{skill.explanation}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#F1F5F9]">
                <VelvetProgressBar
                  value={skill.currValue}
                  color={skill.color}
                  size="sm"
                  showValueText={false}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. PRACTICE HISTORY (CHRONOLOGICAL SESSIONS)             */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
              {t.practiceHistoryHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Tap any practice session to view detailed feedback and suggestions.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
            {practiceSessions.length} Sessions Logged
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] divide-y divide-[#F1F5F9] shadow-xs overflow-hidden">
          {practiceSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#F8FAFD] transition-colors cursor-pointer group"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#F0F4F9] border border-[#E2E8F0] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  {session.emoji}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0F172A] truncate group-hover:text-[#2563EB] transition-colors">
                      {session.title}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#EFF6FF] text-[#2563EB] hidden sm:inline">
                      {session.topic}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] flex flex-wrap items-center gap-2 mt-0.5">
                    <span>{session.date}</span>
                    <span>·</span>
                    <span className="font-medium text-[#0F172A]">{session.duration}</span>
                    <span>·</span>
                    <span>{session.questions} questions</span>
                    <span>·</span>
                    <span className="text-[#059669] font-medium">Focus: {session.skillFocus}</span>
                  </p>
                </div>
              </div>

              {/* Right Score & View Details */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669]">
                    Score: {session.score}
                  </span>
                  <span className="text-[10px] text-[#2563EB] font-bold block mt-1">
                    +{session.xpEarned} XP
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. PERSONAL MILESTONES TIMELINE                          */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.milestonesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Key milestones reached along your English-speaking journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {milestoneTimeline.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-3xl border shadow-2xs space-y-2 flex flex-col justify-between ${item.color}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                    {item.date}
                  </span>
                  <h4 className="font-bold text-sm text-[#0F172A] leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed pt-1">
                {item.desc}
              </p>

              <span className="text-[10px] font-bold text-[#059669] flex items-center gap-1 pt-1 border-t border-black/5">
                <Check className="w-3 h-3" />
                <span>Verified in Spoken Conversation</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. QUICK ACTIONS & NAVIGATION SHORTCUTS                  */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
          {t.quickActionsHeading}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
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
            <p className="text-xs text-[#64748B] mt-0.5">Start daily English conversation</p>
          </button>

          {onNavigateToTab && (
            <>
              <button
                type="button"
                onClick={() => onNavigateToTab('analytics')}
                className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#10B981] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
                  📊
                </div>
                <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#059669] transition-colors block">
                  View Skills & Analytics
                </span>
                <p className="text-xs text-[#64748B] mt-0.5">Explore 4 core competencies</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('streaks')}
                className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#F59E0B] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
                  🔥
                </div>
                <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#D97706] transition-colors block">
                  View Streaks & Goals
                </span>
                <p className="text-xs text-[#64748B] mt-0.5">7-day streak & habit grid</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('achievements')}
                className="p-4 rounded-3xl bg-white border border-[#E2E8F0] hover:border-[#8B5CF6] hover:shadow-md transition-all text-left group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center text-lg mb-2 group-hover:scale-105 transition-transform">
                  🏆
                </div>
                <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#7C3AED] transition-colors block">
                  View Achievements
                </span>
                <p className="text-xs text-[#64748B] mt-0.5">24 badges and milestones</p>
              </button>
            </>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. PRACTICE SESSION DETAIL MODAL                         */}
      {/* ======================================================== */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedSession(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Session Icon & Title */}
            <div className="flex items-center gap-3.5 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-3xl shrink-0">
                {selectedSession.emoji}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  Topic: {selectedSession.topic}
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#0F172A] mt-1">
                  {selectedSession.title}
                </h3>
                <p className="text-xs text-[#64748B]">
                  {selectedSession.date}
                </p>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] text-center">
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Duration</span>
                <span className="font-display font-bold text-sm text-[#0F172A] mt-0.5 block">{selectedSession.duration}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">Questions</span>
                <span className="font-display font-bold text-sm text-[#2563EB] mt-0.5 block">{selectedSession.questions}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase block">XP Earned</span>
                <span className="font-display font-bold text-sm text-[#059669] mt-0.5 block">+{selectedSession.xpEarned} XP</span>
              </div>
            </div>

            {/* Personal Feedback Box */}
            <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Coach Feedback:</span>
              </span>
              <p>"{selectedSession.feedback}"</p>
              {languageMode === 'en_ta' && (
                <p className="text-[11px] text-[#2563EB] mt-1 border-t border-[#BFDBFE]/60 pt-1">
                  "{selectedSession.feedbackTa}"
                </p>
              )}
            </div>

            {/* Practical Improvement Suggestion */}
            <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[#D97706]">
                <Lightbulb className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Tip for Next Session:</span>
              </span>
              <p>"{selectedSession.suggestion}"</p>
              {languageMode === 'en_ta' && (
                <p className="text-[11px] text-[#B45309] mt-1 border-t border-[#FDE68A]/60 pt-1">
                  "{selectedSession.suggestionTa}"
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <VelvetButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setSelectedSession(null);
                  if (onOpenConversation) onOpenConversation(selectedSession.topicId);
                }}
                leftIcon={<Mic className="w-4 h-4 text-white" />}
              >
                {t.practiceAgainCTA}
              </VelvetButton>

              <VelvetButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setSelectedSession(null)}
              >
                Close
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 9. MOTIVATING HERO CALL TO ACTION                        */}
      {/* ======================================================== */}
      <div className="rounded-[32px] bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] p-6 sm:p-8 text-white shadow-[0_12px_36px_rgba(37,99,235,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
            <Zap className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Ready for Today's Speaking Session?</span>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Keep writing your progress history!
          </h3>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
            Every conversation you complete adds another verified milestone to your spoken English journey.
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
