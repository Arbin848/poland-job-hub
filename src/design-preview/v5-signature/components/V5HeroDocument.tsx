import React, { useState, useRef, useEffect } from 'react';
import { CVData } from '../../../types/cv';
import { ResumeCanvas } from '../../../components/CVPreview/ResumeCanvas';
import { Sparkles, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  cv: CVData;
  reducedMotion: boolean;
  onOpenPreview?: () => void;
  interactive?: boolean;
}

export const V5HeroDocument: React.FC<Props> = ({
  cv,
  reducedMotion,
  onOpenPreview,
  interactive = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightX, setLightX] = useState(50);
  const [lightY, setLightY] = useState(25);
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, elegant tilt (max 4.5 degrees)
    const rotX = -((y - centerY) / centerY) * 4.5;
    const rotY = ((x - centerX) / centerX) * 4.5;
    setRotateX(rotX);
    setRotateY(rotY);

    // Dynamic specular highlight reflection
    setLightX(Math.round((x / rect.width) * 100));
    setLightY(Math.round((y / rect.height) * 100));
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setLightX(50);
    setLightY(25);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[560px] mx-auto select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Atmospheric Ambient Glow Behind Document */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-60 blur-3xl transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(98, 80, 244, 0.28) 0%, rgba(164, 71, 244, 0.18) 40%, rgba(248, 249, 255, 0) 75%)`
        }}
        aria-hidden="true"
      />

      {/* Tiltable A4 Canvas Wrapper */}
      <div
        className="relative rounded-2xl bg-white p-3.5 sm:p-5 transition-transform ease-out ring-1 ring-slate-900/10 shadow-[0_25px_60px_-15px_rgba(24,35,63,0.18)]"
        style={{
          transform: reducedMotion
            ? 'none'
            : `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale(1.015)' : 'scale(1)'}`,
          transitionDuration: isHovered ? '120ms' : '600ms'
        }}
      >
        {/* Specular lighting sheen overlay */}
        {!reducedMotion && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0.15,
              background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 60%)`
            }}
            aria-hidden="true"
          />
        )}

        {/* Quiet Document Header Strip */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-700">
              Format A4 <span className="hidden sm:inline font-normal text-slate-500">(210 × 297 mm)</span>
            </span>
            <span className="hidden xs:inline" aria-hidden="true">·</span>
            <span className="hidden xs:inline">Polski Rynek Pracy</span>
          </div>
          {onOpenPreview && (
            <button
              type="button"
              onClick={onOpenPreview}
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 transition cursor-pointer shrink-0"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Pełny ekran</span>
            </button>
          )}
        </div>

        {/* Real Production Mini A4 Canvas Container */}
        <div className="w-full bg-slate-50/50 rounded-xl overflow-hidden border border-slate-100 flex justify-center py-2 h-[310px] xs:h-[350px] sm:h-[480px]">
          <div className="w-[480px] max-w-full overflow-hidden shadow-sm rounded-sm flex justify-center">
            <div className="origin-top scale-[0.38] xs:scale-[0.44] sm:scale-[0.60]">
              <ResumeCanvas cv={cv} zoom={1} isThumbnail={true} />
            </div>
          </div>
        </div>

        {/* Live Document Quality Indicator Strip */}
        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium text-[11px] sm:text-xs">Czytelność ATS & Klauzula zgody</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-slate-400">
            <span>Szablon: {cv.templateId}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
