interface MetricsCardProps {
  label: string;
  value: number;
  unit?: string;
  description: string;
  className?: string;
}

export default function MetricsCard({ label, value, unit, description, className = "" }: MetricsCardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 shadow-lg group relative ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{label}</h3>
        <div className="relative cursor-help">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-700 text-[10px] font-bold text-blue-400 hover:bg-blue-600 hover:text-white transition-colors">
            !
          </div>
          {/* Tooltip Content */}
          <div className="absolute bottom-full right-0 mb-2 w-48 scale-0 rounded-md bg-gray-900 p-2 text-xs text-gray-300 shadow-xl transition-all group-hover:scale-100 z-50 origin-bottom-right border border-gray-700">
            {description}
          </div>
        </div>
      </div>
      <p className="text-2xl font-bold text-white mt-1">
        {value.toFixed(2)}
        {unit && <span className="text-lg ml-1">{unit}</span>}
      </p>
    </div>
  );
}