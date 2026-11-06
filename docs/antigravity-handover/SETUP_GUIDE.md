# PolJobHub V5 — Antigravity Setup & Development Guide

## 1. Prerequisites
- **Node.js**: v18.0.0 or v20.x LTS recommended
- **npm**: v9+ or v10+ (or **Bun** v1.0+)
- **Git**: v2.34+
- **Chromium / Playwright** (optional, for running automated PDF raster regression tests)

## 2. Cloning the Repository
```bash
# Clone the repository
git clone https://github.com/Arbin848/poland-job-hub.git
cd poland-job-hub

# Checkout the Stage 3D branch
git checkout stage-3d-final-qa
```

## 3. Dependency Installation
```bash
npm install
```
*Note: If using Bun, run `bun install`.*

## 4. Environment Configuration
Copy the example environment file:
```bash
cp .env.example .env
```

Configure your environment variables in `.env`:
```env
# Gemini API Key for STAR resume enhancements (optional for offline preview)
GEMINI_API_KEY="your_google_gemini_api_key_here"

# Model selection (gemini-2.5-flash or gemini-3.8-flash recommended)
GEMINI_MODEL="gemini-2.5-flash"

# Application host URL (defaults to localhost:3000 in local development)
APP_URL="http://localhost:3000"
```

## 5. Running the Application
PolJobHub V5 uses a unified full-stack architecture where `server.ts` handles API routes and proxies Vite middleware in development:

```bash
# Start unified dev server (Express + Vite on Port 3000)
npm run dev
```

Open your browser at `http://localhost:3000`.

## 6. Running Verification & Test Scripts
```bash
# 1. Typecheck the codebase
npm run lint
# or: npx tsc --noEmit

# 2. Compile production build
npm run build

# 3. Run full Stage 3D Final QA Regression Suite (Requires Playwright)
node scripts/test_stage3d_final_qa.mjs
```

## 7. Useful NPM Scripts
- `npm run dev`: Starts Express server with Vite middleware on port 3000.
- `npm run build`: Bundles the client application with Vite into `dist/`.
- `npm run preview`: Serves the production build locally.
- `npm run lint`: Executes TypeScript typecheck validation.
