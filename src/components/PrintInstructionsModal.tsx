import React, { useState } from 'react';
import { LanguageCode } from '../types/cv';
import { Printer, Check, X, Sliders, Layers, Sparkles, HelpCircle } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onProceedPrint: () => void;
  language: LanguageCode;
}

export const PrintInstructionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onProceedPrint,
  language
}) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handlePrint = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('polcv_hide_print_modal', 'true');
      } catch (e) {
        // ignore
      }
    }
    onClose();
    onProceedPrint();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Jak pobrać perfekcyjny plik PDF z CV?' : 'How to export a perfect A4 PDF'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden my-auto flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                {isPl ? 'Jak pobrać perfekcyjny plik PDF z CV?' : 'How to export a perfect A4 PDF'}
              </h2>
              <p className="text-xs text-slate-300">
                {isPl ? 'Ustawienia okna drukowania przeglądarki' : 'Browser Print Dialog Settings'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Instruction Visual */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            {isPl
              ? 'W oknie drukowania, które zaraz się otworzy, upewnij się, że zaznaczone są poniższe 3 opcje, aby zachować kolory szablonu i format A4 bez białych ramek:'
              : 'In the system print dialog opening next, ensure these 3 options are selected to keep background colors and crisp A4 borders:'}
          </p>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {isPl ? 'Cel / Drukarka: "Zapisz jako PDF"' : 'Destination: "Save as PDF"'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {isPl ? 'Zapisze dokument jako wektorowy plik .pdf gotowy do wysłania.' : 'Generates a clean vector PDF file ready for recruiters.'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div>
                <div className="font-bold text-emerald-900">
                  {isPl ? 'Grafika tła: ZAZNACZONA (Włączona) ★' : 'Background graphics: CHECKED (ON) ★'}
                </div>
                <div className="text-[11px] text-emerald-700 mt-0.5">
                  {isPl ? 'BARDZO WAŻNE: Dzięki temu wydrukują się kolory akcentów, paski i ikony.' : 'CRITICAL: Ensures accent colors, badges, and headers are fully rendered.'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div>
                <div className="font-bold text-slate-900">
                  {isPl ? 'Marginesy: "Brak" lub "Domyślne"' : 'Margins: "None" or "Default"'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {isPl ? 'Ustawienie "Brak" usuwa sztuczne białe marginesy przeglądarki.' : 'Choosing "None" avoids unwanted blank gaps around the template.'}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="dontShowPrint"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="dontShowPrint" className="text-slate-600 text-[11px] cursor-pointer">
              {isPl ? 'Zapamiętaj i nie pokazuj tego okna ponownie' : 'Don’t show this guidance again'}
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold rounded-lg transition"
          >
            {isPl ? 'Anuluj' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>{isPl ? 'Otwórz okno drukowania / PDF' : 'Open Print / Save PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
