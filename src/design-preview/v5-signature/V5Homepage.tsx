import React, { useState } from 'react';
import { CVData, LanguageCode, TemplateId } from '../../types/cv';
import { V5HeroDocument } from './components/V5HeroDocument';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  Compass,
  Layers,
  Zap,
  RotateCcw,
  Eye,
  Award,
  Download
} from 'lucide-react';

interface Props {
  cv: CVData;
  language: LanguageCode;
  onStartEditing: () => void;
  onExploreTemplates: () => void;
  onResumeEditing: () => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  reducedMotion: boolean;
}

export const V5Homepage: React.FC<Props> = ({
  cv,
  language,
  onStartEditing,
  onExploreTemplates,
  onResumeEditing,
  onSelectTemplate,
  reducedMotion
}) => {
  const isPl = language === 'pl';
  const [selectedHeroTemplate, setSelectedHeroTemplate] = useState<TemplateId>('modern-polish');

  const heroCv = {
    ...cv,
    templateId: selectedHeroTemplate
  };

  const showcaseTemplates: { id: TemplateId; name: string; tag: string; bestFor: string }[] = [
    { id: 'modern-polish', name: 'Modern Polish Pro', tag: 'Standard RP', bestFor: 'Logistyka, Produkcja, B2B' },
    { id: 'swiss-executive', name: 'Swiss Executive', tag: 'Executive', bestFor: 'Dyrektorzy, Zarządzanie, Finanse' },
    { id: 'clean-ats', name: 'Clean ATS Minimal', tag: 'Struktura ATS', bestFor: 'Korporacje, IT, Audyt Big 4' },
    { id: 'creative-tech', name: 'Creative Tech', tag: 'IT & Dev', bestFor: 'Software Engineers, DevOps, Tech' }
  ];

  return (
    <div className="bg-[#F8F9FF] text-[#18233F] overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-slate-200/80">
        {/* Soft atmospheric gradient background */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] pointer-events-none opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle at 50% 20%, rgba(98, 80, 244, 0.22) 0%, rgba(164, 71, 244, 0.12) 40%, rgba(248, 249, 255, 0) 75%)'
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Editorial Value Proposition & Actions */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-5 text-center lg:text-left">
              
              {/* Quiet Pre-Header Kicker (Zero-Pill Discipline) */}
              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider sm:tracking-widest">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-indigo-600 animate-ping shrink-0" />
                <span className="text-indigo-900 font-bold">{isPl ? 'Nowy Standard Dokumentów A4' : 'A4 Career Document Standard'}</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <span className="hidden sm:inline">Standard Rynku Pracy 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#18233F] tracking-tight leading-[1.10] sm:leading-[1.08]">
                {isPl ? (
                  <>
                    Twórz dokumenty kariery, które <span className="bg-gradient-to-r from-[#6250F4] to-[#A447F4] bg-clip-text text-transparent">otwierają drzwi.</span>
                  </>
                ) : (
                  <>
                    Career documents engineered to <span className="bg-gradient-to-r from-[#6250F4] to-[#A447F4] bg-clip-text text-transparent">open doors.</span>
                  </>
                )}
              </h1>

              {/* Subtitle: concise on mobile, balanced on desktop */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {isPl ? (
                  <>
                    <span className="hidden sm:inline">
                      Zaprojektowany z myślą o rynku polskim i europejskim. Precyzyjna typografia, wsparcie klauzul zgody na rekrutację i natychmiastowy eksport do wektorowego PDF w standardzie drukarskim.
                    </span>
                    <span className="sm:hidden">
                      Profesjonalne CV dopasowane do polskich standardów rekrutacyjnych, wymogów RODO i czystego formatu A4.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      Tailored for Polish and European hiring. Swiss precision typography, recruitment consent support, and instant vector print PDF export.
                    </span>
                    <span className="sm:hidden">
                      Professional CV builder tailored for Polish hiring standards, GDPR consent, and clean A4 print.
                    </span>
                  </>
                )}
              </p>

              {/* Primary & Secondary Call to Actions */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-3.5">
                <button
                  type="button"
                  onClick={onStartEditing}
                  className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>{isPl ? 'Stwórz Moje CV' : 'Create My CV'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onExploreTemplates}
                  className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-slate-500" />
                  <span>{isPl ? 'Przeglądaj 10 Szablonów' : 'Explore 10 Templates'}</span>
                </button>
              </div>

              {/* Resume Work / Quick Metadata */}
              <div className="pt-1.5 sm:pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={onResumeEditing}
                  className="text-indigo-600 hover:text-indigo-800 font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isPl ? 'Wznów zapisany profil kandydata' : 'Resume saved profile'}</span>
                </button>
                <span aria-hidden="true">·</span>
                <span>{isPl ? 'Bez rejestracji' : 'No account required'}</span>
                <span aria-hidden="true">·</span>
                <span>{isPl ? 'Prywatność po stronie przeglądarki' : 'Client-Side Privacy'}</span>
              </div>

              {/* Template Quick Switcher Tabs */}
              <div className="pt-4 border-t border-slate-200/80">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  {isPl ? 'Podgląd w czasie rzeczywistym:' : 'Real-Time Canvas Switcher:'}
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
                  {showcaseTemplates.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedHeroTemplate(t.id);
                        onSelectTemplate(t.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                        selectedHeroTemplate === t.id
                          ? 'bg-indigo-600 text-white shadow-xs font-bold'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{t.name}</span>
                      <span className="text-[10px] opacity-75 font-mono">({t.tag})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Floating 3D A4 Live Document Canvas */}
            <div className="lg:col-span-6 flex justify-center">
              <V5HeroDocument
                cv={heroCv}
                reducedMotion={reducedMotion}
                onOpenPreview={onStartEditing}
                interactive={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= EDITORIAL PILLARS SECTION (Zero-Slop, High Honesty) ================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-[#18233F] tracking-tight">
              {isPl ? 'Dlaczego rekruterzy wybierają dokumenty PolJobHub?' : 'Why Recruiters Prefer PolJobHub Documents'}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {isPl
                ? 'Opracowany w odpowiedzi na typowe trudności kandydatów: błędy parsowania w systemach ATS oraz nieprawidłowe formuły klauzul rekrutacyjnych.'
                : 'Engineered to address common candidate hurdles: formatting parse errors in ATS software and improper recruitment consent wording.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                {isPl ? 'Klauzule zgody i podstawy prawne rekrutacji' : 'Recruitment Consent & Legal Privacy Basis'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isPl
                  ? 'Wsparcie klauzuli zgody dla przyszłych procesów rekrutacyjnych oraz przejrzyste omówienie podstaw prawnych (art. 22¹ Kodeksu Pracy). Oświadczenie o statusie zezwolenia na pracę pozostaje deklaracją kandydata do odrębnej weryfikacji przez pracodawcę.'
                  : 'Support for future recruitment consent clauses alongside standard Labor Code (art. 22¹) data processing. Work authorization status is presented as candidate self-declaration subject to employer verification.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                {isPl ? 'Etyczny Asystent STAR bez Halucynacji' : 'Honest STAR Assistant'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isPl
                  ? 'Nasz asystent nie zmyśla fikcyjnych stanowisk ani fałszywych wskaźników procentowych. Pomaga ubrać Twoje realne osiągnięcia w mocne czasowniki sprawcze.'
                  : 'Zero hallucinations. We help you structure your genuine career wins into the recruiter-backed Situation-Task-Action-Result format.'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">
                {isPl ? 'Czysty Podział Stron A4 i Druk Wektorowy' : 'Clean Multipage A4 & Vector Print'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isPl
                  ? 'Format A4 (210 × 297 mm) z czystą paginacją wielostronicową bez ucinania nagłówków czy tekstu. Wygenerowany wektorowy plik PDF zachowuje krystaliczną ostrość.'
                  : 'Standard A4 (210 × 297 mm) layout with clean multipage pagination without cutting through text or headings. Exported vector PDF preserves crisp typography.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TEN TEMPLATES DISCOVERY SECTION ================= */}
      <section id="szablony" className="py-16 sm:py-24 bg-[#F8F9FF] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                <Layers className="w-4 h-4" />
                <span>{isPl ? '10 Szablonów Dokumentów A4' : '10 Tailored A4 CV Templates'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#18233F] tracking-tight">
                {isPl ? 'Wybierz styl dopasowany do Twojej branży' : 'Select a Style Engineered for Your Industry'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
                {isPl
                  ? 'Szablony opracowane z myślą o czytelności systemów ATS, standardach polskiego rynku pracy oraz czystym eksporcie wektorowym do formatu A4.'
                  : 'Templates designed for ATS parsing readability, Polish hiring standards, and clean vector export to standard A4 format.'}
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreTemplates}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/50 text-slate-800 hover:text-indigo-700 font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <span>{isPl ? 'Otwórz pełną galerię' : 'Open Full Gallery'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                id: 'modern-polish' as TemplateId,
                name: 'Modern Polish Pro',
                tag: isPl ? 'Standard Rynku RP' : 'Polish Standard',
                bestFor: isPl ? 'Logistyka, B2B, Produkcja' : 'Logistics, B2B, Operations',
                desc: isPl ? 'Klasyczny dwukolumnowy układ z ciemnym panelem bocznym i foto.' : 'Classic dual-column layout with bold sidebar and portrait ring.',
                accent: '#1e3a8a'
              },
              {
                id: 'clean-ats' as TemplateId,
                name: 'Clean ATS Minimal',
                tag: isPl ? 'Czysty Tekst ATS' : 'Pure ATS',
                bestFor: isPl ? 'Korporacje, IT, Audyt Big 4' : 'Big 4, IT, Corporate Roles',
                desc: isPl ? 'Jednokolumnowy układ zoptymalizowany pod algorytmy rekrutacyjne.' : 'Single-column text-focused structure built for parsing engines.',
                accent: '#0f766e'
              },
              {
                id: 'euro-modern' as TemplateId,
                name: 'Euro Modern',
                tag: isPl ? 'Standard Europejski' : 'EU Standard',
                bestFor: isPl ? 'Projekty UE, Korporacje CEE' : 'EU Projects, Multinationals',
                desc: isPl ? 'Zbalansowany układ zgodny ze standardami pracodawców w UE.' : 'Balanced styling aligned with pan-European recruitment standards.',
                accent: '#0284c7'
              },
              {
                id: 'nordic-clean' as TemplateId,
                name: 'Nordic Clean',
                tag: isPl ? 'Minimalizm Skandynawski' : 'Nordic Clean',
                bestFor: isPl ? 'E-commerce, UX, Marketing' : 'E-commerce, Product, UX',
                desc: isPl ? 'Przestrzeń, subtelne linie i maksymalna przejrzystość treści.' : 'Airy typography, subtle divider lines, and serene focus.',
                accent: '#475569'
              },
              {
                id: 'academic-elite' as TemplateId,
                name: 'Academic Elite',
                tag: isPl ? 'Kariera Naukowa & Prawo' : 'Academic & Legal',
                bestFor: isPl ? 'Uczelnie, Kancelarie, Badania' : 'Law, Universities, Research',
                desc: isPl ? 'Tradycyjna szeryfowa elegancja dla publikacji i dorobku.' : 'Traditional serif typography tailored for research and legal track records.',
                accent: '#334155'
              },
              {
                id: 'dynamic-impact' as TemplateId,
                name: 'Dynamic Impact',
                tag: isPl ? 'Sprzedaż & Startupy' : 'Sales & Growth',
                bestFor: isPl ? 'B2B Sales, Growth, Startupy' : 'Sales Leads, Tech Growth',
                desc: isPl ? 'Mocne nagłówki i akcenty wizualne dla ról nastawionych na cele.' : 'High-impact headers and badges for results-driven professionals.',
                accent: '#dc2626'
              },
              {
                id: 'swiss-executive' as TemplateId,
                name: 'Swiss Executive',
                tag: isPl ? 'Kadra Zarządzająca' : 'Executive Tier',
                bestFor: isPl ? 'C-Level, Dyrektorzy, Finanse' : 'Directors, C-Level, Finance',
                desc: isPl ? 'Prestiżowy minimalizm i elegancka hierarchia dla stanowisk senior.' : 'Director-level styling with understated corporate authority.',
                accent: '#1e293b'
              },
              {
                id: 'creative-tech' as TemplateId,
                name: 'Creative Tech',
                tag: isPl ? 'IT & Nowe Technologie' : 'Dev & Tech',
                bestFor: isPl ? 'Software, DevOps, Architekci' : 'Engineers, DevOps, Architects',
                desc: isPl ? 'Pigułki technologiczne i metryki dla inżynierów i programistów.' : 'Interactive skill badges and project tags for tech professionals.',
                accent: '#7c3aed'
              },
              {
                id: 'berlin-minimal' as TemplateId,
                name: 'Berlin Minimal',
                tag: isPl ? 'Design & Sztuka' : 'Art & Editorial',
                bestFor: isPl ? 'Agencje, Architektura, Media' : 'Designers, Media, Culture',
                desc: isPl ? 'Maksymalny kontrast, monospace i awangardowy układ sekcji.' : 'Monospace touches, stark contrast, and editorial discipline.',
                accent: '#000000'
              },
              {
                id: 'elegance-serif' as TemplateId,
                name: 'Elegance Serif',
                tag: isPl ? 'Konsulting & Finanse' : 'Luxury Advisory',
                bestFor: isPl ? 'Doradztwo, Private Banking' : 'Consulting, Asset Management',
                desc: isPl ? 'Wytworna typografia klasyczna dla doradztwa i bankowości.' : 'Refined serif aesthetics for corporate governance and advisory.',
                accent: '#78350f'
              }
            ].map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col justify-between hover:shadow-lg hover:border-indigo-400 transition-all duration-200 group text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono">
                      {tpl.tag}
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tpl.accent }} />
                  </div>
                  <h3 className="font-extrabold text-sm text-[#18233F] group-hover:text-indigo-600 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {tpl.bestFor}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>

                <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedHeroTemplate(tpl.id);
                      onSelectTemplate(tpl.id);
                    }}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-bold transition shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{isPl ? 'Użyj w kreatorze' : 'Use Template'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA STRIP ================= */}
      <section className="py-16 bg-[#18233F] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {isPl ? 'Gotowy na stworzenie profesjonalnego CV?' : 'Ready to Build Your Professional CV?'}
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            {isPl
              ? 'Wypełnij 5 prostych kroków i pobierz gotowy plik PDF bez ukrytych opłat ani subskrypcji.'
              : 'Complete 5 guided steps and export a print-ready PDF with zero paywalls or subscriptions.'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onStartEditing}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-sm shadow-xl transition transform hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>{isPl ? 'Rozpocznij tworzenie CV za darmo' : 'Start Free CV Builder'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
