"use client";

import React, { useState } from "react";
import { 
  Building2, Users, FileCheck, ShieldCheck, Printer, Copy, 
  Check, Sparkles, Globe, Download, Award, Clock, ArrowRight,
  Filter, CheckSquare, Square, X, Mail, Phone, ExternalLink
} from "lucide-react";
import { Candidate } from "@/types";

interface ShortlistProps {
  candidates: Candidate[];
  preSelectedCompany?: string;
  preSelectedRole?: string;
}

export default function CandidateShortlistDossier({
  candidates,
  preSelectedCompany = "European Logistics & Manufacturing Partner",
  preSelectedRole = "Urgent Warehouse & Technical Workforce"
}: ShortlistProps) {
  // Config state
  const [clientCompany, setClientCompany] = useState(preSelectedCompany);
  const [roleTitle, setRoleTitle] = useState(preSelectedRole);
  const [dossierLang, setDossierLang] = useState<"EN" | "PL" | "DE">("EN");
  const [isAnonymized, setIsAnonymized] = useState(true);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Selected candidate IDs - default to first 3 candidates
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return candidates.slice(0, 3).map(c => c.id);
  });

  const selectedCandidates = candidates.filter(c => selectedIds.includes(c.id));

  // Toggle selection
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(candidates.map(c => c.id));
  };

  const clearAll = () => {
    setSelectedIds([]);
  };

  const selectFastDeployment = () => {
    const fast = candidates.filter(c => 
      c.currentLocation === "Poland" && 
      (c.legalStatus === "Karta Pobytu" || c.legalStatus === "Student Status" || c.legalStatus === "Valid Visa")
    ).map(c => c.id);
    setSelectedIds(fast.length > 0 ? fast : candidates.slice(0, 3).map(c => c.id));
  };

  // 1-Click Print / PDF
  const handlePrint = () => {
    window.print();
  };

  // Copy B2B Presentation Pitch
  const handleCopyPitch = () => {
    const candidateSummary = selectedCandidates.map((c, i) => 
      `${i + 1}. Ref: ${c.referenceCode} - ${isAnonymized ? "Candidate" : c.fullName} | ${c.primarySkill} | ${c.experienceYears}y exp | ${c.legalStatus} (${c.currentLocation}) | Lang: ${c.languages?.join(", ")}`
    ).join("\n");

    const text = dossierLang === "PL" ? 
`Szanowni Państwo,

W nawiązaniu do zapotrzebowania ${clientCompany} na stanowisko "${roleTitle}", przesyłamy oficjalny dossier wstępnie zweryfikowanych kandydatów z ramienia PolJobHub (Warszawa):

${candidateSummary}

WARUNKI WSPÓŁPRACY POLJOBHUB:
• 30-dniowa bezpłatna gwarancja wymiany pracownika
• Zweryfikowane prawo do pracy i legalność pobytu
• Pełna koordynacja dwujęzyczna (angielski, hindi, nepalski)

Dalsze szczegóły i organizacja wywiadów telefonicznych:
PolJobHub Sp. z o.o. | Tel: +48 729 350 449 | info@poljobhub.pl`
    : dossierLang === "DE" ?
`Sehr geehrte Damen und Herren,

anbei übermitteln wir das exklusive Kandidatendossier für ${clientCompany} bezüglich der Position "${roleTitle}" über PolJobHub:

${candidateSummary}

POLJOBHUB SERVICEGARANTIE:
• 30-Tage-Ersatzgarantie ohne Risiko
• Geprüfte Arbeitsberechtigung & lückenlose Unterlagen
• Zweisprachige Betreuung (Englisch, Deutsch, Hindi)

Kontakt für Interviewtermine:
PolJobHub | Tel: +48 729 350 449 | info@poljobhub.pl`
    :
`Dear Hiring Manager,

Following your inquiry for ${clientCompany} regarding "${roleTitle}", please find attached the verified candidate shortlist dossier from PolJobHub EU Recruitment Desk:

${candidateSummary}

POLJOBHUB PLACEMENT TERMS:
• 30-Day Free Replacement Guarantee
• Verified EU Legal Work Authorization & Fast Deployment
• Multilingual on-site support (English, Hindi, Nepali, Polish)

To schedule interviews or request full documentation:
PolJobHub Sp. z o.o. | Phone/WhatsApp: +48 729 350 449 | info@poljobhub.pl`;

    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Non-Printable Configuration Header */}
      <div className="print:hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">B2B Client Presentation Engine</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Multi-Candidate Shortlist Dossier</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate a unified presentation dossier for HR clients with comparison matrix, legal vetting guarantee, and 1-click printable PDF.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyPitch}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition"
            >
              {copiedPitch ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              {copiedPitch ? "Pitch Copied to Clipboard!" : "Copy B2B Email Pitch"}
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition"
            >
              <Printer className="w-4 h-4" /> Export / Print Client PDF Dossier
            </button>
          </div>
        </div>

        {/* Customization Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Client Company</label>
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              placeholder="e.g. Wielkopolska Logistyka Sp. z o.o."
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Requisition Role Title</label>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              placeholder="e.g. Forklift & Warehouse Pickers"
              className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Dossier Presentation Language</label>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setDossierLang("EN")}
                className={`flex-1 py-2 rounded-xl font-bold border transition ${
                  dossierLang === "EN" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => setDossierLang("PL")}
                className={`flex-1 py-2 rounded-xl font-bold border transition ${
                  dossierLang === "PL" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                🇵🇱 Polski
              </button>
              <button
                type="button"
                onClick={() => setDossierLang("DE")}
                className={`flex-1 py-2 rounded-xl font-bold border transition ${
                  dossierLang === "DE" ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                🇩🇪 Deutsch
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Fee Protection Setting</label>
            <button
              type="button"
              onClick={() => setIsAnonymized(!isAnonymized)}
              className={`w-full py-2.5 px-3 rounded-xl font-bold border flex items-center justify-center gap-2 transition ${
                isAnonymized 
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300" 
                  : "bg-amber-50 text-amber-900 border-amber-300"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {isAnonymized ? "Protected (Anonymized Direct Placement)" : "Show Full Candidate Names"}
            </button>
          </div>
        </div>

        {/* Candidate Selector Badges & Quick Filters */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700">
              Select Candidates for this Presentation ({selectedCandidates.length} of {candidates.length} Selected):
            </span>
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={selectFastDeployment}
                className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold transition flex items-center gap-1"
              >
                ⚡ Ready in 7 Days Only
              </button>
              <button
                onClick={selectAll}
                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold transition"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold transition"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
            {candidates.map(cand => {
              const isSelected = selectedIds.includes(cand.id);
              return (
                <button
                  key={cand.id}
                  onClick={() => toggleSelect(cand.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition ${
                    isSelected 
                      ? "bg-amber-500 text-slate-950 font-bold border-amber-500 shadow-sm" 
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{cand.referenceCode} - {cand.fullName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${isSelected ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-600"}`}>
                    {cand.primarySkill}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PRINTABLE DOSSIER CONTAINER */}
      {/* Using specific standard layout optimized for A4 paper and PDF print engine */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden font-sans max-w-5xl mx-auto print:shadow-none print:border-none print:rounded-none print:max-w-none print:m-0">
        
        {/* DOSSIER COVER & HEADER */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-8 sm:p-10 border-b-4 border-amber-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg border-2 border-amber-300">
                PJH
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 font-bold text-xs tracking-wider uppercase">POLJOBHUB EU RECRUITMENT</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-300 font-semibold">Warsaw Desk</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  Candidate Shortlist Presentation
                </h1>
                <p className="text-amber-400/90 font-medium text-xs sm:text-sm mt-0.5">
                  Prepared for: <span className="font-bold text-white">{clientCompany}</span> • {roleTitle}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
              <div className="font-bold text-white">POLJOBHUB SP. Z O.O.</div>
              <div className="text-slate-400">ul. Złota, Warsaw, Poland</div>
              <div className="text-amber-400 font-medium">info@poljobhub.pl • +48 729 350 449</div>
              <div className="text-[11px] text-slate-400 mt-1">Date: {new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* AGENCY GUARANTEE & SERVICE TERMS BANNER */}
        <div className="bg-amber-50/80 p-5 px-8 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold text-amber-950">
                {dossierLang === "PL" 
                  ? "Standard Bezpośredniego Placementu PolJobHub" 
                  : dossierLang === "DE" 
                  ? "PolJobHub Vermittlungs- und Qualitätsstandard" 
                  : "PolJobHub Direct Placement & Quality Assurance"}
              </span>
              <p className="text-amber-900 text-[11px]">
                {dossierLang === "PL"
                  ? "30-dniowa bezpłatna gwarancja wymiany pracownika • Zweryfikowane prawo do pracy • Wielojęzyczny koordynator na start"
                  : dossierLang === "DE"
                  ? "30-Tage-Ersatzgarantie • Rechtssichere Dokumentation • Zweisprachige Betreuung am Arbeitsplatz"
                  : "30-Day Free Replacement Warranty • Legally Vetted Work Authorizations • Multilingual Supervisor On-Boarding"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold px-2.5 py-1 rounded bg-amber-200/80 text-amber-950 border border-amber-300">
              {selectedCandidates.length} VERIFIED PROFILES
            </span>
          </div>
        </div>

        <div className="p-8 sm:p-10 space-y-10">
          
          {/* SECTION 1: CANDIDATE COMPARISON MATRIX */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                {dossierLang === "PL" ? "Zestawienie Porównawcze Kandydatów" : dossierLang === "DE" ? "Kandidaten-Vergleichsmatrix" : "Executive Candidate Comparison Matrix"}
              </h3>
              <span className="text-xs text-slate-400 font-medium">Reference Code Identifiers</span>
            </div>

            {selectedCandidates.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                No candidates selected for this shortlist presentation. Use the selector above to pick candidates.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-900 text-white font-bold">
                    <tr>
                      <th className="p-3.5">Ref. Code</th>
                      <th className="p-3.5">Candidate / Profile</th>
                      <th className="p-3.5">Trade & Skill</th>
                      <th className="p-3.5">Experience</th>
                      <th className="p-3.5">Legal / Visa Status</th>
                      <th className="p-3.5">Languages</th>
                      <th className="p-3.5">Availability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {selectedCandidates.map((c, idx) => (
                      <tr key={c.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="p-3.5 font-mono font-bold text-amber-700 bg-amber-50/30">
                          {c.referenceCode}
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          {isAnonymized ? `Candidate ${c.referenceCode}` : c.fullName}
                          <span className="block text-[11px] text-slate-500 font-normal">{c.nationality}</span>
                        </td>
                        <td className="p-3.5 font-semibold text-slate-800">
                          {c.primarySkill}
                        </td>
                        <td className="p-3.5 text-slate-700 font-medium">
                          {c.experienceYears} Years
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.legalStatus === "Karta Pobytu" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : c.legalStatus === "Valid Visa" 
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {c.legalStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600">
                          {c.languages?.join(", ")}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-emerald-700 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            {c.currentLocation === "Poland" ? "Ready in 7-10 Days" : "2-4 Weeks"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* SECTION 2: DETAILED CANDIDATE PROFILES */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                {dossierLang === "PL" ? "Szczegółowe Profile Kompetencji" : dossierLang === "DE" ? "Detaillierte Fachprofile" : "Verified Individual Profiles"}
              </h3>
              <span className="text-xs text-slate-400">PolJobHub Screening Passed</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedCandidates.map((c) => (
                <div 
                  key={c.id} 
                  className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4 break-inside-avoid print:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                        {c.referenceCode.replace("PJH-", "")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-black text-slate-900">
                            {isAnonymized ? `Verified Specialist [Ref: ${c.referenceCode}]` : c.fullName}
                          </h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 font-mono">
                            {c.referenceCode}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                          {c.nationality} • {c.experienceYears} Years Verified Field Experience • Location: {c.currentLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Vetted & Interview Ready
                      </span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Primary Trade</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{c.primarySkill}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Legal Residence</span>
                      <span className="font-bold text-emerald-800 block mt-0.5">{c.legalStatus}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Language Vetting</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{c.languages?.join(" • ")}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Earliest Start</span>
                      <span className="font-bold text-amber-900 block mt-0.5">
                        {c.currentLocation === "Poland" ? "Immediate (7 Days)" : "2-4 Weeks"}
                      </span>
                    </div>
                  </div>

                  {/* Competency Narrative */}
                  <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 text-xs text-slate-700 leading-relaxed space-y-1">
                    <span className="font-bold text-amber-950 block">PolJobHub Pre-Screening Assessor Summary:</span>
                    <p>
                      Candidate has been assessed for practical reliability, physical stamina, and cross-cultural communication. 
                      Demonstrates strong proficiency in <strong>{c.primarySkill}</strong> with verified historical track record. 
                      Possesses valid right to work in the European Union and can be mobilized directly under agency contract.
                    </p>
                  </div>

                  {/* Legal Protection Footer */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span>Direct contact details protected under PolJobHub Recruitment Brokerage Agreement.</span>
                    <span className="font-mono text-amber-700 font-bold">WARRANTY BACKED (30 DAYS)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: AGENCY PLACEMENT PROCEDURE & NEXT STEPS */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 break-inside-avoid">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider block">Engagement Protocol</span>
                <h4 className="text-base font-black text-white">How to Proceed with Candidate Interviews</h4>
              </div>
              <div className="text-xs text-amber-400 font-mono font-bold">
                Desk Hotline: +48 729 350 449
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[11px]">1</span>
                  Select Profiles
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Reply with candidate reference codes (e.g. PJH-1042) to confirm interview availability.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[11px]">2</span>
                  Video / On-site Call
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  PolJobHub facilitates bilingual video interviews or trade evaluations with our desk manager.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-[11px]">3</span>
                  Deployment & Warranty
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Worker starts on-site. PolJobHub 30-day replacement warranty activates upon day 1.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-2">
              <span>PolJobHub Sp. z o.o. • Registered Agency Warsaw • NIP: 5252891234 • REGON: 521892140</span>
              <span className="text-white font-semibold">rekrutacja@poljobhub.pl</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
