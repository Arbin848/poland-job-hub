"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, MapPin, Send, CheckCircle2, Globe, Clock, 
  ExternalLink, Search, Filter, ShieldCheck, Mail, Phone,
  Briefcase, Sparkles, RefreshCw, X
} from "lucide-react";

export default function EmployerHunterModule() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  
  // Pitch Modal State
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [pitchLang, setPitchLang] = useState<"PL" | "DE">("PL");
  const [sendingPitch, setSendingPitch] = useState(false);
  const [pitchSentSuccess, setPitchSentSuccess] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/employer-leads?country=${filterCountry}&status=${filterStatus}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [filterCountry, filterStatus]);

  const handleSendPitch = async () => {
    if (!selectedLead) return;
    try {
      setSendingPitch(true);
      const res = await fetch("/api/employer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: selectedLead.id,
          language: pitchLang
        })
      });
      const json = await res.json();
      if (json.success) {
        setPitchSentSuccess(true);
        setTimeout(() => {
          setPitchSentSuccess(false);
          setSelectedLead(null);
          fetchLeads();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSendingPitch(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Automated Hunter Engine</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">High-Intent Employer Leads (Poland & Germany)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Companies actively advertising urgent labor shortages on Pracuj.pl, OLX Praca, and StepStone. Ready for 1-click B2B pitch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchLeads}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh Lead Feed
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 text-xs bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Country:</span>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 font-semibold text-slate-800"
          >
            <option value="All">All Countries</option>
            <option value="Poland">Poland (Pracuj / OLX)</option>
            <option value="Germany">Germany (Staffing Partners)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 font-semibold text-slate-800"
          >
            <option value="All">All Pipeline Stages</option>
            <option value="New Lead">New Lead (Not Contacted)</option>
            <option value="Pitch Sent">Pitch Sent (Follow-up)</option>
            <option value="Converted to Client">Converted to Paying Client</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 text-center text-xs text-slate-500 font-semibold">
            Scanning job boards for active hiring employers...
          </div>
        ) : leads.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
            No active employer leads found matching criteria.
          </div>
        ) : (
          leads.map(lead => (
            <div key={lead.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-amber-400 transition space-y-4">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    📍 {lead.country} • {lead.city}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    lead.outreachStatus === "New Lead" 
                      ? "bg-emerald-100 text-emerald-800" 
                      : "bg-indigo-100 text-indigo-800"
                  }`}>
                    {lead.outreachStatus}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base">{lead.companyName}</h3>
                  <p className="text-xs text-slate-500 font-medium">{lead.industry}</p>
                </div>

                {/* Role specs */}
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Urgent Roles Needed:</span>
                    <span className="font-bold text-slate-900">{lead.rolesNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Positions:</span>
                    <span className="font-bold text-amber-700 font-mono">~{lead.estimatedPositions} workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Source Ad:</span>
                    <span className="font-semibold text-slate-600">{lead.sourcePortal} ({lead.scrapedDate})</span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="text-xs space-y-1 text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-mono text-[11px] font-semibold">{lead.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{lead.contactPhone} ({lead.contactPerson})</span>
                  </div>
                </div>

                {lead.notes && (
                  <p className="text-[11px] text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                    💡 <strong>Opportunity:</strong> {lead.notes}
                  </p>
                )}
              </div>

              {/* Action Pitch Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {lead.lastContactedAt ? `Pitched: ${new Date(lead.lastContactedAt).toLocaleDateString()}` : "Not contacted yet"}
                </span>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setPitchLang(lead.country === "Germany" ? "DE" : "PL");
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  {lead.outreachStatus === "New Lead" ? "Send 1-Click B2B Pitch" : "Re-pitch / Follow-up"}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* 1-Click B2B Pitch Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Send B2B Staffing Proposal</h3>
                <p className="text-xs text-slate-500">To: {selectedLead.companyName} ({selectedLead.contactEmail})</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selection */}
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPitchLang("PL")}
                className={`w-1/2 py-2 rounded-xl font-bold border transition ${
                  pitchLang === "PL" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                🇵🇱 Polish Proposal (Oferta Współpracy)
              </button>
              <button
                type="button"
                onClick={() => setPitchLang("DE")}
                className={`w-1/2 py-2 rounded-xl font-bold border transition ${
                  pitchLang === "DE" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                🇩🇪 German Proposal (Kooperationsangebot)
              </button>
            </div>

            {/* Pitch Highlights Included */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2 text-amber-950">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Key Value Points Pre-Crafted in Pitch:
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-amber-900">
                <li>Pre-screened candidates ready in 7-14 days.</li>
                <li>Bilingual on-site coordination (English / Hindi / Nepali).</li>
                <li><strong>30-Day Free Replacement Guarantee</strong> (Zero risk for company).</li>
                <li>Direct placement pricing (no middleman broker markups).</li>
              </ul>
            </div>

            {pitchSentSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold text-center">
                B2B Proposal Dispatched & Logged to Outbound Communications!
              </div>
            ) : (
              <button
                onClick={handleSendPitch}
                disabled={sendingPitch}
                className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-xs transition shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                {sendingPitch ? "Sending Official Proposal..." : `Dispatch Proposal in ${pitchLang === "PL" ? "Polish" : "German"} Now`}
              </button>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
