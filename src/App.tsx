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
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import { PlainTextModal } from './components/PlainTextModal';
import { MobileActionSheet } from './components/MobileActionSheet';
import { CandidateSuccessModal } from './components/CandidateSuccessModal';
import { ThreeCvShowcase } from './components/ThreeD/ThreeCvShowcase';
import { ZoomIn, ZoomOut, Eye, Edit3, Printer, CheckCircle2, Maximize2, Palette, Sparkles, Download } from 'lucide-react';
import { PremiumMotionPrototype } from './design-preview/premium-motion/PremiumMotionPrototype';
import { HeroLanding } from './components/HeroLanding';
import { InteractiveGallery } from './components/InteractiveGallery';
import { V4Hub } from './design-preview/v4/V4Hub';
import { V5SignatureApp } from './design-preview/v5-signature/V5SignatureApp';
import { V5Homepage } from './design-preview/v5-signature/V5Homepage';
import { V5VisualEvidenceModal } from './design-preview/v5-signature/components/V5VisualEvidenceModal';
import { V5GuidedEditor } from './design-preview/v5-signature/components/V5GuidedEditor';
import { V5StepId } from './design-preview/v5-signature/types';
import { downloadStage3CZip, downloadStage3DZip } from './utils/downloadEvidenceZip';

import { sanitizeCVData } from './data/sanitizeCv';

const STORAGE_KEY = 'polcv_studio_cv_data_v1';

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
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const fileInputHiddenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);

  const openCandidateSuccessWithTab = (tab: 'wizard' | 'legal' | 'salary' | 'jobs' | 'interview' = 'wizard') => {
    setCandidateSuccessTab(tab);
    setCandidateSuccessOpen(true);
  };

  type AppScreen = 'home' | 'gallery' | 'editor' | 'guided-editor';
  const [guidedStep, setGuidedStep] = useState<V5StepId>(1);
  const [appScreen, setAppScreen] = useState<AppScreen>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('guided-editor') || hash.includes('kreator') || hash.includes('guided')) {
        return 'guided-editor';
      }
      if (hash.includes('gallery') || hash.includes('templates')) {
        return 'gallery';
      }
      if (hash.includes('editor') || hash.includes('classic') || hash.includes('wizard')) {
        return 'editor';
      }
    }
    return 'home';
  });

  const [showV5, setShowV5] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.startsWith('#/v5') || hash.includes('signature') || search.includes('preview=v5')) {
        return true;
      }
    }
    return false;
  });

  const [showV4, setShowV4] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.startsWith('#/v4') || hash.includes('concept-') || search.includes('preview=v4')) {
        return true;
      }
    }
    return false;
  });

  const [showPrototype, setShowPrototype] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash.startsWith('#/prototype') || hash.startsWith('#/preview') || search.includes('preview=motion')) {
        return true;
      }
    }
    return false;
  });

  // Development controls are strictly isolated from normal customer-facing routes
  const [showDevControls, setShowDevControls] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return hash.includes('dev') || search.includes('dev=true') || hash.includes('stage3a-dev');
    }
    return false;
  });

  // Check if candidate has existing saved CV data in localStorage
  const hasExistingCv = Boolean(
    cv && cv.personalInfo && cv.personalInfo.fullName && cv.personalInfo.fullName.trim().length > 0
  );

  // Deep links handler (#/home, #/templates, #/gallery, #/editor, #/classic, #/wizard, #/legal, #/salary, #/jobs, #/prototype, #/v4, #/v5)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      // Isolate dev controls strictly to explicit development / preview routes
      const isDev = hash.includes('dev') || search.includes('dev=true') || hash.includes('stage3a-dev') || hash.includes('evidence');
      setShowDevControls(isDev);
      if (hash.includes('evidence') || hash.includes('acceptance')) {
        setEvidenceModalOpen(true);
      }

      if (hash.startsWith('#/v5') || hash.includes('signature') || search.includes('preview=v5')) {
        setShowV5(true);
        setShowV4(false);
        setShowPrototype(false);
        return;
      }
      setShowV5(false);

      if (hash.startsWith('#/v4') || hash.includes('concept-') || search.includes('preview=v4')) {
        setShowV4(true);
        setShowPrototype(false);
        return;
      }
      setShowV4(false);

      if (hash.startsWith('#/prototype') || hash.startsWith('#/preview') || search.includes('preview=motion')) {
        setShowPrototype(true);
        return;
      }
      setShowPrototype(false);

      if (hash.includes('guided-editor') || hash.includes('kreator') || hash.startsWith('#/guided')) {
        setAppScreen('guided-editor');
        const stepMatch = hash.match(/step-(\d)/);
        if (stepMatch && stepMatch[1]) {
          const s = parseInt(stepMatch[1], 10);
          if (s >= 1 && s <= 5) setGuidedStep(s as V5StepId);
        }
        return;
      }

      if (hash.includes('templates') || hash.includes('gallery')) {
        setAppScreen('gallery');
        return;
      }
      if (hash.includes('home') || hash === '#/' || hash === '#' || hash === '') {
        setAppScreen('home');
        return;
      }
      if (hash.includes('editor') || hash.includes('classic')) {
        setAppScreen('editor');
        return;
      }
      if (hash === '#/wizard' || hash === '#wizard') {
        setAppScreen('editor');
        openCandidateSuccessWithTab('wizard');
      } else if (hash === '#/legal' || hash === '#legal') {
        setAppScreen('editor');
        openCandidateSuccessWithTab('legal');
      } else if (hash === '#/salary' || hash === '#salary') {
        setAppScreen('editor');
        openCandidateSuccessWithTab('salary');
      } else if (hash === '#/jobs' || hash === '#jobs') {
        setAppScreen('editor');
        openCandidateSuccessWithTab('jobs');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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

  // Debounced auto-save to localStorage (avoids main-thread jank on fast typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [cv]);

  // Guarantee save before page unload / navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
      } catch {
        // Ignore during unload
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [cv]);

  // Keep html lang attribute in sync with current language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = cv.language;
    }
  }, [cv.language]);

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
    // Defensive reset of file input so re-uploading the same file triggers onChange
    e.target.value = '';
  };

  const isPl = cv.language === 'pl';

  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [isDownloadingStage3BZip, setIsDownloadingStage3BZip] = useState(false);
  const [isDownloadingStage3CZip, setIsDownloadingStage3CZip] = useState(false);
  const [stage3CStatusMessage, setStage3CStatusMessage] = useState('');

  const triggerBrowserFileDownload = async (
    endpoint: string,
    filename: string,
    setLoadingState: (val: boolean) => void
  ) => {
    setLoadingState(true);
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(objectUrl), 4000);
    } catch (err) {
      console.warn('Blob download fallback to direct window download:', err);
      const fallbackLink = document.createElement('a');
      fallbackLink.href = endpoint;
      fallbackLink.download = filename;
      fallbackLink.target = '_blank';
      fallbackLink.rel = 'noopener noreferrer';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    } finally {
      setTimeout(() => setLoadingState(false), 1200);
    }
  };

  const handleDownloadSourceBackup = () => {
    triggerBrowserFileDownload(
      '/api/download/stage3a-checkpoint',
      'poljobhub_stage3a_final_checkpoint.tar.gz',
      setIsDownloadingBackup
    );
  };

  const handleDownloadVisualZip = () => {
    triggerBrowserFileDownload(
      '/api/download/stage3a-zip',
      'PolJobHub_Stage3A_Visual_Acceptance.zip',
      setIsDownloadingZip
    );
  };

  const handleDownloadStage3BZip = () => {
    triggerBrowserFileDownload(
      '/api/download/stage3b-zip',
      'PolJobHub_Stage3B_Guided_Editor_Acceptance.zip',
      setIsDownloadingStage3BZip
    );
  };

  const handleDownloadStage3CZip = async () => {
    setIsDownloadingStage3CZip(true);
    await downloadStage3CZip((status, msg) => {
      if (status === 'downloading') setStage3CStatusMessage(msg || 'Pobieranie...');
      else if (status === 'success') {
        setStage3CStatusMessage(msg || '✓ Pobrano ZIP!');
        setTimeout(() => {
          setIsDownloadingStage3CZip(false);
          setStage3CStatusMessage('');
        }, 3500);
      } else if (status === 'error') {
        setStage3CStatusMessage('✕ Błąd');
        setTimeout(() => setIsDownloadingStage3CZip(false), 3500);
      }
    });
  };

  const [isDownloadingStage3DZip, setIsDownloadingStage3DZip] = useState(false);
  const [stage3DStatusMessage, setStage3DStatusMessage] = useState('');

  const handleDownloadStage3DZip = async () => {
    setIsDownloadingStage3DZip(true);
    await downloadStage3DZip((status, msg) => {
      if (status === 'downloading') setStage3DStatusMessage(msg || 'Pobieranie...');
      else if (status === 'success') {
        setStage3DStatusMessage(msg || '✓ Pobrano ZIP Stage 3D!');
        setTimeout(() => {
          setIsDownloadingStage3DZip(false);
          setStage3DStatusMessage('');
        }, 3500);
      } else if (status === 'error') {
        setStage3DStatusMessage('✕ Błąd');
        setTimeout(() => setIsDownloadingStage3DZip(false), 3500);
      }
    });
  };

  if (showV5) {
    return (
      <V5SignatureApp
        onReturnToProduction={() => {
          setShowV5(false);
          window.location.hash = '#/classic';
        }}
        initialCv={cv}
      />
    );
  }

  if (showV4) {
    return (
      <V4Hub
        onReturnToProduction={() => {
          setShowV4(false);
          window.location.hash = '#/classic';
        }}
      />
    );
  }

  if (showPrototype) {
    return (
      <PremiumMotionPrototype
        onReturnToProduction={() => {
          setShowPrototype(false);
          window.location.hash = '#/classic';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans overflow-x-hidden">
      {/* Top Stage 3D Final QA & Evidence Download Bar (Clearly visible for Mac/PC downloads) */}
      <div 
        role="region" 
        aria-label="Paczka akceptacyjna Stage 3D" 
        className="bg-slate-900 border-b border-indigo-900/60 text-white px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2.5 text-xs z-50 print:hidden shadow-sm"
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-slate-100">PolJobHub V5 — Stage 3D Final QA & Gotowość Wdrożeniowa:</span>
          <span className="text-slate-400 hidden md:inline">Kompletny audyt 10 szablonów, widoków RWD i eksportu A4</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleDownloadStage3DZip}
            disabled={isDownloadingStage3DZip}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer disabled:opacity-75 ring-2 ring-emerald-400/50"
            title="Pobierz kompletną paczkę akceptacyjną Stage 3D PolJobHub_Stage3D_Final_QA_Acceptance.zip (6.49 MB)"
            aria-label="⬇ Download Stage 3D Evidence ZIP"
          >
            <Download className={`w-3.5 h-3.5 text-emerald-200 ${isDownloadingStage3DZip ? 'animate-bounce' : ''}`} />
            <span>
              {isDownloadingStage3DZip
                ? (stage3DStatusMessage || 'Pobieranie ZIP (6.5 MB)...')
                : stage3DStatusMessage
                ? stage3DStatusMessage
                : '⬇ Download Stage 3D Evidence ZIP'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleDownloadStage3CZip}
            disabled={isDownloadingStage3CZip}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-60"
            title="Pobierz paczkę akceptacyjną Stage 3C PolJobHub_Stage3C_Multipage_A4_Acceptance.zip (8.34 MB)"
            aria-label="Pobierz Paczkę Stage 3C"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Paczka 3C (8.3 MB)</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadStage3BZip}
            disabled={isDownloadingStage3BZip}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-60"
            title="Pobierz paczkę akceptacyjną Stage 3B PolJobHub_Stage3B_Guided_Editor_Acceptance.zip (5.6 MB)"
            aria-label="Pobierz Paczkę Stage 3B (ZIP · 5.6 MB)"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Paczka 3B (5.6 MB)</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadSourceBackup}
            disabled={isDownloadingBackup}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer disabled:opacity-60"
            title="Pobierz pełną kopię źródłową poljobhub_stage3a_final_checkpoint.tar.gz (27 MB)"
            aria-label="Pobierz Kopię Kodu Źródłowego (tar.gz · 27 MB)"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Kod Źródłowy (27 MB)</span>
          </button>
        </div>
      </div>

      {/* Top Main Navigation Header */}
      <Header
        cv={cv}
        onChangeCv={setCv}
        onOpenHome={() => {
          setAppScreen('home');
          window.location.hash = '#/home';
        }}
        onOpenPresets={() => setPresetsOpen(true)}
        onOpenEuropassComparison={() => setEuropassOpen(true)}
        onOpenAtsAnalyzer={() => setAtsOpen(true)}
        onOpenRecruiterAudit={() => setRecruiterAuditOpen(true)}
        onOpenAgencyGuide={() => setAgencyGuideOpen(true)}
        onOpenImportEuropass={() => setImportEuropassOpen(true)}
        onOpenTemplatesModal={() => {
          setAppScreen('gallery');
          window.location.hash = '#/templates';
        }}
        onOpenPlainTextModal={() => setPlainTextModalOpen(true)}
        onOpenMobileSheet={() => setMobileSheetOpen(true)}
        onOpenCandidateSuccess={() => openCandidateSuccessWithTab('wizard')}
        onOpenCandidateSuccessTab={openCandidateSuccessWithTab}
        onPrintPdf={handlePrintPdf}
        onToggle3D={() => setViewMode((m) => (m === '2d' ? '3d' : '2d'))}
        is3DActive={viewMode === '3d'}
        onOpenCvScore={() => setRecruiterAuditOpen(true)}
        onOpenCareerKit={() => openCandidateSuccessWithTab('salary')}
        onOpenStartScreen={() => setPresetsOpen(true)}
        onDownloadBackup={handleDownloadSourceBackup}
        onOpenGuidedEditor={() => {
          setAppScreen('guided-editor');
          window.location.hash = '#/guided-editor';
        }}
      />

      {appScreen === 'home' ? (
        <V5Homepage
          cv={cv}
          language={cv.language}
          onStartEditing={() => {
            setAppScreen('editor');
            window.location.hash = '#/editor';
          }}
          onExploreTemplates={() => {
            setAppScreen('gallery');
            window.location.hash = '#/templates';
          }}
          onResumeEditing={() => {
            setAppScreen('editor');
            window.location.hash = '#/editor';
          }}
          onSelectTemplate={(tplId) => {
            handleSelectTemplate(tplId);
            setAppScreen('editor');
            window.location.hash = '#/editor';
          }}
          reducedMotion={reducedMotion}
        />
      ) : appScreen === 'gallery' ? (
        <main className="flex-1 bg-[#F8F9FF] w-full overflow-x-hidden">
          <InteractiveGallery
            selectedTemplate={cv.templateId}
            onSelectTemplate={handleSelectTemplate}
            cv={cv}
            language={cv.language}
            onContinueToEditor={() => {
              setAppScreen('editor');
              window.location.hash = '#/editor';
            }}
            onBackToHome={() => {
              setAppScreen('home');
              window.location.hash = '#/home';
            }}
          />
        </main>
      ) : appScreen === 'guided-editor' ? (
        <main className="flex-1 bg-[#F8F9FF] w-full overflow-x-hidden">
          <V5GuidedEditor
            cv={cv}
            onChangeCv={setCv}
            language={cv.language}
            currentStep={guidedStep}
            onStepChange={setGuidedStep}
            onPrintPdf={handlePrintPdf}
            onReturnToHomepage={() => {
              setAppScreen('home');
              window.location.hash = '#/home';
            }}
            onSwitchToAdvanced={() => {
              setAppScreen('editor');
              window.location.hash = '#/editor';
            }}
            reducedMotion={reducedMotion}
          />
        </main>
      ) : (
        <>
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
            onSwitchToGuided={() => {
              setAppScreen('guided-editor');
              window.location.hash = '#/guided-editor';
            }}
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
                        aria-label={`Kolor akcentu: ${c.label} / Accent color: ${c.label}`}
                        className={`w-3.5 h-3.5 rounded-full transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
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
              <div
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10.5px] font-medium mr-1 shadow-2xs"
                title={isPl ? 'Twoje CV jest zapisywane tylko w tej przeglądarce' : 'Your CV is saved only in this browser'}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{isPl ? 'Twoje CV jest zapisywane tylko w tej przeglądarce' : 'Your CV is saved only in this browser'}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden md:inline mr-1">
                A4 · 210×297mm
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.35, Math.round((z - 0.1) * 100) / 100))}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={isPl ? 'Oddal' : 'Zoom Out'}
                aria-label={isPl ? 'Oddal widok A4' : 'Zoom out A4 view'}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-700 min-w-[38px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 100) / 100))}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={isPl ? 'Przybliż' : 'Zoom In'}
                aria-label={isPl ? 'Przybliż widok A4' : 'Zoom in A4 view'}
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setZoom(getAutoFitZoom())}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition flex items-center gap-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500"
                title={isPl ? 'Dopasuj do ekranu' : 'Fit to Screen'}
                aria-label={isPl ? 'Dopasuj podgląd do ekranu' : 'Fit preview to screen'}
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
    </>
  )}

      {/* Agency & Legal Footer */}
      <footer className="print:hidden border-t border-slate-200 bg-white py-3.5 px-4 text-center text-[10.5px] text-slate-500 space-y-1">
        <p>
          PolJobHub · {isPl ? 'Niezależny kreator CV i Listów Motywacyjnych dla rynku polskiego i europejskiego.' : 'Independent CV & Cover Letter builder for Polish and European labor markets.'}
        </p>
        <p className="text-slate-400">
          {isPl
            ? 'Prywatność: Dane Twojego CV są zapisywane wyłącznie lokalnie w przeglądarce (localStorage). Dane tekstowe są wysyłane do Google Gemini wyłącznie po kliknięciu przycisków asystenta AI. Wskazówki dotyczące legalizacji zatrudnienia i RODO mają charakter informacyjny i nie stanowią porady prawnej.'
            : 'Privacy: Your CV data stays strictly in your browser\'s localStorage. Text is sent to Google Gemini only when clicking AI assistant actions. Work permit & GDPR/RODO guidelines are for informational purposes and do not constitute legal advice.'}
        </p>
        <p className="text-slate-400 text-[9.5px]">
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
        cv={cv}
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

      <V5VisualEvidenceModal
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
      />

      {/* Development and Preview Controls — only shown on explicit dev routes (#/dev, ?dev=true) */}
      {showDevControls && (
        <aside aria-label="Eksploracja V5 i Nowy Design" className="fixed bottom-4 left-4 z-40 print:hidden flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/v5';
              setShowV5(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-[#6250F4] via-indigo-600 to-[#A447F4] hover:opacity-95 text-white font-extrabold text-xs rounded-full shadow-2xl flex items-center gap-2 border border-white/40 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-indigo-500/20"
            title="Otwórz V5 Signature Experience (Concept C UX + Concept A Visuals + Concept B Motion)"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>✨ V5 Signature Experience</span>
          </button>

          <button
            type="button"
            onClick={() => setEvidenceModalOpen(true)}
            className="px-3.5 py-1.5 bg-purple-900/90 hover:bg-purple-800 text-purple-200 hover:text-white font-semibold text-[11px] rounded-full shadow-md flex items-center gap-1.5 border border-purple-400/30 backdrop-blur-md transition cursor-pointer self-start"
            title="Otwórz interaktywną galerię zrzutów ekranu, wideo i raportu Stage 3A w przeglądarce"
          >
            <Eye className="w-3.5 h-3.5 text-purple-300" />
            <span>🔍 Zobacz Dowody Stage 3A (Galeria & Wideo)</span>
          </button>

          <a
            href="/PolJobHub_Stage3A_Visual_Acceptance.zip"
            download="PolJobHub_Stage3A_Visual_Acceptance.zip"
            className="px-3.5 py-1.5 bg-indigo-900/90 hover:bg-indigo-800 text-indigo-200 hover:text-white font-semibold text-[11px] rounded-full shadow-md flex items-center gap-1.5 border border-indigo-400/30 backdrop-blur-md transition cursor-pointer self-start"
            title="Pobierz paczkę ZIP z materiałami weryfikacyjnymi Stage 3A (8.8 MB)"
          >
            <Download className="w-3.5 h-3.5 text-indigo-300" />
            <span>📦 Pobierz Paczkę Stage 3A (ZIP 8.8 MB)</span>
          </a>

          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/v4';
              setShowV4(true);
            }}
            className="px-3.5 py-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-[11px] rounded-full shadow-md flex items-center gap-1.5 border border-white/10 backdrop-blur-md transition cursor-pointer self-start"
            title="Zobacz poprzednią eksplorację V4 (A / B / C)"
          >
            <span>V4 Lab (3 Koncepcje)</span>
          </button>
        </aside>
      )}
    </div>
  );
}
