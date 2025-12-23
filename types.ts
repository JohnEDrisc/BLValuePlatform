import { LucideIcon } from 'lucide-react';

// --- CORE ENUMS (Crucial Fix: Exporting ValueDriver) ---
export enum ValueDriver {
  PROCESS_EFFICIENCY = "Process Efficiency",
  WORKING_CAPITAL = "Working Capital Optimization",
  TRUST_PREMIUM = "Trust Premium",
  MA_INTEGRATION = "M&A Integration Velocity",
  REGULATORY_COMPLIANCE = "Regulatory Compliance",
  TALENT_RETENTION = "Talent Retention",
  FACILITATING_INNOVATION = "Facilitating Innovation",
  REAL_TIME_DECISION_MAKING = "Real-Time Decision Making",
  SCALING_TRUSTWORTHY_AI = "Scaling Trustworthy AI"
}

// --- CORE INTERFACES ---
export interface ValueDriverSelection {
  id: string;
  value: string;
  nameKey: string;
}

export interface Persona {
  id?: string;
  name?: string; 
  role?: string; 
  icon: string; 
  group?: string;
  aspiration?: string; 
  nightmare?: string;  
}

export interface DealContext {
  opportunityName?: string;
  stage?: string;
  dealSize?: string;
  persona?: string;
  industry?: string;
  problem?: string;
}

// --- ANALYSIS RESULT INTERFACES (Rich Data Structure) ---

export interface PersonaAnalysis {
  role: string;
  topConcerns: string[];
  keepsThemUpAtNight: string;
  personalWins: string[];
  businessProblems: string[];
}

export interface ValueDriverImpact {
  message: string;
  metric: string;
  relevance: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  driverId?: string; // Optional, for Hub mode
  score?: number;    // Optional, for Hub mode
  
  // Core Fields
  summary: string;
  recommendations: string[];
  
  // Rich Fields for Narrative Mode
  talkTrack?: string;
  cfoPunchline?: string;
  personaAnalysis?: PersonaAnalysis;
  valueDriverImpacts?: Record<string, ValueDriverImpact>;
}

export interface UIStrings {
  [key: string]: string;
}

// --- SKO / HUB INTERFACES ---
export interface RoiItem {
  label: string;
  formula: string[];
  desc: string;
}

export interface SkoPovPhase {
  title: string;
  pains?: string[];
  focus?: string;
  questions?: string[];
  capabilities?: string[];
  proofPoints?: string[];
  metrics?: string[];
}

export interface SkoPovContent {
  createValue: SkoPovPhase;
  captureValue: SkoPovPhase;
  deliverValue: SkoPovPhase;
  justifyValue: SkoPovPhase;
  roiCalculations?: {
    executive: RoiItem[];
    operational: RoiItem[];
  };
}

export interface SkoDriverDetail {
  id: string;
  title: string;
  icon: string;
  heroMetric: string;
  summary: string;
  isPlImpact?: boolean;
  outcomeTargetId?: string;
  personas?: {
    executive: Persona[];
    operational: Persona[];
  };
  executivePov: SkoPovContent;
  operationalPov: SkoPovContent;
}
