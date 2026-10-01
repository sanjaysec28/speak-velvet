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
  ArrowLeft,
  Check,
  CheckCircle2,
  Mic,
  Volume2,
  Clock,
  ShieldCheck,
  School,
  Heart,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Radio,
} from 'lucide-react';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface OnboardingPreferences {
  languageMode: LanguageMode;
  dailyGoal: '5min' | '10min' | '15min';
  interests: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Adaptive';
}

export interface StudentOnboardingScreenProps {
  studentName?: string;
  studentClass?: string;
  schoolName?: string;
  initialLanguageMode?: LanguageMode;
  onCompleteOnboarding: (preferences: OnboardingPreferences, startTopicId?: string) => void;
  onSkipOnboarding: () => void;
}

export const StudentOnboardingScreen: React.FC<StudentOnboardingScreenProps> = ({
  studentName = 'Arjun Sundararajan',
  studentClass = 'Class 8A',
  schoolName = 'Vivekanandha School',
  initialLanguageMode = 'en_ta',
  onCompleteOnboarding,
  onSkipOnboarding,
}) => {
  // Setup step: 1 (Language), 2 (Goal), 3 (Interests), 4 (Level), 5 (Velvet Intro & How it works / Mic preview)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Collected Preferences state
  const [languageMode, setLanguageMode] = useState<LanguageMode>(initialLanguageMode);
  const [dailyGoal, setDailyGoal] = useState<'5min' | '10min' | '15min'>('5min');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['School', 'Friends']);
  const [selectedLevel, setSelectedLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Adaptive'>('Beginner');

  // Mic test indicator state
  const [mockMicTested, setMockMicTested] = useState<boolean>(true);

  const firstName = studentName.split(' ')[0] || 'Arjun';

  // Toggle interest item
  const handleToggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  // Determine first recommended topic based on selected interests
  const getFirstTopic = () => {
    if (selectedInterests.includes('Sports')) return 'sports';
    if (selectedInterests.includes('Friends')) return 'friends';
    if (selectedInterests.includes('Food')) return 'food';
    return 'school'; // Default
  };

  // Skip helper: apply sensible defaults
  const handleSkip = () => {
    onCompleteOnboarding(
      {
        languageMode: 'en_ta',
        dailyGoal: '5min',
        interests: ['School', 'Friends'],
        level: 'Beginner',
      },
      'school'
    );
  };

  // Finish onboarding and launch first practice
  const handleStartFirstConversation = () => {
    const topicId = getFirstTopic();
    onCompleteOnboarding(
      {
        languageMode,
        dailyGoal,
        interests: selectedInterests.length > 0 ? selectedInterests : ['School', 'Friends'],
        level: selectedLevel,
      },
      topicId
    );
  };

  // Bilingual strings
  const t = {
    welcomeTitle: languageMode === 'en_ta' ? 'Speak Velvet-க்கு நல்வரவு!' : 'Welcome to Speak Velvet!',
    tagline:
      languageMode === 'en_ta'
        ? 'ஆங்கிலம் பேசிப் பயிற்சி செய்யும் உங்கள் நட்பு இடம்.'
        : 'Your friendly space to practice speaking English.',
    hiArjun:
      languageMode === 'en_ta'
        ? `வணக்கம், ${firstName}! உங்களை தயார்படுத்துவோம்.`
        : `Hi, ${firstName}! Let's get you ready.`,
    schoolCompanion:
      languageMode === 'en_ta'
        ? `${schoolName}-ன் தனிப்பட்ட பேச்சு வழிகாட்டி.`
        : `${schoolName}'s private speaking companion.`,
    step1Title: languageMode === 'en_ta' ? 'படி 1 — விருப்பமான மொழி' : 'Step 1 — Preferred Language',
    step1Sub:
      languageMode === 'en_ta'
        ? 'பயிற்சி செய்யும்போது Velvet உங்களுக்கு எவ்வாறு உதவ வேண்டும் என்பதைத் தேர்வுசெய்யவும்.'
        : 'Choose how Velvet should support you while you practice.',
    step2Title: languageMode === 'en_ta' ? 'படி 2 — தினசரி பேச்சு இலக்கு' : 'Step 2 — Speaking Goal',
    step2Sub:
      languageMode === 'en_ta'
        ? 'உங்களுக்கு வசதியான இலக்கைத் தேர்வுசெய்யவும்.'
        : 'Choose a daily goal that feels comfortable for you.',
    step3Title: languageMode === 'en_ta' ? 'படி 3 — பிடித்த தலைப்புகள்' : 'Step 3 — Practice Interests',
    step3Sub:
      languageMode === 'en_ta'
        ? 'உங்களுக்கு விருப்பமானவற்றைத் தேர்வுசெய்யவும். Velvet உரையாடல்களைப் பரிந்துரைக்கும்.'
        : 'Select topics you enjoy. Velvet can use these to suggest conversations.',
    step4Title: languageMode === 'en_ta' ? 'படி 4 — பேச்சு நிலை' : 'Step 4 — Speaking Level',
    step4Sub:
      languageMode === 'en_ta'
        ? 'உங்கள் தற்போதைய ஆங்கில பேசும் நிலையைத் தேர்வுசெய்யவும்.'
        : 'Choose what feels most like your current speaking comfort level.',
    skipBtn: languageMode === 'en_ta' ? 'இப்போதைக்குத் தவிர்' : 'Skip for now',
    continueBtn: languageMode === 'en_ta' ? 'தொடர்க' : 'Continue',
    backBtn: languageMode === 'en_ta' ? 'முந்தையது' : 'Back',
    velvetIntroTitle: languageMode === 'en_ta' ? 'வணக்கம்! நான் Velvet.' : "Hi! I'm Velvet.",
    velvetIntroBody:
      languageMode === 'en_ta'
        ? 'நீங்கள் பேசுவதை கேட்டு, உங்களுடன் உரையாடி, ஆங்கிலத்தில் நம்பிக்கையுடன் பேச நான் உதவுவேன்.'
        : "I'll listen to you, talk with you, and help you become more confident in English.",
    howItWorksHeading: languageMode === 'en_ta' ? 'எப்படி செயல்படுகிறது?' : 'How It Works',
    stepA: languageMode === 'en_ta' ? '1. நீங்கள் பேசுங்கள்' : '1. You speak',
    stepB: languageMode === 'en_ta' ? '2. Velvet கேட்கும்' : '2. Velvet listens',
    stepC: languageMode === 'en_ta' ? '3. தொடர்ந்து பேசுங்கள்' : '3. Keep chatting',
    noPressure:
      languageMode === 'en_ta'
        ? 'எந்த அழுத்தமும் இல்லை. இயல்பாகப் பேசுங்கள்.'
        : 'No pressure. Just talk naturally.',
    micIntroTitle:
      languageMode === 'en_ta'
        ? 'உங்களைக் கேட்க Velvet-க்கு மைக்ரோஃபோன் தேவை.'
        : 'Velvet needs your microphone to hear you.',
    micSafe:
      languageMode === 'en_ta'
        ? 'உங்கள் குரல் முற்றிலும் பாதுகாப்பானது. பள்ளி வகுப்பறைக்கு மட்டுமே உரியது.'
        : 'Private and secure. Designed specifically for school students.',
    startCTA: languageMode === 'en_ta' ? 'முதல் உரையாடலைத் தொடங்குக' : 'Start My First Conversation',
    startSub:
      languageMode === 'en_ta'
        ? 'உங்கள் முதல் உரையாடல் சில நிமிடங்கள் மட்டுமே இருக்கலாம்.'
        : 'Your first conversation can be just a few minutes.',
  };

  const availableInterests = [
    { id: 'School', label: 'School', emoji: '🏫' },
    { id: 'Friends', label: 'Friends', emoji: '👥' },
    { id: 'Sports', label: 'Sports', emoji: '⚽' },
    { id: 'Food', label: 'Food', emoji: '🍔' },
    { id: 'Movies', label: 'Movies', emoji: '🎬' },
    { id: 'Games', label: 'Games', emoji: '🎮' },
    { id: 'Family', label: 'Family', emoji: '🏡' },
    { id: 'Travel', label: 'Travel', emoji: '✈️' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFD] flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Bar */}
      <header className="max-w-3xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center font-display font-extrabold text-base shadow-sm">
            V
          </div>
          <div>
            <span className="font-display font-bold text-base text-[#0F172A] block leading-tight">
              Speak Velvet
            </span>
            <span className="text-[11px] font-semibold text-[#64748B]">
              {schoolName}
            </span>
          </div>
        </div>

        {/* Skip For Now Button */}
        {currentStep <= 4 && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-bold text-[#64748B] hover:text-[#2563EB] hover:underline cursor-pointer"
          >
            {t.skipBtn}
          </button>
        )}
      </header>

      {/* Main Container Card */}
      <main className="max-w-2xl mx-auto w-full my-auto py-6">
        
        {/* Progress Indicator for Steps 1 to 4 */}
        {currentStep <= 4 && (
          <div className="mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#64748B]">
              <span className="text-[#2563EB]">Step {currentStep} of 4</span>
              <span>{Math.round((currentStep / 4) * 100)}% Setup</span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#E2E8F0] overflow-hidden">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Mobile Visual Slot for Onboarding Steps (< 640px) */}
        <div className="sm:hidden w-full mb-4">
          <MobileVisualSlot
            src={SPEAK_VELVET_ASSETS.onboarding.welcomeStep.src}
            alt={SPEAK_VELVET_ASSETS.onboarding.welcomeStep.alt}
            aspectRatio="16:9"
            fitMode="contain"
            rounded="2xl"
            fallbackMascotState={currentStep === 5 ? 'celebration' : 'happy'}
            fallbackTitle={`Step ${currentStep} of 4: Setup Your Experience`}
            fallbackSubtitle="Personalized speaking practice with Velvet"
            className="shadow-2xs"
          />
        </div>

        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 sm:p-10 shadow-md space-y-6">
          
          {/* ======================================================== */}
          {/* STEP 1: PREFERRED LANGUAGE                               */}
          {/* ======================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Welcome Badge & Title */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-xs font-bold border border-[#FDE68A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.hiArjun}</span>
                </div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
                  {t.welcomeTitle}
                </h1>
                <p className="text-sm text-[#475569]">
                  {t.tagline}
                </p>
              </div>

              {/* School Trust Notice */}
              <div className="p-3.5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center gap-3 text-xs text-[#1E40AF]">
                <School className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>{t.schoolCompanion}</span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <h2 className="font-display font-bold text-base text-[#0F172A]">
                    {t.step1Title}
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    {t.step1Sub}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* English Only */}
                  <div
                    onClick={() => setLanguageMode('en')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      languageMode === 'en'
                        ? 'border-[#2563EB] bg-[#EFF6FF]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#BFDBFE]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#0F172A]">English Only</span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          languageMode === 'en' ? 'bg-[#2563EB] text-white' : 'border border-[#CBD5E1]'
                        }`}
                      >
                        {languageMode === 'en' && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      Full English immersion with text prompts and coach guidance.
                    </p>
                  </div>

                  {/* English + தமிழ் */}
                  <div
                    onClick={() => setLanguageMode('en_ta')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      languageMode === 'en_ta'
                        ? 'border-[#2563EB] bg-[#EFF6FF]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#BFDBFE]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-[#0F172A]">English + தமிழ்</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                          Recommended
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          languageMode === 'en_ta' ? 'bg-[#2563EB] text-white' : 'border border-[#CBD5E1]'
                        }`}
                      >
                        {languageMode === 'en_ta' && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      English conversation with gentle Tamil explanations and hints when you need them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
                <VelvetButton
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2"
                >
                  <span>{t.continueBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </VelvetButton>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: SPEAKING GOAL                                    */}
          {/* ======================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
                  {t.step2Title}
                </h2>
                <p className="text-sm text-[#64748B]">
                  {t.step2Sub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: '5min' as const,
                    title: '5 min / day',
                    sub: 'Gentle & steady. Great for daily practice after school.',
                    recommended: true,
                  },
                  {
                    id: '10min' as const,
                    title: '10 min / day',
                    sub: 'Comfortable pace. 2 conversations daily.',
                  },
                  {
                    id: '15min' as const,
                    title: '15 min / day',
                    sub: 'Active speaking. Faster confidence building.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setDailyGoal(item.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      dailyGoal === item.id
                        ? 'border-[#2563EB] bg-[#EFF6FF]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#BFDBFE]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base text-[#0F172A]">{item.title}</span>
                        {item.recommended && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669]">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        {item.sub}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          dailyGoal === item.id ? 'bg-[#2563EB] text-white' : 'border border-[#CBD5E1]'
                        }`}
                      >
                        {dailyGoal === item.id && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-[#64748B] bg-[#F8FAFD] p-3 rounded-2xl border border-[#E2E8F0]">
                💡 You can always change your speaking goal anytime in your Profile settings.
              </p>

              {/* Navigation Action */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <VelvetButton
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </VelvetButton>

                <VelvetButton
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2"
                >
                  <span>{t.continueBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </VelvetButton>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: PRACTICE INTERESTS (MULTI-SELECT)                */}
          {/* ======================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
                  {t.step3Title}
                </h2>
                <p className="text-sm text-[#64748B]">
                  {t.step3Sub}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableInterests.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleToggleInterest(interest.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-1.5 ${
                        isSelected
                          ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-2xs'
                          : 'border-[#E2E8F0] bg-white text-[#334155] hover:border-[#BFDBFE]'
                      }`}
                    >
                      <span className="text-2xl">{interest.emoji}</span>
                      <span className="font-bold text-xs">{interest.label}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="text-xs text-[#64748B] text-center sm:text-left">
                Select as many as you like. Velvet will use these to suggest topics you will enjoy talking about!
              </p>

              {/* Navigation Action */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <VelvetButton
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </VelvetButton>

                <VelvetButton
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(4)}
                  className="flex items-center gap-2"
                >
                  <span>{t.continueBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </VelvetButton>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 4: SPEAKING LEVEL                                   */}
          {/* ======================================================== */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="font-display font-extrabold text-2xl text-[#0F172A] tracking-tight">
                  {t.step4Title}
                </h2>
                <p className="text-sm text-[#64748B]">
                  {t.step4Sub}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'Beginner' as const,
                    title: 'Beginner',
                    badge: 'Class 6-8',
                    sub: 'Comfortable with short sentences and helpful vocabulary starters.',
                  },
                  {
                    id: 'Intermediate' as const,
                    title: 'Intermediate',
                    badge: 'Class 8-10',
                    sub: 'Can express opinions, descriptions, and share stories with minimal pause.',
                  },
                  {
                    id: 'Advanced' as const,
                    title: 'Advanced',
                    badge: 'Confident',
                    sub: 'Enjoys open-ended discussions, complex questions, and expressive dialogue.',
                  },
                  {
                    id: 'Adaptive' as const,
                    title: 'Not Sure (Adaptive)',
                    badge: 'Smart Flow',
                    sub: 'Velvet will start gently and adapt the speed and vocabulary to match your comfort.',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedLevel(item.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      selectedLevel === item.id
                        ? 'border-[#2563EB] bg-[#EFF6FF]'
                        : 'border-[#E2E8F0] bg-white hover:border-[#BFDBFE]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#0F172A]">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        {item.sub}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                          selectedLevel === item.id ? 'bg-[#2563EB] text-white' : 'border border-[#CBD5E1]'
                        }`}
                      >
                        {selectedLevel === item.id && <Check className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Action */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <VelvetButton
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.backBtn}</span>
                </VelvetButton>

                <VelvetButton
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(5)}
                  className="flex items-center gap-2"
                >
                  <span>Meet Velvet</span>
                  <ArrowRight className="w-4 h-4" />
                </VelvetButton>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 5: VELVET INTRODUCTION, HOW IT WORKS & MIC DEMO     */}
          {/* ======================================================== */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              
              {/* Velvet Hero Speech Intro */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative shrink-0">
                  <div className="absolute w-24 h-24 rounded-full bg-[#DBEAFE]/80 blur-lg -z-1" />
                  <VelvetMascot state="happy" size="md" animated={true} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-xs font-bold border border-[#A7F3D0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Your Speaking Companion Ready</span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
                    {t.velvetIntroTitle}
                  </h2>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {t.velvetIntroBody}
                  </p>
                </div>
              </div>

              {/* How It Works 3-Step Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
                  {t.howItWorksHeading}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
                    <span className="text-xl">🎙️</span>
                    <h4 className="font-bold text-xs text-[#0F172A]">{t.stepA}</h4>
                    <p className="text-[11px] text-[#64748B]">Speak answers naturally in English.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
                    <span className="text-xl">👂</span>
                    <h4 className="font-bold text-xs text-[#0F172A]">{t.stepB}</h4>
                    <p className="text-[11px] text-[#64748B]">Velvet listens without grading or rush.</p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E2E8F0] space-y-1">
                    <span className="text-xl">💬</span>
                    <h4 className="font-bold text-xs text-[#0F172A]">{t.stepC}</h4>
                    <p className="text-[11px] text-[#64748B]">Have an everyday conversation.</p>
                  </div>
                </div>

                <p className="text-xs font-semibold text-[#059669] text-center pt-1">
                  ✨ {t.noPressure}
                </p>
              </div>

              {/* Microphone Usage Explanation (Mock) */}
              <div className="p-4 rounded-2xl bg-white border border-[#BFDBFE] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0">
                    <Mic className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-xs text-[#0F172A] block">
                      {t.micIntroTitle}
                    </span>
                    <span className="text-[11px] text-[#64748B]">
                      {t.micSafe}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#059669] px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] shrink-0">
                  Ready & Verified
                </span>
              </div>

              {/* Recommended First Topic Preview Card */}
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-left space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#92400E] block flex items-center gap-1.5">
                  <VelvetSparkleStar size={12} color="gold" />
                  <span>First Practice Topic Selected for You:</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getFirstTopic() === 'sports' ? '⚽' : getFirstTopic() === 'friends' ? '👥' : '🏫'}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-[#0F172A]">
                      {getFirstTopic() === 'sports'
                        ? 'Sports & Games'
                        : getFirstTopic() === 'friends'
                        ? 'Friends & Fun'
                        : 'School Life'}
                    </h4>
                    <p className="text-xs text-[#64748B]">
                      Opening prompt: "What is your favorite subject at school, and why?"
                    </p>
                  </div>
                </div>
              </div>

              {/* Launch CTA */}
              <div className="pt-2 space-y-2">
                <VelvetButton
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleStartFirstConversation}
                  className="flex items-center justify-center gap-2 py-3.5 shadow-md"
                >
                  <Mic className="w-5 h-5" />
                  <span className="text-sm font-bold">{t.startCTA}</span>
                </VelvetButton>

                <p className="text-xs text-[#64748B] text-center">
                  {t.startSub}
                </p>
              </div>

            </div>
          )}

        </div>
      </main>

      {/* Footer Notice */}
      <footer className="max-w-3xl mx-auto w-full text-center py-2 text-xs text-[#94A3B8]">
        Private student speaking companion · {schoolName}
      </footer>

    </div>
  );
};
