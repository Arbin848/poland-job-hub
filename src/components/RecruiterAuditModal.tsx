import React from 'react';
import { CVData, LanguageCode } from '../types/cv';
import { RODO_TEMPLATES } from '../data/rodoTemplates';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Phone,
  FileCheck,
  Car,
  Globe2,
  Sparkles,
  ArrowRight,
  Maximize2,
  UserCheck,
  X,
  ExternalLink,
  Zap
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
}

interface AuditItem {
  id: string;
  category: 'critical' | 'recommended' | 'bonus';
  titlePl: string;
  titleEn: string;
  titleUa?: string;
  status: 'pass' | 'warning' | 'fail';
  descriptionPl: string;
  descriptionEn?: string;
  descriptionUa?: string;
  fixAction?: () => void;
  fixLabelPl?: string;
  fixLabelEn?: string;
  fixLabelUa?: string;
}

export const RecruiterAuditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cv,
  onChangeCv,
  language
}) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';

  const { personalInfo, experiences, educations, technicalSkills, languages, rodo, fontScale } = cv;

  // 1. RODO check
  const rodoPass = rodo && rodo.enabled && rodo.text && rodo.text.length > 50;
  
  // 2. Phone format (+48)
  const phoneClean = personalInfo.phone.replace(/\s+/g, '');
  const phoneHasPrefix = phoneClean.startsWith('+') || phoneClean.startsWith('00');
  const phonePass = phoneClean.length >= 9 && phoneHasPrefix;

  // 3. Email professional format
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email);
  const emailPass = emailValid && !personalInfo.email.includes('buziacek') && !personalInfo.email.includes('ziom');

  // 4. STAR action verbs in bullets
  const allBullets = experiences.flatMap(e => e.bullets || []);
  const starActionVerbs = ['zarządzanie', 'wdrożenie', 'optymalizacja', 'opracowanie', 'koordynacja', 'redukcja', 'zwiększenie', 'nadzór', 'tworzenie', 'kierowanie', 'managed', 'led', 'engineered', 'optimized', 'developed', 'achieved', 'reduced', 'implemented'];
  const actionBulletsCount = allBullets.filter(b => 
    starActionVerbs.some(verb => b.toLowerCase().includes(verb))
  ).length;
  const starPass = allBullets.length > 0 && actionBulletsCount >= Math.min(3, allBullets.length);

  // 5. Driving license
  const hasDrivingLicense = Boolean(personalInfo.drivingLicense && personalInfo.drivingLicense.trim().length > 0);

  // 6. Foreign Languages CEFR
  const hasLanguages = languages && languages.length > 0;

  // 7. Technical Skills count
  const hasEnoughSkills = technicalSkills.length >= 4;

  // 8. Work eligibility (critical for Poland agencies)
  const hasWorkEligibility = Boolean(personalInfo.workEligibility && personalInfo.workEligibility.trim().length > 0);

  // 9. Photo present
  const hasPhoto = Boolean(personalInfo.showPhoto && personalInfo.photoUrl);

  // 10. Density / single page fit
  const estimatedSectionsCount = (experiences.length * 2) + educations.length + (allBullets.length * 0.5);
  const overflowRisk = estimatedSectionsCount > 10 && fontScale !== 'compact';

  // Calculate score
  let score = 0;
  if (rodoPass) score += 25; // Heaviest in Poland
  if (phonePass) score += 10;
  if (emailPass) score += 10;
  if (starPass) score += 15;
  if (hasEnoughSkills) score += 10;
  if (hasLanguages) score += 10;
  if (hasDrivingLicense) score += 5;
  if (hasWorkEligibility) score += 5;
  if (hasPhoto) score += 5;
  if (!overflowRisk) score += 5;

  const auditItems: AuditItem[] = [
    {
      id: 'rodo',
      category: 'critical',
      titlePl: 'Klauzula RODO / Ochrona Danych (Wymóg w Polsce)',
      titleEn: 'Polish GDPR / RODO Consent Clause (Mandatory in PL)',
      status: rodoPass ? 'pass' : 'fail',
      descriptionPl: rodoPass
        ? 'Zgoda na przetwarzanie danych osobowych jest włączona i prawidłowa. Rekruter może legalnie przetwarzać Twoją aplikację.'
        : 'BRAK KLAUZULI! Polskie prawo (art. 6 RODO) zabrania agencjom i pracodawcom kontaktu z kandydatem bez wyraźnej zgody.',
      fixAction: () => {
        onChangeCv({
          ...cv,
          rodo: {
            enabled: true,
            type: 'current',
            text: RODO_TEMPLATES.pl.current
          }
        });
      },
      fixLabelPl: 'Wstaw aktualną klauzulę RODO (1 klik)',
      fixLabelEn: 'Insert compliant Polish RODO clause (1-click)'
    },
    {
      id: 'phone',
      category: 'critical',
      titlePl: 'Numer telefonu z prefiksem kraju (+48)',
      titleEn: 'Phone Number with Country Code (+48)',
      status: phonePass ? 'pass' : 'warning',
      descriptionPl: phonePass
        ? `Format telefonu (${personalInfo.phone}) zawiera kod międzynarodowy, co ułatwia systemom ATS i rekruterom bezpośrednie połączenie.`
        : 'Brak prefiksu międzynarodowego (np. +48). Dla rekruterów i systemów VOIP numer może być nieczytelny.',
      fixAction: () => {
        const raw = personalInfo.phone.replace(/[^0-9]/g, '');
        const withPrefix = raw.startsWith('48') ? `+${raw}` : `+48 ${personalInfo.phone.trim()}`;
        onChangeCv({
          ...cv,
          personalInfo: { ...cv.personalInfo, phone: withPrefix }
        });
      },
      fixLabelPl: 'Dodaj prefiks +48',
      fixLabelEn: 'Add +48 prefix'
    },
    {
      id: 'star',
      category: 'recommended',
      titlePl: 'Opisy obowiązków metodą STAR (Czasowniki Akcji)',
      titleEn: 'STAR Method Job Duties (Action Verbs & Impact)',
      status: starPass ? 'pass' : 'warning',
      descriptionPl: starPass
        ? `Świetnie! Zidentyfikowano ${actionBulletsCount} punktów z aktywnymi czasownikami osiągnięć (np. Wdrożenie, Optymalizacja, Redukcja).`
        : 'Twoje punkty obowiązków brzmią pasywnie. Zastąp słowa "Zajmowanie się" mocnymi czasownikami: "Zarządzanie", "Optymalizacja", "Skrócenie czasu o 20%".',
      fixLabelPl: 'Użyj AI w sekcji Doświadczenie',
      fixLabelEn: 'Use STAR AI Bullet Enhancer'
    },
    {
      id: 'driving',
      category: 'bonus',
      titlePl: 'Prawo jazdy (Kategoria B / C+E)',
      titleEn: 'Driver’s License (Category B / C+E)',
      status: hasDrivingLicense ? 'pass' : 'warning',
      descriptionPl: hasDrivingLicense
        ? `Wpisano: ${personalInfo.drivingLicense}. Dla wielu stanowisk mobilnych w Polsce to kluczowa zaleta.`
        : 'Wielu polskich pracodawców (sprzedaż, serwis, logistyka, inżynieria) preferuje kandydatów z prawem jazdy Kat. B.',
      fixAction: () => {
        onChangeCv({
          ...cv,
          personalInfo: {
            ...cv.personalInfo,
            drivingLicense: 'Kat. B (czynne prawo jazdy)'
          }
        });
      },
      fixLabelPl: 'Dodaj "Kat. B (czynne)"',
      fixLabelEn: 'Add "Cat. B driver license"'
    },
    {
      id: 'languages',
      category: 'recommended',
      titlePl: 'Języki obce w europejskim standardzie CEFR (A1-C2)',
      titleEn: 'Foreign Languages with European CEFR Levels',
      status: hasLanguages ? 'pass' : 'fail',
      descriptionPl: hasLanguages
        ? `Zdefiniowano ${languages.length} język(i). Rekruterzy w Polsce i Europie natychmiast rozumieją poziomy B1/B2/C1.`
        : 'Nie podano języków. Nawet język ojczysty (Polski: Native) i podstawowy angielski warto wykazać.',
    },
    {
      id: 'workEligibility',
      category: 'recommended',
      titlePl: 'Status legalności zatrudnienia w Polsce / UE',
      titleEn: 'Work Eligibility & Citizenship Status in Poland',
      status: hasWorkEligibility ? 'pass' : 'warning',
      descriptionPl: hasWorkEligibility
        ? `Wpisano status: ${personalInfo.workEligibility}. Zmniejsza formalności i wątpliwości działu kadr.`
        : 'Dla agencji pracy w Polsce informacja "Obywatelstwo UE / Karta Pobytu / Nie wymaga zezwolenia" drastycznie przyspiesza proces zatrudnienia.',
      fixAction: () => {
        onChangeCv({
          ...cv,
          personalInfo: {
            ...cv.personalInfo,
            workEligibility: 'Obywatelstwo UE / Nie wymaga zezwolenia na pracę w Polsce',
            workEligibilityType: 'Obywatelstwo UE'
          }
        });
      },
      fixLabelPl: 'Ustaw status Obywatel UE',
      fixLabelEn: 'Set EU Citizen status'
    },
    {
      id: 'overflow',
      category: 'recommended',
      titlePl: 'Kontrola długości dokumentu A4 (Bez uciętych 2 linijek)',
      titleEn: 'A4 Page Boundary & Overflow Protection',
      status: overflowRisk ? 'warning' : 'pass',
      descriptionPl: overflowRisk
        ? 'Duża ilość treści może spowodować przelanie się 2-3 samotnych linijek na stronę 2. Zalecamy przełączenie gęstości na "Kompaktowy".'
        : 'Objętość CV mieści się idealnie w proporcjach strony A4.',
      fixAction: () => {
        onChangeCv({ ...cv, fontScale: 'compact' });
      },
      fixLabelPl: 'Włącz skalę Kompaktową (Zmieść na 1 stronie)',
      fixLabelEn: 'Enable Compact scale (Fit 1 page)'
    }
  ];

  const getScoreColor = () => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getScoreBadge = () => {
    if (score >= 85) return isPl ? 'Gotowe do wysyłki do agencji & pracodawcy' : 'Agency Certified Ready';
    if (score >= 65) return isPl ? 'Dobre, wymaga 1-2 drobnych poprawek' : 'Good, needs minor polish';
    return isPl ? 'Wymaga uzupełnienia krytycznych danych' : 'Action required';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{isPl ? 'Audyt Rekrutera & Zgodność z Polskim Rynkiem' : 'Agency Recruiter Audit & Polish Market Check'}</span>
                <span className="text-[10px] font-mono bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/20">
                  PL / EU 2026
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {isPl
                  ? 'Automatyczny audyt 10 kluczowych elementów, na które polskie agencje pracy zwracają uwagę przed telefonem do kandydata.'
                  : 'Automated 10-point audit checking what Polish recruitment agencies verify before calling a candidate.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Banner */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center shrink-0 shadow-xs ${getScoreColor()}`}>
              <span className="text-2xl font-black font-mono leading-none">{score}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">/ 100 {isPl ? 'pkt' : 'pts'}</span>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <span>{isPl ? 'Wynik Gotowości Rekrutacyjnej:' : 'Recruitment Readiness Score:'}</span>
                <span className="text-indigo-600">{getScoreBadge()}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                {isPl
                  ? rodoPass
                    ? 'Twoje CV spełnia kluczowe polskie wymogi prawne i ma wysokie szanse na przejście przez automatyczny filtr ATS.'
                    : 'Uwaga! Brak klauzuli RODO dyskwalifikuje CV w 95% polskich firm i agencji pracy.'
                  : 'Checks compliance with Polish employment standards and automated applicant tracking systems.'}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Checklist Items */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          {auditItems.map((item) => {
            const isPass = item.status === 'pass';
            const isWarning = item.status === 'warning';
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border transition ${
                  isPass
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : isWarning
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-rose-200 bg-rose-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {isPass ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">
                          {isPl ? item.titlePl : item.titleEn}
                        </span>
                        {item.category === 'critical' && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded">
                            {isPl ? 'Krytyczne' : 'Critical'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {isPl ? item.descriptionPl : (item.descriptionEn || item.descriptionPl)}
                      </p>
                    </div>
                  </div>

                  {item.fixAction && !isPass && (
                    <button
                      type="button"
                      onClick={item.fixAction}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition shrink-0 whitespace-nowrap"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isPl ? item.fixLabelPl : item.fixLabelEn}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <span className="text-slate-500">
            {isPl
              ? 'PolJobHub · Rekomendacje oparte o praktykę agencji w Polsce'
              : 'PolJobHub · Poland Agency Hiring Standards'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs transition"
          >
            {isPl ? 'Zamknij i wróć do edycji' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
