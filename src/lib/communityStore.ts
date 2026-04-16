"use client";

import { CvtProfile, FlyballConfig, CenterSpring, ClutchSpring, EngineCC } from "./cvtEngine";

export interface BuildSetup {
  profile: CvtProfile;
  flyballConfig: FlyballConfig;
  flyballWeights: number[];
  centerSpring: CenterSpring;
  clutchSpring: ClutchSpring;
  engineCC: EngineCC;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: number;
}

export interface BuildPost {
  id: string;
  title: string;
  author: string;
  description: string;
  setup: BuildSetup;
  stats: {
    maxSpeed: number;
    acceleration: number; // 0-100 time or score
    efficiency: number;
  };
  comments: Comment[];
  likes: number;
  timestamp: number;
}

// Initial Mock Data
export const INITIAL_POSTS: BuildPost[] = [
  {
    id: "1",
    title: "MTRT Daily Ganti Setup - Click 125",
    author: "ThaiRider_88",
    description: "Solid acceleration for city driving. Best paired with 1,500 RPM center spring.",
    setup: {
      profile: "mtrt_v3",
      flyballConfig: "preset",
      flyballWeights: [12, 12, 12, 12, 12, 12],
      centerSpring: "1500rpm",
      clutchSpring: "1000rpm",
      engineCC: "125cc"
    },
    stats: {
      maxSpeed: 115,
      acceleration: 88,
      efficiency: 92
    },
    comments: [
      { id: "c1", author: "CvtMaster", text: "Try changing to 10g rollers if you want more torque!", timestamp: Date.now() - 1000000 }
    ],
    likes: 24,
    timestamp: Date.now() - 5000000
  },
  {
    id: "2",
    title: "Project F.I. Top Speed Hunter",
    author: "SpeedFreak_PH",
    description: "For long rides and open highways. High gear ratio focus.",
    setup: {
      profile: "project_fi",
      flyballConfig: "custom",
      flyballWeights: [14, 14, 14, 14, 14, 14],
      centerSpring: "1000rpm",
      clutchSpring: "1200rpm",
      engineCC: "150cc"
    },
    stats: {
      maxSpeed: 128,
      acceleration: 75,
      efficiency: 85
    },
    comments: [],
    likes: 15,
    timestamp: Date.now() - 2000000
  }
];
