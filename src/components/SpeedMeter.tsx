"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SpeedMeterProps {
  speed: number;
}

export default function SpeedMeter({ speed }: SpeedMeterProps) {
  const maxSpeed = 160;
  const percentage = Math.min(100, (speed / maxSpeed) * 100);
  const rotation = -90 + (percentage * 1.8);
  
  const ticks = [];
  for (let i = 0; i <= 8; i++) {
    const angle = -90 + (i * 22.5);
    ticks.push({ angle, label: i * 20 });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          <defs>
            <linearGradient id="speedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <filter id="speedGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#1e293b"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress Path */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#speedGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 220" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 220} 220` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            filter="url(#speedGlow)"
          />

          {/* Ticks */}
          {ticks.map((tick, i) => {
            const rad = (tick.angle - 90) * (Math.PI / 180);
            const x1 = 100 + 75 * Math.cos(rad);
            const y1 = 100 + 75 * Math.sin(rad);
            const x2 = 100 + 85 * Math.cos(rad);
            const y2 = 100 + 85 * Math.sin(rad);
            return (
              <React.Fragment key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text
                  x={100 + 95 * Math.cos(rad)}
                  y={100 + 95 * Math.sin(rad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#475569"
                >
                  {tick.label}
                </text>
              </React.Fragment>
            );
          })}

          {/* Needle */}
          <motion.g 
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 50, damping: 10 }}
            style={{ originX: "100px", originY: "100px" }}
          >
            <line
              x1="100" y1="100" x2="100" y2="40"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#speedGlow)"
            />
          </motion.g>
        </svg>

        {/* Digital Display */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-1">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg"
          >
            {Math.round(speed)}
          </motion.div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest -mt-1">KM/H</div>
        </div>
      </div>
    </div>
  );
}