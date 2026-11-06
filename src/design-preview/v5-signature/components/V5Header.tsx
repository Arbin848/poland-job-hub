import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Eye, FileText, CheckCircle2, Globe, Shield, Printer, Download, Menu, X } from 'lucide-react';
import { V5ViewMode, V5StepId, V5_STEPS } from '../types';
import { LanguageCode } from '../../../types/cv';
import { downloadStage3CZip, downloadGitBundle, downloadSourceZip } from '../../../utils/downloadEvidenceZip';

interface Props {
  viewMode: V5ViewMode;
  onSetViewMode: (mode: V5ViewMode) => void;
  currentStep: V5StepId;
  onSelectStep: (step: V5StepId) => void;
  language: LanguageCode;
  onToggleLanguage: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onReturnToProduction: () => void;
  onPrintPdf: () => void;
  onOpenEvidenceModal?: () => void;
}

export const V5Header: React.FC<Props> = ({
  viewMode,
  onSetViewMode,
  currentStep,
  onSelectStep,
  language,
  onToggleLanguage,
  reducedMotion,
  onToggleReducedMotion,
  onReturnToProduction,
  onPrintPdf,
  onOpenEvidenceModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isPl = language === 'pl';

  const [stage3CStatus, setStage3CStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [stage3CMessage, setStage3CMessage] = useState<string>('');

  const handleTriggerStage3C = async () => {
    await downloadStage3CZip((status, msg) => {
      setStage3CStatus(status);
      if (msg) setStage3CMessage(msg);
    });
  };

  const [gitBundleStatus, setGitBundleStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [gitBundleMessage, setGitBundleMessage] = useState<string>('');

  const handleTriggerGitBundle = async () => {
    await downloadGitBundle((status, msg) => {
      setGitBundleStatus(status);
      if (msg) setGitBundleMessage(msg);
    });
  };

  const [sourceZipStatus, setSourceZipStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [sourceZipMessage, setSourceZipMessage] = useState<string>('');

  const handleTriggerSourceZip = async () => {
    await downloadSourceZip((status, msg) => {
      setSourceZipStatus(status);
      if (msg) setSourceZipMessage(msg);
    });
  };

  const [isDownloadingStage3B, setIsDownloadingStage3B] = useState<boolean>(false);

  const handleDownloadStage3B = async () => {
    try {
      setIsDownloadingStage3B(true);
      const res = await fetch('/api/download/stage3b-zip');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'PolJobHub_Stage3B_Guided_Editor_Acceptance.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 4000);
    } catch (err) {
      console.warn('Fallback direct window download:', err);
      window.location.href = '/PolJobHub_Stage3B_Guided_Editor_Acceptance.zip';
    } finally {
      setTimeout(() => setIsDownloadingStage3B(false), 1200);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#18233F]/98 backdrop-blur-md border-b border-white/10 text-white select-none transition-all print:hidden">
      <div className="max-w-[1720px] mx-auto px-3.5 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* ================= LEFT: Compact Brand Logo ================= */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onReturnToProduction}
            className="hidden sm:flex px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition items-center gap-1.5 cursor-pointer"
            title={isPl ? 'Powrót do wersji produkcyjnej' : 'Return to production application'}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isPl ? 'Produkcja' : 'Production'}</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              <span>PolJobHub</span>
              <span className="text-[10.5px] font-mono font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 px-1.5 py-0.5 rounded">
                V5
              </span>
            </span>
            <span className="hidden lg:inline text-xs text-slate-400">·</span>
            <span className="hidden lg:inline text-xs text-slate-300">
              {isPl ? 'Standard Rynku RP & UE' : 'Polish & EU Standard'}
            </span>
          </div>
        </div>

        {/* ================= DESKTOP CENTER: View Switcher / Wizard Steps ================= */}
        <div className="hidden md:flex items-center gap-2">
          {viewMode === 'homepage' ? (
            <div className="flex items-center bg-black/30 border border-white/10 rounded-xl p-1 text-xs">
              <button
                type="button"
                onClick={() => onSetViewMode('homepage')}
                className="px-3.5 py-1.5 rounded-lg font-bold bg-white text-slate-900 shadow-sm transition cursor-pointer"
              >
                {isPl ? 'Strona Główna' : 'Homepage'}
              </button>
              <button
                type="button"
                onClick={() => onSetViewMode('editor')}
                className="px-3.5 py-1.5 rounded-lg font-medium text-slate-300 hover:text-white transition cursor-pointer"
              >
                {isPl ? 'Kreator CV (5 Kroków)' : 'CV Builder (5 Steps)'}
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center bg-black/30 border border-white/10 rounded-xl p-1 gap-1 text-xs">
              <button
                type="button"
                onClick={() => onSetViewMode('homepage')}
                className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-white transition font-medium cursor-pointer"
              >
                {isPl ? '← Ekran powitalny' : '← Overview'}
              </button>
              <div className="w-px h-4 bg-white/20 mx-1" />
              {V5_STEPS.map((s) => {
                const isActive = currentStep === s.id;
                const isPassed = currentStep > s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectStep(s.id)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white shadow-sm font-bold'
                        : isPassed
                        ? 'text-emerald-300 hover:text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-80">0{s.id}</span>
                    <span>{isPl ? s.titlePl.split(' ')[0] : s.titleEn.split(' ')[0]}</span>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= DESKTOP RIGHT: Quick Controls ================= */}
        <div className="hidden md:flex items-center gap-2">
          {/* Reduced motion toggle */}
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1 cursor-pointer ${
              reducedMotion
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
            title={isPl ? 'Przełącz animacje (dostępność / reduced-motion)' : 'Toggle animations (prefers-reduced-motion)'}
          >
            <span className="text-[11px] font-mono">{reducedMotion ? '⚡ Ruch: Wył' : '✨ Ruch: Wł'}</span>
          </button>

          {/* Language Switch */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition flex items-center gap-1 cursor-pointer"
            title={isPl ? 'Zmień język na angielski' : 'Switch language to Polish'}
          >
            <Globe className="w-3 h-3 text-slate-400" />
            <span className="font-mono uppercase">{language}</span>
          </button>

          {/* Download Git Bundle for Google Antigravity */}
          <button
            type="button"
            onClick={handleTriggerGitBundle}
            disabled={gitBundleStatus === 'downloading'}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer ring-1 ring-indigo-400/40 disabled:opacity-80"
            title="Pobierz pełne repozytorium Git (poljobhub_v5_repo.bundle, 33 MB) dla Google Antigravity"
            aria-label="Pobierz Git Bundle dla Antigravity"
          >
            <Download className={`w-3.5 h-3.5 text-indigo-200 ${gitBundleStatus === 'downloading' ? 'animate-bounce' : ''}`} />
            <span>
              {gitBundleStatus === 'downloading'
                ? (gitBundleMessage || 'Pobieranie (33 MB)...')
                : gitBundleStatus === 'success'
                ? (gitBundleMessage || '✓ Pobrano Bundle!')
                : '⬇ Git Bundle (33 MB)'}
            </span>
          </button>

          {/* Download Source Code ZIP (438 KB - Lightweight instant download) */}
          <button
            type="button"
            onClick={handleTriggerSourceZip}
            disabled={sourceZipStatus === 'downloading'}
            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer ring-1 ring-teal-400/40 disabled:opacity-80"
            title="Pobierz lekki ZIP ze wszystkimi plikami źródłowymi, szablonami i dokumentacją (438 KB)"
            aria-label="Pobierz Kod ZIP (438 KB)"
          >
            <Download className={`w-3.5 h-3.5 text-teal-200 ${sourceZipStatus === 'downloading' ? 'animate-bounce' : ''}`} />
            <span>
              {sourceZipStatus === 'downloading'
                ? (sourceZipMessage || 'Pobieranie...')
                : sourceZipStatus === 'success'
                ? (sourceZipMessage || '✓ Pobrano Kod!')
                : '⬇ Kod ZIP (438 KB)'}
            </span>
          </button>

          {/* Direct Stage 3C Download Button (Multi-tier: Blob -> Base64 -> Iframe -> Location) */}
          <button
            type="button"
            onClick={handleTriggerStage3C}
            disabled={stage3CStatus === 'downloading'}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer ring-1 ring-emerald-400/40 disabled:opacity-80"
            title="Pobierz paczkę akceptacyjną Stage 3C PolJobHub_Stage3C_Multipage_A4_Acceptance.zip (8.34 MB)"
            aria-label="Pobierz Paczkę Stage 3C (ZIP)"
          >
            <Download className={`w-3.5 h-3.5 text-emerald-200 ${stage3CStatus === 'downloading' ? 'animate-bounce' : ''}`} />
            <span>
              {stage3CStatus === 'downloading'
                ? (stage3CMessage || 'Pobieranie ZIP (8.3 MB)...')
                : stage3CStatus === 'success'
                ? (stage3CMessage || '✓ Pobrano ZIP!')
                : '⬇ Download Stage 3C Evidence ZIP'}
            </span>
          </button>

          {/* Download Evidence Package Modal Trigger */}
          {onOpenEvidenceModal && (
            <button
              type="button"
              onClick={onOpenEvidenceModal}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Otwórz centrum weryfikacji i wszystkie materiały"
            >
              <span>Wszystkie Materiały</span>
            </button>
          )}

          {/* Direct Print / Start CTA */}
          {viewMode === 'editor' ? (
            <button
              type="button"
              onClick={onPrintPdf}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPl ? 'Drukuj / PDF' : 'Print / PDF'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onSetViewMode('editor')}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isPl ? 'Stwórz Moje CV' : 'Create My CV'}</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        {/* ================= MOBILE CONTROLS (360px, 390px, 430px Responsive) ================= */}
        <div className="md:hidden flex items-center gap-2">
          {viewMode === 'homepage' ? (
            <button
              type="button"
              onClick={() => onSetViewMode('editor')}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white font-bold text-xs shadow-sm cursor-pointer"
            >
              <span>{isPl ? 'Stwórz CV' : 'Create CV'}</span>
            </button>
          ) : (
            <span className="font-mono text-xs font-bold text-indigo-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
              Krok {currentStep}/5
            </span>
          )}

          {/* Accessible Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={isPl ? 'Otwórz menu nawigacji' : 'Open navigation menu'}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center cursor-pointer transition"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-amber-300" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ================= ACCESSIBLE MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131B32] border-t border-white/10 p-4 space-y-4 animate-fadeIn">
          {/* View switcher */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => {
                onSetViewMode('homepage');
                setMobileMenuOpen(false);
              }}
              className={`py-2 rounded-xl text-center font-bold transition cursor-pointer ${
                viewMode === 'homepage' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white/5 text-slate-300'
              }`}
            >
              {isPl ? 'Strona Główna' : 'Homepage'}
            </button>
            <button
              type="button"
              onClick={() => {
                onSetViewMode('editor');
                setMobileMenuOpen(false);
              }}
              className={`py-2 rounded-xl text-center font-bold transition cursor-pointer ${
                viewMode === 'editor' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white/5 text-slate-300'
              }`}
            >
              {isPl ? 'Kreator CV' : 'CV Editor'}
            </button>
          </div>

          {/* Step Selector in Editor Mode */}
          {viewMode === 'editor' && (
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isPl ? 'Wybierz Krok Kreatora:' : 'Jump to Step:'}
              </span>
              <div className="grid grid-cols-5 gap-1.5">
                {V5_STEPS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      onSelectStep(s.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex flex-col items-center gap-0.5 ${
                      currentStep === s.id
                        ? 'bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>0{s.id}</span>
                    <span className="text-[9px] font-normal truncate max-w-[50px]">
                      {isPl ? s.titlePl.split(' ')[0] : s.titleEn.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Utilities: Language, Reduced Motion, ZIP Package */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
            <button
              type="button"
              onClick={() => {
                onToggleLanguage();
              }}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-slate-200 font-semibold cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Język: {language.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleReducedMotion();
              }}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-1.5 text-slate-200 font-semibold cursor-pointer"
            >
              <span>{reducedMotion ? '⚡ Ruch: Wył' : '✨ Ruch: Wł'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              handleTriggerGitBundle();
              setMobileMenuOpen(false);
            }}
            disabled={gitBundleStatus === 'downloading'}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-80"
          >
            <Download className={`w-4 h-4 text-indigo-200 ${gitBundleStatus === 'downloading' ? 'animate-bounce' : ''}`} />
            <span>
              {gitBundleStatus === 'downloading'
                ? 'Pobieranie Bundle (33 MB)...'
                : gitBundleStatus === 'success'
                ? '✓ Pobrano Bundle!'
                : '⬇ Pobierz Git Bundle (33 MB)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleTriggerStage3C();
              setMobileMenuOpen(false);
            }}
            disabled={stage3CStatus === 'downloading'}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-80"
          >
            <Download className={`w-4 h-4 text-emerald-200 ${stage3CStatus === 'downloading' ? 'animate-bounce' : ''}`} />
            <span>
              {stage3CStatus === 'downloading'
                ? 'Pobieranie ZIP (8.3 MB)...'
                : stage3CStatus === 'success'
                ? '✓ Pobrano ZIP!'
                : '⬇ Download Stage 3C Evidence ZIP'}
            </span>
          </button>

          {onOpenEvidenceModal && (
            <button
              type="button"
              onClick={() => {
                onOpenEvidenceModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Wszystkie Materiały Weryfikacji</span>
            </button>
          )}

          {/* Return to production link */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <button
              type="button"
              onClick={() => {
                onReturnToProduction();
                setMobileMenuOpen(false);
              }}
              className="text-slate-300 hover:text-white flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isPl ? 'Wróć do wersji produkcyjnej' : 'Return to Production'}</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500">v5.1-refined</span>
          </div>
        </div>
      )}
    </header>
  );
};
