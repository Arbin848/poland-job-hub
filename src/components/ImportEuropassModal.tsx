import React, { useState } from 'react';
import { CVData, LanguageCode } from '../types/cv';
import { Sparkles, Loader2, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess: (parsed: Partial<CVData>) => void;
  language: LanguageCode;
}

export const ImportEuropassModal: React.FC<Props> = ({ isOpen, onClose, onImportSuccess, language }) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';
  const [rawText, setRawText] = useState('');
  const [parsing, setParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleParse = async () => {
    if (!rawText.trim()) return;
    setParsing(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ai/parse-existing-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, language })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.parsed) {
          const p = data.parsed;
          const patch: Partial<CVData> = {
            personalInfo: {
              fullName: p.fullName || 'Kandydat',
              jobTitle: p.jobTitle || 'Specjalista',
              email: p.email || '',
              phone: p.phone || '',
              location: p.location || 'Polska',
              showPhoto: false,
              showQrCode: false,
            },
            summary: p.summary || '',
            technicalSkills: p.technicalSkills || [],
            toolsAndCertificates: p.toolsAndCertificates || [],
            languages: (p.languages || []).map((l: any, i: number) => ({
              id: `lang-imp-${i}`,
              language: l.language || 'Angielski',
              level: l.level || 'B2'
            })),
            experiences: (p.experiences || []).map((e: any, i: number) => ({
              id: `exp-imp-${i}`,
              role: e.role || 'Stanowisko',
              company: e.company || 'Firma',
              location: e.location || 'Polska',
              startDate: e.startDate || '2022',
              endDate: e.endDate || '',
              current: !e.endDate,
              bullets: Array.isArray(e.bullets) ? e.bullets : ['Realizacja zadań operacyjnych']
            })),
            educations: (p.educations || []).map((ed: any, i: number) => ({
              id: `edu-imp-${i}`,
              institution: ed.institution || 'Uczelnia',
              faculty: ed.faculty || '',
              degree: ed.degree || 'Dyplom',
              fieldOfStudy: ed.fieldOfStudy || '',
              startDate: ed.startDate || '2018',
              endDate: ed.endDate || '2022'
            }))
          };

          onImportSuccess(patch);
          onClose();
        }
      } else {
        setErrorMsg(isPl ? 'Błąd podczas przetwarzania tekstu.' : 'Failed to parse text.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(isPl ? 'Błąd sieci. Spróbuj ponownie.' : 'Network error. Please try again.');
    } finally {
      setParsing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-800" />
            <h2 className="text-lg font-bold text-slate-900">
              {isPl ? 'Import & Konwersja Starego CV / Europass' : 'Import & Upgrade Existing CV / Europass'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 font-bold">
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-600 my-3 leading-relaxed">
          {isPl
            ? 'Masz już swoje CV w Wordzie, starym PDF lub formacie Europass? Skopiuj i wklej cały tekst poniżej. Nasz algorytm AI automatycznie wyodrębni Twoje dane kontaktowe, stanowiska, uczelnie i umiejętności do nowoczesnego szablonu!'
            : 'Already have an old Europass or Word resume? Copy & paste the text below. AI will automatically extract and map your experience, education, and skills into our modern format.'}
        </p>

        <textarea
          rows={10}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder={
            isPl
              ? 'Wklej tutaj zawartość swojego dotychczasowego CV (np. Imię, nazwisko, historia zatrudnienia, daty, wykształcenie)...'
              : 'Paste your current resume or Europass text here...'
          }
          className="w-full p-3 text-xs border border-slate-200 rounded font-mono leading-relaxed bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-800"
        />

        {errorMsg && (
          <div className="text-xs text-rose-600 mt-2 font-medium">
            {errorMsg}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            {isPl ? 'Dane nie są nigdzie udostępniane publicznie.' : 'Your data stays completely private.'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              {isPl ? 'Anuluj' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleParse}
              disabled={parsing || !rawText.trim()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
            >
              {parsing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{isPl ? 'Analizowanie i konwersja...' : 'Parsing CV...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isPl ? 'Konwertuj na Nowoczesne CV' : 'Transform to Modern CV'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
