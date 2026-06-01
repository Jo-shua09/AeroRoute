"use client";

import { Search, Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { RoleSwitcher } from "./RoleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useAero } from "@/lib/store";

export function TopBar({ section }: { section: string }) {
  const [time, setTime] = useState(() => new Date());
  const setMobileNav = useAero((s) => s.setMobileNavOpen);
  const rightOpen = useAero((s) => s.rightPanelOpen);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="absolute top-2 sm:top-4 left-2 sm:left-4 z-20 flex items-center gap-2 sm:gap-3 pointer-events-none"
      style={{ right: rightOpen ? "calc(380px + 1rem)" : "1rem" }}
    >
      {/* mobile hamburger */}
      <button
        onClick={() => setMobileNav(true)}
        aria-label="Open menu"
        className="lg:hidden glass-strong rounded-xl h-11 w-11 flex items-center justify-center pointer-events-auto"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="glass-strong rounded-xl px-3 sm:px-4 h-11 flex items-center gap-2 sm:gap-3 pointer-events-auto shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-muted-foreground truncate max-w-[110px] sm:max-w-none">
          {section}
        </span>
        <span className="text-foreground/30 hidden sm:inline">/</span>
        <span className="text-xs hidden sm:inline">Live</span>
      </div>

      <div className="glass-strong rounded-xl px-3.5 h-11 hidden md:flex items-center gap-2 flex-1 max-w-md pointer-events-auto">
        <Search className="h-3.5 w-3.5 text-muted-foreground" />
        <input
          placeholder="Search zones, fleet units, hazards…"
          className="bg-transparent text-xs outline-none flex-1 placeholder:text-muted-foreground/70"
        />
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-[var(--hairline)] text-muted-foreground">⌘K</kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="glass-strong rounded-xl px-3 h-11 hidden lg:flex items-center gap-2 pointer-events-auto">
          <span className="text-[11px] text-muted-foreground tracking-wider">LAGOS · WAT</span>
          <span className="text-foreground/20 mx-1">·</span>
          <span className="text-xs num">{fmt}</span>
        </div>

        <ThemeToggle className="!h-11 !w-11" />

        <button className="glass-strong rounded-xl h-11 w-11 hidden sm:flex items-center justify-center pointer-events-auto hover:bg-white/5 transition relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-crimson" />
        </button>

        <RoleSwitcher />
      </div>
    </div>
  );
}
