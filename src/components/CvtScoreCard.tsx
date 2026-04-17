"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CvtScoreCardProps {
  score: number;
  statusColor: string;
}

export default function CvtScoreCard({ score, statusColor }: CvtScoreCardProps) {
  const percentage = Math.min(100, Math.max(0, score));
  
  // Determine status text based on color
  const statusInfo = statusColor.includes('green') ? { text: 'OPTIMAL', accent: '#22c55e' } : 
                     statusColor.includes('yellow') ? { text: 'STABLE', accent: '#eab308' } : 
                     { text: 'CRITICAL', accent: '#ef4444' };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[160px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="scoreTrackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="scoreFullGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <filter id="scoreGlowInner">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track - Outer shadow */}
          <path
            d="M 38 102 A 62 62 0 0 1 162 102"
            fill="none"
            stroke="#020617"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Background Track */}
          <path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke="url(#scoreTrackGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Base Gradient Track (Subtle) */}
          <motion.path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke="url(#scoreFullGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 188.4" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 188.4} 188.4` }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            opacity="0.15"
          />

          {/* Active Value Path */}
          <motion.path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke={statusInfo.accent}
            strokeWidth="14"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 188.4" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 188.4} 188.4` }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            className="transition-colors duration-500"
            filter="url(#scoreGlowInner)"
          />

          {/* Center Connector */}
          <path d="M 100 100 L 100 115" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </svg>

        {/* Digital Score Display */}
        <div className="absolute inset-x-0 bottom-2 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-950/80 backdrop-blur-md px-6 py-1.5 rounded-xl border border-slate-800 shadow-2xl flex flex-col items-center"
          >
            <motion.span 
              className="text-4xl font-black text-white tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            >
              {Math.round(score)}
            </motion.span>
            <motion.div 
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-slate-800/50 mt-0.5`}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: statusInfo.accent }}></div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                {statusInfo.text}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}