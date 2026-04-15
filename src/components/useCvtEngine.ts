"use client";

import { useState, useEffect, useRef } from "react";
import { CvtData, CvtMetrics, calculateMetrics, getRecommendation, getStatusColor } from "@/lib/cvtCalculations";

interface HistoryPoint {
  rpm: number;
  speed: number;
  timestamp: number;
}

export function useCvtEngine() {
  const [rpm, setRpm] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [throttle, setThrottle] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<CvtMetrics>({
    eli: 0,
    cer: 0,
    ar: 0,
    slip: 0,
    cvtScore: 100,
  });
  const [recommendation, setRecommendation] = useState<string>("CVT OPTIMAL");
  const [statusColor, setStatusColor] = useState<string>("green");
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const previousRef = useRef<CvtData | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateMetrics = (current: CvtData) => {
    const newMetrics = calculateMetrics(current, previousRef.current || undefined);
    setMetrics(newMetrics);
    setRecommendation(getRecommendation(newMetrics));
    setStatusColor(getStatusColor(newMetrics.cvtScore));
    previousRef.current = current;
  };

  const addToHistory = (rpm: number, speed: number) => {
    setHistory(prev => {
      const newHistory = [...prev, { rpm, speed, timestamp: Date.now() }];
      return newHistory.slice(-20); // Keep last 20 points
    });
  };

  useEffect(() => {
    const current: CvtData = { rpm, speed, throttle };
    updateMetrics(current);
    addToHistory(rpm, speed);
  }, [rpm, speed, throttle]);

  const startSimulation = () => {
    setIsSimulating(true);
    intervalRef.current = setInterval(() => {
      // Simulate realistic motorcycle behavior
      const baseRpm = 2000 + Math.random() * 6000;
      const baseSpeed = Math.max(0, (baseRpm - 2000) / 100 + Math.random() * 20 - 10);
      setRpm(Math.round(baseRpm));
      setSpeed(Math.round(Math.max(0, baseSpeed)));
      setThrottle(Math.round(20 + Math.random() * 80));
    }, 1000);
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    rpm,
    speed,
    throttle,
    setRpm,
    setSpeed,
    setThrottle,
    isSimulating,
    setIsSimulating,
    startSimulation,
    stopSimulation,
    metrics,
    recommendation,
    statusColor,
    history,
  };
}