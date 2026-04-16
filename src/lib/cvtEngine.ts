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
export type WindMode = 'tailwind' | 'none' | 'headwind' | 'strong_headwind';
export type TireSize = 'low_profile' | 'standard' | 'oversize';

export type CvtProfile = 'stock' | 'aggressive_ramp' | 'touring_ramp' | 'racing_setup';

export type CenterSpring = 'standard' | '1000rpm' | '1500rpm' | '2000rpm';

export type ClutchSpring = 'standard' | '1000rpm' | '1500rpm' | '2000rpm';

export type EngineCC = '110cc' | '125cc' | '150cc' | '160cc' | '200cc+';

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
    description: 'Balanced OEM-style variator ramp'
  },
  aggressive_ramp: {
    rpmGain: 1.25,
    speedDelay: 0.8,
    slipFactor: 1.3,
    efficiency: 0.9,
    maxRpm: 9000,
    description: 'High-angle ramp for fast acceleration'
  },
  touring_ramp: {
    rpmGain: 0.8,
    speedDelay: 1.3,
    slipFactor: 0.7,
    efficiency: 1.15,
    maxRpm: 7500,
    description: 'Low-angle ramp for fuel efficiency and top speed'
  },
  racing_setup: {
    rpmGain: 1.6,
    speedDelay: 0.6,
    slipFactor: 1.6,
    efficiency: 0.8,
    maxRpm: 10500,
    description: 'Maximum performance, requires frequent maintenance'
  }
};

export type FlyballConfig = 'preset' | 'custom';

export const TERRAIN_FACTORS: Record<TerrainMode, { acceleration: number; load: number }> = {
  flat: { acceleration: 1.0, load: 1.0 },
  uphill: { acceleration: 0.6, load: 1.5 },
  downhill: { acceleration: 1.4, load: 0.8 }
};

export const WIND_FACTORS: Record<WindMode, { dragMultiplier: number; description: string }> = {
  tailwind: { dragMultiplier: 0.5, description: 'Tailwind - Tinutulak ka ng hangin' },
  none: { dragMultiplier: 1.0, description: 'No Wind - Walang hangin' },
  headwind: { dragMultiplier: 2.0, description: 'Light Headwind - Nasasalsal ng bahagya' },
  strong_headwind: { dragMultiplier: 4.5, description: 'Strong Headwind - Sagwil sa dulo' }
};

export const TIRE_CONFIGS: Record<TireSize, { speedFactor: number; loadFactor: number; description: string }> = {
  low_profile: { speedFactor: 0.9, loadFactor: 0.85, description: 'Low Profile (Smaller) - Snappy acceleration, lower top speed' },
  standard: { speedFactor: 1.0, loadFactor: 1.0, description: 'Standard (OEM) - Balanced performance' },
  oversize: { speedFactor: 1.15, loadFactor: 1.3, description: 'Oversize (Larger) - Heavy acceleration, higher top speed potential' }
};

export const PRESET_FLYBALL_CONFIGS = {
  standard: { weights: [9, 9, 9, 9, 9, 9], description: '6x 9g rollers - Balanced default' },
  light: { weights: [6, 6, 6, 6, 6, 6], description: '6x 6g rollers - High RPM response' },
  mixed: { weights: [9, 9, 6, 6, 9, 9], description: '4x 9g + 2x 6g rollers - Mixed setup' },
  heavy: { weights: [12, 12, 12, 12, 12, 12], description: '6x 12g rollers - Low RPM cruising' }
};

export const CENTER_SPRING_CONFIGS: Record<CenterSpring, { stiffness: number; description: string }> = {
  standard: { stiffness: 1.0, description: 'Standard OEM center spring' },
  '1000rpm': { stiffness: 1.1, description: '+1000 RPM - better acceleration' },
  '1500rpm': { stiffness: 1.25, description: '+1500 RPM - aggressive shifting' },
  '2000rpm': { stiffness: 1.4, description: '+2000 RPM - racing/climb setup' }
};

export const CLUTCH_SPRING_CONFIGS: Record<ClutchSpring, { engagementOffset: number; description: string }> = {
  standard: { engagementOffset: 0, description: 'Standard engagement (~2200 RPM)' },
  '1000rpm': { engagementOffset: 500, description: 'Snappier takeoff (~2700 RPM)' },
  '1500rpm': { engagementOffset: 1000, description: 'Aggressive takeoff (~3200 RPM)' },
  '2000rpm': { engagementOffset: 1500, description: 'Racing launch (~3700 RPM)' }
};

export const ENGINE_CC_CONFIGS: Record<EngineCC, { powerFactor: number; topSpeedFactor: number; description: string }> = {
  '110cc': { powerFactor: 0.8, topSpeedFactor: 0.85, description: 'Entry level (e.g. Beat, Scoopy)' },
  '125cc': { powerFactor: 1.0, topSpeedFactor: 1.0, description: 'Standard (e.g. Click 125)' },
  '150cc': { powerFactor: 1.25, topSpeedFactor: 1.15, description: 'Sport (e.g. Click 150, PCX 150)' },
  '160cc': { powerFactor: 1.4, topSpeedFactor: 1.25, description: 'High Performance (e.g. ADV 160, NMAX)' },
  '200cc+': { powerFactor: 1.8, topSpeedFactor: 1.5, description: 'Modified / Maxi (e.g. XMAX, Bore-up)' }
};

export function calculateFlyballModifier(weights: number[]): number {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const avgWeight = totalWeight / weights.length;
  // Heavier flyballs = lower RPM modifier (later engagement)
  const baseAvg = 9; // 9g as base
  return Math.max(0.8, Math.min(1.2, 1.2 - (avgWeight - baseAvg) * 0.02));
}



export function calculateMetrics(current: CvtData, previous?: CvtData): CvtMetrics {
  const eli = current.rpm / (current.speed + 1);
  const cer = (current.speed / current.rpm) * 1000;
  const ar = previous ? (current.speed - previous.speed) / (current.rpm - previous.rpm || 1) : 0;
  const slip = previous ? (current.rpm - previous.rpm) / (current.speed - previous.speed + 1) : 0;

  // CVT Score: 50% Efficiency (CER), 25% Slip (inverted), 25% Acceleration stability (AR)
  const efficiencyScore = Math.min(100, (cer / 15) * 100); // More generous CER scaling
  const slipScore = Math.max(0, 100 - Math.abs(slip) * 10);
  const stabilityScore = Math.max(0, 100 - Math.abs(ar) * 50);
  const cvtScore = (0.5 * efficiencyScore) + (0.25 * slipScore) + (0.25 * stabilityScore);

  return {
    eli: Math.round(eli * 100) / 100,
    cer: Math.round(cer * 100) / 100,
    ar: Math.round(ar * 100) / 100,
    slip: current.speed > 0 ? Math.round(slip * 100) / 100 : 0, // Ignore slip while stationary
    cvtScore: Math.max(0, Math.min(100, Math.round(cvtScore * 100) / 100)),
  };
}

export function getRecommendation(metrics: CvtMetrics, profile: CvtProfile, rpm: number): string {
  const thresholds = {
    slipHigh: 25,
    eliHigh: 120, // Increased from 30 to 120 (more realistic for high RPM)
    arHigh: 15,
    arLow: -5,
  };

  const isEngaging = rpm > 1500 && rpm < 3500;

  if (metrics.slip > thresholds.slipHigh && !isEngaging) {
    return "CVT SLIPPING: Low friction detected. " + (profile === 'light_rollers' ? 'Add heavier rollers for better grip' : 'Check belt wear');
  } else if (isEngaging && metrics.slip > 0) {
    return "CLUTCH ENGAGING: Maintaining steady throttle for smooth takeoff";
  } else if (metrics.eli > thresholds.eliHigh) {
    return "HIGH LOAD: Suggesting " + (profile === 'heavy_rollers' ? 'current heavy setup' : 'switching to heavy rollers') + " to improve ratio";
  } else if (metrics.ar > thresholds.arHigh) {
    return "RACING SETUP: Fast response, high RPM gain - monitoring stability";
  } else if (metrics.cvtScore > 75) {
    return "SYSTEM HARMONIZED: Excellent tuning for current conditions";
  } else {
    return "Tuning Note: Adjust weights to balance ELI vs CER";
  }
}

export function getStatusColor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}