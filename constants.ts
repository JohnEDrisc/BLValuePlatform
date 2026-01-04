import { ProductItem, BenchmarkCase, SkoDriverDetail, Persona } from './types';

// --- CORE EXPORTS ---

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

export const VALUE_DRIVERS_SELECTION = [
  { id: 'process', value: 'Process Efficiency', nameKey: 'drv_process' },
  { id: 'working_cap', value: 'Working Capital Optimization', nameKey: 'drv_working_capital' },
  { id: 'trust', value: 'Trust Premium', nameKey: 'drv_trust' },
  { id: 'ma', value: 'M&A Integration Velocity', nameKey: 'drv_ma' },
  { id: 'compliance', value: 'Regulatory Compliance', nameKey: 'drv_compliance' },
  { id: 'talent', value: 'Talent Retention & Engagement', nameKey: 'drv_talent' },
  { id: 'innovation', value: 'Facilitating Innovation', nameKey: 'drv_innovation' },
  { id: 'decision', value: 'Real-Time Decision Making', nameKey: 'drv_decision' },
  { id: 'ai_ops', value: 'Scaling Trusted AI', nameKey: 'drv_ai_ops' },
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

export const SUPPORTED_LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇺🇸', promptName: 'English' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪', promptName: 'German' },
  { code: 'FR', label: 'Français', flag: '🇫🇷', promptName: 'French' },
  { code: 'JP', label: '日本語', flag: '🇯🇵', promptName: 'Japanese' },
];

export const UI_STRINGS: Record<string, Record<string, string>> = {
  EN: {
    // ... (unchanged strings)
  }
};

export const MOCK_BENCHMARK_DATA: BenchmarkCase[] = [
  // ... (unchanged benchmark data)
];

export const SYSTEM_PROMPT = `...`; // (unchanged prompt)

// --- DATA CONSTANTS ---

const FULL_SKO_PERSONAS = {
  executive: [
    { role: 'CEO', icon: 'Target', nightmare: 'Missing earnings guidance due to unforeseen financial data visibility gaps.', aspiration: 'Driving valuation through predictable, efficient growth strategies.' },
    { role: 'CFO', icon: 'TrendingUp', nightmare: 'Missing an audit opinion or defaulting on debt covenants due to reporting failures.', aspiration: 'Maximizing Free Cash Flow velocity to fund aggressive M&A and transformative R&D.' },
    { role: 'CAO', icon: 'ShieldCheck', nightmare: 'Unexplained balance sheet variances leading to a high-profile audit failure.', aspiration: 'A clean, reconciled balance sheet providing absolute certainty to the Board.' },
    { role: 'CIO', icon: 'Cpu', nightmare: 'Inconsistently defined data model blocking AI adoption; Fragmented and fragile legacy systems driving non-strategic fire fighting.', aspiration: 'Delivering reliable scalable AI solutions to the business.' }
  ],
  operational: [
    { role: 'Shared Service Leader', icon: 'Globe', nightmare: 'Being viewed as inefficient and a bottleneck to strategic insight due to manual data processes.', aspiration: 'Touchless volume scaling and standardized global operating models.' },
    { role: 'Accounting Manager', icon: 'Users', nightmare: 'Employee burnout and team focused on manual tasks, lacking time to analyze and fix core issues.', aspiration: 'Empowered team focusing on strategic variance investigation over data entry.' },
    { role: 'Accountant', icon: 'User', nightmare: 'Logging in at 7 AM to manually download bank PDFs and match line-by-line.', aspiration: 'Upskilling into strategic business partnering and high-impact forecasting.' }
  ]
};

export const SKO_DATA: SkoDriverDetail[] = [
  {
    id: 'process',
    title: 'Process Efficiency',
    icon: 'Zap',
    heroMetric: 'Close ≤ 3 Days',
    isPlImpact: true,
    outcomeTargetId: 'innovation',
    summary: "Most finance teams are drowning in manual tasks—ticking, tying, and chasing status. This isn't just slow; it's a strategic bottleneck. If we don't fix the foundation, scaling becomes a hiring race that kills margins. By automating the mundane, we transform finance from a cost center into a strategic partner that can scale without adding heads.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Strategic Alignment',
        pains: [
          'Spikes in volume drive linear headcount cost and risk, eating up profit.',
          'Processing bottlenecks delaying financial close completion and reporting insights.',
          'Costly manual checks required for the "Last Mile" of global reporting.',
          'Spreadsheet version chaos leading to rework and material errors.'
        ],
        focus: 'Manual operations destroying agility and the ability to scale efficiently.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How does a 10-day close limit course-correction in volatile markets?',
          'What is the opportunity cost of senior talent performing low-level data entry?',
          'If transaction volume doubled, could your team survive without new hires?',
          'Can you trust your Day 1 results as much as your Day 10 audited financials?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Centralized Governance Hub for global task orchestration.',
          'Continuous Close Architecture eliminating labor spikes.',
          'Automated Data Ingestion from disparate ERP instances.',
          'Real-time status tracking for every global financial task.'
        ],
        performanceStats: [
          '100% visibility into global task status for leadership.',
          'Elimination of manual follow-up emails via automated logic.',
          'Unified dashboard for all global entities.',
          'Real-time execution monitoring 24/7.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Reduction in external audit fees via self-service.',
          'Earnings Per Share improvement via Operating Expenses reduction.',
          'Zero-headcount scaling for future geographic expansion.',
          'Reduction in reporting cycle variance and rework.'
        ],
        successStories: [
          'Domino\'s significantly reduced close cycle time.',
          'Leading firms achieved a 3-day reduction in consolidated reporting cycles.',
          'Hershey reallocated accounting staff to analysis.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'OpEx Optimization', category: 'Direct', formula: ['Total Full-Time Employees', '×', 'Manual %', '×', 'Avg Salary'], desc: 'Reclaiming capacity for high-ROI business analysis.' },
          { label: 'Audit Fee Redux', category: 'Direct', formula: ['Audit Fees', '×', 'Efficiency %'], desc: 'Lowering the cost of external assurance via self-service data.' }
        ],
        operational: [
          { label: 'Overtime Saved', category: 'Direct', formula: ['Annual OT Hours', '×', '1.5x Hourly Rate'], desc: 'Eliminating peak-cycle burnout and premium labor costs.' },
          { label: 'Volume Reclaim', category: 'Direct', formula: ['Entities', '×', 'Hours Saved'], desc: 'Standardizing global workflows to absorb new entity volume.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Operational Friction',
        pains: [
          'Acute burnout from excessive overtime during peak close cycles.',
          'Spreadsheet version chaos leading to rework and material error.',
          'Ticking and Tying fragmented accounting data consumes mechanical work vs strategic work.',
          'Manual journal entry preparation taking hours of skilled time.'
        ],
        focus: 'Operational friction preventing accurate, timely, and scalable reporting.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many hours per month are spent on repetitive ticking and tying?',
          'What is the risk if a Day 2 error is only found on Day 12?',
          'How much time is lost to chasing status updates from regional leads?',
          'Are your checklists static Excel files or live digital workflows?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'High-Volume Transaction Matching for any data source.',
          'Unified Process Orchestration (Studio) driving continuous improvement.',
          'Automated Journal Entry Creation eliminating manual redundancy.',
          'Automated compilation of variance (flux) analysis.'
        ],
        performanceStats: [
          'Auto-certification of low-risk bank reconciliations.',
          'Reduction in journal preparation time via automation.',
          'Real-time "Percent Complete" dashboarding.',
          'Zero-touch matching for high volume data.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Significant Full-Time Employee hours released per $1B in annual revenue.',
          'Elimination of redundant effort in bank matching.',
          'Reduction in close-related overtime for staff.',
          'Instant visibility into global entity status for regional leads.'
        ],
        successStories: [
          'Hershey automated majority of bank transaction matching.',
          'Coca-Cola reduced manual journal volume.'
        ]
      }
    }
  },
  {
    id: 'working_cap',
    title: 'Working Capital Optimization',
    icon: 'DollarSign',
    heroMetric: 'Cash Release',
    isPlImpact: true,
    summary: "Cash is the lifeblood of growth. Right now, millions are likely trapped in your unapplied cash backlogs or slow collection cycles. This isn't just a process gap—it's expensive, idle capital. By accelerating cash processing, we lower your cost of funding and give leadership a bigger 'war chest' to fund strategic growth internally.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Capital Optimization',
        pains: [
          'High cost of external capital during global expansion.',
          'Company valuation lowered by poor cash efficiency.',
          'Intercompany settlement delays locking up cash across borders.',
          'Restricted credit lines due to slow unapplied cash application.'
        ],
        focus: 'The avoidable cost of borrowing while internal capital sits idle.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What would a 10-day Days Sales Outstanding reduction mean for your M&A budget?',
          'Does your board have real-time visibility into global liquidity?',
          'How often are sales blocked because of unapplied cash backlogs?',
          'How much cash is sitting "un-applied" on your balance sheet today?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Real-time Cash Visibility across all global banking institutions.',
          'Predictive AR Analytics identifying high-risk collection trends.',
          'Unified Invoice-to-Cash platform for global standardized ops.',
          'Automated dispute resolution workflows for faster closure.'
        ],
        performanceStats: [
          'Reduction in unapplied cash volumes.',
          'Automated dispute resolution workflows for faster closure.',
          'Unified Invoice-to-Cash platform stability.',
          'Real-time global cash visibility.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Measurable improvement in Weighted Average Cost of Capital.',
          'Significant increase in Free Cash Flow for investment.',
          'Direct P&L benefit via interest savings on debt lines.',
          'Enhanced cash conversion predictability for analysts.'
        ],
        successStories: [
          'McKesson released significant cash flow per $1B revenue.',
          'Kindred achieved reduction in bad debt write-offs.',
          'Cash Conversion Cycle improvement relative to industry average.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'WACC Benefit', category: 'Indirect', formula: ['Released Cash', '×', 'WACC %'], desc: 'Direct saving on the cost of funding for the business.' },
          { label: 'Bad Debt Redux', category: 'Direct', formula: ['Bad Debt', '×', 'Improvement %'], desc: 'Value of proactive collection risk management.' }
        ],
        operational: [
          { label: 'AR Productivity', category: 'Direct', formula: ['Daily Volume', '×', 'Automation %'], desc: 'Increasing collector bandwidth through prioritization.' },
          { label: 'Unapplied Cash Redux', category: 'Indirect', formula: ['Idle Cash', '×', 'Velocity Boost'], desc: 'Releasing trapped liquidity into operating cash accounts.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Cash Processing',
        pains: [
          'Backlog of unapplied cash stopping sales and credit checks.',
          'Manual hunting for remittance across fragmented portals.',
          'Inefficient collections cycles damaging customer relationships.',
          'Lack of visibility into which invoices are actually at risk.'
        ],
        focus: 'Operational friction in the cash cycle destroying cash velocity.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How long does it take to apply complex multi-currency payments?',
          'How often are best customers called for already paid invoices?',
          'What percentage of payments arrive without remittance data?',
          'How many different bank portals must a clerk log into daily?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'AI-Driven Cash Application for fragmented remittance data.',
          'Intelligent Collections Worklists prioritized by risk score.',
          'Integrated Dispute Management for collaborative resolution.',
          'Automated remittance extraction from email and portals.'
        ],
        performanceStats: [
          'High auto-matching for fragmented global payments.',
          'Increase in collector productivity and coverage.',
          'Reduction in time-to-application for complex wires.',
          'Elimination of manual cash application errors.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Measurable reduction in Days Sales Outstanding.',
          'Drastic reduction in unapplied cash volume.',
          'Elimination of manual data entry for line items.',
          'Significant reduction in lockbox and bank processing fees.'
        ],
        successStories: [
          'Kindred achieved high auto-match rates on day one.',
          'Western Union significantly reduced unapplied cash backlog.'
        ]
      }
    }
  },
  {
    id: 'talent',
    title: 'Talent Retention & Engagement',
    icon: 'Users',
    heroMetric: 'Best-in-Class Retention',
    summary: "The war for finance talent is over—talent won. If your team is spending 80% of their time on manual data janitorial work, your best people will leave for firms that prioritize analysis. Replacing a senior accountant costs 1.5x their salary. This is about upskilling your team and making finance a high-engagement 'think tank' rather than a data entry factory.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Talent Crisis',
        pains: [
          'Attrition at all levels creates disruption and loss of organizational knowledge.',
          'Manual work creates a talent tax that reduces value of what is produced.',
          'University hires leaving to companies that provide roles where employees help make positive impacts to the business.',
          'Burnout Culture becomes the brand of the internal and external view.'
        ],
        focus: 'The multi-million dollar talent tax on repetitive manual work.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What is the loaded cost of losing your top 10% of talent?',
          'Does your tech stack attract or repel modern university hires?',
          'What percentage of staff leave due to "peak period burnout"?',
          'Could you close the books if your lead Controller left today?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Consumer-Grade User Experience for professionals.',
          'Remote/Hybrid Close Enablement for talent flexibility.',
          'Value-added Career Paths focusing on business strategy.',
          'Intelligent load balancing across global finance teams.'
        ],
        performanceStats: [
          'Onboarding time reduced significantly for new hires.',
          'Reduction in staff burnout reports.',
          'Elimination of manual journal inputs.',
          'Real-time task re-assignment capability.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Recruitment savings per senior management hire.',
          'Preservation of critical institutional process knowledge.',
          'Significantly improved eNPS scores across the Finance org.',
          'Reduced reliance on high-cost temp and contractor labor.'
        ],
        successStories: [
          'Retention rates improved significantly year-over-year.',
          'TechFlow finance engagement scores outperformed company average.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Replacement Redux', category: 'Economic', formula: ['Turnover %', '×', '1.5x Salary'], desc: 'Avoiding the extreme cost of hiring and training.' },
          { label: 'Recruiting Fee Savings', category: 'Direct', formula: ['Hires', '×', 'Agency Fee'], desc: 'Direct saving on 25% agency fees via internal career mobility.' }
        ],
        operational: [
          { label: 'Temp Labor Redux', category: 'Direct', formula: ['Peak Hours', '×', 'Premium Rate'], desc: 'Eliminating peak-cycle contractor spend.' },
          { label: 'Training Velocity', category: 'Direct', formula: ['Weeks Saved', '×', 'Manager Salary'], desc: 'Value of reduced manual oversight for new hires.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Employee Experience',
        pains: [
          'Acute burnout from extreme fatigue and repetitive cycles.',
          'Legacy tools that don\'t support modern collaborative work.',
          'Low engagement leading to preventable manual errors.',
          'Time spent on "ticking and tying" instead of analyzing.'
        ],
        focus: 'Preventing low engagement and preventable close-related errors.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'Does your team work more than 2 weekends a month during close?',
          'How long does it take to train a new hire on your manuals?',
          'What is the #1 complaint in your team engagement surveys?',
          'Do your analysts feel they are "learning" or "just processing"?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Automated Journal Workflows reducing manual input time.',
          'Intuitive Integrated Cloud Workspace for global teams.',
          'Real-time Task Guidance for faster onboarding.',
          'Social collaboration tools for real-time problem solving.'
        ],
        performanceStats: [
          'Onboarding time reduced for new finance hires.',
          'Significant reduction in stress-related absence.',
          'High adoption of analytical tools by data entry staff.',
          'Zero manual emails for task follow-up.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Improvement in overall team daily productivity.',
          'Digitized process documentation for 100% continuity.',
          'Standardized global training curriculums for all levels.',
          'Improved job satisfaction and work-life balance metrics.'
        ],
        successStories: [
          'TechFlow achieved reduction in close-related overtime.',
          'Global Auto Parts reduced turnover post-implementation.'
        ]
      }
    }
  },
  {
    id: 'ma',
    title: 'M&A Integration Velocity',
    icon: 'GitMerge',
    heroMetric: 'Rapid Synergy',
    summary: "Deals are won or lost in the first 100 days. If you can't see the target's balance sheet risk or integrate their data on Day 1, synergies leak and ROI drops. This is about creating a repeatable 'integration engine' that allows you to scale M&A without increasing headcount, ensuring every deal hits its model targets faster.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Synergy Realization',
        pains: [
          'Market punishment due to slow integration visibility.',
          'Lack of visibility into acquired entity financials leads to surprise risks.',
          'Integration costs exceeding deal model assumptions.',
          'Deal value erodes while targets remain on legacy systems.'
        ],
        focus: 'The high strategic cost of fragmented visibility in high-stakes deals.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How long until you get a trusted close after Day 1?',
          'What is the value of capturing synergies 6 months earlier?',
          'Can you see the target balance sheet risk pre-acquisition?',
          'How many "different ways of closing" are in your portfolio?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Standardized M&A Playbook for Day 1 entity onboarding.',
          'Cross-ERP Connectivity Layer unifying data streams.',
          'Automated Verification Engine for opening balance sheets.',
          'Intercompany Hub for global entity settlement rules.'
        ],
        performanceStats: [
          'Full financial visibility within 30 days of Day 1 closure.',
          'Process deployed to new entities in record time.',
          'Automated data ingestion from target ERPs.',
          'Instant Day 1 control coverage.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Accelerated synergy value across the portfolio.',
          'Reduced integration-specific labor and consultant costs.',
          'Immediate 100% control coverage for newly acquired assets.',
          'Minimized integration execution risk in high-growth deals.'
        ],
        successStories: [
          'Zurich significantly reduced integration cycle time.',
          'Integrated multiple acquisitions without increasing overhead.',
          'Acceleration of deal model validation.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Synergy Velocity', category: 'Economic', formula: ['Deal Value', '×', 'Months Saved', '×', 'ROI'], desc: 'Quantifying the time-value of money for synergies.' },
          { label: 'Integration Labor Redux', category: 'Direct', formula: ['Target Full-Time Employees', '×', 'Manual % Redux'], desc: 'Scaling acquisition capacity without adding Integration staff.' }
        ],
        operational: [
          { label: 'Audit Ready Velocity', category: 'Direct', formula: ['Day 1 → Day 10 audited'], desc: 'Value of trusted Opening Balance Sheets within weeks.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Entity Onboarding',
        pains: [
          'Manual CoA mapping during critical transition windows.',
          'Reconciling fragmented target systems during integration.',
          'Operational chaos during the most critical First 100 Days.',
          'Inconsistent financial policies across newly merged teams.'
        ],
        focus: 'Operational chaos during the critical deal transition period.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How do you verify opening balance sheet integrity today?',
          'How long does it take to train target teams on your standards?',
          'Do you have a repeatable playbook for new entity close?',
          'How many "late corrections" are needed for new subsidiaries?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'ERP-Agnostic Reconciliations for any target system.',
          'AI-supported Automated Chart of Accounts Mapping Agents.',
          'Unified Integration Dashboard for project teams.',
          'Standardized journal workflows for newly acquired entities.'
        ],
        performanceStats: [
          'Reduction in manual data mapping and cleanup.',
          'Zero reporting surprises post-acquisition at quarter-end.',
          'Instant "on-rails" process for new staff.',
          'Zero manual spreadsheet mapping for intercompany.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Reduction in integration labor requirements for leads.',
          '100% control coverage on Day 1 for all assets.',
          'Standardized global training curriculums for all levels.',
          'Elimination of manual intercompany spreadsheet hell.'
        ],
        successStories: [
          'Zurich achieved Month 1 visibility for new acquisitions.',
          'Applied Day 1 controls to global acquisitions simultaneously.'
        ]
      }
    }
  },
  {
    id: 'innovation',
    title: 'Facilitating Innovation',
    icon: 'Lightbulb',
    heroMetric: 'Capacity Freed',
    summary: "Every company is trying to innovate, but finance is usually the handbrake. When your best analysts spend 90% of their month on ticking and tying, they aren't modeling your next market entry or ESG strategy. This is about reclaiming expensive brainpower and pointing it at high-ROI growth projects, moving finance from a back-office reporting shop to a growth engine.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Strategic Agility',
        pains: [
          'Strategic growth projects delayed because Finance is buried in manual work.',
          'Finance viewed as a cost center rather than a partner.',
          'Inability to support new business data needs without adding headcount.',
          'Inability to model "What-If" scenarios during close.'
        ],
        focus: 'Moving from a "Reporting Shop" to a high-impact partner.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What growth project would you start with 10 extra hours?',
          'Is your team spending 90% of their month on ticking or thinking?',
          'Can Finance support a new product launch in under 30 days?',
          'How many decisions were delayed by "Books being open"?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Automated Transaction Processing for standard events.',
          'Dynamic Resource Allocation via task analytics.',
          'One-Platform Scalability for ESG and non-financial data.',
          'Scenario Modeling Hub for real-time business partnering.'
        ],
        performanceStats: [
          'Automated processing of standard transactions.',
          'Dynamic load balancing of tasks.',
          'One-platform data ingestion for non-financials.',
          'Instant scenario model generation.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Direct ROI from previously stalled innovation initiatives.',
          'Avoidance of third-party strategy consultant fees.',
          'Acceleration of new market product launches worldwide.',
          'Total reduction in "Data Janitorial" labor org-wide.'
        ],
        successStories: [
          'Domino\'s reduced quarterly analyst call prep time.',
          'Significant senior staff reallocated to strategic growth.',
          'Accelerated delivery of strategic data projects.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Strategic Capacity', category: 'Economic', formula: ['Senior Salary', '×', '30% Reallocation'], desc: 'Applying brainpower to high-growth ROI tasks.' },
          { label: 'Market Entry Speed', category: 'Economic', formula: ['Revenue / Mo', '×', 'Months Saved'], desc: 'Value of accelerated time-to-market for new regions.' }
        ],
        operational: [
          { label: 'Ad-hoc Redux', category: 'Direct', formula: ['Analyst Count', '×', 'Request Hours'], desc: 'Value of self-service reporting for business leads.' },
          { label: 'Analysis Delta', category: 'Economic', formula: ['Hours Thinking', 'vs', 'Hours Ticking'], desc: 'Quantifying the shift from low-value to high-value brainpower.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'High-Value Work',
        pains: [
          'Career stagnation due to manual, repetitive data loops.',
          'Analytical time sacrificed to manual data manipulation.',
          'No time to investigate "Why" numbers moved, only "What".',
          'Lack of platform to share strategic insights.'
        ],
        focus: 'Solving business problems rather than manual data cleaning.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'What % of work is thinking vs. low-level data prep?',
          'Do you have time to explain Why numbers moved in Day 3?',
          'How many "last minute requests" can you handle in close?',
          'Are your business partners getting the "So What" from you?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Unified Close Management Platform with live analytics.',
          'One-Click Analytical Dashboards for business units.',
          'Automated Variance Analysis identifying outliers early.',
          'Natural language querying for instant data retrieval.'
        ],
        performanceStats: [
          'Elimination of redundant manual data entry tasks.',
          'Real-time automated variance identification.',
          'Instant retrieval of flux explanations.',
          'Zero-touch dashboard updates.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Significant analyst capacity freed for partnering.',
          'Improved forecast accuracy via better insight.',
          'Significant reduction in average "Time-to-Insight" cycles.',
          'Total visibility into drivers of variance across regions.'
        ],
        successStories: [
          'Domino\'s shifted staff from processing to strategic analysis.',
          'Higher job satisfaction scores in post-impl surveys.'
        ]
      }
    }
  },
  {
    id: 'decision',
    title: 'Real-Time Decision Making',
    icon: 'Activity',
    heroMetric: 'Day 1 Insights',
    summary: "Leading a company on 2-week-old data is like driving with a blacked-out windshield. In today's market, speed is a competitive advantage. This is about moving from lagging reporting to leading insights. By delivering trusted numbers on Day 1, we give leadership the ability to course-correct mid-month, optimize OpEx, and react to market shifts before the competition.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Agile Leadership',
        pains: [
          'Decisions are delayed because financial data is 2-3 weeks old.',
          'Meetings wasted debating which data source is correct.',
          'Reacting to market shifts 30 days too late for impact.',
          'Lack of confidence in mid-month liquidity snapshots.'
        ],
        focus: 'Reacting to market shifts 30 days too late for maximum ROI.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'Does your CEO trust the numbers on Day 1 of the month?',
          'How much time is lost debating the "Source of Truth"?',
          'Could you pivot marketing spend based on real-time cash?',
          'Can you see the impact of currency fluctuations in real-time?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Continuous Data Refresh from sub-ledger sources.',
          'Executive Health Dashboards with drill-to-transaction.',
          'Automated Narrative Generation explaining variances.',
          'Predictive modeling for intra-month course correction.'
        ],
        performanceStats: [
          'High forecasting accuracy through live visibility.',
          'Continuous data streaming from ERPs.',
          'Instant drill-down to transaction level.',
          'Automated narrative generation.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Improved market response leading to share gains.',
          'Avoidance of costly intra-quarter financial surprises.',
          'Optimized resource allocation based on live cash data.',
          'Reduced strategic forecasting cycle.'
        ],
        successStories: [
          'Hershey significantly accelerated reporting cycles.',
          'Reduction in quarterly prep time.',
          'Enabled Intra-Month course corrections for Operating Expense spend.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Decision Velocity', category: 'Economic', formula: ['Revenue', '×', '1% Margin Gain'], desc: 'Impact of timely course-correction on annual profit.' },
          { label: 'Inventory Holding Redux', category: 'Economic', formula: ['Inventory Value', '×', 'WACC %'], desc: 'Savings from better demand-supply alignment via live cash visibility.' }
        ],
        operational: [
          { label: 'Rework Redux', category: 'Direct', formula: ['Error Count', '×', 'Correction Time'], desc: 'Eliminating the "Day 12" variance drill and rework.' },
          { label: 'Variance Velocity', category: 'Direct', formula: ['Requests', '×', 'Research Hours'], desc: 'Value of instant drill-down for root cause analysis.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Insight Delivery',
        pains: [
          'Team spending 90% of time cleaning data vs. explaining.',
          'Manual Excel manipulation delaying monthly reports.',
          'Lack of drill-down capability from report to journal entry.',
          'Inability to provide "Flash" results during the close.'
        ],
        focus: 'Analysis time sacrificed to manipulation and cleaning of Dirty Data.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many different sources of truth exist today?',
          'What is the risk of a decision based on un-reconciled data?',
          'How long does it take to explain a $1M variance today?',
          'How many versions of "The Number" exist during close?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Anomaly Detection AI identifying variance early.',
          'Unified Reporting Layer across all legal entities.',
          'Real-time Variance Workflows for instant explanation.',
          'Direct GL-to-Report automated mapping architecture.'
        ],
        performanceStats: [
          'Real-time highlighting of variances for immediate review.',
          'Zero manual data cleaning; analysis starts immediately.',
          'Automated flux report generation.',
          'Instant anomaly detection alerts.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Shifted to 100% proactive analysis of business data.',
          'Elimination of rework from conflicting data sources.',
          'Zero manual cleaning; analysis starts on Day 1.',
          'Significant improvement in data reliability scores.'
        ],
        successStories: [
          'Hershey achieved faster generation of board packages.',
          'Direct audit reliance on system-generated flux reports.'
        ]
      }
    }
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    icon: 'FileText',
    heroMetric: 'Fine Avoidance',
    summary: "Regulatory pressure is non-stop, and manual compliance is a massive drain. If compliance is a 'drill' that happens once a quarter, you're at risk. This is about making compliance a touchless by-product of your daily process. When controls are automated and evidence is digital, you don't just avoid fines; you reclaim the thousands of hours your team currently spends on audit support.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Risk Mitigation',
        pains: [
          'Exposure to massive public fines for reporting failures.',
          'Constant struggle to keep up with changing global regulations (Tax, Statutory).',
          'Reputational damage of a public compliance breach.',
          'Board lacks confidence in control coverage across remote entities.'
        ],
        focus: 'Reputational and financial damage of a global compliance breach.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How are you preparing for rigorous transparency rules?',
          'Can you guarantee 100% control coverage across transactions?',
          'How much do you spend on compliance consultants annually?',
          'How many "un-monitored" entities are in your portfolio?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Continuous Monitoring Hub for all global control states.',
          'Automated SOX Frameworks built into the workflow.',
          'Cloud-native Governance with zero local debt.',
          'Systemic enforcement of Segregation of Duties (SoD).'
        ],
        performanceStats: [
          'Validated 100% control coverage for 100% of revenue.',
          'Real-time automated evidence collection.',
          'Systemic enforcement of SoD.',
          'Instant global compliance visibility.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Total quantifiable fine avoidance value for the board.',
          'Significant reduction in 3rd party audit consultant hours.',
          'Lower cost of insurance via Best-in-Class governance.',
          'Total reduction in internal control testing labor costs.'
        ],
        successStories: [
          'Coca-Cola achieved significant ROI via reduction in audit fees.',
          'Estimated fine avoidance for global firms.',
          'Navigated global regulatory shifts with zero rework.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Audit Fee Redux', category: 'Direct', formula: ['Audit Fee', '×', 'Reduction %'], desc: 'Direct reduction in third-party assurance costs.' },
          { label: 'Fine Avoidance Value', category: 'Economic', formula: ['Average Fine', '×', 'Risk Probability'], desc: 'Quantifying the economic value of non-compliance risk mitigation.' }
        ],
        operational: [
          { label: 'Evidence Gathering', category: 'Direct', formula: ['Entities', '×', 'Hours Saved'], desc: 'Automating the SOX evidence gathering drill.' },
          { label: 'Testing Labor Redux', category: 'Direct', formula: ['Controls Count', '×', 'Testing Time'], desc: 'Reclaiming time from internal audit and control testing teams.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Compliance Execution',
        pains: [
          'Manual log review to find unauthorized access/conflicts.',
          'Static checklists offering zero status visibility.',
          'Manual evidence gathering for hundreds of controls.',
          'Inability to track multi-jurisdictional changes manually.'
        ],
        focus: 'Compliance as a natural, verified by-product of daily work.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many exceptions were found in your last audit cycle?',
          'Are your checklists static files or live digital workflows?',
          'Do you have a single repository for all control evidence?',
          'How many staff are purely focused on "compliance chasing"?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Real-time Exception Tracking identifying errors instantly.',
          'Built-in Data Connectors for automated collection.',
          'Digital Signature providing audit proof.',
          'Systemic lock-down of periods preventing back-posting.'
        ],
        performanceStats: [
          'Real-time "Audit-Ready" state maintained all year.',
          'Elimination of manual testing for standard controls.',
          'Automated data connection and evidence logging.',
          'Instant exception alerts.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Saved significant hours per business unit via automation.',
          'Elimination of manual testing for financial controls.',
          'Real-time readiness for any regulatory inquiries.',
          'Consistent audit experience for partners worldwide.'
        ],
        successStories: [
          'Coca-Cola collected 100% of SOX evidence automatically.',
          'Reduction in manual control testing time.'
        ]
      }
    }
  },
  {
    id: 'trust',
    title: 'Trust Premium',
    icon: 'Lock',
    heroMetric: 'Audit Cost Redux',
    summary: "Market confidence is fragile. A single reporting error can wipe out billions in market cap and trigger a restatement nightmare. This is about building a 'wall of certainty' around your financial statements. When the board and auditors trust the data instantly, the business commands a valuation premium and avoids the 'risk tax' of uncertainty.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Brand Integrity',
        pains: [
          'Risk of public restatements destroying shareholder value.',
          'Uncertainty in financial accuracy creates risk for the Board.',
          'Loss of investor confidence due to restatements or errors.',
          'High cost of compliance in multi-jurisdictional audits.'
        ],
        focus: 'The extreme strategic cost of losing stakeholder and market trust.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What is the board\'s tolerance for a material weakness?',
          'What was the reputational cost of your last reporting surprise?',
          'How do you guarantee control compliance across 50+ entities?',
          'Do your analysts spend more time "fixing" or "reading" data?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Automated Internal Controls embedded in daily workflows.',
          'Digital Audit Trails providing permanent transparency.',
          'Global Governance Hub',
          'Real-time Flux Analysis for predictive risk identification.'
        ],
        performanceStats: [
          'Validated data lineage for every balance sheet line item.',
          'Auditor "Self-Service" reducing business disruption.',
          'Automated internal control monitoring.',
          'Real-time risk identification.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Avoidance of billion-dollar market cap drop scenarios.',
          'Reduction in external billable audit support fees.',
          'Lower cost of capital via reduced risk profiles.',
          'Total elimination of manual spreadsheet-based control risk.'
        ],
        successStories: [
          'eBay had zero audit findings across complex global entities.',
          'Valuation premium for reliable reporting.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'External Audit Savings', category: 'Direct', formula: ['Annual Audit Fees', '×', 'Efficiency %'], desc: 'Direct reduction in billable auditor hours due to reliance on system controls.' },
          { label: 'Remediation Avoidance', category: 'Economic', formula: ['Remediation Cost'], desc: 'Avoided cost of consultants and contractors to fix control failures.' },
          { label: 'Debt Financing Risk', category: 'Economic', formula: ['Loan Value', '×', 'Rate Spread'], desc: 'Mitigating interest rate hikes due to material weakness/reporting risk.' }
        ],
        operational: [
          { label: 'SOX Labor Redux', category: 'Direct', formula: ['Controls', '×', 'Testing Time'], desc: 'Eliminating manual testing for 70% of scope.' },
          { label: 'Rework Redux', category: 'Direct', formula: ['Cycle Time', '×', 'Error %'], desc: 'Value of zero-correction reporting cycles.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Audit Readiness',
        pains: [
          'Audit fire drills stopping all regular high-value work.',
          'Fragmented evidence storage across disparate network folders.',
          'Reactive compliance drills preventing strategic analysis.',
          'Significant rework required for quarterly SEC filings.'
        ],
        focus: 'Compliance as a natural, touchless by-product of daily execution.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many hours does your team spend gathering auditor data?',
          'Can you trace balance sheet numbers back to source in <1 min?',
          'How many control failures were identified in the last cycle?',
          'Are auditors onsite for weeks or using a portal interface?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Centralized Evidence Repository with automated capture.',
          'System-level Seperation of Duties Enforcement preventing unauthorized posts.',
          'Automated Flux Analysis identifying risk before audit.',
          'Digital Signature workflows for 100% accountability.'
        ],
        performanceStats: [
          'High accuracy with zero adjustments post-close.',
          'Continuous audit-ready state 365 days a year.',
          '100% data lineage and transaction visibility.',
          'Automated evidence collection.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Saved significant hours of manual record hunting per cycle.',
          'Consistent reporting standards regardless of staff turnover.',
          '100% data lineage and transaction visibility for leads.',
          'Automated "Continuous Audit" status for all legal entities.'
        ],
        successStories: [
          'eBay achieved 100% automated SOX evidence collection.',
          'Reduction in audit support time for leads.'
        ]
      }
    }
  },
  {
    id: 'ai_ops',
    title: 'Scaling Trusted AI',
    icon: 'Brain',
    heroMetric: '99.9% Clean Data',
    summary: "AI is the next industrial revolution for finance, but 'AI on dirty data' is just fast-tracking errors. If your data isn't reconciled and standardized, your AI strategy will fail. This is about building the trusted data foundation required for autonomous accounting. By delivering 99.9% clean data, we ensure your AI agents can actually execute tasks, not just provide suggestions.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'AI Transformation',
        pains: [
          'AI tools fail because underlying financial data is not standardized.',
          'Competitors gaining efficiency while our data remains trapped in silos.',
          'High cost of manual data cleansing for LLM ingestion.',
          'Board pressure to deploy AI without a governance roadmap.'
        ],
        focus: 'Avoidable AI obsolescence due to foundational data gaps.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'Is your Finance data actually ready for Agentic AI?',
          'What is the risk of an AI agent acting on un-reconciled data?',
          'How much do you spend on manual normalization today?',
          'Can your AI tools "see" data across all your ERP instances?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Verity AI Standardized Data Lake for financial data.',
          'Agentic Accounting Hub for autonomous execution.',
          'Automated Data Stewardship ensuring constant clean state.',
          'AI Governance Layer for verifiable automated journals.'
        ],
        performanceStats: [
          '99.9% clean, standardized data across multiple ERPs.',
          'Automated creation of standard journal entries.',
          'Automated data stewardship.',
          'Verifiable AI governance.'
        ]
      },
      justifyValue: {
        title: 'The Metrics That Drive Impact',
        metrics: [
          'Direct ROI multiplier on existing enterprise GenAI spend.',
          'Reduction in manual data cleaning labor costs.',
          'Measurable accounting accuracy gains via AI validation.',
          'Future-proofed AI governance framework for Finance.'
        ],
        successStories: [
          'AI accuracy increased significantly on the BlackLine platform.',
          'Faster scaling of strategic AI use-cases.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'AI Reclaim', category: 'Economic', formula: ['Manual Task Value', '×', '40% Reclaim'], desc: 'Freeing up Full-Time Employees with autonomous accounting agents.' },
          { label: 'Data Stewardship Value', category: 'Direct', formula: ['Cleansing Hours', '×', 'FTE Rate'], desc: 'Eliminating the "Data Janitor" cost for enterprise AI initiatives.' }
        ],
        operational: [
          { label: 'Copilot Value', category: 'Direct', formula: ['Accountant Count', '×', '10% Speed Boost'], desc: 'Productivity gain from AI-assisted research.' },
          { label: 'Exception Handling Redux', category: 'Direct', formula: ['Exceptions', '×', 'AI Match Rate'], desc: 'Reducing manual research for unmatched transactions by 50%.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Trusted Automation',
        pains: [
          'AI flagging thousands of false positives due to noise.',
          'Copilots rendered useless without standardized context.',
          'AI as a "distraction" rather than a powerful accelerator.',
          'Lack of confidence in system-generated automated journals.'
        ],
        focus: 'AI as a powerful, trusted accelerator rather than noise and chasers.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'What is your current accuracy rate for AI data ingestion?',
          'Would you trust an AI to suggest a $1M journal today?',
          'How many manual spreadsheets do you use to "fix" ERP data?',
          'Are your controllers afraid of or empowered by AI tools?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Self-cleaning Data Pipelines for high-volume transactions.',
          'Predictive Accounting Agents identifying flux outliers.',
          'Natural language querying for non-technical users.',
          'AI-assisted account reconciliation research agents.'
        ],
        performanceStats: [
          'Zero-manual-touch for standard intercompany posts.',
          'Total elimination of manual data re-formatting for AI.',
          'Self-cleaning data pipelines.',
          'Instant natural language query results.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Team freed from data janitorial tasks forever.',
          '100% elimination of manual data re-formatting for AI.',
          'Consistent data integrity ensuring long-term AI trust.',
          'Enabled autonomous execution of repetitive close steps.'
        ],
        successStories: [
          'Reduction in manual data prep for reporting leads.',
          'AI accuracy increased significantly on the BlackLine platform.'
        ]
      }
    }
  },
];
