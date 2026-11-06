import React, { useState } from 'react';
import { CVData, LanguageCode } from '../types/cv';
import { matchJobPosting, JobMatchResponse } from '../services/aiService';
import { CheckCircle2, AlertTriangle, Sparkles, Loader2, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  language: LanguageCode;
}

export const AtsAnalyzerModal: React.FC<Props> = ({ isOpen, onClose, cv, language }) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';

  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<JobMatchResponse | null>(null);

  // Calculate CV Base Health Score
  const checkContact = !!(cv.personalInfo.fullName && cv.personalInfo.email && cv.personalInfo.phone && cv.personalInfo.location);
  const checkRodo = cv.rodo.enabled && cv.rodo.text.length > 30;
  const checkSummary = cv.summary && cv.summary.length >= 80;
  const checkExperience = cv.experiences.length > 0 && cv.experiences.some(e => e.bullets.length > 0);
  const checkSkills = (cv.technicalSkills.length + cv.toolsAndCertificates.length) >= 4;
  const checkLanguages = cv.languages.length > 0;

  let baseScore = 0;
  if (checkContact) baseScore += 20;
  if (checkRodo) baseScore += 20; // Critical for Poland
  if (checkSummary) baseScore += 15;
  if (checkExperience) baseScore += 25;
  if (checkSkills) baseScore += 10;
  if (checkLanguages) baseScore += 10;

  // Flatten CV text for matching
  const cvText = `
    ${cv.personalInfo.fullName} ${cv.personalInfo.jobTitle}
    ${cv.summary}
    ${cv.experiences.map(e => `${e.role} ${e.company} ${e.bullets.join(' ')}`).join(' ')}
    ${cv.educations.map(e => `${e.degree} ${e.fieldOfStudy} ${e.institution}`).join(' ')}
    ${cv.technicalSkills.join(' ')}
    ${cv.toolsAndCertificates.join(' ')}
    ${cv.softSkills.join(' ')}
    ${cv.languages.map(l => `${l.language} ${l.level}`).join(' ')}
    ${cv.certifications.map(c => `${c.name} ${c.issuer}`).join(' ')}
  `;

  const handleMatchJob = async () => {
    if (!jobDescription.trim()) return;
    setAnalyzing(true);
    try {
      const res = await matchJobPosting(jobDescription, cvText, language);
      setMatchResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Audytor ATS & Dopasowanie do Oferty Pracy' : 'ATS Score & Job Matcher'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">
              {isPl ? 'Audytor ATS & Dopasowanie do Oferty Pracy' : 'ATS Score & Job Matcher'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded"
          >
            ✕
          </button>
        </div>

        {/* Score Overview */}
        <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              {isPl ? 'Ocena Jakości CV (Standard ATS)' : 'CV Quality Benchmark'}
            </div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {baseScore}/100 <span className="text-xs font-normal text-slate-500">{isPl ? 'punktów' : 'points'}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {baseScore >= 80
                ? (isPl ? 'Świetnie! Twoje CV spełnia wszystkie kryteria formalne i techniczne systemów rekrutacyjnych.' : 'Excellent! Your CV passes automated filters.')
                : (isPl ? 'Zwróć uwagę na brakujące elementy poniżej, aby zwiększyć wskaźnik odpowiedzi rekruterów.' : 'Review missing criteria below to improve callback rates.')}
            </p>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center rounded-full border-4 shrink-0 font-bold font-mono text-sm"
               style={{
                 borderColor: baseScore >= 80 ? '#10b981' : baseScore >= 60 ? '#f59e0b' : '#ef4444',
                 color: baseScore >= 80 ? '#047857' : baseScore >= 60 ? '#b45309' : '#b91c1c'
               }}>
            {baseScore}%
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-5">
          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkContact ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkContact ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Kompletne dane kontaktowe i miasto' : 'Complete contact details & city'}</span>
          </div>

          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkRodo ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkRodo ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Polska klauzula RODO (obowiązkowa w PL)' : 'Polish GDPR consent clause'}</span>
          </div>

          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkSummary ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkSummary ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Zwięzłe podsumowanie zawodowe' : 'Executive profile summary'}</span>
          </div>

          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkExperience ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkExperience ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Doświadczenie z punktami osiągnięć' : 'Experience with bullet points'}</span>
          </div>

          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkSkills ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkSkills ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Kluczowe umiejętności i uprawnienia (min. 4)' : 'Core skills & licenses (min 4)'}</span>
          </div>

          <div className={`p-2.5 rounded border flex items-center gap-2 ${checkLanguages ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900' : 'bg-rose-50/60 border-rose-200 text-rose-900'}`}>
            {checkLanguages ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{isPl ? 'Języki w skali europejskiej CEFR' : 'Languages with CEFR ratings'}</span>
          </div>
        </div>

        {/* Job Offer Scanner */}
        <div className="border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-slate-800" />
            <h3 className="font-bold text-sm text-slate-900">
              {isPl ? 'Dopasuj CV do konkretnej oferty z Pracuj.pl / LinkedIn' : 'Match CV with Specific Job Posting'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-2.5">
            {isPl
              ? 'Wklej treść ogłoszenia o pracę (wymagania i obowiązki). AI porówna słowa kluczowe w Twoim CV i wskaże, czego brakuje, by przejść algorytm selekcji.'
              : 'Paste a job posting description to compare keywords and uncover missing skills.'}
          </p>

          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={
              isPl
                ? 'Wklej tutaj wymagania z ogłoszenia (np. "Wymagania: znajomość SAP ERP, uprawnienia UDT, język angielski min. B2, doświadczenie w zarządzaniu magazynem...")'
                : 'Paste job requirements and qualifications here...'
            }
            className="w-full p-2.5 text-xs border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
          />

          <div className="mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-[10px] text-slate-500">
              {isPl ? 'Tekst jest wysyłany do Google Gemini w celu wygenerowania sugestii.' : 'Text is sent to Google Gemini to generate suggestions.'}
            </span>
            <button
              type="button"
              onClick={handleMatchJob}
              disabled={analyzing || !jobDescription.trim()}
              aria-label={isPl ? 'Przeanalizuj słowa kluczowe z AI Google Gemini' : 'Run keyword matching with Google Gemini AI'}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 shrink-0"
            >
              {analyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{isPl ? 'Analizowanie oferty...' : 'Analyzing job posting...'}</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>{isPl ? 'Przeanalizuj słowa kluczowe' : 'Run Keyword Matcher'}</span>
                </>
              )}
            </button>
          </div>

          {/* Results display */}
          {matchResult && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">
                  {isPl ? 'Wynik dopasowania do oferty:' : 'Offer Match Result:'}
                </span>
                <span className="font-mono text-sm font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {matchResult.matchScore}%
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                {matchResult.summary}
              </p>

              {matchResult.matchedKeywords && matchResult.matchedKeywords.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-emerald-800 uppercase mb-1">
                    {isPl ? 'Znalezione w Twoim CV:' : 'Matched Keywords:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="text-xs bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchResult.missingKeywords && matchResult.missingKeywords.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-amber-800 uppercase mb-1">
                    {isPl ? 'Brakujące słowa kluczowe (warto dodać!):' : 'Missing Keywords to Add:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchResult.recommendations && matchResult.recommendations.length > 0 && (
                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900">{isPl ? 'Wskazówki doradcy:' : 'Agency Tips:'}</div>
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-600">
                    {matchResult.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
