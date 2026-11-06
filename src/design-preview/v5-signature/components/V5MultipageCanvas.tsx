import React, { useState, useEffect, useRef } from 'react';
import { CVData } from '../../../types/cv';
import { ModernPolishTemplate } from '../../../components/CVPreview/templates/ModernPolishTemplate';
import { CleanAtsTemplate } from '../../../components/CVPreview/templates/CleanAtsTemplate';
import { EuroModernTemplate } from '../../../components/CVPreview/templates/EuroModernTemplate';
import { NordicCleanTemplate } from '../../../components/CVPreview/templates/NordicCleanTemplate';
import { AcademicEliteTemplate } from '../../../components/CVPreview/templates/AcademicEliteTemplate';
import { DynamicImpactTemplate } from '../../../components/CVPreview/templates/DynamicImpactTemplate';
import { SwissExecutiveTemplate } from '../../../components/CVPreview/templates/SwissExecutiveTemplate';
import { CreativeTechTemplate } from '../../../components/CVPreview/templates/CreativeTechTemplate';
import { BerlinMinimalTemplate } from '../../../components/CVPreview/templates/BerlinMinimalTemplate';
import { EleganceSerifTemplate } from '../../../components/CVPreview/templates/EleganceSerifTemplate';
import { CoverLetterCanvas } from '../../../components/CVPreview/CoverLetterCanvas';
import { AgencyOnePagerCanvas } from '../../../components/CVPreview/AgencyOnePagerCanvas';
import { LegalPacketCanvas } from '../../../components/CVPreview/LegalPacketCanvas';
import { FileText, ShieldCheck, Layers, Eye, CheckCircle2 } from 'lucide-react';

interface Props {
  cv: CVData;
  zoom?: number;
  isThumbnail?: boolean;
}

export const V5MultipageCanvas: React.FC<Props> = ({
  cv,
  zoom = 1,
  isThumbnail = false
}) => {
  const isPl = cv.language === 'pl';
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState<number>(1);
  const [activePageTab, setActivePageTab] = useState<string>('all');

  // Measure content height to determine page count dynamically
  useEffect(() => {
    if (isThumbnail) return;
    const checkHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        // Standard A4 height is ~1122px at standard web scaling
        if (height > 1150) {
          setPageCount(Math.ceil(height / 1122));
        } else {
          setPageCount(1);
        }
      }
    };
    checkHeight();
    const timer = setTimeout(checkHeight, 300);
    return () => clearTimeout(timer);
  }, [cv, isThumbnail]);

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

  if (isThumbnail) {
    return (
      <div className="w-full bg-white relative">
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-full">
      {/* Top Clean Pagination Bar */}
      <div className="w-full max-w-[820px] mb-3 flex items-center justify-between text-xs text-slate-500 bg-white/90 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-2xs print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-semibold text-slate-800">
            {isPl
              ? `Format A4 (210 × 297 mm) · ${pageCount === 1 ? '1 strona' : `${pageCount} strony`}`
              : `A4 Format (210 × 297 mm) · ${pageCount === 1 ? '1 page' : `${pageCount} pages`}`}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500 font-mono text-[11px]">
            {pageCount === 1 
              ? (isPl ? 'Optymalna długość dla rekruterów' : 'Optimal 1-page length')
              : (isPl ? 'Czysty podział stron' : 'Clean multipage')}
          </span>
        </div>

        {pageCount > 1 && (
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setActivePageTab('all')}
              className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                activePageTab === 'all'
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isPl ? 'Ciągły' : 'All'}
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => {
              const pNum = idx + 1;
              const tabKey = String(pNum);
              return (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => {
                    setActivePageTab(tabKey);
                    if (containerRef.current) containerRef.current.scrollTop = idx * 1122;
                  }}
                  className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                    activePageTab === tabKey
                      ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isPl ? `Str. ${pNum}` : `P. ${pNum}`}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Canvas Document Wrapper */}
      <div
        id="cv-printable-canvas"
        ref={containerRef}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
        }}
        className={`w-full max-w-[820px] bg-white shadow-2xl shadow-slate-950/15 rounded-xs ring-1 ring-slate-900/10 print:shadow-none print:ring-0 print:transform-none print:m-0 print:w-full print:max-w-none relative ${fontFamilyStyle} ${fontScaleStyle} transition-all`}
      >
        {/* Candidate Work Authorization Self-Declaration Header Strip (Neutral disclaimer) */}
        {cv.personalInfo.showWorkPermitBadge && cv.personalInfo.workEligibility && (
          <div className="bg-emerald-50/90 text-emerald-950 border-b border-emerald-200 px-6 py-2 text-[11px] font-medium flex items-center justify-between print:bg-emerald-50 print:text-emerald-900">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shrink-0" />
              <span>
                {isPl
                  ? `Status zezwolenia na pracę (oświadczenie kandydata): ${cv.personalInfo.workEligibility}`
                  : `Work authorization status (candidate self-declaration): ${cv.personalInfo.workEligibility}`}
              </span>
            </span>
            <span className="text-[9.5px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
              {isPl ? 'Deklaracja RP' : 'Self-Declaration'}
            </span>
          </div>
        )}

        {/* The Actual Production Template with non-destructive typography & anti-clipping overrides */}
        <div className="v5-document-body relative [&_.truncate]:overflow-visible [&_.truncate]:whitespace-normal [&_.truncate]:break-words [&_.truncate]:text-clip [&_h2]:tracking-normal [&_h3]:tracking-normal print:[&_.truncate]:whitespace-normal print:[&_.truncate]:break-words print:[&_.truncate]:overflow-visible print:[&_h2]:tracking-normal print:[&_h3]:tracking-normal">
          {renderTemplate()}
        </div>

        {/* Clean Multipage Break Gutters for all page boundaries */}
        {pageCount > 1 && Array.from({ length: pageCount - 1 }).map((_, pIdx) => {
          const pageNum = pIdx + 1;
          const nextNum = pIdx + 2;
          const topPx = pageNum * 1122;
          return (
            <div
              key={pageNum}
              className="absolute left-0 right-0 pointer-events-none print:hidden z-20 flex flex-col items-center"
              style={{ top: `${topPx}px` }}
            >
              {/* Subtle page separation gradient gap */}
              <div className="w-full h-8 bg-gradient-to-b from-slate-200/40 via-slate-100/90 to-transparent flex items-center justify-between px-6 border-t border-slate-300/80 shadow-2xs">
                <span className="bg-white/95 border border-slate-300 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-2xs">
                  {isPl ? `--- Koniec Strony ${pageNum} ---` : `--- End of Page ${pageNum} ---`}
                </span>
                <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-2xs">
                  {isPl ? `Strona ${nextNum} rozpoczyna się poniżej` : `Page ${nextNum} starts below`}
                </span>
              </div>
            </div>
          );
        })}

        {/* Document reference footer if agency attribution enabled */}
        {cv.agencyBadge?.enabled && (
          <div className="px-8 pb-3 pt-1 text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-100 print:text-[8px] print:text-slate-400">
            <span>{isPl ? 'Dokument aplikacyjny kandydata' : 'Candidate Application Profile'}{cv.agencyBadge.agencyName ? ` · ${cv.agencyBadge.agencyName}` : ''}</span>
            <span className="font-mono">{isPl ? 'Nr ref. dokumentu' : 'Doc Ref'}: {cv.id.slice(-8).toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Multipage helper footer */}
      {pageCount > 1 && (
        <div className="w-full max-w-[820px] mt-3 py-2 px-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {isPl
                ? `Dokument ${pageCount}-stronicowy: Sekcje i wpisy doświadczenia zachowują spójność pomiędzy stronami.`
                : `${pageCount}-page document: Section headers and job entries remain unified across page breaks.`}
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">A4 Vector Ready</span>
        </div>
      )}
    </div>
  );
};
