import { Flame, AlertTriangle, Navigation, Layers, Maximize2 } from "lucide-react";
import { motion } from "motion/react";
import type { LayerToggles } from "./MapCanvas";

type Props = {
  layers: LayerToggles;
  onToggle: (k: keyof LayerToggles) => void;
  rightOpen?: boolean;
};

const items: { key: keyof LayerToggles; label: string; icon: typeof Flame; color: string }[] = [
  { key: "heatmap", label: "Heatmap", icon: Flame, color: "text-emerald" },
  { key: "hazards", label: "Hazards", icon: AlertTriangle, color: "text-crimson" },
  { key: "fleets", label: "Fleets", icon: Navigation, color: "text-electric" },
];

export function BottomBar({ layers, onToggle, rightOpen = true }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-3 sm:bottom-5 z-20 px-2"
      style={{
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        paddingRight: rightOpen ? "calc(380px + 1rem)" : "0",
        transition: "padding-right 0.35s ease",
      }}
    >
      <div className="glass-strong rounded-2xl px-1.5 py-1.5 sm:px-2 sm:py-2 flex items-center gap-0.5 sm:gap-1 shadow-2xl max-w-[calc(100vw-1rem)] overflow-x-auto scrollbar-thin">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border-r border-[var(--hairline)] mr-1 shrink-0">
          <Layers className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Layers</span>
        </div>
        {items.map(({ key, label, icon: Icon, color }) => {
          const active = layers[key];
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`shrink-0 relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-medium transition ${
                active ? "bg-white/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${active ? color : ""}`} />
              {label}
              <span className={`ml-0.5 h-1.5 w-1.5 rounded-full ${active ? `bg-current ${color}` : "bg-white/20"}`} />
            </button>
          );
        })}
        <div className="w-px h-6 bg-[var(--hairline)] mx-1 hidden sm:block" />
        <button className="shrink-0 h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition hidden sm:flex items-center justify-center">
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
