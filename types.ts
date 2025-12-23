import { LucideIcon } from 'lucide-react';

// --- CORE INTERFACES ---

export interface ValueDriver {
  id: string;
  value: string;
  nameKey: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface IndustryItem {
  id: string;
  nameKey: string;
  icon: string;
}

export interface ValueDriverSelection {
  id: string;
  value: string;
  nameKey: string;
}

export interface BenchmarkCase {
  id: string;
  companyName: string;
  opportunityName: string;
  opportunityId: string;
  industry: string;
  revenueBand: string;
  products: string[];
  primaryValueDriver: string;
  roiMultiple: number;
  annualSavings: number;
  description: string;
}

// --- SKO EXPLAINER INTERFACES ---

export interface Persona {
  id?: string;
  name?: string; 
  role?: string; 
  icon: string; // Stored as string name of Lucide icon
  group?: string;
  aspiration?: string; 
  nightmare?: string;  
}

export interface RoiItem {
  label: string;
  formula: string[];
  desc: string;
}

export interface SkoPovPhase {
  title: string;
  // Create Value
  pains?: string[];
  focus?: string;
  // Capture Value
  questions?: string[];
  // Deliver Value
  capabilities?: string[];
  proofPoints?: string[];
  // Justify Value
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
  icon: string; // Stored as string name of Lucide icon
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

// --- ANALYSIS RESULTS INTERFACES ---

export interface AnalysisResult {
  driverId: string;
  score: number;
  summary: string;
  recommendations: string[];
}

// --- DEAL / COACHING HUB INTERFACES (Missing Piece) ---

export type DealStage = 'discovery' | 'validation' | 'business_case' | 'negotiation' | 'closed';

export const DEAL_STAGES: { id: DealStage; label: string }[] = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'validation', label: 'Validation' },
  { id: 'business_case', label: 'Business Case' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'closed', label: 'Closed / Won' }
];

export interface DealContext {
  stage: DealStage;
  probability: number;
  closeDate: string;
  nextSteps: string;
  dealSize?: string;
  competitors?: string[];
}

export interface UIStrings {
  [key: string]: string;
}
