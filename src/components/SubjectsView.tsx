import React, { useState } from 'react';
import { Search, School, Star, Grid } from 'lucide-react';
import { Subject } from '../types';

interface SubjectsViewProps {
  subjects: Subject[];
}

export default function SubjectsView({ subjects }: SubjectsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Lecture' | 'Laboratory' | 'Clinical'>('All');

  // Search logic
  const filteredSubjects = subjects.filter((sub) => {
    const matchesSearch = 
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || sub.type === selectedType;

    return matchesSearch && matchesType;
  });

  const totalFilteredUnits = filteredSubjects.reduce((sum, s) => sum + s.units, 0);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Upper action headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-emerald-50 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search code, name, instructor..."
            className="w-full pl-9 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/15 focus:border-[#084C35]"
          />
        </div>

        {/* Filter chips category indicators */}
        <div className="flex flex-wrap gap-2 text-left">
          {['All', 'Lecture', 'Laboratory', 'Clinical'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`
                px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border
                ${selectedType === type
                  ? 'bg-[#084C35] text-white border-[#084C35] shadow'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filteredSubjects.length === 0 ? (
          <div className="md:col-span-3 text-center py-20 bg-white border rounded-2xl">
            <School className="w-12 h-12 text-slate-350 mx-auto mb-4 animate-bounce" />
            <h4 className="font-extrabold text-[#084C35]">No Enrolled Subjects Encountered</h4>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filter parameters or search terms.</p>
          </div>
        ) : (
          filteredSubjects.map((sub, idx) => (
            <div 
              key={idx}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-1">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#0E7A57] font-mono text-xs font-bold border border-emerald-100">
                    {sub.code}
                  </span>
                  
                  {/* Subject Category Indicator Tag */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    sub.type === 'Clinical' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                      : sub.type === 'Laboratory' 
                      ? 'bg-purple-50 text-purple-600 border border-purple-105' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  }`}>
                    {sub.type}
                  </span>
                </div>

                <h4 className="font-extrabold text-sm text-slate-800 leading-snug line-clamp-2" title={sub.name}>
                  {sub.name}
                </h4>
              </div>

              {/* Specs parameters table */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-medium text-slate-550">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Instructor:</span>
                  <span className="text-slate-700 text-right">{sub.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Classroom:</span>
                  <span className="text-[#0E7A57] font-bold text-right">{sub.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Schedules:</span>
                  <span className="text-slate-650 font-semibold text-right">{sub.schedule}</span>
                </div>
              </div>

              {/* Lower Section Card representing credit units count */}
              <div className="pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-450">
                <span className="font-mono text-slate-405 text-slate-400 font-bold">SY: 2025-2026</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-750 rounded-lg font-bold border border-slate-100">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  {sub.units} Credits
                </span>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Grid footer summary indicators */}
      <div className="bg-slate-50 border p-4 rounded-xl flex items-center justify-between text-xs font-bold text-slate-600">
        <span>Displaying {filteredSubjects.length} of {subjects.length} Subjects</span>
        <span>Total Academic Load: <strong className="text-[#084C35]">{totalFilteredUnits} Units</strong></span>
      </div>

    </div>
  );
}
