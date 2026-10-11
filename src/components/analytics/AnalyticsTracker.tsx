"use client";

import { useEffect } from "react";
import { logTrafficEvent, getSessionId } from "@/lib/analytics";

interface AnalyticsTrackerProps {
  pageName?: string;
}

export default function AnalyticsTracker({ pageName = "/" }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Initialize session and record page view
    getSessionId();
    logTrafficEvent("PAGE_VIEW", `Page visit: ${pageName}`, pageName);
  }, [pageName]);

  return null;
}
