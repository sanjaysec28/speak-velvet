import React, { useState } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetLanguageSwitcher,
  VelvetSidebarNavItem,
  VelvetBottomNavItem,
  VelvetAvatar,
  VelvetProgressBar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  Home,
  Mic,
  Compass,
  TrendingUp,
  Award,
  User,
  School,
  LogOut,
  Sparkles,
  ChevronRight,
  Menu,
  X,
  Radio,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export type AppTab = 'home' | 'talk' | 'topics' | 'progress' | 'achievements' | 'profile';

export interface AppShellProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  languageMode: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  studentName?: string;
  studentId?: string;
  studentClass?: string;
  schoolName?: string;
  onLogout?: () => void;
  onOpenDesignSystem?: () => void;
  onTalkTrigger?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onTabChange,
  languageMode,
  onLanguageChange,
  studentName = 'Arjun Sundararajan',
  studentId = 'VS2026-001',
  studentClass = 'Class 8A',
  schoolName = 'Vivekanandha School',
  onLogout,
  onOpenDesignSystem,
  onTalkTrigger,
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: AppTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    {
      id: 'talk',
      label: 'Talk with Velvet',
      icon: <Mic className="w-5 h-5" />,
      badge: 'Daily',
    },
    { id: 'topics', label: 'Topics', icon: <Compass className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'achievements', label: 'Achievements', icon: <Award className="w-5 h-5" />, badge: '3 New' },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (tab: AppTab) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
    if (tab === 'talk' && onTalkTrigger) {
      onTalkTrigger();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0F172A] flex flex-col antialiased selection:bg-[#DBEAFE] selection:text-[#1D4ED8]">
      
      {/* ======================================================== */}
      {/* 1. TOP BAR (Responsive for all screens)                  */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand & School Lockup */}
          <div className="flex items-center gap-3">
            {/* Mobile Drawer Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#60A5FA] flex items-center justify-center text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] shrink-0 transition-transform group-hover:scale-105">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-xl text-[#0F172A] tracking-tight">
                    <span className="text-[#2563EB]">Speak</span>{' '}
                    <span className="text-[#F59E0B]">Velvet</span>
                  </span>
                  <span className="hidden sm:inline-flex text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                    Student
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] hidden sm:block truncate">
                  {schoolName} <span className="text-[#CBD5E1]">·</span> Spoken English
                </p>
              </div>
            </button>
          </div>

          {/* Tablet Quick Navigation Bar (640px to 1024px) */}
          <div className="hidden sm:flex lg:hidden items-center gap-1 bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0]">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'home' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('topics')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'topics' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Topics
            </button>
            <button
              onClick={() => handleNavClick('progress')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'progress' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Progress
            </button>
            <button
              onClick={() => handleNavClick('achievements')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'achievements' ? 'bg-white text-[#2563EB] shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Achievements
            </button>
          </div>

          {/* Right Header Zone: Language Switcher, Profile Chip & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <VelvetLanguageSwitcher
              value={languageMode}
              onChange={onLanguageChange}
              size="sm"
            />

            {/* Student Avatar / Profile Chip */}
            <button
              type="button"
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-[#E2E8F0] transition-colors cursor-pointer text-left"
            >
              <VelvetAvatar
                name={studentName}
                size="sm"
                isOnline={true}
              />
              <div className="hidden md:block leading-tight">
                <span className="text-xs font-bold text-[#0F172A] block truncate max-w-[110px]">
                  {studentName.split(' ')[0]}
                </span>
                <span className="text-[10px] text-[#64748B] font-medium">
                  {studentClass}
                </span>
              </div>
            </button>

            {/* Design Tokens Link */}
            {onOpenDesignSystem && (
              <VelvetButton
                size="sm"
                variant="outline"
                onClick={onOpenDesignSystem}
                className="hidden xl:inline-flex text-xs"
              >
                Tokens
              </VelvetButton>
            )}

            {/* Logout button */}
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#E11D48] hover:bg-[#FFF1F2] transition-colors cursor-pointer"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. BODY CONTAINER WITH DESKTOP SIDEBAR                   */}
      {/* ======================================================== */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex gap-8">
        
        {/* Desktop Sidebar (Permanent on lg screens: >1024px) */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 space-y-6">
          
          {/* Student Profile Identity Card */}
          <VelvetCard
            tint="white"
            padding="md"
            className="cursor-pointer hover:shadow-md transition-all group"
            onClick={() => handleNavClick('profile')}
          >
            <div className="flex items-center justify-between">
              <VelvetAvatar
                name={studentName}
                badgeText={studentClass}
                size="md"
              />
              <span className="text-xs font-bold text-[#2563EB] group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>

            <div className="pt-3">
              <span className="font-bold text-sm text-[#0F172A] block truncate">
                {studentName}
              </span>
              <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5">
                <span>{schoolName}</span>
                <span>·</span>
                <span>{studentId}</span>
              </p>
            </div>

            {/* XP Level Bar */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[#0F172A] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Level 3 Speaker</span>
                </span>
                <span className="text-[#2563EB] font-mono text-[11px]">1,240 XP</span>
              </div>
              <VelvetProgressBar
                value={62}
                color="blue"
                size="sm"
                showValueText={false}
              />
            </div>
          </VelvetCard>

          {/* Desktop Navigation Links (with Blue Accent Active States) */}
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <VelvetSidebarNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isActive={activeTab === item.id}
                onClick={() => handleNavClick(item.id)}
              />
            ))}
          </nav>

          {/* Persistent "Talk with Velvet" Quick Action Box in Desktop Sidebar */}
          <div className="rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE]/60 border border-[#93C5FD] p-4 text-[#1E40AF] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Radio className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
                <span>Daily Practice</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#2563EB]">
                2 min
              </span>
            </div>

            <p className="text-xs text-[#334155] leading-relaxed">
              Complete today's speaking target with Velvet to protect your 7-day streak!
            </p>

            <VelvetButton
              variant="primary"
              size="sm"
              fullWidth
              onClick={() => {
                if (onTalkTrigger) onTalkTrigger();
                else handleNavClick('talk');
              }}
              leftIcon={<Mic className="w-3.5 h-3.5 text-white" />}
              className="shadow-[0_4px_14px_rgba(37,99,235,0.30)]"
            >
              Start Practice
            </VelvetButton>
          </div>

          {/* School Contact Footer in Sidebar */}
          <div className="pt-2 text-xs text-[#64748B] space-y-1 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
              <School className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{schoolName}</span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              Vivekanandha English Language Lab · Safe Classroom Companion
            </p>
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MAIN PAGE VIEW CONTENT                                   */}
        {/* ======================================================== */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-0 animate-fade-in">
          {children}
        </main>
      </div>

      {/* ======================================================== */}
      {/* 3. MOBILE FIXED BOTTOM NAVIGATION BAR                    */}
      {/* (Permanent touch bar on mobile/tablet viewports)         */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-[0_-4px_20px_rgba(15,23,42,0.06)]"
      >
        <div className="max-w-md mx-auto px-4 py-1.5 flex items-center justify-around relative">
          
          {/* Home */}
          <VelvetBottomNavItem
            icon={<Home className="w-5 h-5" />}
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => handleNavClick('home')}
          />

          {/* Topics */}
          <VelvetBottomNavItem
            icon={<Compass className="w-5 h-5" />}
            label="Topics"
            isActive={activeTab === 'topics'}
            onClick={() => handleNavClick('topics')}
          />

          {/* PERSISTENT CENTER TALK WITH VELVET QUICK ACTION */}
          <div className="relative -top-4 flex flex-col items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onTalkTrigger) onTalkTrigger();
                else handleNavClick('talk');
              }}
              className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#1D4ED8] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(37,99,235,0.45)] active:scale-95 transition-all border-4 border-white cursor-pointer"
              aria-label="Talk with Velvet now"
            >
              {/* Outer Ripple */}
              <span className="absolute inset-0 rounded-full bg-[#2563EB] opacity-30 animate-ping pointer-events-none" />
              <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <span className="text-[10px] font-bold text-[#2563EB] tracking-tight -mt-0.5">
              Talk
            </span>
          </div>

          {/* Progress */}
          <VelvetBottomNavItem
            icon={<TrendingUp className="w-5 h-5" />}
            label="Progress"
            isActive={activeTab === 'progress'}
            onClick={() => handleNavClick('progress')}
          />

          {/* Achievements / Profile */}
          <VelvetBottomNavItem
            icon={<User className="w-5 h-5" />}
            label="Profile"
            isActive={activeTab === 'profile' || activeTab === 'achievements'}
            onClick={() => handleNavClick('profile')}
          />
        </div>
      </nav>

      {/* ======================================================== */}
      {/* 4. MOBILE / TABLET DRAWER OVERLAY                        */}
      {/* ======================================================== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-fade-in"
          />

          {/* Drawer Menu Surface */}
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 animate-fade-in">
            <div className="space-y-6">
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white flex items-center justify-center font-bold">
                    <Mic className="w-4 h-4" />
                  </div>
                  <span className="font-display font-bold text-lg text-[#0F172A]">
                    Speak Velvet
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Student Profile Overview */}
              <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                <div className="flex items-center gap-2.5">
                  <VelvetAvatar name={studentName} size="sm" isOnline />
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">{studentName}</span>
                    <span className="text-[10px] text-[#64748B]">{studentClass} · {studentId}</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#2563EB] font-bold">
                  {schoolName}
                </div>
              </div>

              {/* Full Nav Link List */}
              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <VelvetSidebarNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                    isActive={activeTab === item.id}
                    onClick={() => handleNavClick(item.id)}
                  />
                ))}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#E11D48] hover:bg-[#FFF1F2] transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out of {studentName.split(' ')[0]}</span>
                </button>
              )}

              <p className="text-[10px] text-[#94A3B8] text-center">
                Protected by Vivekanandha School Privacy Shield
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
