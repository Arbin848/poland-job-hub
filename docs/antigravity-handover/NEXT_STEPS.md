# PolJobHub V5 — Antigravity Development Priorities & Next Steps

## 1. Handover Context
Stage 3D successfully completed all design, editor synchronization, 10-template A4 PDF formatting, and candidate privacy requirements. The repository is ready for feature iteration, private beta testing, and production deployment preparation inside Google Antigravity.

## 2. Immediate Recommended Tasks in Antigravity

### Priority 1: Private Beta Launch Preparation
- [ ] **Candidate Feedback Loop**: Implement an opt-in, anonymous feedback modal or survey trigger after successful PDF download.
- [ ] **Preset Expansion**: Add 3 additional industry presets in `src/data/presets.ts` (e.g. Healthcare/Nursing in Poland, Construction/Engineering, Finance/Audit).
- [ ] **Code Splitting Optimization**: Introduce `React.lazy()` for modal heavyweights (Three.js 3D Showcase, ATS Analyzer, Europass Comparison) to bring client initial bundle size below 400 kB.

### Priority 2: Advanced Export Capabilities
- [ ] **Direct Vector PDF Download via Serverless**: While native `window.print()` delivers pixel-perfect vector A4 PDFs without server costs, consider adding an optional backend headless Chromium PDF export endpoint for mobile users where browser print dialogs vary by OS.
- [ ] **DOCX Export**: Implement an ATS-friendly `.docx` export option using `docx` npm library for agencies requesting editable Word documents.

### Priority 3: Production Hardening
- [ ] **CSP Headers**: Finalize Content Security Policy (CSP) headers in `server.ts` for production reverse-proxy deployments.
- [ ] **Rate Limiting on AI Proxy**: Ensure `express-rate-limit` is tuned for the Gemini proxy endpoints (`/api/ai/*`) to prevent quota exhaustion.
- [ ] **Continuous Integration**: Add GitHub Actions workflow (`.github/workflows/ci.yml`) to run `npm run lint`, `npm run build`, and regression tests on pull requests.

## 3. Safe Deployment Checklist
- [ ] Never persist unencrypted candidate data on the backend.
- [ ] Ensure all candidate legal declarations maintain the voluntary Art. 22¹ KP disclaimer.
- [ ] Verify that Google Gemini API keys are only consumed server-side via environment variables.
- [ ] Test cross-browser PDF generation on Safari iOS, Android Chrome, and Desktop Chrome/Edge before public release.
