"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { CvtData, CvtMetrics, TerrainMode, CvtProfile, PROFILE_CONFIGS, TERRAIN_FACTORS, calculateMetrics, getRecommendation, getStatusColor } from "@/lib/cvtEngine";

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
  riderWeight: number;
  passengerWeight: number;
}

export function useCvtSimulation() {
  const [rpm, setRpm] = useState<number>(1000);
  const [speed, setSpeed] = useState<number>(0);
  const [throttle, setThrottle] = useState<number>(0);
  const [terrain, setTerrain] = useState<TerrainMode>('flat');
  const [profile, setProfile] = useState<CvtProfile>('stock');
  const [riderWeight, setRiderWeight] = useState<number>(60);
  const [passengerWeight, setPassengerWeight] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
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
  const sessionStartRef = useRef<number | null>(null);
  const sessionMetricsRef = useRef<{ scores: number[]; maxRpm: number }>({ scores: [], maxRpm: 0 });
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  const updateMetrics = useCallback((current: CvtData) => {
    const newMetrics = calculateMetrics(current, previousRef.current);
    setMetrics(newMetrics);
    setRecommendation(getRecommendation(newMetrics, profile));
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

    const config = PROFILE_CONFIGS[profile];
    const terrainFactor = TERRAIN_FACTORS[terrain];

    // Physics simulation
    const targetRpm = 1000 + throttle * 70 * config.rpmGain;
    const rpmResponseTime = config.speedDelay * 0.5; // seconds
    const newRpm = rpm + (targetRpm - rpm) * dt / rpmResponseTime;

    // Speed calculation: simplified physics
    const baseAcceleration = (newRpm * 0.05 * config.efficiency) / terrainFactor.acceleration;

    // Weight factor: heavier load reduces acceleration
    const bikeWeight = 140; // kg (motorcycle base weight)
    const totalWeight = bikeWeight + riderWeight + passengerWeight;
    const baseTotalWeight = bikeWeight + 60; // reference weight (bike + 60kg rider)
    const weightFactor = totalWeight / baseTotalWeight;
    const acceleration = baseAcceleration / weightFactor;

    const newSpeed = Math.max(0, speed + acceleration * dt);

    // Clamp RPM
    const clampedRpm = Math.min(config.maxRpm, Math.max(800, newRpm));

    setRpm(Math.round(clampedRpm));
    setSpeed(Math.round(newSpeed * 10) / 10);

    const current: CvtData = { rpm: clampedRpm, speed: newSpeed, throttle };
    updateMetrics(current);
    addToHistory(clampedRpm, newSpeed);
  }, [rpm, speed, throttle, profile, terrain, riderWeight, passengerWeight, updateMetrics, addToHistory]);

  const startSimulation = useCallback(() => {
    setIsRunning(true);
    lastTimeRef.current = performance.now();
    const animate = (currentTime: number) => {
      simulateStep(currentTime);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  }, [simulateStep]);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

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
  }, [sessionActive, metrics.cer, profile, terrain, riderWeight, passengerWeight]);

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
    profile,
    setProfile,
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
  };
}