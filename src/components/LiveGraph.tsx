"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface HistoryPoint {
  rpm: number;
  speed: number;
  ratio: number;
  timestamp: number;
}

interface LiveGraphProps {
  history: HistoryPoint[];
}

export default function LiveGraph({ history }: LiveGraphProps) {
  const data = history.map((point, index) => ({
    time: index,
    rpm: point.rpm / 10, // Scale RPM to fit on same axis nicely for visualization
    speed: point.speed,
    realRpm: point.rpm
  }));

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRpm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#475569" 
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis yAxisId="left" stroke="#475569" fontSize={10} tickFormatter={(val) => `${val/1000}k`} />
          <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={10} domain={[0, 4]} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '10px' }}
            itemStyle={{ padding: '2px 0' }}
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="rpm" 
            stroke="#3b82f6" 
            fill="url(#colorRpm)" 
            isAnimationActive={false}
            strokeWidth={2}
          />
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="speed" 
            stroke="#2dd4bf" 
            fill="url(#colorSpeed)" 
            isAnimationActive={false}
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ratio"
            stroke="#fbbf24"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            name="CVT Ratio"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}