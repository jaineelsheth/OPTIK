"use client";

import { 
  Type, 
  Image as ImageIcon, 
  MessageSquare, 
  Layout, 
  Edit3,
  Move
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: 'hero', name: 'Hero Section', icon: Type, status: 'Active' },
  { id: 'marquee', name: 'Marquee Text', icon: Move, status: 'Active' },
  { id: 'story', name: 'Brand Story', icon: MessageSquare, status: 'Draft' },
  { id: 'features', name: 'Technical Specs', icon: Layout, status: 'Active' },
];

export default function ContentPage() {
  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-4xl font-display font-light tracking-wider text-foreground">
          Brand <span className="text-optic-amber italic">Narration</span>
        </h2>
        <p className="text-foreground/40 text-[10px] uppercase tracking-[0.4em] mt-2">
          Control the cinematic aesthetic of your storefront
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {sections.map((section) => (
          <button key={section.id} className="glass-card p-6 flex flex-col items-center text-center group hover:border-optic-amber/40 transition-all">
             <div className="w-12 h-12 bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-optic-amber/10 transition-colors">
                <section.icon size={20} className="text-foreground/40 group-hover:text-optic-amber transition-colors" />
             </div>
             <h4 className="text-xs uppercase tracking-[0.2em] text-foreground font-medium mb-1">{section.name}</h4>
             <p className="text-[8px] text-foreground/30 uppercase tracking-widest">{section.status}</p>
          </button>
        ))}
      </div>

      <div className="glass-card">
        <div className="p-8 border-b border-foreground/5 flex justify-between items-center">
           <h4 className="text-xl font-display font-light text-foreground tracking-widest">Editor <span className="opacity-40">Workspace</span></h4>
           <div className="flex gap-4">
              <button className="text-[9px] uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors">Discard</button>
              <button className="bg-foreground text-background px-6 py-2 text-[9px] font-bold uppercase tracking-widest hover:bg-optic-amber hover:text-white transition-all">Save Changes</button>
           </div>
        </div>
        
        <div className="p-8 space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block">Marquee Items</label>
              <div className="flex flex-wrap gap-2">
                 {[
                   'Blue Light Protection','UV Shield Technology','Premium Contact Lenses',
                   'All-Day Comfort','Anti-Reflective Coating','Crystal Clarity',
                   'Optician Approved','Free Shipping','HydraCore™ Technology','30-Day Returns',
                 ].map(item => (
                   <span key={item} className="bg-foreground/5 border border-foreground/10 px-4 py-2 text-[10px] tracking-widest text-foreground/70 flex items-center gap-2 group transition-all hover:border-optic-amber/40">
                      {item}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-optic-amber"><Edit3 size={10} /></button>
                   </span>
                 ))}
                 <button className="border border-foreground/10 border-dashed px-4 py-2 text-[10px] tracking-widest text-foreground/30 hover:text-optic-amber hover:border-optic-amber/40 transition-all">+ ADD ITEM</button>
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-foreground/40 block">Brand Story Steps</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                   { heading:'See the world clearly.', sub:'Contact lenses engineered for the modern eye.' },
                   { heading:'Worn by thousands daily.',  sub:'Trusted by professionals, athletes, and creators.' },
                   { heading:'Science meets clarity.',   sub:'HydraCore™ silicone hydrogel. 98% moisture retention.' },
                   { heading:'Vision beyond ordinary.',  sub:'From −12.00 to +8.00. Precision for every eye.' },
                 ].map((step, idx) => (
                   <div key={idx} className="bg-foreground/[0.02] border border-foreground/[0.05] p-6 space-y-4 relative group hover:border-foreground/10 transition-colors">
                      <div className="flex justify-between items-center">
                         <span className="text-[9px] uppercase tracking-widest text-optic-amber font-bold">Step 0{idx + 1}</span>
                         <Move size={14} className="text-foreground/10 cursor-move" />
                      </div>
                      <input 
                        className="w-full bg-transparent border-b border-foreground/10 py-2 text-lg font-display font-light text-foreground outline-none focus:border-optic-amber/40 transition-colors"
                        defaultValue={step.heading}
                      />
                      <textarea 
                        className="w-full bg-transparent text-[10px] text-foreground/50 leading-relaxed outline-none resize-none h-16 uppercase tracking-wider"
                        defaultValue={step.sub}
                      />
                      <div className="absolute top-0 right-0 w-[2px] h-0 bg-optic-amber group-hover:h-full transition-all duration-700" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
