import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  Share2, 
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Target,
  FileText,
  BarChart2,
  Calculator
} from 'lucide-react';
import { AnalysisResult, ValueDriverSelection, UIStrings, Persona } from '../types';
import { SKO_DATA } from '../constants'; 

// Combined Props Interface to support both Legacy (Search) and Hub (Persona) modes
interface AnalysisResultsProps {
  // --- Hub Mode Props ---
  selectedDrivers?: ValueDriverSelection[];
  selectedIndustry?: string;
  selectedPersona?: Persona | null;

  // --- Legacy (Search) Mode Props ---
  data?: AnalysisResult | null;
  query?: string;
  onNavigateToCalculator?: () => void;

  // --- Shared Props ---
  t: UIStrings;
  onBack: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  selectedDrivers = [],
  selectedIndustry = "Unknown",
  selectedPersona,
  data,
  query,
  onNavigateToCalculator,
  t,
  onBack
}) => {
  
  // --- RENDER MODE DETECTION ---
  const isLegacyMode = !!data; // If 'data' prop exists, we are in Search/Legacy mode

  // --- STATE FOR HUB MODE ---
  const [hubResults, setHubResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  // Effect for HUB MODE generation
  useEffect(() => {
    if (isLegacyMode) return; // Skip if in legacy mode

    const generateHubResults = async () => {
      setLoading(true);
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 600));

      const newResults: AnalysisResult[] = selectedDrivers.map(driver => {
        const driverDetail = SKO_DATA.find(d => d.id === driver.id);
        if (!driverDetail) {
          return {
            driverId: driver.id,
            score: 0,
            summary: "Data unavailable.",
            recommendations: []
          };
        }

        // Persona Logic
        const pGroup = selectedPersona?.group || 'Executive';
        const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona?.id || '') || pGroup === 'Executive';
        const povContent = isExecutive ? driverDetail.executivePov : driverDetail.operationalPov;
        const personaList = isExecutive ? driverDetail.personas?.executive : driverDetail.personas?.operational;
        
        const matchedPersona = personaList?.find(p => 
            (p.role && selectedPersona?.name.toLowerCase().includes(p.role.toLowerCase()))
        ) || personaList?.[0];

        // Narrative Construction
        const summary = `${povContent.createValue.title}: ${povContent.createValue.focus}. ${matchedPersona ? `For a ${selectedPersona?.name}, this addresses "${matchedPersona.nightmare}" and enables "${matchedPersona.aspiration}".` : ''}`;

        return {
          driverId: driver.id,
          score: Math.floor(Math.random() * 15) + 85,
          summary: summary,
          recommendations: povContent.deliverValue.proofPoints || ["Optimize Process", "Automate Data"]
        };
      });

      setHubResults(newResults);
      setLoading(false);
    };

    generateHubResults();
  }, [selectedDrivers, selectedPersona, isLegacyMode]);

  // --- VIEW: LEGACY SEARCH RESULTS (Value Narrative) ---
  if (isLegacyMode && data) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-24 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-zinc-800 pb-8">
          <div>
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-4">
                <BarChart2 size={14} /> Search Analysis
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2">
                "{query}"
             </h2>
             <p className="text-zinc-400 text-lg">AI-Generated Value Narrative</p>
          </div>
          <div className="flex gap-3">
             {onNavigateToCalculator && (
                <button onClick={onNavigateToCalculator} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-bold transition-all">
                   <Calculator size={16} /> ROI Calc
                </button>
             )}
             <button className="flex items-center gap-2 px-4 py-2 bg-blackline-yellow text-black rounded-xl text-sm font-black uppercase tracking-wider hover:scale-105 transition-all">
                <Download size={16} /> PDF
             </button>
          </div>
        </div>

        {/* Legacy Content Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-2xl">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                 <div>
                    <h4 className="flex items-center gap-2 text-sm font-black text-blue-400 uppercase tracking-widest mb-3">
                       <FileText size={16} /> Executive Summary
                    </h4>
                    <p className="text-lg text-zinc-200 leading-relaxed">
                       {data.summary || "Analysis complete. Based on your query, BlackLine can significantly improve operational efficiency and reduce risk."}
                    </p>
                 </div>
                 {/* Fallback Metrics if available in data, else placeholders */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                       <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Potential ROI</p>
                       <p className="text-2xl font-black text-green-400">245%</p>
                    </div>
                    <div className="bg-black/40 p-5 rounded-2xl border border-zinc-800">
                       <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Time to Value</p>
                       <p className="text-2xl font-black text-white">3.5 Mo</p>
                    </div>
                 </div>
              </div>
              <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
                 <h4 className="flex items-center gap-2 text-sm font-black text-blackline-yellow uppercase tracking-widest mb-4">
                    <CheckCircle2 size={16} /> Key Drivers
                 </h4>
                 <ul className="space-y-3">
                    {data.recommendations?.map((rec, i) => (
                       <li key={i} className="flex gap-3 items-start text-sm text-zinc-300">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blackline-yellow shrink-0"></div>
                          {rec}
                       </li>
                    )) || (
                       <>
                          <li className="flex gap-3 items-start text-sm text-zinc-300"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blackline-yellow shrink-0"></div>Process Automation</li>
                          <li className="flex gap-3 items-start text-sm text-zinc-300"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blackline-yellow shrink-0"></div>Risk Mitigation</li>
                       </>
                    )}
                 </ul>
              </div>
           </div>
        </div>
        
        <div className="mt-12 text-center">
           <button onClick={onBack} className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors">
              <ArrowLeft size={16} /> New Search
           </button>
        </div>
      </div>
    );
  }

  // --- VIEW: HUB/SKO RESULTS (Persona & Drivers) ---
  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in p-6">
        <div className="w-16 h-16 border-4 border-blackline-yellow border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
          Analyzing Priorities...
        </h2>
        <div className="flex flex-col gap-2 text-zinc-400 text-center text-sm">
          <p>Aligning with <span className="text-white">{selectedPersona?.name || 'Persona'}</span> goals...</p>
          <p>Benchmarking against <span className="text-white">{selectedIndustry}</span> standards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 pb-24 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-zinc-800 pb-8">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blackline-yellow/20 text-blackline-yellow text-xs font-black uppercase tracking-[0.2em] mb-4">
              <Sparkles size={14} /> Value Analysis
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              Strategic <span className="text-zinc-500">Assessment</span>
           </h2>
           <p className="text-zinc-400 max-w-xl text-lg">
              Tailored impact analysis for <span className="text-white font-bold">{selectedPersona?.name}</span> in the <span className="text-white font-bold">{selectedIndustry}</span> sector.
           </p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
           <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white rounded-xl font-bold transition-all">
              <Share2 size={18} /> Share
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-blackline-yellow text-black rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg">
              <Download size={18} /> Export PDF
           </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-12">
        {hubResults.map((result, index) => {
          // Look up static driver info for titles/icons
          const driverInfo = SKO_DATA.find(d => d.id === result.driverId);
          if (!driverInfo) return null;

          // Determine Persona data for display (safe access)
          const pGroup = selectedPersona?.group || 'Executive';
          const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona?.id || '') || pGroup === 'Executive';
          const personaList = isExecutive ? driverInfo.personas?.executive : driverInfo.personas?.operational;
          const matchedPersona = personaList?.find(p => 
            p.role && selectedPersona?.name.toLowerCase().includes(p.role.toLowerCase())
          ) || personaList?.[0];

          return (
            <div key={result.driverId} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              
              {/* Card Header */}
              <div className="bg-zinc-950 p-8 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner shrink-0">
                       <span className="text-blackline-yellow font-black text-xl">{index + 1}</span>
                    </div>
                    <div>
                       <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight mb-2">
                          {driverInfo.title}
                       </h3>
                       <div className="flex items-center gap-3 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                          <Target size={16} className="text-blackline-yellow" />
                          <span>Strategic Priority</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="text-right">
                    <div className="text-3xl md:text-4xl font-black text-green-400 tracking-tighter mb-1">
                       {driverInfo.heroMetric}
                    </div>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Projected Impact</p>
                 </div>
              </div>

              {/* Card Body */}
              <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                 
                 {/* Narrative Column */}
                 <div className="lg:col-span-2 space-y-8">
                    <div>
                       <h4 className="flex items-center gap-3 text-sm font-black text-blue-400 uppercase tracking-widest mb-4">
                          <FileText size={16} /> Contextual Analysis
                       </h4>
                       <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-light">
                          {result.summary}
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/50">
                          <h5 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <AlertTriangle size={14} className="text-red-500" /> Key Risk
                          </h5>
                          <p className="text-zinc-300 font-medium">
                             {matchedPersona?.nightmare || "Operational inefficiency impacting margin."}
                          </p>
                       </div>
                       <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800/50">
                          <h5 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                             <TrendingUp size={14} className="text-green-500" /> Opportunity
                          </h5>
                          <p className="text-zinc-300 font-medium">
                             {matchedPersona?.aspiration || "Scalable growth without headcount."}
                          </p>
                       </div>
                    </div>
                 </div>

                 {/* Recommendations Column */}
                 <div className="bg-zinc-950/50 rounded-2xl p-6 border border-zinc-800/50">
                    <h4 className="flex items-center gap-3 text-sm font-black text-blackline-yellow uppercase tracking-widest mb-6">
                       <CheckCircle2 size={16} /> Recommended Capabilities
                    </h4>
                    <ul className="space-y-4">
                       {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex gap-4 items-start group">
                             <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-blackline-yellow transition-colors shrink-0"></div>
                             <span className="text-zinc-300 font-medium leading-snug group-hover:text-white transition-colors">{rec}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>

            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
         <button onClick={onBack} className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors">
            <ArrowLeft size={16} /> Adjust Scope
         </button>
      </div>

    </div>
  );
};
