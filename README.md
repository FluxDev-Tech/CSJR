# CSJR-NSMS: Nursing Student Management System
### College of St. John Roxas • College of Nursing

[![React](https://img.shields.io/badge/React-18%2B-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4%2B-06B6D4?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0%2B-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-084C35)](LICENSE)

A modern, high-craft, and fully responsive **Nursing Student Management System (NSMS)** built for the **College of St. John Roxas (CSJR) - College of Nursing** in Roxas City, Capiz, Philippines. Designed specifically to streamline clinical duty logging, CHED-standard GWA calculations, academic schedules, hospital rotation evaluations, and digital pre-clearance requirements for Bachelor of Science in Nursing (BSN) students and faculty.

---

## 🌟 Key Features

### 1. 📊 Interactive Academic Dashboard
- **Real-Time Semestral Metrics**: Instant overview of enrolled subjects, credit units, current semestral weighted GWA, attendance ratio, and pending pre-rotational requirements.
- **Clinical Duty Radial Meter**: Live SVG progress dial rendering total rendered vs. required hospital shift hours.
- **Academic Advisor Bulletins**: High-priority advisory banners for hospital deployment clearances and clinical rotation deadlines.

### 2. 📅 Comprehensive Schedules & Rotations
- **Responsive Weekly Timetable**: Adaptive calendar with a 6-column grid on desktop/tablets and an interactive single-day selector on mobile devices.
- **Clinical Duty Roster**: Hospital assignment breakdown with shifts at partner institutions (e.g., Roxas Memorial Provincial Hospital, Capiz Emmanuel Hospital).
- **Laboratory & Skills Roster**: Clinical simulation lab timings, room numbers, and equipment reservation notes.

### 3. 🎓 Philippine GWA Calculator & Honors Target Planner
- **Standard Philippine Grading System**: Inverted 1.00 (Highest) to 5.00 (Failed) grading scale compliant with CHED guidelines.
- **Visual GPA Trend Analytics**: Animated Recharts cumulative GPA progression line comparing actual performance with predictive trajectories.
- **Honors Target Calculator**: Real-time algorithm calculating the exact average grade needed in ongoing units to achieve *President's Lister* ($\le 1.25$), *Dean's Lister Magna* ($\le 1.50$), or *Dean's Lister Cum Laude* ($\le 1.75$) standing.
- **Interactive What-If Grade Simulator**: Real-time slider and dropdown controls to estimate semestral outcomes before finals are encoded.

### 4. 🏥 Clinical Duty & Case Logbook
- **Shift Logger**: Digital case simulation and clinical duty hour submission with ward remarks and timestamping.
- **Hospital Supervisor Ledger**: Detailed clinical coordinator evaluations, rotation supervisor credentials, and competency assessments.

### 5. ⏱️ Biometric Attendance Registers
- **EHR-Style Punch Logs**: Daily electronic attendance records with course timestamps.
- **Status Filtering**: Instant filtering by *Present*, *Absent*, or *Excused* leaves with an overall integrity ratio widget.

### 6. 📑 Document Clearance & Requirement Vault
- **Official Campus Templates**: Direct download for physical diagnostic forms, Hepatitis B titer records, case logbooks, and clearance sheets.
- **Drag-and-Drop Submissions**: Simulated upload interface with document classification, coordinator feedback tracking, and approval stamps.

### 7. 🪪 Verified Student Digital QR Badge
- **Electronic ID Badge**: Instant modal popover rendering the student's clinical ID, course year, blood type, and scannable institutional QR payload for turnstile/hospital ward check-ins.

### 8. 🔍 Navigation & Productivity Tools
- **Global Command Palette (`⌘K` / `Ctrl+K`)**: Rapid search across modules, schedules, grades, and campus notices.
- **Notification Drawer**: Filterable system alerts categorized by informational, warning, and urgent releases.
- **Theme Customizer**: Built-in Dark Mode and High-Contrast eye-care settings for late-night clinical duty charting.

---

## 🛠️ Technology Stack

- **Frontend Core**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Motion (`motion/react`)](https://motion.dev/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```text
├── src/
│   ├── assets/
│   │   └── images/              # Campus branding & hero visual assets
│   ├── components/
│   │   ├── AnnouncementsView.tsx # Campus bulletin board & emergency alerts
│   │   ├── AttendanceView.tsx   # EHR dial-in attendance tracker & stats
│   │   ├── CampusLogo.tsx       # Vector institutional crest component
│   │   ├── ClinicalDutyView.tsx # Hospital shift logger & appraisal cards
│   │   ├── DashboardView.tsx    # Primary portal hub & radial duty meter
│   │   ├── DocumentsView.tsx    # Clearance vault & file upload interface
│   │   ├── GradesView.tsx       # GWA calculator, Recharts trend & honors target
│   │   ├── HomeView.tsx         # Responsive public website & hero landing
│   │   ├── LoginView.tsx        # Multi-role authentication & recovery modal
│   │   ├── PortalShell.tsx      # Collapsible sidebar, topbar & bottom dock
│   │   ├── ProfileView.tsx      # Emergency bio-check & personal credentials
│   │   ├── ScheduleView.tsx     # Adaptive weekly timetable & clinical rota
│   │   ├── SettingsView.tsx     # Security credentials & dark mode toggles
│   │   └── SubjectsView.tsx     # Course curriculum directory & search filters
│   ├── App.tsx                  # Core state controller & view router
│   ├── index.css                # Global stylesheet & Tailwind directives
│   ├── main.tsx                 # Application DOM entrypoint
│   └── types.ts                 # TypeScript data contracts & interfaces
├── metadata.json                # Platform configuration & metadata
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
└── vite.config.ts               # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/csjr-nursing-management.git
   cd csjr-nursing-management
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3000` to view the live application.

---

## 🧑‍💻 Build & Deployment

To compile the application for production:

```bash
npm run build
```

This builds the static bundle inside the `dist/` directory, optimized and ready for deployment on any modern web host or containerized service (e.g., Cloud Run, Vercel, Netlify).

To run type checking and linting:

```bash
npm run lint
```

---

## 📋 Standard Demo Credentials

For demonstration and prototype review, the system includes quick-fill role presets:

| Role | Demo Email | Password |
| :--- | :--- | :--- |
| **Student (Junior Intern)** | `johnlawrencemartinez05@gmail.com` | `csjr1956` |
| **Faculty / Clinical Instructor** | `clara.samson@csjr.edu.ph` | `csjr1956` |
| **Dean / Administrator** | `admin.nursing@csjr.edu.ph` | `csjr1956` |

---

## 🏛️ About College of St. John Roxas

The **College of St. John Roxas (CSJR)** is an esteemed higher education institution located in Roxas City, Capiz, Philippines. Its **College of Nursing** is dedicated to fostering compassionate, competent, and ethical healthcare professionals adhering to the highest standards of international and Philippine nursing education (CHED / PRC).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
