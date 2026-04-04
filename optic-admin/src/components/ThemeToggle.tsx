"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-none bg-white/5 border border-white/5 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-10 h-10 flex items-center justify-center transition-all duration-500 overflow-hidden group",
        "bg-foreground/[0.03] border border-foreground/[0.05] hover:border-optic-amber/40",
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 transition-transform duration-700 group-hover:rotate-[15deg]">
        <Sun
          className={cn(
            "absolute inset-0 transition-all duration-700 transform",
            isDark ? "opacity-0 scale-50 rotate-90" : "opacity-100 scale-100 rotate-0 text-optic-amber"
          )}
          size={20}
        />
        <Moon
          className={cn(
            "absolute inset-0 transition-all duration-700 transform",
            isDark ? "opacity-100 scale-100 rotate-0 text-white" : "opacity-0 scale-50 -rotate-90"
          )}
          size={20}
        />
      </div>
      
      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-optic-amber/0 group-hover:bg-optic-amber/[0.03] transition-colors duration-500" />
    </button>
  );
}
