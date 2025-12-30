import React, { useState, useEffect, useMemo } from 'react';
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
  Flame
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

// --- NEW VISUAL COMPONENTS (v4 Visuals) ---

const FunnelVisual = () => (
  <div className="flex flex-col items-center justify-center w-full py-8">
    <div className="relative w-full max-w-2xl aspect-[16/9] bg-zinc-900 rounded-xl border border-zinc-800 p-8 flex items-center">
      {/* Left: Input */}
      <div className="flex-1 flex flex-col gap-2">
        {['Spend Mgmt', 'CRM Upgrade', 'Data Lake', 'ERP Upgrade'].map(label => (
          <div key={label} className="bg-zinc-800 border border-zinc-700 p-2 rounded text-xs text-center font-bold text-zinc-400">
            {label}
          </div>
        ))}
        <div className="text-center text-xs font-black uppercase text-zinc-500 mt-2">Total Demand</div>
      </div>
      
      {/* Center: Funnel Constraint */}
      <div className="flex-[2] flex flex-col items-center px-4 relative">
        <div className="w-full h-32 bg-gradient-to-r from-zinc-800 via-blackline-yellow/20 to-zinc-800 [clip-path:polygon(0%_0%,_100%_40%,_100%_60%,_0%_100%)] flex items-center justify-center">
           <div className="text-center">
             <AlertTriangle className="w-8 h-8 text-blackline-yellow mx-auto mb-1" />
             <span className="text-[10px] font-black uppercase text-blackline-yellow tracking-widest">CONSTRAINT</span>
             <p className="text-xs text-white font-bold leading-tight">Manual Processes</p>
           </div>
        </div>
      </div>

      {/* Right: Output */}
      <div className="flex-1 flex flex-col gap-2 opacity-50">
        {['Delayed Close', 'Limited Analysis'].map(label => (
          <div key={label} className="bg-zinc-800 border border-zinc-700 p-2 rounded text-xs text-center font-bold text-zinc-500">
            {label}
          </div>
        ))}
        <div className="text-center text-xs font-black uppercase text-zinc-600 mt-2">Limited Throughput</div>
      </div>
    </div>
  </div>
);

const GarbageInOutVisual = () => {
  const [mode, setMode] = useState<'dirty' | 'clean'>('dirty');
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-center gap-4 mb-6">
        <button onClick={() => setMode('dirty')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'dirty' ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>Current State</button>
        <button onClick={() => setMode('clean')} className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${mode === 'clean' ? 'bg-green-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>With BlackLine</button>
      </div>
      
      <div className={`relative p-8 rounded-2xl border transition-all duration-500 ${mode === 'dirty' ? 'bg-red-950/20 border-red-900/50' : 'bg-green-950/20 border-green-900/50'}`}>
        <div className="flex items-center justify-between gap-8">
          {/* Input */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${mode === 'dirty' ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
              <Factory size={32} />
            </div>
            <p className="text-sm font-bold uppercase tracking-wider">{mode === 'dirty' ? 'Polluted Data' : 'Clean Data'}</p>
            <p className="text-xs text-zinc-500 mt-1">{mode === 'dirty' ? 'Unreconciled, Fragmented' : 'Standardized, Verified'}</p>
          </div>

          {/* Process Arrow */}
          <div className="flex-1 h-1 bg-zinc-800 relative">
            <div className={`absolute inset-0 bg-current transition-all duration-1000 ${mode === 'dirty' ? 'text-red-500 w-1/2' : 'text-green-500 w-full'}`}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 text-xs font-black uppercase border border-zinc-800 rounded-full">
              AI Processing
            </div>
          </div>

          {/* Output */}
          <div className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${mode === 'dirty' ? 'bg-red-900/30 text-red-500' : 'bg-green-900/30 text-green-500'}`}>
              {mode === 'dirty' ? <AlertTriangle size={32} /> : <Sparkles size={32} />}
            </div>
            <p className="text-sm font-bold uppercase tracking-wider">{mode === 'dirty' ? 'Failed Decisions' : 'Strategic Insights'}</p>
            <p className="text-xs text-zinc-500 mt-1">{mode === 'dirty' ? 'Hallucinations & Risk' : 'Trusted Forecasting'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HouseFireVisual = () => (
  <div className="grid grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
    <div className="bg-red-950/20 border border-red-900/30 p-6 rounded-2xl flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
        <Flame size={40} className="text-red-500" />
      </div>
      <h4 className="text-red-400 font-black uppercase tracking-widest text-sm mb-2">Vulnerable State</h4>
      <p className="text-zinc-400 text-sm">Material Weakness = Reputational Fire</p>
    </div>
    <div className="bg-blue-950/20 border border-blue-900/30 p-6 rounded-2xl flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
        <ShieldAlert size={40} className="text-blue-500" />
      </div>
      <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm mb-2">Fortified State</h4>
      <p className="text-zinc-400 text-sm">Automated Controls = Resilience</p>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'grid' | 'persona_explain' | 'framework_explain' | 'detail' | 'executive_commentary' | 'letsgo_bva'>('landing');
  const [activeDriverId, setByActiveDriverId] = useState<string | null>(null);
  const [activePov, setActivePov] = useState<'executive' | 'operational'>('executive');

  const sortedDrivers = useMemo(() => {
    if (!GLOBAL_SKO_DATA || !Array.isArray(GLOBAL_SKO_DATA)) return [];
    return ORDERED_IDS.map(id => GLOBAL_SKO_DATA.find(d => d.id === id)).filter(Boolean) as SkoDriverDetail[];
  }, []);

  const activeDriver = sortedDrivers.find(d => d.id === activeDriverId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewMode, activeDriverId, activePov]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); 
    setByActiveDriverId(id);
    setViewMode('detail');
  };

  const handleNextDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const nextIndex = (currentIndex + 1) % sortedDrivers.length;
    setActivePov('executive'); 
    setByActiveDriverId(sortedDrivers[nextIndex].id);
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = sortedDrivers.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + sortedDrivers.length) % sortedDrivers.length;
    setActivePov('executive');
    setByActiveDriverId(sortedDrivers[prevIndex].id);
  };

  const plImpactDrivers = sortedDrivers.filter(d => ['working_cap', 'process'].includes(d.id));
  const accelerationDrivers = sortedDrivers.filter(d => ['talent', 'ma', 'innovation', 'compliance', 'decision'].includes(d.id));
  const valueDrivers = sortedDrivers.filter(d => ['trust', 'ai_ops'].includes(d.id));

  // --- VIEW RENDERING ---

  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         {/* Close Button Removed as requested */}
         
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
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
         </div>
         <div className="max-w-5xl mx-auto w-full px-4 md:px-6 flex flex-col gap-24 md:gap-32 pt-12 md:pt-20">
            <div className="text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/20 text-blackline-yellow rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Strategic Validation</div>
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-12">The Voice of <span className="text-blackline-yellow">the CFO</span></h2>
               
               {/* Main Content Container - Exxon Section */}
               <div className="bg-white text-black p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden text-left flex flex-col h-full">
                  
                  {/* Top Data Points Row - Logo Removed per request, fixed overlap */}
                  <div className="flex flex-col md:flex-row justify-end items-start gap-4 mb-8">
                     <div className="bg-blackline-yellow p-4 rounded-xl w-full md:w-auto">
                        <p className="font-bold text-sm mb-1">Launched Migration to S/4HANA:</p>
                        <p className="text-sm">Reallocated 200+ F&A resources to SAP S/4HANA migration effort</p>
                     </div>
                     <div className="bg-blackline-yellow p-4 rounded-xl w-full md:w-auto">
                        <p className="font-bold text-sm mb-1">Measurable Impact:</p>
                        <p className="text-sm">Automated 84% of reconciliations</p>
                     </div>
                  </div>

                  {/* Main Quote Block */}
                  <div className="relative pl-8 md:pl-12 border-l-4 border-blackline-yellow mb-12">
                     <Quote className="text-blackline-yellow w-10 h-10 absolute -left-5 -top-4 bg-white" fill="currentColor" />
                     <p className="text-lg md:text-2xl leading-relaxed font-light">
                       “We recently did a larger implementation of a software platform called <strong className="font-black">BlackLine</strong> that we use in the accounting space, and it's <strong className="font-black bg-blackline-yellow px-1">literally enabled us to save tens of thousands of hours</strong> of what was very manually intensive work because we can now automate it. But a lot of this detail is in the data <strong className="font-black">and being able to have cleaner data at a corporate-wide level so that we can get better insights</strong> from the data, we can improve our automation, and we can get both more efficient and more effective.”
                     </p>
                  </div>

                  {/* Footer Section - Flexbox to prevent overlap */}
                  <div className="flex flex-col xl:flex-row justify-between items-end gap-8 mt-auto">
                     {/* Customer Since - Moved into flow */}
                     <div className="text-gray-500 text-xs font-bold uppercase tracking-widest order-3 xl:order-1">
                        Customer Since: <span className="text-black text-lg font-black ml-2">2022</span>
                     </div>

                     <div className="flex flex-col md:flex-row items-end gap-8 order-2 w-full xl:w-auto justify-end">
                         {/* Quantified Impact Bar */}
                         <div className="bg-black text-white p-4 md:p-6 rounded-xl shadow-lg text-center md:text-right w-full md:w-auto">
                            <p className="text-[10px] font-black text-blackline-yellow uppercase tracking-widest mb-2">Quantified Impact</p>
                            <p className="text-2xl md:text-4xl font-black tracking-tighter italic">10,000+ FTE HOURS SAVED</p>
                         </div>
                         
                         {/* Author Block */}
                         <div className="text-right shrink-0">
                            <p className="text-black font-black text-xl tracking-tight">Kathryn Mikells</p>
                            <p className="text-black text-sm font-bold">CFO, ExxonMobil</p>
                            <p className="text-gray-600 text-xs mt-1">Earnings Call for Q1 2025, May 2, 2025</p>
                         </div>
                     </div>
                  </div>
                  
               </div>
            </div>

            <div className="h-px bg-zinc-800 w-full opacity-50"></div>

            {/* --- SECTION 2: BLACKLINE VISION (INTERNAL VOICE) --- */}
            {/* Updated Colors & Removed Caps per request */}
            <div className="text-center pb-20">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/10 text-blackline-yellow rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">Leadership Keynote</div>
               <h2 className="text-4xl md:text-6xl font-bold text-white italic tracking-tighter mb-8">
                  Hear from BL execs on the <span className="text-blackline-yellow">real value of BlackLine</span>
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
              <button onClick={() => setViewMode('framework_explain')} className="px-8 py-4 bg-blackline-yellow text-black text-lg font-black rounded-full hover:scale-105 shadow-2xl flex items-center justify-center
