"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Download, Sparkles, CheckCircle2, ShieldCheck, 
  FileText, Globe, Award, Briefcase, User, Mail, Phone, MapPin
} from "lucide-react";
import DynamicCVRenderer, { CVTemplateStyle } from "@/components/DynamicCVRenderer";
import { Candidate } from "@/types";

export default function CandidateCVBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplateStyle>("europass-modern");
  const [isSavedToHub, setIsSavedToHub] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);

  // Candidate Live Input State
  const [candidateData, setCandidateData] = useState<Candidate>({
    id: "self-built",
    referenceCode: "PJH-" + Math.floor(1000 + Math.random() * 9000),
    fullName: "Ramesh Sharma",
    phone: "+48 570 000 000",
    email: "ramesh.sharma@example.com",
    nationality: "Nepali",
    currentLocation: "Poland",
    languages: ["English", "Nepali", "Hindi"],
    primarySkill: "Warehouse Order Picker & Logistics Assistant",
    experienceYears: 3,
    education: "Higher Secondary Vocational Diploma",
    legalStatus: "Karta Pobytu",
    pipelineStage: "New Lead",
    assignedCountry: "Poland",
    notes: "Created via PolJobHub Free European CV Builder.",
    documents: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleSaveToDatabase = async () => {
    try {
      setSavingLoading(true);
      const res = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: candidateData.fullName,
          phone: candidateData.phone,
          email: candidateData.email,
          nationality: candidateData.nationality,
          currentLocation: candidateData.currentLocation,
          languages: candidateData.languages,
          primarySkill: candidateData.primarySkill,
          experienceYears: candidateData.experienceYears,
          education: candidateData.education,
          legalStatus: candidateData.legalStatus,
          notes: "Generated via Public Candidate CV Builder."
        })
      });
      const json = await res.json();
      if (json.success) {
        setIsSavedToHub(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" /> PolJobHub Home
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Free European CV Builder
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Download / Print PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Builder Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Editor (40%) */}
          <div className="lg:col-span-5 space-y-6 print:hidden">
            
            {/* Template Selector Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Choose European Style</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                  4 Pro Formats
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("europass-modern")}
                  className={`p-3 rounded-2xl border text-left font-bold transition ${
                    selectedTemplate === "europass-modern" 
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇪🇺 Europass Modern
                  <span className="block text-[10px] opacity-70 font-normal mt-0.5">EU Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTemplate("executive-gold")}
                  className={`p-3 rounded-2xl border text-left font-bold transition ${
                    selectedTemplate === "executive-gold" 
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🏆 PolJobHub Gold
                  <span className="block text-[10px] opacity-70 font-normal mt-0.5">Executive Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTemplate("german-technical")}
                  className={`p-3 rounded-2xl border text-left font-bold transition ${
                    selectedTemplate === "german-technical" 
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  🇩🇪 German Lebenslauf
                  <span className="block text-[10px] opacity-70 font-normal mt-0.5">DE / AT Zeitarbeit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTemplate("minimalist-slate")}
                  className={`p-3 rounded-2xl border text-left font-bold transition ${
                    selectedTemplate === "minimalist-slate" 
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  📄 Minimalist Slate
                  <span className="block text-[10px] opacity-70 font-normal mt-0.5">High-Speed Scan</span>
                </button>
              </div>
            </div>

            {/* Candidate Details Input Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 text-xs">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" /> 1. Personal & Contact Info
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name (as in Passport)</label>
                  <input
                    type="text"
                    value={candidateData.fullName}
                    onChange={(e) => setCandidateData({ ...candidateData, fullName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone</label>
                    <input
                      type="text"
                      value={candidateData.phone}
                      onChange={(e) => setCandidateData({ ...candidateData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={candidateData.email}
                      onChange={(e) => setCandidateData({ ...candidateData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nationality</label>
                    <select
                      value={candidateData.nationality}
                      onChange={(e) => setCandidateData({ ...candidateData, nationality: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                    >
                      <option value="Nepali">Nepali</option>
                      <option value="Indian">Indian</option>
                      <option value="Bangladeshi">Bangladeshi</option>
                      <option value="Filipino">Filipino</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Location</label>
                    <select
                      value={candidateData.currentLocation}
                      onChange={(e) => setCandidateData({ ...candidateData, currentLocation: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                    >
                      <option value="Poland">Poland</option>
                      <option value="Other EU">Other EU (Germany, Czechia)</option>
                      <option value="Abroad">Abroad (Home Country)</option>
                    </select>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pt-4 border-t border-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-600" /> 2. Profession & Skills
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Skill / Job Title</label>
                  <input
                    type="text"
                    value={candidateData.primarySkill}
                    onChange={(e) => setCandidateData({ ...candidateData, primarySkill: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={candidateData.experienceYears}
                      onChange={(e) => setCandidateData({ ...candidateData, experienceYears: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Legal Status</label>
                    <select
                      value={candidateData.legalStatus}
                      onChange={(e) => setCandidateData({ ...candidateData, legalStatus: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                    >
                      <option value="Karta Pobytu">Karta Pobytu (TRC)</option>
                      <option value="Valid Visa">National Polish Visa (Type D)</option>
                      <option value="Student Status">Student Status (0 ZUS)</option>
                      <option value="Awaiting TRC Decision">Awaiting TRC Decision</option>
                      <option value="Needs Work Permit">Needs Work Permit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Education / Technical Training</label>
                  <input
                    type="text"
                    value={candidateData.education}
                    onChange={(e) => setCandidateData({ ...candidateData, education: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit to Agency Talent Pool */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {isSavedToHub ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-center flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Profile Saved to PolJobHub Talent Pool!
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveToDatabase}
                    disabled={savingLoading}
                    className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    {savingLoading ? "Registering Profile..." : "Save Profile & Match With Employers"}
                  </button>
                )}
                <p className="text-[10px] text-slate-400 text-center">
                  Saving lets PolJobHub recruiters consider you for direct placements across Poland, Germany & EU.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Real-Time Dynamic CV Preview (60%) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between print:hidden">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Document Preview</span>
              <button
                onClick={() => window.print()}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Download Printable PDF
              </button>
            </div>

            {/* The Live Rendered Template */}
            <div className="shadow-2xl rounded-3xl overflow-hidden">
              <DynamicCVRenderer candidate={candidateData} template={selectedTemplate} />
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
