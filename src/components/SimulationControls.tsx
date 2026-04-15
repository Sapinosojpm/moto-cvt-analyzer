interface SimulationControlsProps {
  throttle: number;
  onThrottleChange: (throttle: number) => void;
  isRunning: boolean;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  sessionActive: boolean;
  onStartSession: () => void;
  onStopSession: () => void;
}

export default function SimulationControls({
  throttle,
  onThrottleChange,
  isRunning,
  onStartSimulation,
  onStopSimulation,
  sessionActive,
  onStartSession,
  onStopSession,
}: SimulationControlsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Throttle: {throttle}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={throttle}
          onChange={(e) => onThrottleChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={isRunning ? onStopSimulation : onStartSimulation}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            isRunning
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {isRunning ? "Stop Simulation" : "Start Simulation"}
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={sessionActive ? onStopSession : onStartSession}
          disabled={!isRunning}
          className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
            sessionActive
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          } ${!isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {sessionActive ? "Stop Session" : "Start Session"}
        </button>
      </div>

      {sessionActive && (
        <div className="text-center text-green-400 font-medium">
          Session Recording Active
        </div>
      )}
    </div>
  );
}