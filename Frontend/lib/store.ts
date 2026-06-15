import { create } from "zustand";

export type Theme = "dark" | "light";

export type SchedulePhase = {
  id: string;
  name: string;
  zone: string;
  endTime: string; // "HH:MM"
  volume: number;
  injectedAt: number;
};

export type UserPulse = {
  id: string;
  x: number; // % on map
  y: number;
  ts: number;
  source: "commuter" | "modal";
};

type State = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  // panels
  rightPanelOpen: boolean;
  toggleRightPanel: () => void;
  setRightPanelOpen: (v: boolean) => void;

  mobileNavOpen: boolean;
  setMobileNavOpen: (v: boolean) => void;

  timelineOpen: boolean;
  setTimelineOpen: (v: boolean) => void;

  aiRoutingEnabled: boolean;
  setAiRoutingEnabled: (v: boolean) => void;

  // data
  schedule: SchedulePhase[];
  addPhase: (p: Omit<SchedulePhase, "id" | "injectedAt">) => void;
  removePhase: (id: string) => void;

  pulses: UserPulse[];
  dropPulse: (p?: Partial<UserPulse>) => void;
  clearPulses: () => void;
};

const initialSchedule: SchedulePhase[] = [
  { id: "s1", name: "Doors Open", zone: "Gate A", endTime: "13:00", volume: 8000, injectedAt: Date.now() - 1e6 },
  { id: "s2", name: "Sermon Break", zone: "Main Pavilion", endTime: "14:00", volume: 15000, injectedAt: Date.now() - 5e5 },
  { id: "s3", name: "Main Service Ends", zone: "Main Pavilion", endTime: nowPlusMin(8), volume: 22000, injectedAt: Date.now() - 2e5 },
  { id: "s4", name: "Evening Dispersal", zone: "Estate Road 1", endTime: nowPlusMin(95), volume: 18000, injectedAt: Date.now() - 1e5 },
];

function nowPlusMin(min: number) {
  const d = new Date(Date.now() + min * 60_000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export const useAero = create<State>((set) => ({
  theme: "dark",
  setTheme: (t) => {
    set({ theme: t });
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", t === "light");
      document.documentElement.classList.toggle("dark", t === "dark");
      try { localStorage.setItem("aero-theme", t); } catch {/* */}
    }
  },
  toggleTheme: () => {
    const next: Theme = useAero.getState().theme === "dark" ? "light" : "dark";
    useAero.getState().setTheme(next);
  },

  rightPanelOpen: true,
  toggleRightPanel: () => set((s) => ({ rightPanelOpen: !s.rightPanelOpen })),
  setRightPanelOpen: (v) => set({ rightPanelOpen: v }),

  mobileNavOpen: false,
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),

  timelineOpen: false,
  setTimelineOpen: (v) => set({ timelineOpen: v }),

  aiRoutingEnabled: true,
  setAiRoutingEnabled: (v) => set({ aiRoutingEnabled: v }),

  schedule: initialSchedule,
  addPhase: (p) =>
    set((s) => ({
      schedule: [
        { ...p, id: `s${Date.now()}`, injectedAt: Date.now() },
        ...s.schedule,
      ],
    })),
  removePhase: (id) => set((s) => ({ schedule: s.schedule.filter((p) => p.id !== id) })),

  pulses: [],
  dropPulse: (p) =>
    set((s) => ({
      pulses: [
        ...s.pulses,
        {
          id: `p${Date.now()}-${Math.floor(Math.random() * 999)}`,
          x: p?.x ?? 25 + Math.random() * 55,
          y: p?.y ?? 35 + Math.random() * 45,
          ts: Date.now(),
          source: p?.source ?? "commuter",
        },
      ].slice(-30),
    })),
  clearPulses: () => set({ pulses: [] }),
}));

// bootstrap theme from localStorage
if (typeof window !== "undefined") {
  try {
    const saved = (localStorage.getItem("aero-theme") as Theme | null) ?? "dark";
    useAero.getState().setTheme(saved);
  } catch {/* */}
}
