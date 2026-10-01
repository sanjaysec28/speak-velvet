import React, { useState } from 'react';
import {
  VelvetButton,
  VelvetCard,
  VelvetInput,
  VelvetPasswordInput,
  VelvetLanguageSwitcher,
  VelvetMascot,
  VelvetSparkleStar,
  LanguageMode,
} from '../design-system/index.ts';
import {
  ShieldCheck,
  User,
  ArrowRight,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  X,
  GraduationCap,
  School,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { SPEAK_VELVET_ASSETS } from '../assets/speak-velvet/index.ts';
import { MobileVisualSlot } from '../components/MobileVisualSlot.tsx';

export interface LoginScreenProps {
  onLoginSuccess?: (studentId: string) => void;
  onOpenDesignSystem?: () => void;
  onOpenOnboarding?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onOpenDesignSystem,
  onOpenOnboarding,
}) => {
  const [studentId, setStudentId] = useState('VS2026-001');
  const [password, setPassword] = useState('Velvet#2026');
  const [showPassword, setShowPassword] = useState(false);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentId.trim()) {
      setErrorMessage(
        languageMode === 'en_ta'
          ? 'தயவுசெய்து மாணவர் எண்ணை உள்ளிடவும் (Please enter Student ID)'
          : 'Please enter your Student ID.'
      );
      return;
    }
    if (!password.trim()) {
      setErrorMessage(
        languageMode === 'en_ta'
          ? 'தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும் (Please enter Password)'
          : 'Please enter your password.'
      );
      return;
    }

    setIsLoading(true);
    setLoginFeedback(null);

    // Simulate authentication verification
    setTimeout(() => {
      setIsLoading(false);
      setLoginFeedback(
        languageMode === 'en_ta'
          ? 'வணக்கம் அர்ஜுன்! சரிபார்க்கப்பட்டது (Welcome Arjun! Verified)'
          : 'Welcome Arjun! Credentials verified.'
      );
      if (onLoginSuccess) {
        onLoginSuccess(studentId);
      }
    }, 800);
  };

  const handleDemoFill = () => {
    setStudentId('VS2026-001');
    setPassword('Velvet#2026');
    setErrorMessage('');
  };

  // Bilingual text dictionary
  const t = {
    welcomeTitle: languageMode === 'en_ta' ? 'மீண்டும் நல்வரவு! 👋' : 'Welcome Back! 👋',
    tagline: languageMode === 'en_ta' ? 'உங்கள் பேச்சு வழிகாட்டி' : 'Your Speaking Companion',
    schoolName: 'Vivekanandha School',
    schoolMotto: 'The School for Ambitious Minds',
    speechBubble: languageMode === 'en_ta' ? 'வாருங்கள், ஒன்றாகப் பேசி வளருவோம்! 🌟' : "Let's Speak Grow Together!",
    studentIdLabel: languageMode === 'en_ta' ? 'மாணவர் எண் (Student ID)' : 'Student ID',
    studentIdPlaceholder: 'e.g. VS2026-001',
    passwordLabel: languageMode === 'en_ta' ? 'கடவுச்சொல் (Password)' : 'Password',
    loginBtn: languageMode === 'en_ta' ? 'உள்நுழைக' : 'Login',
    loggingIn: languageMode === 'en_ta' ? 'சரிபார்க்கிறது...' : 'Logging in...',
    trustMessage:
      languageMode === 'en_ta'
        ? 'விவேகானந்தா பள்ளி மாணவர்களுக்கு மட்டுமே'
        : 'Only for Vivekanandha School Students',
    helpLink:
      languageMode === 'en_ta'
        ? 'உதவி தேவையா? ஆசிரியரைத் தொடர்பு கொள்ளவும்'
        : 'Need help? Contact your teacher',
    privateSafe: languageMode === 'en_ta' ? '100% பாதுகாப்பானது' : '100% Private & Safe',
    sessionBadge: languageMode === 'en_ta' ? '2026-27 கல்வி ஆண்டு' : '2026-27 Session',
    subInstruction:
      languageMode === 'en_ta'
        ? 'இன்றைய பயிற்சியைத் தொடங்க உங்கள் பள்ளி எண் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.'
        : "Enter your school ID and password to begin today's practice.",
  };

  return (
    <div className="min-h-screen bg-[#F8FAFD] text-[#0F172A] selection:bg-[#DBEAFE] selection:text-[#1D4ED8] flex flex-col justify-between relative overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. TOP GLOBAL NAVIGATION BAR (DESKTOP & TABLET ONLY)      */}
      {/* ======================================================== */}
      <header className="hidden lg:flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 items-center justify-between z-30 relative">
        {/* Left: School Crest Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center justify-center text-[#2563EB]">
            <School className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <span className="font-bold text-xs sm:text-sm text-[#0F172A] block leading-tight tracking-tight">
              Vivekanandha School
            </span>
            <span className="text-[10px] sm:text-xs text-[#64748B] font-medium hidden xs:block">
              {t.schoolMotto}
            </span>
          </div>
        </div>

        {/* Right: Bilingual Switcher & Optional Design System Quick Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          <VelvetLanguageSwitcher
            value={languageMode}
            onChange={setLanguageMode}
            size="sm"
          />

          {onOpenDesignSystem && (
            <VelvetButton
              size="sm"
              variant="outline"
              onClick={onOpenDesignSystem}
              className="hidden md:inline-flex text-xs"
            >
              Design Tokens
            </VelvetButton>
          )}
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN RESPONSIVE CONTAINER (DESKTOP & TABLET >= lg)    */}
      {/* ======================================================== */}
      <main className="flex-1 hidden lg:flex items-center justify-center p-3 sm:p-6 lg:p-8 z-10 w-full max-w-7xl mx-auto">
        
        {/* DESKTOP / LAPTOP LAYOUT (Large Left Visual Panel + Right Form) */}
        <div className="w-full grid grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* LEFT PANEL: Provided Speak Velvet Mobile Illustration (Exact & Uncropped) */}
          <div className="lg:col-span-6 xl:col-span-7 flex items-center justify-center">
            <div className="w-full max-w-md xl:max-w-lg rounded-3xl bg-gradient-to-b from-[#E0F2FE] via-[#BAE6FD] to-[#E0F2FE] p-2.5 sm:p-3 border border-[#BFDBFE] shadow-[0_12px_40px_rgba(37,99,235,0.12)] relative overflow-hidden flex items-center justify-center">
              <img
                src={SPEAK_VELVET_ASSETS.login.heroPortrait.src}
                alt={SPEAK_VELVET_ASSETS.login.heroPortrait.alt}
                className="w-full h-auto max-h-[82vh] object-contain rounded-2xl shadow-md transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* RIGHT PANEL: Clean Rounded Login Card with Glossy Translucent Glass Material */}
          <div className="lg:col-span-6 xl:col-span-5 w-full max-w-md mx-auto">
            <div className="relative rounded-3xl p-6 sm:p-8 space-y-6 bg-white/85 backdrop-blur-2xl backdrop-saturate-150 border-t border-t-white/95 border-x border-x-white/60 border-b border-b-white/40 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.14),0_8px_20px_-6px_rgba(37,99,235,0.06),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_0_20px_rgba(255,255,255,0.25)] overflow-hidden">
              
              {/* Gentle white glossy highlight along the upper edge */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none rounded-t-3xl" />
              
              {/* Card Header: Welcome Back! 👋 */}
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F172A] tracking-tight">
                    {t.welcomeTitle}
                  </h1>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#ECFDF5]/90 text-[#059669] border border-[#A7F3D0] backdrop-blur-xs">
                    {t.sessionBadge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  {t.subInstruction}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                
                {/* Student ID Field */}
                <div>
                  <VelvetInput
                    id="desktop-student-id-field"
                    label={t.studentIdLabel}
                    placeholder={t.studentIdPlaceholder}
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    leftIcon={<User className="w-4 h-4 text-[#64748B]" />}
                    inputSize="md"
                    autoComplete="username"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <VelvetPasswordInput
                    id="desktop-student-password-field"
                    label={t.passwordLabel}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    inputSize="md"
                    autoComplete="current-password"
                  />
                </div>

                {/* Error Feedback */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs font-medium text-[#E11D48] flex items-center gap-2 animate-fade-in">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success Feedback */}
                {loginFeedback && (
                  <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs font-semibold text-[#059669] flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>{loginFeedback}</span>
                  </div>
                )}

                {/* Primary Action Button: Login */}
                <div className="pt-2">
                  <VelvetButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    rightIcon={!isLoading ? <ArrowRight className="w-4 h-4" /> : null}
                    className="shadow-[0_4px_16px_rgba(37,99,235,0.35)]"
                  >
                    {isLoading ? t.loggingIn : t.loginBtn}
                  </VelvetButton>
                </div>

                {/* Demo Quick-Fill Pill for Ease of Evaluation */}
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <button
                    type="button"
                    onClick={handleDemoFill}
                    className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Use Demo Account (VS2026-001)</span>
                  </button>

                  {onOpenOnboarding && (
                    <button
                      type="button"
                      onClick={onOpenOnboarding}
                      className="font-bold text-[#059669] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[#10B981]" />
                      <span>New Student Setup</span>
                    </button>
                  )}
                </div>
              </form>

              {/* “Only for Vivekanandha School Students” & Teacher Support Link */}
              <div className="pt-5 border-t border-[#F1F5F9] flex flex-col items-center text-center space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#475569]">
                  <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>{t.trustMessage}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{t.helpLink}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* ======================================================== */}
      {/* 3. MOBILE FULL-SCREEN 9:16 VIEWPORT (< lg)               */}
      {/* ======================================================== */}
      <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden lg:hidden flex flex-col items-center select-none z-20">
        
        {/* Full-Screen Speak Velvet 9:16 School Artwork Background Layer */}
        <img
          src={SPEAK_VELVET_ASSETS.login.heroPortrait.src || '/image.png'}
          alt="Speak Velvet - Your Speaking Companion by Vivekanandha School"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Discreet Language Switcher (Top Right Corner) */}
        <div className="absolute top-3.5 right-3.5 z-30">
          <VelvetLanguageSwitcher
            value={languageMode}
            onChange={setLanguageMode}
            size="sm"
          />
        </div>

        {/* Floating Compact Glass Login Card in Lower-Middle Area (Revealing Speak Velvet title and artwork above) */}
        <div className="w-full h-full flex flex-col items-center justify-start pt-[calc(22vh+90px)] sm:pt-[calc(24vh+90px)] pb-4 px-4 pointer-events-none z-20">
          <div className="pointer-events-auto w-full max-w-[344px] sm:max-w-[360px] rounded-[24px] sm:rounded-[26px] p-4 sm:p-4.5 space-y-2 bg-[rgba(255,255,255,0.78)] backdrop-blur-[20px] border border-white/75 shadow-[0_16px_40px_rgba(15,23,42,0.12),inset_0_1.5px_1px_rgba(255,255,255,0.95),inset_0_0_20px_rgba(255,255,255,0.25)] relative overflow-hidden transition-all">
            
            {/* Gentle white glossy highlight along the upper edge */}
            <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[24px] sm:rounded-t-[26px]" />

            {/* Card Header: Welcome Back! 👋 + Class 6-10 badge */}
            <div className="relative z-10 space-y-0.5">
              <div className="flex items-center justify-between">
                <h1 className="font-display font-extrabold text-[19px] sm:text-[20px] text-[#0F172A] tracking-tight">
                  {t.welcomeTitle}
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                  Class 6–10
                </span>
              </div>
              <p className="text-[10.5px] text-[#64748B] leading-tight">
                {t.subInstruction}
              </p>
            </div>

            {/* Login Form: Compact ~40px inputs and button */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-2">
              
              {/* School ID Field */}
              <div className="h-10 rounded-xl sm:rounded-2xl bg-white/85 border border-[#BFDBFE]/80 px-3 flex items-center gap-2 shadow-2xs focus-within:ring-2 focus-within:ring-[#2563EB]/40 focus-within:bg-white focus-within:border-[#2563EB] transition-all">
                <User className="w-4 h-4 text-[#64748B] shrink-0" />
                <input
                  type="text"
                  id="mobile-student-id-field"
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={t.studentIdPlaceholder}
                  className="w-full bg-transparent text-xs font-semibold text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                  autoComplete="username"
                />
              </div>

              {/* Password Field */}
              <div className="h-10 rounded-xl sm:rounded-2xl bg-white/85 border border-[#BFDBFE]/80 px-3 flex items-center gap-2 shadow-2xs focus-within:ring-2 focus-within:ring-[#2563EB]/40 focus-within:bg-white focus-within:border-[#2563EB] transition-all">
                <Lock className="w-4 h-4 text-[#64748B] shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="mobile-student-password-field"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="••••••••••"
                  className="w-full bg-transparent text-xs font-semibold text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#94A3B8] hover:text-[#475569] cursor-pointer p-0.5 shrink-0"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-2 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-[11px] font-medium text-[#E11D48] flex items-center gap-1.5 animate-fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Feedback */}
              {loginFeedback && (
                <div className="p-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] font-semibold text-[#059669] flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  <span>{loginFeedback}</span>
                </div>
              )}

              {/* Primary Action Button: Login */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_6px_18px_rgba(37,99,235,0.40)] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t.loggingIn}</span>
                  </span>
                ) : (
                  <>
                    <span>{t.loginBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Fill Options */}
              <div className="pt-0.5 flex items-center justify-between text-[10.5px]">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="font-bold text-[#2563EB] hover:underline cursor-pointer"
                >
                  Demo (VS2026-001)
                </button>

                {onOpenOnboarding && (
                  <button
                    type="button"
                    onClick={onOpenOnboarding}
                    className="font-bold text-[#059669] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-[#10B981]" />
                    <span>New Student Setup</span>
                  </button>
                )}
              </div>
            </form>

            {/* “Only for Vivekanandha School Students” & Teacher Help */}
            <div className="pt-1.5 border-t border-[#F1F5F9]/80 flex flex-col items-center text-center space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] font-semibold text-[#475569]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span>{t.trustMessage}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-[10px] font-semibold text-[#2563EB] hover:underline transition-colors flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>{t.helpLink}</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 4. CLEAN INSTITUTIONAL FOOTER (DESKTOP ONLY)             */}
      {/* ======================================================== */}
      <footer className="hidden lg:flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 items-center justify-between gap-2.5 text-xs text-[#64748B] z-10 border-t border-[#E2E8F0]/70">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0F172A]">Speak Velvet</span>
          <span>·</span>
          <span>Vivekanandha School</span>
          <span>·</span>
          <span>Private Spoken-English Companion</span>
        </div>

        <p className="text-[11px] text-[#94A3B8]">
          Only for Vivekanandha School Students · Protected by Classroom Privacy Shield
        </p>
      </footer>

      {/* ======================================================== */}
      {/* 4. TEACHER SUPPORT / HELP MODAL DIALOG                   */}
      {/* ======================================================== */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F172A]">
                    Student Login Support
                  </h3>
                  <p className="text-xs text-[#64748B]">Vivekanandha School Helpdesk</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="w-8 h-8 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Help Information Details */}
            <div className="space-y-4 text-xs text-[#334155]">
              <div className="p-4 rounded-2xl bg-[#F8FAFD] border border-[#E2E8F0] space-y-2">
                <span className="font-bold text-sm text-[#0F172A] block">
                  Forgot your Student ID or Password?
                </span>
                <p className="leading-relaxed text-[#475569]">
                  Your Student ID format is usually <strong>VS2026-XXX</strong> (located on your school ID card or spoken English workbook).
                </p>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-xs text-[#64748B] uppercase tracking-wider block">
                  Classroom Contacts
                </span>
                
                <div className="p-3.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#0F172A] block">Mrs. Radhika</span>
                    <span className="text-[11px] text-[#64748B]">Class 8A English Teacher</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB]">
                    Room 204
                  </span>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm text-[#0F172A] block">School Digital Lab Desk</span>
                    <span className="text-[11px] text-[#64748B]">Mon – Fri: 8:30 AM – 4:00 PM</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669]">
                    Lab Block B
                  </span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <VelvetButton
              variant="outline"
              size="md"
              fullWidth
              onClick={() => setShowHelpModal(false)}
            >
              Back to Login
            </VelvetButton>
          </div>
        </div>
      )}

    </div>
  );
};
