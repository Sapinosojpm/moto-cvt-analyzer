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
    ticks.push({ angle, label: i });
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[160px] flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 130" className="w-full h-full drop-shadow-[0_0_15px_rgba(30,41,59,0.5)]">
          {/* Definitions for Gradients and Filters */}
          <defs>
            <linearGradient id="rpmTrackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="rpmProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="60%" stopColor="#60a5fa" />
              <stop offset="90%" stopColor="#ef4444" />
            </linearGradient>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="1" result="blur" />
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
            stroke="url(#rpmTrackGradient)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Progress Path */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="url(#rpmProgressGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 220" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 220} 220` }}
            transition={{ type: "spring", stiffness: 45, damping: 12 }}
            filter="url(#gaugeGlow)"
          />

          {/* Ticks and Labels */}
          {ticks.map((tick, i) => {
            const rad = (tick.angle - 90) * (Math.PI / 180);
            const x1 = 100 + 72 * Math.cos(rad);
            const y1 = 100 + 72 * Math.sin(rad);
            const x2 = 100 + 82 * Math.cos(rad);
            const y2 = 100 + 82 * Math.sin(rad);
            const isRedZone = tick.label >= 8;
            const isActive = percentage >= (tick.label * 10);

            return (
              <React.Fragment key={i}>
                <line
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isActive ? (isRedZone ? '#ef4444' : '#60a5fa') : '#334155'}
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
                  fill={isActive ? (isRedZone ? '#ef4444' : '#f8fafc') : '#475569'}
                  className="transition-colors duration-300 font-sans tracking-tighter"
                >
                  {tick.label}
                </text>
              </React.Fragment>
            );
          })}

          {/* Center Hub */}
          <circle cx="100" cy="100" r="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="100" cy="100" r="3" fill="#3b82f6" filter="url(#needleGlow)" />

          {/* Needle - Single Path with Gradient to prevent detachment */}
          <defs>
            <linearGradient id="needleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="20%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          
          <motion.line
            x1="100" y1="100" x2="100" y2="38"
            stroke="url(#needleGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#needleGlow)"
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
            className="flex flex-col items-center bg-slate-950/80 backdrop-blur-md px-4 py-1 rounded-lg border border-slate-800 shadow-xl"
          >
            <motion.span 
              className="text-3xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              {Math.round(rpm).toLocaleString()}
            </motion.span>
            <div className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] -mt-1">
              RPM <span className="text-slate-600">×1000</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
