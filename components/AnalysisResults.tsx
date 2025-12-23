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
  User
} from 'lucide-react';
import { AnalysisResult, ValueDriverSelection, UIStrings, Persona } from '../types';
import { SKO_DATA } from '../constants'; // Importing the single source of truth

interface AnalysisResultsProps {
  selectedDrivers: ValueDriverSelection[];
  selectedIndustry: string;
  selectedPersona: Persona; // The persona selected in the onboarding step
  t: UIStrings;
  onBack: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  selectedDrivers,
  selectedIndustry,
  selectedPersona,
  t,
  onBack
}) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateResults = async () => {
      setLoading(true);
      
      // Simulate processing time for "AI Analysis"
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newResults: AnalysisResult[] = selectedDrivers.map(driver => {
        // Find the rich data for this driver from constants
        const driverDetail = SKO_DATA.find(d => d.id === driver.id);
        
        // Default fallbacks if data is missing
        if (!driverDetail) {
          return {
            driverId: driver.id,
            score: 0,
            summary: "Data unavailable for this driver.",
            recommendations: []
          };
        }

        // --- INTELLIGENT PERSONA MAPPING ---
        // Determine if the selected persona is Executive or Operational to pull the right insights
        // We check the ID or the Group from the persona object
        const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona.id) || selectedPersona.group === 'Executive';
        
        // Get the specific POV content based on the tier
        const povContent = isExecutive ? driverDetail.executivePov : driverDetail.operationalPov;
        const personaList = isExecutive ? driverDetail.personas?.executive : driverDetail.personas?.operational;

        // Try to find a specific match for the role (e.g. "CFO") in the driver data, otherwise default to the first one available
        // This makes the "Aspiration" and "Nightmare" highly specific
        const matchedPersona = personaList?.find(p => 
            p.role?.toLowerCase().includes(selectedPersona.name.split(' ')[0].toLowerCase()) || 
            selectedPersona.name.toLowerCase().includes(p.role?.toLowerCase() || '')
        ) || personaList?.[0];

        // Build the narrative
        // We use the "Create Value" title and "Capture Value" questions to build a dynamic summary
        const summary = `${povContent.createValue.title}: ${povContent.createValue.focus}. ${matchedPersona ? `For a ${selectedPersona.name}, this specifically addresses the nightmare of "${matchedPersona.nightmare}" and aligns with the aspiration of "${matchedPersona.aspiration}".` : ''}`;

        return {
          driverId: driver.id,
          score: Math.floor(Math.random() * 20) + 80, // Mock score 80-100
          summary: summary,
          // We pull the "Proof Points" from the Deliver phase as recommendations/evidence
          recommendations: povContent.deliverValue.proofPoints || [
            "Automate manual workflows",
            "Centralize data management",
            "Improve reporting cadence"
          ]
        };
      });

      setResults(newResults);
      setLoading(false);
    };

    generateResults();
  }, [selectedDrivers, selectedIndustry, selectedPersona]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-fade-in p-6">
        <div className="w-16 h-16 border-4 border-blackline-yellow border-t-transparent rounded-full animate-spin mb-8"></div>
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">
          Analyzing {selectedDrivers.length} Strategic Drivers...
        </h2>
        <div className="flex flex-col gap-2 text-zinc-400 text-center">
          <p>Aligning with {selectedPersona.name} priorities...</p>
          <p>Benchmarking against {selectedIndustry} standards...</p>
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
           <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
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
              <Download size={18} /> Export PDF
           </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-12">
        {results.map((result, index) => {
          // Look up the full detail again to get icons/images
          const driverInfo = SKO_DATA.find(d => d.id === result.driverId);
          if (!driverInfo) return null;

          // Determine Persona data for display
          const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona.id) || selectedPersona.group === 'Executive';
          const personaList = isExecutive ? driverInfo.personas?.executive : driverInfo.personas?.operational;
          const matchedPersona = personaList?.find(p => 
            p.role?.toLowerCase().includes(selectedPersona.name.split(' ')[0].toLowerCase()) || 
            selectedPersona.name.toLowerCase().includes(p.role?.toLowerCase() || '')
          ) || personaList?.[0];

          return (
            <div key={result.driverId} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
              
              {/* Card Header */}
              <div className="bg-zinc-950 p-8 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 shadow-inner">
                       <span className="text-blackline-yellow font-black text-2xl">{index + 1}</span>
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
                    <div className="text-4xl font-black text-green-400 tracking-tighter mb-1">
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
                       <p className="text-xl text-zinc-200 leading-relaxed font-light">
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
                             <div className="mt-1 w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-blackline-yellow transition-colors shrink-0"></div>
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
