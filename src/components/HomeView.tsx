import React, { useState } from 'react';
import CampusLogo from './CampusLogo';
import { Calendar, Award, ShieldAlert, BookOpen, Users, Milestone, ArrowRight, Menu, X, Phone, Compass, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  isLoggedIn: boolean;
}

export default function HomeView({ onNavigate, isLoggedIn }: HomeViewProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Use the generated image path
  const heroImage = '/src/assets/images/nursing_student_hero_1780878640103.png';

  const stats = [
    { value: '100%', label: 'Nursing Board Pass Rate (2025)' },
    { value: '850+', label: 'Active Clinical Students' },
    { value: '12+', label: 'Partner Tertiary Hospitals' },
    { value: '50 yrs', label: 'Academic Excellence' }
  ];

  const upcomingEvents = [
    {
      date: 'June 10, 2026',
      title: 'Barangay Tanque Medical Mission Outreach',
      desc: 'Free health metrics collection, consultation assistance, and wellness handouts distribution.'
    },
    {
      date: 'June 17, 2026',
      title: 'Summer Pinning and Capping Ceremony',
      desc: 'Annual physical and spiritual dedication rite for clinical class of 2027 in the Gymnasium.'
    },
    {
      date: 'July 02, 2026',
      title: 'NCM 112 Comprehensive Critical Care Simulation Exam',
      desc: 'Multi-station evaluation on pulmonary airway management and triage simulations.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F9F6] text-slate-800 selection:bg-emerald-200">
      {/* ------------------------------------------------------------- */}
      {/* PUBLIC RESPONSIVE NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 px-4 md:px-8 py-3.5 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="p-1 bg-white rounded-xl shadow-xs border border-emerald-100">
              <CampusLogo size="sm" className="w-8 h-8" />
            </div>
            <div>
              <span className="text-sm md:text-base font-extrabold tracking-tight text-[#084C35] block uppercase leading-none">
                College of St. John Roxas
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold tracking-wide flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Nursing Clinical Portals
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#mission-vision" className="hover:text-[#084C35] transition-colors">Mission & Vision</a>
            <a href="#statistics" className="hover:text-[#084C35] transition-colors">Excellence</a>
            <a href="#bulletins" className="hover:text-[#084C35] transition-colors">Bulletins</a>
            <a href="#calendar" className="hover:text-[#084C35] transition-colors">Calendar</a>
          </nav>

          {/* Right Action Tools & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            {/* Direct Login / Dashboard Action */}
            <button
              onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
              className="px-4 md:px-5 py-2.5 rounded-xl bg-[#084C35] hover:bg-[#0E7A57] text-white text-xs md:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>{isLoggedIn ? 'Go to Dashboard' : 'Student Portal Login'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button with clear "See Menu" / "X Close" labeling */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer ${
                mobileMenuOpen 
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 ring-2 ring-rose-300/40' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-[#084C35] border border-emerald-200'
              }`}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "See navigation menu"}
              title={mobileMenuOpen ? "Close navigation" : "See navigation"}
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Close (X)</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-[#084C35] shrink-0" />
                  <span>See Menu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-emerald-100 mt-3 pt-3 space-y-3 text-left"
            >
              {/* Drawer Title & Quick Close button */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Campus Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="#mission-vision"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-[#084C35] text-xs font-bold block border border-emerald-150 transition-colors"
                >
                  Mission & Vision
                </a>
                <a
                  href="#statistics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-[#084C35] text-xs font-bold block border border-emerald-150 transition-colors"
                >
                  Excellence Stats
                </a>
                <a
                  href="#bulletins"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-[#084C35] text-xs font-bold block border border-emerald-150 transition-colors"
                >
                  Notice Board
                </a>
                <a
                  href="#calendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-[#084C35] text-xs font-bold block border border-emerald-150 transition-colors"
                >
                  Academic Calendar
                </a>
              </div>

              <div className="p-3 bg-[#031D14] text-white rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-emerald-300 font-bold uppercase block">Clinical Hotline</span>
                  <span className="font-mono font-bold">(036) 621-0000 / ext. 302</span>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate(isLoggedIn ? 'dashboard' : 'login');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#031D14] font-bold text-xs cursor-pointer shadow-xs transition-colors"
                >
                  Open Portal
                </button>
              </div>

              {/* Explicit Full Width Close Button at bottom of Drawer */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-bold transition-colors border border-slate-200"
              >
                <X className="w-4 h-4" />
                <span>Close Navigation (X)</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Container with generated background image */}
      <section className="relative overflow-hidden bg-slate-950 py-24 px-6 md:py-32">
        {/* Responsive Background image overlaid with deep emerald gradients for text contrast */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="CSJR College of Nursing"
            className="w-full h-full object-cover object-top opacity-55 filter brightness-[0.7] transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-emerald-950/95 to-slate-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              CSJR Nursing Department
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Nursing Student <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Management System
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-350 max-w-2xl font-light text-slate-300">
              Empowering Future Healthcare Professionals Through Technology. Access your academic standing, clinical logbooks, exam records, hospital evaluations, and official dean clearances in one unified portal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'login')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35 hover:brightness-110 transition-all cursor-pointer text-center"
              >
                Access Portal Login
              </button>
              <a
                href="#mission-vision"
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-base backdrop-blur-md border border-white/10 transition-all cursor-pointer text-center"
              >
                Learn Mission & Vision
              </a>
            </div>
          </div>

          {/* Dynamic Floating Feature Summary */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center gap-3 border-b border-white/15 pb-4">
              <div className="h-10 w-10 rounded-full bg-emerald-400/25 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <h4 className="font-bold text-base">CHED Recognized</h4>
                <p className="text-xs text-slate-300">ISO 9001:2015 Certified College</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide block">Campus Priority Bulletins</span>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5 relative">
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                <h5 className="text-xs font-bold text-slate-200">Immunization Submissions</h5>
                <p className="text-[11px] text-slate-300 mt-1 lines-clamp-2 leading-relaxed">
                  Rotating Junior cohorts must submit latest vaccination details. Deadline June 12.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Excellence Statistics Section */}
      <section id="statistics" className="bg-white border-b border-emerald-50 py-12 px-6 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="text-center md:border-r border-slate-100 last:border-none py-2">
                <span className="text-3xl md:text-5xl font-extrabold text-[#084C35] block leading-none tracking-tight">
                  {item.value}
                </span>
                <span className="text-xs md:text-sm text-slate-500 font-semibold mt-2 block uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 scroll-mt-20">
        <div className="bg-gradient-to-tr from-[#084C35] to-[#0E7A57] text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none translate-x-12 translate-y-12">
            <CampusLogo size="lg" className="w-96 h-96" />
          </div>
          <div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-6 border border-emerald-400/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">The College Creed & Mission</h3>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light">
              "The College of St. John Roxas Nursing program is dedicated to mentoring morally upright, technically proficient, and highly compassionate professional nurses. We cultivate an academic atmosphere rich in evidence-based research, dynamic simulation-based training, and community-driven healthcare programs."
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3 text-emerald-300 text-xs font-semibold uppercase">
            <span>CSJR Quality Statement</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Veritas et Misericordia</span>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-emerald-50 shadow-md flex flex-col justify-between relative">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-[#0E7A57] flex items-center justify-center mb-6 border border-emerald-100">
              <Milestone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#084C35] tracking-tight mb-4">Our Vision of Healthcare</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              "To be a distinguished global epicenter of nursing instruction, recognized for introducing modern telemetry learning, robotic patient simulation, and pioneering regional epidemiological tracking modules by 2030."
            </p>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase">Dean of Nursing Advisory Board</span>
            <CampusLogo size="sm" className="opacity-40" />
          </div>
        </div>
      </section>

      {/* Announcements and School News Section */}
      <section id="bulletins" className="bg-emerald-50/20 py-20 px-6 border-t border-b border-emerald-100/50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider block">Notice Board</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#084C35] tracking-tight mt-1">
                Latest News & Campus Alerts
              </h2>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-sm font-bold text-[#0E7A57] hover:text-emerald-500 transition-colors flex items-center gap-1 cursor-pointer"
            >
              See all bulletins <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Urgent Warning banner */}
            <div className="lg:col-span-4 bg-white border border-rose-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-full text-xs font-bold uppercase">
                  <ShieldAlert className="w-3.5 h-3.5 animate-bounce" /> Urgent Dispatch
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Hepatitis B Titer Reports Deadline approaching!
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Junior students scheduled for the pediatric ward at Capiz Emmanuel Hospital must update immunization records. Missing this locks hospital badging.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Coord: Prof. C. Samson</span>
                <span>Due: June 12</span>
              </div>
            </div>

            {/* Upcoming schedules / timelines */}
            <div id="calendar" className="lg:col-span-8 bg-white border border-emerald-100 rounded-3xl p-6 md:p-8 shadow-sm scroll-mt-24">
              <h3 className="text-lg font-bold text-[#084C35] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0E7A57]" /> Upcoming Academic Calendars
              </h3>
              <div className="space-y-6">
                {upcomingEvents.map((ev, i) => (
                  <div key={i} className="flex gap-4 items-start border-l-4 border-emerald-500 pl-4 py-1">
                    <div className="min-w-[100px] text-xs font-bold text-emerald-600 tracking-wider">
                      {ev.date}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{ev.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{ev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-[#031D14] text-slate-400 py-12 px-6 border-t border-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-emerald-950/40">
          <div className="flex items-center gap-3">
            <CampusLogo size="sm" />
            <div>
              <span className="text-sm font-bold text-white tracking-widest block uppercase">
                College of St. John Roxas
              </span>
              <span className="text-xs text-slate-400">Nursing Student Management System &copy; 2026. All rights secured.</span>
            </div>
          </div>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#mission-vision" className="text-xs hover:text-white transition-colors">Vision</a>
            <span className="text-slate-800">|</span>
            <button onClick={() => onNavigate('login')} className="text-xs hover:text-white transition-colors cursor-pointer">Login</button>
            <span className="text-slate-800">|</span>
            <span className="text-xs text-emerald-400">Roxas City, Capiz, PH</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-[10px] text-slate-605 mt-6 text-slate-500">
          Developed in compliance with medical telemetry and academic compliance regulations in Region VI.
        </div>
      </footer>
    </div>
  );
}
