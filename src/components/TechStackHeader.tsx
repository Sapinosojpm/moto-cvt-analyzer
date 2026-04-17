"use client";

import React from 'react';

const badges = [
  { name: 'Next.js', version: '16.2.3', color: 'bg-black text-white', icon: 'N' },
  { name: 'TypeScript', version: '5.0.0', color: 'bg-blue-600 text-white', icon: 'TS' },
  { name: 'TailwindCSS', version: '4.0', color: 'bg-teal-500 text-white', icon: '≈' },
  { name: 'Recharts', version: '3.8.1', color: 'bg-orange-500 text-white', icon: '📊' },
];

export default function TechStackHeader() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {badges.map((badge) => (
        <div 
          key={badge.name} 
          className="group flex items-center overflow-hidden rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl transition-all hover:border-slate-700 hover:scale-105"
        >
          <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 border-r border-slate-800 group-hover:text-white transition-colors`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.color.split(' ')[0]} animate-pulse`} />
            {badge.name}
          </div>
          <div className="px-3 py-1 text-[9px] font-mono font-bold text-slate-500">
            {badge.version}
          </div>
        </div>
      ))}
    </div>
  );
}
