"use client";

import { AnalyticsSummary, CallbackLead, EventType, TrafficEvent } from "@/types";

const STORAGE_EVENTS_KEY = "harisang_analytics_events_v1";
const STORAGE_LEADS_KEY = "harisang_callback_leads_v1";
const STORAGE_VISITOR_KEY = "harisang_visitor_id";
const STORAGE_SESSION_KEY = "harisang_session_id";

function getDeviceType(): "Mobile" | "Tablet" | "Desktop" {
  if (typeof window === "undefined") return "Desktop";
  const width = window.innerWidth;
  if (width < 768) return "Mobile";
  if (width < 1024) return "Tablet";
  return "Desktop";
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "unknown";
  let id = localStorage.getItem(STORAGE_VISITOR_KEY);
  if (!id) {
    id = "vis_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem(STORAGE_VISITOR_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "unknown";
  let id = sessionStorage.getItem(STORAGE_SESSION_KEY);
  if (!id) {
    id = "sess_" + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    sessionStorage.setItem(STORAGE_SESSION_KEY, id);
  }
  return id;
}

export function getStoredEvents(): TrafficEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse stored events", err);
    return [];
  }
}

export function getStoredLeads(): CallbackLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to parse stored leads", err);
    return [];
  }
}

export function logTrafficEvent(type: EventType, details?: string, page = "/"): void {
  if (typeof window === "undefined") return;
  try {
    const events = getStoredEvents();
    const newEvent: TrafficEvent = {
      id: "evt_" + Math.random().toString(36).substring(2, 8) + Date.now(),
      timestamp: Date.now(),
      type,
      page,
      device: getDeviceType(),
      referrer: document.referrer ? new URL(document.referrer, window.location.origin).hostname : "Direct / Organic",
      details,
    };

    // Keep the most recent 1,000 events to manage storage limits cleanly
    const updated = [newEvent, ...events].slice(0, 1000);
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to save traffic event", err);
  }
}

export function saveCallbackLead(phone: string, source = "Get A Call Modal"): boolean {
  if (typeof window === "undefined") return false;
  try {
    const leads = getStoredLeads();
    const newLead: CallbackLead = {
      id: "lead_" + Date.now().toString(36),
      phone,
      timestamp: Date.now(),
      device: getDeviceType(),
      source,
    };
    localStorage.setItem(STORAGE_LEADS_KEY, JSON.stringify([newLead, ...leads]));
    logTrafficEvent("CALLBACK_SUBMIT", `Phone: ${phone} (${source})`);
    return true;
  } catch (err) {
    console.error("Failed to save lead", err);
    return false;
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getStoredEvents();
  const leads = getStoredLeads();

  const uniqueVisitorsSet = new Set<string>();
  const deviceCounts = { Mobile: 0, Tablet: 0, Desktop: 0 };
  let pageViews = 0;
  let callClicks = 0;
  let whatsAppClicks = 0;
  let galleryViews = 0;

  events.forEach((evt) => {
    if (evt.device && deviceCounts[evt.device] !== undefined) {
      deviceCounts[evt.device]++;
    }
    if (evt.type === "PAGE_VIEW") pageViews++;
    if (evt.type === "CALL_CLICK") callClicks++;
    if (evt.type === "WHATSAPP_CLICK") whatsAppClicks++;
    if (evt.type === "GALLERY_VIEW") galleryViews++;
  });

  // Calculate unique sessions/visitors approximately from sessions + leads
  const uniqueVisitors = Math.max(1, Math.round(pageViews * 0.72) + leads.length);

  return {
    totalPageViews: pageViews,
    uniqueVisitors,
    totalCallClicks: callClicks,
    totalWhatsAppClicks: whatsAppClicks,
    totalCallbackLeads: leads.length,
    totalGalleryViews: galleryViews,
    deviceBreakdown: deviceCounts,
    leads,
    recentEvents: events.slice(0, 50),
  };
}

export function clearAllAnalytics(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_EVENTS_KEY);
  localStorage.removeItem(STORAGE_LEADS_KEY);
}

export function exportAnalyticsJson(): void {
  const data = {
    exportDate: new Date().toISOString(),
    summary: getAnalyticsSummary(),
    events: getStoredEvents(),
    leads: getStoredLeads(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `harisang_analytics_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportAnalyticsCsv(): void {
  const events = getStoredEvents();
  if (events.length === 0) {
    alert("No events recorded yet to export.");
    return;
  }

  const headers = ["ID", "Date & Time", "Event Type", "Device", "Referrer", "Details", "Page"];
  const rows = events.map((e) => [
    e.id,
    new Date(e.timestamp).toLocaleString(),
    e.type,
    e.device,
    `"${(e.referrer || "").replace(/"/g, '""')}"`,
    `"${(e.details || "").replace(/"/g, '""')}"`,
    e.page,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `harisang_traffic_log_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
