"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HistoryPoint {
  rpm: number;
  speed: number;
  timestamp: number;
}

interface CvtGraphProps {
  history: HistoryPoint[];
}

export default function CvtGraph({ history }: CvtGraphProps) {
  const data = history.map((point, index) => ({
    index,
    rpm: point.rpm,
    speed: point.speed,
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">RPM vs Speed Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="index" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Line type="monotone" dataKey="rpm" stroke="#3B82F6" strokeWidth={2} name="RPM" />
          <Line type="monotone" dataKey="speed" stroke="#10B981" strokeWidth={2} name="Speed (km/h)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}