export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  location: string;
  description: string;
  phoneHref: string;
  whatsappMessage: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

export type EventType =
  | "PAGE_VIEW"
  | "CALL_CLICK"
  | "WHATSAPP_CLICK"
  | "CALLBACK_SUBMIT"
  | "GALLERY_VIEW";

export interface TrafficEvent {
  id: string;
  timestamp: number;
  type: EventType;
  page: string;
  device: "Mobile" | "Tablet" | "Desktop";
  referrer: string;
  details?: string;
}

export interface CallbackLead {
  id: string;
  phone: string;
  timestamp: number;
  device: "Mobile" | "Tablet" | "Desktop";
  source: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  totalCallClicks: number;
  totalWhatsAppClicks: number;
  totalCallbackLeads: number;
  totalGalleryViews: number;
  deviceBreakdown: {
    Mobile: number;
    Tablet: number;
    Desktop: number;
  };
  leads: CallbackLead[];
  recentEvents: TrafficEvent[];
}
