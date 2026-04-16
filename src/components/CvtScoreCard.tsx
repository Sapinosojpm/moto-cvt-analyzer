"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface CvtScoreCardProps {
  score: number;
  statusColor: string;
}

export default function CvtScoreCard({ score, statusColor }: CvtScoreCardProps) {
  const percentage = Math.min(100, score);
  
  // Determine status text based on color
  const statusText = statusColor === 'text-green-500' ? 'GREEN' : 
                     statusColor === 'text-yellow-500' ? 'STABLE' : 'CRITICAL';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <filter id="scoreGlow">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Progress Path (Base Gradient) */}
          <motion.path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="15"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 188.4" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 188.4} 188.4` }}
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
            opacity="0.2"
          />

          {/* Value Path (Solid with Status Color) */}
          <motion.path
            d="M 40 100 A 60 60 0 0 1 160 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="15"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 188.4" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 188.4} 188.4` }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            className={`transition-colors duration-500 ${statusColor}`}
            filter="url(#scoreGlow)"
          />
        </svg>

        {/* Value Display */}
        <div className="absolute inset-x-0 bottom-4 flex flex-col items-center justify-center">
          <motion.span 
            key={score}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-black text-white tabular-nums drop-shadow-md"
          >
            {Math.round(score)}
          </motion.span>
          <motion.span 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className={`text-[10px] font-black uppercase tracking-[0.2em] ${statusColor}`}
          >
            {statusText}
          </motion.span>
        </div>
      </div>
    </div>
  );
}