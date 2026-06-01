import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { MapPin, Mic, AlertTriangle, Check, Loader2, Battery, Wifi, Signal, Bus, Navigation, Radio } from "lucide-react";
import { RoleSwitcher } from "@/components/aero/RoleSwitcher";
import { ThemeToggle } from "@/components/aero/ThemeToggle";
import { toast } from "sonner";
import { useAero } from "@/lib/store";

export const Route = createFileRoute("/commuter")({
  head: () => ({
    meta: [
      { title: "Attendee Terminal — AeroRoute" },
      { name: "description", content: "Drop transit pulses, send voice hazard reports, and get proximity shuttle ETAs." },
    ],
  }),
  component: CommuterDashboard,
});

const PIDGIN_NOTE = "Water don block estate road junction, massive crowd dey here.";

function CommuterDashboard() {
  const [stage, setStage] = useState<"idle" | "sending" | "sent">("idle");
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [hazardSubmitted, setHazardSubmitted] = useState(false);

  // simulated typing transcription
  useEffect(() => {
    if (!recording) return;
    setTranscript("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTranscript(PIDGIN_NOTE.slice(0, i));
      if (i >= PIDGIN_NOTE.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [recording]);

  const dropPulse = useAero((s) => s.dropPulse);
  const handlePulse = () => {
    setStage("sending");
    dropPulse({ source: "commuter" });
    toast.success("Pulse dropped", { description: "Visible on Operator map" });
    setTimeout(() => setStage("sent"), 1400);
    setTimeout(() => setStage("idle"), 6000);
  };

  const handleSubmitVoice = () => {
    if (!transcript) return;
    setHazardSubmitted(true);
    setTimeout(() => {
      setHazardSubmitted(false);
      setTranscript("");
    }, 4000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] text-foreground flex flex-col">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 radial-fade" />

      {/* top bar */}
      <header className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-emerald/30 to-electric/20 border border-white/10 flex items-center justify-center">
            <Radio className="h-4 w-4 text-emerald" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight">AeroRoute</span>
            <span className="text-[9px] text-muted-foreground tracking-[0.18em] uppercase mt-0.5">Attendee Terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <RoleSwitcher />
        </div>
      </header>

      {/* phone canvas */}
      <main className="relative z-10 flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-[400px]">
          {/* phone frame */}
          <div className="relative rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
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

              <div className="px-6 pt-4 pb-7">
                {/* header */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-emerald">AeroRoute</div>
                    <div className="text-lg font-semibold mt-0.5">Hi, Commuter</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider">Location</div>
                    <div className="text-[11px] text-white/80 mt-0.5">Estate Junction</div>
                  </div>
                </div>

                {/* local radar */}
                <div className="mt-5 relative h-44 rounded-2xl border border-white/5 grid-bg overflow-hidden">
                  <div className="absolute inset-0 radial-fade" />
                  {/* concentric rings */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="absolute rounded-full border border-white/[0.05]"
                        style={{
                          width: i * 60,
                          height: i * 60,
                          left: -(i * 30),
                          top: -(i * 30),
                        }}
                      />
                    ))}
                  </div>
                  {/* you dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="relative inline-flex h-3 w-3 text-emerald radar-pulse">
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald shadow-[0_0_12px_var(--emerald)]" />
                    </span>
                  </div>
                  {/* nearby hazard */}
                  <div className="absolute left-[28%] top-[35%]">
                    <span className="relative inline-flex h-2 w-2 text-crimson radar-pulse">
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_var(--crimson)]" />
                    </span>
                  </div>
                  {/* incoming shuttle */}
                  <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-[20%] bottom-[25%]"
                  >
                    <Navigation className="h-3.5 w-3.5 text-electric fill-electric drop-shadow-[0_0_6px_var(--electric)]" />
                  </motion.div>
                  <div className="absolute bottom-2 left-3 text-[9px] text-muted-foreground">You · Estate Junction</div>
                  <div className="absolute top-2 right-3 text-[9px] text-emerald flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-emerald animate-pulse" /> LIVE
                  </div>
                </div>

                {/* notification banner */}
                <div className="mt-4 rounded-xl bg-emerald/[0.06] border border-emerald/15 px-3.5 py-2.5 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald/15 border border-emerald/20 flex items-center justify-center shrink-0">
                    <Bus className="h-4 w-4 text-emerald" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white">Shuttle AR-12 arriving</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 truncate">4 min ETA · Detoured around H1 flood zone</div>
                  </div>
                  <span className="text-[10px] num text-emerald">4m</span>
                </div>

                {/* primary action */}
                <AnimatePresence mode="wait">
                  {stage === "idle" && (
                    <motion.button
                      key="pulse-btn"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      onClick={handlePulse}
                      className="relative mt-4 w-full rounded-2xl bg-emerald text-black font-semibold py-5 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition overflow-hidden"
                    >
                      <span className="absolute inset-0 rounded-2xl">
                        <span className="absolute inset-0 rounded-2xl bg-emerald animate-ping opacity-30" />
                      </span>
                      <MapPin className="relative h-5 w-5" />
                      <span className="relative">Drop Transit Pulse</span>
                    </motion.button>
                  )}
                  {stage === "sending" && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-2xl bg-white/[0.03] border border-white/5 p-5 flex flex-col items-center gap-2"
                    >
                      <Loader2 className="h-5 w-5 text-emerald animate-spin" />
                      <div className="text-sm text-white">Dropping pulse…</div>
                      <div className="text-[11px] text-muted-foreground">Encrypting location signal</div>
                    </motion.div>
                  )}
                  {stage === "sent" && (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 rounded-2xl bg-emerald/10 border border-emerald/20 p-5 flex flex-col items-center gap-1.5"
                    >
                      <div className="h-9 w-9 rounded-full bg-emerald flex items-center justify-center">
                        <Check className="h-5 w-5 text-black" />
                      </div>
                      <div className="text-sm text-white font-medium">Pulse Sent</div>
                      <div className="text-[11px] text-muted-foreground text-center">AR-12 dispatched · ETA 4 min</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* voice triage */}
                <div className="mt-4">
                  <button
                    onMouseDown={() => setRecording(true)}
                    onMouseUp={() => setRecording(false)}
                    onMouseLeave={() => setRecording(false)}
                    onTouchStart={() => setRecording(true)}
                    onTouchEnd={() => setRecording(false)}
                    className="w-full rounded-2xl bg-white/[0.03] border border-white/5 py-3.5 px-4 flex items-center gap-3 hover:bg-white/[0.05] transition"
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition ${recording ? "bg-crimson" : "bg-white/10"}`}>
                      <Mic className={`h-4 w-4 ${recording ? "text-white" : "text-white/70"}`} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-xs text-white">{recording ? "Listening…" : "Hold to record hazard report"}</div>
                      <div className="mt-1 flex items-center gap-0.5 h-3">
                        {Array.from({ length: 24 }).map((_, i) => (
                          <motion.span
                            key={i}
                            animate={recording ? { height: [3, 9 + ((i * 7) % 10), 3] } : { height: 3 }}
                            transition={{
                              duration: 0.6,
                              repeat: recording ? Infinity : 0,
                              delay: i * 0.03,
                            }}
                            className={`w-0.5 rounded-full ${recording ? "bg-crimson" : "bg-white/20"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {transcript && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] uppercase tracking-[0.18em] text-emerald">Pidgin · Transcription</div>
                            <div className="text-[9px] text-muted-foreground">Auto-translated</div>
                          </div>
                          <div className="mt-1.5 text-sm text-white leading-snug">
                            "{transcript}
                            {recording && transcript.length < PIDGIN_NOTE.length && (
                              <span className="inline-block w-1 h-3 bg-white align-middle ml-0.5 animate-pulse" />
                            )}
                            "
                          </div>
                          {!recording && transcript === PIDGIN_NOTE && !hazardSubmitted && (
                            <button
                              onClick={handleSubmitVoice}
                              className="mt-3 w-full rounded-lg bg-crimson/15 border border-crimson/20 text-crimson text-xs font-medium py-2 flex items-center justify-center gap-1.5 hover:bg-crimson/20 transition"
                            >
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Submit Hazard Report
                            </button>
                          )}
                          {hazardSubmitted && (
                            <div className="mt-3 flex items-center gap-2 text-[11px] text-emerald">
                              <Check className="h-3.5 w-3.5" /> Verified · 4 nearby pulses match
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center text-[10px] text-muted-foreground tracking-wider uppercase">
            Offline-first · Works without carrier signal
          </div>
        </div>
      </main>
    </div>
  );
}
