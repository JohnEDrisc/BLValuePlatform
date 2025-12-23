import { ProductItem, BenchmarkCase, SkoDriverDetail, Persona, ValueDriverSelection } from './types';

export const PRODUCTS: ProductItem[] = [
  { id: 'studio', name: 'BlackLine Studio360', category: 'Platform', icon: 'LayoutGrid' },
  { id: 'verity', name: 'Verity AI', category: 'Platform', icon: 'Sparkles' },
  { id: 'ar', name: 'Account Reconciliations', category: 'Financial Close', icon: 'FileCheck' },
  { id: 'tm', name: 'Transaction Matching', category: 'Financial Close', icon: 'GitMerge' },
];

export const INDUSTRIES = [
  { id: 'manufacturing', nameKey: 'ind_manufacturing', icon: 'Factory' },
  { id: 'retail', nameKey: 'ind_retail', icon: 'ShoppingBag' },
  { id: 'financial', nameKey: 'ind_financial', icon: 'Landmark' },
  { id: 'healthcare', nameKey: 'ind_healthcare', icon: 'HeartPulse' },
  { id: 'energy', nameKey: 'ind_energy', icon: 'Zap' },
  { id: 'tech', nameKey: 'ind_tech', icon: 'Cpu' },
  { id: 'public', nameKey: 'ind_public', icon: 'Building2' },
  { id: 'services', nameKey: 'ind_services', icon: 'Users' },
];

export const VALUE_DRIVERS_SELECTION: ValueDriverSelection[] = [
  { id: 'process', value: 'Process Efficiency', nameKey: 'drv_process' },
  { id: 'working_cap', value: 'Working Capital Optimization', nameKey: 'drv_working_capital' },
  { id: 'trust', value: 'Trust Premium', nameKey: 'drv_trust' },
  { id: 'ma', value: 'M&A Integration Velocity', nameKey: 'drv_ma' },
  { id: 'compliance', value: 'Regulatory Compliance', nameKey: 'drv_compliance' },
  { id: 'talent', value: 'Talent Retention & Empowerment', nameKey: 'drv_talent' },
  { id: 'innovation', value: 'Facilitating Innovation', nameKey: 'drv_innovation' },
  { id: 'decision', value: 'Real-Time Decision Making', nameKey: 'drv_decision' },
  { id: 'ai_ops', value: 'Scaling Trustworthy AI', nameKey: 'drv_ai_ops' },
];

// --- SKO DATA (Abbreviated for brevity, but structure matches types) ---
export const SKO_DATA: SkoDriverDetail[] = [
  {
    id: 'process',
    title: 'Process Efficiency',
    icon: 'Zap',
    heroMetric: 'Close ≤ 3 Days',
    isPlImpact: true,
    outcomeTargetId: 'innovation',
    summary: 'Automate manual effort to shift resources from data entry to high value analysis.',
    executivePov: {
      createValue: { title: 'Strategic Alignment', pains: ['Linear hiring required.', 'Processing bottlenecks.'], focus: 'Manual close operations.' },
      captureValue: { title: 'Probing Questions', questions: ['How does a 10-day close limit course-correction?', 'Opportunity cost of senior talent?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Centralized Governance', 'Continuous Close', 'Auto Data Ingestion'], proofPoints: ['40-60% cycle time reduction', '3-day reduction average'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['20-30% audit fee reduction', 'EPS improvement', 'Zero-headcount scaling'] }
    },
    operationalPov: {
      createValue: { title: 'Execution Excellence', pains: ['Burnout from overtime.', 'Spreadsheet chaos.'], focus: 'Operational friction.' },
      captureValue: { title: 'Discovery Questions', questions: ['Hours spent ticking and tying?', 'Risk of late error finding?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['High-Volume Matching', 'Task Checklists', 'Smart Templates'], proofPoints: ['85% auto-certification', '90% journal time reduction'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['3,000+ FTE hours released', '100% elimination of redundancy', '95% overtime reduction'] }
    },
    personas: {
      executive: [{ id: 'cfo', name: 'CFO', icon: 'Briefcase', role: 'CFO', nightmare: 'Restatement due to manual error', aspiration: 'Strategic Advisor' }],
      operational: [{ id: 'controller', name: 'Controller', icon: 'ClipboardList', role: 'Controller', nightmare: 'Audit fire drill', aspiration: 'Zero Overtime Close' }]
    }
  },
  // ... (Other drivers would follow same pattern)
];

export const PERSONAS: Persona[] = [
  { id: 'cfo', name: 'Chief Financial Officer', icon: 'Briefcase', group: 'Executive' },
  { id: 'cao', name: 'Chief Accounting Officer', icon: 'ShieldCheck', group: 'Executive' },
  { id: 'controller', name: 'Corporate Controller', icon: 'ClipboardList', group: 'Accounting' },
  { id: 'vp_finance', name: 'VP of Finance', icon: 'TrendingUp', group: 'Executive' },
  { id: 'cio', name: 'Chief Information Officer', icon: 'Server', group: 'Executive' },
  { id: 'it_director', name: 'IT Director', icon: 'Cpu', group: 'IT' },
  { id: 'fpa_director', name: 'FP&A Director', icon: 'BarChart2', group: 'Finance' },
  { id: 'accounting_manager', name: 'Accounting Manager', icon: 'Users', group: 'Accounting' },
];

export const SYSTEM_PROMPT = `You are a BlackLine Value Engineer.`;

export const SUPPORTED_LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇺🇸', promptName: 'English' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪', promptName: 'German' },
  { code: 'FR', label: 'Français', flag: '🇫🇷', promptName: 'French' },
  { code: 'JP', label: '日本語', flag: '🇯🇵', promptName: 'Japanese' },
];

export const UI_STRINGS: Record<string, Record<string, string>> = {
  EN: {
    subtitle: 'Excellence',
    subtitle_bold: 'Quantified',
    hero_title: 'Measure What',
    hero_title_accent: 'Matters',
    hero_desc: 'The strategic framework for articulating financial operations value.',
    tab_sko: 'SKO 26 Playbook',
    tab_discovery: 'Value Narratives',
    tab_outside_in: 'Outside-In Generator',
    tab_calculator: 'BVA Calculator',
    tab_benchmarks: 'Benchmarks',
    tab_hub: 'Coaching Hub',
    loading_title: 'Analyzing Value...',
    loading_desc: 'Mapping capabilities to strategic outcomes.',
    footer_rights: '© 2025 BlackLine, Inc.',
    footer_internal: 'For Internal Sales Use Only',
    selected_scope: 'Selected Scope',
    new_analysis: 'New Analysis',
    new_btn_mobile: 'New',
    nav_help_title: 'Navigating results',
    nav_help_text: 'Use the rail tools to chat with an AI assistant or pivot the industry context.',
    strategic_drivers: 'Strategic Value Matrix',
    projected_impact: 'Projected Impact',
    calc_export: 'Export Report',
    export_word: 'Download Word',
  }
};
