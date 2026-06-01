import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Activity, Smartphone, Truck, ArrowLeft, ArrowRight, Radio } from "lucide-react";

export const Route = createFileRoute("/select-role")({
  head: () => ({
    meta: [
      { title: "Select Operational Profile — AeroRoute" },
      {
        name: "description",
        content: "Choose an interface to initialize localized telemetry: Command Center, Attendee Terminal, or Pilot Dashboard.",
      },
    ],
  }),
  component: SelectRole,
});

const roles = [
  {
    id: "fleet",
    to: "/fleet" as const,
    icon: Activity,
    accent: "text-electric",
    tag: "Operator",
    title: "Command Center",
    desc: "Access the global macro map, analytics matrices, and timeline prediction feeds.",
    chips: ["Heatmaps", "Predictive Surge", "Fleet Dispatch", "Triage Feed"],
  },
  {
    id: "commuter",
    to: "/commuter" as const,
    icon: Smartphone,
    accent: "text-emerald",
    tag: "Attendee",
    title: "Attendee Terminal",
    desc: "Drop rapid transit pulses, submit voice note hazard reports, and request proximity shuttles.",
    chips: ["Pulse Drop", "Voice Triage", "Shuttle ETA"],
  },
  {
    id: "driver",
    to: "/driver" as const,
    icon: Truck,
    accent: "text-crimson",
    tag: "Pilot",
    title: "Pilot Dashboard",
    desc: "Radically simplified telemetry canvas showing active dynamic routing and audio hazard alerts.",
    chips: ["Live Route", "Detour Alert", "Distraction-free"],
  },
];

function SelectRole() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute inset-0 radial-fade" />
      <div className="pointer-events-none absolute left-1/2 top-[-160px] -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald/[0.05] blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-emerald/30 to-electric/20 border border-white/10 flex items-center justify-center">
            <Radio className="h-4 w-4 text-emerald" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight">AeroRoute</span>
        </Link>
        <Link to="/" className="text-xs text-muted-foreground hover:text-white transition flex items-center gap-1.5">
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pt-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            Profile Initialization
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-[-0.03em]">Select Operational Core Profile</h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Choose an interface to initialize localized telemetry. Each profile is fully isolated — you'll only see the features for the role you
            pick.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate({ to: r.to })}
                className="group relative text-left rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 hover:border-white/20 hover:bg-[#111111] transition-all overflow-hidden"
              >
                <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-emerald/[0.06] blur-3xl opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-start justify-between">
                  <div className="h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className={`h-5 w-5 ${r.accent}`} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{r.tag}</span>
                </div>
                <div className="mt-7 text-2xl font-semibold tracking-tight">{r.title}</div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {r.chips.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="mt-7 pt-5 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Initialize profile</span>
                  <span className="inline-flex items-center gap-1.5 text-white group-hover:gap-2.5 transition-all">
                    Enter <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 text-center text-[11px] text-muted-foreground"
        >
          Selecting a profile locks navigation to that perspective. You can switch any time via the "Change Role" affordance in the dashboard header.
        </motion.div>
      </main>
    </div>
  );
}
