import React from 'react';
import { CVData, LanguageCode, FontFamily } from '../../types/cv';
import { Sliders, Eye, EyeOff, Type, FileSpreadsheet, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';

interface Props {
  cv: CVData;
  onChange: (updated: CVData) => void;
  language: LanguageCode;
}

export const SectionVisibilitySettings: React.FC<Props> = ({ cv, onChange, language }) => {
  const isPl = language === 'pl';

  const currentVisibility = cv.sectionVisibility || {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: true,
    certifications: true,
    projects: true,
    rodo: true,
  };

  const handleToggle = (key: keyof typeof currentVisibility) => {
    const updated = {
      ...currentVisibility,
      [key]: !currentVisibility[key]
    };
    onChange({
      ...cv,
      sectionVisibility: updated
    });
  };

  const fontOptions: { id: FontFamily; name: string; preview: string; description: string }[] = [
    { id: 'jakarta', name: 'Plus Jakarta Sans', preview: 'Współczesny, czytelny i profesjonalny', description: 'Domyślny krój nowoczesnych korporacji i agencji' },
    { id: 'inter', name: 'Inter', preview: 'Maksymalna czytelność na ekranie i wydruku', description: 'Standard technologiczny, świetny dla IT i finansów' },
    { id: 'roboto', name: 'Roboto', preview: 'Uniwersalny standard europejski', description: 'Neutralny, czytelny, bezpieczny dla wszystkich systemów ATS' },
    { id: 'merriweather', name: 'Merriweather (Serif)', preview: 'Klasyczna elegancja z szeryfami', description: 'Idealny dla prawa, uczelni, medycyny i stanowisk executive' },
    { id: 'outfit', name: 'Outfit', preview: 'Geometryczny, świeży design', description: 'Doskonały dla marketingu, designu i stanowisk kreatywnych' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <span>{isPl ? 'Układ Strony, Czcionki & Widoczność Sekcji' : 'Layout, Fonts & Section Visibility'}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isPl
            ? 'Dopasuj układ CV dokładnie pod wymogi Twojej branży. Wyłącz sekcje, których nie potrzebujesz, lub zmień gęstość tekstu, aby zmieścić CV dokładnie na 1 stronie A4.'
            : 'Tailor your CV structure to your exact job market requirements. Toggle unused sections or adjust text density to fit neatly on 1 A4 page.'}
        </p>
      </div>

      {/* Typography Font Family */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
          <Type className="w-4 h-4 text-indigo-600" />
          <span>{isPl ? 'Krój pisma (Font z pełną obsługą polskich znaków ą, ć, ę, ł, ń, ó, ś, ź, ż)' : 'Font Family (Full Polish & EU diacritics support)'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fontOptions.map((f) => {
            const isSelected = (cv.fontFamily || 'jakarta') === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange({ ...cv, fontFamily: f.id })}
                className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{f.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{f.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Scale & Spacing (1-page fit helper) */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
            <FileSpreadsheet className="w-4 h-4 text-indigo-600" />
            <span>{isPl ? 'Gęstość tekstu i marginesy (Dopasowanie do 1 strony A4)' : 'Text Density & Spacing (1-Page Fit)'}</span>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded">
            {cv.fontScale || 'normal'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...cv, fontScale: 'compact' })}
            className={`p-2.5 rounded-lg border text-center transition ${
              cv.fontScale === 'compact'
                ? 'border-indigo-600 bg-indigo-50/60 font-bold text-indigo-900'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
            }`}
          >
            <div className="text-xs font-semibold">{isPl ? 'Kompaktowy' : 'Compact'}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isPl ? 'Zmieść na 1 stronie' : 'Fit onto 1 page'}</div>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...cv, fontScale: 'normal' })}
            className={`p-2.5 rounded-lg border text-center transition ${
              cv.fontScale === 'normal'
                ? 'border-indigo-600 bg-indigo-50/60 font-bold text-indigo-900'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
            }`}
          >
            <div className="text-xs font-semibold">{isPl ? 'Standardowy' : 'Normal'}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isPl ? 'Zbalansowany' : 'Balanced'}</div>
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...cv, fontScale: 'relaxed' })}
            className={`p-2.5 rounded-lg border text-center transition ${
              cv.fontScale === 'relaxed'
                ? 'border-indigo-600 bg-indigo-50/60 font-bold text-indigo-900'
                : 'border-slate-200 hover:bg-slate-50 text-slate-700 text-xs'
            }`}
          >
            <div className="text-xs font-semibold">{isPl ? 'Przestronny' : 'Spacious'}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{isPl ? 'Dla krótszych CV' : 'For shorter CVs'}</div>
          </button>
        </div>
      </div>

      {/* Section Visibility Switches */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
          <Eye className="w-4 h-4 text-indigo-600" />
          <span>{isPl ? 'Włącz / Wyłącz sekcje na wydruku i podglądzie' : 'Toggle Sections on CV & PDF'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { key: 'summary', labelPl: 'Podsumowanie zawodowe (O mnie)', labelEn: 'Professional Summary', notePl: 'Kluczowe dla rekrutera' },
            { key: 'experience', labelPl: 'Doświadczenie zawodowe', labelEn: 'Work Experience', notePl: 'Główny filar CV' },
            { key: 'education', labelPl: 'Wykształcenie & Uczelnie', labelEn: 'Education & Faculty', notePl: 'Szkoły, stopnie i wydziały' },
            { key: 'skills', labelPl: 'Umiejętności techniczne & miękkie', labelEn: 'Skills & Tools', notePl: 'Hard & soft skills' },
            { key: 'languages', labelPl: 'Języki obce (skala CEFR)', labelEn: 'Foreign Languages (CEFR)', notePl: 'Poziomy A1 - C2' },
            { key: 'certifications', labelPl: 'Certyfikaty & Uprawnienia', labelEn: 'Certificates & Licenses', notePl: 'UDT, SEP, ISO, itp.' },
            { key: 'projects', labelPl: 'Projekty & Portfolio', labelEn: 'Projects & Portfolio', notePl: 'Wdrożenia i realizacje' },
            { key: 'rodo', labelPl: 'Polska Klauzula RODO', labelEn: 'Polish GDPR / RODO Clause', notePl: 'Obowiązkowa w Polsce' },
          ].map((sec) => {
            const isVisible = currentVisibility[sec.key as keyof typeof currentVisibility];
            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => handleToggle(sec.key as keyof typeof currentVisibility)}
                className={`p-3 rounded-lg border flex items-center justify-between text-left transition ${
                  isVisible
                    ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                    : 'border-slate-200 bg-slate-50 text-slate-400 opacity-75'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs flex items-center gap-1.5">
                    {isVisible ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span>{isPl ? sec.labelPl : sec.labelEn}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{sec.notePl}</div>
                </div>
                <div
                  className={`w-9 h-5 flex items-center rounded-full p-1 transition ${
                    isVisible ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special Target Market Toggles */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-slate-700" />
          <span>{isPl ? 'Rekomendacje rynkowe agencji:' : 'Agency Market Tips:'}</span>
        </div>
        <p className="text-slate-600 text-[11px]">
          {isPl
            ? '• W Polsce rekruterzy oczekują zdjęcia oraz klauzuli RODO. Zdjęcie buduje relację, a bez RODO kandydatury nie można przetwarzać.'
            : '• In Poland, photos and RODO clauses are standard. However, when applying to UK, Ireland, or Scandinavia, toggle photo OFF to comply with anti-bias guidelines.'}
        </p>
      </div>
    </div>
  );
};
