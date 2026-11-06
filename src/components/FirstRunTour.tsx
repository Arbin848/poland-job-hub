import React, { useState, useEffect } from 'react';
import { LanguageCode } from '../types/cv';
import { Sparkles, Palette, Edit3, ShieldCheck, Printer, X, ArrowRight } from 'lucide-react';

interface Props {
  language: LanguageCode;
  onOpenTemplates?: () => void;
  onPrintPdf?: () => void;
}

const TOUR_STORAGE_KEY = 'polcv_tour_dismissed_v1';

export const FirstRunTour: React.FC<Props> = ({ language, onOpenTemplates, onPrintPdf }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const isPl = language === 'pl';

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(TOUR_STORAGE_KEY);
      if (!dismissed) {
        // Small delay so user sees the app load first
        const t = setTimeout(() => setIsOpen(true), 800);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    } catch (e) {}
  };

  const steps = [
    {
      titlePl: '1. Wybierz szablon A4',
      titleEn: '1. Choose your A4 template',
      descPl: '10 eleganckich szablonów zoptymalizowanych pod polski rynek i systemy ATS.',
      descEn: '10 professional templates optimized for European ATS & recruiter scanning.',
      icon: <Palette className="w-5 h-5 text-indigo-600" />
    },
    {
      titlePl: '2. Wypełnij sekcje z pomocą AI',
      titleEn: '2. Guided editor with STAR AI',
      descPl: 'Uzupełnij 9 sekcji. Użyj generatora STAR dla wymiernych osiągnięć zawodowych.',
      descEn: 'Fill 9 guided tabs. Use STAR AI to quantify accomplishments and skills.',
      icon: <Edit3 className="w-5 h-5 text-emerald-600" />
    },
    {
      titlePl: '3. Kontroluj wynik CV i RODO',
      titleEn: '3. Real-time CV Score & RODO',
      descPl: 'Lokalny audyt sprawdza telefon (+48), zwięzłość oraz klauzulę RODO (napraw w 1 klik).',
      descEn: 'Local audit checks contact prefix, density, and Polish GDPR clause in 1-click.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />
    },
    {
      titlePl: '4. Pobierz PDF gotowy do wysłania',
      titleEn: '4. Download pixel-perfect PDF',
      descPl: 'Generuj standardowy plik A4 (210×297 mm) bez znaków wodnych i z pełną prywatnością.',
      descEn: 'Export high-resolution European A4 PDF ready for instant job applications.',
      icon: <Printer className="w-5 h-5 text-rose-600" />
    }
  ];

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed bottom-5 right-5 z-40 max-w-sm w-full bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
            {step.icon}
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {isPl ? `Przewodnik ${currentStep + 1} z 4` : `Quick tour ${currentStep + 1} of 4`}
            </div>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              {isPl ? step.titlePl : step.titleEn}
            </h4>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 text-slate-400 hover:text-slate-600 rounded"
          title={isPl ? 'Zamknij' : 'Dismiss'}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mb-4">
        {isPl ? step.descPl : step.descEn}
      </p>

      {/* Indicators and buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentStep(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentStep ? 'w-5 bg-slate-900' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition"
            >
              <span>{isPl ? 'Dalej' : 'Next'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleDismiss}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
            >
              <span>{isPl ? 'Rozumiem, zaczynamy!' : 'Got it, let\'s go!'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
