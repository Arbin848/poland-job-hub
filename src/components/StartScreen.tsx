import React from 'react';
import { LanguageCode } from '../types/cv';
import { Sparkles, Upload, Target, ArrowRight, X, FileCheck, ShieldCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onStartWizard: () => void;
  onImportCv: () => void;
  onTailorJob: () => void;
  language: LanguageCode;
}

export const StartScreen: React.FC<Props> = ({
  isOpen,
  onClose,
  onStartWizard,
  onImportCv,
  onTailorJob,
  language
}) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-8 border border-slate-200 relative my-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition"
          aria-label={isPl ? 'Zamknij' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>PolJobHub · {isPl ? 'Rynek Pracy RP & UE 2026' : 'Poland & EU Career Suite 2026'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isPl ? 'Jak chcesz rozpocząć pracę nad CV?' : 'How would you like to start?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            {isPl
              ? 'Wybierz jedną z 3 szybkich ścieżek, aby przygotować profesjonalne dokumenty aplikacyjne zgodne ze standardami polskich rekruterów i RODO.'
              : 'Choose one of 3 streamlined paths to build professional resumes compliant with Polish hiring and GDPR standards.'}
          </p>
        </div>

        {/* 3 Large Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Card 1: Quick Wizard */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartWizard();
            }}
            className="group text-left p-5 rounded-xl border-2 border-slate-200 hover:border-indigo-600 hover:shadow-lg bg-slate-50/50 hover:bg-white transition flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {isPl ? 'Stwórz nowe CV (2 min)' : 'Create new CV (2 min)'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isPl
                  ? 'Krótki przewodnik krok po kroku: dane, uprawnienia i profil zawodowy.'
                  : 'Fast step-by-step assistant for key credentials, target role, and impact.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-indigo-600 gap-1">
              <span>{isPl ? 'Rozpocznij kreator' : 'Launch wizard'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: Import Existing */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onImportCv();
            }}
            className="group text-left p-5 rounded-xl border-2 border-slate-200 hover:border-emerald-600 hover:shadow-lg bg-slate-50/50 hover:bg-white transition flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                {isPl ? 'Zaimportuj stare CV' : 'Import my old CV'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isPl
                  ? 'Wklej tekst ze starego PDF, Word lub Europass – AI wyodrębni dane do nowoczesnego wzoru.'
                  : 'Paste text from an old PDF, Word, or Europass. Auto-mapped into modern format.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-600 gap-1">
              <span>{isPl ? 'Wklej i konwertuj' : 'Paste & convert'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Job Ad Tailoring */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onTailorJob();
            }}
            className="group text-left p-5 rounded-xl border-2 border-slate-200 hover:border-amber-600 hover:shadow-lg bg-slate-50/50 hover:bg-white transition flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                {isPl ? 'Dopasuj do ogłoszenia' : 'Paste job ad & tailor'}
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {isPl
                  ? 'Wklej treść oferty pracy, a skaner ATS wskaże brakujące słowa kluczowe i szanse.'
                  : 'Scan any target job posting to detect missing keywords and maximize ATS match.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold text-amber-600 gap-1">
              <span>{isPl ? 'Skanuj ogłoszenie' : 'Scan posting'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Bottom Skip Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold underline underline-offset-4 transition"
          >
            {isPl ? 'Pomiń – otwórz bezpośrednio pełny edytor' : 'Skip – open full editor directly'}
          </button>
        </div>
      </div>
    </div>
  );
};
