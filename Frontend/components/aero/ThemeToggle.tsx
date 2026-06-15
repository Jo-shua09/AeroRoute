"use client";

import { Moon, Sun } from "lucide-react";
import { useAero } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useAero((s) => s.theme);
  const toggle = useAero((s) => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`glass-strong rounded-xl h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition pointer-events-auto ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="flex"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
