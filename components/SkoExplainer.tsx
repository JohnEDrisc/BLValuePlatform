import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SKO_DATA as GLOBAL_SKO_DATA } from '../constants'; 
import { UIStrings, SkoDriverDetail } from '../types';
import { 
  ArrowLeft, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Rocket, 
  Play, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  Sparkles, 
  Search, 
  ShieldAlert, 
  Trophy, 
  Coins, 
  Target, 
  HelpCircle, 
  Users, 
  User, 
  Ghost, 
  Stars, 
  Layout, 
  LogOut, 
  Calculator, 
  MessageCircle, 
  AlertTriangle, 
  ChevronDown, 
  Quote, 
  Factory, 
  Flame,
  Wind,
  Anchor,
  Droplets,
  CloudFog,
  Eye,
  Layers,
  Radar,
  Loader2
} from 'lucide-react';
import * as Icons from 'lucide-react';

interface SkoExplainerProps {
  onClose: () => void;
  t: UIStrings;
}

const DRIVER_IMAGES: Record<string, string> = {
  'process': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=1200',
  'working_cap': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
  'trust': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200',
  'ma': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
  'compliance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
  'talent': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  'innovation': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'decision': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'ai_ops': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
};

const ORDERED_IDS = [
  'working_cap', 'process', 'talent', 'ma', 'innovation', 
  'compliance', 'decision', 'trust', 'ai_ops'
];

const SafeIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Zap className={className} />;
  return <IconComponent className={className} />;
};

// --- DRIVER VISUAL COMPONENTS ---

const FunnelVisual = () => (
  <div className="flex flex-col items-center justify-center w-full py-8">
    <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-5xl">
       <div className="flex-1 flex flex-col gap-3 w-full text-center">
          <div className="bg-zinc-800 p-4 rounded-lg text-sm font-bold text-zinc-300">Transaction Volume</div>
          <div className="bg-zinc-800 p-4 rounded-lg text-sm font-bold text-zinc-300">New Entities</div>
          <div className="bg-zinc-800 p-4 rounded-lg text-sm font-bold text-zinc-300">Data Sources</div>
       </div>
       <div className="relative z-10 bg-gradient-to-r from-red-900/50 to-red-600/50 p-8 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center shrink-0 w-full md:w-64 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
          <AlertTriangle className="text-red-500 mb-3 w-10 h-10" />
          <span className="text-xs font-black uppercase text-red-400 tracking-widest mb-1">BOTTLENECK</span>
          <p className="text-lg font-bold text-white leading-tight text-center">Manual Matching</p>
       </div>
       <div className="flex-1 flex flex-col gap-3 w-full text-center opacity-60">
          <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg text-sm font-bold text-zinc-500">Delay</div>
          <div className="bg-zinc-800 border border-zinc-700 p-4 rounded-lg text-sm font-bold text-zinc-500">Risk</div>
       </div>
    </div>
  </div>
);

const GarbageInOutVisual = () => {
  const [mode, setMode] = useState<'dirty' | 'clean'>('dirty');
  
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="flex justify-center gap-6 mb-8">
        <button onClick={() => setMode('dirty')} className={`px-8 py-3 rounded-full font-bold text-base transition-all ${mode === 'dirty' ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>Current State</button>
        <button onClick={() => setMode('clean')} className={`px-8 py-3 rounded-full font-bold text-base transition-all ${mode === 'clean' ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>With BlackLine</button>
      </div>
      
      <div className={`relative p-10 rounded-3xl border transition-all duration-500 w-full ${mode === 'dirty' ? 'bg-red-950/20 border-red-900/50' : 'bg-green-950/20 border-green-900/50'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 text-center">
          <div className="flex-1 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${mode === 'dirty' ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
              <Factory size={40} />
            </div>
            <p className="text-lg font-black uppercase tracking-wider">{mode === 'dirty' ? 'Polluted Data' : 'Clean Data'}</p>
            <p className="text-sm text-zinc-400 mt-2">{mode === 'dirty' ? 'Unreconciled, Fragmented' : 'Standardized, Verified'}</p>
          </div>

          <div className="flex-1 w-full h-2 bg-zinc-800 relative rounded-full overflow-hidden">
             <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${mode === 'dirty' ? 'bg-red-500 w-1/3' : 'bg-green-500 w-full'}`}></div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${mode === 'dirty' ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
              {mode === 'dirty' ? <AlertTriangle size={40} /> : <Sparkles size={40} />}
            </div>
            <p className="text-lg font-black uppercase tracking-wider">{mode === 'dirty' ? 'AI Hallucinations' : 'Trusted AI'}</p>
             <p className="text-sm text-zinc-400 mt-2">{mode === 'dirty' ? 'High Risk & Error' : 'Autonomous Execution'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseFireVisual = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
    <div className="bg-red-950/20 border border-red-900/30 p-10 rounded-3xl flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-red-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
        <Flame size={48} className="text-red-500" />
      </div>
      <h4 className="text-red-400 font-black uppercase tracking-widest text-base mb-2">Vulnerable State</h4>
      <p className="text-zinc-300 text-lg">Material Weakness = Reputational Fire</p>
    </div>
    <div className="bg-blue-950/20 border border-blue-900/30 p-10 rounded-3xl flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert size={48} className="text-blue-500" />
      </div>
      <h4 className="text-blue-400 font-black uppercase tracking-widest text-base mb-2">Fortified State</h4>
      <p className="text-zinc-300 text-lg">Automated Controls = Digital Resilience</p>
    </div>
  </div>
);

const WorkingCapitalVisual = () => (
    <div className="flex flex-col items-center justify-center w-full py-8 text-center bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="flex flex-col items-center opacity-60 grayscale">
                <Droplets size={64} className="mb-4 text-zinc-500" />
                <span className="text-sm uppercase font-black tracking-widest">Trapped Cash</span>
            </div>
            <div className="hidden md:flex flex-col items-center">
                 <ArrowRight size={48} className="text-zinc-700" />
            </div>
            <div className="flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-blackline-yellow blur-2xl opacity-20 rounded-full"></div>
                    <Zap size={80} className="text-blackline-yellow relative z-10 animate-pulse" />
                </div>
                <span className="text-sm uppercase font-black tracking-widest text-blackline-yellow mt-6">Cash Velocity</span>
            </div>
        </div>
        <p className="text-base text-zinc-400 mt-8 max-w-lg mx-auto">Transforming idle droplets into a high-speed revenue turbine.</p>
    </div>
);

const MaIntegrationVisual = () => (
    <div className="flex flex-col items-center justify-center w-full py-8 text-center bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="flex items-center gap-4 w-full max-w-2xl justify-center">
             <div className="h-32 w-20 bg-blue-500/20 border border-blue-500/50 rounded-l-2xl flex items-center justify-center"><span className="rotate-90 text-sm uppercase font-black text-blue-400 whitespace-nowrap">Co. A</span></div>
             <div className="h-32 flex-1 flex flex-col justify-center gap-2 max-w-[200px]">
                 {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-1.5 bg-blackline-yellow rounded-full shadow-[0_0_10px_rgba(249,183,52,0.8)]"></div>)}
             </div>
             <div className="h-32 w-20 bg-purple-500/20 border border-purple-500/50 rounded-r-2xl flex items-center justify-center"><span className="rotate-90 text-sm uppercase font-black text-purple-400 whitespace-nowrap">Co. B</span></div>
        </div>
        <p className="text-base text-zinc-400 mt-8 max-w-lg mx-auto">The "Digital Zipper" seamlessly merging disparate ERP landscapes.</p>
    </div>
);

const ComplianceVisual = () => (
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-8 text-center gap-16 bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="flex flex-col items-center opacity-50">
             <div className="w-24 h-24 border-2 border-red-500/50 rounded-full flex items-center justify-center bg-red-950/20 mb-4">
                 <AlertTriangle className="text-red-500" size={40} />
             </div>
             <span className="text-sm uppercase font-black">Minefield</span>
        </div>
        <div className="flex flex-col items-center">
             <div className="w-32 h-32 border-4 border-green-500 rounded-full flex items-center justify-center bg-green-950/20 shadow-[0_0_40px_rgba(34,197,94,0.2)] mb-4">
                 <Radar className="text-green-500 animate-spin-slow" size={56} />
             </div>
             <span className="text-sm uppercase font-black text-green-400">Active Radar</span>
        </div>
    </div>
);

const TalentVisual = () => (
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-8 text-center gap-12 md:gap-24 bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="flex flex-col items-center group">
            <div className="w-24 h-24 rounded-full border border-zinc-700 flex items-center justify-center bg-zinc-900 group-hover:border-zinc-500 transition-colors mb-4">
                <Loader2 className="text-zinc-500 animate-spin" size={40} />
            </div>
            <span className="text-sm uppercase font-black text-zinc-500">The Grind</span>
        </div>
        <div className="h-px w-24 bg-zinc-700 hidden md:block"></div>
        <div className="flex flex-col items-center group">
            <div className="w-32 h-32 rounded-full border-4 border-blackline-yellow flex items-center justify-center bg-blackline-yellow/10 shadow-[0_0_40px_rgba(249,183,52,0.3)] mb-4">
                <Rocket className="text-blackline-yellow group-hover:-translate-y-2 transition-transform" size={56} />
            </div>
            <span className="text-sm uppercase font-black text-blackline-yellow">Career Launchpad</span>
        </div>
    </div>
);

const InnovationVisual = () => (
    <div className="flex flex-col items-center justify-center w-full py-8 text-center bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="flex items-end gap-12 mb-6">
             <div className="flex flex-col items-center">
                 <Anchor className="text-zinc-600 mb-4" size={48} />
                 <div className="h-1.5 w-20 bg-zinc-800 rounded-full"></div>
             </div>
             <ArrowRight className="text-zinc-700 mb-2 w-8 h-8" />
             <div className="flex flex-col items-center">
                 <Wind className="text-blue-400 mb-4 animate-pulse" size={64} />
                 <div className="h-1.5 w-24 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
             </div>
        </div>
        <p className="text-base text-zinc-400 max-w-lg mx-auto">Cutting the anchor of manual work to catch the winds of strategy.</p>
    </div>
);

const DecisionVisual = () => (
    <div className="flex flex-col md:flex-row items-center justify-center w-full py-8 text-center gap-12 bg-zinc-900/50 rounded-3xl border border-zinc-800">
        <div className="relative w-48 h-32 bg-zinc-800 rounded-xl overflow-hidden flex items-center justify-center border border-zinc-700">
            <CloudFog className="absolute inset-0 text-zinc-600 w-full h-full opacity-50" />
            <span className="relative z-10 font-bold text-zinc-400 blur-[3px] text-2xl">DATA</span>
        </div>
        <ArrowRight className="text-zinc-600 w-8 h-8 rotate-90 md:rotate-0" />
        <div className="relative w-48 h-32 bg-blackline-yellow/10 rounded-xl overflow-hidden flex items-center justify-center border-2 border-blackline-yellow shadow-[0_0_30px_rgba(249,183,52,0.15)]">
            <Eye className="absolute top-3 right-3 text-blackline-yellow w-5 h-5" />
            <span className="font-black text-white tracking-widest text-2xl">CLEAR</span>
        </div>
    </div>
);

// --- FRAMEWORK PHASE VISUALS ---

const PainPulseGrid = ({ items }: { items: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {items.map((item, idx) => (
            <div key={idx} className="bg-red-950/10 border border-red-900/30 p-4 rounded-xl flex items-center gap-4 group hover:bg-red-900/20 transition-all">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                <p className="text-zinc-300 text-sm font-medium group-hover:text-white">{item}</p>
            </div>
        ))}
    </div>
);

const SpotlightCards = ({ items }: { items: string[] }) => (
    <div className="space-y-3 w-full">
        {items.map((item, idx) => (
            <div key={idx} className="bg-black border border-zinc-800 p-4 rounded-xl text-center hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group">
                <p className="text-zinc-400 italic text-lg group-hover:text-white transition-colors">"{item}"</p>
            </div>
        ))}
    </div>
);

const CapabilityStack = ({ items }: { items: string[] }) => (
    <div className="flex flex-col-reverse gap-2 w-full max-w-md mx-auto">
        {items.map((item, idx) => (
            <div key={idx} className="bg-zinc-800 border border-zinc-700 p-3 rounded-lg text-center shadow-lg transform hover:scale-105 transition-transform cursor-default">
                <span className="text-sm font-bold text-white flex items-center justify-center gap-2">
                    <Layers size={14} className="text-blackline-yellow" /> {item}
                </span>
            </div>
        ))}
        <div className="text-center text-[10px] font-black uppercase text-zinc-600 tracking-widest mb-1">Tech Stack Foundation</div>
    </div>
);

const LogicFlow = ({ metrics }: { metrics: string[] }) => (
    <div className="flex flex-col gap-4 w-full">
        {metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-green-900/30 border border-green-700 flex items-center justify-center text-green-500 font-bold text-xs shrink-0">
                    {idx + 1}
                </div>
                <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                    <p className="text-white font-medium text-lg">{metric}</p>
                </div>
            </div>
        ))}
    </div>
);

// --- MAIN COMPONENT ---

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'grid' | 'persona_explain' | 'framework_explain' | 'detail' | 'executive_commentary' | 'letsgo_bva'>('landing');
  const [activeDriverId, setByActiveDriverId] = useState<string | null>(null);
  const [activePov, setActivePov] = useState<'executive' | 'operational'>('executive');
  
  // Ref for Phase 1 section to support smart scrolling
  const phase1Ref = useRef<HTMLDivElement>(null);

  const sortedDrivers = useMemo(() => {
    if (!GLOBAL_SKO_DATA || !Array.isArray(GLOBAL_SKO_DATA)) return [];
    return ORDERED_IDS.map(id => GLOBAL_SKO_DATA.find(d => d.id === id)).filter(Boolean) as SkoDriverDetail[];
  }, []);

  const activeDriver = sortedDrivers.find(d => d.id === activeDriverId);

  // SCROLL LOGIC: On initial load or view change, scroll top.
  // Exception: If switching drivers while in Detail view, we handle that in the handler.
  useEffect(() => {
    if (viewMode !== 'detail') {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [viewMode]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); 
    setByActiveDriverId(id);
    setViewMode('detail');
    // For initial entry to detail, scroll top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToPhase1 = () => {
      if (phase1Ref.current) {
          phase1Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  const handleNextDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const nextIndex = (currentIndex + 1) % sortedDrivers.length;
    setActivePov('executive'); 
    setByActiveDriverId(sortedDrivers[nextIndex].id);
    // Smart Scroll: Go to content start, not top of page
    setTimeout(scrollToPhase1, 50);
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + sortedDrivers.length) % sortedDrivers.length;
    setActivePov('executive');
    setByActiveDriverId(sortedDrivers[prevIndex].id);
    // Smart Scroll: Go to content start, not top of page
    setTimeout(scrollToPhase1, 50);
  };

  const plImpactDrivers = sortedDrivers.filter(d => ['working_cap', 'process'].includes(d.id));
  const accelerationDrivers = sortedDrivers.filter(d => ['talent', 'ma', 'innovation', 'compliance', 'decision'].includes(d.id));
  const valueDrivers = sortedDrivers.filter(d => ['trust', 'ai_ops'].includes(d.id));

  // --- HELPER FOR DRIVER VISUALS ---
  const renderDriverVisual = (id: string) => {
      switch(id) {
          case 'process': return <FunnelVisual />;
          case 'working_cap': return <WorkingCapitalVisual />;
          case 'trust': return <HouseFireVisual />;
          case 'ma': return <MaIntegrationVisual />;
          case 'compliance': return <ComplianceVisual />;
          case 'talent': return <TalentVisual />;
          case 'innovation': return <InnovationVisual />;
          case 'decision': return <DecisionVisual />;
          case 'ai_ops': return <GarbageInOutVisual />;
          default: return null;
      }
  };

  // --- VIEW RENDERING ---

  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-4 right-4 md:top-0 md:right-0 p-4 md:p-8 text-gray-400 hover:text-white transition-colors z-50 invisible"><X size={28} /></button>
         
         <div className="text-center py-16 md:py-28 flex flex-col items-center justify-center">
            <div className="inline-flex items-start gap-2 md:gap-4 mb-4">
               <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white italic leading-none">
                 #Lets<span className="text-blackline-yellow">Go</span>Get
               </h1>
               <TrendingUp className="text-blackline-yellow w-12 h-12 md:w-24 md:h-24 shrink-0 mt-2 md:mt-4" strokeWidth={3} />
            </div>
            
            <p className="text-sm md:text-xl text-zinc-500 font-black uppercase tracking-[0.5em] mb-6">
              BlackLine SKO 2026
            </p>

            <p className="text-xl md:text-3xl text-zinc-300 font-light mb-10 tracking-tight">
              Quantifying the value of <span className="text-white font-bold italic">unstoppable finance</span>
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full pb-16 md:pb-24 px-4 md:px-6">
             <div onClick={() => setViewMode('executive_commentary')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blackline-yellow/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blackline-yellow group-hover:text-black transition-all shadow-xl"><Play size={24} fill="currentColor" /></div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Executive Commentary</h3>
                   <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest group-hover:text-blackline-yellow transition-colors">Customer Voice & BL Vision</p>
                </div>
             </div>
             <div onClick={() => setViewMode('grid')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blue-500 group-hover:text-black transition-all shadow-xl"><LayoutGrid size={24} /></div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Explore Drivers</h3>
                   <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest group-hover:text-blue-400 transition-colors">Strategic Framework Map</p>
                </div>
             </div>
         </div>
      </div>
    );
  }

  if (viewMode === 'executive_commentary') {
    return (
      <div className="min-h-screen bg-black flex flex-col animate-fade-in relative pb-40">
         <div className="flex justify-between items-center px-4 md:px-8 py-6 sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-zinc-800/50">
            <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs"><ArrowLeft size={16} /> Back</button>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors invisible"><X size={24} /></button>
         </div>
         <div className="max-w-5xl mx-auto w-full px-4 md:px-6 flex flex-col gap-24 md:gap-32 pt-12 md:pt-20">
            <div className="text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/20 text-blackline-yellow rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Strategic Validation</div>
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-12">The Voice of <span className="text-blackline-yellow">ExxonMobil's CFO</span></h2>
               <div className="bg-white text-black p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden text-left flex flex-col h-full">
                  
                  {/* --- UPDATED: YELLOW BOXES ARE NOW FULL WIDTH (flex-1) AND UPSIZED TEXT --- */}
                  <div className="flex flex-col md:flex-row justify-start items-start gap-6 mb-10 w-full border-b border-gray-100 pb-8">
                     <div className="bg-blackline-yellow p-6 rounded-xl w-full flex-1 text-left h-full shadow-md">
                        <p className="font-bold text-lg mb-2">Launched Migration to S/4HANA:</p>
                        <p className="text-base">Reallocated 200+ F&A resources to SAP S/4HANA migration effort</p>
                     </div>
                     <div className="bg-blackline-yellow p-6 rounded-xl w-full flex-1 text-left h-full shadow-md">
                        <p className="font-bold text-lg mb-2">Measurable Impact:</p>
                        <p className="text-base">Automated 84% of reconciliations</p>
                     </div>
                  </div>

                  <div className="relative pl-8 md:pl-12 border-l-4 border-blackline-yellow mb-12">
                     <Quote className="text-blackline-yellow w-10 h-10 absolute -left-5 -top-4 bg-white" fill="currentColor" />
                     <p className="text-lg md:text-2xl leading-relaxed font-light">
                       “We recently did a larger implementation of a software platform called <strong className="font-black">BlackLine</strong> that we use in the accounting space, and it's <strong className="font-black bg-blackline-yellow px-1">literally enabled us to save tens of thousands of hours</strong> of what was very manually intensive work because we can now automate it. But a lot of this detail is in the data <strong className="font-black bg-blackline-yellow px-1">and being able to have <span className="bg-blackline-yellow px-1">cleaner data at a corporate-wide level so that we can get better insights</span></strong> from the data, we can improve our automation, and we can get both more efficient and more effective.”
                     </p>
                  </div>
                  <div className="flex flex-col xl:flex-row justify-between items-end gap-8 mt-auto">
                     <div className="text-gray-500 text-xs font-bold uppercase tracking-widest order-3 xl:order-1">
                        Customer Since: <span className="text-black text-lg font-black ml-2">2022</span>
                     </div>
                     <div className="flex flex-col md:flex-row items-end gap-8 order-2 w-full xl:w-auto justify-end">
                         
                         {/* --- UPDATED: BLACK BOX IS NOW DOWNSIZED --- */}
                         <div className="bg-black text-white px-6 py-4 rounded-xl shadow-lg text-center md:text-right w-full md:w-auto">
                            <p className="text-[9px] font-black text-blackline-yellow uppercase tracking-widest mb-1">Quantified Impact</p>
                            <p className="text-xl md:text-3xl font-black tracking-tighter italic">10,000+ FTE HOURS SAVED</p>
                         </div>
                         
                         <div className="text-right shrink-0">
                            <p className="text-black font-black text-xl tracking-tight">Kathryn Mikells</p>
                            <p className="text-black text-sm font-bold">CFO, ExxonMobil</p>
                            <p className="text-zinc-500 text-xs font-bold mt-1">Earnings Call for Q1 2025, May 2, 2025</p>
                         </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="h-px bg-zinc-800 w-full opacity-50"></div>
            <div className="text-center pb-20">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/10 text-blackline-yellow rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Leadership Keynote</div>
               <h2 className="text-4xl md:text-6xl font-bold text-white italic tracking-tighter mb-8">
                  Hear from BL execs on <br />the <span className="text-blackline-yellow">real value of BlackLine</span>
               </h2>
               <div onClick={() => alert("Video placeholder: Asset not yet connected for SKO.")} className="bg-zinc-900 border-2 border-zinc-800 hover:border-blackline-yellow/50 rounded-[3rem] aspect-video relative flex flex-col items-center justify-center overflow-hidden shadow-2xl group cursor-pointer mb-12 transition-all duration-500">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-blackline-yellow group-hover:text-black transition-all">
                     <Play size={32} fill="currentColor" />
                  </div>
                  <div className="absolute bottom-10 left-10 text-left z-10">
                     <p className="text-white font-bold text-2xl italic tracking-tight">Executive Leadership Team</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="w-full max-w-[2000px] mx-auto pb-32 animate-fade-in px-4 md:px-6 pt-6 md:pt-10">
         <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 mb-4 md:mb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"><ArrowLeft size={16} /> Back to Menu</button>
         <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 md:mb-12 uppercase italic">Value Drivers <span className="text-zinc-600">Framework</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 items-start">
            <div className="space-y-8">
                <GridSectionHeader title="P&L Bottom Line Impact" subtitle="Directly influencing profitability" />
                <div className="flex flex-col gap-6">{plImpactDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}</div>
            </div>
            <div className="space-y-8">
               <GridSectionHeader title="Acceleration & Resilience" subtitle="Driving speed & risk mitigation" />
               <div className="grid grid-cols-2 gap-4">
                   <div className="col-span-1"><DriverCardHorizontal driver={accelerationDrivers[0]} onSelect={handleDriverSelect} /></div>
                   <div className="col-span-1"><DriverCardHorizontal driver={accelerationDrivers[1]} onSelect={handleDriverSelect} /></div>
                   <div className="col-span-2 flex justify-center py-2"><div className="w-[calc(50%-0.5rem)]"><DriverCardHorizontal driver={accelerationDrivers[2]} onSelect={handleDriverSelect} /></div></div>
                   <div className="col-span-1"><DriverCardHorizontal driver={accelerationDrivers[3]} onSelect={handleDriverSelect} /></div>
                   <div className="col-span-1"><DriverCardHorizontal driver={accelerationDrivers[4]} onSelect={handleDriverSelect} /></div>
               </div>
            </div>
            <div className="space-y-8">
                <GridSectionHeader title="Enhancing Enterprise Value" subtitle="Boosting valuation foundations" />
                <div className="flex flex-col gap-6">{valueDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}</div>
            </div>
         </div>
         {/* Button Explicitly Restored Here */}
         <div className="mt-20 md:mt-32 text-center pb-20">
            <button onClick={() => { setActivePov('executive'); setByActiveDriverId(sortedDrivers[0]?.id || null); setViewMode('persona_explain'); }} className="w-full md:w-auto px-8 md:px-16 py-6 md:py-8 bg-blackline-yellow text-black text-xl md:text-2xl font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto uppercase italic tracking-tighter border-4 border-black"><Sparkles size={24} /> Start Deep Dive</button>
         </div>
      </div>
    );
  }

  if (viewMode === 'persona_explain' && activeDriver) {
    const personas = activeDriver.personas || { executive: [], operational: [] };
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-10"><Users size={14} /> Persona Alignment</div>
           <h2 className="text-4xl md:text-9xl font-black text-white uppercase italic tracking-tighter mb-12">Meet the <span className="text-blackline-yellow">Stakeholders</span></h2>
           <div className="space-y-16 md:space-y-24 text-left">
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">Strategic Executive Tier <div className="h-px bg-zinc-800 flex-grow"></div></h3>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">{personas.executive?.map((p: any, idx: number) => (<SimplePersonaCard key={idx} role={p.role} icon={p.icon} nightmare={p.nightmare} aspiration={p.aspiration} />))}</div>
              </div>
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">Tactical Operational Tier <div className="h-px bg-zinc-800 flex-grow"></div></h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">{personas.operational?.map((p: any, idx: number) => (<SimplePersonaCard key={idx} role={p.role} icon={p.icon} nightmare={p.nightmare} aspiration={p.aspiration} />))}</div>
              </div>
           </div>
           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-20 md:mt-32 pb-20">
              <button onClick={() => setViewMode('grid')} className="px-8 py-4 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 uppercase italic border border-zinc-700">Back to Map</button>
              <button onClick={() => setViewMode('framework_explain')} className="px-8 py-4 bg-blackline-yellow text-black text-lg font-black rounded-full hover:scale-105 shadow-2xl flex items-center justify-center gap-4 uppercase italic">The Teaching System <ArrowRight size={24} /></button>
           </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'framework_explain' && activeDriver) {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in flex flex-col items-center justify-center py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-14"><HelpCircle size={14} /> Methodology Briefing</div>
           <h2 className="text-5xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter mb-20">The Teaching <span className="text-blackline-yellow">System</span></h2>
           
           {/* REPLACED LARGE FRAMEWORK BOXES WITH NEW VISUAL COMPONENTS */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-10 text-left">
              <div className="col-span-1 md:col-span-3">
                  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] h-full flex flex-col justify-between hover:border-red-500/50 transition-all gap-8">
                      <div>
                          <div className="text-red-500 font-black text-4xl mb-4">01</div>
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Create Value</h3>
                          <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-6">Establish the Strategic Gap</p>
                          <PainPulseGrid items={["Headcount Risk", "Process Bottlenecks", "Reporting Lag", "Compliance Exposure"]} />
                      </div>
                      <p className="text-zinc-400 text-sm mt-8 border-t border-zinc-800 pt-4 leading-relaxed">Shift the dialogue from features to executive objectives. Define the 'Strategic Gap' between their current state and required future state.</p>
                  </div>
              </div>
              
              <div className="col-span-1 md:col-span-3">
                   <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] h-full flex flex-col justify-between hover:border-blue-500/50 transition-all gap-8">
                      <div>
                          <div className="text-blue-500 font-black text-4xl mb-4">02</div>
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Capture Value</h3>
                          <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-6">Identify Customer Challenges</p>
                          <SpotlightCards items={["How long does your close take?", "Do you trust the numbers on Day 1?", "What is the cost of attrition?"]} />
                      </div>
                      <p className="text-zinc-400 text-sm mt-8 border-t border-zinc-800 pt-4 leading-relaxed">Deep discovery to uncover the hidden costs of status quo inertia. Validate the specific pains that make change urgent.</p>
                  </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-blackline-yellow/50 transition-all gap-6">
                      <div>
                          <div className="text-blackline-yellow font-black text-4xl mb-4">03</div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Deliver Value</h3>
                          <p className="text-blackline-yellow text-xs font-black uppercase tracking-widest mb-6">Map Outcomes</p>
                          <CapabilityStack items={["Unified Data", "Auto-Matching", "Controls"]} />
                      </div>
                      <p className="text-zinc-400 text-sm mt-4 border-t border-zinc-800 pt-4 leading-relaxed">Connect the dots between BlackLine capabilities and the customer's specific desired business outcomes.</p>
                  </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-green-500/50 transition-all gap-6">
                      <div>
                          <div className="text-green-500 font-black text-4xl mb-4">04</div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Justify Value</h3>
                          <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-6">Build Logic</p>
                          <LogicFlow metrics={["Manual Hours", "FTE Capacity", "Strategic ROI"]} />
                      </div>
                      <p className="text-zinc-400 text-sm mt-4 border-t border-zinc-800 pt-4 leading-relaxed">Co-author the business case logic. Secure agreement on the 'mechanics of improvement' before a single ROI number is calculated.</p>
                  </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-purple-500/50 transition-all gap-6">
                      <div>
                          <div className="text-purple-500 font-black text-4xl mb-4">05</div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Quantify Value</h3>
                          <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-6">Calculate ROI</p>
                          <div className="bg-zinc-800 p-4 rounded-xl text-center border border-zinc-700">
                              <Coins className="text-blackline-yellow mx-auto mb-2" />
                              <span className="text-white font-mono text-xl">$2.5M</span>
                              <p className="text-[10px] text-zinc-500 uppercase mt-1">Projected Savings</p>
                          </div>
                      </div>
                      <p className="text-zinc-400 text-sm mt-4 border-t border-zinc-800 pt-4 leading-relaxed">Translate agreed logic into a defensible financial model. Project hard P&L impact that the CFO can validate and defend.</p>
                  </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-20">
              <button onClick={() => setViewMode('persona_explain')} className="px-8 py-4 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 uppercase italic border border-zinc-700">Back to Personas</button>
              <button onClick={() => { setActivePov('executive'); setViewMode('detail'); }} className="px-10 py-6 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 shadow-xl flex items-center justify-center gap-4 uppercase italic">Start Driver Tour <ArrowRight size={24} /></button>
           </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'detail' && activeDriver) {
    const pov = activePov === 'executive' ? activeDriver?.executivePov : activeDriver?.operationalPov;
    const roiItems = activeDriver?.executivePov?.roiCalculations?.[activePov];
      
    // SAFETY CHECK: If POV data is missing, show fallback to prevent crash
    if (!pov) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Driver data incomplete. <button onClick={() => setViewMode('grid')} className="ml-4 underline">Back</button></div>;

    const PovSwitcher = () => (
      <div className="bg-zinc-900 p-2 rounded-3xl inline-flex flex-col md:flex-row border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)]">
        <button onClick={() => { setActivePov('executive'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black scale-105' : 'text-zinc-400'}`}>Executive</button>
        <button onClick={() => { setActivePov('operational'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black scale-105' : 'text-zinc-400'}`}>Operational</button>
      </div>
    );

    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-40 md:scale-[0.8] md:origin-top overflow-visible">
        <div className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-zinc-800 px-4 md:px-10 py-4 md:py-6 flex justify-between items-center no-print">
           <div className="flex items-center gap-4">
              <button onClick={() => setViewMode('grid')} className="text-gray-300 hover:text-white p-2 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"><LogOut size={16} /> Escape</button>
              <button onClick={() => setViewMode('letsgo_bva')} className="text-blackline-yellow p-2 bg-zinc-900 rounded-2xl border border-blackline-yellow/30 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest">Next Steps <ArrowRight size={16} /></button>
              <span className="text-xs font-black text-blackline-yellow uppercase tracking-[0.3em] px-4 border-l border-zinc-800">{activeDriver.title}</span>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={handlePrevDriver} className="p-2 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronLeft size={20} /></button>
              <button onClick={handleNextDriver} className="p-2 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronRight size={20} /></button>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white ml-4"><X size={20} /></button>
           </div>
        </div>
        <div className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 md:px-10 text-center">
           <div className="max-w-6xl mx-auto">
              <div className="inline-flex items-center justify-center p-6 md:p-10 bg-blackline-yellow rounded-[2rem] text-black mb-14 shadow-2xl border-4 border-black"><SafeIcon name={activeDriver.icon} className="w-12 h-12 md:w-20 md:h-20" /></div>
              <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-16 leading-[0.9] italic uppercase">{activeDriver.title}</h1>
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-14 rounded-[3rem] shadow-2xl mb-16 text-left max-w-4xl mx-auto">
                 <h4 className="text-blackline-yellow font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-4 flex items-center gap-3"><Sparkles size={18} /> Why does this even matter?</h4>
                 <p className="text-xl md:text-3xl text-white font-light leading-relaxed italic">"{activeDriver.summary}"</p>
              </div>
              <div className="flex justify-center mb-16"><PovSwitcher /></div>
           </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-10 space-y-16 md:space-y-32 pb-20">
           {/* PHASE 1: CREATE VALUE (With new Visuals) */}
           {/* -- ADDED REF TO SCROLL TARGET -- */}
           <div ref={phase1Ref} className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h4 className="text-red-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 01: Create Value</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-10 uppercase italic tracking-tighter leading-[0.9]">{pov?.createValue?.title}</h5>
              
              {/* Conditional Visuals for Phase 1 */}
              <div className="w-full flex justify-center mb-8">
                 {renderDriverVisual(activeDriver.id)}
              </div>
              
              {/* Fallback Text List if no specific visual, or supplementary info */}
              {!['process', 'ai_ops', 'working_cap', 'trust', 'ma', 'compliance', 'talent', 'innovation', 'decision'].includes(activeDriver.id) && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 mt-8 text-left">
                  {pov?.createValue?.pains?.map((p: string, i: number) => (<div key={i} className="bg-black/40 border border-zinc-800 p-6 md:p-8 rounded-3xl flex gap-6 items-start"><div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500"><AlertTriangle size={20} /></div><p className="text-zinc-200 text-lg md:text-2xl font-medium leading-relaxed">{p}</p></div>))}
                </div>
              )}

              <div className="pt-12 border-t border-zinc-800/50 text-center"><p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">Strategic Focus Point</p><p className="text-xl md:text-3xl text-white font-medium italic leading-relaxed">"{pov?.createValue?.focus}"</p></div>
           </div>

           {/* PHASE 2 & 3 */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <h4 className="text-blue-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 02: Capture Value</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov?.captureValue?.title}</h5>
              <div className="space-y-6 md:space-y-8 mb-16">{pov?.captureValue?.questions?.map((q: string, i: number) => (<div key={i} className={`flex gap-6 justify-center`}><div className={`relative max-w-4xl p-6 md:p-10 rounded-[2rem] ${i % 2 === 0 ? 'bg-zinc-800 text-white rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none shadow-xl'}`}><p className="text-xl md:text-3xl font-medium italic leading-relaxed">"{q}"</p></div></div>))}</div>
           </div>
           
           {/* PHASE 3: UPSIZED CONTENT */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-blackline-yellow rounded-full animate-pulse"></div>
                <h4 className="text-blackline-yellow font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 03: Deliver Value</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-16 uppercase italic tracking-tighter leading-[0.9]">{pov?.deliverValue?.title}</h5>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-24 mt-8 text-left w-full">
                 {/* LEFT: Capabilities - Bigger Pills */}
                 <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-12 text-center">Platform Activation</span>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {pov?.deliverValue?.capabilities?.map((c: string) => (
                        <div key={c} className="px-8 py-5 bg-zinc-800 rounded-full border border-zinc-700 text-white font-bold text-lg shadow-lg flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
                           <div className="w-3 h-3 bg-blackline-yellow rounded-full shadow-[0_0_10px_rgba(249,183,52,0.8)]"></div>
                           {c}
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* RIGHT: Proof Points - Bigger Text & Spacing */}
                 <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-12 text-center">Validated Proof Points</span>
                    <div className="space-y-8 w-full max-w-xl">
                      {pov?.deliverValue?.proofPoints?.map((p: string, i: number) => (
                        <div key={i} className="flex items-start gap-6 p-6 rounded-3xl bg-white/5 border border-zinc-800/50 hover:border-zinc-700 transition-all">
                           <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 mt-1">
                              <CheckCircle2 size={28} />
                           </div>
                           <span className="text-xl md:text-2xl font-bold text-white leading-snug">{p}</span>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* PHASE 4: JUSTIFY VALUE */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-green-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 04: Justify Value</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov?.justifyValue?.title}</h5>
              
              {activeDriver.id === 'trust' || activeDriver.id === 'compliance' ? (
                <div className="mb-12"><HouseFireVisual /></div>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 text-left">
                {pov?.justifyValue?.metrics?.map((m: string, i: number) => {
                  const isLastItem = i === (pov.justifyValue.metrics?.length || 0) - 1;
                  const isOddTotal = (pov.justifyValue.metrics?.length || 0) % 2 !== 0;
                  
                  return (
                    <div key={i} className={`p-8 md:p-12 bg-black/50 rounded-[3rem] border border-zinc-800 hover:border-green-500/40 shadow-xl flex items-center gap-6 ${isOddTotal && isLastItem ? 'md:col-span-2' : ''}`}>
                      <TrendingUp className="text-green-500 w-8 h-8 shrink-0 opacity-50" />
                      <p className="text-2xl md:text-4xl font-black text-white tracking-tight italic">{m}</p>
                    </div>
                  );
                })}
              </div>
           </div>

           {/* PHASE 5: QUANTIFY VALUE */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <h4 className="text-purple-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 05: Quantify the Win</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">ROI & Realization</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                {roiItems && roiItems.length > 0 ? (roiItems.map((item: any, i: number) => {
                  const isLastItem = i === roiItems.length - 1;
                  const isOddTotal = roiItems.length % 2 !== 0;

                  return (
                    <div key={i} className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl group hover:border-blackline-yellow/50 transition-all relative ${isOddTotal && isLastItem ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
                      {/* Clean Gold Accent Top Border */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-blackline-yellow"></div>
                      <div className="p-8 pt-10">
                        <div className="flex justify-between items-start mb-4">
                          <h6 className="text-2xl font-black text-white italic">{item.label}</h6>
                          <Coins className="text-blackline-yellow w-6 h-6" />
                        </div>
                        <div className="bg-black/40 p-4 rounded-xl border border-zinc-800 mb-6 font-mono text-lg text-zinc-300 flex flex-wrap gap-2 items-center">
                          {item.formula.map((part: string, idx: number) => (
                            <span key={idx} className={['×', '÷', '+', '-', 'vs', 'to', '→'].includes(part) ? "text-yellow-500 font-bold" : ""}>{part}</span>
                          ))}
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })) : (
                  <div className="col-span-2 text-center text-zinc-500 italic py-20 bg-black/20 rounded-3xl">ROI Calculation data unavailable.</div>
                )}
              </div>
           </div>

           <div className="flex flex-col items-center gap-8 pt-10 border-t border-zinc-800/50">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Switch Perspective</span>
              <PovSwitcher />
           </div>
        </div>
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-8 no-print justify-center"><button onClick={handlePrevDriver} className="px-14 py-8 bg-zinc-900 border border-zinc-800 text-white rounded-full font-black uppercase italic hover:bg-zinc-800 transition-all shadow-2xl flex items-center gap-4"><ChevronLeft size={16} /> Prev</button><button onClick={handleNextDriver} className="px-16 py-8 bg-blackline-yellow text-black rounded-full font-black uppercase italic hover:scale-105 transition-all shadow-2xl border-4 border-black flex items-center gap-4">Next <ChevronRight size={16} /></button></div>
      </div>
    );
  }

  return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h1 className="text-2xl font-bold mb-4">Content Not Found</h1><button onClick={onClose} className="px-6 py-2 bg-zinc-800 rounded-lg">Return to Home</button></div>;
};

const SimplePersonaCard: React.FC<{ role: string, icon: string, nightmare: string, aspiration: string }> = ({ role, icon, nightmare, aspiration }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-zinc-500 transition-all flex flex-col h-full group shadow-xl">
       <div className="flex items-center gap-6 mb-8"><div className="p-4 bg-black rounded-2xl border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-all shrink-0"><SafeIcon name={icon} className="w-9 h-9" /></div><h4 className="text-white font-black text-2xl uppercase tracking-wider leading-tight">{role}</h4></div>
       <div className="space-y-8 flex-grow"><div className="space-y-3"><p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] flex items-center gap-3"><Stars size={16} /> Aspiration</p><p className="text-lg text-zinc-100 leading-relaxed font-bold">"{aspiration}"</p></div><div className="space-y-3"><p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center gap-3"><Ghost size={16} /> Nightmare</p><p className="text-lg text-zinc-100 leading-relaxed font-bold italic">"{nightmare}"</p></div></div>
    </div>
  );
};

const LargeFrameworkBox: React.FC<{ step: string, color: string, title: string, subtitle: string, formula: string, desc: string }> = ({ step, color, title, subtitle, formula, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-14 rounded-[3.5rem] flex flex-col justify-between hover:border-zinc-500 shadow-xl group h-full gap-6">
     <div>
       <div className={`w-16 h-16 rounded-[1.2rem] bg-${color}/20 text-${color} flex items-center justify-center mb-8 font-black text-3xl group-hover:scale-110 transition-transform shadow-lg shrink-0`}>{step}</div>
       <h4 className="text-3xl font-black uppercase text-white mb-1 tracking-widest italic">{title}</h4>
       <p className={`text-${color} text-xs font-black uppercase tracking-[0.3em] mb-4`}>{subtitle}</p>
       <div className="mb-8 py-2 px-4 bg-black/40 rounded-lg border border-zinc-800 inline-block w-fit"><span className="text-sm font-mono text-zinc-200 flex items-center gap-2">{formula}</span></div>
     </div>
     <p className="text-2xl text-zinc-100 leading-relaxed font-light whitespace-pre-line">{desc}</p>
  </div>
);

const DriverCardHorizontal: React.FC<{ driver: SkoDriverDetail, onSelect: (id: string) => void }> = ({ driver, onSelect }) => {
   return (
      <div className="group relative w-full rounded-[2rem] overflow-hidden border border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-2xl bg-zinc-900 h-full">
         <div className="absolute inset-0 z-0">
            <img src={DRIVER_IMAGES[driver.id] || DRIVER_IMAGES.process} alt={driver.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
         </div>
         <div className="relative z-10 p-8 flex flex-col text-left h-full">
            <div className="flex items-start justify-between mb-4"><div className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-zinc-700 group-hover:border-blackline-yellow transition-colors shrink-0"><SafeIcon name={driver.icon} className="w-6 h-6" /></div></div>
            <h3 className="text-2xl font-black text-white mb-2 group-hover:text-blackline-yellow transition-colors leading-tight uppercase italic tracking-tighter">{driver.title}</h3>
            <button onClick={() => onSelect(driver.id)} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blackline-yellow hover:text-black hover:border-blackline-yellow transition-all flex items-center justify-center gap-2 mt-auto"><HelpCircle size={14} /> Explain Driver</button>
         </div>
      </div>
   );
};

const GridSectionHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="flex flex-col items-center text-center gap-2 mb-2"><h3 className="text-xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-4 italic text-center leading-tight"><div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>{title}<div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div></h3><p className="text-sm font-bold text-zinc-200 uppercase tracking-widest px-2">{subtitle}</p></div>
);

const PhaseCard: React.FC<{ step: string, title: string, label: string, color: string, desc: string }> = ({ step, title, label, color, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2rem] relative overflow-hidden group hover:border-zinc-700 transition-all text-left">
     <div className={`absolute top-0 left-0 w-2 h-full bg-${color}`}></div>
     <div className="text-8xl font-black opacity-[0.03] absolute top-2 right-6 pointer-events-none group-hover:opacity-[0.07]">{step}</div>
     <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter max-w-2xl">{title}</h3>
     <p className={`text-${color} text-xs font-black uppercase tracking-[0.2em] mb-6`}>{label}</p>
     <div className="h-px bg-zinc-800 w-full mb-6"></div>
     <p className="text-zinc-100 leading-relaxed text-lg font-medium">{desc}</p>
  </div>
);
