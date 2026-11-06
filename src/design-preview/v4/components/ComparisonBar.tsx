import React from 'react';
import { Sparkles, Eye, Sliders, ArrowLeft, Layers, Compass, Check, BarChart2 } from 'lucide-react';
import { V4ConceptId, V4FlowStep } from '../types';

interface Props {
  activeConcept: V4ConceptId;
  onSelectConcept: (concept: V4ConceptId) => void;
  currentStep: V4FlowStep;
  onSelectStep: (step: V4FlowStep) => void;
  onOpenComparisonMatrix: () => void;
  onReturnToProduction: () => void;
}

export const ComparisonBar: React.FC<Props> = ({
  activeConcept,
  onSelectConcept,
  currentStep,
  onSelectStep,
  onOpenComparisonMatrix,
  onReturnToProduction
}) => {
  const concepts = [
    {
      id: 'concept-a' as V4ConceptId,
      name: 'A · Minimal Luxury',
      badge: 'Apple Aesthetic',
      color: 'bg-indigo-600'
    },
    {
      id: 'concept-b' as V4ConceptId,
      name: 'B · Futuristic Studio',
      badge: '3D Depth & Light',
      color: 'bg-purple-600'
    },
    {
      id: 'concept-c' as V4ConceptId,
      name: 'C · Guided Career',
      badge: 'Conversational',
      color: 'bg-emerald-600'
    }
  ];

  const steps = [
    { id: 'landing' as V4FlowStep, label: 'Hero' },
    { id: 'templates' as V4FlowStep, label: 'Szablony' },
    { id: 'builder' as V4FlowStep, label: 'Kreator' },
    { id: 'preview' as V4FlowStep, label: 'Podgląd A4' },
    { id: 'download' as V4FlowStep, label: 'Eksport' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 transition-all text-white select-none">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Return + V4 Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onReturnToProduction}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            title="Powrót do głównej aplikacji produkcyjnej"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Produkcja</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-white/15">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-extrabold text-sm tracking-tight text-white">
              PolJobHub <span className="text-indigo-400 font-mono">V4 Lab</span>
            </span>
          </div>
        </div>

        {/* Center: The 3 Concept Switcher Tabs */}
        <div className="flex items-center bg-black/40 border border-white/15 rounded-2xl p-1 gap-1 shrink-0">
          {concepts.map((c) => {
            const isActive = activeConcept === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectConcept(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-md font-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{c.name}</span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.2 rounded-md hidden md:inline font-mono ${
                    isActive ? 'bg-indigo-100 text-indigo-900 font-bold' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {c.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Steps Navigator & Comparison Matrix */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Step Switcher */}
          <div className="hidden xl:flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5 text-xs">
            {steps.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectStep(s.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer text-[11px] ${
                  currentStep === s.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Comparison Matrix Modal Trigger */}
          <button
            type="button"
            onClick={onOpenComparisonMatrix}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 hover:from-indigo-500/40 hover:to-purple-500/40 text-indigo-200 border border-indigo-400/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <BarChart2 className="w-3.5 h-3.5 text-indigo-300" />
            <span>Porównaj Koncepcje</span>
          </button>
        </div>
      </div>
    </header>
  );
};
