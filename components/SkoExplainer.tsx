import React, { useState, useEffect, useMemo } from 'react';
// import { SKO_DATA } from '../constants'; // Replaced with local enriched data
import { UIStrings, SkoDriverDetail, SkoPovContent } from '../types';
import { 
  ArrowLeft, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Rocket, 
  Play, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  Map, 
  Quote, 
  Video, 
  Sparkles, 
  Search, 
  ShieldAlert, 
  ArrowUpRight, 
  Trophy, 
  Coins, 
  Cpu, 
  Target, 
  BookOpen, 
  HelpCircle, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  User, 
  Activity, 
  Ghost, 
  Stars, 
  Layout, 
  LogOut, 
  ChevronDown,
  Calculator,
  Equal,
  Plus,
  Minus,
  X as Multiply
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface SkoExplainerProps {
  onClose: () => void;
  t: UIStrings;
}

const DRIVER_IMAGES: Record<string, string> = {
  'process': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1200',
  'working_cap': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
  'trust': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
  'ma': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
  'compliance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
  'talent': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  'innovation': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'decision': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'ai_ops': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
};

// --- DATA STRUCTURE WITH ENRICHED CONTENT & ROI ---
const SKO_DATA = [
  {
    id: 'working_cap',
    title: 'Working Capital Optimization',
    icon: 'Coins',
    heroMetric: '$50M+ Cash Freed',
    summary: 'Accelerate cash conversion by automating the matching of high-volume bank data to open invoices. Reduce unallocated cash and Days Sales Outstanding (DSO) to free up capital for strategic investment.',
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
                "Are you manually categorizing thousands of transactions because the system can't figure them out?"
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

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'grid' | 'persona_explain' | 'framework_explain' | 'detail' | 'video' | 'letsgo_bva'>('landing');
  const [activeDriverId, setActiveDriverId] = useState<string | null>(null);
  const [activePov, setActivePov] = useState<'executive' | 'operational'>('executive');

  // Create a sorted version of data based on the new desired UX sequence
  const sortedDrivers = useMemo(() => {
    return ORDERED_IDS.map(id => SKO_DATA.find(d => d.id === id)).filter(Boolean) as any[];
  }, []);

  const activeDriver = sortedDrivers.find(d => d.id === activeDriverId);

  // Scroll to top when view mode or narrative changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewMode, activeDriverId, activePov]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); 
    setActiveDriverId(id);
    setViewMode('detail');
  };

  const handleNextDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const nextIndex = (currentIndex + 1) % sortedDrivers.length;
    setActivePov('executive'); 
    setActiveDriverId(sortedDrivers[nextIndex].id);
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + sortedDrivers.length) % sortedDrivers.length;
    setActivePov('executive');
    setActiveDriverId(sortedDrivers[prevIndex].id);
  };

  // Filter groups based on the sorted list
  const plImpactDrivers = sortedDrivers.filter(d => ['working_cap', 'process'].includes(d.id));
  const accelerationDrivers = sortedDrivers.filter(d => ['talent', 'ma', 'innovation', 'compliance', 'decision'].includes(d.id));
  const valueDrivers = sortedDrivers.filter(d => ['trust', 'ai_ops'].includes(d.id));

  // Split Acceleration Drivers for the 2-column layout
  const accelDriversPart1 = accelerationDrivers.slice(0, 3); // Top 3
  const accelDriversPart2 = accelerationDrivers.slice(3);    // Bottom 2

  // --- LANDING VIEW ---
  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-4 right-4 md:top-0 md:right-0 p-4 md:p-8 text-gray-400 hover:text-white transition-colors z-50">
           <X size={28} />
         </button>
         
         <div className="text-center py-12 md:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blackline-yellow/20 border border-blackline-yellow/50 text-blackline-yellow text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8 animate-pulse">
               <Rocket size={12} /> SKO 26 Sales Playbook
            </div>
            <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-white mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]">
              #LETSGO <span className="text-blackline-yellow">GET</span>
            </h1>
            <p className="text-xl md:text-3xl text-zinc-200 font-light max-w-2xl mx-auto px-4 mb-8 md:mb-12">
               The definitive playbook for pivoting from <span className="text-white font-bold">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full pb-16 md:pb-24 px-4 md:px-6">
             <div onClick={() => setViewMode('video')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blackline-yellow/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blackline-yellow group-hover:text-black group-hover:border-blackline-yellow transition-all">
                      <Play size={24} className="md:w-8 md:h-8" fill="currentColor" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Executive Commentary</h3>
                </div>
             </div>
             <div onClick={() => setViewMode('grid')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-500 transition-all">
                      <LayoutGrid size={24} className="md:w-8 md:h-8" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Explore Drivers</h3>
                </div>
             </div>
         </div>
      </div>
    );
  }

  // --- VIDEO VIEW ---
  if (viewMode === 'video') {
    return (
      <div className="min-h-screen bg-black flex flex-col animate-fade-in relative pb-32">
         <div className="flex justify-between items-center px-4 md:px-8 py-6">
            <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
               <ArrowLeft size={16} /> Back
            </button>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors">
               <X size={24} />
            </button>
         </div>
         
         <div className="max-w-4xl mx-auto w-full px-4 md:px-6 flex flex-col gap-8 md:gap-12 pt-4 md:pt-8">
            <div className="text-center mb-4 md:mb-6">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 md:mb-4">Executive Commentary</h2>
               <p className="text-gray-300 font-medium uppercase tracking-widest text-xs">Voices of Value & Vision</p>
            </div>

            <div className="flex flex-col gap-8 md:gap-12">
               {/* Exxon Section */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blackline-yellow/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-gradient-to-r from-red-600 via-blue-600 to-red-600"></div>
                  <div className="p-6 md:p-10 flex-grow relative">
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                         <div className="flex items-center gap-4">
                            <div className="p-2 md:p-3 bg-white rounded-xl shadow-lg flex items-center justify-center">
                               <span className="text-black font-black text-lg md:text-xl tracking-tighter uppercase italic">Exxon</span>
                            </div>
                            <div>
                               <h4 className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter leading-none">Customer Voice</h4>
                               <p className="text-blackline-yellow text-[10px] font-bold uppercase tracking-[0.2em] mt-1">ExxonMobil Corporation</p>
                            </div>
                         </div>
                      </div>

                      <div className="relative px-2 md:px-4">
                          <span className="text-blackline-yellow font-serif text-6xl md:text-7xl absolute -left-4 md:-left-8 -top-8 opacity-40">"</span>
                          <div className="space-y-6 md:space-y-8 relative z-10">
                            
                            {/* Implementation */}
                            <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light italic">
                               "We recently did a larger implementation of a software platform called <strong className="text-white font-bold">BlackLine</strong>.
                            </p>
                            
                            {/* Complexity */}
                            <div className="border-l-4 border-zinc-700 pl-6 py-1">
                                <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light italic">
                                   If you think about an organization the size of ExxonMobil...
                                </p>
                            </div>

                            {/* Capacity / Impact */}
                            <div className="relative bg-black/40 p-6 md:p-8 rounded-2xl border border-blackline-yellow/20">
                                <p className="text-xl md:text-3xl text-white font-black italic leading-tight uppercase tracking-tight">
                                   Moving to a platform [like this] <span className="text-blackline-yellow">literally enabled us to save tens of thousands of hours</span> in terms of people’s time."
                                </p>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="p-6 md:p-10 pt-0 mt-auto border-t border-zinc-800/50 bg-black/20">
                      <div className="flex items-center gap-4 pt-4 md:pt-6">
                         <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl flex items-center justify-center font-black text-white border border-zinc-600 text-sm md:text-base">KM</div>
                         <div>
                            <p className="text-white font-black text-sm md:text-base tracking-tight">Kathryn Mikells</p>
                            <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">CFO, ExxonMobil</p>
                         </div>
                      </div>
                  </div>
               </div>

               {/* Video Section */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blue-500/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-blackline-yellow"></div>
                  <div className="p-6 md:p-10 flex-grow relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
                      <div className="relative z-10">
                         <div className="flex items-center justify-between mb-6 md:mb-8 pb-6 border-b border-zinc-800">
                            <div className="flex items-center gap-4">
                               <div className="p-2 md:p-3 bg-blackline-yellow rounded-xl shadow-lg flex items-center justify-center text-black">
                                  <Video size={20} className="md:w-6 md:h-6" />
                               </div>
                               <div>
                                  <h4 className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter leading-none">Strategic Vision</h4>
                               </div>
                            </div>
                         </div>
                         <div className="aspect-video bg-black/60 rounded-2xl border border-zinc-700 mb-6 md:mb-8 flex flex-col items-center justify-center group/vid cursor-pointer">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20 group-hover/vid:bg-blackline-yellow group-hover/vid:text-black transition-all">
                               <Play size={24} className="md:w-8 md:h-8" fill="currentColor" />
                            </div>
                            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-gray-400 group-hover/vid:text-white transition-colors">Hear from BL Execs</span>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  if (viewMode === 'grid') {
    return (
      <div className="w-full max-w-[2000px] mx-auto pb-32 animate-fade-in px-4 md:px-6 pt-6 md:pt-10">
         <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 md:gap-8">
            <div className="text-left">
               <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 mb-4 md:mb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Back to Menu
               </button>
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 md:mb-4 uppercase italic">
                  Value Drivers <span className="text-zinc-600">Framework</span>
               </h2>
            </div>
         </div>

         {/* Layout: 3 Columns. Middle Column uses a special grid for X shape */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 items-start">
            
            {/* Column 1: P&L Impact */}
            <div className="space-y-8">
                <GridSectionHeader title="P&L Bottom Line Impact" subtitle="Directly influencing profitability" />
                <div className="flex flex-col gap-6">
                    {plImpactDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}
                </div>
            </div>

            {/* Column 2: Acceleration (X-Shape Layout) */}
            <div className="space-y-8">
               <div className="flex flex-col items-center text-center gap-2">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 md:gap-4 italic text-center leading-tight">
                     <div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>Acceleration & Resilience<div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-zinc-200 uppercase tracking-widest px-4">Driving speed & risk mitigation</p>
               </div>
               
               {/* X SHAPE GRID */}
               <div className="grid grid-cols-2 gap-4">
                   {/* Top Row: Talent & M&A */}
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[0]} onSelect={handleDriverSelect} />
                   </div>
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[1]} onSelect={handleDriverSelect} />
                   </div>

                   {/* Middle Row: Innovation (Centered) */}
                   <div className="col-span-2 flex justify-center py-2">
                       {/* Constrain width to approx 50% + gap to make the X shape clear */}
                       <div className="w-[calc(50%-0.5rem)]">
                           <DriverCardHorizontal driver={accelerationDrivers[2]} onSelect={handleDriverSelect} />
                       </div>
                   </div>

                   {/* Bottom Row: Compliance & Decision */}
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[3]} onSelect={handleDriverSelect} />
                   </div>
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[4]} onSelect={handleDriverSelect} />
                   </div>
               </div>
            </div>

            {/* Column 3: Enterprise Value */}
            <div className="space-y-8">
                <GridSectionHeader title="Enhancing Enterprise Value" subtitle="Boosting valuation foundations" />
                <div className="flex flex-col gap-6">
                    {valueDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}
                </div>
            </div>

         </div>

         <div className="mt-20 md:mt-32 text-center pb-20">
            <button 
               onClick={() => {
                  setActivePov('executive');
                  // Start tour with the first driver in our sorted list
                  setActiveDriverId(sortedDrivers[0].id);
                  setViewMode('persona_explain');
               }}
               className="w-full md:w-auto px-8 md:px-16 py-6 md:py-8 bg-blackline-yellow text-black text-xl md:text-2xl font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto uppercase italic tracking-tighter border-4 border-black"
            >
               <Sparkles size={24} className="md:w-8 md:h-8" /> Start Deep Dive
            </button>
         </div>
      </div>
    );
  }

  // --- PERSONA EXPLAIN VIEW ---
  if (viewMode === 'persona_explain' && activeDriver) {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full">
           <div className="text-center mb-12 md:mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-10">
                 <Users size={14} /> Persona Alignment
              </div>
              <h2 className="text-4xl md:text-9xl font-black text-white uppercase italic tracking-tighter mb-6 md:mb-10 leading-[0.9] md:leading-[0.8]">
                 Meet the <span className="text-blackline-yellow">Stakeholders</span>
              </h2>
              <p className="text-lg md:text-4xl text-zinc-200 font-light max-w-5xl mx-auto leading-relaxed">
                 Effective value selling mirrors the unique <span className="text-white italic font-bold">aspirations</span> and <span className="text-white italic font-bold underline decoration-purple-500/50 underline-offset-8">nightmares</span>.
              </p>
           </div>

           <div className="space-y-16 md:space-y-24">
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">
                    Strategic Executive Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    <SimplePersonaCard role="CEO" icon={Target} nightmare="Competitive irrelevance." aspiration="Commanding top-tier market valuation." />
                    <SimplePersonaCard role="CFO" icon={TrendingUp} nightmare="Board surprises." aspiration="Leading a real-time strategic engine." />
                    <SimplePersonaCard role="CAO" icon={ShieldCheck} nightmare="Public restatements." aspiration="Establishing verifiable integrity." />
                    <SimplePersonaCard role="CIO" icon={Cpu} nightmare="High-risk legacy debt." aspiration="Architecting a secure, AI-ready foundation." />
                 </div>
              </div>
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">
                    Tactical Operational Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    <SimplePersonaCard role="Accounting Mgr" icon={Briefcase} nightmare="Peak cycle burnout." aspiration="Leading a high-performance team." />
                    <SimplePersonaCard role="Senior Accountant" icon={User} nightmare="Manual data cycles." aspiration="Escaping manual ticking and tying." />
                    <SimplePersonaCard role="SSC Owner" icon={Activity} nightmare="Fragmented entities." aspiration="Achieving massive operational scale." />
                 </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-20 md:mt-32 pb-20">
              <button onClick={() => setViewMode('grid')} className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Map
              </button>
              <button onClick={() => setViewMode('framework_explain')} className="w-full md:w-auto px-8 md:px-16 py-4 md:py-6 bg-blackline-yellow text-black text-lg font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 uppercase tracking-tighter italic">
                 The Teaching System <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- FRAMEWORK EXPLANATION VIEW ---
  if (viewMode === 'framework_explain' && activeDriver) {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in flex flex-col items-center justify-center py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-8 md:mb-14">
              <HelpCircle size={14} /> Methodology Briefing
           </div>
           <h2 className="text-5xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter mb-8 md:mb-12 leading-tight">
              The Teaching <span className="text-blackline-yellow">System</span>
           </h2>
           <p className="text-xl md:text-4xl text-zinc-200 font-light mb-12 md:mb-24 leading-relaxed max-w-5xl mx-auto">
              Master the pivot from <span className="text-white font-bold italic underline decoration-blackline-yellow">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-24 text-left">
              <LargeFrameworkBox 
                step="1" color="red-500" title="Create Value" subtitle="Establish the Strategic Gap"
                formula='Create Value → The Problem'
                desc={"Move conversation from features to objectives. Define macro-level pains."} 
              />
              <LargeFrameworkBox 
                step="2" color="blue-500" title="Capture Value" subtitle="Expose the Quantified Reality"
                formula='Capture Value → The Questions'
                desc={"Execute high-gain discovery to uncover hidden costs of inertia."} 
              />
              <LargeFrameworkBox 
                step="3" color="yellow-500" title="Deliver Value" subtitle="Map Outcomes to Platform"
                formula='Deliver Value → The Capabilities'
                desc={"Align platform capabilities to specific business outcomes."} 
              />
              <LargeFrameworkBox 
                step="4" color="green-500" title="Justify Value" subtitle="Build the Economic Case"
                formula='Justify Value → The Business Case'
                desc={"Construct a CFO-ready business case with ROI modeling."} 
              />
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              <button onClick={() => setViewMode('persona_explain')} className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Personas
              </button>
              <button onClick={() => { setActivePov('executive'); setViewMode('detail'); }} className="w-full md:w-auto px-10 md:px-20 py-6 md:py-8 bg-blackline-yellow text-black text-lg md:text-xl font-black rounded-full hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-4 uppercase tracking-tighter italic">
                 Start Driver Tour <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  if (viewMode === 'detail' && activeDriver) {
    const pov = activePov === 'executive' ? activeDriver.executivePov : activeDriver.operationalPov;
    const IconComponent = (Icons as any)[activeDriver.icon] || Zap;

    // Correctly type the ROI data structure
    const roiData = pov.roiCalculations as any; 
    const roiItems = activePov === 'executive' ? roiData.executive : roiData.operational;

    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-40 md:scale-[0.8] md:origin-top overflow-visible">
        {/* Navigation Header */}
        <div className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-zinc-800 px-4 md:px-10 py-4 md:py-6 flex justify-between items-center no-print">
           <div className="flex items-center gap-4 md:gap-8">
              <button onClick={() => setViewMode('grid')} className="text-gray-300 hover:text-white p-2 md:p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-zinc-800 border border-zinc-800 flex items-center gap-2 md:gap-3 font-black uppercase text-[10px] md:text-xs tracking-widest">
                 <LogOut size={16} className="md:w-5 md:h-5" /> <span className="hidden md:inline">Escape Driver</span>
              </button>
              <button onClick={() => setViewMode('letsgo_bva')} className="text-blackline-yellow p-2 md:p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-blackline-yellow hover:text-black border border-blackline-yellow/30 flex items-center gap-2 md:gap-3 font-black uppercase text-[10px] md:text-xs tracking-widest">
                 <span className="hidden md:inline">Next Steps</span> <ArrowRight size={16} className="md:w-5 md:h-5" />
              </button>
              <span className="text-xs md:text-sm font-black text-blackline-yellow uppercase tracking-[0.3em] px-2 md:px-4 border-l border-zinc-800 truncate max-w-[100px] md:max-w-none">{activeDriver.title}</span>
           </div>
           <div className="flex items-center gap-2 md:gap-6">
              <button onClick={handlePrevDriver} className="p-2 md:p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronLeft size={20} className="md:w-6 md:h-6"/></button>
              <button onClick={handleNextDriver} className="p-2 md:p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronRight size={20} className="md:w-6 md:h-6"/></button>
              <button onClick={onClose} className="p-2 md:p-4 text-gray-400 hover:text-white ml-2 md:ml-4"><X size={20} className="md:w-6 md:h-6" /></button>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-10">
           <div className="max-w-6xl mx-auto relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-6 md:p-10 bg-blackline-yellow rounded-[2rem] md:rounded-[2.5rem] text-black mb-8 md:mb-14 shadow-2xl border-4 md:border-8 border-black">
                 <IconComponent size={48} className="md:w-20 md:h-20" strokeWidth={1} />
              </div>
              <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-8 md:mb-10 leading-[0.9] md:leading-[0.8] italic uppercase">{activeDriver.title}</h1>
              <div className="inline-block px-8 md:px-14 py-4 md:py-6 border-2 border-zinc-700 rounded-full bg-black/60 mb-10 md:mb-14 backdrop-blur-xl">
                 <span className="text-xl md:text-4xl font-black text-green-400 tracking-tighter italic uppercase">{activeDriver.heroMetric}</span>
              </div>
              
              <div className="flex justify-center mb-16 md:mb-24">
                 <div className="bg-zinc-900 p-2 rounded-
