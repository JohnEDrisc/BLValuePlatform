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
  Loader2, 
  Maximize2, 
  Minimize2, 
  GitMerge, 
  Lightbulb, 
  Activity, 
  ShieldCheck, 
  DollarSign, 
  BookOpen
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
  'process',        
  'working_cap',    
  'talent',         
  'ma',             
  'innovation',     
  'decision',       
  'compliance',     
  'trust',          
  'ai_ops'          
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
       <div className="flex-1 flex flex-col gap-3 w-full text-center relative">
          <div className="absolute -top-8 left-0 w-full text-center text-green-500 text-xs font-black uppercase tracking-widest mb-2">Growth Factors</div>
          <div className="bg-zinc-800 p-4 rounded-lg text-lg font-bold text-zinc-200 border border-green-900/30">Transaction Volume</div>
          <div className="bg-zinc-800 p-4 rounded-lg text-lg font-bold text-zinc-200 border border-green-900/30">New Entities</div>
          <div className="bg-zinc-800 p-4 rounded-lg text-lg font-bold text-zinc-200 border border-green-900/30">Data Sources</div>
       </div>
       <div className="relative z-10 bg-gradient-to-r from-red-900/50 to-red-600/50 p-8 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center shrink-0 w-full md:w-64 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
          <AlertTriangle className="text-red-500 mb-3 w-10 h-10" />
          <span className="text-xs font-black uppercase text-red-400 tracking-widest mb-1">PROCESS BLOCKER</span>
          <p className="text-xl font-bold text-white leading-tight text-center">Manual Matching</p>
       </div>
       <div className="flex-1 flex flex-col gap-3 w-full text-center opacity-80">
          <div className="bg-zinc-800 border border-zinc-600 p-4 rounded-lg text-lg font-bold text-zinc-300">Delay</div>
          <div className="bg-zinc-800 border border-zinc-600 p-4 rounded-lg text-lg font-bold text-zinc-300">Risk</div>
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
            <p className="text-sm text-zinc-200 mt-2">{mode === 'dirty' ? 'Unreconciled, Fragmented' : 'Standardized, Verified'}</p>
          </div>

          <div className="flex-1 w-full h-2 bg-zinc-800 relative rounded-full overflow-hidden">
             <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${mode === 'dirty' ? 'bg-red-500 w-1/3' : 'bg-green-500 w-full'}`}></div>
          </div>

          <div className="flex-1 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${mode === 'dirty' ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
              {mode === 'dirty' ? <AlertTriangle size={40} /> : <Sparkles size={40} />}
            </div>
            <p className="text-lg font-black uppercase tracking-wider">{mode === 'dirty' ? 'AI Hallucinations' : 'Trusted AI'}</p>
             <p className="text-sm text-zinc-200 mt-2">{mode === 'dirty' ? 'High Risk & Error' : 'Autonomous Execution'}</p>
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
      <p className="text-zinc-200 text-lg">Material Weakness = Reputational Fire</p>
    </div>
    <div className="bg-blue-950/20 border border-blue-900/30 p-10 rounded-3xl flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert size={48} className="text-blue-500" />
      </div>
      <h4 className="text-blue-400 font-black uppercase tracking-widest text-base mb-2">Fortified State</h4>
      <p className="text-zinc-200 text-lg">Automated Controls = Digital Resilience</p>
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
                <span className="text-lg uppercase font-black tracking-widest text-blackline-yellow mt-6">Cash Velocity</span>
            </div>
        </div>
        <p className="text-2xl text-zinc-200 mt-12 max-w-2xl mx-auto leading-relaxed font-medium">Transforming idle droplets into a high-speed revenue turbine.</p>
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
        <p className="text-2xl text-zinc-200 mt-12 max-w-2xl mx-auto leading-relaxed font-medium">The "Digital Zipper" seamlessly merging disparate ERP landscapes.</p>
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
        <p className="text-2xl text-zinc-200 mt-12 max-w-2xl mx-auto leading-relaxed font-medium">Cutting the anchor of manual work to catch the winds of strategy.</p>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto max-w-3xl">
        {items.map((item, idx) => {
            // Logic to style the first 2 items as "Gain/Aspiration" and last 2 as "Pain/Nightmare"
            const isGain = idx < 2; 
            const borderColor = isGain ? 'border-green-900/30' : 'border-red-900/30';
            const bgColor = isGain ? 'bg-green-950/10' : 'bg-red-950/10';
            const dotColor = isGain ? 'bg-green-500' : 'bg-red-500';
            const hoverText = isGain ? 'group-hover:text-green-200' : 'group-hover:text-red-200';
            const hoverBg = isGain ? 'hover:bg-green-900/20' : 'hover:bg-red-900/20';

            return (
                <div key={idx} className={`${bgColor} border ${borderColor} p-6 rounded-2xl flex flex-col items-center justify-center gap-3 group ${hoverBg} transition-all text-center h-full`}>
                    <div className={`w-3 h-3 ${dotColor} rounded-full animate-pulse shrink-0`}></div>
                    <p className={`text-white text-lg font-bold ${hoverText}`}>{item}</p>
                </div>
            );
        })}
    </div>
);

const SpotlightCards = ({ items }: { items: string[] }) => (
    <div className="space-y-3 w-full">
        {items.map((item, idx) => (
            <div key={idx} className="bg-black border border-zinc-800 p-4 rounded-xl text-center hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group">
                <p className="text-zinc-200 italic text-lg group-hover:text-white transition-colors">"{item}"</p>
            </div>
        ))}
    </div>
);

// UPDATED: Visualizes Capabilities connecting to Benefits
const CapabilityStack = ({ items }: { items: string[] }) => {
  // Map input items to their paired benefits for this specific visualization
  const linkageMap: Record<string, string> = {
    "Unified Data": "Trust",
    "Auto-Matching": "Speed",
    "Controls": "Compliance"
  };

  return (
    <div className="flex flex-col-reverse gap-3 w-full max-w-md mx-auto">
        {items.map((item, idx) => {
            const benefit = linkageMap[item];
            return (
              <div key={idx} className="bg-zinc-900/80 border border-zinc-700 p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all cursor-default flex items-center justify-between gap-4 relative overflow-hidden group">
                  {/* Capability Side */}
                  <div className="flex items-center gap-3 z-10">
                      <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-600 group-hover:border-blackline-yellow transition-colors">
                        <Layers size={16} className="text-zinc-400 group-hover:text-blackline-yellow transition-colors" />
                      </div>
                      <span className="text-sm font-bold text-white">{item}</span>
                  </div>

                  {/* Connector Arrow */}
                  <ArrowRight size={16} className="text-zinc-600 group-hover:text-blackline-yellow transition-colors z-10" />

                  {/* Benefit Side */}
                  <div className="flex items-center gap-2 z-10">
                      <span className="text-sm font-black text-blackline-yellow uppercase tracking-wider">{benefit}</span>
                  </div>
                  
                  {/* Subtle background highlight on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-blackline-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
              </div>
            );
        })}
    </div>
  );
};

// UPDATED: Shows Value Statement AND Directional Logic Formula
const LogicFlow = ({ metrics }: { metrics: { statement: string, context: string }[] }) => (
    <div className="flex flex-col gap-4 w-full">
        {metrics.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-900/30 border border-green-700 flex items-center justify-center text-green-500 font-bold text-xs shrink-0 mt-2">
                    {idx + 1}
                </div>
                <div className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col gap-1">
                    <p className="text-white font-bold text-lg leading-tight">{item.statement}</p>
                    <p className="text-zinc-400 font-mono text-xs uppercase tracking-wide flex items-center gap-2">
                       <Calculator size={10} className="text-green-500" /> {item.context}
                    </p>
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
  
  // Phase 3 Toggle State
  const [phase3Focus, setPhase3Focus] = useState<'capabilities' | 'proof'>('capabilities');
  
  // Ref for Phase 1 section to support smart scrolling
  const phase1Ref = useRef<HTMLDivElement>(null);
  
  // Video Player State
  const [showVideo, setShowVideo] = useState(false);

  const sortedDrivers = useMemo(() => {
    if (!GLOBAL_SKO_DATA || !Array.isArray(GLOBAL_SKO_DATA)) return [];
    return ORDERED_IDS.map(id => GLOBAL_SKO_DATA.find(d => d.id === id)).filter(Boolean) as SkoDriverDetail[];
  }, []);

  const activeDriver = sortedDrivers.find(d => d.id === activeDriverId);

  // SCROLL LOGIC
  useEffect(() => {
    if (viewMode !== 'detail') {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [viewMode]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); 
    setByActiveDriverId(id);
    setViewMode('detail');
    setPhase3Focus('capabilities'); 
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // UPDATED: Scroll to Phase 1 (Universal Logic)
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
    setPhase3Focus('capabilities'); // RESET TOGGLE
    window.scrollTo({ top: 0, behavior: 'smooth' }); // SCROLL TO TOP
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + sortedDrivers.length) % sortedDrivers.length;
    setActivePov('executive');
    setByActiveDriverId(sortedDrivers[prevIndex].id);
    setPhase3Focus('capabilities'); // RESET TOGGLE
    window.scrollTo({ top: 0, behavior: 'smooth' }); // SCROLL TO TOP
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
      <div className="min-h-screen flex flex-col animate-fade-in relative px-4 md:px-0 bg-black w-full">
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
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blackline-yellow transition-colors leading-tight uppercase italic tracking-tighter">Explore Drivers</h3>
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
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/20 text-blackline-yellow rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Strategic Validation</div>
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-12">The Voice of <span className="text-blackline-yellow">ExxonMobil's CFO</span></h2>
               <div className="bg-white text-black p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden text-left flex flex-col h-full">
                  
                  {/* TOP ROW: Customer Since (UPSIZED) + CFO Info */}
                  <div className="flex justify-between items-start mb-8">
                      {/* UPSIZED Top Left Text */}
                      <div className="text-gray-500 text-base font-bold uppercase tracking-widest text-left">
                        Customer Since: <span className="text-black text-2xl font-black ml-2 block">2022</span>
                      </div>
                      <div className="text-right">
                        <p className="text-black font-black text-xl tracking-tight">Kathryn Mikells</p>
                        <p className="text-black text-sm font-bold">CFO, ExxonMobil</p>
                        <p className="text-zinc-500 text-xs font-medium mt-1">Earnings Call for Q1 2025, May 2, 2025</p>
                      </div>
                  </div>

                  {/* MIDDLE ROW: Quote */}
                  <div className="relative pl-8 md:pl-12 border-l-4 border-blackline-yellow mb-12">
                      <Quote className="text-blackline-yellow w-10 h-10 absolute -left-5 -top-4 bg-white" fill="currentColor" />
                      <p className="text-lg md:text-2xl leading-relaxed font-light">
                       “We recently did a larger implementation of a software platform called <strong className="font-black">BlackLine</strong> that we use in the accounting space, and it's <strong className="font-black bg-blackline-yellow px-1">literally enabled us to save tens of thousands of hours</strong> of what was very manually intensive work because we can now automate it. But a lot of this detail is in the data <strong className="font-black bg-blackline-yellow px-1">and being able to have cleaner data at a corporate-wide level so that we can get better insights</strong> from the data, we can improve our automation, and we can get both more efficient and more effective.”
                      </p>
                  </div>

                  {/* BOTTOM ROW: 2-Col Grid - UPDATED (Removed middle box) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      {/* Box 1: Migration (Yellow) - UPSIZED & BOLDER */}
                      <div className="bg-blackline-yellow p-8 rounded-2xl flex flex-col justify-center h-full shadow-md text-left">
                        <p className="font-black text-xl mb-3">Launched Migration to S/4HANA</p>
                        <p className="text-lg leading-snug font-medium">Reallocated 200+ F&A resources to SAP S/4HANA migration effort</p>
                      </div>

                      {/* Box 3: Scalable Compliance (Yellow) - UPSIZED & BOLDER */}
                      <div className="bg-blackline-yellow p-8 rounded-2xl flex flex-col justify-center h-full shadow-md text-left">
                        <p className="font-black text-xl mb-3">Scalable Compliance</p>
                        <p className="text-lg leading-snug font-medium">Automated 84% of reconciliations</p>
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
               
               {/* Video Container */}
               <div className="w-full aspect-video mb-12 rounded-[3rem] overflow-hidden shadow-2xl border-2 border-zinc-800 relative bg-zinc-900">
                  {showVideo ? (
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/sFReEiNEGQY?autoplay=1&modestbranding=1&rel=0" 
                      title="BlackLine Executive Keynote"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div 
                      onClick={() => setShowVideo(true)} 
                      className="w-full h-full relative flex flex-col items-center justify-center group cursor-pointer hover:border-blackline-yellow/50 transition-all duration-500"
                    >
                       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"></div>
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                       <div className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-blackline-yellow group-hover:text-black transition-all">
                          <Play size={32} fill="currentColor" />
                       </div>
                       <div className="absolute bottom-10 left-10 text-left z-10">
                          <p className="text-white font-bold text-2xl italic tracking-tight">Executive Leadership Team</p>
                       </div>
                    </div>
                  )}
                </div>
            </div>
         </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="min-h-screen w-full max-w-[2000px] mx-auto pb-32 animate-fade-in px-4 md:px-6 pt-6 md:pt-10 bg-black">
         <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 mb-4 md:mb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"><ArrowLeft size={16} /> Back to Menu</button>
         <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 md:mb-12 uppercase italic">Value Drivers <span className="text-blackline-yellow">Framework</span></h2>
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
      <div className="min-h-screen w-full bg-black text-white animate-fade-in py-12 md:py-20 px-4 md:px-6">
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
      <div className="min-h-screen w-full bg-black text-white animate-fade-in flex flex-col items-center justify-center py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-14"><HelpCircle size={14} /> Methodology Briefing</div>
           <h2 className="text-5xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter mb-20">The Teaching <span className="text-blackline-yellow">System</span></h2>
           
           {/* REPLACED LARGE FRAMEWORK BOXES WITH NEW VISUAL COMPONENTS */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-10 text-left">
              <div className="col-span-1 md:col-span-3">
                  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] h-full flex flex-col justify-between hover:border-red-500/50 transition-all gap-8">
                      <div>
                          <div className="text-red-500 font-black text-4xl mb-4">01</div>
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8">Align on Strategic Priorities</h3>
                          {/* UPDATED: Visual First */}
                          <div className="mb-8">
                             <PainPulseGrid items={["Unlocking Strategic Capacity", "M&A Fueled Revenue Growth", "Reliance on Institutional Heroics", "Data Blindness"]} />
                          </div>
                          {/* UPDATED: Text Last, Smaller Font */}
                          <p className="text-white font-medium text-lg mt-auto border-t border-zinc-800 pt-8 leading-relaxed">
                            Stop selling 'process improvements' and start solving board-level problems. Frame the manual status quo as an active anchor dragging down their specific growth, M&A, or margin goals.
                          </p>
                      </div>
                  </div>
              </div>
              
              <div className="col-span-1 md:col-span-3">
                   <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[3rem] h-full flex flex-col justify-between hover:border-blue-500/50 transition-all gap-8">
                      <div>
                          <div className="text-blue-500 font-black text-4xl mb-4">02</div>
                          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8">Discover Challenges</h3>
                          {/* UPDATED: Visual First */}
                          <div className="mb-8">
                             <SpotlightCards items={["How long does your close take?", "Do you trust the numbers on Day 1?", "What is the cost of attrition?"]} />
                          </div>
                          {/* UPDATED: Text Last, Smaller Font */}
                          <p className="text-white font-medium text-lg mt-auto border-t border-zinc-800 pt-8 leading-relaxed">
                            Move beyond technical requirements. Uncover the 'Cost of Inertia' — the specific, compounding daily friction that makes 'doing nothing' the most expensive decision they can make.
                          </p>
                      </div>
                   </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-blackline-yellow/50 transition-all gap-6">
                      <div>
                          <div className="text-blackline-yellow font-black text-4xl mb-4">03</div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Connect Capabilities to Benefits</h3>
                          {/* UPDATED: Visual First */}
                          <div className="mb-8">
                             <CapabilityStack items={["Unified Data", "Auto-Matching", "Controls"]} />
                          </div>
                          {/* UPDATED: Text Last, Smaller Font */}
                          <p className="text-white font-medium text-lg mt-auto border-t border-zinc-800 pt-6 leading-relaxed">
                             Build the bridge. Move from <strong>Features</strong> to <strong>Benefits</strong>. Demonstrate the mechanical linkage between a platform capability (e.g., Auto-Matching) and the specific outcome they crave (e.g., Speed).
                          </p>
                      </div>
                   </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-green-500/50 transition-all gap-6">
                      <div>
                          <div className="text-green-500 font-black text-4xl mb-4">04</div>
                          <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-8 leading-tight">Align on Value & Validate Business Case Logic</h3>
                          {/* UPDATED: Visual First */}
                          <div className="mb-8">
                             <LogicFlow metrics={[
                                { statement: "Scale Without Headcount", context: "MECHANISM: EFFICIENCY × GROWTH" }, 
                                { statement: "Fund Growth Internally", context: "MECHANISM: CASH VELOCITY × WACC" }, 
                                { statement: "Insulate the P&L from Risk", context: "MECHANISM: RISK PROBABILITY × IMPACT" }
                              ]} />
                          </div>
                          {/* UPDATED: Text Last, Smaller Font */}
                          <p className="text-white font-medium text-lg mt-auto border-t border-zinc-800 pt-6 leading-relaxed">
                             Translate <strong>Benefits</strong> into <strong>Economic Value</strong>. Co-author the mechanism with the customer (e.g., Efficiency × Growth) before calculating the result.
                          </p>
                      </div>
                   </div>
              </div>
              
              <div className="col-span-1 md:col-span-2">
                   <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[3rem] h-full flex flex-col justify-between hover:border-purple-500/50 transition-all gap-6">
                      <div>
                          <div className="text-purple-500 font-black text-4xl mb-4">05</div>
                          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8">Quantify the Impact</h3>
                          {/* UPDATED: Visual First */}
                          <div className="bg-zinc-800 p-8 rounded-2xl text-center border border-zinc-700 mx-auto w-full max-w-sm shadow-2xl mb-8">
                              <Coins className="text-blackline-yellow mx-auto mb-4 w-10 h-10" />
                              <span className="text-white font-black text-4xl tracking-tighter block mb-2">$25-50M</span>
                              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">Projected Benefit</p>
                          </div>
                          {/* UPDATED: Text Last, Smaller Font */}
                          <p className="text-white font-medium text-lg mt-auto border-t border-zinc-800 pt-6 leading-relaxed">
                             The Output. Translate the agreed logic into a defensible financial projection. Deliver a CFO-ready asset that clearly articulates P&L impact, cash flow velocity, and risk avoidance.
                          </p>
                      </div>
                   </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-20">
              <button onClick={() => setViewMode('persona_explain')} className="px-8 py-4 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 uppercase italic border border-zinc-700">Back to Personas</button>
              <button onClick={() => { setActivePov('executive'); setViewMode('detail'); window.scrollTo({ top: 0, behavior: 'instant' }); }} className="px-10 py-6 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 shadow-xl flex items-center justify-center gap-4 uppercase italic">Start Driver Tour <ArrowRight size={24} /></button>
           </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'detail' && activeDriver) {
    const pov = activePov === 'executive' ? activeDriver?.executivePov : activeDriver?.operationalPov;
    const roiItems = activeDriver?.executivePov?.roiCalculations?.[activePov];
      
    if (!pov) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Driver data incomplete. <button onClick={() => setViewMode('grid')} className="ml-4 underline">Back</button></div>;

    const PovSwitcher = () => (
      <div className="bg-zinc-900 p-2 rounded-3xl inline-flex flex-col md:flex-row border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)]">
        <button onClick={() => { setActivePov('executive'); setTimeout(scrollToPhase1, 50); setPhase3Focus('capabilities'); }} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black scale-105' : 'text-zinc-400'}`}>Executive</button>
        <button onClick={() => { setActivePov('operational'); setTimeout(scrollToPhase1, 50); setPhase3Focus('capabilities'); }} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black scale-105' : 'text-zinc-400'}`}>Operational</button>
      </div>
    );

    return (
      <div className="min-h-screen w-full bg-black text-white animate-fade-in pb-40 md:scale-[0.8] md:origin-top overflow-visible">
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
              <h1 className="text-4xl md:text-[10rem] font-black tracking-tighter mb-16 leading-[0.9] italic uppercase">{activeDriver.title}</h1>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-14 rounded-[3rem] shadow-2xl mb-16 text-left max-w-4xl mx-auto">
                 <h4 className="text-blackline-yellow font-black text-sm uppercase tracking-[0.4em] mb-4 flex items-center gap-3"><Sparkles size={18} /> Why does this even matter?</h4>
                 <p className="text-lg md:text-3xl text-white font-light leading-relaxed italic">"{activeDriver.summary}"</p>
              </div>
              <div className="flex justify-center mb-16"><PovSwitcher /></div>
           </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-10 space-y-16 md:space-y-32 pb-20">
           {/* PHASE 1: ALIGN ON STRATEGIC PRIORITIES */}
           <div ref={phase1Ref} className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h4 className="text-red-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 01: Align on Strategic Priorities</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-10 uppercase italic tracking-tighter leading-[0.9]">The Cost of Inaction</h5>
              
              <div className="w-full flex justify-center mb-8">
                 {renderDriverVisual(activeDriver.id)}
              </div>
              
              {!['process', 'ai_ops', 'working_cap', 'trust', 'ma', 'compliance', 'talent', 'innovation', 'decision'].includes(activeDriver.id) && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 mt-8 text-left">
                  {pov?.createValue?.pains?.map((p: string, i: number) => (<div key={i} className="bg-black/40 border border-zinc-800 p-6 md:p-8 rounded-3xl flex gap-6 items-start"><div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500"><AlertTriangle size={20} /></div><p className="text-zinc-100 text-xl md:text-3xl font-medium leading-relaxed">{p}</p></div>))}
                </div>
              )}

              <div className="pt-12 border-t border-zinc-800/50 text-center"><p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-10">Strategic Focus Point</p><p className="text-2xl md:text-4xl text-white font-medium italic leading-relaxed">"{pov?.createValue?.focus}"</p></div>
           </div>

           {/* PHASE 2: DISCOVER CHALLENGES */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <h4 className="text-blue-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 02: Discover Challenges</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov?.captureValue?.title}</h5>
              <div className="space-y-6 md:space-y-8 mb-16">{pov?.captureValue?.questions?.map((q: string, i: number) => (<div key={i} className={`flex gap-6 justify-center`}><div className={`relative max-w-4xl p-6 md:p-10 rounded-[2rem] ${i % 2 === 0 ? 'bg-zinc-800 text-white rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none shadow-xl'}`}><p className="text-xl md:text-3xl font-medium italic leading-relaxed text-white">{q}</p></div></div>))}</div>
           </div>
           
           {/* PHASE 3: CONNECT CAPABILITIES TO BENEFITS */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center transition-all">
              
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-3 h-3 bg-blackline-yellow rounded-full animate-pulse"></div>
                <h4 className="text-blackline-yellow font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 03: Connect Capabilities to Benefits</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov?.deliverValue?.title}</h5>

              <div className="flex justify-center mb-12">
                 <div className="bg-zinc-950 p-2 rounded-full border border-zinc-800 inline-flex gap-2">
                    <button 
                        onClick={() => setPhase3Focus('capabilities')}
                        className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${phase3Focus === 'capabilities' ? 'bg-blackline-yellow text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                        Capabilities
                    </button>
                    <button 
                        onClick={() => setPhase3Focus('proof')}
                        className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${phase3Focus === 'proof' ? 'bg-blackline-yellow text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                        Benefits
                    </button>
                 </div>
              </div>
              
              <div className="flex flex-col xl:flex-row gap-6 w-full h-full min-h-[500px]">
                  
                  {/* LEFT: Capabilities */}
                  <div 
                    onClick={() => setPhase3Focus('capabilities')}
                    className={`rounded-3xl border p-8 flex flex-col items-center transition-all duration-700 ease-in-out cursor-pointer relative overflow-hidden
                        ${phase3Focus === 'capabilities' 
                          ? 'flex-[2] bg-zinc-800/80 border-zinc-600 opacity-100 scale-100 shadow-2xl' 
                          : 'flex-[1] bg-zinc-900/60 border-zinc-800 opacity-70 hover:opacity-100 scale-95'}`}
                  >
                     <span className={`text-xs font-black uppercase tracking-[0.5em] mb-8 transition-colors ${phase3Focus === 'capabilities' ? 'text-blackline-yellow' : 'text-zinc-300'}`}>Platform Capabilities</span>
                     
                     <div className="flex flex-wrap gap-6 justify-center content-center h-full">
                       {pov?.deliverValue?.capabilities?.map((c: string) => {
                         const parts = c.split('->');
                         const feature = parts[0]?.trim();
                         const benefit = parts[1]?.trim();

                         return (
                           <div key={c} className={`px-8 py-5 rounded-full border font-bold shadow-lg flex items-center gap-4 transition-all
                              ${phase3Focus === 'capabilities' 
                                ? 'bg-zinc-900 border-zinc-500 text-white text-xl hover:scale-105' 
                                : 'bg-transparent border-zinc-800 text-zinc-300 text-sm'}`}>
                              <div className={`rounded-full transition-all ${phase3Focus === 'capabilities' ? 'w-3 h-3 bg-blackline-yellow' : 'w-2 h-2 bg-zinc-700'}`}></div>
                              {benefit ? (
                                <span>
                                  {feature} <span className="text-zinc-500 font-normal px-1">→</span> <span className="text-blackline-yellow font-normal italic">{benefit}</span>
                                </span>
                              ) : (
                                feature
                              )}
                           </div>
                         );
                       })}
                     </div>
                     {phase3Focus !== 'capabilities' && <div className="absolute inset-0 flex items-center justify-center bg-black/10"><Maximize2 className="text-zinc-500 opacity-0 group-hover:opacity-100" /></div>}
                  </div>

                  {/* RIGHT: Benefits */}
                  <div 
                    onClick={() => setPhase3Focus('proof')}
                    className={`rounded-3xl border p-8 flex flex-col items-center transition-all duration-700 ease-in-out cursor-pointer relative overflow-hidden
                        ${phase3Focus === 'proof' 
                          ? 'flex-[2] bg-zinc-800/80 border-zinc-600 opacity-100 scale-100 shadow-2xl' 
                          : 'flex-[1] bg-zinc-900/60 border-zinc-800 opacity-70 hover:opacity-100 scale-95'}`}
                  >
                     <span className={`text-xs font-black uppercase tracking-[0.5em] mb-8 transition-colors ${phase3Focus === 'proof' ? 'text-green-500' : 'text-zinc-300'}`}>Benefits</span>
                     
                     <div className="space-y-6 w-full max-w-xl flex flex-col justify-center h-full">
                       {pov?.deliverValue?.performanceStats?.map((p: string, i: number) => (
                         <div key={i} className={`flex items-start gap-6 p-6 rounded-2xl border transition-all
                            ${phase3Focus === 'proof'
                              ? 'bg-white/5 border-zinc-700 text-white'
                              : 'bg-transparent border-transparent text-zinc-300'}`}>
                            <div className={`rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${phase3Focus === 'proof' ? 'w-10 h-10 bg-green-500/20 text-green-500' : 'w-6 h-6 bg-zinc-800 text-zinc-500'}`}>
                              <CheckCircle2 size={phase3Focus === 'proof' ? 24 : 16} />
                            </div>
                            <span className={`font-bold leading-snug transition-all ${phase3Focus === 'proof' ? 'text-2xl' : 'text-sm'}`}>{p}</span>
                         </div>
                       ))}
                     </div>
                  </div>
              </div>
           </div>

           {/* PHASE 4: ALIGN ON VALUE AND VALIDATE BUSINESS CASE LOGIC */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className="text-green-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 04: Align on Value & Validate Logic</h4>
              </div>
              
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">
                Validating the Financial Impact
              </h5>
              
              {activeDriver.id === 'trust' || activeDriver.id === 'compliance' ? (
                <div className="mb-12"><HouseFireVisual /></div>
              ) : null}

              <p className="text-zinc-300 text-2xl font-black uppercase tracking-widest mb-8"> </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left mb-16">
                {pov?.justifyValue?.metrics?.map((m: string, i: number) => {
                  const isLastItem = i === (pov.justifyValue.metrics?.length || 0) - 1;
                  const isOddTotal = (pov.justifyValue.metrics?.length || 0) % 2 !== 0;
                  
                  return (
                    <div key={i} className={`p-8 md:p-12 bg-black/50 rounded-[3rem] border border-zinc-800 hover:border-green-500/40 shadow-xl flex items-center justify-center text-center gap-6 ${isOddTotal && isLastItem ? 'md:col-span-2' : ''}`}>
                      <div className="flex flex-col items-center gap-4">
                          <TrendingUp className="text-green-500 w-12 h-12 opacity-50 mb-2" />
                          <p className="text-2xl md:text-3xl font-black text-white tracking-tight italic leading-snug">{m}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="w-full">
                  <p className="text-zinc-300 text-2xl font-black uppercase tracking-widest mb-12"> Customer Outcomes</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pov?.justifyValue?.successStories?.map((story: string, i: number) => {
                          const isLastItem = i === (pov.justifyValue.successStories?.length || 0) - 1;
                          const isOddTotal = (pov.justifyValue.successStories?.length || 0) % 2 !== 0;

                          return (
                              <div key={i} className={`bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 text-center ${isOddTotal && isLastItem ? 'md:col-span-2' : ''}`}>
                                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 shrink-0 mb-2">
                                      <Trophy size={24} />
                                  </div>
                                <p className="text-white text-2xl md:text-3xl font-medium leading-relaxed">{story}</p>
                              </div>
                          );
                      })}
                  </div>
              </div>
           </div>

           {/* PHASE 5: QUANTIFY THE IMPACT */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center text-center">
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <h4 className="text-purple-500 font-black text-xs md:text-lg uppercase tracking-[0.3em]">Phase 05: Quantify the Impact</h4>
              </div>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">ROI & Realization</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                {roiItems && roiItems.length > 0 ? (roiItems.map((item: any, i: number) => {
                  const isLastItem = i === roiItems.length - 1;
                  const isOddTotal = roiItems.length % 2 !== 0;

                  return (
                    <div key={i} className={`bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl group hover:border-blackline-yellow/50 transition-all relative ${isOddTotal && isLastItem ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''}`}>
                      <div className="absolute top-0 left-0 w-full h-1 bg-blackline-yellow"></div>
                      <div className="p-8 pt-10 flex flex-col items-center text-center">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <h6 className="text-3xl font-black text-white italic">{item.label}</h6>
                          <Coins className="text-blackline-yellow w-8 h-8" />
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-zinc-800 mb-6 font-mono text-2xl text-zinc-300 flex flex-wrap gap-3 items-center justify-center">
                          {item.formula.map((part: string, idx: number) => (
                            <span key={idx} className={['×', '÷', '+', '-', 'vs', 'to', '→'].includes(part) ? "text-yellow-500 font-bold" : ""}>{part}</span>
                          ))}
                        </div>
                        <p className="text-white text-xl leading-relaxed max-w-2xl">{item.desc}</p>
                      </div>
                    </div>
                  );
                })) : (
                  <div className="col-span-2 text-center text-zinc-500 italic py-20 bg-black/20 rounded-3xl">ROI Calculation data unavailable.</div>
                )}
              </div>
           </div>

           <div className="flex flex-col items-center gap-8 pt-10 border-t border-zinc-800/50 mt-16">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Switch Perspective</span>
              <PovSwitcher />
           </div>
        </div>
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-8 no-print justify-center"><button onClick={handlePrevDriver} className="px-14 py-8 bg-zinc-900 border border-zinc-800 text-white rounded-full font-black uppercase italic hover:bg-zinc-800 transition-all shadow-2xl flex items-center gap-4"><ChevronLeft size={16} /> Prev</button><button onClick={handleNextDriver} className="px-16 py-8 bg-blackline-yellow text-black rounded-full font-black uppercase italic hover:scale-105 transition-all shadow-2xl border-4 border-black flex items-center gap-4">Next <ChevronRight size={16} /></button></div>
      </div>
    );
  }

  // --- MISSING 'letsgo_bva' VIEW RESTORED AND UPDATED ---
  if (viewMode === 'letsgo_bva') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 animate-fade-in relative">
          <button onClick={() => setViewMode('landing')} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={32}/></button>
          <div className="max-w-4xl w-full">
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full bg-blackline-yellow/10 border border-blackline-yellow/30 text-blackline-yellow text-sm font-bold uppercase tracking-widest">
                  <Rocket size={16} />
                  <span>Activation Phase</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter italic uppercase">
                  Ready to <span className="text-blackline-yellow">Go Get?</span>
              </h1>
              <p className="text-xl md:text-3xl text-zinc-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                  More enablement coming in Q1.
              </p>
          </div>
      </div>
    )
  }

  return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h1 className="text-2xl font-bold mb-4">Content Not Found</h1><button onClick={onClose} className="px-6 py-2 bg-zinc-800 rounded-lg">Return to Home</button></div>;
};

const SimplePersonaCard: React.FC<{ role: string, icon: string, nightmare: string, aspiration: string }> = ({ role, icon, nightmare, aspiration }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-zinc-500 transition-all flex flex-col h-full group shadow-xl items-center text-center">
       <div className="flex flex-col items-center gap-4 mb-8">
           <div className="flex items-center justify-center gap-6 mb-8">
               <div className="p-4 bg-black rounded-2xl border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-all shrink-0"><SafeIcon name={icon} className="w-9 h-9" /></div>
               <h4 className="text-white font-black text-2xl uppercase tracking-wider leading-tight">{role}</h4>
           </div>
       </div>
       <div className="space-y-8 flex-grow">
           <div className="space-y-3">
               <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] flex items-center justify-center gap-3"><Stars size={16} /> Aspiration</p>
               <p className="text-lg text-zinc-100 leading-relaxed font-bold">"{aspiration}"</p>
           </div>
           <div className="space-y-3">
               <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center justify-center gap-3"><Ghost size={16} /> Nightmare</p>
               <p className="text-lg text-zinc-100 leading-relaxed font-bold italic">"{nightmare}"</p>
           </div>
       </div>
    </div>
  );
};

const LargeFrameworkBox: React.FC<{ step: string, color: string, title: string, subtitle: string, formula: string, desc: string }> = ({ step, color, title, subtitle, formula, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-14 rounded-[3.5rem] flex flex-col justify-between hover:border-zinc-500 shadow-xl group h-full gap-6">
     <div>
       <div className={`w-16 h-16 rounded-[1.2rem] bg-${color}/20 text-${color} flex items-center justify-center mb-8 font-black text-3xl group-hover:scale-110 transition-transform shadow-lg shrink-0`}>{step}</div>
       <h4 className="text-3xl font-black uppercase text-white mb-1 tracking-widest italic">{title}</h4>
       <p className={`text-${color} text-xs font-black uppercase tracking-[0.2em] mb-6`}>{subtitle}</p>
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
         {/* UPDATED: Center Alignment & Text Size */}
         <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center h-full">
            <div className="flex items-center justify-center mb-6"><div className="w-12 h-12 bg-zinc-900/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-zinc-700 group-hover:border-blackline-yellow transition-colors shrink-0"><SafeIcon name={driver.icon} className="w-6 h-6" /></div></div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-blackline-yellow transition-colors leading-tight uppercase italic tracking-tighter">{driver.title}</h3>
            <button onClick={() => onSelect(driver.id)} className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blackline-yellow hover:text-black hover:border-blackline-yellow transition-all flex items-center justify-center gap-2 mt-auto"><HelpCircle size={14} /> Explain Driver</button>
         </div>
      </div>
   );
};

const GridSectionHeader: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => (
    <div className="flex flex-col items-center text-center gap-2 mb-2"><h3 className="text-xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-4 italic text-center leading-tight"><div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>{title}<div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div></h3><p className="text-sm font-bold text-zinc-200 uppercase tracking-widest px-2">{subtitle}</p></div>
);

const PhaseCard: React.FC<{ step: string, title: string, label: string, color: string, desc: string }> = ({ step, title, label, color, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-zinc-700 transition-all text-left">
     <div className={`absolute top-0 left-0 w-2 h-full bg-${color}`}></div>
     <div className="text-8xl font-black opacity-[0.03] absolute top-2 right-6 pointer-events-none group-hover:opacity-[0.07]">{step}</div>
     <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter max-w-2xl">{title}</h3>
     <p className={`text-${color} text-xs font-black uppercase tracking-[0.2em] mb-6`}>{label}</p>
     <div className="h-px bg-zinc-800 w-full mb-6"></div>
     <p className="text-zinc-100 leading-relaxed text-lg font-medium">{desc}</p>
  </div>
);
