
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  Building2, 
  Settings, 
  ShieldAlert, 
  GitMerge, 
  Coins,
  BarChart4,
  Download,
  Check
} from 'lucide-react';
import { UIStrings, CalculatorInputs, CalculatorResults, CalculatorDriverResult, YearlyData, DealContext } from '../types';
import { exportToWord, generateCalculatorHtml } from '../services/exportService';

interface ValueCalculatorProps {
  t: UIStrings;
  dealContext?: DealContext;
  onSetDealContext?: (ctx: DealContext) => void;
}

type Scenario = 'conservative' | 'likely' | 'optimistic';

export const ValueCalculator: React.FC<ValueCalculatorProps> = ({ t, dealContext, onSetDealContext }) => {
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [activeInputTab, setActiveInputTab] = useState<'company' | 'operations' | 'risk' | 'ma' | 'investment'>('company');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>('likely');

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  // Initial State
  const [inputs, setInputs] = useState<CalculatorInputs>({
    companyName: '',
    opportunityName: '',
    opportunityId: '',
    
    // Company Profile
    annualRevenue: 5000000000,
    industry: 'Financial Services',
    isPublic: true,
    marketCap: 20000000000,
    numLegalEntities: 25,
    numGeographicRegions: 10,
    numErpSystems: 3,
    wacc: 8.0,
    
    // Organization (Moved from Finance)
    totalFinanceFtes: 80,
    accountingFtes: 30,
    avgFteSalary: 100000,
    turnoverRate: 15.0,
    
    // Operations (Merged)
    manualWorkPct: 40.0,
    resourcesDoingRecs: 9,
    reconciliationTimePct: 40.0,
    resourcesOnJournals: 5,
    journalEntryTimePct: 30.0,
    annualCloseOvertimeHours: 120,
    avgTimeToFillPosition: 90,
    costToReplaceResourcePct: 75,
    
    // Metrics (Merged)
    financialCloseCycleDays: 8,
    reconciliationsPerMonth: 1000,
    journalEntriesPerMonth: 500,
    accountsReconciledPct: 85.0,
    currentDso: 55,
    
    // Risk
    priorRestatements: false,
    materialWeakness: false,
    priorFines: 0,
    manualProcessPct: 60.0,
    
    // M&A
    acquisitionsPerYear: 2,
    avgDealSize: 100000000,
    integrationCostPerDeal: 5000000,
    integrationTimeMonths: 12,
    expectedReturnOnMaPct: 100, 
    keyTalentRetentionTarget: 20,
    historicTurnoverMaPct: 50,

    // Investment
    investmentPeriod: 3,
    costSoftwareYear1: 250000,
    costSoftwareYear2: 250000,
    costSoftwareYear3: 250000,
    costSoftwareYear4: 250000,
    costSoftwareYear5: 250000,
    costServicesYear1: 150000,
    costServicesYear2: 0,
    costServicesYear3: 0,
    costServicesYear4: 0,
    costServicesYear5: 0,
    year1RampPct: 50, // 50% benefit realization in Y1
  });

  // Safe update from DealContext to avoid circular loops
  useEffect(() => {
    if (dealContext) {
       setInputs(prev => {
          // Only update if values are actually different to prevent render churning
          const newCompanyName = dealContext.companyName || prev.companyName;
          const newIndustry = dealContext.industry || prev.industry;
          const newRevenue = dealContext.annualRevenue || prev.annualRevenue;
          const newOppName = dealContext.opportunityName || prev.opportunityName;
          const newOppId = dealContext.opportunityId || prev.opportunityId;

          if (
             newCompanyName !== prev.companyName ||
             newIndustry !== prev.industry ||
             newRevenue !== prev.annualRevenue ||
             newOppName !== prev.opportunityName ||
             newOppId !== prev.opportunityId
          ) {
              return {
                 ...prev,
                 companyName: newCompanyName,
                 industry: newIndustry,
                 annualRevenue: newRevenue,
                 opportunityName: newOppName,
                 opportunityId: newOppId
              };
          }
          return prev;
       });
    }
  }, [dealContext]);

  // Sync to global context on Blur to prevent "churning" while typing
  const handleBlur = () => {
    if (onSetDealContext) {
        onSetDealContext({
            ...dealContext,
            companyName: inputs.companyName,
            opportunityName: inputs.opportunityName,
            opportunityId: inputs.opportunityId,
            industry: inputs.industry,
            annualRevenue: inputs.annualRevenue
        });
    }
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Immediate sync for non-text fields (Dropdowns, Buttons) where performance impact is low
    if (field === 'industry' || field === 'isPublic') {
        if (onSetDealContext) {
             onSetDealContext({
                ...dealContext,
                companyName: inputs.companyName,
                opportunityName: inputs.opportunityName,
                opportunityId: inputs.opportunityId,
                annualRevenue: inputs.annualRevenue,
                [field]: value 
             });
        }
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };
  
  const formatCompactNumber = (val: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);
  };

  const calculateResults = (): CalculatorResults => {
    const { 
      annualRevenue, wacc, 
      avgFteSalary, 
      currentDso, 
      marketCap, isPublic,
      acquisitionsPerYear, integrationCostPerDeal, avgDealSize,
      investmentPeriod
    } = inputs;

    // --- 1. Process Efficiency ---
    const recSavings = inputs.resourcesDoingRecs * inputs.reconciliationTimePct/100 * avgFteSalary * 0.40;
    const jeSavings = inputs.resourcesOnJournals * inputs.journalEntryTimePct/100 * avgFteSalary * 0.35;
    const hourlyRate = avgFteSalary / 2080;
    const otRate = hourlyRate * 1.5;
    const closeSavings = inputs.annualCloseOvertimeHours * otRate * 0.80; 
    const processValue = recSavings + jeSavings + closeSavings;

    // --- 2. Working Capital ---
    const dailyRevenue = annualRevenue / 365;
    const targetDso = Math.max(30, currentDso - 15);
    const dsoImprovement = currentDso - targetDso;
    const cashFlowReleased = dailyRevenue * dsoImprovement;
    const workingCapitalValue = cashFlowReleased * (wacc / 100);

    // --- 3. Trust Premium ---
    const trustValue = isPublic ? marketCap * 0.002 : annualRevenue * 0.005;

    // --- 4. Innovation ---
    const innovationValue = processValue * 1.5;

    // --- 5. M&A Integration ---
    const costSavings = acquisitionsPerYear * integrationCostPerDeal * 0.20 * 0.60;
    const annualDealValue = acquisitionsPerYear * avgDealSize;
    const monthsSaved = inputs.integrationTimeMonths * 0.60;
    const accelerationValue = (annualDealValue / 12) * monthsSaved * 0.10;
    const maRetentionVal = inputs.keyTalentRetentionTarget * avgFteSalary * (inputs.costToReplaceResourcePct/100) * 0.5;
    const maValue = costSavings + accelerationValue + maRetentionVal;

    // --- 6. Regulatory ---
    const regulatoryValue = annualRevenue * 0.0005;

    // --- 7. Talent Retention ---
    const turnoverCost = inputs.totalFinanceFtes * (inputs.turnoverRate / 100) * avgFteSalary * (inputs.costToReplaceResourcePct/100);
    const talentValue = turnoverCost * 0.30;

    // --- 8. Resilience ---
    const resilienceValue = annualRevenue * 0.001;

    // Driver Summary
    const drivers: CalculatorDriverResult[] = [
      { name: "Process Efficiency", value: processValue, conservative: processValue * 0.9, optimistic: processValue * 1.1, percentOfTotal: 0 },
      { name: "Working Capital Optimization", value: workingCapitalValue, conservative: workingCapitalValue * 0.9, optimistic: workingCapitalValue * 1.1, percentOfTotal: 0 },
      { name: "Trust Premium", value: trustValue, conservative: trustValue * 0.9, optimistic: trustValue * 1.1, percentOfTotal: 0 },
      { name: "Innovation Capacity", value: innovationValue, conservative: innovationValue * 0.9, optimistic: innovationValue * 1.1, percentOfTotal: 0 },
      { name: "M&A Integration", value: maValue, conservative: maValue * 0.9, optimistic: maValue * 1.1, percentOfTotal: 0 },
      { name: "Regulatory Compliance", value: regulatoryValue, conservative: regulatoryValue * 0.9, optimistic: regulatoryValue * 1.1, percentOfTotal: 0 },
      { name: "Talent Retention", value: talentValue, conservative: talentValue * 0.9, optimistic: talentValue * 1.1, percentOfTotal: 0 },
      { name: "Operational Resilience", value: resilienceValue, conservative: resilienceValue * 0.9, optimistic: resilienceValue * 1.1, percentOfTotal: 0 },
    ];

    // Calculate Base Totals
    const totalLikely = drivers.reduce((acc, curr) => acc + curr.value, 0);
    const totalConservative = drivers.reduce((acc, curr) => acc + curr.conservative, 0);
    const totalOptimistic = drivers.reduce((acc, curr) => acc + curr.optimistic, 0);

    // Determine Effective Total based on Selection
    let effectiveTotalAnnualValue = totalLikely;
    if (selectedScenario === 'conservative') effectiveTotalAnnualValue = totalConservative;
    if (selectedScenario === 'optimistic') effectiveTotalAnnualValue = totalOptimistic;

    // Recalculate percentages based on the selected total
    drivers.forEach(d => {
      let val = d.value;
      if (selectedScenario === 'conservative') val = d.conservative;
      if (selectedScenario === 'optimistic') val = d.optimistic;
      d.percentOfTotal = effectiveTotalAnnualValue > 0 ? (val / effectiveTotalAnnualValue) * 100 : 0;
    });

    // --- Investment Analysis ---
    const yearlyData: YearlyData[] = [];
    let cumulative = 0;
    let totalCost = 0;

    for (let i = 1; i <= investmentPeriod; i++) {
        // Benefit Logic
        let benefit = effectiveTotalAnnualValue;
        if (i === 1) {
            benefit = effectiveTotalAnnualValue * (inputs.year1RampPct / 100);
        }

        // Cost Logic
        let swCost = 0;
        let svcCost = 0;
        
        // Dynamic access helper
        const getCost = (prefix: string, year: number) => {
            const key = `${prefix}${year}` as keyof CalculatorInputs;
            return inputs[key] as number || 0;
        };

        swCost = getCost('costSoftwareYear', i);
        svcCost = getCost('costServicesYear', i);
        
        const annualCost = swCost + svcCost;
        const net = benefit - annualCost;
        cumulative += net;
        totalCost += annualCost;

        yearlyData.push({
            year: i,
            cost: annualCost,
            benefit: benefit,
            net: net,
            cumulative: cumulative
        });
    }

    const netPresentValue = cumulative; 
    const roiMultiple = totalCost > 0 ? (cumulative + totalCost) / totalCost : 0;
    const targetInvestment = effectiveTotalAnnualValue * 0.10; 

    // Approx Payback Period Logic
    let paybackPeriod = 0;
    for (let i = 0; i < yearlyData.length; i++) {
       if (yearlyData[i].cumulative > 0) {
           // If first year is positive, payback is < 1 year
           if (i === 0) {
              paybackPeriod = yearlyData[i].cost / yearlyData[i].benefit; 
           } else {
              const prevCumulative = Math.abs(yearlyData[i-1].cumulative);
              const cashFlow = yearlyData[i].net;
              paybackPeriod = i + (prevCumulative / cashFlow);
           }
           break;
       }
    }
    
    return {
      drivers,
      totalValue: effectiveTotalAnnualValue, // Returns the SELECTED scenario total
      targetInvestment,
      roiMultiple,
      yearlyData,
      totalCost,
      netPresentValue,
      paybackPeriod
    };
  };

  const results = React.useMemo(() => calculateResults(), [inputs, selectedScenario]);

  // Calculation for the total row in table (summing raw columns)
  const tableTotalLikely = results.drivers.reduce((a, b) => a + b.value, 0);
  const tableTotalConservative = results.drivers.reduce((a, b) => a + b.conservative, 0);
  const tableTotalOptimistic = results.drivers.reduce((a, b) => a + b.optimistic, 0);


  const renderInputTab = () => {
    switch (activeInputTab) {
      case 'company':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             {/* General Company Info */}
             <div className="col-span-1 md:col-span-2 border-b border-zinc-800 pb-2 mb-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_company}</h4>
             </div>
             
             {/* ROW 1: Customer Name & Opp Name */}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_cust_name}</label>
                <input type="text" className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:ring-1 focus:ring-blackline-yellow outline-none" 
                  value={inputs.companyName} onBlur={handleBlur} onChange={(e) => handleInputChange('companyName', e.target.value)} placeholder="e.g. Acme Corp" />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Opportunity Name</label>
                <input type="text" className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:ring-1 focus:ring-blackline-yellow outline-none" 
                  value={inputs.opportunityName || ''} onBlur={handleBlur} onChange={(e) => handleInputChange('opportunityName', e.target.value)} placeholder="e.g. Acme Transformation" />
             </div>

             {/* ROW 2: Opp ID & Revenue */}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">Opportunity ID</label>
                <input type="text" className="w-full bg-black border border-zinc-700 p-3 rounded text-white font-mono focus:ring-1 focus:ring-blackline-yellow outline-none" 
                  value={inputs.opportunityId || ''} onBlur={handleBlur} onChange={(e) => handleInputChange('opportunityId', e.target.value)} placeholder="e.g. OPP-12345" />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_revenue}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:ring-1 focus:ring-blackline-yellow outline-none" 
                  value={inputs.annualRevenue} onBlur={handleBlur} onChange={(e) => handleInputChange('annualRevenue', Number(e.target.value))} />
             </div>

             {/* ROW 3: Industry */}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_industry}</label>
                <select className="w-full bg-black border border-zinc-700 p-3 rounded text-white focus:ring-1 focus:ring-blackline-yellow outline-none" 
                   value={inputs.industry} onChange={(e) => handleInputChange('industry', e.target.value)}>
                   <option>Financial Services</option>
                   <option>Manufacturing</option>
                   <option>Retail</option>
                   <option>Healthcare</option>
                   <option>Technology</option>
                   <option>Energy</option>
                   <option>Public Sector</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_public_priv}</label>
                <div className="flex gap-4">
                  <button onClick={() => handleInputChange('isPublic', true)} className={`px-4 py-2 rounded font-medium ${inputs.isPublic ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>Public</button>
                  <button onClick={() => handleInputChange('isPublic', false)} className={`px-4 py-2 rounded font-medium ${!inputs.isPublic ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>Private</button>
                </div>
             </div>
             {inputs.isPublic && (
               <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300">{t.lbl_market_cap}</label>
                  <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                    value={inputs.marketCap} onChange={(e) => handleInputChange('marketCap', Number(e.target.value))} />
               </div>
             )}
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_entities}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.numLegalEntities} onChange={(e) => handleInputChange('numLegalEntities', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_regions}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.numGeographicRegions} onChange={(e) => handleInputChange('numGeographicRegions', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_erps}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.numErpSystems} onChange={(e) => handleInputChange('numErpSystems', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_wacc}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.wacc} onChange={(e) => handleInputChange('wacc', Number(e.target.value))} />
             </div>

             {/* Moved from Finance Tab */}
             <div className="col-span-1 md:col-span-2 border-t border-zinc-800 pt-4 mt-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider mb-4">{t.calc_sec_org}</h4>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_ftes}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.totalFinanceFtes} onChange={(e) => handleInputChange('totalFinanceFtes', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_acct_ftes}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.accountingFtes} onChange={(e) => handleInputChange('accountingFtes', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_salary}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.avgFteSalary} onChange={(e) => handleInputChange('avgFteSalary', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_turnover}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.turnoverRate} onChange={(e) => handleInputChange('turnoverRate', Number(e.target.value))} />
             </div>
          </div>
        );
      case 'operations':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             {/* Operations & Process */}
             <div className="col-span-1 md:col-span-2 border-b border-zinc-800 pb-2 mb-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_process}</h4>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_manual}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.manualWorkPct} onChange={(e) => handleInputChange('manualWorkPct', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_res_recs}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.resourcesDoingRecs} onChange={(e) => handleInputChange('resourcesDoingRecs', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_time_recs}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.reconciliationTimePct} onChange={(e) => handleInputChange('reconciliationTimePct', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_res_journal}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.resourcesOnJournals} onChange={(e) => handleInputChange('resourcesOnJournals', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_time_journal}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.journalEntryTimePct} onChange={(e) => handleInputChange('journalEntryTimePct', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_overtime}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.annualCloseOvertimeHours} onChange={(e) => handleInputChange('annualCloseOvertimeHours', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_time_fill}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.avgTimeToFillPosition} onChange={(e) => handleInputChange('avgTimeToFillPosition', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_cost_replace}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.costToReplaceResourcePct} onChange={(e) => handleInputChange('costToReplaceResourcePct', Number(e.target.value))} />
             </div>
             
             {/* Metrics */}
             <div className="col-span-1 md:col-span-2 border-b border-zinc-800 pb-2 mb-2 mt-4">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_metrics}</h4>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_close_days}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.financialCloseCycleDays} onChange={(e) => handleInputChange('financialCloseCycleDays', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_dso}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.currentDso} onChange={(e) => handleInputChange('currentDso', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_recs_vol}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.reconciliationsPerMonth} onChange={(e) => handleInputChange('reconciliationsPerMonth', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_recs_pct}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.accountsReconciledPct} onChange={(e) => handleInputChange('accountsReconciledPct', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_journal_vol}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.journalEntriesPerMonth} onChange={(e) => handleInputChange('journalEntriesPerMonth', Number(e.target.value))} />
             </div>
          </div>
        );
      case 'risk':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             <div className="col-span-1 md:col-span-2 border-b border-zinc-800 pb-2 mb-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_risk}</h4>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_restatements}</label>
                <div className="flex gap-4">
                  <button onClick={() => handleInputChange('priorRestatements', true)} className={`px-4 py-2 rounded font-medium ${inputs.priorRestatements ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>Yes</button>
                  <button onClick={() => handleInputChange('priorRestatements', false)} className={`px-4 py-2 rounded font-medium ${!inputs.priorRestatements ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>No</button>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_weakness}</label>
                <div className="flex gap-4">
                  <button onClick={() => handleInputChange('materialWeakness', true)} className={`px-4 py-2 rounded font-medium ${inputs.materialWeakness ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>Yes</button>
                  <button onClick={() => handleInputChange('materialWeakness', false)} className={`px-4 py-2 rounded font-medium ${!inputs.materialWeakness ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-white'}`}>No</button>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_fines}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.priorFines} onChange={(e) => handleInputChange('priorFines', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_manual_proc}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.manualProcessPct} onChange={(e) => handleInputChange('manualProcessPct', Number(e.target.value))} />
             </div>
          </div>
        );
      case 'ma':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             <div className="col-span-1 md:col-span-2 border-b border-zinc-800 pb-2 mb-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_ma}</h4>
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_acq_year}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.acquisitionsPerYear} onChange={(e) => handleInputChange('acquisitionsPerYear', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_deal_size}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.avgDealSize} onChange={(e) => handleInputChange('avgDealSize', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_int_cost}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.integrationCostPerDeal} onChange={(e) => handleInputChange('integrationCostPerDeal', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_int_time}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.integrationTimeMonths} onChange={(e) => handleInputChange('integrationTimeMonths', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_ma_return}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.expectedReturnOnMaPct} onChange={(e) => handleInputChange('expectedReturnOnMaPct', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_retention}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.keyTalentRetentionTarget} onChange={(e) => handleInputChange('keyTalentRetentionTarget', Number(e.target.value))} />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">{t.lbl_ma_turnover}</label>
                <input type="number" className="w-full bg-black border border-zinc-700 p-3 rounded text-white" 
                  value={inputs.historicTurnoverMaPct} onChange={(e) => handleInputChange('historicTurnoverMaPct', Number(e.target.value))} />
             </div>
          </div>
        );
      case 'investment':
         // Helper for dynamic access
        const getCost = (prefix: string, year: number) => {
            const key = `${prefix}${year}` as keyof CalculatorInputs;
            return inputs[key] as number || 0;
        };
        return (
          <div className="grid grid-cols-1 gap-6 animate-fade-in">
             <div className="border-b border-zinc-800 pb-2 mb-2">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider">{t.calc_sec_inv}</h4>
             </div>
             
             {/* Period Selector */}
             <div className="flex gap-6 items-center bg-black/40 p-4 rounded-lg border border-zinc-800">
               <span className="text-sm font-bold text-gray-300">{t.lbl_inv_horizon}</span>
               <div className="flex gap-2">
                  <button onClick={() => handleInputChange('investmentPeriod', 3)} className={`px-4 py-2 text-sm font-bold rounded ${inputs.investmentPeriod === 3 ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-gray-300'}`}>3 Years</button>
                  <button onClick={() => handleInputChange('investmentPeriod', 5)} className={`px-4 py-2 text-sm font-bold rounded ${inputs.investmentPeriod === 5 ? 'bg-blackline-yellow text-black' : 'bg-zinc-800 text-gray-300'}`}>5 Years</button>
               </div>
             </div>

             {/* Year 1 Ramp */}
             <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-bold text-gray-300">{t.lbl_ramp}</label>
                  <span className="text-white font-mono">{inputs.year1RampPct}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" step="5"
                  className="w-full accent-blackline-yellow"
                  value={inputs.year1RampPct} 
                  onChange={(e) => handleInputChange('year1RampPct', Number(e.target.value))} 
                />
                <p className="text-xs text-gray-400 font-medium">Conservative assumption for deployment time in Year 1.</p>
             </div>

             {/* Annual Software Costs */}
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <div className="col-span-2 md:col-span-5 text-sm font-bold text-white border-b border-zinc-800 pb-1">{t.lbl_sw_cost}</div>
                {[1, 2, 3, 4, 5].slice(0, inputs.investmentPeriod).map(year => (
                  <div key={`sw-${year}`} className="space-y-1">
                    <label className="text-xs text-gray-400">Year {year}</label>
                    <input type="number" className="w-full bg-black border border-zinc-700 p-2 rounded text-white text-sm" 
                       value={getCost('costSoftwareYear', year)} 
                       onChange={(e) => handleInputChange(`costSoftwareYear${year}` as keyof CalculatorInputs, Number(e.target.value))} />
                  </div>
                ))}
             </div>

             {/* Implementation Services Costs */}
             <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                <div className="col-span-2 md:col-span-5 text-sm font-bold text-white border-b border-zinc-800 pb-1">{t.lbl_svc_cost}</div>
                {[1, 2, 3, 4, 5].slice(0, inputs.investmentPeriod).map(year => (
                  <div key={`svc-${year}`} className="space-y-1">
                    <label className="text-xs text-gray-400">Year {year}</label>
                    <input type="number" className="w-full bg-black border border-zinc-700 p-2 rounded text-white text-sm" 
                       value={getCost('costServicesYear', year)} 
                       onChange={(e) => handleInputChange(`costServicesYear${year}` as keyof CalculatorInputs, Number(e.target.value))} />
                  </div>
                ))}
             </div>

          </div>
        );
      default: return null;
    }
  };

  if (step === 'result') {
    return (
      <div className="w-full max-w-[1200px] mx-auto mt-6 mb-20 px-4 md:px-0 print-container">
        
        {/* Actions Bar - Hidden in Print */}
        <div className="flex justify-between items-center mb-6 no-print">
          <button 
             onClick={() => setStep('input')}
             className="text-gray-300 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors"
           >
             <RotateCcw size={14} /> {t.calc_back || "Edit Inputs"}
           </button>
           
           <div className="relative">
             <button 
               onClick={() => setShowExportMenu(!showExportMenu)}
               className="bg-zinc-800 hover:bg-zinc-700 text-white flex items-center gap-2 px-4 py-2 rounded text-sm font-bold transition-colors"
             >
               <Download size={16} /> {t.calc_export || "Export Report"}
             </button>
             {showExportMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 animate-fade-in">
                  <div className="flex flex-col py-1">
                     <button onClick={() => { exportToWord(`Value Assessment - ${inputs.companyName}`, generateCalculatorHtml(inputs, results)); setShowExportMenu(false); }} className="text-left px-4 py-3 hover:bg-zinc-800 text-gray-200 hover:text-white text-sm font-medium">{t.export_word || "Download Word"}</button>
                  </div>
                </div>
             )}
             {showExportMenu && <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)}></div>}
           </div>
        </div>

        {/* --- PAGE 1 DASHBOARD RECREATION --- */}
        <div className="bg-white text-black p-8 md:p-12 rounded-none md:rounded-xl shadow-xl min-h-[1000px]">
           
           {/* Header */}
           <div className="border-b-4 border-blackline-yellow pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-blue-900">{t.dash_title}</h1>
                <p className="text-gray-600 mt-1 font-semibold">{t.dash_subtitle} - {inputs.investmentPeriod} Yr</p>
              </div>
              <div className="text-right text-sm text-gray-800">
                <p><span className="font-bold">{t.lbl_cust_name}:</span> {inputs.companyName || '[Client Name]'}</p>
                {inputs.opportunityName && <p><span className="font-bold">Opp:</span> {inputs.opportunityName}</p>}
                <p><span className="font-bold">{t.lbl_revenue}:</span> {formatCurrency(inputs.annualRevenue)}</p>
                <p><span className="font-bold">Date:</span> {new Date().toLocaleDateString()}</p>
              </div>
           </div>

           {/* SCENARIO SELECTOR */}
           <div className="flex justify-center mb-8 no-print">
              <div className="bg-gray-100 p-1.5 rounded-full flex gap-1">
                 <button 
                   onClick={() => setSelectedScenario('conservative')}
                   className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedScenario === 'conservative' ? 'bg-yellow-100 text-yellow-900 shadow-sm border border-yellow-200' : 'text-gray-600 hover:bg-gray-200'}`}
                 >
                   Conservative (90%)
                 </button>
                 <button 
                   onClick={() => setSelectedScenario('likely')}
                   className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedScenario === 'likely' ? 'bg-yellow-200 text-yellow-900 shadow-sm border border-yellow-300' : 'text-gray-600 hover:bg-gray-200'}`}
                 >
                   Likely (100%)
                 </button>
                 <button 
                   onClick={() => setSelectedScenario('optimistic')}
                   className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${selectedScenario === 'optimistic' ? 'bg-yellow-300 text-yellow-900 shadow-sm border border-yellow-400' : 'text-gray-600 hover:bg-gray-200'}`}
                 >
                   Optimistic (110%)
                 </button>
              </div>
           </div>

           {/* Big Total */}
           <div className="mb-8 flex flex-col md:flex-row gap-12 border-b border-gray-100 pb-8">
             <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">{t.dash_total_val} ({selectedScenario})</p>
                <span className="text-4xl font-extrabold text-black">{formatCurrency(results.totalValue)}</span>
             </div>
             <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">{t.dash_cum_val} ({inputs.investmentPeriod} Yrs)</p>
                <span className="text-4xl font-extrabold text-green-600">{formatCurrency(results.netPresentValue)}</span>
             </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">{t.dash_roi}</p>
                <span className="text-4xl font-extrabold text-blue-900">{results.roiMultiple.toFixed(1)}x</span>
             </div>
           </div>

           {/* FINANCIAL PROJECTION CHARTS */}
           <div className="mb-12 print-break-inside">
              <div className="flex items-center gap-2 mb-6 text-blue-900">
                 <BarChart4 size={24} />
                 <h3 className="text-xl font-bold">{t.dash_proj} ({inputs.investmentPeriod}-Year)</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 {/* Chart 1: Annual Cash Flow */}
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h4 className="text-sm font-bold text-gray-600 uppercase mb-6 text-center">{t.dash_chart_cf}</h4>
                    <div className="flex justify-between items-end h-[200px] gap-2 md:gap-4 px-2">
                       {results.yearlyData?.map((y) => {
                         const maxVal = Math.max(...(results.yearlyData?.map(d => d.benefit) || [1]), 1); // Avoid div by 0
                         const barHeight = (val: number) => `${(val / maxVal) * 150}px`; 
                         
                         return (
                           <div key={y.year} className="flex flex-col items-center flex-1 group">
                              <div className="flex gap-1 items-end w-full justify-center">
                                {/* Cost Bar */}
                                <div style={{ height: barHeight(y.cost) }} className="w-3 md:w-6 bg-red-400 rounded-t-sm relative">
                                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[10px] p-1 rounded whitespace-nowrap z-10">
                                    Cost: {formatCompactNumber(y.cost)}
                                  </div>
                                </div>
                                {/* Benefit Bar */}
                                <div style={{ height: barHeight(y.benefit) }} className="w-3 md:w-6 bg-green-500 rounded-t-sm relative">
                                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[10px] p-1 rounded whitespace-nowrap z-10">
                                    Benefit: {formatCompactNumber(y.benefit)}
                                  </div>
                                </div>
                              </div>
                              <span className="mt-2 text-xs font-bold text-gray-600">Yr {y.year}</span>
                           </div>
                         );
                       })}
                    </div>
                 </div>

                 {/* Chart 2: Cumulative Net Cash Flow */}
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                     <h4 className="text-sm font-bold text-gray-600 uppercase mb-6 text-center">{t.dash_chart_net}</h4>
                     <div className="flex justify-between items-end h-[200px] gap-2 md:gap-4 px-2">
                       {results.yearlyData?.map((y) => {
                         const maxCumulative = Math.max(0, ...results.yearlyData?.map(d => Math.abs(d.cumulative)) || [0]);
                         const safeRange = maxCumulative === 0 ? 1 : maxCumulative;
                         
                         const height = (val: number) => {
                             return `${(Math.abs(val) / safeRange) * 140}px`;
                         };

                         return (
                           <div key={y.year} className="flex flex-col items-center flex-1 justify-end h-full relative group">
                              {/* Zero Line */}
                              <div className="absolute w-full h-px bg-gray-300 bottom-[50px] left-0"></div>
                              
                              <div className={`w-6 md:w-10 rounded-sm relative transition-all duration-500 ${y.cumulative >= 0 ? 'bg-blue-600' : 'bg-gray-400'}`} style={{ height: height(y.cumulative) }}>
                                 <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black text-white text-[10px] p-1 rounded whitespace-nowrap z-10">
                                    {formatCompactNumber(y.cumulative)}
                                  </div>
                              </div>
                              <span className="mt-2 text-xs font-bold text-gray-600">Yr {y.year}</span>
                           </div>
                         );
                       })}
                    </div>
                 </div>
              </div>

              {/* Yearly Data Table */}
              <div className="mt-8 overflow-hidden border border-gray-200 rounded-lg">
                 <table className="w-full text-sm text-center">
                    <thead className="bg-gray-100 font-bold text-gray-700">
                      <tr>
                        <th className="p-2 text-left pl-4">{t.dash_tbl_metric}</th>
                        {results.yearlyData?.map(y => <th key={y.year} className="p-2">Year {y.year}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr>
                         <td className="p-2 text-left pl-4 text-gray-600 font-bold">{t.dash_tbl_costs}</td>
                         {results.yearlyData?.map(y => <td key={y.year} className="p-2 text-red-500">({formatCompactNumber(y.cost)})</td>)}
                       </tr>
                       <tr>
                         <td className="p-2 text-left pl-4 text-gray-600 font-bold">{t.dash_tbl_benefits}</td>
                         {results.yearlyData?.map(y => <td key={y.year} className="p-2 text-green-600">{formatCompactNumber(y.benefit)}</td>)}
                       </tr>
                       <tr className="bg-blue-50 font-bold">
                         <td className="p-2 text-left pl-4 text-blue-900">{t.dash_tbl_net}</td>
                         {results.yearlyData?.map(y => <td key={y.year} className="p-2 text-blue-900">{formatCompactNumber(y.cumulative)}</td>)}
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

           {/* VALUE DRIVER BREAKDOWN TABLE */}
           <div className="mb-12 print-break-inside">
              <div className="flex items-center gap-2 mb-6 text-blue-900">
                 <Coins size={24} />
                 <h3 className="text-xl font-bold">Detailed Value Driver Breakdown</h3>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white font-bold">
                       <tr>
                          <th className="p-3 pl-4">{t.dash_tbl_driver}</th>
                          <th className="p-3">{t.dash_tbl_ann}</th>
                          <th className="p-3">{t.dash_tbl_cons}</th>
                          <th className="p-3">{t.dash_tbl_likely}</th>
                          <th className="p-3">{t.dash_tbl_opt}</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Total Row */}
                      <tr className="bg-gray-50 font-bold border-b border-gray-200">
                        <td className="p-3 text-left pl-4 text-gray-800">TOTAL Annual Value</td>
                        <td className="p-3 text-black">${formatCompactNumber(tableTotalLikely)}</td>
                         {/* Highlight the active scenario column */}
                        <td className={`p-3 ${selectedScenario === 'conservative' ? 'bg-yellow-100 text-black border-l border-r border-yellow-200' : 'text-gray-500'}`}>${formatCompactNumber(tableTotalConservative)}</td>
                        <td className={`p-3 ${selectedScenario === 'likely' ? 'bg-yellow-100 text-black border-l border-r border-yellow-200' : 'text-gray-500'}`}>${formatCompactNumber(tableTotalLikely)}</td>
                        <td className={`p-3 ${selectedScenario === 'optimistic' ? 'bg-yellow-100 text-black border-l border-r border-yellow-200' : 'text-gray-500'}`}>${formatCompactNumber(tableTotalOptimistic)}</td>
                      </tr>
                       {results.drivers.map(d => (
                         <tr key={d.name} className="hover:bg-gray-50 transition-colors">
                           <td className="p-3 text-left pl-4 text-gray-700">{d.name}</td>
                           <td className="p-3 font-bold text-gray-800">${formatCompactNumber(d.value)}</td>
                           
                           <td className={`p-3 ${selectedScenario === 'conservative' ? 'bg-yellow-50 font-bold text-black' : 'text-gray-500'}`}>
                             ${formatCompactNumber(d.conservative)}
                           </td>
                           <td className={`p-3 ${selectedScenario === 'likely' ? 'bg-yellow-50 font-bold text-black' : 'text-gray-500'}`}>
                             ${formatCompactNumber(d.value)}
                           </td>
                           <td className={`p-3 ${selectedScenario === 'optimistic' ? 'bg-yellow-50 font-bold text-black' : 'text-gray-500'}`}>
                             ${formatCompactNumber(d.optimistic)}
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* KPI Summary Table */}
           <div className="mt-12">
              <div className="flex items-center gap-2 mb-6 text-blue-900 border-b border-gray-100 pb-2">
                 <Check size={24} />
                 <h3 className="text-xl font-bold">{t.dash_kpi_title}</h3>
              </div>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-blue-900 text-white font-bold">
                       <tr>
                          <th className="p-3 pl-4">{t.dash_tbl_driver}</th>
                          <th className="p-3">{t.dash_kpi_bench}</th>
                          <th className="p-3">{t.dash_kpi_target}</th>
                          <th className="p-3">{t.dash_kpi_impact}</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Process Efficiency</td>
                          <td className="p-3">Monthly Close</td>
                          <td className="p-3">≤3 days</td>
                          <td className="p-3 text-green-600 font-bold">40% efficiency gain</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Working Capital</td>
                          <td className="p-3">Cash Conversion</td>
                          <td className="p-3">&lt;30 days</td>
                          <td className="p-3 text-green-600 font-bold">$10-50M release</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Trust Premium</td>
                          <td className="p-3">Financial Accuracy</td>
                          <td className="p-3">&gt;99.9%</td>
                          <td className="p-3 text-green-600 font-bold">10-20% valuation</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">M&A Integration</td>
                          <td className="p-3">Integration Time</td>
                          <td className="p-3">6 months</td>
                          <td className="p-3 text-green-600 font-bold">3x faster</td>
                       </tr>
                        <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Talent Retention</td>
                          <td className="p-3">Turnover Rate</td>
                          <td className="p-3">&lt;8%</td>
                          <td className="p-3 text-green-600 font-bold">$2-5M savings</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Innovation/AI</td>
                          <td className="p-3">Automation Rate</td>
                          <td className="p-3">&gt;70%</td>
                          <td className="p-3 text-green-600 font-bold">50% time freed</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Regulatory</td>
                          <td className="p-3">Compliance Rate</td>
                          <td className="p-3">&gt;99%</td>
                          <td className="p-3 text-green-600 font-bold">$1-5M fine avoidance</td>
                       </tr>
                       <tr className="hover:bg-gray-50 text-gray-700">
                          <td className="p-3 pl-4 font-bold">Resilience</td>
                          <td className="p-3">System Uptime</td>
                          <td className="p-3">99.999%</td>
                          <td className="p-3 text-green-600 font-bold">$10M+ protection</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>

        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400 no-print">
          Generated by Excellence Quantified Tool | Internal Use Only
        </div>
      </div>
    );
  }

  // --- INPUT STEP ---
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-6 mb-20 px-4 md:px-0 animate-fade-in">
       {/* ... Header and Tabs ... */}
       <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{t.calc_title} (BVA Calculator)</h2>
            <p className="text-gray-300 mt-2">{t.calc_subtitle}</p>
          </div>
          <button 
             onClick={() => setStep('result')}
             className="px-8 py-4 bg-blackline-yellow text-black rounded-lg font-bold shadow-[0_0_20px_rgba(249,183,52,0.3)] hover:shadow-[0_0_30px_rgba(249,183,52,0.5)] hover:scale-105 transition-all flex items-center gap-2"
          >
             {t.calc_btn} <ArrowRight size={20} />
          </button>
       </div>

       {/* Tabs */}
       <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-800 pb-1">
          <button onClick={() => setActiveInputTab('company')} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeInputTab === 'company' ? 'border-blackline-yellow text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
            <Building2 size={16} className="inline mr-2 mb-1"/> {t.calc_tab_company}
          </button>
          <button onClick={() => setActiveInputTab('operations')} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeInputTab === 'operations' ? 'border-blackline-yellow text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
            <Settings size={16} className="inline mr-2 mb-1"/> {t.calc_tab_ops}
          </button>
          <button onClick={() => setActiveInputTab('risk')} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeInputTab === 'risk' ? 'border-blackline-yellow text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
            <ShieldAlert size={16} className="inline mr-2 mb-1"/> {t.calc_tab_risk}
          </button>
          <button onClick={() => setActiveInputTab('ma')} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeInputTab === 'ma' ? 'border-blackline-yellow text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
            <GitMerge size={16} className="inline mr-2 mb-1"/> {t.calc_tab_ma}
          </button>
          <button onClick={() => setActiveInputTab('investment')} className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-all ${activeInputTab === 'investment' ? 'border-blackline-yellow text-white' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}>
            <Coins size={16} className="inline mr-2 mb-1"/> {t.calc_tab_inv}
          </button>
       </div>

       {/* Form Content */}
       <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-xl min-h-[500px]">
          {renderInputTab()}
       </div>
    </div>
  );
};
