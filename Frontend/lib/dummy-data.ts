export type Hazard = {
  id: string;
  type: string;
  severity: "High" | "Medium" | "Low";
  x: number; // % position on map
  y: number;
  verifiedBy: number;
  note: string;
};

export type DemandCluster = {
  id: string;
  name: string;
  x: number;
  y: number;
  intensity: number; // 0-100
  pulses: number;
};

export type Fleet = {
  id: string;
  unit: string;
  x: number;
  y: number;
  heading: number; // deg
  status: "en-route" | "boarding" | "rerouting" | "idle";
  capacity: number;
  occupied: number;
};

export type TimelineEvent = {
  id: string;
  time: string;
  event: string;
  expectedCrowd: number;
  status: "completed" | "active" | "approaching" | "upcoming";
};

export type TriageItem = {
  id: string;
  kind: "hazard" | "demand" | "dispatch";
  title: string;
  meta: string;
  ts: string;
};

export const dummyHazards: Hazard[] = [
  { id: "h1", type: "Flash Flood", severity: "High", x: 32, y: 58, verifiedBy: 3, note: "Water pooling at Estate Junction" },
  { id: "h2", type: "Road Blocked", severity: "Medium", x: 68, y: 38, verifiedBy: 2, note: "Truck breakdown on Service Lane" },
  { id: "h3", type: "Crowd Crush Risk", severity: "High", x: 52, y: 72, verifiedBy: 5, note: "Bottleneck at Gate C" },
];

export const dummyClusters: DemandCluster[] = [
  { id: "c1", name: "Pavilion B", x: 60, y: 55, intensity: 92, pulses: 425 },
  { id: "c2", name: "Gate A", x: 28, y: 32, intensity: 78, pulses: 312 },
  { id: "c3", name: "North Court", x: 75, y: 68, intensity: 64, pulses: 248 },
  { id: "c4", name: "Auditorium", x: 45, y: 42, intensity: 51, pulses: 186 },
];

export const dummyFleets: Fleet[] = [
  { id: "f1", unit: "Vehicle-01", x: 22, y: 48, heading: 45, status: "en-route", capacity: 14, occupied: 9 },
  { id: "f2", unit: "Vehicle-02", x: 58, y: 28, heading: 120, status: "rerouting", capacity: 14, occupied: 12 },
  { id: "f3", unit: "Vehicle-03", x: 70, y: 62, heading: 200, status: "boarding", capacity: 14, occupied: 14 },
  { id: "f4", unit: "Vehicle-04", x: 38, y: 70, heading: 310, status: "en-route", capacity: 14, occupied: 6 },
  { id: "f5", unit: "Vehicle-05", x: 50, y: 50, heading: 90, status: "en-route", capacity: 14, occupied: 11 },
  { id: "f6", unit: "Vehicle-06", x: 82, y: 44, heading: 270, status: "idle", capacity: 14, occupied: 0 },
];

export const dummyTimeline: TimelineEvent[] = [
  { id: "t1", time: "13:00", event: "Doors Open", expectedCrowd: 8000, status: "completed" },
  { id: "t2", time: "14:00", event: "Sermon Break", expectedCrowd: 15000, status: "active" },
  { id: "t3", time: "14:45", event: "Main Service Ends", expectedCrowd: 22000, status: "approaching" },
  { id: "t4", time: "16:00", event: "Evening Dispersal", expectedCrowd: 18000, status: "upcoming" },
  { id: "t5", time: "18:30", event: "Closing Pulse", expectedCrowd: 6500, status: "upcoming" },
];

export const dummyTriage: TriageItem[] = [
  { id: "tr1", kind: "hazard", title: "Hazard: Water pooling at Estate Junction", meta: "Verified by 3 users", ts: "just now" },
  { id: "tr2", kind: "demand", title: "Demand Surge: 45 pulses at Pavilion B", meta: "Cluster intensity +18%", ts: "1m ago" },
  { id: "tr3", kind: "dispatch", title: "Dispatch: Fleet Unit #44 rerouted", meta: "Bypassing hazard zone H1", ts: "2m ago" },
  { id: "tr4", kind: "demand", title: "Demand Surge: Gate A queue forming", meta: "312 active pulses", ts: "3m ago" },
  { id: "tr5", kind: "dispatch", title: "Dispatch: AR-19 assigned to North Court", meta: "ETA 4 min", ts: "4m ago" },
  { id: "tr6", kind: "hazard", title: "Hazard: Bottleneck at Gate C", meta: "Verified by 5 users", ts: "6m ago" },
];

export const navItems = [
  { id: "orchestration", label: "Live Orchestration" },
  { id: "fleet", label: "Central Operations Center" },

  { id: "timeline", label: "Event Timeline" },
  { id: "settings", label: "Settings" },
] as const;
export type NavId = (typeof navItems)[number]["id"];
