import React, { useState } from 'react';
import { Megaphone, Search, AlertTriangle, Calendar, Award } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export default function AnnouncementsView({ announcements }: AnnouncementsViewProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Academic' | 'Clinical' | 'Event' | 'Emergency'>('All');

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesSearch = 
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase()) ||
      ann.author.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      
      {/* Top action layout searching and categorization */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-emerald-50 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bulletins..."
            className="w-full pl-9 pr-4 py-2.5 text-xs font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#084C35]/15 focus:border-[#084C35]"
          />
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap gap-2 text-left">
          {['All', 'Academic', 'Clinical', 'Event', 'Emergency'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`
                px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border
                ${selectedCategory === cat
                  ? 'bg-[#084C35] text-white border-[#084C35] shadow'
                  : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main flow of bulletins */}
      <div className="space-y-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed text-slate-400 text-xs font-bold">
            No notices found matching the chosen search keyword or category.
          </div>
        ) : (
          filteredAnnouncements.map((ann) => (
            <div 
              key={ann.id}
              className={`
                p-6 rounded-3xl border shadow-xs text-left relative overflow-hidden transition-shadow hover:shadow-md
                ${ann.urgent 
                  ? 'bg-rose-50/40 border-rose-100' 
                  : 'bg-white border-emerald-50'
                }
              `}
            >
              {/* Highlight ribbon for emergency releases */}
              {ann.urgent && (
                <div className="absolute top-0 right-0 py-1.5 px-4 bg-rose-600 text-white text-[9px] font-bold uppercase tracking-wider rounded-bl-xl flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 animate-ping" /> Urgent Alert
                </div>
              )}

              <div className="space-y-4 max-w-5xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    ann.category === 'Emergency' 
                      ? 'bg-rose-100 text-rose-700' 
                      : ann.category === 'Clinical' 
                      ? 'bg-emerald-100 text-[#0E7A57]' 
                      : ann.category === 'Academic' 
                      ? 'bg-teal-100 text-teal-850' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {ann.category} Update
                  </span>

                  <span className="text-[11px] font-semibold text-slate-450 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" /> Published {ann.date}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base md:text-lg font-extrabold text-[#084C35] leading-tight">
                    {ann.title}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-light">
                    {ann.content}
                  </p>
                </div>

                {/* Director credit bottom footer line */}
                <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-400 font-mono font-bold">
                  <span>Authorized Signature: {ann.author}</span>
                  <span className="flex items-center gap-1.5 text-[#0E7A57]">
                    <Award className="w-3.5 h-3.5 text-emerald-500" /> CSJR College of Nursing
                  </span>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
