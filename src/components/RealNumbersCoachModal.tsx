import React, { useState } from 'react';
import { LanguageCode } from '../types/cv';
import { Sparkles, Calculator, HelpCircle, ArrowRight, X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  duty: string;
  onEnhanceWithMetrics: (answers: { volume: string; teamSize: string; result: string }) => void;
  onSkipAndEnhance: () => void;
  language: LanguageCode;
}

export const RealNumbersCoachModal: React.FC<Props> = ({
  isOpen,
  onClose,
  duty,
  onEnhanceWithMetrics,
  onSkipAndEnhance,
  language
}) => {
  useEscapeKey(onClose, isOpen);

  const [volume, setVolume] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [result, setResult] = useState('');

  if (!isOpen) return null;
  const isPl = language === 'pl';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnhanceWithMetrics({
      volume: volume.trim(),
      teamSize: teamSize.trim(),
      result: result.trim()
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Coach Liczb i Metryki STAR' : 'STAR Metrics Coach'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 my-auto"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isPl ? 'Coach Liczb i Metryki STAR' : 'STAR Metrics Coach'}
              </h3>
              <p className="text-xs text-slate-500">
                {isPl ? 'Podaj 1-3 liczby, aby AI nie wymyślało faktów' : 'Provide 1-3 figures so AI uses your real numbers'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-1 text-slate-400 hover:text-slate-600 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-4 text-xs text-slate-700">
          <span className="font-bold text-slate-900">{isPl ? 'Obowiązek:' : 'Duty:'}</span> "{duty}"
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isPl ? '1. Jaka była skala/wolumen? (np. 150 zamówień/dzień, 5 projektów/rok)' : '1. Volume or throughput? (e.g. 150 orders/day, 5 projects/year)'}
            </label>
            <input
              type="text"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder={isPl ? 'np. 200 klientów tygodniowo / 4 linie produkcyjne' : 'e.g. 200 clients weekly'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isPl ? '2. Jaki zespół lub budżet? (np. 8 osób, 500 tys. PLN)' : '2. Team size or budget? (e.g. 8 staff, 500k PLN)'}
            </label>
            <input
              type="text"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              placeholder={isPl ? 'np. zespół 12 magazynierów / budżet 150k PLN' : 'e.g. 12 operators'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {isPl ? '3. Jaki był wymierny rezultat? (np. skrócenie czasu o 20%, 0 reklamacji)' : '3. Quantifiable result? (e.g. 20% faster, 0 defects)'}
            </label>
            <input
              type="text"
              value={result}
              onChange={(e) => setResult(e.target.value)}
              placeholder={isPl ? 'np. wzrost dokładności do 99.8% / redukcja kosztów o 15%' : 'e.g. 15% cost savings'}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onSkipAndEnhance();
                onClose();
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline"
            >
              {isPl ? 'Pomiń (użyj szablonu [placeholder])' : 'Skip (use [placeholder])'}
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isPl ? 'Generuj z moimi liczbami' : 'Generate with my numbers'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
