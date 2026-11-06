import React, { useState } from 'react';
import { Sparkles, Loader2, Check, X, RefreshCw, ThumbsUp } from 'lucide-react';
import { THEME } from '../tokens';

interface Props {
  currentText: string;
  onApplySuggestion: (newText: string) => void;
  jobTitle?: string;
  placeholder?: string;
}

export const AiAssistantWidget: React.FC<Props> = ({
  currentText,
  onApplySuggestion,
  jobTitle = 'Specjalista ds. Operacji',
  placeholder = 'Wpisz obowiązek lub osiągnięcie zawodowe...'
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [accepted, setAccepted] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setAccepted(false);

    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          duty: currentText || 'Koordynacja projektów i optymalizacja procesów operacyjnych',
          jobTitle,
          industry: 'Operacje & Zarządzanie',
          language: 'pl'
        }),
        signal: AbortSignal.timeout(6000)
      });

      if (res.ok) {
        const data = await res.json();
        if (data?.bullets && data.bullets.length > 0) {
          setSuggestion(data.bullets[0]);
          setIsFallback(Boolean(data.fallback));
          return;
        }
      }
    } catch {
      // Graceful local fallback
    } finally {
      setLoading(false);
    }

    // High quality local structural template without fabricated numbers
    setIsFallback(true);
    const base = currentText.trim() || 'Koordynacja procesów operacyjnych';
    setSuggestion(
      `Optymalizacja procedur w obszarze: ${base}, co przyczyniło się do usprawnienia realizacji zadań zespołowych [wprowadź rzeczywisty wynik, np. skrócenie czasu o X dni / oszczędność Y zł].`
    );
  };

  const handleAccept = () => {
    if (suggestion) {
      onApplySuggestion(suggestion);
      setAccepted(true);
      setTimeout(() => {
        setSuggestion(null);
        setAccepted(false);
      }, 1500);
    }
  };

  const handleReject = () => {
    setSuggestion(null);
  };

  return (
    <div className="p-4 rounded-xl bg-[#F8F9FF] border border-[#E5E8F3] space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6250F4]/10 text-[#6250F4] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#18233F] block">
              Asystent Formułowania Osiągnięć STAR
            </span>
            <span className="text-[10px] text-[#75819C]">
              Pomaga ustrukturyzować obowiązki w mierzalny format rekrutacyjny
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition cursor-pointer disabled:opacity-50"
          style={{ background: THEME.colors.gradient }}
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generowanie...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generuj Wzór STAR</span>
            </>
          )}
        </button>
      </div>

      {/* Suggested Card with Accept / Reject */}
      {suggestion && (
        <div className="p-3.5 bg-white rounded-xl border border-[#6250F4]/30 shadow-xs space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-[10.5px]">
            {isFallback ? (
              <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                <span>Wzorzec Metody STAR (Heurystyka)</span>
              </span>
            ) : (
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>Wygenerowano przez Google Gemini AI</span>
              </span>
            )}
            <span className="text-[10px] text-[#75819C]">
              {isFallback ? 'Szablon struktury do uzupełnienia' : 'Model: gemini-3.8-flash'}
            </span>
          </div>

          <p className="text-xs text-[#18233F] leading-relaxed font-medium bg-[#F8F9FF] p-2.5 rounded-lg border border-[#E5E8F3]">
            {suggestion}
          </p>

          {isFallback && (
            <p className="text-[10px] text-slate-500 italic">
              Wskazówka: Zastąp tekst w nawiasach kwadratowych swoimi prawdziwymi wskaźnikami. Nie podawaj zmyślonych liczb.
            </p>
          )}

          <p className="text-xs text-[#18233F] leading-relaxed font-medium">
            {suggestion}
          </p>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100">
            <button
              type="button"
              onClick={handleReject}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-semibold rounded hover:bg-slate-100 transition flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              <span>Odrzuć</span>
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className={`px-3 py-1 rounded text-white text-[11px] font-bold transition flex items-center gap-1 ${
                accepted ? 'bg-emerald-600' : 'bg-[#6250F4] hover:bg-[#5240e3]'
              }`}
            >
              {accepted ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Zastosowano!</span>
                </>
              ) : (
                <>
                  <Check className="w-3 h-3" />
                  <span>Zastosuj w CV</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="text-[10px] text-[#75819C]">
        Tekst jest przesyłany do Google Gemini w celu wygenerowania sugestii.
      </div>
    </div>
  );
};
