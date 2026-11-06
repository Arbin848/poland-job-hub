import { LanguageCode } from '../types/cv';

export interface EnhanceBulletResponse {
  bullets: string[];
  fallback?: boolean;
}

export interface SummaryResponse {
  summary: string;
  fallback?: boolean;
}

export interface JobMatchResponse {
  matchScore: number;
  summary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  fallback?: boolean;
}

export async function enhanceBulletPoint(
  duty: string,
  jobTitle: string,
  industry: string,
  language: LanguageCode = 'pl'
): Promise<EnhanceBulletResponse> {
  try {
    const res = await fetch('/api/ai/enhance-bullet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duty, jobTitle, industry, language }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error calling /api/ai/enhance-bullet, using local fallback:', err);
  }

  // Local client-side fallback if server is unreachable
  const isPl = language === 'pl';
  const clean = duty.trim();
  return {
    bullets: isPl ? [
      `Optymalizacja i koordynacja zadań w zakresie: ${clean}, co przyniosło wymierny wzrost efektywności operacyjnej [uzupełnij mierzalny wynik, np. % / czas / koszt].`,
      `Samodzielna realizacja kluczowych obowiązków (${clean}) z zachowaniem rygorystycznych standardów jakościowych i procedur firmy.`,
      `Wdrożenie usprawnień w obszarze ${clean}, skutkujące skróceniem czasu realizacji zleceń oraz redukcją błędów operacyjnych.`
    ] : [
      `Streamlined operations regarding ${clean}, driving measurable efficiency gains [add a measurable result, e.g. % / time / cost].`,
      `Spearheaded core workflow deliverables in ${clean}, maintaining continuous alignment with organizational quality standards.`,
      `Introduced process improvements in ${clean}, cutting execution turnaround time and minimizing recurring bottlenecks.`
    ],
    fallback: true
  };
}

export async function generateProfileSummary(
  jobTitle: string,
  yearsOfExperience: string,
  faculty: string,
  skills: string[],
  language: LanguageCode = 'pl'
): Promise<SummaryResponse> {
  try {
    const res = await fetch('/api/ai/generate-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobTitle, yearsOfExperience, faculty, skills, language }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error calling /api/ai/generate-summary, using local fallback:', err);
  }

  const isPl = language === 'pl';
  return {
    summary: isPl
      ? `Doświadczony ${jobTitle || 'specjalista'} z ponad ${yearsOfExperience || 'wieloletnim'} stażem w branży ${faculty || 'nowoczesnych technologii i usług'}. Wyróżnia się biegłą znajomością kluczowych narzędzi (${skills.slice(0, 3).join(', ') || 'zarządzanie procesami, optymalizacja'}), wysoką samodzielnością i ukierunkowaniem na mierzalne rezultaty biznesowe. Gotowy do wniesienia wartości dodanej w dynamicznym zespole.`
      : `High-performing ${jobTitle || 'professional'} with ${yearsOfExperience || 'demonstrated'} experience across ${faculty || 'the industry'}. Demonstrates robust mastery in ${skills.slice(0, 3).join(', ') || 'process management and operational excellence'}, driving measurable business impact. Committed to precision, cross-functional collaboration, and continuous advancement.`,
    fallback: true
  };
}

export async function matchJobPosting(
  jobDescription: string,
  cvText: string,
  language: LanguageCode = 'pl'
): Promise<JobMatchResponse> {
  try {
    const res = await fetch('/api/ai/match-job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription, cvText, language }),
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Network error calling /api/ai/match-job, using fallback:', err);
  }

  // Heuristic matching
  const jdLower = jobDescription.toLowerCase();
  const cvLower = cvText.toLowerCase();
  const commonKeywords = [
    'angielski', 'english', 'zarządzanie', 'management', 'excel', 'komunikacja',
    'analiza', 'sql', 'python', 'sprzedaż', 'sales', 'logistyka', 'erp', 'sap',
    'obsługa klienta', 'customer service', 'optymalizacja', 'projekty', 'scrum',
    'wms', 'prawo jazdy', 'udt', 'rodo', 'haccp', 'autocad', 'reporting', 'kpi'
  ];

  const matched: string[] = [];
  const missing: string[] = [];

  for (const kw of commonKeywords) {
    if (jdLower.includes(kw)) {
      if (cvLower.includes(kw)) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    }
  }

  const score = Math.min(95, Math.max(50, Math.round((matched.length / Math.max(1, matched.length + missing.length)) * 100)));

  return {
    matchScore: score,
    summary: language === 'pl'
      ? `Twój profil pokrywa kluczowe wymagania oferty na poziomie ${score}%. Rekomendowane dodanie brakujących pojęć branżowych.`
      : `Your profile matches approximately ${score}% of target requirements. Adding identified keywords will boost ATS ranking.`,
    matchedKeywords: matched.slice(0, 5),
    missingKeywords: missing.slice(0, 5),
    recommendations: language === 'pl' ? [
      'Wprowadź brakujące pojęcia bezpośrednio do sekcji Umiejętności lub podsumowania zawodowego.',
      'Dopasuj nazwę stanowiska w nagłówku do tytułu z ogłoszenia.',
      'Upewnij się, że klauzula RODO jest widoczna na dole strony.'
    ] : [
      'Insert identified missing skills into your Skills or Professional Summary section.',
      'Mirror the exact target job title from the job description in your CV header.',
      'Ensure the GDPR / RODO consent clause is present at the bottom of the page.'
    ],
    fallback: true
  };
}
