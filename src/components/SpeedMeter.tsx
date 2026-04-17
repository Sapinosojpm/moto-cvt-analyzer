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
      <div className="relative w-full h-[160px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(45,212,191,0.2)]">
          <defs>
            <linearGradient id="speedTrackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#134e4a" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
            <linearGradient id="speedProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
            <filter id="speedGlowInner">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track - Outer Shadow */}
          <path
            d="M 28 102 A 72 72 0 0 1 172 102"
            fill="none"
            stroke="#020617"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Background Track */}
          <path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#speedTrackGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress Path */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#speedProgressGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 220" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 220} 220` }}
            transition={{ type: "spring", stiffness: 45, damping: 12 }}
            filter="url(#speedGlowInner)"
          />

          {/* Ticks and Labels */}
          {ticks.map((tick, i) => {
            const rad = (tick.angle - 90) * (Math.PI / 180);
            const x1 = 100 + 72 * Math.cos(rad);
            const y1 = 100 + 72 * Math.sin(rad);
            const x2 = 100 + 82 * Math.cos(rad);
            const y2 = 100 + 82 * Math.sin(rad);
            const isActive = speed >= tick.label;

            return (
              <React.Fragment key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isActive ? '#2dd4bf' : '#334155'}
                  strokeWidth={isActive ? "2.5" : "1.5"}
                  className="transition-colors duration-300"
                />
                <text
                  x={100 + 94 * Math.cos(rad)}
                  y={100 + 94 * Math.sin(rad)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="7"
                  fontWeight="900"
                  fill={isActive ? '#f8fafc' : '#475569'}
                  className="transition-colors duration-300 font-sans tracking-tighter"
                >
                  {tick.label}
                </text>
              </React.Fragment>
            );
          })}

          {/* Center Hub */}
          <circle cx="100" cy="100" r="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="100" cy="100" r="3" fill="#2dd4bf" filter="url(#speedGlowInner)" />

          {/* Needle - Single Path with Gradient for stability */}
          <defs>
            <linearGradient id="speedNeedleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="20%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          <motion.line
            x1="100" y1="100" x2="100" y2="38"
            stroke="url(#speedNeedleGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#speedGlowInner)"
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{ originX: "100px", originY: "100px" }}
          />
        </svg>

        {/* Digital Display Container */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center bg-slate-950/80 backdrop-blur-md px-5 py-1 rounded-lg border border-slate-800 shadow-xl"
          >
            <motion.span 
              className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(45,212,191,0.3)]"
            >
              {Math.round(speed)}
            </motion.span>
            <div className="text-[9px] font-black text-teal-400 uppercase tracking-[0.2em] -mt-1">
              KPH <span className="text-slate-600">PRO</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
