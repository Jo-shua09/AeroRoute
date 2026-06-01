"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { X, Calendar, Upload, FileText, Sparkles, Loader2, Check, Pencil, Trash2, AlertTriangle, Zap, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAero, type SchedulePhase } from "@/lib/store";

const ZONES = ["Gate A", "Main Pavilion", "Car Park C", "Estate Road 1", "North Court"];

function minutesUntil(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return Infinity;
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  const diff = (target.getTime() - now.getTime()) / 60000;
  return diff < -60 ? diff + 24 * 60 : diff;
}

export function TimelineDrawer() {
  const open = useAero((s) => s.timelineOpen);
  const setOpen = useAero((s) => s.setTimelineOpen);
  const schedule = useAero((s) => s.schedule);
  const addPhase = useAero((s) => s.addPhase);
  const removePhase = useAero((s) => s.removePhase);
  const aiOn = useAero((s) => s.aiRoutingEnabled);
  const setAi = useAero((s) => s.setAiRoutingEnabled);

  const [tab, setTab] = useState<"manual" | "bulk">("manual");
  const [name, setName] = useState("");
  const [zone, setZone] = useState(ZONES[0]);
  const [endTime, setEndTime] = useState("");
  const [volume, setVolume] = useState("");
  const [uploading, setUploading] = useState(false);

  const sorted = useMemo(() => [...schedule].sort((a, b) => a.endTime.localeCompare(b.endTime)), [schedule]);

  const inject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !endTime || !volume) {
      toast.error("Fill all phase parameters");
      return;
    }
    addPhase({ name, zone, endTime, volume: Number(volume) });
    toast.success("Injected into timeline", { description: `${name} · ${zone} · ${endTime}` });
    setName("");
    setEndTime("");
    setVolume("");
  };

  const upload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      addPhase({ name: "Closing Prayer", zone: "Main Pavilion", endTime: hhmmFromNow(45), volume: 21000 });
      addPhase({ name: "Choir Encore", zone: "Gate A", endTime: hhmmFromNow(120), volume: 9500 });
      toast.success("Matrix parsed", { description: "2 phases ingested · AI re-calibrated" });
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:w-[460px] glass-strong border-l border-[var(--hairline-strong)] flex flex-col"
          >
            {/* header */}
            <div className="px-5 py-4 border-b border-[var(--hairline)] flex items-start gap-3">
              <div className="h-9 w-9 rounded-md bg-emerald/15 border border-emerald/25 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4 text-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold tracking-tight">Timeline Orchestration Engine</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Inject schedule parameters for predictive fleet dispatch.</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-md hover:bg-white/5 flex items-center justify-center text-muted-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* AI master toggle */}
            <div className="px-5 py-3.5 border-b border-[var(--hairline)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald" />
                <div>
                  <div className="text-xs font-medium">Enable AI Predictive Routing</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Auto-dispatch fleets ahead of surge windows</div>
                </div>
              </div>
              <button
                onClick={() => setAi(!aiOn)}
                className={`relative h-5 w-9 rounded-full transition ${aiOn ? "bg-emerald" : "bg-white/15"}`}
                aria-pressed={aiOn}
              >
                <motion.span
                  animate={{ x: aiOn ? 16 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-4 w-4 rounded-full bg-white"
                />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {/* tabs */}
              <div className="px-5 pt-4">
                <div className="inline-flex p-1 rounded-lg bg-white/[0.04] border border-[var(--hairline)] text-[11px]">
                  {(["manual", "bulk"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`px-3 py-1.5 rounded-md transition ${
                        tab === t ? "bg-white/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "manual" ? "Manual Entry" : "Bulk Upload"}
                    </button>
                  ))}
                </div>
              </div>

              {/* tab content */}
              <div className="px-5 py-4">
                {tab === "manual" ? (
                  <form onSubmit={inject} className="grid grid-cols-2 gap-3">
                    <Field label="Event Phase Name" full>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Closing Prayer" className="aero-input" />
                    </Field>
                    <Field label="Target Geofence / Zone">
                      <select value={zone} onChange={(e) => setZone(e.target.value)} className="aero-input appearance-none cursor-pointer">
                        {ZONES.map((z) => (
                          <option key={z} value={z}>
                            {z}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Estimated End Time">
                      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="aero-input num" />
                    </Field>
                    <Field label="Projected Crowd Volume" full>
                      <input
                        type="number"
                        min={0}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="e.g. 22000"
                        className="aero-input num"
                      />
                    </Field>
                    <button
                      type="submit"
                      className="col-span-2 mt-1 w-full rounded-lg bg-[var(--electric)] text-white font-medium text-sm py-2.5 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] transition shadow-[0_8px_30px_-8px_var(--electric)]"
                    >
                      <Zap className="h-4 w-4" />
                      Inject into Timeline
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-dashed border-[var(--hairline-strong)] bg-white/[0.02] p-6 flex flex-col items-center text-center">
                      <div className="h-10 w-10 rounded-lg bg-white/[0.04] border border-[var(--hairline)] flex items-center justify-center">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="mt-3 text-xs font-medium">Drag & Drop CSV or JSON Schedule Matrix</div>
                      <div className="mt-1 text-[10px] text-muted-foreground">Or click parse to simulate ingestion</div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <FileText className="h-3 w-3" /> schedule_2026_main.csv
                      </div>
                    </div>
                    <button
                      onClick={upload}
                      disabled={uploading}
                      className="w-full rounded-lg bg-[var(--electric)] text-white font-medium text-sm py-2.5 flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-70"
                    >
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      {uploading ? "Parsing matrix…" : "Parse & Upload"}
                    </button>
                  </div>
                )}
              </div>

              {/* Active timeline feed */}
              <div className="px-5 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Active Timeline Feed</div>
                  <span className="text-[10px] text-emerald flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" /> SYNCING
                  </span>
                </div>

                <div className="relative pl-5">
                  <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[var(--hairline)]" />
                  <AnimatePresence initial={false}>
                    {sorted.map((p) => (
                      <PhaseCard key={p.id} phase={p} onDelete={() => removePhase(p.id)} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.aside>

          <style>{`
            .aero-input {
              width: 100%;
              background: rgba(255,255,255,0.03);
              border: 1px solid var(--hairline);
              border-radius: 8px;
              padding: 8px 10px;
              font-size: 12px;
              color: var(--color-foreground);
              outline: none;
              transition: border-color .15s, background .15s;
            }
            .light .aero-input { background: rgba(0,0,0,0.03); }
            .aero-input:focus { border-color: var(--emerald); background: rgba(16,185,129,0.05); }
            .aero-input::placeholder { color: var(--color-muted-foreground); }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "col-span-2" : ""}`}>
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function PhaseCard({ phase, onDelete }: { phase: SchedulePhase; onDelete: () => void }) {
  const mins = minutesUntil(phase.endTime);
  const imminent = mins >= 0 && mins <= 15;
  const past = mins < 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="relative mb-2.5 group"
    >
      <span
        className={`absolute -left-5 top-2.5 h-2.5 w-2.5 rounded-full ring-2 ring-[var(--app-bg)] ${
          imminent ? "bg-crimson shadow-[0_0_10px_var(--crimson)]" : past ? "bg-white/20" : "bg-emerald shadow-[0_0_8px_var(--emerald)]"
        }`}
      />
      <div
        className={`rounded-xl border bg-white/[0.02] p-3 transition ${
          imminent ? "border-crimson/40 pulse-crimson" : "border-[var(--hairline)] hover:border-[var(--hairline-strong)]"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{phase.name}</div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="num">{phase.endTime}</span>
              <span>·</span>
              <span>{phase.zone}</span>
              <span>·</span>
              <span className="num">{(phase.volume / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
            <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center text-muted-foreground">
              <Pencil className="h-3 w-3" />
            </button>
            <button
              onClick={onDelete}
              className="h-7 w-7 rounded-md hover:bg-crimson/15 flex items-center justify-center text-muted-foreground hover:text-crimson"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
        {imminent && (
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-crimson font-medium">
            <AlertTriangle className="h-3 w-3" />
            Surge Predicted · Fleets Rerouting
          </div>
        )}
      </div>
    </motion.div>
  );
}

function hhmmFromNow(min: number) {
  const d = new Date(Date.now() + min * 60_000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
