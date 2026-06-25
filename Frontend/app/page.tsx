"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { Radio, ArrowRight, Smartphone, Truck, MapPin, X, Zap, Radar, Layers, Route as RouteIcon, Activity } from "lucide-react";
import Link from "next/link";
import { AeroLogo } from "@/components/aero/AeroLogo";

type Hotspot = {
  id: string;
  x: number;
  y: number;
  count: number;
  tone: "amber" | "emerald";
  zone: string;
  buses: number;
  wait: string;
  eta: string;
  mesh: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "g1",
    x: 50.5,
    y: 80,
    count: 12400,
    tone: "amber",
    zone: "Main Congress Gate 1 Interchange",
    buses: 45,
    wait: "9 min",
    eta: "18 min",
    mesh: "Active (3 nodes)",
  },
  {
    id: "yc",
    x: 84,
    y: 28,
    count: 4100,
    tone: "emerald",
    zone: "Youth Centre Hub",
    buses: 18,
    wait: "3 min",
    eta: "7 min",
    mesh: "Active (2 nodes)",
  },
  {
    id: "g2",
    x: 85.5,
    y: 50,
    count: 6850,
    tone: "amber",
    zone: "Gate 2 · East Exit Cluster",
    buses: 26,
    wait: "6 min",
    eta: "12 min",
    mesh: "Active (4 nodes)",
  },
];

export default function Landing() {
  const [open, setOpen] = useState<Hotspot | null>(() => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      return HOTSPOTS[0];
    }
    return null;
  });
  const [pulse, setPulse] = useState({ commuters: 184205, nodes: 412, clearance: 14 });
  const [clock, setClock] = useState("09:12 GMT");

  useEffect(() => {
    const t = setInterval(() => {
      setPulse((p) => ({
        commuters: p.commuters + Math.floor(Math.random() * 120 - 40),
        nodes: 412 + Math.floor(Math.random() * 6 - 2),
        clearance: 14 + Math.floor(Math.random() * 3 - 1),
      }));
      const d = new Date();
      setClock(`${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")} GMT`);
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* ===== TOP NAV ===== */}
      <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 font-display">
            <AeroLogo className="h-8 w-8" showBackground={true} />
            <div className="flex flex-col leading-none min-w-0">
              <span className="text-[15px] font-semibold tracking-tight font-display truncate">AeroRoute</span>
              <span className="text-[10px] text-zinc-500 tracking-[0.22em] uppercase mt-0.5">Redemption City OS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center justify-center gap-3 text-[12px] font-medium text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 tracking-wider uppercase text-[11px]">Network Nominal</span>
            </span>
            <span className="text-zinc-700">|</span>
            <span className="num text-zinc-200">{clock}</span>
            <span className="text-zinc-700">|</span>
            <span className="text-[11px] uppercase tracking-wider">
              <span className="text-zinc-500">Camp ·</span> <span className="text-zinc-100">Redemption City</span>
            </span>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2 text-[12px]">
            <a href="#how" className="hidden sm:inline px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition">
              How it works
            </a>
            <a href="#roles" className="hidden md:inline px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition">
              Roles
            </a>
            <Link
              href="/select-role"
              className="ml-1 px-3 py-1.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 transition flex items-center gap-1.5 font-medium"
            >
              Console <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative mx-auto max-w-[1500px] px-4 sm:px-6 pt-6 sm:pt-10 pb-6">
        <div className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-start">
          {/* LEFT-Headline */}
          <div className="order-1 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live · Redemption City Camp
            </div>

            <h1 className="mt-5 font-display font-bold tracking-tight text-zinc-50 text-[40px] leading-[1.05] sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
              Orchestrating Millions in <span className="text-emerald-400">Redemption City</span>.
              <br className="hidden sm:block" /> <span className="text-zinc-400">Zero Gridlock.</span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] sm:text-lg leading-relaxed text-zinc-400">
              AeroRoute transforms chaotic mass-gathering exit points into a calm, predictive transit network. We connect fleet operators, dispatchers
              and commuters into a single real-time operational loop-even when cellular drops.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/select-role"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-[14px] font-semibold text-zinc-950 hover:bg-emerald-400 transition shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)] whitespace-nowrap"
              >
                Choose your perspective <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3 text-[14px] font-medium text-zinc-200 hover:bg-zinc-900 transition whitespace-nowrap"
              >
                See how it works
              </a>
            </div>

            {/* LIVE METRIC RIBBON */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-2.5">
              <RibbonStat tag="Live · Active" value={pulse.commuters.toLocaleString()} label="Commuters in Camp" tone="emerald" />
              <RibbonStat tag="Mesh" value={pulse.nodes.toLocaleString()} label="BLE Relay Nodes" tone="cyan" />
              <RibbonStat tag="Avg" value={`${pulse.clearance} min`} label="Gate Clearance Time" tone="amber" />
            </div>
          </div>

          {/* RIGHT-Interactive map */}
          <div className="order-2">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-[#050505] min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
              <Image
                src="/redemption-city-map.jpg"
                alt="Stylized live map of Redemption City Camp showing demand heatmaps over Gate 1, Gate 2 and Youth Centre"
                className="absolute inset-0 h-full w-full object-cover opacity-95"
                width={1920}
                height={1280}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30 pointer-events-none" />

              {/* HUD top */}
              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 pointer-events-none">
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md px-3 py-2">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Region</div>
                  <div className="text-[13px] font-semibold text-zinc-100">Redemption City · Lagos-Ibadan Expressway</div>
                </div>
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md px-3 py-2 text-right">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Live Pulses</div>
                  <div className="text-[13px] font-semibold text-emerald-400 num flex items-center justify-end gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    2,415 / sec
                  </div>
                </div>
              </div>

              {/* hotspots */}
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setOpen(h)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group min-h-[48px] min-w-[48px] grid place-items-center"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={`Open telemetry for ${h.zone}`}
                >
                  <span className={`absolute inset-0 rounded-full blur-2xl ${h.tone === "amber" ? "bg-amber-400/40" : "bg-emerald-400/35"}`} />
                  <span
                    className={`relative inline-flex h-4 w-4 rounded-full ${
                      h.tone === "amber" ? "bg-amber-400 shadow-[0_0_20px_#fbbf24]" : "bg-emerald-400 shadow-[0_0_20px_#10b981]"
                    }`}
                  >
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
                        h.tone === "amber" ? "bg-amber-400" : "bg-emerald-400"
                      }`}
                    />
                  </span>
                  <span
                    className={`absolute top-full mt-2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold num backdrop-blur-md border ${
                      h.tone === "amber"
                        ? "bg-amber-400/15 border-amber-400/40 text-amber-100"
                        : "bg-emerald-400/15 border-emerald-400/40 text-emerald-200"
                    }`}
                  >
                    {h.count.toLocaleString()} waiting
                  </span>
                </button>
              ))}

              {/* legend */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-md px-2.5 py-1 text-[11px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" /> Dense congestion
                </span>
                <span className="rounded-md border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-md px-2.5 py-1 text-[11px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" /> Active flow
                </span>
                <span className="rounded-md border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-md px-2.5 py-1 text-[11px] num text-zinc-400 ml-auto hidden sm:inline-flex">
                  Tap a node →
                </span>
              </div>

              <AnimatePresence>{open && <HotspotModal h={open} onClose={() => setOpen(null)} />}</AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* platform overview */}
      <section id="how" className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-12 sm:py-20 border-t border-zinc-900">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">The Operational Loop</div>
          <h2 className="mt-3 font-display font-bold tracking-tight text-zinc-50 text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
            How AeroRoute coordinates a camp of millions.
          </h2>
          <p className="mt-4 text-[15px] sm:text-base text-zinc-400 leading-relaxed">
            Three signals form one closed loop-Pulse, Heatmap, Dispatch-running continuously across Redemption City&apos;s gates, parking blocks and
            expressway interchanges.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Step
            num="01"
            tag="The Pulse"
            audience="Commuters"
            icon={<Radar className="h-5 w-5" />}
            title="Millions broadcast where they are."
            body="Commuters submit localized location streams or Pidgin/English voice requests. When cellular fails, signals hop via offline BLE mesh between phones until they reach a relay."
            chips={["Pidgin · English voice", "Offline BLE mesh", "Low-power broadcast"]}
            accent="emerald"
          />
          <Step
            num="02"
            tag="The Heatmap"
            audience="Operators"
            icon={<Layers className="h-5 w-5" />}
            title="Signals collapse into demand clusters."
            body="The system aggregates pulses into high-fidelity density zones, pinpointing exactly where people are piling up at Gate 1, Youth Centre or the East exit-minutes before it becomes a jam."
            chips={["Real-time aggregation", "Predictive surge alerts", "Per-zone telemetry"]}
            accent="amber"
          />
          <Step
            num="03"
            tag="The Dispatch"
            audience="Drivers"
            icon={<RouteIcon className="h-5 w-5" />}
            title="Buses are routed before traffic locks."
            body="Predictive routing pushes nearby buses and drivers straight to the highest-yield density zones-clearing congregants out before the expressway interchanges seize up."
            chips={["Dynamic detours", "ETA-aware dispatch", "Per-driver yield score"]}
            accent="cyan"
          />
        </div>
      </section>

      {/* roles */}
      <section id="roles" className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-12 sm:py-20 border-t border-zinc-900">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-semibold">Decision Hub</div>
            <h2 className="mt-3 font-display font-bold tracking-tight text-zinc-50 text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
              Now pick your intervention point.
            </h2>
            <p className="mt-4 text-[15px] text-zinc-400 leading-relaxed">
              Same live network. Three different surfaces, each tuned for the decisions you&apos;ll make on the ground.
            </p>
          </div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">3 perspectives · 1 operational truth</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <RoleCard
            href="/fleets"
            tone="amber"
            num="01"
            label="Fleet Operator View"
            icon={<Activity className="h-5 w-5" />}
            title="Enter Fleet Operator View"
            body="Manage global asset allocation, set surge routes, and monitor real-time camp gate metrics across every interchange."
            features={["Surge route control", "Per-gate live metrics", "Asset reallocation"]}
            cta="Open Command Center"
          />
          <RoleCard
            href="/driver"
            tone="cyan"
            num="02"
            label="Transit Driver View"
            icon={<Truck className="h-5 w-5" />}
            title="Enter Transit Driver View"
            body="Claim localized high-yield routes, check passenger density maps, and view live ETAs to the next demand cluster."
            features={["High-yield route claim", "Live passenger density", "Turn-by-turn detours"]}
            cta="Go On Duty"
          />
          <RoleCard
            href="/commuter"
            tone="emerald"
            num="03"
            label="Commuter View"
            icon={<Smartphone className="h-5 w-5" />}
            title="Enter Commuter View"
            body="Locate immediate dynamic pooling points, check bus arrivals, and broadcast your location even when networks drop."
            features={["Dynamic pooling points", "Voice pulse (Pidgin)", "Offline broadcast"]}
            cta="Find a Ride"
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative mx-auto max-w-[1500px] px-4 sm:px-6 py-10 mt-4 border-t border-zinc-900 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex items-center gap-2.5 text-[12px] text-zinc-500 min-w-0">
          <AeroLogo className="h-4 w-4" showBackground={false} />
          <span className="truncate font-display">AeroRoute · Redemption City Orchestration OS</span>
        </div>
        <div className="text-[10px] text-zinc-600 tracking-[0.22em] uppercase">© 2026</div>
      </footer>
    </div>
  );
}

/* ============= RIBBON STAT ============= */

function RibbonStat({ tag, value, label, tone }: { tag: string; value: string; label: string; tone: "emerald" | "cyan" | "amber" }): ReactNode {
  const dot = tone === "emerald" ? "bg-emerald-400" : tone === "cyan" ? "bg-cyan-400" : "bg-amber-400";
  const tagCls = tone === "emerald" ? "text-emerald-400" : tone === "cyan" ? "text-cyan-300" : "text-amber-300";
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 px-3.5 py-3">
      <div className="flex items-center gap-2.5">
        <span className={`h-1.5 w-1.5 rounded-full ${dot} animate-pulse`} />
        <span className={`text-[10px] uppercase tracking-[0.22em] font-semibold ${tagCls}`}>{tag}</span>
      </div>
      <div className="mt-1.5 text-[22px] sm:text-2xl font-semibold num tracking-tight text-zinc-50">{value}</div>
      <div className="text-[11px] text-zinc-500 mt-0.5 uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ============= STEP CARD ============= */

function Step({
  num,
  tag,
  audience,
  icon,
  title,
  body,
  chips,
  accent,
}: {
  // Added ReactNode to icon type
  num: string;
  tag: string;
  audience: string;
  icon: ReactNode;
  title: string;
  body: string;
  chips: string[];
  accent: "emerald" | "amber" | "cyan";
}): ReactNode {
  const accentCls = {
    emerald: { ring: "border-emerald-500/30", badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300", glow: "from-emerald-500/15" },
    amber: { ring: "border-amber-400/30", badge: "bg-amber-400/10 border-amber-400/30 text-amber-200", glow: "from-amber-500/15" },
    cyan: { ring: "border-cyan-400/30", badge: "bg-cyan-400/10 border-cyan-400/30 text-cyan-200", glow: "from-cyan-500/15" },
  }[accent];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-5 sm:p-6 transition hover:${accentCls.ring}`}
    >
      <div
        className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accentCls.glow} to-transparent blur-3xl`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className={`h-10 w-10 rounded-xl border grid place-items-center ${accentCls.badge}`}>{icon}</div>
        <div className="text-[11px] num text-zinc-600 tracking-[0.22em]">{num}</div>
      </div>
      <div className="relative mt-5">
        <div className={`text-[10px] uppercase tracking-[0.25em] font-semibold ${accentCls.badge.split(" ").find((c) => c.startsWith("text-"))}`}>
          {tag} · <span className="text-zinc-500">{audience}</span>
        </div>
        <h3 className="mt-2 font-display font-semibold tracking-tight text-zinc-50 text-[20px] sm:text-[22px] leading-snug">{title}</h3>
        <p className="mt-2.5 text-[14px] text-zinc-400 leading-relaxed">{body}</p>
      </div>
      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span key={c} className="rounded-full border border-zinc-800 bg-zinc-950/70 px-2.5 py-1 text-[11px] text-zinc-400 uppercase tracking-wider">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============= ROLE CARD ============= */

function RoleCard({
  href,
  tone,
  num,
  label,
  icon,
  title,
  body,
  features,
  cta,
}: {
  href: string; // Changed from to to href for Next.js Link
  tone: "amber" | "cyan" | "emerald";
  num: string;
  label: string;
  icon: ReactNode;
  title: string;
  body: string;
  features: string[];
  cta: string;
}): ReactNode {
  const tones = {
    amber: {
      ring: "hover:border-amber-400/50",
      badge: "bg-amber-400/10 border-amber-400/30 text-amber-200",
      btn: "bg-amber-400 text-zinc-950 hover:bg-amber-300",
      glow: "from-amber-500/15",
    },
    cyan: {
      ring: "hover:border-cyan-400/50",
      badge: "bg-cyan-400/10 border-cyan-400/30 text-cyan-200",
      btn: "bg-cyan-400 text-zinc-950 hover:bg-cyan-300",
      glow: "from-cyan-500/15",
    },
    emerald: {
      ring: "hover:border-emerald-400/50",
      badge: "bg-emerald-400/10 border-emerald-400/30 text-emerald-200",
      btn: "bg-emerald-400 text-zinc-950 hover:bg-emerald-300",
      glow: "from-emerald-500/15",
    },
  }[tone];
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md p-5 sm:p-6 transition flex flex-col ${tones.ring}`}
    >
      <div
        className={`pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${tones.glow} to-transparent blur-3xl opacity-70 group-hover:opacity-100 transition`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className={`h-11 w-11 rounded-xl border grid place-items-center ${tones.badge}`}>{icon}</div>
        <span className="text-[11px] num text-zinc-600 tracking-[0.22em]">{num}</span>
      </div>
      <div className="relative mt-5">
        <div className="text-[10px] uppercase tracking-[0.25em] font-semibold text-zinc-500">{label}</div>
        <h3 className="mt-2 font-display font-semibold tracking-tight text-zinc-50 text-[20px] sm:text-[22px] leading-snug">{title}</h3>
        <p className="mt-2.5 text-[14px] text-zinc-400 leading-relaxed">{body}</p>
      </div>
      <ul className="relative mt-4 space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-[13px] text-zinc-300">
            <span className="h-1 w-1 rounded-full bg-zinc-500" /> {f}
          </li>
        ))}
      </ul>
      <div className="relative mt-6 flex items-center justify-between border-t border-zinc-800 pt-4">
        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">Live data connected</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition whitespace-nowrap ${tones.btn}`}
        >
          {cta} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

/* ============= HOTSPOT MODAL ============= */

function HotspotModal({ h, onClose }: { h: Hotspot; onClose: () => void }): ReactNode {
  const accent =
    h.tone === "amber" ? "text-amber-300 border-amber-400/40 bg-amber-400/10" : "text-emerald-300 border-emerald-400/40 bg-emerald-400/10";
  return (
    <motion.div
      key={h.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-x-3 bottom-14 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[340px] z-20"
    >
      <div className="rounded-2xl border border-zinc-700/70 bg-zinc-950/85 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="flex items-start justify-between gap-2 px-4 pt-4">
          <div className="min-w-0">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] font-semibold ${accent}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {h.tone === "amber" ? "Dense Congestion" : "Active Flow"}
            </div>
            <h3 className="mt-2 text-[15px] font-semibold text-zinc-50 leading-snug">{h.zone}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 h-7 w-7 grid place-items-center rounded-md border border-zinc-800 hover:bg-zinc-900 transition"
            aria-label="Close details"
          >
            <X className="h-3.5 w-3.5 text-zinc-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-px bg-zinc-800/70 mt-4">
          <Metric label="Waiting" value={h.count.toLocaleString()} />
          <Metric label="Inbound" value={`${h.buses} bus`} />
          <Metric label="ETA" value={h.eta} />
        </div>

        <div className="px-4 py-3 border-t border-zinc-800 text-[11.5px] text-zinc-400 space-y-1.5">
          <Row k="Avg. wait" v={h.wait} />
          <Row k="Offline mesh" v={h.mesh} mono />
          <Row k="Coords" v="6.7440° N · 3.2740° E" mono />
        </div>

        <Link
          href="/fleets"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-400 text-zinc-950 text-[13px] font-semibold hover:bg-emerald-300 transition whitespace-nowrap"
        >
          <Zap className="h-3.5 w-3.5" /> Deploy Surge Relief
        </Link>
      </div>
    </motion.div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }): ReactNode {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-500 uppercase tracking-wider text-[10.5px]">{k}</span>
      <span className={`text-zinc-200 ${mono ? "num" : ""}`}>{v}</span>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }): ReactNode {
  return (
    <div className="bg-zinc-950/80 px-3 py-3">
      <div className="text-[9.5px] uppercase tracking-[0.18em] text-zinc-500 font-medium flex items-center gap-1">
        <MapPin className="h-2.5 w-2.5" /> {label}
      </div>
      <div className="mt-1 text-[15px] font-semibold num tracking-tight text-zinc-50">{value}</div>
    </div>
  );
}
