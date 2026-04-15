interface CvtScoreProps {
  score: number;
  statusColor: string;
}

export default function CvtScore({ score, statusColor }: CvtScoreProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">CVT Score</h3>
          <p className="text-3xl font-bold text-white mt-1">{score.toFixed(1)}</p>
        </div>
        <div className={`w-4 h-4 rounded-full ${getColorClass(statusColor)}`}></div>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getColorClass(statusColor)}`}
            style={{ width: `${Math.max(0, Math.min(100, score))}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}