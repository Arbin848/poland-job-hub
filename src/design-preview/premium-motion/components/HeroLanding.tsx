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
  Globe2,
  Lock,
  Layers,
  ChevronRight,
  Eye,
  Star,
  Award
} from 'lucide-react';
import { THEME } from '../tokens';

interface Props {
  onStartEditing: () => void;
  onExploreTemplates: () => void;
  onSelectSampleTemplate: (templateId: any) => void;
}

export const HeroLanding: React.FC<Props> = ({
  onStartEditing,
  onExploreTemplates,
  onSelectSampleTemplate,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const genuineFeatures = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: 'Zgodność z RODO 2026 w Polsce',
      desc: 'Aktualne klauzule prawne dla rekrutacji w RP (ochrona danych, ochrona czasowa, powiadomienia PUP w 7 dni).'
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: 'Asystent Metody STAR (Google Gemini)',
      desc: 'Zamienia zwykłe obowiązki w mierzalne osiągnięcia rekrutacyjne z liczbami i procentami.'
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: 'Struktura Przyjazna dla Systemów ATS',
      desc: 'Czysta hierarchia nagłówków i bezbłędne parsowanie sekcji przez oprogramowanie rekrutacyjne.'
    },
    {
      icon: <Calculator className="w-5 h-5 text-purple-600" />,
      title: 'Kalkulator Wynagrodzeń Netto / Brutto',
      desc: 'Precyzyjne wyliczenia dla Umowy o Pracę (ulga do 26 lat), Umowy Zlecenie oraz B2B (ryczałt / liniowy).'
    },
    {
      icon: <Download className="w-5 h-5 text-blue-600" />,
      title: 'Precyzyjny Wydruk A4 Bez Zniekształceń',
      desc: 'Dedykowany arkusz stylów CSS zapobiega łamaniu stron w połowie akapitu i zachowuje proporcje 210×297 mm.'
    },
    {
      icon: <Lock className="w-5 h-5 text-slate-700" />,
      title: '100% Prywatności (Local-First)',
      desc: 'Twoje dane nie trafiają do zewnętrznej bazy serwerowej. Są bezpiecznie zapisywane wyłącznie w Twojej przeglądarce.'
    }
  ];

  const showcaseTemplates = [
    {
      id: 'modern-polish',
      name: 'Modern Polish Pro',
      tag: 'Standard Rynku RP',
      accent: '#6250F4',
      desc: 'Sprawdzony dwukolumnowy układ z wyrazistym paskiem bocznym.'
    },
    {
      id: 'clean-ats',
      name: 'Clean ATS Minimal',
      tag: 'Czysty Tekst ATS',
      accent: '#0f766e',
      desc: 'Jednokolumnowy układ zoptymalizowany pod algorytmy rekrutacyjne.'
    },
    {
      id: 'swiss-executive',
      name: 'Swiss Executive',
      tag: 'Kadra Zarządzająca',
      accent: '#1e3a8a',
      desc: 'Prestiżowy minimalizm i elegancka hierarchia dla stanowisk seniorskich.'
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
      <section className="max-w-6xl mx-auto px-4 pt-12 sm:pt-20 pb-16 text-center">
        {/* Value Prop Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E8F3] shadow-xs mb-6 sm:mb-8 text-xs font-semibold text-[#18233F] animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#6250F4] animate-pulse" />
          <span>Polski i Europejski Rynek Pracy 2026</span>
          <span className="text-[#75819C]">·</span>
          <span className="text-[#6250F4] font-bold">10 Szablonów A4</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#18233F] max-w-4xl mx-auto leading-[1.08] mb-6">
          Create a CV That <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6250F4] via-[#7d48f4] to-[#A447F4]">
            Opens Doors.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#75819C] max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
          Create a professional CV with beautiful templates, smart writing assistance, and easy step-by-step guidance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-16">
          <button
            type="button"
            onClick={onStartEditing}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-bold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5 group cursor-pointer"
            style={{
              background: THEME.colors.gradient,
              boxShadow: '0 10px 25px -5px rgba(98, 80, 244, 0.4)'
            }}
          >
            <span>Create My CV Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onExploreTemplates}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white text-[#18233F] border border-[#E5E8F3] hover:border-[#6250F4]/40 hover:bg-[#F8F9FF] font-bold text-base transition-all duration-200 shadow-xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-[#6250F4]" />
            <span>Explore Templates</span>
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
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Doświadczenie</div>
                  <div className="text-[10px] font-semibold text-slate-800">Cloud Platform Lead · Allegro</div>
                  <div className="text-[9px] text-slate-500 leading-tight">Migracja 140 mikrousług do Kubernetes (EKS), redukcja kosztów AWS o 32%.</div>
                </div>
                <div className="text-left space-y-1 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Stos Technologiczny</div>
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
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Podsumowanie</div>
                  <div className="text-[9.5px] text-slate-600 leading-relaxed">
                    12 lat doświadczenia w audycie finansowym Big4 oraz zarządzaniu budżetami korporacyjnymi &gt; 120 mln PLN.
                  </div>
                </div>
                <div className="text-left space-y-1 pt-1">
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">Kluczowe Osiągnięcia</div>
                  <div className="text-[9px] text-slate-700 bg-blue-50/70 p-1.5 rounded border border-blue-100/60 leading-tight">
                    Wdrożenie automatyzacji raportowania zarządczego wg standardów IFRS w 4 filiach.
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
                  <span>RODO 2026 Zgodne</span>
                </div>
              </div>

              {/* Card Mini Body */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#75819C]">
                  <span>Osiągnięcia (Metoda STAR)</span>
                  <span className="text-[#6250F4] font-semibold">Zweryfikowane Metryki</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] text-[11.5px] text-[#18233F] leading-relaxed">
                  <span className="font-bold text-[#6250F4]">Optymalizacja procesów:</span> Skróciła czas kompletacji o 28% i obniżyła koszty operacyjne magazynu centralnego o 180 000 PLN w skali roku.
                </div>
              </div>

              {/* Card Interactive Footer */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-[#75819C]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Format A4 (210×297 mm)</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-medium text-[#6250F4]">Modern Polish Pro</span>
                </div>
                <button
                  type="button"
                  onClick={onStartEditing}
                  className="text-xs font-bold text-[#6250F4] hover:text-[#5240e3] flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>Edytuj ten profil</span>
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
            Prosty Proces w 3 Krokach
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
            Od pustego arkusza do gotowego CV
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Wybierz Profesjonalny Szablon',
              desc: 'Wybierz spośród 10 sprawdzonych układów dostosowanych do rekruterów w Polsce i Unii Europejskiej.'
            },
            {
              num: '02',
              title: 'Wypełnij Dane lub Wgraj Stare CV',
              desc: 'Skorzystaj z gotowych wzorców branżowych i asystenta AI, który precyzyjnie sformułuje Twoje obowiązki.'
            },
            {
              num: '03',
              title: 'Pobierz Gotowy Plik PDF',
              desc: 'Otrzymaj dokument z aktualną klauzulą RODO 2026 i kodem QR, gotowy do wysłania na Pracuj.pl lub LinkedIn.'
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
            Narzędzia i Bezpieczeństwo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
            Wszystko, czego wymaga polski rynek pracy
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
              Galeria Stylów
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18233F]">
              Wybierz szablon dopasowany do Twojej branży
            </h2>
          </div>
          <button
            type="button"
            onClick={onExploreTemplates}
            className="text-xs font-bold text-[#6250F4] hover:text-[#5240e3] flex items-center gap-1 hover:underline"
          >
            <span>Zobacz wszystkie 10 szablonów</span>
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
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono">
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
                  <span>Wybierz ten styl</span>
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
              Gotowy, aby stworzyć swoje nowe CV?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
              Bez rejestracji i bez kart płatniczych. Twoje dane pozostają w 100% bezpieczne w Twojej przeglądarce.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartEditing}
                className="px-8 py-4 rounded-xl bg-white text-[#6250F4] font-bold text-base hover:bg-slate-50 transition-transform active:scale-95 shadow-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Rozpocznij teraz za darmo</span>
                <ArrowRight className="w-4 h-4 text-[#6250F4]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
