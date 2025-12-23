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
  Calculator,
  ArrowLeft,
  Zap,
  DollarSign,
  Lock,
  GitMerge,
  Users,
  Lightbulb,
  Activity,
  Brain,
  Search,
  Loader2,
  StopCircle,
  Volume2,
  Moon,
  Trophy
} from 'lucide-react';
import { AnalysisResult, ValueDriverSelection, UIStrings, Persona, ValueDriver } from '../types';
import { SKO_DATA, VALUE_DRIVERS_SELECTION, PERSONAS } from '../constants'; 
import { generateAudioOverview } from '../services/geminiService';
import { exportToWord, generateAnalysisHtml } from '../services/exportService';

// Combined Props Interface
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

// Audio Decoding Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  selectedDrivers = [],
  selectedIndustry = "Unknown",
  selectedPersona = null,
  data = null,
  query = "",
  onNavigateToCalculator,
  t,
  onBack
}) => {
  
  // 1. DETERMINE MODE
  const isLegacyMode = !!data; 

  // --- STATE FOR HUB MODE ---
  const [hubResults, setHubResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(true);

  // --- AUDIO STATE ---
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Icon mapping for value drivers
  const getDriverIcon = (driver: string) => {
    switch(driver) {
      case 'Process Efficiency': return <Zap size={20} />;
      case 'Working Capital Optimization': return <DollarSign size={20} />;
      case 'Trust Premium': return <Lock size={20} />;
      case 'M&A Integration Velocity': return <GitMerge size={20} />;
      case 'Regulatory Compliance': return <FileText size={20} />;
      case 'Talent Retention': return <Users size={20} />;
      case 'Facilitating Innovation': return <Lightbulb size={20} />;
      case 'Real-Time Decision Making': return <Activity size={20} />;
      case 'Scaling Trustworthy AI': return <Brain size={20} />;
      default: return <Zap size={20} />;
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioSource) audioSource.stop();
      if (audioContext) audioContext.close();
    };
  }, [audioSource, audioContext]);

  // 2. EFFECT: Generate Hub Results (Only runs if NOT in Legacy Mode)
  useEffect(() => {
    if (isLegacyMode) {
      setLoading(false); 
      return; 
    }

    const generateHubResults = async () => {
      setLoading(true);
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

        const pGroup = selectedPersona?.group || 'Executive';
        const isExecutive = ['cfo', 'cao', 'vp_finance', 'cio'].includes(selectedPersona?.id || '') || pGroup === 'Executive';
        const povContent = isExecutive ? driverDetail.executivePov : driverDetail.operationalPov;
        const personaList = isExecutive ? driverDetail.personas?.executive : driverDetail.personas?.operational;
        
        const matchedPersona = personaList?.find(p => 
            (p.role && selectedPersona?.name.toLowerCase().includes(p.role.toLowerCase()))
        ) || personaList?.[0];

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

  const handlePlayAudio = async () => {
    if (isPlayingAudio) {
      if (audioSource) audioSource.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsGeneratingAudio(true);

    let script = "";
    if (isLegacyMode && data) {
       script = `Executive briefing for ${query}. ${data.summary || ''} ${data.talkTrack || ''}`.trim();
    } else {
       script = `Executive briefing for ${selectedPersona?.name}. Focusing on ${selectedDrivers.map(d => d.value).join(', ')}.`.trim();
    }

    const base64Audio = await generateAudioOverview(script);
    setIsGeneratingAudio(false);

    if (base64Audio) {
      setIsPlayingAudio(true);
      try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
          setAudioContext(ctx);
          
          const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);
          source.onended = () => setIsPlayingAudio(false);
          source.start();
          setAudioSource(source);
      } catch (e) {
          console.error("Playback error", e);
          setIsPlayingAudio(false);
      }
    }
  };

  // --- VIEW: LEGACY SEARCH RESULTS ---
  if (isLegacyMode && data) {
    const isPersonaSearch = PERSONAS.some(p => 
        query.toLowerCase().includes(p.name.toLowerCase()) || 
        query.toLowerCase().includes(p.id.toLowerCase())
    );

    const isValueDriverAnalysis = VALUE_DRIVERS_SELECTION.some(d => d.value === query);
    const drivers = Object.values(ValueDriver);

    return (
      <div className="w-full max-w-[1400px] mx-auto space-y-24 animate-fade-in pb-32 px-6 md:px-12 print-container text-lg">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative border-b border-zinc-800 pb-10 gap-8 no-print">
            <div className="flex flex-col gap-6 max-w-full md:max-w-[70%]">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Search size={20} className="text-blackline-yellow" />
                  <span className="text-sm font-bold uppercase tracking-widest">{t.selected_scope || "Selected Scope"}</span>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl px-8 py-6 inline-block backdrop-blur-sm shadow-sm">
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight break-words leading-[1.1]">
                    {query}
                  </h2>
                </div>
            </div>

            <div className="relative group shrink-0 self-start md:self-center mt-6 md:mt-0 flex flex-wrap gap-4">
              <button 
                onClick={handlePlayAudio}
                disabled={isGeneratingAudio}
                className={`flex items-center gap-2 px-6 py-4 rounded-xl border transition-all shadow-md font-bold uppercase text-xs tracking-wider min-w-[160px] justify-center
                  ${isPlayingAudio 
                    ? 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30' 
                    : 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-blackline-yellow'
                  }`}
              >
                {isGeneratingAudio ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : isPlayingAudio ? (
                  <>
                    <StopCircle size={18} />
                    <span>Stop Audio</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={18} className={isGeneratingAudio ? "" : "text-blackline-yellow"} />
                    <span>Listen to Brief</span>
                  </>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-6 py-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl hover:bg-zinc-700 transition-all shadow-md font-bold uppercase text-xs tracking-wider"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">{t.calc_export || "Export"}</span>
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 animate-fade-in">
                    <div className="flex flex-col py-2">
                      <button onClick={() => { exportToWord(`BlackLine Analysis - ${query}`, generateAnalysisHtml(query, data)); setShowExportMenu(false); }} className="text-left px-6 py-4 hover:bg-zinc-800 text-gray-200 hover:text-white text-sm font-medium">{t.export_word || "Download Word"}</button>
                    </div>
                  </div>
                )}
                 {showExportMenu && <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)}></div>}
              </div>

              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-4 bg-white text-black rounded-xl hover:bg-blackline-yellow hover:text-black transition-all shadow-md font-bold uppercase text-xs tracking-wider"
              >
                <ArrowLeft size={18} />
                <span className="hidden sm:inline">New Analysis</span>
              </button>
            </div>
        </div>

        {data.personaAnalysis && isPersonaSearch && (
            <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-purple-500/30 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl mb-16 scroll-mt-24" id="persona-lens">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <Users size={14} /> Persona Deep Dive
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">
                    {data.personaAnalysis.role} <span className="text-purple-400">Analysis</span>
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="bg-black/40 rounded-2xl p-8 border border-red-900/30">
                          <h4 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                              <AlertTriangle size={18} /> Top Concerns & Risks
                          </h4>
                          <ul className="space-y-4">
                              {data.personaAnalysis.topConcerns.map((concern, i) => (
                                <li key={i} className="flex gap-3 text-gray-200">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span className="text-lg font-medium">{concern}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-8 border border-indigo-900/30">
                          <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                              <Moon size={18} /> What Keeps Them Up At Night?
                          </h4>
                          <p className="text-xl text-gray-200 font-medium italic leading-relaxed">
                              "{data.personaAnalysis.keepsThemUpAtNight}"
                          </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-black/40 rounded-2xl p-8 border border-green-900/30">
                          <h4 className="text-green-500 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                              <Trophy size={18} /> Personal Wins & Motivations
                          </h4>
                          <ul className="space-y-4">
                              {data.personaAnalysis.personalWins.map((win, i) => (
                                <li key={i} className="flex gap-3 text-gray-200">
                                  <CheckCircle2 size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                                  <span className="text-lg font-medium">{win}</span>
                                </li>
                              ))}
                          </ul>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-8 border border-zinc-700">
                          <h4 className="text-gray-300 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                              <Target size={18} /> Real Business Problems Solving
                          </h4>
                          <ul className="space-y-4">
                              {data.personaAnalysis.businessProblems.map((prob, i) => (
                                <li key={i} className="flex gap-3 text-gray-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5 flex-shrink-0"></span>
                                  <span className="text-lg font-medium">{prob}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        )}

        {!isValueDriverAnalysis && (
            <div className="space-y-8 scroll-mt-24" id="value-matrix">
              <h3 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-4">
                <div className="w-12 h-1.5 bg-blackline-yellow"></div> {t.strategic_drivers || "Strategic Value Matrix"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
                {drivers.map((driver) => {
                  const impact = data.valueDriverImpacts?.[driver] || { message: "Standard platform benefit.", metric: "N/A", relevance: "Low" };
                  
                  return (
                    <div 
                      key={driver} 
                      className="relative p-6 rounded-2xl flex flex-col h-full transition-all duration-300 group bg-zinc-900 border border-zinc-800 hover:border-blackline-yellow/50 hover:shadow-2xl hover:shadow-blackline-yellow/5 print-break-inside hover:-translate-y-1"
                    >
                      <div className="flex items-start min-h-[3rem] gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-black text-blackline-yellow border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-colors shrink-0">
                          {getDriverIcon(driver)}
                        </div>
                        <h4 className="text-[11px] font-black uppercase leading-tight text-gray-100 group-hover:text-blackline-yellow transition-colors pt-1 text-left tracking-tighter italic">
                          {driver}
                        </h4>
                      </div>

                      <div className="flex-grow">
                        <p className="text-[13px] leading-relaxed mb-6 text-gray-300 font-medium text-left italic">
                          "{impact.message}"
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-zinc-800 group-hover:border-zinc-700 transition-colors">
                        <span className="text-[10px] uppercase font-black block mb-1 text-zinc-400 group-hover:text-blackline-yellow transition-colors text-left tracking-widest">{t.projected_impact || "Projected Impact"}</span>
                        <div className="min-h-[4rem]">
                          <span className="text-xl font-black text-white block leading-tight text-left italic tracking-tighter">
                            {impact.metric}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
        )}
      </div>
    );
  }

  // --- VIEW 2: HUB/SKO RESULTS ---
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
           <button 
                onClick={handlePlayAudio}
                disabled={isGeneratingAudio}
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-blackline-yellow text-white rounded-xl font-bold transition-all"
           >
              {isGeneratingAudio ? <Loader2 size={18} className="animate-spin" /> : isPlayingAudio ? <StopCircle size={18} /> : <Volume2 size={18} />}
              <span>{isPlayingAudio ? "Stop" : "Listen"}</span>
           </button>

           <button className="flex items-center gap-2 px-6 py-3 bg-blackline-yellow text-black rounded-xl font-black uppercase tracking-wider hover:scale-105 transition-all shadow-lg">
              <Download size={18} /> Export PDF
           </button>
        </div>
      </div>

      <div className="space-y-12">
        {hubResults.map((result, index) => {
          const driverInfo = SKO_DATA.find(d => d.id === result.driverId);
          if (!driverInfo) return null;

          return (
            <div key={result.driverId} className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
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

              <div className="p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                 <div className="lg:col-span-2 space-y-8">
                    <div>
                       <h4 className="flex items-center gap-3 text-sm font-black text-blue-400 uppercase tracking-widest mb-4">
                          <FileText size={16} /> Contextual Analysis
                       </h4>
                       <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-light">
                          {result.summary}
                       </p>
                    </div>
                 </div>

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
