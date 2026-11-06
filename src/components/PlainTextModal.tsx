import React, { useState } from 'react';
import { CVData, LanguageCode } from '../types/cv';
import { Copy, Check, FileText } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cv: CVData;
  language: LanguageCode;
}

export const PlainTextModal: React.FC<Props> = ({ isOpen, onClose, cv, language }) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';
  const [copied, setCopied] = useState(false);

  // Generate clean plain text formatting
  const formattedText = `
${cv.personalInfo.fullName.toUpperCase()}
${cv.personalInfo.jobTitle}
Email: ${cv.personalInfo.email} | Tel: ${cv.personalInfo.phone} | Lokalizacja: ${cv.personalInfo.location}
${cv.personalInfo.linkedIn ? `LinkedIn: ${cv.personalInfo.linkedIn}\n` : ''}${cv.personalInfo.drivingLicense ? `Prawo jazdy: ${cv.personalInfo.drivingLicense}\n` : ''}${cv.personalInfo.workEligibility ? `Status prawny: ${cv.personalInfo.workEligibility}\n` : ''}
==================================================
PODSUMOWANIE ZAWODOWE / PROFESSIONAL SUMMARY
==================================================
${cv.summary}

==================================================
DOŚWIADCZENIE ZAWODOWE / WORK EXPERIENCE
==================================================
${cv.experiences.map((exp) => `
* ${exp.role} | ${exp.company} (${exp.location})
  Okres: ${exp.startDate} - ${exp.current ? 'Obecnie' : exp.endDate}
${exp.bullets.map((b) => `  - ${b}`).join('\n')}
`).join('')}
==================================================
WYKSZTAŁCENIE / EDUCATION
==================================================
${cv.educations.map((edu) => `
* ${edu.degree} - ${edu.fieldOfStudy}
  ${edu.institution} ${edu.faculty ? `(${edu.faculty})` : ''} | ${edu.startDate} - ${edu.endDate || 'Obecnie'}
  ${edu.gradeOrDetails ? `Szczegóły: ${edu.gradeOrDetails}` : ''}
`).join('')}
==================================================
UMIEJĘTNOŚCI & NARZĘDZIA / SKILLS & TOOLS
==================================================
Kompetencje twarde: ${cv.technicalSkills.join(', ')}
Narzędzia i certyfikaty: ${cv.toolsAndCertificates.join(', ')}
Umiejętności miękkie: ${cv.softSkills.join(', ')}

==================================================
ZNAJOMOŚĆ JĘZYKÓW / LANGUAGES (CEFR)
==================================================
${cv.languages.map((l) => `* ${l.language}: ${l.level} ${l.details ? `(${l.details})` : ''}`).join('\n')}

==================================================
KLAUZULA RODO / DATA PROTECTION CONSENT
==================================================
${cv.rodo.enabled ? cv.rodo.text : ''}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Kopiuj Czysty Tekst (Pracuj.pl, OLX, LinkedIn)' : 'Copy Plain Text for Job Applications'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-5 sm:p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-800" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {isPl ? 'Kopiuj Czysty Tekst (Pracuj.pl, OLX, LinkedIn)' : 'Copy Plain Text for Job Applications'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={isPl ? 'Zamknij' : 'Close'}
            className="p-1 text-slate-400 hover:text-slate-600 font-bold rounded"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-500 my-3 leading-relaxed">
          {isPl
            ? 'Gdy aplikujesz przez formularze internetowe (np. Pracuj.pl, OLX Praca, formularze agencji), pracodawcy często proszą o wklejenie treści CV w pola tekstowe. Skopiuj poniższy sformatowany tekst jednym kliknięciem!'
            : 'For online portal application forms requiring raw text. Formatted cleanly with section dividers and RODO clause.'}
        </p>

        <div className="relative">
          <textarea
            readOnly
            rows={12}
            value={formattedText}
            className="w-full p-3 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden"
          />
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500">
            {isPl ? 'Zawiera pełne dane i klauzulę RODO.' : 'Includes full profile data & RODO clause.'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
            >
              {isPl ? 'Zamknij' : 'Close'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{isPl ? 'Skopiowano do schowka!' : 'Copied to clipboard!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{isPl ? 'Skopiuj cały tekst' : 'Copy Plain Text'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
