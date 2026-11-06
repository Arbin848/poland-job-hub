import React, { useRef, useState } from 'react';
import { CVData, LanguageCode, TemplateId } from '../types/cv';
import { sanitizeCVData } from '../data/sanitizeCv';
import { calculateCvScore } from './CvScore';
import {
  Printer,
  Sparkles,
  HelpCircle,
  Palette,
  Briefcase,
  FileText,
  MailPlus,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Upload,
  Copy,
  Menu,
  Sliders,
  Building,
  Calculator,
  Search,
  History,
  Box,
  Layers,
  FileQuestion,
  TrendingUp,
  Download,
  Home
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  onOpenHome?: () => void;
  onOpenPresets: () => void;
  onOpenEuropassComparison: () => void;
  onOpenAtsAnalyzer: () => void;
  onOpenRecruiterAudit: () => void;
  onOpenAgencyGuide: () => void;
  onOpenImportEuropass: () => void;
  onOpenTemplatesModal: () => void;
  onOpenPlainTextModal: () => void;
  onOpenMobileSheet: () => void;
  onPrintPdf: () => void;
  onOpenCandidateSuccess?: () => void;
  onOpenCandidateSuccessTab?: (tab: 'wizard' | 'legal' | 'salary' | 'jobs' | 'interview') => void;
  onToggle3D?: () => void;
  is3DActive?: boolean;
  onOpenCvScore?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenVersionsModal?: () => void;
  onOpenTrackerModal?: () => void;
  onOpenCareerKit?: () => void;
  onOpenTour?: () => void;
  onOpenStartScreen?: () => void;
  onDownloadBackup?: () => void;
  onOpenGuidedEditor?: () => void;
}

export const Header: React.FC<Props> = ({
  cv,
  onChangeCv,
  onOpenHome,
  onOpenPresets,
  onOpenEuropassComparison,
  onOpenAtsAnalyzer,
  onOpenRecruiterAudit,
  onOpenAgencyGuide,
  onOpenImportEuropass,
  onOpenTemplatesModal,
  onOpenPlainTextModal,
  onOpenMobileSheet,
  onPrintPdf,
  onOpenCandidateSuccess,
  onOpenCandidateSuccessTab,
  onToggle3D,
  is3DActive,
  onOpenCvScore,
  onOpenCommandPalette,
  onOpenVersionsModal,
  onOpenTrackerModal,
  onOpenCareerKit,
  onOpenTour,
  onOpenStartScreen,
  onDownloadBackup,
  onOpenGuidedEditor
}) => {
  const isPl = cv.language === 'pl';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const { score: cvScore } = calculateCvScore(cv);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cv, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(cv.personalInfo.fullName || 'CV').replace(/\s+/g, '_')}_PolJobHub.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleTriggerDownload = async (path: string, filename: string) => {
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

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result as string);
          if (imported && typeof imported === 'object') {
            onChangeCv(sanitizeCVData({ ...imported, id: `polcv-${Date.now()}` }));
          }
        } catch (err) {
          console.error('Invalid JSON file:', err);
        }
      };
      reader.readAsText(file);
    }
    // Defensive reset of file input so re-selecting same file triggers onChange
    e.target.value = '';
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 print:hidden shadow-xs">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Start Screen Launcher */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenHome || onOpenStartScreen}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl cursor-pointer"
            title={isPl ? 'Strona główna PolJobHub' : 'PolJobHub Homepage'}
            aria-label={isPl ? 'PolJobHub - Przejdź do strony głównej' : 'PolJobHub - Go to Homepage'}
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
              PJH
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  PolJobHub
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  2026
                </span>
              </div>
              <div className="text-[10.5px] text-slate-500 hidden sm:block font-medium">
                {isPl ? 'Profesjonalny Kreator CV · Rynek RP' : 'Polish Professional Career Suite'}
              </div>
            </div>
          </button>
        </div>

        {/* Global Search / Command Palette Trigger */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 rounded-xl text-xs text-slate-500 hover:text-slate-900 transition w-44 lg:w-64 justify-between focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="Command Palette (Ctrl+K)"
          aria-label={isPl ? 'Otwórz paletę komend i wyszukiwarkę (Ctrl+K)' : 'Open command palette and search (Ctrl+K)'}
        >
          <div className="flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium truncate">{isPl ? 'Szukaj akcji...' : 'Search commands...'}</span>
          </div>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>

        {/* Action Controls: Home + 4 Primary Buttons + More Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Home Button (Desktop/Tablet) */}
          {onOpenHome && (
            <button
              type="button"
              onClick={onOpenHome}
              className="hidden sm:flex px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
              title={isPl ? 'Wróć do strony głównej' : 'Back to Homepage'}
              aria-label={isPl ? 'Wróć do strony głównej' : 'Back to Homepage'}
            >
              <Home className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden lg:inline">{isPl ? 'Strona Główna' : 'Home'}</span>
            </button>
          )}

          {/* 1. Templates Button */}
          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="hidden sm:flex px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition items-center gap-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            title={isPl ? 'Wybierz szablon CV' : 'Choose CV Template'}
            aria-label={isPl ? 'Wybierz szablon CV' : 'Choose CV Template'}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isPl ? 'Szablony' : 'Templates'}</span>
          </button>

          {/* 2. CV Score Ring/Badge (Desktop/Tablet) */}
          <button
            type="button"
            onClick={onOpenCvScore}
            className={`hidden sm:flex px-2.5 py-1 rounded-lg text-xs font-bold items-center gap-1.5 transition border shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              cvScore >= 80
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                : cvScore >= 60
                ? 'text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100'
                : 'text-rose-800 bg-rose-50 border-rose-200 hover:bg-rose-100'
            }`}
            title={isPl ? 'Lokalna ocena punktowa CV (0-100)' : 'CV Quality Score (0-100)'}
            aria-label={isPl ? `Ocena jakości CV: ${cvScore} na 100 punktów` : `CV score: ${cvScore} out of 100`}
          >
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[9px] font-black font-mono">
              {cvScore}
            </div>
            <span className="hidden sm:inline">{isPl ? 'Ocena CV' : 'CV Score'}</span>
          </button>

          {/* 3. More ▾ Dropdown (Organized as Tools / Import-Export / Guides - Desktop) */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setMoreDropdownOpen((v) => !v)}
              aria-label={isPl ? 'Więcej opcji i narzędzi' : 'More tools and options'}
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">{isPl ? 'Więcej' : 'More'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setMoreDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 py-2 text-xs animate-in fade-in duration-100 max-h-[85vh] overflow-y-auto">
                  {/* GROUP 1: TOOLS */}
                  <div className="px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isPl ? 'Narzędzia & Dokumenty' : 'Tools & Documents'}
                  </div>

                  {onOpenGuidedEditor && (
                    <button
                      type="button"
                      onClick={() => { onOpenGuidedEditor(); setMoreDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-left bg-indigo-50/70 hover:bg-indigo-100/70 flex items-center gap-2.5 text-indigo-900 border-b border-indigo-100/50"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <div className="font-bold text-indigo-950">{isPl ? 'Kreator Krok po Kroku (V5)' : '5-Step Guided Editor (V5)'}</div>
                        <div className="text-[10px] text-indigo-600 font-medium">{isPl ? 'Uproszczona ścieżka dla kandydata' : 'Simplified 5-step workflow'}</div>
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => { onChangeCv({ ...cv, activeDocument: 'cv' }); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Dokument CV (A4)' : 'CV Document (A4)'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Główny edytor życiorysu' : 'Primary resume'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onChangeCv({ ...cv, activeDocument: 'cover-letter' }); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <MailPlus className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'List Motywacyjny (A4)' : 'Cover Letter (A4)'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Zintegrowany z CV i ofertą' : 'Business cover letter'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onChangeCv({ ...cv, activeDocument: 'agency-onepager' }); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <Building className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Karta Kandydata (Agencja)' : 'Candidate One-Pager'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Format dla biur rekrutacji' : 'Agency desk format'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenCareerKit?.(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <Briefcase className="w-4 h-4 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Career Kit · Niezbędnik' : 'Career Kit Drawer'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Kalkulator płac, prawo RP, audio' : 'Salary calc, legal, audio'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenAtsAnalyzer(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Skaner Oferty Pracy (ATS)' : 'ATS Job Offer Matcher'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Wykryj brakujące słowa kluczowe' : 'Find missing keywords'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenVersionsModal?.(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <History className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Wersje CV & Dopasowanie' : 'CV Versions & Tailoring'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Zapisuj kopie pod różne oferty' : 'Multiple job-specific versions'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenTrackerModal?.(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Tracker Aplikacji (CSV)' : 'Application Tracker (CSV)'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Śledź terminy i stawki netto' : 'Track jobs and interviews'}</div>
                    </div>
                  </button>

                  {onToggle3D && (
                    <button
                      type="button"
                      onClick={() => { onToggle3D(); setMoreDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                    >
                      <Box className="w-4 h-4 text-purple-600 shrink-0" />
                      <div>
                        <div className="font-semibold">{isPl ? 'Prezentacja Biurkowa 3D' : '3D Desk Showcase'}</div>
                        <div className="text-[10px] text-slate-400">{isPl ? 'Interaktywny model 360°' : 'Interactive 3D view'}</div>
                      </div>
                    </button>
                  )}

                  {/* GROUP 2: IMPORT & EXPORT */}
                  <div className="border-t border-slate-100 my-1 pt-1.5 px-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isPl ? 'Import & Eksport' : 'Import & Export'}
                  </div>

                  <button
                    type="button"
                    onClick={() => { onOpenImportEuropass(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <Upload className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Import Europass / Starego CV' : 'Import Europass / Old CV'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Konwersja tekstu przez AI' : 'Extract from raw text'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenPlainTextModal(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <Copy className="w-4 h-4 text-slate-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Kopiuj Czysty Tekst (Plain Text)' : 'Copy Plain Text (ATS)'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Wklej do portali rekrutacyjnych' : 'Paste into job boards'}</div>
                    </div>
                  </button>

                  <div className="px-3.5 py-1.5 flex items-center justify-between text-[11px] text-slate-600 bg-slate-50/70 rounded-lg mx-2 my-0.5">
                    <span className="font-medium">{isPl ? 'Kopia JSON:' : 'JSON Backup:'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => { fileInputRef.current?.click(); setMoreDropdownOpen(false); }}
                        className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-100 rounded text-[10px] font-bold text-slate-700"
                      >
                        {isPl ? 'Wczytaj' : 'Restore'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { handleExportJson(); setMoreDropdownOpen(false); }}
                        className="px-2 py-0.5 bg-white border border-slate-200 hover:bg-slate-100 rounded text-[10px] font-bold text-slate-700"
                      >
                        {isPl ? 'Zapisz' : 'Save'}
                      </button>
                    </div>
                  </div>

                  <a
                    href="/Round2_Design_Verification_Report.pdf"
                    download="Round2_Design_Verification_Report.pdf"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-emerald-50 flex items-center gap-2.5 text-slate-800 transition"
                  >
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-emerald-900">{isPl ? 'Raport Weryfikacji Gemini (PDF)' : 'Gemini Verification Report (PDF)'}</div>
                      <div className="text-[10px] text-emerald-600 font-medium">{isPl ? 'Oficjalny audyt techniczny (1.6 MB)' : 'Official technical audit (1.6 MB)'}</div>
                    </div>
                  </a>


                  {/* GROUP 3: GUIDES & AUDITS */}
                  <div className="border-t border-slate-100 my-1 pt-1.5 px-3.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isPl ? 'Przewodniki & Wiedza' : 'Guides & Compliance'}
                  </div>

                  <button
                    type="button"
                    onClick={() => { onOpenRecruiterAudit(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Głęboki Audyt Rekrutera & RODO' : 'Deep Recruiter Audit'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? '10-punktowa kontrola prawna RP' : '10-point checklist'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenAgencyGuide(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Poradnik Agencji Pracy w RP' : 'Polish Agency Guide'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Certyfikaty KRAZ i rekrutacja' : 'KRAZ registry tips'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenEuropassComparison(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <FileQuestion className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Europass vs Nowoczesne CV' : 'Europass vs Modern CV'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Porównanie szans rekrutacyjnych' : 'Comparative analysis'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenPresets(); setMoreDropdownOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                  >
                    <Layers className="w-4 h-4 text-slate-600 shrink-0" />
                    <div>
                      <div className="font-semibold">{isPl ? 'Wzorce Branżowe (Presety)' : 'Industry Presets'}</div>
                      <div className="text-[10px] text-slate-400">{isPl ? 'Logistyka, IT, Produkcja, Studenci' : 'Pre-filled sample profiles'}</div>
                    </div>
                  </button>

                  {onDownloadBackup && (
                    <button
                      type="button"
                      onClick={() => { onDownloadBackup(); setMoreDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                    >
                      <Download className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <div className="font-semibold">{isPl ? 'Kopia Kodu Źródłowego' : 'Download Source Backup'}</div>
                        <div className="text-[10px] text-slate-400">poljobhub_stage3a_final_checkpoint.tar.gz (27 MB)</div>
                      </div>
                    </button>
                  )}

                  {onOpenTour && (
                    <button
                      type="button"
                      onClick={() => { onOpenTour(); setMoreDropdownOpen(false); }}
                      className="w-full px-3.5 py-1.5 text-left hover:bg-slate-50 flex items-center gap-2.5 text-slate-800"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <div className="font-semibold">{isPl ? 'Przewodnik po Aplikacji (Tour)' : 'First-Run Tour'}</div>
                        <div className="text-[10px] text-slate-400">{isPl ? 'Szybkie wprowadzenie w 4 krokach' : '4-step walkthrough'}</div>
                      </div>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* 4. Language Switcher (PL / EN) */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100 text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => onChangeCv({ ...cv, language: 'pl' })}
              aria-label="Przełącz język na Polski (PL)"
              className={`px-2.5 py-1 rounded transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${cv.language === 'pl' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900'}`}
              title="Polski (PL)"
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => onChangeCv({ ...cv, language: 'en' })}
              aria-label="Switch language to English (EN)"
              className={`px-2.5 py-1 rounded transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 ${cv.language === 'en' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900'}`}
              title="English (EN)"
            >
              EN
            </button>
          </div>

          {/* Primary CTA: Download PDF */}
          <button
            type="button"
            onClick={onPrintPdf}
            aria-label={isPl ? 'Pobierz lub wydrukuj CV w formacie PDF (A4)' : 'Download or print CV as PDF (A4)'}
            className="px-2.5 sm:px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition shrink-0 min-h-[38px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isPl ? 'Pobierz PDF' : 'Download PDF'}</span>
          </button>

          {/* Mobile Sheet Trigger */}
          <button
            type="button"
            onClick={onOpenMobileSheet}
            className="md:hidden px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition min-h-[38px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={isPl ? 'Otwórz menu mobilne' : 'Open mobile menu'}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Hidden JSON file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportJson}
          accept=".json"
          className="hidden"
        />
      </div>
    </header>
  );
};
