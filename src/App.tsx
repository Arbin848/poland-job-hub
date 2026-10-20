/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CVData, TemplateId } from './types/cv';
import { DEFAULT_CV } from './data/presets';
import { Header } from './components/Header';
import { EditorTabs } from './components/CVEditor/EditorTabs';
import { ResumeCanvas } from './components/CVPreview/ResumeCanvas';
import { FacultyPresetsModal } from './components/FacultyPresetsModal';
import { EuropassComparisonModal } from './components/EuropassComparisonModal';
import { AtsAnalyzerModal } from './components/AtsAnalyzerModal';
import { RecruiterAuditModal } from './components/RecruiterAuditModal';
import { PrintInstructionsModal } from './components/PrintInstructionsModal';
import { AgencyGuideModal } from './components/AgencyGuideModal';
import { ImportEuropassModal } from './components/ImportEuropassModal';
import { TemplatePickerModal } from './components/TemplatePickerModal';
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import { TemplateQuickStrip } from './components/TemplateQuickStrip';
import { PlainTextModal } from './components/PlainTextModal';
import { MobileActionSheet } from './components/MobileActionSheet';
import { CandidateSuccessModal } from './components/CandidateSuccessModal';
import { ThreeCvShowcase } from './components/ThreeD/ThreeCvShowcase';
import { ZoomIn, ZoomOut, RotateCcw, Eye, Edit3, Printer, Sparkles, CheckCircle2, Maximize2, Box, FileText, ShieldCheck, Palette } from 'lucide-react';

const STORAGE_KEY = 'polcv_studio_cv_data_v1';

const sanitizeCVData = (raw: any): CVData => {
  if (!raw || typeof raw !== 'object') return DEFAULT_CV;
  return {
    ...DEFAULT_CV,
    ...raw,
    personalInfo: {
      ...DEFAULT_CV.personalInfo,
      ...(raw.personalInfo || {}),
      fullName: raw.personalInfo?.fullName ?? DEFAULT_CV.personalInfo.fullName ?? '',
      jobTitle: raw.personalInfo?.jobTitle ?? DEFAULT_CV.personalInfo.jobTitle ?? '',
      email: raw.personalInfo?.email ?? DEFAULT_CV.personalInfo.email ?? '',
      phone: raw.personalInfo?.phone ?? DEFAULT_CV.personalInfo.phone ?? '',
      location: raw.personalInfo?.location ?? DEFAULT_CV.personalInfo.location ?? '',
      drivingLicense: raw.personalInfo?.drivingLicense ?? DEFAULT_CV.personalInfo.drivingLicense ?? '',
      workEligibility: raw.personalInfo?.workEligibility ?? DEFAULT_CV.personalInfo.workEligibility ?? '',
      workEligibilityType: raw.personalInfo?.workEligibilityType ?? DEFAULT_CV.personalInfo.workEligibilityType ?? 'Obywatelstwo UE',
      linkedIn: raw.personalInfo?.linkedIn ?? DEFAULT_CV.personalInfo.linkedIn ?? '',
      github: raw.personalInfo?.github ?? DEFAULT_CV.personalInfo.github ?? '',
      portfolio: raw.personalInfo?.portfolio ?? DEFAULT_CV.personalInfo.portfolio ?? '',
      photoUrl: raw.personalInfo?.photoUrl ?? DEFAULT_CV.personalInfo.photoUrl ?? '',
      qrCodeUrl: raw.personalInfo?.qrCodeUrl ?? DEFAULT_CV.personalInfo.qrCodeUrl ?? '',
      showQrCode: Boolean(raw.personalInfo?.showQrCode ?? DEFAULT_CV.personalInfo.showQrCode),
      showPhoto: Boolean(raw.personalInfo?.showPhoto ?? DEFAULT_CV.personalInfo.showPhoto),
    },
    rodo: {
      ...DEFAULT_CV.rodo,
      ...(raw.rodo || {})
    },
    coverLetter: {
      ...DEFAULT_CV.coverLetter,
      ...(raw.coverLetter || {})
    },
    agencyBadge: {
      ...DEFAULT_CV.agencyBadge,
      ...(raw.agencyBadge || {})
    },
    agencyProfile: {
      ...DEFAULT_CV.agencyProfile,
      ...(raw.agencyProfile || {})
    },
    activeDocument: raw.activeDocument || DEFAULT_CV.activeDocument || 'cv',
    sectionVisibility: {
      ...DEFAULT_CV.sectionVisibility,
      ...(raw.sectionVisibility || {})
    },
    experiences: Array.isArray(raw.experiences) ? raw.experiences : DEFAULT_CV.experiences,
    educations: Array.isArray(raw.educations) ? raw.educations : DEFAULT_CV.educations,
    technicalSkills: Array.isArray(raw.technicalSkills) ? raw.technicalSkills : DEFAULT_CV.technicalSkills,
    toolsAndCertificates: Array.isArray(raw.toolsAndCertificates) ? raw.toolsAndCertificates : DEFAULT_CV.toolsAndCertificates,
    softSkills: Array.isArray(raw.softSkills) ? raw.softSkills : DEFAULT_CV.softSkills,
    languages: Array.isArray(raw.languages) ? raw.languages : DEFAULT_CV.languages,
    certifications: Array.isArray(raw.certifications) ? raw.certifications : DEFAULT_CV.certifications,
    projects: Array.isArray(raw.projects) ? raw.projects : (DEFAULT_CV.projects || []),
  };
};

export default function App() {
  const [cv, setCv] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return sanitizeCVData(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Error reading from localStorage:', e);
    }
    return DEFAULT_CV;
  });

  const getAutoFitZoom = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        return Math.max(0.42, Math.round(((width - 24) / 820) * 100) / 100);
      } else if (width < 1024) {
        return Math.max(0.65, Math.round(((width - 48) / 820) * 100) / 100);
      }
    }
    return 0.95;
  };

  const [zoom, setZoom] = useState<number>(0.95);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const fileInputHiddenRef = useRef<HTMLInputElement>(null);

  // Modals state
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [europassOpen, setEuropassOpen] = useState(false);
  const [atsOpen, setAtsOpen] = useState(false);
  const [recruiterAuditOpen, setRecruiterAuditOpen] = useState(false);
  const [printInstructionsOpen, setPrintInstructionsOpen] = useState(false);
  const [agencyGuideOpen, setAgencyGuideOpen] = useState(false);
  const [importEuropassOpen, setImportEuropassOpen] = useState(false);
  const [templatesModalOpen, setTemplatesModalOpen] = useState(false);
  const [plainTextModalOpen, setPlainTextModalOpen] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [candidateSuccessOpen, setCandidateSuccessOpen] = useState(false);
  const [candidateSuccessTab, setCandidateSuccessTab] = useState<'wizard' | 'legal' | 'salary' | 'jobs' | 'interview'>('wizard');

  const openCandidateSuccessWithTab = (tab: 'wizard' | 'legal' | 'salary' | 'jobs' | 'interview' = 'wizard') => {
    setCandidateSuccessTab(tab);
    setCandidateSuccessOpen(true);
  };

  // Auto-fit on initial load or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && mobileTab === 'preview') {
        setZoom(getAutoFitZoom());
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileTab]);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [cv]);

  const handlePrintPdf = () => {
    window.print();
  };

  const executePrintDirectly = () => {
    window.print();
  };

  const handleApplyPreset = (presetData: Partial<CVData>) => {
    setCv((prev) => {
      const merged = {
        ...prev,
        ...presetData,
        activeDocument: presetData.activeDocument || 'cv',
        id: `polcv-${Date.now()}`,
        lastModified: new Date().toISOString()
      };
      return sanitizeCVData(merged);
    });
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('preview');
      setZoom(getAutoFitZoom());
    }
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    setCv((prev) => ({
      ...prev,
      templateId,
      activeDocument: 'cv'
    }));
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileTab('preview');
      setZoom(getAutoFitZoom());
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cv, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${(cv.personalInfo.fullName || 'CV').replace(/\s+/g, '_')}_PolCV_Studio.json`);
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
          if (imported && typeof imported === 'object') {
            setCv(sanitizeCVData({ ...imported, id: `polcv-${Date.now()}` }));
          }
        } catch (err) {
          console.error('Invalid JSON file:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  const isPl = cv.language === 'pl';

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans">
      {/* Top Main Navigation Header */}
      <Header
        cv={cv}
        onChangeCv={setCv}
        onOpenPresets={() => setPresetsOpen(true)}
        onOpenEuropassComparison={() => setEuropassOpen(true)}
        onOpenAtsAnalyzer={() => setAtsOpen(true)}
        onOpenRecruiterAudit={() => setRecruiterAuditOpen(true)}
        onOpenAgencyGuide={() => setAgencyGuideOpen(true)}
        onOpenImportEuropass={() => setImportEuropassOpen(true)}
        onOpenTemplatesModal={() => setTemplatesModalOpen(true)}
        onOpenPlainTextModal={() => setPlainTextModalOpen(true)}
        onOpenMobileSheet={() => setMobileSheetOpen(true)}
        onOpenCandidateSuccess={() => openCandidateSuccessWithTab('wizard')}
        onOpenCandidateSuccessTab={openCandidateSuccessWithTab}
        onPrintPdf={handlePrintPdf}
      />

      {/* Mobile Mode Switcher (only on screens < 1024px) */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-2 flex items-center justify-center gap-2 print:hidden sticky top-[65px] z-30 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition min-h-[44px] ${
            mobileTab === 'editor'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isPl ? 'Edytor Formularza' : 'CV Editor'}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setMobileTab('preview');
            setZoom(getAutoFitZoom());
          }}
          className={`flex-1 py-2 text-xs font-black rounded-lg flex items-center justify-center gap-1.5 transition min-h-[44px] ${
            mobileTab === 'preview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5 text-indigo-600" />
          <span>{isPl ? '👁️ Zobacz Dokument (A4)' : '👁️ View Document (A4)'}</span>
        </button>
      </div>

      {/* Mobile Floating Action Button to toggle view */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40 print:hidden">
        <button
          type="button"
          onClick={() => {
            const next = mobileTab === 'editor' ? 'preview' : 'editor';
            setMobileTab(next);
            if (next === 'preview') setZoom(getAutoFitZoom());
          }}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-full shadow-2xl flex items-center gap-2 ring-2 ring-white/90 shadow-indigo-500/50"
        >
          {mobileTab === 'editor' ? (
            <>
              <Eye className="w-4 h-4 text-amber-300" />
              <span>{isPl ? 'Zobacz Dokument (A4)' : 'View Document (A4)'}</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-white" />
              <span>{isPl ? 'Wróć do Edytora' : 'Back to Editor'}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-2 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side: Editor Panels */}
        <section
          className={`lg:col-span-5 h-[calc(100vh-140px)] print:hidden ${
            mobileTab === 'editor' ? 'block' : 'hidden lg:block'
          }`}
        >
          <EditorTabs
            cv={cv}
            onChange={setCv}
            language={cv.language}
            onOpenTemplatesModal={() => setTemplatesModalOpen(true)}
            onOpenPresetsModal={() => setPresetsOpen(true)}
          />
        </section>

        {/* Right Side: Live A4 Canvas Preview */}
        <section
          className={`lg:col-span-7 flex flex-col h-[calc(100vh-140px)] bg-slate-200/80 rounded-xl border border-slate-300 shadow-inner overflow-hidden ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:flex'
          }`}
        >
          {/* Canvas Floating Toolbar */}
          <div className="bg-white/95 backdrop-blur-xs border-b border-slate-300 px-3 sm:px-4 py-2 flex items-center justify-between text-xs print:hidden z-10 shrink-0">
            {/* Canvas Header / Controls */}
            <div className="flex items-center gap-3 flex-wrap">
              {cv.activeDocument === 'cv' ? (
                <>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
                      {isPl ? 'Szablon:' : 'Template:'}
                    </span>
                    <select
                      value={cv.templateId}
                      onChange={(e) => handleSelectTemplate(e.target.value as TemplateId)}
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer shadow-2xs"
                    >
                      <option value="modern-polish">Modern Polish Pro (Standard PL)</option>
                      <option value="swiss-executive">Swiss Executive (Corporate)</option>
                      <option value="clean-ats">Clean ATS Minimal (100% Parsed)</option>
                      <option value="creative-tech">Creative Tech (IT & Engineering)</option>
                      <option value="berlin-minimal">Neo-Berlin (Modern Contrast)</option>
                      <option value="elegance-serif">Elegance Serif (Legal & Consulting)</option>
                      <option value="euro-modern">Euro Modern (EU Schengen)</option>
                      <option value="nordic-clean">Nordic Clean (Scandinavian)</option>
                      <option value="academic-elite">Academic Elite (Higher Ed)</option>
                      <option value="dynamic-impact">Dynamic Impact (Sales & Marketing)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setTemplatesModalOpen(true)}
                      className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 rounded-lg text-xs font-bold transition items-center gap-1 hidden sm:flex"
                      title={isPl ? 'Otwórz pełną galerię szablonów' : 'Open full template gallery'}
                    >
                      <Palette className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{isPl ? 'Galeria' : 'Gallery'}</span>
                    </button>
                  </div>

                  {/* Accent Color Swatches in canvas bar */}
                  <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{isPl ? 'Akcent:' : 'Color:'}</span>
                    {[
                      { hex: '#1e3a8a', label: 'Navy' },
                      { hex: '#0f172a', label: 'Obsidian' },
                      { hex: '#065f46', label: 'Emerald' },
                      { hex: '#4f46e5', label: 'Indigo' },
                      { hex: '#b91c1c', label: 'Crimson' },
                      { hex: '#0369a1', label: 'Sky' },
                      { hex: '#78350f', label: 'Amber' }
                    ].map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setCv((prev) => ({ ...prev, accentColor: c.hex }))}
                        style={{ backgroundColor: c.hex }}
                        className={`w-3.5 h-3.5 rounded-full transition-transform ${
                          cv.accentColor === c.hex ? 'ring-2 ring-offset-1 ring-slate-900 scale-125' : 'hover:scale-110 opacity-80'
                        }`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-lg border border-slate-300 flex items-center gap-1.5">
                    <span>
                      {cv.activeDocument === 'agency-onepager' && (isPl ? 'Karta Kandydata (A4)' : 'Candidate Profile (A4)')}
                      {cv.activeDocument === 'cover-letter' && (isPl ? `List Motywacyjny: ${cv.coverLetter?.companyName || 'Pracodawca'}` : `Cover Letter: ${cv.coverLetter?.companyName || 'Employer'}`)}
                      {cv.activeDocument === 'legal-packet' && (isPl ? 'Pakiet Zgodności Prawnej RP (A4)' : 'Legal Permits Dossier (A4)')}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCv((p) => ({ ...p, activeDocument: 'cv' }))}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                  >
                    {isPl ? '← Wróć do edycji CV' : '← Back to CV'}
                  </button>
                </div>
              )}
            </div>

            {/* 2D Zoom controls & Auto-Fit button */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden md:inline mr-1">
                A4 · 210×297mm
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.35, Math.round((z - 0.1) * 100) / 100))}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                title={isPl ? 'Oddal' : 'Zoom Out'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-700 min-w-[38px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 100) / 100))}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                title={isPl ? 'Przybliż' : 'Zoom In'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoom(getAutoFitZoom())}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition flex items-center gap-1"
                title={isPl ? 'Dopasuj do ekranu' : 'Fit to Screen'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden md:inline font-semibold">{isPl ? 'Dopasuj' : 'Fit'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="ml-1 sm:ml-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Canvas Scroll Area or 3D Showcase */}
          {viewMode === '2d' ? (
            <div className="flex-1 overflow-y-auto overflow-x-auto p-2 sm:p-4 bg-slate-200/50 flex justify-center">
              <ResumeCanvas cv={cv} zoom={zoom} />
            </div>
          ) : (
            <div className="flex-1 w-full h-full min-h-[500px]">
              <ThreeCvShowcase cv={cv} language={cv.language} onClose={() => setViewMode('2d')} />
            </div>
          )}
        </section>
      </main>

      {/* Agency & Legal Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white py-3 px-4 text-center text-[10px] text-slate-500">
        <p>
          PolJobHub · {isPl ? 'Niezależny kreator CV i Listów Motywacyjnych dla rynku polskiego i europejskiego.' : 'Independent CV & Cover Letter builder for Polish and European labor markets.'}
        </p>
        <p className="text-slate-400 mt-0.5">
          {isPl
            ? 'Europass jest zarejestrowanym znakiem towarowym Unii Europejskiej. Serwis nie jest powiązany z Komisją Europejską (użycie w celach informacyjno-porównawczych).'
            : 'Europass is a registered trademark of the European Union. This service is not affiliated with the European Commission.'}
        </p>
      </footer>

      {/* Hidden file input for JSON restore */}
      <input
        type="file"
        ref={fileInputHiddenRef}
        onChange={handleImportJson}
        accept=".json"
        className="hidden"
      />

      {/* Modals & Drawers */}
      <TemplateGalleryModal
        isOpen={templatesModalOpen}
        onClose={() => setTemplatesModalOpen(false)}
        selectedTemplate={cv.templateId}
        onSelectTemplate={handleSelectTemplate}
        onLoadPreset={handleApplyPreset}
        language={cv.language}
      />

      <FacultyPresetsModal
        isOpen={presetsOpen}
        onClose={() => setPresetsOpen(false)}
        onSelectPreset={handleApplyPreset}
        language={cv.language}
      />

      <EuropassComparisonModal
        isOpen={europassOpen}
        onClose={() => setEuropassOpen(false)}
        language={cv.language}
        onSelectModernEuro={() => handleSelectTemplate('euro-modern')}
      />

      <AtsAnalyzerModal
        isOpen={atsOpen}
        onClose={() => setAtsOpen(false)}
        cv={cv}
        language={cv.language}
      />

      <AgencyGuideModal
        isOpen={agencyGuideOpen}
        onClose={() => setAgencyGuideOpen(false)}
        language={cv.language}
      />

      <ImportEuropassModal
        isOpen={importEuropassOpen}
        onClose={() => setImportEuropassOpen(false)}
        onImportSuccess={handleApplyPreset}
        language={cv.language}
      />

      <PlainTextModal
        isOpen={plainTextModalOpen}
        onClose={() => setPlainTextModalOpen(false)}
        cv={cv}
        language={cv.language}
      />

      <MobileActionSheet
        isOpen={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        language={cv.language}
        onOpenTemplates={() => setTemplatesModalOpen(true)}
        onOpenPresets={() => setPresetsOpen(true)}
        onOpenEuropass={() => setEuropassOpen(true)}
        onOpenAts={() => setAtsOpen(true)}
        onOpenRecruiterAudit={() => setRecruiterAuditOpen(true)}
        onOpenImport={() => setImportEuropassOpen(true)}
        onOpenPlainText={() => setPlainTextModalOpen(true)}
        onOpenGuide={() => setAgencyGuideOpen(true)}
        onExportJson={handleExportJson}
        onTriggerImportJson={() => fileInputHiddenRef.current?.click()}
        onPrintPdf={handlePrintPdf}
        onOpenCandidateSuccess={() => openCandidateSuccessWithTab('wizard')}
        onToggle3D={() => setViewMode((m) => (m === '2d' ? '3d' : '2d'))}
      />

      <RecruiterAuditModal
        isOpen={recruiterAuditOpen}
        onClose={() => setRecruiterAuditOpen(false)}
        cv={cv}
        onChangeCv={setCv}
        language={cv.language}
      />

      <PrintInstructionsModal
        isOpen={printInstructionsOpen}
        onClose={() => setPrintInstructionsOpen(false)}
        onProceedPrint={executePrintDirectly}
        language={cv.language}
      />

      <CandidateSuccessModal
        isOpen={candidateSuccessOpen}
        onClose={() => setCandidateSuccessOpen(false)}
        cv={cv}
        onApplyCV={handleApplyPreset}
        initialTab={candidateSuccessTab}
      />
    </div>
  );
}
