import React, { useState } from 'react';
import { CVData, TemplateId, LanguageCode } from '../../../types/cv';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  Download,
  Printer,
  ChevronRight,
  Layers,
  Edit3,
  Zap,
  Star,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { V4FlowStep } from '../types';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
  currentStep: V4FlowStep;
  onStepChange: (step: V4FlowStep) => void;
}

export const ConceptA_MinimalLuxury: React.FC<Props> = ({
  cv,
  onChangeCv,
  language,
  currentStep,
  onStepChange
}) => {
  const isPl = language === 'pl';
  const [activeTab, setActiveTab] = useState<'details' | 'experience' | 'skills'>('details');
  const [starCopied, setStarCopied] = useState(false);

  // Template items
  const templates: { id: TemplateId; name: string; tag: string; desc: string; accent: string }[] = [
    {
      id: 'modern-polish',
      name: 'Modern Polish Pro',
      tag: 'Standard Rynku RP',
      desc: 'Dwukolumnowy układ z wyrazistym panelem bocznym i klauzulą RODO 2026.',
      accent: '#6250F4'
    },
    {
      id: 'swiss-executive',
      name: 'Swiss Executive',
      tag: 'Prestiż Dyrektorski',
      desc: 'Prestiżowa siatka szwajcarska z wyrazistą osią kariery i subtelnymi liniami.',
      accent: '#1e3a8a'
    },
    {
      id: 'clean-ats',
      name: 'Clean ATS Minimal',
      tag: '100% Parsowania ATS',
      desc: 'Jednokolumnowy purystyczny układ zoptymalizowany pod skanery Workday & Taleo.',
      accent: '#0f766e'
    },
    {
      id: 'creative-tech',
      name: 'Creative Tech',
      tag: 'IT & Inżynieria',
      desc: 'Etykiety technologiczne, klocki kompetencji i linki do projektów GitHub.',
      accent: '#4f46e5'
    },
    {
      id: 'elegance-serif',
      name: 'Elegance Serif',
      tag: 'Prawo & Konsulting',
      desc: 'Klasyczny krój szeryfowy Merriweather budzący bezdyskusyjny autorytet.',
      accent: '#78350f'
    }
  ];

  const handleApplyStarExample = () => {
    const starBullet = 'Wdrożenie ustandaryzowanego procesu weryfikacji zleceń (STAR), co skróciło czas onboarding klienta o 32% i wygenerowało 180 000 PLN oszczędności.';
    const updatedExperiences = [...cv.experiences];
    if (updatedExperiences.length > 0) {
      updatedExperiences[0] = {
        ...updatedExperiences[0],
        bullets: [starBullet, ...updatedExperiences[0].bullets.slice(1)]
      };
      onChangeCv({ ...cv, experiences: updatedExperiences });
    }
    setStarCopied(true);
    setTimeout(() => setStarCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#0F172A] font-sans selection:bg-[#6250F4]/15">
      {/* Editorial Luxury Hero */}
      {currentStep === 'landing' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-24 text-center">
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700 mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Koncepcja A · Apple-Level Minimal Luxury</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08] max-w-4xl mx-auto mb-6">
            Twoja kariera w najczystszej,{' '}
            <span className="font-serif italic font-normal text-indigo-600">
              luksusowej formie.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Zaprojektowany z rygorystyczną dbałością o typografię, światło i przestrzeń. Zgodny z normami polskiego rynku pracy i europejskich korporacji.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F172A] hover:bg-black text-white font-bold text-sm shadow-xl hover:shadow-2xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Rozpocznij Tworzenie CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onStepChange('templates')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm shadow-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Odkryj Szablony</span>
            </button>
          </div>

          {/* Floating Luxury Document Showcase */}
          <div className="relative max-w-3xl mx-auto">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl -z-10 rounded-full" />

            <div className="bg-white rounded-2xl p-2 sm:p-4 shadow-2xl border border-slate-200/80 transition-transform duration-300 hover:scale-[1.01]">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 text-xs text-slate-400">
                <span className="font-mono text-[11px] font-bold text-indigo-600">
                  {cv.templateId.toUpperCase()} · LIVE A4
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RODO 2026 Zgodne
                </span>
              </div>
              <div className="overflow-hidden p-2 flex justify-center bg-slate-50/50 rounded-xl">
                <ResumeCanvas cv={cv} zoom={0.68} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Discovery Step */}
      {currentStep === 'templates' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Kolekcja Szablonów 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-3 mb-2">
              Wybierz Architekturę Wizualną
            </h2>
            <p className="text-sm text-slate-500">
              Każdy szablon zachowuje 100% wprowadzonych danych. Kliknij styl, aby natychmiast go aktywować.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {templates.map((tpl) => {
              const isSelected = cv.templateId === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => onChangeCv({ ...cv, templateId: tpl.id })}
                  className={`p-5 rounded-3xl bg-white border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl ${
                    isSelected
                      ? 'border-indigo-600 ring-4 ring-indigo-500/10 shadow-lg scale-[1.01]'
                      : 'border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {tpl.tag}
                      </span>
                      {isSelected && (
                        <span className="text-indigo-600 flex items-center gap-1 text-xs font-bold">
                          <Check className="w-4 h-4 stroke-[3]" />
                          Aktywny
                        </span>
                      )}
                    </div>

                    <h3 className="font-extrabold text-base text-[#0F172A] mb-1">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {tpl.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      Podgląd Live
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeCv({ ...cv, templateId: tpl.id });
                        onStepChange('preview');
                      }}
                      className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Zobacz A4</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <span>Przejdź do Uzupełniania Treści</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Minimal Luxury Builder Workflow */}
      {(currentStep === 'builder' || currentStep === 'preview') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Minimalist Editorial Editor */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-[#0F172A]">
                    Edytor Treści CV
                  </h2>
                  <p className="text-xs text-slate-400">
                    Wszystkie zmiany aktualizują dokument na żywo po prawej stronie.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onStepChange('download')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Eksport</span>
                </button>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-2 rounded-xl transition ${
                    activeTab === 'details' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  1. Dane & Rola
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('experience')}
                  className={`flex-1 py-2 rounded-xl transition ${
                    activeTab === 'experience' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  2. Doświadczenie (STAR)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('skills')}
                  className={`flex-1 py-2 rounded-xl transition ${
                    activeTab === 'skills' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  3. Umiejętności & RODO
                </button>
              </div>
            </div>

            {/* Tab 1: Personal Details */}
            {activeTab === 'details' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Imię i Nazwisko</label>
                  <input
                    type="text"
                    value={cv.personalInfo.fullName}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, fullName: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-slate-900 font-medium"
                    placeholder="np. Alicja Dąbrowska"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stanowisko Docelowe</label>
                  <input
                    type="text"
                    value={cv.personalInfo.jobTitle}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, jobTitle: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-slate-900 font-medium"
                    placeholder="np. Senior Operations Lead"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={cv.personalInfo.email}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, email: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Telefon</label>
                    <input
                      type="text"
                      value={cv.personalInfo.phone}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, phone: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Podsumowanie Zawodowe</label>
                  <textarea
                    rows={4}
                    value={cv.summary}
                    onChange={(e) => onChangeCv({ ...cv, summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-indigo-600 text-slate-900 font-medium leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Experience & STAR Assistant */}
            {activeTab === 'experience' && (
              <div className="space-y-4 text-xs">
                {/* STAR Helper Box */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-indigo-950 flex items-center gap-1.5 mb-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Asystent Formuły STAR (Wyniki & Liczby)
                    </span>
                    <p className="text-[11.5px] text-indigo-900 leading-snug">
                      Rekruterzy w Polsce odrzucają opisy z samymi obowiązkami. Użyj formatu Sytuacja → Zadanie → Działanie → Rezultat liczbowy.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyStarExample}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shrink-0 transition cursor-pointer"
                  >
                    {starCopied ? 'Wstawiono ✓' : 'Wstaw STAR'}
                  </button>
                </div>

                {cv.experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-sm">Stanowisko #{idx + 1}</span>
                      <span className="text-[10px] font-mono text-slate-400">{exp.startDate} - {exp.current ? 'Obecnie' : exp.endDate}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 font-semibold"
                        placeholder="Nazwa stanowiska"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], company: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200"
                        placeholder="Firma / Pracodawca"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Główny punkt osiągnięcia (z liczbą):</label>
                      <textarea
                        rows={3}
                        value={exp.bullets[0] || ''}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          const bullets = [...updated[idx].bullets];
                          bullets[0] = e.target.value;
                          updated[idx] = { ...updated[idx], bullets };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-slate-200 leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Skills & RODO */}
            {activeTab === 'skills' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kluczowe Umiejętności Twarde</label>
                  <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    {cv.technicalSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-medium text-[11px] shadow-2xs"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Aktualna Klauzula RODO 2026 (Prawo Pracy RP)</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed font-mono">
                    "Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO)."
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => onStepChange('templates')}
                className="text-slate-500 hover:text-slate-900 font-medium"
              >
                ← Zmień szablon
              </button>
              <button
                type="button"
                onClick={() => onStepChange('download')}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-black text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Podsumowanie & Pobieranie</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Side: High-Precision Live Document View */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-slate-700">Podgląd Wydruku A4 (Live)</span>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Drukuj / Zapisz PDF</span>
              </button>
            </div>

            <div className="w-full overflow-x-auto flex justify-center py-2 bg-slate-100/60 rounded-2xl">
              <ResumeCanvas cv={cv} zoom={0.78} />
            </div>
          </div>
        </div>
      )}

      {/* Final Download & Export Modal/View */}
      {currentStep === 'download' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
            Twoje CV jest Gotowe do Wysyłki
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8">
            Dokument został sformatowany zgodnie z normami formatu A4 (210×297 mm) ze stemplem RODO 2026 i weryfikacją ATS.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Pobierz / Drukuj Gotowy PDF</span>
            </button>
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition cursor-pointer"
            >
              Wróć do Edycji
            </button>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span>Status Dokumentu:</span>
              <span className="text-emerald-700 font-bold">100% Zgodny RP & ATS</span>
            </div>
            <div className="flex items-center justify-between font-mono">
              <span>Szablon A4:</span>
              <span className="text-slate-800 font-bold">{cv.templateId}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
