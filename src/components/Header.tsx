import React, { useRef, useState } from 'react';
import { CVData, LanguageCode, TemplateId } from '../types/cv';
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
  Calculator
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
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
}

export const Header: React.FC<Props> = ({
  cv,
  onChangeCv,
  onOpenPresets,
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
}) => {
  const isPl = cv.language === 'pl';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const openTab = (tab: 'wizard' | 'legal' | 'salary' | 'jobs' | 'interview') => {
    if (onOpenCandidateSuccessTab) {
      onOpenCandidateSuccessTab(tab);
    } else if (onOpenCandidateSuccess) {
      onOpenCandidateSuccess();
    }
  };

  // Pre-flight health score calculation
  const rodoPass = Boolean(cv.rodo?.enabled && cv.rodo?.text?.length > 40);
  const phoneClean = (cv.personalInfo.phone || '').replace(/\s+/g, '');
  const phonePass = phoneClean.length >= 9;
  const emailPass = Boolean(cv.personalInfo.email && cv.personalInfo.email.includes('@'));
  const skillsPass = (cv.technicalSkills?.length || 0) >= 3;
  const expPass = (cv.experiences?.length || 0) > 0;
  const eduPass = (cv.educations?.length || 0) > 0;
  const auditScore = (rodoPass ? 25 : 0) + (phonePass ? 15 : 0) + (emailPass ? 15 : 0) + (skillsPass ? 15 : 0) + (expPass ? 15 : 0) + (eduPass ? 15 : 0);

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cv, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(cv.personalInfo.fullName || 'CV').replace(/\s+/g, '_')}_PolJobHub.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = JSON.parse(reader.result as string);
          if (imported && imported.personalInfo) {
            onChangeCv({ ...imported, id: `polcv-${Date.now()}` });
          }
        } catch (err) {
          console.error('Invalid JSON file:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 print:hidden shadow-xs">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm tracking-tight shadow-sm">
            PJH
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base text-slate-900 tracking-tight">
                PolJobHub
              </span>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                2026
              </span>
            </div>
            <div className="text-[10.5px] text-slate-500 hidden sm:block font-medium">
              {isPl ? 'Profesjonalny Kreator CV · Rynek Pracy w RP' : 'Polish Professional CV & Career Suite'}
            </div>
          </div>
        </div>

        {/* Center: Document Mode Switcher (Clean Segmented Bar) */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onChangeCv({ ...cv, activeDocument: 'cv' })}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              cv.activeDocument === 'cv'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isPl ? 'Dokument CV (A4)' : 'CV Document (A4)'}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeCv({ ...cv, activeDocument: 'cover-letter' })}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              cv.activeDocument === 'cover-letter'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MailPlus className="w-3.5 h-3.5 text-blue-600" />
            <span>{isPl ? 'List Motywacyjny' : 'Cover Letter'}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeCv({ ...cv, activeDocument: 'agency-onepager' })}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              cv.activeDocument === 'agency-onepager'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isPl ? 'Karta Kandydata (Agencja)' : 'Agency Profile'}</span>
          </button>
        </div>

        {/* Right Navigation & Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Wizard Trigger */}
          <button
            type="button"
            onClick={() => openTab('wizard')}
            className="hidden sm:flex px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 rounded-lg text-xs font-bold transition items-center gap-1.5 shadow-2xs"
            title={isPl ? 'Szybki asystent uzupełniania CV w 60 sekund' : 'Fast 60s CV Wizard'}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isPl ? 'Kreator 60s' : '60s Wizard'}</span>
          </button>

          {/* Industry Samples Modal */}
          <button
            type="button"
            onClick={onOpenPresets}
            className="hidden md:flex px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition items-center gap-1.5"
            title={isPl ? 'Wczytaj gotowy wzorzec branżowy' : 'Load Industry Samples'}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-600" />
            <span>{isPl ? 'Wzorce' : 'Samples'}</span>
          </button>

          {/* Templates Gallery Modal */}
          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="hidden sm:flex px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition items-center gap-1.5"
            title={isPl ? 'Wybierz styl i szablon CV' : 'Choose CV Template'}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isPl ? 'Szablony' : 'Templates'}</span>
          </button>

          {/* Recruiter Pre-Flight Score */}
          <button
            type="button"
            onClick={onOpenRecruiterAudit}
            className={`hidden xl:flex px-2 py-1 rounded-lg text-xs font-bold items-center gap-1.5 transition ${
              auditScore >= 80 ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100' : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
            title={isPl ? 'Audyt jakości i poprawności CV pod polski rynek' : 'CV Pre-Flight Audit'}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isPl ? 'Audyt' : 'Audit'}:</span>
            <span className="font-mono">{auditScore}%</span>
          </button>

          {/* Tools & Utilities Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setToolsDropdownOpen((v) => !v)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">{isPl ? 'Narzędzia' : 'Tools'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setToolsDropdownOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-40 py-1.5 text-xs animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isPl ? 'Kariera & Rynek Pracy' : 'Career & Market'}
                  </div>

                  <button
                    type="button"
                    onClick={() => { onOpenAtsAnalyzer(); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800 font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isPl ? 'Skaner ATS & Dopasowanie' : 'ATS Resume Scanner'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { openTab('salary'); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                  >
                    <Calculator className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{isPl ? 'Kalkulator Pensji Netto / Brutto' : 'Salary Net/Gross Calculator'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { openTab('legal'); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                  >
                    <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{isPl ? 'Legalizacja, Umowy i PESEL' : 'Work Permits & Labor Law'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenAgencyGuide(); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{isPl ? 'Poradnik Agencji Pracy' : 'Agency Employment Guide'}</span>
                  </button>

                  <div className="border-t border-slate-100 my-1 pt-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {isPl ? 'Import & Kopia' : 'Import & Backup'}
                  </div>

                  <button
                    type="button"
                    onClick={() => { onOpenImportEuropass(); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                  >
                    <Upload className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isPl ? 'Wczytaj Europass / Stare CV' : 'Import CV Text'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { onOpenPlainTextModal(); setToolsDropdownOpen(false); }}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2 text-slate-800"
                  >
                    <Copy className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{isPl ? 'Kopiuj tekst (Pracuj.pl/OLX)' : 'Copy Plain Text'}</span>
                  </button>

                  <div className="border-t border-slate-100 mt-1 pt-1.5 px-3 pb-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{isPl ? 'Kopia JSON:' : 'Backup:'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => { fileInputRef.current?.click(); setToolsDropdownOpen(false); }}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700"
                      >
                        {isPl ? 'Wczytaj' : 'Load'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { handleExportJson(); setToolsDropdownOpen(false); }}
                        className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700"
                      >
                        {isPl ? 'Zapisz' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-100 text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => onChangeCv({ ...cv, language: 'pl' })}
              className={`px-2.5 py-1 rounded transition ${cv.language === 'pl' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900'}`}
              title="Polski (PL)"
            >
              PL
            </button>
            <button
              type="button"
              onClick={() => onChangeCv({ ...cv, language: 'en' })}
              className={`px-2.5 py-1 rounded transition ${cv.language === 'en' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500 hover:text-slate-900'}`}
              title="English (EN)"
            >
              EN
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

          {/* Mobile Sheet Trigger */}
          <button
            type="button"
            onClick={onOpenMobileSheet}
            className="md:hidden px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 transition min-h-[38px]"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Primary CTA: Print / Download PDF */}
          <button
            type="button"
            onClick={onPrintPdf}
            className="px-3.5 sm:px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition shrink-0 min-h-[38px]"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>{isPl ? 'Pobierz PDF' : 'Download PDF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
