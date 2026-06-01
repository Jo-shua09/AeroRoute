import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { X, MapPin, AlertTriangle, Mic, Check, Loader2, Battery, Wifi, Signal } from "lucide-react";
import { toast } from "sonner";
import { useAero } from "@/lib/store";

type Props = { open: boolean; onClose: () => void };

export function CommuterModal({ open, onClose }: Props) {
  const [stage, setStage] = useState<"idle" | "sending" | "sent">("idle");
  const [hazardOn, setHazardOn] = useState(false);
  const [recording, setRecording] = useState(false);
  const dropPulse = useAero(s => s.dropPulse);

  useEffect(() => {
    if (!open) {
      setStage("idle");
      setHazardOn(false);
      setRecording(false);
    }
  }, [open]);

  const handleRequest = () => {
    setStage("sending");
    dropPulse({ source: "modal" });
    toast.success("Pulse received", { description: "Operator map updated · AR-12 assigned" });
    setTimeout(() => setStage("sent"), 1400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px]"
          >
            {/* phone frame */}
            <div className="relative rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <button
                onClick={onClose}
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center hover:bg-white/20 transition z-10"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="rounded-[2.1rem] bg-[#0f0f0f] overflow-hidden">
                {/* status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[10px] text-white/70">
                  <span className="num">9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3" />
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3 w-3" />
                  </div>
                </div>

                {/* content */}
                <div className="px-6 pt-4 pb-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-emerald">AeroRoute</div>
                      <div className="text-lg font-semibold mt-0.5">Commuter</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Location</div>
                      <div className="text-[11px] text-white/80 mt-0.5">Estate Junction</div>
                    </div>
                  </div>

                  <div className="mt-5 relative h-32 rounded-2xl border border-white/5 grid-bg overflow-hidden">
                    <div className="absolute inset-0 radial-fade" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="relative inline-flex h-3 w-3 text-emerald radar-pulse">
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]" />
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-3 text-[9px] text-muted-foreground">You're here</div>
                  </div>

                  <AnimatePresence mode="wait">
                    {stage === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 space-y-3"
                      >
                        <button
                          onClick={handleRequest}
                          className="w-full rounded-2xl bg-emerald text-black font-semibold py-4 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition"
                        >
                          <MapPin className="h-4 w-4" />
                          Request Ride · Drop Pulse
                        </button>

                        <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-lg bg-crimson/15 border border-crimson/20 flex items-center justify-center">
                              <AlertTriangle className="h-4 w-4 text-crimson" />
                            </div>
                            <div>
                              <div className="text-xs text-white">Report Hazard</div>
                              <div className="text-[10px] text-muted-foreground mt-0.5">Alert nearby commuters</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setHazardOn(v => !v)}
                            className={`relative h-5 w-9 rounded-full transition ${hazardOn ? "bg-crimson" : "bg-white/10"}`}
                          >
                            <motion.span
                              animate={{ x: hazardOn ? 16 : 2 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-0.5 h-4 w-4 rounded-full bg-white"
                            />
                          </button>
                        </div>

                        <button
                          onMouseDown={() => setRecording(true)}
                          onMouseUp={() => setRecording(false)}
                          onMouseLeave={() => setRecording(false)}
                          onTouchStart={() => setRecording(true)}
                          onTouchEnd={() => setRecording(false)}
                          className="w-full rounded-2xl bg-white/[0.03] border border-white/5 py-3.5 px-4 flex items-center gap-3 hover:bg-white/[0.05] transition"
                        >
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center transition ${recording ? "bg-crimson" : "bg-white/10"}`}>
                            <Mic className={`h-4 w-4 ${recording ? "text-white" : "text-white/70"}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs text-white">{recording ? "Listening…" : "Hold to record voice note"}</div>
                            <div className="mt-1 flex items-center gap-0.5 h-3">
                              {Array.from({ length: 22 }).map((_, i) => (
                                <motion.span
                                  key={i}
                                  animate={recording ? {
                                    height: [4, 10 + ((i * 7) % 10), 4],
                                  } : { height: 3 }}
                                  transition={{
                                    duration: 0.6,
                                    repeat: recording ? Infinity : 0,
                                    delay: i * 0.04,
                                  }}
                                  className={`w-0.5 rounded-full ${recording ? "bg-crimson" : "bg-white/20"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    )}

                    {stage === "sending" && (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 rounded-2xl bg-white/[0.03] border border-white/5 p-6 flex flex-col items-center gap-3"
                      >
                        <Loader2 className="h-6 w-6 text-emerald animate-spin" />
                        <div className="text-sm text-white">Dropping pulse…</div>
                        <div className="text-[11px] text-muted-foreground">Encrypting location signal</div>
                      </motion.div>
                    )}

                    {stage === "sent" && (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-5 rounded-2xl bg-emerald/10 border border-emerald/20 p-5 flex flex-col items-center gap-2"
                      >
                        <div className="h-10 w-10 rounded-full bg-emerald flex items-center justify-center">
                          <Check className="h-5 w-5 text-black" />
                        </div>
                        <div className="text-sm text-white font-medium">Pulse Sent</div>
                        <div className="text-[11px] text-muted-foreground text-center">
                          Analyzing safe route · Bypassing 1 hazard zone
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-[10px] text-emerald">
                          <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" />
                          AR-12 dispatched · ETA 4 min
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
