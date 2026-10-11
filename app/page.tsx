"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, Users, FileCheck2, Globe2, ShieldCheck, 
  ArrowRight, CheckCircle2, Search, PhoneCall, Sparkles,
  MapPin, Clock, Award, Briefcase, FileText, ChevronRight,
  ExternalLink, MessageCircle, AlertCircle, Globe
} from "lucide-react";
import { initialJobOrders } from "@/lib/mockData";
import { translations, SupportedLanguage } from "@/lib/translations";

export default function HomePage() {
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const [searchRef, setSearchRef] = useState("");
  const [trackResult, setTrackResult] = useState<any | null>(null);
  const [activeJobFilter, setActiveJobFilter] = useState<"All" | "Poland" | "Germany">("All");

  const t = translations[lang];

  const filteredJobs = initialJobOrders.filter(job => 
    activeJobFilter === "All" ? true : job.country === activeJobFilter
  );

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    const ref = searchRef.trim().toUpperCase();

    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(ref)}`);
      const json = await res.json();

      if (json.success) {
        setTrackResult({
          code: json.data.code,
          name: json.data.fullName,
          stage: json.data.pipelineStage,
          employer: json.data.assignedEmployer,
          updated: json.data.updatedAt,
          details: `Current Status: ${json.data.pipelineStage} (${json.data.legalStatus}). Destination: ${json.data.assignedCountry}.`,
          type: json.data.badgeType
        });
      } else {
        setTrackResult({
          code: ref,
          name: "Not Found",
          stage: "No active record found",
          employer: "N/A",
          updated: "Now",
          details: json.error || "Please check your reference code.",
          type: "warning"
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-text">
      
      {/* Top Bar with Language Selector & Contact */}
      <div className="bg-brand-dark text-slate-300 text-xs py-2 px-4 border-b border-brand-border/20">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-primary font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PolJobHub Recruitment Agency
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">Warsaw, Poland • Operating in PL & DE</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Multi-Language Switcher */}
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
              <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as SupportedLanguage)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="en" className="text-slate-900">🇬🇧 English</option>
                <option value="pl" className="text-slate-900">🇵🇱 Polski</option>
                <option value="de" className="text-slate-900">🇩🇪 Deutsch</option>
                <option value="hi" className="text-slate-900">🇮🇳 हिन्दी (Hindi)</option>
                <option value="ne" className="text-slate-900">🇳🇵 नेपाली (Nepali)</option>
              </select>
            </div>

            <a href="tel:+48729350449" className="hover:text-white font-semibold hidden md:flex items-center gap-1">
              📞 +48 729 350 449
            </a>
            
            <Link href="/admin" className="text-brand-primary hover:text-brand-primaryHover font-bold flex items-center gap-1">
              🔐 Portal &rarr;
            </Link>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-primary flex items-center justify-center text-white font-black text-xl shadow-md">
              PJH
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-brand-dark">
                Pol<span className="text-brand-primary">JobHub</span>
              </span>
              <p className="text-[11px] text-brand-muted font-semibold tracking-wide uppercase">
                Workforce Solutions & Relocation
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 font-semibold text-brand-text text-sm">
            <a href="#vacancies" className="hover:text-brand-primary transition">Open Vacancies</a>
            <Link href="/cv-builder" className="text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 transition flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Free CV Builder
            </Link>
            <a href="#for-employers" className="hover:text-brand-primary transition">For Employers (PL & DE)</a>
            <a href="#legalization" className="hover:text-brand-primary transition">Legalization & Visas</a>
            <a href="#track-case" className="hover:text-brand-primary transition">Track Case Status</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/48729350449" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 border border-emerald-200 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Direct
            </a>
            <Link
              href="/apply"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-primaryHover rounded-lg transition shadow-md"
            >
              {t.applyBtn}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Live Language Support */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-brand-border bg-gradient-to-b from-brand-cream via-white to-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primaryDark text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                {t.badge}
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-dark tracking-tight leading-tight">
                {t.heroTitle}
              </h1>
              
              <p className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
                {t.heroDesc}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/apply"
                  className="px-6 py-3.5 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-sm shadow-lg shadow-brand-primary/20 transition flex items-center gap-2"
                >
                  {t.applyBtn} <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#for-employers"
                  className="px-6 py-3.5 rounded-xl bg-white text-brand-dark border border-brand-border font-bold text-sm hover:bg-slate-50 transition shadow-sm flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-brand-primary" /> {t.requestWorkersBtn}
                </a>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-border text-brand-text">
                <div>
                  <div className="text-2xl font-black text-brand-dark">100%</div>
                  <div className="text-xs text-brand-muted font-medium">Bilingual Vetted (EN/HI/NE)</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-primary">30-Day</div>
                  <div className="text-xs text-brand-muted font-medium">Free Replacement Guarantee</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-dark">Fast</div>
                  <div className="text-xs text-brand-muted font-medium">Deployment to PL & DE</div>
                </div>
              </div>
            </div>

            {/* Self-Service Case Tracker */}
            <div className="lg:col-span-5" id="track-case">
              <div className="bg-white rounded-2xl shadow-xl border border-brand-border p-6 sm:p-8 space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-brand-primary uppercase tracking-wider">Candidate Self-Service</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Live 24/7
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mt-1">{t.trackTitle}</h3>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                    {t.trackDesc}
                  </p>
                </div>

                <form onSubmit={handleTrack} className="space-y-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder={t.trackPlaceholder}
                      value={searchRef}
                      onChange={(e) => setSearchRef(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border text-brand-dark font-mono text-xs placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-brand-dark hover:bg-black text-white font-bold rounded-xl text-xs transition shadow-md"
                  >
                    {t.trackBtn} &rarr;
                  </button>
                </form>

                {trackResult && (
                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    trackResult.type === "success" 
                      ? "bg-emerald-50 border-emerald-200 text-emerald-950" 
                      : trackResult.type === "warning"
                      ? "bg-amber-50 border-amber-200 text-amber-950"
                      : "bg-indigo-50 border-indigo-200 text-indigo-950"
                  }`}>
                    <div className="flex items-center justify-between border-b border-black/10 pb-2">
                      <span className="font-mono font-bold">{trackResult.code}</span>
                      <span className="font-bold text-[11px] uppercase">{trackResult.name}</span>
                    </div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Stage: {trackResult.stage}
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">{trackResult.details}</p>
                    <div className="text-[10px] text-slate-500 pt-1 border-t border-black/5 flex justify-between">
                      <span>Assigned: {trackResult.employer}</span>
                      <span>Last Update: {trackResult.updated}</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-brand-muted">
                  <span>New candidate?</span>
                  <Link href="/apply" className="font-bold text-brand-primary hover:underline">
                    {t.applyBtn} &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Vacancies Section */}
      <section className="py-20 bg-white border-b border-brand-border" id="vacancies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-primary tracking-wider uppercase">Active Openings</span>
              <h2 className="text-3xl font-black text-brand-dark mt-1">{t.activeVacancies}</h2>
              <p className="text-sm text-brand-muted mt-1">{t.vacanciesSubtitle}</p>
            </div>

            {/* Country Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveJobFilter("All")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeJobFilter === "All" 
                    ? "bg-brand-primary text-white" 
                    : "bg-brand-cream text-brand-text hover:bg-brand-creamDark"
                }`}
              >
                All Countries ({initialJobOrders.length})
              </button>
              <button
                onClick={() => setActiveJobFilter("Poland")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeJobFilter === "Poland" 
                    ? "bg-brand-primary text-white" 
                    : "bg-brand-cream text-brand-text hover:bg-brand-creamDark"
                }`}
              >
                Poland
              </button>
              <button
                onClick={() => setActiveJobFilter("Germany")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeJobFilter === "Germany" 
                    ? "bg-brand-primary text-white" 
                    : "bg-brand-cream text-brand-text hover:bg-brand-creamDark"
                }`}
              >
                Germany
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-brand-cream/40 rounded-2xl border border-brand-border p-6 flex flex-col justify-between hover:border-brand-primary transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-brand-primary/10 text-brand-primaryDark border border-brand-primary/20">
                      📍 {job.country} ({job.city})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {t.immediateStart}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-brand-dark leading-snug">{job.title}</h3>
                  <p className="text-xs text-brand-muted font-medium">{job.sector}</p>

                  <div className="p-3 bg-white rounded-xl border border-brand-border text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.pay}:</span>
                      <span className="font-bold text-brand-dark">{job.salaryOffered}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{t.languages}:</span>
                      <span className="font-bold text-brand-primary">{job.requiredLanguages.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Spots Left: {job.positionsNeeded - job.positionsFilled}</span>
                  <Link
                    href={`/apply?jobId=${job.id}`}
                    className="px-3.5 py-1.5 bg-brand-dark hover:bg-black text-white text-xs font-bold rounded-lg transition"
                  >
                    Apply Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* For Employers (B2B) Section */}
      <section className="py-20 bg-brand-dark text-white" id="for-employers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-widest">B2B Recruitment Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black">
                {t.forEmployersTitle}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {t.forEmployersDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-300">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-brand-primary font-bold text-sm">Industrial & Production</div>
                  <p className="text-slate-400 font-normal">Assembly line workers, machine operators, packing staff.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-brand-primary font-bold text-sm">Logistics & Warehousing</div>
                  <p className="text-slate-400 font-normal">Certified UDT forklift drivers, order pickers, scanner operators.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-brand-primary font-bold text-sm">Certified Skilled Trades</div>
                  <p className="text-slate-400 font-normal">MIG/MAG welders (135/136), CNC machinists, heavy truck drivers.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-brand-primary font-bold text-sm">Full Legal Compliance</div>
                  <p className="text-slate-400 font-normal">Direct employer sponsorship or licensed partner agency leasing.</p>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="tel:+48729350449"
                  className="px-6 py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> Call B2B Desk: +48 729 350 449
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
              <h3 className="text-lg font-bold text-white">Request Candidate Shortlist</h3>
              <p className="text-xs text-slate-400">Tell us what workers your company needs and we will prepare qualified candidate cards in 24 hours.</p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sp. z o.o. / GmbH"
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Required Workers & Roles</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Warehouse Workers in Poznań"
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Your Email or Phone</label>
                  <input
                    type="text"
                    placeholder="director@company.com"
                    className="w-full p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert("Request received! Our B2B coordinator will contact you shortly.")}
                  className="w-full py-3 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl text-xs transition"
                >
                  Submit Workforce Demand
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Legalization Desk Section */}
      <section className="py-20 bg-brand-cream" id="legalization">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-brand-border p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Partner Law Firm Assistance
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-dark">
                {t.legalDeskTitle}
              </h2>
              <p className="text-sm text-brand-muted leading-relaxed">
                {t.legalDeskDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-border">
                  <div className="font-bold text-brand-dark">Change Employer (Annex 1)</div>
                  <div className="text-slate-500 text-[11px]">Strict 15-day statutory notification</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-border">
                  <div className="font-bold text-brand-dark">TRC / Karta Pobytu</div>
                  <div className="text-slate-500 text-[11px]">Document dossier preparation</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-cream border border-brand-border">
                  <div className="font-bold text-brand-dark">Refusal Appeals</div>
                  <div className="text-slate-500 text-[11px]">Odwołanie do Szefa UdSC</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/apply?type=legal"
                className="w-full py-3.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold rounded-xl text-center text-xs transition shadow-md"
              >
                Request Legal Consultation &rarr;
              </Link>
              <a
                href="https://wa.me/48729350449"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white border border-brand-border hover:bg-slate-50 text-brand-dark font-bold rounded-xl text-center text-xs transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Legal Coordinator
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-brand-dark text-slate-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-black text-sm">
              PJH
            </div>
            <div>
              <div className="text-white font-bold text-sm">PolJobHub Sp. z o.o.</div>
              <div className="text-slate-500 text-[11px]">Warsaw, Poland • +48 729 350 449 • info@poljobhub.pl</div>
            </div>
          </div>
          <div className="flex gap-6 font-semibold">
            <Link href="/admin" className="text-brand-primary hover:text-white">Admin Cloud Portal</Link>
            <Link href="/apply" className="hover:text-white">Candidate Intake</Link>
            <a href="#track-case" className="hover:text-white">Track Case</a>
          </div>
          <div className="text-slate-500 text-[11px]">
            &copy; {new Date().getFullYear()} PolJobHub. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
