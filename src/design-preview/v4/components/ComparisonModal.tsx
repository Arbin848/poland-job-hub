import React from 'react';
import { X, Check, Sparkles, Zap, Heart, Shield, Layers, Award, ArrowRight } from 'lucide-react';
import { V4ConceptId } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeConcept: V4ConceptId;
  onSelectConcept: (concept: V4ConceptId) => void;
}

export const ComparisonModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activeConcept,
  onSelectConcept
}) => {
  if (!isOpen) return null;

  const comparisonData = [
    {
      metric: 'Główny Kierunek Stylistyczny',
      a: 'Apple-Level Minimal Luxury: czysta biel, porcelana, wyszukana typografia, szlachetna przestrzeń, brak zbędnych ozdobników.',
      b: 'Futuristic Interactive Studio: ciemny luksus z oświetleniem 3D, neonowo-indygo poświaty, interaktywny HUD, dynamiczne nachylenie.',
      c: 'Premium Guided Career Experience: ciepły, humanocentryczny workflow konwersacyjny, podzielony ekran, natychmiastowa satysfakcja.'
    },
    {
      metric: 'Prostota Użycia (First-Time User)',
      a: '9.5 / 10 — Wyjątkowo intuicyjny, naturalny flow od ogółu do szczegółu.',
      b: '8.5 / 10 — Spektakularny wizualnie, ale zaawansowane kontrolki mogą wymagać chwili oswojenia.',
      c: '9.9 / 10 (Najwyższa) — Prowadzi kandydata za rękę pytanie po pytaniu bez cienia zagubienia.'
    },
    {
      metric: 'Wzbudzane Emocje & Prestiż',
      a: 'Spokój, ekskluzywność, profesjonalizm klasy premium (jak Notion / Linear / Apple).',
      b: 'Ekscytacja, zaawansowana technologia, poczucie pracy w studiu projektowym przyszłości.',
      c: 'Bezpieczeństwo, wsparcie, poczucie natychmiastowego postępu i ulgi ("moje CV już powstaje!").'
    },
    {
      metric: 'Wydajność & Dostępność (a11y)',
      a: 'Doskonała (100% lekki DOM, standardowe przejścia CSS, pełne wsparcie reduced-motion).',
      b: 'Bardzo dobra (optymalizacje GPU, warstwy transform3d, automatyczny fallback na 2D).',
      c: 'Maksymalna (wsparcie klawiatury, czytniki ekranu, naturalne formularze, mobile-first).'
    },
    {
      metric: 'Czas do Pierwszego Gotowego CV',
      a: '3–4 minuty (czysty formularz z inteligentnymi podpowiedziami)',
      b: '4–5 minut (dużo interakcji ze stylami i oświetleniem)',
      c: '2–3 minuty (najszybszy proces dzięki mikro-krokom)'
    },
    {
      metric: 'Złożoność Implementacji Produkcyjnej',
      a: 'Umiarkowana (wysoka spójność z istniejącym stosem Tailwind + Motion).',
      b: 'Średnia-Wysoka (wymaga kalibracji świateł, canvasu 3D i perspektywy).',
      c: 'Umiarkowana (oparta o maszynę stanów pytań i reaktywny preview).'
    },
    {
      metric: 'Koszty Utrzymania (Maintenance)',
      a: 'Niskie — czysty, modułowy kod komponentowy, brak skomplikowanych zależności.',
      b: 'Umiarkowane — wymaga dbania o wydajność GPU na starszych urządzeniach mobilnych.',
      c: 'Niskie — prosta logika kroków, łatwa do testowania i rozbudowy o kolejne branże.'
    }
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Porównanie Koncepcji V4"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0F172A] text-white rounded-3xl max-w-5xl w-full border border-white/10 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PolJobHub V4 · World-Class Exploration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Porównanie 3 Kierunków Projektowych V4
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Przegląd cech UX, estetyki, złożoności technicznej oraz rekomendacji wdrożeniowej.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Concept Switch Cards in Modal */}
        <div className="p-4 sm:p-6 bg-slate-900/50 border-b border-white/5 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0">
          {[
            {
              id: 'concept-a' as V4ConceptId,
              title: 'Koncepcja A',
              subtitle: 'Apple-Level Minimal Luxury',
              tag: 'Elegancja & Spokój',
              color: 'from-blue-500/20 to-indigo-500/20',
              border: activeConcept === 'concept-a' ? 'border-indigo-400 ring-2 ring-indigo-400/30' : 'border-white/10'
            },
            {
              id: 'concept-b' as V4ConceptId,
              title: 'Koncepcja B',
              subtitle: 'Futuristic Studio 3D',
              tag: 'Głębia & Spektakl',
              color: 'from-purple-500/20 to-pink-500/20',
              border: activeConcept === 'concept-b' ? 'border-purple-400 ring-2 ring-purple-400/30' : 'border-white/10'
            },
            {
              id: 'concept-c' as V4ConceptId,
              title: 'Koncepcja C (Polecana)',
              subtitle: 'Guided Career Flow',
              tag: 'Najwyższa Konwersja',
              color: 'from-emerald-500/20 to-teal-500/20',
              border: activeConcept === 'concept-c' ? 'border-emerald-400 ring-2 ring-emerald-400/30' : 'border-white/10'
            }
          ].map((c) => (
            <div
              key={c.id}
              onClick={() => {
                onSelectConcept(c.id);
                onClose();
              }}
              className={`p-3.5 rounded-2xl bg-gradient-to-br ${c.color} border ${c.border} cursor-pointer transition hover:scale-[1.02] flex items-center justify-between`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
                  {c.tag}
                </span>
                <h4 className="font-bold text-sm text-white">{c.title}</h4>
                <div className="text-xs text-slate-300 font-medium">{c.subtitle}</div>
              </div>
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                  activeConcept === c.id ? 'bg-white text-slate-900 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{activeConcept === c.id ? 'Aktywna' : 'Otwórz'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Table Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-3">
            {comparisonData.map((row, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2.5">
                  {row.metric}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
                  <div className={`p-3 rounded-xl ${activeConcept === 'concept-a' ? 'bg-indigo-500/10 border border-indigo-400/30' : 'bg-black/20'}`}>
                    <strong className="block text-indigo-200 mb-1">A — Minimal Luxury:</strong>
                    <span className="text-slate-300">{row.a}</span>
                  </div>
                  <div className={`p-3 rounded-xl ${activeConcept === 'concept-b' ? 'bg-purple-500/10 border border-purple-400/30' : 'bg-black/20'}`}>
                    <strong className="block text-purple-200 mb-1">B — Interactive Studio:</strong>
                    <span className="text-slate-300">{row.b}</span>
                  </div>
                  <div className={`p-3 rounded-xl ${activeConcept === 'concept-c' ? 'bg-emerald-500/10 border border-emerald-400/30' : 'bg-black/20'}`}>
                    <strong className="block text-emerald-200 mb-1">C — Guided Career:</strong>
                    <span className="text-slate-300">{row.c}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Recommendation Block */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Award className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Rekomendacja Architektoniczna: Koncepcja C z elementami mikro-luksusu z Koncepcji A</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Dla użytkowników szukających pracy w Polsce (często zestresowanych i tworzących CV po raz pierwszy lub po latach przerwy), <strong>Koncepcja C (Guided Career Experience)</strong> oferuje bezkonkurencyjną łatwość ukończenia dokumentu. Połączenie konwersacyjnego kreatora (lewa strona) z natychmiastowym podglądem na żywo (prawa strona) redukuje obciążenie poznawcze do zera, podczas gdy estetyka i typografia z <strong>Koncepcji A</strong> zapewniają poziom zaufania i prestiżu godny międzynarodowych liderów rynku.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-400">
            Wszystkie 3 koncepcje są odizolowane i nie modyfikują kodu produkcyjnego.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition cursor-pointer"
          >
            Zamknij Porównanie
          </button>
        </div>
      </div>
    </div>
  );
};
