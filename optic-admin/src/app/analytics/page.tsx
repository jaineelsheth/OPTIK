"use client";

import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Globe,
  Zap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const performanceMetrics = [
  { label: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: 'up' },
  { label: "Avg. Order Value", value: "₹4,120", change: "+12.1%", trend: 'up' },
  { label: "Bounce Rate", value: "42.5%", change: "-2.4%", trend: 'down' },
  { label: "Session Duration", value: "4m 12s", change: "+15s", trend: 'up' },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header>
        <h2 className="text-4xl font-display font-light tracking-wider text-foreground">
          Advanced <span className="text-optic-amber italic">Insights</span>
        </h2>
        <p className="text-foreground/40 text-[10px] uppercase tracking-[0.4em] mt-2">
          Deep dive into your digital optical ecosystem
        </p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => (
          <div key={metric.label} className="glass-card p-6 relative group overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BarChart3 size={40} className="text-optic-amber" />
             </div>
             
             <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-2">{metric.label}</p>
             <h3 className="text-4xl font-display font-light text-foreground">{metric.value}</h3>
             
             <div className={cn(
               "flex items-center gap-1 text-[10px] font-bold mt-4",
               metric.trend === 'up' ? 'text-optic-amber' : 'text-red-500'
             )}>
               {metric.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
               {metric.change}
             </div>
          </div>
        ))}
      </div>

      {/* Detailed Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
           <div className="flex justify-between items-center mb-8">
              <h4 className="text-xl font-display font-light text-foreground tracking-widest flex items-center gap-2">
                 <Globe size={18} className="text-optic-amber" />
                 Global <span className="opacity-40">Traffic</span>
              </h4>
              <select className="bg-transparent border border-foreground/10 text-[9px] uppercase tracking-widest px-3 py-1 text-foreground/60 outline-none">
                 <option>LAST 30 DAYS</option>
                 <option>LAST 7 DAYS</option>
              </select>
           </div>
           
           <div className="space-y-6">
              {[
                { country: "India", value: 65, color: "bg-optic-amber" },
                { country: "USA", value: 20, color: "bg-foreground/20" },
                { country: "UK", value: 10, color: "bg-foreground/10" },
                { country: "Others", value: 5, color: "bg-foreground/5" }
              ].map((item) => (
                <div key={item.country}>
                   <div className="flex justify-between text-[9px] uppercase tracking-widest mb-2">
                      <span className="text-foreground/60">{item.country}</span>
                      <span className="text-foreground">{item.value}%</span>
                   </div>
                   <div className="h-1 w-full bg-foreground/5 overflow-hidden">
                      <div className={cn("h-full transition-all duration-[2s]", item.color)} style={{ width: `${item.value}%` }} />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="glass-card p-8 flex flex-col">
           <h4 className="text-xl font-display font-light text-foreground tracking-widest flex items-center gap-2 mb-8">
              <Zap size={18} className="text-optic-amber" />
              Velocity <span className="opacity-40">Metrics</span>
           </h4>
           
           <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="bg-foreground/[0.02] border border-foreground/[0.05] p-6 flex flex-col justify-center">
                 <Clock size={20} className="text-foreground/20 mb-3" />
                 <p className="text-[8px] uppercase tracking-widest text-foreground/40">Load Time</p>
                 <p className="text-2xl font-display text-foreground">1.2s</p>
              </div>
              <div className="bg-foreground/[0.02] border border-foreground/[0.05] p-6 flex flex-col justify-center">
                 <TrendingUp size={20} className="text-foreground/20 mb-3" />
                 <p className="text-[8px] uppercase tracking-widest text-foreground/40">Uptime</p>
                 <p className="text-2xl font-display text-foreground">99.9%</p>
              </div>
           </div>
           
           <p className="text-[9px] tracking-[0.1em] text-foreground/30 mt-8 italic">
              * Real-time monitoring active since launch.
           </p>
        </div>
      </div>
    </div>
  );
}
