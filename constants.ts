import { ProductItem, BenchmarkCase, SkoDriverDetail, Persona, ValueDriverSelection } from './types';

export const PRODUCTS: ProductItem[] = [
  { id: 'studio', name: 'BlackLine Studio360', category: 'Platform', icon: 'LayoutGrid' },
  { id: 'verity', name: 'Verity AI', category: 'Platform', icon: 'Sparkles' },
  { id: 'ar', name: 'Account Reconciliations', category: 'Financial Close', icon: 'FileCheck' },
  { id: 'tm', name: 'Transaction Matching', category: 'Financial Close', icon: 'GitMerge' },
  { id: 'je', name: 'Journal Entry', category: 'Financial Close', icon: 'PenTool' },
  { id: 'smart', name: 'Smart Close for SAP', category: 'Financial Close', icon: 'Zap' },
  { id: 'aa', name: 'Account Analysis', category: 'Financial Close', icon: 'Search' },
  { id: 'ra', name: 'Reporting & Analysis', category: 'Financial Close', icon: 'PieChart' },
  { id: 'consol', name: 'Consolidation', category: 'Financial Close', icon: 'Building' },
  { id: 'task', name: 'Task Management', category: 'Financial Close', icon: 'ListChecks' },
  { id: 'comp', name: 'Compliance', category: 'Financial Close', icon: 'ShieldCheck' },
  { id: 'jra', name: 'Journals Risk Analyser', category: 'Financial Close', icon: 'AlertTriangle' },
  { id: 'ic_create', name: 'Create', category: 'Intercompany', icon: 'PlusSquare' },
  { id: 'ic_br', name: 'Balance & Resolve', category: 'Intercompany', icon: 'Scale' },
  { id: 'ic_ns', name: 'Net & Settle', category: 'Intercompany', icon: 'ArrowLeftRight' },
  { id: 'einvoicing', name: 'eInvoicing & Payments', category: 'Invoice-to-Cash', icon: 'Receipt' },
  { id: 'cashapp', name: 'Cash Application', category: 'Invoice-to-Cash', icon: 'DollarSign' },
  { id: 'ai', name: 'AR Intelligence', category: 'Invoice-to-Cash', icon: 'Brain' },
  { id: 'col', name: 'Collections Management', category: 'Invoice-to-Cash', icon: 'Users' },
  { id: 'crm', name: 'Credit & Risk Management', category: 'Invoice-to-Cash', icon: 'Activity' },
  { id: 'ttm', name: 'Team & Task Management', category: 'Invoice-to-Cash', icon: 'ClipboardList' },
  { id: 'ddm', name: 'Disputes & Deductions Management', category: 'Invoice-to-Cash', icon: 'MessageCircleWarning' },
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
  {
    id: 'working_cap',
    title: 'Working Capital Optimization',
    icon: 'DollarSign',
    heroMetric: '$10-50M Release / $1B Rev',
    isPlImpact: true,
    summary: 'Unlock trapped cash flow by accelerating unapplied cash processing and collections.',
    executivePov: {
      createValue: { title: 'Capital Optimization', pains: ['High cost of external capital.', 'Market cap depressed by poor cash utilization.'], focus: 'Cost of borrowing.' },
      captureValue: { title: 'Probing Questions', questions: ['What would a 10-day DSO reduction mean for M&A?', 'Do you have real-time liquidity visibility?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Real-time Cash Visibility', 'Predictive AR Analytics', 'Unified Invoice-to-Cash'], proofPoints: ['$10M-$50M release per $1B revenue', '20% reduction in bad debt'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Improved WACC', 'Increased Free Cash Flow', 'Interest savings'] }
    },
    operationalPov: {
      createValue: { title: 'Cash Processing', pains: ['Backlog of unapplied cash.', 'Manual hunting for remittance.'], focus: 'Inefficient collections cycles.' },
      captureValue: { title: 'Discovery Questions', questions: ['Time to apply multi-currency payments?', 'Frequency of calls to best customers?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['AI-Driven Cash App', 'Intelligent Collections', 'Dispute Mgmt'], proofPoints: ['90% auto-matching', '30% collector productivity increase'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['12-day DSO reduction', '50% unapplied cash reduction', '90% manual entry elimination'] }
    }
  },
  {
    id: 'trust',
    title: 'Trust Premium',
    icon: 'Lock',
    heroMetric: '10-15% Valuation Uplift',
    summary: 'Command a valuation premium through verifiable integrity and automated controls.',
    executivePov: {
      createValue: { title: 'Brand Integrity', pains: ['Risk of public restatements.', 'Board anxiety on controls.'], focus: 'Stakeholder trust.' },
      captureValue: { title: 'Probing Questions', questions: ['Tolerance for material weakness?', 'Cost of last reporting surprise?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Automated Controls', 'Digital Audit Trails', 'Global Compliance Hub'], proofPoints: ['15% valuation premium', 'Zero audit findings'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Avoidance of market cap drops', '25% audit fee reduction', 'Lower cost of capital'] }
    },
    operationalPov: {
      createValue: { title: 'Audit Readiness', pains: ['Audit fire drills.', 'Fragmented evidence storage.'], focus: 'Reactive compliance drills.' },
      captureValue: { title: 'Discovery Questions', questions: ['Hours gathering audit data?', 'Trace numbers to source in <1 min?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Centralized Repository', 'System-level SoD', 'Automated Flux'], proofPoints: ['100% automated evidence', '75% audit support reduction'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['80% audit reliance', '400+ hours saved hunting', '100% data lineage'] }
    }
  },
  {
    id: 'ma',
    title: 'M&A Integration Velocity',
    icon: 'GitMerge',
    heroMetric: '3x Faster Synergy',
    summary: 'Accelerate synergy capture with a standardized Day 1 integration playbook.',
    executivePov: {
      createValue: { title: 'Synergy Realization', pains: ['Slow integration visibility.', 'Financial black holes.'], focus: 'Fragmented visibility.' },
      captureValue: { title: 'Probing Questions', questions: ['Time to trusted close post-Day 1?', 'Value of 6-mo earlier synergy?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Standardized Playbook', 'Cross-ERP Connectivity', 'Auto Verification'], proofPoints: ['3x faster cycle time', '30-day full visibility'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Accelerated synergy value', 'Reduced consultant costs', 'Immediate compliance'] }
    },
    operationalPov: {
      createValue: { title: 'Entity Onboarding', pains: ['Manual CoA mapping.', 'Reconciling Franken-systems.'], focus: 'Operational chaos.' },
      captureValue: { title: 'Discovery Questions', questions: ['Verify opening balance integrity?', 'Time to train targets?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['ERP-Agnostic Recs', 'Auto CoA Mapping', 'Integration Dashboard'], proofPoints: ['Month 1 visibility', '<15 days deployment'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['60% less integration labor', 'Zero surprises', '100% Day 1 coverage'] }
    }
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    icon: 'FileText',
    heroMetric: '$1-5M Fine Avoidance',
    summary: 'Make compliance a by-product of a controlled process instead of a manual drill.',
    executivePov: {
      createValue: { title: 'Risk Mitigation', pains: ['Exposure to fines.', 'Changing ESG/tax rules.'], focus: 'Reputational damage.' },
      captureValue: { title: 'Probing Questions', questions: ['ESG transparency prep?', '100% transaction coverage?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Continuous Monitoring', 'Automated Frameworks', 'Cloud Governance'], proofPoints: ['$1-5M fine avoidance', '6.0x ROI'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Fine avoidance', 'Reduced audit hours', 'Lower insurance cost'] }
    },
    operationalPov: {
      createValue: { title: 'Compliance Execution', pains: ['Manual log reviews.', 'Static checklists.'], focus: 'Compliance as by-product.' },
      captureValue: { title: 'Discovery Questions', questions: ['Exceptions in last audit?', 'Static vs live checklists?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Real-time Exception Tracking', 'ESG Connectors', 'Digital Signatures'], proofPoints: ['100% evidence auto-collection', '80% testing reduction'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['200+ hours saved per BU', 'Zero manual testing for 70% controls'] }
    }
  },
  {
    id: 'talent',
    title: 'Talent Retention',
    icon: 'Users',
    heroMetric: 'Turnover < 8%',
    summary: 'Eliminate mundane work to attract and retain top-tier financial talent.',
    executivePov: {
      createValue: { title: 'Human Capital', pains: ['Knowledge loss from attrition.', 'Replacement costs.'], focus: 'Talent tax on repetitive work.' },
      captureValue: { title: 'Probing Questions', questions: ['Cost of losing top 10% talent?', 'Tech stack appeal to new hires?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Consumer-Grade UX', 'Remote Enablement', 'Career Paths'], proofPoints: ['Retention up to 92%', 'Higher engagement scores'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Recruitment savings', 'Knowledge preservation', 'Improved eNPS'] }
    },
    operationalPov: {
      createValue: { title: 'Employee Experience', pains: ['Burnout.', 'Legacy tools.'], focus: 'Engagement and errors.' },
      captureValue: { title: 'Discovery Questions', questions: ['Weekend work frequency?', 'Onboarding time?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Automated Workflows', 'Cloud Workspace', 'Task Guidance'], proofPoints: ['90% overtime reduction', '2-week onboarding'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['15% productivity gain', 'Reduced sick leave', 'Digitized documentation'] }
    }
  },
  {
    id: 'innovation',
    title: 'Facilitating Innovation',
    icon: 'Lightbulb',
    heroMetric: '30% Capacity Freed',
    summary: 'Free up capacity for value-add activities and major strategic growth projects.',
    executivePov: {
      createValue: { title: 'Strategic Agility', pains: ['Stalled growth projects.', 'Finance as cost center.'], focus: 'Finance paralysis.' },
      captureValue: { title: 'Probing Questions', questions: ['Project wish-list with extra capacity?', 'Ticking vs Thinking ratio?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Auto Transaction Processing', 'Dynamic Resource Allocation', 'Scalability'], proofPoints: ['30% staff reallocation', 'Accelerated ESG'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['ROI from innovation', 'No consultant fees', 'Faster market entry'] }
    },
    operationalPov: {
      createValue: { title: 'High-Value Work', pains: ['Career stagnation.', 'Sacrificed analysis time.'], focus: 'Solving vs Cleaning.' },
      captureValue: { title: 'Discovery Questions', questions: ['Thinking vs Ticking %?', 'Explaining Why vs What?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Unified Platform', 'One-Click Dashboards', 'Auto Variance'], proofPoints: ['80% analysis focus', '100% redundancy elimination'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['20+ hours freed/person/month', '15% forecast accuracy boost'] }
    }
  },
  {
    id: 'decision',
    title: 'Real-Time Decision Making',
    icon: 'Activity',
    heroMetric: 'Day 1 Insights',
    summary: 'Shift from lagging reporting to leading insights with real-time data visibility.',
    executivePov: {
      createValue: { title: 'Agile Leadership', pains: ['Stale data.', 'Conflicting numbers.'], focus: 'Late reaction to markets.' },
      captureValue: { title: 'Probing Questions', questions: ['Trust in Day 1 numbers?', 'Time lost debating truth source?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Continuous Data Refresh', 'Health Dashboards', 'Auto Narrative'], proofPoints: ['3-day reporting cycle', '98% forecast accuracy'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['Improved market response', 'No surprises', 'Optimized allocation'] }
    },
    operationalPov: {
      createValue: { title: 'Insight Delivery', pains: ['Cleaning vs Explaining.', 'Manual Excel delays.'], focus: 'Dirty Data manipulation.' },
      captureValue: { title: 'Discovery Questions', questions: ['Number of truth sources?', 'Risk of unreconciled decisions?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Anomaly Detection', 'Unified Reporting', 'Real-time Variance'], proofPoints: ['80% faster reports', 'Real-time alerts'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['Proactive analysis', 'No rework', 'Zero manual cleaning'] }
    }
  },
  {
    id: 'ai_ops',
    title: 'Scaling Trustworthy AI',
    icon: 'Brain',
    heroMetric: '99.9% Clean Data',
    summary: 'Build the trusted data foundation required for agentic AI and automated insights.',
    executivePov: {
      createValue: { title: 'AI Transformation', pains: ['Dirty data stalling AI.', 'Siloed data.'], focus: 'AI obsolescence.' },
      captureValue: { title: 'Probing Questions', questions: ['Data ready for Agents?', 'Risk of AI on bad data?'] },
      deliverValue: { title: 'Strategic Capability', capabilities: ['Standardized Data Lake', 'Agentic Hub', 'Auto Stewardship'], proofPoints: ['70% faster AI scaling', '99.9% clean data'] },
      justifyValue: { title: 'The Hard Numbers', metrics: ['GenAI ROI multiplier', '30% cleaning cost reduction', 'Governance framework'] }
    },
    operationalPov: {
      createValue: { title: 'Trusted Automation', pains: ['AI false positives.', 'Useless Copilots.'], focus: 'AI as noise.' },
      captureValue: { title: 'Discovery Questions', questions: ['Current AI accuracy?', 'Trust in AI journal suggestions?'] },
      deliverValue: { title: 'Tactical Capability', capabilities: ['Self-cleaning Pipelines', 'Predictive Agents', 'NL Querying'], proofPoints: ['90% manual prep reduction', '40% accuracy boost'] },
      justifyValue: { title: 'Efficiency Gains', metrics: ['No data janitorial tasks', '100% re-formatting elimination', 'AI-assisted flux'] }
    }
  }
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

export const MOCK_BENCHMARK_DATA: BenchmarkCase[] = [
  {
    id: '1',
    companyName: 'Global Auto Parts',
    opportunityName: 'Finance Transformation 2025',
    opportunityId: 'OPP-101',
    industry: 'Manufacturing',
    revenueBand: '$5B - $10B',
    products: ['Account Reconciliations', 'Transaction Matching'],
    primaryValueDriver: 'Process Efficiency',
    roiMultiple: 4.5,
    annualSavings: 2500000,
    description: 'Automated 85% of bank reconciliations, reducing close cycle by 4 days.'
  },
  {
    id: '2',
    companyName: 'TechFlow Solutions',
    opportunityName: 'Continuous Close Initiative',
    opportunityId: 'OPP-202',
    industry: 'Technology',
    revenueBand: '$1B - $5B',
    products: ['Journal Entry', 'Task Management'],
    primaryValueDriver: 'Talent Retention',
    roiMultiple: 3.2,
    annualSavings: 1200000,
    description: 'Reduced close-related overtime by 90%, significantly improving team morale.'
  },
  {
    id: '3',
    companyName: 'Stellar Retail',
    opportunityName: 'Working Capital Optimization',
    opportunityId: 'OPP-303',
    industry: 'Retail',
    revenueBand: '$10B+',
    products: ['Cash Application', 'Collections Management'],
    primaryValueDriver: 'Working Capital Optimization',
    roiMultiple: 6.8,
    annualSavings: 15000000,
    description: 'Reduced DSO by 12 days, unlocking $15M in operational cash flow.'
  }
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
