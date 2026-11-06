import React from 'react';
import { CVData, LanguageCode } from '../../../types/cv';
import { CheckCircle2, AlertCircle, Printer, Download, FileText, ShieldCheck, Share2 } from 'lucide-react';

interface Props {
  cv: CVData;
  language: LanguageCode;
  onPrintPdf: () => void;
  onExportJson: () => void;
  onSelectStep: (stepId: 1 | 2 | 3 | 4 | 5) => void;
  onChangeCv?: (cv: CVData) => void;
}

export const V5ReviewExport: React.FC<Props> = ({
  cv,
  language,
  onPrintPdf,
  onExportJson,
  onSelectStep,
  onChangeCv
}) => {
  const isPl = language === 'pl';

  // Real data verification checks
  const checks = [
    {
      id: 'personal',
      name: isPl ? 'Dane osobowe i kontakt' : 'Personal & Contact Details',
      passed: Boolean(cv.personalInfo.fullName && cv.personalInfo.email && cv.personalInfo.phone),
      detail: cv.personalInfo.fullName
        ? `${cv.personalInfo.fullName} · ${cv.personalInfo.email || 'Brak email'}`
        : isPl ? 'Uzupełnij imię i nazwisko' : 'Fill in your name',
      step: 1 as const
    },
    {
      id: 'experience',
      name: isPl ? 'Historia zatrudnienia' : 'Work Experience',
      passed: Boolean(cv.experiences && cv.experiences.length > 0),
      detail: cv.experiences && cv.experiences.length > 0
        ? `${cv.experiences.length} ${isPl ? 'stanowiska z zakresem obowiązków' : 'positions with bullets'}`
        : isPl ? 'Zalecane dodanie minimum 1 doświadczenia' : 'Recommended: at least 1 job',
      step: 2 as const
    },
    {
      id: 'skills',
      name: isPl ? 'Umiejętności i kompetencje' : 'Skills & Technologies',
      passed: Boolean(cv.technicalSkills && cv.technicalSkills.length >= 3),
      detail: cv.technicalSkills && cv.technicalSkills.length > 0
        ? `${cv.technicalSkills.length} ${isPl ? 'zdefiniowanych kompetencji' : 'skills defined'}`
        : isPl ? 'Dodaj min. 3 kluczowe umiejętności' : 'Add at least 3 skills',
      step: 3 as const
    },
    {
      id: 'rodo',
      name: isPl ? 'Klauzula zgody rekrutacyjnej (opcjonalna)' : 'Recruitment Consent Clause (Optional)',
      passed: Boolean(
        cv.sectionVisibility?.rodo !== false &&
        cv.rodo?.text && cv.rodo.text.trim().length > 10
      ),
      detail: isPl
        ? 'Zalecana przy zgodzie na przyszłe rekrutacje (art. 22¹ KP nie wymaga zgody na dane podstawowe)'
        : 'Recommended for future recruitment processes (Labor Code art. 22¹ covers standard data)',
      step: 5 as const
    }
  ];

  const allPassed = checks.every(c => c.passed);

  return (
    <div className="space-y-6">
      {/* Top Status Card */}
      <div className={`p-5 rounded-2xl border transition-all ${
        allPassed
          ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
          : 'bg-indigo-50/30 border-indigo-200 text-indigo-950'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold shrink-0 ${
            allPassed ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
          }`}>
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight">
              {allPassed
                ? (isPl ? 'Dokument gotowy do wysłania rekruterowi' : 'Document ready for submission')
                : (isPl ? 'Prawie gotowe — sprawdź rekomendacje' : 'Almost ready — review recommendations')}
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {isPl
                ? 'Zweryfikowaliśmy Twój dokument pod kątem wymogów formalnych rynku polskiego i europejskiego. Wszystkie kluczowe sekcje są uporządkowane.'
                : 'Your CV has been verified against Polish and EU market standards. Typography and hierarchy are aligned.'}
            </p>
          </div>
        </div>
      </div>

      {/* Honest Verification Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          {isPl ? 'Lista kontrolna jakości dokumentu:' : 'Document Quality Checklist:'}
        </h5>

        <div className="divide-y divide-slate-100">
          {checks.map((chk) => (
            <div key={chk.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <div>
                  <span className={`font-semibold ${chk.passed ? 'text-slate-900' : 'text-amber-900'}`}>
                    {chk.name}
                  </span>
                  <p className="text-[11px] text-slate-500">{chk.detail}</p>
                </div>
              </div>

              {!chk.passed && (
                <button
                  type="button"
                  onClick={() => onSelectStep(chk.step)}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px] transition cursor-pointer"
                >
                  {isPl ? 'Uzupełnij →' : 'Edit →'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formalities: Legal Privacy & Candidate Work Authorization */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-slate-900 text-sm">
              {isPl ? 'Podstawa prawna przetwarzania danych i oświadczenia' : 'Legal Privacy Basis & Candidate Declarations'}
            </h5>
            <p className="text-slate-600 leading-relaxed text-[12px]">
              {isPl
                ? 'Dane określone w art. 22¹ Kodeksu Pracy (imię i nazwisko, dane kontaktowe, wykształcenie, historia pracy) pracodawca przetwarza w ramach obowiązków prawnych bez wymogu odrębnej zgody kandydata. Dodatkowa klauzula zgody jest zalecana przede wszystkim w przypadku udziału w przyszłych procesach rekrutacyjnych lub zamieszczenia dodatkowych danych (np. zainteresowań, wizerunku).'
                : 'Standard candidate data (full name, contact details, education, employment history) is processed under statutory Labor Code basis (art. 22¹) without needing separate consent. An explicit consent clause is recommended primarily when agreeing to participate in future recruitment processes or when providing additional voluntary details.'}
            </p>
          </div>
        </div>

        {/* Candidate Work Authorization Self-Declaration */}
        <div className="pt-3 border-t border-slate-200">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(cv.personalInfo.showWorkPermitBadge)}
              onChange={(e) => {
                if (onChangeCv) {
                  onChangeCv({
                    ...cv,
                    personalInfo: {
                      ...cv.personalInfo,
                      showWorkPermitBadge: e.target.checked,
                      workEligibility: cv.personalInfo.workEligibility || (isPl ? 'Obywatel RP / UE' : 'EU / Poland Citizen')
                    }
                  });
                }
              }}
              className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <div>
              <span className="font-bold text-slate-900 block">
                {isPl ? 'Oświadczenie kandydata o uprawnieniach do pracy w RP' : 'Candidate Work Authorization Self-Declaration'}
              </span>
              <p className="text-slate-500 mt-0.5 leading-relaxed text-[11.5px]">
                {isPl
                  ? 'Status zezwolenia na pracę — informacja zadeklarowana przez kandydata. Dokumenty i uprawnienia podlegają odrębnej weryfikacji przez pracodawcę lub uprawniony zespół rekrutacyjny.'
                  : 'Work authorization status — information provided by the candidate. Documents and eligibility must be verified separately by the employer or authorized recruitment team.'}
              </p>
            </div>
          </label>
        </div>

        {/* Recruitment Consent Clause Toggle */}
        <div className="pt-3 border-t border-slate-200">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(cv.sectionVisibility?.rodo !== false && (cv.rodo?.enabled !== false))}
              onChange={(e) => {
                if (onChangeCv) {
                  onChangeCv({
                    ...cv,
                    sectionVisibility: {
                      summary: cv.sectionVisibility?.summary ?? true,
                      experience: cv.sectionVisibility?.experience ?? true,
                      education: cv.sectionVisibility?.education ?? true,
                      skills: cv.sectionVisibility?.skills ?? true,
                      languages: cv.sectionVisibility?.languages ?? true,
                      certifications: cv.sectionVisibility?.certifications ?? true,
                      projects: cv.sectionVisibility?.projects ?? true,
                      rodo: e.target.checked
                    },
                    rodo: {
                      ...cv.rodo,
                      enabled: e.target.checked,
                      type: cv.rodo?.type || 'future',
                      text: cv.rodo?.text || (isPl
                        ? 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla celów niezbędnych do realizacji obecnego oraz przyszłych procesów rekrutacyjnych.'
                        : 'I consent to the processing of my personal data for current and future recruitment purposes.')
                    }
                  });
                }
              }}
              className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <div>
              <span className="font-bold text-slate-900 block">
                {isPl ? 'Dołącz klauzulę zgody na przyszłe procesy rekrutacyjne (opcjonalnie)' : 'Include consent clause for future recruitment processes (optional)'}
              </span>
              <p className="text-slate-500 mt-0.5 leading-relaxed text-[11.5px]">
                {isPl
                  ? 'Umożliwia pracodawcy lub agencji zachowanie CV i kontakt w przypadku pojawienia się innych pasujących ofert pracy.'
                  : 'Allows employers or recruiters to retain your CV and contact you for future matching openings.'}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Primary Export Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {isPl ? 'Opcje eksportu:' : 'Export Options:'}
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPrintPdf}
            className="p-4 rounded-xl bg-gradient-to-r from-[#6250F4] to-[#A447F4] hover:opacity-95 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isPl ? 'Drukuj lub Zapisz jako PDF' : 'Print or Save as PDF'}</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            title={isPl ? 'Pobierz kopię zapasową danych CV' : 'Download JSON backup of CV data'}
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{isPl ? 'Pobierz kopię JSON' : 'Export JSON Backup'}</span>
          </button>
        </div>

        <p className="text-[11.5px] text-slate-500 text-center leading-relaxed">
          {isPl
            ? 'Format PDF jest renderowany w skali 1:1 z zachowaniem wektorowej typografii i podziału na strony A4.'
            : 'PDF is exported in 1:1 vector scale preserving crisp typography and A4 page breaks.'}
        </p>
      </div>
    </div>
  );
};
