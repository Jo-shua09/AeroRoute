<div align="center">

# 🌍 AeroRoute — Client Application

**The frontend orchestration engine for predictive crowd intelligence and logistics routing.**

[!Next.js](#)
[!TypeScript](#)
[!Tailwind CSS](#)
[!Zustand](#)
[!Framer Motion](#)

</div>

---

## 📖 Overview

This repository contains the client-side Next.js application for **AeroRoute**. It serves as the primary interface for managing and visualizing real-time human flow during mega-gatherings and dense urban events.

The application features isolated workspaces for different user profiles (Commuters, Transit Drivers, and Fleet Operators) while operating on a shared intelligence network.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Motion (Framer Motion)
- **State Management:** Zustand
- **Icons:** Lucide React
- **Typography:** Bricolage Grotesque (Headings & Metrics) & Plus Jakarta Sans (UI/Body)
- **Mapping:** Mapbox GL JS (implied integration for geospatial heatmaps and routing)

## ✨ Key Features

- **Three Profiles, One Network:**
  - **Fleet Operators (Command Center):** High-level view of spatial heatmaps, predictive surge alerts, and global dispatch analytics.
  - **Commuters (Attendees):** Minimal interface for dropping location "Pulses," requesting rides, and recording voice notes to flag hazards.
  - **Transit Drivers (Pilots):** Distraction-free navigation canvas with dynamic re-routing around temporary hazards.
- **Simulated Orchestration Engine:** Includes built-in simulated telemetry (pulses, hazards, fleet movement) for testing offline-first and predictive capabilities without backend dependencies.
- **Responsive & Mobile-First:** Heavy focus on mobile usability, mimicking native app modal interactions and gesture-friendly layouts.
- **Dark Mode Aesthetic:** High-contrast, neon-on-dark visual language optimized for outdoor readability and low-light environments.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- npm, yarn, pnpm, or bun

### Environment Variables

Create a `.env.local` file in the root of the `Frontend` directory and define the following variables:

```env
# Required for geospatial mapping capabilities
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_public_token_here

# Backend API endpoint (if running the full stack)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser to view the application.

## 📁 Folder Structure

```text
Frontend/
├── app/                  # Next.js App Router root
│   ├── layout.tsx        # Global layout, fonts, and base SEO metadata
│   ├── page.tsx          # Landing page & marketing overview
│   ├── select-role/      # Role selection entry point
│   └── globals.css       # Global stylesheet & Tailwind directives
├── components/           # Reusable React components
│   ├── aero/             # Domain-specific components (Sidebar, CommuterModal, etc.)
│   └── ui/               # Generic/atomic UI components (buttons, inputs)
├── lib/                  # Utilities and core logic
│   ├── store.ts          # Zustand state management setup
│   ├── dummy-data.ts     # Local simulation data for the orchestration engine
│   └── utils.ts          # Helper functions (e.g., Tailwind class merging)
├── public/               # Static assets (images, SEO social cards, manifest)
├── next.config.ts        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🧠 State Management

This project utilizes **Zustand** for lightweight, decentralized state management. 
The primary store is defined in `lib/store.ts` (e.g., `useAero`) and manages:
- Active navigation states (orchestration, fleet dispatch, timeline).
- Modal visibility toggles (e.g., Timeline Drawer, Commuter Pulse Modal).
- Real-time or simulated data arrays (active pulses, hazard regions).

## 🎨 Typography & Design System

The UI relies on a specific typographic hierarchy handled by `next/font/google`:
- **Bricolage Grotesque:** Used for primary branding, headers, and numeric readouts (using `tabular-nums` for alignment).
- **Plus Jakarta Sans:** Used for highly legible body text, micro-labels, and interface elements.

Custom CSS utilities (like `.grid-bg`, `.radial-fade`, and radar animations) are defined inside `app/globals.css`.
