import React, { useState } from 'react';
import { SPEAK_VELVET_TOPICS } from '../data/topicsData.ts';
import { StudentProgressDashboard } from './StudentProgressDashboard.tsx';
import { AchievementsBadgesScreen } from './AchievementsBadgesScreen.tsx';
import { StudentProfileScreen } from './StudentProfileScreen.tsx';
import { TopicsLibraryScreen } from './TopicsLibraryScreen.tsx';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetCircularProgress,
  VelvetStreakIndicator,
  VelvetMascot,
  VelvetAudioWave,
  VelvetVoiceWaveIndicator,
  VelvetSparkleStar,
  VelvetSoundArc,
  VelvetTopicCard,
  VelvetAvatar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Mic,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  Award,
  Trophy,
  Compass,
  TrendingUp,
  School,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Check,
  RotateCcw,
  Play,
  HelpCircle,
} from 'lucide-react';

/* ======================================================== */
/* 1. DEDICATED TALK WITH VELVET PRACTICE VIEW              */
/* ======================================================== */
export const TalkWithVelvetView: React.FC<{
  languageMode: LanguageMode;
  onOpenTopic: (topicId: string) => void;
}> = ({ languageMode, onOpenTopic }) => {
  const [micActive, setMicActive] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  const prompts = [
    {
      en: "Good morning Arjun! What was the most interesting thing that happened in school today?",
      ta: "வணக்கம் அர்ஜுன்! இன்று பள்ளியில் நடந்த மிகவும் சுவாரஸ்யமான விஷயம் என்ன?",
      topic: 'School',
      hint: 'Try answering: "Today we had a fun science experiment in the lab..."',
    },
    {
      en: "Who did you sit with during lunch break, and what did you talk about?",
      ta: "மதிய உணவு இடைவேளையில் யாருடன் அமர்ந்து என்ன பேசினீர்கள்?",
      topic: 'Friends',
      hint: 'Try answering: "I sat with Karthik and we discussed the upcoming sports day..."',
    },
    {
      en: "Tell me about your favorite sport. Do you prefer cricket or football?",
      ta: "உங்களுக்குப் பிடித்த விளையாட்டைப் பற்றி சொல்லுங்கள். கிரிக்கெட்டா அல்லது கால்பந்தா?",
      topic: 'Sports',
      hint: 'Try answering: "I love playing cricket as a bowler with my friends..."',
    },
  ];

  const current = prompts[currentPromptIndex];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Private Voice Conversation · Vivekanandha School</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F172A] tracking-tight">
          Talk with Velvet
        </h1>
        <p className="text-sm text-[#64748B] max-w-md mx-auto">
          Practice speaking English naturally. Velvet listens patiently and gives encouraging guidance.
        </p>
      </div>

      {/* Main Conversation Stage */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE] p-6 sm:p-10 shadow-[0_8px_30px_rgba(37,99,235,0.06)] flex flex-col items-center text-center space-y-6">
        
        {/* Velvet Mascot in Active Speech Mode */}
        <div className="relative">
          <div className="absolute w-44 h-44 rounded-full bg-[#DBEAFE]/80 blur-2xl -z-1" />
          <VelvetMascot
            state={micActive ? 'listening' : 'speaking'}
            size="hero"
            animated={true}
          />
        </div>

        {/* Velvet's Spoken Speech Bubble */}
        <div className="max-w-lg p-5 rounded-3xl bg-white border border-[#BFDBFE] shadow-sm space-y-2 relative">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#2563EB] flex items-center gap-1">
              <VelvetSparkleStar size={16} color="blue" />
              <span>Velvet speaking</span>
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB]">
              Topic: {current.topic}
            </span>
          </div>

          <p className="font-semibold text-base sm:text-lg text-[#0F172A] leading-relaxed">
            "{languageMode === 'en_ta' ? current.ta : current.en}"
          </p>

          <p className="text-xs text-[#64748B] italic pt-1 border-t border-[#F1F5F9]">
            💡 Hint: {current.hint}
          </p>
        </div>

        {/* Audio Wave Sound Visualization */}
        <div className="pt-2">
          <VelvetAudioWave isPlaying={micActive} barCount={17} color="blue" />
        </div>

        {/* Tactile Push-to-Talk Speaking Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setMicActive(!micActive)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-xl ${
              micActive
                ? 'bg-[#10B981] shadow-[0_10px_32px_rgba(16,185,129,0.50)] scale-110'
                : 'bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] shadow-[0_10px_32px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95'
            }`}
            aria-label={micActive ? 'Stop listening' : 'Start speaking'}
          >
            <Mic className="w-9 h-9 sm:w-11 sm:h-11 text-white" />
          </button>

          <div>
            <span className="font-bold text-sm text-[#0F172A] block">
              {micActive ? 'Listening to you... (Tap to finish)' : 'Tap to speak your answer'}
            </span>
            <span className="text-xs text-[#64748B]">
              {micActive ? 'Speak clearly into your microphone' : 'Take your time, speak in full sentences'}
            </span>
          </div>
        </div>

        {/* Next Prompt Switcher */}
        <div className="pt-4 border-t border-[#E2E8F0] w-full flex items-center justify-between text-xs text-[#64748B]">
          <span>Prompt {currentPromptIndex + 1} of {prompts.length}</span>
          <button
            type="button"
            onClick={() => setCurrentPromptIndex((prev) => (prev + 1) % prompts.length)}
            className="font-bold text-[#2563EB] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ======================================================== */
/* 2. TOPICS CATALOG VIEW                                   */
/* ======================================================== */
export interface TopicsViewProps {
  languageMode?: LanguageMode;
  onSelectTopic: (topicId: string) => void;
  studentLevel?: string;
  studentStreak?: number;
  dailyGoalProgress?: string;
}

export const TopicsView: React.FC<TopicsViewProps> = (props) => {
  return <TopicsLibraryScreen {...props} />;
};

/* ======================================================== */
/* 3. PROGRESS & ANALYTICS VIEW                             */
/* ======================================================== */
export interface ProgressViewProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  schoolName?: string;
}

export const ProgressView: React.FC<ProgressViewProps> = (props) => {
  return <StudentProgressDashboard {...props} />;
};

/* ======================================================== */
/* 4. ACHIEVEMENTS & TROPHIES VIEW                          */
/* ======================================================== */
export interface AchievementsViewProps {
  languageMode?: LanguageMode;
  onOpenConversation?: (topicId?: string) => void;
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  schoolName?: string;
}

export const AchievementsView: React.FC<AchievementsViewProps> = (props) => {
  return <StudentProgressDashboard {...props} initialSubTab="achievements" />;
};

/* ======================================================== */
/* 5. STUDENT PROFILE IDENTITY VIEW                         */
/* ======================================================== */
export interface ProfileViewProps {
  languageMode?: LanguageMode;
  onLanguageChange?: (mode: LanguageMode) => void;
  studentName?: string;
  studentId?: string;
  studentClass?: string;
  schoolName?: string;
  onLogout?: () => void;
  onOpenConversation?: (topicId?: string) => void;
  onStartOnboarding?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = (props) => {
  return <StudentProfileScreen {...props} />;
};
