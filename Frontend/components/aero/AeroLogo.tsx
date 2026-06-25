import Image from "next/image";
import { cn } from "@/lib/utils";

export function AeroLogo({ className = "w-full h-full", showBackground = true }: { className?: string; showBackground?: boolean }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center",
        showBackground && "rounded-md bg-gradient-to-br from-emerald-500/25 to-cyan-400/10 border border-zinc-800",
        className,
      )}
    >
      <Image src="/icon.png" alt="AeroRoute Logo" width={512} height={512} className="p-1" />
    </div>
  );
}
