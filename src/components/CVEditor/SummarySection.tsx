import React, { useState } from 'react';
import { LanguageCode } from '../../types/cv';
import { generateProfileSummary } from '../../services/aiService';
import { Sparkles, Loader2, Check } from 'lucide-react';

interface Props {
  summary: string;
  onChange: (text: string) => void;
  language: LanguageCode;
  jobTitle: string;
  skills: string[];
}

export const SummarySection: React.FC<Props> = ({ summary, onChange, language, jobTitle, skills }) => {
  const isPl = language === 'pl';
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState('3-5');
  const [isFallback, setIsFallback] = useState(false);

  const handleGenerateAI = async () => {
    setLoading(true);
    setIsFallback(false);
    try {
      const res = await generateProfileSummary(
        jobTitle || (isPl ? 'Specjalista' : 'Professional'),
        `${years} ${isPl ? 'lat' : 'years'}`,
        isPl ? 'branży' : 'industry',
        skills,
        language
      );
      if (res.summary) {
        onChange(res.summary);
      }
      if (res.fallback) {
        setIsFallback(true);
      }
    } catch (err) {
      console.error(err);
      setIsFallback(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* AI Assistant Bar */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-200/70 text-slate-700 rounded">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">
              {isPl ? 'Generator profilu zawodowego AI' : 'AI Professional Profile Writer'}
            </div>
            <div className="text-[11px] text-slate-500">
              {isPl
                ? 'Tworzy 2-3 zwięzłe zdania, które wyróżniają kandydata na rynku polskim i europejskim.'
                : 'Generates a punchy executive pitch matching modern European recruiter expectations.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <select
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded px-2 py-1 text-slate-700"
          >
            <option value="1-2">{isPl ? '1-2 lata stażu' : '1-2 years exp'}</option>
            <option value="3-5">{isPl ? '3-5 lat stażu' : '3-5 years exp'}</option>
            <option value="5+">{isPl ? '5+ lat stażu' : '5+ years exp'}</option>
            <option value="student">{isPl ? 'Absolwent / Student' : 'Graduate'}</option>
          </select>

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={loading}
            aria-label={isPl ? 'Generuj podsumowanie z AI Google Gemini' : 'Generate summary with Google Gemini AI'}
            className="px-3 py-1 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded transition flex items-center gap-1.5 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isPl ? 'Generowanie...' : 'Generating...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isPl ? 'Napisz z AI' : 'Generate with AI'}</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="text-[10px] text-slate-400 px-1 -mt-1.5">
        {isPl ? 'Tekst jest wysyłany do Google Gemini w celu wygenerowania sugestii.' : 'Text is sent to Google Gemini to generate suggestions.'}
      </div>

      {isFallback && (
        <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
          <span>⚠️ AI unavailable – template suggestion. Please edit before use.</span>
        </div>
      )}

      <div>
        <textarea
          rows={4}
          value={summary ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isPl
              ? 'Wpisz 2-3 zdania o sobie: kim jesteś, jakie masz kluczowe osiągnięcie lub certyfikat i do jakich wyzwań aspirujesz...'
              : 'Write 2-3 sentences: your core role, key career achievement or certifications, and where you bring highest value...'
          }
          className="w-full p-3 text-xs leading-relaxed border border-slate-200 rounded focus:outline-hidden focus:ring-1 focus:ring-slate-800"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
          <span>
            {isPl
              ? 'Wskazówka: Polscy rekruterzy czytają podsumowanie w 6 sekund. Skup się na twardych danych i uprawnieniach.'
              : 'Tip: Recruiters scan summaries in 6 seconds. Emphasize verified hard skills and quantifiable impact.'}
          </span>
          <span className="font-mono tabular-nums">{summary.length} {isPl ? 'znaków' : 'chars'}</span>
        </div>
      </div>
    </div>
  );
};
