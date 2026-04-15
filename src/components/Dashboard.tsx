"use client";

import RpmGauge from "./RpmGauge";
import SpeedMeter from "./SpeedMeter";
import CvtScoreCard from "./CvtScoreCard";
import ProfileSelector from "./ProfileSelector";
import SimulationControls from "./SimulationControls";
import RecommendationPanel from "./RecommendationPanel";
import LiveGraph from "./LiveGraph";
import MetricsCard from "./MetricsCard";
import { useCvtSimulation } from "@/hooks/useCvtSimulation";
import { PROFILE_CONFIGS } from "@/lib/cvtEngine";

export default function Dashboard() {
  const {
    rpm,
    speed,
    throttle,
    setThrottle,
    terrain,
    setTerrain,
    profile,
    setProfile,
    flyballConfig,
    setFlyballConfig,
    flyballPreset,
    setFlyballPreset,
    flyballWeights,
    setFlyballWeights,
    riderWeight,
    setRiderWeight,
    passengerWeight,
    setPassengerWeight,
    isRunning,
    startSimulation,
    stopSimulation,
    sessionActive,
    startSession,
    stopSession,
    metrics,
    recommendation,
    statusColor,
    history,
    sessions,
  } = useCvtSimulation();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MotoCVT Pro Analyzer</h1>
          <p className="text-gray-400">Professional CVT simulation and tuning intelligence system</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ProfileSelector
            profile={profile}
            onProfileChange={setProfile}
            terrain={terrain}
            onTerrainChange={setTerrain}
            flyballConfig={flyballConfig}
            onFlyballConfigChange={setFlyballConfig}
            flyballPreset={flyballPreset}
            onFlyballPresetChange={setFlyballPreset}
            flyballWeights={flyballWeights}
            onFlyballWeightsChange={setFlyballWeights}
            riderWeight={riderWeight}
            onRiderWeightChange={setRiderWeight}
            passengerWeight={passengerWeight}
            onPassengerWeightChange={setPassengerWeight}
          />
          <SimulationControls
            throttle={throttle}
            onThrottleChange={setThrottle}
            isRunning={isRunning}
            onStartSimulation={startSimulation}
            onStopSimulation={stopSimulation}
            sessionActive={sessionActive}
            onStartSession={startSession}
            onStopSession={stopSession}
          />
          <RecommendationPanel recommendation={recommendation} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <RpmGauge rpm={rpm} maxRpm={PROFILE_CONFIGS[profile].maxRpm} />
          <SpeedMeter speed={speed} />
          <CvtScoreCard score={metrics.cvtScore} statusColor={statusColor} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MetricsCard label="ELI" value={metrics.eli} />
          <MetricsCard label="CER" value={metrics.cer} />
          <MetricsCard label="AR" value={metrics.ar} />
          <MetricsCard label="Slip Index" value={metrics.slip} />
        </div>

        <LiveGraph history={history} />

        {sessions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Sessions</h3>
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Profile</th>
                      <th className="text-left py-2">Terrain</th>
                      <th className="text-left py-2">Flyballs</th>
                      <th className="text-left py-2">Rider (kg)</th>
                      <th className="text-left py-2">Passenger (kg)</th>
                      <th className="text-left py-2">Avg CVT Score</th>
                      <th className="text-left py-2">Max RPM</th>
                      <th className="text-left py-2">Efficiency</th>
                      <th className="text-left py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.slice(0, 5).map((session) => (
                      <tr key={session.id} className="border-b border-gray-700">
                        <td className="py-2">{session.profile.replace('_', ' ').toUpperCase()}</td>
                        <td className="py-2">{session.terrain}</td>
                        <td className="py-2 text-xs">
                          {session.flyballConfig === 'custom'
                            ? session.flyballWeights.join('/')
                            : session.flyballWeights.slice(0, 3).join('/') + (session.flyballWeights.length > 3 ? '...' : '')}
                        </td>
                        <td className="py-2">{session.riderWeight}</td>
                        <td className="py-2">{session.passengerWeight}</td>
                        <td className="py-2">{session.avgCvtScore}</td>
                        <td className="py-2">{session.maxRpm}</td>
                        <td className="py-2">{session.efficiency}</td>
                        <td className="py-2">
                          {session.endTime && session.startTime
                            ? `${Math.round((session.endTime - session.startTime) / 1000)}s`
                            : 'Ongoing'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}