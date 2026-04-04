"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  Package,
  AlertCircle,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  { id: 1, name: 'Aura Frame', type: 'Blue Light Blocking', price: '₹2,499', stock: 45, status: 'In Stock' },
  { id: 2, name: 'HydraCore Daily', type: 'Contact Lenses', price: '₹1,299', stock: 12, status: 'Low Stock' },
  { id: 3, name: 'Sol Azure', type: 'UV400 Sunglasses', price: '₹3,799', stock: 0, status: 'Out of Stock' },
  { id: 4, name: 'Clarity Monthly', type: 'Extended Wear', price: '₹899', stock: 82, status: 'In Stock' },
  { id: 5, name: 'Reverie Rimless', type: 'Prescription Frame', price: '₹4,199', stock: 24, status: 'In Stock' },
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-display font-light tracking-wider text-foreground">
            Lens <span className="text-optic-amber italic">Collection</span>
          </h2>
          <p className="text-foreground/40 text-[10px] uppercase tracking-[0.4em] mt-2">
            Manage your high-precision inventory
          </p>
        </div>

        <button className="bg-foreground text-background px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-optic-amber hover:text-white transition-all duration-500 flex items-center gap-2 group">
          <Plus size={14} />
          New Product
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-optic-amber transition-colors" size={16} />
          <input
            type="text"
            placeholder="SEARCH INVENTORY..."
            className="w-full bg-foreground/[0.03] border border-foreground/[0.05] py-4 pl-12 pr-4 text-[10px] tracking-[0.2em] text-foreground focus:outline-none focus:border-optic-amber/40 transition-all"
          />
        </div>
        <div className="flex gap-1 glass-card p-1">

          <button
            onClick={() => setViewMode('grid')}
            className={cn("p-3 transition-colors", viewMode === 'grid' ? "bg-foreground/5 text-optic-amber" : "text-foreground/40 hover:text-foreground")}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn("p-3 transition-colors", viewMode === 'list' ? "bg-foreground/5 text-optic-amber" : "text-foreground/40 hover:text-foreground")}
          >
            <List size={16} />
          </button>
        </div>
        <button className="glass-card px-6 py-4 flex items-center gap-2 text-[10px] tracking-[0.2em] transition-all hover:border-optic-amber/40">
          <Filter size={14} />
          FILTER
        </button>
      </div>

      {/* Product List/Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="glass-card p-6 flex flex-col gap-6 group hover:bg-foreground/[0.02] transition-colors border-t-2 border-t-transparent hover:border-t-optic-amber">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-foreground/[0.05] flex items-center justify-center relative overflow-hidden">
                  <Package size={24} className="text-foreground/20 group-hover:text-optic-amber/40 transition-colors" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-optic-amber/0 to-optic-amber/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <button className="p-2 text-foreground/20 hover:text-optic-amber transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div>
                <h3 className="text-lg font-display font-light text-foreground">{product.name}</h3>
                <p className="text-[8px] uppercase tracking-widest text-foreground/40 mb-4">{product.type}</p>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mb-1">Price</p>
                    <p className="text-sm font-medium text-foreground">{product.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mb-1">Quantity</p>
                    <p className="text-sm font-medium text-foreground">{product.stock} Units</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-foreground/5 flex items-center justify-between">
                <span className="text-[8px] uppercase tracking-[0.2em] text-foreground/30">Status</span>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    product.status === 'In Stock' ? 'bg-green-500' : product.status === 'Low Stock' ? 'bg-optic-amber' : 'bg-red-500'
                  )} />
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider",
                    product.status === 'In Stock' ? 'text-foreground/60' : product.status === 'Low Stock' ? 'text-optic-amber' : 'text-red-500'
                  )}>{product.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div key={product.id} className="glass-card p-6 flex items-center gap-8 group hover:bg-foreground/[0.02] transition-colors border-l-2 border-l-transparent hover:border-l-optic-amber">
              {/* Minimal SVG Placehold / Icon */}
              <div className="w-16 h-16 bg-foreground/[0.05] flex items-center justify-center relative overflow-hidden">
                <Package size={24} className="text-foreground/20 group-hover:text-optic-amber/40 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-tr from-optic-amber/0 to-optic-amber/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                <div>
                  <h3 className="text-lg font-display font-light text-foreground">{product.name}</h3>
                  <p className="text-[8px] uppercase tracking-widest text-foreground/40">{product.type}</p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mb-1">Price</p>
                  <p className="text-sm font-medium text-foreground">{product.price}</p>
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      product.status === 'In Stock' ? 'bg-green-500' : product.status === 'Low Stock' ? 'bg-optic-amber' : 'bg-red-500'
                    )} />
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      product.status === 'In Stock' ? 'text-foreground/60' : product.status === 'Low Stock' ? 'text-optic-amber' : 'text-red-500'
                    )}>{product.status}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-foreground/30 mb-1">Quantity</p>
                  <p className="text-sm font-medium text-foreground">{product.stock} Units</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-foreground/20 hover:text-optic-amber transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

      )}
    </div>
  );
}
