"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CvtData, CvtMetrics, TerrainMode, WindMode, TireSize, CvtProfile, FlyballConfig, CenterSpring, ClutchSpring, EngineCC, PROFILE_CONFIGS, TERRAIN_FACTORS, WIND_FACTORS, TIRE_CONFIGS, PRESET_FLYBALL_CONFIGS, CENTER_SPRING_CONFIGS, CLUTCH_SPRING_CONFIGS, ENGINE_CC_CONFIGS, calculateFlyballModifier, calculateMetrics, getRecommendation, getStatusColor } from "@/lib/cvtEngine";

interface HistoryPoint {
  rpm: number;
  speed: number;
  timestamp: number;
}

interface SessionData {
  id: string;
  startTime: number;
  endTime?: number;
  avgCvtScore: number;
  maxRpm: number;
  efficiency: number;
  profile: CvtProfile;
  terrain: TerrainMode;
  flyballConfig: FlyballConfig;
  flyballWeights: number[];
  riderWeight: number;
  passengerWeight: number;
}

export function useCvtSimulation() {
  const [rpm, setRpm] = useState<number>(1000);
  const [speed, setSpeed] = useState<number>(0);
  const [throttle, setThrottle] = useState<number>(0);
  const [terrain, setTerrain] = useState<TerrainMode>('flat');
  const [windMode, setWindMode] = useState<WindMode>('none');
  const [tirePsi, setTirePsi] = useState<number>(30);
  const [tireSize, setTireSize] = useState<TireSize>('standard');
  const [profile, setProfile] = useState<CvtProfile>('stock');
  const [flyballConfig, setFlyballConfig] = useState<FlyballConfig>('preset');
  const [flyballPreset, setFlyballPreset] = useState<string>('standard');
  const [flyballWeights, setFlyballWeights] = useState<number[]>([9, 9, 9, 9, 9, 9]);
  const [centerSpring, setCenterSpring] = useState<CenterSpring>('standard');
  const [clutchSpring, setClutchSpring] = useState<ClutchSpring>('standard');
  const [engineCC, setEngineCC] = useState<EngineCC>('125cc');
  const [riderWeight, setRiderWeight] = useState<number>(60);
  const [passengerWeight, setPassengerWeight] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isShuttingDown, setIsShuttingDown] = useState<boolean>(false);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<CvtMetrics>({
    eli: 0,
    cer: 0,
    ar: 0,
    slip: 0,
    cvtScore: 100,
  });
  const [recommendation, setRecommendation] = useState<string>("OPTIMAL CVT SETUP");
  const [statusColor, setStatusColor] = useState<string>("green");
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const previousRef = useRef<CvtData>({ rpm: 1000, speed: 0, throttle: 0 });
  const rpmRef = useRef<number>(1000);
  const speedRef = useRef<number>(0);
  const paramsRef = useRef({
    throttle,
    profile,
    terrain,
    flyballConfig,
    flyballPreset,
    flyballWeights,
    centerSpring,
    clutchSpring,
    engineCC,
    riderWeight,
    passengerWeight,
    isShuttingDown,
    windMode,
    tirePsi,
    tireSize
  });
  const sessionStartRef = useRef<number | null>(null);
  const sessionMetricsRef = useRef<{ scores: number[]; maxRpm: number }>({ scores: [], maxRpm: 0 });
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const frameCounterRef = useRef<number>(0);

  // Keep paramsRef in sync with latest state
  useEffect(() => {
    paramsRef.current = {
      throttle,
      profile,
      terrain,
      flyballConfig,
      flyballPreset,
      flyballWeights,
      centerSpring,
      clutchSpring,
      engineCC,
      riderWeight,
      passengerWeight,
      isShuttingDown,
      windMode,
      tirePsi,
      tireSize
    };
  }, [throttle, profile, terrain, flyballConfig, flyballPreset, flyballWeights, centerSpring, clutchSpring, engineCC, riderWeight, passengerWeight, isShuttingDown, windMode, tirePsi, tireSize]);

  const updateMetrics = useCallback((current: CvtData) => {
    const newMetrics = calculateMetrics(current, previousRef.current);
    setMetrics(newMetrics);
    setRecommendation(getRecommendation(newMetrics, profile, current.rpm));
    setStatusColor(getStatusColor(newMetrics.cvtScore));

    if (sessionActive) {
      sessionMetricsRef.current.scores.push(newMetrics.cvtScore);
      sessionMetricsRef.current.maxRpm = Math.max(sessionMetricsRef.current.maxRpm, current.rpm);
    }

    previousRef.current = current;
  }, [profile, sessionActive]);

  const addToHistory = useCallback((rpm: number, speed: number) => {
    setHistory(prev => {
      const newHistory = [...prev, { rpm, speed, timestamp: Date.now() }];
      return newHistory.slice(-50); // Keep last 50 points
    });
  }, []);

  const simulateStep = useCallback((currentTime: number) => {
    const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1); // cap at 0.1s to prevent large jumps
    lastTimeRef.current = currentTime;

    if (dt <= 0) return;

    const params = paramsRef.current;
    
    const config = PROFILE_CONFIGS[params.profile];
    const terrainFactor = TERRAIN_FACTORS[params.terrain];
    const centerSpringConfig = CENTER_SPRING_CONFIGS[params.centerSpring];
    const clutchSpringConfig = CLUTCH_SPRING_CONFIGS[params.clutchSpring];
    const engineConfig = ENGINE_CC_CONFIGS[params.engineCC];
    const windConfig = WIND_FACTORS[params.windMode];
    const tireConfig = TIRE_CONFIGS[params.tireSize];

    // Forced zero throttle if shutting down
    const effectiveThrottle = params.isShuttingDown ? 0 : params.throttle;

    // Calculate flyball modifier
    const currentWeights = params.flyballConfig === 'custom' ? params.flyballWeights : PRESET_FLYBALL_CONFIGS[params.flyballPreset as keyof typeof PRESET_FLYBALL_CONFIGS]?.weights || [12, 12, 12];
    const rpmModifier = calculateFlyballModifier(currentWeights);

    // Physics simulation
    const adjustedRpmGain = config.rpmGain * rpmModifier;
    const targetRpm = 1000 + effectiveThrottle * 70 * adjustedRpmGain;
    const rpmResponseTime = config.speedDelay * 0.5; // seconds
    
    // Smooth RPM transition
    const oldRpm = rpmRef.current;
    const newRpm = oldRpm + (targetRpm - oldRpm) * dt / rpmResponseTime;
    const clampedRpm = Math.min(config.maxRpm, Math.max(800, newRpm));
    rpmRef.current = clampedRpm;

    // Clutch engagement logic: standard CVT engagement around 2200 RPM + offset from springs
    const engagementRpm = 2200 + clutchSpringConfig.engagementOffset;
    let acceleration = 0;
    
    if (clampedRpm > engagementRpm) {
      // Speed calculation: more realistic acceleration
      // Power is roughly proportional to RPM * efficiency * Engine CC
      const powerFactor = (clampedRpm - engagementRpm) / (config.maxRpm - engagementRpm);
      
      // Center spring resistance: harder to move the belt
      // BUFFED: Increased base force from 500 to 650 for realistic 125cc top speeds
      const baseForce = powerFactor * 650 * config.efficiency * engineConfig.powerFactor * (1 / centerSpringConfig.stiffness); 
      
      // Weight factor
      const bikeWeight = 140;
      const totalWeight = bikeWeight + riderWeight + passengerWeight;
      const weightFactor = totalWeight / 200; // normalized to 200kg
      
      // Drag calculation (to limit top speed)
      const currentSpeed = speedRef.current;
      // WIND-ADJUSTED DRAG: multiplied by windConfig.dragMultiplier
      // CALIBRATED: Increased base drag from 0.04 to 0.055 and factored in engine topSpeedFactor
      const airDrag = (0.055 / Math.sqrt(engineConfig.topSpeedFactor)) * currentSpeed * currentSpeed * windConfig.dragMultiplier; 
      // TIRE PSI IMPACT: lower PSI = higher rolling resistance
      const rollingResistance = 5.0 * (30 / params.tirePsi); 
      // Increased gravity impact for realism
      const gravityForce = (params.terrain === 'uphill' ? 120 : params.terrain === 'downhill' ? -120 : 0) * weightFactor;

      // Tire load factor affects acceleration torque requirement
      const netForce = (baseForce * terrainFactor.acceleration / tireConfig.loadFactor) - airDrag - rollingResistance - gravityForce;
      
      // Tire size speed factor affects the final velocity output per rotation
      acceleration = (netForce / weightFactor) * tireConfig.speedFactor;
    } else {
      // Natural deceleration if below engagement and moving
      acceleration = speedRef.current > 0 ? -10.0 : 0;
    }

    // Extra braking force during shutdown to ensure it stops eventually
    if (params.isShuttingDown) {
      acceleration -= 20.0;
    }

    const newSpeed = Math.max(0, speedRef.current + (acceleration * 0.1) * dt); // 0.1 scale to keep units manageable
    speedRef.current = newSpeed;

    // Update UI states
    setRpm(Math.round(clampedRpm));
    setSpeed(Math.round(newSpeed * 10) / 10);

    const current: CvtData = { rpm: clampedRpm, speed: newSpeed, throttle: effectiveThrottle };
    updateMetrics(current);
    
    // Sample history every 5 frames to avoid performance issues
    frameCounterRef.current++;
    if (frameCounterRef.current >= 5) {
      addToHistory(clampedRpm, newSpeed);
      frameCounterRef.current = 0;
    }

    // Auto-stop simulation when spin-down is complete
    if (params.isShuttingDown && clampedRpm < 1050 && newSpeed < 0.2) {
      stopSimulationInternal();
    }
  }, [profile, updateMetrics, addToHistory]);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    setIsShuttingDown(false);
    lastTimeRef.current = performance.now();
    
    const animate = (currentTime: number) => {
      // Use a ref-based check for isRunning equivalent to avoid stale closures
      // or check the current status of shutting down
      simulateStep(currentTime);
      
      // Only schedule next frame if we are still running
      if (animationRef.current !== null) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [simulateStep]);

  const stopSimulationInternal = useCallback(() => {
    setIsRunning(false);
    setIsShuttingDown(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    // Final reset to exact idle values
    setRpm(1000);
    setSpeed(0);
    setThrottle(0);
    rpmRef.current = 1000;
    speedRef.current = 0;
  }, []);

  const stopSimulation = useCallback(() => {
    // If already shutting down, force instant stop (Emergency Stop)
    if (paramsRef.current.isShuttingDown) {
      stopSimulationInternal();
      return;
    }
    // Start spin-down instead of instant kill
    setIsShuttingDown(true);
  }, [stopSimulationInternal]);

  const startSession = useCallback(() => {
    setSessionActive(true);
    sessionStartRef.current = Date.now();
    sessionMetricsRef.current = { scores: [], maxRpm: 0 };
  }, []);

  const stopSession = useCallback(() => {
    if (sessionActive && sessionStartRef.current) {
      const endTime = Date.now();
      const scores = sessionMetricsRef.current.scores;
      const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const efficiency = metrics.cer; // Simplified

      const session: SessionData = {
        id: `session_${endTime}`,
        startTime: sessionStartRef.current,
        endTime,
        avgCvtScore: Math.round(avgScore * 100) / 100,
        maxRpm: sessionMetricsRef.current.maxRpm,
        efficiency: Math.round(efficiency * 100) / 100,
        profile,
        terrain,
        flyballConfig,
        flyballWeights,
        riderWeight,
        passengerWeight,
      };

      setSessions(prev => {
        const newSessions = [session, ...prev.slice(0, 9)]; // Keep last 10
        localStorage.setItem('cvt_sessions', JSON.stringify(newSessions));
        return newSessions;
      });

      setSessionActive(false);
      sessionStartRef.current = null;
    }
  }, [sessionActive, metrics.cer, profile, terrain, flyballConfig, flyballWeights, riderWeight, passengerWeight]);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cvt_sessions');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load sessions');
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
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
    centerSpring,
    setCenterSpring,
    clutchSpring,
    setClutchSpring,
    engineCC,
    setEngineCC,
    riderWeight,
    setRiderWeight,
    passengerWeight,
    setPassengerWeight,
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
  };
}