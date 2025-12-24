
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
  HelpCircle,
  Briefcase,
  AlertCircle,
  Zap,
  DollarSign,
  Lock,
  GitMerge,
  FileText,
  Users,
  Lightbulb,
  Activity,
  Search,
  TrendingUp,
  Server,
  BookOpen,
  Target,
  Download,
  ClipboardList,
  AlertTriangle,
  Trophy,
  Moon,
  Volume2,
  StopCircle,
  Loader2,
  Brain,
  Cpu,
  ArrowUpRight,
  MessageCircle,
  Link
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

  useEffect(() => {
    const timer = setTimeout(() => setShowNavTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (audioSource) audioSource.stop();
      if (audioContext) audioContext.close();
    };
  }, [audioSource, audioContext]);

  const drivers = Object.values(ValueDriver);
  const isValueDriverAnalysis = VALUE_DRIVERS_SELECTION.some(d => d.value === query);
  const isPersonaSearch = PERSONAS.some(p => 
    query.toLowerCase().includes(p.name.toLowerCase()) || 
    query.toLowerCase().includes(p.id.toLowerCase())
  );

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
    const script = `Executive briefing for ${query}. ${data.cfoPunchline ? `Key Takeaway: ${data.cfoPunchline}` : ''} ${data.talkTrack}`.trim();
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

  // Safe Accessors for Arrays
  const valueChain = Array.isArray(data.valueChain) ? data.valueChain : [];
  const objectionHandling = Array.isArray(data.objectionHandling) ? data.objectionHandling : [];
  const discoveryQuestions = Array.isArray(data.discoveryQuestions) ? data.discoveryQuestions : [];
  const businessScenarios = Array.isArray(data.businessScenarios) ? data.businessScenarios : [];
  const references = Array.isArray(data.references) ? data.references : [];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-24 animate-fade-in pb-32 px-6 md:px-12 print-container text-lg">
      
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative border-b border-zinc-800 pb-10 gap-8 no-print">
        <div className="flex flex-col gap-6 max-w-full md:max-w-[70%]">
           <div className="flex items-center gap-3 text-zinc-400">
             <Search size={20} className="text-blackline-yellow" />
             <span className="text-sm font-black uppercase tracking-widest">{t.selected_scope}</span>
           </div>
           
           <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl px-8 py-6 inline-block backdrop-blur-sm shadow-sm">
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter break-words leading-[1.1] uppercase italic">
               {query}
             </h2>
           </div>
        </div>

        <div className="relative group shrink-0 self-start md:self-center mt-6 md:mt-0 flex flex-wrap gap-4">
          <button 
            onClick={handlePlayAudio}
            disabled={isGeneratingAudio}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl border transition-all shadow-md font-black uppercase text-xs tracking-widest min-w-[160px] justify-center
              ${isPlayingAudio 
                ? 'bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30' 
                : 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 hover:border-blackline-yellow'
              }`}
          >
            {isGeneratingAudio ? <><Loader2 size={18} className="animate-spin" /><span>Generating...</span></> : isPlayingAudio ? <><StopCircle size={18} /><span>Stop</span></> : <><Volume2 size={18} className="text-blackline-yellow" /><span>Listen</span></>}
          </button>

          <div className="relative">
            <button onClick={() => setShowExportMenu(!showExportMenu)} className="flex items-center gap-2 px-6 py-4 bg-zinc-800 text-white border border-zinc-700 rounded-xl hover:bg-zinc-700 transition-all shadow-md font-black uppercase text-xs tracking-widest"><Download size={18} /><span className="hidden sm:inline">{t.calc_export || "Export"}</span></button>
            {showExportMenu && (
               <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl z-50 animate-fade-in py-2">
                  <button onClick={() => { exportToWord(`BlackLine Analysis - ${query}`, generateAnalysisHtml(query, data)); setShowExportMenu(false); }} className="w-full text-left px-6 py-4 hover:bg-zinc-800 text-gray-200 hover:text-white text-sm font-bold uppercase tracking-wider">{t.export_word || "Download Word"}</button>
               </div>
            )}
             {showExportMenu && <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)}></div>}
          </div>

          <button onClick={onBack} className="flex items-center gap-2 px-6 py-4 bg-white text-black rounded-xl hover:bg-blackline-yellow hover:text-black transition-all shadow-md font-black uppercase text-xs tracking-widest"><RotateCcw size={18} /><span className="hidden sm:inline">{t.new_analysis}</span><span className="sm:hidden">{t.new_btn_mobile}</span></button>
          
          {showNavTooltip && (
            <div className="absolute top-full right-0 mt-4 w-80 p-5 bg-blackline-yellow text-black rounded-xl shadow-2xl animate-bounce-slow z-50">
              <div className="absolute -top-2 right-10 w-4 h-4 bg-blackline-yellow transform rotate-45"></div>
              <div className="flex gap-4">
                <div className="bg-black/10 p-2 rounded-full h-fit mt-0.5"><ArrowLeft size={18} className="text-black" /></div>
                <div><p className="font-black mb-1 text-base uppercase italic tracking-tighter">Navigation Tip</p><p className="leading-snug font-bold text-sm opacity-90">Use the Rail tools to chat with AI or pivot context.</p></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- PERSONA LENS SECTION --- */}
      {data.personaAnalysis && isPersonaSearch && (
        <div className="bg-zinc-900 border border-purple-500/30 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-2xl mb-16 scroll-mt-24">
          <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-400 text-xs font-black uppercase tracking-widest mb-10">
                <Users size={14} /> Persona Alignment
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter uppercase italic">
                {data.personaAnalysis.role} <span className="text-purple-400">Deep Dive</span>
             </h2>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                   <div className="bg-black/40 rounded-3xl p-8 border border-red-900/30">
                      <h4 className="text-red-400 font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3"><AlertTriangle size={18} /> Top Concerns & Risks</h4>
                      <ul className="space-y-4">
                         {Array.isArray(data.personaAnalysis.topConcerns) && data.personaAnalysis.topConcerns.map((c, i) => (
                           <li key={i} className="flex gap-4 text-zinc-100 font-bold text-xl"><span className="text-red-500">•</span>{c}</li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-black/40 rounded-3xl p-8 border border-indigo-900/30">
                      <h4 className="text-indigo-400 font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3"><Moon size={18} /> Stakeholder Nightmare</h4>
                      <p className="text-2xl text-zinc-100 font-black italic leading-relaxed">"{data.personaAnalysis.keepsThemUpAtNight}"</p>
                   </div>
                </div>
                <div className="space-y-8">
                   <div className="bg-black/40 rounded-3xl p-8 border border-green-900/30">
                      <h4 className="text-green-500 font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3"><Trophy size={18} /> Personal Wins</h4>
                      <ul className="space-y-4">
                         {Array.isArray(data.personaAnalysis.personalWins) && data.personaAnalysis.personalWins.map((w, i) => (
                           <li key={i} className="flex gap-4 text-zinc-100 font-bold text-xl"><CheckCircle2 size={24} className="text-green-500 shrink-0 mt-1" />{w}</li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-black/40 rounded-3xl p-8 border border-zinc-700">
                      <h4 className="text-gray-300 font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3"><Target size={18} /> Business Objectives</h4>
                      <ul className="space-y-4">
                         {Array.isArray(data.personaAnalysis.businessProblems) && data.personaAnalysis.businessProblems.map((p, i) => (
                           <li key={i} className="flex gap-4 text-zinc-100 font-bold text-xl"><span className="w-2 h-2 rounded-full bg-zinc-600 mt-3 shrink-0"></span>{p}</li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* 1. POWER MESSAGES / PUNCHLINES */}
      <div className="space-y-8 scroll-mt-24">
         <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
            <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> Executive Power Messages
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 border-l-8 border-l-blue-600 border border-zinc-800 p-8 rounded-3xl shadow-xl group hover:bg-zinc-800 transition-all">
               <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">CFO Narrative</h4>
               <p className="text-2xl font-black text-white italic tracking-tighter leading-tight">"{data.cfoPunchline}"</p>
            </div>
            <div className="bg-zinc-900 border-l-8 border-l-green-600 border border-zinc-800 p-8 rounded-3xl shadow-xl group hover:bg-zinc-800 transition-all">
               <h4 className="text-xs font-black text-green-400 uppercase tracking-widest mb-4">CAO Narrative</h4>
               <p className="text-2xl font-black text-white italic tracking-tighter leading-tight">"{data.caoPunchline || "Verifiable financial integrity across all global operations."}"</p>
            </div>
            <div className="bg-zinc-900 border-l-8 border-l-purple-600 border border-zinc-800 p-8 rounded-3xl shadow-xl group hover:bg-zinc-800 transition-all">
               <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">CIO Narrative</h4>
               <p className="text-2xl font-black text-white italic tracking-tighter leading-tight">"{data.cioPunchline}"</p>
            </div>
         </div>
      </div>

      {/* 2. STRATEGIC VALUE MATRIX (DRIVERS) */}
      {!isValueDriverAnalysis && (
        <div className="space-y-8 scroll-mt-24" id="value-matrix">
          <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
            <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> {t.strategic_drivers}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {drivers.map((driver) => {
              const impact = data.valueDriverImpacts?.[driver] || { message: "Standard platform benefit.", metric: "N/A", relevance: "Low" };
              return (
                <div key={driver} className="relative p-8 rounded-3xl flex flex-col h-full transition-all duration-300 group bg-zinc-900 border border-zinc-800 hover:border-blackline-yellow/50 hover:shadow-2xl">
                  <div className="flex items-start min-h-[3.5rem] gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-black text-blackline-yellow border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-colors shrink-0">
                      {getDriverIcon(driver)}
                    </div>
                    <h4 className="text-xs font-black uppercase leading-tight text-zinc-100 group-hover:text-blackline-yellow transition-colors pt-1 tracking-widest italic">{driver}</h4>
                  </div>
                  <div className="flex-grow"><p className="text-lg leading-relaxed mb-8 text-zinc-200 font-bold italic">"{impact.message}"</p></div>
                  <div className="pt-6 mt-auto border-t border-zinc-800">
                    <span className="text-[10px] uppercase font-black block mb-2 text-zinc-500 tracking-[0.2em]">{t.projected_impact}</span>
                    <span className="text-3xl font-black text-white block leading-tight italic tracking-tighter text-green-400">{impact.metric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. THE VALUE CHAIN LADDER */}
      {valueChain.length > 0 && (
        <div className="space-y-8 scroll-mt-24">
           <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
              <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> Feature-Benefit-Value Ladder
           </h3>
           <div className="overflow-hidden border border-zinc-800 rounded-[2.5rem] bg-zinc-900/50">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-black text-zinc-500 text-xs font-black uppercase tracking-widest border-b border-zinc-800">
                       <th className="p-8">Platform Capability (Feature)</th>
                       <th className="p-8 border-l border-zinc-800">Operational Outcome (Benefit)</th>
                       <th className="p-8 border-l border-zinc-800">Strategic Impact (Value)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-zinc-800">
                    {valueChain.map((item, i) => (
                       <tr key={i} className="hover:bg-zinc-800/50 transition-colors group">
                          <td className="p-8 text-xl font-bold text-white uppercase tracking-tighter italic">
                             <div className="flex items-center gap-4"><Cpu size={24} className="text-blackline-yellow shrink-0" /> {item.feature}</div>
                          </td>
                          <td className="p-8 border-l border-zinc-800 text-lg text-zinc-200 font-medium">
                             <div className="flex items-start gap-4"><Zap size={24} className="text-blue-500 shrink-0" /> {item.benefit}</div>
                          </td>
                          <td className="p-8 border-l border-zinc-800 text-2xl font-black text-green-400 italic tracking-tighter uppercase leading-none">
                             <div className="flex items-center gap-4"><TrendingUp size={28} className="shrink-0" /> {item.value}</div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* 4. OBJECTION HANDLING */}
      {objectionHandling.length > 0 && (
        <div className="space-y-8 scroll-mt-24">
           <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
              <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> Objection Defense Strategies
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {objectionHandling.map((obj, i) => (
                 <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 flex flex-col gap-8 group hover:border-red-500/30 transition-all shadow-xl">
                    <div className="space-y-4">
                       <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest"><AlertCircle size={14}/> Client Objection</span>
                       <p className="text-2xl font-black text-white italic tracking-tighter leading-tight">"{obj.objection}"</p>
                    </div>
                    <div className="h-px bg-zinc-800 w-full"></div>
                    <div className="space-y-4">
                       <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[10px] font-black uppercase tracking-widest"><ShieldCheck size={14}/> Strategic Rebuttal</span>
                       <p className="text-xl text-zinc-100 font-bold leading-relaxed">{obj.rebuttal}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* 5. DISCOVERY QUESTIONS */}
      {discoveryQuestions.length > 0 && (
        <div className="space-y-8 scroll-mt-24">
           <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
              <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> High-Gain Discovery Questions
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {discoveryQuestions.map((q, i) => (
                 <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 flex items-center gap-6 group hover:bg-zinc-800 transition-all border-l-8 border-l-blackline-yellow/50">
                    <div className="p-4 bg-black rounded-2xl text-blackline-yellow shrink-0"><MessageSquare size={24} /></div>
                    <p className="text-2xl text-white font-black italic tracking-tighter leading-tight">"{q}"</p>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* 6. BUSINESS SCENARIOS */}
      {businessScenarios.length > 0 && (
        <div className="space-y-8 scroll-mt-24">
           <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-6 italic">
              <div className="h-1.5 w-16 bg-blackline-yellow shrink-0"></div> Business Problem Scenarios
           </h3>
           <div className="space-y-6">
              {businessScenarios.map((s, i) => (
                 <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-10 md:p-14 flex flex-col md:flex-row gap-12 group hover:border-blackline-yellow/20 transition-all">
                    <div className="w-full md:w-1/3 space-y-4">
                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block">The Scenario</span>
                       <h4 className="text-3xl font-black text-white italic tracking-tighter leading-none uppercase">{s.scenario.split(":")[0]}</h4>
                       <p className="text-zinc-400 font-medium leading-relaxed">{s.scenario.split(":").slice(1).join(":") || s.scenario}</p>
                    </div>
                    <div className="hidden md:block w-px bg-zinc-800 h-auto"></div>
                    <div className="w-full md:w-2/3 space-y-6">
                       <span className="text-[10px] font-black text-blackline-yellow uppercase tracking-widest block">Strategic Solution Mapping</span>
                       <p className="text-2xl text-white font-bold leading-relaxed">{s.solution}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* 7. TALK TRACK & REFERENCES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-zinc-800">
         <div className="space-y-6">
            <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3"><MessageCircle size={18} className="text-blackline-yellow"/> Suggested Talk Track</h4>
            <div className="bg-black/40 border border-zinc-800 rounded-3xl p-10 relative group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10"><Volume2 size={80}/></div>
               <p className="text-xl text-zinc-100 font-medium leading-relaxed italic">"{data.talkTrack}"</p>
            </div>
         </div>
         <div className="space-y-6">
            <h4 className="text-sm font-black text-zinc-500 uppercase tracking-widest flex items-center gap-3"><Link size={18} className="text-blue-400"/> Research & Citations</h4>
            <div className="space-y-3">
               {references.length > 0 ? references.map((r, i) => (
                  <div key={i} className="flex gap-4 items-center text-sm text-zinc-500 font-bold group cursor-pointer hover:text-zinc-300">
                     <span className="px-2 py-0.5 bg-zinc-900 rounded text-[10px] text-zinc-600">[{i+1}]</span>
                     <span className="truncate">{r}</span>
                     <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                  </div>
               )) : (
                 <p className="text-sm text-zinc-600 italic">No citations found for this analysis.</p>
               )}
            </div>
         </div>
      </div>

    </div>
  );
};
