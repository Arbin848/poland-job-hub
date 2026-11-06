import React, { useState } from 'react';
import { TemplateId, CVData, LanguageCode } from '../../../types/cv';
import { Check, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';

interface Props {
  selectedTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
  cv: CVData;
  language: LanguageCode;
}

interface TemplateOption {
  id: TemplateId;
  namePl: string;
  nameEn: string;
  category: 'polish' | 'ats' | 'executive' | 'tech';
  tagPl: string;
  tagEn: string;
  descPl: string;
  descEn: string;
}

export const V5TemplatePicker: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
  cv,
  language
}) => {
  const isPl = language === 'pl';
  const [filterCategory, setFilterCategory] = useState<'all' | 'polish' | 'ats' | 'executive' | 'tech'>('all');

  const templates: TemplateOption[] = [
    {
      id: 'modern-polish',
      namePl: 'Modern Polish Pro',
      nameEn: 'Modern Polish Pro',
      category: 'polish',
      tagPl: 'Standard RP',
      tagEn: 'Polish Market Standard',
      descPl: 'Dwukolumnowy układ z wyrazistym lewym paskiem bocznym. Zgodny z normami polskich rekruterów.',
      descEn: 'Two-column layout with authoritative sidebar. Tailored for Polish and CEE recruitment standards.'
    },
    {
      id: 'swiss-executive',
      namePl: 'Swiss Executive',
      nameEn: 'Swiss Executive',
      category: 'executive',
      tagPl: 'Klasa Executive',
      tagEn: 'Executive Leadership',
      descPl: 'Uporządkowany układ z eleganckimi cienkimi liniami i prestiżową typografią dyrektorską.',
      descEn: 'High-prestige corporate layout with refined typography and timeline structure.'
    },
    {
      id: 'clean-ats',
      namePl: 'Clean ATS Minimal',
      nameEn: 'Clean ATS Minimal',
      category: 'ats',
      tagPl: 'Struktura ATS',
      tagEn: 'ATS Standard',
      descPl: 'Jednokolumnowy purystyczny układ zoptymalizowany pod bezbłędne czytanie przez skanery Workday i Taleo.',
      descEn: 'Purist single-column linear hierarchy designed for flaw-free parsing by enterprise ATS scanners.'
    },
    {
      id: 'creative-tech',
      namePl: 'Creative Tech',
      nameEn: 'Creative Tech',
      category: 'tech',
      tagPl: 'Inżynieria & IT',
      tagEn: 'Tech & Engineering',
      descPl: 'Zaprojektowany dla inżynierów i programistów. Eksponuje stos technologiczny i linki do projektów.',
      descEn: 'Engineered for developers and architects. Highlights tech stacks, GitHub links, and impact metrics.'
    },
    {
      id: 'dynamic-impact',
      namePl: 'Dynamic Impact',
      nameEn: 'Dynamic Impact',
      category: 'executive',
      tagPl: 'Wyniki & Sprzedaż',
      tagEn: 'Results & Revenue',
      descPl: 'Wyraziste punkty z mocno wyeksponowanymi wskaźnikami liczbowymi i dynamicznym nagłówkiem.',
      descEn: 'High-contrast headline with prioritized numeric callouts and growth KPIs.'
    },
    {
      id: 'nordic-clean',
      namePl: 'Nordic Clean',
      nameEn: 'Nordic Clean',
      category: 'polish',
      tagPl: 'Skandynawski Minimalizm',
      tagEn: 'Scandinavian Minimal',
      descPl: 'Maksymalna czytelność i duża ilość światła. Ułatwia rekruterowi błyskawiczne odnalezienie kluczowych faktów.',
      descEn: 'Generous whitespace and subtle typography for rapid 6-second recruiter scanning.'
    },
    {
      id: 'academic-elite',
      namePl: 'Academic Elite',
      nameEn: 'Academic Elite',
      category: 'polish',
      tagPl: 'Akademicki & Medyczny',
      tagEn: 'Academic & Medical',
      descPl: 'Tradycyjny, dostojny szablon serif dla prawników, lekarzy, naukowców i kadry akademickiej.',
      descEn: 'Traditional serif structure for law, medicine, science, and academic faculties.'
    },
    {
      id: 'berlin-minimal',
      namePl: 'Berlin Minimal',
      nameEn: 'Berlin Minimal',
      category: 'tech',
      tagPl: 'Nowoczesny Startup',
      tagEn: 'Modern Startup',
      descPl: 'Ultralustrzany, industrialny styl dla startupów, agencji i rynków zachodnioeuropejskich.',
      descEn: 'Ultra-clean industrial layout tailored for high-growth tech startups and agencies.'
    },
    {
      id: 'elegance-serif',
      namePl: 'Elegance Serif',
      nameEn: 'Elegance Serif',
      category: 'executive',
      tagPl: 'Luksusowa Typografia',
      tagEn: 'Luxury Editorial',
      descPl: 'Harmonijna typografia szeryfowa, delikatne separatory i luksusowe proporcje marginesów.',
      descEn: 'Harmonious serif typography, delicate hairline dividers, and luxury margins.'
    },
    {
      id: 'euro-modern',
      namePl: 'Euro Modern',
      nameEn: 'Euro Modern',
      category: 'polish',
      tagPl: 'Standard Europejski',
      tagEn: 'European Standard',
      descPl: 'Nowoczesna alternatywa dla klasycznego Europass, powszechnie akceptowana w krajach UE.',
      descEn: 'Modern alternative to legacy Europass, widely recognized across all EU jurisdictions.'
    }
  ];

  const filteredTemplates = filterCategory === 'all'
    ? templates
    : templates.filter(t => t.category === filterCategory);

  return (
    <div className="space-y-5">
      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            filterCategory === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isPl ? 'Wszystkie szablony (10)' : 'All Templates (10)'}
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('polish')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            filterCategory === 'polish'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isPl ? 'Standard Rynku RP' : 'Polish Standard'}
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('ats')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            filterCategory === 'ats'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isPl ? 'Struktura Przyjazna ATS' : 'ATS-Friendly Structure'}
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('executive')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            filterCategory === 'executive'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isPl ? 'Executive & Zarządzanie' : 'Executive'}
        </button>
        <button
          type="button"
          onClick={() => setFilterCategory('tech')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
            filterCategory === 'tech'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {isPl ? 'IT & Inżynieria' : 'IT & Tech'}
        </button>
      </div>

      {/* Grid of Templates with Miniature Real Live Previews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTemplates.map((t) => {
          const isSelected = selectedTemplate === t.id;
          const previewCandidate = { ...cv, templateId: t.id };

          return (
            <div
              key={t.id}
              data-template-id={t.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectTemplate(t.id)}
              className={`relative rounded-2xl border p-4 text-left transition-all cursor-pointer group flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-500/20 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Miniature Thumbnail */}
              <div className="w-full h-44 bg-slate-100/70 rounded-xl overflow-hidden border border-slate-200/80 mb-3 relative flex items-start justify-center pt-2">
                <div className="w-[320px] max-w-full overflow-hidden shadow-xs pointer-events-none">
                  <div className="origin-top scale-[0.38] -mb-[420px]">
                    <ResumeCanvas cv={previewCandidate} zoom={1} isThumbnail={true} />
                  </div>
                </div>

                {/* Selected Overlay Pill */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 bg-indigo-600 text-white rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Template Title & Clean Metadata */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition">
                    {isPl ? t.namePl : t.nameEn}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">
                    {isPl ? t.tagPl : t.tagEn}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {isPl ? t.descPl : t.descEn}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">{t.id}</span>
                <span className={`font-semibold ${isSelected ? 'text-indigo-600 font-bold' : 'text-slate-500 group-hover:text-slate-900'}`}>
                  {isSelected ? (isPl ? '✓ Aktywny styl' : '✓ Active Style') : (isPl ? 'Wybierz ten styl →' : 'Select this style →')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
