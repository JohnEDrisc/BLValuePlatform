import React, { useState, useEffect, useMemo } from 'react';
import { SKO_DATA as GLOBAL_SKO_DATA } from '../constants'; 
import { UIStrings, SkoDriverDetail, SkoPovContent } from '../types';
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
  Map, 
  Quote, 
  Video, 
  Sparkles, 
  Search, 
  ShieldAlert, 
  ArrowUpRight, 
  Trophy, 
  Coins, 
  Cpu, 
  Target, 
  BookOpen, 
  HelpCircle, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  User, 
  Activity, 
  Ghost, 
  Stars, 
  Layout, 
  LogOut, 
  ChevronDown,
  Calculator,
  Equal,
  Plus,
  Minus,
  MessageCircle,
  AlertTriangle,
  X as Multiply
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

// Define the precise order for the UX sequence here
const ORDERED_IDS = [
  // Cluster 1: P&L (Working Cap first, then Process)
  'working_cap', 
  'process',
  
  // Cluster 2: Acceleration (Innovation is 3rd)
  'talent',
  'ma',
  'innovation', 
  'compliance',
  'decision',
  
  // Cluster 3: Enterprise Value
  'trust',
  'ai_ops'
];

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'grid' | 'persona_explain' | 'framework_explain' | 'detail' | 'video' | 'letsgo_bva'>('landing');
  const [activeDriverId, setActiveDriverId] = useState<string | null>(null);
  const [activePov, setActivePov] = useState<'executive' | 'operational'>('executive');

  // Create a sorted version of data based on the new desired UX sequence
  const sortedDrivers = useMemo(() => {
    return ORDERED_IDS.map(id => GLOBAL_SKO_DATA.find(d => d.id === id)).filter(Boolean) as SkoDriverDetail[];
  }, []);

  const activeDriver = sortedDrivers.find(d => d.id === activeDriverId);

  // Scroll to top when view mode or narrative changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewMode, activeDriverId, activePov]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); 
    setActiveDriverId(id);
    setViewMode('detail');
  };

  const handleNextDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const nextIndex = (currentIndex + 1) % sortedDrivers.length;
    setActivePov('executive'); 
    setActiveDriverId(sortedDrivers[nextIndex].id);
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + sortedDrivers.length) % sortedDrivers.length;
    setActivePov('executive');
    setActiveDriverId(sortedDrivers[prevIndex].id);
  };

  // Filter groups based on the sorted list
  const plImpactDrivers = sortedDrivers.filter(d => ['working_cap', 'process'].includes(d.id));
  const accelerationDrivers = sortedDrivers.filter(d => ['talent', 'ma', 'innovation', 'compliance', 'decision'].includes(d.id));
  const valueDrivers = sortedDrivers.filter(d => ['trust', 'ai_ops'].includes(d.id));

  // Split Acceleration Drivers for the 2-column layout
  const accelDriversPart1 = accelerationDrivers.slice(0, 3); // Top 3
  const accelDriversPart2 = accelerationDrivers.slice(3);    // Bottom 2

  // --- LANDING VIEW ---
  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-4 right-4 md:top-0 md:right-0 p-4 md:p-8 text-gray-400 hover:text-white transition-colors z-50">
           <X size={28} />
         </button>
         
         <div className="text-center py-12 md:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blackline-yellow/20 border border-blackline-yellow/50 text-blackline-yellow text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8 animate-pulse">
               <Rocket size={12} /> SKO 26 Sales Playbook
            </div>
            <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-white mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]">
              #LETSGO <span className="text-blackline-yellow">GET</span>
            </h1>
            <p className="text-xl md:text-3xl text-zinc-200 font-light max-w-2xl mx-auto px-4 mb-8 md:mb-12">
               The definitive playbook for pivoting from <span className="text-white font-bold">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full pb-16 md:pb-24 px-4 md:px-6">
             <div onClick={() => setViewMode('video')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blackline-yellow/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blackline-yellow group-hover:text-black group-hover:border-blackline-yellow transition-all">
                      <Play size={24} className="md:w-8 md:h-8" fill="currentColor" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Executive Commentary</h3>
                </div>
             </div>
             <div onClick={() => setViewMode('grid')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 h-[250px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 md:p-8 text-center">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 md:mb-6 border border-white/20 group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-500 transition-all">
                      <LayoutGrid size={24} className="md:w-8 md:h-8" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Explore Drivers</h3>
                </div>
             </div>
         </div>
      </div>
    );
  }

  // --- VIDEO VIEW ---
  if (viewMode === 'video') {
    return (
      <div className="min-h-screen bg-black flex flex-col animate-fade-in relative pb-32">
         <div className="flex justify-between items-center px-4 md:px-8 py-6">
            <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
               <ArrowLeft size={16} /> Back
            </button>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors">
               <X size={24} />
            </button>
         </div>
         
         <div className="max-w-4xl mx-auto w-full px-4 md:px-6 flex flex-col gap-8 md:gap-12 pt-4 md:pt-8">
            <div className="text-center mb-4 md:mb-6">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2 md:mb-4">Executive Commentary</h2>
               <p className="text-gray-300 font-medium uppercase tracking-widest text-xs">Voices of Value & Vision</p>
            </div>

            <div className="flex flex-col gap-8 md:gap-12">
               {/* Exxon Section */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blackline-yellow/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-gradient-to-r from-red-600 via-blue-600 to-red-600"></div>
                  <div className="p-6 md:p-10 flex-grow relative">
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                         <div className="flex items-center gap-4">
                            <div className="p-2 md:p-3 bg-white rounded-xl shadow-lg flex items-center justify-center">
                               <span className="text-black font-black text-lg md:text-xl tracking-tighter uppercase italic">Exxon</span>
                            </div>
                            <div>
                               <h4 className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter leading-none">Customer Voice</h4>
                               <p className="text-blackline-yellow text-[10px] font-bold uppercase tracking-[0.2em] mt-1">ExxonMobil Corporation</p>
                            </div>
                         </div>
                      </div>

                      <div className="relative px-2 md:px-4">
                          <span className="text-blackline-yellow font-serif text-6xl md:text-7xl absolute -left-4 md:-left-8 -top-8 opacity-40">"</span>
                          <div className="space-y-6 md:space-y-8 relative z-10">
                            
                            {/* Implementation */}
                            <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light italic">
                               "We recently did a larger implementation of a software platform called <strong className="text-white font-bold">BlackLine</strong>.
                            </p>
                            
                            {/* Complexity */}
                            <div className="border-l-4 border-zinc-700 pl-6 py-1">
                                <p className="text-lg md:text-2xl text-zinc-300 leading-relaxed font-light italic">
                                   If you think about an organization the size of ExxonMobil...
                                </p>
                            </div>

                            {/* Capacity / Impact */}
                            <div className="relative bg-black/40 p-6 md:p-8 rounded-2xl border border-blackline-yellow/20">
                                <p className="text-xl md:text-3xl text-white font-black italic leading-tight uppercase tracking-tight">
                                   Moving to a platform [like this] <span className="text-blackline-yellow">literally enabled us to save tens of thousands of hours</span> in terms of people’s time."
                                </p>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="p-6 md:p-10 pt-0 mt-auto border-t border-zinc-800/50 bg-black/20">
                      <div className="flex items-center gap-4 pt-4 md:pt-6">
                         <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl flex items-center justify-center font-black text-white border border-zinc-600 text-sm md:text-base">KM</div>
                         <div>
                            <p className="text-white font-black text-sm md:text-base tracking-tight">Kathryn Mikells</p>
                            <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">CFO, ExxonMobil</p>
                         </div>
                      </div>
                  </div>
               </div>

               {/* Video Section */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blue-500/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-blackline-yellow"></div>
                  <div className="p-6 md:p-10 flex-grow relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
                      <div className="relative z-10">
                         <div className="flex items-center justify-between mb-6 md:mb-8 pb-6 border-b border-zinc-800">
                            <div className="flex items-center gap-4">
                               <div className="p-2 md:p-3 bg-blackline-yellow rounded-xl shadow-lg flex items-center justify-center text-black">
                                  <Video size={20} className="md:w-6 md:h-6" />
                                </div>
                               <div>
                                  <h4 className="text-lg md:text-xl font-black text-white uppercase italic tracking-tighter leading-none">Strategic Vision</h4>
                               </div>
                            </div>
                         </div>
                         <div className="aspect-video bg-black/60 rounded-2xl border border-zinc-700 mb-6 md:mb-8 flex flex-col items-center justify-center group/vid cursor-pointer">
                            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20 group-hover/vid:bg-blackline-yellow group-hover/vid:text-black transition-all">
                               <Play size={24} className="md:w-8 md:h-8" fill="currentColor" />
                            </div>
                            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-gray-400 group-hover/vid:text-white transition-colors">Hear from BL Execs</span>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  if (viewMode === 'grid') {
    return (
      <div className="w-full max-w-[2000px] mx-auto pb-32 animate-fade-in px-4 md:px-6 pt-6 md:pt-10">
         <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4 md:gap-8">
            <div className="text-left">
               <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 mb-4 md:mb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Back to Menu
               </button>
               <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 md:mb-4 uppercase italic">
                  Value Drivers <span className="text-zinc-600">Framework</span>
               </h2>
            </div>
         </div>

         {/* Layout: 3 Columns. Middle Column uses a special grid for X shape */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-16 items-start">
            
            {/* Column 1: P&L Impact */}
            <div className="space-y-8">
                <GridSectionHeader title="P&L Bottom Line Impact" subtitle="Directly influencing profitability" />
                <div className="flex flex-col gap-6">
                    {plImpactDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}
                </div>
            </div>

            {/* Column 2: Acceleration (X-Shape Layout) */}
            <div className="space-y-8">
               <div className="flex flex-col items-center text-center gap-2">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] flex items-center gap-2 md:gap-4 italic text-center leading-tight">
                     <div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>Acceleration & Resilience<div className="hidden md:block h-1 w-8 bg-blackline-yellow shrink-0"></div>
                  </h3>
                  <p className="text-xs md:text-sm font-bold text-zinc-200 uppercase tracking-widest px-4">Driving speed & risk mitigation</p>
               </div>
               
               {/* X SHAPE GRID */}
               <div className="grid grid-cols-2 gap-4">
                   {/* Top Row: Talent & M&A */}
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[0]} onSelect={handleDriverSelect} />
                   </div>
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[1]} onSelect={handleDriverSelect} />
                   </div>

                   {/* Middle Row: Innovation (Centered) */}
                   <div className="col-span-2 flex justify-center py-2">
                       {/* Constrain width to approx 50% + gap to make the X shape clear */}
                       <div className="w-[calc(50%-0.5rem)]">
                           <DriverCardHorizontal driver={accelerationDrivers[2]} onSelect={handleDriverSelect} />
                       </div>
                   </div>

                   {/* Bottom Row: Compliance & Decision */}
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[3]} onSelect={handleDriverSelect} />
                   </div>
                   <div className="col-span-1">
                       <DriverCardHorizontal driver={accelerationDrivers[4]} onSelect={handleDriverSelect} />
                   </div>
               </div>
            </div>

            {/* Column 3: Enterprise Value */}
            <div className="space-y-8">
                <GridSectionHeader title="Enhancing Enterprise Value" subtitle="Boosting valuation foundations" />
                <div className="flex flex-col gap-6">
                    {valueDrivers.map((driver) => <DriverCardHorizontal key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}
                </div>
            </div>

         </div>

         <div className="mt-20 md:mt-32 text-center pb-20">
            <button 
               onClick={() => {
                  setActivePov('executive');
                  // Start tour with the first driver in our sorted list
                  setActiveDriverId(sortedDrivers[0].id);
                  setViewMode('persona_explain');
               }}
               className="w-full md:w-auto px-8 md:px-16 py-6 md:py-8 bg-blackline-yellow text-black text-xl md:text-2xl font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto uppercase italic tracking-tighter border-4 border-black"
            >
               <Sparkles size={24} className="md:w-8 md:h-8" /> Start Deep Dive
            </button>
         </div>
      </div>
    );
  }

  // --- PERSONA EXPLAIN VIEW ---
  if (viewMode === 'persona_explain' && activeDriver) {
    const personas = activeDriver.personas || { executive: [], operational: [] };

    return (
      <div className="min-h-screen bg-black text-white animate-fade-in py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto w-full">
           <div className="text-center mb-12 md:mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-10">
                 <Users size={14} /> Persona Alignment
              </div>
              <h2 className="text-4xl md:text-9xl font-black text-white uppercase italic tracking-tighter mb-6 md:mb-10 leading-[0.9] md:leading-[0.8]">
                 Meet the <span className="text-blackline-yellow">Stakeholders</span>
              </h2>
              <p className="text-lg md:text-4xl text-zinc-200 font-light max-w-5xl mx-auto leading-relaxed">
                 Effective value selling mirrors the unique <span className="text-white italic font-bold">aspirations</span> and <span className="text-white italic font-bold underline decoration-purple-500/50 underline-offset-8">nightmares</span>.
              </p>
           </div>

           <div className="space-y-16 md:space-y-24">
              {/* Executive Tier */}
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">
                    Strategic Executive Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {personas.executive.map((p: any, idx: number) => (
                        <SimplePersonaCard key={idx} role={p.role} icon={p.icon} nightmare={p.nightmare} aspiration={p.aspiration} />
                    ))}
                 </div>
              </div>

              {/* Operational Tier */}
              <div>
                 <h3 className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-8 md:mb-12 flex items-center gap-6">
                    Tactical Operational Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    {personas.operational.map((p: any, idx: number) => (
                        <SimplePersonaCard key={idx} role={p.role} icon={p.icon} nightmare={p.nightmare} aspiration={p.aspiration} />
                    ))}
                 </div>
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-20 md:mt-32 pb-20">
              <button onClick={() => setViewMode('grid')} className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Map
              </button>
              <button onClick={() => setViewMode('framework_explain')} className="w-full md:w-auto px-8 md:px-16 py-4 md:py-6 bg-blackline-yellow text-black text-lg font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 uppercase tracking-tighter italic">
                 The Teaching System <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- FRAMEWORK EXPLANATION VIEW ---
  if (viewMode === 'framework_explain' && activeDriver) {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in flex flex-col items-center justify-center py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-8 md:mb-14">
              <HelpCircle size={14} /> Methodology Briefing
           </div>
           <h2 className="text-5xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter mb-8 md:mb-12 leading-tight">
              The Teaching <span className="text-blackline-yellow">System</span>
           </h2>
           <p className="text-xl md:text-4xl text-zinc-200 font-light mb-12 md:mb-24 leading-relaxed max-w-5xl mx-auto">
              Master the pivot from <span className="text-white font-bold italic underline decoration-blackline-yellow">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-10 mb-12 md:mb-24 text-left">
              <div className="col-span-1 md:col-span-3">
                  <LargeFrameworkBox 
                    step="1" color="red-500" title="Create Value" subtitle="Establish the Strategic Gap"
                    formula='Create Value → The Problem'
                    desc={"Move conversation from features to objectives. Define macro-level pains."} 
                  />
              </div>
              <div className="col-span-1 md:col-span-3">
                  <LargeFrameworkBox 
                    step="2" color="blue-500" title="Capture Value" subtitle="Expose the Quantified Reality"
                    formula='Capture Value → The Questions'
                    desc={"Execute high-gain discovery to uncover hidden costs of inertia."} 
                  />
              </div>
              <div className="col-span-1 md:col-span-2">
                  <LargeFrameworkBox 
                    step="3" color="yellow-500" title="Deliver Value" subtitle="Map Outcomes to Platform"
                    formula='Deliver Value → The Capabilities'
                    desc={"Align platform capabilities to specific business outcomes."} 
                  />
              </div>
              <div className="col-span-1 md:col-span-2">
                  <LargeFrameworkBox 
                    step="4" color="green-500" title="Justify Value" subtitle="Build the Economic Case"
                    formula='Justify Value → The Business Case'
                    desc={"Construct a CFO-ready business case with ROI modeling."} 
                  />
              </div>
              <div className="col-span-1 md:col-span-2">
                  <LargeFrameworkBox 
                    step="5" color="purple-500" title="Quantify Value" subtitle="Validate the Win"
                    formula='Quantify Value → The ROI'
                    desc={"Translate operational improvements into hard financial calculations for the CFO."} 
                  />
              </div>
           </div>

           <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              <button onClick={() => setViewMode('persona_explain')} className="w-full md:w-auto px-8 md:px-12 py-4 md:py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Personas
              </button>
              <button onClick={() => { setActivePov('executive'); setViewMode('detail'); }} className="w-full md:w-auto px-10 md:px-20 py-6 md:py-8 bg-blackline-yellow text-black text-lg md:text-xl font-black rounded-full hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-4 uppercase tracking-tighter italic">
                 Start Driver Tour <ArrowRight size={24} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  // --- DETAIL VIEW ---
  if (viewMode === 'detail' && activeDriver) {
    const pov = activePov === 'executive' ? activeDriver.executivePov : activeDriver.operationalPov;
    const IconComponent = (Icons as any)[activeDriver.icon] || Zap;

    // ROI Data Logic
    const roiData = pov.roiCalculations || { executive: [], operational: [] };
    const roiItems = activePov === 'executive' ? roiData.executive : roiData.operational;

    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-40 md:scale-[0.8] md:origin-top overflow-visible">
        {/* Navigation Header */}
        <div className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-zinc-800 px-4 md:px-10 py-4 md:py-6 flex justify-between items-center no-print">
           <div className="flex items-center gap-4 md:gap-8">
              <button onClick={() => setViewMode('grid')} className="text-gray-300 hover:text-white p-2 md:p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-zinc-800 border border-zinc-800 flex items-center gap-2 md:gap-3 font-black uppercase text-[10px] md:text-xs tracking-widest">
                 <LogOut size={16} className="md:w-5 md:h-5" /> <span className="hidden md:inline">Escape Driver</span>
              </button>
              <button onClick={() => setViewMode('letsgo_bva')} className="text-blackline-yellow p-2 md:p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-blackline-yellow hover:text-black border border-blackline-yellow/30 flex items-center gap-2 md:gap-3 font-black uppercase text-[10px] md:text-xs tracking-widest">
                 <span className="hidden md:inline">Next Steps</span> <ArrowRight size={16} className="md:w-5 md:h-5" />
              </button>
              <span className="text-xs md:text-sm font-black text-blackline-yellow uppercase tracking-[0.3em] px-2 md:px-4 border-l border-zinc-800 truncate max-w-[100px] md:max-w-none">{activeDriver.title}</span>
           </div>
           <div className="flex items-center gap-2 md:gap-6">
              <button onClick={handlePrevDriver} className="p-2 md:p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronLeft size={20} className="md:w-6 md:h-6"/></button>
              <button onClick={handleNextDriver} className="p-2 md:p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronRight size={20} className="md:w-6 md:h-6"/></button>
              <button onClick={onClose} className="p-2 md:p-4 text-gray-400 hover:text-white ml-2 md:ml-4"><X size={20} className="md:w-6 md:h-6" /></button>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-10">
           <div className="max-w-6xl mx-auto relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-6 md:p-10 bg-blackline-yellow rounded-[2rem] md:rounded-[2.5rem] text-black mb-8 md:mb-14 shadow-2xl border-4 md:border-8 border-black">
                 <IconComponent size={48} className="md:w-20 md:h-20" strokeWidth={1} />
              </div>
              <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter mb-8 md:mb-10 leading-[0.9] md:leading-[0.8] italic uppercase">{activeDriver.title}</h1>
              {/* REMOVED GREEN TEXT HERO METRIC */}
              
              <div className="flex justify-center mb-16 md:mb-24">
                 <div className="bg-zinc-900 p-2 rounded-3xl inline-flex flex-col md:flex-row border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)] w-full md:w-auto">
                    <button onClick={() => setActivePov('executive')} className={`w-full md:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Executive</button>
                    <button onClick={() => setActivePov('operational')} className={`w-full md:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Operational</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Vertical Focused Content Stack */}
        <div className="max-w-6xl mx-auto px-4 md:px-10 space-y-16 md:space-y-32 pb-20">
           
           {/* Phase 01: Create - Updated to Cards Layout */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[500px] md:min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Layout size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <h4 className="text-red-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                 <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse"></div> Phase 01: Create Value
              </h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.createValue.title}</h5>
              <div className="mb-12 md:mb-16 py-2 md:py-3 px-4 md:px-6 bg-black/40 rounded-xl border border-red-500/20 inline-block w-fit">
                 <span className="text-sm md:text-xl font-mono text-zinc-300">The Problem ("Why change?")</span>
              </div>
              
              {/* REPLACED BULLETS WITH CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
                 {pov.createValue.pains?.map((p: string, i: number) => (
                    <div key={i} className="bg-black/40 border border-zinc-800 p-6 md:p-8 rounded-3xl hover:border-red-500/50 transition-all group/card">
                       <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover/card:bg-red-500 group-hover/card:text-white transition-all text-red-500">
                          <AlertTriangle size={20} />
                       </div>
                       <p className="text-zinc-200 text-lg md:text-xl font-medium leading-relaxed">{p}</p>
                    </div>
                 ))}
              </div>

              <div className="pt-8 md:pt-12 border-t border-zinc-800/50">
                 <p className="text-[10px] md:text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-4 md:mb-6">Strategic Focus Point</p>
                 <p className="text-xl md:text-3xl text-white font-medium italic leading-relaxed">"{pov.createValue.focus}"</p>
              </div>
           </div>

           {/* Phase 02: Capture - Updated to Chat Bubbles */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[500px] md:min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Search size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <h4 className="text-blue-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                 <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full animate-pulse"></div> Phase 02: Capture Value
              </h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-8 md:mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov.captureValue.title}</h5>
              
              {/* REPLACED LIST WITH BUBBLES */}
              <div className="space-y-6 md:space-y-8 mb-10 md:mb-16">
                 {pov.captureValue.questions?.map((q: string, i: number) => (
                    <div key={i} className={`flex gap-6 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                       <div className={`relative max-w-4xl p-6 md:p-10 rounded-[2rem] ${i % 2 === 0 ? 'bg-zinc-800 text-white rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}>
                          <div className="absolute -top-4 -left-2 bg-black border border-zinc-700 rounded-full p-2"><MessageCircle size={16} /></div>
                          <p className="text-xl md:text-3xl font-medium italic leading-relaxed">"{q}"</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Phase 03: Deliver - Updated Capabilities to Pills */}
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[500px] md:min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Zap size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <h4 className="text-blackline-yellow font-black text-xs md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                 <div className="w-2 h-2 md:w-3 md:h-3 bg-blackline-yellow rounded-full animate-pulse"></div> Phase 03: Deliver Value
              </h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.deliverValue.title}</h5>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 md:gap-20 mt-8">
                 <div>
                    <span className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-6 md:mb-10">Platform Activation</span>
                    {/* UPDATED TO PILLS */}
                    <div className="flex flex-wrap gap-3 md:gap-4">
                       {pov.deliverValue.capabilities?.map((c: string) => (
                          <div key={c} className="px-6 py-4 bg-zinc-800 rounded-full border border-zinc-700 text-white font-bold shadow-lg flex items-center gap-3">
                             <div className="w-2 h-2 bg-blackline-yellow rounded-full"></div>
                             {c}
                          </div>
                       ))}
                    </div>
                 </div>
                 <div>
                    <span className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-6 md:mb-10">Validated Proof Points</span>
                    <div className="space-y-4 md:space-y-6">
                       {pov.deliverValue.proofPoints?.map((p: string, i: number) => (
                          <div key={i} className="flex items-center gap-4 md:gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                <CheckCircle2 size={20} />
                             </div>
                             <span className="text-xl md:text-2xl font-bold text-white">{p}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Phase 04: Justify */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[500px] md:min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><TrendingUp size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <h4 className="text-green-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                 <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse"></div> Phase 04: Justify Value
              </h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.justifyValue.title}</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 mt-8">
                 {pov.justifyValue.metrics?.slice(0, 4).map((m: string, i: number) => (
                    <div key={i} className="p-8 md:p-12 bg-black/50 rounded-[2rem] md:rounded-[3rem] border border-zinc-800 hover:border-green-500/40 transition-all shadow-xl group/metric flex items-center gap-6">
                       <TrendingUp className="text-green-500 w-8 h-8 shrink-0 opacity-50 group-hover/metric:opacity-100 transition-opacity" />
                       <p className="text-2xl md:text-4xl font-black text-white tracking-tight leading-[1.1] group-hover/metric:text-green-400 transition-colors italic">{m}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Phase 05: ROI & Realization (Toggle Logic Enabled) */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[500px] md:min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Calculator size={200} className="md:w-[400px] md:h-[400px]" /></div>
              <h4 className="text-purple-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
                 <div className="w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-pulse"></div> Phase 05: Quantify the Win
              </h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">ROI & Realization</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                 {roiItems && roiItems.length > 0 ? (
                    roiItems.map((item: any, i: number) => (
                        <div key={i} className={`bg-zinc-800/50 border-l-4 ${activePov === 'executive' ? 'border-purple-500' : 'border-zinc-500'} p-8 md:p-12 rounded-r-[2rem] flex flex-col justify-between`}>
                            <div>
                                <h6 className={`${activePov === 'executive' ? 'text-purple-400' : 'text-zinc-400'} font-black text-xs md:text-sm uppercase tracking-[0.2em] mb-6`}>{item.label}</h6>
                                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 font-mono text-lg md:text-2xl text-white">
                                    {item.formula.map((part: string, idx: number) => (
                                        <span key={idx} className={['×', '÷', '+', '-', 'vs', 'to', '→'].includes(part) ? "text-zinc-500 font-bold" : "bg-black/40 px-3 py-1 rounded-lg border border-zinc-700"}>
                                            {part}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm md:text-lg text-zinc-400 leading-relaxed font-light border-t border-zinc-700/50 pt-4 mt-auto">
                                {item.desc}
                            </p>
                        </div>
                    ))
                 ) : (
                    <div className="col-span-2 text-center text-zinc-500 italic">ROI Calculation data currently unavailable for this perspective.</div>
                 )}
              </div>
           </div>

        </div>

        {/* BOTTOM POV SWITCHER */}
        <div className="max-w-6xl mx-auto px-4 md:px-10 pb-20 md:pb-40">
           <div className="flex flex-col items-center">
              <div className="h-px bg-zinc-800 w-full mb-10 md:mb-20 opacity-50"></div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Switch Perspective</p>
              <div className="bg-zinc-900 p-2 rounded-3xl inline-flex flex-col md:flex-row border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)] w-full md:w-auto">
                 <button onClick={() => setActivePov('executive')} className={`w-full md:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Executive</button>
                 <button onClick={() => setActivePov('operational')} className={`w-full md:w-auto px-8 md:px-12 py-4 md:py-6 rounded-2xl text-xs md:text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Operational</button>
              </div>
           </div>
        </div>

        {/* Global Floating Controls */}
        <div className="fixed bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-4 md:gap-8 no-print w-full px-4 justify-center">
            <button onClick={handlePrevDriver} className="flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-6 px-6 md:px-14 py-4 md:py-8 bg-zinc-900 border border-zinc-800 text-white rounded-full font-black uppercase tracking-tighter italic hover:bg-zinc-800 transition-all shadow-2xl text-xs md:text-sm"><ChevronLeft size={16} className="md:w-8 md:h-8" /> Prev</button>
            <button onClick={handleNextDriver} className="flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-6 px-6 md:px-16 py-4 md:py-8 bg-blackline-yellow text-black rounded-full font-black uppercase tracking-tighter italic hover:scale-105 transition-all shadow-2xl border-4 border-black text-xs md:text-sm">Next <ChevronRight size={16} className="md:w-8 md:h-8" /></button>
        </div>
      </div>
    );
  }

  return null;
};
