import React from 'react';
import { TemplateId, LanguageCode } from '../types/cv';
import { Check, Layout, Sparkles } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateId;
  onSelect: (tpl: TemplateId) => void;
  language: LanguageCode;
}

export const TemplatePickerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedTemplate,
  onSelect,
  language
}) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';

  const templates: {
    id: TemplateId;
    namePl: string;
    nameEn: string;
    bestForPl: string;
    bestForEn: string;
    descPl: string;
    descEn: string;
    atsRating: string;
    layoutType: string;
  }[] = [
    {
      id: 'swiss-executive',
      namePl: 'Swiss Executive (Corporate Prestige)',
      nameEn: 'Swiss Executive (Corporate Prestige)',
      bestForPl: 'Dyrektorzy, Menedżerowie, Korporacje, Finanse, Logistyka Senior',
      bestForEn: 'C-Suite, Directors, Senior Managers, Corporate, Finance',
      descPl: 'Luksusowy boczny panel w granacie, okrągłe zdjęcie ze stemplem weryfikacji, matryca wskaźników CEFR i wyrazista oś kariery.',
      descEn: 'High-prestige dark executive sidebar with verified badge ring, CEFR dot-meter ratings, and crisp timeline.',
      atsRating: '97% ATS',
      layoutType: 'Panel Boczny'
    },
    {
      id: 'creative-tech',
      namePl: 'Creative Tech (Silicon & Developer)',
      nameEn: 'Creative Tech (Silicon & Developer)',
      bestForPl: 'Programiści, IT, Architekci, Inżynierowie, Product Managerowie',
      bestForEn: 'Software Engineers, Tech Leads, DevOps, Product Managers',
      descPl: 'Nowoczesny nagłówek z wstęgą akcentu, estetyczne karty projektów, etykiety technologii w stylu GitHub i czytelna struktura osiągnięć.',
      descEn: 'Contemporary card layout with dynamic gradient hero, GitHub-style stack tags, and rich portfolio project cards.',
      atsRating: '98% ATS',
      layoutType: 'Karty & Siatka'
    },
    {
      id: 'berlin-minimal',
      namePl: 'Neo-Berlin (Nowoczesny Kontrast)',
      nameEn: 'Neo-Berlin (Bold Modernist)',
      bestForPl: 'Design, Nowe Media, E-commerce, Marketing, Startupy technologiczne',
      bestForEn: 'Creative Agencies, Digital Product, Modern Startups',
      descPl: 'Mocna typografia, numerowane moduły, kontrastowe etykiety i czyste linie. Wyróżnia się spośród setki standardowych szablonów.',
      descEn: 'Sharp high-contrast editorial grid with numbered section badges, monospace accents, and brutalist elegance.',
      atsRating: '95% ATS',
      layoutType: 'Typograficzny'
    },
    {
      id: 'elegance-serif',
      namePl: 'Elegance Serif (Prawo, Medycyna, Consulting)',
      nameEn: 'Elegance Serif (Law, Med & Consulting)',
      bestForPl: 'Radcy prawni, Adwokaci, Lekarze, Doradcy podatkowi, Menedżerowie',
      bestForEn: 'Attorneys, Clinicians, Management Consultants, Private Banking',
      descPl: 'Szlachetny krój szeryfowy, wyważona kompozycja, ozdobne linie i kremowe tło. Buduje bezdyskusyjny autorytet i profesjonalizm.',
      descEn: 'Refined serif typography on warm ivory stock with subtle ornamental dividers, tailored for high-prestige professions.',
      atsRating: '96% ATS',
      layoutType: 'Klasyczny Szeryf'
    },
    {
      id: 'modern-polish',
      namePl: 'Modern Polish Pro (Executive)',
      nameEn: 'Modern Polish Pro (Executive)',
      bestForPl: 'Korporacje, Logistyka, Finanse, Administracja',
      bestForEn: 'Corporate, Supply Chain, Finance, Admin',
      descPl: 'Układ 2-kolumnowy z eleganckim nagłówkiem, uprawnieniami w panelu bocznym i wyrazistą osią czasu.',
      descEn: 'Two-column executive layout with credentials sidebar and crisp timeline experience.',
      atsRating: '95% ATS',
      layoutType: '2-Kolumny'
    },
    {
      id: 'clean-ats',
      namePl: 'Clean ATS Minimal (IT & Global)',
      nameEn: 'Clean ATS Minimal (IT & Global)',
      bestForPl: 'Programiści, DevOps, firmy z USA/UK, zdalne',
      bestForEn: 'Software Engineers, Cloud, US/UK remote roles',
      descPl: 'Liniowy układ jednokolumnowy bez zdjęć i zbędnych grafik, 100% czytelny dla robotów Workday i Taleo.',
      descEn: 'Single-column text-focused structure with no photo, 100% optimized for automated parsers.',
      atsRating: '99% ATS (Maksymalny)',
      layoutType: '1-Kolumna'
    },
    {
      id: 'euro-modern',
      namePl: 'Euro Modern (Alternatywa dla Europass)',
      nameEn: 'Euro Modern (Europass Re-imagined)',
      bestForPl: 'Aplikacje w UE, Szpitale, Transport, Instytucje',
      bestForEn: 'EU job applications, Healthcare, Logistics, SSC',
      descPl: 'Nowoczesna ewolucja Europass: kompaktowa, z tabelą CEFR języków i uprawnieniami, bez brzydkich marginesów.',
      descEn: 'Sleek evolution of Europass: keeps CEFR language scale and permits without the bloated 4-page waste.',
      atsRating: '96% ATS',
      layoutType: 'Asymetryczny'
    },
    {
      id: 'nordic-clean',
      namePl: 'Nordic Clean (Skandynawski Minimalizm)',
      nameEn: 'Nordic Clean (Scandinavian Minimal)',
      bestForPl: 'Marketing, Nowe Media, Studenci, Doradztwo',
      bestForEn: 'Marketing, Design, Graduates, Consulting',
      descPl: 'Szlachetny minimalizm z dużą ilością światła, wyciszoną paletą szarości i doskonałą typografią.',
      descEn: 'Elegant minimalist layout with generous whitespace, subtle hairline dividers, and muted tones.',
      atsRating: '94% ATS',
      layoutType: 'Przestrzenny'
    },
    {
      id: 'academic-elite',
      namePl: 'Academic Elite (Uczelnie & Medycyna)',
      nameEn: 'Academic Elite (Faculty & Clinical)',
      bestForPl: 'Lekarze, Pielęgniarki, Inżynierowie, Badacze, Wykładowcy',
      bestForEn: 'Physicians, Nurses, Researchers, Engineers, Faculty',
      descPl: 'Eksponuje wykształcenie, katedry uczelniane, publikacje naukowe, numery PWZ i licencje państwowe.',
      descEn: 'Prioritizes faculty appointments, clinical credentials, state licenses (PWZ/UDT), and research.',
      atsRating: '93% ATS',
      layoutType: 'Klasyczny'
    },
    {
      id: 'dynamic-impact',
      namePl: 'Dynamic Impact (Sprzedaż & Liderzy)',
      nameEn: 'Dynamic Impact (Sales & Leadership)',
      bestForPl: 'Dyrektorzy, Handlowcy, Key Account Managerowie',
      bestForEn: 'Sales Executives, Account Managers, Business Leaders',
      descPl: 'Wyróżniająca wstęga akcentowa, mocne wyeksponowanie zrealizowanych targetów i wskaźników KPI.',
      descEn: 'Bold accent branding with high-contrast metric callouts for revenue and quota achievements.',
      atsRating: '92% ATS',
      layoutType: 'Wyrazisty'
    }
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Wybierz Styl i Szablon Twojego CV' : 'Choose Your CV Template Style'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-5 sm:p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-slate-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isPl ? 'Wybierz Styl i Szablon Twojego CV' : 'Choose Your CV Template Style'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-1 text-slate-400 hover:text-slate-600 font-bold rounded"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-500 my-3">
          {isPl
            ? 'Wszystkie szablony są w 100% zgodne z polskim prawem (RODO), zoptymalizowane pod druk A4 i czytane przez skanery rekrutacyjne.'
            : 'All templates feature Polish GDPR compliance, A4 print optimization, and high ATS readability.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {templates.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelect(tpl.id);
                  onClose();
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between group ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/80 shadow-md ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {tpl.layoutType}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      {tpl.atsRating}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-900 leading-snug">
                    {isPl ? tpl.namePl : tpl.nameEn}
                  </h3>

                  <div className="text-[11px] font-semibold text-slate-600 mt-1 mb-1.5">
                    <span className="text-slate-400">{isPl ? 'Dla: ' : 'Best for: '}</span>
                    {isPl ? tpl.bestForPl : tpl.bestForEn}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {isPl ? tpl.descPl : tpl.descEn}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-slate-900 font-bold' : 'text-slate-500 group-hover:text-slate-800'}>
                    {isSelected ? (isPl ? '✓ Wybrany' : '✓ Active') : (isPl ? 'Wybierz szablon' : 'Select')}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-slate-900" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            {isPl ? 'Zamknij' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
