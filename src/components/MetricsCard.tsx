interface MetricsCardProps {
  label: string;
  value: number;
  unit?: string;
  className?: string;
}

export default function MetricsCard({ label, value, unit, className = "" }: MetricsCardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-lg ${className}`}>
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{label}</h3>
      <p className="text-2xl font-bold text-white mt-1">
        {value.toFixed(2)}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
}