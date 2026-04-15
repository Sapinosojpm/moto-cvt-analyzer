export interface CvtData {
  rpm: number;
  speed: number;
  throttle: number;
}

export interface CvtMetrics {
  eli: number;
  cer: number;
  ar: number;
  slip: number;
  cvtScore: number;
}

export type TerrainMode = 'flat' | 'uphill' | 'downhill';

export type CvtProfile = 'stock' | 'light_rollers' | 'heavy_rollers' | 'racing_setup';

export interface ProfileConfig {
  rpmGain: number; // Multiplier for RPM increase
  speedDelay: number; // Delay factor for speed response
  slipFactor: number; // Base slip probability
  efficiency: number; // Base efficiency
  maxRpm: number;
  description: string;
}

export const PROFILE_CONFIGS: Record<CvtProfile, ProfileConfig> = {
  stock: {
    rpmGain: 1.0,
    speedDelay: 1.0,
    slipFactor: 1.0,
    efficiency: 1.0,
    maxRpm: 8000,
    description: 'Standard CVT setup'
  },
  light_rollers: {
    rpmGain: 1.2,
    speedDelay: 0.8,
    slipFactor: 1.3,
    efficiency: 0.9,
    maxRpm: 9000,
    description: 'Faster RPM response, less stable at high speeds'
  },
  heavy_rollers: {
    rpmGain: 0.8,
    speedDelay: 1.3,
    slipFactor: 0.7,
    efficiency: 1.1,
    maxRpm: 7000,
    description: 'Slower RPM, better cruising efficiency'
  },
  racing_setup: {
    rpmGain: 1.5,
    speedDelay: 0.6,
    slipFactor: 1.5,
    efficiency: 0.8,
    maxRpm: 10000,
    description: 'Maximum performance, high slip risk'
  }
};

export const TERRAIN_FACTORS: Record<TerrainMode, { acceleration: number; load: number }> = {
  flat: { acceleration: 1.0, load: 1.0 },
  uphill: { acceleration: 0.6, load: 1.5 },
  downhill: { acceleration: 1.4, load: 0.8 }
};

export function calculateMetrics(current: CvtData, previous?: CvtData): CvtMetrics {
  const eli = current.rpm / (current.speed + 1);
  const cer = (current.speed / current.rpm) * 1000;
  const ar = previous ? (current.speed - previous.speed) / (current.rpm - previous.rpm || 1) : 0;
  const slip = previous ? (current.rpm - previous.rpm) / (current.speed - previous.speed + 1) : 0;

  // CVT Score: 40% Efficiency (CER), 30% Slip (inverted), 30% Acceleration stability (AR)
  const efficiencyScore = Math.min(100, cer / 10); // Normalize CER
  const slipScore = Math.max(0, 100 - Math.abs(slip) * 10);
  const stabilityScore = Math.max(0, 100 - Math.abs(ar) * 50);
  const cvtScore = (0.4 * efficiencyScore) + (0.3 * slipScore) + (0.3 * stabilityScore);

  return {
    eli: Math.round(eli * 100) / 100,
    cer: Math.round(cer * 100) / 100,
    ar: Math.round(ar * 100) / 100,
    slip: Math.round(slip * 100) / 100,
    cvtScore: Math.max(0, Math.min(100, Math.round(cvtScore * 100) / 100)),
  };
}

export function getRecommendation(metrics: CvtMetrics, profile: CvtProfile): string {
  const thresholds = {
    slipHigh: 15,
    eliHigh: 25,
    arHigh: 10,
    arLow: -5,
  };

  if (metrics.slip > thresholds.slipHigh) {
    return "CVT SLIPPING: Check belt or clutch - consider " + (profile === 'light_rollers' ? 'heavier rollers' : 'maintenance');
  } else if (metrics.eli > thresholds.eliHigh) {
    return "HIGH LOAD: Heavy rider or uphill - " + (profile === 'heavy_rollers' ? 'optimal' : 'consider heavy rollers');
  } else if (metrics.ar > thresholds.arHigh) {
    return "LIGHT ROLLERS DETECTED: Fast response but unstable - good for racing";
  } else if (metrics.ar < thresholds.arLow) {
    return "HEAVY ROLLERS DETECTED: Slow response but efficient cruising";
  } else if (metrics.cvtScore > 80) {
    return "OPTIMAL CVT SETUP: Performance and efficiency balanced";
  } else {
    return "SUBOPTIMAL: Adjust profile or check system";
  }
}

export function getStatusColor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}