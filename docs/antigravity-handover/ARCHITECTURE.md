# PolJobHub V5 — System Architecture

## 1. High-Level Architecture
PolJobHub V5 operates on a **Local-First, Privacy-Preserving Client Architecture** paired with a lightweight Node.js/Express server runtime for Gemini AI proxying and SSR/middleware support:

```
[ Browser Client ]
  ├── LocalStorage ('polcv_studio_cv_data_v1')
  ├── Router Hash State (#/, #/editor, #/guided-editor, #/templates)
  ├── UI Layers
  │     ├── V5 Signature Homepage (Landing & Hero Showcase)
  │     ├── V5 Guided Career Editor (4-Phase Wizard)
  │     ├── Advanced Studio Editor (3-Panel Live Canvas)
  │     └── 10 Certified A4 Templates (Vector CSS Print)
  └── Services
        ├── aiService (STAR bullet refinement)
        ├── sanitizeCv (Schema migration & resilience)
        └── downloadEvidenceZip (Verification package retrieval)
       │
       ▼ (HTTP /api/*)
[ Express Server (server.ts) ]
  ├── Vite Middlewares (Dev Mode) / Static Static Files (Prod)
  ├── POST /api/ai/enhance-bullet (STAR Action Verbs)
  └── POST /api/ai/ats-match (Keywords & Gap Analysis)
       │
       ▼
[ Google Gemini API (@google/genai) ]
```

## 2. CV Data Model & Persistence
All candidate state is typed in `src/types/cv.ts` under the `CVData` interface:
- **`personalInfo`**: Full name, contact channels, location, driving license, work authorization status (`workEligibility`), photo toggle, and QR code URL.
- **`experiences`**: Array of `ExperienceItem` (`id`, `role`, `company`, `location`, `startDate`, `endDate`, `current`, `bullets`).
- **`educations`**: Array of `EducationItem` (`degree`, `institution`, `faculty`, `fieldOfStudy`, `dates`, `gradeOrDetails`).
- **`technicalSkills` & `toolsAndCertificates`**: Categorized arrays with CEFR ratings and progress metrics.
- **`languages`**: Array of `LanguageItem` (`language`, `level: CefrLevel`, `details`).
- **`certifications` & `projects`**: Professional licenses (UDT, SEP, ISO) and portfolio projects with tech stack tags.
- **`rodo`**: Polish GDPR recruitment clause (`enabled`, `type: 'current' | 'future'`, `text`).
- **Data Persistence**: Managed through `localStorage.getItem('polcv_studio_cv_data_v1')` wrapped by `sanitizeCVData()`. Malformed or partial states automatically merge with `DEFAULT_CV` presets to prevent runtime crashes.

## 3. Template System & A4 Multi-page Pagination
Templates are located in `src/components/CVPreview/templates/`:
1. `ModernPolishTemplate.tsx` (Zety Cascade Dual Column with continuous sidebar)
2. `SwissExecutiveTemplate.tsx` (Sapphire Luxury Executive)
3. `DynamicImpactTemplate.tsx` (Editorial Contrast)
4. `AcademicEliteTemplate.tsx` (Classical Harvard/Oxford)
5. `NordicCleanTemplate.tsx` (Minimalist Grid)
6. `EleganceSerifTemplate.tsx` (Prestige Typography)
7. `EuroModernTemplate.tsx` (Europass Modernized)
8. `BerlinMinimalTemplate.tsx` (Bauhaus Monochrome)
9. `CreativeTechTemplate.tsx` (Developer Terminal)
10. `CleanAtsTemplate.tsx` (High-Scoring Single Column)

### Multi-page Pagination Principles:
- Container dimensions strictly adhere to 210mm x 297mm (A4 ratio).
- Individual experience and project items are wrapped in `break-inside-avoid` to eliminate orphan headers.
- Multi-page column synchronization uses `linear-gradient` containers to ensure background bars continue seamlessly across Page 1 and Page 2.
- Print media styling is governed by `src/index.css` under `@media print`.

## 4. AI Writing & Ethics Guardrails
- Implemented in `src/services/aiService.ts` and `server.ts`.
- Structured prompts guide the model to output STAR-grounded bullet points with strong Polish action verbs (*Wdrożył, Zoptymalizował, Zredukował, Skoordynował*).
- **Mandatory Guardrail**: AI suggestions are returned to an interactive suggestion card with explicit "Akceptuj" (Accept) and "Odrzuć" (Discard) buttons. AI code never mutates candidate text without explicit user approval.
