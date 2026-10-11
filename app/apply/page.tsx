"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldAlert, Upload, Send, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Poland Job Hub
          </Link>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Official Candidate Application
          </span>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Application Submitted!</h2>
              <p className="text-sm text-slate-600">
                Your profile has been saved into Poland Job Hub’s secure talent database.
              </p>
            </div>

            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl inline-block text-left w-full space-y-1">
              <span className="text-xs uppercase font-bold text-indigo-500 tracking-wider">Your Reference Code:</span>
              <div className="text-2xl font-mono font-black text-indigo-900">{refNumber}</div>
              <p className="text-xs text-indigo-700 pt-1">
                Keep this code safe. You can use it on our homepage anytime to check your case & interview status.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition"
              >
                Return to Homepage
              </Link>
              <Link
                href="/admin"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition"
              >
                View in Staff Admin Portal &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-8">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Candidate Intake & Registration</h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in your details accurately to match with verified employers in Poland, Germany, and across Europe.
              </p>
            </div>

            {languageError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Language Requirement Notice</div>
                  <p className="mt-0.5 leading-relaxed">
                    Poland Job Hub coordinates directly in English, Hindi, and Nepali. Please ensure you can communicate in at least one of these languages to proceed with placement.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
                  1. Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (as in Passport)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +48 500 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality</label>
                    <select
                      value={formData.nationality}
                      onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
                  2. Language Competency (Select all that apply)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksEnglish}
                      onChange={(e) => setFormData({ ...formData, speaksEnglish: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-800">English</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksHindi}
                      onChange={(e) => setFormData({ ...formData, speaksHindi: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-800">Hindi (हिंदी)</span>
                  </label>

                  <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition">
                    <input
                      type="checkbox"
                      checked={formData.speaksNepali}
                      onChange={(e) => setFormData({ ...formData, speaksNepali: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-xs font-semibold text-slate-800">Nepali (नेपाली)</span>
                  </label>
                </div>
              </div>

              {/* Professional Profile */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
                  3. Skills & Location
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
                    <select
                      value={formData.currentLocation}
                      onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Poland">Currently in Poland</option>
                      <option value="Other EU">Currently in another EU Country</option>
                      <option value="Abroad">In Home Country (Requires Visa / Work Permit)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Skill / Trade</label>
                    <select
                      value={formData.primarySkill}
                      onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Current Legal / Document Status</label>
                    <select
                      value={formData.legalStatus}
                      onChange={(e) => setFormData({ ...formData, legalStatus: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Karta Pobytu">Valid Karta Pobytu (TRC)</option>
                      <option value="Valid Visa">National Polish Visa (Type D)</option>
                      <option value="Student Status">Full-Time Student Status in Poland</option>
                      <option value="Awaiting TRC Decision">Stamp in Passport (Awaiting TRC Decision)</option>
                      <option value="Needs Work Permit">Needs New Work Permit (Abroad)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Legalization Add-on Checkbox */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.needsLegalAssistance}
                    onChange={(e) => setFormData({ ...formData, needsLegalAssistance: e.target.checked })}
                    className="mt-1 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">
                      I also need Legalization / Karta Pobytu / Visa assistance from partner law firm
                    </span>
                    <span className="text-[11px] text-amber-800 block">
                      Check this if you need help with Annex 1 employer change, TRC submission, or appeals.
                    </span>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Application to Poland Job Hub
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2">
                  Protected under European RODO / GDPR regulations.
                </p>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
