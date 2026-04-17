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

export default function ConfigurationSidebar(props: ConfigurationSidebarProps) {
  const { isOpen, onClose } = props;

  return (
    <>
      {/* Mobile Sidebar & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
            />
            
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#0B0F1A] border-r border-slate-800 h-screen overflow-y-auto z-[110] shadow-2xl lg:hidden flex flex-col dashboard-scrollbar"
            >
              <SidebarContent {...props} isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Static Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-slate-900/50 border-r border-slate-800 h-screen overflow-y-auto flex-shrink-0 dashboard-scrollbar relative z-10">
        <SidebarContent {...props} isMobile={false} />
      </aside>

      <style jsx global>{`
        .dashboard-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .dashboard-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </>
  );
}

function SidebarContent({ isMobile, ...props }: any) {
  const {
    profile, onProfileChange, terrain, onTerrainChange, windMode, onWindModeChange,
    flyballConfig, onFlyballConfigChange, flyballPreset, onFlyballPresetChange,
    flyballWeights, onFlyballWeightsChange, riderWeight, onRiderWeightChange,
    passengerWeight, onPassengerWeightChange, tirePsi, onTirePsiChange,
    tireSize, onTireSizeChange, centerSpring, onCenterSpringChange,
    clutchSpring, onClutchSpringChange, engineCC, onEngineCCChange,
    electricalLoad, onElectricalLoadChange, beltLife, rollerLife, onClose
  } = props;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
          <h2 className="text-xs font-black text-white uppercase tracking-[0.25em]">Configuration</h2>
        </div>
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Engine Section */}
      <section className="space-y-4">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Engine (CC)</label>
        <select
          value={engineCC}
          onChange={(e) => onEngineCCChange(e.target.value as EngineCC)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer"
        >
          {Object.entries(ENGINE_CC_CONFIGS).map(([key, config]) => (
            <option key={key} value={key}>{key} - {config.description.split(' (')[0]}</option>
          ))}
        </select>
      </section>

      {/* Variator Section */}
      <section className="space-y-4">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Variator Design</label>
        <select
          value={profile}
          onChange={(e) => onProfileChange(e.target.value as CvtProfile)}
          className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer"
        >
          {Object.entries(PROFILE_CONFIGS).map(([key, config]) => (
            <option key={key} value={key}>{key.replace('_', ' ').toUpperCase()} - {config.description.split(' - ')[0]}</option>
          ))}
        </select>
      </section>

      {/* Flyballs Section */}
      <section className="space-y-4">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Flyball / Roller Weight</label>
        <div className="space-y-3">
          <select
            value={flyballConfig}
            onChange={(e) => onFlyballConfigChange(e.target.value as FlyballConfig)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          >
            <option value="preset">Preset Configurations</option>
            <option value="custom">Custom (6 Flyballs)</option>
          </select>

          {flyballConfig === 'preset' ? (
            <select
              value={flyballPreset}
              onChange={(e) => onFlyballPresetChange(e.target.value)}
              className="w-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all cursor-pointer"
            >
              {Object.entries(PRESET_FLYBALL_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)} roller weight</option>
              ))}
            </select>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {flyballWeights.map((weight: number, index: number) => (
                <div key={index} className="space-y-1">
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
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-center text-xs font-mono rounded-xl py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Springs Section */}
      <section className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Center Spring</label>
          <select
            value={centerSpring}
            onChange={(e) => onCenterSpringChange(e.target.value as CenterSpring)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-bold rounded-xl px-2 py-2.5 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
          >
            {Object.entries(CENTER_SPRING_CONFIGS).map(([key]) => (
              <option key={key} value={key}>{key.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">Clutch Springs</label>
          <select
            value={clutchSpring}
            onChange={(e) => onClutchSpringChange(e.target.value as ClutchSpring)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-bold rounded-xl px-2 py-2.5 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
          >
            {Object.entries(CLUTCH_SPRING_CONFIGS).map(([key]) => (
              <option key={key} value={key}>{key.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </section>

      {/* Environment Section */}
      <section className="bg-slate-950/50 rounded-2xl border border-slate-800/50 p-4 space-y-4">
        <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest block">Environment Simulation</label>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <span className="text-[9px] text-slate-500 font-bold uppercase">Terrain</span>
            <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
              {(['flat', 'uphill', 'downhill'] as TerrainMode[]).map((t) => (
                <button
                  key={t}
                  onClick={() => onTerrainChange(t)}
                  className={`flex-1 py-1.5 text-[9px] font-black uppercase rounded-lg transition-all ${terrain === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[9px] text-slate-500 font-bold uppercase">Wind Load</span>
            <select
              value={windMode}
              onChange={(e) => onWindModeChange(e.target.value as WindMode)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-[10px] font-bold rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="none">No Wind</option>
              <option value="tailwind">Tailwind</option>
              <option value="headwind">Headwind</option>
              <option value="strong_headwind">Strong HW</option>
            </select>
          </div>
        </div>
      </section>

      {/* Advanced Dynamics Section */}
      <section className="space-y-6 pt-2">
        <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest block">Physical Dynamics</label>
        
        {/* Electrical Load */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Electrical Drag</span>
            <span className="text-[10px] font-mono font-bold text-purple-400">{electricalLoad}W</span>
          </div>
          <input
            type="range" min="0" max="300" step="10" value={electricalLoad}
            onChange={(e) => onElectricalLoadChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Weights */}
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase">Rider Weight</span>
              <span className="text-[10px] font-mono font-bold text-blue-400">{riderWeight} KG</span>
            </div>
            <input
              type="range" min="40" max="120" value={riderWeight}
              onChange={(e) => onRiderWeightChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase">Passenger</span>
              <span className="text-[10px] font-mono font-bold text-blue-400">{passengerWeight} KG</span>
            </div>
            <input
              type="range" min="0" max="100" step="5" value={passengerWeight}
              onChange={(e) => onPassengerWeightChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Tire Settings */}
      <section className="space-y-4 pt-2">
        <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest block">Tire Dynamics</label>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <span className="text-[9px] text-slate-500 font-bold uppercase">Tire Profile</span>
            <select
              value={tireSize}
              onChange={(e) => onTireSizeChange(e.target.value as TireSize)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-[10px] font-bold rounded-xl px-3 py-2.5 outline-none cursor-pointer"
            >
              {Object.entries(TIRE_CONFIGS).map(([key, config]) => (
                <option key={key} value={key}>{config.description.split(' (')[0]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase">Tire PSI</span>
              <span className="text-[10px] font-mono font-bold text-teal-400">{tirePsi} PSI</span>
            </div>
            <input
              type="range" min="15" max="45" value={tirePsi}
              onChange={(e) => onTirePsiChange(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>
        </div>
      </section>

      {/* Maintenance Status */}
      <section className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-4">
        <label className="text-[10px] font-black text-red-500 uppercase tracking-widest block">Maintenance Status</label>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-black uppercase">
              <span className="text-slate-500">Belt Health</span>
              <span className={beltLife < 30 ? 'text-red-500' : 'text-slate-400'}>{Math.round(beltLife)}%</span>
            </div>
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${beltLife < 30 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-600'}`} 
                style={{ width: `${beltLife}%` }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-black uppercase">
              <span className="text-slate-500">Roller Life</span>
              <span className={rollerLife < 30 ? 'text-red-500' : 'text-slate-400'}>{Math.round(rollerLife)}%</span>
            </div>
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${rollerLife < 30 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-600'}`} 
                style={{ width: `${rollerLife}%` }}
              />
            </div>
          </div>
        </div>
        
        <button 
          className="w-full py-2.5 text-[9px] font-black text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all uppercase tracking-[0.2em]"
          onClick={() => {
            // Full service reset implementation
          }}
        >
          Factory Service Reset
        </button>
      </section>
    </div>
  );
}
