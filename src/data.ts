import { UserProfile, Subject, ClinicalDuty, Grade, AttendanceRecord, Announcement, DocumentRecord, SystemNotification } from './types';

export const INITIAL_PROFILE: UserProfile = {
  id: 'usr_001',
  studentId: 'CSJR-2023-0104',
  name: 'John Lawrence Martinez',
  email: 'johnlawrencemartinez05@gmail.com',
  role: 'student',
  course: 'Bachelor of Science in Nursing (BSN)',
  yearLevel: '3rd Year (Junior)',
  section: 'BSN-3A',
  avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150',
  phone: '+63 945 789 1234',
  parentName: 'Maria Lourdes Martinez',
  parentPhone: '+63 917 123 4567',
  address: 'Brgy. Tanque, Roxas City, Capiz, 5800 Philippines',
  gpa: 1.65, // PH grading scale (1.0 is highest, 1.65 is equivalent to ~91-92% / Very Good)
  clearanceStatus: 'Pending',
  bloodType: 'B+',
  allergies: 'Penicillin, Peniodic Sulfa'
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    code: 'NCM 112',
    name: 'Care of Clients with Problems in Oxygenation, Fluid and Electrolytes, Infectious Diseases',
    units: 8,
    instructor: 'Prof. Clara Samson, RN, MAN',
    schedule: 'Mon & Tue 8:00 AM - 12:00 PM (Lec), Wed 7:00 AM - 3:00 PM (Clinical)',
    room: 'Nursing Lab A / Rm 304',
    days: ['Mon', 'Tue', 'Wed'],
    time: '8:00 AM - 12:00 PM',
    type: 'Clinical'
  },
  {
    code: 'NCM 113',
    name: 'Care of Clients with Problems in Inflammatory and Immunologic Response, Perception and Coordination',
    units: 8,
    instructor: 'Prof. Alejandro Reyes, RN, MN',
    schedule: 'Thu & Fri 8:00 AM - 12:00 PM (Lec), Sat 7:00 AM - 3:00 PM (Clinical)',
    room: 'Lecture Hall B / Rm 302',
    days: ['Thu', 'Fri', 'Sat'],
    time: '8:00 AM - 12:00 PM',
    type: 'Clinical'
  },
  {
    code: 'NCM 114',
    name: 'Care of Older Adults (Gerontological Nursing)',
    units: 2,
    instructor: 'Dr. Evelyn Santos, RN, PhD',
    schedule: 'Tue 1:00 PM - 3:00 PM',
    room: 'Lecture Hall C / Rm 205',
    days: ['Tue'],
    time: '1:00 PM - 3:00 PM',
    type: 'Lecture'
  },
  {
    code: 'NUPR 301',
    name: 'Nursing Research I',
    units: 3,
    instructor: 'Prof. Remedios Cruz, RN, MSN',
    schedule: 'Wed 3:30 PM - 6:30 PM',
    room: 'Nursing Computer Lab',
    days: ['Wed'],
    time: '3:30 PM - 6:30 PM',
    type: 'Laboratory'
  },
  {
    code: 'NCM 115',
    name: 'Nursing Informatics',
    units: 3,
    instructor: 'Engr. Nelson Tan, MIT',
    schedule: 'Mon 1:00 PM - 4:00 PM',
    room: 'IT Center Rm 102',
    days: ['Mon'],
    time: '1:00 PM - 4:00 PM',
    type: 'Laboratory'
  }
];

export const INITIAL_CLINICAL_DUTIES: ClinicalDuty[] = [
  {
    id: 'duty_01',
    hospital: 'Roxas Memorial Provincial Hospital (RMPH)',
    department: 'Emergency Room (ER) & Triage Unit',
    schedule: 'Wednesdays, 7:00 AM - 3:00 PM [Shift A]',
    hoursRequired: 120,
    hoursRendered: 60,
    supervisor: 'Prof. Clara Samson, RN, MAN',
    evaluation: 'Excellent patient triage, very responsive in high-stress resuscitations.',
    status: 'In Progress',
    lastWorkedDate: '2026-06-03'
  },
  {
    id: 'duty_02',
    hospital: 'Capiz Emmanuel Hospital (CEH)',
    department: 'Pediatric & Neonatal Intensive Care Unit',
    schedule: 'Saturdays, 7:00 AM - 3:00 PM [Shift B]',
    hoursRequired: 120,
    hoursRendered: 120,
    supervisor: 'Prof. Alejandro Reyes, RN, MN',
    evaluation: 'Highly empathetic. Demonstrated precise pediatric dosage calculations.',
    status: 'Completed',
    lastWorkedDate: '2026-05-30'
  },
  {
    id: 'duty_03',
    hospital: 'St. Anthony College Hospital (SACH)',
    department: 'Obstetrics & Delivery Room (DR)',
    schedule: 'Mondays & Tuesdays (Rotating Night Shifts)',
    hoursRequired: 120,
    hoursRendered: 0,
    supervisor: 'Prof. Evelyn Santos, RN, MSND',
    evaluation: 'Pending rotation. Pre-duty checklist in order.',
    status: 'Pending'
  }
];

export const INITIAL_GRADES: Grade[] = [
  {
    subjectCode: 'NCM 112',
    subjectName: 'Care of Clients with Problems in Oxygenation, Fluid and Electrolytes',
    units: 8,
    midterm: 1.75,
    final: 1.50,
    instructor: 'Prof. Clara Samson, RN, MAN'
  },
  {
    subjectCode: 'NCM 113',
    subjectName: 'Care of Clients with Problems in Inflammatory and Immunologic Response',
    units: 8,
    midterm: 1.80,
    final: null, // Still ongoing
    instructor: 'Prof. Alejandro Reyes, RN, MN'
  },
  {
    subjectCode: 'NCM 114',
    subjectName: 'Care of Older Adults (Gerontological)',
    units: 2,
    midterm: 1.50,
    final: 1.25,
    instructor: 'Dr. Evelyn Santos, RN, PhD'
  },
  {
    subjectCode: 'NUPR 301',
    subjectName: 'Nursing Research I',
    units: 3,
    midterm: 2.00,
    final: null,
    instructor: 'Prof. Remedios Cruz, RN, MSN'
  },
  {
    subjectCode: 'NCM 115',
    subjectName: 'Nursing Informatics',
    units: 3,
    midterm: 1.50,
    final: 1.50,
    instructor: 'Engr. Nelson Tan, MIT'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att_01',
    date: '2026-06-08',
    subjectCode: 'NCM 115',
    subjectName: 'Nursing Informatics',
    status: 'Present',
    time: '1:02 PM'
  },
  {
    id: 'att_02',
    date: '2026-06-05',
    subjectCode: 'NCM 113',
    subjectName: 'Care of Clients (Inflammatory)',
    status: 'Present',
    time: '7:55 AM'
  },
  {
    id: 'att_03',
    date: '2026-06-04',
    subjectCode: 'NCM 113',
    subjectName: 'Care of Clients (Inflammatory)',
    status: 'Present',
    time: '7:58 AM'
  },
  {
    id: 'att_04',
    date: '2026-06-03',
    subjectCode: 'NCM 112',
    subjectName: 'Care of Clients (Oxygenation - Clinical)',
    status: 'Present',
    time: '6:45 AM'
  },
  {
    id: 'att_05',
    date: '2026-06-02',
    subjectCode: 'NCM 112',
    subjectName: 'Care of Clients (Oxygenation)',
    status: 'Present',
    time: '8:01 AM'
  },
  {
    id: 'att_06',
    date: '2026-06-01',
    subjectCode: 'NCM 112',
    subjectName: 'Care of Clients (Oxygenation)',
    status: 'Absent',
    time: 'N/A'
  },
  {
    id: 'att_07',
    date: '2026-05-29',
    subjectCode: 'NCM 113',
    subjectName: 'Care of Clients (Inflammatory)',
    status: 'Present',
    time: '7:52 AM'
  },
  {
    id: 'att_08',
    date: '2026-05-28',
    subjectCode: 'NCM 113',
    subjectName: 'Care of Clients (Inflammatory)',
    status: 'Excused',
    time: 'Medical Cert.'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'Emergency Medical Mission & Bloodletting Volunteer Call',
    content: 'The Nursing Student Association is requesting BSN 3rd & 4th-year students to volunteer for the upcoming Barangay Tanque Health Outreach. Attendance here can be credited as equivalent Clinical Ward Duty make-up hours (8 hours total). Support our local community in Roxas City!',
    date: '2026-06-07',
    category: 'Emergency',
    urgent: true,
    author: 'Dean Leticia Alipao, PhD, RN'
  },
  {
    id: 'ann_02',
    title: 'Midterm Clinical Pinning and Cap Ceremony 2026',
    content: 'To all 3rd-year Nursing students: The Pins and Caps distribution details for the annual Pinning Ceremony have been posted. Location: CSJR Main Auditorium. Attire is strictly complete Institutional Gala Uniform with pristine white caps.',
    date: '2026-06-05',
    category: 'Event',
    urgent: false,
    author: 'Nursing Department Assembly'
  },
  {
    id: 'ann_03',
    title: 'Compliance Checklist: Hospital Immunization Clearances',
    content: 'STRICT REMINDER: All junior nursing students scheduled to enter Capiz Emmanuel Hospital (CEH) OB rotations must submit physical proofs of Hepatitis B Titers, Flu Shot vaccinations, and chest X-rays. Non-submission by June 12, 2026 results in withholding of clinical duty access card.',
    date: '2026-06-02',
    category: 'Clinical',
    urgent: true,
    author: 'Prof. Clara Samson (Clinical Coordinator)'
  },
  {
    id: 'ann_04',
    title: 'Release of Nursing Informatics Final Practical Exam Schedule',
    content: 'Details for hands-on Electronic Health Records (EHR) entry tests schedule are now official. Exams will proceed in the Main IT Facility. Bring your CSJR student credentials.',
    date: '2026-06-01',
    category: 'Academic',
    urgent: false,
    author: 'Engr. Nelson Tan'
  }
];

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'doc_01',
    name: 'Chest X-Ray Medical Clearance',
    type: 'Medical',
    description: 'Certified physical scan showing standard clear thorax report for Hospital Rotations.',
    status: 'Approved',
    downloadUrl: '#',
    uploadedAt: '2026-05-28',
    feedback: 'Clear and verified by Campus Physician.'
  },
  {
    id: 'doc_02',
    name: 'Hepatitis B Vaccination Proof',
    type: 'Medical',
    description: 'Full 3-dose certificate showing antibody titers above safety range.',
    status: 'Approved',
    downloadUrl: '#',
    uploadedAt: '2026-05-28'
  },
  {
    id: 'doc_03',
    name: 'RMPH Emergency Room Pre-Duty Case Journal',
    type: 'Duty',
    description: 'Initial Case compilation forms completed with nurse signatures.',
    status: 'Pending Review',
    downloadUrl: '#',
    uploadedAt: '2026-06-04',
    feedback: 'Awaiting Coordinator review for final credits.'
  },
  {
    id: 'doc_04',
    name: 'College Dean Clearance Form - First Semester',
    type: 'Clearance',
    description: 'General academic clearance indicating no financial and library deficits.',
    status: 'Not Submitted',
    downloadUrl: '#'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not_01',
    title: 'Document Approved!',
    message: 'Your Hepatitis B Vaccination Proof has been approved by the Health Office.',
    time: '2 hours ago',
    read: false,
    type: 'success'
  },
  {
    id: 'not_02',
    title: 'Action Required: Clinical Rotating Night Uniforms',
    message: 'Collect your duty night badges at the Medical Administration Room.',
    time: '1 day ago',
    read: false,
    type: 'warning'
  },
  {
    id: 'not_03',
    title: 'Exam Alert',
    message: 'Nursing Research I proposal draft deadline is on Friday at 5:00 PM.',
    time: '2 days ago',
    read: true,
    type: 'alert'
  }
];
