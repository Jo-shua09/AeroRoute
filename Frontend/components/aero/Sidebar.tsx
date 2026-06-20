import { motion } from "framer-motion";
import { Activity, Truck, CalendarClock, Settings, Radio, TrendingUp, ChevronLeft, Smartphone, Calendar } from "lucide-react";
import { useState } from "react";
import type { NavId } from "@/lib/dummy-data";
import { useAero } from "@/lib/store";

const items: { id: NavId; label: string; icon: typeof Activity }[] = [
  { id: "orchestration", label: "Live Orchestration", icon: Activity },
  { id: "fleet", label: "Central Operations Center", icon: Truck },

  { id: "timeline", label: "Event Timeline", icon: CalendarClock },
  { id: "settings", label: "Settings", icon: Settings },
];

type Props = {
  active: NavId;
  onChange: (id: NavId) => void;
  onSimulate: () => void;
};

export function Sidebar({ active, onChange, onSimulate }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const openTimeline = useAero((s) => s.setTimelineOpen);
  const pulses = useAero((s) => s.pulses);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 280 }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className="relative z-30 h-full shrink-0 border-r border-[var(--hairline)] bg-[var(--panel-bg-2)] backdrop-blur-xl flex flex-col overflow-visible"
    >
      <div className={`flex items-center h-16 border-b border-[var(--hairline)] ${collapsed ? "justify-center" : "px-4"}`}>
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-emerald/30 to-electric/20 border border-[var(--hairline)] flex items-center justify-center shrink-0">
            <Radio className="h-4 w-4 text-emerald" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-tight font-heading">AeroRoute</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase mt-0.5">Orchestration</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating toggle button on the border */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="hidden lg:flex absolute z-50 h-7 w-7 rounded-full border border-[var(--hairline-strong)] bg-[var(--panel-bg-2)] text-muted-foreground items-center justify-center shadow-md hover:text-foreground hover:bg-white/5 transition-all pointer-events-auto"
        style={{ right: "-14px", top: "18px" }}
        aria-label="Toggle sidebar"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>

      <nav className="px-3 py-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`group relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive ? "bg-white/[0.06] text-foreground" : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
              }`}
            >
              {isActive && <motion.span layoutId="nav-active" className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-emerald" />}
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_8px_var(--emerald)]" />}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-4 mt-2 space-y-2.5 flex-1 overflow-y-auto scrollbar-thin">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 mb-1 px-1">Global Analytics</div>

          <MetricCard
            label="Active Pulses"
            value={(1245 + pulses.length).toLocaleString()}
            trend={pulses.length > 0 ? `+${pulses.length} live` : "+12%"}
            trendColor="text-emerald"
            icon={<TrendingUp className="h-3.5 w-3.5" />}
          />
          <MetricCard label="Fleet Deployed" value="84" sub="/ 100" barPct={84} />
          <MetricCard label="Avg Transit Latency" value="14" sub="min" trend="-2m" trendColor="text-emerald" />

          <button
            onClick={() => openTimeline(true)}
            className="w-full mt-2 rounded-lg bg-emerald/10 border border-emerald/25 text-emerald px-3.5 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-emerald/15 transition"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              Manage Timeline
            </span>
            <span className="text-[10px] tracking-wider opacity-70">→</span>
          </button>

          <div className="pt-3">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 mb-2 px-1">System Health</div>
            <div className="rounded-lg bg-card border border-[var(--hairline)] p-3 flex items-center gap-3">
              <div className="relative h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald" />
                <span className="absolute inset-0 rounded-full bg-emerald animate-ping" />
              </div>
              <div className="text-xs">
                <div>All systems nominal</div>
                <div className="text-muted-foreground text-[10px] mt-0.5">99.98% uptime · 3 regions</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <div className="flex-1 px-2 mt-2 space-y-2">
          <button
            onClick={() => openTimeline(true)}
            aria-label="Manage timeline"
            className="w-full h-10 rounded-lg bg-emerald/10 border border-emerald/25 text-emerald flex items-center justify-center hover:bg-emerald/15 transition"
          >
            <Calendar className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="p-3 border-t border-[var(--hairline)]">
        {collapsed ? (
          <button
            onClick={onSimulate}
            className="w-full h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition"
            aria-label="Simulate Commuter Pulse"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onSimulate}
            className="group w-full rounded-lg bg-primary text-primary-foreground px-3.5 py-2.5 text-sm font-medium hover:opacity-90 transition flex items-center justify-between overflow-hidden"
          >
            <span className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Simulate Commuter Pulse
            </span>
            <span className="text-[10px] tracking-wider opacity-50 group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        )}
      </div>
    </motion.aside>
  );
}

function MetricCard({
  label,
  value,
  sub,
  trend,
  trendColor,
  icon,
  barPct,
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
  trendColor?: string;
  icon?: React.ReactNode;
  barPct?: number;
}) {
  return (
    <div className="rounded-lg bg-card border border-[var(--hairline)] p-3 hover:border-[var(--hairline-strong)] transition">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        {trend && (
          <span className={`text-[10px] flex items-center gap-1 ${trendColor}`}>
            {icon}
            {trend}
          </span>
        )}
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="text-2xl font-semibold num">{value}</span>
        {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
      </div>
      {typeof barPct === "number" && (
        <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-electric to-emerald"
          />
        </div>
      )}
    </div>
  );
}
