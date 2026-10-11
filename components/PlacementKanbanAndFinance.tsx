"use client";

import React, { useState } from "react";
import { 
  DollarSign, TrendingUp, ShieldCheck, Clock, CheckCircle2,
  AlertCircle, Building2, User, ArrowRight, Sparkles, Filter
} from "lucide-react";
import { Candidate } from "@/types";

interface KanbanProps {
  candidates: Candidate[];
  onStageChange: (candId: string, newStage: string) => void;
  onSelectCandidate: (candidate: Candidate) => void;
}

const PIPELINE_COLUMNS = [
  { id: "New Lead", label: "1. Inbound Leads", color: "bg-slate-100 border-slate-300 text-slate-700" },
  { id: "Screened", label: "2. Vetted (EN/HI/NE)", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { id: "Law Firm Review", label: "3. Legal / Law Firm Desk", color: "bg-amber-50 border-amber-200 text-amber-800" },
  { id: "Work Permit Pending", label: "4. Permit Pending (Urząd)", color: "bg-purple-50 border-purple-200 text-purple-800" },
  { id: "Matched to Employer", label: "5. Matched to Employer", color: "bg-indigo-50 border-indigo-200 text-indigo-800" },
  { id: "Deployed / Working", label: "6. Deployed (30-Day Guarantee)", color: "bg-emerald-50 border-emerald-300 text-emerald-800" },
  { id: "Completed", label: "7. Commission Collected", color: "bg-emerald-100 border-emerald-400 text-emerald-950" }
];

export default function PlacementKanbanAndFinance({ candidates, onStageChange, onSelectCandidate }: KanbanProps) {
  const [filterCountry, setFilterCountry] = useState("All");
  const [readyIn7DaysOnly, setReadyIn7DaysOnly] = useState(false);

  // Filter candidates
  const filtered = candidates.filter(c => {
    const matchesCountry = filterCountry === "All" ? true : (c.assignedCountry || "Poland") === filterCountry;
    const matchesFastDeployment = !readyIn7DaysOnly ? true : (
      c.currentLocation === "Poland" && 
      (c.legalStatus === "Karta Pobytu" || c.legalStatus === "Student Status" || c.legalStatus === "Valid Visa")
    );
    return matchesCountry && matchesFastDeployment;
  });

  // Calculate Financials
  // Polish placements: avg 2,500 PLN placement fee
  // German placements: avg €1,800 EUR placement fee
  // Law firm referrals: 500 PLN per case
  const deployedWorkers = candidates.filter(c => c.pipelineStage === "Deployed / Working" || c.pipelineStage === "Completed");
  const inPipelineWorkers = candidates.filter(c => c.pipelineStage === "Matched to Employer" || c.pipelineStage === "Work Permit Pending");
  const legalCases = candidates.filter(c => c.pipelineStage === "Law Firm Review");

  const expectedRevenuePLN = (deployedWorkers.filter(c => c.assignedCountry !== "Germany").length * 2500) +
                             (inPipelineWorkers.filter(c => c.assignedCountry !== "Germany").length * 2500);
  
  const expectedRevenueEUR = (deployedWorkers.filter(c => c.assignedCountry === "Germany").length * 1800) +
                             (inPipelineWorkers.filter(c => c.assignedCountry === "Germany").length * 1800);

  const pendingLawFirmCommissionsPLN = legalCases.length * 500;

  return (
    <div className="space-y-6">
      
      {/* Financial Executive Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Expected Poland Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Poland Placement Pipeline</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              PLN
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {expectedRevenuePLN.toLocaleString()} PLN
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            From {deployedWorkers.filter(c => c.assignedCountry !== "Germany").length + inPipelineWorkers.filter(c => c.assignedCountry !== "Germany").length} active placements @ ~2,500 PLN/worker
          </p>
        </div>

        {/* Card 2: Expected Germany / EU Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Germany & EU High-Margin Desk</span>
            <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              EUR
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            €{expectedRevenueEUR.toLocaleString()} EUR
          </div>
          <p className="text-[11px] text-amber-800 font-semibold">
            From {deployedWorkers.filter(c => c.assignedCountry === "Germany").length + inPipelineWorkers.filter(c => c.assignedCountry === "Germany").length} cross-border placements @ ~€1,800/worker
          </p>
        </div>

        {/* Card 3: Law Firm Referral Commissions */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Law Firm Referral Cash</span>
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              TRC
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {pendingLawFirmCommissionsPLN.toLocaleString()} PLN
          </div>
          <p className="text-[11px] text-indigo-700 font-semibold">
            {legalCases.length} active cases referred for Karta Pobytu / Annex 1
          </p>
        </div>

        {/* Card 4: 30-Day Guarantee Countdowns */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Active Warranty Guarantees</span>
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              30D
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {deployedWorkers.length} Active On-Site
          </div>
          <p className="text-[11px] text-slate-500">
            Workers deployed in factories/warehouses under warranty
          </p>
        </div>

      </div>

      {/* Kanban Board Header & Country Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-black text-slate-900">Live Visual Placement Pipeline (Kanban)</h3>
          <p className="text-xs text-slate-500">
            Drag or switch candidate stages across your workflow. Updates candidate files instantly in database.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 p-2 rounded-xl bg-amber-50 border border-amber-300 font-bold text-amber-950 cursor-pointer">
            <input
              type="checkbox"
              checked={readyIn7DaysOnly}
              onChange={(e) => setReadyIn7DaysOnly(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500"
            />
            <span>⚡ Ready in 7 Days Only (In Poland & Legal)</span>
          </label>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">Destination:</span>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="p-2 rounded-xl border border-slate-300 font-bold bg-slate-50 text-slate-800 focus:outline-none"
            >
              <option value="All">All EU Destinations</option>
              <option value="Poland">Poland</option>
              <option value="Germany">Germany</option>
              <option value="Czechia">Czech Republic</option>
              <option value="Netherlands">Netherlands</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visual Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 gap-4 items-start overflow-x-auto pb-4">
        {PIPELINE_COLUMNS.map(col => {
          const colCandidates = filtered.filter(c => c.pipelineStage === col.id);
          return (
            <div key={col.id} className="bg-slate-50/80 rounded-3xl border border-slate-200 p-4 space-y-3 min-w-[260px]">
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-xs text-slate-900">{col.label}</span>
                <span className="font-mono text-xs font-black bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-700">
                  {colCandidates.length}
                </span>
              </div>

              {/* Cards list */}
              <div className="space-y-2.5">
                {colCandidates.length === 0 ? (
                  <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-[11px] text-slate-400">
                    No candidates at this stage
                  </div>
                ) : (
                  colCandidates.map(c => (
                    <div
                      key={c.id}
                      onClick={() => onSelectCandidate(c)}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 cursor-pointer transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-black text-slate-900 text-xs">{c.fullName}</div>
                          <span className="font-mono text-[10px] text-slate-400">{c.referenceCode}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.assignedCountry === "Germany" 
                            ? "bg-amber-100 text-amber-900" 
                            : "bg-emerald-100 text-emerald-800"
                        }`}>
                          {c.assignedCountry || "Poland"}
                        </span>
                      </div>

                      <div className="text-[11px] font-semibold text-slate-600 truncate">
                        {c.primarySkill}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{c.nationality} • {c.experienceYears || c.yearsOfExperience}y exp</span>
                        <span className="font-bold text-slate-700">{c.legalStatus}</span>
                      </div>

                      {/* Quick Move Stage Select */}
                      <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={c.pipelineStage}
                          onChange={(e) => onStageChange(c.id, e.target.value)}
                          className="w-full p-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-700 bg-slate-50 focus:outline-none"
                        >
                          {PIPELINE_COLUMNS.map(opt => (
                            <option key={opt.id} value={opt.id}>Move &rarr; {opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
