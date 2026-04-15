import { CvtProfile, TerrainMode, PROFILE_CONFIGS } from "@/lib/cvtEngine";

interface ProfileSelectorProps {
  profile: CvtProfile;
  onProfileChange: (profile: CvtProfile) => void;
  terrain: TerrainMode;
  onTerrainChange: (terrain: TerrainMode) => void;
}

export default function ProfileSelector({
  profile,
  onProfileChange,
  terrain,
  onTerrainChange
}: ProfileSelectorProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">CVT Profile</label>
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
        <label className="block text-sm font-medium text-gray-300 mb-2">Terrain Mode</label>
        <select
          value={terrain}
          onChange={(e) => onTerrainChange(e.target.value as TerrainMode)}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="flat">Flat - Normal conditions</option>
          <option value="uphill">Uphill - Increased load</option>
          <option value="downhill">Downhill - Assisted acceleration</option>
        </select>
      </div>
    </div>
  );
}