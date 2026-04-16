"use client";

import React from 'react';

interface MetricsCardProps {
  label: string;
  value: number;
  unit?: string;
  description: string;
  className?: string;
}

export default function MetricsCard({ label, value, unit, description, className = "" }: MetricsCardProps) {
  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-xl p-4 group relative shadow-inner ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</h3>
        <div className="relative group/tip cursor-help">
          <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-slate-800 text-[8px] font-bold text-blue-500 hover:bg-blue-600 hover:text-white transition-colors">
            INFO
          </div>
          {/* Tooltip Content */}
          <div className="absolute bottom-full right-0 mb-2 w-48 scale-0 rounded-lg bg-slate-900 border border-slate-700 p-2 text-[10px] leading-relaxed text-slate-400 shadow-2xl transition-all group-hover/tip:scale-100 z-50 origin-bottom-right">
            {description}
          </div>
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg">
          {typeof value === 'number' ? value.toFixed(2) : value}
        </span>
        {unit && <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{unit}</span>}
      </div>
    </div>
  );
}