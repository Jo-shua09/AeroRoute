<div align="center">
  
# 🌍 AeroRoute

**Phase 2 Prototype:** An offline-first, predictive logistics engine for African mega-events and dense urban hubs.

[![Status: Active Development](https://img.shields.io/badge/Status-Active%20Development-10B981?style=flat-square)](#)
[![Frontend: Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=flat-square&logo=next.js)](#)
[![Backend: .NET](https://img.shields.io/badge/Backend-.NET%208%20%7C%20C%23-512BD4?style=flat-square&logo=dotnet)](#)
[![Database: SQL Server](https://img.shields.io/badge/Database-SQL%20Server%20Spatial-CC2927?style=flat-square&logo=microsoft-sql-server)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Hackathon Context](#-hackathon-context)
- [The Team](#-the-team)
- [License](#-license)

---

## 📖 About the Project

During mega-gatherings and large-scale urban events, the sudden movement of tens of thousands of people creates immediate, dangerous logistical gridlock. Standard navigation apps suffer from the **Static Mapping Blindspot** (ignoring sudden hyper-local hazards) and fail completely under **Infrastructure Collapse** (cellular networks crashing due to high crowd density).

**AeroRoute** solves this by replacing reactive, internet-dependent mapping with a timeline-driven, offline-first predictive engine.

---

## ✨ Key Features

- **Predictive Orchestration:** Anticipates crowd surges by syncing with the event timeline, deploying shuttle fleets to exit gates 15 minutes _before_ the crowd physically arrives.
- **AI Voice Triage:** Translates unstructured audio reports (English/Pidgin) into precise, live geographic hazard polygons on the global map in under 60 seconds.
- **Infrastructure Resiliency:** Operates seamlessly even when 4G/5G networks fail, using aggressive local device caching and SMS text gateways to transmit coordinates.
- **Role-Isolated Dashboards:** Custom telemetry views for Fleet Operators, Commuters, and Transit Pilots to eliminate information overload.

---

## 🏗️ System Architecture

AeroRoute is built on a decoupled microservices architecture to ensure high-speed spatial rendering and offline resiliency.

| Layer              | Technology                           | Purpose                                                           |
| :----------------- | :----------------------------------- | :---------------------------------------------------------------- |
| **Frontend UI**    | Next.js 15 (App Router), TypeScript  | Fast, responsive client rendering with PWA capabilities.          |
| **State & UI**     | Zustand, Tailwind CSS, Framer Motion | Lightweight state management and high-contrast dark-mode styling. |
| **Mapping Engine** | Mapbox GL JS                         | Custom vector grid rendering and live navigation lines.           |
| **API Engine**     | .NET 8 (C#) Web API                  | Robust business logic and external integration routing.           |
| **Database**       | Microsoft SQL Server                 | Utilizing native `geography` types for spatial calculations.      |
| **Real-Time**      | SignalR                              | Persistent WebSockets for live fleet tracking and hazard alerts.  |
| **Integrations**   | OpenAI API & Africa's Talking        | NLP text-to-coordinate proxy and SMS fallback gateway.            |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v18.0.0 or higher)
- .NET 8 SDK
- Microsoft SQL Server (Developer or Express edition)
- A valid Mapbox Access Token

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root of the `client` folder and add your variables:

   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

> **Note:** For Phase 2 UI testing, the frontend utilizes localized dummy JSON matrices (`dummyFleets.ts`, `dummyHazards.ts`) to simulate WebSocket data before the API is fully connected.

### Backend Setup

1. Navigate to the API directory:

   ```bash
   cd server/AeroRoute.API
   ```

2. Restore the .NET packages:

   ```bash
   dotnet restore
   ```

3. Update `appsettings.json` with your SQL Server connection string and required API keys:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=AeroRouteDB;Trusted_Connection=True;Encrypt=False;"
     },
     "OpenAI": {
       "ApiKey": "your_openai_key_here"
     }
   }
   ```

4. Apply Entity Framework migrations to build the database schema:

   ```bash
   dotnet ef database update
   ```

5. Run the server:
   ```bash
   dotnet run
   ```

---

## 🏆 Hackathon Context

This project is currently being developed for **Phase 2: System Architecture & Prototype Design** of the Kingdom Hack 3.0 Hackathon.

---

## 👥 The Team

**Team AeroRoute**

- **Joshua Onyeka** - Architecture & UI Design
- **Soyemi Samuel Olakunle** - Backend Engineer (.NET / SQL Server)
- **Joshua Sofela** - Frontend Engineer (Next.js / Mapbox)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
