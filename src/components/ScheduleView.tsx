import React, { useState } from 'react';
import { Calendar, Layers, BedDouble, AlertCircle, Clock } from 'lucide-react';
import { Subject, ClinicalDuty } from '../types';

interface ScheduleViewProps {
  subjects: Subject[];
  duties: ClinicalDuty[];
}

export default function ScheduleView({ subjects, duties }: ScheduleViewProps) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'clinical' | 'laboratory'>('weekly');
  const [selectedMobileDay, setSelectedMobileDay] = useState<string>('Mon');

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Static mock mapping of schedules to make the calendar look exceptionally rich
  const weeklyTimetable = [
    { day: 'Mon', time: '8:00 AM - 12:00 PM', course: 'NCM 112', name: 'Oxygenation, Fluid & Elec. (Lec)', room: 'Nursing Lab A / Rm 304', color: 'bg-emerald-50 text-emerald-800 border-emerald-250 border-emerald-200' },
    { day: 'Mon', time: '1:00 PM - 4:00 PM', course: 'NCM 115', name: 'Nursing Informatics (Lab)', room: 'IT Center Rm 102', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { day: 'Tue', time: '8:00 AM - 12:00 PM', course: 'NCM 112', name: 'Oxygenation, Fluid & Elec. (Lec)', room: 'Nursing Lab A / Rm 304', color: 'bg-emerald-50 text-emerald-800 border-emerald-250 border-emerald-200' },
    { day: 'Tue', time: '1:00 PM - 3:00 PM', course: 'NCM 114', name: 'Care of Older Adults (Gerontological)', room: 'Lecture Hall C / Rm 205', color: 'bg-teal-50 text-teal-850 border-teal-200' },
    { day: 'Wed', time: '7:00 AM - 3:00 PM', course: 'NCM 112', name: 'Clinical Duty Rotation (Shift A)', room: 'Roxas Memorial Hospital (ER)', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { day: 'Wed', time: '3:30 PM - 6:30 PM', course: 'NUPR 301', name: 'Nursing Research I (Lab)', room: 'Nursing Computer Lab', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { day: 'Thu', time: '8:00 AM - 12:00 PM', course: 'NCM 113', name: 'Perception & Coordination (Lec)', room: 'Lecture Hall B / Rm 302', color: 'bg-emerald-50 text-emerald-800 border-emerald-250 border-emerald-200' },
    { day: 'Fri', time: '8:00 AM - 12:00 PM', course: 'NCM 113', name: 'Perception & Coordination (Lec)', room: 'Lecture Hall B / Rm 302', color: 'bg-emerald-50 text-emerald-805 border-emerald-200' },
    { day: 'Sat', time: '7:00 AM - 3:00 PM', course: 'NCM 113', name: 'Clinical Duty Rotation (Shift B)', room: 'Capiz Emmanuel Hospital (Pedia)', color: 'bg-rose-50 text-rose-700 border-rose-200' }
  ];

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Tab Switcher Headers */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-emerald-50 shadow-xs w-full max-w-lg overflow-x-auto">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === 'weekly' 
              ? 'bg-[#084C35] text-white shadow' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Weekly Timetable</span>
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === 'clinical' 
              ? 'bg-[#084C35] text-white shadow' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BedDouble className="w-4 h-4 shrink-0" />
          <span>Clinical Rota</span>
        </button>

        <button
          onClick={() => setActiveTab('laboratory')}
          className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap min-h-[44px] ${
            activeTab === 'laboratory' 
              ? 'bg-[#084C35] text-white shadow' 
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>Lab & Sim Roster</span>
        </button>
      </div>

      {/* CORE DISPLAY SWITCH */}
      {activeTab === 'weekly' && (
        <div className="space-y-6">
          
          {/* MOBILE DAY SELECTOR (< md screens) */}
          <div className="md:hidden space-y-4">
            <div className="flex gap-1.5 p-1 bg-white border border-emerald-100 rounded-2xl overflow-x-auto shadow-xs">
              {daysOfWeek.map((day) => {
                const daySlotsCount = weeklyTimetable.filter((s) => s.day === day).length;
                const isDaySelected = selectedMobileDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedMobileDay(day)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all min-h-[40px] flex flex-col items-center justify-center cursor-pointer ${
                      isDaySelected
                        ? 'bg-[#084C35] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`text-[9px] font-mono ${isDaySelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                      {daySlotsCount > 0 ? `${daySlotsCount} class` : 'None'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Day Active Card List */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-xs font-extrabold text-[#084C35] uppercase tracking-wider">
                  {selectedMobileDay === 'Mon' ? 'Monday' : selectedMobileDay === 'Tue' ? 'Tuesday' : selectedMobileDay === 'Wed' ? 'Wednesday' : selectedMobileDay === 'Thu' ? 'Thursday' : selectedMobileDay === 'Fri' ? 'Friday' : 'Saturday'} Schedule
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {weeklyTimetable.filter((s) => s.day === selectedMobileDay).length} sessions
                </span>
              </div>

              {weeklyTimetable.filter((s) => s.day === selectedMobileDay).length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs font-medium">
                  No classes scheduled for {selectedMobileDay}. Enjoy your clinical study prep!
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  {weeklyTimetable.filter((s) => s.day === selectedMobileDay).map((slot, i) => (
                    <div 
                      key={i} 
                      className={`p-3.5 rounded-xl border-l-4 text-left space-y-1.5 border shadow-xs ${slot.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                          {slot.time}
                        </span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/70">
                          {slot.course}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-xs leading-snug">
                        {slot.name}
                      </h5>
                      <p className="text-[10px] font-semibold opacity-90 flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        {slot.room}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP & TABLET WEEKLY TIMETABLE GRID (>= md screens) */}
          <div className="hidden md:block bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm overflow-x-auto">
            <div className="min-w-[750px] grid grid-cols-6 gap-3 lg:gap-4 border-b pb-4 text-xs font-bold text-[#084C35] uppercase tracking-widest">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center py-2 bg-slate-50 rounded-lg border">
                  {day}
                </div>
              ))}
            </div>

            <div className="min-w-[750px] grid grid-cols-6 gap-3 lg:gap-4 pt-4 min-h-[380px]">
              {daysOfWeek.map((day) => {
                const daySlots = weeklyTimetable.filter((s) => s.day === day);
                return (
                  <div key={day} className="space-y-3 bg-slate-50/45 p-2 rounded-xl min-h-[360px] border border-dashed border-slate-200">
                    {daySlots.length === 0 ? (
                      <span className="text-[10px] text-slate-400 font-medium block text-center pt-24">No classes</span>
                    ) : (
                      daySlots.map((slot, i) => (
                        <div 
                          key={i} 
                          className={`p-3 rounded-lg border-l-4 text-left space-y-1.5 border shadow-xs ${slot.color}`}
                        >
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider block opacity-75">
                            {slot.time}
                          </span>
                          <h5 className="font-extrabold text-xs leading-snug line-clamp-2">
                            {slot.course}: {slot.name}
                          </h5>
                          <p className="text-[10px] font-bold uppercase leading-none opacity-85">
                            {slot.room}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'clinical' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm space-y-6 text-left">
            <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2 pb-3 border-b">
              <BedDouble className="w-5 h-5 text-rose-500" /> Hospital Deployments clinical schedule (BSN Junior Year)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {duties.map((duty, idx) => (
                <div key={idx} className="border border-slate-100 rounded-2xl p-5 hover:border-emerald-400 transition-colors space-y-4 bg-slate-50/20 text-left">
                  <div className="flex justify-between items-start gap-1">
                    <span className="font-black text-sm text-[#084C35] leading-none block">
                      {duty.hospital}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      duty.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : duty.status === 'In Progress' 
                        ? 'bg-[#EAF5EE] text-[#0E7A57] border border-emerald-150' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {duty.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-550 border-t pt-3">
                    <p><strong className="text-slate-800 font-bold block uppercase text-[10px] text-slate-400">Department:</strong> {duty.department}</p>
                    <p className="mt-1"><strong className="text-slate-800 font-bold block uppercase text-[10px] text-slate-400">Clinical Shifts:</strong> {duty.schedule}</p>
                    <p className="mt-1"><strong className="text-slate-800 font-bold block uppercase text-[10px] text-slate-400">Hours Target:</strong> {duty.hoursRequired} Hours ({duty.hoursRequired - duty.hoursRendered} remaining)</p>
                    <p className="mt-1"><strong className="text-slate-800 font-bold block uppercase text-[10px] text-slate-400">Supervisor:</strong> {duty.supervisor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'laboratory' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm space-y-6 text-left">
            <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2 pb-3 border-b">
              <Layers className="w-5 h-5 text-purple-500" /> Laboratory & practical Clinical procedures Rota
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="border border-dashed border-slate-300 bg-[#F4F9F6]/50 rounded-2xl p-5 space-y-3 text-left">
                <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-600 border border-purple-100 font-mono text-xs font-black block w-fit">
                  NCM 115 Lab Session
                </span>
                <h5 className="font-extrabold text-sm text-slate-800">EHR Database and Medical Telemetry Input</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Required training on inputting standard medical diagnostic markers, vital checks records, and patient intake clearance charts securely inside simulation EHR dashboards.
                </p>
                <div className="flex justify-between text-xs font-mono font-bold text-[#0E7A57] pt-1">
                  <span>Schedules: Mon 1:00 PM - 4:00 PM</span>
                  <span>Room 102 IT Facility</span>
                </div>
              </div>

              <div className="border border-dashed border-slate-300 bg-[#F4F9F6]/50 rounded-2xl p-5 space-y-3 text-left">
                <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-600 border border-purple-100 font-mono text-xs font-black block w-fit">
                  NUPR 301 Lab Session
                </span>
                <h5 className="font-extrabold text-sm text-slate-800">Nursing Research Proposal - Compilations</h5>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Group brainstorming and bibliographic citation compilation using nursing database systems. Faculty coordinators will evaluate citations.
                </p>
                <div className="flex justify-between text-xs font-mono font-bold text-[#0E7A57] pt-1">
                  <span>Schedules: Wed 3:30 PM - 6:30 PM</span>
                  <span>Nursing Computer Lab</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Advisory warnings */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-2.5 items-start text-left">
        <AlertCircle className="w-4 h-4 text-[#0E7A57] shrink-0 mt-0.5" />
        <p className="text-xs text-slate-605 text-slate-650 leading-relaxed">
          Please note that clinical duty rotations are subject to emergency alterations by the Clinical Department Coordinating Head based on tertiary hospital shifts requirements in Capiz Province.
        </p>
      </div>

    </div>
  );
}
