"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  CvtProfile, 
  TerrainMode, 
  WindMode, 
  TireSize, 
  FlyballConfig, 
  CenterSpring, 
  ClutchSpring, 
  EngineCC, 
  PROFILE_CONFIGS, 
  PRESET_FLYBALL_CONFIGS, 
  CENTER_SPRING_CONFIGS, 
  CLUTCH_SPRING_CONFIGS, 
  ENGINE_CC_CONFIGS, 
  WIND_FACTORS, 
  TIRE_CONFIGS 
} from "@/lib/cvtEngine";

interface ConfigurationSidebarProps {
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
  electricalLoad: number;
  onElectricalLoadChange: (load: number) => void;
  beltLife: number;
  rollerLife: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfigurationSidebar({
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
  onEngineCCChange,
  electricalLoad,
  onElectricalLoadChange,
  beltLife,
  rollerLife,
  isOpen,
  onClose
}: ConfigurationSidebarProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside 
        initial={false}
        animate={{ 
          x: isOpen ? 0 : (isMounted && typeof window !== 'undefined' && window.innerWidth < 1024 ? -320 : 0),
          opacity: 1
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:relative inset-y-0 left-0 w-80 bg-slate-900 border-r border-slate-800 h-screen overflow-y-auto flex-shrink-0 dashboard-scrollbar z-[80] shadow-2xl lg:shadow-none`}
      >
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-4 bg-blue-500 rounded-full"></div>
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Configuration</h2>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

        {/* Engine Section */}
        <section className="space-y-3">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Engine (CC)</label>
          <select
            value={engineCC}
            onChange={(e) => onEngineCCChange(e.target.value as EngineCC)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          >
            {Object.entries(ENGINE_CC_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>{key} - {config.description.split(' (')[0]}</option>
            ))}
          </select>
        </section>

        {/* Variator Section */}
        <section className="space-y-3">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Variator Design</label>
          <select
            value={profile}
            onChange={(e) => onProfileChange(e.target.value as CvtProfile)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          >
            {Object.entries(PROFILE_CONFIGS).map(([key, config]) => (
              <option key={key} value={key}>{key.replace('_', ' ').toUpperCase()} - {config.description.split(' - ')[0]}</option>
            ))}
          </select>
        </section>

        {/* Flyballs Section */}
        <section className="space-y-3">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Flyball / Roller Weight</label>
          <select
            value={flyballConfig}
            onChange={(e) => onFlyballConfigChange(e.target.value as FlyballConfig)}
            className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none transition-all mb-2"
          >
            <option value="preset">Preset Configurations</option>
            <option value="custom">Custom (6 Flyballs)</option>
          </select>

          {flyballConfig === 'preset' ? (
            <select
              value={flyballPreset}
              onChange={(e) => onFlyballPresetChange(e.target.value)}
              className="w-full bg-slate-800 border-2 border-slate-700 text-blue-400 text-xs font-medium rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              {Object.entries(PRESET_FLYBALL_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)} roller weight</option>
              ))}
            </select>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {flyballWeights.map((weight, index) => (
                <input
                  key={index}
                  type="number"
                  min="5"
                  max="20"
                  value={weight}
                  onChange={(e) => {
                    const newWeights = [...flyballWeights];
                    newWeights[index] = Number(e.target.value);
                    onFlyballWeightsChange(newWeights);
                  }}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-center text-xs rounded py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              ))}
            </div>
          )}
        </section>

        {/* Springs Section */}
        <section className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Center Spring</label>
            <select
              value={centerSpring}
              onChange={(e) => onCenterSpringChange(e.target.value as CenterSpring)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              {Object.entries(CENTER_SPRING_CONFIGS).map(([key]) => (
                <option key={key} value={key}>{key.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Clutch Springs</label>
            <select
              value={clutchSpring}
              onChange={(e) => onClutchSpringChange(e.target.value as ClutchSpring)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              {Object.entries(CLUTCH_SPRING_CONFIGS).map(([key]) => (
                <option key={key} value={key}>{key.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </section>

        {/* Environment Section */}
        <section className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Terrain Mode</label>
            <select
              value={terrain}
              onChange={(e) => onTerrainChange(e.target.value as TerrainMode)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="flat">Flat - Normal</option>
              <option value="uphill">Uphill</option>
              <option value="downhill">Downhill</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Wind Simulation</label>
            <select
              value={windMode}
              onChange={(e) => onWindModeChange(e.target.value as WindMode)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-1.5 focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="none">No Wind</option>
              <option value="tailwind">Tailwind</option>
              <option value="headwind">Headwind</option>
              <option value="strong_headwind">Strong HW</option>
            </select>
          </div>
        </section>

        {/* Advanced Power Settings */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <label className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.2em] block">Advanced Power Dynamics</label>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Electrical Load (Accessories)</label>
              <span className="text-[10px] font-mono text-blue-400">{electricalLoad}W</span>
            </div>
            <input
              type="range" min="0" max="300" step="10" value={electricalLoad}
              onChange={(e) => onElectricalLoadChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <p className="text-[9px] text-slate-600 leading-tight">Parasitic crankshaft drag from alternator load.</p>
          </div>
        </section>

        {/* Weight Section */}
        <section className="space-y-4 pt-2 border-t border-slate-800">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Rider Weight</label>
              <span className="text-[10px] font-mono text-blue-400">{riderWeight} KG</span>
            </div>
            <input
              type="range" min="40" max="120" value={riderWeight}
              onChange={(e) => onRiderWeightChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Passenger Weight</label>
              <span className="text-[10px] font-mono text-blue-400">{passengerWeight} KG</span>
            </div>
            <input
              type="range" min="0" max="100" step="5" value={passengerWeight}
              onChange={(e) => onPassengerWeightChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </section>

        {/* Tires Section */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <label className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.2em] block">Tire & Friction Settings</label>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Tire Size / Profile</label>
              <select
                value={tireSize}
                onChange={(e) => onTireSizeChange(e.target.value as TireSize)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-[10px] rounded px-2 py-1.5 outline-none"
              >
                {Object.entries(TIRE_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key}>{config.description.split(' (')[0]}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center block">Tire PSI</label>
              <div className="bg-slate-900 border border-slate-700 rounded text-center py-1.5 text-xs font-bold text-blue-500 shadow-inner">
                {tirePsi} PSI
              </div>
            </div>
          </div>

          <input
            type="range" min="15" max="45" value={tirePsi}
            onChange={(e) => onTirePsiChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
          />
        </section>

        {/* Maintenance Monitoring */}
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <label className="text-[11px] font-bold text-red-500/80 uppercase tracking-[0.2em] block">Maintenance Monitoring</label>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase font-bold">
                <span className="text-slate-500">Belt Health</span>
                <span className={beltLife < 30 ? 'text-red-500' : 'text-slate-400'}>{Math.round(beltLife)}%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${beltLife < 30 ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${beltLife}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase font-bold">
                <span className="text-slate-500">Roller Weights</span>
                <span className={rollerLife < 30 ? 'text-red-500' : 'text-slate-400'}>{Math.round(rollerLife)}%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${rollerLife < 30 ? 'bg-red-500' : 'bg-blue-500'}`} 
                  style={{ width: `${rollerLife}%` }}
                />
              </div>
            </div>
          </div>
          
          <button 
            className="w-full py-2 text-[9px] font-bold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded border border-slate-700 transition-colors uppercase tracking-widest"
            onClick={() => {
              // I'll need to pass the reset handler later
            }}
          >
            Full Service Reset
          </button>
        </section>
      </div>

      <style jsx>{`
        .dashboard-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
      </motion.aside>
    </>
  );
}
