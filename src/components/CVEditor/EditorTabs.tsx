import React, { useState, useEffect } from 'react';
import { CVData, LanguageCode, TemplateId } from '../../types/cv';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { LanguagesSection } from './LanguagesSection';
import { CertificationsSection } from './CertificationsSection';
import { ProjectsSection } from './ProjectsSection';
import { RodoClauseSection } from './RodoClauseSection';
import { CoverLetterSection } from './CoverLetterSection';
import { SectionVisibilitySettings } from './SectionVisibilitySettings';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Globe,
  Award,
  ShieldCheck,
  MailPlus,
  Sliders,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Building,
  Sparkles
} from 'lucide-react';

interface Props {
  cv: CVData;
  onChange: (updated: CVData) => void;
  language: LanguageCode;
  onOpenTemplatesModal?: () => void;
  onOpenPresetsModal?: () => void;
}

type CvTabKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'languages'
  | 'certifications'
  | 'rodo'
  | 'layout';

export const EditorTabs: React.FC<Props> = ({
  cv,
  onChange,
  language,
  onOpenTemplatesModal,
  onOpenPresetsModal
}) => {
  const isPl = language === 'pl';
  const [activeTab, setActiveTab] = useState<CvTabKey>('personal');

  // CV section tab definitions
  const cvTabs: { key: CvTabKey; labelPl: string; labelEn: string; icon: React.ReactNode; isComplete: boolean }[] = [
    {
      key: 'personal',
      labelPl: 'Dane & Kontakt',
      labelEn: 'Contact & Info',
      icon: <User className="w-3.5 h-3.5" />,
      isComplete: Boolean(cv.personalInfo.fullName && cv.personalInfo.email && cv.personalInfo.phone)
    },
    {
      key: 'summary',
      labelPl: 'Podsumowanie AI',
      labelEn: 'Summary AI',
      icon: <FileText className="w-3.5 h-3.5" />,
      isComplete: Boolean(cv.summary && cv.summary.length >= 40)
    },
    {
      key: 'experience',
      labelPl: 'Doświadczenie',
      labelEn: 'Experience',
      icon: <Briefcase className="w-3.5 h-3.5" />,
      isComplete: (cv.experiences?.length || 0) > 0
    },
    {
      key: 'education',
      labelPl: 'Wykształcenie',
      labelEn: 'Education',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
      isComplete: (cv.educations?.length || 0) > 0
    },
    {
      key: 'skills',
      labelPl: 'Umiejętności',
      labelEn: 'Skills & Tools',
      icon: <Wrench className="w-3.5 h-3.5" />,
      isComplete: (cv.technicalSkills?.length || 0) >= 3
    },
    {
      key: 'languages',
      labelPl: 'Języki (CEFR)',
      labelEn: 'Languages',
      icon: <Globe className="w-3.5 h-3.5" />,
      isComplete: (cv.languages?.length || 0) > 0
    },
    {
      key: 'certifications',
      labelPl: 'Uprawnienia & Projekty',
      labelEn: 'Certs & Projects',
      icon: <Award className="w-3.5 h-3.5" />,
      isComplete: (cv.certifications?.length || 0) > 0 || (cv.projects?.length || 0) > 0
    },
    {
      key: 'rodo',
      labelPl: 'Klauzula RODO',
      labelEn: 'GDPR / RODO',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      isComplete: Boolean(cv.rodo?.enabled && cv.rodo?.text?.length >= 30)
    },
    {
      key: 'layout',
      labelPl: 'Wygląd & Czcionki',
      labelEn: 'Design & Style',
      icon: <Sliders className="w-3.5 h-3.5" />,
      isComplete: true
    }
  ];

  const currentTabIdx = cvTabs.findIndex((t) => t.key === activeTab);
  const completedCount = cvTabs.filter((t) => t.isComplete).length;
  const progressPct = Math.round((completedCount / cvTabs.length) * 100);

  // If currently on Cover Letter document
  if (cv.activeDocument === 'cover-letter') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
        {/* Cover Letter Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <MailPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {isPl ? 'List Motywacyjny do Oferty Pracy (A4)' : 'Cover Letter Builder (A4)'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isPl
                  ? 'Dopasowany pod polskie standardy biznesowe i zintegrowany z Twoim CV'
                  : 'Tailored for Polish corporate standards and paired with your CV'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...cv, activeDocument: 'cv' })}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            {isPl ? '← Wróć do edycji CV' : '← Back to CV'}
          </button>
        </div>

        {/* Cover Letter Body */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          <CoverLetterSection
            coverLetter={cv.coverLetter}
            onChange={(coverLetter) => onChange({ ...cv, coverLetter })}
            candidateName={cv.personalInfo.fullName}
            jobTitle={cv.personalInfo.jobTitle}
            language={language}
          />
        </div>
      </div>
    );
  }

  // If currently on Agency Dossier
  if (cv.activeDocument === 'agency-onepager') {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {isPl ? 'Karta Prezentacji Kandydata (One-Pager dla Agencji)' : 'Candidate Presentation Card (One-Pager)'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isPl
                  ? 'Oficjalna 1-stronicowa karta przesyłana pracodawcom w Polsce'
                  : 'Official 1-page dossier presented to hiring employers'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange({ ...cv, activeDocument: 'cv' })}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            {isPl ? '← Wróć do edycji CV' : '← Back to CV'}
          </button>
        </div>

        <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isPl ? 'Kod Referencyjny Kandydata' : 'Candidate Reference Code'}
              </label>
              <input
                type="text"
                value={cv.agencyProfile?.candidateCode || ''}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    agencyProfile: {
                      ...(cv.agencyProfile || {
                        candidateCode: '',
                        availabilityDate: 'Od zaraz',
                        accommodationNeeded: false,
                        hourlyRateExpected: '29.50 PLN brutto/h',
                        monthlyRateExpected: '6 800 PLN brutto',
                        medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
                        recruiterNotes: '',
                        consultantName: 'PolJobHub Recruitment Desk',
                        consultantPhone: '+48 22 123 45 67',
                        consultantEmail: 'document.poljobhub@gmail.com'
                      }),
                      candidateCode: e.target.value
                    }
                  })
                }
                placeholder="np. PJH-2026-WAW"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isPl ? 'Dostępność do Pracy' : 'Availability'}
              </label>
              <input
                type="text"
                value={cv.agencyProfile?.availabilityDate || ''}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    agencyProfile: {
                      ...(cv.agencyProfile || {
                        candidateCode: '',
                        availabilityDate: 'Od zaraz',
                        accommodationNeeded: false,
                        hourlyRateExpected: '29.50 PLN brutto/h',
                        monthlyRateExpected: '6 800 PLN brutto',
                        medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
                        recruiterNotes: '',
                        consultantName: 'PolJobHub Recruitment Desk',
                        consultantPhone: '+48 22 123 45 67',
                        consultantEmail: 'document.poljobhub@gmail.com'
                      }),
                      availabilityDate: e.target.value
                    }
                  })
                }
                placeholder="np. Od zaraz / 2 tygodnie wypowiedzenia"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isPl ? 'Oczekiwana Stawka (Godzinowa lub Miesięczna)' : 'Expected Compensation'}
              </label>
              <input
                type="text"
                value={cv.agencyProfile?.hourlyRateExpected || ''}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    agencyProfile: {
                      ...(cv.agencyProfile || {
                        candidateCode: '',
                        availabilityDate: 'Od zaraz',
                        accommodationNeeded: false,
                        hourlyRateExpected: '29.50 PLN brutto/h',
                        monthlyRateExpected: '6 800 PLN brutto',
                        medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
                        recruiterNotes: '',
                        consultantName: 'PolJobHub Recruitment Desk',
                        consultantPhone: '+48 22 123 45 67',
                        consultantEmail: 'document.poljobhub@gmail.com'
                      }),
                      hourlyRateExpected: e.target.value
                    }
                  })
                }
                placeholder="np. 32 PLN brutto/h lub 7 200 PLN brutto"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isPl ? 'Orzeczenie Medycyny Pracy & Sanepid' : 'Occupational Health & Sanepid'}
              </label>
              <input
                type="text"
                value={cv.agencyProfile?.medicalExamStatus || ''}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    agencyProfile: {
                      ...(cv.agencyProfile || {
                        candidateCode: '',
                        availabilityDate: 'Od zaraz',
                        accommodationNeeded: false,
                        hourlyRateExpected: '29.50 PLN brutto/h',
                        monthlyRateExpected: '6 800 PLN brutto',
                        medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
                        recruiterNotes: '',
                        consultantName: 'PolJobHub Recruitment Desk',
                        consultantPhone: '+48 22 123 45 67',
                        consultantEmail: 'document.poljobhub@gmail.com'
                      }),
                      medicalExamStatus: e.target.value
                    }
                  })
                }
                placeholder="Ważne orzeczenie medycyny pracy / SANEPID"
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                {isPl ? 'Rekomendacja & Ocena Kandydata dla Pracodawcy' : 'Recruiter Assessment Notes'}
              </label>
              <textarea
                rows={3}
                value={cv.agencyProfile?.recruiterNotes || ''}
                onChange={(e) =>
                  onChange({
                    ...cv,
                    agencyProfile: {
                      ...(cv.agencyProfile || {
                        candidateCode: '',
                        availabilityDate: 'Od zaraz',
                        accommodationNeeded: false,
                        hourlyRateExpected: '29.50 PLN brutto/h',
                        monthlyRateExpected: '6 800 PLN brutto',
                        medicalExamStatus: 'Ważne orzeczenie medycyny pracy + Sanepid',
                        recruiterNotes: '',
                        consultantName: 'PolJobHub Recruitment Desk',
                        consultantPhone: '+48 22 123 45 67',
                        consultantEmail: 'document.poljobhub@gmail.com'
                      }),
                      recruiterNotes: e.target.value
                    }
                  })
                }
                placeholder="Kandydat z wieloletnim doświadczeniem, wysoka kultura osobista, pełna dyspozycyjność..."
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard CV Document Editing
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
      {/* Editor Top Progress & Section Guide */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/80">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              {isPl ? `Krok ${currentTabIdx + 1} z ${cvTabs.length}:` : `Step ${currentTabIdx + 1} of ${cvTabs.length}:`}
            </span>
            <span className="text-xs font-bold text-indigo-700">
              {isPl ? cvTabs[currentTabIdx]?.labelPl : cvTabs[currentTabIdx]?.labelEn}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold">{progressPct}%</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 font-medium">
              {completedCount}/{cvTabs.length} {isPl ? 'sekcji gotowych' : 'completed'}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Segmented Section Tabs Grid */}
      <div className="border-b border-slate-200 bg-white p-2">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5 gap-1.5">
          {cvTabs.map((t, idx) => {
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>{t.icon}</span>
                  <span className="truncate">{isPl ? t.labelPl : t.labelEn}</span>
                </div>
                {t.isComplete && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ml-1 ${isActive ? 'text-emerald-400' : 'text-emerald-600'}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Body */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto">
        {activeTab === 'personal' && (
          <PersonalInfoSection
            info={cv.personalInfo}
            onChange={(patch) => onChange({ ...cv, personalInfo: { ...cv.personalInfo, ...patch } })}
            language={language}
            agencyBadge={cv.agencyBadge}
            onAgencyBadgeChange={(agencyBadge) => onChange({ ...cv, agencyBadge })}
          />
        )}

        {activeTab === 'summary' && (
          <SummarySection
            summary={cv.summary}
            onChange={(summary) => onChange({ ...cv, summary })}
            language={language}
            jobTitle={cv.personalInfo.jobTitle}
            skills={cv.technicalSkills}
          />
        )}

        {activeTab === 'experience' && (
          <ExperienceSection
            experiences={cv.experiences}
            onChange={(experiences) => onChange({ ...cv, experiences })}
            language={language}
            jobTitle={cv.personalInfo.jobTitle}
          />
        )}

        {activeTab === 'education' && (
          <EducationSection
            educations={cv.educations}
            onChange={(educations) => onChange({ ...cv, educations })}
            language={language}
          />
        )}

        {activeTab === 'skills' && (
          <SkillsSection
            technicalSkills={cv.technicalSkills}
            softSkills={cv.softSkills}
            toolsAndCertificates={cv.toolsAndCertificates}
            onChange={(skills) => onChange({ ...cv, ...skills })}
            language={language}
          />
        )}

        {activeTab === 'languages' && (
          <LanguagesSection
            languages={cv.languages}
            onChange={(languages) => onChange({ ...cv, languages })}
            language={language}
          />
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {isPl ? '1. Uprawnienia, Certyfikaty & UDT / Sanepid' : '1. Certifications & Licenses'}
              </div>
              <CertificationsSection
                certifications={cv.certifications}
                onChange={(certifications) => onChange({ ...cv, certifications })}
                language={language}
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                {isPl ? '2. Wybrane Projekty & Portfolio' : '2. Key Projects & Portfolio'}
              </div>
              <ProjectsSection
                projects={cv.projects || []}
                onChange={(projects) => onChange({ ...cv, projects })}
                language={language}
              />
            </div>
          </div>
        )}

        {activeTab === 'rodo' && (
          <RodoClauseSection
            rodo={cv.rodo}
            onChange={(rodo) => onChange({ ...cv, rodo })}
            language={language}
          />
        )}

        {activeTab === 'layout' && (
          <SectionVisibilitySettings
            cv={cv}
            onChange={onChange}
            language={language}
          />
        )}
      </div>

      {/* Bottom Step-by-Step Navigation Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
        {currentTabIdx > 0 ? (
          <button
            type="button"
            onClick={() => setActiveTab(cvTabs[currentTabIdx - 1].key)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 font-semibold transition flex items-center gap-1 shadow-2xs"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>{isPl ? 'Wstecz' : 'Back'}</span>
          </button>
        ) : (
          <span className="text-[11px] text-slate-400">
            {isPl ? 'Początek formularza' : 'Start of form'}
          </span>
        )}

        {currentTabIdx < cvTabs.length - 1 ? (
          <button
            type="button"
            onClick={() => setActiveTab(cvTabs[currentTabIdx + 1].key)}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition flex items-center gap-1 shadow-xs"
          >
            <span>
              {isPl
                ? `Dalej: ${cvTabs[currentTabIdx + 1].labelPl}`
                : `Next: ${cvTabs[currentTabIdx + 1].labelEn}`}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transition flex items-center gap-1 shadow-xs"
          >
            <span>{isPl ? 'Pobierz Gotowe CV (PDF)' : 'Download Finished CV'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
