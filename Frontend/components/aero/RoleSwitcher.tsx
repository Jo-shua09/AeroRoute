import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";

export function RoleSwitcher({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/select-role"
      className={`glass-strong rounded-xl h-11 px-3.5 flex items-center gap-2 text-xs text-muted-foreground hover:text-white transition pointer-events-auto ${className}`}
    >
      <ArrowLeftRight className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Change Role</span>
    </Link>
  );
}
