# PolJobHub — Professional CV & Career Suite for Poland & EU

**PolJobHub** is an executive-grade, modern CV, Cover Letter, and Candidate Card builder tailored specifically for the Polish and European Union labor markets. It provides ATS-compliant resumes, GDPR / RODO 2026 legal clauses, bilingual (Polish / English) support, and STAR-method AI enhancements.

---

## ✨ Features

- **10 Professional CV Templates**:
  - *Modern Polish Pro* (Polish market standard)
  - *Swiss Executive* (Corporate prestige)
  - *Clean ATS Minimal* (100% keyword parsing)
  - *Creative Tech* (Silicon Valley & IT engineering)
  - *Neo-Berlin* (Modernist contrast)
  - *Elegance Serif* (Law & Consulting)
  - *Euro Modern* (EU Schengen standard)
  - *Nordic Clean* (Scandinavian minimal)
  - *Academic Elite* (Research & Higher Ed)
  - *Dynamic Impact* (Sales & Leadership)

- **3 Document Formats in One Suite**:
  - **CV (A4)**: Complete curriculum vitae with customizable sections, CEFR language levels, UDT/Sanepid licenses, and projects.
  - **Cover Letter (A4)**: Formal Polish and European business cover letters.
  - **Candidate Dossier (One-Pager)**: Executive summary card designed for employment agencies and recruitment desks.

- **Strict Bilingual Support**:
  - Full interface and document support in **Polish (PL)** and **English (EN)**.

- **Polish Employment & Legal Compliance**:
  - Pre-configured, up-to-date Polish **RODO / GDPR 2026** recruitment consent clauses.
  - Work permit, PESEL, and labor code guidance.
  - Netto / Brutto salary calculator for employment contracts (Umowa o Pracę, B2B, Zlecenie).

- **AI-Powered Enhancements**:
  - **STAR Bullet Enhancer**: Transforms duties into Situation-Task-Action-Result quantified impact bullets using Google Gemini.
  - **Profile Summary Generator**: Generates concise, high-converting executive summaries.
  - **ATS Job Offer Matcher**: Scans and compares job postings with the candidate's CV to surface missing keywords.

- **Instant PDF Export & Backup**:
  - Pixel-perfect A4 printing stylesheet with page-break indicators.
  - JSON import and export for local offline backups.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Backend / Dev Server**: [Express](https://expressjs.com/), [Vite](https://vitejs.dev/), [TSX](https://github.com/privatenumber/tsx)
- **AI Engine**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Google Gemini Flash)

---

## 🔒 Privacy & Data Protection

- **Local-First Architecture**: Your CV and personal information are stored exclusively in your browser's `localStorage`. No candidate data, database records, or personal contact info are stored on any backend server.
- **AI Request Scope**: Candidate text is transmitted to the Google Gemini API solely and strictly when you click AI assistant buttons (e.g. "Napisz z AI" or "Popraw punkt z AI").
- **Legal Notice**: All guidance concerning Polish work eligibility, PESEL UKR, and RODO clauses is provided for educational and informational convenience and does not constitute formal legal counsel.

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Arbin848/poland-job-hub.git
cd poland-job-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY="your-api-key-here"
GEMINI_MODEL="gemini-2.5-flash"
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📄 License
Apache-2.0

