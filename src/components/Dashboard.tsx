"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RpmGauge from "./RpmGauge";
import SpeedMeter from "./SpeedMeter";
import CvtScoreCard from "./CvtScoreCard";
import ConfigurationSidebar from "./ConfigurationSidebar";
import SimulationControls from "./SimulationControls";
import RecommendationPanel from "./RecommendationPanel";
import HealthScoreMetrics from "./HealthScoreMetrics";
import LiveGraph from "./LiveGraph";
import MetricsCard from "./MetricsCard";
import CommunityView from "./CommunityView";
import TechStackHeader from "./TechStackHeader";
import FloatingThrottle from "./FloatingThrottle";
import { useCvtSimulation } from "@/hooks/useCvtSimulation";
import { BuildSetup } from "@/lib/communityStore";
import { PROFILE_CONFIGS } from "@/lib/cvtEngine";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Dashboard() {
  const {
    rpm,
    speed,
    throttle,
    setThrottle,
    terrain,
    setTerrain,
    windMode,
    setWindMode,
    tirePsi,
    setTirePsi,
    tireSize,
    setTireSize,
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
    centerSpring,
    setCenterSpring,
    clutchSpring,
    setClutchSpring,
    engineCC,
    setEngineCC,
    isRunning,
    isShuttingDown,
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
    electricalLoad,
    setElectricalLoad,
    beltLife,
    rollerLife,
  } = useCvtSimulation();

  const [activeTab, setActiveTab] = useState<'metrics' | 'graph'>('graph');
  const [mainView, setMainView] = useState<'simulation' | 'community'>('simulation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-300 font-sans overflow-hidden">
      {/* Sidebar Configuration */}
      <ConfigurationSidebar
        profile={profile}
        onProfileChange={setProfile}
        terrain={terrain}
        onTerrainChange={setTerrain}
        windMode={windMode}
        onWindModeChange={setWindMode}
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
        tirePsi={tirePsi}
        onTirePsiChange={setTirePsi}
        tireSize={tireSize}
        onTireSizeChange={setTireSize}
        centerSpring={centerSpring}
        onCenterSpringChange={setCenterSpring}
        clutchSpring={clutchSpring}
        onClutchSpringChange={setClutchSpring}
        engineCC={engineCC}
        onEngineCCChange={setEngineCC}
        electricalLoad={electricalLoad}
        onElectricalLoadChange={setElectricalLoad}
        beltLife={beltLife}
        rollerLife={rollerLife}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0b0f19] to-[#0b0f19] dashboard-scrollbar relative">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-6 right-6 z-[60]">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 active:scale-90 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-8 max-w-6xl mx-auto w-full space-y-8"
        >
          
          <motion.header variants={itemVariants} className="text-center space-y-4 pt-10 lg:pt-0">
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-[0.3em] md:tracking-[0.4em] uppercase drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span>MOTOCVT</span> 
              <span className="text-blue-500 bg-blue-500/10 px-4 py-1 rounded-sm border border-blue-500/20 italic">PRO</span> 
              <span className="hidden lg:inline text-slate-500 text-xl font-light tracking-[0.8em]">ANALYZER</span>
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              <TechStackHeader />
              
              {/* Main View Switcher */}
              <div className="flex bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 shadow-2xl">
                <button 
                  onClick={() => setMainView('simulation')}
                  className={`px-8 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${mainView === 'simulation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${mainView === 'simulation' ? 'bg-white animate-pulse' : 'bg-slate-700'}`} />
                  Simulation
                </button>
                <button 
                  onClick={() => setMainView('community')}
                  className={`px-8 py-2 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 ${mainView === 'community' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${mainView === 'community' ? 'bg-white animate-pulse' : 'bg-slate-700'}`} />
                  Community
                </button>
              </div>
            </div>
          </motion.header>

          <AnimatePresence mode="wait">
            {mainView === 'simulation' ? (
              <motion.div 
                key="simulation-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Primary Gauges Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative group transition-all hover:border-slate-700">
                    <RpmGauge rpm={rpm} maxRpm={(PROFILE_CONFIGS[profile] || PROFILE_CONFIGS.stock).maxRpm} />
                    <div className="absolute top-2 right-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Real-time</div>
                  </div>
                  
                  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative group transition-all hover:border-slate-700">
                    <SpeedMeter speed={speed} />
                    <div className="absolute top-2 right-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">KPH/MPH</div>
                  </div>

                  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl relative group transition-all hover:border-slate-700">
                    <CvtScoreCard score={metrics.cvtScore} statusColor={statusColor} />
                    <div className="absolute top-2 right-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Efficiency</div>
                  </div>
                </div>

                {/* Performance Data Tabs Section */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
                    <div className="flex items-center gap-6">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Performance Data</h3>
                      <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                        <button 
                          onClick={() => setActiveTab('metrics')}
                          className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${activeTab === 'metrics' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          Metrics
                        </button>
                        <button 
                          onClick={() => setActiveTab('graph')}
                          className={`px-4 py-1.5 text-[10px] font-bold rounded-md transition-all ${activeTab === 'graph' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                          Live Graph
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-mono text-slate-500">Live Stream Data</span>
                    </div>
                  </div>

                  <div className="p-6 h-[350px]">
                    <AnimatePresence mode="wait">
                      {activeTab === 'metrics' ? (
                        <motion.div 
                          key="metrics"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          <MetricsCard label="ELI" value={metrics.eli} description="Engine Load Index" />
                          <MetricsCard label="CER" value={metrics.cer} description="CVT Efficiency Ratio" />
                          <MetricsCard 
                            label="Ratio" 
                            value={history.length > 0 ? history[history.length - 1].ratio : 3.2} 
                            description="Calculated CVT Gear Ratio" 
                          />
                          <MetricsCard 
                            label="Fuel" 
                            value={history.length > 0 ? history[history.length - 1].fuel : 0} 
                            description="EST. L/100km Consumption" 
                          />
                          <MetricsCard label="Slip %" value={metrics.slip} description="Belt Slippage" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="graph"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="h-full"
                        >
                          <LiveGraph history={history} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Health Score & Recommendation Row */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <HealthScoreMetrics 
                    efficiency={metrics.cvtScore} 
                    slip={metrics.slip} 
                    stability={Math.max(0, Math.min(100, 100 - Math.abs(metrics.ar * 10)))} 
                  />
                  <RecommendationPanel recommendation={recommendation} />
                </div>

                {/* Controls Section */}
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl">
                  <SimulationControls
                    throttle={throttle}
                    onThrottleChange={setThrottle}
                    isRunning={isRunning}
                    isShuttingDown={isShuttingDown}
                    onStartSimulation={startSimulation}
                    onStopSimulation={stopSimulation}
                    sessionActive={sessionActive}
                    onStartSession={startSession}
                    onStopSession={stopSession}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="community-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full min-h-[70vh]"
              >
                <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-2xl">
                  <CommunityView 
                    currentSetup={{
                      profile,
                      flyballConfig,
                      flyballWeights,
                      centerSpring,
                      clutchSpring,
                      engineCC
                    }}
                    onApplySetup={(setup) => {
                      setProfile(setup.profile);
                      setFlyballConfig(setup.flyballConfig);
                      setFlyballWeights(setup.flyballWeights);
                      setCenterSpring(setup.centerSpring);
                      setClutchSpring(setup.clutchSpring);
                      setEngineCC(setup.engineCC);
                      setMainView('simulation');
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Sessions Table */}
          {sessions.length > 0 && (
            <motion.div variants={itemVariants} className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Recent Sessions (Last 5)</h3>
                <button className="text-[10px] font-bold text-blue-500 hover:underline px-2 py-1 bg-blue-500/10 rounded">View More</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-slate-400">
                  <thead className="bg-slate-950/50">
                    <tr className="border-b border-slate-800 text-slate-500 uppercase font-bold tracking-wider">
                      <th className="text-left py-3 px-4">Profile</th>
                      <th className="text-left py-3 px-4">Terrain</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">CVT Score</th>
                      <th className="text-left py-3 px-4">Max RPM</th>
                      <th className="text-left py-3 px-4">Eff.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {sessions.slice(0, 5).map((session) => (
                      <tr key={session.id} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="py-3 px-4 text-slate-300 font-medium tracking-tighter uppercase whitespace-nowrap">
                          {session.profile.replace('_', ' ')}
                        </td>
                        <td className="py-3 px-4 text-[10px] uppercase font-bold text-slate-500">{session.terrain}</td>
                        <td className="py-3 px-4 text-slate-500 font-mono text-[9px]">
                          {new Date(session.startTime).toLocaleDateString('en-GB')} {new Date(session.startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${Number(session.avgCvtScore) > 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {session.avgCvtScore}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-blue-400">{session.maxRpm}</td>
                        <td className="py-3 px-4 text-slate-400 font-bold">{session.efficiency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <style jsx>{`
        .dashboard-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-track {
          background: #0b0f19;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
      <FloatingThrottle throttle={throttle} onThrottleChange={setThrottle} isRunning={isRunning} />
    </div>
  );
}