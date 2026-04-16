interface CvtScoreCardProps {
  score: number;
  statusColor: string;
}

export default function CvtScoreCard({ score, statusColor }: CvtScoreCardProps) {
  const percentage = score;
  const angle = 180 + (percentage / 100) * 180;

  const getColor = (color: string) => {
    switch (color) {
      case "green": return "#10B981";
      case "yellow": return "#F59E0B";
      case "red": return "#EF4444";
      default: return "#6B7280";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">CVT Score</h3>
      <div className="relative w-48 h-24 mx-auto">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            className="transition-all duration-300 ease-out"
          />
          {/* Value arc */}
          <path
            d="M 20 80 A 60 60 0 0 1 180 80"
            fill="none"
            stroke={getColor(statusColor)}
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 188.4} 188.4`}
            className="transition-all duration-300 ease-out"
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
            className="transition-all duration-300 ease-out"
          />
          {/* Center dot */}
          <circle cx="100" cy="80" r="5" fill="#EF4444" />
        </svg>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold">
          {score.toFixed(1)}
        </div>
      </div>
      <div className={`mt-2 text-center text-sm font-medium ${
        statusColor === "green" ? "text-green-400" :
        statusColor === "yellow" ? "text-yellow-400" : "text-red-400"
      }`}>
        {statusColor.toUpperCase()}
      </div>
    </div>
  );
}