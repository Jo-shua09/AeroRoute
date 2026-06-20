"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { dummyClusters, dummyFleets, dummyHazards, type Hazard } from "@/lib/dummy-data";
import { AlertTriangle, Navigation } from "lucide-react";
import { useAero } from "@/lib/store";
import { usePathname } from "next/navigation";

export type LayerToggles = {
  heatmap: boolean;
  hazards: boolean;
  fleets: boolean;
};

export function MapCanvas({ layers, hazardActive }: { layers: LayerToggles; hazardActive?: boolean }) {
  const hazardIsActive = !!hazardActive;

  const [hoverHazard, setHoverHazard] = useState<Hazard | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const pulses = useAero((s) => s.pulses);
  const pathname = usePathname();

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {/* base grid */}
      <div className="absolute inset-0 grid-bg" />
      {/* radial fade */}
      <div className="absolute inset-0 radial-fade" />

      {/* concentric radar rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.04]"
            style={{
              width: `${i * 220}px`,
              height: `${i * 220}px`,
              left: `${-(i * 110)}px`,
              top: `${-(i * 110)}px`,
            }}
          />
        ))}
        <div className="absolute rounded-full radar-sweep pointer-events-none" style={{ width: 880, height: 880, left: -440, top: -440 }} />
      </div>

      {/* route + hazard overlay rendered via absolute SVG */}

      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="route-glow-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="route-glow-crimson" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF0055" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FF0055" stopOpacity="1" />
          </linearGradient>
          <filter id="cyan-glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="crimson-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* optimal cyan route */}

        <AnimatePresence>
          {!hazardIsActive && pathname === "/driver" && (
            <motion.path
              key="route-cyan"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              d="M 10 90 L 90 10"
              stroke="url(#route-glow-cyan)"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              filter="url(#cyan-glow)"
            />
          )}
        </AnimatePresence>

        {/* hazard detour cyan route (graceful detour around hazard polygon) */}
        <AnimatePresence>
          {hazardIsActive && (
            <motion.path
              key="route-detour"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              d="M 10 90 L 42 62 L 60 70 L 90 10"
              stroke="url(#route-glow-cyan)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#cyan-glow)"
            />
          )}
        </AnimatePresence>

        {/* animated crimson hazard polygon shape */}
        <AnimatePresence>
          {hazardIsActive && (
            <motion.polygon
              key="hazard-poly"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 0.95, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              points="32,60 46,54 62,60 56,76 38,76"
              fill="rgba(255,0,85,0.18)"
              stroke="rgba(255,0,85,0.85)"
              strokeWidth="0.9"
              filter="url(#crimson-glow)"
            />
          )}
        </AnimatePresence>
      </svg>

      {/* mock geographic shapes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M 0 30 Q 20 28 35 38 T 70 42 T 100 35" stroke="rgba(255,255,255,0.08)" strokeWidth="0.15" fill="none" />
        <path d="M 0 65 Q 25 60 50 68 T 100 72" stroke="rgba(255,255,255,0.08)" strokeWidth="0.15" fill="none" />
        <path d="M 30 0 Q 32 25 40 50 T 48 100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" fill="none" />
        <path d="M 70 0 Q 65 30 72 60 T 68 100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.12" fill="none" />
      </svg>

      {/* HEATMAP / demand clusters */}
      <AnimatePresence>
        {layers.heatmap &&
          dummyClusters.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.5 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <div
                className="rounded-full blur-2xl"
                style={{
                  width: 120 + c.intensity,
                  height: 120 + c.intensity,
                  background: `radial-gradient(circle, rgba(16,185,129,${c.intensity / 180}) 0%, transparent 70%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[10px] uppercase tracking-[0.15em] text-emerald/80 font-medium whitespace-nowrap">
                  {c.name} · {c.pulses}
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* HAZARDS */}
      <AnimatePresence>
        {layers.hazards &&
          dummyHazards.map((h) => (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onMouseEnter={() => setHoverHazard(h)}
              onMouseLeave={() => setHoverHazard(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              <span className="relative inline-flex h-3 w-3 text-crimson radar-pulse">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-crimson shadow-[0_0_12px_var(--crimson)]" />
              </span>
              <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center">
                <AlertTriangle className="h-2.5 w-2.5 text-crimson" />
              </div>
            </motion.button>
          ))}
      </AnimatePresence>

      {/* FLEETS */}
      <AnimatePresence>
        {layers.fleets &&
          dummyFleets.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: [0, 8, -4, 0],
                y: [0, -6, 4, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.4 },
                x: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${f.x}%`, top: `${f.y}%` }}
            >
              <div className="relative" style={{ transform: `rotate(${f.heading}deg)` }}>
                <Navigation className="h-3.5 w-3.5 text-electric fill-electric drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[9px] text-electric/80 font-medium whitespace-nowrap tracking-wider">
                {f.unit}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* USER PULSES (live, from Zustand) */}
      <AnimatePresence>
        {pulses.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <span className="relative inline-flex h-2.5 w-2.5 text-emerald radar-pulse">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_14px_var(--emerald)]" />
            </span>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] text-emerald/80 whitespace-nowrap tracking-wider uppercase">
              Pulse
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* hazard tooltip */}
      <AnimatePresence>
        {hoverHazard && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute z-20 pointer-events-none glass-strong rounded-lg p-3 min-w-[220px] shadow-2xl"
            style={{ left: mousePos.x + 16, top: mousePos.y + 16 }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-crimson font-medium">{hoverHazard.severity} Severity</span>
            </div>
            <div className="text-sm font-medium text-white">{hoverHazard.type}</div>
            <div className="text-xs text-muted-foreground mt-1">{hoverHazard.note}</div>
            <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-muted-foreground flex justify-between">
              <span>Verified by {hoverHazard.verifiedBy} users</span>
              <span className="text-emerald">LIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* corner coordinates */}
      <div className="absolute top-14 sm:top-1 right-4 text-[10px] text-muted-foreground/60 font-mono tracking-wider">06.5244° N · 03.3792° E</div>
      <div className="absolute bottom-20 sm:bottom-24 left-4 text-[10px] text-muted-foreground/60 font-mono tracking-wider space-y-0.5">
        <div>ZONE: ALPHA-7</div>
        <div>SCALE: 1 : 2,400</div>
      </div>
    </div>
  );
}
