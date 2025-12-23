import { ProductItem, BenchmarkCase, SkoDriverDetail, Persona } from './types';

// --- PRODUCTS & INDUSTRIES ---

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

// --- ENRICHED SKO DATA (Single Source of Truth) ---

export const SKO_DATA: SkoDriverDetail[] = [
  {
    id: 'working_cap',
    title: 'Working Capital Optimization',
    icon: 'Coins',
    heroMetric: '$50M+ Cash Freed',
    summary: 'Accelerate cash conversion by automating the matching of high-volume bank data to open invoices. Reduce unallocated cash and Days Sales Outstanding (DSO) to free up capital for strategic investment.',
    isPlImpact: true,
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Free Cash Flow to fund M&A.", nightmare: "Drawing on expensive credit lines." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Clean, reconciled balance sheet.", nightmare: "Unexplained cash variances." },
            { role: "CIO", icon: 'Cpu', aspiration: "Automated banking integrations.", nightmare: "Fragile FTP scripts failing." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Zero unapplied cash at month-end.", nightmare: "3 days of manual matching." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Team analyzing variances, not data.", nightmare: "Reviewing 5,000 transaction rows." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Learning cash flow analysis.", nightmare: "Downloading bank PDFs at 7 AM." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Cash Trapped in Process",
            focus: "Strategic Liquidity",
            pains: [
                "Trapped capital in unallocated cash buffers prevents strategic R&D investment.",
                "Inability to forecast short-term liquidity due to slow AR matching cycles.",
                "Erosion of supplier trust due to delayed dispute resolution and payments."
            ]
        },
        captureValue: {
            title: "Quantifying the Lag",
            questions: [
                "How much working capital is currently trapped in unapplied cash suspense accounts?",
                "If we reduced DSO by just 2 days, what would that capital infusion allow you to fund immediately?",
                "What is the annualized cost of capital for funds tied up in dispute cycles?"
            ]
        },
        deliverValue: {
            title: "Automated Liquidity",
            capabilities: ["High-Volume Matching", "Automated Journals", "Dispute Workflow"],
            proofPoints: ["30% Reduction in Unapplied Cash", "2-Day Improvement in DSO", "Real-time Cash Visibility"]
        },
        justifyValue: {
            title: "Liquidity Impact",
            metrics: ["$2M Annual Interest Savings", "40% Faster Cycle Time", "Zero Unallocated Cash"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Working Capital Unlock",
                    formula: ["( Annual Revenue / 365 )", "×", "( Current DSO - Target DSO )", "×", "Cost of Capital"],
                    desc: "Calculates the pure cash value of accelerating collections by reducing Day Sales Outstanding."
                },
                {
                    label: "Unapplied Cash Interest Savings",
                    formula: ["Average Unapplied Cash Balance", "×", "Annual Interest Rate (Cost of Debt)"],
                    desc: "Savings realized by applying cash faster and reducing reliance on short-term credit lines."
                }
            ],
            operational: [
                {
                    label: "FTE Reallocation (Cash Apps)",
                    formula: ["( Total Transaction Volume × Manual Match Time )", "÷", "Annual Working Hours per FTE"],
                    desc: "Determines how many full-time employees can be shifted from data matching to collections analysis."
                },
                {
                    label: "Dispute Resolution Efficiency",
                    formula: ["Avg Dispute Resolution Hours", "×", "Hourly Rate", "×", "Total Disputes"],
                    desc: "Hard cost savings from faster dispute workflow and reduced manual email chasing."
                }
            ]
        }
    },
    operationalPov: {
        createValue: {
            title: "The Manual Matching Grind",
            focus: "Operational Speed",
            pains: [
                "The team loses 3-4 days every month manually downloading bank files and 'ticking and tying' thousands of transactions in Excel just to see who paid us.",
                "High stress levels spike during close because unidentified payments (mystery cash) create massive variances that must be investigated under tight deadlines.",
                "Constant friction with the collections team, who are chasing customers for money that has already been paid but hasn't been posted to the ledger yet."
            ]
        },
        captureValue: {
            title: "Operational Drag",
            questions: [
                "Walk me through your morning routine—how many banking portals do you log into just to get the data to start your day?",
                "What is the actual percentage of transactions that auto-match in your ERP today versus those you have to touch manually?",
                "How frequently do you have to reopen a closed period or restate cash positions because of timing errors in cash application?"
            ]
        },
        deliverValue: {
            title: "Match & Clear",
            capabilities: ["Intelligent Rules Engine", "Bank File Integration", "Exception Handling"],
            proofPoints: ["95% Auto-Match Rate", "Elimination of Spreadsheets", "Daily Reconciliation"]
        },
        justifyValue: {
            title: "Time Returned",
            metrics: ["3,000+ Hours Saved/Year", "99.9% Accuracy", "Shift to Analysis"]
        },
        roiCalculations: {
             executive: [],
             operational: [
                {
                    label: "Productivity Gain",
                    formula: ["( (Manual Mins - Auto Mins) × Volume )", "÷", "60 mins"],
                    desc: "Total hours returned to the team by automating the high-volume transactional matching."
                },
                {
                    label: "Error Remediation Savings",
                    formula: ["Errors per Month", "×", "Avg Time to Investigate & Fix", "×", "Hourly Rate"],
                    desc: "Cost avoidance of fixing manual data entry errors and misapplied cash."
                }
             ]
        }
    }
  },
  {
    id: 'process',
    title: 'Process Efficiency',
    icon: 'Zap',
    heroMetric: '60% Close Time Reduction',
    summary: 'Eliminate the "last mile" crunch of financial close. Automate repetitive journal entries, reconciliations, and variance analysis to shift F&A focus from data assembly to data analysis.',
    isPlImpact: true,
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Velocity and cost efficiency.", nightmare: "Slow close delays guidance." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Audit-ready at all times.", nightmare: "Restatement due to manual error." },
            { role: "CIO", icon: 'Cpu', aspiration: "System consolidation.", nightmare: "Tech debt from legacy tools." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Global process standardization.", nightmare: "Cowboy accounting in Excel." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Capacity planning accuracy.", nightmare: "Burnout and high turnover." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Strategic analysis work.", nightmare: "Manual data entry." }
        ]
    },
    executivePov: {
        createValue: {
            title: "The Capacity Gap",
            focus: "Organizational Velocity",
            pains: [
                "Highly compensated resources are consumed by low-value data aggregation tasks.",
                "Inability to scale finance operations without linearly adding headcount.",
                "Delayed reporting cycles prevent timely corrective management actions."
            ]
        },
        captureValue: {
            title: "Cost of Complexity",
            questions: [
                "What percentage of your team's capacity is consumed by manual data entry vs. strategic analysis?",
                "If we could automate 70% of routine journals, how would you redeploy that headcount?",
                "What is the cost of delaying your monthly results release by 3-5 days?"
            ]
        },
        deliverValue: {
            title: "Touchless Close",
            capabilities: ["Account Reconciliations", "Journal Entry Automation", "Task Management"],
            proofPoints: ["Automated Low-Risk Recs", "Standardized Global Process", "Audit Trail Readiness"]
        },
        justifyValue: {
            title: "Efficiency Gains",
            metrics: ["10-Day Close to 4-Day Close", "70% Auto-Certification", "Audit Fee Reduction"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Period Close Hard Savings",
                    formula: ["Days Reduced", "×", "Daily Burn Rate of Finance Dept"],
                    desc: "Direct savings from reducing the number of days the entire department is locked in 'close mode'."
                },
                {
                    label: "Audit Fee Reduction",
                    formula: ["Total External Audit Fees", "×", "% Reduction (Typically 10-20%)"],
                    desc: "Negotiated savings derived from providing auditors self-service access and cleaner data."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Late Nights & Broken Spreadsheets",
            focus: "Work-Life Balance",
            pains: [
                "The month-end close involves chronic overtime, late nights, and weekends, leading to exhaustion and low morale across the team.",
                "Heavy dependency on fragile, massive Excel files linked to other workbooks that break easily when a shared drive is moved or a file is renamed.",
                "A pervasive fear of failing audits due to missing support documentation or broken links in the reconciliation files."
            ]
        },
        captureValue: {
            title: "Manual Fatigue",
            questions: [
                "Can you estimate how many individual spreadsheets are currently required just to close the books each month?",
                "How much time do you spend emailing people to ask 'Are you done yet?' or chasing approvals for journal entries?",
                "What typically happens to the process if the 'owner' of the master checklist calls in sick or leaves the company?"
            ]
        },
        deliverValue: {
            title: "Unified Workspace",
            capabilities: ["Centralized Workspace", "Auto-Flux Analysis", "Integrated Storage"],
            proofPoints: ["Zero Email Chasing", "Instant Variance Alerts", "Single Source of Truth"]
        },
        justifyValue: {
            title: "Operational Sanity",
            metrics: ["Zero Overtime Close", "100% On-Time Completion", "Happy Teams"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "JE Automation ROI",
                    formula: ["( Total JEs × % Auto-Certifiable )", "×", "Mins per JE", "×", "Hourly Rate"],
                    desc: "Time savings from journals that are created and posted automatically without human touch."
                },
                {
                    label: "Flux Analysis Speed",
                    formula: ["Hours spent compiling variance reports", "×", "Frequency", "×", "Hourly Rate"],
                    desc: "Savings from system-generated variance explanations vs. manual data aggregation."
                }
            ]
        }
    }
  },
  {
    id: 'talent',
    title: 'Talent Retention',
    icon: 'Users',
    heroMetric: '40% Lower Attrition',
    summary: 'Modern finance talent refuses to perform robotic work. By automating the mundane, you retain top-tier CPAs and analysts who demand engaging, strategic work environments.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Building organizational capability.", nightmare: "Recruiting fees & knowledge loss." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Retaining institutional knowledge.", nightmare: "Brain drain of top performers." },
            { role: "CIO", icon: 'Cpu', aspiration: "Modern tech stack.", nightmare: "Supporting legacy attrition." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Upskilling the team.", nightmare: "Constant training of new hires." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Engaged, happy team.", nightmare: "Managing constant churn." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Clear career path.", nightmare: "Dead-end data entry job." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Brain Drain Risk",
            focus: "Workforce Strategy",
            pains: [
                "Losing high-potential finance talent to competitors with more modern tech stacks.",
                "High recruiting and onboarding costs due to churn in the accounting function.",
                "Generational refusal (Gen Z/Millennials) to accept manual, tick-and-tie roles."
            ]
        },
        captureValue: {
            title: "The Boredom Tax",
            questions: [
                "What is your current turnover rate in the controllership vs. the industry average?",
                "How much institutional knowledge walks out the door every time a Senior Accountant resigns?",
                "Are you selling 'strategic finance' in interviews but delivering 'spreadsheet maintenance'?"
            ]
        },
        deliverValue: {
            title: "Purpose-Driven Work",
            capabilities: ["Modern UX", "Gamified Task Tracking", "Strategic Focus"],
            proofPoints: ["Higher Employee NPS", "Faster Onboarding", "Destination Employer Status"]
        },
        justifyValue: {
            title: "Retention Value",
            metrics: ["$150k Saved per Retained CPA", "Higher Engagement Scores", "Internal Promotion Rate"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Attrition Avoidance",
                    formula: ["( Total Finance Headcount × Reduction in Churn Rate )", "×", "Avg Replacement Cost"],
                    desc: "Direct savings on recruiting fees, temp agencies, and lost productivity during vacancy."
                },
                {
                    label: "Onboarding Efficiency",
                    formula: ["New Hires per Year", "×", "Reduction in Ramp Time (Months)", "×", "Monthly Salary"],
                    desc: "Value of getting new accountants to full productivity faster via standardized workflows."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Career Stagnation",
            focus: "Professional Growth",
            pains: [
                "Feeling like a 'data janitor' rather than a financial analyst, spending all day cleaning data instead of interpreting it.",
                "Lack of visibility into the bigger financial picture because you are stuck in siloed spreadsheet work.",
                "Fear of resume obsolescence because you are mastering manual processes while peers are mastering automation tools."
            ]
        },
        captureValue: {
            title: "Skill Utilization",
            questions: [
                "What percentage of your work week is spent using the actual CPA analysis skills you studied for?",
                "Do you have time to learn the business operations, or are you just processing transactions to meet a deadline?",
                "Would you enthusiastically recommend your specific daily role to a peer at another company?"
            ]
        },
        deliverValue: {
            title: "Analyst Evolution",
            capabilities: ["Exception-Based Work", "Analytics Dashboards", "Cross-Team Collaboration"],
            proofPoints: ["Resume-Building Tech Skills", "Shift to Business Partnering", "Reduced Drudgery"]
        },
        justifyValue: {
            title: "Career Impact",
            metrics: ["Promotion Velocity", "Skill Acquisition", "Job Satisfaction"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "Manual Hours Converted",
                    formula: ["Total hours shifted from data entry", "→", "FP&A Support Analysis"],
                    desc: "A qualitative measure of how much capacity is shifted from low-value to high-value work."
                },
                {
                    label: "Overtime Reduction",
                    formula: ["Avg Overtime Hours per Close", "×", "Overtime Hourly Rate", "×", "12 Months"],
                    desc: "Direct personal value in terms of work-life balance and reduced burnout."
                }
            ]
        }
    }
  },
  {
    id: 'ma',
    title: 'M&A Integration Velocity',
    icon: 'Briefcase',
    heroMetric: '50% Faster Synergy',
    summary: 'Decouple financial integration from ERP consolidation. Gain immediate visibility and control over acquired entities without waiting for a multi-year IT migration project.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Synergy capture.", nightmare: "Deal dilution." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Integration control.", nightmare: "Unknown acquired liabilities." },
            { role: "CIO", icon: 'Cpu', aspiration: "Data unification.", nightmare: "ERP fragmentation." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Process unity.", nightmare: "Shadow systems." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Onboarding speed.", nightmare: "Culture clash." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Unified data access.", nightmare: "Manual consolidation." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Integration Drag",
            focus: "Deal Value Realization",
            pains: [
                "Inability to validate acquired balance sheets until months after close.",
                "High risk of inherited financial irregularities in acquired entities.",
                "Delayed synergy realization due to prolonged ERP migration timelines."
            ]
        },
        captureValue: {
            title: "Cost of Blindness",
            questions: [
                "How long does it currently take to get full visibility into an acquired company's cash position?",
                "What is the risk exposure of running disparate processes for 12-24 months post-acquisition?",
                "How much TSA (Transition Service Agreement) cost could be saved by closing the books independently sooner?"
            ]
        },
        deliverValue: {
            title: "Day 1 Visibility",
            capabilities: ["ERP Agnostic Connectors", "Standardized Templates", "Global Visibility"],
            proofPoints: ["Instant Balance Sheet Control", "Unified Close Checklist", "Reduced TSA Duration"]
        },
        justifyValue: {
            title: "Deal Economics",
            metrics: ["Reduced TSA Costs", "Faster Synergy Capture", "Lower Integration Risk"]
        },
        roiCalculations: {
             executive: [
                {
                    label: "TSA Exit Savings",
                    formula: ["Monthly TSA Fee", "×", "Months Reduced via Early Integration"],
                    desc: "Hard dollar savings from ending Transition Service Agreements ahead of schedule."
                },
                {
                    label: "Synergy Acceleration",
                    formula: ["Annual Synergy Value", "×", "( Months Accelerated / 12 )"],
                    desc: "Cash value of realizing deal synergies (cost cuts/revenue) earlier in the fiscal year."
                }
             ],
             operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Data Integration Chaos",
            focus: "System Fragmentation",
            pains: [
                "Manually consolidating trial balances from completely different ERP systems into a master sheet is error-prone and stressful.",
                "Mapping charts of accounts in massive, crash-prone Excel files that only one person understands.",
                "Chasing acquired employees for data via email without established relationships or authority."
            ]
        },
        captureValue: {
            title: "Mapping Fatigue",
            questions: [
                "How many different ERPs are you currently extracting data from to build the consolidated pack?",
                "How long does the monthly consolidation mapping process take you personally?",
                "How do you currently handle historical data access from the acquired entity?"
            ]
        },
        deliverValue: {
            title: "Unified Layer",
            capabilities: ["Data Import Wizard", "Auto-Mapping Rules", "Central Dashboard"],
            proofPoints: ["Single Login for All Entities", "Automated TB Import", "Standardized Reconciliations"]
        },
        justifyValue: {
            title: "Process Harmony",
            metrics: ["Unified Close Calendar", "Standardized Reporting", "Reduced Mapping Errors"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "Consolidation Efficiency",
                    formula: ["( Manual Map Hours - Auto Map Hours )", "×", "Hourly Rate"],
                    desc: "Hours saved per month on intercompany matching and trial balance mapping."
                },
                {
                    label: "Data Cleanup Avoidance",
                    formula: ["Historical Data Corrections", "×", "Avg Time per Correction"],
                    desc: "Time saved by mapping historical data once vs. cleaning it up monthly."
                }
            ]
        }
    }
  },
  {
    id: 'innovation',
    title: 'Facilitating Innovation',
    icon: 'Rocket',
    heroMetric: '20% Capacity Shift',
    summary: 'Finance should be a business partner, not a scorecard keeper. Free up capacity to model new business lines, pricing strategies, and market expansion instead of fixing historical data.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Business partnership.", nightmare: "Back office cost center." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Scalable control.", nightmare: "Process bottlenecks." },
            { role: "CIO", icon: 'Cpu', aspiration: "AI Readiness.", nightmare: "Unstructured data." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Change management.", nightmare: "Stagnation." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Project leadership.", nightmare: "Firefighting." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Modeling & analysis.", nightmare: "Copy-paste." }
        ]
    },
    executivePov: {
        createValue: {
            title: "The Rearview Mirror",
            focus: "Strategic Agility",
            pains: [
                "Finance function acts as a bottleneck to business model innovation.",
                "Inability to support new revenue streams (subscriptions, usage-based) due to rigid back-office processes.",
                "Zero capacity for forward-looking modeling or scenario planning."
            ]
        },
        captureValue: {
            title: "Opportunity Cost",
            questions: [
                "How many new product launches were delayed due to billing/rev-rec complexity?",
                "If your team wasn't closing the books, what strategic initiative would they be leading?",
                "Can your current process support a 2x increase in transaction volume without 2x headcount?"
            ]
        },
        deliverValue: {
            title: "Scalable Foundation",
            capabilities: ["Transaction Matching", "Automated Journals", "Scalable Cloud Platform"],
            proofPoints: ["Support for High-Volume Models", "Agile Process Config", "Data-Driven Insights"]
        },
        justifyValue: {
            title: "Business Partnering",
            metrics: ["FP&A Support Ratio", "New Revenue Support", "Scenario Modeling Speed"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Strategic Lift",
                    formula: ["Hours Shifted to FP&A", "×", "( Value of Decision - Cost of Analysis )"],
                    desc: "Economic value generated by shifting finance resources to high-value scenario modeling."
                },
                {
                    label: "Scalability Factor",
                    formula: ["( Volume Increase % )", "×", "Zero Headcount Cost"],
                    desc: "Cost avoidance of not hiring additional staff despite transaction volume growth."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Permanent Firefighting Mode",
            focus: "Proactive vs Reactive",
            pains: [
                "Constantly fixing broken data from the previous month leaves absolutely no time for process improvement projects.",
                "Forced to say 'no' to business partners asking for help because there is simply no bandwidth available.",
                "Relying on 'last year's spreadsheet' because building a new, better model is too hard and time-consuming."
            ]
        },
        captureValue: {
            title: "Bandwidth Constraints",
            questions: [
                "When was the last time you successfully improved a process versus just executing the existing one?",
                "Do you have time to understand the commercial drivers behind the numbers, or just report them?",
                "What specific analysis or project would you tackle if you were gifted an extra day every week?"
            ]
        },
        deliverValue: {
            title: "Continuous Improvement",
            capabilities: ["Process Visibility", "Root Cause Analysis", "Performance Analytics"],
            proofPoints: ["Identifying Revenue Leakage", "Optimizing Spend", "Predictive Alerts"]
        },
        justifyValue: {
            title: "Value Creation",
            metrics: ["Process Optimization Projects", "Revenue Insights Delivered", "Agile Response"]
        },
        roiCalculations: {
             executive: [],
             operational: [
                {
                    label: "Project Throughput",
                    formula: ["Improvement Projects Completed", "vs", "Baseline"],
                    desc: "Increase in the number of optimization projects completed per quarter."
                },
                {
                    label: "Analysis Ratio",
                    formula: ["Time Analyzing", "÷", "Time Compiling"],
                    desc: "Shift in ratio from 20/80 (Analysis/Prep) to 80/20."
                }
             ]
        }
    }
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    icon: 'ShieldCheck',
    heroMetric: '90% Audit Cost Savings',
    summary: 'Transform compliance from a periodic scramble to a continuous state. Ensure segregation of duties, automated audit trails, and key control testing happen in real-time.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Risk adjusted return.", nightmare: "Stock price drop." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Clean opinion.", nightmare: "Material weakness." },
            { role: "CIO", icon: 'Cpu', aspiration: "Cyber security.", nightmare: "Data breach." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Strong control environment.", nightmare: "Audit findings." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Audit efficiency.", nightmare: "PBC scramble." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Clear documentation.", nightmare: "Auditor questions." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Control Deficiency",
            focus: "Risk Management",
            pains: [
                "Risk of material weakness or significant deficiency in financial reporting (SOX/Internal Controls).",
                "Rising external audit fees due to poor documentation and sampling requirements.",
                "Reputational damage from restatements or control failures."
            ]
        },
        captureValue: {
            title: "Cost of Compliance",
            questions: [
                "What is your total annual spend on external audit fees and internal control testing?",
                "Have you had any 'near misses' or actual control failures in the last 24 months?",
                "How confident are you that your balance sheet is 100% substantiated right now?"
            ]
        },
        deliverValue: {
            title: "Continuous Assurance",
            capabilities: ["Segregation of Duties", "Immutable Audit Trail", "Cloud Certifications"],
            proofPoints: ["PBC List Automation", "Remote Audit Access", "SOX Readiness"]
        },
        justifyValue: {
            title: "Risk Reduction",
            metrics: ["Zero Material Weaknesses", "Reduced Audit Hours", "Lower Insurance Premiums"]
        },
        roiCalculations: {
             executive: [
                {
                    label: "Fine Avoidance Value",
                    formula: ["Revenue Exposure", "×", "Regulatory Fine Rate", "×", "Probability"],
                    desc: "Statistical value of avoiding regulatory fines (e.g., GDPR, SOX, Industry Specific)."
                },
                {
                    label: "Audit Savings",
                    formula: ["( Auditor Rate × Hours Saved )", "+", "Internal Testing Cost Reduction"],
                    desc: "Reduction in fees paid to external auditors and internal labor for control testing."
                }
             ],
             operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Audit Season Panic",
            focus: "Documentation Burden",
            pains: [
                "Scrambling to find supporting documents (invoices, emails, PDFs) from 9 months ago when the auditor asks.",
                "Auditors camping out in conference rooms asking the same questions repeatedly, distracting you from your day job.",
                "The intense stress of having to 'prove' work that you know was done correctly but wasn't perfectly documented."
            ]
        },
        captureValue: {
            title: "Evidence Gap",
            questions: [
                "How do you currently store supporting documentation for journal entries? Is it a shared drive or email folder?",
                "Can you definitively prove who approved a reconciliation and exactly when they did it (time/date stamp)?",
                "How painful is the quarterly PBC (Provided by Client) list generation process for your team?"
            ]
        },
        deliverValue: {
            title: "Audit Readiness",
            capabilities: ["Attached Documentation", "Time/Date Stamping", "Auditor Roles"],
            proofPoints: ["Self-Service Audit", "Digital Paper Trail", "Instant Search"]
        },
        justifyValue: {
            title: "Audit Confidence",
            metrics: ["No Scramble Close", "Instant Retrieve", "Trust in Data"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "PBC Efficiency",
                    formula: ["Hours spent gathering 'Provided by Client' lists", "×", "Hourly Rate"],
                    desc: "Time saved by auditors self-serving documents instead of asking staff."
                },
                {
                    label: "Control Testing Speed",
                    formula: ["Manual Test Time", "vs", "Automated Test Time"],
                    desc: "Reduction in hours spent manually testing key controls for SOX compliance."
                }
            ]
        }
    }
  },
  {
    id: 'decision',
    title: 'Real-Time Decision Making',
    icon: 'Activity',
    heroMetric: 'Data Latency < 24hrs',
    summary: 'Shift from "reporting the news" to "making the news." Provide leadership with accurate, real-time financial data mid-period to adjust tactics before the quarter ends.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Agile guidance.", nightmare: "Missing the quarter." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Integrity of actuals.", nightmare: "Surprise adjustments." },
            { role: "CIO", icon: 'Cpu', aspiration: "Real-time data.", nightmare: "Batch latency." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Fast close.", nightmare: "Variance explanations." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Intra-month analysis.", nightmare: "Post-mortem only." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Daily insights.", nightmare: "Month-end crunch." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Data Latency",
            focus: "Competitive Advantage",
            pains: [
                "Driving the business looking in the rearview mirror (data is 20 days old).",
                "Lack of trust in the numbers prevents decisive action during market shifts.",
                "Disconnect between operational metrics and financial outcomes."
            ]
        },
        captureValue: {
            title: "Cost of Delay",
            questions: [
                "If you knew you were missing revenue targets on Day 20 instead of Day 35, what would you change?",
                "How long does it take to answer a simple question like 'What is our cash position right now?'",
                "Are your decisions based on data or gut feeling due to lack of timely info?"
            ]
        },
        deliverValue: {
            title: "Continuous Accounting",
            capabilities: ["Daily Matching", "Intercompany Hub", "Real-Time Dashboards"],
            proofPoints: ["Mid-Period Soft Close", "Daily Cash Positioning", "Proactive Variance Analysis"]
        },
        justifyValue: {
            title: "Agile Finance",
            metrics: ["Daily Insights", "Faster Course Correction", "Data Trust Index"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Decision Value",
                    formula: ["Revenue Impact of Course Correction", "+", "Avoidance of Bad Spend"],
                    desc: "Value of pivoting budget allocation mid-quarter based on real-time actuals."
                },
                {
                    label: "Working Capital Optimization",
                    formula: ["Avg Daily Cash Balance", "×", "Yield Improvement %"],
                    desc: "Interest income gained by having accurate daily cash positioning."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Black Box Accounting",
            focus: "Visibility",
            pains: [
                "Waiting until day 5 of the close to see the preliminary results, leaving no time to analyze them.",
                "Surprise adjustments that kill variance explanations at the very last minute.",
                "Blind spots in intercompany transactions that remain hidden until the final consolidation run."
            ]
        },
        captureValue: {
            title: "Blind Spots",
            questions: [
                "How often do you find a material error after the books are technically 'closed'?",
                "Can you see the impact of a large transaction on the P&L immediately, or must you wait for a batch job?",
                "Do you have to wait for overnight processes to see if your work posted correctly?"
            ]
        },
        deliverValue: {
            title: "Glass Box Finance",
            capabilities: ["Drill-Down Reporting", "Task Visibility", "Real-Time Journals"],
            proofPoints: ["No More Surprises", "Instant Answers", "Trend Identification"]
        },
        justifyValue: {
            title: "Operational Clarity",
            metrics: ["Zero Post-Close Adjustments", "Confident Reporting", "Trend Spotting"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "Reporting Speed",
                    formula: ["Days from Period End", "to", "Mgmt Report Distribution"],
                    desc: "Reduction in lag time between work completion and insight delivery."
                },
                {
                    label: "Ad-Hoc Query Time",
                    formula: ["Avg Time to Answer CFO Question", "×", "Queries per Month"],
                    desc: "Time saved by having instant drill-down access to transaction details."
                }
            ]
        }
    }
  },
  {
    id: 'trust',
    title: 'Trust Premium',
    icon: 'ShieldAlert',
    heroMetric: '100% Integrity',
    summary: 'In an era of scrutiny, financial integrity is a valuation driver. Establish an unimpeachable foundation of verified data that builds confidence with investors, boards, and regulators.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Lower cost of capital.", nightmare: "Investor doubt." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Strong governance.", nightmare: "Reputational damage." },
            { role: "CIO", icon: 'Cpu', aspiration: "Data lineage.", nightmare: "Black box systems." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Policy adherence.", nightmare: "Rogue entries." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Review confidence.", nightmare: "Rubber stamping." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Accuracy.", nightmare: "Formula errors." }
        ]
    },
    executivePov: {
        createValue: {
            title: "Credibility Risk",
            focus: "Investor Confidence",
            pains: [
                "Erosion of shareholder value due to perceived lack of financial control.",
                "Board skepticism regarding the accuracy of financial forecasts.",
                "Vulnerability to fraud or cyber-attacks on financial infrastructure."
            ]
        },
        captureValue: {
            title: "Value of Trust",
            questions: [
                "What is the impact on your stock price if you have to announce a restatement?",
                "Does the Audit Committee trust the data presentation, or do they drill into the basics?",
                "How are you preventing internal bad actors from manipulating journal entries?"
            ]
        },
        deliverValue: {
            title: "Verifiable Truth",
            capabilities: ["Immutable Ledgers", "Role-Based Access", "Fraud Detection"],
            proofPoints: ["Certified Financials", "Transparent Governance", "Fraud Prevention"]
        },
        justifyValue: {
            title: "Valuation Multiple",
            metrics: ["Lower Cost of Capital", "Investor Premium", "Board Confidence"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "Valuation Protection",
                    formula: ["Market Cap", "×", "Restatement Risk Factor (8-15%)"],
                    desc: "Avoidance of shareholder value destruction caused by financial restatements."
                },
                {
                    label: "Cost of Capital",
                    formula: ["Total Debt", "×", "Basis Point Reduction (Credit Rating)"],
                    desc: "Lower borrowing costs achieved through higher governance ratings and audit cleanliness."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Data Integrity Anxiety",
            focus: "Accuracy Pressure",
            pains: [
                "Lying awake at night wondering if a broken formula in a linked spreadsheet messed up the final results.",
                "Immense pressure to sign off on numbers without being able to verify the underlying details personally.",
                "Fear of being the one who made the manual mistake that creates a material error for the company."
            ]
        },
        captureValue: {
            title: "Verification Gap",
            questions: [
                "Do you manually check every cell in your spreadsheets for broken formulas before signing off?",
                "How do you know if someone changed a number in the file after you approved it?",
                "Can you verify the source of every number on the balance sheet within 5 minutes?"
            ]
        },
        deliverValue: {
            title: "Systemic Integrity",
            capabilities: ["Automated Flux", "Version Control", "Locked-Down Workflows"],
            proofPoints: ["Audit-Proof Data", "Sign-Off Confidence", "Error Detection"]
        },
        justifyValue: {
            title: "Confidence",
            metrics: ["Zero Restatements", "100% Policy Adherence", "Sleep at Night"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "Fraud Loss Prevention",
                    formula: ["Est. Annual Loss (5% Rev)", "×", "% Mitigation Factor"],
                    desc: "Reduction in risk of internal fraud through automated controls and segregation of duties."
                },
                {
                    label: "Error Remediation",
                    formula: ["Time spent restating financials", "or", "Correcting Period-End Errors"],
                    desc: "Hours saved by preventing errors at the source rather than fixing them later."
                }
            ]
        }
    }
  },
  {
    id: 'ai_ops',
    title: 'Scaling Trustworthy AI',
    icon: 'Cpu',
    heroMetric: '70% Auto-Certification',
    summary: 'AI is only as good as the data it feeds on. BlackLine standardizes and cleanses financial data, creating the necessary foundation for predictive AI and generative insights.',
    personas: {
        executive: [
            { role: "CFO", icon: 'TrendingUp', aspiration: "Productivity multiplier.", nightmare: "Headcount growth." },
            { role: "CAO", icon: 'ShieldCheck', aspiration: "Precision.", nightmare: "Human error." },
            { role: "CIO", icon: 'Cpu', aspiration: "GenAI strategy.", nightmare: "Obsolescence." }
        ],
        operational: [
            { role: "Controller", icon: 'Briefcase', aspiration: "Augmented team.", nightmare: "Manual grunt work." },
            { role: "Acct Manager", icon: 'Users', aspiration: "Exception management.", nightmare: "Transaction processing." },
            { role: "Sr Accountant", icon: 'User', aspiration: "Prompt engineering.", nightmare: "Data entry." }
        ]
    },
    executivePov: {
        createValue: {
            title: "The AI Gap",
            focus: "Digital Transformation",
            pains: [
                "Inability to leverage AI/ML because underlying financial data is unstructured and messy.",
                "Risk of 'hallucinations' in financial AI due to poor data quality.",
                "Falling behind competitors who are automating prediction and forecasting."
            ]
        },
        captureValue: {
            title: "Data Readiness",
            questions: [
                "Is your data structured enough today to train a predictive model?",
                "How much time do your data scientists spend cleaning finance data vs. modeling?",
                "Are you building AI on top of spreadsheets or a unified platform?"
            ]
        },
        deliverValue: {
            title: "AI Foundation",
            capabilities: ["Data Standardization", "Unified Data Model", "Intelligent Automation"],
            proofPoints: ["Clean Data Lake", "Predictive Forecasting", "Generative Analysis"]
        },
        justifyValue: {
            title: "Future Proofing",
            metrics: ["AI Adoption Rate", "Forecast Accuracy", "Tech Debt Reduction"]
        },
        roiCalculations: {
            executive: [
                {
                    label: "AI Multiplier",
                    formula: ["( Value of Predictive Insights )", "-", "( Cost of Data Cleaning )"],
                    desc: "Net value of faster, more accurate forecasts enabled by clean, standardized data."
                },
                {
                    label: "Tech Stack Efficiency",
                    formula: ["Legacy Tool License Costs", "+", "Maintenance Labor Savings"],
                    desc: "Savings from retiring fragmented point solutions in favor of a unified platform."
                }
            ],
            operational: []
        }
    },
    operationalPov: {
        createValue: {
            title: "Manual Data Preparation",
            focus: "Data Quality",
            pains: [
                "Spending 80% of time cleaning and formatting data and only 20% actually analyzing it.",
                "Dealing with duplicate vendors, inconsistent naming conventions, and dirty data from upstream systems.",
                "Frustration with 'dumb' legacy systems that do not learn from past corrections and repeat errors."
            ]
        },
        captureValue: {
            title: "Garbage In, Garbage Out",
            questions: [
                "How often do you have to correct the exact same error month over month?",
                "Can you trust the automated suggestions from your ERP, or do you double-check them all?",
                "Are your manually categorizing thousands of transactions because the system can't figure them out?"
            ]
        },
        deliverValue: {
            title: "Smart Assistance",
            capabilities: ["Machine Learning Matching", "Anomaly Detection", "Predictive Alerts"],
            proofPoints: ["Self-Learning Rules", "Proactive Error Catching", "Automated categorization"]
        },
        justifyValue: {
            title: "Intelligent Work",
            metrics: ["95% Prediction Accuracy", "Zero Manual Prep", "Augmented Capacity"]
        },
        roiCalculations: {
            executive: [],
            operational: [
                {
                    label: "Manual Class. Savings",
                    formula: ["( Transactions × Manual Time )", "vs", "( AI Auto-Classification Time )"],
                    desc: "Time saved by allowing AI to categorize high-volume, low-risk transactions."
                },
                {
                    label: "Learning Curve Gain",
                    formula: ["Improvement in Auto-Match %", "×", "Volume"],
                    desc: "Compounding time savings as the system learns and improves accuracy month-over-month."
                }
            ]
        }
    }
  }
];

// --- OTHER CONSTANTS ---

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
