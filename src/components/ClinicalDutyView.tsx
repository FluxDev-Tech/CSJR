import React, { useState } from 'react';
import { Activity, Plus, ShieldAlert, CheckCircle, Smile, FilePlus, Calendar, Clock } from 'lucide-react';
import { ClinicalDuty } from '../types';

interface ClinicalDutyViewProps {
  duties: ClinicalDuty[];
  onLogHours: (dutyId: string, hours: number) => void;
}

export default function ClinicalDutyView({ duties, onLogHours }: ClinicalDutyViewProps) {
  const [selectedDutyId, setSelectedDutyId] = useState(duties[0]?.id || '');
  const [logHoursCount, setLogHoursCount] = useState(8);
  const [remarks, setRemarks] = useState('');
  const [dateWorked, setDateWorked] = useState('2026-06-08');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDutyId || logHoursCount <= 0) return;

    onLogHours(selectedDutyId, logHoursCount);
    setSuccessMsg(`Logged ${logHoursCount} clinical duty hours successfully! Your rendered hours balance has been updated.`);
    setRemarks('');
    
    // Clear message after 4s
    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Top statistics summary indicator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {duties.map((duty, idx) => {
          const pct = Math.round((duty.hoursRendered / duty.hoursRequired) * 100);
          return (
            <div key={idx} className="bg-white border hover:border-emerald-100 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-start gap-1">
                <div>
                  <h4 className="font-extrabold text-sm text-[#084C35] line-clamp-1">{duty.hospital}</h4>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase mt-0.5">{duty.department}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  duty.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-[#EAF5EE] text-[#0E7A57] border border-emerald-150'
                }`}>
                  {duty.status}
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Duty Progress</span>
                  <span>{pct}% ({duty.hoursRendered}/{duty.hoursRequired} Hrs)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-400 to-[#0E7A57] transition-all duration-500" 
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Evaluation excerpt */}
              <div className="bg-slate-50 p-2.5 rounded-lg text-xs leading-relaxed text-slate-650 italic">
                "{duty.evaluation}"
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* HOURS SUBMISSION LOGGER (LocalStorage simulation) */}
        <div className="lg:col-span-5 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="border-b pb-3.5">
            <h3 className="font-extrabold text-sm text-[#084C35] uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-4.5 h-4.5 text-[#0E7A57]" /> Log Case / Clinical Hours
            </h3>
            <p className="text-xs text-slate-400 mt-1">Submit completed clinical shift hours simulation</p>
          </div>

          {successMsg && (
            <div className="text-xs p-3.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitLog} className="space-y-4">
            
            {/* Hospital rotating sector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Hospital Assignment</label>
              <select
                value={selectedDutyId}
                onChange={(e) => setSelectedDutyId(e.target.value)}
                className="w-full text-xs font-semibold p-3 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-emerald-550 focus:ring-emerald-500 focus:outline-none"
              >
                {duties.map((duty) => (
                  <option key={duty.id} value={duty.id}>
                    {duty.hospital} ({duty.department.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Date and hour select */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Shift Date</label>
                <input
                  type="date"
                  required
                  value={dateWorked}
                  onChange={(e) => setDateWorked(e.target.value)}
                  className="w-full text-xs font-medium p-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-550 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase">Hour Count</label>
                <select
                  value={logHoursCount}
                  onChange={(e) => setLogHoursCount(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-2.5 border border-slate-200 rounded-lg bg-white"
                >
                  {[4, 8, 12, 16, 24].map((h) => (
                    <option key={h} value={h}>{h} Hours</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Shift narrative Log */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase">Clinician Ward Narrative Remarks</label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Briefly detail diagnostic records assisted or syringe procedures witnessed..."
                className="w-full text-xs font-medium p-3 border border-slate-200 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-white bg-[#084C35] hover:bg-[#0E7A57] uppercase transition-all shadow cursor-pointer text-center"
            >
              Simulate Logging Duty Session
            </button>
          </form>
        </div>

        {/* CLINICAL LOG DECK LEDGER (Right Panel) */}
        <div className="lg:col-span-7 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-extrabold text-[#084C35] text-sm uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-5 h-5 text-emerald-600 text-rose-500" /> Active Rotation Supervisors & Appraisals
            </h3>
            <p className="text-xs text-slate-400 mt-1">Official evaluations compiled under medical standards</p>
          </div>

          <div className="space-y-5">
            {duties.map((duty, idx) => (
              <div key={idx} className="p-4 border border-emerald-50/50 hover:bg-slate-50/20 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Assigned Supervisor</span>
                    <h5 className="font-extrabold text-xs text-slate-800">{duty.supervisor}</h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block sm:inline mr-2">Evaluation Marks:</span>
                    <span className="text-xs font-extrabold text-[#0E7A57] bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      {duty.hoursRendered > 0 ? 'Exceeds Standards (MAN)' : 'Clinical Rotations Pending'}
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50/20 p-3 rounded-lg border border-dashed text-xs italic text-slate-650 flex gap-2">
                  <Smile className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[10px] text-emerald-800 uppercase block not-italic">Clinical Coordinator Assessment</span>
                    {duty.evaluation}
                  </div>
                </div>

                <div className="pt-2 flex justify-between text-[11px] font-mono text-slate-400 font-bold">
                  <span>HOSPITAL ID-CODE: CSJR-{duty.id.toUpperCase()}</span>
                  <span>LAST RECOGNIZED WORK: {duty.lastWorkedDate || 'N/A'}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
