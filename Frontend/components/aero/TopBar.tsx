"use client";

import { Search, Bell, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { RoleSwitcher } from "./RoleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useAero } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export function TopBar({ section }: { section: string }) {
  const [time, setTime] = useState(() => new Date());
  const setMobileNav = useAero((s) => s.setMobileNavOpen);
  const rightOpen = useAero((s) => s.rightPanelOpen);
  const [searchOpen, setSearchOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="absolute top-2 sm:top-6 left-2 sm:left-4 right-2 sm:right-4 z-20 flex items-center gap-2 sm:gap-3 pointer-events-none"
      style={isDesktop && rightOpen ? { right: "calc(380px + 1rem)" } : undefined}
    >
      {/* mobile hamburger */}
      <button
        onClick={() => setMobileNav(true)}
        aria-label="Open menu"
        className="lg:hidden glass-strong rounded-xl h-11 w-11 flex items-center justify-center pointer-events-auto"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className={`glass-strong rounded-xl px-3 sm:px-4 h-11 flex items-center gap-2 sm:gap-3 pointer-events-auto shrink-0 ${searchOpen ? "hidden sm:flex" : "flex"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-muted-foreground truncate max-w-[110px] sm:max-w-none">
          {section}
        </span>
        <span className="text-foreground/30 hidden sm:inline">/</span>
        <span className="text-xs hidden sm:inline">Live</span>
      </div>

      <div className="flex items-center pointer-events-auto">
        <AnimatePresence mode="wait">
          {!searchOpen ? (
            <motion.button
              key="search-trigger"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSearchOpen(true)}
              className="glass-strong rounded-xl h-11 w-11 flex items-center justify-center hover:bg-white/5 transition"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          ) : (
            <motion.div
              key="search-input"
              initial={{ width: 44, opacity: 0 }}
              animate={{ width: isDesktop ? "clamp(180px, 30vw, 300px)" : "clamp(110px, 20vw, 150px)", opacity: 1 }}
              exit={{ width: 44, opacity: 0 }}
              className="glass-strong rounded-xl h-11 px-3.5 flex items-center gap-2 overflow-hidden"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <input
                autoFocus
                placeholder="Search..."
                className="bg-transparent text-xs outline-none flex-1 placeholder:text-muted-foreground/70 min-w-0"
              />
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-white/10 rounded-md transition">
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
