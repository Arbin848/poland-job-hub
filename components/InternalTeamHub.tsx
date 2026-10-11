"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, Plus, Send, ShieldAlert, Flag, CheckCircle2,
  Clock, Globe, Building2, User, AlertCircle, RefreshCw
} from "lucide-react";

export default function InternalTeamHub() {
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCountry, setFilterCountry] = useState("All");

  // Form state
  const [newTopic, setNewTopic] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newCountry, setNewCountry] = useState("Poland");
  const [newPriority, setNewPriority] = useState("Normal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDiscussions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/team-discussions?country=${filterCountry}`);
      const json = await res.json();
      if (json.success) {
        setDiscussions(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscussions();
  }, [filterCountry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/team-discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: newTopic,
          commentText: newComment,
          targetCountry: newCountry,
          priority: newPriority,
          authorName: "Arbin (Founder)"
        })
      });
      const json = await res.json();
      if (json.success) {
        setNewTopic("");
        setNewComment("");
        fetchDiscussions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            🔒 Private Internal Room (Staff & Founder Only)
          </div>
          <h2 className="text-2xl font-black">EU Candidate & Client Case Discussions</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            This section is 100% private. Discuss confidential candidate files, partner terms in Poland, Germany, Czechia, Romania, Netherlands, and visa strategies with your team.
          </p>
        </div>

        <div className="flex gap-2">
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-none"
          >
            <option value="All">All EU Destinations</option>
            <option value="Poland">Poland</option>
            <option value="Germany">Germany</option>
            <option value="Czechia">Czech Republic</option>
            <option value="Romania">Romania</option>
            <option value="Netherlands">Netherlands</option>
          </select>

          <button
            onClick={fetchDiscussions}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Discussion Feed */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-600" />
            Internal Team Case Notes & Action Items ({discussions.length})
          </h3>

          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500 font-semibold bg-white rounded-3xl border border-slate-200">
              Loading team case notes...
            </div>
          ) : discussions.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 bg-white rounded-3xl border border-slate-200">
              No discussions logged for this destination yet. Post the first case note!
            </div>
          ) : (
            discussions.map(disc => (
              <div key={disc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      🇪🇺 {disc.targetCountry}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      disc.priority === "Urgent" 
                        ? "bg-rose-100 text-rose-800" 
                        : disc.priority === "High"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-700"
                    }`}>
                      {disc.priority}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {new Date(disc.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-slate-900 text-base">{disc.topic}</h4>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {disc.commentText}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100">
                  <span className="font-semibold text-slate-600">Logged by: {disc.authorName} ({disc.authorRole})</span>
                  <span className="text-emerald-700 font-bold">Confidential</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Post New Case Discussion */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5 h-fit">
          <div>
            <h3 className="font-black text-slate-900 text-base">Add Private Case Note / Task</h3>
            <p className="text-xs text-slate-500 mt-0.5">Visible only to you and your authorized team inside the portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target EU Country</label>
              <select
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                <option value="Poland">Poland (Domestic & Factory Quotas)</option>
                <option value="Germany">Germany (Zeitarbeit & Direct Staffing)</option>
                <option value="Czechia">Czech Republic (Logistics & Production)</option>
                <option value="Romania">Romania (Fast Work Permit Processing)</option>
                <option value="Netherlands">Netherlands (Agricultural & Warehouse)</option>
                <option value="Other EU">Other European Union Market</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Topic / Candidate Reference</label>
              <input
                type="text"
                required
                placeholder="e.g. Bikash S. - Work Permit Submission or German Client Offer"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
              </input>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Priority Level</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none font-semibold"
              >
                <option value="Normal">Normal</option>
                <option value="High">High (Requires follow-up this week)</option>
                <option value="Urgent">Urgent (Action needed today)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confidential Notes / Strategy Details</label>
              <textarea
                rows={5}
                required
                placeholder="Enter private notes on candidate legal status, employer negotiations, fee percentages, or instructions for your assistants..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-amber-400" />
              {isSubmitting ? "Logging Note..." : "Save Case Note to Private Hub"}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
