"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  Users,
  Eye,
  Phone,
  MessageSquare,
  PhoneCall,
  Download,
  Trash2,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import {
  getAnalyticsSummary,
  exportAnalyticsCsv,
  exportAnalyticsJson,
  clearAllAnalytics,
} from "@/lib/analytics";
import { AnalyticsSummary } from "@/types";
import { SITE_CONFIG } from "@/lib/constants";

export default function AdminTrafficPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Expected secret from env variable or default fallback
  const expectedSecret =
    process.env.NEXT_PUBLIC_ADMIN_SECRET || "harisang2026admin";

  useEffect(() => {
    // Check if session is already authenticated
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("harisang_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        loadData();
      }
    }
  }, []);

  const loadData = () => {
    const data = getAnalyticsSummary();
    setSummary(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretInput.trim() === expectedSecret.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem("harisang_admin_auth", "true");
      setAuthError("");
      loadData();
    } else {
      setAuthError("Invalid Admin Secret. Please check your NEXT_PUBLIC_ADMIN_SECRET.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("harisang_admin_auth");
    setIsAuthenticated(false);
    setSecretInput("");
  };

  const handleClearData = () => {
    clearAllAnalytics();
    setShowClearConfirm(false);
    loadData();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPhone(text);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  // If not authenticated, show secret login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0e14] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#151c27] border-2 border-[#fdb813] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#fdb813] text-black p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Admin Traffic Portal</h1>
            <p className="text-xs text-black/80 font-semibold mt-1">
              Harisang Enterprises • Confidential Analytics
            </p>
          </div>

          <div className="h-1.5 hazard-stripes w-full" />

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Enter Admin Secret Passcode
                </label>
                <input
                  type="password"
                  value={secretInput}
                  onChange={(e) => {
                    setSecretInput(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Admin Secret Key"
                  className="w-full bg-[#0b0e14] border border-[#222d3d] focus:border-[#fdb813] text-white px-4 py-3 rounded-xl text-base outline-none transition-colors"
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{authError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#fdb813] hover:bg-[#e5a812] text-black font-extrabold py-3.5 rounded-xl text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Unlock className="w-4 h-4" />
                <span>Access Analytics Dashboard</span>
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#fdb813] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Website Homepage</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Calculate totals and percentages
  const totalEvents = summary ? summary.totalPageViews : 0;
  const devices = summary?.deviceBreakdown || { Mobile: 0, Tablet: 0, Desktop: 0 };
  const totalDeviceClicks = devices.Mobile + devices.Tablet + devices.Desktop || 1;
  const mobilePct = Math.round((devices.Mobile / totalDeviceClicks) * 100);
  const tabletPct = Math.round((devices.Tablet / totalDeviceClicks) * 100);
  const desktopPct = Math.round((devices.Desktop / totalDeviceClicks) * 100);

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#151c27] border-b border-[#222d3d] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-[#0b0e14] hover:bg-[#222d3d] text-slate-300 hover:text-white transition-colors"
              title="Return to site"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <span>Traffic & Lead Radar</span>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Harisang Enterprises • Frontend-Only Storage Engine
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-1.5 bg-[#0b0e14] hover:bg-[#222d3d] text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold border border-[#222d3d] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#fdb813]" />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportAnalyticsCsv}
              className="flex items-center gap-1.5 bg-[#0d2847] hover:bg-[#183e6b] text-white px-3 py-2 rounded-lg text-xs font-semibold border border-[#183e6b] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#fdb813]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={exportAnalyticsJson}
              className="flex items-center gap-1.5 bg-[#0d2847] hover:bg-[#183e6b] text-white px-3 py-2 rounded-lg text-xs font-semibold border border-[#183e6b] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#fdb813]" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 px-3 py-2 rounded-lg text-xs font-semibold border border-rose-800 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>
        <div className="h-1 hazard-stripes w-full" />
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* 1. Page Views */}
          <div className="bg-[#151c27] p-5 rounded-xl border border-[#222d3d] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Page Views</span>
              <Eye className="w-4 h-4 text-[#fdb813]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {summary?.totalPageViews ?? 0}
            </div>
            <span className="text-[11px] text-slate-500">Total sessions</span>
          </div>

          {/* 2. Unique Visitors */}
          <div className="bg-[#151c27] p-5 rounded-xl border border-[#222d3d] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Visitors</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {summary?.uniqueVisitors ?? 0}
            </div>
            <span className="text-[11px] text-slate-500">Estimated unique</span>
          </div>

          {/* 3. Call Inquiries */}
          <div className="bg-[#151c27] p-5 rounded-xl border border-[#222d3d] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Phone Calls</span>
              <Phone className="w-4 h-4 text-[#fdb813]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {summary?.totalCallClicks ?? 0}
            </div>
            <span className="text-[11px] text-slate-500">Direct dial taps</span>
          </div>

          {/* 4. WhatsApp Inquiries */}
          <div className="bg-[#151c27] p-5 rounded-xl border border-[#222d3d] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">WhatsApp</span>
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {summary?.totalWhatsAppClicks ?? 0}
            </div>
            <span className="text-[11px] text-slate-500">Chat initiations</span>
          </div>

          {/* 5. Callback Leads */}
          <div className="bg-[#151c27] p-5 rounded-xl border-2 border-[#fdb813] shadow-md bg-gradient-to-b from-[#151c27] to-[#1c2433]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#fdb813] uppercase">Leads Captured</span>
              <PhoneCall className="w-4 h-4 text-[#fdb813]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#fdb813]">
              {summary?.totalCallbackLeads ?? 0}
            </div>
            <span className="text-[11px] text-slate-400">Mobile numbers</span>
          </div>

          {/* 6. Gallery Views */}
          <div className="bg-[#151c27] p-5 rounded-xl border border-[#222d3d] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Gallery Taps</span>
              <Eye className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {summary?.totalGalleryViews ?? 0}
            </div>
            <span className="text-[11px] text-slate-500">Lightbox views</span>
          </div>
        </div>

        {/* Device Breakdown Card */}
        <div className="bg-[#151c27] p-6 rounded-2xl border border-[#222d3d] shadow-md">
          <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#fdb813]" />
            <span>Visitor Device Breakdown</span>
          </h2>

          <div className="space-y-4">
            {/* Mobile */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Smartphone className="w-3.5 h-3.5 text-[#fdb813]" /> Mobile Devices
                </span>
                <span className="text-white font-bold">{devices.Mobile} ({mobilePct}%)</span>
              </div>
              <div className="w-full bg-[#0b0e14] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#fdb813] h-full rounded-full transition-all duration-500"
                  style={{ width: `${mobilePct}%` }}
                />
              </div>
            </div>

            {/* Desktop */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Monitor className="w-3.5 h-3.5 text-sky-400" /> Desktop & Laptops
                </span>
                <span className="text-white font-bold">{devices.Desktop} ({desktopPct}%)</span>
              </div>
              <div className="w-full bg-[#0b0e14] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${desktopPct}%` }}
                />
              </div>
            </div>

            {/* Tablet */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Tablet className="w-3.5 h-3.5 text-purple-400" /> Tablets & iPads
                </span>
                <span className="text-white font-bold">{devices.Tablet} ({tabletPct}%)</span>
              </div>
              <div className="w-full bg-[#0b0e14] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${tabletPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Callback Leads Table */}
        <div className="bg-[#151c27] rounded-2xl border border-[#222d3d] overflow-hidden shadow-md">
          <div className="p-6 border-b border-[#222d3d] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-[#fdb813]" />
                <span>Captured Callback Leads ({summary?.leads.length ?? 0})</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Direct phone numbers submitted by visitors in the Get A Call modals.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            {summary && summary.leads.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0b0e14] text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-6">Mobile Number</th>
                    <th className="py-3 px-6">Date & Time</th>
                    <th className="py-3 px-6">Device</th>
                    <th className="py-3 px-6">Form Source</th>
                    <th className="py-3 px-6 text-right">Quick Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222d3d] text-slate-300">
                  {summary.leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#1a2331] transition-colors">
                      <td className="py-3.5 px-6 font-bold text-white">
                        <span className="font-mono text-base text-[#fdb813]">
                          +91 {lead.phone}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-xs text-slate-400">
                        {new Date(lead.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-6 text-xs">
                        <span className="bg-[#0b0e14] px-2.5 py-1 rounded border border-[#222d3d]">
                          {lead.device}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-xs text-slate-400">
                        {lead.source}
                      </td>
                      <td className="py-3.5 px-6 text-right space-x-2">
                        <button
                          onClick={() => copyToClipboard(lead.phone)}
                          className="text-xs bg-[#0b0e14] hover:bg-[#222d3d] text-slate-300 px-2.5 py-1.5 rounded border border-[#222d3d] transition-colors cursor-pointer"
                        >
                          {copiedPhone === lead.phone ? "Copied!" : "Copy"}
                        </button>
                        <a
                          href={`tel:+91${lead.phone}`}
                          className="inline-flex items-center gap-1 text-xs bg-[#fdb813] hover:bg-[#e5a812] text-black font-bold px-3 py-1.5 rounded transition-transform active:scale-95"
                        >
                          <Phone className="w-3 h-3 fill-black" />
                          <span>Call</span>
                        </a>
                        <a
                          href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                            "Hello, this is Harisang Enterprises responding to your callback request."
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-[#128C7E] hover:bg-[#0b665c] text-white font-bold px-3 py-1.5 rounded transition-transform active:scale-95"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-slate-400 text-sm">
                No callback leads submitted yet. They will appear here immediately as visitors interact with the site.
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-[#151c27] rounded-2xl border border-[#222d3d] overflow-hidden shadow-md">
          <div className="p-6 border-b border-[#222d3d]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#fdb813]" />
              <span>Real-Time Activity Stream (Last 50 Events)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Live feed of visitor events, clicks, dial requests, and navigation.
            </p>
          </div>

          <div className="divide-y divide-[#222d3d] max-h-96 overflow-y-auto text-sm">
            {summary && summary.recentEvents.length > 0 ? (
              summary.recentEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 flex items-center justify-between hover:bg-[#1a2331] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        evt.type === "CALL_CLICK"
                          ? "bg-[#0d2847] text-[#fdb813] border border-[#183e6b]"
                          : evt.type === "WHATSAPP_CLICK"
                          ? "bg-[#0e3b33] text-[#25D366] border border-[#1b5e52]"
                          : evt.type === "CALLBACK_SUBMIT"
                          ? "bg-[#fdb813] text-black font-extrabold"
                          : "bg-[#0b0e14] text-slate-400"
                      }`}
                    >
                      {evt.type}
                    </span>
                    <div>
                      <p className="text-xs text-white font-medium">
                        {evt.details || evt.page}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Device: {evt.device} • Source: {evt.referrer}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 whitespace-nowrap ml-4">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                No events recorded yet.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Modal to Clear Analytics */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#151c27] border border-rose-600 rounded-2xl max-w-sm w-full p-6 text-center space-y-4">
            <Trash2 className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">Reset All Traffic Data?</h3>
            <p className="text-xs text-slate-400">
              This action will erase all stored pageviews, visitor metrics, and captured callback numbers permanently from browser memory.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-[#222d3d] hover:bg-[#2c394c] text-slate-300 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearData}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
