import React, { useState } from 'react';
import CampusLogo from './CampusLogo';
import { User, Shield, KeyRound, AlertCircle, Sparkles, Check } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (role: 'student' | 'faculty' | 'admin', email: string) => void;
  onNavigate: (view: string) => void;
}

export default function LoginView({ onLoginSuccess, onNavigate }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [email, setEmail] = useState('johnlawrencemartinez05@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // The custom background image path
  const backgroundImage = '/src/assets/images/nursing_student_hero_1780878640103.png';

  const handleRoleQuickSelect = (role: 'student' | 'faculty' | 'admin') => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('johnlawrencemartinez05@gmail.com');
    } else if (role === 'faculty') {
      setEmail('clara.samson@csjr.edu.ph');
    } else {
      setEmail('admin.nursing@csjr.edu.ph');
    }
    setPassword('csjr1956');
    setErrorMsg('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please specify a secure academic email.');
      return;
    }
    setErrorMsg('');
    onLoginSuccess(selectedRole, email);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resetEmail) {
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        setShowForgotModal(false);
        setResetEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F9F6] text-slate-800 selection:bg-emerald-200">
      
      {/* TOP NAVIGATION BAR FOR LOGIN VIEW */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 md:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="p-1 bg-white rounded-xl shadow-xs border border-emerald-100 group-hover:rotate-6 transition-transform">
              <CampusLogo size="sm" className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm md:text-base font-extrabold tracking-tight text-[#084C35] block uppercase leading-none">
                College of St. John Roxas
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold tracking-wide">
                Nursing Student Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-[#084C35] hover:bg-emerald-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>← Back to Campus Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LOGIN GRID */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Clean Login Card Context */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 md:p-12 relative overflow-hidden bg-white/70 backdrop-blur-md">
        
        {/* Ambient Glowing Orbs Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-emerald-100/35 blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-15%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-100/40 blur-[130px] animate-pulse"></div>
        </div>

        <div className="w-full max-w-md space-y-8 relative z-10">
          
          {/* Header branding */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-1.5 bg-white rounded-full border-2 border-dashed border-emerald-600/30 shadow-md">
                <CampusLogo size="md" />
              </div>
            </div>
            <div>
              <h2 className="text-[#084C35] font-black text-2xl md:text-3xl tracking-tight uppercase leading-none mt-2">
                CSJR-NSMS
              </h2>
              <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mt-1.5 block">
                College of St. John Roxas
              </span>
              <p className="text-xs text-slate-400 mt-2 font-medium italic">
                "Empowering Future Healthcare Professionals Through Technology"
              </p>
            </div>
          </div>

          {/* Quick-Select Role Switcher (Advanced Role-Based Access Support) */}
          <div className="bg-slate-50 p-1 rounded-2xl border border-slate-100 flex gap-1">
            {(['student', 'faculty', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleQuickSelect(r)}
                type="button"
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  selectedRole === r
                    ? 'bg-[#084C35] text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {r === 'student' ? 'Student Logs' : r === 'faculty' ? 'Faculty Portal' : 'Administrator'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex items-start gap-2 text-rose-700 text-xs text-left animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-600 block">
                {selectedRole === 'student' ? 'Student Academic Email' : 'Professional Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@csjr.edu.ph"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/20 focus:border-[#084C35] text-sm text-slate-800 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-600">Security Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-semibold text-[#0E7A57] hover:text-emerald-500 transition-colors cursor-pointer"
                >
                  Forgot Key?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Academic PIN"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/20 focus:border-[#084C35] text-sm text-slate-800 transition-all"
                />
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center justify-between text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                Remember my session
              </label>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600">
                <Shield className="w-3 h-3 text-emerald-500 animate-pulse" /> Secure SSL (256-Bit)
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-[#084C35] to-[#0E7A57] hover:brightness-105 active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-emerald-700/20 transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
              Sign In as {selectedRole.toUpperCase()}
            </button>
          </form>

          {/* Quick-Access Note for Assessment */}
          <div className="pt-6 border-t border-slate-100 text-center space-y-3">
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
              Simulation Session: Clicking the dynamic login options pre-populates instant local credentials automatically.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="text-[#0E7A57] hover:underline hover:text-[#084C35] font-black text-xs block mx-auto cursor-pointer uppercase tracking-wider"
            >
              Return to Public Homepage
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Beautiful Full-Size Nursing Student Background with gradient overlay */}
      <div className="hidden lg:block lg:col-span-7 relative overflow-hidden bg-slate-900 border-l border-emerald-100/20">
        <img
          src={backgroundImage}
          alt="CSJR Campus Life"
          className="w-full h-full object-cover object-top filter brightness-[0.75]"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Dark Emerald Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#031D14]/95 via-[#084C35]/75 to-transparent"></div>
        
        {/* Overlaid Academic Motto Overlay */}
        <div className="absolute bottom-16 left-16 right-16 text-left space-y-4 text-white">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            CSJR Academic Portal
          </div>
          <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Nurturing and Elevating <br />
            Our Global Healers
          </h3>
          <p className="text-slate-200 text-sm font-light max-w-lg leading-relaxed">
            Integrating robust clinical schedules, direct ward duty registers, electronic signature uploads, and ISO certified clinical indices in a single, high-fidelity platform.
          </p>
        </div>
      </div>

      </div>

      {/* Forgot Password Simulation Dialog */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-[#031D14]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative border border-emerald-150">
            <h3 className="font-bold text-lg text-slate-900">Academic PIN Recovery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter your CSJR institutional email. If our database matches your record, we will dispatch a passcode recovery token.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="registered-user@csjr.edu.ph"
                className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#084C35]"
              />

              {resetSuccess && (
                <div className="text-xs p-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1.5 font-medium animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Passcode token dispatched successfully to inbox!
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#084C35] rounded-lg hover:bg-[#0E7A57] cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
