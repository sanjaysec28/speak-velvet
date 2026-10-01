/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoginScreen } from './screens/LoginScreen.tsx';
import { StudentDashboard } from './screens/StudentDashboard.tsx';
import { ConversationScreen } from './screens/ConversationScreen.tsx';
import { StudentOnboardingScreen } from './screens/StudentOnboardingScreen.tsx';
import { AppTab } from './components/AppShell.tsx';
import {
  VelvetButton,
  VelvetCard,
  VelvetSection,
  VelvetTopicCard,
  VelvetInput,
  VelvetPasswordInput,
  VelvetBadge,
  VelvetStatusLabel,
  VelvetMetadataRow,
  VelvetProgressBar,
  VelvetCircularProgress,
  VelvetStreakIndicator,
  VelvetLanguageSwitcher,
  VelvetSidebarNavItem,
  VelvetBottomNavItem,
  VelvetAvatar,
  VelvetStudentProfileCard,
  VelvetMicButton,
  VelvetAudioWave,
  VelvetVoiceWaveIndicator,
  VoiceState,
  LanguageMode,
  VelvetMascot,
  MascotState,
  MascotSize,
  VELVET_MASCOT_SPEC,
  VELVET_RESPONSIVE_SPEC,
  VELVET_INTERACTION_STATES,
  VelvetEducationalIllustration,
  VelvetSparkleStar,
  VelvetSoundArc,
  VelvetSpeechBubbleWrapper,
} from './design-system/index.ts';
import {
  Mic,
  Sparkles,
  Search,
  BookOpen,
  Volume2,
  CheckCircle2,
  Gamepad2,
  ArrowRight,
  Flame,
  Award,
  Home,
  Compass,
  TrendingUp,
  User,
  GraduationCap,
  Trophy,
  Smile,
  ShieldCheck,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  MousePointer,
  Hand,
  Zap,
  LogIn,
  LayoutDashboard,
} from 'lucide-react';

type ComponentCategory =
  | 'all'
  | 'responsive'
  | 'mascot'
  | 'illustrations'
  | 'buttons'
  | 'cards-sections'
  | 'inputs'
  | 'badges-labels'
  | 'progress'
  | 'language'
  | 'navigation'
  | 'profile-avatar'
  | 'voice-audio';

type ViewportSim = 'full' | 'desktop' | 'tablet' | 'mobile';

export default function App() {
  // Navigation between the screens: 'dashboard' (Main student experience), 'talk' (Voice conversation), 'login' (Login screen), 'onboarding' (First-time onboarding), 'design-system' (Token explorer)
  const [currentView, setCurrentView] = useState<'dashboard' | 'talk' | 'login' | 'onboarding' | 'design-system'>('dashboard');
  const [dashboardTab, setDashboardTab] = useState<AppTab>('home');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('all');
  const [conversationTopic, setConversationTopic] = useState<string>('Daily Conversation');
  const [viewportSim, setViewportSim] = useState<ViewportSim>('full');
  
  // Accessibility & Interaction Simulator Toggles
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const [showTouchTargets, setShowTouchTargets] = useState(false);

  // Mascot Interactive States
  const [mascotState, setMascotState] = useState<MascotState>('listening');
  const [mascotSize, setMascotSize] = useState<MascotSize>('hero');
  const [mascotSpeech, setMascotSpeech] = useState<string>("Ready to speak today? I'm here with you!");
  const [showSpeechBubble, setShowSpeechBubble] = useState<boolean>(true);

  // Component Playground States
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en_ta');
  const [voiceState, setVoiceState] = useState<VoiceState>('listening');
  const [isMicListening, setIsMicListening] = useState(true);
  const [progressVal, setProgressVal] = useState(72);
  const [selectedTopic, setSelectedTopic] = useState('school');
  const [activeNav, setActiveNav] = useState('home');
  const [activeBottomNav, setActiveBottomNav] = useState('practice');
  const [sampleSearch, setSampleSearch] = useState('School life');
  const [samplePassword, setSamplePassword] = useState('Velvet#2026');

  // VIEW 1: Main Speak Velvet Student Home Dashboard
  if (currentView === 'dashboard') {
    return (
      <div className="relative">
        <StudentDashboard
          initialTab={dashboardTab}
          onLogout={() => setCurrentView('login')}
          onOpenDesignSystem={() => setCurrentView('design-system')}
          onStartOnboarding={() => setCurrentView('onboarding')}
          onOpenConversation={(topic) => {
            if (topic) setConversationTopic(topic);
            setCurrentView('talk');
          }}
          studentName="Arjun Sundararajan"
          studentId="VS2026-001"
          studentClass="Class 8A"
        />

        {/* Global Floating Quick Switcher Pill (Switch to Progress / Talk / Login / Onboarding / Tokens easily) */}
        <div className="fixed bottom-20 lg:bottom-6 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentView('onboarding')}
            className="px-3 py-2 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFD] shadow-[0_4px_16px_rgba(15,23,42,0.15)] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Start New Student Onboarding Flow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            <span>Onboarding</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDashboardTab('progress');
              setCurrentView('dashboard');
            }}
            className="px-3.5 py-2 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFD] shadow-[0_4px_16px_rgba(15,23,42,0.15)] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="View Student Progress Dashboard"
          >
            <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
            <span>Progress</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('talk')}
            className="px-3.5 py-2 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_16px_rgba(37,99,235,0.35)] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Open Talk with Velvet"
          >
            <Mic className="w-3.5 h-3.5 text-white" />
            <span>Talk with Velvet</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('login')}
            className="px-3.5 py-2 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFD] shadow-[0_4px_16px_rgba(15,23,42,0.15)] border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="View Login Screen"
          >
            <LogIn className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Login Screen</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('design-system')}
            className="px-3.5 py-2 rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-[0_4px_16px_rgba(15,23,42,0.25)] border border-white/20 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="View Design System Tokens"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Tokens</span>
          </button>
        </div>
      </div>
    );
  }

  // VIEW: Student First-Time Onboarding Experience
  if (currentView === 'onboarding') {
    return (
      <div className="relative">
        <StudentOnboardingScreen
          studentName="Arjun Sundararajan"
          studentClass="Class 8A"
          schoolName="Vivekanandha School"
          initialLanguageMode={languageMode}
          onCompleteOnboarding={(prefs, startTopicId) => {
            setLanguageMode(prefs.languageMode);
            if (startTopicId) {
              setConversationTopic(startTopicId);
              setCurrentView('talk');
            } else {
              setCurrentView('dashboard');
            }
          }}
          onSkipOnboarding={() => setCurrentView('dashboard')}
        />

        {/* Floating Quick Return Pill */}
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFD] border border-[#E2E8F0] shadow-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  // VIEW 2: Dedicated "Talk with Velvet" Voice Conversation Screen
  if (currentView === 'talk') {
    return (
      <div className="relative">
        <ConversationScreen
          onBackToHome={() => setCurrentView('dashboard')}
          onBackToTopics={() => {
            setDashboardTab('topics');
            setCurrentView('dashboard');
          }}
          onViewProgress={() => {
            setDashboardTab('progress');
            setCurrentView('dashboard');
          }}
          languageMode={languageMode}
          onLanguageChange={setLanguageMode}
          studentName="Arjun Sundararajan"
          studentClass="Class 8A"
          initialTopic={conversationTopic}
        />

        {/* Floating Quick Switcher Pill */}
        <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAFD] border border-[#E2E8F0] shadow-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('design-system')}
            className="px-4 py-2 rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-md text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Tokens</span>
          </button>
        </div>
      </div>
    );
  }

  // VIEW 2: Private Student Login Screen
  if (currentView === 'login') {
    return (
      <div className="relative">
        <LoginScreen
          onLoginSuccess={() => setCurrentView('dashboard')}
          onOpenDesignSystem={() => setCurrentView('design-system')}
          onOpenOnboarding={() => setCurrentView('onboarding')}
        />

        {/* Floating Switcher Pill (Desktop / Tablet only) */}
        <div className="fixed bottom-4 right-4 z-40 hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-[0_4px_16px_rgba(37,99,235,0.30)] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to Dashboard →</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentView('design-system')}
            className="px-4 py-2 rounded-full bg-[#0F172A] text-white hover:bg-[#1E293B] shadow-[0_4px_16px_rgba(15,23,42,0.30)] border border-white/20 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Tokens</span>
          </button>
        </div>
      </div>
    );
  }

  // VIEW 3: Locked Design System Token Explorer & Simulator Workbench
  const categories: { id: ComponentCategory; label: string }[] = [
    { id: 'all', label: 'All System' },
    { id: 'responsive', label: 'Responsive & Interaction' },
    { id: 'mascot', label: 'Mascot & Expressions' },
    { id: 'illustrations', label: 'Educational Illustrations' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards-sections', label: 'Cards & Sections' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'badges-labels', label: 'Badges & Labels' },
    { id: 'progress', label: 'Progress & Streaks' },
    { id: 'language', label: 'Language Switcher' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'profile-avatar', label: 'Student Profile' },
    { id: 'voice-audio', label: 'Voice & Microphone' },
  ];

  const shouldShow = (cat: ComponentCategory) => selectedCategory === 'all' || selectedCategory === cat;

  // Viewport simulator container styles
  const viewportStyles: Record<ViewportSim, string> = {
    full: 'w-full',
    desktop: 'max-w-[1240px] mx-auto border-x border-[#E2E8F0] shadow-xl rounded-3xl overflow-hidden my-6 bg-[#F8FAFD]',
    tablet: 'max-w-[768px] mx-auto border-x border-[#E2E8F0] shadow-xl rounded-3xl overflow-hidden my-6 bg-[#F8FAFD]',
    mobile: 'max-w-[390px] mx-auto border-4 border-[#0F172A] shadow-2xl rounded-[40px] overflow-hidden my-6 bg-[#F8FAFD]',
  };

  return (
    <div className={`min-h-screen bg-[#F0F4F9] text-[#0F172A] flex flex-col antialiased selection:bg-[#DBEAFE] selection:text-[#1D4ED8] ${simulateReducedMotion ? 'simulate-reduced-motion' : ''} ${showTouchTargets ? 'highlight-touch-targets' : ''}`}>
      
      {/* System Status & Responsive Simulator Toolbar */}
      <aside aria-label="Responsive Testing Controls" className="bg-[#0F172A] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 sticky top-0 z-60 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
          <span className="font-bold tracking-tight">Speak Velvet System: Locked & Finalized</span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="ml-2 px-2.5 py-0.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <span>← Open Student Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentView('login')}
            className="px-2.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs"
          >
            <span>Login Screen</span>
          </button>
        </div>

        {/* Viewport Width Simulator Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg">
            <button
              onClick={() => setViewportSim('full')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewportSim === 'full' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              Fluid
            </button>
            <button
              onClick={() => setViewportSim('desktop')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewportSim === 'desktop' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setViewportSim('tablet')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewportSim === 'tablet' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <Tablet className="w-3 h-3" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => setViewportSim('mobile')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewportSim === 'mobile' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-white/70 hover:text-white'
              }`}
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile (390px)</span>
            </button>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setSimulateReducedMotion(!simulateReducedMotion)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              simulateReducedMotion ? 'bg-[#F59E0B] text-[#0F172A]' : 'bg-white/10 text-white/80 hover:text-white'
            }`}
            title="Toggle prefers-reduced-motion emulation"
          >
            <Zap className="w-3 h-3" />
            <span>{simulateReducedMotion ? 'Motion: Reduced' : 'Motion: Normal'}</span>
          </button>

          {/* 44px Touch Target Highlighter */}
          <button
            onClick={() => setShowTouchTargets(!showTouchTargets)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              showTouchTargets ? 'bg-[#10B981] text-white' : 'bg-white/10 text-white/80 hover:text-white'
            }`}
            title="Highlight touch target bounding boxes"
          >
            <Hand className="w-3 h-3" />
            <span>{showTouchTargets ? '44px Targets: Visible' : '44px Targets'}</span>
          </button>
        </div>
      </aside>

      {/* Main Viewport Container Frame */}
      <div className={`transition-all duration-300 ${viewportStyles[viewportSim]}`}>
        
        {/* 3-Zone Clean Header Contract */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
            
            {/* Zone 1: Single text element Brand Mark */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-lg sm:text-xl text-[#0F172A] tracking-tight truncate">
                    Speak Velvet
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE] shrink-0">
                    Design System
                  </span>
                </div>
                <p className="text-xs text-[#64748B] hidden sm:block truncate">
                  Finalized Responsive UI & Interaction Architecture
                </p>
              </div>
            </div>

            {/* Zone 2: Language Switcher */}
            <div className="hidden md:flex items-center">
              <VelvetLanguageSwitcher
                value={languageMode}
                onChange={setLanguageMode}
                showAuto={true}
                size="sm"
              />
            </div>

            {/* Zone 3: Quick Filter Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <VelvetButton
                size="sm"
                variant="primary"
                onClick={() => setCurrentView('dashboard')}
                leftIcon={<LayoutDashboard className="w-3.5 h-3.5" />}
              >
                Dashboard
              </VelvetButton>

              <VelvetButton
                size="sm"
                variant={selectedCategory === 'responsive' ? 'accent' : 'outline'}
                onClick={() => setSelectedCategory(selectedCategory === 'responsive' ? 'all' : 'responsive')}
                leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              >
                Responsive Rules
              </VelvetButton>

              <VelvetButton
                size="sm"
                variant={selectedCategory === 'mascot' ? 'accent' : 'outline'}
                onClick={() => setSelectedCategory(selectedCategory === 'mascot' ? 'all' : 'mascot')}
                leftIcon={<Smile className="w-3.5 h-3.5 text-[#F59E0B]" />}
              >
                Mascot
              </VelvetButton>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="border-t border-[#E2E8F0]/60 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-12">

          {/* ========================================================================= */}
          {/* RESPONSIVE & INTERACTION ARCHITECTURE */}
          {/* ========================================================================= */}
          {shouldShow('responsive') && (
            <VelvetSection
              title="Responsive Behavior, Touch Targets & Interaction Contracts"
              subtitle="Specifications for fluid cross-device consistency across Mobile (<640px), Tablet (640-1024px) and Desktop (>1024px)"
              action={
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    ✓ 44px Touch Envelope Enforced
                  </span>
                </div>
              }
            >
              {/* Three Device Breakpoint Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Mobile Rule */}
                <VelvetCard tint="white" padding="lg" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                      <Smartphone className="w-4 h-4 text-[#2563EB]" />
                      <span>Mobile Device (&lt; 640px)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded">sm</span>
                  </div>
                  <ul className="text-xs text-[#475569] space-y-2 leading-relaxed">
                    <li><strong>Layout:</strong> Single column vertical stack, 16px container padding.</li>
                    <li><strong>Navigation:</strong> Fixed bottom tab bar (`VelvetBottomNavItem`) with touch-friendly 44px hit-boxes.</li>
                    <li><strong>Touch Interactions:</strong> Tactile physical scale (`active:scale-[0.98]`) with zero hover-stick artifacts.</li>
                    <li><strong>Sticky Cap:</strong> Header + bottom bar never exceeds 15% of mobile viewport height.</li>
                  </ul>
                </VelvetCard>

                {/* Tablet Rule */}
                <VelvetCard tint="white" padding="lg" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                      <Tablet className="w-4 h-4 text-[#F59E0B]" />
                      <span>Tablet / Foldable (640-1024px)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded">md</span>
                  </div>
                  <ul className="text-xs text-[#475569] space-y-2 leading-relaxed">
                    <li><strong>Layout:</strong> 2-column responsive grid, 20px-24px outer margins.</li>
                    <li><strong>Adaptive Navigation:</strong> Top bar with inline segmented language switcher.</li>
                    <li><strong>Hybrid Inputs:</strong> Seamless support for both stylus touch and keyboard accessibility.</li>
                    <li><strong>Mascot Placement:</strong> Medium (92px-148px) anchor beside practice prompts.</li>
                  </ul>
                </VelvetCard>

                {/* Desktop Rule */}
                <VelvetCard tint="white" padding="lg" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                      <Monitor className="w-4 h-4 text-[#10B981]" />
                      <span>Desktop Workspace (&gt; 1024px)</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded">lg/xl</span>
                  </div>
                  <ul className="text-xs text-[#475569] space-y-2 leading-relaxed">
                    <li><strong>Layout:</strong> 1280px-1440px wide viewport with full sidebar or 3-column Bento flow.</li>
                    <li><strong>Hover Affordances:</strong> Smooth hover lift (`hover:-translate-y-0.5 hover:shadow-lg`).</li>
                    <li><strong>Keyboard Focus:</strong> Clear royal blue focus ring (`focus-visible:ring-2 focus-visible:ring-[#2563EB]`).</li>
                    <li><strong>Typography:</strong> Full display scale (Display Hero 40px, Display Title 28px).</li>
                  </ul>
                </VelvetCard>
              </div>

              {/* Interaction State Playground (Hover, Press, Focus, Disabled, Loading) */}
              <VelvetCard tint="white" padding="lg" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0F172A]">
                      All 5 Core Component Interaction States
                    </h3>
                    <p className="text-xs text-[#64748B]">
                      Every button and control guarantees unambiguous visual feedback for student actions
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <VelvetButton
                      size="sm"
                      variant={btnLoading ? 'accent' : 'outline'}
                      onClick={() => setBtnLoading(!btnLoading)}
                    >
                      Toggle Loading
                    </VelvetButton>
                    <VelvetButton
                      size="sm"
                      variant={btnDisabled ? 'gentle-pink' : 'outline'}
                      onClick={() => setBtnDisabled(!btnDisabled)}
                    >
                      Toggle Disabled
                    </VelvetButton>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Normal Resting State */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                    <span className="text-xs font-bold text-[#0F172A] block">1. Normal / Resting</span>
                    <VelvetButton variant="primary" size="md" fullWidth>
                      Talk to Velvet
                    </VelvetButton>
                    <p className="text-[10px] text-[#64748B]">Default clean surface with subtle blue glow</p>
                  </div>

                  {/* Hover Lift State */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#2563EB]">
                      <MousePointer className="w-3.5 h-3.5" />
                      <span>2. Hover Lift</span>
                    </div>
                    <VelvetButton
                      variant="primary"
                      size="md"
                      fullWidth
                      className="-translate-y-0.5 shadow-[0_6px_20px_rgba(37,99,235,0.40)] bg-[#1D4ED8]"
                    >
                      Talk to Velvet
                    </VelvetButton>
                    <p className="text-[10px] text-[#64748B]">-0.5 translateY with expanded soft shadow</p>
                  </div>

                  {/* Pressed / Active State */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#B45309]">
                      <Hand className="w-3.5 h-3.5" />
                      <span>3. Pressed (Mobile)</span>
                    </div>
                    <VelvetButton
                      variant="primary"
                      size="md"
                      fullWidth
                      className="scale-[0.98] brightness-95 bg-[#1E40AF]"
                    >
                      Talk to Velvet
                    </VelvetButton>
                    <p className="text-[10px] text-[#64748B]">Scale(0.98) tactile physical push feedback</p>
                  </div>

                  {/* Focus Ring State */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                    <span className="text-xs font-bold text-[#059669] block">4. Focus-Visible</span>
                    <VelvetButton
                      variant="primary"
                      size="md"
                      fullWidth
                      className="ring-2 ring-[#2563EB] ring-offset-2"
                    >
                      Talk to Velvet
                    </VelvetButton>
                    <p className="text-[10px] text-[#64748B]">WCAG keyboard tab navigation halo</p>
                  </div>

                  {/* Loading & Disabled States */}
                  <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                    <span className="text-xs font-bold text-[#64748B] block">5. Loading / Disabled</span>
                    <VelvetButton
                      variant="primary"
                      size="md"
                      fullWidth
                      isLoading={true}
                    >
                      Saving Speech
                    </VelvetButton>
                    <p className="text-[10px] text-[#64748B]">Spinning indicator, pointer-events disabled</p>
                  </div>
                </div>
              </VelvetCard>
            </VelvetSection>
          )}

          {/* Mascot Section */}
          {shouldShow('mascot') && (
            <VelvetSection
              title="Speak Velvet Mascot System: Velvet the Speaking Companion"
              subtitle="A warm, approachable, relatable student companion designed with clean modern vector geometry."
            >
              <div className="rounded-3xl bg-gradient-to-br from-white via-[#F8FAFD] to-[#EFF6FF] border border-[#BFDBFE]/60 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-3 max-w-md">
                    <h3 className="font-display font-bold text-2xl text-[#0F172A]">
                      Velvet in Active Practice
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed">
                      "I'm here to listen and help you speak with confidence in everyday English."
                    </p>
                  </div>
                  <VelvetMascot state="happy" size="lg" animated={true} />
                </div>
              </div>
            </VelvetSection>
          )}

          {/* Educational Illustrations */}
          {shouldShow('illustrations') && (
            <VelvetSection
              title="Educational Spot Illustrations"
              subtitle="Clean flat-plus-depth vector spot illustrations for school student scenarios"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { type: 'school-hall' as const, title: 'School Hall', sub: 'Vivekanandha School' },
                  { type: 'conversation-mic' as const, title: 'Conversation Mic', sub: 'Voice speech aura' },
                  { type: 'daily-streak-flame' as const, title: 'Streak Flame', sub: '7-day daily streak' },
                  { type: 'vocabulary-book' as const, title: 'Vocabulary Book', sub: 'New words learned' },
                ].map((ill) => (
                  <VelvetCard key={ill.type} tint="white" padding="md" className="flex flex-col items-center text-center space-y-2">
                    <VelvetEducationalIllustration type={ill.type} size={100} />
                    <div>
                      <span className="font-bold text-sm text-[#0F172A] block">{ill.title}</span>
                      <span className="text-[11px] text-[#64748B]">{ill.sub}</span>
                    </div>
                  </VelvetCard>
                ))}
              </div>
            </VelvetSection>
          )}

          {/* Buttons */}
          {shouldShow('buttons') && (
            <VelvetSection
              title="Action Buttons"
              subtitle="Accessible touch targets with rounded corners, active scale, and loading states"
            >
              <VelvetCard tint="white" padding="lg" className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <VelvetButton variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Talk to Velvet
                  </VelvetButton>
                  <VelvetButton variant="accent" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
                    Try Again
                  </VelvetButton>
                  <VelvetButton variant="gentle-green" size="md">
                    Complete Practice
                  </VelvetButton>
                  <VelvetButton variant="outline" size="md">
                    Change Topic
                  </VelvetButton>
                </div>
              </VelvetCard>
            </VelvetSection>
          )}

          {/* Cards & Topics */}
          {shouldShow('cards-sections') && (
            <VelvetSection
              title="Topic Selection Cards & Surface Tints"
              subtitle="Soft rounded cards for school conversation topics with responsive grid flow"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {[
                  { id: 'school', title: 'School', sub: 'Class life', emoji: '🏫', tint: 'white' as const },
                  { id: 'friends', title: 'Friends', sub: 'Make friends', emoji: '👥', tint: 'sky' as const },
                  { id: 'sports', title: 'Sports', sub: 'Fitness & play', emoji: '⚽', tint: 'mint' as const },
                  { id: 'food', title: 'Food', sub: 'Favorites', emoji: '🍔', tint: 'amber' as const },
                  { id: 'movies', title: 'Movies', sub: 'Stories', emoji: '🎬', tint: 'rose' as const },
                  { id: 'games', title: 'Games', sub: 'Fun quizzes', emoji: '🎮', tint: 'lavender' as const },
                ].map((topic) => (
                  <VelvetTopicCard
                    key={topic.id}
                    title={topic.title}
                    subtitle={topic.sub}
                    icon={topic.emoji}
                    tint={topic.tint}
                    isSelected={selectedTopic === topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                  />
                ))}
              </div>
            </VelvetSection>
          )}

          {/* Voice Controls */}
          {shouldShow('voice-audio') && (
            <VelvetSection
              title="Voice Microphone & Live Listening Indicator"
              subtitle="The central voice-first interaction elements"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <VelvetCard tint="white" padding="xl" className="flex flex-col items-center justify-center text-center space-y-4">
                  <VelvetMicButton
                    isListening={isMicListening}
                    onClick={() => {
                      const next = !isMicListening;
                      setIsMicListening(next);
                      setVoiceState(next ? 'listening' : 'idle');
                    }}
                    size="hero"
                    label={isMicListening ? "Listening to Arjun..." : "Tap to speak"}
                    sublabel={isMicListening ? "Speak clearly into your mic" : "Click to test active wave"}
                  />
                  <VelvetAudioWave isPlaying={isMicListening} barCount={15} color="blue" />
                </VelvetCard>

                <VelvetVoiceWaveIndicator
                  state={voiceState}
                  barCount={13}
                />
              </div>
            </VelvetSection>
          )}

        </main>

        {/* Clean Footer */}
        <footer className="bg-white border-t border-[#E2E8F0]/80 py-8 px-4 sm:px-6 lg:px-8 mt-16">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm text-[#0F172A]">Speak Velvet</span>
              <span className="text-xs text-[#64748B]">·</span>
              <span className="text-xs text-[#64748B]">Locked Visual Design System</span>
              <span className="text-xs text-[#64748B]">·</span>
              <span className="text-xs text-[#64748B]">Ready for Screen Implementation</span>
            </div>

            <p className="text-xs text-[#94A3B8]">
              Tested across Mobile, Tablet and Desktop viewports
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
