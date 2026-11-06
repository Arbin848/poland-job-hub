import React, { useState } from 'react';
import { Sparkles, Check, Info, ShieldAlert, ArrowRight, CornerDownLeft, Loader2, RefreshCw, X } from 'lucide-react';
import { LanguageCode } from '../../../types/cv';
import { enhanceBulletPoint } from '../../../services/aiService';

interface Props {
  currentRole: string;
  currentBulletDraft: string;
  onApplyBullet: (bulletText: string) => void;
  language: LanguageCode;
}

export const V5AiAssistant: React.FC<Props> = ({
  currentRole,
  currentBulletDraft,
  onApplyBullet,
  language
}) => {
  const isPl = language === 'pl';
  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  
  // AI Interactive State
  const [inputDuty, setInputDuty] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [acceptedIndex, setAcceptedIndex] = useState<number | null>(null);

  // Curated, ethical Action Verbs based on recruitment best practices
  const actionVerbsPl = [
    { verb: 'Wdrożyłem', desc: 'nowy system, narzędzie lub procedurę' },
    { verb: 'Zoptymalizowałem', desc: 'czas realizacji, koszty lub obieg dokumentów' },
    { verb: 'Skoordynowałem', desc: 'współpracę między działami lub klientami' },
    { verb: 'Opracowałem', desc: 'standardy operacyjne lub strategię' },
    { verb: 'Zredukowałem', desc: 'wskaźnik błędów lub straty magazynowe' },
    { verb: 'Przeszkoliłem', desc: 'nowych członków zespołu lub wdrożyłem procedury' }
  ];

  // Grounded STAR formula templates that prompt USER for their real numbers
  const starPromptsPl = [
    {
      title: 'Optymalizacja czasu / procesu',
      pattern: `Wdrożyłem usprawnienie procesu w dziale, co pozwoliło zespołowi skrócić czas realizacji zadań o [Twój realny wynik, np. 20-30%].`
    },
    {
      title: 'Zarządzanie i koordynacja',
      pattern: `Skoordynowałem realizację projektów w ścisłej współpracy z interesariuszami, zapewniając dostarczenie celów zgodnie z harmonogramem.`
    },
    {
      title: 'Jakość i standardy obsługi',
      pattern: `Opracowałem i wdrożyłem procedury kontroli jakości, podnosząc satysfakcję klientów i eliminując powtarzające się reklamacje.`
    }
  ];

  const handleGenerateAiSuggestions = async () => {
    const query = inputDuty.trim() || currentBulletDraft.trim() || currentRole.trim();
    if (!query) return;

    setLoading(true);
    setErrorMsg(null);
    setAcceptedIndex(null);

    try {
      const res = await enhanceBulletPoint(query, currentRole || 'Specjalista', 'General', language);
      if (res && res.bullets && res.bullets.length > 0) {
        setSuggestions(res.bullets);
        setIsFallback(Boolean(res.fallback));
      } else {
        throw new Error('No suggestions returned');
      }
    } catch (err: any) {
      console.warn('AI Bullet generation fallback:', err);
      setErrorMsg(isPl ? 'Serwer AI jest chwilowo niedostępny. Możesz skorzystać ze sprawdzonych szablonów poniżej.' : 'AI service temporarily unavailable. Using standard templates.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = (bullet: string, idx: number) => {
    onApplyBullet(bullet);
    setAcceptedIndex(idx);
    setTimeout(() => {
      setSuggestions(prev => prev ? prev.filter((_, i) => i !== idx) : null);
      setAcceptedIndex(null);
    }, 800);
  };

  const handleDismissSuggestion = (idx: number) => {
    setSuggestions(prev => prev ? prev.filter((_, i) => i !== idx) : null);
  };

  return (
    <div className="bg-slate-50/90 rounded-2xl border border-slate-200/90 p-4 sm:p-5 text-slate-800 space-y-5">
      {/* Header with Transparency & Ethics Notice */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 tracking-tight">
              {isPl ? 'Asystent Osiągnięć STAR (Etyczny & Zweryfikowany)' : 'STAR Achievement Assistant (Grounded & Ethical)'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {isPl
                ? 'Strukturyzuje Twoje realne osiągnięcia w mocne punkty bez zmyślania danych i metryk'
                : 'Structures your real achievements into strong bullet points without hallucinating metrics'}
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Boundary Notice */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 text-[11.5px] text-slate-600 flex items-start gap-2.5 shadow-2xs">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-800">
            {isPl ? 'Zasada rzetelności rekrutacyjnej:' : 'Recruitment Integrity Standard:'}
          </p>
          <p className="text-slate-500 mt-0.5 leading-relaxed">
            {isPl
              ? 'Asystent nigdy nie tworzy fikcyjnych firm, stopni ani wyników. Wygenerowane propozycje musisz zatwierdzić i uzupełnić swoimi faktycznymi wskaźnikami.'
              : 'The assistant never invents fake jobs, degrees, or results. You must review, approve, and finalize suggestions with your actual metrics.'}
          </p>
        </div>
      </div>

      {/* LIVE AI GENERATOR (Gemini) */}
      <div className="bg-white rounded-xl p-3.5 border border-indigo-200/80 shadow-xs space-y-3">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-indigo-900">
          {isPl ? '✨ Generowanie propozycji punktu z AI:' : '✨ Generate AI bullet suggestion:'}
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputDuty}
            onChange={(e) => setInputDuty(e.target.value)}
            placeholder={isPl ? `np. optymalizacja procesu, koordynacja wysyłek (${currentRole || 'Stanowisko'})` : 'e.g. process optimization, delivery coordination'}
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-hidden transition"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleGenerateAiSuggestions();
              }
            }}
          />
          <button
            type="button"
            onClick={handleGenerateAiSuggestions}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer disabled:opacity-60 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{isPl ? 'Generowanie...' : 'Generating...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isPl ? 'Zaproponuj punkt' : 'Suggest Bullet'}</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center justify-between gap-2">
            <span>{errorMsg}</span>
            <button
              type="button"
              onClick={handleGenerateAiSuggestions}
              className="text-amber-900 font-bold underline flex items-center gap-1 hover:text-amber-950"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{isPl ? 'Spróbuj ponownie' : 'Retry'}</span>
            </button>
          </div>
        )}

        {/* Display generated suggestions */}
        {suggestions && suggestions.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
              <span className="flex items-center gap-1 text-indigo-700 font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{isPl ? 'Propozycje AI (Wybierz i zatwierdź):' : 'AI Suggestions (Review & Accept):'}</span>
              </span>
              {isFallback && (
                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {isPl ? 'Szablon offline' : 'Offline pattern'}
                </span>
              )}
            </div>

            {suggestions.map((sug, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 ${
                  acceptedIndex === idx
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-slate-50/70 border-slate-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-xs text-slate-800 flex-1 leading-relaxed">
                  <span className="inline-block text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded mr-2 mb-1">
                    {isPl ? 'Sugestia AI' : 'AI Suggestion'}
                  </span>
                  <span>{sug}</span>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => handleAcceptSuggestion(sug, idx)}
                    disabled={acceptedIndex === idx}
                    className="ai-accept-btn px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1 transition shadow-2xs cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{acceptedIndex === idx ? (isPl ? 'Wstawiono!' : 'Added!') : (isPl ? 'Akceptuj i wstaw' : 'Accept')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDismissSuggestion(idx)}
                    className="ai-reject-btn px-2 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition cursor-pointer flex items-center gap-1 text-xs"
                    title={isPl ? 'Odrzuć propozycję' : 'Dismiss suggestion'}
                    aria-label={isPl ? 'Odrzuć propozycję' : 'Dismiss suggestion'}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{isPl ? 'Odrzuć' : 'Dismiss'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Verbs Palette */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {isPl ? '1. Lub wybierz mocny czasownik sprawczy:' : '1. Or pick an assertive action verb:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {actionVerbsPl.map((item) => (
            <button
              key={item.verb}
              type="button"
              onClick={() => {
                setSelectedVerb(item.verb);
                onApplyBullet(`${item.verb} `);
              }}
              className="text-left p-2.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50/50 transition cursor-pointer group"
            >
              <div className="font-bold text-xs text-indigo-900 group-hover:text-indigo-700">
                {item.verb}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Grounded STAR Formula Starters */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          {isPl ? '2. Sprawdzone wzorce struktury osiągnięcia (STAR):' : '2. Proven STAR achievement patterns:'}
        </label>
        <div className="space-y-2">
          {starPromptsPl.map((sp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-3 border border-slate-200 hover:border-indigo-300 transition flex items-start justify-between gap-3"
            >
              <div className="text-xs">
                <span className="font-bold text-slate-800 block mb-1">{sp.title}</span>
                <p className="text-slate-600 leading-relaxed">{sp.pattern}</p>
              </div>
              <button
                type="button"
                onClick={() => onApplyBullet(sp.pattern)}
                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition flex items-center gap-1 cursor-pointer"
                title={isPl ? 'Wstaw ten wzorzec' : 'Insert this pattern'}
              >
                <span>{isPl ? 'Wstaw' : 'Use'}</span>
                <CornerDownLeft className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
