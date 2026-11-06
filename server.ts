import express from 'express';
import type { Request, Response } from 'express';
import http from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import rateLimit from 'express-rate-limit';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const rawModel = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const GEMINI_MODEL = rawModel.includes('2.5') ? 'gemini-3.8-flash' : rawModel;

// JSON body limits: 5mb for large CV text import, 1mb for all other endpoints
app.use('/api/ai/parse-existing-cv', express.json({ limit: '5mb' }));
app.use(express.json({ limit: '1mb' }));

// Rate limiter for AI generation endpoints (20 requests per 15 min per IP)
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many AI requests from this IP. Please try again in a few minutes.',
    fallback: true
  }
});

app.use('/api/ai', aiRateLimiter);

// Initialize Google GenAI if key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.warn('Failed to initialize Google GenAI with provided key:', err);
  }
}

async function generateWithTimeout(
  prompt: string,
  timeoutMs = 4000,
  extraConfig?: Record<string, any>
) {
  if (!aiClient) return null;
  const generatePromise = aiClient.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    ...(extraConfig ? { config: extraConfig } : {}),
  });
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('AI request timed out')), timeoutMs)
  );
  return Promise.race([generatePromise, timeoutPromise]);
}

// Health check & Gemini advisor verification endpoints
app.all(['/api/health', '/api/gemini/advisor'], (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    aiAvailable: !!aiClient,
    model: GEMINI_MODEL,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Explicit download endpoints with Content-Disposition attachment for reliable browser downloads
app.get(['/PolJobHub_Stage3A_Visual_Acceptance.zip', '/api/download/stage3a-zip'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3A_Visual_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="PolJobHub_Stage3A_Visual_Acceptance.zip"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3A Visual Acceptance ZIP not found');
});

app.get(['/PolJobHub_Stage3B_Guided_Editor_Acceptance.zip', '/api/download/stage3b-zip', '/download/stage3b-zip'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3B_Guided_Editor_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="PolJobHub_Stage3B_Guided_Editor_Acceptance.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3B Guided Editor Acceptance ZIP not found');
});

app.get(['/PolJobHub_Stage3C_Multipage_A4_Acceptance.zip', '/api/download/stage3c-zip', '/download/stage3c-zip'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3C_Multipage_A4_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="PolJobHub_Stage3C_Multipage_A4_Acceptance.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3C Multipage A4 Acceptance ZIP not found');
});

// JSON Base64 fallback for browsers/iframes restricting binary downloads
app.get('/api/download/stage3c-zip-base64', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3C_Multipage_A4_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return res.json({
      filename: 'PolJobHub_Stage3C_Multipage_A4_Acceptance.zip',
      size: fileBuffer.length,
      mimeType: 'application/zip',
      base64: fileBuffer.toString('base64')
    });
  }
  res.status(404).json({ error: 'Stage 3C ZIP not found' });
});

app.get(['/PolJobHub_Stage3D_Final_QA_Acceptance.zip', '/api/download/stage3d-zip', '/download/stage3d-zip'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3D_Final_QA_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="PolJobHub_Stage3D_Final_QA_Acceptance.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3D Final QA Acceptance ZIP not found');
});

app.get('/api/download/stage3d-zip-base64', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'PolJobHub_Stage3D_Final_QA_Acceptance.zip');
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return res.json({
      filename: 'PolJobHub_Stage3D_Final_QA_Acceptance.zip',
      size: fileBuffer.length,
      mimeType: 'application/zip',
      base64: fileBuffer.toString('base64')
    });
  }
  res.status(404).json({ error: 'Stage 3D ZIP not found' });
});

app.get(['/poljobhub_v5_repo.bundle', '/api/download/git-bundle', '/download/git-bundle'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_v5_repo.bundle');
  if (!fs.existsSync(filePath)) {
    try {
      const { execSync } = require('child_process');
      execSync('git bundle create public/poljobhub_v5_repo.bundle --all', { cwd: __dirname });
    } catch (err) {
      console.error('Auto-generation of git bundle failed:', err);
    }
  }
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="poljobhub_v5_repo.bundle"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(500).send('Git bundle could not be found or generated');
});

app.get(['/poljobhub_v5_source.zip', '/api/download/source-zip', '/download/source-zip'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_v5_source.zip');
  if (!fs.existsSync(filePath)) {
    try {
      const { execSync } = require('child_process');
      execSync(`python3 -c "import zipfile, os
with zipfile.ZipFile('public/poljobhub_v5_source.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for folder in ['src', 'docs', 'scripts']:
        for root, _, files in os.walk(folder):
            for f in files:
                p = os.path.join(root, f)
                z.write(p)
    for f in ['index.html', 'package.json', 'tsconfig.json', 'vite.config.ts', 'server.ts', 'README.md', '.env.example']:
        if os.path.exists(f):
            z.write(f)
"`, { cwd: __dirname });
    } catch (err) {
      console.error('Auto-generation of source zip failed:', err);
    }
  }
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="poljobhub_v5_source.zip"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(500).send('Source zip could not be found or generated');
});

app.get('/api/download/source-zip-base64', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_v5_source.zip');
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return res.json({
      filename: 'poljobhub_v5_source.zip',
      size: fileBuffer.length,
      mimeType: 'application/zip',
      base64: fileBuffer.toString('base64')
    });
  }
  res.status(404).json({ error: 'Source zip not found' });
});

app.get(['/poljobhub_v5_stage3d.patch', '/api/download/git-patch', '/download/git-patch'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_v5_stage3d.patch');
  if (!fs.existsSync(filePath)) {
    try {
      const { execSync } = require('child_process');
      execSync('git diff origin/main...stage-3d-final-qa > public/poljobhub_v5_stage3d.patch', { cwd: __dirname });
    } catch (err) {
      console.error('Auto-generation of git patch failed:', err);
    }
  }
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/x-diff; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="poljobhub_v5_stage3d.patch"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(500).send('Git patch could not be found or generated');
});

app.get('/api/download/git-patch-base64', (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_v5_stage3d.patch');
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return res.json({
      filename: 'poljobhub_v5_stage3d.patch',
      size: fileBuffer.length,
      mimeType: 'text/x-diff',
      base64: fileBuffer.toString('base64')
    });
  }
  res.status(404).json({ error: 'Git patch not found' });
});

app.get(['/evidence/poljobhub_stage3a_pre_backup.tar.gz', '/api/download/stage3a-backup'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'evidence', 'poljobhub_stage3a_pre_backup.tar.gz');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', 'attachment; filename="poljobhub_stage3a_pre_backup.tar.gz"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3A Backup archive not found');
});

app.get(['/poljobhub_stage3a_final_checkpoint.tar.gz', '/api/download/stage3a-checkpoint'], (req: Request, res: Response) => {
  const filePath = path.resolve(__dirname, 'public', 'poljobhub_stage3a_final_checkpoint.tar.gz');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/gzip');
    res.setHeader('Content-Disposition', 'attachment; filename="poljobhub_stage3a_final_checkpoint.tar.gz"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');
    return res.sendFile(filePath);
  }
  res.status(404).send('Stage 3A Checkpoint backup archive not found');
});

// Endpoint: AI Bullet Point Enhancer (STAR method)
app.post('/api/ai/enhance-bullet', async (req: Request, res: Response) => {
  const { duty, jobTitle, industry, language = 'pl' } = req.body;
  if (!duty || typeof duty !== 'string') {
    return res.status(400).json({ error: 'Missing duty text' });
  }

  if (aiClient) {
    try {
      const prompt = `You are a premier senior executive recruitment consultant in Poland and Europe.
Transform the following raw resume bullet point into 3 high-impact, professional resume bullet points.
Use the STAR method (Situation, Task, Action, Result) with strong action verbs.
CRITICAL INTEGRITY RULE: NEVER invent fake percentages, monetary numbers, or numerical achievements that the candidate has not supplied. Always prompt the candidate with a placeholder like [uzupełnij mierzalny wynik: % / czas] so they supply their authentic results.
Target Job Title: "${jobTitle || 'Professional'}"
Industry / Faculty: "${industry || 'General'}"
Language: ${language === 'pl' ? 'Polish (Polski)' : 'English'}

Raw input duty: "${duty}"

Output format: Return STRICTLY a valid JSON array of 3 strings, e.g.:
["Bullet 1", "Bullet 2", "Bullet 3"]
No markdown fences, no explanations.`;

      const response = await generateWithTimeout(prompt);
      if (!response) throw new Error('No AI response');

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return res.json({ bullets: parsed });
      }
    } catch (err: any) {
      console.log('AI bullet generation notice: using fallback heuristic.', err?.message || '');
    }
  }

  // Fallback heuristics if AI key is missing or call failed
  const isPl = language === 'pl';
  const clean = duty.trim();
  const fallbackBullets = isPl ? [
    `Optymalizacja procesów w obszarze: ${clean}, co przełożyło się na wzrost efektywności operacyjnej [uzupełnij mierzalny wynik, np. % / czas / koszt].`,
    `Samodzielna koordynacja zadań związanych z: ${clean}, zgodnie z obowiązującymi standardami jakości i procedurami firmy.`,
    `Skuteczna realizacja kluczowych celów projektowych (${clean}) we współpracy z zespołem multidyscyplinarnym.`
  ] : [
    `Streamlined operations regarding ${clean}, boosting team efficiency by [add a measurable result, e.g. % / time / cost].`,
    `Independently coordinated core responsibilities in ${clean}, maintaining strict compliance with quality benchmarks.`,
    `Successfully executed targeted milestones involving ${clean} in cross-functional collaboration.`
  ];

  res.json({ bullets: fallbackBullets, fallback: true });
});

// Endpoint: AI Professional Summary Writer
app.post('/api/ai/generate-summary', async (req: Request, res: Response) => {
  const { jobTitle, yearsOfExperience, faculty, skills, language = 'pl' } = req.body;

  if (aiClient) {
    try {
      const prompt = `You are an elite career coach and recruitment director in Poland.
Write a punchy, ultra-professional 2-to-3 sentence executive profile summary for a resume/CV.
It must stand out in European recruitment (especially Polish job market: Pracuj.pl, LinkedIn, direct recruiters).
Do NOT sound like generic robotic fluff. Be specific, credible, and results-focused.

Details:
- Role / Target Title: ${jobTitle || 'Professional'}
- Experience: ${yearsOfExperience || '3+ years'}
- Field / Faculty: ${faculty || 'Industry'}
- Core Skills / Focus: ${Array.isArray(skills) ? skills.join(', ') : skills || 'Operations, problem-solving, team delivery'}
- Language: ${language === 'pl' ? 'Polish (Polski)' : 'English'}

Output format: Return ONLY the summary paragraph as plain text (no quotes, no title, no markdown).`;

      const response = await generateWithTimeout(prompt);
      if (!response) throw new Error('No AI response');

      const summary = response.text?.trim() || '';
      if (summary) {
        return res.json({ summary });
      }
    } catch (err) {
      console.warn('AI summary error, falling back:', err);
    }
  }

  // Fallback template
  const isPl = language === 'pl';
  const fallbackSummary = isPl
    ? `Doświadczony ${jobTitle || 'specjalista'} z ponad ${yearsOfExperience || 'wieloletnim'} stażem w branży ${faculty || 'nowoczesnych usług'}. Wyróżnia się praktyczną znajomością kluczowych narzędzi i metodologii, ukierunkowany na podnoszenie efektywności oraz osiąganie mierzalnych rezultatów biznesowych. Gotowy do wniesienia wartości dodanej w dynamicznym środowisku pracy.`
    : `Accomplished ${jobTitle || 'professional'} with proven track record in ${faculty || 'the industry'}. Demonstrates deep proficiency in core operational methodologies and high-standard execution. Driven by continuous improvement, structured problem-solving, and delivering tangible results in demanding professional environments.`;

  res.json({ summary: fallbackSummary, fallback: true });
});

// Endpoint: Job Description Keyword Matcher & ATS Gap Analysis
app.post('/api/ai/match-job', async (req: Request, res: Response) => {
  const { jobDescription, cvText, language = 'pl' } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ error: 'Missing job description' });
  }

  if (aiClient && cvText) {
    try {
      const prompt = `You are an ATS (Applicant Tracking System) algorithm expert and recruitment specialist for Polish and EU markets.
Analyze how well this candidate's CV matches the posted job offer.

Job Description:
"""
${jobDescription.slice(0, 3000)}
"""

Candidate CV Text / Skills:
"""
${(cvText || '').slice(0, 3000)}
"""

Return STRICTLY a JSON object with this exact structure:
{
  "matchScore": 78,
  "summary": "Brief 1-2 sentence verdict",
  "matchedKeywords": ["keyword1", "keyword2", "keyword3"],
  "missingKeywords": ["missing1", "missing2", "missing3"],
  "recommendations": ["Concrete tip 1", "Concrete tip 2", "Concrete tip 3"]
}
Keep language in ${language === 'pl' ? 'Polish' : 'English'}. No markdown code blocks, pure JSON.`;

      const response = await generateWithTimeout(prompt);
      if (!response) throw new Error('No AI response');

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    } catch (err) {
      console.warn('AI job matching error, falling back:', err);
    }
  }

  // Smart heuristic keyword extractor
  const textWords = (cvText || '').toLowerCase();
  const jdWords = jobDescription.toLowerCase();
  const candidateKeywords = [
    'angielski', 'english', 'zarządzanie', 'management', 'excel', 'komunikacja',
    'analiza', 'sql', 'python', 'sprzedaż', 'sales', 'logistyka', 'erp', 'sap',
    'obsługa klienta', 'customer service', 'optymalizacja', 'projekty', 'scrum',
    'wms', 'prawo jazdy', 'udt', 'rodo', 'haccp', 'autocad', 'reporting'
  ];

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of candidateKeywords) {
    if (jdWords.includes(kw)) {
      if (textWords.includes(kw)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    }
  }

  const score = Math.min(95, Math.max(45, Math.round((matched.length / Math.max(1, matched.length + missing.length)) * 100)));

  res.json({
    matchScore: score,
    summary: language === 'pl'
      ? `Twój profil pokrywa kluczowe wymagania oferty w ${score}%. Dodanie brakujących słów kluczowych znacząco zwiększy szanse przejścia filtrów ATS.`
      : `Your profile matches key job requirements at ${score}%. Adding targeted keywords will significantly improve ATS filtration pass rate.`,
    matchedKeywords: matched.slice(0, 6),
    missingKeywords: missing.slice(0, 6),
    recommendations: language === 'pl' ? [
      'Uwzględnij wymienione brakujące słowa kluczowe w sekcji Umiejętności lub w opisach stanowisk.',
      'Dostosuj tytuł profilu dokładnie do nazwy stanowiska w ogłoszeniu.',
      'Upewnij się, że klauzula RODO jest dołączona na dole CV (wymóg formalny w Polsce).'
    ] : [
      'Incorporate identified missing keywords into your Skills section or experience bullet points.',
      'Align your professional title with the exact title in the job posting.',
      'Ensure the Polish GDPR (RODO) consent clause is appended at the bottom if applying in Poland.'
    ],
    fallback: true
  });
});

// Endpoint: AI Cover Letter Generator (List Motywacyjny)
app.post('/api/ai/generate-cover-letter', async (req: Request, res: Response) => {
  const { candidateName, jobTitle, companyName, companyAddress, jobDescription, tone = 'formal', language = 'pl' } = req.body;

  if (aiClient) {
    try {
      const prompt = `You are an elite executive career strategist in Poland.
Write a highly convincing, structured 3-paragraph Cover Letter (List Motywacyjny) for a job application in Poland/Europe.
It must sound natural, professional, and directly address the employer's operational needs.

Details:
- Candidate Name: ${candidateName || 'Kandydat'}
- Target Role: ${jobTitle || 'Specjalista'}
- Company: ${companyName || 'Szanowny Pracodawca'}
- Address: ${companyAddress || 'Warszawa, Polska'}
- Job details: ${jobDescription || 'Standard recruitment'}
- Tone: ${tone}
- Language: ${language === 'pl' ? 'Polish' : 'English'}

Output format: Return STRICTLY a JSON object with this format:
{
  "subject": "Dotyczy: Aplikacja na stanowisko...",
  "salutation": "Szanowni Państwo,",
  "paragraphs": [
    "Paragraph 1 (Introduction & strong hook)",
    "Paragraph 2 (Relevant achievements, hard competencies & proof of value)",
    "Paragraph 3 (Why this company & call to action for an interview)"
  ],
  "signOff": "Z poważaniem,"
}
No markdown blocks, pure JSON.`;

      const response = await generateWithTimeout(prompt);
      if (!response) throw new Error('No AI response');

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    } catch (err) {
      console.warn('AI cover letter error, using fallback:', err);
    }
  }

  // Fallback Cover Letter
  const isPl = language === 'pl';
  res.json({
    subject: isPl ? `Aplikacja na stanowisko: ${jobTitle || 'Specjalista'}` : `Application for the position of ${jobTitle || 'Professional'}`,
    salutation: isPl ? 'Szanowni Państwo,' : 'Dear Hiring Team,',
    paragraphs: isPl ? [
      `W odpowiedzi na ogłoszenie rekrutacyjne z wielkim zainteresowaniem zgłaszam swoją kandydaturę na stanowisko ${jobTitle || 'Specjalisty'} w firmie ${companyName || 'Państwa Przedsiębiorstwie'}. Moje dotychczasowe doświadczenie oraz zdobyte kwalifikacje bezpośrednio odpowiadają profilowi poszukiwanego pracownika.`,
      `W trakcie dotychczasowej kariery z sukcesem realizowałem kluczowe zadania operacyjne, dbając o najwyższe standardy jakości, terminowość oraz optymalizację procesów. Posiadam praktyczną znajomość narzędzi branżowych oraz umiejętność szybkiego reagowania na zmienne warunki rynkowe, co pozwala mi osiągać założone cele biznesowe.`,
      `Jestem przekonany, że moje zaangażowanie i kompetencje przyniosą wymierną wartość dodaną Państwa zespołowi. Z przyjemnością spotkam się na rozmowie kwalifikacyjnej, aby szczegółowo omówić, w jaki sposób mogę wesprzeć dalszy rozwój firmy ${companyName || ''}.`
    ] : [
      `I am writing to express my strong interest in the ${jobTitle || 'Specialist'} position currently open at ${companyName || 'your esteemed organization'}. With proven expertise and targeted technical proficiencies, I am confident in my capacity to contribute immediately to your team.`,
      `Throughout my professional track record, I have consistently spearheaded key operational milestones while maintaining rigorous standards of quality and efficiency. My hands-on familiarity with core industry tools allows me to resolve complex operational bottlenecks and generate measurable outcomes.`,
      `I welcome the opportunity to discuss how my qualifications align with your organizational goals in an interview. Thank you for your time and consideration.`
    ],
    signOff: isPl ? 'Z poważaniem,' : 'Sincerely,',
    fallback: true
  });
});

// Endpoint: Parse Old CV / Europass Text into Structured JSON
app.post('/api/ai/parse-existing-cv', async (req: Request, res: Response) => {
  const { rawText, language = 'pl' } = req.body;
  if (!rawText || typeof rawText !== 'string') {
    return res.status(400).json({ error: 'Missing CV text' });
  }

  if (aiClient) {
    try {
      const prompt = `You are an expert resume parser for European and Polish CVs (including Europass, LinkedIn text, Word exports).
Parse the following raw text into a structured JSON resume matching this exact structure:
{
  "fullName": "Extracted candidate name",
  "jobTitle": "Extracted current or target job title",
  "email": "email@example.com",
  "phone": "+48 ...",
  "location": "City, Poland or EU",
  "summary": "Extracted or generated 2-sentence executive summary",
  "technicalSkills": ["skill 1", "skill 2", "skill 3"],
  "toolsAndCertificates": ["UDT", "SEP", "SAP", "B driver license", etc.],
  "languages": [{"language": "Polski", "level": "Native"}, {"language": "Angielski", "level": "B2"}],
  "experiences": [
    {
      "role": "Role",
      "company": "Company",
      "location": "City",
      "startDate": "YYYY-MM",
      "endDate": "YYYY-MM",
      "current": false,
      "bullets": ["bullet 1", "bullet 2"]
    }
  ],
  "educations": [
    {
      "institution": "University / School",
      "faculty": "Faculty",
      "degree": "Degree",
      "fieldOfStudy": "Field",
      "startDate": "YYYY",
      "endDate": "YYYY"
    }
  ]
}

Raw text:
"""
${rawText.slice(0, 4500)}
"""

Return ONLY pure valid JSON. No explanations, no markdown fences.`;

      const response = await generateWithTimeout(prompt, 15000);
      if (!response) throw new Error('No AI response');

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ parsed });
    } catch (err) {
      console.warn('AI parse error, falling back:', err);
    }
  }

  // Basic regex fallback extraction
  const emailMatch = rawText.match(/[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = rawText.match(/(?:\+48\s?)?(?:\d{3}[-\s]?\d{3}[-\s]?\d{3})/);
  res.json({
    parsed: {
      fullName: '',
      jobTitle: '',
      email: emailMatch ? emailMatch[0] : '',
      phone: phoneMatch ? phoneMatch[0] : '',
      location: '',
      summary: '',
      technicalSkills: [],
      toolsAndCertificates: [],
      languages: []
    },
    fallback: true
  });
});

// Endpoint: AI CV Bilingual Translator (Polish <-> English)
app.post('/api/ai/translate-cv', async (req: Request, res: Response) => {
  const { cv, targetLanguage = 'en' } = req.body;
  if (!cv || typeof cv !== 'object') {
    return res.status(400).json({ error: 'Missing CV data' });
  }

  const isTargetEn = targetLanguage === 'en';

  if (aiClient) {
    try {
      const prompt = `You are a professional executive translator specializing in European CVs and corporate resumes.
Translate the following CV content into ${isTargetEn ? 'English' : 'Polish'}.

CRITICAL RULES:
- KEEP names, dates (YYYY-MM), phone numbers, email addresses, and company names EXACTLY as they are.
- Translate job titles, professional summary, duty bullet points, academic degrees, and skills naturally into professional ${isTargetEn ? 'English' : 'Polish'}.
- Output STRICTLY a valid JSON object matching the exact structure below.

Input CV:
${JSON.stringify({
  jobTitle: cv.personalInfo?.jobTitle || '',
  summary: cv.summary || '',
  experiences: (cv.experiences || []).map((e: any) => ({
    id: e.id,
    role: e.role,
    company: e.company,
    startDate: e.startDate,
    endDate: e.endDate,
    bullets: e.bullets
  })),
  educations: (cv.educations || []).map((ed: any) => ({
    id: ed.id,
    institution: ed.institution,
    degree: ed.degree,
    fieldOfStudy: ed.fieldOfStudy
  })),
  technicalSkills: cv.technicalSkills || []
})}

Return ONLY pure valid JSON:
{
  "jobTitle": "...",
  "summary": "...",
  "experiences": [
    {
      "id": "...",
      "role": "...",
      "company": "...",
      "bullets": ["...", "..."]
    }
  ],
  "educations": [
    {
      "id": "...",
      "degree": "...",
      "fieldOfStudy": "..."
    }
  ],
  "technicalSkills": ["...", "..."]
}
No markdown blocks, pure JSON.`;

      const response = await generateWithTimeout(prompt, 20000);
      if (!response) throw new Error('No AI response');

      const text = response.text?.trim() || '';
      const cleanJson = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
      const parsed = JSON.parse(cleanJson);

      const translatedCv = {
        ...cv,
        language: targetLanguage,
        personalInfo: {
          ...cv.personalInfo,
          jobTitle: parsed.jobTitle || cv.personalInfo.jobTitle
        },
        summary: parsed.summary || cv.summary,
        experiences: (cv.experiences || []).map((exp: any, i: number) => {
          const transExp = parsed.experiences?.[i];
          return {
            ...exp,
            role: transExp?.role || exp.role,
            bullets: Array.isArray(transExp?.bullets) ? transExp.bullets : exp.bullets
          };
        }),
        educations: (cv.educations || []).map((edu: any, i: number) => {
          const transEdu = parsed.educations?.[i];
          return {
            ...edu,
            degree: transEdu?.degree || edu.degree,
            fieldOfStudy: transEdu?.fieldOfStudy || edu.fieldOfStudy
          };
        }),
        technicalSkills: Array.isArray(parsed.technicalSkills) ? parsed.technicalSkills : cv.technicalSkills
      };

      return res.json({ cv: translatedCv });
    } catch (err) {
      console.warn('AI translation error, falling back:', err);
    }
  }

  // Fallback if AI unavailable: switch language flag without corrupting data
  const fallbackCv = {
    ...cv,
    language: targetLanguage
  };
  res.json({ cv: fallbackCv, fallback: true });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const httpServer = http.createServer(app);
  const distPath = path.resolve(__dirname, 'dist');
  const distIndexExists = fs.existsSync(path.resolve(distPath, 'index.html'));

  if (isProd && distIndexExists) {
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`PolJobHub Server running on http://0.0.0.0:${PORT} [${isProd && distIndexExists ? 'production' : 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
