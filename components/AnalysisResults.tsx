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
  FileText
} from 'lucide-react';
import { AnalysisResult, ValueDriverSelection, UIStrings, Persona } from '../types';
import { SKO_DATA } from '../constants';

interface AnalysisResultsProps {
  selectedDrivers: ValueDriverSelection[];
  selectedIndustry: string;
  selectedPersona: Persona;
  t: UIStrings;
  onBack: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  selectedDrivers = [], // Default to empty array
  selectedIndustry = "Unknown Industry",
  selectedPersona,
  t,
  onBack
}) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Safety Check: Ensure critical props exist before processing
    if (!selectedPersona) {
        console.error("AnalysisResults: Missing selectedPersona prop");
        setError("No persona selected.");
        setLoading(false);
        return;
    }

    if (!selectedDrivers || selectedDrivers.length === 0) {
        console.warn("AnalysisResults: No drivers selected");
        setError("No value drivers selected.");
        setLoading(false);
        return;
    }

    const generateResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 800));

        const newResults: AnalysisResult[] = selectedDrivers.map(driver => {
          // 2. Find Driver Data safely
          const driverDetail = SKO_DATA.find(d => d.id === driver.id);
          
          if (!driverDetail) {
            console.warn(`AnalysisResults: Data not found for driver ID: ${driver.id}`);
            return {
              driverId: driver.id,
              score: 0,
              summary: "Content currently unavailable for this value driver.",
              recommendations: ["Review standard operating procedures", "Assess current toolset"]
            };
          }

          // 3. Intelligent Persona Mapping
          // Check against known IDs or Group property
          const pid = selectedPersona.id?.toLowerCase() || '';
          const pGroup = selectedPersona.group || '';
          const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(pid) || pGroup === 'Executive';
          
          // Select correct Point-of-View (POV) content
          const povContent = isExecutive ? driverDetail.executivePov : driverDetail.operationalPov;
          const personaList = isExecutive ? driverDetail.personas?.executive : driverDetail.personas?.operational;

          // Match specific persona role (e.g. "CFO" matches "CFO")
          // Fallback to the first persona in the list if no exact match found
          const pName = selectedPersona.name || 'Unknown';
          const matchedPersona = personaList?.find(p => 
              (p.role && pName.toLowerCase().includes(p.role.toLowerCase())) || 
              (p.role && p.role.toLowerCase().includes(pName.split(' ')[0].toLowerCase()))
          ) || personaList?.[0];

          // 4. Construct Narrative safely
          // Using optional chaining (?) to prevent crashes if 'createValue' is missing
          const title = povContent?.createValue?.title || "Strategic Alignment";
          const focus = povContent?.createValue?.focus || "Optimization";
          
          let summary = `${title}: ${focus}.`;
          
          if (matchedPersona) {
             const nightmare = matchedPersona.nightmare || "process inefficiency";
             const aspiration = matchedPersona.aspiration || "strategic growth";
             summary += ` For a ${pName}, this directly mitigates the risk of ${nightmare} and unlocks capacity for ${aspiration}.`;
          }

          // 5. Recommendations (Proof Points)
          // Ensure it is always an array
          const recs = povContent?.deliverValue?.proofPoints || [
              "Automate manual workflows", 
              "Centralize data management"
          ];

          return {
            driverId: driver.id,
            score: Math.floor(Math.random() * 15) + 85, // Mock score
            summary: summary,
            recommendations: recs
          };
        });

        setResults(newResults);
      } catch (err) {
        console.error("AnalysisResults: Critical error during generation", err);
        setError("An unexpected error occurred while generating results.");
      } finally {
        setLoading(false);
      }
    };

    generateResults();
  }, [selectedDrivers, selectedIndustry, selectedPersona]);

  // --- RENDER STATES ---

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center animate-fade-in p-6">
        <div className="w-16 h-16 border-4 border-blackline-yellow border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
          Analyzing Priorities...
        </h2>
        <div className="flex flex-col gap-2 text-zinc-400 text-center text-sm">
          <p>Aligning with <span className="text-white">{selectedPersona?.name}</span> goals...</p>
          <p>Benchmarking <span className="text-white">{selectedDrivers.length}</span> drivers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 mb-6">
            <h3 className="text-red-500 font-bold mb-2">Analysis Error</h3>
            <p className="text-zinc-400">{error}</p>
        </div>
        <button onClick={onBack} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors">
            Return to Configuration
        </button>
      </div>
    );
  }

  // --- MAIN CONTENT ---

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
              Tailored impact analysis for <span className="text-white font-bold">{selectedPersona.name}</span> in the <span className="text-white font-bold">{selectedIndustry}</span> sector.
           </p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0">
           <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white rounded-xl font-bold transition-all">
              <Share2 size={18} /> Share
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-blackline-yellow text-black rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg">
              <Download size={18} /> Export
           </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-12">
        {results.map((result, index) => {
          // Look up static driver info for titles/icons
          const driverInfo = SKO_DATA.find(d => d.id === result.driverId);
          if (!driverInfo) return null;

          // Determine Persona data for display (safe access)
          const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona.id) || selectedPersona.group === 'Executive';
          const personaList = isExecutive ? driverInfo.personas?.executive : driverInfo.personas?.operational;
          const matchedPersona = personaList?.find(p => 
            p.role && selectedPersona.name.toLowerCase().includes(p.role.toLowerCase())
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
