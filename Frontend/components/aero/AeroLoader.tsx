"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { AeroLogo } from "./AeroLogo";

export function AeroLoader({ onComplete }: { onComplete?: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0A0A0A]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <AeroLogo className="w-40 h-40 md:w-56 md:h-56 drop-shadow-[0_0_40px_rgba(0,209,255,0.3)]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00D1FF] to-[#10B981] shadow-[0_0_12px_rgba(0,209,255,0.8)]"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>
        <span className="text-[11px] uppercase tracking-[0.35em] text-zinc-400 font-semibold">Establishing Telemetry</span>
      </motion.div>
    </motion.div>
  );
}
