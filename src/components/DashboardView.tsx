import React from 'react';
import { 
  BookOpen, Award, Activity, Clock, FileWarning, 
  Megaphone, ArrowUpRight, TrendingUp, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { UserProfile, Subject, ClinicalDuty, Announcement, DocumentRecord } from '../types';

interface DashboardViewProps {
  profile: UserProfile;
  subjects: Subject[];
  duties: ClinicalDuty[];
  announcements: Announcement[];
  documents: DocumentRecord[];
  attendanceRate: number;
  onNavigateTab: (tab: string) => void;
}

export default function DashboardView({
  profile,
  subjects,
  duties,
  announcements,
  documents,
  attendanceRate,
  onNavigateTab
}: DashboardViewProps) {
  
  // Calculate stats dynamically
  const totalUnits = subjects.reduce((sum, s) => sum + s.units, 0);
  const pendingDocsCount = documents.filter(d => d.status === 'Not Submitted' || d.status === 'Rejected').length;
  
  // Calculate total clinical hours
  const totalClinicalRequired = duties.reduce((sum, d) => sum + d.hoursRequired, 0);
  const totalClinicalRendered = duties.reduce((sum, d) => sum + d.hoursRendered, 0);
  const clinicalPercentage = Math.round((totalClinicalRendered / totalClinicalRequired) * 100);

  // Quick Stat Cards data matching the user prompt
  const statCards = [
    {
      id: 'subjects',
      title: 'Total Subjects',
      value: `${subjects.length} Enrolled`,
      sub: `${totalUnits} Academic Units`,
      icon: BookOpen,
      color: 'from-emerald-600 to-teal-700',
      textColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50/55'
    },
    {
      id: 'grades',
      title: 'Current GPA',
      value: `${profile.gpa.toFixed(2)} PH`,
      sub: 'Excellent standing',
      icon: Award,
      color: 'from-emerald-500 to-teal-650',
      textColor: 'text-emerald-500',
      bgLight: 'bg-emerald-50'
    },
    {
      id: 'clinical-duty',
      title: 'Clinical Rotations',
      value: `${totalClinicalRendered}/${totalClinicalRequired} Hrs`,
      sub: `${clinicalPercentage}% Rendered`,
      icon: Activity,
      color: 'from-teal-500 to-emerald-600',
      textColor: 'text-teal-600',
      bgLight: 'bg-teal-50/70'
    },
    {
      id: 'attendance',
      title: 'Attendance Rate',
      value: `${attendanceRate}%`,
      sub: 'Satisfactory attendance',
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-500',
      bgLight: 'bg-amber-50'
    },
    {
      id: 'documents',
      title: 'Pending Clearances',
      value: `${pendingDocsCount} Due`,
      sub: `Current Status: ${profile.clearanceStatus}`,
      icon: FileWarning,
      color: 'from-rose-500 to-red-650',
      textColor: 'text-rose-500',
      bgLight: 'bg-rose-50',
      urgent: pendingDocsCount > 0
    },
    {
      id: 'announcements',
      title: 'Active Bulletins',
      value: `${announcements.length} Bulletins`,
      sub: `${announcements.filter(a => a.urgent).length} Tagged Urgent`,
      icon: Megaphone,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-500',
      bgLight: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Prime Welcome Banner overlaid with custom healthcare emerald gradient shine */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#084C35] via-[#0E7A57] to-[#10B981] p-6 md:p-8 rounded-3xl text-white shadow-xl animate-fadeIn">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-8 translate-y-[-8px]">
          <BookOpen className="w-96 h-96" />
        </div>

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-block py-1 px-3 bg-white/15 border border-white/25 rounded-full text-xs font-semibold tracking-wider uppercase">
            Official CSJR Student Hub
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Maayong Adlaw, {profile.name}!
          </h2>
          <p className="text-xs md:text-sm text-slate-100 max-w-xl font-light">
            Welcome back to the CSJR Nursing Portal. You are currently clear for hospital clinical duties. Check your schedules below and ensure your pending laboratory logs are submitted.
          </p>

          <div className="flex gap-4 pt-3 text-[11px] font-mono text-emerald-200">
            <div>
              <span className="text-white/60 font-medium">CURRICULUM:</span> BSN-3A (Class of 2027)
            </div>
            <span className="text-white/20">|</span>
            <div>
              <span className="text-white/60 font-medium">EMAIL:</span> {profile.email}
            </div>
          </div>
        </div>
      </div>

      {/* Grid statistics corresponding precisely to user schema */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div 
              key={index}
              onClick={() => onNavigateTab(card.id)}
              className="bg-white border hover:border-emerald-250/80 hover:border-emerald-200 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group hover:-translate-y-0.5 flex items-center justify-between"
            >
              <div className="space-y-2 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  {card.title}
                </span>
                <span className="text-xl md:text-2xl font-black text-slate-800 leading-none block">
                  {card.value}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  {card.id === 'grades' && <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
                  {card.sub}
                </span>
              </div>

              <div className={`p-4 rounded-2xl ${card.bgLight} ${card.textColor} group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6 shrink-0" />
              </div>
            </div>
          );
        })}
      </section>

      {/* Advanced Clinical Duty Tracking Progress dial & Subjects breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Clinical Hours detailed dial meter (Left Panel) */}
        <div className="lg:col-span-4 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm text-center flex flex-col justify-between space-y-6">
          <div className="text-left">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#084C35]">Clinical Duty Metrics</h3>
            <p className="text-xs text-slate-400 mt-1">Total combined Hospital rotational requirements</p>
          </div>

          {/* Interactive dial representation */}
          <div className="relative flex items-center justify-center py-4">
            {/* Round frame representing SVG progress scale */}
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke="#E2E8F0"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="64"
                stroke="#0E7A57"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={402}
                strokeDashoffset={402 - (402 * clinicalPercentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-x-0 inset-y-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#084C35] leading-none">
                {clinicalPercentage}%
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                Completed
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-left">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Hours Rendered</span>
              <span>{totalClinicalRendered} hrs</span>
            </div>
            
            {/* Linear overlay bar */}
            <div className="w-full h-2 bg-slate-150 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-450 to-emerald-600 bg-gradient-to-r from-teal-400 to-emerald-600 rounded-full" 
                style={{ width: `${clinicalPercentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-500 pt-1.5 self-center">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Hospital Affiliations</span>
                <span className="text-slate-800 font-bold block truncate">3 Partner Sump</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Hours Remaining</span>
                <span className="text-[#0E7A57] font-black block">
                  {totalClinicalRequired - totalClinicalRendered} Hrs
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('clinical-duty')}
            className="w-full py-2.5 rounded-xl border border-emerald-100 hover:bg-slate-50 text-xs font-bold text-[#084C35] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Track Clinical Logbooks</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subjects list & Dynamic schedule widget (Right Panel) */}
        <div className="lg:col-span-8 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="text-left">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#084C35]">Current Semester Enrollments</h3>
              <p className="text-xs text-slate-400 mt-1">Academics schedules & rooms assignments</p>
            </div>
            <button
              onClick={() => onNavigateTab('subjects')}
              className="text-xs font-extrabold text-[#0E7A57] hover:underline cursor-pointer"
            >
              See database
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1 overflow-y-auto max-h-80 pr-1">
            {subjects.map((sub, index) => (
              <div key={index} className="py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 first:pt-0 last:pb-0">
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold uppercase border border-emerald-100">
                      {sub.code}
                    </span>
                    <span className="text-xs font-extrabold text-slate-800 line-clamp-1">{sub.name}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Instructor: {sub.instructor}</p>
                </div>

                <div className="text-left sm:text-right font-mono text-[11px] bg-slate-50 sm:bg-transparent px-2 sm:px-0 py-1 sm:py-0 rounded-lg w-full sm:w-auto">
                  <span className="text-slate-600 font-medium block leading-normal">{sub.schedule}</span>
                  <span className="text-[#0E7A57] font-bold block">{sub.room}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Total Semester Units: <strong className="text-slate-800">{totalUnits} units</strong></span>
            
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> CHED Curriculum Safe
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Clear Midterms
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* Notifications and Alerts Quick view panel */}
      <section className="bg-amber-50/25 border border-amber-100/95 rounded-2xl p-6 text-left">
        <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-805 text-amber-850 text-amber-800 flex items-center gap-1.5 pb-2">
          <AlertTriangle className="w-4 h-4 text-amber-550 text-amber-600 animate-bounce" /> Academic Advisor Advisory Bulletins
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed max-w-4xl font-light">
          Attention junior cohorts: Clearance forms for final hospital deployments are currently being generated. Log in to the <strong>Documents</strong> sub-section to review requirements. Any missing laboratory units will prevent clinical rotations badges from activating under standard protocols.
        </p>
      </section>

    </div>
  );
}
