"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Upload, Send, Sparkles, FileCheck2, Globe } from "lucide-react";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "Nepali",
    currentLocation: "Poland",
    primarySkill: "Warehouse / Forklift Operator",
    experienceYears: "2",
    legalStatus: "Karta Pobytu",
    speaksEnglish: true,
    speaksHindi: true,
    speaksNepali: true,
    needsLegalAssistance: false,
    legalServiceType: "Change of Employer (Annex 1)",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check language gatekeeper: candidate must speak English, Hindi, or Nepali
    if (!formData.speaksEnglish && !formData.speaksHindi && !formData.speaksNepali) {
      setLanguageError(true);
      return;
    }

    setLanguageError(false);
    const newRef = "PJH-" + Math.floor(1000 + Math.random() * 9000);
    setRefNumber(newRef);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-text py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-primary transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to PolJobHub
          </Link>
          <span className="text-[11px] font-bold text-brand-primaryDark bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/30">
            Official PolJobHub Intake
          </span>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl shadow-xl border border-brand-border p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-brand-dark">Registration Successful!</h2>
              <p className="text-xs sm:text-sm text-brand-muted">
                Your profile has been saved into PolJobHub's secure candidate database.
              </p>
            </div>

            <div className="p-5 bg-brand-cream border border-brand-primary/40 rounded-2xl inline-block text-left w-full space-y-1 shadow-sm">
              <span className="text-[11px] uppercase font-bold text-brand-primaryDark tracking-wider">Your Reference Code:</span>
              <div className="text-3xl font-mono font-black text-brand-dark">{refNumber}</div>
              <p className="text-xs text-brand-muted pt-1">
                You can enter this reference code on the <Link href="/#track-case" className="font-bold text-brand-primary underline">PolJobHub Homepage</Link> anytime to monitor your application and case updates without calling us!
              </p>
            </div>

            {formData.needsLegalAssistance && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-amber-600" /> Legal Assistance Flagged
                </div>
                <p>
                  Your request for <strong>{formData.legalServiceType}</strong> has been routed to our partner legal specialists. They will review your status.
                </p>
              </div>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-brand-dark hover:bg-black text-white rounded-xl text-xs font-bold transition"
              >
                Return to Homepage
              </Link>
              <Link
                href="/admin"
                className="px-6 py-3 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-xl text-xs font-bold transition shadow-md"
              >
                View in Staff Portal &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-brand-border p-6 sm:p-10 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-brand-primary text-white flex items-center justify-center font-bold text-xs">
                  PJH
                </div>
                <span className="text-xs font-bold text-brand-primary uppercase">PolJobHub Verification</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-dark">Candidate Intake & Registration</h1>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Connecting qualified workers with verified employers in Poland and Germany. Zero placement fees charged to candidates.
              </p>
            </div>

            {languageError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Language Requirement Notice</div>
                  <p className="mt-0.5 leading-relaxed">
                    PolJobHub conducts all coordination in English, Hindi, or Nepali. Please ensure you can communicate in at least one of these languages.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  1. Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (as in Passport)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+48 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="candidate@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nationality</label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    >
                      <option value="Nepali">Nepali (नेपाली)</option>
                      <option value="Indian">Indian (भारतीय)</option>
                      <option value="Bangladeshi">Bangladeshi</option>
                      <option value="Filipino">Filipino</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Language Gatekeeper */}
              <div className="space-y-3 pt-4 border-t border-brand-border/60">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  2. Language Competency (Check all you speak)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-brand-border cursor-pointer hover:bg-brand-cream transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksEnglish}
                      onChange={(e) => setFormData({ ...formData, speaksEnglish: e.target.checked })}
                      className="rounded text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-xs font-bold text-brand-dark">English</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-brand-border cursor-pointer hover:bg-brand-cream transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksHindi}
                      onChange={(e) => setFormData({ ...formData, speaksHindi: e.target.checked })}
                      className="rounded text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-xs font-bold text-brand-dark">Hindi (हिंदी)</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-brand-border cursor-pointer hover:bg-brand-cream transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksNepali}
                      onChange={(e) => setFormData({ ...formData, speaksNepali: e.target.checked })}
                      className="rounded text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-xs font-bold text-brand-dark">Nepali (नेपाली)</span>
                  </label>
                </div>
              </div>

              {/* Skills & Legal Profile */}
              <div className="space-y-4 pt-4 border-t border-brand-border/60">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  3. Skills & Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Location</label>
                    <select
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    >
                      <option value="Poland">Currently in Poland</option>
                      <option value="Other EU">Currently in another EU Country (e.g. Germany)</option>
                      <option value="Abroad">In Home Country (Requires Visa / Work Permit)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Skill / Trade</label>
                    <select
                      value={formData.primarySkill}
                      onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    >
                      <option value="Warehouse / Forklift Operator">Warehouse / Forklift Operator (UDT)</option>
                      <option value="MIG/MAG Welder (135/136)">MIG/MAG Welder (135/136)</option>
                      <option value="CNC Operator / Machinist">CNC Operator / Machinist</option>
                      <option value="Production & Assembly">Production & Factory Assembly</option>
                      <option value="Construction & Masonry">Construction & Masonry</option>
                      <option value="Heavy Truck Driver (Code 95)">Heavy Truck Driver (Code 95)</option>
                      <option value="Hospitality & Kitchen Staff">Hospitality & Kitchen Staff</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Legal / Document Status</label>
                    <select
                      value={formData.legalStatus}
                      onChange={(e) => setFormData({ ...formData, legalStatus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    >
                      <option value="Karta Pobytu">Valid Karta Pobytu (TRC)</option>
                      <option value="Valid Visa">National Polish Visa (Type D)</option>
                      <option value="Student Status">Full-Time Student Status in Poland (0 ZUS)</option>
                      <option value="Awaiting TRC Decision">Stamp in Passport (Awaiting TRC Decision)</option>
                      <option value="Needs Work Permit">Needs Work Permit (Abroad)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-brand-border text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Legalization Add-on Checkbox (Law Firm Referral) */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsLegalAssistance}
                    onChange={(e) => setFormData({ ...formData, needsLegalAssistance: e.target.checked })}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">
                      I also need Legalization / Karta Pobytu / Visa assistance
                    </span>
                    <span className="text-[11px] text-amber-800 block">
                      PolJobHub’s partner law firm manages Annex 1 employer transitions, TRC applications, and appeals.
                    </span>
                  </div>
                </label>

                {formData.needsLegalAssistance && (
                  <div className="pt-2 border-t border-amber-200">
                    <label className="block text-[11px] font-bold text-amber-900 mb-1">Select Legal Issue:</label>
                    <select
                      value={formData.legalServiceType}
                      onChange={(e) => setFormData({ ...formData, legalServiceType: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white border border-amber-300 text-xs text-amber-950 focus:outline-none"
                    >
                      <option value="Change of Employer (Annex 1)">Change of Employer (Annex 1 - 15-day notice)</option>
                      <option value="New Karta Pobytu (TRC) Application">New Karta Pobytu (TRC) Application</option>
                      <option value="Appeal against Negative Decision (Odwołanie)">Appeal against Negative Decision (Odwołanie)</option>
                      <option value="Student-to-Work Conversion">Student-to-Work Conversion</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl text-xs transition shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Register Profile with PolJobHub
                </button>
                <p className="text-[11px] text-brand-muted text-center mt-2">
                  Compliant with Polish Labor Law & EU GDPR/RODO data protection.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
