"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Navigation, Minus, Plus, AlertTriangle, ArrowLeft, ArrowUp, Activity } from "lucide-react";
import { RoleSwitcher } from "@/components/aero/RoleSwitcher";
import { AeroLogo } from "@/components/aero/AeroLogo";
import { AeroLoader } from "@/components/aero/AeroLoader";

export default function DriverDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [speed, setSpeed] = useState(24);
  const [occupancy, setOccupancy] = useState(12);
  const maxOccupancy = 14;

  const [hazardActive, setHazardActive] = useState(false);
  const [routeState, setRouteState] = useState<"normal" | "detour">("normal");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    document.title = "Pilot Dashboard — AeroRoute";
  }, []);

  // speed wobble
  useEffect(() => {
    const id = setInterval(() => setSpeed(22 + Math.round(Math.random() * 5)), 2000);
    return () => clearInterval(id);
  }, []);

  const handleIncrement = () => {
    setOccupancy((prev) => Math.min(prev + 1, maxOccupancy));
  };

  const handleDecrement = () => {
    setOccupancy((prev) => Math.max(prev - 1, 0));
  };

  const acceptDetour = () => {
    setHazardActive(false);
    setRouteState("detour");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const isSaturated = occupancy === maxOccupancy;

  const milestoneInstruction = routeState === "normal" ? "TURN LEFT" : "PROCEED STRAIGHT";
  const milestoneDistance = routeState === "normal" ? "200m" : "450m";
  const milestoneSub = routeState === "normal" ? "At Estate Road 4 Junction" : "Via Alternate Corridor";
  const MilestoneIcon = routeState === "normal" ? ArrowLeft : ArrowUp;

  return (
<<<<<<< HEAD
    <>
      <AnimatePresence>{isLoading && <AeroLoader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <div className="fixed inset-0 bg-[#0A0A0A] text-white overflow-hidden flex flex-col font-sans select-none">
        <main className="flex-1 w-full h-full p-4 flex flex-col lg:flex-row gap-4">
          {/* THE ACTIVE ROUTE VECTOR CANVAS (Left 65%) */}
          <section className="relative w-full lg:w-[65%] h-[50vh] lg:h-full bg-[#121212] rounded-3xl border border-white/5 overflow-hidden flex flex-col justify-center items-center">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="route-glow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00D1FF" stopOpacity="1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <AnimatePresence mode="wait">
                {routeState === "normal" ? (
                  <motion.path
                    key="normal-route"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1 }}
                    d="M 10 90 L 90 10"
                    stroke="url(#route-glow)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#glow)"
                  />
                ) : (
                  <motion.path
                    key="detour-route"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    d="M 10 90 L 40 60 L 60 70 L 90 10"
                    stroke="url(#route-glow)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    filter="url(#glow)"
                  />
                )}
              </AnimatePresence>
            </svg>

            {/* Shuttle Location Marker */}
            <motion.div
              className="absolute z-10 flex items-center justify-center h-16 w-16 bg-[#0A0A0A] border-4 border-[#00D1FF] rounded-full shadow-[0_0_24px_#00D1FF]"
              animate={routeState === "normal" ? { left: "45%", top: "55%" } : { left: "55%", top: "65%" }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              style={{ x: "-50%", y: "-50%" }}
            >
              <Navigation className="h-8 w-8 text-[#00D1FF]" strokeWidth={3} style={{ transform: "rotate(45deg) translate(-2px, 2px)" }} />
            </motion.div>

            {/* Top Left Speed Indicator */}
            <div className="absolute top-6 left-6 bg-[#18181B]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="text-xs tracking-[0.2em] text-zinc-400 uppercase font-semibold mb-1">Current Speed</div>
              <div className="text-4xl sm:text-6xl font-bold tracking-tighter" style={{ fontFamily: "impact, sans-serif" }}>
                {speed} <span className="text-2xl sm:text-3xl text-zinc-500">km/h</span>
              </div>
=======
    <div className="relative lg:fixed lg:inset-0 flex flex-col bg-[#0A0A0A] text-foreground min-h-screen lg:min-h-0 overflow-y-auto lg:overflow-hidden">
      {/* top bar */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl shrink-0">
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
      <main className="relative flex-1 flex flex-col lg:grid lg:grid-cols-[340px_1fr] gap-3 p-3 sm:p-4 overflow-visible lg:overflow-hidden lg:min-h-0">
        {/* left metrics */}
        <aside className="flex lg:flex-col gap-3 min-h-0 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto scrollbar-thin shrink-0">
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<MapPin className="h-5 w-5 text-electric" />} label="Next Stop" value="Pavilion B" sub="0.8 km · 2 min" />
          </div>
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<Users className="h-5 w-5 text-emerald" />} label="Assigned Passengers" value="18" sub="of 22 capacity" />
          </div>
          <div className="shrink-0 w-[260px] lg:w-auto">
            <BigMetric icon={<Gauge className="h-5 w-5 text-white" />} label="Optimal Speed" value={`${speed}`} sub="km / h · safe corridor" big />
          </div>

          <div className="shrink-0 w-[260px] lg:w-auto rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Volume2 className="h-3.5 w-3.5" /> Audio Cues
>>>>>>> 49ac6eba1c7f3d836480ccfaff324773e110f325
            </div>

<<<<<<< HEAD
            {/* Top Right Master Action Button */}
            <div className="absolute top-6 right-6 z-40">
              <button
                onClick={() => {
                  if (routeState === "normal") setHazardActive(true);
                }}
                disabled={hazardActive || routeState === "detour"}
                className="bg-[#18181B]/80 hover:bg-[#27272A] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2 transition-colors min-h-[64px]"
=======
        {/* canvas */}
        <section className="relative rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden h-[360px] sm:h-[480px] lg:h-auto lg:min-h-0 shrink-0">
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
>>>>>>> 49ac6eba1c7f3d836480ccfaff324773e110f325
              >
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span className="font-semibold text-sm tracking-wide">Simulate Live Hazard</span>
              </button>
            </div>
          </section>

          {/* THE TELEMETRY CONTROL HUD (Right 35%) */}
          <aside className="w-full lg:w-[35%] h-[50vh] lg:h-full flex flex-col gap-4">
            {/* BRAND HEADER & ROLE SWITCHER */}
            <div className="shrink-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AeroLogo className="h-12 w-12" />
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-widest text-white leading-none uppercase">AeroRoute</span>
                  <span className="text-[10px] text-[#00D1FF] uppercase tracking-[0.2em] mt-1 font-semibold">Pilot Telemetry</span>
                </div>
              </div>
              <RoleSwitcher />
            </div>

            {/* CARD A: THE NEXT MILESTONE BLOCK */}
            <div className="flex-1 min-h-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 bg-white/5 p-4 rounded-3xl">
                  <MilestoneIcon className="h-16 w-16 text-[#00D1FF]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight uppercase" style={{ fontFamily: "impact, sans-serif" }}>
                    {milestoneInstruction}
                  </div>
                  <div
                    className="text-6xl sm:text-7xl font-black text-white mt-2 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] tracking-tighter"
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    {milestoneDistance}
                  </div>
                  <div className="text-lg text-zinc-400 mt-2 font-medium tracking-wide">{milestoneSub}</div>
                </div>
              </div>
            </div>

            {/* CARD B: DYNAMIC PASSENGER METRIC */}
            <div className="flex-1 min-h-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-center relative overflow-hidden transition-colors duration-500">
              {isSaturated && <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />}

              <div className="text-center w-full relative z-10">
                <div className={`text-xs tracking-[0.25em] uppercase font-bold mb-4 ${isSaturated ? "text-amber-500" : "text-zinc-400"}`}>
                  {isSaturated ? "FULLY SATURATED" : "PASSENGER OCCUPANCY"}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={handleDecrement}
                    className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all shadow-lg"
                  >
                    <Minus className="h-10 w-10" strokeWidth={3} />
                  </button>

                  <div
                    className={`text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter ${isSaturated ? "text-amber-500 drop-shadow-[0_0_16px_rgba(245,158,11,0.6)]" : "text-white"}`}
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    {occupancy} <span className="text-3xl sm:text-4xl lg:text-5xl text-zinc-600">/ {maxOccupancy}</span>
                  </div>

                  <button
                    onClick={handleIncrement}
                    className="flex-shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#10B981] text-white flex items-center justify-center hover:bg-[#059669] active:scale-95 transition-all shadow-lg"
                  >
                    <Plus className="h-10 w-10" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD C: NAVIGATION TARGET DESTINATION */}
            <div className="h-32 shrink-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:px-8 flex flex-col justify-center">
              <div className="text-xs tracking-[0.2em] text-zinc-400 uppercase font-semibold mb-2">ACTIVE ASSIGNED PULSE TARGET</div>
              <div className="flex items-center justify-between">
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-white truncate">Main Pavilion - Exit Gate B</div>
                <div className="flex items-center gap-3 shrink-0 ml-4 bg-white/5 rounded-full px-4 py-2">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#10B981]"></span>
                  </span>
                  <span className="text-sm font-semibold tracking-wider text-[#10B981]">SYNCED</span>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* CRIMSON DETOUR TAKEOVER BANNER */}
        <AnimatePresence>
          {hazardActive && (
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute top-0 left-0 right-0 z-50 bg-[#EF4444] shadow-2xl p-8 sm:p-12 flex flex-col justify-center"
              style={{ minHeight: "50vh" }}
            >
              <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <AlertTriangle className="h-16 w-16 text-white" strokeWidth={3} />
                  <h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase leading-none"
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    HAZARD EN ROUTE:
                    <br />
                    200m Flood Ahead at Estate Road 4
                  </h2>
                </div>

                <p className="text-2xl sm:text-3xl font-semibold text-white/90">Pre-Calculated Detour Ready. Immediate action required.</p>

                <button
                  onClick={acceptDetour}
                  className="mt-4 w-full sm:w-auto self-start bg-[#10B981] hover:bg-[#059669] text-white text-2xl sm:text-3xl font-bold uppercase tracking-wide rounded-2xl px-12 py-8 flex items-center justify-center shadow-[0_0_32px_rgba(16,185,129,0.6)] active:scale-95 transition-all min-h-[80px]"
                >
                  [ ACCEPT DETOUR ROUTE ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

<<<<<<< HEAD
        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#10B981] text-white px-8 py-4 rounded-full font-semibold tracking-wide text-lg shadow-2xl flex items-center gap-3"
            >
              <Activity className="h-6 w-6" />
              Route updated successfully via SignalR telemetry
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
=======
function BigMetric({ icon, label, value, sub, big }: { icon: React.ReactNode; label: string; value: string; sub: string; big?: boolean }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-3 sm:p-5 min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">{label}</div>
        <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">{icon}</div>
      </div>
      <div className={`mt-2 sm:mt-3 num font-semibold text-white tracking-tight ${big ? "text-2xl sm:text-4xl lg:text-6xl" : "text-xl sm:text-3xl lg:text-4xl"}`}>{value}</div>
      <div className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs text-muted-foreground truncate">{sub}</div>
    </div>
>>>>>>> 49ac6eba1c7f3d836480ccfaff324773e110f325
  );
}
