import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Heart, ShieldQuestion, PenTool, CheckCircle2, Save, X } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export default function ProfileView({ profile, onUpdateProfile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  // Edited values state
  const [editedPhone, setEditedPhone] = useState(profile.phone);
  const [editedEmail, setEditedEmail] = useState(profile.email);
  const [editedAddress, setEditedAddress] = useState(profile.address);
  const [editedParentName, setEditedParentName] = useState(profile.parentName);
  const [editedParentPhone, setEditedParentPhone] = useState(profile.parentPhone);
  const [editedAllergies, setEditedAllergies] = useState(profile.allergies || '');

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      phone: editedPhone,
      email: editedEmail,
      address: editedAddress,
      parentName: editedParentName,
      parentPhone: editedParentPhone,
      allergies: editedAllergies
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 text-left animate-fadeIn">
      
      {/* Upper Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Card: Portrait & Medical Credentials */}
        <div className="lg:col-span-4 bg-white border border-emerald-50 rounded-2xl p-6 shadow-sm flex flex-col items-center space-y-6">
          <div className="relative">
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100 shadow-md"
              referrerPolicy="no-referrer"
            />
            {/* Blood Type Badge overlay */}
            <span className="absolute bottom-1 right-2 inline-flex items-center justify-center w-9 h-9 bg-rose-600 border-2 border-white text-white font-black text-xs rounded-full shadow animate-pulse" title="Emergency Blood Type">
              {profile.bloodType}
            </span>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-black text-slate-800">{profile.name}</h3>
            <span className="font-mono text-xs text-[#0E7A57] font-bold tracking-widest block uppercase">
              {profile.studentId}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-[#084C35] border border-emerald-100 inline-block">
              {profile.course}
            </span>
          </div>

          <div className="w-full divide-y divide-slate-100 space-y-3 pt-3">
            <div className="flex justify-between text-xs py-2 first:pt-0">
              <span className="text-slate-400 font-bold uppercase">Year Rank</span>
              <span className="text-slate-800 font-bold">{profile.yearLevel}</span>
            </div>
            <div className="flex justify-between text-xs py-2">
              <span className="text-slate-400 font-bold uppercase">Class Section</span>
              <span className="text-slate-800 font-mono font-bold">{profile.section}</span>
            </div>
            <div className="flex justify-between text-xs py-2">
              <span className="text-slate-400 font-bold uppercase">Dean Clearance</span>
              <span className={`inline-flex items-center gap-1 font-bold ${
                profile.clearanceStatus === 'Cleared' 
                  ? 'text-emerald-600' 
                  : profile.clearanceStatus === 'Pending' 
                  ? 'text-amber-600' 
                  : 'text-rose-600'
              }`}>
                {profile.clearanceStatus === 'Cleared' ? '✓ Cleared' : '● ' + profile.clearanceStatus}
              </span>
            </div>
          </div>

          {/* Quick Stats: Emergency info vital for medical work */}
          <div className="w-full bg-rose-50/50 border border-rose-100 rounded-xl p-4 space-y-1.5">
            <span className="text-[10px] text-rose-800 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
              Rotation Emergency Bio-Check
            </span>
            <div className="text-xs text-rose-900 font-semibold text-left">
              <p className="mt-1"><strong className="text-rose-950 font-bold uppercase">Allergies:</strong> {profile.allergies || 'None declared'}</p>
              <p className="mt-1"><strong className="text-rose-950 font-bold uppercase">Active Pathogens:</strong> No medical contraindications</p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Modify Contact Details</span>
            </button>
          )}
        </div>

        {/* Right Card: Full Credentials View and Editor */}
        <div className="lg:col-span-8 bg-white border border-emerald-50 rounded-2xl p-6 md:p-8 shadow-sm">
          {!isEditing ? (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b pb-4">
                <h4 className="font-extrabold text-[#084C35] text-base uppercase tracking-wider">
                  Academic & Personal Register
                </h4>
                <div className="text-[11px] font-mono text-slate-400">REGISTERED SY: 2025-2026</div>
              </div>

              {/* Informational Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">
                
                {/* Contact Segment */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b pb-1.5">
                    Contact Channels
                  </span>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Email Address</span>
                      <span className="text-sm text-slate-800 font-medium select-all">{profile.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Telephone Number</span>
                      <span className="text-sm text-slate-800 font-medium">{profile.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Guardian Segment */}
                <div className="space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b pb-1.5">
                    Emergency Guardian
                  </span>
                  
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Guardian Full Name</span>
                      <span className="text-sm text-slate-800 font-bold">{profile.parentName}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#0E7A57] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Guardian Emergency Contact</span>
                      <span className="text-sm text-[#084C35] font-extrabold">{profile.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* Address Segment */}
                <div className="md:col-span-2 space-y-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block border-b pb-1.5">
                    Residential Address
                  </span>
                  <div className="flex items-start gap-3 text-left">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Permanent Residence</span>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">
                        {profile.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Academic Standing */}
                <div className="md:col-span-2 bg-gradient-to-r from-emerald-50 to-teal-50/40 p-4 border border-emerald-100 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-[#084C35] uppercase tracking-wide block">
                    Institutional Record Statement
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    This account is in excellent standing under the College of St. John Roxas Registrar database. Cumulative General Weighted Average (GWA) stands at <strong>{profile.gpa} PH grading scale</strong>. Current status authorizes student enrollment into clinical hospital duties for Junior semester.
                  </p>
                </div>

              </div>

            </div>
          ) : (
            
            // PROFILE EDITING DIALOG (Saves to state and localstorage)
            <form onSubmit={handleSaveSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h4 className="font-extrabold text-[#084C35] text-base uppercase tracking-wider">
                  Update Registry Details
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* Contact telephone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Student Mobile</label>
                  <input
                    type="text"
                    required
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Student Address Email</label>
                  <input
                    type="email"
                    required
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

                {/* Guardian Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Guardian Name</label>
                  <input
                    type="text"
                    required
                    value={editedParentName}
                    onChange={(e) => setEditedParentName(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

                {/* Guardian Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Guardian Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={editedParentPhone}
                    onChange={(e) => setEditedParentPhone(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

                {/* Medical Allergies */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Emergency Medical Allergies Information</label>
                  <input
                    type="text"
                    value={editedAllergies}
                    onChange={(e) => setEditedAllergies(e.target.value)}
                    placeholder="e.g., Penicillin, Peanuts, Seafoods"
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

                {/* Permanent home address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase block">Home Permanent Address</label>
                  <textarea
                    required
                    rows={3}
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    className="w-full text-xs font-medium p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-[#084C35] focus:outline-none"
                  />
                </div>

              </div>

              {/* Recovery Submission Button */}
              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-500 rounded-lg border hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#084C35] hover:bg-[#0E7A57] rounded-lg cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" /> Save Updated Records
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
