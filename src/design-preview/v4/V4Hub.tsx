import React, { useState, useEffect } from 'react';
import { CVData, LanguageCode } from '../../types/cv';
import { PROTOTYPE_CANDIDATE } from '../premium-motion/mockData';
import { V4ConceptId, V4FlowStep } from './types';
import { ComparisonBar } from './components/ComparisonBar';
import { ComparisonModal } from './components/ComparisonModal';
import { ConceptA_MinimalLuxury } from './concepts/ConceptA_MinimalLuxury';
import { ConceptB_FuturisticStudio } from './concepts/ConceptB_FuturisticStudio';
import { ConceptC_GuidedCareer } from './concepts/ConceptC_GuidedCareer';

interface Props {
  onReturnToProduction: () => void;
}

export const V4Hub: React.FC<Props> = ({ onReturnToProduction }) => {
  const [activeConcept, setActiveConcept] = useState<V4ConceptId>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('v4-b') || hash.includes('concept-b')) return 'concept-b';
      if (hash.includes('v4-c') || hash.includes('concept-c')) return 'concept-c';
    }
    return 'concept-a';
  });

  const [currentStep, setCurrentStep] = useState<V4FlowStep>('landing');
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [previewCv, setPreviewCv] = useState<CVData>(PROTOTYPE_CANDIDATE);
  const [language, setLanguage] = useState<LanguageCode>('pl');

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('v4-a') || hash.includes('concept-a')) {
        setActiveConcept('concept-a');
      } else if (hash.includes('v4-b') || hash.includes('concept-b')) {
        setActiveConcept('concept-b');
      } else if (hash.includes('v4-c') || hash.includes('concept-c')) {
        setActiveConcept('concept-c');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectConcept = (concept: V4ConceptId) => {
    setActiveConcept(concept);
    const hashTag = concept === 'concept-a' ? '#/v4-a' : concept === 'concept-b' ? '#/v4-b' : '#/v4-c';
    window.location.hash = hashTag;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Controller Bar */}
      <ComparisonBar
        activeConcept={activeConcept}
        onSelectConcept={handleSelectConcept}
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        onOpenComparisonMatrix={() => setComparisonModalOpen(true)}
        onReturnToProduction={onReturnToProduction}
      />

      {/* Concept Render Container */}
      <div className="flex-1">
        {activeConcept === 'concept-a' && (
          <ConceptA_MinimalLuxury
            cv={previewCv}
            onChangeCv={setPreviewCv}
            language={language}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        )}

        {activeConcept === 'concept-b' && (
          <ConceptB_FuturisticStudio
            cv={previewCv}
            onChangeCv={setPreviewCv}
            language={language}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        )}

        {activeConcept === 'concept-c' && (
          <ConceptC_GuidedCareer
            cv={previewCv}
            onChangeCv={setPreviewCv}
            language={language}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        )}
      </div>

      {/* Comparison Matrix Modal */}
      <ComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        activeConcept={activeConcept}
        onSelectConcept={handleSelectConcept}
      />
    </div>
  );
};
