import React from 'react';
import { TemplateId, LanguageCode, CVData, FacultyCategory } from '../types/cv';
import { PRESET_PROFILES } from '../data/presets';
import {
  Palette,
  Sparkles,
  Check,
  ChevronRight,
  Briefcase
} from 'lucide-react';

interface Props {
  selectedTemplate: TemplateId;
  onSelectTemplate: (tpl: TemplateId) => void;
  onSelectPreset: (presetData: Partial<CVData>) => void;
  onOpenFullGallery: () => void;
  language: LanguageCode;
  accentColor?: string;
  onChangeAccentColor?: (color: string) => void;
}

export const TemplateQuickStrip: React.FC<Props> = ({
  selectedTemplate,
  onSelectTemplate,
  onSelectPreset,
  onOpenFullGallery,
  language,
  accentColor = '#1e3a8a',
  onChangeAccentColor
}) => {
  const isPl = language === 'pl';

  const templates: {
    id: TemplateId;
    labelPl: string;
    labelEn: string;
    tagPl: string;
    tagEn: string;
    accent: string;
  }[] = [
    { id: 'modern-polish', labelPl: 'Cascade Pro (Standard PL)', labelEn: 'Cascade Pro', tagPl: 'Polska Agencja', tagEn: 'Polish Agency', accent: '#1e3a8a' },
    { id: 'swiss-executive', labelPl: 'Swiss Executive', labelEn: 'Swiss Executive', tagPl: 'Prestige Dyrektorski', tagEn: 'Executive Prestige', accent: '#0f172a' },
    { id: 'dynamic-impact', labelPl: 'Executive Banner', labelEn: 'Executive Banner', tagPl: 'Canva Pro Style', tagEn: 'Canva Pro Style', accent: '#b91c1c' },
    { id: 'creative-tech', labelPl: 'Creative Tech', labelEn: 'Creative Tech', tagPl: 'Silicon & IT', tagEn: 'Silicon & IT', accent: '#4f46e5' },
    { id: 'clean-ats', labelPl: 'Clean ATS Minimal', labelEn: 'Clean ATS Minimal', tagPl: '100% Parsowania', tagEn: '100% Parsed', accent: '#0f766e' },
    { id: 'euro-modern', labelPl: 'Euro Modern (UE)', labelEn: 'Euro Modern (EU)', tagPl: 'Rynek UE / Schengen', tagEn: 'EU Market', accent: '#0369a1' },
    { id: 'elegance-serif', labelPl: 'Elegance Serif', labelEn: 'Elegance Serif', tagPl: 'Prawo & Medycyna', tagEn: 'Law & Medicine', accent: '#78350f' },
    { id: 'berlin-minimal', labelPl: 'Neo-Berlin', labelEn: 'Neo-Berlin', tagPl: 'Bold Modernist', tagEn: 'Bold Modernist', accent: '#18181b' },
    { id: 'nordic-clean', labelPl: 'Nordic Clean', labelEn: 'Nordic Clean', tagPl: 'Skandynawski Minimal', tagEn: 'Nordic Minimal', accent: '#475569' },
    { id: 'academic-elite', labelPl: 'Academic Elite', labelEn: 'Academic Elite', tagPl: 'Uczelnie & Badania', tagEn: 'Faculty & Research', accent: '#1e3a8a' },
  ];

  const quickSamples: { id: FacultyCategory; labelPl: string; labelEn: string; tpl: TemplateId }[] = [
    { id: 'logistics', labelPl: 'Magazynier / UDT', labelEn: 'Warehouse & UDT', tpl: 'modern-polish' },
    { id: 'it-software', labelPl: 'Programista IT', labelEn: 'Software IT', tpl: 'creative-tech' },
    { id: 'healthcare', labelPl: 'Lekarz / Pielęgniarka', labelEn: 'Healthcare', tpl: 'swiss-executive' },
    { id: 'engineering', labelPl: 'Inżynier Produkcji', labelEn: 'Engineering', tpl: 'euro-modern' },
    { id: 'sales', labelPl: 'Dyrektor Sprzedaży', labelEn: 'Sales Executive', tpl: 'dynamic-impact' },
    { id: 'finance', labelPl: 'Finanse & Księgowość', labelEn: 'Finance', tpl: 'elegance-serif' },
  ];

  const paletteColors = [
    { hex: '#1e3a8a', label: 'Navy' },
    { hex: '#0f172a', label: 'Obsidian' },
    { hex: '#065f46', label: 'Emerald' },
    { hex: '#4f46e5', label: 'Indigo' },
    { hex: '#b91c1c', label: 'Crimson' },
    { hex: '#0369a1', label: 'Sky' },
    { hex: '#78350f', label: 'Amber' },
    { hex: '#0f766e', label: 'Teal' },
  ];

  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-6 py-2.5 print:hidden shadow-xs">
      <div className="max-w-[1720px] mx-auto flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
        {/* Templates Visual Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto scrollbar-none py-0.5">
          <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-200">
            <Palette className="w-4 h-4 text-indigo-600 shrink-0" />
            <div className="leading-tight">
              <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide block">
                {isPl ? 'Szablon CV:' : 'CV Template:'}
              </span>
              <span className="text-[9.5px] font-mono text-slate-400 block">
                10 {isPl ? 'układów' : 'layouts'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 min-w-max">
            {templates.map((t) => {
              const isSelected = selectedTemplate === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onSelectTemplate(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-left transition flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-slate-900/10'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  {/* Miniature Visual Layout Indicator */}
                  <div
                    className={`w-4 h-5 rounded-xs shrink-0 flex flex-col justify-between p-0.5 ${
                      isSelected ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-300'
                    }`}
                  >
                    <div className="w-full h-1 rounded-2xs" style={{ backgroundColor: t.accent }} />
                    <div className="space-y-0.5">
                      <div className={`w-3/4 h-0.5 rounded-2xs ${isSelected ? 'bg-slate-400' : 'bg-slate-300'}`} />
                      <div className={`w-1/2 h-0.5 rounded-2xs ${isSelected ? 'bg-slate-500' : 'bg-slate-200'}`} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold leading-none">
                        {isPl ? t.labelPl : t.labelEn}
                      </span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      )}
                    </div>
                    <span className={`text-[9.5px] font-mono block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {isPl ? t.tagPl : t.tagEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Palette + Sample Loader + Gallery Button */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-end shrink-0 pt-1.5 xl:pt-0 border-t xl:border-0 border-slate-100">
          {/* Color Swatches */}
          {onChangeAccentColor && (
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200 shrink-0">
              <span className="text-[10px] font-bold uppercase text-slate-500 hidden sm:inline">
                {isPl ? 'Kolor:' : 'Color:'}
              </span>
              <div className="flex items-center gap-1">
                {paletteColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => onChangeAccentColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    aria-label={`Wybierz kolor akcentu: ${c.label} / Select accent color: ${c.label}`}
                    className={`w-4 h-4 rounded-full transition-transform focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      accentColor === c.hex ? 'scale-125 ring-2 ring-slate-900 ring-offset-1' : 'hover:scale-110'
                    }`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quick Industry Samples */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-500 shrink-0 hidden 2xl:inline">
              {isPl ? 'Przetestuj z wzorcem:' : 'Test with sample:'}
            </span>
            {quickSamples.map((s) => {
              const profile = PRESET_PROFILES.find((p) => p.id === s.id);
              if (!profile) return null;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelectPreset(profile.data);
                    onSelectTemplate(s.tpl);
                  }}
                  className="px-2.5 py-1 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 border border-indigo-200/80 rounded-md text-[11px] font-semibold transition shrink-0 flex items-center gap-1 shadow-2xs"
                  title={isPl ? `Wczytaj wzorzec: ${profile.namePl} (${s.labelPl})` : `Load sample: ${profile.nameEn}`}
                >
                  <Sparkles className="w-3 h-3 text-indigo-600" />
                  <span>{isPl ? s.labelPl : s.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Full Gallery Modal Trigger */}
          <button
            type="button"
            onClick={onOpenFullGallery}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs shrink-0 whitespace-nowrap ml-1 min-h-[34px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isPl ? 'Wszystkie Szablony' : 'All Templates'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
