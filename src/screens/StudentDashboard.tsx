import React, { useState } from 'react';
import { AppShell, AppTab } from '../components/AppShell.tsx';
import {
  TalkWithVelvetView,
  TopicsView,
  ProgressView,
  AchievementsView,
  ProfileView,
} from './StudentViews.tsx';
import { StudentHomeScreen } from './StudentHomeScreen.tsx';
import {
  VelvetCard,
  VelvetProgressBar,
  VelvetStreakIndicator,
  VelvetMascot,
  VelvetAudioWave,
  VelvetTopicCard,
  VelvetButton,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Mic,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Volume2,
  Award,
  ChevronRight,
  Radio,
  X,
  RotateCcw,
  Check,
} from 'lucide-react';

export interface StudentDashboardProps {
  onLogout?: () => void;
  onOpenDesignSystem?: () => void;
  onOpenConversation?: (topicId?: string) => void;
  onStartOnboarding?: () => void;
  studentName?: string;
  studentId?: string;
  studentClass?: string;
  initialTab?: AppTab;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onLogout,
  onOpenDesignSystem,
  onOpenConversation,
  onStartOnboarding,
  studentName = 'Arjun Sundararajan',
  studentId = 'VS2026-001',
  studentClass = 'Class 8A',
  initialTab = 'home',
}) => {
  const [activeTab, setActiveTab] = useState<AppTab>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [selectedTopic, setSelectedTopic] = useState('school');
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [hasCompletedSpeech, setHasCompletedSpeech] = useState(false);

  // Bilingual strings
  const t = {
    greeting: languageMode === 'en_ta' ? 'இனிய காலை வணக்கம்' : 'Good morning',
    readyToSpeak: languageMode === 'en_ta' ? 'இன்று பேசத் தயாரா? நான் உங்களுடன் இருக்கிறேன்!' : "Ready to speak today? Let's have a conversation!",
    talkBtnTitle: languageMode === 'en_ta' ? 'வெல்வெட்டுடன் பேசுங்கள்' : 'Talk with Velvet',
    goalTitle: languageMode === 'en_ta' ? 'தினசரி பேச்சு இலக்கு' : 'Daily Speaking Goal',
    topicsTitle: languageMode === 'en_ta' ? 'பேச ஒரு தலைப்பைத் தேர்வு செய்க' : 'Choose a topic to talk about',
    topicsSub: languageMode === 'en_ta' ? 'பள்ளி, நண்பர்கள் மற்றும் பிடித்த விஷயங்கள்' : 'Select a comfortable scenario to speak in English',
    skillsTitle: languageMode === 'en_ta' ? 'உங்கள் திறன் நிலவரம்' : 'Speaking Competency',
    recentActivity: languageMode === 'en_ta' ? 'இன்றைய பயிற்சி வரலாறு' : "Today's Activity",
    schoolName: 'Vivekanandha School',
    tapToSpeak: languageMode === 'en_ta' ? 'பேச தொடங்குங்கள்' : 'Tap to speak',
    listeningMsg: languageMode === 'en_ta' ? 'நான் உங்களைக் கேட்கிறேன்...' : "I'm listening to you...",
  };

  const topics = [
    { id: 'school', title: 'School', sub: 'Favorite subjects & teachers', emoji: '🏫', tint: 'white' as const },
    { id: 'friends', title: 'Friends', sub: 'Playground chats & games', emoji: '👥', tint: 'sky' as const },
    { id: 'sports', title: 'Sports', sub: 'Cricket, football & races', emoji: '⚽', tint: 'mint' as const },
    { id: 'food', title: 'Food', sub: 'Lunch, snacks & treats', emoji: '🍔', tint: 'amber' as const },
    { id: 'movies', title: 'Movies', sub: 'Favorite cinema & heroes', emoji: '🎬', tint: 'rose' as const },
    { id: 'games', title: 'Games', sub: 'Video & outdoor games', emoji: '🎮', tint: 'lavender' as const },
    { id: 'family', title: 'Family', sub: 'Home, parents & weekends', emoji: '👨‍👩‍👧', tint: 'white' as const },
    { id: 'travel', title: 'Travel', sub: 'Trips, trains & journeys', emoji: '✈️', tint: 'sky' as const },
  ];

  const recentSessions = [
    {
      id: 1,
      title: 'Science Fair Discussion',
      topic: 'School',
      time: '10 min ago',
      duration: '2m 14s',
      score: '92%',
      icon: <CheckCircle2 className="w-4 h-4 text-[#10B981]" />,
    },
    {
      id: 2,
      title: 'Ordering in a Restaurant',
      topic: 'Food',
      time: 'Yesterday',
      duration: '1m 45s',
      score: '84%',
      icon: <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />,
    },
    {
      id: 3,
      title: 'My Favorite Weekend Hobby',
      topic: 'Games',
      time: '2 days ago',
      duration: '3m 05s',
      score: '88%',
      icon: <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />,
    },
  ];

  const handleOpenPracticeModal = (topicId?: string) => {
    if (onOpenConversation) {
      onOpenConversation(topicId || selectedTopic);
      return;
    }
    if (topicId) setSelectedTopic(topicId);
    setHasCompletedSpeech(false);
    setMicActive(false);
    setIsSpeakingModalOpen(true);
  };

  const handleToggleMic = () => {
    if (micActive) {
      // Stopped speaking -> show completed celebration feedback
      setMicActive(false);
      setHasCompletedSpeech(true);
    } else {
      setMicActive(true);
      setHasCompletedSpeech(false);
    }
  };

  // Render the inner tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'talk':
        return (
          <TalkWithVelvetView
            languageMode={languageMode}
            onOpenTopic={(topicId) => handleOpenPracticeModal(topicId)}
          />
        );

      case 'topics':
        return (
          <TopicsView
            languageMode={languageMode}
            onSelectTopic={(topicId) => handleOpenPracticeModal(topicId)}
            studentLevel="Level 4 · Confident Speaker"
            studentStreak={7}
            dailyGoalProgress="3.5 / 5 min"
          />
        );

      case 'progress':
        return (
          <ProgressView
            languageMode={languageMode}
            onOpenConversation={(topicId) => handleOpenPracticeModal(topicId)}
            studentName={studentName}
            studentClass={studentClass}
            studentId={studentId}
            schoolName={t.schoolName}
          />
        );

      case 'achievements':
        return (
          <AchievementsView
            languageMode={languageMode}
            onOpenConversation={(topicId) => handleOpenPracticeModal(topicId)}
            studentName={studentName}
            studentClass={studentClass}
            studentId={studentId}
            schoolName={t.schoolName}
          />
        );

      case 'profile':
        return (
          <ProfileView
            languageMode={languageMode}
            onLanguageChange={(mode) => setLanguageMode(mode)}
            studentName={studentName}
            studentId={studentId}
            studentClass={studentClass}
            schoolName={t.schoolName}
            onLogout={onLogout}
            onOpenConversation={(topicId) => handleOpenPracticeModal(topicId)}
            onStartOnboarding={onStartOnboarding}
          />
        );

      case 'home':
      default:
        return (
          <StudentHomeScreen
            languageMode={languageMode}
            studentName={studentName}
            studentClass={studentClass}
            studentId={studentId}
            schoolName={t.schoolName}
            onOpenConversation={(topicId) => handleOpenPracticeModal(topicId)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartOnboarding={onStartOnboarding}
          />
        );
    }
  };



  return (
    <>
      <AppShell
        activeTab={activeTab}
        onTabChange={setActiveTab}
        languageMode={languageMode}
        onLanguageChange={setLanguageMode}
        studentName={studentName}
        studentId={studentId}
        studentClass={studentClass}
        schoolName={t.schoolName}
        onLogout={onLogout}
        onOpenDesignSystem={onOpenDesignSystem}
        onTalkTrigger={() => handleOpenPracticeModal()}
      >
        {renderTabContent()}
      </AppShell>

      {/* QUICK SPEAKING SIMULATOR MODAL */}
      {isSpeakingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-bold text-[#059669]">
                  Live Practice Session
                </span>
                <span className="text-xs text-[#94A3B8]">·</span>
                <span className="text-xs font-semibold text-[#2563EB] capitalize">
                  Topic: {selectedTopic}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSpeakingModalOpen(false);
                  setMicActive(false);
                  setHasCompletedSpeech(false);
                }}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mascot in Speaking / Listening / Encouraging Mode */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <VelvetMascot
                state={
                  hasCompletedSpeech
                    ? 'celebration'
                    : micActive
                    ? 'listening'
                    : 'speaking'
                }
                size="lg"
                speechText={
                  hasCompletedSpeech
                    ? languageMode === 'en_ta'
                      ? "அருமை அர்ஜுன்! உங்கள் உச்சரிப்பு மிகச் சிறப்பாக இருந்தது! (+40 XP)"
                      : "Great job Arjun! Your pronunciation was clear and natural! (+40 XP)"
                    : micActive
                    ? t.listeningMsg
                    : languageMode === 'en_ta'
                    ? "வணக்கம் அர்ஜுன்! இன்று பள்ளியில் உங்களுக்குப் பிடித்த பாடம் எது?"
                    : "Good morning Arjun! What was your favorite class in school today?"
                }
                showSpeechBubble={true}
              />

              <div className="pt-2">
                <VelvetAudioWave isPlaying={micActive} barCount={13} color="blue" />
              </div>
            </div>

            {/* Central Mic Button / Completed Feedback */}
            {!hasCompletedSpeech ? (
              <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-200 cursor-pointer ${
                    micActive
                      ? 'bg-[#10B981] shadow-[0_6px_20px_rgba(16,185,129,0.40)] scale-105'
                      : 'bg-[#2563EB] shadow-[0_6px_20px_rgba(37,99,235,0.40)] hover:scale-105 active:scale-95'
                  }`}
                  aria-label={micActive ? 'Stop speaking' : 'Tap to speak'}
                >
                  <Mic className="w-7 h-7" />
                </button>

                <span className="text-xs font-bold text-[#0F172A]">
                  {micActive ? 'Tap to finish speaking' : t.tapToSpeak}
                </span>
                <p className="text-[11px] text-[#64748B]">
                  {micActive ? 'Speaking in English · Speak clearly' : 'Private to Vivekanandha School'}
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-3 animate-fade-in text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#059669]">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span>Speech Evaluated Successfully</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 bg-white rounded-xl border border-[#A7F3D0]">
                    <span className="text-[#64748B] block text-[10px]">Clarity</span>
                    <span className="font-bold text-[#059669] text-sm">94%</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#A7F3D0]">
                    <span className="text-[#64748B] block text-[10px]">Duration</span>
                    <span className="font-bold text-[#059669] text-sm">24s</span>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-[#A7F3D0]">
                    <span className="text-[#64748B] block text-[10px]">XP Gain</span>
                    <span className="font-bold text-[#2563EB] text-sm">+40 XP</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (if still speaking) */}
            {!hasCompletedSpeech && (
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-[#64748B] block">
                  Suggested Student Answers:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMicActive(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] font-medium transition-colors text-left cursor-pointer"
                  >
                    "My favorite was science lab today!"
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMicActive(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#EFF6FF] text-[#2563EB] hover:bg-[#DBEAFE] font-medium transition-colors text-left cursor-pointer"
                  >
                    "We played football during lunch break."
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {hasCompletedSpeech && (
                <VelvetButton
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    setHasCompletedSpeech(false);
                    setMicActive(true);
                  }}
                  leftIcon={<RotateCcw className="w-4 h-4" />}
                >
                  Speak Another Response
                </VelvetButton>
              )}

              <VelvetButton
                variant={hasCompletedSpeech ? 'outline' : 'primary'}
                size="md"
                fullWidth
                onClick={() => {
                  setIsSpeakingModalOpen(false);
                  setMicActive(false);
                  setHasCompletedSpeech(false);
                }}
              >
                {hasCompletedSpeech ? 'Return to Dashboard' : 'End Practice & Save'}
              </VelvetButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
