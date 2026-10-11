"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, Building2, Briefcase, FileCheck, MessageSquare, 
  Search, Filter, Plus, Phone, Mail, Send, CheckCircle, 
  Download, Eye, Shield, Globe, Award, Sparkles, ChevronRight, AlertCircle, X
} from "lucide-react";
import { initialCandidates, initialJobOrders, initialLawFirmReferrals, initialCommunicationLogs } from "@/lib/mockData";
import { Candidate, JobOrder } from "@/types";

export default function AdminDashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [jobOrders, setJobOrders] = useState<JobOrder[]>(initialJobOrders);
  const [activeTab, setActiveTab] = useState<"candidates" | "orders" | "legal" | "communications" | "cv-preview">("candidates");
  
  // Selection & Filters
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(initialCandidates[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterSkill, setFilterSkill] = useState<string>("All");

  // Communication Modal State
  const [showCommModal, setShowCommModal] = useState(false);
  const [commType, setCommType] = useState<"SMS" | "Email">("SMS");
  const [commMessage, setCommMessage] = useState("");
  const [commSuccess, setCommSuccess] = useState(false);

  // Filtered Candidates
  const filteredCandidates = candidates.filter(cand => {
    const matchesSearch = cand.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cand.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cand.primarySkill.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = filterLocation === "All" || cand.currentLocation === filterLocation;
    const matchesSkill = filterSkill === "All" || cand.primarySkill.includes(filterSkill);
    return matchesSearch && matchesLocation && matchesSkill;
  });

  const handleSendCommunication = (e: React.FormEvent) => {
    e.preventDefault();
    setCommSuccess(true);
    setTimeout(() => {
      setCommSuccess(false);
      setShowCommModal(false);
      setCommMessage("");
    }, 1500);
  };

  const handleStageChange = (candId: string, newStage: any) => {
    setCandidates(prev => prev.map(c => c.id === candId ? { ...c, pipelineStage: newStage } : c));
    if (selectedCandidate?.id === candId) {
      setSelectedCandidate(prev => prev ? { ...prev, pipelineStage: newStage } : null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
                PJH
              </div>
              <span className="font-bold text-base tracking-tight text-white">
                Poland Job Hub <span className="text-indigo-400 font-normal">| Management Portal</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Database Connected
            </span>
            <div className="hidden sm:flex items-center gap-2 text-slate-300">
              <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400">
                A
              </span>
              <span>Arbin (Founder Admin)</span>
            </div>
            <Link href="/" className="text-slate-400 hover:text-white transition">
              Exit Portal &rarr;
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("candidates")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "candidates"
                ? "border-indigo-500 text-indigo-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users className="w-4 h-4" /> Candidates & Document Vault ({candidates.length})
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "orders"
                ? "border-indigo-500 text-indigo-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" /> B2B Job Orders (PL & DE) ({jobOrders.length})
          </button>

          <button
            onClick={() => setActiveTab("cv-preview")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "cv-preview"
                ? "border-indigo-500 text-indigo-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> Branded CV Generator
          </button>

          <button
            onClick={() => setActiveTab("legal")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "legal"
                ? "border-indigo-500 text-indigo-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileCheck className="w-4 h-4" /> Law Firm Referral Desk (2)
          </button>

          <button
            onClick={() => setActiveTab("communications")}
            className={`py-3 px-4 border-b-2 flex items-center gap-2 transition ${
              activeTab === "communications"
                ? "border-indigo-500 text-indigo-400 bg-slate-800/50"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> 1-Click SMS & Email Hub
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* TAB 1: CANDIDATES & VAULT */}
        {activeTab === "candidates" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Candidate List with Search & Filters */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by Name, Ref, Skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-2 text-xs">
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-1/2 p-2 rounded-lg border border-slate-200 text-slate-700 font-medium"
                  >
                    <option value="All">All Locations</option>
                    <option value="Poland">In Poland</option>
                    <option value="Abroad">Abroad (Needs Visa)</option>
                  </select>

                  <select
                    value={filterSkill}
                    onChange={(e) => setFilterSkill(e.target.value)}
                    className="w-1/2 p-2 rounded-lg border border-slate-200 text-slate-700 font-medium"
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
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
                {filteredCandidates.map(cand => {
                  const isSelected = selectedCandidate?.id === cand.id;
                  return (
                    <div
                      key={cand.id}
                      onClick={() => setSelectedCandidate(cand)}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition flex flex-col justify-between ${
                        isSelected 
                          ? "bg-indigo-50/80 border-indigo-400 shadow-sm" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{cand.fullName}</span>
                            <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
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
                        <span className="text-indigo-600 font-bold">{cand.pipelineStage}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Selected Candidate Detailed File & Document Vault */}
            <div className="lg:col-span-7">
              {selectedCandidate ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                  
                  {/* Header / Actions */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-black text-slate-900">{selectedCandidate.fullName}</h2>
                        <span className="font-mono text-xs font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                          {selectedCandidate.referenceCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {selectedCandidate.nationality} • {selectedCandidate.yearsOfExperience} yrs exp • Education: {selectedCandidate.education}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCommMessage(`Hello ${selectedCandidate.fullName}, this is Poland Job Hub regarding your placement...`);
                          setShowCommModal(true);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Send className="w-3.5 h-3.5" /> 1-Click Msg / SMS
                      </button>

                      <button
                        onClick={() => setActiveTab("cv-preview")}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Export CV Card
                      </button>
                    </div>
                  </div>

                  {/* Pipeline Stage Controller */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Recruitment & Deployment Stage:</span>
                      <span className="text-indigo-600 uppercase">{selectedCandidate.pipelineStage}</span>
                    </div>

                    <select
                      value={selectedCandidate.pipelineStage}
                      onChange={(e) => handleStageChange(selectedCandidate.id, e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                    >
                      <option value="New Lead">1. New Lead (Awaiting Screen)</option>
                      <option value="Screened">2. Screened & Language Vetted</option>
                      <option value="Law Firm Review">3. Under Law Firm Partner Review</option>
                      <option value="Work Permit Pending">4. Work Permit (Zezwolenie) Pending in Voivodeship</option>
                      <option value="Matched to Employer">5. Matched to Employer / Ready for Contract</option>
                      <option value="Deployed / Working">6. Deployed & Working On-Site</option>
                      <option value="Completed">7. Placement Completed & Commission Paid</option>
                    </select>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Phone / WhatsApp</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.phone}</span>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Languages</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.languages.join(", ")}</span>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Assigned Country</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.assignedCountry}</span>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Legal Status</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.legalStatus}</span>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Expiry / Deadline</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.legalStatusExpiry || "N/A"}</span>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                      <span className="text-slate-400 block font-medium">Assigned Employer</span>
                      <span className="font-bold text-slate-800 block mt-0.5">{selectedCandidate.assignedEmployer || "Unassigned"}</span>
                    </div>
                  </div>

                  {/* Document Vault */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-indigo-600" /> Secure Document Vault
                      </h3>
                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                        <Plus className="w-3.5 h-3.5" /> Upload File
                      </button>
                    </div>

                    <div className="space-y-2">
                      {selectedCandidate.documents.map(doc => (
                        <div key={doc.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs bg-slate-50/50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                              PDF
                            </div>
                            <div>
                              <span className="font-bold text-slate-800 block">{doc.title}</span>
                              <span className="text-slate-400 text-[10px]">Type: {doc.type} • Uploaded: {doc.uploadedAt}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold flex items-center gap-1">
                              <Eye className="w-3 h-3 text-slate-400" /> Preview
                            </button>
                            <button className="px-2.5 py-1 rounded bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-700 font-semibold flex items-center gap-1">
                              <Download className="w-3 h-3" /> Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Internal Recruiter Notes */}
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs space-y-1">
                    <span className="font-bold text-amber-900 block">Recruiter / Staff Internal Notes:</span>
                    <p className="text-amber-800">{selectedCandidate.notes || "No notes entered yet."}</p>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
                  Select a candidate from the left list to view their file.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: B2B JOB ORDERS */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Direct Employer & Partner Agency Orders</h2>
                <p className="text-xs text-slate-500">Active hiring quotas from factories in Poland and staffing partners in Germany.</p>
              </div>

              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm">
                <Plus className="w-4 h-4" /> Add New Job Order
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobOrders.map(order => (
                <div key={order.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800">
                        {order.country} • {order.city}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {order.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{order.title}</h3>
                    <p className="text-xs font-semibold text-slate-500">{order.companyName}</p>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Salary Offered:</span>
                        <span className="font-bold text-slate-900">{order.salaryOffered}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Placement Commission:</span>
                        <span className="font-bold text-emerald-600">{order.placementFeePerWorker} {order.currency} / person</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Quota Status:</span>
                        <span className="font-bold text-indigo-600">{order.positionsFilled} of {order.positionsNeeded} placed</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Requires: {order.requiredLanguages.join(", ")}</span>
                    <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition">
                      Match Candidates &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BRANDED CV GENERATOR */}
        {activeTab === "cv-preview" && selectedCandidate && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Poland Job Hub Branded Candidate Profile</h2>
                <p className="text-xs text-slate-500">
                  Standardized, European-ready format. Anonymized to prevent clients from bypassing your commission.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
                >
                  <Download className="w-4 h-4" /> Export Clean PDF for Client
                </button>
              </div>
            </div>

            {/* The Branded CV Card Preview */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-8 sm:p-12 space-y-8 font-sans">
              
              {/* CV Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-2 border-indigo-600">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-700 to-indigo-500 flex items-center justify-center text-white font-black text-2xl shadow-md">
                    PJH
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900">{selectedCandidate.fullName}</h1>
                    <p className="text-sm font-semibold text-indigo-700">{selectedCandidate.primarySkill}</p>
                    <span className="text-[11px] font-mono text-slate-400">Ref Code: {selectedCandidate.referenceCode}</span>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-500 space-y-0.5">
                  <div className="font-bold text-slate-900">Represented by Poland Job Hub</div>
                  <div>Direct Staffing & Relocation Division</div>
                  <div className="text-indigo-600 font-semibold">rekrutacja@polandjobhub.com</div>
                </div>
              </div>

              {/* Key Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Nationality</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.nationality}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Current Status</span>
                  <span className="font-bold text-emerald-700 block mt-0.5">{selectedCandidate.legalStatus}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experience</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.yearsOfExperience} Years Verified</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Languages</span>
                  <span className="font-bold text-slate-900 block mt-0.5">{selectedCandidate.languages.join(" • ")}</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Candidate Executive Summary</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Screened and verified by Poland Job Hub. Candidate possesses {selectedCandidate.yearsOfExperience} years of hands-on experience in {selectedCandidate.primarySkill}. Able to communicate clearly in {selectedCandidate.languages.join(", ")}. Available for immediate deployment upon employer contract confirmation.
                </p>
              </div>

              {/* Verified Documents Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Verified Documents On File</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCandidate.documents.map(doc => (
                    <div key={doc.id} className="p-3 rounded-lg border border-slate-200 bg-white flex items-center gap-2 text-xs">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-800">{doc.title}</span>
                        <span className="text-[10px] text-slate-400 block">Verified on {doc.uploadedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Non-Circumvention Disclaimer */}
              <div className="p-4 rounded-xl bg-slate-100 text-[11px] text-slate-500 border border-slate-200 flex items-center justify-between">
                <span>Direct contact details protected under agency agreement. 30-day replacement guarantee applies.</span>
                <span className="font-bold text-slate-700 font-mono">POLAND JOB HUB VERIFIED</span>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: LAW FIRM REFERRAL DESK */}
        {activeTab === "legal" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">Partner Law Firm Referral Engine</h2>
              <p className="text-xs text-slate-500">
                Track candidates referred for Karta Pobytu, Annex 1, and work permit appeals. Monitor expected referral commissions.
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
                  {initialLawFirmReferrals.map(ref => (
                    <tr key={ref.id} className="hover:bg-slate-50/50">
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{ref.candidateName}</span>
                        <span className="text-slate-400 text-[11px]">{ref.candidatePhone}</span>
                      </td>
                      <td className="p-4 font-medium text-slate-700">{ref.issueType}</td>
                      <td className="p-4 text-slate-500">{ref.referralDate}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {ref.status}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">{ref.expectedCommissionPLN} PLN</td>
                      <td className="p-4">
                        {ref.isPaid ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Paid to PJH
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Pending Approval
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: 1-CLICK SMS & EMAIL */}
        {activeTab === "communications" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-slate-900">1-Click Communication Logs & Automation</h2>
              <p className="text-xs text-slate-500">History of automated and 1-click SMS & Emails sent to candidates and clients.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 divide-y divide-slate-100">
              {initialCommunicationLogs.map(log => (
                <div key={log.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.type === "SMS" ? "bg-purple-100 text-purple-800" : "bg-sky-100 text-sky-800"
                      }`}>
                        {log.type}
                      </span>
                      <span className="font-bold text-slate-900">{log.candidateName}</span>
                      <span className="text-slate-400 font-mono text-[11px]">[{log.templateUsed}]</span>
                    </div>
                    <p className="text-slate-700 font-medium pt-1 max-w-2xl">{log.messageText}</p>
                  </div>
                  <div className="text-right text-slate-400 text-[11px] shrink-0">
                    <div>{new Date(log.sentAt).toLocaleDateString()} at {new Date(log.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div className="text-slate-500 font-medium">Sender: {log.sentBy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 1-Click Message Modal */}
      {showCommModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4">
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
                className={`w-1/2 py-2 rounded-lg text-xs font-bold border transition ${
                  commType === "SMS" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                SMS to {selectedCandidate?.phone}
              </button>
              <button
                type="button"
                onClick={() => setCommType("Email")}
                className={`w-1/2 py-2 rounded-lg text-xs font-bold border transition ${
                  commType === "Email" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                Email to {selectedCandidate?.email}
              </button>
            </div>

            <form onSubmit={handleSendCommunication} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  value={commMessage}
                  onChange={(e) => setCommMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {commSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold text-center">
                  Message Dispatched Successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition"
                >
                  Send {commType} Now
                </button>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
