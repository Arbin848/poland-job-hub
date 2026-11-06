import React, { useState } from 'react';
import { TemplateId, LanguageCode, CVData, FacultyCategory } from '../types/cv';
import { PRESET_PROFILES, DEFAULT_CV } from '../data/presets';
import { InteractiveGallery } from './InteractiveGallery';
import {
  Layout,
  Sparkles,
  Check,
  CheckCircle2,
  Briefcase,
  Truck,
  Code,
  Stethoscope,
  Wrench,
  Coins,
  GraduationCap,
  Utensils,
  ArrowRight,
  ShieldCheck,
  Search,
  Eye,
  Zap
} from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateId;
  onSelectTemplate: (tpl: TemplateId) => void;
  onLoadPreset: (presetData: Partial<CVData>) => void;
  language: LanguageCode;
  cv?: CVData;
}

export const TemplateGalleryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedTemplate,
  onSelectTemplate,
  onLoadPreset,
  language,
  cv
}) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'samples'>('templates');
  const [filter, setFilter] = useState<string>('all');
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';

  const templatesList: {
    id: TemplateId;
    namePl: string;
    nameEn: string;
    tagPl: string;
    tagEn: string;
    category: 'executive' | 'tech' | 'classic' | 'ats' | 'creative';
    bestForPl: string;
    bestForEn: string;
    descPl: string;
    descEn: string;
    atsRating: string;
    layoutType: string;
    accent: string;
    previewType: 'swiss' | 'tech-hero' | '2-col-sidebar' | '1-col-linear' | 'berlin' | 'serif-luxury' | 'euro-grid' | 'nordic' | 'academic' | 'dynamic-banner';
  }[] = [
    {
      id: 'swiss-executive',
      namePl: 'Swiss Executive (Corporate Prestige)',
      nameEn: 'Swiss Executive (Corporate Prestige)',
      tagPl: 'Najwyższa Klasa Biznesowa',
      tagEn: 'Executive Level Prestige',
      category: 'executive',
      bestForPl: 'Dyrektorzy, Menedżerowie, Korporacje, Finanse, Logistyka Senior',
      bestForEn: 'C-Suite, Directors, Senior Managers, Corporate, Finance',
      descPl: 'Luksusowy boczny panel w granacie/antracycie, okrągłe zdjęcie ze stemplem weryfikacji, wskaźniki CEFR i wyrazista oś kariery.',
      descEn: 'High-prestige dark executive sidebar with verified badge ring, CEFR dot-meter ratings, and crisp timeline.',
      atsRating: '97% ATS',
      layoutType: 'Panel Boczny',
      accent: '#0f172a',
      previewType: 'swiss'
    },
    {
      id: 'creative-tech',
      namePl: 'Creative Tech (Silicon & Developer)',
      nameEn: 'Creative Tech (Silicon & Developer)',
      tagPl: 'Dla Nowoczesnych Technologii & IT',
      tagEn: 'Modern Tech & Startups',
      category: 'tech',
      bestForPl: 'Programiści, IT, Architekci, DevOps, Product Managerowie',
      bestForEn: 'Software Engineers, Tech Leads, DevOps, Product Managers',
      descPl: 'Nowoczesny nagłówek z wstęgą akcentu, estetyczne karty projektów, etykiety technologii w stylu GitHub i czytelna struktura osiągnięć.',
      descEn: 'Contemporary card layout with dynamic gradient hero, GitHub-style stack tags, and rich portfolio project cards.',
      atsRating: '98% ATS',
      layoutType: 'Karty & Siatka',
      accent: '#4f46e5',
      previewType: 'tech-hero'
    },
    {
      id: 'modern-polish',
      namePl: 'Modern Polish Pro (Executive Agencja)',
      nameEn: 'Modern Polish Pro (Executive)',
      tagPl: 'Standard Polskich Agencji',
      tagEn: 'Most Popular in Poland',
      category: 'classic',
      bestForPl: 'Korporacje, Logistyka, Finanse, Administracja, Produkcja, B2B',
      bestForEn: 'Corporate, Supply Chain, Finance, Admin, Operations',
      descPl: 'Elegancki układ 2-kolumnowy z panelem bocznym na certyfikaty UDT/SEP, języki CEFR i klauzulę RODO. Rekomendacja agencji pracy.',
      descEn: 'Two-column executive layout with credentials sidebar and crisp timeline. Recommended by Polish recruitment agencies.',
      atsRating: '96% ATS',
      layoutType: '2 Kolumny',
      accent: '#1e3a8a',
      previewType: '2-col-sidebar'
    },
    {
      id: 'clean-ats',
      namePl: 'Clean ATS Minimal (IT & Global)',
      nameEn: 'Clean ATS Minimal (IT & Global)',
      tagPl: '100% Parsowania ATS',
      tagEn: '100% ATS Readable',
      category: 'ats',
      bestForPl: 'Programiści, Inżynierowie, korporacje USA/UK, roboty Workday & Taleo',
      bestForEn: 'Software Engineers, DevOps, US/UK remote roles',
      descPl: 'Liniowy układ jednokolumnowy bez zdjęć i zbędnych grafik. Gwarantuje idealne odczytanie przez roboty Workday, Taleo i SAP SuccessFactors.',
      descEn: 'Single-column text-focused structure with no photo, 100% optimized for automated ATS parsers.',
      atsRating: '99% ATS (Maksymalny)',
      layoutType: '1 Kolumna',
      accent: '#0f766e',
      previewType: '1-col-linear'
    },
    {
      id: 'elegance-serif',
      namePl: 'Elegance Serif (Prawo, Medycyna, Consulting)',
      nameEn: 'Elegance Serif (Law, Med & Consulting)',
      tagPl: 'Klasyczna Elegancja',
      tagEn: 'Timeless Luxury Editorial',
      category: 'classic',
      bestForPl: 'Radcy prawni, Adwokaci, Lekarze, Doradcy podatkowi, Menedżerowie',
      bestForEn: 'Attorneys, Clinicians, Management Consultants, Private Banking',
      descPl: 'Szlachetny krój szeryfowy, wyważona kompozycja, subtelne linie i kremowe tło. Buduje bezdyskusyjny autorytet i prestiż.',
      descEn: 'Refined serif typography on warm ivory stock with subtle ornamental dividers, tailored for high-prestige professions.',
      atsRating: '96% ATS',
      layoutType: 'Klasyczny Szeryf',
      accent: '#78350f',
      previewType: 'serif-luxury'
    },
    {
      id: 'berlin-minimal',
      namePl: 'Neo-Berlin (Nowoczesny Kontrast)',
      nameEn: 'Neo-Berlin (Bold Modernist)',
      tagPl: 'Wyróżniająca Typografia',
      tagEn: 'High Impact Modernist',
      category: 'creative',
      bestForPl: 'Design, Nowe Media, E-commerce, Marketing, Startupy technologiczne',
      bestForEn: 'Creative Agencies, Digital Product, Modern Startups',
      descPl: 'Mocna typografia, numerowane moduły, kontrastowe etykiety i czyste linie. Wyróżnia się spośród setki standardowych szablonów.',
      descEn: 'Sharp high-contrast editorial grid with numbered section badges, monospace accents, and brutalist elegance.',
      atsRating: '95% ATS',
      layoutType: 'Typograficzny',
      accent: '#18181b',
      previewType: 'berlin'
    },
    {
      id: 'euro-modern',
      namePl: 'Euro Modern (Europass Alternative)',
      nameEn: 'Euro Modern (Europass Re-imagined)',
      tagPl: 'Dla Rynku Unii Europejskiej',
      tagEn: 'For European Union Jobs',
      category: 'classic',
      bestForPl: 'Praca w UE (Niemcy, Holandia, Skandynawia), Transport, Szpitale',
      bestForEn: 'EU job applications, Healthcare, Logistics, SSC',
      descPl: 'Nowoczesna alternatywa dla przestarzałego Europassu. Posiada matrycę języków CEFR, status wizowy UE i uprawnienia transportowe.',
      descEn: 'Sleek evolution of Europass: keeps CEFR language scale and permits without the bloated 4-page waste.',
      atsRating: '96% ATS',
      layoutType: 'Asymetryczny',
      accent: '#0369a1',
      previewType: 'euro-grid'
    },
    {
      id: 'nordic-clean',
      namePl: 'Nordic Clean (Skandynawski Minimal)',
      nameEn: 'Nordic Clean (Scandinavian Minimal)',
      tagPl: 'Szlachetny Minimalizm',
      tagEn: 'Quiet Luxury Minimal',
      category: 'creative',
      bestForPl: 'Marketing, E-commerce, Nowe Media, Studenci, Doradztwo',
      bestForEn: 'Marketing, Design, Graduates, Consulting',
      descPl: 'Szlachetny minimalizm z dużą ilością światła, wyciszoną paletą barw i doskonałą typografią. Wyróżnia się estetyką i klasą.',
      descEn: 'Elegant minimalist layout with generous whitespace, subtle hairline dividers, and muted tones.',
      atsRating: '94% ATS',
      layoutType: 'Przestrzenny',
      accent: '#475569',
      previewType: 'nordic'
    },
    {
      id: 'academic-elite',
      namePl: 'Academic Elite (Uczelnie & Medycyna)',
      nameEn: 'Academic Elite (Faculty & Clinical)',
      tagPl: 'Dla Absolwentów & Ekspertów',
      tagEn: 'For Clinicians & Researchers',
      category: 'classic',
      bestForPl: 'Lekarze, Pielęgniarki, Inżynierowie, Badacze, Wykładowcy',
      bestForEn: 'Physicians, Nurses, Researchers, Engineers, Faculty',
      descPl: 'Eksponuje wykształcenie, katedry uczelniane, publikacje naukowe, numery PWZ i uprawnienia państwowe. Buduje autorytet eksperta.',
      descEn: 'Prioritizes faculty appointments, clinical credentials, state licenses (PWZ/UDT), and research.',
      atsRating: '94% ATS',
      layoutType: 'Klasyczny',
      accent: '#1e3a8a',
      previewType: 'academic'
    },
    {
      id: 'dynamic-impact',
      namePl: 'Dynamic Impact (Sprzedaż & Liderzy)',
      nameEn: 'Dynamic Impact (Sales & Leadership)',
      tagPl: 'Zorientowany na Wyniki',
      tagEn: 'Results & Metrics Driven',
      category: 'executive',
      bestForPl: 'Dyrektorzy, Handlowcy, Key Account Managerowie, B2B',
      bestForEn: 'Sales Executives, Account Managers, Business Leaders',
      descPl: 'Wyróżniająca wstęga akcentowa, mocne wyeksponowanie zrealizowanych projektów, osiągnięć sprzedażowych i wzrostu przychodów.',
      descEn: 'Bold accent branding with high-contrast callouts for revenue and quota achievements.',
      atsRating: '92% ATS',
      layoutType: 'Wyrazisty',
      accent: '#b91c1c',
      previewType: 'dynamic-banner'
    }
  ];

  const filteredTemplates = templatesList.filter((t) => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  const getProfileIcon = (id: FacultyCategory) => {
    switch (id) {
      case 'logistics': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'it-software': return <Code className="w-5 h-5 text-teal-600" />;
      case 'healthcare': return <Stethoscope className="w-5 h-5 text-sky-600" />;
      case 'engineering': return <Wrench className="w-5 h-5 text-indigo-600" />;
      case 'finance': return <Coins className="w-5 h-5 text-amber-600" />;
      case 'sales': return <Briefcase className="w-5 h-5 text-rose-600" />;
      case 'student-academic': return <GraduationCap className="w-5 h-5 text-slate-700" />;
      case 'hospitality': return <Utensils className="w-5 h-5 text-orange-600" />;
      default: return <Briefcase className="w-5 h-5 text-slate-600" />;
    }
  };

  const getRecommendedTemplateForProfile = (id: FacultyCategory): TemplateId => {
    switch (id) {
      case 'it-software': return 'creative-tech';
      case 'logistics': return 'modern-polish';
      case 'healthcare': return 'swiss-executive';
      case 'finance': return 'elegance-serif';
      case 'sales': return 'dynamic-impact';
      case 'engineering': return 'euro-modern';
      case 'student-academic': return 'academic-elite';
      case 'hospitality': return 'nordic-clean';
      default: return 'modern-polish';
    }
  };

  // High-Fidelity Miniature Visual Representation of Templates
  const renderVisualCard = (type: string, accentColor: string) => {
    switch (type) {
      case 'swiss':
        return (
          <div className="w-full h-40 bg-white border border-slate-200 rounded-lg flex overflow-hidden shadow-xs">
            <div className="w-[36%] p-2 text-white flex flex-col justify-between" style={{ backgroundColor: accentColor || '#0f172a' }}>
              <div className="space-y-1.5 text-center">
                <div className="w-8 h-8 rounded-full bg-white/20 mx-auto border-2 border-white/60 flex items-center justify-center text-[8px] font-bold">
                  MK
                </div>
                <div className="w-12 h-1.5 bg-white mx-auto rounded-xs font-bold" />
                <div className="w-9 h-1 bg-white/60 mx-auto rounded-xs" />
                <div className="w-full h-px bg-white/20 mt-1" />
                <div className="space-y-1 text-left pt-0.5">
                  <div className="w-full h-1 bg-white/50 rounded-xs" />
                  <div className="w-4/5 h-1 bg-white/40 rounded-xs" />
                  <div className="w-3/5 h-1 bg-white/40 rounded-xs" />
                </div>
              </div>
              <div className="flex gap-0.5 justify-center pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>
            <div className="flex-1 p-2.5 flex flex-col justify-between bg-white">
              <div className="space-y-1">
                <div className="w-16 h-1.5 rounded-xs bg-slate-800" />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-4/5 h-1 bg-slate-100 rounded-xs" />
              </div>
              <div className="space-y-1 border-t border-slate-100 pt-1.5">
                <div className="w-14 h-1.5 rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-5/6 h-1 bg-slate-100 rounded-xs" />
              </div>
              <div className="w-24 h-0.5 bg-slate-200 rounded-xs" />
            </div>
          </div>
        );

      case 'tech-hero':
        return (
          <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-lg p-2 flex flex-col justify-between shadow-xs">
            <div className="bg-white p-2 rounded-md border border-slate-200 shadow-2xs space-y-1 relative overflow-hidden">
              <div className="w-full h-1 rounded-t" style={{ backgroundColor: accentColor || '#4f46e5' }} />
              <div className="flex justify-between items-center pt-0.5">
                <div>
                  <div className="w-20 h-2 rounded-xs font-bold" style={{ backgroundColor: accentColor || '#4f46e5' }} />
                  <div className="w-12 h-1 bg-slate-400 rounded-xs mt-0.5" />
                </div>
                <div className="w-5 h-5 rounded-md bg-indigo-50 border border-indigo-200 flex items-center justify-center text-[8px] font-bold text-indigo-700">
                  DEV
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 flex-1 py-1.5">
              <div className="bg-white p-1.5 rounded border border-slate-200 space-y-1">
                <div className="w-10 h-1 bg-slate-800 rounded-xs" />
                <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
                <div className="w-3/4 h-0.5 bg-slate-100 rounded-xs" />
              </div>
              <div className="bg-white p-1.5 rounded border border-slate-200 space-y-1">
                <div className="w-10 h-1 bg-slate-800 rounded-xs" />
                <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
                <div className="w-2/3 h-0.5 bg-slate-100 rounded-xs" />
              </div>
            </div>
            <div className="w-28 h-0.5 bg-slate-300 mx-auto rounded-xs" />
          </div>
        );

      case 'serif-luxury':
        return (
          <div className="w-full h-40 bg-[#faf9f6] border border-amber-900/30 rounded-lg p-2.5 flex flex-col justify-between shadow-xs border-t-4" style={{ borderTopColor: accentColor || '#78350f' }}>
            <div className="text-center pb-1.5 border-b border-stone-200 space-y-0.5">
              <div className="w-24 h-2 mx-auto rounded-xs" style={{ backgroundColor: accentColor || '#78350f' }} />
              <div className="w-14 h-1 bg-stone-400 mx-auto rounded-xs" />
              <div className="flex items-center justify-center gap-1 w-16 mx-auto pt-0.5">
                <span className="h-px bg-stone-300 flex-1" />
                <span className="w-1 h-1 rotate-45 bg-amber-800" />
                <span className="h-px bg-stone-300 flex-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 flex-1 pt-1.5">
              <div className="space-y-1">
                <div className="w-10 h-1 bg-stone-800 rounded-xs" />
                <div className="w-full h-0.5 bg-stone-300 rounded-xs" />
                <div className="w-4/5 h-0.5 bg-stone-200 rounded-xs" />
              </div>
              <div className="space-y-1">
                <div className="w-10 h-1 bg-stone-800 rounded-xs" />
                <div className="w-full h-0.5 bg-stone-300 rounded-xs" />
                <div className="w-3/4 h-0.5 bg-stone-200 rounded-xs" />
              </div>
            </div>
            <div className="w-28 h-0.5 bg-stone-300 mx-auto rounded-xs" />
          </div>
        );

      case 'berlin':
        return (
          <div className="w-full h-40 bg-white border-2 border-slate-900 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
            <div className="border-b-2 border-slate-900 pb-1 flex justify-between items-end">
              <div>
                <div className="w-8 h-0.5 bg-slate-400 mb-0.5 font-mono" />
                <div className="w-24 h-2.5 font-black bg-slate-950 rounded-xs" />
              </div>
              <div className="w-5 h-5 bg-slate-950 rounded-xs" />
            </div>
            <div className="flex-1 py-1.5 space-y-1.5">
              <div className="flex gap-1.5 items-center">
                <span className="w-4 h-1 bg-slate-300 rounded-2xs" />
                <div className="w-full h-1 bg-slate-900 rounded-xs" />
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="w-4 h-1 bg-slate-300 rounded-2xs" />
                <div className="w-3/4 h-1 bg-slate-500 rounded-xs" />
              </div>
              <div className="flex gap-1.5 items-center">
                <span className="w-4 h-1 bg-slate-300 rounded-2xs" />
                <div className="w-5/6 h-1 bg-slate-500 rounded-xs" />
              </div>
            </div>
            <div className="border-t border-slate-200 pt-0.5 font-mono">
              <div className="w-24 h-0.5 bg-slate-400 rounded-xs" />
            </div>
          </div>
        );

      case '2-col-sidebar':
        return (
          <div className="w-full h-40 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
            <div className="border-b border-slate-200 pb-1.5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="w-24 h-2.5 rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-16 h-1 bg-slate-500 rounded-xs" />
              </div>
              <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-300" />
            </div>
            <div className="grid grid-cols-12 gap-2 flex-1 pt-1.5">
              <div className="col-span-8 space-y-1.5">
                <div className="w-14 h-1 bg-slate-400 rounded-xs" />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-4/5 h-1 bg-slate-100 rounded-xs" />
                <div className="w-12 h-1 bg-slate-400 rounded-xs pt-0.5" />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
              </div>
              <div className="col-span-4 bg-slate-50 p-1.5 rounded space-y-1 border border-slate-200">
                <div className="w-10 h-1 rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-full h-0.5 bg-slate-300 rounded-xs" />
                <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
                <div className="w-8 h-1 bg-slate-400 rounded-xs pt-0.5" />
                <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
              </div>
            </div>
            <div className="w-28 h-0.5 bg-slate-200 mx-auto rounded-xs" />
          </div>
        );

      case '1-col-linear':
        return (
          <div className="w-full h-40 bg-white border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs border-t-2" style={{ borderTopColor: accentColor }}>
            <div className="text-center pb-1.5 border-b border-slate-200 space-y-1">
              <div className="w-28 h-2.5 mx-auto rounded-xs" style={{ backgroundColor: accentColor }} />
              <div className="w-16 h-1 bg-slate-400 mx-auto rounded-xs" />
              <div className="w-32 h-0.5 bg-slate-200 mx-auto rounded-xs" />
            </div>
            <div className="flex-1 py-1.5 space-y-2">
              <div className="space-y-0.5">
                <div className="w-16 h-1 font-bold rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-4/5 h-1 bg-slate-100 rounded-xs" />
              </div>
              <div className="space-y-0.5">
                <div className="w-16 h-1 font-bold rounded-xs" style={{ backgroundColor: accentColor }} />
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-3/4 h-1 bg-slate-100 rounded-xs" />
              </div>
            </div>
            <div className="w-28 h-0.5 bg-slate-300 mx-auto rounded-xs" />
          </div>
        );

      case 'euro-grid':
        return (
          <div className="w-full h-40 bg-white border border-slate-200 rounded-lg flex overflow-hidden shadow-xs">
            <div className="w-2 h-full shrink-0" style={{ backgroundColor: accentColor }} />
            <div className="flex-1 p-2.5 flex flex-col justify-between">
              <div className="border-b border-slate-200 pb-1 flex justify-between items-center">
                <div>
                  <div className="w-24 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
                  <div className="w-14 h-1 bg-slate-400 rounded-xs mt-0.5" />
                </div>
                <div className="w-6 h-4 bg-blue-700 text-amber-300 text-[8px] font-mono text-center flex items-center justify-center font-bold rounded-2xs">
                  EU
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 pt-1.5">
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-slate-400 rounded-xs" />
                  <div className="w-full h-1 bg-slate-200 rounded-xs" />
                  <div className="w-3/4 h-1 bg-slate-100 rounded-xs" />
                </div>
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-slate-400 rounded-xs" />
                  <div className="w-full h-1 bg-slate-200 rounded-xs" />
                  <div className="w-2/3 h-1 bg-slate-100 rounded-xs" />
                </div>
              </div>
              <div className="w-full h-0.5 bg-slate-200 rounded-xs" />
            </div>
          </div>
        );

      case 'dynamic-banner':
        return (
          <div className="w-full h-40 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between shadow-xs">
            <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
            <div className="p-2.5 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start border-b border-slate-200 pb-1">
                <div>
                  <div className="w-24 h-2.5 bg-slate-950 font-black rounded-xs" />
                  <div className="w-14 h-1 bg-slate-500 rounded-xs mt-1" />
                </div>
                <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-300" />
              </div>
              <div className="space-y-1.5 py-1">
                <div className="w-full h-1 bg-slate-200 rounded-xs" />
                <div className="w-4/5 h-1 bg-slate-100 rounded-xs" />
              </div>
              <div className="w-28 h-0.5 bg-slate-300 mx-auto rounded-xs" />
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-40 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex flex-col justify-between">
            <div className="w-24 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
            <div className="space-y-1 flex-1 pt-2">
              <div className="w-full h-1 bg-slate-200 rounded-xs" />
              <div className="w-4/5 h-1 bg-slate-200 rounded-xs" />
              <div className="w-2/3 h-1 bg-slate-200 rounded-xs" />
            </div>
            <div className="w-full h-0.5 bg-slate-300 rounded-xs" />
          </div>
        );
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Galeria Szablonów & Przykładowych CV' : 'CV Template Gallery & Industry Samples'}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8F9FF] rounded-2xl shadow-2xl max-w-6xl w-full border border-[#E5E8F3] overflow-hidden my-auto max-h-[94vh] flex flex-col"
      >
        {/* Gallery Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#E5E8F3] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6250F4]/10 border border-[#6250F4]/20 flex items-center justify-center text-[#6250F4] shrink-0">
              <Sparkles className="w-5 h-5 text-[#6250F4]" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#18233F] flex items-center gap-2">
                <span>{isPl ? 'Galeria Szablonów & Przykładowych CV' : 'CV Template Gallery & Industry Samples'}</span>
                <span className="text-[10px] font-mono font-bold bg-[#6250F4]/10 text-[#6250F4] px-2 py-0.5 rounded-full">
                  Poland & EU Standard
                </span>
              </h2>
              <p className="text-xs text-[#75819C] mt-0.5 font-medium">
                {isPl
                  ? 'Wybierz profesjonalny styl wizualny zaakceptowany przez rekruterów lub wczytaj gotowe przykładowe CV ze sprawdzonymi obowiązkami.'
                  : 'Select an executive visual template or load a pre-written gold-standard resume for your profession.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Switcher: Templates vs Industry Samples */}
        <div className="p-3 bg-[#F8F9FF] border-b border-[#E5E8F3] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center border border-[#E5E8F3] rounded-xl p-1 bg-white text-xs font-bold shadow-xs">
            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-[#6250F4] text-white shadow-xs'
                  : 'text-[#75819C] hover:text-[#18233F]'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>{isPl ? '1. Szablony Wizualne (10 Stylów)' : '1. Visual Templates (10 Styles)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('samples')}
              className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'samples'
                  ? 'bg-[#6250F4] text-white shadow-xs'
                  : 'text-[#75819C] hover:text-[#18233F]'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{isPl ? '2. Gotowe Przykłady Branżowe (8 Wzorców)' : '2. Ready Industry Samples (8 Fields)'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Visual Templates Gallery */}
        {activeTab === 'templates' && (
          <div className="overflow-y-auto flex-1 bg-[#F8F9FF]">
            <InteractiveGallery
              selectedTemplate={selectedTemplate}
              onSelectTemplate={onSelectTemplate}
              cv={cv || DEFAULT_CV}
              language={language}
              onContinueToEditor={onClose}
              isModalView={true}
            />
          </div>
        )}

        {/* Tab 2: Ready Industry Master Presets */}
        {activeTab === 'samples' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-3.5 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-950">
                <span className="font-bold block text-sm mb-0.5">
                  {isPl ? 'Wzorce CV stworzone według kryteriów rekruterów w Polsce' : 'Recruiter Gold-Standard Sample CVs'}
                </span>
                {isPl
                  ? 'Każdy profil zawiera realne, profesjonalnie zredagowane obowiązki, wskaźniki KPI, uprawnienia branżowe (UDT, SEP, CEFR, PWZ) oraz klauzulę RODO. Kliknij "Wczytaj i Zobacz", aby zobaczyć pełne, piękne CV ze swoimi lub przykładowymi danymi.'
                  : 'Every profile includes authentic bullet points, quantifiable metrics, certifications, and GDPR compliance ready for European employers.'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRESET_PROFILES.map((profile) => {
                const recTemplate = getRecommendedTemplateForProfile(profile.id);
                return (
                  <div
                    key={profile.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
                            {getProfileIcon(profile.id)}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-slate-900">
                              {isPl ? profile.namePl : profile.nameEn}
                            </h3>
                            <span className="text-[11px] font-mono text-slate-500">
                              {profile.data.personalInfo?.jobTitle}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0">
                          {isPl ? 'Gotowy Wzorzec' : 'Full Sample'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {isPl ? profile.descriptionPl : profile.descriptionEn}
                      </p>

                      {/* Candidate info highlight */}
                      <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200 text-xs space-y-1 font-mono text-[11px] text-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Kandydat:</span>
                          <span className="font-bold text-slate-900">{profile.data.personalInfo?.fullName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Doświadczenie:</span>
                          <span>{profile.data.experiences?.length} role ({profile.data.experiences?.[0]?.company})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Certyfikaty:</span>
                          <span>{profile.data.certifications?.map((c) => c.name).join(', ') || 'UDT / CEFR C1'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTemplate(recTemplate);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                      >
                        {isPl ? 'Tylko zastosuj styl szablonu' : 'Only apply style'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onLoadPreset(profile.data);
                          onSelectTemplate(recTemplate);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-xs transition flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{isPl ? 'Wczytaj i Zobacz Piękne CV' : 'Load Sample CV'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-white border-t border-[#E5E8F3] flex items-center justify-between text-xs text-[#75819C] shrink-0">
          <div className="flex items-center gap-1.5 text-[#18233F] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{isPl ? 'Wszystkie szablony są w 100% zoptymalizowane pod druk A4 i systemy ATS' : '100% A4 Print & ATS compliant'}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#6250F4] hover:bg-[#5240e3] text-white font-bold rounded-xl transition shadow-sm cursor-pointer"
          >
            {isPl ? 'Gotowe / Zamknij' : 'Done / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
