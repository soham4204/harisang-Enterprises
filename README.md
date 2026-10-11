# Harisang Enterprises - Next.js Heavy Equipment Rental Website

A responsive, production-ready **Next.js** recreation of the [Harisang Enterprises](https://harisangenterprises.in/) heavy-machinery rental website with an industrial **JCB Theme** (JCB Yellow, Industrial Blue, Obsidian Black), high-contrast hazard styling, and a **confidential frontend traffic analytics engine**.

---

## 🏗️ Features & Technical Highlights

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + Custom JCB Industrial Design System (`#FDB813`, `#0D2847`, `#0F141C`) with caution hazard striping and micro-interactions
- **Icons**: Lucide React + custom inline brand SVGs
- **Fleet Showcase**: 8 dedicated equipment rental cards with "From Mumbai" badges, instant phone dialer, and WhatsApp deep links:
  1. Crane on hire
  2. Road Roller on hire
  3. JCB on hire
  4. Poclain on hire
  5. Forklift on hire
  6. Truck Trailer on hire
  7. Hydra crane on hire
  8. Farana crane on hire
- **Gallery & Lightbox**: 10 high-resolution heavy equipment images with fullscreen interactive lightbox, counter, category tags, and keyboard arrow/Esc controls
- **Lead Generation**:
  - Interactive "Get A Call" popup modal with 10-digit mobile number validation
  - Auto-open on first session visit with dismissal persistence
  - Contact section priority callback form
  - Floating sticky WhatsApp button with pulsing animation
- **100% Frontend-Only Architecture**: Zero external backend or database required. Lead submissions, conversions, and visitor metrics are processed and stored securely in client storage.

---

## 🔒 Secret Traffic & Leads Dashboard (`/admin/traffic`)

A hidden analytics dashboard is available at `/admin/traffic` for fleet owners and administrators to track visitor engagement without third-party tracking cookies or complex backends:

- **Passcode Authentication**: Protected by `NEXT_PUBLIC_ADMIN_SECRET` in `.env.local`
- **Real-Time KPI Cards**: Total Pageviews, Unique Visitors, Direct Call Taps, WhatsApp Inquiries, Leads Captured, Lightbox Engagements
- **Captured Leads Table**: List of submitted mobile phone numbers with timestamp, device type, form source, and one-click "Copy", "Call", and "WhatsApp" actions
- **Device Breakdown**: Visual progress bars tracking Mobile, Desktop, and Tablet shares
- **Live Event Feed**: Real-time stream of the last 50 user actions
- **Data Export & Management**: One-click download of all records as **CSV** or **JSON**, plus a secure data reset utility

---

## ⚙️ Environment Configuration

Create or update `.env.local`:

```bash
# Company Contact Details
NEXT_PUBLIC_SITE_NAME="Harisang Enterprises"
NEXT_PUBLIC_PHONE="+91 9987003674"
NEXT_PUBLIC_PHONE_RAW="+919987003674"
NEXT_PUBLIC_WHATSAPP="919987003674"
NEXT_PUBLIC_EMAIL="Harisangenterprises@gmail.com"
NEXT_PUBLIC_ADDRESS="7/1, Suresh Niwas, kisan nagar no. 2, road no. 16, wagle estate, Thane(West), Maharashtra - 400 604"

# Secret Passcode for /admin/traffic page
NEXT_PUBLIC_ADMIN_SECRET="harisang2026admin"
```

> **Tip**: You can change `NEXT_PUBLIC_ADMIN_SECRET` to any custom password you prefer.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the homepage.  
Open [http://localhost:3000/admin/traffic](http://localhost:3000/admin/traffic) to view the secret traffic radar.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
harisang-Enterprises/
├── public/
│   └── assets/                  # 11 heavy machinery images + brand logo
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, OpenGraph, viewport, font settings
│   │   ├── page.tsx             # Main single-page application
│   │   ├── globals.css          # JCB color tokens, hazard stripes, animations
│   │   └── admin/
│   │       └── traffic/
│   │           └── page.tsx     # Secret admin traffic dashboard
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ContactBar.tsx   # Top contact bar (Phone, Email, Get A Call)
│   │   │   ├── Header.tsx       # Sticky brand navigation & hamburger toggle
│   │   │   ├── MobileNav.tsx    # Slide-out responsive mobile drawer
│   │   │   └── Footer.tsx       # 4-column footer, social icons & copyright
│   │   ├── sections/
│   │   │   ├── HeroSlider.tsx   # 4-slide carousel with CTAs & autoplay pause
│   │   │   ├── ServicesSection.tsx # 8 equipment rental cards
│   │   │   ├── ServiceCard.tsx  # Individual equipment card with Call & WhatsApp
│   │   │   ├── GallerySection.tsx  # 10-image responsive grid
│   │   │   ├── LightboxModal.tsx   # Fullscreen photo viewer
│   │   │   └── ContactSection.tsx  # Contact info cards & callback form
│   │   ├── ui/
│   │   │   ├── GetACallModal.tsx   # Lead capture modal popup
│   │   │   ├── FloatingWhatsApp.tsx# Sticky WhatsApp quick button
│   │   │   └── BackToTop.tsx       # Smooth scroll-to-top button
│   │   └── analytics/
│   │       └── AnalyticsTracker.tsx# Client-side automated pageview tracker
│   ├── data/
│   │   ├── servicesData.ts      # Typed 8 equipment categories & asset mappings
│   │   └── galleryData.ts       # Typed 10 gallery photos with descriptions
│   ├── lib/
│   │   ├── analytics.ts         # Frontend storage engine (events, sessions, leads)
│   │   └── constants.ts         # Site config, contact URLs & WhatsApp helpers
│   └── types/
│       └── index.ts             # TypeScript interfaces
├── .env.example
├── .env.local
├── package.json
└── README.md
```
