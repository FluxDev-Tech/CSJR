import React, { useState } from 'react';
import { Clock, Calendar, CheckSquare, XCircle, AlertCircle } from 'lucide-react';
import { AttendanceRecord } from '../types';

interface AttendanceViewProps {
  records: AttendanceRecord[];
}

export default function AttendanceView({ records }: AttendanceViewProps) {
  const [filter, setFilter] = useState<'All' | 'Present' | 'Absent' | 'Excused'>('All');

  // Calculations
  const totalClasses = records.length;
  const presentCount = records.filter(r => r.status === 'Present').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const excusedCount = records.filter(r => r.status === 'Excused').length;
  const attendancePct = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 100;

  const filteredRecords = records.filter(r => {
    if (filter === 'All') return true;
    return r.status === filter;
  });

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Attendance Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Total Rate dial */}
        <div className="bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-emerald-50 text-[#0E7A57] flex items-center justify-center font-mono font-black text-xl border border-emerald-100 shadow-inner">
            {attendancePct}%
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Overall Integrity</span>
            <h4 className="font-extrabold text-sm text-slate-700 mt-1">Excellent Ratio</h4>
          </div>
        </div>

        {/* Present items */}
        <div className="bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-50/50 text-emerald-600 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Present Lectures</span>
            <h4 className="font-extrabold text-xl text-slate-800 font-mono mt-0.5">{presentCount} classes</h4>
          </div>
        </div>

        {/* Absent Items */}
        <div className="bg-white border border-rose-50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <XCircle className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Unexcused Absences</span>
            <h4 className="font-extrabold text-xl text-slate-800 font-mono mt-0.5">{absentCount} classes</h4>
          </div>
        </div>

        {/* Excused items */}
        <div className="bg-white border border-amber-50 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Excused Leaves</span>
            <h4 className="font-extrabold text-xl text-slate-800 font-mono mt-0.5">{excusedCount} classes</h4>
          </div>
        </div>

      </div>

      <div className="bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-emerald-500" /> Dial-In Attendance Registers
            </h3>
            <p className="text-xs text-slate-400 mt-1">Simulated daily EHR punch logs matching current semester schedules</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-slate-50 border p-1 rounded-xl">
            {(['All', 'Present', 'Absent', 'Excused'] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`
                  px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer
                  ${filter === opt 
                    ? 'bg-[#084C35] text-white shadow' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Attendance Listing Cards */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1 text-left">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-bold">
              No daily logs matched the chosen filter.
            </div>
          ) : (
            filteredRecords.map((r) => (
              <div 
                key={r.id} 
                className="p-3.5 border rounded-xl flex items-center justify-between bg-slate-50/20 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {r.status === 'Present' ? (
                    <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckSquare className="w-4.5 h-4.5" />
                    </div>
                  ) : r.status === 'Absent' ? (
                    <div className="h-8 w-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <XCircle className="w-4.5 h-4.5" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <AlertCircle className="w-4.5 h-4.5" />
                    </div>
                  )}

                  <div className="text-left">
                    <h5 className="text-xs font-extrabold text-slate-800 leading-snug">{r.subjectName}</h5>
                    <div className="flex gap-2 items-center text-[10px] text-slate-400 mt-1">
                      <span className="font-mono text-emerald-600 font-bold">{r.subjectCode}</span>
                      <span>●</span>
                      <span className="font-semibold">{r.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-slate-500 font-semibold block leading-none">{r.time}</span>
                  <span className={`inline-block mt-1 font-bold uppercase text-[9px] ${
                    r.status === 'Present' 
                      ? 'text-emerald-600' 
                      : r.status === 'Absent' 
                      ? 'text-rose-600' 
                      : 'text-amber-600'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
