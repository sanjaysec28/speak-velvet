import React, { useState } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetBadge,
  VelvetProgressBar,
  VelvetAvatar,
  VelvetMascot,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  User,
  School,
  Award,
  Flame,
  Clock,
  MessageSquare,
  HelpCircle,
  Trophy,
  Sparkles,
  Settings,
  Globe,
  Sliders,
  Bell,
  Volume2,
  Mic,
  Eye,
  Check,
  RotateCcw,
  Edit3,
  X,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface StudentProfileScreenProps {
  languageMode?: LanguageMode;
  onLanguageChange?: (mode: LanguageMode) => void;
  studentName?: string;
  studentClass?: string;
  studentId?: string;
  schoolName?: string;
  onLogout?: () => void;
  onOpenConversation?: (topicId?: string) => void;
  onStartOnboarding?: () => void;
}

export const StudentProfileScreen: React.FC<StudentProfileScreenProps> = ({
  languageMode = 'en',
  onLanguageChange,
  studentName: initialName = 'Arjun Sundararajan',
  studentClass: initialClass = '8A',
  studentId = 'VS2026-001',
  schoolName = 'Vivekanandha School',
  onLogout,
  onOpenConversation,
  onStartOnboarding,
}) => {
  // Local profile state
  const [studentName, setStudentName] = useState<string>(initialName);
  const [studentClass, setStudentClass] = useState<string>(initialClass);
  const [preferredLangMode, setPreferredLangMode] = useState<LanguageMode>(languageMode);
  const [dailyGoalMins, setDailyGoalMins] = useState<number>(5);
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced' | 'adaptive'>('intermediate');

  // Selected practice interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'School',
    'Friends',
    'Sports',
    'Food',
  ]);

  // Settings toggles
  const [reduceMotion, setReduceMotion] = useState<boolean>(false);
  const [soundEffects, setSoundEffects] = useState<boolean>(true);
  const [voiceResponses, setVoiceResponses] = useState<boolean>(true);
  const [showTamilTranslations, setShowTamilTranslations] = useState<boolean>(languageMode === 'en_ta');

  // Modals state
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState<boolean>(false);
  const [showSaveSuccessToast, setShowSaveSuccessToast] = useState<boolean>(false);

  // Edit modal temporary form state
  const [editFormName, setEditFormName] = useState<string>(studentName);
  const [editFormClass, setEditFormClass] = useState<string>(studentClass);
  const [editFormGoal, setEditFormGoal] = useState<number>(dailyGoalMins);
  const [editFormLang, setEditFormLang] = useState<LanguageMode>(preferredLangMode);

  // Bilingual strings
  const t = {
    screenTag: preferredLangMode === 'en_ta' ? 'மாணவர் சுயவிவரம்' : 'Student Profile & Preferences',
    screenTitle: preferredLangMode === 'en_ta' ? 'சுயவிவரம் & தனிப்பயனாக்கம்' : 'Student Profile',
    screenSub:
      preferredLangMode === 'en_ta'
        ? 'உங்கள் பள்ளி அடையாள விவரங்கள், பேச்சு ஆர்வங்கள் மற்றும் தினசரி இலக்குகளை நிர்வகியுங்கள்.'
        : 'Manage your school profile, conversational interests, and personal learning preferences.',
    velvetMessage:
      preferredLangMode === 'en_ta'
        ? 'தொடர்ந்து ஆர்வமாக இருங்கள், அர்ஜுன்! ஒவ்வொரு உரையாடலும் உங்களை மேலும் சிறப்பாக பேச உதவும்.'
        : 'Keep being curious, Arjun. Every conversation makes you stronger.',
    levelLabel: preferredLangMode === 'en_ta' ? 'நிலை 4 · நம்பிக்கையான பேச்சாளர்' : 'Level 4 · Confident Speaker',
    summaryHeading: preferredLangMode === 'en_ta' ? 'செயல்பாட்டு சுருக்கம்' : 'Profile Summary',
    preferencesHeading: preferredLangMode === 'en_ta' ? 'கற்றல் விருப்பத்தேர்வுகள்' : 'Learning Preferences',
    interestsHeading: preferredLangMode === 'en_ta' ? 'விருப்பமான பயிற்சித் தலைப்புகள்' : 'Practice Preferences',
    interestsSub:
      preferredLangMode === 'en_ta'
        ? 'நீங்கள் விரும்பும் தலைப்புகளை வைத்து Velvet உங்களுக்கு பிடித்த உரையாடல்களை பரிந்துரைக்கலாம்.'
        : 'Velvet can use these interests to suggest conversations you may enjoy.',
    dailyGoalHeading: preferredLangMode === 'en_ta' ? 'தினசரி பேச்சு இலக்கு' : 'Daily Speaking Goal',
    dailyGoalComfortNote:
      preferredLangMode === 'en_ta'
        ? 'உங்களுக்கு வசதியான இலக்கைத் தேர்ந்தெடுங்கள். எந்த அவசரமும் தேவையில்லை.'
        : 'Choose a goal that feels comfortable for you. Consistency matters more than speed.',
    settingsHeading: preferredLangMode === 'en_ta' ? 'பயன்பாட்டு அமைப்புகள்' : 'Profile Settings',
    journeyHeading: preferredLangMode === 'en_ta' ? 'உங்கள் வெல்வெட் பயணம்' : 'Your Velvet Journey',
    schoolPrivacyNote:
      preferredLangMode === 'en_ta'
        ? 'உங்கள் Speak Velvet கணக்கு விவேகானந்தா பள்ளியால் வழங்கப்படுகிறது. இது பள்ளி மாணவர்களுக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட தனிப்பட்ட சூழல்.'
        : 'Your Speak Velvet account is provided by Vivekanandha School. Your learning experience is private, secure, and designed strictly for school students.',
  };

  const handleInterestToggle = (topic: string) => {
    if (selectedInterests.includes(topic)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter((t) => t !== topic));
      }
    } else {
      setSelectedInterests([...selectedInterests, topic]);
    }
  };

  const handleOpenEdit = () => {
    setEditFormName(studentName);
    setEditFormClass(studentClass);
    setEditFormGoal(dailyGoalMins);
    setEditFormLang(preferredLangMode);
    setShowEditModal(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentName(editFormName.trim() || initialName);
    setStudentClass(editFormClass.trim() || '8A');
    setDailyGoalMins(editFormGoal);
    setPreferredLangMode(editFormLang);
    if (onLanguageChange) {
      onLanguageChange(editFormLang);
    }
    setShowEditModal(false);
    setShowSaveSuccessToast(true);
    setTimeout(() => setShowSaveSuccessToast(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Toast Feedback */}
      {showSaveSuccessToast && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-2xl bg-[#059669] text-white shadow-lg flex items-center gap-2 animate-fade-in text-xs font-bold">
          <Check className="w-4 h-4" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. PROFILE HEADER CARD                                   */}
      {/* ======================================================== */}
      <div className="relative rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/80 p-6 sm:p-8 shadow-[0_4px_24px_rgba(37,99,235,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          
          {/* Avatar & Student Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10">
            <div className="relative">
              <VelvetAvatar
                name={studentName}
                size="xl"
                badgeText={`Class ${studentClass}`}
                isOnline={true}
              />
              <div className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-[#FEF3C7] border-2 border-white flex items-center justify-center text-xs shadow-xs" title="Level 4">
                👑
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold border border-[#BFDBFE]">
                <User className="w-3.5 h-3.5" />
                <span>Student ID: <strong className="font-mono text-[#0F172A]">{studentId}</strong></span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
                {studentName}
              </h1>

              <p className="text-xs sm:text-sm text-[#64748B] flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-bold text-[#0F172A]">Class {studentClass}</span>
                <span>·</span>
                <span className="font-semibold text-[#2563EB] flex items-center gap-1">
                  <School className="w-3.5 h-3.5" />
                  <span>{schoolName}</span>
                </span>
                <span>·</span>
                <span className="font-medium text-[#059669]">Academic Year 2026–2027</span>
              </p>

              {/* Velvet Message Bubble */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#BFDBFE] shadow-2xs text-xs text-[#1E40AF] font-medium flex items-center gap-2 text-left mt-2">
                <VelvetSparkleStar size={14} color="blue" />
                <div>
                  <p className="font-bold text-[#0F172A]">"{t.velvetMessage}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mascot & Edit Action */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-36 h-36 rounded-full bg-[#DBEAFE]/80 blur-xl -z-1" />
              <VelvetMascot state="happy" size="md" animated={true} />
            </div>

            <button
              type="button"
              onClick={handleOpenEdit}
              className="px-4 py-2 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Level XP Bar inside header */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0]/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] space-y-1">
            <span className="text-[#64748B] block text-[11px] font-semibold uppercase">Speaking Level</span>
            <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
              <Award className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.levelLabel}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-[#64748B] uppercase">Experience Points</span>
              <span className="font-mono text-[#2563EB] font-bold">1,240 / 2,000 XP</span>
            </div>
            <VelvetProgressBar value={62} color="blue" size="sm" showValueText={false} />
            <span className="text-[10px] text-[#64748B] block">760 XP needed to reach Level 5</span>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] space-y-1">
            <span className="text-[#64748B] block text-[11px] font-semibold uppercase">Unbroken Habit</span>
            <div className="flex items-center gap-1.5 font-bold text-[#D97706]">
              <Flame className="w-4 h-4 text-[#F59E0B]" />
              <span>7 Days Active Streak 🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Dedicated Student Profile Companion Visual Slot (< 640px) */}
      <div className="sm:hidden w-full">
        <MobileVisualSlot
          src={SPEAK_VELVET_ASSETS.profile.avatarHero.src}
          alt={SPEAK_VELVET_ASSETS.profile.avatarHero.alt}
          aspectRatio="16:9"
          fitMode="cover"
          rounded="2xl"
          fallbackMascotState="encouraging"
          fallbackTitle={`${studentName} · Level 4 Speaker`}
          fallbackSubtitle={`${schoolName} · ${studentClass}`}
          className="shadow-2xs"
        />
      </div>

      {/* ======================================================== */}
      {/* 2. PROFILE SUMMARY METRICS (NO PEER COMPARISON)          */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.summaryHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Your cumulative spoken-English accomplishments with Velvet.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Conversations', value: '12', sub: 'Completed sessions', icon: '💬', color: 'text-[#2563EB]' },
            { label: 'Questions', value: '48', sub: 'Spoken answers', icon: '❓', color: 'text-[#7C3AED]' },
            { label: 'Speaking Time', value: '68.5m', sub: 'Active practice', icon: '⏱️', color: 'text-[#059669]' },
            { label: 'Achievements', value: '12 / 24', sub: '50% Unlocked', icon: '🏆', color: 'text-[#D97706]' },
            { label: 'Longest Streak', value: '12 Days', sub: 'Personal record', icon: '🔥', color: 'text-[#D97706]' },
            { label: 'Top Topic', value: 'School', sub: '5 dialogues', icon: '🏫', color: 'text-[#2563EB]' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col justify-between space-y-1 hover:border-[#BFDBFE] transition-colors"
            >
              <div className="flex items-center justify-between text-base">
                <span>{item.icon}</span>
                <span className="text-[10px] font-bold text-[#10B981] bg-[#ECFDF5] px-1.5 py-0.2 rounded">
                  Personal
                </span>
              </div>
              <div>
                <span className={`font-display font-extrabold text-xl sm:text-2xl block leading-tight ${item.color}`}>
                  {item.value}
                </span>
                <span className="font-bold text-xs text-[#0F172A] block mt-0.5 truncate">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#64748B] block truncate">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. LEARNING PREFERENCES & DAILY GOAL                     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Learning Preferences Card (7 cols) */}
        <div className="md:col-span-7">
          <VelvetCard tint="white" padding="lg" className="space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                {t.preferencesHeading}
              </h3>
              <p className="text-xs text-[#64748B]">
                Configure how Velvet interacts and scaffolds your conversations.
              </p>
            </div>

            {/* Language Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#334155] block">
                Primary Language Mode:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreferredLangMode('en');
                    if (onLanguageChange) onLanguageChange('en');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    preferredLangMode === 'en'
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFD]'
                  }`}
                >
                  <span className="font-bold text-xs block text-[#0F172A]">English Only</span>
                  <span className="text-[11px] opacity-80">Full immersion practice</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreferredLangMode('en_ta');
                    if (onLanguageChange) onLanguageChange('en_ta');
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    preferredLangMode === 'en_ta'
                      ? 'bg-[#EFF6FF] border-[#2563EB] text-[#2563EB] shadow-xs'
                      : 'bg-white border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFD]'
                  }`}
                >
                  <span className="font-bold text-xs block text-[#0F172A]">English + தமிழ்</span>
                  <span className="text-[11px] opacity-80">Bilingual assistance & cues</span>
                </button>
              </div>
            </div>

            {/* Difficulty Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#334155] block">
                Difficulty Preference:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'beginner', label: 'Beginner', desc: 'Short phrases' },
                  { id: 'intermediate', label: 'Intermediate', desc: 'Everyday chat' },
                  { id: 'advanced', label: 'Advanced', desc: 'Storytelling' },
                  { id: 'adaptive', label: 'Adaptive ⭐', desc: 'Matches pace' },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    type="button"
                    onClick={() => setDifficultyLevel(diff.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      difficultyLevel === diff.id
                        ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                        : 'bg-[#F8FAFD] border-[#E2E8F0] text-[#475569] hover:bg-white'
                    }`}
                  >
                    <span className="font-bold text-xs block">{diff.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${difficultyLevel === diff.id ? 'text-blue-100' : 'text-[#64748B]'}`}>
                      {diff.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Practice Interests Chips */}
            <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#334155] block">
                  {t.interestsHeading}:
                </label>
                <span className="text-[11px] text-[#64748B] font-medium">
                  {selectedInterests.length} selected
                </span>
              </div>
              <p className="text-[11px] text-[#64748B]">
                {t.interestsSub}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { name: 'School', icon: '🏫' },
                  { name: 'Friends', icon: '👥' },
                  { name: 'Sports', icon: '⚽' },
                  { name: 'Food', icon: '🍔' },
                  { name: 'Movies', icon: '🎬' },
                  { name: 'Games', icon: '🎮' },
                  { name: 'Family', icon: '🏡' },
                  { name: 'Travel', icon: '✈️' },
                ].map((item) => {
                  const isSelected = selectedInterests.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => handleInterestToggle(item.name)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'bg-[#F8FAFD] text-[#64748B] border border-[#E2E8F0] hover:bg-white hover:text-[#0F172A]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </VelvetCard>
        </div>

        {/* Daily Goal Preference Card & Velvet Journey (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Daily Goal Control Card */}
          <VelvetCard tint="white" padding="md" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-[#0F172A] block">
                  {t.dailyGoalHeading}
                </span>
                <span className="text-xs text-[#64748B]">
                  Currently set to <strong>{dailyGoalMins} minutes/day</strong>
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs">
                {dailyGoalMins}m
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setDailyGoalMins(mins)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    dailyGoalMins === mins
                      ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                      : 'bg-[#F8FAFD] border-[#E2E8F0] text-[#64748B] hover:bg-white hover:text-[#0F172A]'
                  }`}
                >
                  <span className="font-display font-extrabold text-base block">{mins} Min</span>
                  <span className={`text-[10px] block ${dailyGoalMins === mins ? 'text-blue-100' : 'text-[#64748B]'}`}>
                    {mins === 5 ? 'Comfortable' : mins === 10 ? 'Balanced' : 'Intensive'}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-[#64748B] pt-1 border-t border-[#F1F5F9]">
              🌱 {t.dailyGoalComfortNote}
            </p>
          </VelvetCard>

          {/* Your Velvet Journey Summary Card */}
          <VelvetCard tint="white" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#0F172A] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>{t.journeyHeading}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                Active Routine
              </span>
            </div>

            <div className="divide-y divide-[#F1F5F9] text-xs">
              <div className="py-2 flex items-center justify-between">
                <span className="text-[#64748B]">Personal Best Session:</span>
                <span className="font-bold text-[#0F172A]">5.5 Mins (Wednesday, Sep 4)</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-[#64748B]">Latest Achievement:</span>
                <span className="font-bold text-[#D97706] flex items-center gap-1">
                  <span>🔥</span>
                  <span>7-Day Streak Hero</span>
                </span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <span className="text-[#64748B]">Confidence Score:</span>
                <span className="font-bold text-[#2563EB]">80% (+8% gain)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenConversation) onOpenConversation('school');
              }}
              className="w-full py-2 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#2563EB] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Practice Today's Conversation</span>
            </button>
          </VelvetCard>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. PROFILE SETTINGS (TOGGLES & ACCESSIBLE CONTROLS)      */}
      {/* ======================================================== */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#0F172A] tracking-tight">
            {t.settingsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Device accessibility and audio feedback preferences for this browser.
          </p>
        </div>

        <VelvetCard tint="white" padding="md" className="divide-y divide-[#F1F5F9]">
          
          {/* Toggle 1: Show Tamil Translations */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                Show Tamil Translations & Scaffolding
              </span>
              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Provides conversational Tamil tips alongside English coach prompts.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showTamilTranslations}
              onClick={() => {
                const next = !showTamilTranslations;
                setShowTamilTranslations(next);
                setPreferredLangMode(next ? 'en_ta' : 'en');
                if (onLanguageChange) onLanguageChange(next ? 'en_ta' : 'en');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                showTamilTranslations ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                  showTamilTranslations ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Voice Responses */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                Voice Responses from Velvet
              </span>
              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Play spoken voice responses when Velvet answers your questions.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={voiceResponses}
              onClick={() => setVoiceResponses(!voiceResponses)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                voiceResponses ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                  voiceResponses ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: Sound Effects */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                Sound Effects & Chimes
              </span>
              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Play gentle celebratory sounds when finishing practice and goals.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={soundEffects}
              onClick={() => setSoundEffects(!soundEffects)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                soundEffects ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                  soundEffects ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Reduce Motion */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                Reduce Animations & Motion
              </span>
              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Minimizes background effects and mascot movements.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={reduceMotion}
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                reduceMotion ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${
                  reduceMotion ? 'left-5.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Replay Onboarding Tour */}
          {onStartOnboarding && (
            <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#F1F5F9]">
              <div>
                <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                  Replay Student Setup & Onboarding Tour
                </span>
                <p className="text-[11px] text-[#64748B]">
                  Walk through the first-time welcoming steps and microphone guide again.
                </p>
              </div>
              <button
                type="button"
                onClick={onStartOnboarding}
                className="px-3.5 py-1.5 rounded-xl border border-[#BFDBFE] text-[#2563EB] hover:bg-[#EFF6FF] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
              >
                Replay Onboarding
              </button>
            </div>
          )}

          {/* Danger / Reset Mock Progress */}
          <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
            <div>
              <span className="font-bold text-xs sm:text-sm text-[#E11D48] block">
                Reset Demo Progress
              </span>
              <p className="text-[11px] text-[#64748B]">
                Clears local browser session milestones for prototype demonstration.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowResetConfirmModal(true)}
              className="px-3.5 py-1.5 rounded-xl border border-[#FECDD3] text-[#E11D48] hover:bg-[#FFF1F2] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              Reset Mock Progress
            </button>
          </div>
        </VelvetCard>
      </section>

      {/* ======================================================== */}
      {/* 5. PRIVACY & SCHOOL CONTEXT CARD                         */}
      {/* ======================================================== */}
      <div className="p-5 rounded-3xl bg-[#F8FAFD] border border-[#E2E8F0] flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-xs uppercase tracking-wider text-[#64748B] block">
            School Safety & Privacy Commitment
          </span>
          <p className="text-xs text-[#334155] leading-relaxed">
            {t.schoolPrivacyNote}
          </p>
          <p className="text-[11px] text-[#64748B]">
            Zero public profile sharing · Zero competitive leaderboards · 100% focused on student self-improvement.
          </p>
        </div>
      </div>

      {/* Logout Action */}
      {onLogout && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="px-5 py-2.5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#FECDD3] hover:bg-[#FFF1F2] text-[#E11D48] text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            Sign Out of Account
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. EDIT PROFILE MODAL                                    */}
      {/* ======================================================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-5">
            
            {/* Close */}
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer hover:bg-[#E2E8F0]"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-2xl text-[#0F172A]">
                Edit Profile
              </h3>
              <p className="text-xs text-[#64748B]">
                Update display name, class and conversational preferences.
              </p>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              
              {/* Display Name */}
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editFormName}
                  onChange={(e) => setEditFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none font-medium text-[#0F172A]"
                  placeholder="e.g. Arjun Sundararajan"
                  required
                />
              </div>

              {/* Class & Section */}
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">
                  Class & Section
                </label>
                <input
                  type="text"
                  value={editFormClass}
                  onChange={(e) => setEditFormClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none font-medium text-[#0F172A]"
                  placeholder="e.g. 8A"
                  required
                />
              </div>

              {/* Preferred Language Mode */}
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">
                  Language Mode
                </label>
                <select
                  value={editFormLang}
                  onChange={(e) => setEditFormLang(e.target.value as LanguageMode)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none font-medium text-[#0F172A] bg-white cursor-pointer"
                >
                  <option value="en">English Only (Full Immersion)</option>
                  <option value="en_ta">English + தமிழ் (Bilingual Scaffolding)</option>
                </select>
              </div>

              {/* Daily Speaking Goal */}
              <div className="space-y-1">
                <label className="font-bold text-[#334155] block">
                  Daily Speaking Goal
                </label>
                <select
                  value={editFormGoal}
                  onChange={(e) => setEditFormGoal(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] focus:border-[#2563EB] focus:outline-none font-medium text-[#0F172A] bg-white cursor-pointer"
                >
                  <option value={5}>5 Minutes / day (Recommended)</option>
                  <option value={10}>10 Minutes / day (Balanced)</option>
                  <option value={15}>15 Minutes / day (Intensive)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <VelvetButton
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Save Changes
                </VelvetButton>

                <VelvetButton
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </VelvetButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 7. RESET CONFIRMATION MODAL                              */}
      {/* ======================================================== */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#E2E8F0] space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center mx-auto text-xl">
              ⚠️
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-[#0F172A]">
                Reset Demo Progress?
              </h3>
              <p className="text-xs text-[#64748B]">
                This resets local prototype demonstration values back to defaults. Real school records are not affected.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <VelvetButton
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  setShowResetConfirmModal(false);
                  setShowSaveSuccessToast(true);
                  setTimeout(() => setShowSaveSuccessToast(false), 3000);
                }}
                className="bg-[#E11D48] hover:bg-[#BE123C] border-none text-white"
              >
                Reset Demo Data
              </VelvetButton>

              <VelvetButton
                variant="outline"
                size="md"
                fullWidth
                onClick={() => setShowResetConfirmModal(false)}
              >
                Cancel
              </VelvetButton>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
