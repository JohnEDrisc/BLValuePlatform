
import { ProductItem, BenchmarkCase, SkoDriverDetail, Persona } from './types';

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
  { id: 'talent', value: 'Talent Retention', nameKey: 'drv_talent' },
  { id: 'innovation', value: 'Facilitating Innovation', nameKey: 'drv_innovation' },
  { id: 'decision', value: 'Real-Time Decision Making', nameKey: 'drv_decision' },
  { id: 'ai_ops', value: 'Scaling Trusted AI', nameKey: 'drv_ai_ops' },
];

const FULL_SKO_PERSONAS = {
  executive: [
    { role: 'CEO', icon: 'Target', nightmare: 'Missing earnings guidance due to unforeseen cash flow visibility gaps.', aspiration: 'Fund global strategic growth organically via best-in-class operational efficiency.' },
    { role: 'CFO', icon: 'TrendingUp', nightmare: 'Drawing on expensive credit lines for avoidable working capital shortfall.', aspiration: 'Maximizing FCF velocity to fund aggressive M&A and transformative R&D.' },
    { role: 'CAO', icon: 'ShieldCheck', nightmare: 'Unexplained cash variances leading to a high-profile audit failure.', aspiration: 'A clean, reconciled balance sheet providing absolute certainty to the Board.' },
    { role: 'CIO', icon: 'Cpu', nightmare: 'Fragile legacy FTP scripts failing during close, causing massive technical debt.', aspiration: 'Unified cloud governance with automated, self-healing integrations.' }
  ],
  operational: [
    { role: 'Shared Service Leader', icon: 'Globe', nightmare: 'Throwing hundreds of heads at unapplied cash backlogs in emerging markets.', aspiration: 'Touchless volume scaling and standardized global operating models.' },
    { role: 'Accounting Manager', icon: 'Users', nightmare: 'Reviewing 10,000 transaction rows manually in fragmented spreadsheets.', aspiration: 'Empowered team focusing on strategic variance investigation over data entry.' },
    { role: 'End User', icon: 'User', nightmare: 'Logging in at 7 AM to manually download bank PDFs and match line-by-line.', aspiration: 'Upskilling into strategic business partnering and high-impact forecasting.' }
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
          'Linear hiring required to scale operations, dragging down margins as revenue grows.',
          'Processing bottlenecks delaying capital reallocation and quarterly insights.',
          'Costly manual checks required for the "Last Mile" of global reporting.',
          'Inability to absorb volume spikes without massive overtime costs.'
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
        proofPoints: [
          'Leading firms reduce close cycle time by 40-60% in 12 months.',
          'Average 3-day reduction in consolidated reporting cycles.',
          '100% visibility into global task status for leadership.',
          'Elimination of manual follow-up emails via automated logic.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Reduction in external audit fees by 20-30% via self-service.',
          'EPS improvement via G&A OpEx reduction and labor optimization.',
          'Zero-headcount scaling for future geographic expansion.',
          '40% reduction in reporting cycle variance and rework.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'OpEx Optimization', formula: ['Total FTEs', '×', 'Manual %', '×', 'Avg Salary'], desc: 'Reclaiming capacity for high-ROI business analysis.' },
          { label: 'Audit Fee Redux', formula: ['Audit Fees', '×', '25% Reduction'], desc: 'Lowering the cost of external assurance via self-service data.' }
        ],
        operational: [
          { label: 'Overtime Saved', formula: ['Annual OT Hours', '×', '1.5x Hourly Rate'], desc: 'Eliminating peak-cycle burnout and premium labor costs.' },
          { label: 'Volume Reclaim', formula: ['Entities', '×', 'Hours Saved'], desc: 'Standardizing global workflows to absorb new entity volume.' }
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Execution Excellence',
        pains: [
          'Acute burnout from excessive overtime during peak close cycles.',
          'Spreadsheet version chaos leading to rework and material error.',
          'Redundant ticking and tying across fragmented accounting data.',
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
          'High-Volume Transaction Matching for bank and intercompany data.',
          'Standardized Task Checklists ensuring global compliance.',
          'Intelligent Journal Templates with automated validation rules.',
          'Automated certification for low-risk, high-volume accounts.'
        ],
        proofPoints: [
          'Auto-certification of 85% of low-risk bank reconciliations.',
          '90% reduction in journal preparation time via automation.',
          'Real-time "Percent Complete" dashboarding for the Controller.',
          'Elimination of manual follow-up emails for task status.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '3,000+ FTE hours released per $1B in annual revenue.',
          '100% elimination of redundant effort in bank matching.',
          '95% reduction in close-related overtime for staff.',
          'Instant visibility into global entity status for regional leads.'
        ]
      }
    }
  },
  {
    id: 'working_cap',
    title: 'Working Capital Optimization',
    icon: 'DollarSign',
    heroMetric: '$10-50M Release / $1B Rev',
    isPlImpact: true,
    summary: "Cash is the lifeblood of growth. Right now, millions are likely trapped in your unapplied cash backlogs or slow collection cycles. This isn't just a process gap—it's expensive, idle capital. By accelerating cash processing, we lower your cost of funding and give leadership a bigger 'war chest' to fund strategic growth internally.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Capital Optimization',
        pains: [
          'High cost of external capital during global expansion.',
          'Market cap depressed by poor cash utilization metrics.',
          'Negative cash conversion cycles relative to industry peers.',
          'Restricted credit lines due to slow unapplied cash application.'
        ],
        focus: 'The avoidable cost of borrowing while internal capital sits idle.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What would a 10-day DSO reduction mean for your M&A budget?',
          'Does your board have real-time visibility into global liquidity?',
          'How often are sales blocked because of unapplied cash backlogs?',
          'How much cash is sitting "un-applied" on your balance sheet today?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Real-time Cash Visibility across all global bank portals.',
          'Predictive AR Analytics identifying high-risk collection trends.',
          'Unified Invoice-to-Cash platform for global standardized ops.',
          'Automated dispute resolution workflows for faster closure.'
        ],
        proofPoints: [
          'Release of $10M-$50M in cash flow per $1B annual revenue.',
          '20% reduction in bad debt write-offs via better tracking.',
          'CCC improvement by 12+ days relative to industry average.',
          'Reduction in unapplied cash volumes by up to 80%.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Measurable improvement in WACC and borrowing costs.',
          'Significant increase in Free Cash Flow for investment.',
          'Direct P&L benefit via interest savings on debt lines.',
          'Enhanced cash conversion predictability for analysts.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'WACC Benefit', formula: ['Released Cash', '×', 'WACC %'], desc: 'Direct saving on the cost of funding for the business.' },
          { label: 'Bad Debt Redux', formula: ['Bad Debt', '×', '15% Improvement'], desc: 'Value of proactive collection risk management.' }
        ],
        operational: [
          { label: 'AR Productivity', formula: ['Daily Volume', '×', 'Automation %'], desc: 'Increasing collector bandwidth by 5x through prioritization.' },
          { label: 'Unapplied Cash Redux', formula: ['Idle Cash', '×', '80% Velocity Boost'], desc: 'Releasing trapped liquidity into operating cash accounts.' }
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
        proofPoints: [
          '90%+ auto-matching for fragmented global payments.',
          '30% increase in collector productivity and coverage.',
          '80% reduction in time-to-application for complex wires.',
          'Elimination of manual cash application errors by over 95%.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '12-day average reduction in Days Sales Outstanding (DSO).',
          '50% reduction in unapplied cash volume within 6 months.',
          'Elimination of manual data entry for 90% of line items.',
          'Significant reduction in lockbox and bank processing fees.'
        ]
      }
    }
  },
  {
    id: 'trust',
    title: 'Trust Premium',
    icon: 'Lock',
    heroMetric: '15% Valuation Uplift',
    summary: "Market confidence is fragile. A single reporting error can wipe out billions in market cap and trigger a restatement nightmare. This is about building a 'wall of certainty' around your financial statements. When the board and auditors trust the data instantly, the business commands a valuation premium and avoids the 'risk tax' of uncertainty.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Brand Integrity',
        pains: [
          'Risk of public restatements destroying shareholder value.',
          'Board anxiety regarding control coverage in high-growth regions.',
          'Brand damage from material weakness disclosures.',
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
        proofPoints: [
          'Up to 15% valuation premium for reliable reporting.',
          'Zero audit findings across 40+ complex global entities.',
          'Auditor "Self-Service" reducing business disruption.',
          'Validated data lineage for every balance sheet line item.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Avoidance of billion-dollar market cap drop scenarios.',
          '25% reduction in external billable audit support fees.',
          'Lower cost of capital via reduced risk profiles.',
          'Total elimination of manual spreadsheet-based control risk.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Valuation Premium', formula: ['Market Cap', '×', '2% Premium'], desc: 'Impact of trusted financials on stock price.' },
          { label: 'Insurance Cost Redux', formula: ['D&O Premium', '×', '10% Savings'], desc: 'Direct reduction in insurance costs via better governance.' }
        ],
        operational: [
          { label: 'SOX Labor Redux', formula: ['Controls', '×', 'Testing Time'], desc: 'Eliminating manual testing for 70% of scope.' },
          { label: 'Rework Redux', formula: ['Cycle Time', '×', 'Error %'], desc: 'Value of zero-correction reporting cycles.' }
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
          'System-level SoD Enforcement preventing unauthorized posts.',
          'Automated Flux Analysis identifying risk before audit.',
          'Digital Signature workflows for 100% accountability.'
        ],
        proofPoints: [
          '100% automated SOX evidence collection and storage.',
          '75% reduction in audit support time for leads.',
          '99.9% accuracy with zero adjustments post-close.',
          'Continuous audit-ready state 365 days a year.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Saved 400+ hours of manual record hunting per cycle.',
          'Consistent reporting standards regardless of staff turnover.',
          '100% data lineage and transaction visibility for leads.',
          'Automated "Continuous Audit" status for all legal entities.'
        ]
      }
    }
  },
  {
    id: 'ma',
    title: 'M&A Integration Velocity',
    icon: 'GitMerge',
    heroMetric: '3x Faster Synergy',
    summary: "Deals are won or lost in the first 100 days. If you can't see the target's balance sheet risk or integrate their data on Day 1, synergies leak and ROI drops. This is about creating a repeatable 'integration engine' that allows you to scale M&A without increasing headcount, ensuring every deal hits its model targets faster.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Synergy Realization',
        pains: [
          'Market punishment due to slow integration visibility.',
          'Financial black holes post-deal on legacy systems.',
          'Integration costs exceeding deal model assumptions.',
          'Diluted ROI from targets staying on legacy ERPs too long.'
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
        proofPoints: [
          'Integration cycle time reduced by 3x compared to legacy.',
          'Full financial visibility within 30 days of Day 1 closure.',
          'Integrated 10+ acquisitions without increasing overhead.',
          'Acceleration of deal model validation by over 4 months.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Millions in accelerated synergy value across the portfolio.',
          'Reduced integration-specific labor and consultant costs.',
          'Immediate 100% control coverage for newly acquired assets.',
          'Minimized integration execution risk in high-growth deals.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Synergy Velocity', formula: ['Deal Value', '×', 'Months Saved', '×', 'ROI'], desc: 'Quantifying the time-value of money for synergies.' },
          { label: 'Integration Labor Redux', formula: ['Target FTEs', '×', 'Manual % Redux'], desc: 'Scaling acquisition capacity without adding Integration staff.' }
        ],
        operational: [
          { label: 'Mapping Efficiency', formula: ['Entities', '×', 'Mapping Hours'], desc: 'Reducing manual CoA mapping labor by 90% via AI.' },
          { label: 'Audit Ready Velocity', formula: ['Day 1 → Day 10 audited'], desc: 'Value of trusted Opening Balance Sheets within weeks.' }
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
          'Automated CoA Mapping Agents for unified reporting.',
          'Unified Integration Dashboard for project teams.',
          'Standardized journal workflows for newly acquired entities.'
        ],
        proofPoints: [
          'Month 1 visibility for 100% of new global acquisitions.',
          'Process deployed to new entities in under 15 business days.',
          '90% reduction in manual data mapping and cleanup.',
          'Zero reporting surprises post-acquisition at quarter-end.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '60% reduction in integration labor requirements for leads.',
          '100% control coverage on Day 1 for all assets.',
          'Standardized global training curriculums for all levels.',
          'Elimination of manual intercompany spreadsheet hell.'
        ]
      }
    }
  },
  {
    id: 'talent',
    title: 'Talent Retention',
    icon: 'Users',
    heroMetric: 'Retention > 92%',
    summary: "The war for finance talent is over—talent won. If your team is spending 80% of their time on manual data janitorial work, your best people will leave for firms that prioritize analysis. Replacing a senior accountant costs 1.5x their salary. This is about upskilling your team and making finance a high-engagement 'think tank' rather than a data entry factory.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Human Capital',
        pains: [
          'Disruption and knowledge loss from senior staff attrition.',
          'The multi-million dollar talent tax on manual work.',
          'University hires leaving due to lack of analytical growth.',
          'Acute brand damage in recruiting due to "burnout culture".'
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
        proofPoints: [
          'Retention rates improved from 85% to over 92% annually.',
          'Finance engagement scores outperforming company average.',
          'Onboarding time reduced from 3 months to under 2 weeks.',
          'Reduction in staff burnout reports by over 60%.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Recruitment savings ($500K+ per senior management hire).',
          'Preservation of critical institutional process knowledge.',
          'Significantly improved eNPS scores across the Finance org.',
          'Reduced reliance on high-cost temp and contractor labor.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Replacement Redux', formula: ['Turnover %', '×', '1.5x Salary'], desc: 'Avoiding the extreme cost of hiring and training.' },
          { label: 'Recruiting Fee Savings', formula: ['Hires', '×', 'Agency Fee'], desc: 'Direct saving on 25% agency fees via internal career mobility.' }
        ],
        operational: [
          { label: 'Temp Labor Redux', formula: ['Peak Hours', '×', 'Premium Rate'], desc: 'Eliminating peak-cycle contractor spend.' },
          { label: 'Training Velocity', formula: ['Weeks Saved', '×', 'Manager Salary'], desc: 'Value of reduced manual oversight for new hires.' }
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
        proofPoints: [
          '90% reduction in close-related overtime for staff.',
          'Onboarding time reduced by 70% for new finance hires.',
          'Significant reduction in stress-related absence.',
          '100% adoption of analytical tools by data entry staff.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '15% improvement in overall team daily productivity.',
          'Digitized process documentation for 100% continuity.',
          'Standardized global training curriculums for all levels.',
          'Improved job satisfaction and work-life balance metrics.'
        ]
      }
    }
  },
  {
    id: 'innovation',
    title: 'Facilitating Innovation',
    icon: 'Lightbulb',
    heroMetric: '30% Capacity Freed',
    summary: "Every company is trying to innovate, but finance is usually the handbrake. When your best analysts spend 90% of their month on ticking and tying, they aren't modeling your next market entry or ESG strategy. This is about reclaiming expensive brainpower and pointing it at high-ROI growth projects, moving finance from a back-office reporting shop to a growth engine.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Strategic Agility',
        pains: [
          'High-ROI growth projects stalled due to Finance capacity.',
          'Finance viewed as a cost center rather than a partner.',
          'ESG and sustainability projects under-resourced for data.',
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
        proofPoints: [
          '30% of senior staff reallocated to strategic growth.',
          'ESG reporting readiness accelerated by over 6 months.',
          'Scaled 3 new market entries without increasing headcount.',
          'Reduction in quarterly analyst call prep time by 40%.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Direct ROI from previously stalled innovation initiatives.',
          'Avoidance of third-party strategy consultant fees.',
          'Acceleration of new market product launches worldwide.',
          'Total reduction in "Data Janitorial" labor org-wide.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Strategic Capacity', formula: ['Senior Salary', '×', '30% Reallocation'], desc: 'Applying brainpower to high-growth ROI tasks.' },
          { label: 'Market Entry Speed', formula: ['Revenue / Mo', '×', 'Months Saved'], desc: 'Value of accelerated time-to-market for new regions.' }
        ],
        operational: [
          { label: 'Ad-hoc Redux', formula: ['Analyst Count', '×', 'Request Hours'], desc: 'Value of self-service reporting for business leads.' },
          { label: 'Analysis Delta', formula: ['Hours Thinking', 'vs', 'Hours Ticking'], desc: 'Quantifying the shift from low-value to high-value brainpower.' }
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
        proofPoints: [
          'Staff shift from 80% processing to 80% strategic analysis.',
          '100% elimination of redundant manual data entry tasks.',
          '40% higher job satisfaction scores in post-impl surveys.',
          'Significant increase in finance-led recommendations.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '20+ hours per person month freed for partnering.',
          'Improved forecast accuracy by 15% via better insight.',
          'Significant reduction in average "Time-to-Insight" cycles.',
          'Total visibility into drivers of variance across regions.'
        ]
      }
    }
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    icon: 'FileText',
    heroMetric: '$1-5M Fine Avoidance',
    summary: "Regulatory pressure is non-stop, and manual compliance is a massive drain. If compliance is a 'drill' that happens once a quarter, you're at risk. This is about making compliance a touchless by-product of your daily process. When controls are automated and evidence is digital, you don't just avoid fines; you reclaim the thousands of hours your team currently spends on audit support.",
    personas: FULL_SKO_PERSONAS,
    executivePov: {
      createValue: {
        title: 'Risk Mitigation',
        pains: [
          'Exposure to massive public fines for reporting failures.',
          'ESG and tax regulations becoming moving targets.',
          'Reputational damage of a public compliance breach.',
          'Board anxiety over geographic control black holes.'
        ],
        focus: 'Reputational and financial damage of a global compliance breach.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How are you preparing for rigorous ESG transparency rules?',
          'Can you guarantee 100% control coverage across transactions?',
          'How much do you spend on compliance consultants annually?',
          'How many "un-monitored" entities are in your portfolio?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Continuous Monitoring Hub for all global control states.',
          'Automated SOX/ESG Frameworks built into the workflow.',
          'Cloud-native Governance with zero local debt.',
          'Systemic enforcement of Segregation of Duties (SoD).'
        ],
        proofPoints: [
          'Estimated $1M-$5M fine avoidance for global firms.',
          '6.0x ROI via reduction in external audit fees.',
          'Navigated 5+ global regulatory shifts with zero rework.',
          'Validated 100% control coverage for 100% of revenue.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Total quantifiable fine avoidance value for the board.',
          'Significant reduction in 3rd party audit consultant hours.',
          'Lower cost of insurance via Best-in-Class governance.',
          'Total reduction in internal control testing labor costs.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Audit Fee Redux', formula: ['Audit Fee', '×', '25% Reduction'], desc: 'Direct reduction in third-party assurance costs.' },
          { label: 'Fine Avoidance Value', formula: ['Average Fine', '×', 'Risk Probability'], desc: 'Quantifying the economic value of non-compliance risk mitigation.' }
        ],
        operational: [
          { label: 'Evidence Gathering', formula: ['Entities', '×', 'Hours Saved'], desc: 'Automating the SOX evidence gathering drill.' },
          { label: 'Testing Labor Redux', formula: ['Controls Count', '×', 'Testing Time'], desc: 'Reclaiming time from internal audit and control testing teams.' }
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
          'Built-in ESG Data Connectors for automated collection.',
          'Digital Signature providing audit proof.',
          'Systemic lock-down of periods preventing back-posting.'
        ],
        proofPoints: [
          '100% of SOX evidence collected automatically.',
          '80% reduction in manual control testing time.',
          'Real-time "Audit-Ready" state maintained all year.',
          'Zero manual testing for 70% of standard controls.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Saved 200+ hours per business unit via automation.',
          'Zero manual testing for 70% of financial controls.',
          'Real-time readiness for any regulatory inquiries.',
          'Consistent audit experience for partners worldwide.'
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
          'Decisions based on stale data that is 2-3 weeks old.',
          'Surprises and conflicting numbers during reviews.',
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
        proofPoints: [
          'Reporting cycle reduced from 15 days to under 3 days.',
          '98%+ forecasting accuracy through live visibility.',
          'Enabled Intra-Month course corrections for OpEx spend.',
          'Reduction in quarterly prep time by over 50%.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Improved market response leading to share gains.',
          'Avoidance of costly intra-quarter financial surprises.',
          'Optimized resource allocation based on live cash data.',
          'Reduced strategic forecasting cycle by over 50%.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'Decision Velocity', formula: ['Revenue', '×', '1% Margin Gain'], desc: 'Impact of timely course-correction on annual profit.' },
          { label: 'Inventory Holding Redux', formula: ['Inventory Value', '×', 'WACC %'], desc: 'Savings from better demand-supply alignment via live cash visibility.' }
        ],
        operational: [
          { label: 'Rework Redux', formula: ['Error Count', '×', 'Correction Time'], desc: 'Eliminating the "Day 12" variance drill and rework.' },
          { label: 'Variance Velocity', formula: ['Requests', '×', 'Research Hours'], desc: 'Value of instant drill-down for root cause analysis.' }
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
        proofPoints: [
          '80% faster generation of board management packages.',
          'Real-time highlighting of variances for immediate review.',
          'Zero manual data cleaning; analysis starts immediately.',
          'Direct audit reliance on system-generated flux reports.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Shifted to 100% proactive analysis of business data.',
          'Elimination of rework from conflicting data sources.',
          'Zero manual cleaning; analysis starts on Day 1.',
          'Significant improvement in data reliability scores.'
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
          'Strategic AI investments failing due to "Dirty Data".',
          'Missing the efficiency wave while data stays siloed.',
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
        proofPoints: [
          '70% faster scaling of strategic AI use-cases.',
          '99.9% clean, standardized data across multiple ERPs.',
          'AI-led forecasting with under 1% intra-month variance.',
          'Automated creation of 40% of standard journal entries.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Direct ROI multiplier on existing enterprise GenAI spend.',
          '30% reduction in manual data cleaning labor costs.',
          'Measurable accounting accuracy gains via AI validation.',
          'Future-proofed AI governance framework for Finance.'
        ]
      },
      roiCalculations: {
        executive: [
          { label: 'AI Reclaim', formula: ['Manual Task Value', '×', '40% Reclaim'], desc: 'Freeing up FTEs with autonomous accounting agents.' },
          { label: 'Data Stewardship Value', formula: ['Cleansing Hours', '×', 'FTE Rate'], desc: 'Eliminating the "Data Janitor" cost for enterprise AI initiatives.' }
        ],
        operational: [
          { label: 'Copilot Value', formula: ['Accountant Count', '×', '10% Speed Boost'], desc: 'Productivity gain from AI-assisted research.' },
          { label: 'Exception Handling Redux', formula: ['Exceptions', '×', 'AI Match Rate'], desc: 'Reducing manual research for unmatched transactions by 50%.' }
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
          'Natural Language Querying for non-technical users.',
          'AI-assisted account reconciliation research agents.'
        ],
        proofPoints: [
          '90% reduction in manual data prep for reporting leads.',
          'AI accuracy increased by 40% on the BlackLine platform.',
          'Zero-manual-touch for 40% of standard intercompany posts.',
          'Total elimination of manual data re-formatting for AI.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Team freed from data janitorial tasks forever.',
          '100% elimination of manual data re-formatting for AI.',
          'Consistent data integrity ensuring long-term AI trust.',
          'Enabled autonomous execution of repetitive close steps.'
        ]
      }
    }
  },
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

export const SYSTEM_PROMPT = `
You are a world-class BlackLine Value Engineer. Your task is to map business scenarios, products, or pain points to the 9-Driver BlackLine Value Model.

CRITICAL REQUIREMENT:
The JSON response MUST include unique, quantified data for EVERY ONE of the 9 Value Drivers in "valueDriverImpacts". 
DO NOT use placeholders like "N/A" or generic "Standard platform benefit".
If a driver is less relevant, extrapolate a strategic "Second-Order" impact (e.g., how Efficiency enables Innovation).

Value Drivers to include in "valueDriverImpacts":
1. Process Efficiency
2. Working Capital Optimization
3. Trust Premium
4. M&A Integration Velocity
5. Regulatory Compliance
6. Talent Retention
7. Facilitating Innovation
8. Real-Time Decision Making
9. Scaling Trusted AI

Structure:
- valueDriverImpacts: Object with 9 keys (Exact names above). Each value: { message: string, metric: string, relevance: "High"|"Medium"|"Low" }.
- kpiHighlights: Array of { title, metric, context }.
- valueChain: Detailed array of { feature, benefit, value }.
- businessScenarios: Array of { scenario, solution }.
- objectionHandling: Array of { objection, rebuttal }.
- talkTrack: Long-form executive narrative.
- discoveryQuestions: 4-6 high-gain questions.
- cfoPunchline, caoPunchline, cioPunchline: Power messages.
- references: List of industry benchmarks.

Tone: Highly strategic and quantified.
`;

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
    hero_desc: 'The strategic framework for articulating financial operations value in the modern enterprise.',
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
    platform_value_btn: 'Full Platform Value',
    platform_value_desc: 'Strategic impact of the complete Financial Operations Management suite.',
    nav_solutions: 'Browse by Solution',
    nav_industries: 'Browse by Industry',
    nav_personas: 'Browse by Persona',
    cat_platform: 'Platform',
    cat_close: 'Financial Close',
    cat_intercompany: 'Intercompany',
    cat_invoice: 'Invoice-to-Cash',
    selected_scope: 'Selected Scope',
    new_analysis: 'New Analysis',
    new_btn_mobile: 'New',
    nav_help_title: 'Navigating results',
    nav_help_text: 'Use the rail tools to chat with an AI assistant or pivot the industry context.',
    strategic_drivers: 'Strategic Value Matrix',
    projected_impact: 'Projected Impact',
    calc_export: 'Export Report',
    export_word: 'Download Word',
    calc_title: 'Value Assessment',
    calc_subtitle: 'Quantify the financial impact of transformation.',
    calc_btn: 'Generate Results',
    calc_tab_company: 'Company',
    calc_tab_ops: 'Operations',
    calc_tab_risk: 'Risk',
    calc_tab_ma: 'M&A',
    calc_tab_inv: 'Investment',
    calc_sec_company: 'Company Profile',
    calc_sec_org: 'Organization',
    calc_sec_process: 'Process & Operations',
    calc_sec_metrics: 'Financial Metrics',
    calc_sec_risk: 'Risk & Compliance',
    calc_sec_ma: 'M&A Integration Velocity',
    calc_sec_inv: 'Investment Horizon',
    dash_title: 'Value Assessment Dashboard',
    dash_subtitle: 'Strategic ROI Analysis',
    dash_total_val: 'Annual Value',
    dash_cum_val: 'Cumulative Value',
    dash_roi: 'ROI Multiple',
    dash_proj: 'Financial Projection',
    dash_chart_cf: 'Annual Cash Flow',
    dash_chart_net: 'Cumulative Net Cash Flow',
    dash_tbl_metric: 'Metric',
    dash_tbl_costs: 'Investment Costs',
    dash_tbl_benefits: 'Value Benefits',
    dash_tbl_net: 'Cumulative Net',
    dash_tbl_driver: 'Value Driver',
    dash_tbl_ann: 'Base Value',
    dash_tbl_cons: 'Conservative',
    dash_tbl_likely: 'Likely',
    dash_tbl_opt: 'Optimistic',
    dash_kpi_title: 'KPI Benchmarks Summary',
    dash_kpi_bench: 'Metric',
    dash_kpi_target: 'Target',
    dash_kpi_impact: 'Impact',
    bench_title: 'Customer Benchmarks',
    bench_subtitle: 'Validated outcomes from the global BlackLine community.',
    bench_stat_avg_roi: 'Avg ROI Multiple',
    bench_stat_total_sav: 'Annual Savings',
    bench_stat_cases: 'Case Studies',
    bench_filter_industry: 'Industry',
    bench_filter_driver: 'Value Driver',
    bench_filter_account: 'Account',
    bench_wip_badge: 'BETA RELEASE',
    hub_title: 'Coaching Hub',
    hub_subtitle: 'AI-powered call intelligence and sales coaching.',
    ind_manufacturing: 'Manufacturing',
    ind_retail: 'Retail',
    ind_financial: 'Financial Services',
    ind_healthcare: 'Healthcare',
    ind_energy: 'Energy',
    ind_tech: 'Technology',
    ind_public: 'Public Sector',
    ind_services: 'Professional Services',
    drv_process: 'Process Efficiency',
    drv_working_capital: 'Working Capital Optimization',
    drv_trust: 'Trust Premium',
    drv_ma: 'M&A Integration Velocity',
    drv_compliance: 'Regulatory Compliance',
    drv_talent: 'Talent Retention',
    drv_innovation: 'Facilitating Innovation',
    drv_decision: 'Real-Time Decision Making',
    drv_ai_ops: 'Scaling Trusted AI',
    lbl_cust_name: 'Customer Name',
    lbl_revenue: 'Annual Revenue',
    lbl_industry: 'Industry',
    lbl_public_priv: 'Company Type',
    lbl_market_cap: 'Market Cap',
    lbl_entities: 'Number of Entities',
    lbl_regions: 'Geographic Regions',
    lbl_erps: 'Number of ERPs',
    lbl_wacc: 'WACC (%)',
    lbl_ftes: 'Total Finance FTEs',
    lbl_acct_ftes: 'Accounting FTEs',
    lbl_salary: 'Avg FTE Salary',
    lbl_turnover: 'Turnover Rate (%)',
    lbl_manual: 'Manual Work (%)',
    lbl_res_recs: 'Recs Resources',
    lbl_time_recs: 'Time on Recs (%)',
    lbl_res_journal: 'Journal Resources',
    lbl_time_journal: 'Time on Journals (%)',
    lbl_overtime: 'Annual Close Overtime (Hrs)',
    lbl_time_fill: 'Avg Time to Fill (Days)',
    lbl_cost_replace: 'Cost to Replace (%)',
    lbl_close_days: 'Financial Close Cycle (Days)',
    lbl_dso: 'Current DSO (Days)',
    lbl_recs_vol: 'Monthly Recs Volume',
    lbl_recs_pct: 'Accounts Reconciled (%)',
    lbl_journal_vol: 'Monthly Journals Volume',
    lbl_restatements: 'Prior Restatements',
    lbl_weakness: 'Material Weakness',
    lbl_fines: 'Prior Fines ($)',
    lbl_manual_proc: 'Manual Process Risk (%)',
    lbl_acq_year: 'Acquisitions / Year',
    lbl_deal_size: 'Avg Deal Size ($)',
    lbl_int_cost: 'Integration Cost / Deal',
    lbl_int_time: 'Integration Time (Mo)',
    lbl_ma_return: 'Expected Ma Return (%)',
    lbl_retention: 'Talent Retention Target',
    lbl_ma_turnover: 'Historic Ma Turnover (%)',
    lbl_inv_horizon: 'Investment Horizon',
    lbl_ramp: 'Year 1 Ramp (%)',
    lbl_sw_cost: 'Software Costs (Annual)',
    lbl_svc_cost: 'Service Costs (Annual)',
  }
};
