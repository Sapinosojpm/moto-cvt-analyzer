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
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      {badges.map((badge) => (
        <div 
          key={badge.name} 
          className="flex items-center overflow-hidden rounded-md border border-gray-700 shadow-sm transition-all hover:scale-105"
        >
          <div className={`${badge.color} px-2 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5`}>
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[8px]">
              {badge.icon}
            </span>
            {badge.name}
          </div>
          <div className="bg-gray-800 px-2 py-1 text-[10px] font-mono text-yellow-500 border-l border-gray-700">
            {badge.version}
          </div>
        </div>
      ))}
    </div>
  );
}
