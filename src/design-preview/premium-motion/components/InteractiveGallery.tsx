import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TemplateId, CVData } from '../../../types/cv';
import { THEME } from '../tokens';
import { Check, Sparkles, Eye, ArrowRight, Layers, Filter, ZoomIn, ZoomOut, Maximize2, X } from 'lucide-react';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';

interface Props {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
  sampleCv: CVData;
  onContinueToEditor: () => void;
}

interface TemplateMeta {
  id: TemplateId;
  name: string;
  category: 'polish' | 'ats' | 'executive' | 'tech';
  tag: string;
  description: string;
  layoutType: string;
  accent: string;
  bestFor: string;
}

// Dedicated Responsive Miniature Canvas that renders the REAL template
const TemplateThumbnailPreview: React.FC<{
  templateId: TemplateId;
  cv: CVData;
  accent: string;
}> = ({ templateId, cv }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.33);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        if (w > 0) {
          // 820px is the standard width of the CV preview canvas
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
        showWorkPermitBadge: false // Keep thumbnail clean and uncluttered
      }
    }),
    [cv, templateId]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[1/1.4142] overflow-hidden bg-white select-none pointer-events-none"
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
        <ResumeCanvas cv={previewCv} zoom={1} />
      </div>
    </div>
  );
};

export const InteractiveGallery: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
  sampleCv,
  onContinueToEditor
}) => {
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
      name: 'Modern Polish Pro',
      category: 'polish',
      tag: 'Standard Rynku RP',
      description: 'Klasyczny, dwukolumnowy układ z wyrazistym lewym paskiem bocznym. Zgodny z normami polskich rekruterów i agencji zatrudnienia.',
      layoutType: 'Dwukolumnowy (Sidebar)',
      accent: '#6250F4',
      bestFor: 'Logistyka, Produkcja, FMCG, Administracja'
    },
    {
      id: 'clean-ats',
      name: 'Clean ATS Minimal',
      category: 'ats',
      tag: 'Czysty Tekst (ATS)',
      description: 'Jednokolumnowy, purystyczny układ zoptymalizowany pod bezbłędne czytanie przez skanery rekrutacyjne i parsery CV.',
      layoutType: 'Jednokolumnowy (Liniowy)',
      accent: '#0f766e',
      bestFor: 'Korporacje międzynarodowe, Finanse, Audyt'
    },
    {
      id: 'swiss-executive',
      name: 'Swiss Executive',
      category: 'executive',
      tag: 'Klasa Executive',
      description: 'Ekskluzywny, uporządkowany układ z eleganckimi cienkimi liniami i prestiżową typografią. Rekomendowany dla kadry zarządzającej.',
      layoutType: 'Elegancka Siatka Dyrektorska',
      accent: '#1e3a8a',
      bestFor: 'Dyrektorzy, Menedżerowie, Konsultanci'
    },
    {
      id: 'creative-tech',
      name: 'Creative Tech',
      category: 'tech',
      tag: 'IT & Technologie',
      description: 'Zaprojektowany dla programistów i inżynierów. Wyróżniony stos technologiczny, klocki umiejętności i linki do portfolio.',
      layoutType: 'Nowoczesny Układ Hybrydowy',
      accent: '#4f46e5',
      bestFor: 'Software Engineers, DevOps, Data Science'
    },
    {
      id: 'berlin-minimal',
      name: 'Neo-Berlin Minimal',
      category: 'polish',
      tag: 'Styl Designerski',
      description: 'Mocny kontrast, geometryczna dyscyplina i nowoczesne akcenty dla osób poszukujących wyrazistej formy.',
      layoutType: 'Monochromatyczny Kontrast',
      accent: '#0f172a',
      bestFor: 'Architekci, Projektanci, Marketing'
    },
    {
      id: 'elegance-serif',
      name: 'Elegance Serif',
      category: 'executive',
      tag: 'Prawo & Doradztwo',
      description: 'Klasyczny krój szeryfowy (Merriweather), symetryczny nagłówek i dostojna kompozycja budząca prestiż i autorytet.',
      layoutType: 'Klasyczny Szeryfowy',
      accent: '#78350f',
      bestFor: 'Kancelarie prawne, Notariusze, Audytorzy'
    },
    {
      id: 'euro-modern',
      name: 'Euro Modern',
      category: 'ats',
      tag: 'Standard Europejski',
      description: 'Nowoczesna alternatywa dla formatu Europass. Przejrzyste wskaźniki językowe CEFR i uporządkowany podział sekcji.',
      layoutType: 'Modularny Schengen',
      accent: '#0369a1',
      bestFor: 'Praca w Niemczech, Holandii, Skandynawii'
    },
    {
      id: 'nordic-clean',
      name: 'Nordic Clean',
      category: 'polish',
      tag: 'Skandynawski Minimalizm',
      description: 'Maksymalna czytelność i duża ilość światła. Ułatwia rekruterowi błyskawiczne odnalezienie kluczowych faktów.',
      layoutType: 'Lekki i Przestrzenny',
      accent: '#065f46',
      bestFor: 'HR, Obsługa Klienta, Praca Zdalna'
    },
    {
      id: 'academic-elite',
      name: 'Academic Elite',
      category: 'executive',
      tag: 'Edukacja & Badania',
      description: 'Struktura zoptymalizowana pod publikacje naukowe, granty, działalność dydaktyczną oraz stopnie i tytuły.',
      layoutType: 'Hierarchiczny Akademicki',
      accent: '#b91c1c',
      bestFor: 'Uczelnie wyższe, Doktoranci, Badacze'
    },
    {
      id: 'dynamic-impact',
      name: 'Dynamic Impact',
      category: 'tech',
      tag: 'Wyniki & Sprzedaż',
      description: 'Wyraziste punkty z mocno wyeksponowanymi wskaźnikami liczbowymi i dynamicznym nagłówkiem nastawionym na sukces.',
      layoutType: 'Ekspozycja Wskaźników KPI',
      accent: '#d97706',
      bestFor: 'Handlowcy B2B, Key Account Managerowie'
    }
  ];

  const filteredTemplates = templatesList.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  const activeModalTemplate = templatesList.find((t) => t.id === previewModalTpl);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-[#E5E8F3]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6250F4]/10 text-[#6250F4] font-bold text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>10 Profesjonalnych Szablonów A4</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18233F]">
            Wybierz Szablon Dopasowany do Twojej Branży
          </h2>
          <p className="text-xs sm:text-sm text-[#75819C] mt-1 font-medium max-w-2xl">
            Każdy szablon zachowuje 100% wprowadzonych danych. Poniższe miniaturki renderują rzeczywisty układ graficzny dokumentu.
          </p>
        </div>

        <button
          type="button"
          onClick={onContinueToEditor}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer self-start md:self-auto shrink-0"
        >
          <span>Przejdź do Edytora</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <Filter className="w-4 h-4 text-[#75819C] shrink-0 mr-1" />
        {[
          { key: 'all', label: 'Wszystkie Szablony (10)' },
          { key: 'polish', label: 'Standard Polski (RODO & Foto)' },
          { key: 'ats', label: 'Układy Przyjazne ATS' },
          { key: 'executive', label: 'Kadra Zarządzająca & Prawo' },
          { key: 'tech', label: 'Technologie & IT' }
        ].map((f) => (
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

          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group relative hover:-translate-y-1.5 hover:shadow-2xl ${
                isSelected
                  ? 'border-[#6250F4] ring-3 ring-[#6250F4]/25 shadow-xl scale-[1.01]'
                  : 'border-[#E5E8F3] shadow-sm hover:border-[#6250F4]/50'
              }`}
            >
              {/* Genuine Representative Thumbnail Preview */}
              <div className="relative w-full overflow-hidden bg-slate-100 border-b border-[#E5E8F3]">
                <TemplateThumbnailPreview
                  templateId={tpl.id}
                  cv={sampleCv}
                  accent={tpl.accent}
                />

                {/* Subtle Hover Gradient Overlay with Quick Preview Action */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-between p-3">
                  <span className="text-[11px] font-bold text-white drop-shadow-sm">
                    {tpl.layoutType}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewModalTpl(tpl.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#18233F] text-[11px] font-bold flex items-center gap-1 shadow-md transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-[#6250F4]" />
                    <span>Powiększ</span>
                  </button>
                </div>

                {/* Selected Status Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#6250F4] text-white flex items-center gap-1 text-[11px] font-extrabold shadow-md">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Aktywny</span>
                  </div>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-extrabold text-sm text-[#18233F] group-hover:text-[#6250F4] transition-colors">
                      {tpl.name}
                    </h3>
                    <span className="text-[10px] font-mono font-bold text-[#6250F4] bg-[#6250F4]/10 px-2 py-0.5 rounded-full shrink-0">
                      {tpl.tag}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#75819C] line-clamp-2 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-[#75819C] truncate max-w-[180px]">
                    <strong className="text-[#18233F]">Dla:</strong> {tpl.bestFor}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTemplate(tpl.id);
                      onContinueToEditor();
                    }}
                    className="text-[#6250F4] font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>Wybierz</span>
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
            aria-label={`Podgląd szablonu ${activeModalTemplate.name}`}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F9FF] rounded-2xl max-w-5xl w-full h-[92vh] flex flex-col shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#E5E8F3] shrink-0">
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: activeModalTemplate.accent }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-[#18233F]">
                      {activeModalTemplate.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6250F4]/10 text-[#6250F4]">
                      {activeModalTemplate.tag}
                    </span>
                  </div>
                  <span className="text-xs text-[#75819C]">
                    Układ: {activeModalTemplate.layoutType} · Zalecany dla: {activeModalTemplate.bestFor}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 bg-[#F8F9FF] border border-[#E5E8F3] rounded-xl p-1 text-xs font-bold text-[#18233F]">
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.max(0.5, z - 0.1))}
                    className="p-1 rounded-lg hover:bg-white transition"
                    title="Pomniejsz"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-[#75819C]" />
                  </button>
                  <span className="px-1 text-[11px] font-mono min-w-[42px] text-center">
                    {Math.round(modalZoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.min(1.2, z + 0.1))}
                    className="p-1 rounded-lg hover:bg-white transition"
                    title="Powiększ"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#75819C]" />
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
                  <span>Użyj tego szablonu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewModalTpl(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  title="Zamknij (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Canvas Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200/70">
              <div className="max-w-full">
                <ResumeCanvas
                  cv={{ ...sampleCv, templateId: activeModalTemplate.id }}
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
