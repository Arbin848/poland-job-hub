import React, { useState, useEffect, useRef } from 'react';
import { CVData } from '../../../types/cv';
import { THEME } from '../tokens';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import {
  Edit3,
  Eye,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Printer,
  Sparkles,
  Palette,
  Smartphone,
  Maximize2,
  Plus,
  Trash2,
  ShieldCheck,
  Briefcase,
  User,
  GraduationCap,
  Wrench,
  Globe
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  onOpenTemplates: () => void;
  onPrintPdf: () => void;
}

export const MobileGuidedView: React.FC<Props> = ({
  cv,
  onChangeCv,
  onOpenTemplates,
  onPrintPdf
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [step, setStep] = useState<number>(1);
  const [previewFrameMode, setPreviewFrameMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return false;
    return true;
  }); // Desktop phone mockup frame toggle
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvasScale, setCanvasScale] = useState<number>(0.42);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('mobile-preview') || hash.includes('preview-canvas')) {
        setActiveTab('preview');
      }
      if (window.innerWidth < 640) {
        setPreviewFrameMode(false);
      }
    }
  }, []);

  const totalSteps = 5;
  const stepTitles = [
    'Dane Osobowe & Kontakt',
    'Podsumowanie Zawodowe',
    'Doświadczenie & Obowiązki',
    'Umiejętności & Języki',
    'RODO & Pobieranie PDF'
  ];

  // Dynamically calculate mobile A4 canvas scale to prevent horizontal scroll at 360px, 390px, 430px
  useEffect(() => {
    const updateCanvasScale = () => {
      if (canvasContainerRef.current) {
        const containerW = canvasContainerRef.current.clientWidth;
        // Available width inside container with padding (16px padding on sides)
        const availableW = Math.max(280, containerW - 24);
        // 820px is CV canvas standard width
        const calculated = Math.min(0.55, Math.max(0.34, availableW / 820));
        setCanvasScale(calculated);
      }
    };

    updateCanvasScale();
    window.addEventListener('resize', updateCanvasScale);
    return () => window.removeEventListener('resize', updateCanvasScale);
  }, [activeTab, previewFrameMode]);

  const inputClass =
    'w-full px-3.5 py-3 text-sm bg-white border border-[#E5E8F3] rounded-xl text-[#18233F] placeholder-[#75819C]/60 focus:border-[#6250F4] focus:ring-4 focus:ring-[#6250F4]/10 focus:outline-hidden min-h-[46px] transition-all';
  const labelClass = 'block text-xs font-bold text-[#18233F] mb-1.5';

  return (
    <div className="min-h-screen bg-[#F0F2F9] flex flex-col justify-between text-[#18233F] py-2 sm:py-6">
      {/* Desktop Mode Switcher Banner (Phone frame vs Full Width) */}
      <div className="hidden lg:flex items-center justify-center gap-3 mb-4">
        <span className="text-xs text-[#75819C] font-semibold">Tryb testowania mobilnego:</span>
        <button
          type="button"
          onClick={() => setPreviewFrameMode(true)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
            previewFrameMode
              ? 'bg-[#6250F4] text-white shadow-xs'
              : 'bg-white text-[#18233F] border border-[#E5E8F3]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Ramka Smartfona (390px iPhone)</span>
        </button>
        <button
          type="button"
          onClick={() => setPreviewFrameMode(false)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
            !previewFrameMode
              ? 'bg-[#6250F4] text-white shadow-xs'
              : 'bg-white text-[#18233F] border border-[#E5E8F3]'
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Pełna Szerokość Ekranu</span>
        </button>
      </div>

      {/* Main Smartphone Shell */}
      <div
        className={`mx-auto w-full transition-all duration-300 ${
          previewFrameMode
            ? 'max-w-[412px] bg-white rounded-3xl sm:rounded-[40px] shadow-2xl border-0 sm:border-[8px] sm:border-slate-800 overflow-hidden min-h-[820px] flex flex-col justify-between'
            : 'max-w-2xl bg-white rounded-2xl shadow-sm border border-[#E5E8F3] overflow-hidden flex flex-col justify-between'
        }`}
      >
        {/* Compact Phone Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E5E8F3] px-4 py-2.5 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6250F4] to-[#A447F4] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
              PJ
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs font-extrabold text-[#18233F] truncate">PolJobHub Mobile</h1>
                <span className="text-[10px] font-bold text-[#6250F4] bg-[#6250F4]/10 px-1.5 py-0.2 rounded">
                  {step}/{totalSteps}
                </span>
              </div>
              <div className="text-[10px] text-[#75819C] font-medium truncate">
                {stepTitles[step - 1]}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenTemplates}
            className="p-2 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] text-[#6250F4] flex items-center gap-1 text-xs font-bold hover:bg-slate-50 transition shrink-0 min-h-[44px]"
            title="Zmień Szablon"
          >
            <Palette className="w-4 h-4" />
            <span className="text-[11px]">Szablon</span>
          </button>
        </header>

        {/* Step Progress Line */}
        <div className="w-full h-1 bg-slate-100 overflow-hidden">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{
              width: `${(step / totalSteps) * 100}%`,
              background: THEME.colors.gradient
            }}
          />
        </div>

        {/* Segmented Switcher: Edytor vs Podgląd A4 (44px min touch target) */}
        <div className="bg-[#F8F9FF] border-b border-[#E5E8F3] p-2 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition min-h-[44px] cursor-pointer ${
              activeTab === 'edit'
                ? 'bg-white text-[#6250F4] shadow-xs border border-[#E5E8F3]'
                : 'text-[#75819C] hover:text-[#18233F]'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Formularz</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition min-h-[44px] cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-[#6250F4] text-white shadow-xs'
                : 'text-[#75819C] hover:text-[#18233F]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Podgląd A4</span>
          </button>
        </div>

        {/* Main Body (Keyboard safe scrolling with bottom padding for sticky bar) */}
        <main className="flex-1 overflow-y-auto p-4 pb-28">
          {activeTab === 'edit' ? (
            <div className="space-y-4">
              {/* STEP 1: PERSONAL DETAILS */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
                    <User className="w-4 h-4 text-[#6250F4] shrink-0 mt-0.5" />
                    <span>Wprowadź swoje imię, docelowe stanowisko oraz dane kontaktowe.</span>
                  </div>

                  <div>
                    <label className={labelClass}>Imię i Nazwisko *</label>
                    <input
                      type="text"
                      value={cv.personalInfo.fullName}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, fullName: e.target.value }
                        })
                      }
                      placeholder="np. Alicja Dąbrowska"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Stanowisko Zawodowe *</label>
                    <input
                      type="text"
                      value={cv.personalInfo.jobTitle}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, jobTitle: e.target.value }
                        })
                      }
                      placeholder="np. Operations & Process Lead"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Telefon Kontaktowy *</label>
                    <input
                      type="tel"
                      value={cv.personalInfo.phone}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, phone: e.target.value }
                        })
                      }
                      placeholder="+48 501 234 567"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Adres E-mail *</label>
                    <input
                      type="email"
                      value={cv.personalInfo.email}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, email: e.target.value }
                        })
                      }
                      placeholder="kontakt@example.pl"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Miasto / Lokalizacja</label>
                    <input
                      type="text"
                      value={cv.personalInfo.location}
                      onChange={(e) =>
                        onChangeCv({
                          ...cv,
                          personalInfo: { ...cv.personalInfo, location: e.target.value }
                        })
                      }
                      placeholder="Warszawa (lub praca hybrydowa)"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: SUMMARY */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#6250F4] shrink-0 mt-0.5" />
                    <span>Napisz 2-3 zdania o swoich sukcesach i kompetencjach.</span>
                  </div>

                  <div>
                    <label className={labelClass}>Podsumowanie Twojej Kariery</label>
                    <textarea
                      rows={6}
                      value={cv.summary}
                      onChange={(e) => onChangeCv({ ...cv, summary: e.target.value })}
                      placeholder="Certyfikowany specjalista z doświadczeniem w optymalizacji procesów..."
                      className={`${inputClass} leading-relaxed`}
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#75819C]">
                      Miejsca pracy ({cv.experiences.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newExp = {
                          id: `exp-${Date.now()}`,
                          role: 'Nowe Stanowisko',
                          company: 'Firma / Pracodawca',
                          location: 'Polska',
                          startDate: '2023-01',
                          endDate: 'obecnie',
                          current: true,
                          bullets: ['Realizacja kluczowych projektów operacyjnych.']
                        };
                        onChangeCv({
                          ...cv,
                          experiences: [newExp, ...cv.experiences]
                        });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#6250F4]/10 text-[#6250F4] font-bold text-xs flex items-center gap-1 min-h-[44px]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Dodaj</span>
                    </button>
                  </div>

                  {cv.experiences.map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className="p-3.5 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-black text-[#18233F]">
                          #{idx + 1} {exp.role}
                        </strong>
                        <button
                          type="button"
                          onClick={() => {
                            onChangeCv({
                              ...cv,
                              experiences: cv.experiences.filter((_, i) => i !== idx)
                            });
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1"
                          title="Usuń"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        placeholder="Rola / Stanowisko"
                        className={inputClass}
                      />

                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], company: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        placeholder="Nazwa Firmy"
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* STEP 4: SKILLS & LANGUAGES */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Umiejętności Kluczowe</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cv.technicalSkills.map((sk, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-[#6250F4]/10 text-[#6250F4] font-bold text-xs flex items-center gap-1"
                        >
                          <span>{sk}</span>
                          <button
                            type="button"
                            onClick={() => {
                              onChangeCv({
                                ...cv,
                                technicalSkills: cv.technicalSkills.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-[#6250F4] hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="mobile-skill-input"
                        placeholder="Dodaj umiejętność (np. SAP, Excel)"
                        className={inputClass}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val && !cv.technicalSkills.includes(val)) {
                              onChangeCv({
                                ...cv,
                                technicalSkills: [...cv.technicalSkills, val]
                              });
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById('mobile-skill-input') as HTMLInputElement;
                          if (el && el.value.trim()) {
                            const val = el.value.trim();
                            if (!cv.technicalSkills.includes(val)) {
                              onChangeCv({
                                ...cv,
                                technicalSkills: [...cv.technicalSkills, val]
                              });
                              el.value = '';
                            }
                          }
                        }}
                        className="px-4 rounded-xl bg-[#6250F4] text-white text-xs font-bold shrink-0 min-h-[46px]"
                      >
                        Dodaj
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <label className={labelClass}>Języki Obce</label>
                    {cv.languages.map((l, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] mb-2"
                      >
                        <span className="text-xs font-bold text-[#18233F]">{l.language}</span>
                        <span className="text-xs font-mono font-bold text-[#6250F4] bg-[#6250F4]/10 px-2 py-0.5 rounded">
                          {l.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: RODO & FINALIZE */}
              {step === 5 && (
                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-xl text-xs leading-relaxed flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Klauzula RODO 2026 w Polsce:</strong> Zgoda na przetwarzanie danych osobowych jest automatycznie wygenerowana i osadzona na dole CV.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#18233F]">
                      <span>Szablon Dokumentu:</span>
                      <span className="text-[#6250F4] capitalize">{cv.templateId.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold text-[#18233F]">
                      <span>Format Pliku:</span>
                      <span className="font-mono text-slate-600">A4 (210×297 mm) PDF</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onPrintPdf}
                    className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95 min-h-[48px]"
                    style={{ background: THEME.colors.gradient }}
                  >
                    <Printer className="w-4 h-4 text-amber-300" />
                    <span>Pobierz Gotowe CV (PDF)</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Live Canvas on Mobile with Auto-Fit (Zero horizontal scroll) */
            <div ref={canvasContainerRef} className="flex flex-col items-center w-full">
              <div className="w-full mb-2 flex items-center justify-between text-xs px-1">
                <span className="font-bold text-[#75819C]">Podgląd A4 (Auto-dopasowanie)</span>
                <button
                  type="button"
                  onClick={onPrintPdf}
                  className="text-[#6250F4] font-bold hover:underline flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Drukuj</span>
                </button>
              </div>

              {/* Scaled Preview Box that strictly avoids horizontal overflow */}
              <div className="w-full overflow-hidden flex justify-center bg-slate-200/60 p-2 rounded-2xl border border-slate-300/80">
                <ResumeCanvas cv={cv} zoom={canvasScale} />
              </div>
            </div>
          )}
        </main>

        {/* Sticky Bottom Stepper Bar (Min 44px touch targets) */}
        <footer className="sticky bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E5E8F3] p-3 flex items-center justify-between gap-3 shadow-lg shrink-0">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-4 py-3 rounded-xl border border-[#E5E8F3] text-xs font-bold text-[#75819C] disabled:opacity-30 disabled:pointer-events-none min-h-[44px] transition flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Wstecz</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#18233F]">
            {step} / {totalSteps}
          </span>

          <button
            type="button"
            onClick={() => {
              if (step < totalSteps) {
                setStep((s) => s + 1);
              } else {
                setActiveTab('preview');
              }
            }}
            className="px-5 py-3 rounded-xl text-xs font-bold text-white shadow-md min-h-[44px] flex items-center gap-1.5 cursor-pointer hover:opacity-95 transition"
            style={{ background: THEME.colors.gradient }}
          >
            <span>{step === totalSteps ? 'Zobacz Podgląd A4' : 'Dalej'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
};
