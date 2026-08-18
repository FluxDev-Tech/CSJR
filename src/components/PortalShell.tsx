import React, { useState, useEffect, useRef } from 'react';
import CampusLogo from './CampusLogo';
import { 
  LayoutDashboard, User, BookOpen, Calendar, Activity, 
  Award, Clock, Megaphone, FileText, Settings, LogOut, 
  Menu, X, Bell, QrCode, ClipboardList, Home, ShieldCheck, 
  Search, ChevronRight, ChevronDown, CheckCheck, Sparkles, 
  Command, PanelLeftClose, PanelLeftOpen, Compass, ExternalLink,
  GraduationCap, Building2, CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, SystemNotification } from '../types';

interface PortalShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  profile: UserProfile;
  notifications: SystemNotification[];
  onMarkNotificationAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
}

export default function PortalShell({
  children,
  activeTab,
  onTabChange,
  onLogout,
  profile,
  notifications,
  onMarkNotificationAsRead,
  onClearAllNotifications
}: PortalShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowQRModal, setIsShowQRModal] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [notificationFilter, setNotificationFilter] = useState<'all' | 'unread'>('all');

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Live clock synchronization
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for quick command search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsNotificationOpen(false);
        setIsProfileMenuOpen(false);
        setIsShowQRModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Categorized Menu Items
  const menuGroups = [
    {
      group: 'Core Academics',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null, desc: 'Overview & metrics' },
        { id: 'profile', label: 'Student Profile', icon: User, badge: 'Verified', desc: 'Personal & academic record' },
        { id: 'subjects', label: 'Subjects Database', icon: BookOpen, badge: '8 Enrolled', desc: 'Curriculum & units' },
        { id: 'schedule', label: 'Class Schedules', icon: Calendar, badge: null, desc: 'Weekly lectures & labs' },
        { id: 'grades', label: 'Academic Grades', icon: Award, badge: 'GWA 1.48', desc: 'Semestral ratings & GPA' },
      ]
    },
    {
      group: 'Clinical Rotations',
      items: [
        { id: 'clinical-duty', label: 'Clinical Duty Logs', icon: Activity, badge: '102h Done', desc: 'Hospital duty hours & cases' },
        { id: 'attendance', label: 'Attendance Reports', icon: Clock, badge: '94%', desc: 'Duty check-ins & RFID logs' },
      ]
    },
    {
      group: 'Campus & Clearances',
      items: [
        { id: 'announcements', label: 'Bulletins & Notices', icon: Megaphone, badge: 'New', desc: 'Department news & alerts' },
        { id: 'documents', label: 'Documents & Uplinks', icon: FileText, badge: null, desc: 'Clinical forms & clearances' },
        { id: 'settings', label: 'Portal Settings', icon: Settings, badge: null, desc: 'Preferences & security' },
      ]
    }
  ];

  const allMenuItems = menuGroups.flatMap(g => g.items);

  // Bottom Navigation Items for quick mobile thumb reach
  const bottomNavItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'clinical-duty', label: 'Clinical', icon: Activity },
    { id: 'grades', label: 'Grades', icon: Award },
    { id: 'more', label: 'Menu', icon: Menu, isDrawerTrigger: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notificationFilter === 'unread' 
    ? notifications.filter(n => !n.read) 
    : notifications;

  // Search filter results
  const searchResults = allMenuItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeItemObj = allMenuItems.find(i => i.id === activeTab) || allMenuItems[0];

  return (
    <div className="min-h-screen bg-[#F4F9F6] flex text-slate-800 font-sans select-none relative overflow-x-hidden md:flex-row flex-col">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP MOBILE HEADER BAR (Sticky, sleek, rich with quick tools) */}
      {/* ------------------------------------------------------------- */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#084C35] text-white sticky top-0 z-30 shadow-md border-b border-emerald-850">
        <div className="flex items-center gap-2.5">
          <div className="p-0.5 bg-white rounded-lg shadow-xs">
            <CampusLogo size="sm" className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-xs tracking-wider uppercase text-white leading-tight flex items-center gap-1.5">
              CSJR-NSMS
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-700/60 text-emerald-200 border border-emerald-600/40">
                BSN-3
              </span>
            </h1>
            <span className="text-[9px] text-emerald-300 font-semibold tracking-wide block">
              College of Nursing
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          {/* Quick Search Button */}
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-200 active:scale-95 transition-all"
            aria-label="Open search palette"
            title="Search portal (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Quick QR Trigger */}
          <button 
            onClick={() => setIsShowQRModal(true)} 
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-200 active:scale-95 transition-all"
            aria-label="Student QR ID Badge"
            title="Scan QR Student Badge"
          >
            <QrCode className="w-4 h-4" />
          </button>
          
          {/* Notifications Trigger */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)} 
              className="p-2 rounded-lg hover:bg-white/10 text-white relative active:scale-95 transition-all"
              aria-label="System notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#084C35] animate-pulse"></span>
              )}
            </button>

            {/* Mobile Notification Popover */}
            <AnimatePresence>
              {isNotificationOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="md:hidden fixed inset-x-3 top-14 bg-white border border-emerald-100 rounded-2xl shadow-2xl z-50 p-4 space-y-3 max-h-[80vh] overflow-hidden flex flex-col text-slate-800"
                >
                  <div className="flex items-center justify-between border-b pb-2.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-xs text-[#084C35] uppercase tracking-wider">
                        System Alerts
                      </h4>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold font-mono">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={onClearAllNotifications}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setIsNotificationOpen(false)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
                        aria-label="Close alerts"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs (All / Unread) */}
                  <div className="flex gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-100 shrink-0">
                    <button
                      onClick={() => setNotificationFilter('all')}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${
                        notificationFilter === 'all' 
                          ? 'bg-white text-[#084C35] shadow-2xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      All ({notifications.length})
                    </button>
                    <button
                      onClick={() => setNotificationFilter('unread')}
                      className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${
                        notificationFilter === 'unread' 
                          ? 'bg-white text-[#084C35] shadow-2xs' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Unread ({unreadCount})
                    </button>
                  </div>
                  
                  <div className="overflow-y-auto space-y-2 pr-0.5 flex-1 max-h-72">
                    {filteredNotifications.length === 0 ? (
                      <div className="text-center py-6 space-y-1">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto opacity-70" />
                        <p className="text-xs font-semibold text-slate-600">All caught up!</p>
                        <p className="text-[10px] text-slate-400">No active unacknowledged notifications.</p>
                      </div>
                    ) : (
                      filteredNotifications.map(not => (
                        <div 
                          key={not.id} 
                          onClick={() => onMarkNotificationAsRead(not.id)}
                          className={`
                            p-3 rounded-xl border text-left text-xs transition-all cursor-pointer relative group
                            ${not.read 
                              ? 'bg-slate-50/70 border-slate-100 opacity-70 hover:opacity-100' 
                              : 'bg-emerald-50/60 border-emerald-100 hover:bg-emerald-100/50 shadow-2xs'
                            }
                          `}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex items-center gap-1.5">
                              {not.type === 'success' ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              ) : not.type === 'warning' ? (
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                              ) : (
                                <Info className="w-3.5 h-3.5 text-[#0E7A57] shrink-0" />
                              )}
                              <span className="font-bold text-slate-800 text-[11px]">{not.title}</span>
                            </div>
                            <span className="text-[9px] font-mono text-slate-400 shrink-0">{not.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">{not.message}</p>
                          {!not.read && (
                            <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#0E7A57] font-bold">
                              <span>● Unread Alert</span>
                              <span className="underline text-emerald-700">Mark read</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Drawer Menu toggle with explicit "See Menu" and "Close (X)" button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ml-1 cursor-pointer ${
              isSidebarOpen 
                ? 'bg-rose-500 hover:bg-rose-600 text-white ring-2 ring-white/40' 
                : 'bg-emerald-700/90 hover:bg-emerald-600 text-white border border-emerald-500/40'
            }`}
            aria-label={isSidebarOpen ? "Close navigation menu" : "See navigation menu"}
            title={isSidebarOpen ? "Close navigation drawer" : "See full navigation menu"}
          >
            {isSidebarOpen ? (
              <>
                <X className="w-4 h-4 text-white shrink-0" />
                <span>Close (X)</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4 text-white shrink-0" />
                <span>See Menu</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. DESKTOP SIDEBAR NAVIGATION (Collapsible, Structured, High Craft) */}
      {/* ------------------------------------------------------------- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-[#031D14] text-slate-300 border-r border-[#06241a] flex flex-col justify-between transform transition-all duration-300 ease-in-out
        md:translate-x-0 md:sticky md:h-screen md:top-0
        ${isSidebarCollapsed ? 'md:w-20' : 'md:w-72'}
        ${isSidebarOpen ? 'w-80 translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Branding Panel */}
        <div className="p-4 md:p-5 border-b border-emerald-950/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-1 bg-white hover:rotate-3 transition-transform rounded-xl shrink-0 shadow-md">
              <CampusLogo size="sm" className="w-7 h-7" />
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0 animate-fadeIn">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-extrabold text-sm tracking-wider text-[#10B981] leading-none uppercase truncate">CSJR-NSMS</h2>
                  <span className="text-[9px] bg-emerald-900/60 text-emerald-300 px-1 py-0.5 rounded font-mono font-bold">PRO</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase mt-1 truncate">St. John Roxas Nursing</p>
              </div>
            )}
          </div>

          {/* Desktop Sidebar Collapse Toggle */}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950/60 transition-colors"
            title={isSidebarCollapsed ? "See full menu" : "Collapse menu"}
            aria-label="Toggle sidebar collapse"
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4 text-emerald-400" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Mobile close sidebar trigger with explicit "Close (X)" button */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-800/40 text-xs font-bold transition-colors cursor-pointer shadow-xs"
            aria-label="Close navigation sidebar"
          >
            <X className="w-4 h-4 text-rose-300" />
            <span>Close (X)</span>
          </button>
        </div>

        {/* User Card info summary */}
        {!isSidebarCollapsed ? (
          <div className="p-3.5 mx-3.5 my-3 bg-gradient-to-r from-emerald-950/60 to-slate-900/50 rounded-2xl border border-emerald-900/40 flex items-center gap-3 shadow-inner">
            <div className="relative shrink-0">
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-10 h-10 rounded-full object-cover border-2 border-[#10B981] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#031D14]"></span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-white truncate leading-tight">{profile.name}</h4>
              <span className="text-[10px] text-[#10B981] font-mono tracking-wider block uppercase mt-0.5 truncate">{profile.studentId}</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded font-medium border border-emerald-500/30">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" /> Junior Intern
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-3 flex justify-center border-b border-emerald-950/60">
            <div className="relative group cursor-pointer" onClick={() => onTabChange('profile')}>
              <img 
                src={profile.avatar} 
                alt={profile.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#10B981]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#031D14]"></span>
            </div>
          </div>
        )}

        {/* Quick Search Trigger within Sidebar */}
        {!isSidebarCollapsed && (
          <div className="px-3.5 mb-2">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-900/40 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all group"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Quick Search...</span>
              </div>
              <kbd className="text-[10px] font-mono font-bold bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800/40">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Main Navigation Links by Category Group */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-4 scrollbar-thin scrollbar-thumb-emerald-950">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isSidebarCollapsed ? (
                <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-500/70 font-mono">
                  {group.group}
                </div>
              ) : (
                <div className="h-px bg-emerald-950/80 my-2 mx-2"></div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsSidebarOpen(false);
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={`
                      w-full flex items-center justify-between rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer group relative
                      ${isSidebarCollapsed ? 'p-2.5 justify-center' : 'px-3.5 py-2.5'}
                      ${isActive 
                        ? 'bg-gradient-to-r from-emerald-600 to-[#0E7A57] text-white shadow-md shadow-emerald-950/50' 
                        : 'text-slate-400 hover:bg-emerald-950/40 hover:text-slate-100'
                      }
                    `}
                  >
                    <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 min-w-0'}`}>
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-200' : 'text-emerald-500/80'}`} />
                      {!isSidebarCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>

                    {!isSidebarCollapsed && item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                      }`}>
                        {item.badge}
                      </span>
                    )}

                    {/* Active Left Indicator Bar */}
                    {isActive && (
                      <span className="absolute left-0 inset-y-1.5 w-1 bg-emerald-300 rounded-r"></span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Dedicated Mobile "Close Navigation (X)" button at bottom of navigation links */}
          <div className="md:hidden pt-3 pb-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/90 hover:bg-rose-950/90 text-slate-300 hover:text-rose-200 border border-emerald-900/60 hover:border-rose-800/50 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-98"
            >
              <X className="w-4 h-4 text-rose-400" />
              <span>Close Navigation (X)</span>
            </button>
          </div>
        </nav>

        {/* Public view / Log Out bottom block */}
        <div className="p-3 border-t border-emerald-950/80 space-y-2">
          {!isSidebarCollapsed ? (
            <>
              {/* Return Homepage button */}
              <button
                onClick={() => onTabChange('home')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-900/40 hover:bg-emerald-950/60 transition-colors uppercase cursor-pointer border border-emerald-950/60"
              >
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Website</span>
              </button>

              {/* Secure sign out */}
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-rose-200 bg-rose-950/30 hover:bg-rose-900/50 transition-colors uppercase border border-rose-900/40 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Secure Sign Out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center">
              <button
                onClick={() => onTabChange('home')}
                title="Public Website"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-emerald-950/60 transition-colors"
              >
                <Home className="w-4 h-4 text-emerald-400" />
              </button>
              <button
                onClick={onLogout}
                title="Secure Sign Out"
                className="p-2 rounded-xl text-rose-400 hover:bg-rose-950/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 3. MAIN CONTENT WRAPPER WITH MODERN TOPBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto w-full pb-20 md:pb-8">
        
        {/* DESKTOP TOP NAVBAR (Frosted Glass with Breadcrumbs, Global Search, Live Duty Clock & Profile Menu) */}
        <header className="hidden md:flex items-center justify-between px-6 lg:px-8 py-3.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 sticky top-0 z-30 shadow-xs transition-colors">
          
          {/* Breadcrumb & Sector indicator & Responsive See Menu / Collapse Toggle */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Quick Desktop "See Menu" / "Collapse" Toggle Button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                isSidebarCollapsed 
                  ? 'bg-emerald-50 hover:bg-emerald-100 text-[#084C35] border-emerald-200 shadow-2xs' 
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title={isSidebarCollapsed ? "See full navigation menu" : "Collapse navigation menu"}
            >
              {isSidebarCollapsed ? (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>See Menu</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="w-4 h-4 text-slate-500 shrink-0" />
                  <span className="hidden xl:inline">Collapse</span>
                </>
              )}
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <span className="hover:text-emerald-700 cursor-pointer" onClick={() => onTabChange('dashboard')}>Portal</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-600 font-semibold">{activeItemObj.label}</span>
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  2nd Sem • AY 2025-2026
                </span>
              </div>
              <h2 className="text-base lg:text-lg font-black text-[#084C35] capitalize tracking-tight mt-0.5 truncate">
                {activeItemObj.label}
              </h2>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3.5">
            
            {/* Global Search Bar trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="hidden lg:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 text-xs font-medium transition-all shadow-2xs group min-w-[200px] justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 transition-colors" />
                <span>Search sections & logs...</span>
              </div>
              <kbd className="text-[10px] font-mono font-bold bg-white text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Live Duty Clock Display */}
            <div className="hidden xl:flex items-center gap-2 bg-[#F4F9F6] border border-emerald-100 px-3.5 py-2 rounded-xl text-xs font-bold text-[#084C35] shadow-2xs font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{timeStr || '12:00:00 PM'}</span>
            </div>

            {/* Smart Digital QR ID Badge Trigger */}
            <button
              onClick={() => setIsShowQRModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0E7A57] border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="View student verified QR badge"
            >
              <QrCode className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Student ID Badge</span>
            </button>

            {/* Notifications Alert Center Toggle */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={`p-2.5 rounded-xl border relative transition-all cursor-pointer ${
                  isNotificationOpen 
                    ? 'bg-emerald-50 border-emerald-200 text-[#084C35]' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-84 bg-white border border-emerald-100 rounded-2xl shadow-xl z-50 p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b pb-2.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-xs text-[#084C35] uppercase tracking-wider">
                          System Alerts
                        </h4>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold font-mono">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={onClearAllNotifications}
                          className="text-[10px] font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>

                    {/* Filter Tabs (All / Unread) */}
                    <div className="flex gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-100">
                      <button
                        onClick={() => setNotificationFilter('all')}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${
                          notificationFilter === 'all' 
                            ? 'bg-white text-[#084C35] shadow-2xs' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        All ({notifications.length})
                      </button>
                      <button
                        onClick={() => setNotificationFilter('unread')}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${
                          notificationFilter === 'unread' 
                            ? 'bg-white text-[#084C35] shadow-2xs' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Unread ({unreadCount})
                      </button>
                    </div>
                    
                    <div className="max-h-68 overflow-y-auto space-y-2 pr-0.5">
                      {filteredNotifications.length === 0 ? (
                        <div className="text-center py-6 space-y-1">
                          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto opacity-70" />
                          <p className="text-xs font-semibold text-slate-600">All caught up!</p>
                          <p className="text-[10px] text-slate-400">No active unacknowledged notifications.</p>
                        </div>
                      ) : (
                        filteredNotifications.map(not => (
                          <div 
                            key={not.id} 
                            onClick={() => onMarkNotificationAsRead(not.id)}
                            className={`
                              p-3 rounded-xl border text-left text-xs transition-all cursor-pointer relative group
                              ${not.read 
                                ? 'bg-slate-50/70 border-slate-100 opacity-70 hover:opacity-100' 
                                : 'bg-emerald-50/60 border-emerald-100 hover:bg-emerald-100/50 shadow-2xs'
                              }
                            `}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex items-center gap-1.5">
                                {not.type === 'success' ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                ) : not.type === 'warning' ? (
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                ) : (
                                  <Info className="w-3.5 h-3.5 text-[#0E7A57] shrink-0" />
                                )}
                                <span className="font-bold text-slate-800 text-[11px]">{not.title}</span>
                              </div>
                              <span className="text-[9px] font-mono text-slate-400 shrink-0">{not.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 leading-snug">{not.message}</p>
                            {!not.read && (
                              <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-[#0E7A57] font-bold">
                                <span>● Unread Alert</span>
                                <span className="underline opacity-0 group-hover:opacity-100 transition-opacity">Mark as read</span>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Quick Menu Pill */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer active:scale-98"
                aria-label="User profile dropdown"
              >
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left hidden xl:block min-w-0 pr-1">
                  <span className="text-xs font-bold text-slate-800 block leading-tight truncate max-w-[110px]">{profile.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-emerald-700 font-mono font-semibold block uppercase">BSN-3</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2.5 w-60 bg-white border border-emerald-100 rounded-2xl shadow-xl z-50 p-2 space-y-1 text-left"
                  >
                    <div className="p-3 border-b border-slate-100 bg-slate-50/60 rounded-xl mb-1">
                      <p className="text-xs font-extrabold text-slate-800 leading-tight">{profile.name}</p>
                      <p className="text-[10px] text-emerald-700 font-mono font-bold uppercase mt-0.5">{profile.studentId}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{profile.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onTabChange('profile');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#084C35] transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>View Full Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        onTabChange('settings');
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#084C35] transition-colors cursor-pointer"
                    >
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Portal Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsShowQRModal(true);
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-[#084C35] transition-colors cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Digital ID Badge</span>
                    </button>

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Core Subpage Injector */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-fadeIn max-w-[1700px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. MOBILE BOTTOM NAVIGATION DOCK (Thumb-Friendly, Highly Responsive) */}
      {/* ------------------------------------------------------------- */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-emerald-100 px-3 py-2 shadow-lg flex items-center justify-around">
        {bottomNavItems.map((item) => {
          const isDrawer = item.isDrawerTrigger;
          const Icon = isDrawer ? (isSidebarOpen ? X : Menu) : item.icon;
          const label = isDrawer ? (isSidebarOpen ? 'Close (X)' : 'See Menu') : item.label;
          const isActive = isDrawer ? isSidebarOpen : activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (isDrawer) {
                  setIsSidebarOpen(!isSidebarOpen);
                } else {
                  setIsSidebarOpen(false);
                  onTabChange(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer relative min-h-[44px] min-w-[54px] active:scale-95 ${
                isActive 
                  ? (isDrawer && isSidebarOpen ? 'text-rose-600 font-bold' : 'text-[#084C35] font-bold')
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
              aria-label={label}
            >
              <div className={`p-1 rounded-lg transition-transform ${
                isActive 
                  ? (isDrawer && isSidebarOpen ? 'bg-rose-100 text-rose-600 scale-110' : 'bg-emerald-100 text-[#084C35] scale-110')
                  : ''
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">{label}</span>
              {isActive && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${isDrawer && isSidebarOpen ? 'bg-rose-600' : 'bg-[#084C35]'}`}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. BACKDROP FOR MOBILE DRAWER */}
      {/* ------------------------------------------------------------- */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden animate-fadeIn"
        ></div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 6. COMMAND PALETTE / QUICK GLOBAL SEARCH MODAL (Cmd+K) */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#031D14]/60 backdrop-blur-xs flex items-start justify-center pt-16 md:pt-24 px-4">
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-lg w-full border border-emerald-100 shadow-2xl overflow-hidden text-left"
            >
              {/* Search Header Input */}
              <div className="p-4 border-b border-slate-150 flex items-center gap-3 bg-slate-50/50">
                <Search className="w-5 h-5 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search portal modules, schedules, grades, bulletins..."
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Jump List */}
              <div className="p-3 max-h-80 overflow-y-auto space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block py-1">
                  Portal Navigation
                </span>
                {searchResults.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No matching section found for "{searchQuery}"</p>
                ) : (
                  searchResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onTabChange(item.id);
                          setIsSearchModalOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50 transition-colors text-left group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-100/60 text-[#0E7A57] group-hover:bg-[#084C35] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block group-hover:text-[#084C35]">{item.label}</span>
                            <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Navigate with click or arrow keys</span>
                <span className="flex items-center gap-1"><kbd className="bg-white px-1.5 py-0.5 rounded border">ESC</kbd> to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* 7. ACTIVE STUDENT QR BADGE MODAL */}
      {/* ------------------------------------------------------------- */}
      {isShowQRModal && (
        <div className="fixed inset-0 z-50 bg-[#031D14]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full border border-emerald-100 shadow-2xl overflow-hidden animate-zoomIn relative">
            
            {/* Modal Header banner */}
            <div className="bg-gradient-to-r from-[#084C35] to-[#0E7A57] p-5 text-center text-white relative">
              <button 
                onClick={() => setIsShowQRModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors cursor-pointer"
                aria-label="Close QR modal"
              >
                <X className="w-4 h-4" />
              </button>
              <CampusLogo size="sm" className="mx-auto bg-white rounded-full p-0.5 border border-amber-300 shadow-md" />
              <h3 className="font-bold text-sm tracking-widest uppercase mt-2">Institutional ID Badge</h3>
              <p className="text-[10px] text-emerald-300 tracking-wider">College of St. John Roxas</p>
            </div>

            {/* QR Scanner Display rendering with detailed geometric mock representation */}
            <div className="p-8 text-center space-y-4">
              <div className="inline-block p-4 border border-emerald-100 rounded-2xl bg-emerald-50/20 relative shadow-inner">
                {/* Simulated CSS High-Contrast QR Grid */}
                <div className="w-48 h-48 bg-white border-2 border-slate-900 p-2.5 rounded-xl flex flex-wrap relative">
                  
                  {/* Position detection outer boxes (Traditional QR Corners) */}
                  <div className="absolute top-2 left-2 w-12 h-12 border-4 border-slate-900 bg-white p-1">
                    <div className="w-full h-full bg-slate-900"></div>
                  </div>
                  <div className="absolute top-2 right-2 w-12 h-12 border-4 border-slate-900 bg-white p-1">
                    <div className="w-full h-full bg-slate-900"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 border-4 border-slate-900 bg-white p-1">
                    <div className="w-full h-full bg-slate-900"></div>
                  </div>
                  
                  {/* Small extra anchor */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-[3px] border-slate-900 p-0.5">
                    <div className="w-full h-full bg-slate-900"></div>
                  </div>

                  {/* Pseudo-Random Noise Lines representing real student QR payloads */}
                  <div className="absolute inset-x-8 top-16 bottom-16 border-2 border-dashed border-slate-400 opacity-20"></div>
                  
                  {/* Embedded center logo circle */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white border border-slate-300 shadow flex items-center justify-center p-0.5">
                    <CampusLogo size="sm" className="w-7 h-7" />
                  </div>

                  {/* Generate simple scan dots layout */}
                  <div className="w-full h-full flex flex-col justify-between opacity-85 select-none font-mono text-[9px] text-slate-800 leading-none overflow-hidden pointer-events-none p-1.5 pt-8 pl-16">
                    <div>1010111001</div>
                    <div>0110101100</div>
                    <div>1101010011</div>
                    <div className="truncate">CSJR-{profile.studentId}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-base text-slate-900 uppercase leading-none">{profile.name}</h4>
                <p className="font-mono text-xs text-[#0E7A57] mt-1.5 uppercase font-bold">{profile.studentId}</p>
                <span className="inline-block mt-3 px-3 py-1 bg-emerald-50 text-[#084C35] text-[10px] font-bold rounded-full uppercase border border-emerald-150">
                  Clinical Rotation Badge Verified
                </span>
              </div>
            </div>

            {/* QR Footer detail */}
            <div className="bg-slate-50 py-3.5 px-6 border-t text-center text-[10px] text-slate-400 font-semibold">
              Scan at Hospital Entrance (EHR Tracker) or Library turnstiles.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
