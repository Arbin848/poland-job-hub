import React, { useState } from 'react';
import { CVData, LanguageCode } from '../types/cv';
import { RODO_TEMPLATES } from '../data/rodoTemplates';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Target,
  X,
  FileCheck,
  ChevronRight
} from 'lucide-react';

export interface ScoreCheckItem {
  id: string;
  labelPl: string;
  labelEn: string;
  tipPl: string;
  tipEn: string;
  points: number;
  status: 'pass' | 'warning' | 'fail';
  targetTab?: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'languages' | 'certifications' | 'rodo' | 'layout';
  fixAction?: () => void;
  fixLabelPl?: string;
  fixLabelEn?: string;
}

export function calculateCvScore(
  cv: CVData,
  onFixRodo?: () => void
): { score: number; items: ScoreCheckItem[] } {
  const { personalInfo, summary, experiences, educations, technicalSkills, languages, rodo, fontScale } = cv;

  // 1. Contact check
  const phoneHasPrefix = personalInfo.phone?.trim().startsWith('+') || personalInfo.phone?.trim().startsWith('00');
  const contactComplete = Boolean(personalInfo.fullName && personalInfo.email?.includes('@') && personalInfo.phone && phoneHasPrefix);
  
  // 2. Photo present
  const photoPresent = Boolean(personalInfo.showPhoto && personalInfo.photoUrl);

  // 3. Summary length
  const summaryPass = Boolean(summary && summary.trim().length >= 60);

  // 4. Experience & bullets
  const expPresent = experiences && experiences.length > 0;
  const allBullets = experiences?.flatMap((e) => e.bullets || []) || [];
  const minBulletsPerJob = expPresent && experiences.every((e) => (e.bullets?.length || 0) >= 3);
  
  // 5. Numbers/metrics in bullets
  const hasNumbers = allBullets.some((b) => /\d+|%|PLN|EUR|USD/i.test(b));

  // 6. Skills count
  const skillsCount = technicalSkills?.length || 0;
  const skillsPass = skillsCount >= 4;

  // 7. CEFR Languages
  const languagesPass = (languages?.length || 0) >= 1;

  // 8. RODO consent clause
  const rodoPass = Boolean(rodo?.enabled && (rodo?.text?.length || 0) >= 50);

  // 9. Work permit / legal status
  const workEligibilityPass = Boolean(personalInfo.workEligibility && personalInfo.workEligibility.trim().length > 0);

  // 10. Density / length fit
  const estimatedItems = (experiences?.length || 0) * 2 + (educations?.length || 0) + allBullets.length * 0.4;
  const pageFitPass = estimatedItems <= 14 || fontScale === 'compact';

  const items: ScoreCheckItem[] = [
    {
      id: 'rodo',
      labelPl: 'Klauzula RODO 2026',
      labelEn: 'GDPR / RODO 2026 Clause',
      tipPl: 'Mocno zalecana w Polsce, aby agencje i pracodawcy mogli legalnie przetwarzać Twoją aplikację.',
      tipEn: 'Strongly recommended in Poland for agencies to legally process candidate applications.',
      points: 20,
      status: rodoPass ? 'pass' : 'fail',
      targetTab: 'rodo',
      fixAction: onFixRodo,
      fixLabelPl: 'Wstaw klauzulę (1 klik)',
      fixLabelEn: 'Insert RODO clause (1-click)'
    },
    {
      id: 'contact',
      labelPl: 'Dane kontaktowe z numerem kierunkowym',
      labelEn: 'Contact info with country code',
      tipPl: 'Imię, poprawny email oraz numer z prefiksem (np. +48 dla Polski).',
      tipEn: 'Full name, valid email and phone with international dial code (+48).',
      points: 15,
      status: contactComplete ? 'pass' : 'fail',
      targetTab: 'personal'
    },
    {
      id: 'experience-bullets',
      labelPl: 'Minimum 3 punkty obowiązków na stanowisko',
      labelEn: 'At least 3 bullets per job role',
      tipPl: 'Rekruterzy oceniają konkretny zakres odpowiedzialności, a nie tylko tytuł.',
      tipEn: 'Recruiters inspect specific scope of duties, not just job titles.',
      points: 15,
      status: minBulletsPerJob ? 'pass' : expPresent ? 'warning' : 'fail',
      targetTab: 'experience'
    },
    {
      id: 'metrics',
      labelPl: 'Wymierne liczby i procenty w osiągnięciach',
      labelEn: 'Quantified metrics & numbers in achievements',
      tipPl: 'Dodaj konkretny wynik (np. 15%, 200 zamówień, oszczędność 50k PLN) zgodnie z metodą STAR.',
      tipEn: 'Include measurable results (e.g. 15%, 200 orders, cost saved) using the STAR framework.',
      points: 10,
      status: hasNumbers ? 'pass' : 'warning',
      targetTab: 'experience'
    },
    {
      id: 'summary',
      labelPl: 'Zwięzłe podsumowanie zawodowe (60+ znaków)',
      labelEn: 'Professional summary (60+ chars)',
      tipPl: 'Krótki profil kandydata na górze CV zwiększa szanse na kontakt o 40%.',
      tipEn: 'A punchy executive summary on top increases recruiter response rates by 40%.',
      points: 10,
      status: summaryPass ? 'pass' : 'warning',
      targetTab: 'summary'
    },
    {
      id: 'skills',
      labelPl: 'Minimum 4 kluczowe umiejętności techniczne',
      labelEn: 'At least 4 core technical skills',
      tipPl: 'Systemy ATS skanują twarde kompetencje (np. SAP, Excel, SQL, Prawo Jazdy, UDT).',
      tipEn: 'ATS scanners search for verified hard proficiencies (e.g. ERP, Excel, SQL, licenses).',
      points: 10,
      status: skillsPass ? 'pass' : 'warning',
      targetTab: 'skills'
    },
    {
      id: 'languages',
      labelPl: 'Języki obce ze skalą CEFR (A1-C2)',
      labelEn: 'Languages with European CEFR scale',
      tipPl: 'Jasne określenie poziomu (np. B2 - komunikatywny biznesowy).',
      tipEn: 'Clear level indicator (e.g. B2 professional proficiency).',
      points: 10,
      status: languagesPass ? 'pass' : 'warning',
      targetTab: 'languages'
    },
    {
      id: 'work-permit',
      labelPl: 'Status legalności pracy w Polsce',
      labelEn: 'Work eligibility in Poland',
      tipPl: 'Wskazanie obywatelstwa UE, Karty Pobytu, statusu PESEL UKR lub oświadczenia.',
      tipEn: 'EU citizenship, Karta Pobytu, PESEL UKR, or work declaration stated.',
      points: 5,
      status: workEligibilityPass ? 'pass' : 'warning',
      targetTab: 'personal'
    },
    {
      id: 'photo',
      labelPl: 'Zdjęcie biznesowe w CV (standard PL/EU)',
      labelEn: 'Professional photo headshot (PL/EU)',
      tipPl: 'W Polsce zdjęcie jest mile widziane (opcjonalne w ofertach międzynarodowych).',
      tipEn: 'Customary in Poland/EU; can be disabled for UK/US tech roles.',
      points: 5,
      status: photoPresent ? 'pass' : 'warning',
      targetTab: 'personal'
    }
  ];

  // Calculate actual sum
  let total = 0;
  items.forEach((item) => {
    if (item.status === 'pass') total += item.points;
    else if (item.status === 'warning') total += Math.floor(item.points * 0.5);
  });

  return {
    score: Math.min(100, Math.max(0, total)),
    items
  };
}

interface BadgeProps {
  score: number;
  onClick: () => void;
  language: LanguageCode;
}

export const CvScoreBadge: React.FC<BadgeProps> = ({ score, onClick, language }) => {
  const isPl = language === 'pl';
  const color =
    score >= 80
      ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
      : score >= 60
      ? 'border-amber-500 text-amber-700 bg-amber-50'
      : 'border-rose-500 text-rose-700 bg-rose-50';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-2xs font-bold text-xs transition-transform hover:scale-105 ${color}`}
      title={isPl ? 'Kliknij, aby otworzyć audyt punktowy CV' : 'Click to inspect CV Score checklist'}
    >
      <div className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-[9px] font-black font-mono">
        {score}
      </div>
      <span>{isPl ? 'Ocena CV' : 'CV Score'}</span>
    </button>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
  onSelectTab: (tab: any) => void;
  onOpenDeepAudit: () => void;
  onOpenAtsMatcher: () => void;
}

export const CvScoreModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  cv,
  onChangeCv,
  language,
  onSelectTab,
  onOpenDeepAudit,
  onOpenAtsMatcher
}) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';

  const handleFixRodo = () => {
    onChangeCv({
      ...cv,
      rodo: {
        enabled: true,
        type: 'current',
        text: RODO_TEMPLATES.pl.current
      }
    });
  };

  const { score, items } = calculateCvScore(cv, handleFixRodo);

  const getScoreSummary = () => {
    if (score >= 85) return isPl ? 'Gotowe do wysyłania! Bardzo wysoka jakość.' : 'Ready to submit! Excellent standard.';
    if (score >= 65) return isPl ? 'Dobre CV – kilka drobnych poprawek zwiększy szanse.' : 'Good resume – minor tweaks will boost response rates.';
    return isPl ? 'Wymaga uzupełnienia kluczowych sekcji przed aplikowaniem.' : 'Needs completion before sending to recruiters.';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-black font-mono shadow-xs ${
                score >= 80
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : score >= 60
                  ? 'border-amber-500 bg-amber-50 text-amber-800'
                  : 'border-rose-500 bg-rose-50 text-rose-800'
              }`}
            >
              <span className="text-xl leading-none">{score}</span>
              <span className="text-[9px] font-bold uppercase mt-0.5">/100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  {isPl ? 'Lokalna Ocena CV (Polski Rynek & ATS)' : 'CV Quality & Polish Market Score'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  Real-time
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">{getScoreSummary()}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checklist */}
        <div className="p-5 overflow-y-auto space-y-2.5 flex-1">
          {items.map((item) => {
            const isPass = item.status === 'pass';
            const isWarn = item.status === 'warning';
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 transition ${
                  isPass
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : isWarn
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-rose-200 bg-rose-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isPass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isWarn ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {isPl ? item.labelPl : item.labelEn}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {isPl ? item.tipPl : item.tipEn}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5">
                  {item.fixAction ? (
                    <button
                      type="button"
                      onClick={() => {
                        item.fixAction?.();
                      }}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-2xs transition"
                    >
                      {isPl ? item.fixLabelPl || 'Napraw' : item.fixLabelEn || 'Fix'}
                    </button>
                  ) : item.targetTab ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectTab(item.targetTab);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition flex items-center gap-1"
                    >
                      <span>{isPl ? 'Przejdź' : 'Edit'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions: deep audit & ATS match */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDeepAudit();
              }}
              className="text-slate-700 hover:text-indigo-600 font-bold underline flex items-center gap-1"
            >
              <span>{isPl ? 'Pełny audyt rekruterski (Deep Audit) →' : 'Deep Recruiter Audit →'}</span>
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAtsMatcher();
              }}
              className="text-slate-700 hover:text-indigo-600 font-bold underline flex items-center gap-1"
            >
              <span>{isPl ? 'Dopasuj do ogłoszenia (ATS) →' : 'Match job ad (ATS) →'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold"
          >
            {isPl ? 'Gotowe' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
