"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MiniGaugeProps {
  label: string;
  value: number;
  color: string;
  unit?: string;
}

function MiniGauge({ label, value, color, unit = "" }: MiniGaugeProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="6"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ type: "spring", stiffness: 40, damping: 12 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={value}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-bold text-white tabular-nums"
          >
            {Math.round(value)}{unit}
          </motion.span>
        </div>
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

interface HealthScoreMetricsProps {
  efficiency: number;
  slip: number;
  stability: number;
}

export default function HealthScoreMetrics({ efficiency, slip, stability }: HealthScoreMetricsProps) {
  // Normalize values for display (Assuming efficiency and stability are 0-100, slip is 0-X)
  const normSlip = Math.max(0, 100 - (slip * 5)); // Higher slip = lower health

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl"
    >
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 text-center">CVT Health Score</h3>
      <div className="flex justify-around items-center">
        <MiniGauge label="Efficiency" value={efficiency} color="#3b82f6" unit="%" />
        <MiniGauge label="Slip" value={normSlip} color="#f97316" unit="%" />
        <MiniGauge label="Stability" value={stability} color="#22c55e" unit="%" />
      </div>
    </motion.div>
  );
}
