# Poland Job Hub - European Talent & Relocation Platform

A full-stack management portal and recruitment platform tailored for cross-border workforce supply in Poland, Germany, and the European Union.

## Key Features

1. **Public Website & Portals:**
   - **For Employers (B2B):** Dedicated workforce request desk for factories in Poland and staffing agencies in Germany.
   - **For Job Seekers:** High-converting application flow with a language competency gatekeeper (English, Hindi, Nepali).
   - **Legalization Desk:** Integrated intake for TRC / Karta Pobytu, Annex 1 changes, and visa appeals forwarded to partner law firms.
   - **Live Case Tracking:** Self-service reference code lookup (`PJH-1042`) so candidates can monitor their status 24/7 without repetitive inquiries.

2. **Management Command Center (Admin & Staff Portal):**
   - **Candidate Master Records & Document Vault:** Store passport scans, visas, Karta Pobytu, and certifications with expiry indicators.
   - **Market-Leading Branded CV Generator:** Export standardized, anonymized European-style candidate dossiers for employers.
   - **Recruitment Job Order Desk:** Track client hiring quotas and match candidates with one click.
   - **1-Click SMS & Email Communication Hub:** Dispatch updates and notifications directly to candidates.
   - **Law Firm Referral Pipeline:** Track legal cases and referral commission payouts.

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Structure
- `/app/page.tsx` - Public landing page & candidate tracker
- `/app/apply/page.tsx` - Candidate registration with language gatekeeper
- `/app/admin/page.tsx` - Staff and founder management dashboard
- `/types/index.ts` - TypeScript domain definitions
- `/lib/mockData.ts` - Seed data for candidates, job orders, and referrals
