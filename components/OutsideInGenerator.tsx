
import React, { useState, useEffect } from 'react';
import { UIStrings, OutsideInResult, DealContext, OutsideInInputs } from '../types';
import { ArrowRight, Sparkles, Building2, TrendingUp, Target, Loader2, ArrowLeft, BarChart, FileText, Server, ShieldCheck, Briefcase, ClipboardList } from 'lucide-react';

interface OutsideInGeneratorProps {
  t: UIStrings;
  onSetDealContext: (ctx: DealContext) => void;
  dealContext: DealContext;
}

export const OutsideInGenerator: React.FC<OutsideInGeneratorProps> = ({ t, onSetDealContext, dealContext }) => {
  const [step, setStep] = useState<'input' | 'processing' | 'result'>('input');
  
  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step]);

  const [inputs, setInputs] = useState<OutsideInInputs>({
    companyName: dealContext.companyName || '',
    opportunityName: dealContext.opportunityName || '',
    opportunityId: dealContext.opportunityId || '',
    industry: dealContext.industry || 'Manufacturing',
    revenueRange: '$1B - $5B',
    solutionScope: 'Financial Close & Consolidation',
    primaryGoal: '' // Free form
  });

  // Auto-fill Opportunity Name if empty when Company Name changes
  useEffect(() => {
    if (inputs.companyName && !inputs.opportunityName) {
       setInputs(prev => ({ ...prev, opportunityName: `${inputs.companyName} Transformation 2026` }));
    }
  }, [inputs.companyName]);

  const handleInputChange = (field: keyof OutsideInInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    // Save to global context
    onSetDealContext({
      ...dealContext,
      companyName: inputs.companyName,
      industry: inputs.industry,
      opportunityName: inputs.opportunityName,
      opportunityId: inputs.opportunityId
    });

    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStep('result');
    }, 2000);
  };

  // Mock Result Data (In real app, this would come from GenAI based on inputs)
  const mockResult: OutsideInResult = {
    teaserTitle: `${inputs.opportunityName} - Value Hypothesis`,
    potentialSavingsRange: "$1.5M – $3.2M Annually",
    peerBenchmark: `Top Quartile ${inputs.industry} peers using ${inputs.solutionScope} achieve a 3-day close.`,
    strategicAssertion: `For a ${inputs.industry} leader aiming to "${inputs.primaryGoal || 'optimize finance'}", manual intervention in the ${inputs.solutionScope} process is a critical bottleneck preventing scalability.`,
    
    financeValueProp: `For the CFO: Directly addresses "${inputs.primaryGoal || 'operational efficiency'}" by automating 45% of manual reconciliation work, reducing audit risk, and freeing up 15 FTEs for strategic analysis.`,
    
    caoValueProp: `For the CAO: Operationalizes the 'Continuous Close', reducing peak-period burnout and ensuring balance sheet integrity without throwing headcount at the problem.`,

    itValueProp: `For the CIO: Replaces disparate legacy tools and spreadsheets with a single, secure cloud platform. Integrates seamlessly with your ERP to improve data governance and reduce technical debt.`,
    
    whyNow: "Peers are aggressively moving to 'Continuous Accounting'. Delaying this transformation increases the cost of compliance and risk of talent attrition.",
    nextStep: `Deep Dive Business Value Assessment focusing on ${inputs.solutionScope}.`
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
        <Loader2 size={64} className="text-blackline-yellow animate-spin mb-6" />
        <h3 className="text-2xl font-bold text-white mb-2">Consulting Value Models...</h3>
        <p className="text-gray-400">Synthesizing benchmark data for {inputs.companyName}.</p>
      </div>
    );
  }

  if (step === 'result') {
    return (
      <div className="w-full max-w-7xl mx-auto py-10 animate-fade-in px-6">
        <button onClick={() => setStep('input')} className="text-gray-500 hover:text-white flex items-center gap-2 mb-8 font-bold uppercase text-xs tracking-wider">
           <ArrowLeft size={16} /> Edit Profile & Inputs
        </button>

        <div className="bg-gradient-to-br from-zinc-900 to-black border border-blackline-yellow/30 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blackline-yellow/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
           
           {/* Header with Deal Info */}
           <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-zinc-800 pb-8 gap-6">
             <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blackline-yellow rounded text-black">
                    <Sparkles size={24} fill="black" />
                  </div>
                  <span className="text-blackline-yellow font-bold uppercase tracking-widest text-sm">Executive Value Flashcard</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  {mockResult.teaserTitle}
                </h2>
                <div className="flex gap-4 mt-3 text-xs font-mono text-gray-500">
                   {inputs.opportunityId && <span>ID: {inputs.opportunityId}</span>}
                   {inputs.opportunityId && <span>|</span>}
                   <span>Scope: {inputs.solutionScope}</span>
                </div>
             </div>
             <div className="text-right">
                <div className="bg-zinc-800/50 px-6 py-3 rounded-xl border border-zinc-700">
                   <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Estimated Value</p>
                   <p className="text-2xl font-extrabold text-green-500">{mockResult.potentialSavingsRange}</p>
                </div>
             </div>
           </div>

           {/* Strategic Assertion */}
           <p className="text-xl text-gray-300 leading-relaxed font-light mb-12 italic border-l-4 border-blackline-yellow pl-6">
             "{mockResult.strategicAssertion}"
           </p>

           {/* Tri-Lens: CFO, CAO, CIO */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Finance Lens (CFO) */}
              <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800 relative group hover:border-blackline-yellow/30 transition-all flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blackline-yellow opacity-50"></div>
                 <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-blackline-yellow" /> Finance Lens (CFO)
                 </h4>
                 <p className="text-gray-300 leading-relaxed text-sm flex-grow">
                   {mockResult.financeValueProp}
                 </p>
              </div>

               {/* Accounting Lens (CAO) */}
              <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800 relative group hover:border-green-500/30 transition-all flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-50"></div>
                 <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 flex items-center gap-2">
                    <ClipboardList size={18} className="text-green-500" /> Accounting Lens (CAO)
                 </h4>
                 <p className="text-gray-300 leading-relaxed text-sm flex-grow">
                   {mockResult.caoValueProp}
                 </p>
              </div>

              {/* IT Lens (CIO) */}
              <div className="bg-black/40 p-8 rounded-2xl border border-zinc-800 relative group hover:border-blue-500/30 transition-all flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 opacity-50"></div>
                 <h4 className="text-white font-bold uppercase text-sm tracking-wider mb-4 flex items-center gap-2">
                    <Server size={18} className="text-blue-500" /> IT Lens (CIO)
                 </h4>
                 <p className="text-gray-300 leading-relaxed text-sm flex-grow">
                   {mockResult.itValueProp}
                 </p>
              </div>
           </div>

           {/* Bottom Row: Benchmark & Next Steps */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-zinc-800/30 p-6 rounded-xl border border-zinc-700/30">
                 <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                   <Target size={16} className="text-gray-400" /> Peer Benchmark
                 </h4>
                 <p className="text-gray-400 text-sm">{mockResult.peerBenchmark}</p>
              </div>

              <div className="bg-zinc-800/30 p-6 rounded-xl border border-zinc-700/30">
                 <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide">
                   <ArrowRight size={16} className="text-blackline-yellow" /> Recommended Next Step
                 </h4>
                 <p className="text-white font-bold text-sm">{mockResult.nextStep}</p>
              </div>
           </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto py-10 animate-fade-in px-4 md:px-0">
      <div className="text-center mb-10">
         <h2 className="text-4xl font-bold text-white mb-3">Outside-In Generator</h2>
         <p className="text-gray-400 text-lg">Create a new deal profile and generate an executive value hypothesis.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-xl">
         
         {/* SECTION 1: DEAL IDENTITY */}
         <div className="mb-8 border-b border-zinc-800 pb-8">
            <h3 className="text-white font-bold uppercase text-xs tracking-wider mb-6 flex items-center gap-2">
              <FileText size={16} className="text-blackline-yellow"/> 1. Customer & Opportunity Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Customer Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white focus:ring-1 focus:ring-blackline-yellow outline-none transition-colors" 
                    placeholder="e.g. Acme Corp"
                    value={inputs.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Opportunity Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white focus:ring-1 focus:ring-blackline-yellow outline-none transition-colors" 
                    placeholder="e.g. Acme Transformation Deal"
                    value={inputs.opportunityName}
                    onChange={(e) => handleInputChange('opportunityName', e.target.value)}
                  />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Opportunity ID (Linkage Key)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl text-gray-300 font-mono outline-none focus:bg-black focus:text-white transition-colors" 
                      placeholder="e.g. OPP-12345"
                      value={inputs.opportunityId}
                      onChange={(e) => handleInputChange('opportunityId', e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Optional. Useful for linking to Salesforce or internal records.</p>
               </div>
            </div>
         </div>

         {/* SECTION 2: SCOPE & STRATEGY */}
         <div className="mb-8 border-b border-zinc-800 pb-8">
            <h3 className="text-white font-bold uppercase text-xs tracking-wider mb-6 flex items-center gap-2">
              <Target size={16} className="text-blue-500"/> 2. Scope & Strategic Context
            </h3>
            <div className="space-y-6">
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Product / Solution in Scope</label>
                  <select 
                     className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500"
                     value={inputs.solutionScope}
                     onChange={(e) => handleInputChange('solutionScope', e.target.value)}
                  >
                     <option>Financial Close & Consolidation</option>
                     <option>Intercompany Financial Management</option>
                     <option>Invoice-to-Cash (AR Automation)</option>
                     <option>BlackLine Studio360 (Platform)</option>
                     <option>Smart Close for SAP</option>
                     <option>Other / Custom</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Primary Strategic Goal (Optional)</label>
                  <textarea 
                     className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                     placeholder="e.g. Reduce audit fees by 20% and retire legacy mainframe systems before Q4."
                     value={inputs.primaryGoal}
                     onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-2">Adding a specific goal helps tailor the IT vs Finance narrative.</p>
               </div>
            </div>
         </div>

         {/* SECTION 3: FIRMOGRAPHICS */}
         <div>
            <h3 className="text-white font-bold uppercase text-xs tracking-wider mb-6 flex items-center gap-2">
              <Building2 size={16} className="text-green-500"/> 3. Firmographics (For Benchmarking)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Industry</label>
                  <select 
                     className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white outline-none"
                     value={inputs.industry}
                     onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                     <option>Manufacturing</option>
                     <option>Retail</option>
                     <option>Financial Services</option>
                     <option>Healthcare</option>
                     <option>Energy</option>
                     <option>Technology</option>
                     <option>Public Sector</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">Revenue Band</label>
                  <select 
                     className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white outline-none"
                     value={inputs.revenueRange}
                     onChange={(e) => handleInputChange('revenueRange', e.target.value)}
                  >
                     <option>$100M - $500M</option>
                     <option>$500M - $1B</option>
                     <option>$1B - $5B</option>
                     <option>$5B - $10B</option>
                     <option>$10B+</option>
                  </select>
               </div>
            </div>
         </div>
         
         <div className="pt-8 mt-8 border-t border-zinc-800">
           <button 
             onClick={handleGenerate}
             disabled={!inputs.companyName}
             className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-blackline-yellow transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
           >
             <Sparkles size={20} /> Generate Executive Value Flashcard
           </button>
         </div>
      </div>
    </div>
  );
};
