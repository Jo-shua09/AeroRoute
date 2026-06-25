"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Navigation, RefreshCcw, Users, X, Clock, MapPin, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeToggle } from "@/components/aero/ThemeToggle";
import { RoleSwitcher } from "@/components/aero/RoleSwitcher";
import { AeroLogo } from "@/components/aero/AeroLogo";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

interface UserReportedHazard {
  id: string;
  incidentType: string;
  sourceType: "Voice Note Triage" | "Commuter Pulse Report";
  recencyText: string;
  coordinates: { topPercent: number; leftPercent: number };
  severity: "high" | "critical";
}

const mockHazards: UserReportedHazard[] = [
  {
    id: "hz-01",
    incidentType: "Main Congress Gate 1 Intersection Gridlock",
    sourceType: "Voice Note Triage",
    recencyText: "Generated 45s ago",
    coordinates: { topPercent: 42, leftPercent: 55 },
    severity: "critical",
  },
  {
    id: "hz-02",
    incidentType: "Expressway Access Loop Pedestrian Overflow",
    sourceType: "Commuter Pulse Report",
    recencyText: "Generated 2 mins ago",
    coordinates: { topPercent: 68, leftPercent: 30 },
    severity: "high",
  },
];

interface LocationPulse {
  id: string;
  exactLocationName: string;
  etaToPulseMinutes: number;
  commuterCount: number;
  mapCoordinates: { topPercent: number; leftPercent: number };
}

const mockLocationPulses: LocationPulse[] = [
  {
    id: "pulse-01",
    exactLocationName: "Main Congress Gate 1 Interchange Loop",
    etaToPulseMinutes: 4,
    commuterCount: 245,
    mapCoordinates: { topPercent: 35, leftPercent: 48 },
  },
  {
    id: "pulse-02",
    exactLocationName: "Youth Centre Complex - North Bus Park",
    etaToPulseMinutes: 8,
    commuterCount: 89,
    mapCoordinates: { topPercent: 62, leftPercent: 25 },
  },
];

export default function DriverDashboard() {
  const [hazardActive, setHazardActive] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<UserReportedHazard | null>(null);
  const [selectedPulse, setSelectedPulse] = useState<LocationPulse | null>(null);
  const [eta, setEta] = useState(4);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "Pilot Dashboard - AeroRoute";

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (hazardActive) {
      const timer = setTimeout(() => setEta(7), 500);
      return () => clearTimeout(timer);
    } else {
      setEta(4);
    }
  }, [hazardActive]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-black text-zinc-100 ${bricolage.variable}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <AeroLogo className="h-8 w-8 md:h-10 md:w-10" showBackground={true} />
          <div>
            <p className="text-base md:text-lg font-semibold text-white">Pilot Dashboard</p>
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Vehicle-01</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <RoleSwitcher />
        </div>
      </header>

      {/* Alert Banner */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40">
        <AlertBanner hazardActive={hazardActive} />
      </div>

      {/* Main Content */}
      <div className="pt-32 md:pt-32 pb-64 md:pb-0">
        {/* Mobile: Card Layout */}
        <div className="md:hidden px-4 space-y-4 max-h-[calc(100vh-8rem)] pb-8">
          {/* Telemetry Cards */}
          <div className="grid grid-cols-2 gap-3">
            <MobileMetricCard label="Live Speed" value="35" unit="km/h" icon={<Activity className="h-4 w-4 text-cyan-400" />} />
            <MobileMetricCard label="Dynamic ETA" value={String(eta)} unit="mins" icon={<Clock className="h-4 w-4 text-emerald-400" />} />
          </div>

          {/* Location Info */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-widest text-zinc-400">Current Location</p>
            <p className="text-sm font-medium text-white mt-1">Gate 3 Access Road (Redemption City)</p>
          </div>

          {/* Hazard Reports */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-crimson" />
              Hazard Reports
            </h3>
            <div className="space-y-3">
              {mockHazards.map((hazard) => (
                <MobileHazardCard key={hazard.id} hazard={hazard} onSelect={() => setSelectedHazard(hazard)} />
              ))}
            </div>
          </div>

          {/* Transit Pulses */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-3 flex items-center gap-2">
              <Navigation className="h-4 w-4 text-cyan-400" />
              Transit Pulses
            </h3>
            <div className="space-y-3">
              {mockLocationPulses.map((pulse) => (
                <MobilePulseCard key={pulse.id} pulse={pulse} onSelect={() => setSelectedPulse(pulse)} />
              ))}
            </div>
          </div>

          {/* Simulation Button */}
          <button
            onClick={() => setHazardActive(!hazardActive)}
            className={cn(
              "w-full rounded-xl border px-4 py-4 flex items-center justify-center gap-3 transition-all duration-300",
              hazardActive ? "bg-crimson/20 border-crimson/50 text-crimson" : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800/70",
            )}
          >
            {hazardActive ? (
              <>
                <RefreshCcw className="h-5 w-5" />
                <span className="text-sm font-semibold tracking-wide">Reset Simulation</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-semibold tracking-wide">Simulate Live Hazard</span>
              </>
            )}
          </button>

          {/* Extra spacing for bottom navigation */}
          <div className="h-4" />
        </div>

        {/* Desktop: Map Layout */}
        <div className="hidden md:block relative h-[calc(100vh-5rem)]">
          <div className="relative w-full h-full">
            <MapCanvas hazardActive={hazardActive} onSelectHazard={setSelectedHazard} onSelectPulse={setSelectedPulse} />
          </div>

          {/* Desktop Telemetry Panel */}
          <div className="absolute top-4 left-4 z-10">
            <DesktopTelemetryPanel eta={eta} />
          </div>

          {/* Simulation Button - Desktop */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setHazardActive(!hazardActive)}
              className={cn(
                "group relative rounded-xl border px-4 py-3 flex items-center gap-3 transition-all duration-300",
                hazardActive ? "bg-crimson/20 border-crimson/50 text-crimson" : "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800/70",
              )}
            >
              <div className="relative h-5 w-5">
                <AnimatePresence>
                  {hazardActive ? (
                    <motion.div key="reset" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                      <RefreshCcw className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="alert" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                      <AlertTriangle className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-sm font-semibold tracking-wide font-bricolage">{hazardActive ? "Reset Simulation" : "Simulate Live Hazard"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheets (Both Mobile & Desktop) */}
      <AnimatePresence>{selectedHazard && <HazardDetailSheet hazard={selectedHazard} onClose={() => setSelectedHazard(null)} />}</AnimatePresence>
      <AnimatePresence>{selectedPulse && <PulseDetailSheet pulse={selectedPulse} onClose={() => setSelectedPulse(null)} />}</AnimatePresence>
    </div>
  );
}

// Mobile Card Components
function MobileMetricCard({ label, value, unit, icon }: { label: string; value: string; unit: string; icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-xs uppercase tracking-widest text-zinc-400">{label}</p>
      </div>
      <p className="text-2xl font-bold text-white">
        {value}
        <span className="text-base font-medium text-zinc-400 ml-1">{unit}</span>
      </p>
    </div>
  );
}

function MobileHazardCard({ hazard, onSelect }: { hazard: UserReportedHazard; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm hover:border-crimson/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-crimson animate-pulse" />
          <span className="text-xs font-semibold text-crimson uppercase">{hazard.severity} Severity</span>
        </div>
        <span className="text-xs text-zinc-500">{hazard.recencyText}</span>
      </div>
      <h4 className="text-sm font-medium text-white mb-2">{hazard.incidentType}</h4>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <AlertTriangle className="h-3 w-3" />
        <span>{hazard.sourceType}</span>
      </div>
    </button>
  );
}

function MobilePulseCard({ pulse, onSelect }: { pulse: LocationPulse; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="text-xs font-semibold text-emerald-400 uppercase">Active Pulse</span>
        </div>
        <span className="text-xs text-zinc-400">{pulse.etaToPulseMinutes} mins away</span>
      </div>
      <h4 className="text-sm font-medium text-white mb-2">{pulse.exactLocationName}</h4>
      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Users className="h-3 w-3" />
        <span>{pulse.commuterCount} Commuters Waiting</span>
      </div>
    </button>
  );
}

// Desktop Telemetry Panel
function DesktopTelemetryPanel({ eta }: { eta: number }) {
  return (
    <div className="bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-xl p-6 w-72 space-y-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-400">Current Location</p>
        <p className="text-base font-medium text-white mt-1">Gate 3 Access Road (Redemption City)</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-400">Live Speed</p>
          <p className="text-3xl font-bold text-white mt-1">
            35<span className="text-lg font-medium text-zinc-400 ml-1">km/h</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-400">Dynamic ETA</p>
          <p className="text-3xl font-bold text-white mt-1">
            {eta}
            <span className="text-lg font-medium text-zinc-400 ml-1">mins</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-zinc-800 text-emerald-400">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-sm font-medium">Signal Sync: Connected</p>
      </div>
    </div>
  );
}

// Alert Banner Component
function AlertBanner({ hazardActive }: { hazardActive: boolean }) {
  const banner = hazardActive
    ? {
        text: "HAZARD DETECTED: CROWD SURGE AHEAD. DYNAMIC ROUTE APPLIED.",
        className: "bg-crimson/80 border-crimson/50 text-white",
        icon: <AlertTriangle className="h-5 w-5 text-white" />,
      }
    : {
        text: "Route Optimal-No Delays Reported",
        className: "bg-zinc-900/80 border-emerald-500/30 text-zinc-300",
        icon: <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />,
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={hazardActive ? "hazard" : "optimal"}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={cn("w-full p-3 md:p-4 border-b flex items-center justify-center gap-2 md:gap-3 text-center backdrop-blur-md", banner.className)}
      >
        {banner.icon}
        <span className="text-xs md:text-sm font-semibold tracking-wide font-bricolage">{banner.text}</span>
      </motion.div>
    </AnimatePresence>
  );
}

// Map Canvas (Desktop Only)
function MapCanvas({
  hazardActive,
  onSelectHazard,
  onSelectPulse,
}: {
  hazardActive: boolean;
  onSelectHazard: (h: UserReportedHazard) => void;
  onSelectPulse: (p: LocationPulse) => void;
}) {
  return (
    <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80" />

      {/* SVG Route Path */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="route-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="1" />
          </linearGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <AnimatePresence>
          {!hazardActive ? (
            <motion.path
              key="safe-route"
              d="M 10 85 C 40 60, 60 40, 90 15"
              stroke="url(#route-glow)"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow-filter)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <motion.path
              key="detour-route"
              d="M 10 85 C 25 75, 40 70, 48 60 S 60 40, 90 15"
              stroke="url(#route-glow)"
              strokeWidth="0.5"
              fill="none"
              filter="url(#glow-filter)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* Hazard Polygon */}
      <AnimatePresence>
        {hazardActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute w-[20%] h-[20%]"
            style={{ top: "35%", left: "45%" }}
          >
            <div
              className="absolute inset-0 bg-crimson/30 animate-pulse"
              style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Pins */}
      {mockHazards.map((hazard) => (
        <HazardPin key={hazard.id} hazard={hazard} onSelect={() => onSelectHazard(hazard)} />
      ))}
      {mockLocationPulses.map((pulse) => (
        <PulsePin key={pulse.id} pulse={pulse} onSelect={() => onSelectPulse(pulse)} />
      ))}
    </div>
  );
}

// Map Pin Components
function HazardPin({ hazard, onSelect }: { hazard: UserReportedHazard; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center group cursor-pointer"
      style={{ top: `${hazard.coordinates.topPercent}%`, left: `${hazard.coordinates.leftPercent}%` }}
      aria-label={`View details for ${hazard.incidentType}`}
    >
      <div className="absolute inset-0 rounded-full bg-crimson/50 animate-pulse" />
      <div className="absolute inset-3 rounded-full bg-crimson/50 animate-pulse [animation-delay:200ms]" />
      <AlertTriangle className="h-5 w-5 text-white drop-shadow-lg relative z-10" />
    </button>
  );
}

function PulsePin({ pulse, onSelect }: { pulse: LocationPulse; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 grid place-items-center group cursor-pointer"
      style={{ top: `${pulse.mapCoordinates.topPercent}%`, left: `${pulse.mapCoordinates.leftPercent}%` }}
      aria-label={`View details for ${pulse.exactLocationName}`}
    >
      <div className="absolute inset-0 rounded-full bg-emerald-500/40 animate-pulse" />
      <div className="absolute inset-3 rounded-full bg-emerald-500/40 animate-pulse [animation-delay:200ms]" />
      <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)] relative z-10" />
    </button>
  );
}

// Detail Sheet Components
function HazardDetailSheet({ hazard, onClose }: { hazard: UserReportedHazard; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl border-t md:border border-zinc-800 bg-zinc-950/95 shadow-2xl overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-crimson/20 text-crimson border border-crimson/30">
                <AlertTriangle className="h-4 w-4" />
                {hazard.severity.toUpperCase()} SEVERITY HAZARD
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-3 font-bricolage">{hazard.incidentType}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400">Source Triage Input</p>
              <p className="text-sm md:text-lg font-medium text-white mt-1">AI Verified ({hazard.sourceType})</p>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400">Report Recency</p>
              <p className="text-sm md:text-lg font-medium text-white mt-1">{hazard.recencyText}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 bg-emerald-500 text-zinc-950 font-bold py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-emerald-400 active:scale-[0.99] transition-all duration-200 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)]"
          >
            Acknowledge Detour Route
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PulseDetailSheet({ pulse, onClose }: { pulse: LocationPulse; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-2xl rounded-t-2xl md:rounded-2xl border-t md:border border-zinc-800 bg-zinc-950/95 shadow-2xl overflow-hidden"
      >
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                ACTIVE TRANSIT PULSE
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-3 font-bricolage">{pulse.exactLocationName}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400">Commuter Volume</p>
              <p className="text-sm md:text-lg font-medium text-white mt-1 flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-300" />
                {pulse.commuterCount} Commuters Waiting
              </p>
            </div>
            <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-3 md:p-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400">Estimated Time of Arrival</p>
              <p className="text-sm md:text-lg font-medium text-white mt-1 flex items-center gap-2">
                <Navigation className="h-4 w-4 text-cyan-300" />
                {pulse.etaToPulseMinutes} mins away
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 bg-cyan-500 text-zinc-950 font-bold py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-cyan-400 active:scale-[0.99] transition-all duration-200 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.4)]"
          >
            Accept Routing Pulse
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
