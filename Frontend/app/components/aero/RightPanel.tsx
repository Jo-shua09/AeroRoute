import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { AlertTriangle, TrendingUp, Truck, Sparkles, Clock, ChevronRight, PanelRightClose } from "lucide-react";
import { dummyTriage, type TriageItem } from "@/lib/dummy-data";
import { useAero } from "@/lib/store";

function useCountdown(seconds: number) {
  const [s, setS] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setS(prev => (prev > 0 ? prev - 1 : seconds)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

const iconFor = (k: TriageItem["kind"]) =>
  k === "hazard" ? AlertTriangle : k === "demand" ? TrendingUp : Truck;
const colorFor = (k: TriageItem["kind"]) =>
  k === "hazard" ? "text-crimson bg-crimson/10 border-crimson/20"
  : k === "demand" ? "text-emerald bg-emerald/10 border-emerald/20"
  : "text-electric bg-electric/10 border-electric/20";

export function RightPanel() {
  const countdown = useCountdown(872);
  const open = useAero(s => s.rightPanelOpen);
  const toggle = useAero(s => s.toggleRightPanel);
  const schedule = useAero(s => s.schedule);

  return (
    <>
      {/* Reopen tab when closed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="reopen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={toggle}
            className="hidden md:flex absolute right-4 top-4 z-20 glass-strong rounded-xl h-11 px-3 items-center gap-2 text-xs hover:bg-white/5 transition"
            aria-label="Open AI panel"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald" />
            <span className="hidden sm:inline">AI Engine</span>
            <ChevronRight className="h-3.5 w-3.5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            key="panel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute right-2 sm:right-4 top-2 sm:top-4 bottom-2 sm:bottom-4 w-[calc(100%-1rem)] sm:w-[360px] max-w-[380px] z-30 glass-strong rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="px-5 pt-5 pb-4 border-b border-[var(--hairline)] flex items-start gap-2">
              <div className="h-7 w-7 rounded-md bg-white/5 border border-[var(--hairline)] flex items-center justify-center shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold tracking-tight">AI Orchestration Engine</div>
                <div className="text-[10px] text-muted-foreground tracking-wider uppercase mt-0.5 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" />
                  Predictive timeline active
                </div>
              </div>
              <button
                onClick={toggle}
                aria-label="Collapse panel"
                className="h-7 w-7 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"
              >
                <PanelRightClose className="h-4 w-4" />
              </button>
            </div>

            <div className="px-5 py-4 border-b border-[var(--hairline)]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                Next Event Surge
              </div>
              <div className="rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-[var(--hairline-strong)] p-4 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald/10 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Main Service Ends
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald/15 text-emerald border border-emerald/20 tracking-wider">
                      ROUTING
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold num">{countdown}</span>
                    <span className="text-xs text-muted-foreground">min</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Routing fleets to Gate A proactively. Est. 22,000 dispersal pulses.
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 border-b border-[var(--hairline)]">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Event Timeline
              </div>
              <div className="relative space-y-2.5">
                <div className="absolute left-[5px] top-1 bottom-1 w-px bg-[var(--hairline)]" />
                {schedule.slice(0, 5).map(ev => (
                  <div key={ev.id} className="relative flex items-center gap-3 pl-4">
                    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-[var(--app-bg)] bg-emerald shadow-[0_0_8px_var(--emerald)]" />
                    <span className="text-[11px] num text-muted-foreground w-10">{ev.endTime}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate">{ev.name}</div>
                    </div>
                    <span className="text-[10px] num text-muted-foreground">
                      {(ev.volume / 1000).toFixed(1)}k
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Live AI Triage Feed
                </div>
                <div className="text-[10px] text-emerald flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" />
                  STREAMING
                </div>
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-thin px-5 pb-5 space-y-2">
                {dummyTriage.map((t, i) => {
                  const Icon = iconFor(t.kind);
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-lg bg-white/[0.02] hover:bg-white/[0.04] border border-[var(--hairline)] p-3 transition cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`h-7 w-7 shrink-0 rounded-md border flex items-center justify-center ${colorFor(t.kind)}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs leading-snug">{t.title}</div>
                          <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span className="truncate">{t.meta}</span>
                            <span className="shrink-0 ml-2">{t.ts}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
