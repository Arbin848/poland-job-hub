import React, { useState, useRef } from 'react';
import { CVData, TemplateId, LanguageCode } from '../../../types/cv';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  Eye,
  Download,
  Printer,
  Layers,
  Zap,
  Sliders,
  Sun,
  Moon,
  Compass,
  Cpu,
  Activity,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { V4FlowStep } from '../types';

interface Props {
  cv: CVData;
  onChangeCv: (updated: CVData) => void;
  language: LanguageCode;
  currentStep: V4FlowStep;
  onStepChange: (step: V4FlowStep) => void;
}

export const ConceptB_FuturisticStudio: React.FC<Props> = ({
  cv,
  onChangeCv,
  language,
  currentStep,
  onStepChange
}) => {
  const isPl = language === 'pl';
  const [lightingMode, setLightingMode] = useState<'neon' | 'daylight' | 'stealth'>('neon');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse move handler for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Dampen tilt
    setTilt({
      x: -(y / rect.height) * 14,
      y: (x / rect.width) * 14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const templates: { id: TemplateId; name: string; tag: string; ats: string; accent: string }[] = [
    { id: 'creative-tech', name: 'Creative Tech 3D', tag: 'Silicon Stack', ats: '99% ATS', accent: '#6366F1' },
    { id: 'clean-ats', name: 'Clean ATS Pure', tag: 'Scan Laser', ats: '100% ATS', accent: '#10B981' },
    { id: 'swiss-executive', name: 'Swiss Executive Matrix', tag: 'Director Level', ats: '98% ATS', accent: '#3B82F6' },
    { id: 'modern-polish', name: 'Modern Polish Pro', tag: 'Polish Standard', ats: '98% ATS', accent: '#8B5CF6' },
    { id: 'dynamic-impact', name: 'Dynamic Impact', tag: 'Metrics Driven', ats: '96% ATS', accent: '#F59E0B' }
  ];

  const ambientGlowClass = {
    neon: 'from-indigo-600/25 via-purple-600/20 to-pink-600/20',
    daylight: 'from-blue-400/20 via-teal-300/15 to-indigo-400/20',
    stealth: 'from-slate-800/40 via-zinc-900/40 to-black/60'
  }[lightingMode];

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Studio Lighting Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex items-center justify-between text-xs border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="font-mono text-slate-400">STUDIO ENGINE v4.2</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono text-[10px]">
            ACTIVE
          </span>
        </div>

        {/* Ambient Lighting Controller */}
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl p-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono mr-1 hidden sm:inline">Światło:</span>
          <button
            type="button"
            onClick={() => setLightingMode('neon')}
            className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
              lightingMode === 'neon' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-200" />
            <span>Cyber Neon</span>
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('daylight')}
            className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
              lightingMode === 'daylight' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3 h-3 text-amber-300" />
            <span>Daylight</span>
          </button>
          <button
            type="button"
            onClick={() => setLightingMode('stealth')}
            className={`px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer ${
              lightingMode === 'stealth' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3 h-3 text-slate-300" />
            <span>Stealth</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase with Interactive 3D Perspective */}
      {currentStep === 'landing' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 text-center relative">
          {/* Ambient Lighting Field */}
          <div className={`absolute inset-x-12 inset-y-12 bg-gradient-to-tr ${ambientGlowClass} rounded-full blur-[140px] -z-10 pointer-events-none opacity-80`} />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold text-xs mb-6 font-mono">
            <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Koncepcja B · Futuristic Interactive Studio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06] max-w-4xl mx-auto mb-6">
            Zaawansowane Studio Dokumentów Kariery.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
              Głębia i Precyzja.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Renderuj dokumenty z dynamiczną perspektywą 3D, natychmiastowym wskaźnikiem skanowania ATS i modułową architekturą bloków.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Uruchom Studio Kreatora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onStepChange('templates')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
              <span>Matryca Szablonów</span>
            </button>
          </div>

          {/* Interactive 3D Card with Pointer Tilt */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="max-w-3xl mx-auto cursor-grab active:cursor-grabbing"
            style={{ perspective: '1200px' }}
          >
            <div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
              className="bg-white/[0.04] backdrop-blur-2xl border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Dynamic Specular Sheen */}
              <div
                style={{
                  background: `radial-gradient(circle at ${tilt.y * 10 + 50}% ${-tilt.x * 10 + 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
                }}
                className="absolute inset-0 pointer-events-none"
              />

              {/* HUD Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 text-xs font-mono mb-4 text-slate-300">
                <span className="flex items-center gap-2 font-bold text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  PERSPECTIVE: X:{tilt.x.toFixed(1)}° Y:{tilt.y.toFixed(1)}°
                </span>
                <span className="text-emerald-400 font-bold">ATS COMPLIANT: 99.4%</span>
              </div>

              {/* Document Canvas Inner */}
              <div className="bg-slate-900/80 rounded-2xl p-4 flex justify-center border border-white/5 overflow-hidden">
                <ResumeCanvas cv={cv} zoom={0.68} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Discovery Step */}
      {currentStep === 'templates' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              Studio Template Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
              Wybierz Architektury Renderowania
            </h2>
            <p className="text-sm text-slate-400">
              Przełączaj układy ze 100% zachowaniem danych.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {templates.map((tpl) => {
              const isSelected = cv.templateId === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => onChangeCv({ ...cv, templateId: tpl.id })}
                  className={`p-5 rounded-3xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.02] ${
                    isSelected
                      ? 'border-purple-500 ring-4 ring-purple-500/20 shadow-2xl bg-white/[0.06]'
                      : 'border-white/10 hover:border-purple-500/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                      <span className="text-purple-300 font-bold">{tpl.tag}</span>
                      <span className="text-emerald-400 font-bold">{tpl.ats}</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-white mb-2">{tpl.name}</h3>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeCv({ ...cv, templateId: tpl.id });
                        onStepChange('preview');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Podgląd HUD</span>
                    </button>
                    {isSelected && (
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1 font-mono">
                        <Check className="w-4 h-4 stroke-[3]" />
                        SELECTED
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <span>Przejdź do Konfiguratora Treści</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Studio Builder Step */}
      {(currentStep === 'builder' || currentStep === 'preview') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Dark Studio Form */}
          <div className="lg:col-span-5 bg-white/[0.04] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="font-bold text-lg text-white">Studio Input Deck</h3>
                <span className="text-xs font-mono text-purple-400">TELEMETRY SYNC: ON</span>
              </div>
              <button
                type="button"
                onClick={() => onStepChange('download')}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Eksport</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Kandydat (Imię i Nazwisko)</label>
                <input
                  type="text"
                  value={cv.personalInfo.fullName}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, fullName: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Stanowisko / Specjalizacja</label>
                <input
                  type="text"
                  value={cv.personalInfo.jobTitle}
                  onChange={(e) =>
                    onChangeCv({
                      ...cv,
                      personalInfo: { ...cv.personalInfo, jobTitle: e.target.value }
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 text-white font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Podsumowanie Zawodowe</label>
                <textarea
                  rows={4}
                  value={cv.summary}
                  onChange={(e) => onChangeCv({ ...cv, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-purple-500 text-slate-200 font-medium leading-relaxed"
                />
              </div>

              {/* HUD Metrics Indicator */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 grid grid-cols-3 gap-2 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">ATS Score</div>
                  <div className="text-emerald-400 font-bold text-sm">99.2%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">RODO 2026</div>
                  <div className="text-purple-400 font-bold text-sm">ZGODNE</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Format</div>
                  <div className="text-blue-400 font-bold text-sm">A4 VEKTOR</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => onStepChange('templates')}
                className="text-slate-400 hover:text-white"
              >
                ← Zmień szablon
              </button>
              <button
                type="button"
                onClick={() => onStepChange('download')}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Generuj Gotowy Plik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Side: Live Canvas with HUD Frame */}
          <div className="lg:col-span-7 bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-4 sm:p-6 border border-white/10 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
              <span className="text-purple-300 font-bold">LIVE STAGE A4 HUD</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-purple-400" />
                <span>Drukuj / Pobierz PDF</span>
              </button>
            </div>

            <div className="w-full overflow-x-auto flex justify-center py-2 bg-slate-950/80 rounded-2xl border border-white/5">
              <ResumeCanvas cv={cv} zoom={0.78} />
            </div>
          </div>
        </div>
      )}

      {/* Download Deck */}
      {currentStep === 'download' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center mb-6 border border-purple-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Eksport Gotowy · Zgodność z Polskim Rynkiem
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto mb-8 font-mono">
            Wygenerowano profil wektorowy A4 z certyfikatem RODO 2026.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Drukuj / Pobierz PDF A4</span>
            </button>
            <button
              type="button"
              onClick={() => onStepChange('builder')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/15 transition cursor-pointer"
            >
              Wróć do Studia
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
