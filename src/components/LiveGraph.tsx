"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface HistoryPoint {
  rpm: number;
  speed: number;
  timestamp: number;
}

interface LiveGraphProps {
  history: HistoryPoint[];
}

export default function LiveGraph({ history }: LiveGraphProps) {
  const data = history.map((point, index) => ({
    time: index,
    rpm: point.rpm,
    speed: point.speed,
  }));

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Live Performance Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#F9FAFB",
            }}
          />
          <Line
            type="monotone"
            dataKey="rpm"
            stroke="#3B82F6"
            strokeWidth={2}
            name="RPM"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#10B981"
            strokeWidth={2}
            name="Speed (km/h)"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}