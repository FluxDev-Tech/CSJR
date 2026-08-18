export type UserRole = 'student' | 'faculty' | 'admin';

export interface UserProfile {
  id: string;
  studentId: string;
  name: string;
  email: string;
  role: UserRole;
  course: string;
  yearLevel: string;
  section: string;
  avatar: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  gpa: number;
  clearanceStatus: 'Uncleared' | 'Pending' | 'Cleared';
  bloodType: string;
  allergies?: string;
}

export interface Subject {
  code: string;
  name: string;
  units: number;
  instructor: string;
  schedule: string;
  room: string;
  days: string[];
  time: string;
  type: 'Lecture' | 'Laboratory' | 'Clinical';
}

export interface ClinicalDuty {
  id: string;
  hospital: string;
  department: string;
  schedule: string;
  hoursRequired: number;
  hoursRendered: number;
  supervisor: string;
  evaluation: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  lastWorkedDate?: string;
}

export interface Grade {
  subjectCode: string;
  subjectName: string;
  units: number;
  midterm: number | null;
  final: number | null;
  instructor: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subjectCode: string;
  subjectName: string;
  status: 'Present' | 'Absent' | 'Excused';
  time: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Academic' | 'Clinical' | 'Event' | 'Emergency';
  urgent: boolean;
  author: string;
}

export interface DocumentRecord {
  id: string;
  name: string;
  type: 'Medical' | 'Duty' | 'Clearance';
  description: string;
  status: 'Not Submitted' | 'Pending Review' | 'Approved' | 'Rejected';
  downloadUrl: string;
  uploadedAt?: string;
  feedback?: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
}
