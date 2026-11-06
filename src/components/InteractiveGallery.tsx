import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TemplateId, CVData, LanguageCode } from '../types/cv';
import {
  Check,
  Sparkles,
  Eye,
  ArrowRight,
  Filter,
  ZoomIn,
  ZoomOut,
  X,
  RotateCcw,
  ShieldCheck,
  Home,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { ResumeCanvas } from './CVPreview/ResumeCanvas';

export interface InteractiveGalleryProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  cv: CVData;
  language: LanguageCode;
  onContinueToEditor: () => void;
  onBackToHome?: () => void;
  isModalView?: boolean;
}

interface TemplateMeta {
  id: TemplateId;
  namePl: string;
  nameEn: string;
  category: 'polish' | 'ats' | 'executive' | 'tech';
  tagPl: string;
  tagEn: string;
  descriptionPl: string;
  descriptionEn: string;
  layoutTypePl: string;
  layoutTypeEn: string;
  accent: string;
  bestForPl: string;
  bestForEn: string;
  atsRating: string;
}

// Dedicated Responsive Miniature Canvas that renders the REAL production template
const TemplateThumbnailPreview: React.FC<{
  templateId: TemplateId;
  cv: CVData;
}> = ({ templateId, cv }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        if (w > 0) {
          // Standard width of the CV preview canvas is 820px
          setScale(w / 820);
        }
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Isolate cv data for preview with specified template
  const previewCv = useMemo(
    () => ({
      ...cv,
      templateId,
      personalInfo: {
        ...cv.personalInfo,
        showWorkPermitBadge: false
      }
    }),
    [cv, templateId]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[210/297] overflow-hidden bg-white select-none pointer-events-none"
    >
      <div
        style={{
          width: 820,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none'
        }}
        className="absolute top-0 left-0 bg-white"
      >
        <ResumeCanvas cv={previewCv} zoom={1} isThumbnail={true} />
      </div>
    </div>
  );
};

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({
  selectedTemplate,
  onSelectTemplate,
  cv,
  language,
  onContinueToEditor,
  onBackToHome,
  isModalView = false
}) => {
  const isPl = language === 'pl';
  const [activeCategory, setActiveCategory] = useState<'all' | 'ats' | 'polish' | 'executive' | 'tech'>('all');
  const [previewModalTpl, setPreviewModalTpl] = useState<TemplateId | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(0.85);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewModalTpl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const templatesList: TemplateMeta[] = [
    {
      id: 'modern-polish',
      namePl: 'Modern Polish Pro',
      nameEn: 'Modern Polish Pro',
      category: 'polish',
      tagPl: 'Standard Rynku RP',
      tagEn: 'Polish Market Standard',
      descriptionPl: 'Klasyczny, dwukolumnowy układ z wyrazistym lewym paskiem bocznym. Zgodny z normami polskich rekruterów i agencji zatrudnienia.',
      descriptionEn: 'Classic two-column layout with authoritative sidebar. Tailored to Polish hiring managers and agency recruitment standards.',
      layoutTypePl: 'Dwukolumnowy (Sidebar)',
      layoutTypeEn: 'Two-Column (Sidebar)',
      accent: '#6250F4',
      bestForPl: 'Logistyka, Produkcja, FMCG, Administracja, B2B',
      bestForEn: 'Logistics, Supply Chain, Operations, Admin, B2B',
      atsRating: '98% ATS'
    },
    {
      id: 'swiss-executive',
      namePl: 'Swiss Executive',
      nameEn: 'Swiss Executive',
      category: 'executive',
      tagPl: 'Klasa Executive',
      tagEn: 'Executive Leadership',
      descriptionPl: 'Ekskluzywny, uporządkowany układ z eleganckimi cienkimi liniami i prestiżową typografią. Rekomendowany dla kadry zarządzającej.',
      descriptionEn: 'High-prestige corporate layout with refined typography and timeline structure. Ideal for director and senior roles.',
      layoutTypePl: 'Elegancka Siatka Dyrektorska',
      layoutTypeEn: 'Director Precision Grid',
      accent: '#1e3a8a',
      bestForPl: 'Dyrektorzy, Menedżerowie, Konsultanci, Finanse',
      bestForEn: 'C-Suite, Directors, Senior Consultants, Finance',
      atsRating: '97% ATS'
    },
    {
      id: 'clean-ats',
      namePl: 'Clean ATS Minimal',
      nameEn: 'Clean ATS Minimal',
      category: 'ats',
      tagPl: 'Czysty Tekst (ATS)',
      tagEn: '100% ATS Optimized',
      descriptionPl: 'Jednokolumnowy, purystyczny układ zoptymalizowany pod bezbłędne czytanie przez skanery rekrutacyjne i parsery CV (Workday, Taleo).',
      descriptionEn: 'Purist single-column linear hierarchy designed for flaw-free parsing by Workday, Taleo, and enterprise ATS scanners.',
      layoutTypePl: 'Jednokolumnowy (Liniowy)',
      layoutTypeEn: 'Single-Column (Linear)',
      accent: '#0f766e',
      bestForPl: 'Korporacje międzynarodowe, Finanse, Audyt, IT',
      bestForEn: 'Global Corporates, Enterprise IT, Big 4 Audit',
      atsRating: '100% ATS'
    },
    {
      id: 'creative-tech',
      namePl: 'Creative Tech',
      nameEn: 'Creative Tech',
      category: 'tech',
      tagPl: 'IT & Technologie',
      tagEn: 'Tech & Engineering',
      descriptionPl: 'Zaprojektowany dla inżynierów i programistów. Wyróżniony stos technologiczny, klocki umiejętności i linki do projektów.',
      descriptionEn: 'Engineered for software engineers and architects. Highlights tech stack badges, GitHub links, and impact metrics.',
      layoutTypePl: 'Nowoczesny Układ Hybrydowy',
      layoutTypeEn: 'Modern Hybrid Grid',
      accent: '#4f46e5',
      bestForPl: 'Software Engineers, DevOps, Data Science, Product',
      bestForEn: 'Software Engineers, DevOps, Tech Leads, Data',
      atsRating: '98% ATS'
    },
    {
      id: 'dynamic-impact',
      namePl: 'Dynamic Impact',
      nameEn: 'Dynamic Impact',
      category: 'executive',
      tagPl: 'Wyniki & Sprzedaż',
      tagEn: 'Results & Revenue',
      descriptionPl: 'Wyraziste punkty z mocno wyeksponowanymi wskaźnikami liczbowymi i dynamicznym nagłówkiem nastawionym na sukces handlowy.',
      descriptionEn: 'High-contrast headline with prioritized numeric callouts and growth KPIs engineered for business leaders.',
      layoutTypePl: 'Ekspozycja Wskaźników KPI',
      layoutTypeEn: 'High-Impact KPI Layout',
      accent: '#d97706',
      bestForPl: 'Handlowcy B2B, Key Account Managerowie, Dyrektorzy Sprzedaży',
      bestForEn: 'Sales Executives, Key Account Managers, Growth',
      atsRating: '96% ATS'
    },
    {
      id: 'nordic-clean',
      namePl: 'Nordic Clean',
      nameEn: 'Nordic Clean',
      category: 'polish',
      tagPl: 'Skandynawski Minimalizm',
      tagEn: 'Scandinavian Minimal',
      descriptionPl: 'Maksymalna czytelność i duża ilość światła. Ułatwia rekruterowi błyskawiczne odnalezienie kluczowych faktów w 6 sekund.',
      descriptionEn: 'Generous whitespace and subtle typography. Allows recruiters to spot key facts in the critical 6-second scan.',
      layoutTypePl: 'Lekki i Przestrzenny',
      layoutTypeEn: 'Spacious & Airy',
      accent: '#065f46',
      bestForPl: 'HR, Obsługa Klienta, Marketing, Praca Zdalna',
      bestForEn: 'People & HR, Customer Success, Remote Roles',
      atsRating: '97% ATS'
    },
    {
      id: 'academic-elite',
      namePl: 'Academic Elite',
      nameEn: 'Academic Elite',
      category: 'executive',
      tagPl: 'Edukacja & Badania',
      tagEn: 'Higher Ed & Clinical',
      descriptionPl: 'Struktura zoptymalizowana pod publikacje naukowe, granty, działalność dydaktyczną, tytuły naukowe i numery PWZ.',
      descriptionEn: 'Structured for research publications, grants, academic appointments, degrees, and certified credentials.',
      layoutTypePl: 'Hierarchiczny Akademicki',
      layoutTypeEn: 'Scholarly Hierarchy',
      accent: '#b91c1c',
      bestForPl: 'Uczelnie wyższe, Doktoranci, Badacze, Lekarze',
      bestForEn: 'Researchers, Postdocs, Faculty, Clinicians',
      atsRating: '96% ATS'
    },
    {
      id: 'berlin-minimal',
      namePl: 'Neo-Berlin Minimal',
      nameEn: 'Neo-Berlin Minimal',
      category: 'tech',
      tagPl: 'Styl Designerski',
      tagEn: 'Modernist Editorial',
      descriptionPl: 'Mocny kontrast, geometryczna dyscyplina i nowoczesne akcenty dla osób poszukujących wyrazistej formy graficznej.',
      descriptionEn: 'Bold geometry, numbered section badges, and editorial contrast for creative and product pioneers.',
      layoutTypePl: 'Monochromatyczny Kontrast',
      layoutTypeEn: 'High-Contrast Monospace',
      accent: '#0f172a',
      bestForPl: 'Architekci, Projektanci, UX/UI, Nowe Media',
      bestForEn: 'Architects, Product Designers, UX Leads, Media',
      atsRating: '95% ATS'
    },
    {
      id: 'elegance-serif',
      namePl: 'Elegance Serif',
      nameEn: 'Elegance Serif',
      category: 'executive',
      tagPl: 'Prawo & Doradztwo',
      tagEn: 'Legal & Consulting',
      descriptionPl: 'Klasyczny krój szeryfowy (Merriweather), symetryczny nagłówek i dostojna kompozycja budząca prestiż i autorytet.',
      descriptionEn: 'Timeless serif typography, balanced symmetry, and refined dignity suited for prestigious counsel.',
      layoutTypePl: 'Klasyczny Szeryfowy',
      layoutTypeEn: 'Classical Serif Editorial',
      accent: '#78350f',
      bestForPl: 'Kancelarie prawne, Notariusze, Audytorzy, Consulting',
      bestForEn: 'Attorneys, Legal Counsel, Audit, Private Wealth',
      atsRating: '97% ATS'
    },
    {
      id: 'euro-modern',
      namePl: 'Euro Modern',
      nameEn: 'Euro Modern',
      category: 'ats',
      tagPl: 'Standard Europejski',
      tagEn: 'EU Schengen Standard',
      descriptionPl: 'Nowoczesna alternatywa dla formatu Europass. Przejrzyste wskaźniki językowe CEFR i uporządkowany podział sekcji.',
      descriptionEn: 'Modern alternative to Europass. Clear CEFR language proficiency indicators and standardized EU work eligibility.',
      layoutTypePl: 'Modularny Schengen',
      layoutTypeEn: 'Modular Schengen Layout',
      accent: '#0369a1',
      bestForPl: 'Praca w Niemczech, Holandii, Skandynawii, Transport',
      bestForEn: 'EU-wide roles (Germany, Netherlands, Nordics), SSC',
      atsRating: '98% ATS'
    }
  ];

  const filteredTemplates = templatesList.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const activeModalTemplate = templatesList.find((t) => t.id === previewModalTpl);

  const filterButtons = [
    { key: 'all', label: isPl ? 'Wszystkie Szablony (10)' : 'All Templates (10)' },
    { key: 'polish', label: isPl ? 'Standard Polski (RODO & Foto)' : 'Polish Standard (GDPR & Photo)' },
    { key: 'ats', label: isPl ? 'Układy Przyjazne ATS' : 'ATS-Friendly Layouts' },
    { key: 'executive', label: isPl ? 'Kadra Zarządzająca & Prawo' : 'Executive & Legal' },
    { key: 'tech', label: isPl ? 'Technologie & IT' : 'Tech & IT' }
  ];

  return (
    <div className={`w-full max-w-full overflow-x-hidden ${isModalView ? 'p-4 sm:p-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'}`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-[#E5E8F3]">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6250F4]/10 text-[#6250F4] font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isPl ? '10 Profesjonalnych Szablonów A4' : '10 Professional A4 Templates'}</span>
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{isPl ? '100% Zgodność z Polskim Rynkiem & ATS' : '100% Polish Market & ATS Compliant'}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18233F] tracking-tight">
            {isPl ? 'Wybierz Szablon Dopasowany do Twojej Kariery' : 'Choose a Template Tailored to Your Career'}
          </h1>
          <p className="text-xs sm:text-sm text-[#75819C] mt-1.5 font-medium max-w-2xl leading-relaxed">
            {isPl
              ? 'Wszystkie szablony renderują Twoje rzeczywiste dane z edytora. Zmiana stylu jest w 100% bezpieczna i zachowuje kompletne informacje kandydata.'
              : 'All templates render your live candidate data. Changing styles is 100% safe and preserves your complete resume details.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 flex-wrap">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="px-4 py-3 rounded-xl bg-white border border-[#E5E8F3] hover:bg-slate-50 text-[#18233F] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm transition cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#75819C]" />
              <span>{isPl ? 'Strona Główna' : 'Homepage'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onContinueToEditor}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>{isPl ? 'Przejdź do Edytora' : 'Continue to Editor'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none max-w-full">
        <Filter className="w-4 h-4 text-[#75819C] shrink-0 mr-1" />
        {filterButtons.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveCategory(f.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer ${
              activeCategory === f.key
                ? 'bg-[#6250F4] text-white shadow-md'
                : 'bg-white text-[#75819C] hover:text-[#18233F] border border-[#E5E8F3] hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;
          const name = isPl ? tpl.namePl : tpl.nameEn;
          const tag = isPl ? tpl.tagPl : tpl.tagEn;
          const desc = isPl ? tpl.descriptionPl : tpl.descriptionEn;
          const layout = isPl ? tpl.layoutTypePl : tpl.layoutTypeEn;
          const bestFor = isPl ? tpl.bestForPl : tpl.bestForEn;

          return (
            <div
              key={tpl.id}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`${name} - ${tag}`}
              onClick={() => onSelectTemplate(tpl.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTemplate(tpl.id);
                }
              }}
              className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group relative hover:-translate-y-1.5 hover:shadow-2xl focus:outline-hidden focus:ring-3 focus:ring-[#6250F4] ${
                isSelected
                  ? 'border-[#6250F4] ring-3 ring-[#6250F4]/25 shadow-xl scale-[1.01]'
                  : 'border-[#E5E8F3] shadow-sm hover:border-[#6250F4]/50'
              }`}
            >
              {/* Representative Thumbnail Preview */}
              <div className="relative w-full overflow-hidden bg-slate-100 border-b border-[#E5E8F3]">
                <TemplateThumbnailPreview
                  templateId={tpl.id}
                  cv={cv}
                />

                {/* Subtle Hover Gradient Overlay with Quick Preview Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                  <span className="text-[11px] font-bold text-white drop-shadow-sm truncate max-w-[150px]">
                    {layout}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewModalTpl(tpl.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/95 hover:bg-white text-[#18233F] text-[11px] font-bold flex items-center gap-1 shadow-md transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#6250F4]" />
                    <span>{isPl ? 'Powiększ' : 'Preview'}</span>
                  </button>
                </div>

                {/* Selected Status Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#6250F4] text-white flex items-center gap-1 text-[11px] font-extrabold shadow-md z-10">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{isPl ? 'Aktywny' : 'Active'}</span>
                  </div>
                )}

                {/* ATS Rating Chip */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-slate-800 flex items-center gap-1 text-[10px] font-mono font-bold shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{tpl.atsRating}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2 className="font-extrabold text-sm text-[#18233F] group-hover:text-[#6250F4] transition-colors">
                      {name}
                    </h2>
                    <span className="text-[10px] font-mono font-bold text-[#6250F4] bg-[#6250F4]/10 px-2 py-0.5 rounded-full shrink-0">
                      {tag}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#75819C] line-clamp-2 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-[#75819C] truncate max-w-[170px]" title={bestFor}>
                    <strong className="text-[#18233F]">{isPl ? 'Dla:' : 'For:'}</strong> {bestFor}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(tpl.id);
                      onContinueToEditor();
                    }}
                    className="text-[#6250F4] font-bold hover:underline flex items-center gap-0.5 cursor-pointer shrink-0 ml-1"
                  >
                    <span>{isPl ? 'Wybierz' : 'Select'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full-size Template Preview Modal */}
      {previewModalTpl && activeModalTemplate && (
        <div
          onClick={() => setPreviewModalTpl(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${isPl ? 'Podgląd szablonu' : 'Template preview'}: ${isPl ? activeModalTemplate.namePl : activeModalTemplate.nameEn}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F9FF] rounded-2xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#E5E8F3] shrink-0 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: activeModalTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-[#18233F]">
                      {isPl ? activeModalTemplate.namePl : activeModalTemplate.nameEn}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6250F4]/10 text-[#6250F4]">
                      {isPl ? activeModalTemplate.tagPl : activeModalTemplate.tagEn}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {activeModalTemplate.atsRating}
                    </span>
                  </div>
                  <span className="text-xs text-[#75819C]">
                    {isPl ? 'Układ:' : 'Layout:'} {isPl ? activeModalTemplate.layoutTypePl : activeModalTemplate.layoutTypeEn} · {isPl ? 'Zalecany dla:' : 'Best for:'} {isPl ? activeModalTemplate.bestForPl : activeModalTemplate.bestForEn}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 bg-[#F8F9FF] border border-[#E5E8F3] rounded-xl p-1 text-xs font-bold text-[#18233F]">
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 100) / 100))}
                    className="p-1 rounded-lg hover:bg-white transition cursor-pointer"
                    title={isPl ? 'Pomniejsz' : 'Zoom out'}
                    aria-label={isPl ? 'Pomniejsz' : 'Zoom out'}
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-[#75819C]" />
                  </button>
                  <span className="px-1 text-[11px] font-mono min-w-[42px] text-center">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.min(1.2, Math.round((z + 0.1) * 100) / 100))}
                    className="p-1 rounded-lg hover:bg-white transition cursor-pointer"
                    title={isPl ? 'Powiększ' : 'Zoom in'}
                    aria-label={isPl ? 'Powiększ' : 'Zoom in'}
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#75819C]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalZoom(0.85)}
                    className="p-1 rounded-lg hover:bg-white transition cursor-pointer text-[#75819C]"
                    title={isPl ? 'Resetuj powiększenie' : 'Reset zoom'}
                    aria-label={isPl ? 'Resetuj powiększenie' : 'Reset zoom'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectTemplate(activeModalTemplate.id);
                    setPreviewModalTpl(null);
                    onContinueToEditor();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#6250F4] hover:bg-[#5240e3] text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isPl ? 'Użyj tego szablonu' : 'Use this template'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewModalTpl(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  title={isPl ? 'Zamknij (Esc)' : 'Close (Esc)'}
                  aria-label={isPl ? 'Zamknij podgląd' : 'Close preview'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Canvas Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200/80">
              <div className="max-w-full">
                <ResumeCanvas
                  cv={{ ...cv, templateId: activeModalTemplate.id }}
                  zoom={modalZoom}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
