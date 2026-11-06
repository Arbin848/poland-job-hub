import React, { useState } from 'react';
import { CVData, TemplateId } from '../../../types/cv';
import { THEME } from '../tokens';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import { AiAssistantWidget } from './AiAssistantWidget';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Award,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Printer,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Plus,
  Trash2,
  HelpCircle,
  Palette,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Compass,
  Check
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  onOpenTemplatesModal: () => void;
  onPrintPdf: () => void;
}

type SectionKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'rodo';

export const ThreePanelEditor: React.FC<Props> = ({
  cv,
  onChangeCv,
  onOpenTemplatesModal,
  onPrintPdf
}) => {
  const [activeSection, setActiveSection] = useState<SectionKey>('personal');
  const [zoom, setZoom] = useState<number>(0.92);
  const [guidedMode, setGuidedMode] = useState<boolean>(true);

  const sections: {
    key: SectionKey;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    isDone: boolean;
  }[] = [
    {
      key: 'personal',
      label: 'Dane Osobowe & Kontakt',
      shortLabel: 'Dane Osobowe',
      icon: <User className="w-4 h-4" />,
      isDone: Boolean(cv.personalInfo.fullName && cv.personalInfo.email && cv.personalInfo.phone)
    },
    {
      key: 'summary',
      label: 'Podsumowanie Zawodowe',
      shortLabel: 'Podsumowanie',
      icon: <FileText className="w-4 h-4" />,
      isDone: Boolean(cv.summary && cv.summary.length >= 40)
    },
    {
      key: 'experience',
      label: 'Doświadczenie Pracy',
      shortLabel: 'Doświadczenie',
      icon: <Briefcase className="w-4 h-4" />,
      isDone: cv.experiences.length > 0
    },
    {
      key: 'education',
      label: 'Edukacja & Studia',
      shortLabel: 'Edukacja',
      icon: <GraduationCap className="w-4 h-4" />,
      isDone: cv.educations.length > 0
    },
    {
      key: 'skills',
      label: 'Umiejętności & Narzędzia',
      shortLabel: 'Umiejętności',
      icon: <Wrench className="w-4 h-4" />,
      isDone: cv.technicalSkills.length >= 3
    },
    {
      key: 'languages',
      label: 'Języki Obce (CEFR)',
      shortLabel: 'Języki',
      icon: <Globe className="w-4 h-4" />,
      isDone: cv.languages.length > 0
    },
    {
      key: 'certifications',
      label: 'Uprawnienia & Certyfikaty',
      shortLabel: 'Certyfikaty',
      icon: <Award className="w-4 h-4" />,
      isDone: cv.certifications.length > 0 || cv.projects.length > 0
    },
    {
      key: 'rodo',
      label: 'Klauzula RODO 2026',
      shortLabel: 'Zgoda RODO',
      icon: <ShieldCheck className="w-4 h-4" />,
      isDone: Boolean(cv.rodo.enabled && cv.rodo.text.length >= 25)
    }
  ];

  const completedCount = sections.filter((s) => s.isDone).length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);
  const currentIdx = sections.findIndex((s) => s.key === activeSection);

  const handleNext = () => {
    if (currentIdx < sections.length - 1) {
      setActiveSection(sections[currentIdx + 1].key);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setActiveSection(sections[currentIdx - 1].key);
    }
  };

  const paletteColors = [
    { hex: '#6250F4', label: 'Indigo' },
    { hex: '#1e3a8a', label: 'Navy' },
    { hex: '#0f766e', label: 'Teal' },
    { hex: '#0f172a', label: 'Slate' },
    { hex: '#b91c1c', label: 'Burgundy' },
    { hex: '#78350f', label: 'Bronze' }
  ];

  // Helper input classes with refined focus effects
  const inputClass =
    'w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#E5E8F3] rounded-xl text-[#18233F] placeholder-[#75819C]/60 hover:border-[#6250F4]/40 focus:border-[#6250F4] focus:ring-4 focus:ring-[#6250F4]/10 focus:outline-hidden transition-all duration-150';
  const labelClass = 'block text-xs font-bold text-[#18233F] mb-1.5 flex items-center justify-between';

  return (
    <div className="w-full h-[calc(100vh-68px)] flex flex-col lg:flex-row bg-[#F8F9FF] overflow-hidden text-[#18233F]">
      {/* ========================================================
          PANEL 1: LEFT NAVIGATION & PROGRESS (Desktop 22% width)
         ======================================================== */}
      <aside className="hidden lg:flex w-[260px] xl:w-[280px] bg-white border-r border-[#E5E8F3] flex-col justify-between p-4 shrink-0 shadow-xs z-10">
        <div className="space-y-5">
          {/* Progress Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F8F9FF] to-white border border-[#E5E8F3] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#75819C] uppercase tracking-wider block">
                  Status Dokumentu
                </span>
                <span className="font-extrabold text-xs text-[#18233F]">
                  Ukończono {completedCount} z {sections.length} sekcji
                </span>
              </div>
              <span className="font-mono font-black text-sm text-[#6250F4] bg-[#6250F4]/10 px-2 py-0.5 rounded-lg">
                {progressPercent}%
              </span>
            </div>

            {/* Gradient Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: THEME.colors.gradient
                }}
              />
            </div>

            <div className="text-[10.5px] text-[#75819C] flex items-center justify-between pt-0.5">
              <span>{progressPercent === 100 ? 'Kompletne CV' : 'Wypełnij kluczowe pola'}</span>
              {progressPercent === 100 && (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Gotowe
                </span>
              )}
            </div>
          </div>

          {/* Stepper Navigation Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-[10.5px] font-bold text-[#75819C] uppercase tracking-wider">
                Kroki Kreatora
              </span>
              <button
                type="button"
                onClick={() => setGuidedMode((v) => !v)}
                className="text-[10px] text-[#6250F4] font-bold hover:underline cursor-pointer"
              >
                {guidedMode ? 'Tryb Krok po Kroku' : 'Tryb Dowolny'}
              </button>
            </div>

            {/* Section Buttons */}
            <nav className="space-y-1" aria-label="Nawigacja sekcji CV">
              {sections.map((s, idx) => {
                const isActive = activeSection === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setActiveSection(s.key)}
                    className={`w-full px-3 py-2.5 rounded-xl text-left transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-[#6250F4] text-white font-bold shadow-md shadow-[#6250F4]/25 translate-x-0.5'
                        : 'text-[#75819C] hover:text-[#18233F] hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Step Number / Icon Badge */}
                      <span
                        className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : s.isDone
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-[#75819C]'
                        }`}
                      >
                        {s.isDone && !isActive ? '✓' : idx + 1}
                      </span>
                      <span className="text-xs truncate">{s.shortLabel}</span>
                    </div>

                    {s.isDone && (
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/25 text-white' : 'text-emerald-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Helper Info */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-[#E5E8F3] text-[11px] text-[#75819C] space-y-1.5">
          <div className="font-extrabold text-[#18233F] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#6250F4]" />
            <span>Wskazówka Rekrutera</span>
          </div>
          <p className="text-[10.5px] leading-relaxed">
            Rekruter w Polsce poświęca średnio <strong>6 sekund</strong> na pierwsze przeskanowanie CV. Utrzymuj podsumowanie zwięzłe i podawaj twarde liczby.
          </p>
        </div>
      </aside>

      {/* ========================================================
          PANEL 2: CENTER FORM EDITOR (Desktop 38% width)
         ======================================================== */}
      <main className="w-full lg:w-[440px] xl:w-[480px] bg-white border-r border-[#E5E8F3] flex flex-col justify-between shrink-0 h-full overflow-hidden z-10 shadow-xs">
        {/* Editor Form Header */}
        <div className="px-5 py-3.5 border-b border-[#E5E8F3] flex items-center justify-between shrink-0 bg-[#F8F9FF]/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold text-[#6250F4] uppercase tracking-wider bg-[#6250F4]/10 px-2 py-0.5 rounded-md">
                Krok {currentIdx + 1} z {sections.length}
              </span>
              <span className="text-xs text-[#75819C] font-semibold">
                {sections[currentIdx]?.isDone ? '✓ Ukończone' : 'Wymaga danych'}
              </span>
            </div>
            <h2 className="text-base font-black text-[#18233F] mt-0.5">
              {sections[currentIdx]?.label}
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenTemplatesModal}
            className="px-2.5 py-1.5 rounded-xl bg-white border border-[#E5E8F3] hover:border-[#6250F4] text-xs font-bold text-[#6250F4] flex items-center gap-1 shadow-2xs transition cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Szablony</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* SECTION 1: PERSONAL INFO */}
          {activeSection === 'personal' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#6250F4] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  W Polsce standardem jest podanie imienia, nazwiska, numeru telefonu, e-maila oraz miejscowości.
                </span>
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
                <label className={labelClass}>Docelowe Stanowisko Zawodowe *</label>
                <input
                  type="text"
                  value={cv.personalInfo.jobTitle}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, jobTitle: e.target.value }
                    })
                  }
                  placeholder="np. Operations & Process Team Lead"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={labelClass}>
                    <span>Adres E-mail *</span>
                    <Mail className="w-3 h-3 text-[#75819C]" />
                  </label>
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
                  <label className={labelClass}>
                    <span>Telefon *</span>
                    <Phone className="w-3 h-3 text-[#75819C]" />
                  </label>
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className={labelClass}>
                    <span>Lokalizacja / Miasto</span>
                    <MapPin className="w-3 h-3 text-[#75819C]" />
                  </label>
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
                <div>
                  <label className={labelClass}>
                    <span>Profil LinkedIn</span>
                    <Linkedin className="w-3 h-3 text-[#75819C]" />
                  </label>
                  <input
                    type="text"
                    value={cv.personalInfo.linkedIn || ''}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, linkedIn: e.target.value }
                      })
                    }
                    placeholder="linkedin.com/in/twoj-profil"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Work Eligibility Badge Toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#18233F]">
                  <input
                    type="checkbox"
                    checked={Boolean(cv.personalInfo.showWorkPermitBadge)}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: {
                          ...cv.personalInfo,
                          showWorkPermitBadge: e.target.checked
                        }
                      })
                    }
                    className="w-4 h-4 rounded text-[#6250F4] focus:ring-[#6250F4]"
                  />
                  <span>Pokaż pasek statusu prawa do pracy w Polsce (RP Status)</span>
                </label>
                {cv.personalInfo.showWorkPermitBadge && (
                  <input
                    type="text"
                    value={cv.personalInfo.workEligibility || ''}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        personalInfo: { ...cv.personalInfo, workEligibility: e.target.value }
                      })
                    }
                    placeholder="np. Obywatelstwo UE / Brak wymogu zezwolenia na pracę w RP"
                    className={`${inputClass} mt-2`}
                  />
                )}
              </div>
            </div>
          )}

          {/* SECTION 2: SUMMARY */}
          {activeSection === 'summary' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#6250F4] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Napisz 3-4 zdania podsumowujące Twoje kluczowe kompetencje, lata stażu oraz największe osiągnięcie z mierzalnymi liczbami.
                </span>
              </div>

              <div>
                <label className={labelClass}>
                  <span>Treść Podsumowania Zawodowego</span>
                  <span className="text-[10px] text-[#75819C] font-mono">
                    {cv.summary?.length || 0} znaków
                  </span>
                </label>
                <textarea
                  rows={6}
                  value={cv.summary}
                  onChange={(e) => onChangeCv({ ...cv, summary: e.target.value })}
                  placeholder="Doświadczony specjalista z 6-letnim stażem w branży..."
                  className={`${inputClass} leading-relaxed`}
                />
              </div>

              {/* Gemini STAR Method Assistant Pill Card */}
              <AiAssistantWidget
                currentText={cv.summary || 'Koordynacja projektów logistycznych i optymalizacja procesów'}
                jobTitle={cv.personalInfo.jobTitle || 'Operations Lead'}
                onApplySuggestion={(text) =>
                  onChangeCv({
                    ...cv,
                    summary: cv.summary ? `${cv.summary} ${text}` : text
                  })
                }
              />
            </div>
          )}

          {/* SECTION 3: EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#75819C]">
                  Pozycje zawodowe ({cv.experiences.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newExp = {
                      id: `exp-${Date.now()}`,
                      role: 'Nowe Stanowisko',
                      company: 'Nazwa Firmy',
                      location: 'Warszawa, Polska',
                      startDate: '2023-01',
                      endDate: 'obecnie',
                      current: true,
                      bullets: [
                        'Realizacja kluczowych celów biznesowych i optymalizacja procesów.',
                        'Współpraca z interdyscyplinarnym zespołem w metodologii Agile.'
                      ]
                    };
                    onChangeCv({
                      ...cv,
                      experiences: [newExp, ...cv.experiences]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#6250F4]/10 hover:bg-[#6250F4]/20 text-[#6250F4] font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Dodaj Doświadczenie</span>
                </button>
              </div>

              {cv.experiences.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="p-4 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#18233F]">
                      Stanowisko #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeCv({
                          ...cv,
                          experiences: cv.experiences.filter((_, i) => i !== idx)
                        });
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1 text-xs transition cursor-pointer"
                      title="Usuń pozycję"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Rola / Tytuł
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Firma / Pracodawca
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], company: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Data Rozpoczęcia
                      </label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], startDate: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        placeholder="np. 2021-03"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Data Zakończenia
                      </label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => {
                          const updated = [...cv.experiences];
                          updated[idx] = { ...updated[idx], endDate: e.target.value };
                          onChangeCv({ ...cv, experiences: updated });
                        }}
                        placeholder="np. obecnie"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10.5px] font-bold text-[#18233F] block">
                      Obowiązki i Osiągnięcia (Metoda STAR):
                    </label>
                    {exp.bullets.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <span className="text-[#6250F4] font-bold text-xs">•</span>
                        <input
                          type="text"
                          value={b}
                          onChange={(e) => {
                            const updated = [...cv.experiences];
                            const bullets = [...updated[idx].bullets];
                            bullets[bIdx] = e.target.value;
                            updated[idx] = { ...updated[idx], bullets };
                            onChangeCv({ ...cv, experiences: updated });
                          }}
                          className={inputClass}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#75819C]">
                  Pozycje edukacyjne ({cv.educations.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newEdu = {
                      id: `edu-${Date.now()}`,
                      institution: 'Uniwersytet / Politechnika',
                      degree: 'Magister / Licencjat',
                      faculty: 'Wydział Zarządzania',
                      fieldOfStudy: 'Zarządzanie i Inżynieria Produkcji',
                      startDate: '2016',
                      endDate: '2021'
                    };
                    onChangeCv({
                      ...cv,
                      educations: [newEdu, ...cv.educations]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#6250F4]/10 hover:bg-[#6250F4]/20 text-[#6250F4] font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Dodaj Uczelnię</span>
                </button>
              </div>

              {cv.educations.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="p-4 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#18233F]">
                      Edukacja #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onChangeCv({
                          ...cv,
                          educations: cv.educations.filter((_, i) => i !== idx)
                        });
                      }}
                      className="text-rose-500 hover:text-rose-700 p-1 text-xs cursor-pointer"
                      title="Usuń wpis"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                      Uczelnia / Szkoła
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...cv.educations];
                        updated[idx] = { ...updated[idx], institution: e.target.value };
                        onChangeCv({ ...cv, educations: updated });
                      }}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Kierunek Studiów
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => {
                          const updated = [...cv.educations];
                          updated[idx] = { ...updated[idx], fieldOfStudy: e.target.value };
                          onChangeCv({ ...cv, educations: updated });
                        }}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10.5px] font-bold text-[#18233F] block mb-1">
                        Uzyskany Tytuł
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => {
                          const updated = [...cv.educations];
                          updated[idx] = { ...updated[idx], degree: e.target.value };
                          onChangeCv({ ...cv, educations: updated });
                        }}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 5: SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Umiejętności Twarde i Techniczne</label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {cv.technicalSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6250F4]/10 text-[#6250F4] font-bold text-xs"
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
                        className="hover:text-rose-600 transition cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="new-skill-input"
                    placeholder="Wpisz umiejętność i naciśnij Dodaj (np. SAP ERP, SQL, Lean Six Sigma)"
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
                      const input = document.getElementById('new-skill-input') as HTMLInputElement;
                      if (input && input.value.trim()) {
                        const val = input.value.trim();
                        if (!cv.technicalSkills.includes(val)) {
                          onChangeCv({
                            ...cv,
                            technicalSkills: [...cv.technicalSkills, val]
                          });
                          input.value = '';
                        }
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#6250F4] text-white text-xs font-bold hover:bg-[#5240e3] transition cursor-pointer shrink-0"
                  >
                    Dodaj
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <label className={labelClass}>Umiejętności Miękkie</label>
                <div className="flex flex-wrap gap-1.5">
                  {cv.softSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#18233F] text-xs font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 6: LANGUAGES */}
          {activeSection === 'languages' && (
            <div className="space-y-4">
              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-950">
                W standardzie europejskim poziomy językowe określa się według skali CEFR (A1 – Podstawowy do C2 – Biegły, Native).
              </div>

              {cv.languages.map((l, idx) => (
                <div
                  key={l.id || idx}
                  className="p-3.5 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] flex items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <input
                      type="text"
                      value={l.language}
                      onChange={(e) => {
                        const updated = [...cv.languages];
                        updated[idx] = { ...updated[idx], language: e.target.value };
                        onChangeCv({ ...cv, languages: updated });
                      }}
                      className={inputClass}
                      placeholder="Język (np. Angielski, Niemiecki)"
                    />
                  </div>

                  <div className="w-32">
                    <select
                      value={l.level}
                      onChange={(e) => {
                        const updated = [...cv.languages];
                        updated[idx] = { ...updated[idx], level: e.target.value as any };
                        onChangeCv({ ...cv, languages: updated });
                      }}
                      className={`${inputClass} font-bold text-[#6250F4] cursor-pointer`}
                    >
                      <option value="A1">A1 (Początkujący)</option>
                      <option value="A2">A2 (Podstawowy)</option>
                      <option value="B1">B1 (Średniozaaw.)</option>
                      <option value="B2">B2 (Ponadśredni)</option>
                      <option value="C1">C1 (Zaawansowany)</option>
                      <option value="C2">C2 (Biegły)</option>
                      <option value="Native">Ojczysty</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 7: CERTIFICATIONS */}
          {activeSection === 'certifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#75819C]">
                  Certyfikaty i Uprawnienia ({cv.certifications.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newCert = {
                      id: `cert-${Date.now()}`,
                      name: 'Nowy Certyfikat',
                      issuer: 'Instytucja Certyfikująca',
                      date: '2024'
                    };
                    onChangeCv({
                      ...cv,
                      certifications: [...cv.certifications, newCert]
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#6250F4]/10 hover:bg-[#6250F4]/20 text-[#6250F4] font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Dodaj Certyfikat</span>
                </button>
              </div>

              {cv.certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="p-3.5 rounded-2xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-2"
                >
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...cv.certifications];
                      updated[idx] = { ...updated[idx], name: e.target.value };
                      onChangeCv({ ...cv, certifications: updated });
                    }}
                    placeholder="Nazwa certyfikatu (np. Lean Six Sigma Green Belt)"
                    className={inputClass}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => {
                        const updated = [...cv.certifications];
                        updated[idx] = { ...updated[idx], issuer: e.target.value };
                        onChangeCv({ ...cv, certifications: updated });
                      }}
                      placeholder="Wydawca"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => {
                        const updated = [...cv.certifications];
                        updated[idx] = { ...updated[idx], date: e.target.value };
                        onChangeCv({ ...cv, certifications: updated });
                      }}
                      placeholder="Rok / Data"
                      className={inputClass}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 8: RODO CLAUSE 2026 */}
          {activeSection === 'rodo' && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded-xl text-xs leading-relaxed">
                ✓ <strong>Klauzula RODO 2026:</strong> Wymagana przez 99% pracodawców i agencji zatrudnienia w Polsce. Bez tej formułki Twoje CV może zostać odrzucone z przyczyn formalnych.
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#18233F]">
                  <input
                    type="checkbox"
                    checked={cv.rodo.enabled}
                    onChange={(e) =>
                      onChangeCv({
                        ...cv,
                        rodo: { ...cv.rodo, enabled: e.target.checked }
                      })
                    }
                    className="w-4 h-4 rounded text-[#6250F4] focus:ring-[#6250F4]"
                  />
                  <span>Dołącz klauzulę RODO do stopki dokumentu</span>
                </label>

                <textarea
                  rows={4}
                  value={cv.rodo.text}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      rodo: { ...cv.rodo, text: e.target.value }
                    })
                  }
                  className={`${inputClass} leading-relaxed text-xs`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stepper Footer Controls */}
        <div className="p-4 border-t border-[#E5E8F3] bg-white flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2.5 rounded-xl border border-[#E5E8F3] hover:bg-slate-50 text-xs font-bold text-[#75819C] hover:text-[#18233F] disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Wstecz</span>
          </button>

          <span className="text-xs font-mono font-bold text-[#75819C]">
            {currentIdx + 1} / {sections.length}
          </span>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition flex items-center gap-1.5 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: THEME.colors.gradient }}
          >
            <span>{currentIdx === sections.length - 1 ? 'Gotowe do Druku' : 'Następny krok'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>

      {/* ========================================================
          PANEL 3: RIGHT LIVE A4 CANVAS PREVIEW (Remaining width)
         ======================================================== */}
      <section className="flex-1 flex flex-col h-full bg-[#EBF0F9] overflow-hidden">
        {/* Floating Canvas Action Strip */}
        <div className="bg-white border-b border-[#E5E8F3] px-4 py-2.5 flex items-center justify-between text-xs shrink-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#18233F] hidden sm:inline">
              Szablon:
            </span>
            <button
              type="button"
              onClick={onOpenTemplatesModal}
              className="px-3 py-1.5 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] hover:border-[#6250F4] text-xs font-bold text-[#18233F] flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
            >
              <Palette className="w-3.5 h-3.5 text-[#6250F4]" />
              <span className="capitalize">{cv.templateId.replace('-', ' ')}</span>
              <span className="text-[10px] text-[#6250F4] font-semibold underline ml-1">Zmień</span>
            </button>

            {/* Accent Colors */}
            <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-200">
              {paletteColors.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => onChangeCv({ ...cv, accentColor: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                    cv.accentColor === c.hex
                      ? 'scale-125 ring-2 ring-[#6250F4] ring-offset-2'
                      : 'hover:scale-110 opacity-75'
                  }`}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Zoom and PDF Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.4, Math.round((z - 0.1) * 100) / 100))}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              title="Oddal widok"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-700 min-w-[38px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 100) / 100))}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              title="Przybliż widok"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(0.92)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 hidden sm:flex items-center gap-1 cursor-pointer"
              title="Domyślne powiększenie (A4)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onPrintPdf}
              className="ml-2 px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition hover:shadow-lg cursor-pointer hover:opacity-95"
              style={{ background: THEME.colors.gradient }}
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Drukuj / Zapisz PDF</span>
            </button>
          </div>
        </div>

        {/* Scrollable Canvas Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8 flex justify-center items-start">
          <ResumeCanvas cv={cv} zoom={zoom} />
        </div>
      </section>
    </div>
  );
};
