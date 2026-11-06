import React from 'react';
import { PRESET_PROFILES } from '../data/presets';
import { FacultyCategory, CVData, LanguageCode } from '../types/cv';
import { Truck, Code, Stethoscope, Wrench, Coins, Briefcase, GraduationCap, Utensils, Check } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (presetData: Partial<CVData>) => void;
  language: LanguageCode;
}

export const FacultyPresetsModal: React.FC<Props> = ({ isOpen, onClose, onSelectPreset, language }) => {
  useEscapeKey(onClose, isOpen);

  if (!isOpen) return null;
  const isPl = language === 'pl';

  const getIcon = (id: FacultyCategory) => {
    switch (id) {
      case 'logistics': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'it-software': return <Code className="w-5 h-5 text-teal-600" />;
      case 'healthcare': return <Stethoscope className="w-5 h-5 text-sky-600" />;
      case 'engineering': return <Wrench className="w-5 h-5 text-indigo-600" />;
      case 'finance': return <Coins className="w-5 h-5 text-amber-600" />;
      case 'sales': return <Briefcase className="w-5 h-5 text-rose-600" />;
      case 'student-academic': return <GraduationCap className="w-5 h-5 text-slate-700" />;
      case 'hospitality': return <Utensils className="w-5 h-5 text-orange-600" />;
      default: return <Briefcase className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isPl ? 'Gotowe Wzorce Branżowe i Wydziałowe' : 'Faculty & Industry Master Presets'}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 my-8"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isPl ? 'Gotowe Wzorce Branżowe i Wydziałowe' : 'Faculty & Industry Master Presets'}
            </div>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              {isPl ? 'Wybierz swój profil zawodowy lub kierunek' : 'Select your profession or faculty'}
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

        <p className="text-xs text-slate-600 my-4 leading-relaxed">
          {isPl
            ? 'Zamiast płacić agencjom setki złotych, wybierz poniższy profil. Aplikacja natychmiast załaduje profesjonalnie sformułowane obowiązki, uprawnienia (UDT, SEP, PWZ, MSR, ISO) oraz optymalny układ CV.'
            : 'Select your field to load a gold-standard prefilled CV with industry certifications, STAR-quantified bullet points, and recruiter-approved wording.'}
        </p>

        {/* Grid of Profiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {PRESET_PROFILES.map((profile) => (
            <div
              key={profile.id}
              onClick={() => {
                onSelectPreset({
                  ...profile.data,
                  templateId: profile.recommendedTemplate || profile.data.templateId || 'modern-polish'
                });
                onClose();
              }}
              className="p-4 rounded-lg border border-slate-200 hover:border-slate-900 hover:bg-slate-50 cursor-pointer transition flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="p-2 rounded-md bg-slate-100 w-fit mb-3 group-hover:bg-white transition">
                  {getIcon(profile.id)}
                </div>
                <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-900 leading-snug">
                  {isPl ? profile.namePl : profile.nameEn}
                </h3>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5 mb-2">
                  {isPl ? profile.facultyPl : profile.facultyEn}
                </div>
                <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-3">
                  {isPl ? profile.descriptionPl : profile.descriptionEn}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-700 group-hover:text-slate-900">
                <span>{isPl ? 'Załaduj wzorzec' : 'Load preset'}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200 text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            {isPl ? 'Anuluj' : 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};
