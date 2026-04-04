"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Glasses, 
  Settings, 
  BarChart3, 
  Layers,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Glasses },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Content", href: "/content", icon: Layers },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-nav border-r border-foreground/[0.05] flex flex-col h-full transition-all duration-300">
      <div className="p-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-display font-light tracking-[0.2em] text-foreground">
            ŌPTIC<span className="text-optic-amber text-[10px] align-top ml-1">®</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mt-1">Admin Portal</p>
        </div>
        <ThemeToggle />
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-none transition-all duration-500 group relative overflow-hidden",
                isActive 
                  ? "text-foreground bg-foreground/[0.05]" 
                  : "text-foreground/50 hover:text-foreground hover:bg-foreground/[0.02]"
              )}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-optic-amber" />
              )}
              
              <item.icon size={18} className={cn(
                "transition-transform duration-500 group-hover:scale-110",
                isActive ? "text-optic-amber" : "text-foreground/40 group-hover:text-foreground/80"
              )} />
              
              <span className="text-xs uppercase tracking-[0.2em] font-medium">
                {item.name}
              </span>

              {/* Subtle hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-optic-amber/0 to-optic-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-foreground/40 hover:text-foreground transition-colors group">
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-xs uppercase tracking-[0.2em]">Logout</span>
        </button>
      </div>
    </aside>
  );
}
