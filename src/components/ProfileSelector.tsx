import { CvtProfile, TerrainMode, WindMode, TireSize, FlyballConfig, CenterSpring, ClutchSpring, EngineCC, PROFILE_CONFIGS, PRESET_FLYBALL_CONFIGS, CENTER_SPRING_CONFIGS, CLUTCH_SPRING_CONFIGS, ENGINE_CC_CONFIGS, WIND_FACTORS, TIRE_CONFIGS } from "@/lib/cvtEngine";

interface ProfileSelectorProps {
  profile: CvtProfile;
  onProfileChange: (profile: CvtProfile) => void;
  terrain: TerrainMode;
  onTerrainChange: (terrain: TerrainMode) => void;
  windMode: WindMode;
  onWindModeChange: (windMode: WindMode) => void;
  flyballConfig: FlyballConfig;
  onFlyballConfigChange: (config: FlyballConfig) => void;
  flyballPreset: string;
  onFlyballPresetChange: (preset: string) => void;
  flyballWeights: number[];
  onFlyballWeightsChange: (weights: number[]) => void;
  tirePsi: number;
  onTirePsiChange: (psi: number) => void;
  tireSize: TireSize;
  onTireSizeChange: (size: TireSize) => void;
  riderWeight: number;
  onRiderWeightChange: (weight: number) => void;
  passengerWeight: number;
  onPassengerWeightChange: (weight: number) => void;
  centerSpring: CenterSpring;
  onCenterSpringChange: (spring: CenterSpring) => void;
  clutchSpring: ClutchSpring;
  onClutchSpringChange: (spring: ClutchSpring) => void;
  engineCC: EngineCC;
  onEngineCCChange: (cc: EngineCC) => void;
}

export default function ProfileSelector({
  profile,
  onProfileChange,
  terrain,
  onTerrainChange,
  windMode,
  onWindModeChange,
  flyballConfig,
  onFlyballConfigChange,
  flyballPreset,
  onFlyballPresetChange,
  flyballWeights,
  onFlyballWeightsChange,
  riderWeight,
  onRiderWeightChange,
  passengerWeight,
  onPassengerWeightChange,
  tirePsi,
  onTirePsiChange,
  tireSize,
  onTireSizeChange,
  centerSpring,
  onCenterSpringChange,
  clutchSpring,
  onClutchSpringChange,
  engineCC,
  onEngineCCChange
}: ProfileSelectorProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Engine Displacement (CC)</label>
        <select
          value={engineCC}
          onChange={(e) => onEngineCCChange(e.target.value as EngineCC)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(ENGINE_CC_CONFIGS).map(([key, config]) => (
            <option key={key} value={key}>
              {key} - {config.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Variator Design (Ramp Angle)</label>
        <select
          value={profile}
          onChange={(e) => onProfileChange(e.target.value as CvtProfile)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
        >
          {Object.entries(PROFILE_CONFIGS).map(([key, config]) => (
            <option key={key} value={key}>
              {key.replace('_', ' ').toUpperCase()} - {config.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Flyball / Roller Weights</label>
        <select
          value={flyballConfig}
          onChange={(e) => onFlyballConfigChange(e.target.value as FlyballConfig)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 mb-2"
        >
          <option value="preset">Preset Configurations</option>
          <option value="custom">Custom (6 Flyballs)</option>
        </select>

        {flyballConfig === 'preset' ? (
          <select
            value={flyballPreset}
            onChange={(e) => onFlyballPresetChange(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(PRESET_FLYBALL_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)} - {config.description}
              </option>
            ))}
          </select>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {flyballWeights.map((weight, index) => (
              <div key={index}>
                <label className="block text-xs text-gray-400 mb-1">FB {index + 1} (g)</label>
                <input
                  type="number"
                  min="5"
                  max="20"
                  value={weight}
                  onChange={(e) => {
                    const newWeights = [...flyballWeights];
                    newWeights[index] = Number(e.target.value);
                    onFlyballWeightsChange(newWeights);
                  }}
                  className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Center Spring</label>
          <select
            value={centerSpring}
            onChange={(e) => onCenterSpringChange(e.target.value as CenterSpring)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(CENTER_SPRING_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>
                {key.toUpperCase()} - {config.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Clutch Springs</label>
          <select
            value={clutchSpring}
            onChange={(e) => onClutchSpringChange(e.target.value as ClutchSpring)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(CLUTCH_SPRING_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>
                {key.toUpperCase()} - {config.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Terrain Mode</label>
          <select
            value={terrain}
            onChange={(e) => onTerrainChange(e.target.value as TerrainMode)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="flat">Flat - Normal</option>
            <option value="uphill">Uphill - Climbing</option>
            <option value="downhill">Downhill - Descent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Wind Simulation</label>
          <select
            value={windMode}
            onChange={(e) => onWindModeChange(e.target.value as WindMode)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(WIND_FACTORS).map(([key, config]) => (
              <option key={key} value={key}>
                {config.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Rider Weight: {riderWeight} kg
        </label>
        <input
          type="range"
          min="40"
          max="120"
          value={riderWeight}
          onChange={(e) => onRiderWeightChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Passenger Weight: {passengerWeight} kg (0 = no passenger)
        </label>
        <input
          type="range"
          min="0"
          max="120"
          step="5"
          value={passengerWeight}
          onChange={(e) => onPassengerWeightChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="pt-4 border-t border-gray-700">
        <label className="block text-sm font-semibold text-blue-400 mb-4 uppercase">Tire & Friction Settings</label>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tire Size / Profile</label>
            <select
              value={tireSize}
              onChange={(e) => onTireSizeChange(e.target.value as TireSize)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(TIRE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.description.split(' - ')[0]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tire PSI (Air Pressure)</label>
            <div className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-center text-blue-400 font-bold">
              {tirePsi} PSI
            </div>
          </div>
        </div>

        <input
          type="range"
          min="15"
          max="45"
          step="1"
          value={tirePsi}
          onChange={(e) => onTirePsiChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-2"
        />
        <div className="flex justify-between text-[10px] text-gray-500 uppercase px-1">
          <span>Soft (Grip)</span>
          <span>Standard (30)</span>
          <span>Hard (Speed)</span>
        </div>
      </div>
    </div>
  );
}