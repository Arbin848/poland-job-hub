import React, { useState } from 'react';
import { CoverLetterData, LanguageCode } from '../../types/cv';
import { Sparkles, Loader2, Plus, Trash2, Calendar, Building2 } from 'lucide-react';

interface Props {
  coverLetter: CoverLetterData;
  onChange: (updated: CoverLetterData) => void;
  candidateName: string;
  jobTitle: string;
  language: LanguageCode;
}

export const CoverLetterSection: React.FC<Props> = ({
  coverLetter,
  onChange,
  candidateName,
  jobTitle,
  language
}) => {
  const isPl = language === 'pl';
  const [generating, setGenerating] = useState(false);
  const [tone, setTone] = useState<'formal' | 'dynamic' | 'entry'>('formal');

  const handleSetToday = () => {
    const today = new Date();
    const formatted = isPl
      ? `Warszawa, ${today.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })} r.`
      : `Warsaw, ${today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    onChange({ ...coverLetter, cityAndDate: formatted });
  };

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName,
          jobTitle: jobTitle || (isPl ? 'Specjalista' : 'Professional'),
          companyName: coverLetter.companyName,
          companyAddress: coverLetter.companyAddress,
          tone,
          language
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.paragraphs) {
          onChange({
            ...coverLetter,
            subject: data.subject || coverLetter.subject,
            salutation: data.salutation || coverLetter.salutation,
            bodyParagraphs: data.paragraphs,
            signOff: data.signOff || coverLetter.signOff
          });
        }
      }
    } catch (err) {
      console.error('Failed to generate cover letter:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleUpdateParagraph = (idx: number, val: string) => {
    const updated = [...coverLetter.bodyParagraphs];
    updated[idx] = val;
    onChange({ ...coverLetter, bodyParagraphs: updated });
  };

  const handleAddParagraph = () => {
    onChange({
      ...coverLetter,
      bodyParagraphs: [
        ...coverLetter.bodyParagraphs,
        isPl
          ? 'Nowy akapit listu motywacyjnego...'
          : 'New cover letter paragraph...'
      ]
    });
  };

  const handleRemoveParagraph = (idx: number) => {
    onChange({
      ...coverLetter,
      bodyParagraphs: coverLetter.bodyParagraphs.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-4">
      {/* AI Assistant Banner */}
      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-200 rounded text-slate-800">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-900">
              {isPl ? 'Generator Listu Motywacyjnego AI' : 'AI Cover Letter Writer'}
            </div>
            <div className="text-[11px] text-slate-500">
              {isPl
                ? 'Tworzy 3 przekonujące akapity dopasowane do polskiego rynku pracy.'
                : 'Writes an impactful 3-paragraph letter tailored to the target role.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-700"
          >
            <option value="formal">{isPl ? 'Oficjalny / Korporacyjny' : 'Formal Corporate'}</option>
            <option value="dynamic">{isPl ? 'Dynamiczny / Sukcesy' : 'Dynamic Impact'}</option>
            <option value="entry">{isPl ? 'Staż / Początkujący' : 'Entry Level'}</option>
          </select>

          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={generating}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isPl ? 'Generowanie...' : 'Drafting...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isPl ? 'Napisz z AI' : 'Generate'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recipient and details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-white border border-slate-200 rounded-lg">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            <Building2 className="w-3 h-3 inline mr-1 text-slate-400" />
            {isPl ? 'Nazwa Pracodawcy / Firmy' : 'Target Employer / Company'} *
          </label>
          <input
            type="text"
            value={coverLetter.companyName ?? ''}
            onChange={(e) => onChange({ ...coverLetter, companyName: e.target.value })}
            placeholder="np. Raben Logistics Polska Sp. z o.o."
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {isPl ? 'Odbiorca (Dział / Imię)' : 'Recipient / Hiring Team'}
          </label>
          <input
            type="text"
            value={coverLetter.recipientName ?? ''}
            onChange={(e) => onChange({ ...coverLetter, recipientName: e.target.value })}
            placeholder={isPl ? 'np. Dział Rekrutacji i Kadr / Zarząd' : 'e.g. Hiring Committee'}
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {isPl ? 'Adres firmy' : 'Company Address'}
          </label>
          <input
            type="text"
            value={coverLetter.companyAddress ?? ''}
            onChange={(e) => onChange({ ...coverLetter, companyAddress: e.target.value })}
            placeholder="np. ul. Zbożowa 1, 05-825 Grodzisk Mazowiecki"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[11px] font-semibold text-slate-700">
              <Calendar className="w-3 h-3 inline mr-1 text-slate-400" />
              {isPl ? 'Miejscowość i Data' : 'City & Date'}
            </label>
            <button
              type="button"
              onClick={handleSetToday}
              className="text-[10px] text-blue-700 hover:underline font-semibold"
            >
              {isPl ? 'Wstaw dzisiejszą datę' : 'Set Today'}
            </button>
          </div>
          <input
            type="text"
            value={coverLetter.cityAndDate ?? ''}
            onChange={(e) => onChange({ ...coverLetter, cityAndDate: e.target.value })}
            placeholder="np. Warszawa, 17 października 2026 r."
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded font-mono"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            {isPl ? 'Tytuł / Numer referencyjny' : 'Subject Line / Ref No.'}
          </label>
          <input
            type="text"
            value={coverLetter.subject ?? ''}
            onChange={(e) => onChange({ ...coverLetter, subject: e.target.value })}
            placeholder="np. Dotyczy: Aplikacja na stanowisko Koordynatora ds. Logistyki (Nr ref. LOG/2026)"
            className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded font-semibold text-slate-800"
          />
        </div>
      </div>

      {/* Paragraphs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            {isPl ? 'Treść akapitów (List Motywacyjny)' : 'Letter Paragraphs'}
          </label>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="text-xs text-slate-800 hover:text-black font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isPl ? 'Dodaj akapit' : 'Add paragraph'}</span>
          </button>
        </div>

        {coverLetter.bodyParagraphs.map((para, idx) => (
          <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600">
              <span>{isPl ? `Akapit #${idx + 1}` : `Paragraph #${idx + 1}`}</span>
              <button
                type="button"
                onClick={() => handleRemoveParagraph(idx)}
                className="text-slate-400 hover:text-rose-600"
                title={isPl ? 'Usuń akapit' : 'Remove paragraph'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              rows={3}
              value={para ?? ''}
              onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-200 rounded bg-white leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-slate-800"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
