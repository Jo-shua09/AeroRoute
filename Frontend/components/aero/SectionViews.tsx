"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dummyFleets } from "@/lib/dummy-data";
import { Truck, Settings as SettingsIcon, CalendarClock, Shield, Bell, Globe, AlertTriangle } from "lucide-react";
import { useAero } from "@/lib/store";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}


const statusColor = (s: string) =>
  s === "en-route"
    ? "text-electric bg-electric/10 border-electric/20"
    : s === "boarding"
      ? "text-emerald bg-emerald/10 border-emerald/20"
      : s === "rerouting"
        ? "text-crimson bg-crimson/10 border-crimson/20"
        : "text-muted-foreground bg-white/5 border-white/10";

export function FleetView() {
  return (
    <Panel title="Fleet Dispatch" icon={<Truck className="h-4 w-4" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {dummyFleets.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl bg-[#141414] border border-white/5 p-4 hover:border-white/10 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <Truck className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-tight">{f.unit}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Unit</div>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded border tracking-wider uppercase ${statusColor(f.status)}`}>{f.status}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>Occupancy</span>
                <span className="num text-white">
                  {f.occupied} / {f.capacity}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-electric to-emerald" style={{ width: `${(f.occupied / f.capacity) * 100}%` }} />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <div className="text-muted-foreground">Heading</div>
                <div className="text-white num mt-0.5">{f.heading}°</div>
              </div>
              <div>
                <div className="text-muted-foreground">Position</div>
                <div className="text-white num mt-0.5">
                  {f.x}, {f.y}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

export function TimelineView() {
  const schedule = useAero((s) => s.schedule);
  const setTimelineOpen = useAero((s) => s.setTimelineOpen);
  return (
    <Panel
      title="Event Timeline"
      icon={<CalendarClock className="h-4 w-4" />}
      action={
        <button
          onClick={() => setTimelineOpen(true)}
          className="text-[11px] px-3 py-1.5 rounded-md bg-emerald/10 border border-emerald/25 text-emerald hover:bg-emerald/15 transition"
        >
          Manage Timeline
        </button>
      }
    >
      <div className="rounded-xl bg-card border border-[var(--hairline)] overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <div className="min-w-[500px]">
            <div className="grid grid-cols-12 text-[10px] uppercase tracking-[0.15em] text-muted-foreground px-4 py-3 border-b border-[var(--hairline)]">
              <div className="col-span-2">Time</div>
              <div className="col-span-5">Phase</div>
              <div className="col-span-3">Zone</div>
              <div className="col-span-2 text-right">Volume</div>
            </div>
            {schedule.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 items-center px-4 py-3.5 border-b border-[var(--hairline)] last:border-0 hover:bg-white/[0.02] transition text-sm"
              >
                <div className="col-span-2 num text-muted-foreground">{e.endTime}</div>
                <div className="col-span-5 truncate">{e.name}</div>
                <div className="col-span-3 text-muted-foreground truncate">{e.zone}</div>
                <div className="col-span-2 num text-right">{e.volume.toLocaleString()}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export function SettingsView() {
  const rows = [
    { icon: Bell, label: "Alert Notifications", value: "Push + SMS", on: true },
    { icon: Shield, label: "Hazard Verification Threshold", value: "3 users", on: true },
    { icon: Globe, label: "Operating Region", value: "Lagos · WAT", on: true },
    { icon: SettingsIcon, label: "Auto-route on hazard", value: "Enabled", on: true },
  ];
  return (
    <Panel title="Settings" icon={<SettingsIcon className="h-4 w-4" />}>
      <div className="rounded-xl bg-[#141414] border border-white/5 divide-y divide-white/5">
        {rows.map(({ icon: Icon, label, value, on }) => (
          <div key={label} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-white/80" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-white truncate">{label}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 truncate">{value}</div>
              </div>
            </div>
            <div className={`h-5 w-9 rounded-full relative shrink-0 ${on ? "bg-emerald" : "bg-white/10"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Panel({ title, icon, children, action }: { title: string; icon: React.ReactNode; children: React.ReactNode; action?: React.ReactNode }) {
  const rightOpen = useAero((s) => s.rightPanelOpen);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute left-2 sm:left-4 right-2 sm:right-4 top-16 sm:top-20 bottom-20 z-10 glass-strong rounded-2xl overflow-hidden flex flex-col"
      style={isDesktop && rightOpen ? { right: "calc(380px + 1rem)" } : undefined}
    >
      <div className="px-5 py-4 border-b border-[var(--hairline)] flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-white/5 border border-[var(--hairline)] flex items-center justify-center">{icon}</div>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        {action && <div className="ml-auto">{action}</div>}
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 sm:p-5">{children}</div>
    </motion.div>
  );
}
// silence unused if needed
void AlertTriangle;
