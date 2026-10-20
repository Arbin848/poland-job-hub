import React from 'react';
import { CVData } from '../../types/cv';
import { ModernPolishTemplate } from './templates/ModernPolishTemplate';
import { CleanAtsTemplate } from './templates/CleanAtsTemplate';
import { EuroModernTemplate } from './templates/EuroModernTemplate';
import { NordicCleanTemplate } from './templates/NordicCleanTemplate';
import { AcademicEliteTemplate } from './templates/AcademicEliteTemplate';
import { DynamicImpactTemplate } from './templates/DynamicImpactTemplate';
import { SwissExecutiveTemplate } from './templates/SwissExecutiveTemplate';
import { CreativeTechTemplate } from './templates/CreativeTechTemplate';
import { BerlinMinimalTemplate } from './templates/BerlinMinimalTemplate';
import { EleganceSerifTemplate } from './templates/EleganceSerifTemplate';
import { CoverLetterCanvas } from './CoverLetterCanvas';
import { AgencyOnePagerCanvas } from './AgencyOnePagerCanvas';
import { LegalPacketCanvas } from './LegalPacketCanvas';

interface Props {
  cv: CVData;
  zoom: number;
}

export const ResumeCanvas: React.FC<Props> = ({ cv, zoom }) => {
  const renderTemplate = () => {
    if (cv.activeDocument === 'cover-letter') {
      return <CoverLetterCanvas cv={cv} />;
    }
    if (cv.activeDocument === 'agency-onepager') {
      return <AgencyOnePagerCanvas cv={cv} />;
    }
    if (cv.activeDocument === 'legal-packet') {
      return <LegalPacketCanvas cv={cv} />;
    }

    switch (cv.templateId) {
      case 'modern-polish':
        return <ModernPolishTemplate cv={cv} />;
      case 'clean-ats':
        return <CleanAtsTemplate cv={cv} />;
      case 'euro-modern':
        return <EuroModernTemplate cv={cv} />;
      case 'nordic-clean':
        return <NordicCleanTemplate cv={cv} />;
      case 'academic-elite':
        return <AcademicEliteTemplate cv={cv} />;
      case 'dynamic-impact':
        return <DynamicImpactTemplate cv={cv} />;
      case 'swiss-executive':
        return <SwissExecutiveTemplate cv={cv} />;
      case 'creative-tech':
        return <CreativeTechTemplate cv={cv} />;
      case 'berlin-minimal':
        return <BerlinMinimalTemplate cv={cv} />;
      case 'elegance-serif':
        return <EleganceSerifTemplate cv={cv} />;
      default:
        return <ModernPolishTemplate cv={cv} />;
    }
  };

  const fontScaleStyle = {
    compact: 'text-[11.8px] leading-snug [&_.space-y-6]:space-y-4 [&_.space-y-5]:space-y-3 [&_.space-y-4]:space-y-2.5 [&_.p-8]:p-6 [&_.p-10]:p-7',
    normal: 'text-[12.8px] leading-relaxed',
    relaxed: 'text-[13.5px] leading-relaxed [&_.space-y-6]:space-y-7'
  }[cv.fontScale || 'normal'];

  const fontFamilyStyle = {
    jakarta: 'font-["Plus_Jakarta_Sans",sans-serif]',
    inter: 'font-["Inter",sans-serif]',
    roboto: 'font-["Roboto",sans-serif]',
    merriweather: 'font-["Merriweather",serif]',
    outfit: 'font-["Outfit",sans-serif]'
  }[cv.fontFamily || 'jakarta'];

  return (
    <div className="flex justify-center items-start p-2 sm:p-6 w-full overflow-x-auto min-h-full">
      <div
        id="cv-printable-canvas"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
        }}
        className={`w-full max-w-[820px] bg-white shadow-2xl shadow-slate-950/20 rounded-xs ring-1 ring-slate-900/10 print:shadow-none print:ring-0 print:transform-none print:m-0 print:w-full print:max-w-none relative ${fontFamilyStyle} ${fontScaleStyle}`}
      >
        {renderTemplate()}

        {/* Visual A4 Page 1 Break Indicator (Only on screen, hidden in print) */}
        <div
          className="absolute left-0 right-0 border-b border-dashed border-rose-400 pointer-events-none print:hidden flex items-center justify-between px-4 z-20"
          style={{ top: '1122px' }}
        >
          <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs -translate-y-1/2">
            {cv.language === 'pl' ? '--- Granica 1. strony A4 (297 mm) ---' : '--- End of Page 1 A4 (297 mm) ---'}
          </span>
          <span className="text-[10px] text-rose-500 font-mono -translate-y-1/2 bg-white px-1 hidden sm:inline">
            {cv.language === 'pl' ? 'Druga strona poniżej' : 'Page 2 starts below'}
          </span>
        </div>

        {/* Optional Agency Verification Watermark / Badge */}
        {cv.agencyBadge?.enabled && (
          <div className="px-8 pb-3 pt-1 text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-100 print:text-[8px] print:text-slate-400">
            <span>Verified Candidate Profile · {cv.agencyBadge.agencyName}</span>
            <span className="font-mono">ID: {cv.id.slice(-8).toUpperCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
