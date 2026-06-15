"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MapPin, Users, Gauge, AlertTriangle, Check, Volume2, Radio, ArrowLeft, ArrowRight } from "lucide-react";
import { RoleSwitcher } from "@/components/aero/RoleSwitcher";

export default function DriverDashboard() {
  const [detour, setDetour] = useState<null | "pending" | "accepted">(null);
  const [speed, setSpeed] = useState(30);

  // periodic detour alert simulation
  useEffect(() => {
    const id = setInterval(() => {
      setDetour((prev) => (prev === null ? "pending" : prev));
    }, 8000);
    // trigger first alert quickly
    const first = setTimeout(() => setDetour("pending"), 2200);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);

  // Update document title
  useEffect(() => {
    document.title = "Pilot Dashboard — AeroRoute";
  }, []);

  // wobble speed for realism
  useEffect(() => {
    const id = setInterval(() => setSpeed(28 + Math.round(Math.random() * 6)), 1500);
    return () => clearInterval(id);
  }, []);

  const accept = () => {
    setDetour("accepted");
    setTimeout(() => setDetour(null), 3000);
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0A0A0A] text-foreground overflow-hidden">
      {/* top bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald/30 to-electric/20 border border-white/10 flex items-center justify-center">
            <Radio className="h-4 w-4 text-emerald" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight">AR-12 · Pilot</span>
            <span className="text-[9px] text-muted-foreground tracking-[0.18em] uppercase mt-0.5">In-vehicle telemetry</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 glass-strong rounded-xl h-11 px-3.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">On Route</span>
          </div>
          <RoleSwitcher />
        </div>
      </header>

      {/* main grid */}
      <main className="relative flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-3 p-3 sm:p-4 overflow-hidden">
        {/* left metrics */}
        <aside className="flex lg:flex-col gap-3 min-h-0 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto scrollbar-thin">
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<MapPin className="h-5 w-5 text-electric" />} label="Next Stop" value="Pavilion B" sub="0.8 km · 2 min" />
          </div>
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<Users className="h-5 w-5 text-emerald" />} label="Assigned Passengers" value="18" sub="of 22 capacity" />
          </div>
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<Gauge className="h-5 w-5 text-white" />} label="Optimal Speed" value={`${speed}`} sub="km / h · safe corridor" big />
          </div>

          <div className="shrink-0 w-[260px] lg:w-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Volume2 className="h-3.5 w-3.5" /> Audio Cues
            </div>
            <div className="mt-2.5 text-xs text-white/80 leading-relaxed">"Approaching Pavilion B in 2 minutes. Boarding queue cleared."</div>
          </div>
        </aside>

        {/* canvas */}
        <section className="relative rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden min-h-[220px] lg:min-h-0">
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="absolute inset-0 radial-fade" />

          {/* route line svg */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="route" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(59,130,246,0.2)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.9)" />
              </linearGradient>
            </defs>
            <path d="M 12 82 Q 30 70 38 58 T 58 38 T 86 18" stroke="url(#route)" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M 12 82 Q 30 70 38 58 T 58 38 T 86 18" stroke="rgba(59,130,246,0.9)" strokeWidth="0.3" strokeDasharray="1 1.5" fill="none" />
          </svg>

          {/* start marker */}
          <div className="absolute" style={{ left: "12%", top: "82%" }}>
            <div className="h-2.5 w-2.5 rounded-full bg-white border border-white shadow-[0_0_8px_white]" />
            <div className="mt-1 text-[9px] text-muted-foreground tracking-wider">START</div>
          </div>
          {/* current vehicle */}
          <motion.div
            initial={{ left: "12%", top: "82%" }}
            animate={{ left: "44%", top: "52%" }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-electric/40 blur-md" />
              <div className="relative h-4 w-4 rounded-full bg-electric shadow-[0_0_16px_var(--electric)] border-2 border-white/80" />
            </div>
            <div className="mt-1 text-[10px] text-electric font-medium tracking-wider">AR-12</div>
          </motion.div>
          {/* destination */}
          <div className="absolute" style={{ left: "86%", top: "18%" }}>
            <div className="h-3 w-3 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]" />
            <div className="mt-1 text-[9px] text-emerald tracking-wider">PAVILION B</div>
          </div>

          {/* hazard ahead */}
          <div className="absolute" style={{ left: "60%", top: "36%" }}>
            <span className="relative inline-flex h-3 w-3 text-crimson radar-pulse">
              <span className="relative inline-flex h-3 w-3 rounded-full bg-crimson shadow-[0_0_12px_var(--crimson)]" />
            </span>
          </div>

          {/* corner HUD */}
          <div className="absolute top-3 left-3 glass-strong rounded-lg px-3 py-1.5 text-[10px] tracking-wider text-muted-foreground">
            ROUTE · R-08 · ALPHA-7
          </div>
          <div className="absolute top-3 right-3 glass-strong rounded-lg px-3 py-1.5 text-[10px] text-muted-foreground flex items-center gap-2">
            <span className="text-emerald">●</span> SIGNAL STRONG
          </div>
          <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Destination</div>
              <div className="text-sm text-white mt-0.5">Pavilion B · Gate 3</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">ETA</div>
              <div className="text-sm text-white num mt-0.5">2 min</div>
            </div>
          </div>

          {/* DETOUR ALERT */}
          <AnimatePresence>
            {detour === "pending" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 z-20 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0.6)", "0 0 0 16px rgba(239,68,68,0)"] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="w-full max-w-md rounded-2xl bg-[#140707] border border-crimson/40 p-6"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-10 w-10 rounded-xl bg-crimson/20 border border-crimson/40 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-crimson" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-crimson">Dynamic Detour</div>
                      <div className="text-base font-semibold text-white mt-0.5">Rerouting Required</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/85 leading-relaxed">
                    200m flood ahead. Turn <span className="text-white font-medium">left in 50m</span> to bypass bottleneck at Estate Junction.
                  </p>
                  <div className="mt-4 rounded-lg bg-white/[0.03] border border-white/5 p-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">New ETA</span>
                    <span className="text-white num">
                      3 min <span className="text-muted-foreground">(+1m)</span>
                    </span>
                  </div>
                  <button
                    onClick={accept}
                    className="mt-5 w-full rounded-xl bg-crimson text-white font-semibold py-3 sm:py-4 text-sm sm:text-base flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition"
                  >
                    Accept New Route <ArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setDetour(null)}
                    className="mt-2 w-full text-xs text-muted-foreground py-2 hover:text-white transition flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="h-3 w-3" /> Dismiss
                  </button>
                </motion.div>
              </motion.div>
            )}
            {detour === "accepted" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-16 left-1/2 -translate-x-1/2 z-20 rounded-xl bg-emerald/15 border border-emerald/30 px-4 py-2.5 flex items-center gap-2"
              >
                <Check className="h-4 w-4 text-emerald" />
                <span className="text-sm text-white">New route engaged</span>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

function BigMetric({ icon, label, value, sub, big }: { icon: React.ReactNode; label: string; value: string; sub: string; big?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
        <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">{icon}</div>
      </div>
      <div className={`mt-3 num font-semibold text-white tracking-tight ${big ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"}`}>{value}</div>
      <div className="mt-1.5 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
