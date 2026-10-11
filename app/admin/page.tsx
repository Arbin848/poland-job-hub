"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Building2, Briefcase, FileCheck, MessageSquare, 
  Search, Filter, Plus, Phone, Mail, Send, CheckCircle, 
  Download, Eye, Shield, Globe, Award, Sparkles, ChevronRight, AlertCircle, X,
  Upload, RefreshCw, TrendingUp
} from "lucide-react";
import DynamicCVRenderer, { CVTemplateStyle } from "@/components/DynamicCVRenderer";
import EmployerHunterModule from "@/components/EmployerHunterModule";
import InternalTeamHub from "@/components/InternalTeamHub";
import PlacementKanbanAndFinance from "@/components/PlacementKanbanAndFinance";
import CandidateShortlistDossier from "@/components/CandidateShortlistDossier";

export default function AdminPortalPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"kanban" | "candidates" | "shortlist" | "cv-preview" | "team-hub" | "hunter" | "orders" | "legal" | "communications">("kanban");
  const [selectedCVTemplate, setSelectedCVTemplate] = useState<CVTemplateStyle>("executive-gold");
  const [shortlistTargetCompany, setShortlistTargetCompany] = useState("European Logistics & Manufacturing Partner");
  const [shortlistTargetRole, setShortlistTargetRole] = useState("Urgent Warehouse & Technical Workforce");
  
  // Selection & Filters
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterSkill, setFilterSkill] = useState<string>("All");

  // Document Upload State
  const [showDocUploadModal, setShowDocUploadModal] = useState(false);
  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState("Passport");
  const [docExpiry, setDocExpiry] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  // Communication Modal State
  const [showCommModal, setShowCommModal] = useState(false);
  const [commType, setCommType] = useState<"SMS" | "Email">("SMS");
  const [commMessage, setCommMessage] = useState("");
  const [commSending, setCommSending] = useState(false);
  const [commSuccess, setCommSuccess] = useState(false);

  // Fetch candidates from real database
  const loadCandidates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/candidates");
      const json = await res.json();
      if (json.success) {
        setCandidates(json.data);
        if (json.data.length > 0 && !selectedCandidate) {
          setSelectedCandidate(json.data[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load candidates", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  // Filtered Candidates
  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cand.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.primarySkill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === "All" || cand.currentLocation === filterLocation;
    const matchesSkill = filterSkill === "All" || cand.primarySkill.includes(filterSkill);
    return matchesSearch && matchesLocation && matchesSkill;
  });

  // Handle stage change with real DB update
  const handleStageChange = async (candId: string, newStage: string) => {
    try {
      await fetch("/api/candidates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: candId, pipelineStage: newStage })
      });
      setCandidates(prev => prev.map(c => c.id === candId ? { ...c, pipelineStage: newStage } : c));
      if (selectedCandidate?.id === candId) {
        setSelectedCandidate((prev: any) => ({ ...prev, pipelineStage: newStage }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Document Upload
  const handleDocUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !selectedFile) return;

    try {
      setUploadingDoc(true);
      const formData = new FormData();
      formData.append("candidateId", selectedCandidate.id);
      formData.append("title", docTitle || selectedFile.name);
      formData.append("docType", docType);
      formData.append("expiryDate", docExpiry);
      formData.append("file", selectedFile);

      const res = await fetch("/api/documents", {
        method: "POST",
        body: formData
      });
      const json = await res.json();

      if (json.success) {
        setShowDocUploadModal(false);
        setDocTitle("");
        setSelectedFile(null);
        await loadCandidates();
        // Update selected candidate's document list
        setSelectedCandidate((prev: any) => ({
          ...prev,
          documents: [json.data, ...(prev.documents || [])]
        }));
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploadingDoc(false);
    }
  };

  // Handle 1-Click Communication
  const handleSendComm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate || !commMessage) return;

    try {
      setCommSending(true);
      const res = await fetch("/api/communications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: selectedCandidate.id,
          recipientContact: commType === "SMS" ? selectedCandidate.phone : selectedCandidate.email,
          type: commType,
          messageText: commMessage,
          sentBy: "Arbin (Founder)"
        })
      });
      const json = await res.json();
      if (json.success) {
        setCommSuccess(true);
        setTimeout(() => {
          setCommSuccess(false);
          setShowCommModal(false);
          setCommMessage("");
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                PJH
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                PolJobHub <span className="text-amber-400 font-normal">| Operations Cloud Vault</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              SQLite Persistent DB Active
            </span>
            <span className="text-slate-400">Arbin (Founder Admin)</span>
            <Link href="/" className="text-slate-400 hover:text-white transition">
              View Public Site
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/auth", { method: "DELETE" });
                window.location.href = "/login";
              }}
              className="text-amber-400 hover:text-amber-300 font-bold transition"
            >
              Logout 🔒
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab("kanban")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "kanban"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Pipeline & Revenue Desk
          </button>

          <button
            onClick={() => setActiveTab("candidates")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "candidates"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" /> Candidates & Vault ({candidates.length})
          </button>

          <button
            onClick={() => setActiveTab("shortlist")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "shortlist"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" /> 📋 Client Shortlist Pack
          </button>

          <button
            onClick={() => setActiveTab("cv-preview")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "cv-preview"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> Multi-Template CV Engine
          </button>

          <button
            onClick={() => setActiveTab("team-hub")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "team-hub"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" /> 🔒 Private Team Room (EU Mobility)
          </button>

          <button
            onClick={() => setActiveTab("hunter")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "hunter"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-blue-400" /> Employer Hunter (Leads)
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "orders"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" /> B2B Job Orders (PL & DE)
          </button>

          <button
            onClick={() => setActiveTab("legal")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "legal"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCheck className="w-4 h-4" /> Law Firm Referral Desk
          </button>

          <button
            onClick={() => setActiveTab("communications")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "communications"
                ? "border-amber-400 text-amber-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 1-Click SMS & Email Hub
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* TAB: VISUAL PIPELINE KANBAN & REVENUE DESK */}
        {activeTab === "kanban" && (
          <PlacementKanbanAndFinance
            candidates={candidates}
            onStageChange={handleStageChange}
            onSelectCandidate={(c) => {
              setSelectedCandidate(c);
              setActiveTab("candidates");
            }}
          />
        )}
        
        {/* TAB: EMPLOYER HUNTER LEADS */}
        {activeTab === "hunter" && (
          <EmployerHunterModule 
            onSelectLeadForShortlist={(company, role) => {
              setShortlistTargetCompany(company);
              setShortlistTargetRole(role);
              setActiveTab("shortlist");
            }}
          />
        )}

        {/* TAB: CLIENT SHORTLIST DOSSIER PACK */}
        {activeTab === "shortlist" && (
          <CandidateShortlistDossier
            candidates={candidates}
            preSelectedCompany={shortlistTargetCompany}
            preSelectedRole={shortlistTargetRole}
          />
        )}

        {/* TAB: CANDIDATES & VAULT */}
        {activeTab === "candidates" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Candidate List with Search & Filters */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search candidate name, code, trade..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="flex gap-2 text-xs">
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-1/2 p-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    <option value="All">All Locations</option>
                    <option value="Poland">In Poland</option>
                    <option value="Abroad">Abroad (Needs Visa)</option>
                  </select>

                  <select
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    className="w-1/2 p-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    <option value="All">All Trades</option>
                    <option value="Warehouse">Warehouse / Forklift</option>
                    <option value="Welder">Welder (135/136)</option>
                    <option value="CNC">CNC Operator</option>
                    <option value="Production">General Production</option>
                  </select>
                </div>
              </div>

              {/* Candidate Cards List */}
              <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="p-8 text-center text-xs text-slate-500 font-semibold">Loading database records...</div>
                ) : filteredCandidates.length === 0 ? (
                  <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 font-semibold">
                    No candidates found.
                  </div>
                ) : (
                  filteredCandidates.map(cand => {
                    const isSelected = selectedCandidate?.id === cand.id;
                    return (
                      <div
                        key={cand.id}
                        onClick={() => setSelectedCandidate(cand)}
                        className={`p-4 rounded-2xl border text-xs cursor-pointer transition flex flex-col justify-between ${
                          isSelected 
                            ? "bg-amber-50/70 border-amber-400 shadow-sm" 
                            : "bg-white border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-sm">{cand.fullName}</span>
                              <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                                {cand.referenceCode}
                              </span>
                            </div>
                            <p className="text-slate-600 font-medium mt-0.5">{cand.primarySkill}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cand.currentLocation === "Poland" 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-amber-100 text-amber-800"
                          }`}>
                            {cand.currentLocation}
                          </span>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-slate-500">
                          <span className="font-medium">Status: {cand.legalStatus}</span>
                          <span className="text-amber-700 font-bold">{cand.pipelineStage}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>

            {/* Right Column: Selected Candidate Details & Document Vault */}
            <div className="lg:col-span-7">
              {selectedCandidate ? (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
                  
                  {/* Header Actions */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-2xl font-black text-slate-900">{selectedCandidate.fullName}</h2>
                        <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-lg">
                          {selectedCandidate.referenceCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {selectedCandidate.nationality} • {selectedCandidate.experienceYears} yrs experience • {selectedCandidate.education}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${selectedCandidate.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedCandidate.fullName}, this is PolJobHub regarding your placement update (Ref: ${selectedCandidate.referenceCode}).`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> 1-Click WhatsApp
                      </a>

                      <button
                        onClick={() => {
                          setCommMessage(`Hello ${selectedCandidate.fullName}, this is PolJobHub regarding your placement...`);
                          setShowCommModal(true);
                        }}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-400" /> SMS / Email
                      </button>

                      <button
                        onClick={() => setActiveTab("cv-preview")}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" /> Market CV Dossier
                      </button>

                      <button
                        onClick={() => setActiveTab("shortlist")}
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm border border-slate-200"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-600" /> Shortlist Pack
                      </button>
                    </div>
                  </div>

                  {/* Pipeline Stage Controller */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Deployment Pipeline Stage:</span>
                      <span className="text-amber-700 uppercase">{selectedCandidate.pipelineStage}</span>
                    </div>

                    <select
                      value={selectedCandidate.pipelineStage}
                      onChange={(e) => handleStageChange(selectedCandidate.id, e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="New Lead">1. New Lead (Needs Initial Evaluation)</option>
                      <option value="Screened">2. Screened & Language Vetted (EN/HI/NE)</option>
                      <option value="Law Firm Review">3. Under Partner Law Firm Review (TRC / Annex 1)</option>
                      <option value="Work Permit Pending">4. Work Permit Pending in Voivodeship Office</option>
                      <option value="Matched to Employer">5. Matched to Employer / Contract Prepared</option>
                      <option value="Deployed / Working">6. Deployed & Working On-Site</option>
                      <option value="Completed">7. Placement Completed & Commission Paid</option>
                    </select>
                  </div>

                  {/* Attributes Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">WhatsApp / Phone</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.phone}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Languages</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.languages?.join(", ")}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Assigned Country</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.assignedCountry || "Poland"}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Legal Status</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.legalStatus}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Document Expiry</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.legalStatusExpiry || "No expiry logged"}</span>
                    </div>

                    <div className="p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Assigned Employer</span>
                      <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.assignedEmployer || "Unassigned"}</span>
                    </div>
                  </div>

                  {/* Secure Document Vault */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-amber-600" />
                        PolJobHub Document Vault ({selectedCandidate.documents?.length || 0})
                      </h3>
                      <button 
                        onClick={() => setShowDocUploadModal(true)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200"
                      >
                        <Upload className="w-3.5 h-3.5" /> Upload Actual File to Vault
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectedCandidate.documents && selectedCandidate.documents.length > 0 ? (
                        selectedCandidate.documents.map((doc: any) => (
                          <div key={doc.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs bg-slate-50/70">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                                {doc.docType.substring(0, 3).toUpperCase()}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">{doc.title}</span>
                                <span className="text-slate-400 text-[10px]">Type: {doc.docType} • Uploaded: {doc.uploadedAt}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {doc.expiryDate && (
                                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                                  Exp: {doc.expiryDate}
                                </span>
                              )}
                              <a
                                href={doc.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3 text-slate-400" /> View
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                          No documents uploaded yet. Click "Upload Actual File to Vault" to add Passports, Visas, or Certificates.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recruiter Notes */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-amber-900 block">Confidential Recruiter Notes:</span>
                    <p className="text-amber-800">{selectedCandidate.notes || "No notes entered yet."}</p>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
                  Select a candidate from the left list.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB: PRIVATE INTERNAL TEAM ROOM */}
        {activeTab === "team-hub" && (
          <InternalTeamHub />
        )}

        {/* TAB: MULTI-TEMPLATE CV ENGINE */}
        {activeTab === "cv-preview" && selectedCandidate && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-4xl mx-auto bg-white p-6 rounded-3xl border border-slate-200">
              <div>
                <h2 className="text-xl font-black text-slate-900">PolJobHub CV Generator Desk</h2>
                <p className="text-xs text-slate-500">
                  Select European market template to generate high-conversion candidate dossiers for employers.
                </p>
              </div>

              {/* Template Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Style:</span>
                <select
                  value={selectedCVTemplate}
                  onChange={(e) => setSelectedCVTemplate(e.target.value as CVTemplateStyle)}
                  className="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="executive-gold">🏆 PolJobHub Executive Gold (Flagship)</option>
                  <option value="europass-modern">🇪🇺 Europass Modern (EU Standard)</option>
                  <option value="german-technical">🇩🇪 German Lebenslauf (DE / AT)</option>
                  <option value="minimalist-slate">📄 Minimalist Slate (Fast Scan)</option>
                </select>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" /> Print / Save PDF
                </button>
              </div>
            </div>

            <DynamicCVRenderer candidate={selectedCandidate} template={selectedCVTemplate} />
          </div>
        )}

        {/* TAB 3: B2B JOB ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Direct Employer & German Partner Orders</h2>
              <p className="text-xs text-slate-500">Active hiring quotas from factories in Poland and staffing partners in Germany.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      Poland • Poznań
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">15x Warehouse Order Pickers</h3>
                  <p className="text-xs font-semibold text-slate-500">Panattoni Logistics Sp. z o.o.</p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Placement Commission:</span>
                      <span className="font-bold text-emerald-700">2,500 PLN / candidate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Filled:</span>
                      <span className="font-bold text-amber-700">9 of 15 placed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      Germany • Bavaria
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      High Margin
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">6x MIG/MAG Welders (135)</h3>
                  <p className="text-xs font-semibold text-slate-500">Bavaria IndustriePersonal GmbH</p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Placement Commission:</span>
                      <span className="font-bold text-emerald-700">€1,800 / candidate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Filled:</span>
                      <span className="font-bold text-amber-700">2 of 6 placed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LAW FIRM REFERRAL DESK */}
        {activeTab === "legal" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Partner Law Firm Referral Engine</h2>
              <p className="text-xs text-slate-500">
                Track candidates referred for Karta Pobytu, Annex 1 employer change, and work permit appeals. Monitor expected referral commissions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Legal Matter</th>
                    <th className="p-4">Referral Date</th>
                    <th className="p-4">Law Firm Status</th>
                    <th className="p-4">Commission</th>
                    <th className="p-4">Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-4 font-bold text-slate-900">Gurpreet Singh (+48 732 192 841)</td>
                    <td className="p-4 text-slate-700">Change of Employer (Annex 1)</td>
                    <td className="p-4 text-slate-500">2026-09-16</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        Application Filed in Urząd
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">500 PLN</td>
                    <td className="p-4 text-amber-700 font-bold">Pending Decision</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: 1-CLICK COMMUNICATIONS */}
        {activeTab === "communications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">1-Click Communication Logs & Automation</h2>
              <p className="text-xs text-slate-500">Real-time log of SMS and emails sent to candidates and clients.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs flex justify-between items-center">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 mr-2">SMS</span>
                  <span className="font-bold text-slate-900">Bikash Shrestha (+48 572 819 231)</span>
                  <p className="text-slate-600 mt-1">"Hello Bikash, your placement with Poznań Auto Logistics is confirmed. Starting Monday."</p>
                </div>
                <span className="text-[10px] text-slate-400">Sent by Arbin (Founder)</span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Upload Document Modal */}
      {showDocUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Upload Document to Vault</h3>
                <p className="text-xs text-slate-500">For candidate: {selectedCandidate?.fullName}</p>
              </div>
              <button onClick={() => setShowDocUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDocUpload} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Passport Scan (Full Color)"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="Passport">Passport</option>
                  <option value="Visa">National Visa (Type D)</option>
                  <option value="Karta Pobytu">Karta Pobytu (TRC)</option>
                  <option value="Police Clearance">Police Clearance Certificate</option>
                  <option value="Work Certificate">UDT / Welder / Trade Certificate</option>
                  <option value="CV">Original CV / Resume</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Expiry Date (if applicable)</label>
                <input
                  type="date"
                  value={docExpiry}
                  onChange={(e) => setDocExpiry(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select File (PDF, PNG, JPG)</label>
                <input
                  type="file"
                  required
                  onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-slate-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={uploadingDoc}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition"
                >
                  {uploadingDoc ? "Saving to Vault..." : "Save to PolJobHub Vault"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1-Click Message Modal */}
      {showCommModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                Send 1-Click Message to {selectedCandidate?.fullName}
              </h3>
              <button onClick={() => setShowCommModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCommType("SMS")}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold border transition ${
                  commType === "SMS" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                SMS to {selectedCandidate?.phone}
              </button>
              <button
                type="button"
                onClick={() => setCommType("Email")}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold border transition ${
                  commType === "Email" ? "bg-amber-500 text-slate-950 border-amber-500" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                Email to {selectedCandidate?.email}
              </button>
            </div>

            <form onSubmit={handleSendComm} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  value={commMessage}
                  onChange={(e) => setCommMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {commSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center">
                  Message Dispatched & Logged to DB!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={commSending}
                  className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition"
                >
                  {commSending ? "Sending..." : `Send ${commType} Now`}
                </button>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
