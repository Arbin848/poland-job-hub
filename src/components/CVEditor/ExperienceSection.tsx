import React, { useState } from 'react';
import { ExperienceItem, LanguageCode } from '../../types/cv';
import { enhanceBulletPoint } from '../../services/aiService';
import { Plus, Trash2, Sparkles, Loader2, ArrowUp, ArrowDown, Copy } from 'lucide-react';
import { RealNumbersCoachModal } from '../RealNumbersCoachModal';

interface Props {
  experiences: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
  language: LanguageCode;
  jobTitle: string;
}

export const ExperienceSection: React.FC<Props> = ({ experiences, onChange, language, jobTitle }) => {
  const isPl = language === 'pl';
  const [enhancingIndex, setEnhancingIndex] = useState<{ expIdx: number; bulletIdx: number } | null>(null);
  const [coachTarget, setCoachTarget] = useState<{ expIdx: number; bulletIdx: number; text: string } | null>(null);
  const [suggestionModal, setSuggestionModal] = useState<{
    expIdx: number;
    bulletIdx: number;
    options: string[];
    isFallback?: boolean;
  } | null>(null);

  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: isPl ? 'Nowe Stanowisko' : 'Job Title',
      company: isPl ? 'Nazwa Firmy Sp. z o.o.' : 'Company Name',
      location: 'Warszawa, Polska',
      startDate: '2023-01',
      endDate: '',
      current: true,
      bullets: [
        isPl
          ? 'Realizacja kluczowych celów operacyjnych zgodnie ze standardami jakości.'
          : 'Executed core operational milestones while upholding quality benchmarks.'
      ]
    };
    onChange([...experiences, newExp]);
  };

  const handleRemoveExperience = (idx: number) => {
    onChange(experiences.filter((_, i) => i !== idx));
  };

  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    const updated = [...experiences];
    const temp = updated[idx - 1];
    updated[idx - 1] = updated[idx];
    updated[idx] = temp;
    onChange(updated);
  };

  const handleMoveDown = (idx: number) => {
    if (idx >= experiences.length - 1) return;
    const updated = [...experiences];
    const temp = updated[idx + 1];
    updated[idx + 1] = updated[idx];
    updated[idx] = temp;
    onChange(updated);
  };

  const handleDuplicate = (idx: number) => {
    const original = experiences[idx];
    const clone: ExperienceItem = {
      ...original,
      id: `exp-${Date.now()}`,
      role: `${original.role} (${isPl ? 'Kopia' : 'Copy'})`
    };
    const updated = [...experiences];
    updated.splice(idx + 1, 0, clone);
    onChange(updated);
  };

  const handleUpdateExperience = (idx: number, patch: Partial<ExperienceItem>) => {
    const updated = [...experiences];
    updated[idx] = { ...updated[idx], ...patch };
    onChange(updated);
  };

  const handleAddBullet = (expIdx: number) => {
    const updated = [...experiences];
    updated[expIdx].bullets.push(
      isPl ? 'Nowy punkt zakresu obowiązków i osiągnięć' : 'New responsibility and quantifiable result'
    );
    onChange(updated);
  };

  const handleUpdateBullet = (expIdx: number, bulletIdx: number, val: string) => {
    const updated = [...experiences];
    updated[expIdx].bullets[bulletIdx] = val;
    onChange(updated);
  };

  const handleRemoveBullet = (expIdx: number, bulletIdx: number) => {
    const updated = [...experiences];
    updated[expIdx].bullets = updated[expIdx].bullets.filter((_, i) => i !== bulletIdx);
    onChange(updated);
  };

  const handleTriggerCoach = (expIdx: number, bulletIdx: number) => {
    const rawText = experiences[expIdx].bullets[bulletIdx];
    if (!rawText.trim()) return;
    setCoachTarget({ expIdx, bulletIdx, text: rawText });
  };

  const executeEnhancement = async (expIdx: number, bulletIdx: number, metricsPrompt?: string) => {
    const rawText = experiences[expIdx].bullets[bulletIdx];
    const textToSend = metricsPrompt ? `${rawText} ${metricsPrompt}` : rawText;

    setEnhancingIndex({ expIdx, bulletIdx });
    try {
      const res = await enhanceBulletPoint(
        textToSend,
        experiences[expIdx].role || jobTitle,
        'industry',
        language
      );
      if (res.bullets && res.bullets.length > 0) {
        setSuggestionModal({
          expIdx,
          bulletIdx,
          options: res.bullets,
          isFallback: Boolean(res.fallback)
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancingIndex(null);
    }
  };

  const handlePickEnhancedBullet = (chosen: string) => {
    if (!suggestionModal) return;
    handleUpdateBullet(suggestionModal.expIdx, suggestionModal.bulletIdx, chosen);
    setSuggestionModal(null);
  };

  return (
    <div className="space-y-5">
      {experiences.map((exp, expIdx) => (
        <div key={exp.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3.5 relative">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="font-semibold text-xs text-slate-800">
              #{expIdx + 1} {exp.role || (isPl ? 'Stanowisko' : 'Role')}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleMoveUp(expIdx)}
                disabled={expIdx === 0}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                title={isPl ? 'Przesuń wyżej' : 'Move up'}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleMoveDown(expIdx)}
                disabled={expIdx === experiences.length - 1}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                title={isPl ? 'Przesuń niżej' : 'Move down'}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleDuplicate(expIdx)}
                className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded"
                title={isPl ? 'Duplikuj stanowisko' : 'Duplicate job'}
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveExperience(expIdx)}
                className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 p-1 hover:bg-rose-50 rounded ml-1"
                title={isPl ? 'Usuń pozycję' : 'Remove'}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Stanowisko' : 'Job Title'} *
              </label>
              <input
                type="text"
                value={exp.role ?? ''}
                onChange={(e) => handleUpdateExperience(expIdx, { role: e.target.value })}
                placeholder={isPl ? 'np. Specjalista ds. Logistyki' : 'e.g. Operations Coordinator'}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Nazwa Pracodawcy / Firmy' : 'Company Name'} *
              </label>
              <input
                type="text"
                value={exp.company ?? ''}
                onChange={(e) => handleUpdateExperience(expIdx, { company: e.target.value })}
                placeholder={isPl ? 'np. DHL Supply Chain Polska Sp. z o.o.' : 'e.g. DHL Supply Chain'}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Lokalizacja (np. Warszawa, Poznań / Zdalnie)' : 'Location'}
              </label>
              <input
                type="text"
                value={exp.location ?? ''}
                onChange={(e) => handleUpdateExperience(expIdx, { location: e.target.value })}
                placeholder={isPl ? 'Warszawa, Polska' : 'Warsaw, Poland'}
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Data rozpoczęcia (RRRR-MM)' : 'Start Date (YYYY-MM)'}
                </label>
                <input
                  type="text"
                  value={exp.startDate ?? ''}
                  onChange={(e) => handleUpdateExperience(expIdx, { startDate: e.target.value })}
                  placeholder="2022-03"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono"
                />
              </div>

              <div className="flex-1">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Data zakończenia' : 'End Date'}
                </label>
                <input
                  type="text"
                  disabled={exp.current}
                  value={exp.current ? (isPl ? 'Obecnie' : 'Present') : (exp.endDate ?? '')}
                  onChange={(e) => handleUpdateExperience(expIdx, { endDate: e.target.value })}
                  placeholder="2024-06"
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <input
              type="checkbox"
              id={`curr-${exp.id}`}
              checked={Boolean(exp.current)}
              onChange={(e) => handleUpdateExperience(expIdx, { current: e.target.checked })}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-800"
            />
            <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-700 cursor-pointer">
              {isPl ? 'Nadal tu pracuję (aktualne stanowisko)' : 'I currently work here'}
            </label>
          </div>

          {/* Bullets List */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <div>
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                  {isPl ? 'Zakres obowiązków & Osiągnięcia (z AI STAR)' : 'Duties & Impact (STAR Method)'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isPl ? 'Tekst jest wysyłany do Google Gemini w celu wygenerowania sugestii.' : 'Text is sent to Google Gemini to generate suggestions.'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAddBullet(expIdx)}
                className="text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1"
                aria-label={isPl ? 'Dodaj punkt zakresu obowiązków' : 'Add duty bullet'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isPl ? 'Dodaj punkt' : 'Add bullet'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {exp.bullets.map((bullet, bulletIdx) => {
                const isEnhancing =
                  enhancingIndex?.expIdx === expIdx && enhancingIndex?.bulletIdx === bulletIdx;

                return (
                  <div key={bulletIdx} className="flex items-start gap-1.5">
                    <span className="text-slate-400 mt-2 text-xs">›</span>
                    <textarea
                      rows={2}
                      value={bullet ?? ''}
                      onChange={(e) => handleUpdateBullet(expIdx, bulletIdx, e.target.value)}
                      className="flex-1 p-2 text-xs border border-slate-200 rounded bg-white leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-slate-800"
                      placeholder={isPl ? 'Wpisz zadanie lub osiągnięcie...' : 'Describe duty or quantifiable result...'}
                    />
                    <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={() => handleTriggerCoach(expIdx, bulletIdx)}
                        disabled={isEnhancing}
                        title={isPl ? 'Ulepsz ten punkt z AI (metoda STAR + liczby)' : 'Enhance with AI (STAR method)'}
                        aria-label={isPl ? 'Ulepsz ten punkt z AI Google Gemini' : 'Enhance bullet with Google Gemini AI'}
                        className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs transition flex items-center justify-center disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        {isEnhancing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveBullet(expIdx, bulletIdx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded text-xs transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500"
                        title={isPl ? 'Usuń punkt' : 'Remove bullet'}
                        aria-label={isPl ? 'Usuń ten punkt' : 'Remove this bullet'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddExperience}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 transition"
      >
        <Plus className="w-4 h-4" />
        <span>{isPl ? 'Dodaj kolejne stanowisko pracy' : 'Add another work experience'}</span>
      </button>

      {/* AI Suggestion Modal / Drawer */}
      {suggestionModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-slate-900" />
                <h3 className="font-bold text-sm text-slate-900">
                  {isPl ? 'Wybierz ulepszoną wersję z AI (STAR)' : 'Select AI-Enhanced Version'}
                </h3>
              </div>
              <button
                onClick={() => setSuggestionModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 my-3">
              {isPl
                ? 'AI przeformułowało Twój punkt na 3 mocne warianty z czasownikami akcji i mierzalnymi wskaźnikami:'
                : 'AI transformed your bullet into 3 strong action-oriented variants:'}
            </p>

            {suggestionModal.isFallback && (
              <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg mb-3 flex items-center gap-1.5">
                <span>⚠️ AI unavailable – template suggestion. Please edit before use.</span>
              </div>
            )}

            <div className="space-y-2.5">
              {suggestionModal.options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePickEnhancedBullet(opt)}
                  className="p-3 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 cursor-pointer transition text-xs text-slate-800 leading-relaxed flex items-start gap-2.5 group"
                >
                  <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-900 font-bold shrink-0 mt-0.5">
                    {idx + 1}.
                  </span>
                  <span className="flex-1">{opt}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSuggestionModal(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                {isPl ? 'Anuluj' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real Numbers Coach Modal */}
      {coachTarget && (
        <RealNumbersCoachModal
          isOpen={true}
          onClose={() => setCoachTarget(null)}
          duty={coachTarget.text}
          language={language}
          onEnhanceWithMetrics={(answers) => {
            const metricsText = [
              answers.volume ? `[Wolumen: ${answers.volume}]` : '',
              answers.teamSize ? `[Zespół/Budżet: ${answers.teamSize}]` : '',
              answers.result ? `[Rezultat: ${answers.result}]` : ''
            ].filter(Boolean).join(' ');
            executeEnhancement(coachTarget.expIdx, coachTarget.bulletIdx, metricsText);
          }}
          onSkipAndEnhance={() => {
            executeEnhancement(coachTarget.expIdx, coachTarget.bulletIdx);
          }}
        />
      )}
    </div>
  );
};
