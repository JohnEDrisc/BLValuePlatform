import { LucideIcon } from 'lucide-react';

export enum ValueDriver {
  PROCESS_EFFICIENCY = "Process Efficiency",
  WORKING_CAPITAL = "Working Capital Optimization",
  TRUST_PREMIUM = "Trust Premium",
  MA_INTEGRATION = "M&A Integration Velocity",
  REGULATORY_COMPLIANCE = "Regulatory Compliance",
  TALENT_RETENTION = "Talent Retention & Empowerment",
  FACILITATING_INNOVATION = "Facilitating Innovation",
  REAL_TIME_DECISION_MAKING = "Real-Time Decision Making",
  SCALING_TRUSTWORTHY_AI = "Scaling Trustworthy AI"
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'Platform' | 'Financial Close' | 'Intercompany' | 'Invoice-to-Cash';
  icon: string;
}

export interface ValueDriverSelection {
  id: string;
  value: string;
  nameKey: string;
}

export interface Persona {
  id: string;
  name: string;
  icon: string;
  group?: string;
  role?: string;
  nightmare?: string;
  aspiration?: string;
}

export interface DealContext {
  opportunityId?: string;
  opportunityName?: string;
  companyName?: string;
  industry?: string;
  annualRevenue?: number;
  stage?: string;
  persona?: string;
  problem?: string;
  dealSize?: string;
}

// --- ANALYSIS RESULT INTERFACES ---

export interface DriverImpact {
  message: string;
  metric: string;
  relevance: 'High' | 'Medium' | 'Low';
}

export interface KPIHighlight {
  title: string;
  metric: string;
  context: string;
}

export interface ValueItem {
  feature: string;
  benefit: string;
  value: string;
}

export interface BusinessScenario {
  scenario: string;
  solution: string;
}

export interface Objection {
  objection: string;
  rebuttal: string;
}

export interface PersonaAnalysis {
  role: string;
  topConcerns: string[];
  personalWins: string[];
  keepsThemUpAtNight: string;
  businessProblems: string[];
}

export interface AnalysisResult {
  // Core Data
  valueDriverImpacts: Record<string, DriverImpact>;
  talkTrack: string;
  
  // Rich Data Arrays
  kpiHighlights?: KPIHighlight[];
  valueChain?: ValueItem[];
  businessScenarios?: BusinessScenario[];
  objectionHandling?: Objection[];
  discoveryQuestions?: string[];
  references?: string[];
  
  // Power Messages
  cfoPunchline?: string;
  caoPunchline?: string;
  cioPunchline?: string;
  
  // Deep Dive
  personaAnalysis?: PersonaAnalysis;
  
  // Hub specific
  driverId?: string;
  score?: number;
  summary?: string;
  recommendations?: string[];
}

export type UIStrings = Record<string, string>;

// --- SKO / HUB SPECIFIC INTERFACES ---
export interface SkoPovContent {
  createValue: {
    title: string;
    pains: string[];
    focus: string;
  };
  captureValue: {
    title: string;
    questions: string[];
  };
  deliverValue: {
    title: string;
    capabilities: string[];
    proofPoints: string[];
  };
  justifyValue: {
    title: string;
    metrics: string[];
  };
  roiCalculations?: {
    executive: any[];
    operational: any[];
  }
}

export interface SkoDriverDetail {
  id: string;
  title: string;
  icon: string;
  heroMetric: string;
  summary: string;
  isPlImpact?: boolean;
  outcomeTargetId?: string;
  executivePov: SkoPovContent;
  operationalPov: SkoPovContent;
  customerStory?: {
    company: string;
    description: string;
    metric: string;
  };
  personas?: {
    executive: Persona[];
    operational: Persona[];
  };
}

export interface BenchmarkCase {
  id: string;
  companyName: string;
  opportunityName: string;
  opportunityId?: string;
  industry: string;
  revenueBand: string;
  products: string[];
  primaryValueDriver: string;
  roiMultiple: number;
  annualSavings: number;
  description: string;
}
