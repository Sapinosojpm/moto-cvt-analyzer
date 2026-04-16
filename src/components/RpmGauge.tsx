"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RpmGaugeProps {
  rpm: number;
  maxRpm: number;
}

export default function RpmGauge({ rpm, maxRpm }: RpmGaugeProps) {
  const percentage = Math.min(100, (rpm / maxRpm) * 100);
  const rotation = -90 + (percentage * 1.8); // -90 to 90 degrees for semi-circle
  
  // Create ticks
  const ticks = [];
  for (let i = 0; i <= 10; i++) {
    const angle = -90 + (i * 18);
    ticks.push(angle);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[140px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 120" className="w-full h-full">
          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id="rpmGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#3b82f6" />
              <stop offset="90%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="glow">
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
            stroke="url(#rpmGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 220" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 220} 220` }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            filter="url(#glow)"
          />

          {/* Ticks */}
          {ticks.map((angle, i) => {
            const rad = (angle - 90) * (Math.PI / 180);
            const x1 = 100 + 75 * Math.cos(rad);
            const y1 = 100 + 75 * Math.sin(rad);
            const x2 = 100 + 85 * Math.cos(rad);
            const y2 = 100 + 85 * Math.sin(rad);
            const isRedZone = i >= 8;
            return (
              <React.Fragment key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isRedZone ? '#ef4444' : '#64748b'}
                  strokeWidth="2"
                />
                <text
                  x={100 + 95 * Math.cos(rad)}
                  y={100 + 95 * Math.sin(rad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill={isRedZone ? '#ef4444' : '#475569'}
                >
                  {i}
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
              filter="url(#glow)"
            />
          </motion.g>
        </svg>

        {/* Digital Display */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-1">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-lg"
          >
            {Math.round(rpm).toLocaleString()}
          </motion.div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest -mt-1">RPM</div>
        </div>
      </div>
    </div>
  );
}