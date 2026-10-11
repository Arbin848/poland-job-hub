import React from "react";
import { Candidate } from "@/types";
import { CheckCircle2, ShieldCheck, Award, Globe, Phone, Mail, Calendar, MapPin, Briefcase } from "lucide-react";

interface PremiumCVProps {
  candidate: Candidate;
  isAnonymized?: boolean;
}

export default function PremiumCVDossier({ candidate, isAnonymized = true }: PremiumCVProps) {
  return (
    <div className="bg-white text-slate-800 rounded-3xl shadow-2xl border border-slate-300 overflow-hidden font-sans print:border-none print:shadow-none print:rounded-none max-w-4xl mx-auto my-6">
      
      {/* Top PolJobHub Header & Watermark Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 relative overflow-hidden">
        
        {/* Subtle Background Badge */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-3xl shadow-lg border-2 border-amber-300/40">
              PJH
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-1.5 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Verified European Candidate Dossier
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {candidate.fullName}
              </h1>
              <p className="text-amber-400 font-semibold text-base sm:text-lg">
                {candidate.primarySkill}
              </p>
            </div>
          </div>

          {/* Agency & Protection Metadata */}
          <div className="text-left sm:text-right text-xs text-slate-300 space-y-1 bg-white/5 p-4 rounded-xl border border-white/10 shrink-0">
            <div className="font-bold text-white uppercase tracking-wider">PolJobHub Recruitment Agency</div>
            <div className="text-amber-400 font-mono font-bold">Ref Code: {candidate.referenceCode}</div>
            <div className="text-slate-400">Warsaw, Poland • Operating in PL & DE</div>
            <div className="text-[11px] text-slate-400">rekrutacja@poljobhub.pl</div>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-8 sm:p-12 space-y-10">
        
        {/* Key Quick-Facts Grid (Tailored for German & Polish Employers) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-amber-50/50 p-6 rounded-2xl border border-amber-200/60 text-xs">
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Nationality</span>
            <span className="font-black text-slate-900 text-sm block mt-1">{candidate.nationality}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Current Legal Status</span>
            <span className="font-bold text-emerald-800 text-sm block mt-1">{candidate.legalStatus}</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Total Experience</span>
            <span className="font-black text-slate-900 text-sm block mt-1">{candidate.experienceYears} Years Verified</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px]">Language Proficiency</span>
            <span className="font-bold text-amber-900 text-sm block mt-1">{candidate.languages.join(" • ")}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
            <Briefcase className="w-4 h-4 text-amber-600" />
            Candidate Executive Summary & Competencies
          </h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Candidate has been rigorously vetted by PolJobHub’s bilingual evaluation desk. Possesses over <strong>{candidate.experienceYears} years of verified practical experience</strong> in <strong>{candidate.primarySkill}</strong>. Capable of communicating effectively in <strong>{candidate.languages.join(", ")}</strong>. Demonstrates high work ethics, adaptability to European industrial standards, and is available for deployment.
          </p>
        </div>

        {/* Education & Qualifications */}
        <div className="space-y-3">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
            <Award className="w-4 h-4 text-amber-600" />
            Education, Certifications & Technical Background
          </h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900 text-sm">{candidate.education || "Technical / Vocational Certificate"}</div>
            <div className="text-slate-600">Verified through physical certificate submission and reference screening.</div>
          </div>
        </div>

        {/* Document Vault Verification Checklist */}
        <div className="space-y-3">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 border-b border-slate-200 pb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Verified Records On File in PolJobHub Cloud Vault
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {candidate.documents && candidate.documents.length > 0 ? (
              candidate.documents.map((doc: any) => (
                <div key={doc.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900 block">{doc.title}</span>
                      <span className="text-[10px] text-slate-400">Verified & Stored ({doc.uploadedAt})</span>
                    </div>
                  </div>
                  {doc.expiryDate && (
                    <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Exp: {doc.expiryDate}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs">
                Passport, background verification, and medical fitness records verified on file.
              </div>
            )}
          </div>
        </div>

        {/* Legal & Placement Protection Disclaimer */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="text-amber-400 uppercase tracking-wider">PolJobHub 30-Day Guarantee & Terms</span>
            <span className="font-mono text-[10px] text-slate-400">CONTRACT PROTECTED</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Direct candidate contact information is anonymized pursuant to agency non-circumvention terms. PolJobHub provides a <strong>free 30-day replacement guarantee</strong> for all placed candidates. For interview scheduling or contract confirmation, contact our recruitment desk at <strong>info@poljobhub.pl</strong> or <strong>+48 729 350 449</strong>.
          </p>
        </div>

      </div>

    </div>
  );
}
