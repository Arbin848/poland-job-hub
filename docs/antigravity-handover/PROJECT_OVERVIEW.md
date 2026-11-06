# PolJobHub V5 — Project Overview & Handover to Google Antigravity

## 1. Vision & Purpose
**PolJobHub V5** is a production-grade, local-first CV builder and career enablement platform engineered specifically for the job market in Poland. It bridges international professionals, Ukrainian refugees, and local Polish candidates with compliant, high-scoring ATS resumes, legal Polish recruitment clauses (RODO/GDPR), and bilingual European career standards.

## 2. Core Value Proposition
- **Polish Job Market Compliance**: Native Art. 22¹ Kodeks Pracy work authorization self-declarations, automatic RODO recruitment consent generator (current and future recruitments), and PESEL UKR status guidance.
- **Dual Editing Paradigms**:
  1. *V5 Guided Career Editor*: Step-by-step 4-phase wizard designed for focus, mobile ergonomics, and zero data loss.
  2. *Advanced Studio Editor*: Live multi-panel reactive workspace with real-time A4 typography scaling, instant color palettes, and deep section toggle controls.
- **10 Certified ATS Templates**: Designed to match top global CV standards (Zety, Europass, Harvard/Oxford, Swiss Executive, Bauhaus, Dev Terminal) with guaranteed 100% text extraction and zero trailing blank pages on A4 export.
- **Ethical AI Career Writing**: Integrated Google Gemini API using STAR methodology (Situation, Task, Action, Result) with explicit candidate accept/reject safeguards—never silently modifying candidate text.
- **Privacy & Local-First Security**: 100% of candidate data is saved client-side in sanitized browser storage (`localStorage`). No private candidate data or PII is persisted on backend databases.

## 3. Technology Stack
- **Frontend Core**: React 18, TypeScript 5, Vite 6
- **Styling & Design System**: Tailwind CSS v4, Lucide React iconography, custom A4 print media queries (`@media print`)
- **Backend & API Server**: Node.js, Express, TSX proxy runtime (`server.ts`)
- **AI Integration**: `@google/genai` TypeScript SDK (using `gemini-2.5-flash` / `gemini-3.8-flash` aliases)
- **PDF & Canvas Export**: Native browser vector print engine (`window.print()`), Chromium Headless print-to-PDF, Ghostscript A4 rasterization testing
- **Test Harness**: Playwright test suite for automated E2E user journeys, viewport overflow audits (390px, 768px, 1440px), and PDF text-layer completeness verification

## 4. Completed Development Stages
- **Stage 1 & 2**: Prototype foundations, Europass and ATS benchmarks, design tokens.
- **Stage 3A (V5 Signature & Homepage)**: Premium responsive landing page, interactive template showcase, and mobile navigation sheets.
- **Stage 3B (Guided CV Editor)**: 4-phase structured editor with step-level validation, live preview synchronization, and error boundaries.
- **Stage 3C (10 CV Templates & Multipage A4 Improvements)**: 18/18 skill text layer verification, CEFR language matrices, and elimination of test-only listeners.
- **Stage 3D (Final QA & Modern Polish Layout Balance)**: Resolved Modern Polish multi-page layout balance, guaranteed continuous full-bleed sidebar background on Page 2, eliminated trailing blank pages across all 10 templates, and verified 100% Polish diacritics retention.
