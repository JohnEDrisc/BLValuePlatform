
export interface ProductItem {
  id: string;
  name: string;
  category: 'Platform' | 'Financial Close' | 'Intercompany' | 'Invoice-to-Cash';
  icon: string;
}

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
  // Metadata for navigation
  customerStory?: {
    company: string;
    description: string;
    metric: string;
  };
}

// Added Persona interface for navigation and role-based analysis
export interface Persona {
  id: string;
  name: string;
  icon: string;
  group?: string;
}

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

export interface PersonaAnalysis {
  role: string;
  topConcerns: string[];
  personalWins: string[];
  keepsThemUpAtNight: string;
  businessProblems: string[];
}

export interface AnalysisResult {
  valueDriverImpacts: Record<string, DriverImpact>;
  kpiHighlights?: KPIHighlight[];
  valueChain: ValueItem[];
  businessScenarios: BusinessScenario[];
  objectionHandling: Objection[];
  talkTrack: string;
  discoveryQuestions: string[];
  cfoPunchline: string;
  caoPunchline: string;
  cioPunchline: string;
  personaAnalysis?: PersonaAnalysis;
  references: string[];
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}

export type UIStrings = Record<string, string>;

export const DEAL_STAGES = [
  'Account Plan',
  'Vision Lock',
  'Value Discovery',
  'Value Demo & Outside-In BVA',
  'IT Validation & Workshop',
  'Project Scoping & Selling',
  'Finalize a Collaborative BVA'
] as const;

export type DealStage = typeof DEAL_STAGES[number];

export interface DealContext {
  opportunityId?: string;
  opportunityName?: string;
  companyName?: string;
  industry?: string;
  annualRevenue?: number;
  stage?: DealStage;
  persona?: string;
}

export interface CalculatorInputs {
  companyName: string;
  opportunityName?: string;
  opportunityId?: string;
  annualRevenue: number;
  industry: string;
  isPublic: boolean;
  marketCap: number;
  numLegalEntities: number;
  numGeographicRegions: number;
  numErpSystems: number;
  wacc: number;
  totalFinanceFtes: number;
  accountingFtes: number;
  avgFteSalary: number;
  turnoverRate: number;
  manualWorkPct: number;
  resourcesDoingRecs: number;
  reconciliationTimePct: number;
  resourcesOnJournals: number;
  journalEntryTimePct: number;
  annualCloseOvertimeHours: number;
  avgTimeToFillPosition: number;
  costToReplaceResourcePct: number;
  financialCloseCycleDays: number;
  reconciliationsPerMonth: number;
  journalEntriesPerMonth: number;
  accountsReconciledPct: number;
  currentDso: number;
  priorRestatements: boolean;
  materialWeakness: boolean;
  priorFines: number;
  manualProcessPct: number;
  acquisitionsPerYear: number;
  avgDealSize: number;
  integrationCostPerDeal: number;
  integrationTimeMonths: number;
  expectedReturnOnMaPct: number;
  keyTalentRetentionTarget: number;
  historicTurnoverMaPct: number;
  investmentPeriod: 3 | 5;
  costSoftwareYear1: number;
  costSoftwareYear2: number;
  costSoftwareYear3: number;
  costSoftwareYear4: number;
  costSoftwareYear5: number;
  costServicesYear1: number;
  costServicesYear2: number;
  costServicesYear3: number;
  costServicesYear4: number;
  costServicesYear5: number;
  year1RampPct: number;
}

export interface CalculatorDriverResult {
  name: string;
  value: number;
  conservative: number;
  optimistic: number;
  percentOfTotal: number;
}

export interface YearlyData {
  year: number;
  cost: number;
  benefit: number;
  net: number;
  cumulative: number;
}

export interface CalculatorResults {
  drivers: CalculatorDriverResult[];
  totalValue: number;
  targetInvestment: number;
  roiMultiple: number;
  yearlyData: YearlyData[];
  totalCost: number;
  netPresentValue: number;
  paybackPeriod: number;
}

export interface OutsideInInputs {
  companyName: string;
  opportunityName: string;
  opportunityId: string;
  industry: string;
  revenueRange: string;
  solutionScope: string;
  primaryGoal: string;
}

export interface OutsideInResult {
  teaserTitle: string;
  potentialSavingsRange: string;
  peerBenchmark: string;
  strategicAssertion: string;
  financeValueProp: string;
  caoValueProp: string;
  itValueProp: string;
  whyNow: string;
  nextStep: string;
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
