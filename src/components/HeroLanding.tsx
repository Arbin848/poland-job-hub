import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
  Download,
  Zap,
  Lock,
  Layers,
  ChevronRight,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { LanguageCode, TemplateId } from '../types/cv';
import { HERO_TRANSLATIONS } from '../data/translations';

interface Props {
  language: LanguageCode;
  onStartEditing: () => void;
  onExploreTemplates: () => void;
  onSelectSampleTemplate: (templateId: TemplateId) => void;
  hasExistingCv?: boolean;
  candidateName?: string;
  onContinueEditing?: () => void;
}

export const HeroLanding: React.FC<Props> = ({
  language,
  onStartEditing,
  onExploreTemplates,
  onSelectSampleTemplate,
  hasExistingCv = false,
  candidateName,
  onContinueEditing
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const t = HERO_TRANSLATIONS[language] || HERO_TRANSLATIONS.pl;
  const isPl = language === 'pl';

  const genuineFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: isPl ? 'Zgodność z RODO 2026 w Polsce' : '2026 Polish GDPR Compliance',
      desc: isPl
        ? 'Aktualne klauzule prawne dla rekrutacji w RP (ochrona danych, ochrona czasowa, powiadomienia PUP w 7 dni).'
        : 'Up-to-date legal clauses for recruitment in Poland (data protection, statutory timeframes, EU standards).'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: isPl ? 'Asystent Metody STAR' : 'STAR Impact Assistant',
      desc: isPl
        ? 'Strukturyzuje zwykłe opisy obowiązków w mierzalne osiągnięcia zawodowe z liczbami i rezultatami biznesowymi.'
        : 'Transforms routine task descriptions into quantifiable career achievements using proven STAR framing.'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: isPl ? 'Struktura Przyjazna dla Systemów ATS' : 'ATS-Optimized Hierarchy',
      desc: isPl
        ? 'Czysta hierarchia nagłówków i bezbłędne parsowanie sekcji przez oprogramowanie rekrutacyjne (eRecruiter, Workday).'
        : 'Clean header hierarchy and flawless section parsing by recruiting software without graphic bloat.'
    },
    {
      icon: <Calculator className="w-5 h-5 text-purple-600" />,
      title: isPl ? 'Kalkulator Wynagrodzeń Netto / Brutto' : 'Polish Net / Gross Calculator',
      desc: isPl
        ? 'Precyzyjne wyliczenia dla Umowy o Pracę (ulga do 26 lat), Umowy Zlecenie oraz B2B (ryczałt / liniowy).'
        : 'Precise Polish payroll estimates for Employment Contracts, Mandate Contracts, and B2B taxation.'
    },
    {
      icon: <Download className="w-5 h-5 text-blue-600" />,
      title: isPl ? 'Precyzyjny Wydruk A4 Bez Zniekształceń' : 'Exact A4 Print Pagination',
      desc: isPl
        ? 'Dedykowany arkusz stylów CSS zapobiega łamaniu stron w połowie akapitu i zachowuje proporcje 210×297 mm.'
        : 'Dedicated print stylesheets prevent broken paragraph splits across page breaks on 210×297 mm sheets.'
    },
    {
      icon: <Lock className="w-5 h-5 text-slate-700" />,
      title: isPl ? '100% Prywatności (Local-First)' : '100% Local-First Privacy',
      desc: isPl
        ? 'Twoje dane nie trafiają do zewnętrznej bazy serwerowej. Są bezpiecznie zapisywane wyłącznie w Twojej przeglądarce.'
        : 'Your personal data is never stored on an external database. It resides strictly inside your local browser.'
    }
  ];

  const showcaseTemplates: {
    id: TemplateId;
    name: string;
    tag: string;
    accent: string;
    desc: string;
  }[] = [
    {
      id: 'modern-polish',
      name: 'Modern Polish Pro',
      tag: isPl ? 'Standard Rynku RP' : 'Polish Standard',
      accent: '#6250F4',
      desc: isPl
        ? 'Sprawdzony dwukolumnowy układ z wyrazistym paskiem bocznym.'
        : 'Balanced dual-column layout with a crisp, authoritative left sidebar.'
    },
    {
      id: 'clean-ats',
      name: 'Clean ATS Minimal',
      tag: isPl ? 'Czysty Tekst ATS' : 'Pure ATS',
      accent: '#0f766e',
      desc: isPl
        ? 'Jednokolumnowy układ zoptymalizowany pod algorytmy rekrutacyjne.'
        : 'Single-column text-focused structure built for parsing engines.'
    },
    {
      id: 'swiss-executive',
      name: 'Swiss Executive',
      tag: isPl ? 'Kadra Zarządzająca' : 'Executive Tier',
      accent: '#1e3a8a',
      desc: isPl
        ? 'Prestiżowy minimalizm i elegancka hierarchia dla stanowisk seniorskich.'
        : 'High-contrast director-level styling with understated corporate elegance.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#18233F] overflow-hidden selection:bg-[#6250F4]/10 selection:text-[#6250F4]">
      {/* Decorative Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-140px] left-[15%] w-[520px] h-[520px] rounded-full bg-[#6250F4]/12 blur-[120px]" />
        <div className="absolute top-[-80px] right-[10%] w-[480px] h-[480px] rounded-full bg-[#A447F4]/10 blur-[130px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-10 sm:pt-16 pb-14 text-center">
        {/* Value Prop Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/80 backdrop-blur-xs border border-[#E5E8F3] shadow-2xs mb-6 sm:mb-8 text-xs font-semibold text-[#18233F]">
          <span className="w-2 h-2 rounded-full bg-[#6250F4] animate-pulse" />
          <span>{t.badgeMarket}</span>
          <span className="text-[#75819C]">·</span>
          <span className="text-[#6250F4] font-bold">{t.badgeTemplates}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#18233F] max-w-4xl mx-auto leading-[1.08] mb-6">
          {t.headlineMain} <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6250F4] via-[#7d48f4] to-[#A447F4]">
            {t.headlineGradient}
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#75819C] max-w-2xl mx-auto leading-relaxed mb-8 font-medium">
          {t.subhead}
        </p>

        {/* Returning User Banner (If Saved CV Exists in LocalStorage) */}
        {hasExistingCv && (
          <div className="max-w-md mx-auto mb-6 p-3 bg-white/90 border border-emerald-200/90 rounded-2xl shadow-sm flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-xs font-extrabold text-[#18233F] truncate">
                  {candidateName || (isPl ? 'Twój aktywny projekt CV' : 'Your active CV draft')}
                </div>
                <div className="text-[10px] text-[#75819C]">
                  {t.continueNotice}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onContinueEditing || onStartEditing}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.ctaContinue}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto mb-14">
          <button
            type="button"
            onClick={onStartEditing}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #6250F4 0%, #A447F4 100%)',
              boxShadow: '0 10px 25px -5px rgba(98, 80, 244, 0.4)'
            }}
          >
            <span>{t.ctaCreate}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onExploreTemplates}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-[#18233F] border border-[#E5E8F3] hover:border-[#6250F4]/40 hover:bg-[#F8F9FF] font-bold text-base transition-all duration-200 shadow-xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#6250F4]" />
            <span>{t.ctaExplore}</span>
          </button>
        </div>

        {/* Floating Layered CV Cards Mockup with Gentle 3D Perspective */}
        <div className="relative max-w-4xl mx-auto pt-6 pb-12" style={{ perspective: '1200px' }}>
          <div className="relative mx-auto w-full max-w-[760px] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
            {/* Ambient Back Glow with Pulsing Lighting */}
            <div className="absolute inset-x-8 inset-y-4 bg-gradient-to-r from-[#6250F4]/20 via-[#8B5CF6]/15 to-[#A447F4]/20 rounded-3xl blur-3xl -z-10 animate-pulse-glow" />

            {/* Background Layer Card (Left Tilt - Clean ATS Minimal Style) */}
            <div
              className="absolute left-2 sm:left-4 top-6 w-[260px] sm:w-[320px] h-[360px] sm:h-[430px] bg-white rounded-2xl border border-[#E5E8F3] shadow-xl p-5 -rotate-6 opacity-85 hidden sm:flex flex-col justify-between transition-all duration-300 hover:rotate-0 hover:opacity-100 hover:z-20 animate-float-left"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    MW
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900">Michał Wiśniewski</div>
                    <div className="text-[10px] text-teal-700 font-medium">Senior DevOps Engineer</div>
                  </div>
                </div>
                <div className="text-left space-y-1.5 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    {isPl ? 'Doświadczenie' : 'Experience'}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-800">Cloud Platform Lead · Allegro</div>
                  <div className="text-[9px] text-slate-500 leading-tight">
                    {isPl
                      ? 'Migracja 140 mikrousług do Kubernetes (EKS), redukcja kosztów AWS o 32%.'
                      : 'Migrated 140 microservices to Kubernetes (EKS), lowering AWS costs by 32%.'}
                  </div>
                </div>
                <div className="text-left space-y-1 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    {isPl ? 'Stos Technologiczny' : 'Tech Stack'}
                  </div>
                  <div className="flex flex-wrap gap-1 text-[9px] text-slate-600 font-mono">
                    <span className="bg-slate-50 px-1 py-0.5 rounded border border-slate-200">Kubernetes</span>
                    <span className="bg-slate-50 px-1 py-0.5 rounded border border-slate-200">Terraform</span>
                    <span className="bg-slate-50 px-1 py-0.5 rounded border border-slate-200">AWS</span>
                  </div>
                </div>
              </div>
              <div className="text-[9.5px] font-medium text-slate-400 text-left border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Clean ATS Minimal</span>
                <span className="text-teal-700 font-bold">ATS Pure</span>
              </div>
            </div>

            {/* Background Layer Card (Right Tilt - Swiss Executive Style) */}
            <div
              className="absolute right-2 sm:right-4 top-6 w-[260px] sm:w-[320px] h-[360px] sm:h-[430px] bg-white rounded-2xl border border-[#E5E8F3] shadow-xl p-5 rotate-6 opacity-85 hidden sm:flex flex-col justify-between transition-all duration-300 hover:rotate-0 hover:opacity-100 hover:z-20 animate-float-right"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="space-y-3">
                <div className="p-2.5 bg-[#0f274a] text-white rounded-lg text-left">
                  <div className="text-xs font-bold tracking-tight">Katarzyna Wójcik</div>
                  <div className="text-[10px] text-blue-200">Financial Controller &amp; MBA</div>
                </div>
                <div className="text-left space-y-1.5 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    {isPl ? 'Podsumowanie' : 'Summary'}
                  </div>
                  <div className="text-[9.5px] text-slate-600 leading-relaxed">
                    {isPl
                      ? '12 lat doświadczenia w audycie Big4 oraz zarządzaniu budżetami korporacyjnymi > 120 mln PLN.'
                      : '12 years in Big4 audit and financial leadership overseeing > 120M PLN budgets.'}
                  </div>
                </div>
                <div className="text-left space-y-1 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    {isPl ? 'Kluczowe Osiągnięcia' : 'Key Achievements'}
                  </div>
                  <div className="text-[9px] text-slate-700 bg-blue-50/70 p-1.5 rounded border border-blue-100/60 leading-tight">
                    {isPl
                      ? 'Wdrożenie automatyzacji raportowania zarządczego wg IFRS w 4 filiach.'
                      : 'Automated executive management reporting under IFRS across 4 subsidiaries.'}
                  </div>
                </div>
              </div>
              <div className="text-[9.5px] font-medium text-slate-400 text-left border-t border-slate-100 pt-2 flex items-center justify-between">
                <span>Swiss Executive</span>
                <span className="text-blue-900 font-bold">Executive Grade</span>
              </div>
            </div>

            {/* Centerpiece Hero Card (Elevated & Crisp - Modern Polish Pro) */}
            <div
              className="relative z-10 w-[94%] sm:w-[490px] bg-white rounded-2xl border border-[#E5E8F3] shadow-2xl p-6 sm:p-7 text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6250F4] to-[#A447F4] p-0.5 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                      alt="Alicja Dąbrowska"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#18233F]">Alicja Dąbrowska</h2>
                    <p className="text-xs font-semibold text-[#6250F4]">Operations &amp; Process Lead</p>
                    <p className="text-[11px] text-[#75819C] mt-0.5">Warszawa · +48 501 234 567</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200/80 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.rodoTag}</span>
                </div>
              </div>

              {/* Card Mini Body */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#75819C]">
                  <span>{t.starTag}</span>
                  <span className="text-[#6250F4] font-semibold">{isPl ? 'Zweryfikowane Metryki' : 'Verified Metrics'}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] text-[11.5px] text-[#18233F] leading-relaxed">
                  <span className="font-bold text-[#6250F4]">{isPl ? 'Optymalizacja procesów:' : 'Process Optimization:'}</span>{' '}
                  {isPl
                    ? 'Skróciła czas kompletacji o 28% i obniżyła koszty operacyjne magazynu centralnego o 180 000 PLN w skali roku.'
                    : 'Reduced order fulfillment time by 28% and saved 180,000 PLN annually in warehouse operational overhead.'}
                </div>
              </div>

              {/* Card Interactive Footer */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-[#75819C]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">{t.formatTag}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-medium text-[#6250F4]">Modern Polish Pro</span>
                </div>
                <button
                  type="button"
                  onClick={onStartEditing}
                  className="text-xs font-bold text-[#6250F4] hover:text-[#5240e3] flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>{t.editSample}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Simple Flow */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[#E5E8F3]">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6250F4] block mb-2">
            {t.stepsKicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
            {t.stepsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: t.step1Num,
              title: t.step1Title,
              desc: t.step1Desc
            },
            {
              num: t.step2Num,
              title: t.step2Title,
              desc: t.step2Desc
            },
            {
              num: t.step3Num,
              title: t.step3Title,
              desc: t.step3Desc
            }
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl border border-[#E5E8F3] shadow-xs hover:shadow-md transition-all duration-200 relative overflow-hidden"
            >
              <div className="text-3xl font-black text-[#6250F4]/20 mb-3 font-mono">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-[#18233F] mb-2">{step.title}</h3>
              <p className="text-xs text-[#75819C] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Genuine Feature Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6250F4] block mb-2">
            {t.featuresKicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
            {t.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {genuineFeatures.map((feat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className="p-6 rounded-2xl bg-white border border-[#E5E8F3] transition-all duration-200 hover:border-[#6250F4]/40 hover:shadow-lg text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] flex items-center justify-center mb-4">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-[#18233F] mb-1.5">{feat.title}</h3>
                <p className="text-xs text-[#75819C] leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Templates Showcase */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-[#E5E8F3]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#6250F4] block mb-1">
              {t.galleryKicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
              {t.galleryTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={onExploreTemplates}
            className="text-xs font-bold text-[#6250F4] hover:text-[#5240e3] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>{t.galleryViewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-[#E5E8F3] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-5 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] font-bold text-[#6250F4] font-mono">
                    {tpl.tag}
                  </span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tpl.accent }} />
                </div>
                <h3 className="font-extrabold text-base text-[#18233F]">{tpl.name}</h3>
                <p className="text-xs text-[#75819C] mt-1">{tpl.desc}</p>
              </div>

              {/* Interactive Action Bar */}
              <div className="p-4 bg-[#F8F9FF] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectSampleTemplate(tpl.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#6250F4] text-[#18233F] hover:text-white border border-[#E5E8F3] hover:border-[#6250F4] text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{t.selectStyle}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#6250F4] to-[#A447F4] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {t.footerTitle}
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartEditing}
                className="px-8 py-4 rounded-xl bg-white text-[#6250F4] font-bold text-base hover:bg-slate-50 transition-transform active:scale-95 shadow-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{t.footerCta}</span>
                <ArrowRight className="w-4 h-4 text-[#6250F4]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
