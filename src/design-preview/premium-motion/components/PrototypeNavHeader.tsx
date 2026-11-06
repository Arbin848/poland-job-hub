import React from 'react';
import { THEME } from '../tokens';
import {
  Sparkles,
  Layout,
  Palette,
  Smartphone,
  ArrowLeft,
  Eye,
  CheckCircle2,
  FileText,
  Archive,
  Download
} from 'lucide-react';

export type PrototypeViewMode = 'homepage' | 'editor' | 'gallery' | 'mobile';

interface Props {
  currentView: PrototypeViewMode;
  onSelectView: (view: PrototypeViewMode) => void;
  onReturnToProduction: () => void;
}

export const PrototypeNavHeader: React.FC<Props> = ({
  currentView,
  onSelectView,
  onReturnToProduction
}) => {
  const views: { id: PrototypeViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'homepage', label: '1. Landing Page', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'editor', label: '2. Trójpanelowy Edytor', icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: '3. Galeria 10 Szablonów', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'mobile', label: '4. Widok Mobilny (Smartfon)', icon: <Smartphone className="w-3.5 h-3.5" /> }
  ];

  const triggerDownload = async (path: string, filename: string) => {
    try {
      const res = await fetch(path);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 1000);
    } catch {
      window.location.href = path;
    }
  };

  return (
    <header className="bg-white border-b border-[#E5E8F3] px-3 sm:px-6 py-2.5 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Prototype Brand Badge */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6250F4] to-[#A447F4] text-white flex items-center justify-center font-black text-xs shadow-xs">
            PJ
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-[#18233F]">PolJobHub</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6250F4]/10 text-[#6250F4] border border-[#6250F4]/20">
                Premium Motion Prototype
              </span>
            </div>
            <div className="text-[10px] text-[#75819C]">
              Izolowany prototyp UI/UX (Brak wpływu na dane produkcyjne)
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-[#F8F9FF] p-1 rounded-xl border border-[#E5E8F3] overflow-x-auto max-w-full">
          {views.map((v) => {
            const isActive = currentView === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectView(v.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#6250F4] shadow-xs border border-[#E5E8F3]'
                    : 'text-[#75819C] hover:text-[#18233F]'
                }`}
              >
                {v.icon}
                <span>{v.label}</span>
              </button>
            );
          })}
        </div>

        {/* Download Action Group */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => triggerDownload('/Round2_Design_Verification_Report.pdf', 'Round2_Design_Verification_Report.pdf')}
            className="text-xs font-bold text-[#10b981] bg-[#ecfdf5] hover:bg-[#d1fae5] border border-[#a7f3d0] px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Pobierz pełny raport weryfikacji PDF (1.6 MB) bezpośrednio do folderu Pobrane"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Pobierz Raport PDF</span>
          </button>
          <button
            type="button"
            onClick={() => triggerDownload('/poljobhub_round2_updates_handoff.zip', 'poljobhub_round2_updates_handoff.zip')}
            className="text-xs font-bold text-[#6250F4] bg-[#F8F9FF] hover:bg-[#EEF0FF] border border-[#6250F4]/30 px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Pobierz paczkę ZIP ze wszystkimi zmianami i zrzutami ekranu (2.8 MB) bezpośrednio do folderu Pobrane"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Pobierz ZIP dla AI</span>
          </button>

          {/* Return to Classic App Button */}
          <button
            type="button"
            onClick={onReturnToProduction}
            className="text-xs font-bold text-[#75819C] hover:text-[#18233F] hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-transparent hover:border-slate-200 transition flex items-center gap-1.5 shrink-0 cursor-pointer"
            title="Wróć do wersji produkcyjnej"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Wróć do Classic App</span>
          </button>
        </div>
      </div>
    </header>
  );
};
