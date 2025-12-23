import React, { useState, useEffect } from 'react';
import { AnalysisResult, ValueDriver, UIStrings } from '../types';
import { VALUE_DRIVERS_SELECTION, PERSONAS } from '../constants';
import { generateAudioOverview } from '../services/geminiService';
import { 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  ArrowLeft,
  RotateCcw,
  X,
  Zap,
  DollarSign,
  Lock,
  GitMerge,
  FileText,
  Users,
  Lightbulb,
  Activity,
  Search,
  Target,
  Download,
  AlertTriangle,
  Trophy,
  Moon,
  Volume2,
  StopCircle,
  Loader2,
  Brain,
  Quote,
  ListChecks,
  Briefcase
} from 'lucide-react';
import { exportToWord, generateAnalysisHtml } from '../services/exportService';

interface AnalysisResultsProps {
  data: AnalysisResult;
  query: string;
  onBack: () => void;
  onNavigateToCalculator: () => void;
  t: UIStrings;
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

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, query, onBack, onNavigateToCalculator, t }) => {
  const [showNavTooltip, setShowNavTooltip] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
   
  // Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);

  // Auto-hide nav tooltip after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowNavTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioSource) audioSource.stop();
      if (audioContext) audioContext.close();
    };
  }, [audioSource, audioContext]);

  // Drivers list mapping to the Enum
  const drivers = Object.values(ValueDriver);
   
  // Check if the current query is one of the specific Value Drivers
  const isValueDriverAnalysis = VALUE_DRIVERS_SELECTION.some(d => d.value === query);

  // Determine if this is a specific Persona search
  const isPersonaSearch = PERSONAS.some(p => 
    query.toLowerCase().includes(p.name.toLowerCase()) || 
    query.toLowerCase().includes(p.id.toLowerCase())
  );

  // Icon mapping for value drivers
  const getDriverIcon = (driver: ValueDriver) => {
    switch(driver) {
      case ValueDriver.PROCESS_EFFICIENCY: return <Zap size={20} />;
      case ValueDriver.WORKING_CAPITAL: return <DollarSign size={20} />;
      case ValueDriver.TRUST_PREMIUM: return <Lock size={20} />;
      case ValueDriver.MA_INTEGRATION: return <GitMerge size={20} />;
      case ValueDriver.REGULATORY_COMPLIANCE: return <FileText size={20} />;
      case ValueDriver.TALENT_RETENTION: return <Users size={20} />;
      case ValueDriver.FACILITATING_INNOVATION: return <Lightbulb size={20} />;
      case ValueDriver.REAL_TIME_DECISION_MAKING: return <Activity size={20} />;
      case ValueDriver.SCALING_TRUSTWORTHY_AI: return <Brain size={20} />;
      default: return <Zap size={20} />;
    }
  };

  const handlePlayAudio = async () => {
    if (isPlayingAudio) {
      if (audioSource) audioSource.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsGeneratingAudio(true);

    const script = `
      Executive briefing for ${query}.
      ${data.cfoPunchline ? `Key Takeaway: ${data.cfoPunchline}` : ''}
      ${data.talkTrack}
    `.trim();

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

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-16 animate-fade-in pb-32 px-6 md:px-12 print-container text-lg">
       
      {/* ---------------- HEADER & NAV ---------------- */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative border-b border-zinc-800 pb-10 gap-8 no-print">
        <div className="flex flex-col gap-6 max-w-full md:max-w-[70%]">
           <div className="flex items-center gap-3 text-zinc-400">
             <Search size={20} className="text-blackline-yellow" />
             <span className="text-sm font-bold uppercase tracking-widest">{t.selected_scope}</span>
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
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 size={18} className={isGeneratingAudio ? "" : "text-blackline-yellow"} />
                <span>Listen</span>
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
            <RotateCcw size={18} />
            <span className="hidden sm:inline">{t.new_analysis}</span>
            <span className="sm:hidden">{t.new_btn_mobile}</span>
          </button>
        </div>
      </div>

      {/* ---------------- 1. EXECUTIVE NARRATIVE (ELEVATOR PITCH) ---------------- */}
      {!isValueDriverAnalysis && (data.talkTrack || data.cfoPunchline) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blackline-yellow rounded-lg text-black">
                        <MessageSquare size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Executive Talk Track</h3>
                </div>
                <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
                    "{data.talkTrack}"
                </p>
            </div>

            <div className="lg:col-span-1 bg-blackline-yellow text-black border border-yellow-500 rounded-3xl p-8 shadow-xl flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 opacity-75">
                    <Quote size={24} />
                    <h3 className="text-sm font-black uppercase tracking-widest">The "Punchline"</h3>
                </div>
                <p className="text-2xl md:text-3xl font-black leading-tight">
                    "{data.cfoPunchline || data.cioPunchline}"
                </p>
            </div>
        </div>
      )}

      {/* ---------------- 2. PERSONA LENS (IF APPLICABLE) ---------------- */}
      {data.personaAnalysis && isPersonaSearch && (
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-purple-500/30 rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-2xl scroll-mt-24" id="persona-lens">
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

      {/* ---------------- 3. STRATEGIC VALUE MATRIX (The Cards) ---------------- */}
      {!isValueDriverAnalysis && (
        <div className="space-y-8 scroll-mt-24" id="value-matrix">
          <h3 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-4">
            <div className="w-12 h-1.5 bg-blackline-yellow"></div> {t.strategic_drivers}
          </h3>
           
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
            {drivers.map((driver) => {
              // Graceful Fallback Logic
              const impact = data.valueDriverImpacts?.[driver] || { 
                message: "Standard platform benefit.", 
                metric: "N/A", 
                relevance: "Low" 
              };
              
              return (
                <div 
                  key={driver} 
                  className="relative p-6 rounded-2xl flex flex-col h-full transition-all duration-300 group bg-zinc-900 border border-zinc-800 hover:border-blackline-yellow/50 hover:shadow-2xl hover:shadow-blackline-yellow/5"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                    <div className="p-2 rounded-lg bg-black text-blackline-yellow border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-colors shrink-0">
                      {getDriverIcon(driver)}
                    </div>
                    <h4 className="text-xs font-black uppercase leading-tight text-gray-100 group-hover:text-blackline-yellow transition-colors pt-1">
                      {driver.replace(/_/g, ' ')}
                    </h4>
                  </div>

                  <div className="flex-grow space-y-6">
                    {/* Power Message */}
                    <div>
                      <h5 className="text-[10px] uppercase font-bold text-blackline-yellow mb-2 flex items-center gap-2">
                         <Zap size={12} /> Power Message
                      </h5>
                      <p className="text-sm leading-relaxed text-gray-200 font-medium">
                        {impact.powerMessage || impact.message}
                      </p>
                    </div>

                    {/* Objection Handling */}
                    {impact.objectionHandling && (
                      <div className="pl-3 border-l-2 border-zinc-700 py-1">
                        <h5 className="text-[10px] uppercase font-bold text-red-400 mb-1 flex items-center gap-2">
                           <ShieldCheck size={12} /> Rebuttal
                        </h5>
                        <p className="text-xs leading-relaxed text-gray-400 italic">
                          "{impact.objectionHandling}"
                        </p>
                      </div>
                    )}

                    {/* Competitor Diff */}
                    {impact.competitorDiff && (
                      <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800">
                        <h5 className="text-[9px] uppercase font-bold text-blue-400 mb-1">
                           Competitive Edge
                        </h5>
                        <p className="text-[11px] text-gray-500">
                          {impact.competitorDiff}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------- 4. DISCOVERY & QUALIFICATION (New!) ---------------- */}
      {data.discoveryQuestions && data.discoveryQuestions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                        <ListChecks size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Discovery Questions</h3>
                  </div>
                  <ul className="space-y-4">
                      {data.discoveryQuestions.map((q, idx) => (
                          <li key={idx} className="flex gap-4 p-4 bg-black/40 rounded-xl border border-zinc-800/50">
                              <span className="text-blue-500 font-bold">{idx + 1}.</span>
                              <span className="text-gray-200 font-medium">{q}</span>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* ---------------- 5. BUSINESS SCENARIOS (New!) ---------------- */}
              {data.businessScenarios && data.businessScenarios.length > 0 && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-wider">Business Scenarios</h3>
                    </div>
                    <div className="space-y-4">
                        {data.businessScenarios.slice(0, 3).map((scenario, idx) => (
                            <div key={idx} className="p-5 bg-black/40 rounded-xl border border-zinc-800/50">
                                <h5 className="text-xs font-bold text-red-400 uppercase mb-2">The Problem</h5>
                                <p className="text-sm text-gray-300 mb-3">{scenario.scenario}</p>
                                <div className="h-px bg-zinc-800 w-full mb-3"></div>
                                <h5 className="text-xs font-bold text-green-400 uppercase mb-2">The Solution</h5>
                                <p className="text-sm text-gray-100 font-medium">{scenario.solution}</p>
                            </div>
                        ))}
                    </div>
                </div>
              )}
          </div>
      )}

      {/* ---------------- 6. VALUE CHAIN (CAPABILITIES) (New!) ---------------- */}
      {data.valueChain && data.valueChain.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 overflow-hidden">
             <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                    <GitMerge size={20} />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">Capabilities to Value Map</h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-700">
                            <th className="py-4 px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Feature / Capability</th>
                            <th className="py-4 px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Business Benefit</th>
                            <th className="py-4 px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">Financial Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {data.valueChain.map((item, idx) => (
                            <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="py-4 px-4 text-white font-bold">{item.feature}</td>
                                <td className="py-4 px-4 text-gray-300">{item.benefit}</td>
                                <td className="py-4 px-4 text-blackline-yellow font-mono text-sm">{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}

    </div>
  );
};
