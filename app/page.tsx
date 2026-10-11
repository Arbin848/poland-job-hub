"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, Users, FileCheck2, Globe2, ShieldCheck, 
  ArrowRight, CheckCircle2, Search, PhoneCall, Sparkles,
  MapPin, Clock, Award, Briefcase, FileText
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"employers" | "candidates" | "legal">("employers");
  const [searchRef, setSearchRef] = useState("");
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    const ref = searchRef.trim().toUpperCase();
    if (ref === "PJH-1042") {
      setTrackResult("Status for PJH-1042 (Bikash S.): Matched to Employer - Poznań Auto Logistics Sp. z o.o. [Start Date Confirmed]");
    } else if (ref === "PJH-1043") {
      setTrackResult("Status for PJH-1043 (Gurpreet S.): Under Legal Partner Review - Annex 1 filed in Urząd Wojewódzki.");
    } else if (ref === "PJH-1044") {
      setTrackResult("Status for PJH-1044 (Sunil T.): Work Permit (Zezwolenie Typ A) application pending at Voivodeship office.");
    } else {
      setTrackResult(`Reference ${ref} found. Case active in verification queue. Our team is coordinating with partners.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner */}
      <div className="bg-indigo-950 text-indigo-200 text-xs py-2 px-4 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Active Recruiting: Poland, Germany & EU
            </span>
            <span className="text-indigo-400">|</span>
            <span>Languages: English • Hindi • Nepali (हिंदी / नेपाली)</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1">
              🔐 Staff & Admin Portal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-200">
              PJH
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Poland <span className="text-indigo-600">Job Hub</span>
              </span>
              <p className="text-xs text-slate-500 font-medium tracking-wide">
                European Talent & Legalization Partner
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600 text-sm">
            <button 
              onClick={() => setActiveTab("employers")}
              className={`transition-colors ${activeTab === "employers" ? "text-indigo-600 font-semibold" : "hover:text-slate-900"}`}
            >
              For Employers (B2B)
            </button>
            <button 
              onClick={() => setActiveTab("candidates")}
              className={`transition-colors ${activeTab === "candidates" ? "text-indigo-600 font-semibold" : "hover:text-slate-900"}`}
            >
              For Job Seekers
            </button>
            <button 
              onClick={() => setActiveTab("legal")}
              className={`transition-colors ${activeTab === "legal" ? "text-indigo-600 font-semibold" : "hover:text-slate-900"}`}
            >
              Legalization & Visas
            </button>
            <a href="#track-case" className="hover:text-slate-900">
              Track Case
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition shadow-sm"
            >
              Apply as Candidate
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md shadow-indigo-100"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 py-16 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Cross-Border Recruitment & Legalization
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Reliable Talent for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900">
                  Poland, Germany & Europe
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                We supply pre-screened, English, Hindi, and Nepali-speaking workforces directly to factories, warehouses, and partner agencies. Supported by full legal document assistance and 30-day replacement guarantees.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/apply"
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-base shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition flex items-center gap-2"
                >
                  Submit Candidate Profile <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/admin"
                  className="px-6 py-3.5 rounded-xl bg-white text-slate-700 border border-slate-300 font-semibold text-base hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-indigo-600" /> Open Employer Portal
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-slate-600">
                <div>
                  <div className="text-2xl font-black text-slate-900">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Bilingual Vetting (EN/HI/NE)</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-indigo-600">30-Day</div>
                  <div className="text-xs text-slate-500 font-medium">Free Replacement Guarantee</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">Zero</div>
                  <div className="text-xs text-slate-500 font-medium">Upfront Candidate Placement Fees</div>
                </div>
              </div>
            </div>

            {/* Quick Track & Apply Card */}
            <div className="lg:col-span-5" id="track-case">
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-200/80 p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Candidate Self-Service</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Live 24/7
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Check Your Case Status</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your Poland Job Hub Reference Code (e.g. <span className="font-mono text-indigo-600 font-bold">PJH-1042</span>) to see your real-time status.
                  </p>
                </div>

                <form onSubmit={handleTrack} className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. PJH-1042"
                      value={searchRef}
                      onChange={(e) => setSearchRef(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-mono text-sm placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition shadow-md"
                  >
                    Look Up Real-Time Status
                  </button>
                </form>

                {trackResult && (
                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-indigo-950">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Reference Record Found
                    </div>
                    <p className="leading-relaxed font-medium">{trackResult}</p>
                    <div className="text-[11px] text-indigo-600 pt-1 border-t border-indigo-100">
                      Need help? WhatsApp or email your assigned consultant.
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>New applicant?</span>
                  <Link href="/apply" className="font-semibold text-indigo-600 hover:underline">
                    Create New Candidate Record &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Core Divisions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Our Three Pillars</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">
              Tailored Solutions for Employers, Job Seekers & Legal Partners
            </h3>
            <p className="text-slate-600 text-sm">
              We eliminate the communication gap, protect commission structures, and ensure fully compliant cross-border deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: B2B Workforce */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">For Employers & Agencies</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We supply screened industrial, logistics, and skilled workers directly to manufacturing plants in Poland and staffing partners in Germany and the EU.
                </p>
                <ul className="text-xs space-y-2 text-slate-700 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> English & South Asian language vetting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 30-day replacement protection guarantee
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Direct placement or partner mediator terms
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Browse active talent pool &rarr;
                </Link>
              </div>
            </div>

            {/* Card 2: Candidates */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-100">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">For International Workers</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Connecting workers already in Poland and qualified international candidates from Asia with verified, reputable European employers.
                </p>
                <ul className="text-xs space-y-2 text-slate-700 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Zero illegal recruitment fees for job placement
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Verified contracts (UoP / UZ / B2B)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Assistance in Hindi, Nepali, and English
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Submit your application now &rarr;
                </Link>
              </div>
            </div>

            {/* Card 3: Legalization & Visas */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-100">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Legalization & Law Firm Desk</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  In direct cooperation with established Polish law firms, we manage document prep for Karta Pobytu (TRC), Annex 1 employer transitions, and visa appeals.
                </p>
                <ul className="text-xs space-y-2 text-slate-700 font-medium pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Change of employer (15-day notification)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Student to full work right transitions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Real-time status visibility for candidates
                  </li>
                </ul>
              </div>
              <div className="pt-6">
                <Link
                  href="/apply?type=legal"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700"
                >
                  Request legal consultation &rarr;
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
              PJH
            </div>
            <div>
              <div className="text-white font-bold">Poland Job Hub Sp. z o.o.</div>
              <div className="text-xs text-slate-500">Warsaw, Poland • Operating in PL, DE & EU</div>
            </div>
          </div>
          <div className="flex gap-6 text-xs font-medium">
            <Link href="/admin" className="text-indigo-400 hover:text-indigo-300">Staff Portal</Link>
            <Link href="/apply" className="hover:text-white">Apply</Link>
            <a href="#track-case" className="hover:text-white">Track Record</a>
          </div>
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Poland Job Hub. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
