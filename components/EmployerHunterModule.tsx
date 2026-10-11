"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, MapPin, Send, CheckCircle2, Globe, Clock, 
  ExternalLink, Search, Filter, ShieldCheck, Mail, Phone,
  Briefcase, Sparkles, RefreshCw, X, Plus, FileText, Check
} from "lucide-react";

interface HunterProps {
  onSelectLeadForShortlist?: (companyName: string, roleNeeded: string) => void;
}

export default function EmployerHunterModule({ onSelectLeadForShortlist }: HunterProps) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  
  // Pitch Modal State
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [pitchLang, setPitchLang] = useState<"PL" | "DE">("PL");
  const [sendingPitch, setSendingPitch] = useState(false);
  const [pitchSentSuccess, setPitchSentSuccess] = useState(false);

  // Add Custom Lead Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newCountry, setNewCountry] = useState<"Poland" | "Germany">("Poland");
  const [newCity, setNewCity] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newRoles, setNewRoles] = useState("");
  const [newPositions, setNewPositions] = useState("5");
  const [newContactPerson, setNewContactPerson] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [creatingLead, setCreatingLead] = useState(false);

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

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      await fetch("/api/employer-leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, outreachStatus: newStatus })
      });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, outreachStatus: newStatus } : l));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCustomLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newRoles) return;

    try {
      setCreatingLead(true);
      const res = await fetch("/api/employer-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          companyName: newCompany,
          country: newCountry,
          city: newCity || "Warsaw",
          industry: newIndustry || "Logistics & Manufacturing",
          rolesNeeded: newRoles,
          estimatedPositions: Number(newPositions) || 5,
          contactPerson: newContactPerson,
          contactEmail: newEmail,
          contactPhone: newPhone,
          sourcePortal: "Direct Contact / Manual Hunter",
          outreachStatus: "New Lead",
          notes: newNotes
        })
      });
      const json = await res.json();
      if (json.success) {
        setShowAddLeadModal(false);
        setNewCompany("");
        setNewRoles("");
        setNewEmail("");
        setNewPhone("");
        setNewNotes("");
        fetchLeads();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCreatingLead(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Automated Hunter & CRM Engine</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">High-Intent Employer Leads (Poland & Germany)</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify active hiring shortages, dispatch automated B2B proposals, or generate custom shortlist packs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Employer Lead
          </button>

          <button
            onClick={fetchLeads}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 text-xs bg-white p-4 rounded-2xl border border-slate-200">
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
          <span className="font-bold text-slate-700">Pipeline Stage:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 font-semibold text-slate-800"
          >
            <option value="All">All Pipeline Stages</option>
            <option value="New Lead">New Lead (Not Contacted)</option>
            <option value="Pitch Sent">Pitch Sent</option>
            <option value="Negotiating">Negotiating / Meeting</option>
            <option value="Converted to Client">Converted to Paying Client</option>
          </select>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 text-center text-xs text-slate-500 font-semibold">
            Scanning job boards and employer CRM records...
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

                  <select
                    value={lead.outreachStatus}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${
                      lead.outreachStatus === "New Lead" 
                        ? "bg-slate-100 text-slate-800 border-slate-200" 
                        : lead.outreachStatus === "Pitch Sent"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : lead.outreachStatus === "Negotiating"
                        ? "bg-amber-100 text-amber-900 border-amber-200"
                        : "bg-emerald-100 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    <option value="New Lead">1. New Lead</option>
                    <option value="Pitch Sent">2. Pitch Sent</option>
                    <option value="Negotiating">3. Negotiating / Call</option>
                    <option value="Converted to Client">4. Converted to Client</option>
                    <option value="Not Interested">5. Not Interested</option>
                  </select>
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
                    <span className="text-slate-500">Source:</span>
                    <span className="font-semibold text-slate-600">{lead.sourcePortal} ({lead.scrapedDate})</span>
                  </div>
                </div>

                {/* Contact info */}
                <div className="text-xs space-y-1 text-slate-600 pt-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-mono text-[11px] font-semibold">{lead.contactEmail || "Email not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{lead.contactPhone || "Phone not specified"} ({lead.contactPerson || "HR"})</span>
                  </div>
                </div>

                {lead.notes && (
                  <p className="text-[11px] text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 leading-relaxed">
                    💡 <strong>Opportunity:</strong> {lead.notes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  {lead.lastContactedAt ? `Pitched: ${new Date(lead.lastContactedAt).toLocaleDateString()}` : "Not contacted"}
                </span>

                <div className="flex items-center gap-2">
                  {onSelectLeadForShortlist && (
                    <button
                      onClick={() => onSelectLeadForShortlist(lead.companyName, lead.rolesNeeded)}
                      className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-700" />
                      Generate Dossier
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setSelectedLead(lead);
                      setPitchLang(lead.country === "Germany" ? "DE" : "PL");
                    }}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    {lead.outreachStatus === "New Lead" ? "1-Click Pitch" : "Re-pitch"}
                  </button>
                </div>
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

            {/* Live Email Preview */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 max-h-56 overflow-y-auto">
              <span className="font-bold text-slate-700 block">Hostinger SMTP Template Preview:</span>
              <p className="text-slate-600 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                {pitchLang === "PL" 
                  ? `Szanowny Panie / Szanowna Pani,\n\nZauważyliśmy Państwa rekrutację na stanowisko ${selectedLead.rolesNeeded} w ${selectedLead.city}.\n\nPolJobHub Sp. z o.o. (Warszawa) zapewnia sprawdzonych pracowników z bezpłatną 30-dniową gwarancją wymiany oraz wsparciem koordynatora językowego (EN/HI/NE/PL).\n\nChętnie prześlemy shortlist dossier kandydatów. Czy możemy umówić krótką rozmowę?`
                  : `Sehr geehrte Damen und Herren,\n\nbezugnehmend auf Ihren aktuellen Bedarf an ${selectedLead.rolesNeeded} in ${selectedLead.city}.\n\nPolJobHub Warschau vermittelt geprüfte Arbeitskräfte mit 30-Tage-Ersatzgarantie und bilingualer Koordination.\n\nGerne übermitteln wir passende Kandidatendossiers. Wann passt Ihnen ein kurzes Telefonat?`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={sendingPitch || pitchSentSuccess}
                onClick={handleSendPitch}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl transition shadow-md flex items-center gap-2"
              >
                {sendingPitch ? (
                  "Sending Pitch via SMTP..."
                ) : pitchSentSuccess ? (
                  <span className="flex items-center gap-1.5 text-emerald-950">
                    <CheckCircle2 className="w-4 h-4" /> Pitch Delivered!
                  </span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Dispatch B2B Proposal
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Custom Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCustomLead} className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Add New Employer Lead</h3>
                <p className="text-xs text-slate-500">Record a company actively hiring in Poland or Germany</p>
              </div>
              <button type="button" onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
                <input
                  required
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Amazon Fulfillment Sady Sp. z o.o."
                  className="w-full p-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Country</label>
                <select
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                >
                  <option value="Poland">Poland</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">City / Region</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. Poznań"
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Roles Needed *</label>
                <input
                  required
                  type="text"
                  value={newRoles}
                  onChange={(e) => setNewRoles(e.target.value)}
                  placeholder="e.g. Forklift Drivers / Magazynier UDT"
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Estimated Positions</label>
                <input
                  type="number"
                  value={newPositions}
                  onChange={(e) => setNewPositions(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  placeholder="e.g. Logistics & E-Commerce"
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="hr@company.pl"
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone / Person</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+48 600... (Jan Kowalski)"
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Opportunity Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Offering 2,500 PLN placement fee per verified worker..."
                  className="w-full p-2 rounded-xl border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setShowAddLeadModal(false)}
                className="px-4 py-2 font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creatingLead}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition shadow-sm"
              >
                {creatingLead ? "Saving..." : "Save Employer Lead"}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
