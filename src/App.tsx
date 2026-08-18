import React, { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import PortalShell from './components/PortalShell';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import SubjectsView from './components/SubjectsView';
import ScheduleView from './components/ScheduleView';
import ClinicalDutyView from './components/ClinicalDutyView';
import GradesView from './components/GradesView';
import AttendanceView from './components/AttendanceView';
import AnnouncementsView from './components/AnnouncementsView';
import DocumentsView from './components/DocumentsView';
import SettingsView from './components/SettingsView';

import {
  INITIAL_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_CLINICAL_DUTIES,
  INITIAL_GRADES,
  INITIAL_ATTENDANCE,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS
} from './data';

import { UserProfile, Subject, ClinicalDuty, Grade, AttendanceRecord, Announcement, DocumentRecord, SystemNotification } from './types';

export default function App() {
  // Public Routing: 'home' | 'login'
  const [publicView, setPublicView] = useState<'home' | 'login'>('home');
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Active Tab/Sector in the Portal
  const [portalTab, setPortalTab] = useState<string>('dashboard');
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Core state models synced with LocalStorage
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [duties, setDuties] = useState<ClinicalDuty[]>(INITIAL_CLINICAL_DUTIES);
  const [grades, setGrades] = useState<Grade[]>(INITIAL_GRADES);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Seeding and Syncing Hook
  useEffect(() => {
    // 1. Profile
    const localProfile = localStorage.getItem('csjr_profile');
    if (localProfile) {
      setProfile(JSON.parse(localProfile));
    } else {
      localStorage.setItem('csjr_profile', JSON.stringify(INITIAL_PROFILE));
    }

    // 2. State logged-in session restore
    const localSession = localStorage.getItem('csjr_is_loggedin');
    if (localSession === 'true') {
      setIsLoggedIn(true);
      const savedTab = localStorage.getItem('csjr_active_tab') || 'dashboard';
      setPortalTab(savedTab);
    }

    // 3. Subjects
    const localSubjects = localStorage.getItem('csjr_subjects');
    if (localSubjects) {
      setSubjects(JSON.parse(localSubjects));
    } else {
      localStorage.setItem('csjr_subjects', JSON.stringify(INITIAL_SUBJECTS));
    }

    // 4. Clinical Duties
    const localDuties = localStorage.getItem('csjr_duties');
    if (localDuties) {
      setDuties(JSON.parse(localDuties));
    } else {
      localStorage.setItem('csjr_duties', JSON.stringify(INITIAL_CLINICAL_DUTIES));
    }

    // 5. Grades
    const localGrades = localStorage.getItem('csjr_grades');
    if (localGrades) {
      setGrades(JSON.parse(localGrades));
    } else {
      localStorage.setItem('csjr_grades', JSON.stringify(INITIAL_GRADES));
    }

    // 6. Attendance
    const localAttendance = localStorage.getItem('csjr_attendance');
    if (localAttendance) {
      setAttendance(JSON.parse(localAttendance));
    } else {
      localStorage.setItem('csjr_attendance', JSON.stringify(INITIAL_ATTENDANCE));
    }

    // 7. Announcements
    const localAnnouncements = localStorage.getItem('csjr_announcements');
    if (localAnnouncements) {
      setAnnouncements(JSON.parse(localAnnouncements));
    } else {
      localStorage.setItem('csjr_announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
    }

    // 8. Documents
    const localDocuments = localStorage.getItem('csjr_documents');
    if (localDocuments) {
      setDocuments(JSON.parse(localDocuments));
    } else {
      localStorage.setItem('csjr_documents', JSON.stringify(INITIAL_DOCUMENTS));
    }

    // 9. Notifications
    const localNotifications = localStorage.getItem('csjr_notifications');
    if (localNotifications) {
      setNotifications(JSON.parse(localNotifications));
    } else {
      localStorage.setItem('csjr_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
    }

    // 10. Theme
    const savedTheme = localStorage.getItem('csjr_theme_dark');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  // Update theme helper
  const handleToggleDarkMode = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    localStorage.setItem('csjr_theme_dark', String(nextTheme));
  };

  // Student auth flow
  const handleLoginSuccess = (role: 'student' | 'faculty' | 'admin', email: string) => {
    setIsLoggedIn(true);
    setPortalTab('dashboard');
    localStorage.setItem('csjr_is_loggedin', 'true');
    localStorage.setItem('csjr_active_tab', 'dashboard');

    // Simulate different profiles based on selection if user swaps role triggers
    if (role !== 'student') {
      const alternateProfile: UserProfile = {
        ...INITIAL_PROFILE,
        name: role === 'faculty' ? 'Prof. Clara Samson, RN, MAN' : 'Admin Registrar Head',
        studentId: role === 'faculty' ? 'CSJR-FAC-2012' : 'CSJR-ADM-001',
        email: email,
        role: role,
        course: role === 'faculty' ? 'Instructor of Nursing Specialties' : 'Office of Admissions',
        yearLevel: 'Faculty Coordinator',
        avatar: role === 'faculty' 
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120' 
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120'
      };
      setProfile(alternateProfile);
      localStorage.setItem('csjr_profile', JSON.stringify(alternateProfile));
    } else {
      setProfile(INITIAL_PROFILE);
      localStorage.setItem('csjr_profile', JSON.stringify(INITIAL_PROFILE));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPublicView('home');
    localStorage.removeItem('csjr_is_loggedin');
    localStorage.removeItem('csjr_active_tab');
  };

  // State modifiers
  const handleUpdateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('csjr_profile', JSON.stringify(newProfile));
  };

  const handleUpdateGrades = (nextGrades: Grade[]) => {
    setGrades(nextGrades);
    localStorage.setItem('csjr_grades', JSON.stringify(nextGrades));
  };

  const handleLogHours = (dutyId: string, loggedHours: number) => {
    const todayStr = new Date().toISOString().split('T')[0];

    const updatedDuties = duties.map((d) => {
      if (d.id === dutyId) {
        const nextRendered = d.hoursRendered + loggedHours;
        const reachedTarget = nextRendered >= d.hoursRequired;
        return {
          ...d,
          hoursRendered: Math.min(nextRendered, d.hoursRequired),
          status: reachedTarget ? 'Completed' as const : 'In Progress' as const,
          lastWorkedDate: todayStr
        };
      }
      return d;
    });

    setDuties(updatedDuties);
    localStorage.setItem('csjr_duties', JSON.stringify(updatedDuties));

    // Append alert notification dynamically
    const targetDuty = duties.find(d => d.id === dutyId);
    const newNotif: SystemNotification = {
      id: `not_${Date.now()}`,
      title: 'Hours Logged!',
      message: `Successfully recorded ${loggedHours} hours for assignment: "${targetDuty?.hospital || 'Hospital Area'}"`,
      time: 'Just now',
      read: false,
      type: 'success'
    };

    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    localStorage.setItem('csjr_notifications', JSON.stringify(nextNotifs));
  };

  const handleUploadDocument = (uploaded: Omit<DocumentRecord, 'id' | 'uploadedAt'>) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newRecord: DocumentRecord = {
      ...uploaded,
      id: `doc_${Date.now()}`,
      uploadedAt: todayStr
    };

    const nextDocs = [newRecord, ...documents];
    setDocuments(nextDocs);
    localStorage.setItem('csjr_documents', JSON.stringify(nextDocs));

    // Append notification dynamically
    const newNotif: SystemNotification = {
      id: `not_${Date.now()}`,
      title: 'Form Submitted!',
      message: `Your document "${uploaded.name}" has been forwarded to Clinical Coordinators.`,
      time: 'Just now',
      read: false,
      type: 'info'
    };

    const nextNotifs = [newNotif, ...notifications];
    setNotifications(nextNotifs);
    localStorage.setItem('csjr_notifications', JSON.stringify(nextNotifs));
  };

  const handleMarkNotificationRead = (id: string) => {
    const nextNotifs = notifications.map((n) => {
      if (n.id === id) return { ...n, read: true };
      return n;
    });
    setNotifications(nextNotifs);
    localStorage.setItem('csjr_notifications', JSON.stringify(nextNotifs));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('csjr_notifications', JSON.stringify([]));
  };

  const handlePublicNavigate = (tag: string) => {
    if (tag === 'home') {
      setPublicView('home');
    } else if (tag === 'login') {
      setPublicView('login');
    } else if (isLoggedIn) {
      setPortalTab(tag);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'home') {
      handleLogout();
    } else {
      setPortalTab(tab);
      localStorage.setItem('csjr_active_tab', tab);
    }
  };

  // Simple hardcoded attendance rate calculation
  const calculatedAttendancePct = 94;

  // Compute theme wrappers
  const themeClass = isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F5F8FC] text-slate-800';

  // MAIN PUBLIC vs AUTHENTICATED SWITCH
  if (!isLoggedIn) {
    if (publicView === 'home') {
      return (
        <HomeView 
          onNavigate={handlePublicNavigate} 
          isLoggedIn={false} 
        />
      );
    } else {
      return (
        <LoginView 
          onLoginSuccess={handleLoginSuccess} 
          onNavigate={handlePublicNavigate} 
        />
      );
    }
  }

  // PORTAL SHELL ROUTER
  return (
    <div className={`min-h-screen text-slate-800 antialiased ${themeClass} ${isDarkMode ? '[--bg-card:#0e2644] [--text-dark:#f3f4f6]' : ''}`}>
      <PortalShell
        activeTab={portalTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
        profile={profile}
        notifications={notifications}
        onMarkNotificationAsRead={handleMarkNotificationRead}
        onClearAllNotifications={handleClearAllNotifications}
      >
        <div className={isDarkMode ? 'dark-card shadow-lg bg-slate-900/60 text-slate-100 border border-slate-800/80 rounded-3xl p-1.5 md:p-3' : ''}>
          {portalTab === 'dashboard' && (
            <DashboardView
              profile={profile}
              subjects={subjects}
              duties={duties}
              announcements={announcements}
              documents={documents}
              attendanceRate={calculatedAttendancePct}
              onNavigateTab={handleTabChange}
            />
          )}

          {portalTab === 'profile' && (
            <ProfileView 
              profile={profile} 
              onUpdateProfile={handleUpdateProfile} 
            />
          )}

          {portalTab === 'subjects' && (
            <SubjectsView 
              subjects={subjects} 
            />
          )}

          {portalTab === 'schedule' && (
            <ScheduleView 
              subjects={subjects} 
              duties={duties} 
            />
          )}

          {portalTab === 'clinical-duty' && (
            <ClinicalDutyView 
              duties={duties} 
              onLogHours={handleLogHours} 
            />
          )}

          {portalTab === 'grades' && (
            <GradesView 
              grades={grades} 
              onUpdateGrades={handleUpdateGrades}
            />
          )}

          {portalTab === 'attendance' && (
            <AttendanceView 
              records={attendance} 
            />
          )}

          {portalTab === 'announcements' && (
            <AnnouncementsView 
              announcements={announcements} 
            />
          )}

          {portalTab === 'documents' && (
            <DocumentsView 
              documents={documents} 
              onUploadDocument={handleUploadDocument} 
            />
          )}

          {portalTab === 'settings' && (
            <SettingsView 
              isDarkMode={isDarkMode} 
              onToggleDarkMode={handleToggleDarkMode} 
              onNavigateTab={handleTabChange}
            />
          )}
        </div>
      </PortalShell>
    </div>
  );
}
