import React, { useState } from 'react';
import { CVData, TemplateId, LanguageCode } from '../../../types/cv';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
  Eye,
  Download,
  Printer,
  Zap,
  CheckCircle2,
  HelpCircle,
  Clock,
  Heart,
  Smile,
  MessageSquare,
  Award,
  Layers,
  Edit3
} from 'lucide-react';
import { V4FlowStep } from '../types';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
  currentStep: V4FlowStep;
  onStepChange: (step: V4FlowStep) => void;
}

export const ConceptC_GuidedCareer: React.FC<Props> = ({
  cv,
  onChangeCv,
  language,
  currentStep,
  onStepChange
}) => {
  const isPl = language === 'pl';
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('chat');
  const [addedSkill, setAddedSkill] = useState('');

  const questions = [
    {
      title: 'Krok 1: Kim jesteś i jakiej roli szukasz?',
      subtitle: 'Rekruter poświęca średnio 6 sekund na pierwsze spojrzenie na nagłówek CV.',
      badge: 'Podstawowe Dane'
    },
    {
      title: 'Krok 2: Opowiedz o swoim doświadczeniu (z asystentem STAR)',
      subtitle: 'Formuła STAR (Sytuacja, Zadanie, Działanie, Rezultat) zwiększa liczbę zaproszeń na rozmowy o 40%.',
      badge: 'Doświadczenie Zawodowe'
    },
    {
      title: 'Krok 3: Wskaż swoje najmocniejsze umiejętności',
      subtitle: 'Systemy ATS i rekruterzy natychmiast skanują profil pod kątem tych słów kluczowych.',
      badge: 'Kompetencje & Narzędzia'
    },
    {
      title: 'Krok 4: Wybierz szablon dopasowany do Twojej branży',
      subtitle: 'Każdy szablon zachowuje 100% Twoich danych i jest w pełni zgodny z prawem pracy RP 2026.',
      badge: 'Szablon Dokumentu'
    },
    {
      title: 'Krok 5: Twoje profesjonalne CV jest gotowe!',
      subtitle: 'Sprawdź podgląd A4 i pobierz dokument przygotowany do wysyłki do pracodawców.',
      badge: 'Gotowe do Pobrania'
    }
  ];

  const suggestedSkills = [
    'Zarządzanie Zespołem',
    'Negocjacje B2B',
    'Analiza Wskaźników KPI',
    'Optymalizacja Procesów',
    'Lean / Kaizen',
    'Język Angielski B2/C1',
    'MS Excel / Power BI',
    'Prawo Pracy RP'
  ];

  const handleAddSkill = (skill: string) => {
    if (!cv.technicalSkills.includes(skill)) {
      onChangeCv({
        ...cv,
        technicalSkills: [...cv.technicalSkills, skill]
      });
    }
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (addedSkill.trim()) {
      handleAddSkill(addedSkill.trim());
      setAddedSkill('');
    }
  };

  const handleInsertStarBullet = () => {
    const starText = 'Wdrożenie ustandaryzowanego procesu obsługi zamówień (STAR), redukcja opóźnień o 28% i wzrost satysfakcji klientów do 98.4%.';
    const updated = [...cv.experiences];
    if (updated.length > 0) {
      updated[0] = {
        ...updated[0],
        bullets: [starText, ...updated[0].bullets.slice(1)]
      };
      onChangeCv({ ...cv, experiences: updated });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#1E293B] font-sans selection:bg-emerald-500/20">
      {/* Guided Progress Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3 sticky top-12 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black text-xs">
              {questionIndex + 1}/5
            </div>
            <div>
              <div className="font-extrabold text-sm text-[#0F172A]">
                {questions[questionIndex].badge}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3 h-3 text-emerald-500" />
                <span>Szacowany czas do ukończenia: ~2-3 minuty</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((questionIndex + 1) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Mobile Preview Toggle Button */}
          <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setMobileTab('chat')}
              className={`px-3 py-1 rounded-lg transition ${
                mobileTab === 'chat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
              }`}
            >
              Pytania
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`px-3 py-1 rounded-lg transition ${
                mobileTab === 'preview' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              Podgląd CV
            </button>
          </div>
        </div>
      </div>

      {/* Main Guided Split Layout */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Side: Conversational Question Card */}
        <div
          className={`lg:col-span-6 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md space-y-6 ${
            mobileTab === 'preview' ? 'hidden lg:block' : 'block'
          }`}
        >
          {/* Question Title */}
          <div>
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
              Krok {questionIndex + 1} z 5
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] leading-snug">
              {questions[questionIndex].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
              {questions[questionIndex].subtitle}
            </p>
          </div>

          {/* STEP 1: Personal Info */}
          {questionIndex === 0 && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Jak się nazywasz?</label>
                <input
                  type="text"
                  value={cv.personalInfo.fullName}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, fullName: e.target.value }
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 font-semibold text-sm transition"
                  placeholder="np. Alicja Dąbrowska"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">O jakie stanowisko się ubiegasz?</label>
                <input
                  type="text"
                  value={cv.personalInfo.jobTitle}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, jobTitle: e.target.value }
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 font-semibold text-sm transition"
                  placeholder="np. Senior Operations & Project Lead"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Telefon kontaktowy</label>
                  <input
                    type="text"
                    value={cv.personalInfo.phone}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, phone: e.target.value }
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Miasto i gotowość (lokalizacja)</label>
                <input
                  type="text"
                  value={cv.personalInfo.location}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, location: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 text-slate-900 font-medium"
                  placeholder="np. Warszawa, Polska (hybrydowo)"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Experience & STAR */}
          {questionIndex === 1 && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start justify-between gap-3">
                <div>
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1 text-sm">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Wskazówka Rekrutera: Metoda STAR
                  </div>
                  <p className="text-[11.5px] text-emerald-900 leading-relaxed">
                    Opisz sytuację, podjęte działanie i <strong>konkretną liczbę</strong> (np. wzrost zysku, procent oszczędności, redukcja czasu).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleInsertStarBullet}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
                >
                  Wstaw wzorcowy STAR
                </button>
              </div>

              {cv.experiences.map((exp, idx) => (
                <div key={exp.id || idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="font-bold text-slate-800 text-sm">Główne Stanowisko Zawodowe</div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = [...cv.experiences];
                        updated[idx] = { ...updated[idx], role: e.target.value };
                        onChangeCv({ ...cv, experiences: updated });
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-semibold"
                      placeholder="Stanowisko"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...cv.experiences];
                        updated[idx] = { ...updated[idx], company: e.target.value };
                        onChangeCv({ ...cv, experiences: updated });
                      }}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200"
                      placeholder="Pracodawca"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Kluczowe osiągnięcie na tym stanowisku:
                    </label>
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
                      className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-slate-200 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 3: Skills */}
          {questionIndex === 2 && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Kliknij, aby dodać rekomendowaną umiejętność do Twojego CV:
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestedSkills.map((sk) => {
                    const isAdded = cv.technicalSkills.includes(sk);
                    return (
                      <button
                        key={sk}
                        type="button"
                        onClick={() => handleAddSkill(sk)}
                        className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50'
                        }`}
                      >
                        {isAdded && <Check className="w-3.5 h-3.5" />}
                        <span>{sk}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add custom skill input */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <input
                  type="text"
                  value={addedSkill}
                  onChange={(e) => setAddedSkill(e.target.value)}
                  placeholder="Wpisz inną umiejętność..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition"
                >
                  Dodaj
                </button>
              </form>

              {/* RODO statement reassurance */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-[11px] text-slate-600">
                  <strong className="text-slate-900 block">Automatyczna Klauzula RODO 2026</strong>
                  Do każdego dokumentu automatycznie dodajemy aktualną klauzulę prawną wymaganą przez polski Kodeks Pracy.
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Choose Template */}
          {questionIndex === 3 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'modern-polish' as TemplateId, name: 'Modern Polish Pro', tag: 'Standard RP', desc: 'Klasyczny panel boczny z foto i certyfikatami.' },
                  { id: 'swiss-executive' as TemplateId, name: 'Swiss Executive', tag: 'Dyrektorski', desc: 'Prestiżowy układ dla kadry zarządzającej.' },
                  { id: 'clean-ats' as TemplateId, name: 'Clean ATS Minimal', tag: '100% Parsowania', desc: 'Jednokolumnowy układ pod roboty rekrutacyjne.' },
                  { id: 'creative-tech' as TemplateId, name: 'Creative Tech', tag: 'IT & Startupy', desc: 'Nowoczesne karty umiejętności i projekty.' }
                ].map((tpl) => {
                  const isSelected = cv.templateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => onChangeCv({ ...cv, templateId: tpl.id })}
                      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/40 ring-3 ring-emerald-500/20 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-sm text-slate-900">{tpl.name}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {tpl.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{tpl.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Download */}
          {questionIndex === 4 && (
            <div className="space-y-5 text-xs text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 text-emerald-600 mx-auto flex items-center justify-center">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Twoje CV spełnia wszystkie kryteria!
                </h3>
                <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                  Możesz natychmiast wydrukować lub pobrać czysty plik PDF (A4) do wysyłki na Pracuj.pl, LinkedIn lub bezpośrednio do rekrutera.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-left space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Kandydat:</span>
                  <span className="font-bold text-slate-800">{cv.personalInfo.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Wybrany styl:</span>
                  <span className="font-bold text-emerald-700">{cv.templateId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status prawny:</span>
                  <span className="font-bold text-slate-800">RODO 2026 OK</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 mx-auto cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Pobierz / Drukuj Gotowe CV (PDF)</span>
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              disabled={questionIndex === 0}
              onClick={() => setQuestionIndex((q) => Math.max(0, q - 1))}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                questionIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wstecz</span>
            </button>

            {questionIndex < 4 ? (
              <button
                type="button"
                onClick={() => setQuestionIndex((q) => Math.min(4, q + 1))}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Dalej</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onStepChange('download')}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Zakończ i Przejdź</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Sticky Live Document Canvas */}
        <div
          className={`lg:col-span-6 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-md flex flex-col items-center ${
            mobileTab === 'chat' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">Aktualizowany Dokument na Żywo</span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-600" />
              <span>Drukuj A4</span>
            </button>
          </div>

          <div className="w-full overflow-x-auto flex justify-center py-2 bg-slate-100/70 rounded-2xl">
            <ResumeCanvas cv={cv} zoom={0.78} />
          </div>
        </div>
      </main>
    </div>
  );
};
