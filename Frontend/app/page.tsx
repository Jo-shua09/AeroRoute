"use client";

import Link from "next/link"; // Use Next.js Link for navigation
import { Radio, ArrowRight, Activity, Smartphone, Truck, Shield, Zap, WifiOff, TrendingUp, MapPin, Mic } from "lucide-react";
import { motion } from "motion/react"; // Moved below other imports for consistency, though not strictly required

export default function Landing() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0A0A0A] text-foreground">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-0 radial-fade" />
      <div className="pointer-events-none absolute left-1/2 top-[-200px] -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-emerald/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute right-[-200px] top-[300px] h-[500px] w-[500px] rounded-full bg-electric/[0.05] blur-[120px]" />

      {/* header */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-emerald/30 to-electric/20 border border-white/10 flex items-center justify-center">
            <Radio className="h-4 w-4 text-emerald" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight font-heading">AeroRoute</span>
            <span className="text-[9px] text-muted-foreground tracking-[0.18em] uppercase mt-0.5">Orchestration OS</span>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 text-xs text-muted-foreground md:flex">
          <a href="#platform" className="hover:text-white transition">
            Platform
          </a>
          <a href="#roles" className="hover:text-white transition">
            Profiles
          </a>
          <a href="#capabilities" className="hover:text-white transition">
            Capabilities
          </a>
        </nav>
        <Link // Changed 'to' to 'href'
          href="/select-role"
          className="text-xs px-3.5 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition flex items-center gap-1.5"
        >
          Launch <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
          Predictive Intelligence · Live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-7 max-w-4xl text-[42px] sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.02]"
        >
          Real-Time Human Flow
          <br />
          <span className="bg-gradient-to-br from-white via-white to-emerald/70 bg-clip-text text-transparent">
            Orchestration for Mega-Gatherings.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          AeroRoute fuses predictive AI, offline-first commuter pulses, and live fleet telemetry into one calm operating system — so 200,000 people
          move like 200.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <Link // Changed 'to' to 'href'
            href="/select-role"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-3.5 text-sm font-medium text-white shadow-[0_0_40px_-8px_var(--electric)] hover:shadow-[0_0_60px_-6px_var(--electric)] transition-all"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
            Launch Orchestration Engine
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-muted-foreground hover:text-white hover:bg-white/[0.04] transition"
          >
            How it works
          </a>
        </motion.div>

        {/* live preview card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-emerald/10 via-transparent to-transparent blur-2xl" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-xl p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-1.5 px-2 pb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">aeroroute.live / orchestration</span>
            </div>
            <div className="relative h-[280px] sm:h-[400px] rounded-xl overflow-hidden border border-white/5 grid-bg">
              <div className="absolute inset-0 radial-fade" />
              {/* mock clusters */}
              <div className="absolute left-[28%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-32 w-32 rounded-full bg-emerald/30 blur-2xl" />
              </div>
              <div className="absolute left-[62%] top-[55%] -translate-x-1/2 -translate-y-1/2">
                <div className="h-40 w-40 rounded-full bg-emerald/20 blur-2xl" />
              </div>
              {/* hazards */}
              <div className="absolute left-[40%] top-[30%]">
                <span className="relative inline-flex h-3 w-3 text-crimson radar-pulse">
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-crimson shadow-[0_0_12px_var(--crimson)]" />
                </span>
              </div>
              <div className="absolute left-[72%] top-[35%]">
                <span className="relative inline-flex h-3 w-3 text-emerald radar-pulse">
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]" />
                </span>
              </div>
              {/* fleet markers */}
              {[
                [20, 50],
                [55, 35],
                [70, 65],
                [40, 70],
              ].map(([x, y], i) => (
                <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                  <div className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_8px_var(--electric)]" />
                </div>
              ))}
              {/* HUD chips */}
              <div className="absolute top-3 left-3 glass-strong rounded-lg px-3 py-1.5 text-[10px] tracking-wider text-muted-foreground">
                ZONE · ALPHA-7
              </div>
              <div className="absolute top-3 right-3 glass-strong rounded-lg px-3 py-1.5 text-[10px] text-emerald flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" /> 1,245 active pulses
              </div>
              <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-lg px-3 py-2 flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Main Service ends in</span>
                <span className="num text-white">14:32</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* platform overview */}
      <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.22em] text-emerald">The Platform</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Two failures collapse every mega-event.
            <br />
            We solve both.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <ProblemCard
            title="Static Mapping Blindspot"
            icon={<MapPin className="h-4 w-4 text-crimson" />}
            problem="Existing maps are blind to temporary chaos: flash floods, road closures, crowd crush bottlenecks."
            solution="AeroRoute pulls live commuter pulses + verified hazard reports into a predictive flow model that re-paths fleets in seconds."
            tone="crimson"
          />
          <ProblemCard
            title="Cellular Congestion Collapse"
            icon={<WifiOff className="h-4 w-4 text-electric" />}
            problem="When 80k people connect at once, networks die. Apps that depend on bandwidth become useless precisely when needed most."
            solution="Offline-first pulses, BLE mesh relay, and 90-byte status packets keep AeroRoute alive when carrier networks don't."
            tone="electric"
          />
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <Stat icon={<Zap className="h-3.5 w-3.5" />} label="Median rerouting latency" value="1.2s" />
          <Stat icon={<TrendingUp className="h-3.5 w-3.5" />} label="Crowd surge prediction window" value="14 min" />
          <Stat icon={<Shield className="h-3.5 w-3.5" />} label="Hazard signal verification" value="≥3 pulses" />
        </div>
      </section>

      {/* roles */}
      <section id="roles" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[10px] uppercase tracking-[0.22em] text-emerald">Three Profiles · One Network</div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Every role gets the surface it needs.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Isolated interfaces. Shared intelligence. Built so a driver, a commuter, and a command center never see a feature that isn't theirs.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <RoleStep
            num="01"
            icon={<Activity className="h-4 w-4" />}
            title="Fleet Operators"
            body="Monitor real-time spatial heatmaps, track fleet distribution, and receive AI-generated predictive surge routing alerts before the surge happens."
            chips={["Heatmaps", "Predictive Surge", "Dispatch Log"]}
          />
          <RoleStep
            num="02"
            icon={<Smartphone className="h-4 w-4" />}
            title="Commuters"
            body="Drop a single-tap Pulse to request transit. Hold-to-record a Pidgin/English voice note to flag a hazard. Routes update around floods and bottlenecks."
            chips={["Pulse Drop", "Voice Triage", "Auto-Reroute"]}
          />
          <RoleStep
            num="03"
            icon={<Truck className="h-4 w-4" />}
            title="Transit Drivers"
            body="A distraction-free pilot dashboard with dynamic detour paths, audible hazard alerts, and a single 'Accept New Route' confirmation."
            chips={["Pilot Canvas", "Detour Alert", "Voice Cues"]}
          />
        </div>
      </section>

      {/* capabilities */}
      <section id="capabilities" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 md:p-12 overflow-hidden relative">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-emerald/10 blur-3xl" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-emerald">Live Demo</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">Step into the Orchestration Engine.</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Pick a profile and explore a fully reactive simulation — three isolated dashboards, shared dummy telemetry, zero setup.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Link // Changed 'to' to 'href'
                  href="/select-role"
                  className="inline-flex items-center gap-2 rounded-xl bg-electric px-5 py-3 text-sm font-medium text-white shadow-[0_0_40px_-10px_var(--electric)] hover:shadow-[0_0_60px_-6px_var(--electric)] transition"
                >
                  Launch Orchestration Engine <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { i: <Activity className="h-3.5 w-3.5" />, l: "Command Center" },
                { i: <Smartphone className="h-3.5 w-3.5" />, l: "Attendee" },
                { i: <Truck className="h-3.5 w-3.5" />, l: "Pilot" },
                { i: <Mic className="h-3.5 w-3.5" />, l: "Voice Pulse" },
                { i: <MapPin className="h-3.5 w-3.5" />, l: "Hazard Map" },
                { i: <Zap className="h-3.5 w-3.5" />, l: "Re-route" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-white/[0.02] border border-white/5 p-3 flex flex-col justify-between hover:border-white/10 transition"
                >
                  <div className="h-7 w-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">{c.i}</div>
                  <div className="text-[11px] text-muted-foreground">{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 mx-auto max-w-7xl px-6 py-10 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <Radio className="h-3.5 w-3.5 text-emerald" />
          <span className="font-heading font-medium">AeroRoute</span> · Orchestration OS
        </div>
        <div className="text-[10px] text-muted-foreground tracking-wider uppercase">© 2026 · Built for mega-gatherings</div>
      </footer>
    </div>
  );
}

function ProblemCard({
  title,
  icon,
  problem,
  solution,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  tone: "crimson" | "electric";
}) {
  const accent = tone === "crimson" ? "bg-crimson/10 border-crimson/20" : "bg-electric/10 border-electric/20";
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 hover:border-white/20 transition">
      <div className="flex items-center gap-2.5">
        <div className={`h-8 w-8 rounded-lg border flex items-center justify-center ${accent}`}>{icon}</div>
        <div className="text-base font-semibold tracking-tight">{title}</div>
      </div>
      <div className="mt-5 space-y-3 text-sm leading-relaxed">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-1">Problem</div>
          <p className="text-white/80">{problem}</p>
        </div>
        <div className="pt-3 border-t border-white/5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-emerald mb-1">AeroRoute</div>
          <p className="text-white/90">{solution}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold num tracking-tight">{value}</div>
    </div>
  );
}

function RoleStep({ num, icon, title, body, chips }: { num: string; icon: React.ReactNode; title: string; body: string; chips: string[] }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 hover:border-white/20 transition overflow-hidden">
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald/[0.06] blur-3xl opacity-0 group-hover:opacity-100 transition" />
      <div className="flex items-start justify-between">
        <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">{icon}</div>
        <span className="text-[10px] num text-muted-foreground tracking-widest">{num}</span>
      </div>
      <div className="mt-5 text-lg font-semibold tracking-tight">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span
            key={c}
            className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-muted-foreground"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
