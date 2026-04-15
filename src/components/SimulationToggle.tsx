interface SimulationToggleProps {
  isSimulating: boolean;
  onToggle: () => void;
}

export default function SimulationToggle({ isSimulating, onToggle }: SimulationToggleProps) {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-gray-300">Simulation Mode:</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isSimulating ? "bg-indigo-600" : "bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isSimulating ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <span className="text-sm text-gray-400">
        {isSimulating ? "Auto" : "Manual"}
      </span>
    </div>
  );
}