export interface CvtData {
  rpm: number;
  speed: number;
  throttle?: number;
}

export interface CvtMetrics {
  eli: number;
  cer: number;
  ar: number;
  slip: number;
  cvtScore: number;
}

export function calculateMetrics(current: CvtData, previous?: CvtData): CvtMetrics {
  const eli = current.rpm / (current.speed + 1);
  const cer = (current.speed / current.rpm) * 1000;
  const ar = previous ? (current.speed - previous.speed) / (current.rpm - previous.rpm || 1) : 0;
  const slip = previous ? (current.rpm - previous.rpm) / (current.speed - previous.speed + 1) : 0;

  // Instability placeholder: using CER as instability for now
  const instability = cer;

  const cvtScore = 100 - (0.5 * eli + 0.3 * slip + 0.2 * instability);

  return {
    eli: Math.round(eli * 100) / 100,
    cer: Math.round(cer * 100) / 100,
    ar: Math.round(ar * 100) / 100,
    slip: Math.round(slip * 100) / 100,
    cvtScore: Math.max(0, Math.min(100, Math.round(cvtScore * 100) / 100)),
  };
}

export function getRecommendation(metrics: CvtMetrics): string {
  const thresholds = {
    slip: 10,
    eli: 20,
    arHigh: 5,
    arLow: 1,
  };

  if (metrics.slip > thresholds.slip) {
    return "CVT SLIPPING (check belt/clutch)";
  } else if (metrics.eli > thresholds.eli) {
    return "HIGH LOAD (heavy rider / uphill / wrong tuning)";
  } else if (metrics.ar > thresholds.arHigh) {
    return "LIGHT ROLLERS DETECTED";
  } else if (metrics.ar < thresholds.arLow && metrics.ar !== 0) {
    return "HEAVY ROLLERS DETECTED";
  } else {
    return "CVT OPTIMAL";
  }
}

export function getStatusColor(score: number): string {
  if (score >= 80) return "green";
  if (score >= 60) return "yellow";
  return "red";
}