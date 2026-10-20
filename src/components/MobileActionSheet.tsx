import React from 'react';
import { LanguageCode } from '../types/cv';
import {
  Palette,
  Layers,
  FileText,
  ShieldCheck,
  Sparkles,
  Copy,
  Download,
  Upload,
  HelpCircle,
  Printer,
  X,
  Box
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  onOpenTemplates: () => void;
  onOpenPresets: () => void;
  onOpenEuropass: () => void;
  onOpenAts: () => void;
  onOpenRecruiterAudit: () => void;
  onOpenImport: () => void;
  onOpenPlainText: () => void;
  onOpenGuide: () => void;
  onExportJson: () => void;
  onTriggerImportJson: () => void;
  onPrintPdf: () => void;
  onOpenCandidateSuccess?: () => void;
  onToggle3D?: () => void;
}

export const MobileActionSheet: React.FC<Props> = ({
  isOpen,
  onClose,
  language,
  onOpenTemplates,
  onOpenPresets,
  onOpenEuropass,
  onOpenAts,
  onOpenRecruiterAudit,
  onOpenImport,
  onOpenPlainText,
  onOpenGuide,
  onExportJson,
  onTriggerImportJson,
  onPrintPdf,
  onOpenCandidateSuccess,
  onToggle3D
}) => {
  if (!isOpen) return null;
  const isPl = language === 'pl';

  const actions = [
    ...(onOpenCandidateSuccess
      ? [
          {
            icon: <Sparkles className="w-5 h-5 text-amber-500" />,
            title: isPl ? '🚀 Asystent Pracy & Szybki Kreator (60s)' : '🚀 Job Assistant & 60s CV Wizard',
            desc: isPl ? 'Gotowy wzorzec dla Twojego zawodu, legalizacja pracy, kalkulator pensji netto' : 'Fast trade wizard, work legalization, net salary calculator',
            handler: () => {
              onClose();
              onOpenCandidateSuccess();
            }
          }
        ]
      : []),
    ...(onToggle3D
      ? [
          {
            icon: <Box className="w-5 h-5 text-indigo-600" />,
            title: isPl ? 'Studio 3D & Prezentacja Biurkowa' : '3D Desk Studio & Showcase',
            desc: isPl ? 'Interaktywna makieta 3D, obrót 360°, pobieranie mockupu' : 'Interactive 3D paper mockup on executive desk',
            handler: () => {
              onClose();
              onToggle3D();
            }
          }
        ]
      : []),
    {
      icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
      title: isPl ? 'Audyt Rekrutera (Zgodność z PL/EU)' : 'Agency Recruiter Audit (PL/EU Check)',
      desc: isPl ? 'Automatyczny audyt 10 punktów (RODO, telefon, czasowniki STAR)' : '10-point check before sending to employers',
      handler: () => { onClose(); onOpenRecruiterAudit(); }
    },
    {
      icon: <Palette className="w-5 h-5 text-indigo-600" />,
      title: isPl ? 'Wybierz Styl / Szablon CV' : 'Change CV Template',
      desc: isPl ? '6 nowoczesnych wzorów (Executive, ATS, Euro Modern)' : '6 modern formats',
      handler: () => { onClose(); onOpenTemplates(); }
    },
    {
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: isPl ? 'Gotowe Wzorce Branżowe' : 'Industry Master Presets',
      desc: isPl ? 'Logistyka, IT, Medycyna, Inżynieria, Studenci' : 'Pre-filled faculty profiles',
      handler: () => { onClose(); onOpenPresets(); }
    },
    {
      icon: <FileText className="w-5 h-5 text-sky-600" />,
      title: isPl ? 'Porównanie z Europass' : 'Europass Comparison',
      desc: isPl ? 'Dlaczego pracodawcy w Polsce preferują PolCV' : 'Why modern beats traditional Europass',
      handler: () => { onClose(); onOpenEuropass(); }
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: isPl ? 'Audytor ATS & Skaner Oferty' : 'ATS Score & Job Matcher',
      desc: isPl ? 'Wklej ofertę z Pracuj.pl i sprawdź zgodność' : 'Scan keyword match against job posting',
      handler: () => { onClose(); onOpenAts(); }
    },
    {
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      title: isPl ? 'Wgraj Stare CV / Europass' : 'Import Old CV / Europass',
      desc: isPl ? 'AI automatycznie wyodrębni Twoje dane' : 'AI parses raw text into modern CV',
      handler: () => { onClose(); onOpenImport(); }
    },
    {
      icon: <Copy className="w-5 h-5 text-slate-700" />,
      title: isPl ? 'Kopiuj Czysty Tekst (Pracuj.pl/OLX)' : 'Copy Plain Text for Job Forms',
      desc: isPl ? 'Do wklejenia w formularze rekrutacyjne' : 'Ready to paste into job boards',
      handler: () => { onClose(); onOpenPlainText(); }
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-purple-600" />,
      title: isPl ? 'Poradnik Agencji: Rynek Pracy w RP' : 'Agency Guide: Working in Poland',
      desc: isPl ? 'Klauzula RODO, Karta Pobytu, Zdjęcie, CEFR' : 'RODO legal, residency & permit tips',
      handler: () => { onClose(); onOpenGuide(); }
    },
    {
      icon: <Download className="w-5 h-5 text-slate-600" />,
      title: isPl ? 'Zapisz Kopię Zapasową (JSON)' : 'Save Backup File (JSON)',
      desc: isPl ? 'Pobierz plik, aby edytować CV w przyszłości' : 'Keep full backup on your device',
      handler: () => { onClose(); onExportJson(); }
    },
    {
      icon: <Upload className="w-5 h-5 text-slate-600" />,
      title: isPl ? 'Wczytaj Zapisany Plik (JSON)' : 'Load Backup File (JSON)',
      desc: isPl ? 'Wznów pracę z pliku' : 'Restore from JSON file',
      handler: () => { onClose(); onTriggerImportJson(); }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col border border-slate-200 animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 sm:zoom-in-95">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {isPl ? 'Narzędzia i Opcje PolCV' : 'Tools & Quick Actions'}
            </h2>
            <div className="text-[11px] text-slate-500">
              {isPl ? 'Wszystko czego potrzebujesz do profesjonalnego CV' : 'Everything you need for job applications'}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg text-sm font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-3 divide-y divide-slate-100 flex-1">
          {actions.map((act, idx) => (
            <button
              key={idx}
              type="button"
              onClick={act.handler}
              className="w-full py-3 px-3 flex items-center gap-3.5 text-left rounded-lg hover:bg-slate-50 transition active:bg-slate-100 min-h-[48px]"
            >
              <div className="p-2 bg-slate-100 rounded-lg shrink-0">
                {act.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">{act.title}</div>
                <div className="text-[11px] text-slate-500 leading-tight">{act.desc}</div>
              </div>
              <span className="text-slate-400 text-xs">›</span>
            </button>
          ))}
        </div>

        {/* Quick Print CTA at bottom of drawer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
          <button
            type="button"
            onClick={() => { onClose(); onPrintPdf(); }}
            className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>{isPl ? 'Drukuj / Pobierz PDF' : 'Print / Download PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
