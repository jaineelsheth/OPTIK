"use client";

import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Database,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { name: "My Account", icon: User, desc: "Personal information and security" },
    { name: "Notifications", icon: Bell, desc: "Manage alerts and webhooks" },
    { name: "Privacy & Security", icon: Shield, desc: "RLS policies and access logs" },
    { name: "Appearance", icon: Palette, desc: "Customize portal aesthetic" },
    { name: "General", icon: Globe, desc: "Localization and timezones" },
    { name: "System", icon: Database, desc: "Infrastructure and data health" },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-display font-light tracking-wider text-foreground">
          Portal <span className="text-optic-amber italic">Settings</span>
        </h2>
        <p className="text-foreground/40 text-[10px] uppercase tracking-[0.4em] mt-2">
          Configure your administrative command center
        </p>
      </header>

      <div className="space-y-3">
        {sections.map((section) => (
          <button key={section.name} className="w-full text-left glass-card p-6 flex items-center justify-between group hover:bg-foreground/[0.02] transition-colors">
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 bg-foreground/5 flex items-center justify-center group-hover:bg-optic-amber/10 transition-colors">
                  <section.icon size={20} className="text-foreground/40 group-hover:text-optic-amber transition-colors" />
               </div>
               <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-foreground font-medium">{section.name}</h4>
                  <p className="text-[10px] text-foreground/30 mt-1 uppercase tracking-widest">{section.desc}</p>
               </div>
            </div>
            <ChevronRight size={18} className="text-foreground/10 group-hover:text-optic-amber group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <div className="pt-10 border-t border-foreground/5">
        <div className="flex justify-between items-center text-[10px] tracking-[0.3em] text-foreground/20 uppercase font-bold">
           <span>ŌPTIC ADMIN V.1.0.4</span>
           <span>EST 2024</span>
        </div>
      </div>
    </div>
  );
}
