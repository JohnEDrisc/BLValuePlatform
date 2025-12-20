
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
  Cpu
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

  // Find the selected driver configuration if applicable
  const selectedDriverConfig = VALUE_DRIVERS_SELECTION.find(d => d.value === query);

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

  // Helper to get icon for specific driver config
  const getSelectedDriverIcon = () => {
    if (!selectedDriverConfig) return <Target size={20} />;
    const matchedEnum = drivers.find(d => d === selectedDriverConfig.value);
    return matchedEnum ? getDriverIcon(matchedEnum) : <Target size={20} />;
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
    <div className="w-full max-w-[1400px] mx-auto space-y-24 animate-fade-in pb-32 px-6 md:px-12 print-container text-lg">
      
      {/* Header & Navigation */}
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
          
          {/* AUDIO BUTTON */}
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

          {/* EXPORT DROPDOWN */}
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

          {/* BACK BUTTON */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-4 bg-white text-black rounded-xl hover:bg-blackline-yellow hover:text-black transition-all shadow-md font-bold uppercase text-xs tracking-wider"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">{t.new_analysis}</span>
            <span className="sm:hidden">{t.new_btn_mobile}</span>
          </button>
          
          {/* Discovery Tooltip for Navigation */}
          {showNavTooltip && (
            <div className="absolute top-full right-0 mt-4 w-80 p-5 bg-blackline-yellow text-black text-sm rounded-xl shadow-2xl animate-bounce-slow z-50">
              <div className="absolute -top-2 right-10 w-4 h-4 bg-blackline-yellow transform rotate-45"></div>
              <div className="flex gap-4">
                <div className="bg-black/10 p-2 rounded-full h-fit mt-0.5">
                  <ArrowLeft size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-bold mb-1 text-base">{t.nav_help_title}</p>
                  <p className="leading-snug opacity-90 font-medium">{t.nav_help_text}</p>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNavTooltip(false); }}
                className="absolute top-2 right-2 p-1 text-black/50 hover:text-black"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- PERSONA LENS SECTION --- */}
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

      {/* 1. Strategic Value Matrix */}
      {!isValueDriverAnalysis && (
        <div className="space-y-8 scroll-mt-24" id="value-matrix">
          <h3 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-4">
            <div className="w-12 h-1.5 bg-blackline-yellow"></div> {t.strategic_drivers}
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
                    <span className="text-[10px] uppercase font-black block mb-1 text-zinc-400 group-hover:text-blackline-yellow transition-colors text-left tracking-widest">{t.projected_impact}</span>
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
      {/* Rest omitted for brevity, same as previous logic but with updated enum items */}
    </div>
  );
};
