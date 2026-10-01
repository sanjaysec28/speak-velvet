import React, { useState, useEffect } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetLanguageSwitcher,
  VelvetMascot,
  VelvetAudioWave,
  VelvetSparkleStar,
  VelvetSoundArc,
  VelvetAvatar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Mic,
  ArrowLeft,
  Volume2,
  Clock,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  X,
  Award,
  ChevronRight,
  Radio,
  HelpCircle,
  Play,
  Languages,
  User,
  History,
  Check,
  Compass,
} from 'lucide-react';
import { SPEAK_VELVET_TOPICS, TopicItem, TopicQuestion } from '../data/topicsData.ts';
import { SessionReflectionScreen } from './SessionReflectionScreen.tsx';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export type ConversationState = 'ready' | 'listening' | 'speaking' | 'processing';

export interface ChatMessage {
  id: string;
  sender: 'velvet' | 'student';
  textEn: string;
  textTa?: string;
  timestamp: string;
}

export interface ConversationScreenProps {
  onBackToHome: () => void;
  onBackToTopics?: () => void;
  onViewProgress?: () => void;
  languageMode?: LanguageMode;
  onLanguageChange?: (lang: LanguageMode) => void;
  studentName?: string;
  studentClass?: string;
  initialTopicId?: string;
  initialTopic?: string;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  onBackToHome,
  onBackToTopics,
  onViewProgress,
  languageMode: initialLang = 'en_ta',
  onLanguageChange,
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  initialTopicId,
  initialTopic,
}) => {
  const startingTopic = initialTopicId || initialTopic || 'school';
  const [languageMode, setLanguageMode] = useState<LanguageMode>(initialLang);
  const [conversationState, setConversationState] = useState<ConversationState>('speaking');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(startingTopic);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(36);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState<boolean>(false);
  const [showTopicPickerModal, setShowTopicPickerModal] = useState<boolean>(false);

  // Active topic object
  const currentTopic: TopicItem =
    SPEAK_VELVET_TOPICS.find((t) => t.id === selectedTopicId) || SPEAK_VELVET_TOPICS[0];

  // Active question in the topic (1 to 5)
  const currentQuestion: TopicQuestion =
    currentTopic.questions[questionIndex % currentTopic.questions.length];

  // Conversation turns history for this session
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: `v-init`,
      sender: 'velvet',
      textEn: currentQuestion.en,
      textTa: currentQuestion.ta,
      timestamp: '3:45 PM',
    },
  ]);

  // When selected topic changes, reset questions and conversation
  useEffect(() => {
    const topic = SPEAK_VELVET_TOPICS.find((t) => t.id === selectedTopicId) || SPEAK_VELVET_TOPICS[0];
    const firstQ = topic.questions[0];
    setQuestionIndex(0);
    setMessages([
      {
        id: `v-t-${Date.now()}`,
        sender: 'velvet',
        textEn: firstQ.en,
        textTa: firstQ.ta,
        timestamp: 'Just now',
      },
    ]);
    setConversationState('speaking');
  }, [selectedTopicId]);

  // Sync external language changes
  const handleLangChange = (mode: LanguageMode) => {
    setLanguageMode(mode);
    if (onLanguageChange) {
      onLanguageChange(mode);
    }
  };

  // Live timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const latestVelvetMessage = [...messages].reverse().find((m) => m.sender === 'velvet') || messages[0];
  const latestStudentMessage = [...messages].reverse().find((m) => m.sender === 'student');

  // Handle student submitting answer (via starter chip or mic tap)
  const handleStudentAnswer = (textEn: string) => {
    const studentMsg: ChatMessage = {
      id: `s-${Date.now()}`,
      sender: 'student',
      textEn,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, studentMsg]);
    setConversationState('processing');

    // Simulate Velvet evaluation & delivering the next question
    setTimeout(() => {
      const nextQIdx = (questionIndex + 1) % currentTopic.questions.length;
      setQuestionIndex(nextQIdx);
      const nextQ = currentTopic.questions[nextQIdx];

      const velvetReply: ChatMessage = {
        id: `v-${Date.now()}`,
        sender: 'velvet',
        textEn: nextQ.en,
        textTa: nextQ.ta,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, velvetReply]);
      setConversationState('speaking');
    }, 1200);
  };

  // Primary tactile microphone state machine
  const handleMicClick = () => {
    if (conversationState === 'ready') {
      setConversationState('listening');
    } else if (conversationState === 'listening') {
      // Completed speaking -> pick starter or default answer
      const defaultAnswer = currentQuestion.starters[0].en;
      handleStudentAnswer(defaultAnswer);
    } else if (conversationState === 'speaking') {
      // Interrupt or transition to listening
      setConversationState('listening');
    }
  };

  const handleNextQuestion = () => {
    const nextQIdx = (questionIndex + 1) % currentTopic.questions.length;
    setQuestionIndex(nextQIdx);
    const nextQ = currentTopic.questions[nextQIdx];

    const velvetMsg: ChatMessage = {
      id: `v-${Date.now()}`,
      sender: 'velvet',
      textEn: nextQ.en,
      textTa: nextQ.ta,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, velvetMsg]);
    setConversationState('speaking');
  };

  const handleEndConversation = () => {
    setIsTimerRunning(false);
    setShowSummaryModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0F172A] flex flex-col justify-between selection:bg-[#DBEAFE] selection:text-[#1D4ED8] relative overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. TOP HEADER: TOPIC CONTEXT & CONTROLS                  */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Left: Back / Topic Selection Action */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (onBackToTopics) onBackToTopics();
                else onBackToHome();
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-xs font-bold text-[#0F172A] flex items-center gap-1.5 transition-all cursor-pointer group"
              aria-label="Back to topics"
            >
              <ArrowLeft className="w-4 h-4 text-[#2563EB] group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline">Topics</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-base sm:text-xl text-[#0F172A] tracking-tight truncate">
                  Talk with Velvet
                </h1>
                <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] shrink-0">
                  Topic Practice
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] hidden md:block">
                Vivekanandha School Spoken English Practice
              </p>
            </div>
          </div>

          {/* Center: Selected Topic Badge & Progress Indicator */}
          <div className="flex items-center gap-2">
            
            {/* Topic Context Pill (Clickable to switch topics) */}
            <button
              type="button"
              onClick={() => setShowTopicPickerModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-xs font-bold text-[#2563EB] transition-colors cursor-pointer shadow-2xs"
              title="Click to switch conversation topic"
            >
              <span className="text-base">{currentTopic.emoji}</span>
              <span>{currentTopic.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white text-[#2563EB] font-mono">
                {currentTopic.level}
              </span>
            </button>

            {/* Question Progress: Question 1 of 5 */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F1F5F9] text-xs font-bold text-[#475569] border border-[#E2E8F0]">
              <span className="text-[#2563EB] font-mono font-extrabold">
                Q {questionIndex + 1}
              </span>
              <span className="text-[#94A3B8]">/</span>
              <span className="font-mono">{currentTopic.questions.length}</span>
            </div>

            {/* Conversation Live Timer */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F1F5F9] text-[#0F172A] text-xs font-mono font-bold border border-[#E2E8F0]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          </div>

          {/* Right: Bilingual Switcher & End Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <VelvetLanguageSwitcher
              value={languageMode}
              onChange={handleLangChange}
              size="sm"
            />

            <VelvetButton
              size="sm"
              variant="outline"
              onClick={handleEndConversation}
              className="text-xs font-bold text-[#E11D48] hover:bg-[#FFF1F2] border-[#FECDD3] hover:border-[#FDA4AF]"
            >
              End Session
            </VelvetButton>
          </div>
        </div>

        {/* State Simulator Switcher Pill Bar for Testing */}
        <div className="bg-[#EFF6FF]/70 border-t border-[#BFDBFE]/40 py-1 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#64748B] hidden xs:inline">
                Voice State:
              </span>
              
              <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-[#BFDBFE]">
                <button
                  type="button"
                  onClick={() => setConversationState('ready')}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    conversationState === 'ready'
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  1. Ready
                </button>
                <button
                  type="button"
                  onClick={() => setConversationState('listening')}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    conversationState === 'listening'
                      ? 'bg-[#10B981] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  2. Listening
                </button>
                <button
                  type="button"
                  onClick={() => setConversationState('speaking')}
                  className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    conversationState === 'speaking'
                      ? 'bg-[#F59E0B] text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  3. Velvet Speaking
                </button>
              </div>
            </div>

            {/* Quick Change Topic Button */}
            <button
              type="button"
              onClick={() => setShowTopicPickerModal(true)}
              className="text-[11px] font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Change Topic (8 available)</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN VOICE-CONVERSATION STAGE                         */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-between items-center space-y-6">
        
        {/* VELVET MASCOT HERO & PROMPT BUBBLE */}
        <div className="w-full flex flex-col items-center text-center space-y-4">
          
          {/* Mobile Visual Slot for Conversation Companion (< 640px) */}
          <div className="sm:hidden w-full max-w-[220px]">
            <MobileVisualSlot
              src={SPEAK_VELVET_ASSETS.conversation.companionVisual.src}
              alt={SPEAK_VELVET_ASSETS.conversation.companionVisual.alt}
              aspectRatio="1:1"
              fitMode="contain"
              rounded="3xl"
              fallbackMascotState={
                conversationState === 'listening'
                  ? 'listening'
                  : conversationState === 'speaking'
                  ? 'speaking'
                  : conversationState === 'processing'
                  ? 'thinking'
                  : 'happy'
              }
              fallbackTitle={
                conversationState === 'listening'
                  ? 'Listening to you...'
                  : conversationState === 'speaking'
                  ? 'Velvet speaking'
                  : 'Ready to chat'
              }
              border={false}
              className="bg-transparent"
            />
          </div>

          {/* Velvet Mascot in Emotional State (Tablet & Desktop: >= 640px) */}
          <div className="hidden sm:flex relative items-center justify-center">
            {/* Ambient Breathing Glow */}
            <div className={`absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full blur-3xl transition-all duration-700 -z-1 ${
              conversationState === 'listening'
                ? 'bg-[#10B981]/25 scale-110'
                : conversationState === 'speaking'
                ? 'bg-[#F59E0B]/25 scale-105'
                : conversationState === 'processing'
                ? 'bg-[#3B82F6]/20 scale-95'
                : 'bg-[#2563EB]/20 scale-100'
            }`} />

            <VelvetMascot
              state={
                conversationState === 'listening'
                  ? 'listening'
                  : conversationState === 'speaking'
                  ? 'speaking'
                  : conversationState === 'processing'
                  ? 'thinking'
                  : 'happy'
              }
              size="hero"
              animated={true}
            />
          </div>

          {/* VELVET'S LATEST MESSAGE BUBBLE */}
          <div className="relative w-full max-w-xl p-5 sm:p-6 rounded-3xl bg-white border border-[#BFDBFE] shadow-[0_8px_30px_rgba(37,99,235,0.06)] space-y-3 transition-all text-left">
            
            {/* Bubble Header Bar with Question Progress & Listen Again Action */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
                <VelvetSparkleStar size={16} color="blue" />
                <span>
                  {conversationState === 'speaking'
                    ? 'Velvet speaking now'
                    : conversationState === 'processing'
                    ? 'Velvet is thinking...'
                    : `Question ${questionIndex + 1} of ${currentTopic.questions.length}:`}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-normal hidden sm:inline">
                  · {currentTopic.title}
                </span>
              </div>

              {/* “Listen Again” Action for Velvet's Latest Message */}
              <button
                type="button"
                onClick={() => setConversationState('speaking')}
                className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EFF6FF] hover:bg-[#DBEAFE] transition-colors cursor-pointer"
                title="Listen to Velvet again"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Listen Again</span>
              </button>
            </div>

            {/* Velvet Primary Spoken English Prompt */}
            <p className="font-display font-bold text-lg sm:text-xl text-[#0F172A] leading-snug">
              "{latestVelvetMessage.textEn}"
            </p>

            {/* BILINGUAL TAMIL SUPPORT TEXT (English + தமிழ் Mode) */}
            {languageMode === 'en_ta' && latestVelvetMessage.textTa && (
              <div className="pt-2 border-t border-[#F1F5F9] animate-fade-in flex items-start gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] shrink-0 mt-0.5">
                  தமிழ்
                </span>
                <p className="text-xs sm:text-sm font-medium text-[#2563EB] leading-relaxed">
                  {latestVelvetMessage.textTa}
                </p>
              </div>
            )}

            {/* Coach Hint */}
            <p className="text-[11px] text-[#64748B] italic pt-1 border-t border-[#F1F5F9] text-left">
              💡 Coach Tip: {currentQuestion.coachTip}
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. STUDENT SPOKEN RESPONSE & OPTIONAL SENTENCE STARTERS  */}
        {/* ======================================================== */}
        <div className="w-full max-w-xl space-y-3">
          
          {/* Recent Student Message / Active Recording Card */}
          <div className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 ${
            conversationState === 'listening'
              ? 'bg-[#ECFDF5] border-[#A7F3D0] shadow-sm ring-2 ring-[#10B981]/20'
              : conversationState === 'processing'
              ? 'bg-[#EFF6FF] border-[#BFDBFE] animate-pulse'
              : 'bg-white border-[#E2E8F0] shadow-xs'
          }`}>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${
                conversationState === 'listening'
                  ? 'text-[#059669]'
                  : conversationState === 'processing'
                  ? 'text-[#2563EB]'
                  : 'text-[#475569]'
              }`}>
                <User className="w-3.5 h-3.5" />
                <span>
                  {conversationState === 'listening'
                    ? `Listening to ${studentName.split(' ')[0]}...`
                    : conversationState === 'processing'
                    ? 'Processing your answer...'
                    : `${studentName.split(' ')[0]}'s Response:`}
                </span>
              </span>

              {/* Status Badge */}
              {conversationState === 'listening' ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10B981] text-white flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>Recording</span>
                </span>
              ) : conversationState === 'processing' ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2563EB] text-white">
                  Checking speech...
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Recorded</span>
                </span>
              )}
            </div>

            {/* Spoken response text */}
            <p className="text-sm sm:text-base font-medium text-[#0F172A] leading-relaxed italic">
              {conversationState === 'listening' ? (
                <span className="text-[#059669] font-normal flex items-center gap-1">
                  <span>"Go ahead, {studentName.split(' ')[0]}! Speaking in English..."</span>
                  <span className="inline-block w-1.5 h-4 bg-[#10B981] animate-pulse" />
                </span>
              ) : latestStudentMessage ? (
                `"${latestStudentMessage.textEn}"`
              ) : (
                `"${currentQuestion.starters[0].en}"`
              )}
            </p>
          </div>

          {/* OPTIONAL SENTENCE STARTERS FOR STUDENTS WHO NEED HELP */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-bold flex items-center gap-1 text-[#2563EB]">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Sentence Starters (Tap to answer):</span>
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                {languageMode === 'en_ta' ? 'தமிழ் வழிகாட்டியுடன்' : 'Natural student speech'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {currentQuestion.starters.map((starter, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleStudentAnswer(starter.en)}
                  className="p-3 rounded-2xl bg-white hover:bg-[#EFF6FF] border border-[#E2E8F0] hover:border-[#BFDBFE] text-left transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      "{starter.en}"
                    </span>
                    <span className="text-xs font-bold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 shrink-0 ml-2">
                      <span>Speak</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bilingual Tamil helper hint */}
                  {languageMode === 'en_ta' && (
                    <p className="text-[11px] text-[#64748B] mt-1 pt-1 border-t border-[#F8FAFD]">
                      {starter.ta}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. LARGE PRIMARY MICROPHONE & VOICE WAVEFORM             */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col items-center justify-center space-y-4 pt-2">
          
          {/* Animated Audio Waveform Indicator */}
          <div className="h-8 flex items-center justify-center">
            <VelvetAudioWave
              isPlaying={conversationState === 'listening' || conversationState === 'speaking'}
              barCount={17}
              color={
                conversationState === 'listening'
                  ? 'green'
                  : conversationState === 'speaking'
                  ? 'yellow'
                  : 'blue'
              }
            />
          </div>

          {/* Large Center Tactile Microphone Button */}
          <div className="relative flex items-center justify-center">
            
            {/* Concentric Pulse Rings in Listening Mode */}
            {conversationState === 'listening' && (
              <>
                <span className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#10B981] opacity-25 animate-ping pointer-events-none" />
                <span className="absolute w-30 h-30 sm:w-34 sm:h-34 rounded-full bg-[#10B981] opacity-35 animate-pulse pointer-events-none" />
              </>
            )}

            {conversationState === 'speaking' && (
              <>
                <span className="absolute w-30 h-30 sm:w-34 sm:h-34 rounded-full bg-[#F59E0B] opacity-30 animate-pulse pointer-events-none" />
                <span className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#FBBF24] opacity-15 animate-ping pointer-events-none" />
              </>
            )}

            {conversationState === 'ready' && (
              <span className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#2563EB] opacity-15 animate-pulse pointer-events-none" />
            )}

            {/* Primary Tactile Button */}
            <button
              type="button"
              onClick={handleMicClick}
              className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white transition-all duration-300 cursor-pointer border-4 border-white ${
                conversationState === 'listening'
                  ? 'bg-gradient-to-tr from-[#10B981] to-[#059669] shadow-[0_12px_40px_rgba(16,185,129,0.55)] scale-105 active:scale-95'
                  : conversationState === 'speaking'
                  ? 'bg-gradient-to-tr from-[#F59E0B] to-[#FBBF24] text-[#0F172A] shadow-[0_12px_40px_rgba(245,158,11,0.50)] hover:scale-105 active:scale-95'
                  : conversationState === 'processing'
                  ? 'bg-gradient-to-tr from-[#3B82F6] to-[#2563EB] opacity-80 cursor-wait'
                  : 'bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] shadow-[0_10px_36px_rgba(37,99,235,0.45)] hover:scale-105 active:scale-95'
              }`}
              aria-label={
                conversationState === 'listening'
                  ? 'Listening... tap to finish'
                  : conversationState === 'speaking'
                  ? 'Velvet speaking... tap to reply'
                  : 'Tap to speak'
              }
            >
              <Mic className={`w-11 h-11 sm:w-12 sm:h-12 transition-transform ${
                conversationState === 'speaking'
                  ? 'text-[#0F172A]'
                  : 'text-white'
              }`} />
            </button>
          </div>

          {/* Dynamic State Feedback Labels & Helper Text */}
          <div className="text-center space-y-1 max-w-sm">
            {conversationState === 'ready' && (
              <div className="space-y-0.5 animate-fade-in">
                <span className="font-display font-bold text-base sm:text-lg text-[#2563EB] block">
                  Tap to speak
                </span>
                <p className="text-xs text-[#64748B]">
                  Whenever you're ready, tap the mic or choose a starter answer above.
                </p>
              </div>
            )}

            {conversationState === 'listening' && (
              <div className="space-y-0.5 animate-fade-in">
                <span className="font-display font-bold text-base sm:text-lg text-[#059669] flex items-center justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <span>Listening...</span>
                </span>
                <p className="text-xs text-[#475569]">
                  Speak clearly into your microphone · Tap again when finished
                </p>
              </div>
            )}

            {conversationState === 'processing' && (
              <div className="space-y-0.5 animate-fade-in">
                <span className="font-display font-bold text-base sm:text-lg text-[#2563EB] flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-bounce" />
                  <span>Velvet is responding...</span>
                </span>
                <p className="text-xs text-[#64748B]">
                  Analyzing spoken English pronunciation & sentence structure
                </p>
              </div>
            )}

            {conversationState === 'speaking' && (
              <div className="space-y-0.5 animate-fade-in">
                <span className="font-display font-bold text-base sm:text-lg text-[#B45309] flex items-center justify-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#F59E0B]" />
                  <span>Velvet is speaking...</span>
                </span>
                <p className="text-xs text-[#64748B]">
                  Listen carefully to Velvet's question about {currentTopic.title}.
                </p>
              </div>
            )}
          </div>

          {/* Next Question Navigation */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleNextQuestion}
              className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#BFDBFE] shadow-2xs hover:bg-[#EFF6FF] transition-all cursor-pointer"
            >
              <span>Next Question ({questionIndex + 1}/{currentTopic.questions.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 5. TOPIC SELECTION SWITCHER MODAL                        */}
      {/* ======================================================== */}
      {showTopicPickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5 max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F172A]">
                    Select Speaking Topic
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Choose any of the 8 everyday school scenarios to practice
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowTopicPickerModal(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
                aria-label="Close topic selector"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Topic Grid List */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1">
              {SPEAK_VELVET_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setShowTopicPickerModal(false);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 group ${
                    selectedTopicId === topic.id
                      ? 'bg-[#EFF6FF] border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                      : 'bg-white border-[#E2E8F0] hover:border-[#BFDBFE] hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFD] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                      {topic.emoji}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                        {topic.duration}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        topic.level === 'Beginner'
                          ? 'bg-[#ECFDF5] text-[#059669]'
                          : topic.level === 'Intermediate'
                          ? 'bg-[#EFF6FF] text-[#2563EB]'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}>
                        {topic.level}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-snug">
                      {topic.sub}
                    </p>
                  </div>

                  <div className="pt-1 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#2563EB]">
                    <span>{selectedTopicId === topic.id ? 'Currently Practicing' : 'Select Topic'}</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-2 border-t border-[#E2E8F0] shrink-0">
              <VelvetButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setShowTopicPickerModal(false)}
              >
                Cancel & Continue Practice
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. SESSION REFLECTION & PERSONAL FEEDBACK SCREEN         */}
      {/* ======================================================== */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-[#F8FAFD] overflow-y-auto animate-fade-in">
          <SessionReflectionScreen
            languageMode={languageMode}
            studentName={studentName}
            studentClass={studentClass}
            topicTitle={currentTopic.title}
            topicEmoji={currentTopic.emoji}
            sessionDuration={formatTime(secondsElapsed)}
            questionsCount={questionIndex + 1}
            xpEarned={40}
            dailyGoalProgress="4.5 / 5 min"
            streakDays={7}
            onPracticeAgain={() => {
              setShowSummaryModal(false);
              setSecondsElapsed(0);
              setIsTimerRunning(true);
              setQuestionIndex(0);
              setConversationState('speaking');
            }}
            onTryAnotherTopic={() => {
              setShowSummaryModal(false);
              if (onBackToTopics) {
                onBackToTopics();
              } else {
                setShowTopicPickerModal(true);
              }
            }}
            onBackToHome={onBackToHome}
            onViewProgress={() => {
              setShowSummaryModal(false);
              if (onViewProgress) {
                onViewProgress();
              } else {
                onBackToHome();
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
