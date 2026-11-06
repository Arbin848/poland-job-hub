import React, { useState } from 'react';
import { CVData, LanguageCode, TemplateId, ExperienceItem, EducationItem, LanguageItem, CefrLevel } from '../../../types/cv';
import { V5StepId, V5_STEPS } from '../types';
import { V5MultipageCanvas } from './V5MultipageCanvas';
import { V5AiAssistant } from './V5AiAssistant';
import { V5TemplatePicker } from './V5TemplatePicker';
import { V5ReviewExport } from './V5ReviewExport';
import { V5MobilePreviewModal } from './V5MobilePreviewModal';
import { generateProfileSummary } from '../../../services/aiService';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Eye,
  RotateCcw,
  ShieldCheck,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Palette,
  Check,
  Sliders,
  Globe,
  Loader2,
  X,
  Upload
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChangeCv: (newCv: CVData) => void;
  language: LanguageCode;
  currentStep: V5StepId;
  onStepChange: (step: V5StepId) => void;
  onPrintPdf: () => void;
  onReturnToHomepage: () => void;
  onSwitchToAdvanced?: () => void;
  reducedMotion: boolean;
}

export const V5GuidedEditor: React.FC<Props> = ({
  cv,
  onChangeCv,
  language,
  currentStep,
  onStepChange,
  onPrintPdf,
  onReturnToHomepage,
  onSwitchToAdvanced,
  reducedMotion
}) => {
  const isPl = language === 'pl';
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [editingExpIdx, setEditingExpIdx] = useState(0);
  const [newSkillInput, setNewSkillInput] = useState('');
  
  // Summary AI generation state
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [aiSummarySuggestion, setAiSummarySuggestion] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  // Language input state
  const [newLangName, setNewLangName] = useState('');
  const [newLangLevel, setNewLangLevel] = useState<CefrLevel>('B2');

  // Update personal info
  const updatePersonalInfo = (field: string, value: any) => {
    onChangeCv({
      ...cv,
      personalInfo: {
        ...cv.personalInfo,
        [field]: value
      }
    });
  };

  // Experience handlers
  const updateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...(cv.experiences || [])];
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value };
      onChangeCv({ ...cv, experiences: updated });
    }
  };

  const addExperienceBullet = (index: number, bulletText: string) => {
    const updated = [...(cv.experiences || [])];
    if (updated[index]) {
      const currentBullets = updated[index].bullets || [];
      updated[index] = {
        ...updated[index],
        bullets: [...currentBullets, bulletText]
      };
      onChangeCv({ ...cv, experiences: updated });
    }
  };

  const removeExperienceBullet = (expIndex: number, bulletIndex: number) => {
    const updated = [...(cv.experiences || [])];
    if (updated[expIndex]) {
      const currentBullets = [...updated[expIndex].bullets];
      currentBullets.splice(bulletIndex, 1);
      updated[expIndex] = { ...updated[expIndex], bullets: currentBullets };
      onChangeCv({ ...cv, experiences: updated });
    }
  };

  const addNewExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: '',
      company: '',
      location: cv.personalInfo.location || '',
      startDate: '',
      endDate: isPl ? 'Obecnie' : 'Present',
      current: true,
      bullets: []
    };
    const nextList = [...(cv.experiences || []), newExp];
    onChangeCv({ ...cv, experiences: nextList });
    setEditingExpIdx(nextList.length - 1);
  };

  const removeExperience = (index: number) => {
    const updated = (cv.experiences || []).filter((_, i) => i !== index);
    onChangeCv({ ...cv, experiences: updated });
    setEditingExpIdx(Math.max(0, index - 1));
  };

  // Skills handlers
  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || (cv.technicalSkills && cv.technicalSkills.includes(trimmed))) return;
    onChangeCv({
      ...cv,
      technicalSkills: [...(cv.technicalSkills || []), trimmed]
    });
    setNewSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChangeCv({
      ...cv,
      technicalSkills: (cv.technicalSkills || []).filter((s: string) => s !== skillToRemove)
    });
  };

  // Language handlers
  const addLanguage = () => {
    const trimmed = newLangName.trim();
    if (!trimmed) return;
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: trimmed,
      level: newLangLevel
    };
    onChangeCv({
      ...cv,
      languages: [...(cv.languages || []), newLang]
    });
    setNewLangName('');
    setNewLangLevel('B2');
  };

  const removeLanguage = (langId: string) => {
    onChangeCv({
      ...cv,
      languages: (cv.languages || []).filter(l => l.id !== langId)
    });
  };

  // AI Summary Generator
  const handleGenerateSummary = async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const skillsList = (cv.technicalSkills && cv.technicalSkills.length > 0)
        ? cv.technicalSkills.slice(0, 6)
        : ['zarządzanie zadaniami', 'komunikacja biznesowa', 'rozwiązywanie problemów'];
      const res = await generateProfileSummary(
        cv.personalInfo.jobTitle || 'Specjalista',
        '3-5',
        'biznes i technologia',
        skillsList,
        language
      );
      if (res && res.summary) {
        setAiSummarySuggestion(res.summary);
      } else {
        throw new Error('Empty summary returned');
      }
    } catch (err: any) {
      console.warn('AI Summary generation fallback:', err);
      setSummaryError(isPl ? 'Usługa AI jest chwilowo niedostępna. Wpisz podsumowanie ręcznie.' : 'AI service temporarily unavailable. Enter summary manually.');
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PolJobHub_CV_${(cv.personalInfo.fullName || 'Kandydat').replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChangeCv({
          ...cv,
          personalInfo: {
            ...cv.personalInfo,
            photoUrl: reader.result as string,
            showPhoto: true
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Curated quick skills for one-click addition
  const quickSkills = [
    'Zarządzanie projektami (Agile/Scrum)',
    'Analiza procesów biznesowych',
    'Microsoft Excel & Power BI',
    'Angielski biznesowy (C1)',
    'Negocjacje handlowe B2B',
    'Budowanie zespołów i leadership',
    'Optymalizacja kosztów operacyjnych',
    'Obsługa systemów ERP / CRM'
  ];

  const currentStepMeta = V5_STEPS.find(s => s.id === currentStep) || V5_STEPS[0];
  const progressPercent = Math.round((currentStep / 5) * 100);

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8F9FF] text-[#18233F]">
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 pt-5 pb-28 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ================= LEFT COLUMN: Guided Conversational Form ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-5 print:hidden">
            
            {/* Step Progress Header Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {isPl ? `KROK 0${currentStep} Z 05` : `STEP 0${currentStep} OF 05`}
                  </span>
                  <span className="text-slate-400 hidden sm:inline">
                    {isPl ? `~${currentStepMeta.estMinutes} min` : `~${currentStepMeta.estMinutes} min`}
                  </span>
                </div>

                {onSwitchToAdvanced && (
                  <button
                    type="button"
                    onClick={onSwitchToAdvanced}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] flex items-center gap-1.5 transition cursor-pointer"
                    title={isPl ? 'Przejdź do pełnego edytora zaawansowanego' : 'Switch to Advanced Editor'}
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isPl ? 'Edytor Zaawansowany' : 'Advanced Editor'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-[#18233F] tracking-tight">
                    {isPl ? currentStepMeta.titlePl : currentStepMeta.titleEn}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {isPl ? currentStepMeta.subtitlePl : currentStepMeta.subtitleEn}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-black text-indigo-600 font-mono">{progressPercent}%</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#6250F4] to-[#A447F4] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Personal Info & Contact */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
                {/* Photo upload & basic info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 overflow-hidden flex items-center justify-center">
                      {cv.personalInfo.photoUrl ? (
                        <img src={cv.personalInfo.photoUrl} alt="Zdjęcie kandydata" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <label className="absolute inset-0 bg-slate-900/60 text-white rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold cursor-pointer transition">
                      <Upload className="w-3.5 h-3.5 mr-1" />
                      <span>{isPl ? 'Zmień' : 'Upload'}</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  </div>

                  <div className="flex-1 w-full space-y-1">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isPl ? 'Zdjęcie profilowe (opcjonalne)' : 'Candidate Photo (Optional)'}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isPl
                        ? 'W Polsce zdjęcie jest standardem na większości stanowisk, jednak nie jest formalnie wymagane prawem.'
                        : 'In Poland, photos are customary on most roles, but strictly optional.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Imię i nazwisko *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={cv.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="np. Mikołaj Kamiński"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-semibold outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Tytuł zawodowy (Headline)' : 'Professional Headline'}
                    </label>
                    <input
                      type="text"
                      value={cv.personalInfo.jobTitle}
                      onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                      placeholder="np. Kierownik ds. Logistyki i Magazynu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-semibold outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Adres e-mail *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      value={cv.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="mikolaj.kaminski@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Telefon kontaktowy *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      value={cv.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+48 601 234 567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Lokalizacja / Tryb pracy' : 'Location / Work Mode'}
                    </label>
                    <input
                      type="text"
                      value={cv.personalInfo.location}
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="np. Warszawa (hybrydowo / stacjonarnie)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-hidden transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      {isPl ? 'Profil LinkedIn' : 'LinkedIn Profile'}
                    </label>
                    <input
                      type="text"
                      value={cv.personalInfo.linkedIn || ''}
                      onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                      placeholder="linkedin.com/in/mikolaj-kaminski"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm outline-hidden transition"
                    />
                  </div>
                </div>

                {/* Status RP / Work Authorization Self-Declaration Checkbox */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(cv.personalInfo.showWorkPermitBadge)}
                      onChange={(e) => updatePersonalInfo('showWorkPermitBadge', e.target.checked)}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {isPl ? 'Oświadczenie kandydata o uprawnieniach do pracy w RP' : 'Candidate Work Authorization Self-Declaration (Poland / EU)'}
                      </span>
                      <p className="text-slate-500 mt-1 leading-relaxed">
                        {isPl
                          ? 'Status zezwolenia na pracę — informacja zadeklarowana przez kandydata. Dokumenty i uprawnienia podlegają odrębnej weryfikacji przez pracodawcę lub uprawniony zespół rekrutacyjny.'
                          : 'Work authorization status — information provided by the candidate. Documents and eligibility must be verified separately by the employer or authorized recruitment team.'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Professional Summary with AI Generator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                      {isPl ? 'Podsumowanie zawodowe (Profil)' : 'Professional Summary'}
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateSummary}
                      disabled={summaryLoading}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition disabled:opacity-50"
                    >
                      {summaryLoading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>{isPl ? 'Generowanie...' : 'Generating...'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{isPl ? 'Zaproponuj z AI' : 'Suggest with AI'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={cv.summary || ''}
                    onChange={(e) => onChangeCv({ ...cv, summary: e.target.value })}
                    placeholder={isPl ? 'Krótki opis Twojej specjalizacji i najważniejszych sukcesów...' : 'Concise summary of your core strengths and achievements...'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm leading-relaxed outline-hidden transition"
                  />

                  {summaryError && (
                    <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
                      {summaryError}
                    </p>
                  )}

                  {aiSummarySuggestion && (
                    <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{isPl ? 'Propozycja podsumowania (wymaga zatwierdzenia):' : 'AI Proposal (requires approval):'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setAiSummarySuggestion(null)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed italic bg-white p-2.5 rounded-lg border border-indigo-100">
                        "{aiSummarySuggestion}"
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            onChangeCv({ ...cv, summary: aiSummarySuggestion });
                            setAiSummarySuggestion(null);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isPl ? 'Zaakceptuj i wstaw' : 'Accept & Insert'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAiSummarySuggestion(null)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs transition"
                        >
                          <span>{isPl ? 'Odrzuć' : 'Dismiss'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Work Experience with STAR Assistant */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                {/* Active Experience Form */}
                {cv.experiences && cv.experiences.length > 0 && cv.experiences[editingExpIdx] ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                        {isPl ? `Stanowisko ${editingExpIdx + 1} z ${cv.experiences.length}` : `Role ${editingExpIdx + 1} of ${cv.experiences.length}`}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {cv.experiences.map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setEditingExpIdx(i)}
                            className={`w-6 h-6 rounded-md text-xs font-bold transition cursor-pointer ${
                              editingExpIdx === i
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={addNewExperience}
                          className="px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                          title={isPl ? 'Dodaj nowe stanowisko' : 'Add role'}
                        >
                          <Plus className="w-3 h-3" />
                          <span>{isPl ? 'Dodaj' : 'Add'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {isPl ? 'Stanowisko *' : 'Job Title *'}
                        </label>
                        <input
                          type="text"
                          value={cv.experiences[editingExpIdx].role}
                          onChange={(e) => updateExperience(editingExpIdx, 'role', e.target.value)}
                          placeholder="np. Operations & Logistics Lead"
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-semibold outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {isPl ? 'Firma / Pracodawca *' : 'Company / Employer *'}
                        </label>
                        <input
                          type="text"
                          value={cv.experiences[editingExpIdx].company}
                          onChange={(e) => updateExperience(editingExpIdx, 'company', e.target.value)}
                          placeholder="np. Raben Logistics Polska Sp. z o.o."
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 text-sm font-semibold outline-hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {isPl ? 'Od kiedy' : 'Start Date'}
                        </label>
                        <input
                          type="text"
                          value={cv.experiences[editingExpIdx].startDate}
                          onChange={(e) => updateExperience(editingExpIdx, 'startDate', e.target.value)}
                          placeholder="2022-04"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {isPl ? 'Do kiedy' : 'End Date'}
                        </label>
                        <input
                          type="text"
                          value={cv.experiences[editingExpIdx].endDate || (isPl ? 'Obecnie' : 'Present')}
                          onChange={(e) => updateExperience(editingExpIdx, 'endDate', e.target.value)}
                          placeholder="Obecnie"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          {isPl ? 'Lokalizacja' : 'Location'}
                        </label>
                        <input
                          type="text"
                          value={cv.experiences[editingExpIdx].location || ''}
                          onChange={(e) => updateExperience(editingExpIdx, 'location', e.target.value)}
                          placeholder="Warszawa"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                    </div>

                    {/* Delete this role button */}
                    {cv.experiences.length > 1 && (
                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => removeExperience(editingExpIdx)}
                          className="text-rose-600 hover:text-rose-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isPl ? 'Usuń to stanowisko' : 'Remove this role'}</span>
                        </button>
                      </div>
                    )}

                    {/* Bullet Points List */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                          {isPl ? 'Kluczowe osiągnięcia i obowiązki (punkty):' : 'Key Responsibilities & Bullets:'}
                        </label>
                        <span className="text-[11px] text-slate-400">
                          {cv.experiences[editingExpIdx].bullets?.length || 0} {isPl ? 'punktów' : 'bullets'}
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {cv.experiences[editingExpIdx].bullets?.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <span className="text-indigo-600 font-bold mt-0.5">•</span>
                            <p className="text-xs text-slate-800 flex-1 leading-relaxed">{b}</p>
                            <button
                              type="button"
                              onClick={() => removeExperienceBullet(editingExpIdx, bIdx)}
                              className="text-slate-400 hover:text-rose-600 transition cursor-pointer p-1"
                              title={isPl ? 'Usuń punkt' : 'Remove bullet'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integrated Ethical STAR Assistant */}
                    <V5AiAssistant
                      currentRole={cv.experiences[editingExpIdx].role}
                      currentBulletDraft=""
                      onApplyBullet={(bullet) => addExperienceBullet(editingExpIdx, bullet)}
                      language={language}
                    />
                  </div>
                ) : (
                  <div className="text-center py-8 space-y-3">
                    <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">
                      {isPl ? 'Brak dodanych stanowisk pracy' : 'No work experience added yet'}
                    </p>
                    <button
                      type="button"
                      onClick={addNewExperience}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs cursor-pointer shadow-sm"
                    >
                      {isPl ? 'Dodaj pierwsze stanowisko' : 'Add first position'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Education & Skills */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-6">
                {/* Education section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                    <span>{isPl ? 'Wykształcenie wyższe lub średnie' : 'Education'}</span>
                  </h3>

                  {cv.educations && cv.educations[0] && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {isPl ? 'Uczelnia / Szkoła' : 'Institution'}
                        </label>
                        <input
                          type="text"
                          value={cv.educations[0].institution}
                          onChange={(e) => {
                            const edu = [...cv.educations];
                            edu[0] = { ...edu[0], institution: e.target.value };
                            onChangeCv({ ...cv, educations: edu });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          {isPl ? 'Kierunek studiów' : 'Field of Study'}
                        </label>
                        <input
                          type="text"
                          value={cv.educations[0].fieldOfStudy}
                          onChange={(e) => {
                            const edu = [...cv.educations];
                            edu[0] = { ...edu[0], fieldOfStudy: e.target.value };
                            onChangeCv({ ...cv, educations: edu });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills section */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isPl ? 'Kluczowe umiejętności i technologie' : 'Key Skills & Tools'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-3">
                    {isPl
                      ? 'Wpisz własną lub dodaj jednym kliknięciem z listy rekomendowanych:'
                      : 'Type a skill or click a recommended one below:'}
                  </p>

                  {/* Add skill input */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(newSkillInput);
                        }
                      }}
                      placeholder={isPl ? 'np. Negocjacje handlowe, SAP ERP, Excel...' : 'e.g. Project Management, SQL...'}
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs outline-hidden focus:border-indigo-600"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill(newSkillInput)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer"
                    >
                      {isPl ? 'Dodaj' : 'Add'}
                    </button>
                  </div>

                  {/* Active candidate skills list */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cv.technicalSkills?.map((sk: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-semibold"
                      >
                        <span>{sk}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(sk)}
                          className="text-indigo-400 hover:text-rose-600 transition cursor-pointer"
                          title="Usuń"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* One-click quick skills */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      {isPl ? 'Szybkie dodawanie (kliknij):' : 'One-Click Suggestions:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickSkills.map((qs) => {
                        const isAdded = cv.technicalSkills?.includes(qs);
                        return (
                          <button
                            key={qs}
                            type="button"
                            onClick={() => (isAdded ? removeSkill(qs) : addSkill(qs))}
                            className={`px-2.5 py-1 rounded-md text-[11.5px] font-medium transition cursor-pointer flex items-center gap-1 ${
                              isAdded
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                                : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:text-indigo-700'
                            }`}
                          >
                            <span>{isAdded ? '✓' : '+'}</span>
                            <span>{qs}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Languages Section */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600" />
                    <span>{isPl ? 'Języki obce' : 'Languages'}</span>
                  </h3>

                  <div className="space-y-2">
                    {cv.languages?.map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <span className="font-semibold text-slate-800">{lang.language}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-[11px]">
                            {lang.level}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLanguage(lang.id)}
                            className="text-slate-400 hover:text-rose-600"
                            title="Usuń język"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLangName}
                      onChange={(e) => setNewLangName(e.target.value)}
                      placeholder={isPl ? 'Język (np. Angielski, Niemiecki)' : 'Language (e.g. English, German)'}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                    <select
                      value={newLangLevel}
                      onChange={(e) => setNewLangLevel(e.target.value as CefrLevel)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                    >
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                      <option value="Native">{isPl ? 'Ojczysty' : 'Native'}</option>
                    </select>
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs"
                    >
                      {isPl ? 'Dodaj' : 'Add'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Template Selection */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <V5TemplatePicker
                  selectedTemplate={cv.templateId}
                  onSelectTemplate={(tplId: TemplateId) => onChangeCv({ ...cv, templateId: tplId })}
                  cv={cv}
                  language={language}
                />
              </div>
            )}

            {/* STEP 5: Review & Export */}
            {currentStep === 5 && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
                <V5ReviewExport
                  cv={cv}
                  language={language}
                  onPrintPdf={onPrintPdf}
                  onExportJson={handleExportJson}
                  onSelectStep={(step) => onStepChange(step)}
                  onChangeCv={onChangeCv}
                />
              </div>
            )}

            {/* Bottom Wizard Navigation Footer */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex items-center justify-between gap-3">
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => onStepChange((currentStep - 1) as V5StepId)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Wstecz' : 'Back'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onReturnToHomepage}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Strona główna' : 'Home'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {currentStep < 5 && (
                  <button
                    type="button"
                    onClick={() => onStepChange((currentStep + 1) as V5StepId)}
                    className="px-3.5 py-2.5 text-slate-500 hover:text-slate-800 text-xs font-semibold transition cursor-pointer"
                  >
                    {isPl ? 'Pomiń ten krok' : 'Skip'}
                  </button>
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => onStepChange((currentStep + 1) as V5StepId)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isPl ? 'Dalej: ' : 'Next: '} {V5_STEPS[currentStep]?.titlePl.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onPrintPdf}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isPl ? 'Pobierz Dokument PDF' : 'Download Print PDF'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Sticky Live A4 Preview (Desktop only) ================= */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6 sticky top-20 print:block print:static print:w-full print:m-0 print:p-0">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-lg shadow-slate-200/50 print:border-none print:shadow-none print:p-0 print:m-0">
              
              {/* Preview Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs print:hidden">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-slate-800">
                    {isPl ? 'Podgląd na żywo A4' : 'Real-Time A4 Preview'}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    · {cv.templateId}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMobilePreviewOpen(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Powiększ' : 'Expand'}</span>
                  </button>
                </div>
              </div>

              {/* Real Multipage A4 Canvas Container */}
              <div className="w-full bg-slate-100/70 rounded-2xl overflow-y-auto max-h-[720px] border border-slate-200/80 flex justify-center py-4 px-2 print:border-none print:bg-transparent print:p-0 print:max-h-none print:overflow-visible">
                <div className="w-full max-w-[560px] origin-top scale-[0.68] -mb-[360px] print:scale-100 print:max-w-none print:m-0 print:transform-none">
                  <V5MultipageCanvas cv={cv} zoom={1} isThumbnail={false} />
                </div>
              </div>

              {/* Status footer */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 print:hidden">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isPl ? 'Aktualizuje się natychmiast podczas pisania' : 'Updates live as you type'}</span>
                </span>
                <span className="font-mono text-slate-400">210 × 297 mm</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Unified Sticky Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#18233F]/98 backdrop-blur-md border-t border-white/15 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2 select-none print:hidden">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => onStepChange((currentStep - 1) as V5StepId)}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{isPl ? 'Wstecz' : 'Back'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReturnToHomepage}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{isPl ? 'Start' : 'Home'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setMobilePreviewOpen(true)}
          className="px-3 py-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          title={isPl ? 'Otwórz pełny podgląd A4' : 'Open A4 live preview'}
        >
          <Eye className="w-3.5 h-3.5 text-indigo-200" />
          <span>{isPl ? 'Podgląd A4' : 'A4 Preview'}</span>
        </button>

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={() => onStepChange((currentStep + 1) as V5StepId)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md shrink-0"
          >
            <span>{isPl ? 'Dalej' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onPrintPdf}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md shrink-0"
          >
            <span>{isPl ? 'Pobierz PDF' : 'Export PDF'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Mobile Preview Modal */}
      <V5MobilePreviewModal
        isOpen={mobilePreviewOpen}
        onClose={() => setMobilePreviewOpen(false)}
        cv={cv}
        language={language}
        onPrintPdf={onPrintPdf}
      />
    </div>
  );
};
