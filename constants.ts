
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
      createValue: {
        title: 'Strategic Alignment',
        pains: [
          'Linear hiring required to scale operations, dragging down margins.',
          'Processing bottlenecks delaying capital reallocation and insights.'
        ],
        focus: 'Manual close operations destroying organizational agility.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How does a 10-day close limit course-correction in volatile markets?',
          'What is the opportunity cost of senior talent performing data entry?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Centralized Governance Hub',
          'Continuous Close Architecture',
          'Automated Data Ingestion'
        ],
        proofPoints: [
          'Leading firms reduce close cycle time by 40-60%.',
          'Average 3-day reduction in consolidated reporting cycles.',
          '100% visibility into global task status.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Direct reduction in external audit fees by 20-30%.',
          'EPS improvement via G&A OpEx reduction.',
          'Zero-headcount scaling for future growth.',
          '40% reduction in reporting cycle variance.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Execution Excellence',
        pains: [
          'Burnout from excessive overtime during peak cycles.',
          'Spreadsheet version chaos leading to rework and material error.'
        ],
        focus: 'Operational friction preventing accurate reporting.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many hours per month are spent on repetitive ticking and tying?',
          'What is the risk if a Day 2 error is only found on Day 12?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'High-Volume Transaction Matching',
          'Standardized Task Checklists',
          'Intelligent Journal Templates'
        ],
        proofPoints: [
          'Auto-certification of 85% of low-risk accounts.',
          '90% reduction in journal preparation time.',
          'Real-time "Percent Complete" dashboarding.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '3,000+ FTE hours released per $1B in revenue.',
          '100% elimination of redundant manual effort.',
          '95% reduction in close-related overtime.',
          'Instant visibility into global entity status.'
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
    summary: 'Unlock trapped cash flow by accelerating unapplied cash processing and collections.',
    executivePov: {
      createValue: {
        title: 'Capital Optimization',
        pains: [
          'High cost of external capital during global expansion.',
          'Market cap depressed by poor cash utilization.'
        ],
        focus: 'Cost of borrowing while internal capital sits idle.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What would a 10-day DSO reduction mean for your M&A war chest?',
          'Does your board have real-time visibility into global liquidity?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Real-time Cash Visibility',
          'Predictive AR Analytics',
          'Unified Invoice-to-Cash'
        ],
        proofPoints: [
          'Release of $10M-$50M in cash flow per $1B revenue.',
          '20% reduction in bad debt write-offs.',
          'CCC improvement relative to industry peers.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Measurable improvement in WACC.',
          'Significant increase in Free Cash Flow (FCF).',
          'Direct P&L benefit via interest savings.',
          'Enhanced cash conversion predictability.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Cash Processing',
        pains: [
          'Backlog of unapplied cash stopping sales and credit checks.',
          'Manual hunting for remittance across fragmented portals.'
        ],
        focus: 'Inefficient collections cycles damaging relationships.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How long does it take to apply complex multi-currency payments?',
          'How often are best customers called for paid invoices?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'AI-Driven Cash Application',
          'Intelligent Collections Worklists',
          'Integrated Dispute Management'
        ],
        proofPoints: [
          '90%+ auto-matching for fragmented payments.',
          '30% increase in collector productivity.',
          '80% reduction in time-to-application.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '12-day average reduction in DSO.',
          '50% reduction in unapplied cash volume.',
          'Elimination of manual entry for 90% of items.',
          'Improved customer relationship health scores.'
        ]
      }
    }
  },
  {
    id: 'trust',
    title: 'Trust Premium',
    icon: 'Lock',
    heroMetric: '10-15% Valuation Uplift',
    summary: 'Command a valuation premium through verifiable integrity and automated controls.',
    executivePov: {
      createValue: {
        title: 'Brand Integrity',
        pains: [
          'Risk of public restatements destroying shareholder value.',
          'Board anxiety regarding control coverage in high-growth regions.'
        ],
        focus: 'The cost of losing stakeholder and market trust.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What is the board\'s tolerance for a material weakness disclosure?',
          'What was the reputational cost of your last reporting surprise?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Automated Internal Controls',
          'Digital Audit Trails',
          'Certified Global Compliance Hub'
        ],
        proofPoints: [
          'Up to 15% valuation premium for reliable reporting.',
          'Zero audit findings across 40+ global entities.',
          'Auditor "Self-Service" capability.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Avoidance of billion-dollar market cap drops.',
          '25% reduction in external audit fees.',
          'Lower cost of capital via reduced perceived risk.',
          'Maximized Board and investor transparency.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Audit Readiness',
        pains: [
          'Audit fire drills stopping all regular accounting work.',
          'Fragmented evidence storage across disparate folders.'
        ],
        focus: 'Reactive compliance drills preventing value-add work.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many hours does your team spend gathering data for auditors?',
          'Can you trace balance sheet numbers back to source in <1 min?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Centralized Evidence Repository',
          'System-level SoD Enforcement',
          'Automated Flux Analysis'
        ],
        proofPoints: [
          '100% automated SOX evidence collection.',
          '75% reduction in audit support time.',
          '99.9% accuracy with no manual adjustments.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'External audit reliance increased from 20% to 80%.',
          'Elimination of manual hunting (400+ hours saved).',
          'Consistent reporting regardless of turnover.',
          '100% data lineage and transaction visibility.'
        ]
      }
    }
  },
  {
    id: 'innovation',
    title: 'Facilitating Innovation',
    icon: 'Lightbulb',
    heroMetric: '30% Capacity Freed',
    summary: 'Free up capacity for value-add activities and major strategic growth projects.',
    executivePov: {
      createValue: {
        title: 'Strategic Agility',
        pains: [
          'High-ROI growth projects stalled due to Finance capacity.',
          'Finance viewed as a cost center rather than a partner.'
        ],
        focus: 'Competitive obsolescence due to Finance paralysis.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What growth project would you start if you had 10 extra hours per week?',
          'Is your team spending 90% of their month on ticking or thinking?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Automated Transaction Processing',
          'Dynamic Resource Allocation',
          'One-Platform Scalability'
        ],
        proofPoints: [
          '30% of senior staff reallocated to strategic projects.',
          'ESG reporting readiness accelerated by 6 months.',
          'Scaled 3 market entries without headcount growth.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Direct ROI from previously stalled innovation.',
          'Avoidance of third-party consultant fees.',
          'Acceleration of new market product launches.',
          'Expanded capacity for ESG and sustainability tracking.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'High-Value Work',
        pains: [
          'Career stagnation due to manual, repetitive cycles.',
          'Analytical time sacrificed to manual data manipulation.'
        ],
        focus: 'Solving business problems rather than manual cleaning.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'What percentage of your work is thinking vs. low-level ticking?',
          'Do you have time to explain Why numbers moved, or just What?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Unified Close Management Platform',
          'One-Click Analytical Dashboards',
          'Automated Variance Analysis'
        ],
        proofPoints: [
          'Staff shift from 80% processing to 80% analysis.',
          '100% elimination of redundant data tasks.',
          '40% higher job satisfaction scores.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '20+ hours per person month freed for partnering.',
          'Improved forecast accuracy by 15%.',
          'Significant reduction in "Time-to-Insight".',
          'Empowered business units with self-service analytics.'
        ]
      }
    }
  },
  {
    id: 'talent',
    title: 'Talent Retention',
    icon: 'Users',
    heroMetric: 'Turnover < 8%',
    summary: 'Eliminate mundane work to attract and retain top-tier financial talent.',
    executivePov: {
      createValue: {
        title: 'Human Capital',
        pains: [
          'Disruption and knowledge loss from senior staff attrition.',
          'Prohibitive replacement costs in a competitive market.'
        ],
        focus: 'The multi-million dollar talent tax on repetitive work.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'What is the loaded cost of losing your top 10% of Finance talent?',
          'Does your tech stack attract or repel modern university hires?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Consumer-Grade User Experience',
          'Remote/Hybrid Close Enablement',
          'Value-added Career Paths'
        ],
        proofPoints: [
          'Retention rates improved from 85% to 92%+.',
          'Successful attraction of talent from "Prestige" firms.',
          'Finance engagement scores outperforming average.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Recruitment savings ($500K+ per senior hire).',
          'Preservation of institutional process knowledge.',
          'Significantly improved eNPS scores.',
          'Reduced reliance on high-cost temp labor.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Employee Experience',
        pains: [
          'Acute burnout from fatigue and repetitive cycles.',
          'Legacy tools that don\'t support modern collaboration.'
        ],
        focus: 'Preventing low engagement and preventable errors.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'Does your team work more than 2 weekends a month during close?',
          'How long does it take to train a new hire on your manuals?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Automated Journal Workflows',
          'Intuitive Integrated Cloud Workspace',
          'Real-time Task Guidance'
        ],
        proofPoints: [
          '90% reduction in close-related overtime.',
          'Onboarding time reduced from 3 months to 2 weeks.',
          'Zero-defect reporting via auto-validation.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '15% improvement in overall team productivity.',
          'Reduced sick leave and stress-related absence.',
          'Digitized process documentation for continuity.',
          'Standardized global training curriculums.'
        ]
      }
    }
  },
  {
    id: 'ma',
    title: 'M&A Integration Velocity',
    icon: 'GitMerge',
    heroMetric: '3x Faster Synergy',
    summary: 'Accelerate synergy capture with a standardized Day 1 integration playbook.',
    executivePov: {
      createValue: {
        title: 'Synergy Realization',
        pains: [
          'Market punishment due to slow integration visibility.',
          'Financial black holes post-deal on legacy systems.'
        ],
        focus: 'The cost of fragmented visibility in high-stakes deals.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How long until you get a trusted close after Day 1?',
          'What is the value of capturing synergies 6 months earlier?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Standardized M&A Playbook',
          'Cross-ERP Connectivity Layer',
          'Automated Verification Engine'
        ],
        proofPoints: [
          'Integration cycle time reduced by 3x.',
          'Full financial visibility within 30 days of Day 1.',
          'Integrated 10+ acquisitions without overhead growth.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Millions in accelerated synergy value.',
          'Reduced integration-specific labor and consultant costs.',
          'Immediate control compliance for all assets.',
          'Minimized integration execution risk.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Entity Onboarding',
        pains: [
          'Manual CoA mapping during critical transition days.',
          'Reconciling Franken-systems during transition periods.'
        ],
        focus: 'Operational chaos during the most critical 100 days.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How do you verify opening balance sheet integrity today?',
          'How long does it take to train targets on your standards?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'ERP-Agnostic Reconciliations',
          'Automated CoA Mapping Agents',
          'Unified Integration Dashboard'
        ],
        proofPoints: [
          'Month 1 visibility for all acquisitions.',
          'Process deployed to new entities in <15 days.',
          '90% reduction in manual data mapping work.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          '60% reduction in integration labor requirements.',
          'Zero reporting surprises post-acquisition.',
          '100% control coverage on Day 1.',
          'Automated intercompany eliminations.'
        ]
      }
    }
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    icon: 'FileText',
    heroMetric: '$1-5M Fine Avoidance',
    summary: 'Make compliance a by-product of a controlled process instead of a manual drill.',
    executivePov: {
      createValue: {
        title: 'Risk Mitigation',
        pains: [
          'Exposure to public fines for reporting failures.',
          'ESG and tax rules becoming moving targets.'
        ],
        focus: 'Reputational damage of a compliance breach.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'How are you preparing for rigorous ESG transparency rules?',
          'Can you guarantee 100% control coverage across transactions?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Continuous Monitoring Hub',
          'Automated SOX/ESG Frameworks',
          'Cloud-native Governance Architecture'
        ],
        proofPoints: [
          'Estimated $1M-$5M fine avoidance for large firms.',
          '6.0x ROI via reduction in internal/external audit fees.',
          'Navigated 5+ global regulatory shifts with zero rework.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Total quantifiable fine avoidance value.',
          'Significant reduction in audit consultant hours.',
          'Lower cost of insurance via Best-in-Class governance.',
          'Validated global financial policy adherence.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Compliance Execution',
        pains: [
          'Manual log review to find unauthorized access/conflicts.',
          'Static checklists offering zero status visibility.'
        ],
        focus: 'Compliance as a natural by-product of daily work.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many exceptions were found in your last audit?',
          'Are your checklists static files or live digital workflows?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Real-time Exception Tracking',
          'Built-in ESG Data Connectors',
          'Digital Signature/Time-Stamping'
        ],
        proofPoints: [
          '100% of SOX evidence collected automatically.',
          '80% reduction in control testing time.',
          'Real-time "Audit-Ready" state year-round.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Saved 200+ hours per BU via integrated compliance.',
          'Zero manual testing for 70% of controls.',
          'Real-time readiness for surprise inquiries.',
          'Eliminated manual spreadsheet control risk.'
        ]
      }
    }
  },
  {
    id: 'decision',
    title: 'Real-Time Decision Making',
    icon: 'Activity',
    heroMetric: 'Day 1 Insights',
    summary: 'Shift from lagging reporting to leading insights with real-time data visibility.',
    executivePov: {
      createValue: {
        title: 'Agile Leadership',
        pains: [
          'Decisions based on stale data that is 2-3 weeks old.',
          'Surprises and conflicting numbers during reviews.'
        ],
        focus: 'Reacting to market shifts 30 days too late.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'Does your CEO trust the numbers on Day 1 of the month?',
          'How much time is lost debating the "Source of Truth"?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Continuous Data Refresh',
          'Executive Health Dashboards',
          'Automated Narrative Generation'
        ],
        proofPoints: [
          'Reporting cycle reduced from 15 days to 3.',
          '98%+ forecasting accuracy through live visibility.',
          'Enabled Intra-Month course corrections.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Improved market response leading to share gains.',
          'Avoidance of costly financial surprises.',
          'Optimized resource allocation based on live data.',
          'Reduced strategic forecasting cycle time.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Insight Delivery',
        pains: [
          'Team spending 90% of time cleaning data vs. explaining.',
          'Manual Excel manipulation delaying stale reports.'
        ],
        focus: 'Analysis time sacrificed to manipulation of Dirty Data.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'How many different sources of truth exist today?',
          'What is the risk of a decision based on un-reconciled data?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Anomaly Detection AI',
          'Unified Reporting Layer',
          'Real-time Variance Workflows'
        ],
        proofPoints: [
          '80% faster generation of management packages.',
          'Real-time highlighting of variances for investigation.',
          '100% single source of truth established.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Shifted to 100% proactive analysis.',
          'Elimination of rework from conflicting sources.',
          'Zero manual cleaning; analysis starts immediately.',
          'Enabled real-time drill-down to transactions.'
        ]
      }
    }
  },
  {
    id: 'ai_ops',
    title: 'Scaling Trustworthy AI',
    icon: 'Brain',
    heroMetric: '99.9% Clean Data',
    summary: 'Build the trusted data foundation required for agentic AI and automated insights.',
    executivePov: {
      createValue: {
        title: 'AI Transformation',
        pains: [
          'Strategic AI investments failing due to "Dirty Data".',
          'Missing the efficiency wave while data stays siloed.'
        ],
        focus: 'AI obsolescence due to foundational data gaps.'
      },
      captureValue: {
        title: 'Probing Questions',
        questions: [
          'Is your Finance data actually ready for Agentic AI?',
          'What is the risk of an AI agent acting on un-reconciled data?'
        ]
      },
      deliverValue: {
        title: 'Strategic Capability',
        capabilities: [
          'Verity AI Standardized Data Lake',
          'Agentic Accounting Hub',
          'Automated Data Stewardship'
        ],
        proofPoints: [
          '70% faster scaling of AI use-cases.',
          '99.9% clean, standardized data across ERPs.',
          'AI-led forecasting with <1% variance.'
        ]
      },
      justifyValue: {
        title: 'The Hard Numbers',
        metrics: [
          'Direct ROI multiplier on existing GenAI spend.',
          '30% reduction in data cleaning labor costs.',
          'Measurable accounting accuracy gains.',
          'Future-proofed AI governance framework.'
        ]
      }
    },
    operationalPov: {
      createValue: {
        title: 'Trusted Automation',
        pains: [
          'AI flagging thousands of false positives due to noise.',
          'Copilots rendered useless without standardized context.'
        ],
        focus: 'AI as a powerful accelerator rather than noise.'
      },
      captureValue: {
        title: 'Discovery Questions',
        questions: [
          'What is your current accuracy rate for AI ingestion?',
          'Would you trust an AI to suggest a $1M journal entry today?'
        ]
      },
      deliverValue: {
        title: 'Tactical Capability',
        capabilities: [
          'Self-cleaning Data Pipelines',
          'Predictive Accounting Agents',
          'Natural Language Querying'
        ],
        proofPoints: [
          '90% reduction in manual data prep for reporting.',
          'AI accuracy increased by 40% on BlackLine.',
          'Instant data reliability for non-technical users.'
        ]
      },
      justifyValue: {
        title: 'Efficiency Gains',
        metrics: [
          'Team freed from low-level data janitorial tasks.',
          '100% elimination of manual re-formatting.',
          'Consistent data integrity ensuring AI trust.',
          'AI-assisted variance and flux explanations.'
        ]
      }
    }
  },
];

// PERSONAS for navigation and role-based analysis
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

// MOCK_BENCHMARK_DATA for customer case studies
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
You are a senior Value Engineer at BlackLine. Your goal is to analyze business scenarios, products, or pain points and map them to the BlackLine Value Driver Model.
...
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
    calc_sec_ma: 'M&A Integration',
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
    drv_working_capital: 'Working Capital',
    drv_trust: 'Trust Premium',
    drv_ma: 'M&A Velocity',
    drv_compliance: 'Compliance',
    drv_talent: 'Talent Retention',
    drv_innovation: 'Innovation',
    drv_decision: 'Real-Time Insights',
    drv_ai_ops: 'Scaling AI',
  }
};
