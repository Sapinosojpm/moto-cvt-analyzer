interface RecommendationBoxProps {
  recommendation: string;
}

export default function RecommendationBox({ recommendation }: RecommendationBoxProps) {
  const getColorClass = (rec: string) => {
    if (rec.includes("OPTIMAL")) return "bg-green-900 border-green-500 text-green-100";
    if (rec.includes("SLIPPING") || rec.includes("HIGH LOAD")) return "bg-red-900 border-red-500 text-red-100";
    return "bg-yellow-900 border-yellow-500 text-yellow-100";
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 ${getColorClass(recommendation)}`}>
      <h3 className="text-sm font-medium uppercase tracking-wide">Recommendation</h3>
      <p className="mt-1 text-lg font-semibold">{recommendation}</p>
    </div>
  );
}