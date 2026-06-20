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
    <>
      <AnimatePresence>{isLoading && <AeroLoader onComplete={() => setIsLoading(false)} />}</AnimatePresence>
      <div className="min-h-screen lg:h-screen lg:fixed lg:inset-0 bg-[#0A0A0A] text-white overflow-y-auto lg:overflow-hidden flex flex-col font-sans select-none">
        <main className="flex-1 w-full flex flex-col lg:flex-row gap-2.5 sm:gap-3 p-2.5 sm:p-3 min-h-0">
          {/* THE ACTIVE ROUTE VECTOR CANVAS (Left 65%) */}
          <section className="relative w-full lg:w-[65%] h-[40vh] sm:h-[45vh] lg:h-full bg-[#121212] rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-center items-center shrink-0 lg:shrink">
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
              className="absolute z-10 flex items-center justify-center h-10 w-10 sm:h-14 sm:w-14 bg-[#0A0A0A] border-[3px] sm:border-4 border-[#00D1FF] rounded-full shadow-[0_0_16px_#00D1FF]"
              animate={routeState === "normal" ? { left: "45%", top: "55%" } : { left: "55%", top: "65%" }}
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
              style={{ x: "-50%", y: "-50%" }}
            >
              <Navigation className="h-5 w-5 sm:h-7 sm:w-7 text-[#00D1FF]" strokeWidth={3} style={{ transform: "rotate(45deg) translate(-2px, 2px)" }} />
            </motion.div>

            {/* Top Left Speed Indicator */}
            <div className="absolute top-2.5 left-2.5 sm:top-5 sm:left-5 bg-[#18181B]/80 backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 shadow-2xl">
              <div className="text-[9px] sm:text-[10px] tracking-[0.15em] text-zinc-400 uppercase font-semibold mb-0.5">Current Speed</div>
              <div className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-tighter font-sans" style={{ fontFamily: "impact, sans-serif" }}>
                {speed} <span className="text-[10px] sm:text-xs lg:text-lg text-zinc-500 font-normal">km/h</span>
              </div>
            </div>

            {/* Top Right Master Action Button */}
            <div className="absolute top-2.5 right-2.5 sm:top-5 sm:right-5 z-40">
              <button
                onClick={() => {
                  if (routeState === "normal") setHazardActive(true);
                }}
                disabled={hazardActive || routeState === "detour"}
                className="bg-[#18181B]/80 hover:bg-[#27272A] disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl border border-white/10 rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1 sm:gap-1.5 transition-colors text-[10px] sm:text-xs font-semibold shadow-2xl"
              >
                <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 shrink-0" />
                <span className="tracking-wide">Simulate Live Hazard</span>
              </button>
            </div>
          </section>

          {/* THE TELEMETRY CONTROL HUD (Right 35%) */}
          <aside className="w-full lg:w-[35%] flex flex-col gap-2.5 sm:gap-3 lg:h-full min-h-0 pb-4 lg:pb-0">
            {/* BRAND HEADER & ROLE SWITCHER */}
            <div className="shrink-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-2 px-3 sm:p-3 sm:px-4 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <AeroLogo className="h-6 w-6 sm:h-8 sm:w-8 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-black tracking-widest text-white leading-none uppercase">AeroRoute</span>
                  <span className="text-[8px] sm:text-[9px] text-[#00D1FF] uppercase tracking-[0.2em] mt-0.5 font-semibold">Pilot Telemetry</span>
                </div>
              </div>
              <RoleSwitcher />
            </div>

            {/* CARD A: THE NEXT MILESTONE BLOCK */}
            <div className="flex-1 min-h-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col justify-center">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 bg-white/5 p-2 sm:p-3 rounded-xl sm:rounded-2xl">
                  <MilestoneIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-[#00D1FF]" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="text-lg sm:text-xl lg:text-3xl font-extrabold tracking-tight uppercase truncate" style={{ fontFamily: "impact, sans-serif" }}>
                    {milestoneInstruction}
                  </div>
                  <div
                    className="text-2xl sm:text-3xl lg:text-5xl font-black text-white mt-0.5 sm:mt-1 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] tracking-tighter"
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    {milestoneDistance}
                  </div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-zinc-400 mt-0.5 sm:mt-1 font-medium tracking-wide truncate">{milestoneSub}</div>
                </div>
              </div>
            </div>

            {/* CARD B: DYNAMIC PASSENGER METRIC */}
            <div className="flex-1 min-h-0 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col justify-center relative overflow-hidden transition-colors duration-500">
              {isSaturated && <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />}

              <div className="text-center w-full relative z-10">
                <div className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold mb-2 sm:mb-3 ${isSaturated ? "text-amber-500" : "text-zinc-400"}`}>
                  {isSaturated ? "FULLY SATURATED" : "PASSENGER OCCUPANCY"}
                </div>

                <div className="flex items-center justify-between gap-2 sm:gap-4 max-w-md mx-auto">
                  <button
                    onClick={handleDecrement}
                    className="flex-shrink-0 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-[#EF4444] text-white flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all shadow-lg"
                    aria-label="Decrease Occupancy"
                  >
                    <Minus className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={3} />
                  </button>

                  <div
                    className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter ${isSaturated ? "text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]" : "text-white"}`}
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    {occupancy} <span className="text-lg sm:text-xl lg:text-2xl text-zinc-600">/ {maxOccupancy}</span>
                  </div>

                  <button
                    onClick={handleIncrement}
                    className="flex-shrink-0 h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-[#10B981] text-white flex items-center justify-center hover:bg-[#059669] active:scale-95 transition-all shadow-lg"
                    aria-label="Increase Occupancy"
                  >
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>

            {/* CARD C: NAVIGATION TARGET DESTINATION */}
            <div className="h-auto py-3.5 sm:py-4 bg-[#18181B]/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:px-4 lg:px-5 flex flex-col justify-center">
              <div className="text-[8px] sm:text-[9px] tracking-[0.15em] text-zinc-400 uppercase font-semibold mb-1">ACTIVE ASSIGNED PULSE TARGET</div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
                <div className="text-xs sm:text-sm lg:text-base font-bold tracking-tight text-white truncate">Main Pavilion - Exit Gate B</div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-white/5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#10B981]">SYNCED</span>
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
              className="absolute top-0 left-0 right-0 z-50 bg-[#EF4444] shadow-2xl p-5 sm:p-10 flex flex-col justify-center"
              style={{ minHeight: "40vh" }}
            >
              <div className="max-w-5xl mx-auto w-full flex flex-col gap-3 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-5">
                  <AlertTriangle className="h-8 w-8 sm:h-12 sm:w-12 text-white shrink-0" strokeWidth={3} />
                  <h2
                    className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-none"
                    style={{ fontFamily: "impact, sans-serif" }}
                  >
                    HAZARD EN ROUTE:
                    <br />
                    200m Flood Ahead at Estate Road 4
                  </h2>
                </div>

                <p className="text-xs sm:text-base lg:text-lg font-semibold text-white/90">Pre-Calculated Detour Ready. Immediate action required.</p>

                <button
                  onClick={acceptDetour}
                  className="mt-1 sm:mt-3 w-full sm:w-auto self-start bg-[#10B981] hover:bg-[#059669] text-sm sm:text-lg lg:text-xl font-bold uppercase tracking-wide rounded-lg sm:rounded-xl px-5 py-3 sm:px-8 sm:py-4 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.5)] active:scale-95 transition-all min-h-0"
                >
                  [ ACCEPT DETOUR ROUTE ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#10B981] text-white px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full font-semibold tracking-wide text-xs sm:text-sm shadow-2xl flex items-center gap-1.5 sm:gap-2 text-center whitespace-nowrap"
            >
              <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Route updated successfully via SignalR telemetry
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
