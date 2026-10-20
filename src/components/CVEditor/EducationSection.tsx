import React from 'react';
import { EducationItem, LanguageCode } from '../../types/cv';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  educations: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
  language: LanguageCode;
}

export const EducationSection: React.FC<Props> = ({ educations, onChange, language }) => {
  const isPl = language === 'pl';

  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: isPl ? 'Uniwersytet Warszawski' : 'Warsaw University of Technology',
      faculty: isPl ? 'Wydział Zarządzania' : 'Faculty of Management',
      degree: isPl ? 'Magister (Mgr)' : 'Master of Science (M.Sc.)',
      fieldOfStudy: isPl ? 'Zarządzanie i Logistyka' : 'Management & Logistics',
      startDate: '2020-10',
      endDate: '2022-06',
      gradeOrDetails: ''
    };
    onChange([...educations, newEdu]);
  };

  const handleRemove = (idx: number) => {
    onChange(educations.filter((_, i) => i !== idx));
  };

  const handleUpdate = (idx: number, patch: Partial<EducationItem>) => {
    const updated = [...educations];
    updated[idx] = { ...updated[idx], ...patch };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {educations.map((edu, idx) => (
        <div key={edu.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-800">
              <GraduationCap className="w-4 h-4 text-slate-600" />
              <span>#{idx + 1} {edu.degree || (isPl ? 'Wykształcenie' : 'Degree')}</span>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isPl ? 'Usuń' : 'Remove'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Nazwa Uczelni / Szkoły' : 'Institution / University'} *
              </label>
              <input
                type="text"
                value={edu.institution ?? ''}
                onChange={(e) => handleUpdate(idx, { institution: e.target.value })}
                placeholder="np. Politechnika Warszawska / AGH w Krakowie"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Wydział (Faculty)' : 'Faculty / Department'}
              </label>
              <input
                type="text"
                value={edu.faculty ?? ''}
                onChange={(e) => handleUpdate(idx, { faculty: e.target.value })}
                placeholder="np. Wydział Transportu / Wydział Informatyki"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Uzyskany Tytuł / Stopień' : 'Degree / Title'} *
              </label>
              <input
                type="text"
                value={edu.degree ?? ''}
                onChange={(e) => handleUpdate(idx, { degree: e.target.value })}
                placeholder="np. Magister Inżynier / Licencjat / Technik"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Kierunek studiów / Specjalność' : 'Field of Study'} *
              </label>
              <input
                type="text"
                value={edu.fieldOfStudy ?? ''}
                onChange={(e) => handleUpdate(idx, { fieldOfStudy: e.target.value })}
                placeholder="np. Logistyka / Informatyka / Ekonomia"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Okres nauki (od - do)' : 'Study Period (from - to)'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={edu.startDate ?? ''}
                  onChange={(e) => handleUpdate(idx, { startDate: e.target.value })}
                  placeholder="2019-10"
                  className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono"
                />
                <span className="text-slate-400">—</span>
                <input
                  type="text"
                  value={edu.endDate ?? ''}
                  onChange={(e) => handleUpdate(idx, { endDate: e.target.value })}
                  placeholder="2022-06"
                  className="w-1/2 px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {isPl ? 'Szczegóły / Temat pracy dyplomowej (opcjonalnie)' : 'Thesis topic / Honors (optional)'}
              </label>
              <input
                type="text"
                value={edu.gradeOrDetails ?? ''}
                onChange={(e) => handleUpdate(idx, { gradeOrDetails: e.target.value })}
                placeholder="np. Praca magisterska z wyróżnieniem / Stypendium Rektora"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddEducation}
        className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-slate-500 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center justify-center gap-2 transition"
      >
        <Plus className="w-4 h-4" />
        <span>{isPl ? 'Dodaj kolejną szkołę / uczelnię' : 'Add another education entry'}</span>
      </button>
    </div>
  );
};
