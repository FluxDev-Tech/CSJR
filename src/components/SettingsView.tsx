import React, { useState } from 'react';
import { Settings, Moon, Sun, Bell, Shield, KeyRound, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigateTab: (tab: string) => void;
}

export default function SettingsView({ isDarkMode, onToggleDarkMode, onNavigateTab }: SettingsViewProps) {
  // Notification States
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [rotationAlerts, setRotationAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  
  // Change password states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secSuccess, setSecSuccess] = useState('');
  const [secError, setSecError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      setSecError('Please fill in all security input fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecError('New password check values must match.');
      return;
    }
    if (newPassword.length < 6) {
      setSecError('Security passphrases must contain at least 6 characters.');
      return;
    }
    
    setSecError('');
    setSecSuccess('Your academic security credentials have been updated successfully.');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setSecSuccess('');
    }, 4000);
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Top Grid settings subdivisions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INTERACTIVE CONTROLS TABS (Left Col) */}
        <div className="lg:col-span-5 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="w-5 h-5 text-[#0E7A57]" /> Account preferences
            </h3>
            <p className="text-xs text-slate-400 mt-1">Configure layout look-ups and active updates</p>
          </div>

          {/* Theme selection card */}
          <div className="space-y-3">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Visual Interface Theme</span>
            
            <div className="bg-[#F4F9F6]/60 border p-4 rounded-xl flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Simulate Dark Layout mode</span>
                <span className="text-[11px] text-slate-450 block mt-0.5">Toggle eye-care medical dark visual templates</span>
              </div>

              <button
                type="button"
                onClick={onToggleDarkMode}
                className={`
                  p-2.5 rounded-xl border transition-all cursor-pointer shadow-sm active:scale-95
                  ${isDarkMode 
                    ? 'bg-zinc-900 border-zinc-850 text-[#10B981]' 
                    : 'bg-white border-emerald-100 text-amber-500 hover:bg-slate-50'
                  }
                `}
                title="Toggle Dashboard Theme"
              >
                {isDarkMode ? <Moon className="w-5 h-5 animate-pulse" /> : <Sun className="w-5 h-5 animate-spin-slow" />}
              </button>
            </div>
          </div>

          {/* Alert check channels */}
          <div className="space-y-4 pt-2">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Notification Subscriptions</span>
            
            <div className="space-y-3.5 text-left">
              {/* Channel 1 */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="rounded text-[#084C35] focus:ring-[#084C35] accent-emerald-605 h-4 w-4 mt-0.5"
                />
                <div className="text-xs leading-snug">
                  <span className="font-bold text-slate-700 block">Semestral Registrar Emails</span>
                  <p className="text-[11px] text-slate-450 mt-0.5 font-light">Dispatches PDF grade indices as soon as they are stamped.</p>
                </div>
              </label>

              {/* Channel 2 */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rotationAlerts}
                  onChange={(e) => setRotationAlerts(e.target.checked)}
                  className="rounded text-[#084C35] focus:ring-[#084C35] accent-emerald-605 h-4 w-4 mt-0.5"
                />
                <div className="text-xs leading-snug">
                  <span className="font-bold text-slate-700 block">Clinical Hospital Rotations Alerts</span>
                  <p className="text-[11px] text-slate-450 mt-0.5 font-light">Get SMS pings for unexpected shift reallocations.</p>
                </div>
              </label>

              {/* Channel 3 */}
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={examReminders}
                  onChange={(e) => setExamReminders(e.target.checked)}
                  className="rounded text-[#084C35] focus:ring-[#084C35] accent-emerald-605 h-4 w-4 mt-0.5"
                />
                <div className="text-xs leading-snug">
                  <span className="font-bold text-slate-700 block">Critical Exam Reminders</span>
                  <p className="text-[11px] text-slate-450 mt-0.5 font-light">Dispatches warnings 48 hours prior to sim practical exams.</p>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* SECURITY CHANGE PASSWORDS (Right Col) */}
        <div className="lg:col-span-7 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <SecurityIcon className="w-5 h-5 text-emerald-500 animate-pulse" /> Security Access Controls
            </h3>
            <p className="text-xs text-slate-400 mt-1">Update your portal passcodes and student PINs</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            
            {secError && (
              <div className="text-xs p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{secError}</span>
              </div>
            )}

            {secSuccess && (
              <div className="text-xs p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 flex items-center gap-2 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{secSuccess}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Existing Gateway Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-450">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Insert entry passcode"
                  className="w-full text-xs font-medium pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/15 focus:border-[#084C35]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">New Master Passcode</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full text-xs font-medium p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/15 focus:border-[#084C35]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Confirm Passcode Match</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new master passcode"
                  className="w-full text-xs font-medium p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/15 focus:border-[#084C35]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#084C35] hover:bg-[#0E7A57] text-white text-xs font-extrabold transition-all cursor-pointer uppercase shadow text-center"
            >
              Simulate Password Reset
            </button>
          </form>

          {/* Account information details block */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold font-mono">
            <span>REGISTERED DEVICE: WEB PORTAL CLIENT</span>
            <span>ENCRYPTED IN TRANSIT: SHA-256</span>
          </div>

        </div>

      </div>

    </div>
  );
}

// Inline custom icon wrapper to avoid bundling conflicts
function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
    </svg>
  );
}
