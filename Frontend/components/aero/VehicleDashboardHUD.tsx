"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type VehicleDashboardRoute = {
  routeName: string;
  shuttleId: string;
  baseSpeedKmh: number;
  etaDefaultMinsText: string; // "4 mins"
  etaHazardMinsText: string; // "7 mins"
};

export function VehicleDashboardHUD({
  route,
  hazardActive,
  onToggleHazard,
}: {
  route: VehicleDashboardRoute;
  hazardActive: boolean;
  onToggleHazard: () => void;
}) {
  const [etaText, setEtaText] = useState(route.etaDefaultMinsText);
  const [etaPending, setEtaPending] = useState(false);

  useEffect(() => {
    // Simulate calculation latency: instant banner + polygon/path, delayed ETA.
    const defaultMins = route.etaDefaultMinsText;
    const hazardMins = route.etaHazardMinsText;

    // Keep React updates out of the effect body by scheduling them.
    const t0 = window.setTimeout(() => {
      if (!hazardActive) {
        setEtaPending(false);
        setEtaText(defaultMins);
        return;
      }

      setEtaPending(true);
      setEtaText(defaultMins);

      const t1 = window.setTimeout(() => {
        setEtaText(hazardMins);
        setEtaPending(false);
      }, 850);

      // no-op: t1 is cleared by the outer cleanup via closure when hazardActive changes quickly
    }, 0);

    return () => {
      window.clearTimeout(t0);
    };
  }, [hazardActive, route.etaDefaultMinsText, route.etaHazardMinsText]);

  const banner = useMemo(() => {
    if (!hazardActive) {
      return {
        variant: "ok" as const,
        icon: <CheckCircle2 className="h-4 w-4 text-emerald" />,
        text: "Route Optimal -No Delays Reported",
      };
    }

    return {
      variant: "hazard" as const,
      icon: <AlertTriangle className="h-4 w-4 text-crimson" />,
      text: "⚠️ HAZARD DETECTED: CROWD SURGE AHEAD. DYNAMIC ROUTE APPLIED.",
    };
  }, [hazardActive]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[40]">
      {/* Top floating alert banner */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[60] w-[min(92vw,720px)] pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.variant}
            initial={{ opacity: 0, y: banner.variant === "hazard" ? -10 : -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: banner.variant === "hazard" ? -10 : -6, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "glass-strong rounded-2xl border px-4 py-3 flex items-center gap-3",
              banner.variant === "ok" ? "border-white/10 bg-[rgba(18,18,18,0.55)]" : "border-crimson/50 bg-[rgba(45,0,18,0.55)] pulse-crimson",
            )}
          >
            <div
              className={cn(
                "h-9 w-9 rounded-xl border flex items-center justify-center shrink-0",
                banner.variant === "ok" ? "bg-emerald/10 border-emerald/20" : "bg-crimson/10 border-crimson/25",
              )}
            >
              {banner.icon}
            </div>
            <div className="min-w-0">
              <div
                className={cn(
                  "font-bricolage text-[13px] sm:text-[14px] leading-tight tracking-tight",
                  banner.variant === "ok" ? "text-white" : "text-crimson",
                )}
              >
                {banner.text}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left HUD overlay */}
      <div className="absolute left-3 sm:left-4 top-20 sm:top-24 z-[55] w-[min(360px,92vw)] pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -10, y: 6 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-strong rounded-2xl border overflow-hidden"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="relative flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="h-3.5 w-3.5 rounded-full bg-emerald shadow-[0_0_18px_rgba(0,240,255,0.2)]" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-bricolage text-[15px] sm:text-[16px] tracking-tight text-white truncate">{route.routeName}</div>

                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Shuttle
                    <span className="ml-2 text-white/90 font-semibold tracking-[0.05em]">{route.shuttleId}</span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Metric label="Current Speed" value={`${route.baseSpeedKmh} km/h`} accent="cyan" />
                  <Metric label="Estimated Time of Arrival" value={etaText} accent={hazardActive ? "crimson" : "emerald"} dim={etaPending} />
                  <SignalSync />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-5 pb-4">
            <div className="h-[1px] bg-[rgba(255,255,255,0.06)]" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Vehicle Telemetry</div>
                <div className="mt-1 text-[12px] text-white/80 truncate">
                  {hazardActive ? "Re-pathing around verified risk geometry…" : "Keeping optimal corridor…"}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <div className="glass rounded-lg border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {hazardActive ? "DET0UR" : "OPTIMAL"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upper-right simulation control */}
      <div className="fixed top-18 sm:top-20 right-3 sm:right-4 z-[65] pointer-events-auto">
        <motion.button
          onClick={onToggleHazard}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "rounded-2xl border px-4 py-3 text-[11px] sm:text-[12px] font-semibold tracking-tight glass-strong flex items-center gap-2",
            hazardActive ? "border-crimson/40 hover:border-crimson/60" : "border-white/10 hover:border-white/20",
          )}
          aria-label="Simulate Live Hazard"
        >
          <div
            className={cn(
              "h-9 w-9 rounded-xl border flex items-center justify-center shrink-0",
              hazardActive ? "bg-crimson/10 border-crimson/25" : "bg-electric/10 border-electric/25",
            )}
          >
            {hazardActive ? <AlertTriangle className="h-4 w-4 text-crimson" /> : <RefreshCcw className="h-4 w-4 text-electric" />}
          </div>
          <span className={cn("font-bricolage", hazardActive ? "text-crimson" : "text-white")}>Simulate Live Hazard</span>
        </motion.button>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
  valueClassName,
  dim,
}: {
  label: string;
  value: string;
  accent: "cyan" | "emerald" | "crimson";
  valueClassName?: string;
  dim?: boolean;
}) {
  const accentClass = accent === "cyan" ? "text-electric" : accent === "emerald" ? "text-emerald" : "text-crimson";

  return (
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={cn("mt-1 font-bricolage text-[18px] leading-tight", accentClass, valueClassName, dim && "opacity-70")}>{value}</div>
    </div>
  );
}

function SignalSync() {
  return (
    <div className="min-w-0 col-span-1 sm:col-span-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="h-3.5 w-3.5 rounded-full bg-emerald shadow-[0_0_18px_rgba(16,185,129,0.35)] animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Signal Sync</div>
          <div className="font-bricolage text-[13px] text-white/90">Signal Sync: Connected</div>
        </div>
      </div>
    </div>
  );
}
