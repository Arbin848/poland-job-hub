import React, { useState } from 'react';
import { CVData, LanguageCode } from '../../../types/cv';
import { X, ZoomIn, ZoomOut, RotateCcw, Printer, FileText } from 'lucide-react';
import { V5MultipageCanvas } from './V5MultipageCanvas';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  language: LanguageCode;
  onPrintPdf: () => void;
}

export const V5MobilePreviewModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cv,
  language,
  onPrintPdf
}) => {
  const isPl = language === 'pl';
  const [zoom, setZoom] = useState(0.46);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isPl ? 'Pełny podgląd dokumentu CV' : 'Full CV Document Preview'}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between"
    >
      {/* Top Modal Bar */}
      <div className="bg-[#18233F] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span className="font-bold text-sm tracking-tight">
            {isPl ? 'Podgląd A4' : 'A4 Preview'}
          </span>
          <span className="text-xs text-slate-400 font-mono">({cv.templateId})</span>
        </div>

        {/* Zoom controls & close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.3, Math.round((z - 0.05) * 100) / 100))}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            title="Pomniejsz"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono text-slate-300 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.0, Math.round((z + 0.05) * 100) / 100))}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
            title="Powiększ"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white ml-2 cursor-pointer"
            title="Zamknij"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
        <div className="w-[820px] max-w-full origin-top">
          <V5MultipageCanvas cv={cv} zoom={zoom} />
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-[#18233F] border-t border-white/10 p-3 px-4 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs cursor-pointer"
        >
          {isPl ? 'Wróć do edycji' : 'Back to editing'}
        </button>

        <button
          type="button"
          onClick={onPrintPdf}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{isPl ? 'Drukuj / Zapisz PDF' : 'Print / Save PDF'}</span>
        </button>
      </div>
    </div>
  );
};
