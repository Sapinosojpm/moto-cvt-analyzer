"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface FloatingThrottleProps {
  throttle: number;
  onThrottleChange: (value: number) => void;
  isRunning: boolean;
}

export default function FloatingThrottle({ throttle, onThrottleChange, isRunning }: FloatingThrottleProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="fixed bottom-6 right-6 z-[100] cursor-grab active:cursor-grabbing"
    >
      <div className={`p-1 rounded-full bg-slate-900/90 shadow-2xl border ${isRunning ? 'border-blue-500 shadow-blue-500/20' : 'border-slate-800'} backdrop-blur-xl transition-all duration-500 group`}>
        <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 bg-slate-950/50 rounded-full border border-slate-800/50">
          <div className="flex flex-col items-center">
            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-tighter">Throttle</span>
            <span className="text-xs md:text-sm font-mono font-bold text-blue-400">{Math.round(throttle)}%</span>
          </div>
          <div className="w-24 md:w-32 py-2">
            <input 
              type="range" min="0" max="100" value={throttle}
              onChange={(e) => onThrottleChange(Number(e.target.value))}
              className="w-full h-1.5 md:h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          {/* Drag Handle */}
          <div className="flex flex-col gap-0.5 opacity-30 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
            <div className="w-1 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
