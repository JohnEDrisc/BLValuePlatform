import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, PieChart, RefreshCcw } from 'lucide-react';
import { UIStrings, DealContext } from '../types';

interface ValueCalculatorProps {
  t: UIStrings;
  dealContext: DealContext;
  onSetDealContext: (ctx: DealContext) => void;
}

export const ValueCalculator: React.FC<ValueCalculatorProps> = ({ t, dealContext, onSetDealContext }) => {
  // Simplified state for demonstration
  const [inputs, setInputs] = useState({
    annualRevenue: dealContext.annualRevenue || 1000000000,
    wacc: 8.5,
    totalFinanceFtes: 50,
    accountingFtes: 25,
    avgFteSalary: 95000,
    financialCloseCycleDays: 10,
  });

  const [results, setResults] = useState<{roi: number; savings: number} | null>(null);

  const handleCalculate = () => {
    // Simple logic for demo
    const efficiencyGain = 0.30; // 30% efficiency
    const annualSavings = (inputs.accountingFtes * inputs.avgFteSalary * efficiencyGain);
    const softwareCost = 150000; // Placeholder
    const roi = ((annualSavings - softwareCost) / softwareCost) * 100;
    
    setResults({
      roi: Math.round(roi),
      savings: annualSavings
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-20 animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest mb-4">
           <Calculator size={14} /> ROI Engine
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
           {t.calc_title}
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
           {t.calc_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
           <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
             <RefreshCcw size={20} className="text-blackline-yellow" /> Inputs
           </h3>
           <div className="space-y-4">
              <div>
                 <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{t.annualRevenue || 'Annual Revenue'}</label>
                 <input 
                    type="number" 
                    value={inputs.annualRevenue}
                    onChange={(e) => setInputs({...inputs, annualRevenue: Number(e.target.value)})}
                    className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none transition-colors font-mono"
                 />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{t.accountingFtes || 'Acct FTEs'}</label>
                    <input 
                        type="number" 
                        value={inputs.accountingFtes}
                        onChange={(e) => setInputs({...inputs, accountingFtes: Number(e.target.value)})}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none transition-colors font-mono"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">{t.avgFteSalary || 'Avg Salary'}</label>
                    <input 
                        type="number" 
                        value={inputs.avgFteSalary}
                        onChange={(e) => setInputs({...inputs, avgFteSalary: Number(e.target.value)})}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-green-500 outline-none transition-colors font-mono"
                    />
                 </div>
              </div>
              <button 
                onClick={handleCalculate}
                className="w-full mt-6 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2"
              >
                Calculate <ArrowRight size={18} />
              </button>
           </div>
        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden">
           {!results ? (
              <div className="text-center opacity-50">
                 <PieChart size={64} className="mx-auto mb-4 text-zinc-700" />
                 <p className="text-zinc-500 font-medium">Enter metrics to generate ROI analysis</p>
              </div>
           ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                 <div className="bg-black/50 border border-zinc-800 p-8 rounded-2xl text-center">
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Projected ROI</p>
                    <p className="text-6xl font-black text-green-400 tracking-tighter">{results.roi}%</p>
                 </div>
                 <div className="bg-black/50 border border-zinc-800 p-8 rounded-2xl text-center">
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Annual Savings</p>
                    <p className="text-6xl font-black text-white tracking-tighter">
                       ${(results.savings / 1000000).toFixed(1)}M
                    </p>
                 </div>
                 <div className="col-span-full mt-8">
                    <h4 className="text-xl font-bold text-white mb-4">Strategic Impact</h4>
                    <p className="text-zinc-400 leading-relaxed">
                       Based on a revenue of <strong>${(inputs.annualRevenue / 1000000000).toFixed(1)}B</strong> and a team of <strong>{inputs.accountingFtes}</strong>, implementing automation could realize significant efficiency gains, freeing up capacity for strategic initiatives.
                    </p>
                 </div>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};
