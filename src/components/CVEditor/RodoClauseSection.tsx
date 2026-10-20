import React from 'react';
import { RodoClause, LanguageCode } from '../../types/cv';
import { RODO_TEMPLATES } from '../../data/rodoTemplates';
import { ShieldAlert, CheckCircle, Info } from 'lucide-react';

interface Props {
  rodo: RodoClause;
  onChange: (updated: RodoClause) => void;
  language: LanguageCode;
}

export const RodoClauseSection: React.FC<Props> = ({ rodo, onChange, language }) => {
  const isPl = language === 'pl';

  const setTemplate = (type: 'current' | 'future' | 'short') => {
    const pool = isPl ? RODO_TEMPLATES.pl : RODO_TEMPLATES.en;
    const text = pool[type] || pool.current;
    onChange({
      enabled: true,
      type: type === 'short' ? 'custom' : type,
      text
    });
  };

  return (
    <div className="space-y-4">
      {/* Crucial legal callout for Poland */}
      <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-lg flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">
            {isPl
              ? 'Wymóg formalny w Polsce (art. 6 ust. 1 lit. a RODO)'
              : 'Mandatory Requirement for Poland (GDPR / RODO)'}
          </span>
          <p className="mt-0.5 text-amber-800 text-[11.5px]">
            {isPl
              ? 'W Polsce rekruterzy prawnie NIE MOGĄ przetwarzać Twojego CV ani do Ciebie zadzwonić bez podpisanej klauzuli. CV bez tej formuły jest automatycznie odrzucane przez agencje i działy HR.'
              : 'Polish employers and agencies are legally prohibited from contacting candidates whose CVs lack the GDPR / RODO consent clause.'}
          </p>
        </div>
      </div>

      {/* Enable toggle */}
      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg">
        <div>
          <div className="text-xs font-semibold text-slate-800">
            {isPl ? 'Dołącz klauzulę RODO na dole CV' : 'Include GDPR / RODO Clause'}
          </div>
          <div className="text-[11px] text-slate-500">
            {isPl ? 'Zalecane dla wszystkich aplikacji w Polsce' : 'Highly recommended for Polish & EU jobs'}
          </div>
        </div>
        <input
          type="checkbox"
          checked={Boolean(rodo.enabled)}
          onChange={(e) => onChange({ ...rodo, enabled: e.target.checked })}
          className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800"
        />
      </div>

      {rodo.enabled && (
        <div className="space-y-3">
          {/* Quick presets */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
              {isPl ? 'Wybierz typ klauzuli:' : 'Select clause preset:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTemplate('current')}
                className={`p-2.5 text-left border rounded text-xs transition ${
                  rodo.type === 'current'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-[11px]">
                  {isPl ? 'Aktualna rekrutacja' : 'Current Process'}
                </div>
                <div className={`text-[10px] ${rodo.type === 'current' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {isPl ? 'Podstawowa do konkretnej oferty' : 'Single job recruitment'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTemplate('future')}
                className={`p-2.5 text-left border rounded text-xs transition ${
                  rodo.type === 'future'
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-[11px]">
                  {isPl ? 'Aktualna + Przyszłe' : 'Future Recruitments'}
                </div>
                <div className={`text-[10px] ${rodo.type === 'future' ? 'text-slate-300' : 'text-slate-500'}`}>
                  {isPl ? 'Polecana dla agencji pracy' : 'Allows agency to re-contact'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTemplate('short')}
                className="p-2.5 text-left border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 rounded text-xs transition"
              >
                <div className="font-bold text-[11px]">
                  {isPl ? 'Wersja skrócona' : 'Short / Compact'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isPl ? 'Oszczędza miejsce na 1 stronie' : 'Minimal space usage'}
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-700">
                {isPl
                  ? 'Treść klauzuli (możesz edytować np. dodając nazwę pracodawcy):'
                  : 'Legal clause text (customizable):'}
              </label>
            </div>
            <textarea
              rows={4}
              value={rodo.text ?? ''}
              onChange={(e) => onChange({ ...rodo, text: e.target.value, type: 'custom' })}
              className="w-full p-2.5 text-[11px] leading-relaxed border border-slate-200 rounded bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
};
