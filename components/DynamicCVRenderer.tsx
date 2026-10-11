import React from "react";
import { Candidate } from "@/types";
import { CheckCircle2, ShieldCheck, Award, Globe, Phone, Mail, MapPin, Briefcase } from "lucide-react";

export type CVTemplateStyle = "executive-gold" | "europass-modern" | "german-technical" | "minimalist-slate";

interface DynamicCVProps {
  candidate: Candidate;
  template: CVTemplateStyle;
  isAnonymized?: boolean;
}

export default function DynamicCVRenderer({ candidate, template, isAnonymized = true }: DynamicCVProps) {
  
  // 1. TEMPLATE: EXECUTIVE GOLD (PolJobHub Premium Flagship)
  if (template === "executive-gold") {
    return (
      <div className="bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-300 overflow-hidden font-sans max-w-4xl mx-auto print:border-none print:shadow-none print:rounded-none">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg border-2 border-amber-300/40">
                PJH
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1.5 border border-amber-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  Verified European Candidate Dossier
                </span>
                <h1 className="text-3xl font-black text-white">{candidate.fullName}</h1>
                <p className="text-amber-400 font-bold text-base">{candidate.primarySkill}</p>
              </div>
            </div>
            <div className="text-left sm:text-right text-xs text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="font-bold text-white uppercase">PolJobHub EU Agency</div>
              <div className="text-amber-400 font-mono font-bold">Ref: {candidate.referenceCode}</div>
              <div className="text-slate-400">Warsaw, Poland • EU Mobility Desk</div>
              <div className="text-[11px] text-slate-400">rekrutacja@poljobhub.pl</div>
            </div>
          </div>
        </div>

        {/* Quick Facts */}
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-200/60 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Nationality</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">{candidate.nationality}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Legal Status</span>
              <span className="font-bold text-emerald-800 text-sm block mt-0.5">{candidate.legalStatus}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Experience</span>
              <span className="font-bold text-slate-900 text-sm block mt-0.5">{candidate.experienceYears || candidate.yearsOfExperience} Years Verified</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase text-[10px] block">Languages</span>
              <span className="font-bold text-amber-900 text-sm block mt-0.5">{candidate.languages?.join(" • ")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b pb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-amber-600" /> Executive Competency Summary
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Vetted through PolJobHub’s European mobility desk. Candidate possesses verified field expertise in <strong>{candidate.primarySkill}</strong>. Communicates effectively in <strong>{candidate.languages?.join(", ")}</strong>. Ready for cross-border deployment across Poland, Germany, Czechia, Romania, Netherlands, and wider EU.
            </p>
          </div>

          <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs flex justify-between items-center">
            <span>Direct contact withheld under agency agreement. 30-Day Free Replacement Guarantee.</span>
            <span className="font-mono text-amber-400 font-bold">POLJOBHUB VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. TEMPLATE: EUROPASS MODERN (Standard across EU: Poland, Czechia, Netherlands, Romania)
  if (template === "europass-modern") {
    return (
      <div className="bg-white text-slate-800 rounded-3xl shadow-xl border border-slate-300 overflow-hidden font-sans max-w-4xl mx-auto print:border-none print:shadow-none print:rounded-none">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          
          {/* Left Column (Blue EU Sidebar) */}
          <div className="md:col-span-4 bg-slate-900 text-white p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                EU
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{candidate.fullName}</h2>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mt-0.5">{candidate.primarySkill}</p>
                <span className="inline-block font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded mt-2">
                  ID: {candidate.referenceCode}
                </span>
              </div>

              <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block font-bold">Country of Origin</span>
                  <span className="font-semibold text-slate-200">{candidate.nationality}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block font-bold">Current Location</span>
                  <span className="font-semibold text-emerald-400">{candidate.currentLocation}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block font-bold">EU Legal Status</span>
                  <span className="font-semibold text-slate-200">{candidate.legalStatus}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] block font-bold">Languages</span>
                  <span className="font-semibold text-blue-300">{candidate.languages?.join(", ")}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-white">PolJobHub European Desk</div>
              <div>EU Sourcing & Placement</div>
              <div className="text-blue-400">info@poljobhub.pl</div>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="md:col-span-8 p-8 sm:p-10 space-y-6 bg-slate-50/50">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block mb-1">Europass Standard Format</span>
              <h3 className="text-lg font-black text-slate-900">Professional Profile & Work History</h3>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Experience & Vetted Capabilities</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                Verified candidate with <strong>{candidate.experienceYears || candidate.yearsOfExperience} years</strong> of direct experience in {candidate.primarySkill}. Evaluated under standard European workplace safety guidelines. Available for relocation and deployment to certified EU employers.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Education & Vocational Diplomas</h4>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 block">{candidate.education || "Vocational Technical Training"}</span>
                <span className="text-slate-500 text-[11px] block">Verified through original documentation in PolJobHub Cloud Vault.</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900">
              <span className="font-bold block">European Union Mobility Note:</span>
              <p className="text-[11px] text-blue-800 mt-0.5">
                Eligible for direct placement or cross-border transfer. Compliant with standard EU employment contracts (UoP, B2B, A1 Posting).
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 3. TEMPLATE: GERMAN TECHNICAL (Lebenslauf format: Germany, Austria, Switzerland)
  if (template === "german-technical") {
    return (
      <div className="bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-300 overflow-hidden font-sans max-w-4xl mx-auto print:border-none print:shadow-none print:rounded-none">
        
        {/* German Header */}
        <div className="bg-slate-900 text-white p-8 border-b-4 border-amber-500 flex justify-between items-center">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">Qualifikationsprofil / Lebenslauf</span>
            <h1 className="text-2xl font-black text-white mt-1">{candidate.fullName}</h1>
            <p className="text-xs text-slate-300 font-semibold">{candidate.primarySkill}</p>
          </div>
          <div className="text-right text-xs">
            <span className="font-mono text-amber-400 font-bold block">Ref-Nr: {candidate.referenceCode}</span>
            <span className="text-slate-400 block text-[11px]">Vermittelt durch PolJobHub</span>
          </div>
        </div>

        <div className="p-8 space-y-6 text-xs">
          {/* Tabular Details */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-100 p-3 font-bold text-slate-900 border-b border-slate-200 uppercase text-[11px]">
              Persönliche & Rechtliche Daten
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-3 p-3 bg-white">
                <span className="text-slate-500 font-semibold">Staatsangehörigkeit:</span>
                <span className="col-span-2 font-bold text-slate-900">{candidate.nationality}</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                <span className="text-slate-500 font-semibold">Aufenthalts-/Arbeitsstatus:</span>
                <span className="col-span-2 font-bold text-emerald-800">{candidate.legalStatus}</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-white">
                <span className="text-slate-500 font-semibold">Berufserfahrung:</span>
                <span className="col-span-2 font-bold text-slate-900">{candidate.experienceYears || candidate.yearsOfExperience} Jahre (Geprüft)</span>
              </div>
              <div className="grid grid-cols-3 p-3 bg-slate-50/50">
                <span className="text-slate-500 font-semibold">Sprachkenntnisse:</span>
                <span className="col-span-2 font-bold text-slate-900">{candidate.languages?.join(" / ")}</span>
              </div>
            </div>
          </div>

          {/* Qualifikation */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Fachliche Kompetenzen & Einsatzbereiche</h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              Der Kandidat verfügt über fundierte praktische Fachkenntnisse im Bereich {candidate.primarySkill}. Vollständige Unterlagen (Pass, Qualifikationsnachweise, Führungszeugnis) liegen der Agentur vor. Sofort einsatzbereit für Unternehmen in Deutschland, Österreich oder Polen mit 30-Tage-Ersatzgarantie.
            </p>
          </div>

          <div className="p-4 bg-slate-100 text-slate-600 rounded-2xl border border-slate-200 flex justify-between items-center text-[11px]">
            <span>Anonymisiertes Profil gem. Datenschutz & Vermittlungsvereinbarung.</span>
            <span className="font-bold text-slate-900">PolJobHub Deutschland-Desk</span>
          </div>
        </div>

      </div>
    );
  }

  // 4. TEMPLATE: MINIMALIST SLATE (Clean & Fast Scan for High Volume Recruitment)
  return (
    <div className="bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10 font-sans max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-start border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-950">{candidate.fullName}</h1>
          <p className="text-sm font-bold text-slate-600">{candidate.primarySkill}</p>
          <span className="text-xs text-slate-400 font-mono">Reference: {candidate.referenceCode}</span>
        </div>
        <div className="text-right text-xs text-slate-500">
          <div className="font-bold text-slate-900">PolJobHub International</div>
          <div>Poland • Germany • EU</div>
          <div className="text-indigo-600">rekrutacja@poljobhub.pl</div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div>
          <span className="text-slate-400 block text-[10px] font-bold">NATIONALITY</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{candidate.nationality}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] font-bold">LEGAL STATUS</span>
          <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{candidate.legalStatus}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] font-bold">EXPERIENCE</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{candidate.experienceYears || candidate.yearsOfExperience} Yrs</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] font-bold">LANGUAGES</span>
          <span className="font-bold text-slate-800 text-sm mt-0.5 block">{candidate.languages?.join(", ")}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <h3 className="font-bold text-slate-900 uppercase">Profile Summary</h3>
        <p className="text-slate-600 leading-relaxed">
          Pre-screened by PolJobHub. Verified experience in {candidate.primarySkill}. Able to communicate clearly in {candidate.languages?.join(", ")}. Available for immediate contract placement with 30-day agency replacement warranty.
        </p>
      </div>
    </div>
  );
}
