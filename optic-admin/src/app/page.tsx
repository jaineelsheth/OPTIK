import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Eye,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: "$124,592", change: "+12.5%", icon: TrendingUp },
  { label: "New Customers", value: "842", change: "+4.3%", icon: Users },
  { label: "Total Orders", value: "3,120", change: "+8.1%", icon: ShoppingBag },
  { label: "Site Visitors", value: "48,291", change: "+15.2%", icon: Eye },
];

export default function Dashboard() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-light tracking-wider text-foreground">
            Dashboard <span className="text-optic-amber italic">Overview</span>
          </h2>
          <p className="text-foreground/40 text-[10px] uppercase tracking-[0.4em] mt-2">
            Welcome back to the Optic control center
          </p>
        </div>
        
        <button className="bg-foreground text-background px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-optic-amber hover:text-white transition-all duration-500 flex items-center gap-2 group">
          <Plus size={14} />
          Add Product
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-500 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-foreground/5 rounded-none group-hover:bg-optic-amber/10 transition-colors duration-500">
                <stat.icon size={20} className="text-foreground/60 group-hover:text-optic-amber transition-colors duration-500" />
              </div>
              <span className="text-[10px] font-bold text-optic-amber flex items-center gap-1">
                {stat.change}
                <ArrowUpRight size={10} />
              </span>
            </div>
            
            <h3 className="text-3xl text-foreground font-light tracking-tight mb-1">{stat.value}</h3>
            <p className="text-[9px] uppercase tracking-[0.3em] text-foreground/30">{stat.label}</p>
            
            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-8 h-[1px] bg-foreground/10 group-hover:bg-optic-amber/40 transition-colors" />
            <div className="absolute top-0 right-0 w-[1px] h-8 bg-foreground/10 group-hover:bg-optic-amber/40 transition-colors" />
          </div>
        ))}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-xl font-display font-light text-foreground tracking-widest">Performance <span className="opacity-40">Analytics</span></h4>
            <div className="flex gap-4 text-[9px] uppercase tracking-[0.2em] text-foreground/40">
              <span className="text-optic-amber">Monthly</span>
              <span>Weekly</span>
            </div>
          </div>
          
          <div className="h-[300px] w-full border-b border-l border-foreground/5 relative flex items-end px-4 gap-4">
            {/* Simple CSS bar chart placeholder */}
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((h, i) => (
              <div 
                key={i} 
                className="flex-1 bg-foreground/5 hover:bg-optic-amber transition-all duration-1000 group relative"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] text-foreground/0 group-hover:text-foreground/60 transition-colors">
                    {h}%
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h4 className="text-xl font-display font-light text-foreground tracking-widest mb-8">Stock <span className="opacity-40">Alerts</span></h4>
          <div className="space-y-6">
            {[
              { name: "Nebula Glass", color: "Amber", stock: 12 },
              { name: "Void Frame", color: "Matte Black", stock: 5 },
              { name: "Prism Lens", color: "Iridescent", stock: 0 },
              { name: "Orbit Classic", color: "Silver", stock: 24 }
            ].map((item) => (
              <div key={item.name} className="flex justify-between items-center border-b border-foreground/5 pb-4">
                <div>
                  <p className="text-[10px] text-foreground uppercase tracking-[0.15em]">{item.name}</p>
                  <p className="text-[8px] text-foreground/30 uppercase tracking-[0.1em]">{item.color}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-[10px] font-bold",
                    item.stock === 0 ? "text-red-500" : item.stock < 10 ? "text-optic-amber" : "text-foreground/40"
                  )}>
                    {item.stock} Unit{item.stock !== 1 ? 's' : ''}
                  </p>
                  <p className="text-[8px] text-foreground/20 uppercase tracking-[0.1em]">Remaining</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
