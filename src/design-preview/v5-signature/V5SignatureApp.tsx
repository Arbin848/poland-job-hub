import React, { useState, useEffect } from 'react';
import { CVData, LanguageCode, TemplateId } from '../../types/cv';
import { PROTOTYPE_CANDIDATE } from '../premium-motion/mockData';
import { V5ViewMode, V5StepId } from './types';
import { V5Header } from './components/V5Header';
import { V5Homepage } from './V5Homepage';
import { V5GuidedEditor } from './components/V5GuidedEditor';
import { V5VisualEvidenceModal } from './components/V5VisualEvidenceModal';

interface Props {
  onReturnToProduction: () => void;
  initialCv?: CVData;
}

export const V5SignatureApp: React.FC<Props> = ({
  onReturnToProduction,
  initialCv
}) => {
  const [viewMode, setViewMode] = useState<V5ViewMode>('homepage');
  const [currentStep, setCurrentStep] = useState<V5StepId>(1);
  const [cv, setCv] = useState<CVData>(() => initialCv || PROTOTYPE_CANDIDATE);
  const [language, setLanguage] = useState<LanguageCode>('pl');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState<boolean>(false);

  // Sync with browser preference for reduced motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Hash listener for deep linking within V5 (#/v5, #/v5-editor, #/v5-step-1 ... #/v5-step-5)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      
      // Parse template override if present in hash (e.g. #/v5-step-1?tmpl=swiss-executive)
      const matchTmpl = hash.match(/tmpl=([a-z0-9-]+)/i);
      if (matchTmpl && matchTmpl[1]) {
        setCv(prev => ({ ...prev, templateId: matchTmpl[1] as TemplateId }));
      }

      if (hash.includes('editor') || hash.includes('step-') || hash.includes('kreator')) {
        setViewMode('editor');
        if (hash.includes('step-2')) setCurrentStep(2);
        else if (hash.includes('step-3')) setCurrentStep(3);
        else if (hash.includes('step-4')) setCurrentStep(4);
        else if (hash.includes('step-5')) setCurrentStep(5);
        else setCurrentStep(1);
      } else if (hash.includes('home') || hash === '#/v5' || hash === '#/v5-signature') {
        setViewMode('homepage');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleToggleLanguage = () => {
    const newLang = language === 'pl' ? 'en' : 'pl';
    setLanguage(newLang);
    setCv(prev => ({ ...prev, language: newLang }));
  };

  const handleStartEditing = () => {
    setViewMode('editor');
    setCurrentStep(1);
    window.location.hash = '#/v5-editor';
  };

  const handleExploreTemplates = () => {
    setViewMode('editor');
    setCurrentStep(4); // Template selection step
    window.location.hash = '#/v5-step-4';
  };

  const handleStepChange = (step: V5StepId) => {
    setCurrentStep(step);
    window.location.hash = `#/v5-step-${step}`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F8F9FF] text-[#18233F]">
      {/* Top V5 Header Navigation */}
      <V5Header
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        currentStep={currentStep}
        onSelectStep={handleStepChange}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(r => !r)}
        onReturnToProduction={onReturnToProduction}
        onPrintPdf={handlePrintPdf}
        onOpenEvidenceModal={() => setShowEvidenceModal(true)}
      />

      {/* Main Screen: Homepage or Guided Editor */}
      <main className="flex-1">
        {viewMode === 'homepage' ? (
          <V5Homepage
            cv={cv}
            language={language}
            onStartEditing={handleStartEditing}
            onExploreTemplates={handleExploreTemplates}
            onResumeEditing={handleStartEditing}
            onSelectTemplate={(tplId) => setCv(prev => ({ ...prev, templateId: tplId }))}
            reducedMotion={reducedMotion}
          />
        ) : (
          <V5GuidedEditor
            cv={cv}
            onChangeCv={setCv}
            language={language}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            onPrintPdf={handlePrintPdf}
            onReturnToHomepage={() => {
              setViewMode('homepage');
              window.location.hash = '#/v5';
            }}
            reducedMotion={reducedMotion}
          />
        )}
      </main>

      {/* In-App Direct Evidence & Download Center Modal */}
      <V5VisualEvidenceModal
        isOpen={showEvidenceModal}
        onClose={() => setShowEvidenceModal(false)}
      />
    </div>
  );
};
