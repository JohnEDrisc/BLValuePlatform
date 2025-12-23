import { LucideIcon } from 'lucide-react';

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

// --- NEW/UPDATED INTERFACES FOR SKO ---

export interface Persona {
  id?: string;
  name?: string; // Used in the global PERSONAS list
  role?: string; // Used in SKO_DATA specifics
  icon: string;
  group?: string;
  aspiration?: string; // Added for SKO Persona cards
  nightmare?: string;  // Added for SKO Persona cards
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

export interface UIStrings {
  [key: string]: string;
}
