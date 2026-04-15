interface SpeedMeterProps {
  speed: number;
}

export default function SpeedMeter({ speed }: SpeedMeterProps) {
  const maxSpeed = 200; // km/h
  const percentage = (speed / maxSpeed) * 100;
  const angle = (percentage / 100) * 180 - 90;

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Speed (km/h)</h3>
      <div className="relative w-48 h-24 mx-auto">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          {/* Value arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 188.4} 188.4`}
          />
          {/* Needle */}
          <line
            x1="100"
            y1="80"
            x2={100 + 50 * Math.cos((angle * Math.PI) / 180)}
            y2={80 + 50 * Math.sin((angle * Math.PI) / 180)}
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Center dot */}
          <circle cx="100" cy="80" r="5" fill="#EF4444" />
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
          {speed.toFixed(1)}
        </div>
      </div>
    </div>
  );
}