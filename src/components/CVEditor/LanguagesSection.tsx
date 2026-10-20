import React from 'react';
import { LanguageItem, LanguageCode, CefrLevel } from '../../types/cv';
import { Plus, Trash2, Globe2, HelpCircle } from 'lucide-react';

interface Props {
  languages: LanguageItem[];
  onChange: (updated: LanguageItem[]) => void;
  language: LanguageCode;
}

export const LanguagesSection: React.FC<Props> = ({ languages, onChange, language }) => {
  const isPl = language === 'pl';

  const cefrLevels: { value: CefrLevel; labelPl: string; labelEn: string; descPl: string; descEn: string }[] = [
    { value: 'Native', labelPl: 'Ojczysty', labelEn: 'Native', descPl: 'Język ojczysty', descEn: 'Mother tongue' },
    { value: 'C2', labelPl: 'C2 - Biegły', labelEn: 'C2 - Proficient', descPl: 'Pełna swoboda językowa', descEn: 'Mastery / Fluent' },
    { value: 'C1', labelPl: 'C1 - Zaawansowany', labelEn: 'C1 - Advanced', descPl: 'Płynny biznesowy i techniczny', descEn: 'Full professional proficiency' },
    { value: 'B2', labelPl: 'B2 - Średniozaawansowany wyższy', labelEn: 'B2 - Upper Intermediate', descPl: 'Swobodna komunikacja w pracy', descEn: 'Working professional' },
    { value: 'B1', labelPl: 'B1 - Średniozaawansowany', labelEn: 'B1 - Intermediate', descPl: 'Prosta komunikacja zawodowa', descEn: 'Threshold / Everyday work' },
    { value: 'A2', labelPl: 'A2 - Podstawowy wyższy', labelEn: 'A2 - Elementary', descPl: 'Podstawowe zwroty', descEn: 'Waystage / Elementary' },
    { value: 'A1', labelPl: 'A1 - Podstawowy', labelEn: 'A1 - Beginner', descPl: 'Początkujący', descEn: 'Breakthrough / Basic' },
  ];

  const handleAdd = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: isPl ? 'Angielski' : 'English',
      level: 'B2',
      details: isPl ? 'Płynny w mowie i piśmie' : 'Professional working proficiency'
    };
    onChange([...languages, newItem]);
  };

  const handleRemove = (idx: number) => {
    onChange(languages.filter((_, i) => i !== idx));
  };

  const handleUpdate = (idx: number, patch: Partial<LanguageItem>) => {
    const updated = [...languages];
    updated[idx] = { ...updated[idx], ...patch };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* CEFR Guide Callout */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
        <Globe2 className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900">
            {isPl ? 'Europejski standard CEFR (A1 — C2)' : 'European CEFR Standard (A1 — C2)'}
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isPl
              ? 'W Europie i Polsce rekruterzy preferują poziomy CEFR zamiast subiektywnych opisów (np. "bardzo dobry").'
              : 'Recruiters in the EU prefer standardized CEFR levels over subjective ratings.'}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {languages.map((l, idx) => (
          <div key={l.id} className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Język' : 'Language'}
                </label>
                <input
                  type="text"
                  value={l.language ?? ''}
                  onChange={(e) => handleUpdate(idx, { language: e.target.value })}
                  placeholder={isPl ? 'np. Angielski / Niemiecki' : 'e.g. Polish / English'}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Poziom (CEFR)' : 'Level (CEFR)'}
                </label>
                <select
                  value={l.level || 'B2'}
                  onChange={(e) => handleUpdate(idx, { level: e.target.value as CefrLevel })}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-medium"
                >
                  {cefrLevels.map((lvl) => (
                    <option key={lvl.value} value={lvl.value}>
                      {isPl ? lvl.labelPl : lvl.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {isPl ? 'Komentarz / Certyfikat' : 'Details / Certificate'}
                </label>
                <input
                  type="text"
                  value={l.details ?? ''}
                  onChange={(e) => handleUpdate(idx, { details: e.target.value })}
                  placeholder={isPl ? 'np. Certyfikat CAE, język techniczny' : 'e.g. Cambridge C1, Daily business'}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded self-end sm:self-center transition"
              title={isPl ? 'Usuń język' : 'Remove language'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full py-2 border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-1.5 transition"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{isPl ? 'Dodaj język obcy' : 'Add foreign language'}</span>
      </button>
    </div>
  );
};
