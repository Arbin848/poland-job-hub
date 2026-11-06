import React, { useState, useEffect } from 'react';
import { PrototypeNavHeader, PrototypeViewMode } from './components/PrototypeNavHeader';
import { HeroLanding } from './components/HeroLanding';
import { ThreePanelEditor } from './components/ThreePanelEditor';
import { InteractiveGallery } from './components/InteractiveGallery';
import { MobileGuidedView } from './components/MobileGuidedView';
import { PROTOTYPE_CANDIDATE } from './mockData';
import { CVData, TemplateId } from '../../types/cv';

interface Props {
  onReturnToProduction: () => void;
}

export const PremiumMotionPrototype: React.FC<Props> = ({ onReturnToProduction }) => {
  const [currentView, setCurrentView] = useState<PrototypeViewMode>('homepage');
  const [prototypeCv, setPrototypeCv] = useState<CVData>(() =>
    JSON.parse(JSON.stringify(PROTOTYPE_CANDIDATE))
  );

  // Handle hash changes for sub-navigation in prototype if desired
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('prototype-editor') || hash.includes('preview-editor')) {
        setCurrentView('editor');
      } else if (hash.includes('prototype-gallery') || hash.includes('preview-gallery')) {
        setCurrentView('gallery');
      } else if (hash.includes('prototype-mobile') || hash.includes('preview-mobile')) {
        setCurrentView('mobile');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#18233F] font-sans antialiased selection:bg-[#6250F4]/15 selection:text-[#6250F4]">
      {/* Top Nav Switcher */}
      <PrototypeNavHeader
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
        onReturnToProduction={onReturnToProduction}
      />

      {/* Main View Area */}
      <main>
        {currentView === 'homepage' && (
          <HeroLanding
            onStartEditing={() => setCurrentView('editor')}
            onExploreTemplates={() => setCurrentView('gallery')}
            onSelectSampleTemplate={(templateId: TemplateId) => {
              setPrototypeCv((prev) => ({ ...prev, templateId }));
              setCurrentView('editor');
            }}
          />
        )}

        {currentView === 'editor' && (
          <ThreePanelEditor
            cv={prototypeCv}
            onChangeCv={setPrototypeCv}
            onOpenTemplatesModal={() => setCurrentView('gallery')}
            onPrintPdf={handlePrint}
          />
        )}

        {currentView === 'gallery' && (
          <InteractiveGallery
            selectedTemplate={prototypeCv.templateId}
            onSelectTemplate={(templateId) =>
              setPrototypeCv((prev) => ({ ...prev, templateId }))
            }
            sampleCv={prototypeCv}
            onContinueToEditor={() => setCurrentView('editor')}
          />
        )}

        {currentView === 'mobile' && (
          <MobileGuidedView
            cv={prototypeCv}
            onChangeCv={setPrototypeCv}
            onOpenTemplates={() => setCurrentView('gallery')}
            onPrintPdf={handlePrint}
          />
        )}
      </main>
    </div>
  );
};
