"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export type VehicleDashboardRoute = {
  routeName: string;
  shuttleId: string;
  baseSpeedKmh: number;
  etaDefaultMinsText: string;
  etaHazardMinsText: string;
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
  const [hudOpen, setHudOpen] = useState(false);

  useEffect(() => {
    const defaultMins = route.etaDefaultMinsText;
    const hazardMins = route.etaHazardMinsText;

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

      return () => window.clearTimeout(t1);
    }, 0);

    return () => window.clearTimeout(t0);
  }, [hazardActive, route]);

  const banner = useMemo(() => {
    if (!hazardActive) {
      return {
        variant: "ok" as const,
        icon: <CheckCircle2 className="h-4 w-4 text-emerald" />,
        text: "Route Optimal - No Delays Reported",
      };
    }

    return {
      variant: "hazard" as const,
      icon: <AlertTriangle className="h-4 w-4 text-crimson" />,
      text: "⚠️ HAZARD DETECTED: CROWD SURGE AHEAD. DYNAMIC ROUTE APPLIED.",
    };
  }, [hazardActive]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[40] overflow-x-hidden">
      {/* Banner */}
      <div
        className="
          fixed
          top-[max(12px,env(safe-area-inset-top))]
          left-1/2
          -translate-x-1/2
          z-[60]
          w-[95vw]
          max-w-[720px]
          pointer-events-auto
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.variant}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "glass-strong rounded-2xl border px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3",
              banner.variant === "ok" ? "border-white/10 bg-[rgba(18,18,18,0.55)]" : "border-crimson/50 bg-[rgba(45,0,18,0.55)]",
            )}
          >
            <div
              className={cn(
                "h-8 w-8 sm:h-9 sm:w-9 rounded-xl border flex items-center justify-center shrink-0",
                banner.variant === "ok" ? "bg-emerald/10 border-emerald/20" : "bg-crimson/10 border-crimson/25",
              )}
            >
              {banner.icon}
            </div>

            <div className="text-[12px] sm:text-[14px] leading-tight text-white font-bricolage break-words">{banner.text}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LEFT HUD */}
      <div
        className="
    absolute
    top-20
    left-2
    right-2
    sm:left-4
    sm:right-auto
    sm:top-24
    z-[55]
    w-auto
    sm:w-[360px]
    max-w-[360px]
    pointer-events-auto
  "
      >
        <motion.div layout className="glass-strong rounded-2xl border overflow-hidden">
          {/* HEADER (CLICK TO TOGGLE) */}
          <button
            onClick={() => setHudOpen((v) => !v)}
            className="
        w-full
        flex
        items-center
        justify-between
        px-4
        py-3
        sm:px-5
        cursor-pointer
        bg-white/[0.02]
        hover:bg-white/[0.04]
        transition
      "
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-3 w-3 rounded-full bg-emerald animate-pulse" />
              <div className="text-left min-w-0">
                <div className="font-bricolage text-[13px] sm:text-[15px] text-white truncate">{route.routeName}</div>
                <div className="text-[10px] text-white/60 uppercase tracking-widest">Tap to {hudOpen ? "collapse" : "expand"}</div>
              </div>
            </div>

            <div className="text-white/60 text-xs">{hudOpen ? "−" : "+"}</div>
          </button>

          {/* COLLAPSIBLE CONTENT */}
          <AnimatePresence initial={false}>
            {hudOpen && (
              <motion.div
                key="hud-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="p-4 sm:p-5 pt-3">
                  <div className="text-[11px] uppercase tracking-widest text-white/70">
                    Shuttle <span className="text-white font-semibold">{route.shuttleId}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Metric label="Speed" value={`${route.baseSpeedKmh} km/h`} accent="cyan" />
                    <Metric label="ETA" value={etaText} accent={hazardActive ? "crimson" : "emerald"} dim={etaPending} />
                    <SignalSync />
                  </div>

                  <div className="mt-4 text-[12px] text-white/70 break-words">
                    {hazardActive ? "Re-routing due to detected hazard zones..." : "Following optimal route path..."}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* RIGHT BUTTON */}
      <div
        className="
          fixed
          top-24
          right-2
          sm:top-20
          sm:right-4
          z-[65]
          pointer-events-auto
        "
      >
        <motion.button
          onClick={onToggleHazard}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "rounded-2xl border px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 glass-strong",
            hazardActive ? "border-crimson/40" : "border-white/10",
          )}
        >
          <div
            className={cn(
              "h-8 w-8 sm:h-9 sm:w-9 rounded-xl border flex items-center justify-center",
              hazardActive ? "bg-crimson/10 border-crimson/25" : "bg-electric/10 border-electric/25",
            )}
          >
            {hazardActive ? <AlertTriangle className="h-4 w-4 text-crimson" /> : <RefreshCcw className="h-4 w-4 text-electric" />}
          </div>

          <span className="font-bricolage text-[11px] sm:text-[12px] text-white hidden sm:inline">Simulate Hazard</span>
        </motion.button>
      </div>
    </div>
  );
}

/* -------------------- helpers -------------------- */

type MetricProps = {
  label: string;
  value: string;
  accent: "cyan" | "emerald" | "crimson";
  dim?: boolean;
};

function Metric({ label, value, accent, dim }: MetricProps) {
  return (
    <div>
      <div className="text-[10px] text-white/50 uppercase">{label}</div>
      <div
        className={cn(
          "text-[16px] sm:text-[18px] font-bricolage",
          accent === "cyan" ? "text-electric" : accent === "emerald" ? "text-emerald" : "text-crimson",
          dim && "opacity-60",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function SignalSync() {
  return (
    <div className="col-span-1 sm:col-span-2 flex items-center gap-2 mt-2">
      <div className="h-2.5 w-2.5 rounded-full bg-emerald animate-pulse" />
      <div className="text-[11px] text-white/70">Signal Connected</div>
    </div>
  );
}
