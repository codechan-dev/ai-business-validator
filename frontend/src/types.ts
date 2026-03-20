export interface Score {
  feasibility: number;
  demand: number;
  competition: number;
  risk: number;
}

export interface Signal {
  title: string;
  summary: string;
  link?: string;
  source?: string;
}

export interface Competitor {
  name: string;
  strength: number;
  description?: string;
  link?: string;
}

export interface Analysis {
  market: string;
  competitors: string;
  risks: string;
  recommendation: string;
  growthRate?: number;
}

export interface Signals {
  reddit: Signal[];
  trends: Signal[];
  product_hunt: Signal[];
  news: Signal[];
  startups: Signal[];
}

export interface ValidationResult {
  scores: Score;
  analysis: Analysis;
  signals: Signals;
  competitors?: Competitor[];
}
