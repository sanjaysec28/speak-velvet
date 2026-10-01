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
  Trophy,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  Mic,
  Star,
  Zap,
  Target,
  BookOpen,
  Volume2,
  Calendar,
  X,
  Compass,
  Check,
  ChevronRight,
  Heart,
  Smile,
} from 'lucide-react';

export type BadgeCategory = 'all' | 'speaking' | 'consistency' | 'practice' | 'questions' | 'vocabulary' | 'confidence';

export interface BadgeItem {
  id: string;
  category: 'speaking' | 'consistency' | 'practice' | 'questions' | 'vocabulary' | 'confidence';
  title: string;
  desc: string;
  unlocked: boolean;
  unlockedDate?: string;
  currentProgress: number;
  maxProgress: number;
  progressUnit: string;
  xp: number;
  emoji: string;
  color: 'blue' | 'yellow' | 'green' | 'pink' | 'purple';
  requirement: string;
  encouragement: string;
  encouragementTa: string;
  isRecentUnlock?: boolean;
  topicId?: string;
}

export interface AchievementsBadgesScreenProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  onNavigateToTab?: (tab: 'analytics' | 'streaks' | 'history') => void;
  studentName?: string;
  studentClass?: string;
  schoolName?: string;
}

export const AchievementsBadgesScreen: React.FC<AchievementsBadgesScreenProps> = ({
  languageMode = 'en',
  onOpenConversation,
  onNavigateToTab,
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  schoolName = 'Vivekanandha School',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory>('all');
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState<boolean>(false);

  // Bilingual copy dictionary
  const t = {
    screenTag: languageMode === 'en_ta' ? 'என் சாதனைகள் & பதக்கங்கள்' : 'My Achievements & Badges',
    screenTitle: languageMode === 'en_ta' ? 'பேச்சு மைல்கற்கள்' : 'My Achievements',
    screenSub:
      languageMode === 'en_ta'
        ? 'நீங்கள் பேசும் ஒவ்வொரு வார்த்தையும் ஒரு புதிய சாதனையை நோக்கி அழைத்துச் செல்கிறது.'
        : 'Every little conversation builds your confidence and unlocks new milestones.',
    velvetGreeting:
      languageMode === 'en_ta'
        ? 'நீங்கள் ஏற்கனவே 12 சாதனைகளைத் திறந்துள்ளீர்கள்! தொடர்ந்து பேசுங்கள், அடுத்த இலக்கு மிக அருகில் உள்ளது!'
        : "You've unlocked 12 of 24 achievements! You're building something amazing, one conversation at a time.",
    velvetEncouragement:
      languageMode === 'en_ta'
        ? 'அடுத்த சாதனை ("50 கேள்விகள்") இன்னும் 2 கேள்விகளில் திறக்கப்படும்!'
        : 'Your next milestone ("50 Questions") is only 2 questions away!',
    unlockedSummary: languageMode === 'en_ta' ? '12 / 24 சாதனைகள் திறக்கப்பட்டன' : '12 of 24 achievements unlocked',
    completionRate: '50% Completed',
    personalRecordsHeading: languageMode === 'en_ta' ? 'தனிப்பட்ட சாதனைக் குறிப்புகள்' : 'Personal Speaking Records',
    badgeCollectionHeading: languageMode === 'en_ta' ? 'பதக்கத் தொகுப்பு' : 'Badge Collection',
    talkWithVelvetCTA: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பேசுக' : 'Talk with Velvet',
    recentUnlockBtn: languageMode === 'en_ta' ? 'சமீபத்திய சாதனையைப் பார் 🎉' : 'View Recent Unlock 🎉',
    continuePractice: languageMode === 'en_ta' ? 'பயிற்சியைத் தொடரவும்' : 'Continue Practicing',
  };

  // 24 Badges across 6 Categories (12 Unlocked, 12 In Progress/Locked)
  const allBadges: BadgeItem[] = [
    // SPEAKING (4)
    {
      id: 'sp-1',
      category: 'speaking',
      title: 'First Conversation',
      desc: 'Completed your first voice chat with Velvet',
      unlocked: true,
      unlockedDate: 'September 22, 2026',
      currentProgress: 1,
      maxProgress: 1,
      progressUnit: 'conversation',
      xp: 50,
      emoji: '🎙️',
      color: 'blue',
      requirement: 'Complete 1 conversation on any topic',
      encouragement: 'The journey of a thousand conversations began with this first brave step!',
      encouragementTa: 'ஆயிரம் மைல் பயணமும் இந்த முதல் தைரியமான உரையாடலுடன் தொடங்கியது!',
      topicId: 'school',
    },
    {
      id: 'sp-2',
      category: 'speaking',
      title: '10 Conversations',
      desc: 'Completed 10 speaking practice sessions',
      unlocked: true,
      unlockedDate: 'September 28, 2026',
      currentProgress: 10,
      maxProgress: 10,
      progressUnit: 'conversations',
      xp: 100,
      emoji: '💬',
      color: 'blue',
      requirement: 'Complete 10 conversations with Velvet',
      encouragement: 'You are now an active conversationalist!',
      encouragementTa: 'இப்போது நீங்கள் தொடர்ந்து சரளமாக உரையாடுபவராக மாறிவிட்டீர்கள்!',
      topicId: 'friends',
    },
    {
      id: 'sp-3',
      category: 'speaking',
      title: '25 Conversations',
      desc: 'Complete 25 speaking practice sessions',
      unlocked: false,
      currentProgress: 12,
      maxProgress: 25,
      progressUnit: 'conversations',
      xp: 200,
      emoji: '🗣️',
      color: 'blue',
      requirement: 'Complete 25 conversations with Velvet',
      encouragement: '12 / 25 completed — 13 more conversations to reach this milestone!',
      encouragementTa: '12 / 25 முடிந்தது — இன்னும் 13 உரையாடல்களில் இந்த பதக்கம் திறக்கப்படும்!',
      topicId: 'sports',
    },
    {
      id: 'sp-4',
      category: 'speaking',
      title: '50 Conversations',
      desc: 'Complete 50 speaking practice sessions',
      unlocked: false,
      currentProgress: 12,
      maxProgress: 50,
      progressUnit: 'conversations',
      xp: 500,
      emoji: '🌟',
      color: 'blue',
      requirement: 'Complete 50 conversations with Velvet',
      encouragement: 'Master of everyday dialogues — keep practicing daily!',
      encouragementTa: 'அன்றாட உரையாடல்களின் மாஸ்டர் — தினமும் தொடர்ந்து பேசுங்கள்!',
      topicId: 'travel',
    },

    // CONSISTENCY (4)
    {
      id: 'co-1',
      category: 'consistency',
      title: '3-Day Streak',
      desc: 'Practiced speaking English 3 days in a row',
      unlocked: true,
      unlockedDate: 'September 24, 2026',
      currentProgress: 3,
      maxProgress: 3,
      progressUnit: 'days',
      xp: 50,
      emoji: '⚡',
      color: 'yellow',
      requirement: 'Speak English 3 consecutive days',
      encouragement: 'Consistency is the secret to fluent spoken English!',
      encouragementTa: 'தொடர் பயிற்சியே சரள ஆங்கிலப் பேச்சின் ரகசியம்!',
      topicId: 'school',
    },
    {
      id: 'co-2',
      category: 'consistency',
      title: '7-Day Streak',
      desc: 'Practiced speaking English 7 days in a row',
      unlocked: true,
      unlockedDate: 'September 29, 2026 (Today!)',
      currentProgress: 7,
      maxProgress: 7,
      progressUnit: 'days',
      xp: 150,
      emoji: '🔥',
      color: 'yellow',
      requirement: 'Speak English 7 consecutive days',
      encouragement: 'Outstanding dedication! You built an unbroken 7-day speaking habit.',
      encouragementTa: 'அற்புதமான முயற்சி! நீங்கள் 7 நாள் தொடர் பழக்கத்தை உறுதியாக்கியுள்ளீர்கள்.',
      isRecentUnlock: true,
      topicId: 'friends',
    },
    {
      id: 'co-3',
      category: 'consistency',
      title: '14-Day Streak',
      desc: 'Practice speaking English 14 days in a row',
      unlocked: false,
      currentProgress: 7,
      maxProgress: 14,
      progressUnit: 'days',
      xp: 300,
      emoji: '🛡️',
      color: 'yellow',
      requirement: 'Speak English 14 consecutive days',
      encouragement: 'Halfway there! 7 more days to unlock the 2-week streak medal.',
      encouragementTa: 'பாதி வழி முடிந்துவிட்டது! இன்னும் 7 நாட்களில் இந்த பதக்கம் உங்களுடையது.',
      topicId: 'games',
    },
    {
      id: 'co-4',
      category: 'consistency',
      title: '30-Day Streak',
      desc: 'Practice speaking English for an entire month',
      unlocked: false,
      currentProgress: 7,
      maxProgress: 30,
      progressUnit: 'days',
      xp: 1000,
      emoji: '👑',
      color: 'yellow',
      requirement: 'Speak English 30 consecutive days',
      encouragement: 'A full month of everyday speaking habit. You can do it!',
      encouragementTa: 'முழுமையான ஒரு மாத பேச்சுப் பழக்கம். உங்களால் முடியும்!',
      topicId: 'family',
    },

    // PRACTICE (4)
    {
      id: 'pr-1',
      category: 'practice',
      title: 'First 5-Minute Session',
      desc: 'Completed a full 5-minute daily practice session',
      unlocked: true,
      unlockedDate: 'September 23, 2026',
      currentProgress: 5,
      maxProgress: 5,
      progressUnit: 'minutes',
      xp: 50,
      emoji: '⏱️',
      color: 'green',
      requirement: 'Reach 5 minutes of practice in a single day',
      encouragement: '5 minutes of daily practice trains your brain to think in English.',
      encouragementTa: 'தினமும் 5 நிமிடப் பேச்சு ஆங்கிலத்தில் சிந்திக்க உதவுகிறது.',
      topicId: 'school',
    },
    {
      id: 'pr-2',
      category: 'practice',
      title: '30 Minutes Spoken',
      desc: 'Accumulated 30 total minutes of spoken English',
      unlocked: true,
      unlockedDate: 'September 26, 2026',
      currentProgress: 30,
      maxProgress: 30,
      progressUnit: 'minutes',
      xp: 100,
      emoji: '⏳',
      color: 'green',
      requirement: 'Accumulate 30 total minutes in conversation',
      encouragement: 'That is half an hour of real English spoken by you!',
      encouragementTa: 'நீங்கள் பேசிய முழுமையான அரை மணி நேர ஆங்கில உரையாடல்!',
      topicId: 'food',
    },
    {
      id: 'pr-3',
      category: 'practice',
      title: '60 Minutes Spoken',
      desc: 'Accumulated 60 total minutes of spoken English',
      unlocked: true,
      unlockedDate: 'September 28, 2026',
      currentProgress: 60,
      maxProgress: 60,
      progressUnit: 'minutes',
      xp: 200,
      emoji: '🏅',
      color: 'green',
      requirement: 'Accumulate 60 total minutes in conversation',
      encouragement: 'One full hour of spoken English recorded! (Currently at 68.5 mins)',
      encouragementTa: 'முழுமையாக 1 மணி நேரம் பேசி முடித்துவிட்டீர்கள்! (தற்போது 68.5 நிமிடங்கள்)',
      topicId: 'movies',
    },
    {
      id: 'pr-4',
      category: 'practice',
      title: '100 Minutes Spoken',
      desc: 'Accumulate 100 total minutes of spoken English',
      unlocked: false,
      currentProgress: 68.5,
      maxProgress: 100,
      progressUnit: 'minutes',
      xp: 500,
      emoji: '🏆',
      color: 'green',
      requirement: 'Accumulate 100 total minutes in conversation',
      encouragement: '68.5 / 100 minutes — just 31.5 more minutes of fun practice!',
      encouragementTa: '68.5 / 100 நிமிடங்கள் — இன்னும் 31.5 நிமிடங்கள் மட்டுமே பாக்கி!',
      topicId: 'travel',
    },

    // QUESTIONS (4)
    {
      id: 'qu-1',
      category: 'questions',
      title: '10 Questions',
      desc: 'Answered 10 questions from Velvet',
      unlocked: true,
      unlockedDate: 'September 23, 2026',
      currentProgress: 10,
      maxProgress: 10,
      progressUnit: 'questions',
      xp: 50,
      emoji: '❓',
      color: 'purple',
      requirement: 'Answer 10 conversational questions from Velvet',
      encouragement: 'Great active listening and prompt answering!',
      encouragementTa: 'சிறந்த கவனிப்பும் சரியான பதிலளிப்பும்!',
      topicId: 'school',
    },
    {
      id: 'qu-2',
      category: 'questions',
      title: '50 Questions',
      desc: 'Answer 50 questions from Velvet',
      unlocked: false,
      currentProgress: 48,
      maxProgress: 50,
      progressUnit: 'questions',
      xp: 150,
      emoji: '🎯',
      color: 'purple',
      requirement: 'Answer 50 conversational questions from Velvet',
      encouragement: '48 / 50 questions — Just 2 more questions to unlock this badge!',
      encouragementTa: '48 / 50 கேள்விகள் — இன்னும் 2 கேள்விகளில் இந்த பதக்கம் திறக்கப்படும்!',
      topicId: 'friends',
    },
    {
      id: 'qu-3',
      category: 'questions',
      title: '100 Questions',
      desc: 'Answer 100 questions from Velvet',
      unlocked: false,
      currentProgress: 48,
      maxProgress: 100,
      progressUnit: 'questions',
      xp: 300,
      emoji: '💡',
      color: 'purple',
      requirement: 'Answer 100 conversational questions from Velvet',
      encouragement: 'An inspiring learning journey across all school topics.',
      encouragementTa: 'அனைத்து பள்ளி தலைப்புகளிலும் ஒரு அற்புதமான கற்றல் பயணம்.',
      topicId: 'games',
    },
    {
      id: 'qu-4',
      category: 'questions',
      title: '250 Questions',
      desc: 'Answer 250 questions across all school topics',
      unlocked: false,
      currentProgress: 48,
      maxProgress: 250,
      progressUnit: 'questions',
      xp: 750,
      emoji: '💎',
      color: 'purple',
      requirement: 'Answer 250 conversational questions from Velvet',
      encouragement: 'Grand conversation master of Vivekanandha School!',
      encouragementTa: 'விவேகானந்தா பள்ளியின் சிறந்த உரையாடல் மாஸ்டர்!',
      topicId: 'sports',
    },

    // VOCABULARY (4)
    {
      id: 'vo-1',
      category: 'vocabulary',
      title: 'First New Word',
      desc: 'Used your first new English vocabulary word in dialogue',
      unlocked: true,
      unlockedDate: 'September 22, 2026',
      currentProgress: 1,
      maxProgress: 1,
      progressUnit: 'word',
      xp: 50,
      emoji: '📖',
      color: 'pink',
      requirement: 'Use 1 new descriptive word during practice',
      encouragement: 'Words are your tools to express your ideas clearly.',
      encouragementTa: 'வார்த்தைகளே உங்கள் கருத்துக்களை வெளிப்படுத்தும் அருமையான கருவிகள்.',
      topicId: 'school',
    },
    {
      id: 'vo-2',
      category: 'vocabulary',
      title: '10 New Words',
      desc: 'Used 10 new classroom words during practice',
      unlocked: true,
      unlockedDate: 'September 25, 2026',
      currentProgress: 10,
      maxProgress: 10,
      progressUnit: 'words',
      xp: 100,
      emoji: '🌱',
      color: 'pink',
      requirement: 'Use 10 new classroom words in dialogue',
      encouragement: 'Your sentences are becoming colorful and expressive!',
      encouragementTa: 'உங்கள் வாக்கியங்கள் அழகாகவும் விளக்கமாகவும் மாறுகின்றன!',
      topicId: 'food',
    },
    {
      id: 'vo-3',
      category: 'vocabulary',
      title: '25 New Words',
      desc: 'Used 25 new descriptive adjectives and nouns',
      unlocked: true,
      unlockedDate: 'September 28, 2026',
      currentProgress: 25,
      maxProgress: 25,
      progressUnit: 'words',
      xp: 200,
      emoji: '📚',
      color: 'pink',
      requirement: 'Use 25 new vocabulary words in dialogue',
      encouragement: 'You now comfortably use 28 new everyday English words!',
      encouragementTa: 'நீங்கள் இப்போது 28 புதிய அன்றாட ஆங்கில வார்த்தைகளைப் பயன்படுத்துகிறீர்கள்!',
      topicId: 'movies',
    },
    {
      id: 'vo-4',
      category: 'vocabulary',
      title: '50 New Words',
      desc: 'Use 50 new vocabulary words during practice',
      unlocked: false,
      currentProgress: 28,
      maxProgress: 50,
      progressUnit: 'words',
      xp: 500,
      emoji: '🎓',
      color: 'pink',
      requirement: 'Use 50 new vocabulary words in dialogue',
      encouragement: '28 / 50 words used — keep trying new descriptive phrases!',
      encouragementTa: '28 / 50 வார்த்தைகள் பயன்பாட்டில் உள்ளன — புதிய வார்த்தைகளை முயற்சி செய்யுங்கள்!',
      topicId: 'travel',
    },

    // CONFIDENCE (4)
    {
      id: 'cf-1',
      category: 'confidence',
      title: 'First Brave Answer',
      desc: 'Answered Velvet without switching back to Tamil',
      unlocked: true,
      unlockedDate: 'September 22, 2026',
      currentProgress: 1,
      maxProgress: 1,
      progressUnit: 'answer',
      xp: 50,
      emoji: '🦁',
      color: 'yellow',
      requirement: 'Deliver a full answer in English without hesitation',
      encouragement: 'Bravery is trying even when feeling nervous!',
      encouragementTa: 'தயக்கம் இருந்தாலும் தைரியமாக முயற்சி செய்வதே வெற்றிக்கு வழி!',
      topicId: 'school',
    },
    {
      id: 'cf-2',
      category: 'confidence',
      title: '10 Confident Answers',
      desc: 'Responded promptly within 2 seconds of the prompt',
      unlocked: true,
      unlockedDate: 'September 25, 2026',
      currentProgress: 10,
      maxProgress: 10,
      progressUnit: 'answers',
      xp: 100,
      emoji: '🚀',
      color: 'yellow',
      requirement: 'Respond quickly without prolonged hesitation',
      encouragement: 'Your readiness to speak English is shining through.',
      encouragementTa: 'உடனடியாக ஆங்கிலத்தில் பேசும் உங்கள் ஆர்வம் தெரிகிறது.',
      topicId: 'friends',
    },
    {
      id: 'cf-3',
      category: 'confidence',
      title: '25 Confident Answers',
      desc: 'Spoke continuous multi-sentence answers',
      unlocked: true,
      unlockedDate: 'September 28, 2026',
      currentProgress: 25,
      maxProgress: 25,
      progressUnit: 'answers',
      xp: 200,
      emoji: '⭐',
      color: 'yellow',
      requirement: 'Deliver 25 complete, confident answers',
      encouragement: 'You are speaking with self-assurance and clarity!',
      encouragementTa: 'நீங்கள் மிகுந்த தன்னம்பிக்கையுடனும் தெளிவுடனும் பேசுகிறீர்கள்!',
      topicId: 'sports',
    },
    {
      id: 'cf-4',
      category: 'confidence',
      title: '50 Confident Answers',
      desc: 'Deliver 50 confident full-sentence answers',
      unlocked: false,
      currentProgress: 32,
      maxProgress: 50,
      progressUnit: 'answers',
      xp: 500,
      emoji: '👑',
      color: 'yellow',
      requirement: 'Deliver 50 complete, confident answers',
      encouragement: '32 / 50 answers — 18 more confident dialogues to unlock!',
      encouragementTa: '32 / 50 பதில்கள் — இன்னும் 18 பதில்களில் இந்த உன்னத பதக்கம் கிடைக்கும்!',
      topicId: 'family',
    },
  ];

  // Filtered badges list
  const filteredBadges = allBadges.filter((b) =>
    selectedCategory === 'all' ? true : b.category === selectedCategory
  );

  const unlockedCount = allBadges.filter((b) => b.unlocked).length;
  const totalCount = allBadges.length;

  // Personal Records (Strictly individual records, no peer comparison)
  const personalRecords = [
    { label: 'Longest Streak', value: '12 Days', sub: 'Personal best unbroken', icon: '🔥', color: 'text-[#D97706]' },
    { label: 'Total Speaking Time', value: '68.5 Mins', sub: 'Accumulated in English', icon: '⏱️', color: 'text-[#2563EB]' },
    { label: 'Total Conversations', value: '12 Sessions', sub: 'Completed with Velvet', icon: '💬', color: 'text-[#059669]' },
    { label: 'Questions Answered', value: '48 Questions', sub: 'Across 8 topics', icon: '❓', color: 'text-[#7C3AED]' },
    { label: 'Most Practiced Topic', value: 'School', sub: '5 dialogues completed', icon: '🏫', color: 'text-[#2563EB]' },
    { label: 'Best Speaking Session', value: '5.5 Mins', sub: 'Wednesday, Sep 4', icon: '⭐', color: 'text-[#D97706]' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* ======================================================== */}
      {/* 1. HEADER & VELVET COACHING BANNER                       */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Text Zone */}
          <div className="space-y-2.5 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
              <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
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
                <p className="text-[11px] text-[#2563EB] mt-0.5">{t.velvetEncouragement}</p>
              </div>
            </div>
          </div>

          {/* Right Mascot Representation & Action Button */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-44 h-44 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
              <VelvetMascot state="celebration" size="lg" animated={true} />
            </div>

            <button
              type="button"
              onClick={() => setShowCelebrationModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#D97706] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <span>{t.recentUnlockBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ACHIEVEMENTS OVERVIEW & OVERALL PROGRESS              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Main Badge Progress Summary Card (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="h-full flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                  Overall Achievement Progress
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#2563EB]">
                    {unlockedCount} <span className="text-lg font-normal text-[#64748B]">/ {totalCount} Badges</span>
                  </span>
                  <span className="text-xs font-bold text-[#059669] flex items-center gap-0.5 bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>50% Unlocked</span>
                  </span>
                </div>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center text-2xl shadow-2xs">
                🏆
              </div>
            </div>

            {/* Composite Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#475569]">
                <span>12 Unlocked · 12 In Progress</span>
                <span className="text-[#2563EB] font-mono">1,240 XP Earned</span>
              </div>
              <VelvetProgressBar value={50} color="blue" size="md" showValueText={false} />
              <p className="text-xs text-[#64748B]">
                Your next milestone: Answer 2 more questions to unlock <strong>50 Questions</strong>!
              </p>
            </div>

            {/* Recent Unlock Feature Box */}
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#FDE68A] text-xl flex items-center justify-center shrink-0">
                  🔥
                </div>
                <div>
                  <span className="font-bold text-xs text-[#92400E] uppercase block tracking-wider">
                    Recent Unlock · Today!
                  </span>
                  <span className="font-bold text-sm text-[#0F172A] block">
                    7-Day Streak Hero (+150 XP)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCelebrationModal(true)}
                className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>View celebration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </VelvetCard>
        </div>

        {/* Milestone Quick Navigation & Actions (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          
          <VelvetStreakIndicator
            streakCount={7}
            streakStatusText="7-day streak badge unlocked today! Keep your habit glowing."
          />

          {/* Quick CTA to Voice Practice */}
          <VelvetCard tint="white" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <Mic className="w-4 h-4 text-[#2563EB]" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">
                    Progress Your Next Badge
                  </span>
                  <span className="text-[11px] text-[#64748B]">
                    48/50 Questions · 2 left
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                96% Done
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F1F5F9]">
              <span className="text-[#64748B]">Answer 2 questions with Velvet</span>
              <button
                type="button"
                onClick={() => {
                  if (onOpenConversation) onOpenConversation('school');
                }}
                className="font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Practice now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </VelvetCard>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. PERSONAL SPEAKING RECORDS (NO PEER COMPARISON)        */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.personalRecordsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Your private personal bests achieved at Vivekanandha School.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {personalRecords.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1 hover:border-[#BFDBFE] transition-colors"
            >
              <div className="flex items-center justify-between text-base">
                <span>{rec.icon}</span>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.2 rounded">
                  Personal
                </span>
              </div>
              <div>
                <span className={`font-display font-extrabold text-lg sm:text-xl block leading-tight ${rec.color}`}>
                  {rec.value}
                </span>
                <span className="font-bold text-xs text-[#0F172A] block mt-0.5 truncate">
                  {rec.label}
                </span>
                <span className="text-[10px] text-[#64748B] block truncate">
                  {rec.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. BADGE COLLECTION & CATEGORY FILTERS                   */}
      {/* ======================================================== */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
              {t.badgeCollectionHeading}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Tap any badge to view details, requirements, and next practice steps.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] self-start sm:self-auto">
            Showing {filteredBadges.length} of {allBadges.length} Badges
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Badges', count: 24 },
            { id: 'speaking', label: 'Speaking', count: 4 },
            { id: 'consistency', label: 'Consistency', count: 4 },
            { id: 'practice', label: 'Practice', count: 4 },
            { id: 'questions', label: 'Questions', count: 4 },
            { id: 'vocabulary', label: 'Vocabulary', count: 4 },
            { id: 'confidence', label: 'Confidence', count: 4 },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as BadgeCategory)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFD] border border-[#E2E8F0]'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#64748B]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Badges Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = badge.unlocked;
            const progressPercent = Math.min(
              100,
              Math.round((badge.currentProgress / badge.maxProgress) * 100)
            );

            return (
              <div
                key={badge.id}
                onClick={() => setSelectedBadge(badge)}
                className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group relative ${
                  isUnlocked
                    ? 'bg-white border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-md hover:-translate-y-1'
                    : 'bg-[#F8FAFD] border-[#E2E8F0]/70 hover:border-[#CBD5E1] hover:bg-white'
                }`}
              >
                {/* Recent Unlock Ribbon */}
                {badge.isRecentUnlock && (
                  <span className="absolute -top-2.5 right-4 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#F59E0B] text-white shadow-xs">
                    New! Today
                  </span>
                )}

                {/* Top: Icon + Status */}
                <div className="flex items-start justify-between">
                  <div className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 shadow-2xs ${
                    isUnlocked
                      ? 'bg-[#EFF6FF] border border-[#BFDBFE]'
                      : 'bg-white border border-[#E2E8F0] grayscale-50 opacity-80'
                  }`}>
                    {badge.emoji}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                      +{badge.xp} XP
                    </span>

                    {isUnlocked ? (
                      <span className="text-[10px] font-bold text-[#059669] flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                        <span>Unlocked</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[#94A3B8] flex items-center gap-0.5">
                        <Lock className="w-3 h-3 text-[#94A3B8]" />
                        <span>In Progress</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Text */}
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-[#0F172A] group-hover:text-[#2563EB] transition-colors leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {badge.desc}
                  </p>
                </div>

                {/* Progress / Status Bottom */}
                <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px] text-[#059669] font-medium">
                      <span>✓ Completed</span>
                      <span className="text-[10px] text-[#64748B]">{badge.unlockedDate?.split(',')[0]}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[#64748B]">
                        <span>{badge.currentProgress} / {badge.maxProgress} {badge.progressUnit}</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <VelvetProgressBar value={progressPercent} color="blue" size="sm" showValueText={false} />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-bold text-[#2563EB] pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. QUICK NAVIGATION SHORTCUT BAR                         */}
      {/* ======================================================== */}
      <div className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-[#2563EB]" />
          <span>Quick Experience Paths:</span>
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {onNavigateToTab && (
            <>
              <button
                type="button"
                onClick={() => onNavigateToTab('analytics')}
                className="px-3 py-1.5 rounded-xl bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-[#E2E8F0] font-bold text-[#2563EB] cursor-pointer"
              >
                ← Skills & Speaking Analytics
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('streaks')}
                className="px-3 py-1.5 rounded-xl bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-[#E2E8F0] font-bold text-[#2563EB] cursor-pointer"
              >
                ← Streaks & Daily Goals
              </button>

              <button
                type="button"
                onClick={() => onNavigateToTab('history')}
                className="px-3 py-1.5 rounded-xl bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-[#E2E8F0] font-bold text-[#2563EB] cursor-pointer"
              >
                ← Progress History
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              if (onOpenConversation) onOpenConversation('school');
            }}
            className="px-3 py-1.5 rounded-xl bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-bold cursor-pointer flex items-center gap-1"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Practice with Velvet</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. ACHIEVEMENT DETAIL MODAL                              */}
      {/* ======================================================== */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedBadge(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge Graphic & Title */}
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-md ${
                selectedBadge.unlocked
                  ? 'bg-gradient-to-tr from-[#DBEAFE] to-[#EFF6FF] border-2 border-[#BFDBFE]'
                  : 'bg-[#F8FAFD] border-2 border-[#E2E8F0]'
              }`}>
                {selectedBadge.emoji}
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                  {selectedBadge.category} Achievement
                </span>
                <h3 className="font-display font-extrabold text-2xl text-[#0F172A] mt-1">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs text-[#64748B] max-w-xs mt-0.5">
                  {selectedBadge.desc}
                </p>
              </div>
            </div>

            {/* Status & Requirements Details */}
            <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Status:</span>
                {selectedBadge.unlocked ? (
                  <span className="font-bold text-[#059669] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Unlocked on {selectedBadge.unlockedDate}</span>
                  </span>
                ) : (
                  <span className="font-bold text-[#2563EB]">
                    In Progress ({selectedBadge.currentProgress} / {selectedBadge.maxProgress} {selectedBadge.progressUnit})
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Experience Reward:</span>
                <span className="font-mono font-bold text-[#2563EB]">+{selectedBadge.xp} XP</span>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0]">
                <span className="text-[#64748B] block mb-0.5">Requirement:</span>
                <span className="font-medium text-[#0F172A]">{selectedBadge.requirement}</span>
              </div>

              {!selectedBadge.unlocked && (
                <div className="pt-2 border-t border-[#E2E8F0] space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>Progress</span>
                    <span>{Math.round((selectedBadge.currentProgress / selectedBadge.maxProgress) * 100)}%</span>
                  </div>
                  <VelvetProgressBar
                    value={Math.round((selectedBadge.currentProgress / selectedBadge.maxProgress) * 100)}
                    color="blue"
                    size="sm"
                    showValueText={false}
                  />
                </div>
              )}
            </div>

            {/* Velvet Encouragement Message */}
            <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-xs text-[#1E40AF] flex items-start gap-2.5">
              <VelvetSparkleStar size={16} color="blue" />
              <div>
                <p className="font-medium">"{selectedBadge.encouragement}"</p>
                {languageMode === 'en_ta' && (
                  <p className="text-[11px] text-[#2563EB] mt-0.5">
                    {selectedBadge.encouragementTa}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <VelvetButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setSelectedBadge(null);
                  if (onOpenConversation) onOpenConversation(selectedBadge.topicId || 'school');
                }}
                leftIcon={<Mic className="w-4 h-4 text-white" />}
              >
                {selectedBadge.unlocked ? 'Practice More with Velvet' : 'Progress This Badge with Velvet'}
              </VelvetButton>

              <VelvetButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setSelectedBadge(null)}
              >
                Close
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. RECENT UNLOCK CELEBRATION MODAL                       */}
      {/* ======================================================== */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#FDE68A] space-y-6 text-center">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Velvet Celebration Pose */}
            <div className="flex flex-col items-center justify-center space-y-2 pt-2">
              <div className="relative">
                <div className="absolute w-32 h-32 rounded-full bg-[#FEF3C7] blur-xl -z-1" />
                <VelvetMascot state="celebration" size="lg" animated={true} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0]">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Achievement Unlocked! 🎉</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
                7-Day Streak Hero
              </h3>

              <p className="text-xs sm:text-sm text-[#64748B] max-w-xs">
                You practiced English for 7 days in a row! You're building a strong, effortless habit.
              </p>
            </div>

            {/* Badge Box & XP Tag */}
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-around">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#FDE68A] text-2xl flex items-center justify-center shadow-xs">
                  🔥
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block">
                    7 Days Consistency
                  </span>
                  <span className="text-xs text-[#059669] font-semibold">
                    Unlocked Today
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono font-extrabold text-xl text-[#D97706] block">
                  +150 XP
                </span>
                <span className="text-[10px] text-[#64748B]">
                  Bonus Earned
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <VelvetButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setShowCelebrationModal(false);
                  if (onOpenConversation) onOpenConversation('school');
                }}
                leftIcon={<Mic className="w-4 h-4 text-white" />}
              >
                {t.continuePractice}
              </VelvetButton>

              <VelvetButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setShowCelebrationModal(false)}
              >
                Back to Achievements
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
