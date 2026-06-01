import { Moon, Sun } from "lucide-react";
import { useAero } from "@/lib/store";
import { motion } from "motion/react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useAero(s => s.theme);
  const toggle = useAero(s => s.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`glass-strong rounded-xl h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition pointer-events-auto ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="flex"
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.span>
    </button>
  );
}
