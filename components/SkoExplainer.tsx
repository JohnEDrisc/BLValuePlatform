
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
  Quote
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

  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-4 right-4 md:top-0 md:right-0 p-4 md:p-8 text-gray-400 hover:text-white transition-colors z-50"><X size={28} /></button>
         <div className="text-center py-12 md:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blackline-yellow/20 border border-blackline-yellow/50 text-blackline-yellow text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8 animate-pulse"><Rocket size={12} /> SKO 26 Sales Playbook</div>
            <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter text-white mb-6 md:mb-8 leading-[0.9] md:leading-[0.85]">#LETSGO <span className="text-blackline-yellow">GET</span></h1>
            <p className="text-xl md:text-3xl text-zinc-200 font-light max-w-2xl mx-auto px-4 mb-8 md:mb-12">The definitive playbook for pivoting from <span className="text-white font-bold">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.</p>
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
            
            {/* --- SECTION 1: EXXONMOBIL (CUSTOMER VOICE) --- */}
            <div className="text-center">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blackline-yellow/20 text-blackline-yellow rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Strategic Validation</div>
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-12">The Voice of <span className="text-blackline-yellow">the CFO</span></h2>
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col text-left">
                  <div className="h-2 w-full bg-gradient-to-r from-red-600 via-blue-600 to-red-600"></div>
                  <div className="p-8 md:p-14 relative">
                     <div className="relative px-2 md:px-8">
                         <Quote className="text-blackline-yellow w-16 h-16 absolute -left-10 -top-12 opacity-20" />
                         <div className="space-y-10 md:space-y-14 relative z-10">
                           <div className="space-y-6">
                             <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed font-light italic">"We recently did a larger implementation of a software platform called <strong className="text-white font-bold">BlackLine</strong>.</p>
                             <div className="relative bg-black/40 p-8 md:p-12 rounded-3xl border border-blackline-yellow/20 shadow-inner">
                               <p className="text-2xl md:text-5xl text-white font-black italic leading-[1.1] uppercase tracking-tight">
                                 Moving to a platform [like this] <span className="text-blackline-yellow">literally enabled us to save tens of thousands of hours</span> in terms of people’s time."
                               </p>
                             </div>
                             <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed font-light italic">
                               It’s about more than just matching; it’s about <strong className="text-white">agility</strong>. It’s about being able to pivot... it allows our people to focus on higher-value work that actually drives the bottom line."
                             </p>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-zinc-800/50">
                              <div className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-700/50 flex flex-col justify-center">
                                 <h5 className="text-xs font-black text-blackline-yellow uppercase tracking-widest mb-2">Quantified Impact</h5>
                                 <p className="text-white font-bold text-xl leading-tight uppercase tracking-tighter italic">10,000+ FTE Hours Saved</p>
                              </div>
                              <div className="p-6 bg-zinc-800/30 rounded-2xl border border-zinc-700/50 flex flex-col justify-center">
                                 <h5 className="text-xs font-black text-blackline-yellow uppercase tracking-widest mb-2">Operational Shift</h5>
                                 <p className="text-white font-bold text-xl leading-tight uppercase tracking-tighter italic">Process to Business Partnership</p>
                              </div>
                           </div>
                         </div>
                     </div>
                  </div>
                  <div className="p-8 md:p-14 pt-0 border-t border-zinc-800/50 bg-black/20">
                     <div className="flex items-center gap-6 pt-6 md:pt-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-3xl flex items-center justify-center font-black text-white border border-zinc-600 text-2xl shadow-xl">KM</div>
                        <div>
                           <p className="text-white font-black text-2xl tracking-tight">Kathryn Mikells</p>
                           <p className="text-blackline-yellow text-xs font-bold uppercase tracking-[0.3em]">CFO, ExxonMobil</p>
                           <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Commentary from 2024 Investor Day</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="h-px bg-zinc-800 w-full opacity-50"></div>

            {/* --- SECTION 2: BLACKLINE VISION (INTERNAL VOICE) --- */}
            <div className="text-center pb-20">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Leadership Keynote</div>
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8">Hear from BL execs on the <span className="text-red-500">real value of BlackLine</span></h2>
               
               <div className="bg-zinc-900 border-2 border-red-500/30 rounded-[3rem] aspect-video relative flex flex-col items-center justify-center overflow-hidden shadow-2xl group cursor-pointer mb-12">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="relative z-10 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-[0_0_50px_rgba(220,38,38,0.5)] group-hover:scale-110 group-hover:bg-red-500 transition-all">
                     <Play size={32} fill="white" />
                  </div>
                  <div className="absolute bottom-10 left-10 text-left z-10">
                     <p className="text-white font-black text-2xl uppercase italic tracking-tighter">Executive Leadership Team</p>
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
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-10 text-left">
              <div className="col-span-1 md:col-span-3"><LargeFrameworkBox step="1" color="red-500" title="Create Value" subtitle="Establish the Strategic Gap" formula='Create Value → The Problem' desc={"Move conversation from features to objectives. Define macro-level pains."} /></div>
              <div className="col-span-1 md:col-span-3"><LargeFrameworkBox step="2" color="blue-500" title="Capture Value" subtitle="Expose the Quantified Reality" formula='Capture Value → The Questions' desc={"Execute high-gain discovery to uncover hidden costs of inertia."} /></div>
              <div className="col-span-1 md:col-span-2"><LargeFrameworkBox step="3" color="yellow-500" title="Deliver Value" subtitle="Map Outcomes to Platform" formula='Deliver Value → The Capabilities' desc={"Align platform capabilities to specific business outcomes."} /></div>
              <div className="col-span-1 md:col-span-2"><LargeFrameworkBox step="4" color="green-500" title="Justify Value" subtitle="Build the Economic Case" formula='Justify Value → The Business Case' desc={"Construct a CFO-ready business case with ROI modeling."} /></div>
              <div className="col-span-1 md:col-span-2"><LargeFrameworkBox step="5" color="purple-500" title="Quantify Value" subtitle="Validate the Win" formula='Quantify Value → The ROI' desc={"Translate operational improvements into hard financial calculations for the CFO."} /></div>
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
    const pov = activePov === 'executive' ? activeDriver.executivePov : activeDriver.operationalPov;
    const roiItems = activePov === 'executive' ? pov.roiCalculations?.executive : pov.roiCalculations?.operational;
    
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
              
              {/* EXECUTIVE SUMMARY BLOCK */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-8 md:p-14 rounded-[3rem] shadow-2xl mb-16 text-left max-w-4xl mx-auto">
                 <h4 className="text-blackline-yellow font-black text-xs md:text-sm uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                    <Sparkles size={18} /> Why does this even matter?
                 </h4>
                 <p className="text-xl md:text-3xl text-white font-light leading-relaxed italic">
                    "{activeDriver.summary}"
                 </p>
                 <div className="mt-8 pt-8 border-t border-zinc-800/50 flex items-center gap-4 text-zinc-500 uppercase font-black text-[10px] tracking-widest">
                    <ArrowRight size={14} className="text-blackline-yellow" /> Segue to Teaching System
                 </div>
              </div>

              <div className="flex justify-center mb-16">
                 <PovSwitcher />
              </div>
              <div className="animate-bounce-slow text-zinc-500 flex flex-col items-center gap-2"><span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore Narrative</span><ChevronDown size={20} /></div>
           </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-10 space-y-16 md:space-y-32 pb-20">
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center">
              <h4 className="text-red-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] mb-8 flex items-center gap-4"><div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> Phase 01: Create Value</h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.createValue.title}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 mt-8">{pov.createValue.pains?.map((p: string, i: number) => (<div key={i} className="bg-black/40 border border-zinc-800 p-6 md:p-8 rounded-3xl flex gap-6 items-start"><div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 text-red-500"><AlertTriangle size={20} /></div><p className="text-zinc-200 text-lg md:text-2xl font-medium leading-relaxed">{p}</p></div>))}</div>
              <div className="pt-12 border-t border-zinc-800/50 text-center"><p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">Strategic Focus Point</p><p className="text-xl md:text-3xl text-white font-medium italic leading-relaxed">"{pov.createValue.focus}"</p></div>
           </div>
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center">
              <h4 className="text-blue-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] mb-12 flex items-center gap-4"><div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div> Phase 02: Capture Value</h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov.captureValue.title}</h5>
              <div className="space-y-6 md:space-y-8 mb-16">{pov.captureValue.questions?.map((q: string, i: number) => (<div key={i} className={`flex gap-6 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}><div className={`relative max-w-4xl p-6 md:p-10 rounded-[2rem] ${i % 2 === 0 ? 'bg-zinc-800 text-white rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none shadow-xl'}`}><p className="text-xl md:text-3xl font-medium italic leading-relaxed">"{q}"</p></div></div>))}</div>
           </div>
           <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center">
              <h4 className="text-blackline-yellow font-black text-xs md:text-lg uppercase tracking-[0.3em] mb-12 flex items-center gap-4"><div className="w-3 h-3 bg-blackline-yellow rounded-full animate-pulse"></div> Phase 03: Deliver Value</h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.deliverValue.title}</h5>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 mt-8">
                 <div><span className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-10">Platform Activation</span><div className="flex flex-wrap gap-4">{pov.deliverValue.capabilities?.map((c: string) => (<div key={c} className="px-6 py-4 bg-zinc-800 rounded-full border border-zinc-700 text-white font-bold shadow-lg flex items-center gap-3"><div className="w-2 h-2 bg-blackline-yellow rounded-full"></div>{c}</div>))}</div></div>
                 <div><span className="text-xs md:text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-10">Validated Proof Points</span><div className="space-y-6">{pov.deliverValue.proofPoints?.map((p: string, i: number) => (<div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5"><div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0"><CheckCircle2 size={20} /></div><span className="text-xl md:text-2xl font-bold text-white">{p}</span></div>))}</div></div>
              </div>
           </div>
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center">
              <h4 className="text-green-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] mb-12 flex items-center gap-4"><div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Phase 04: Justify Value</h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.justifyValue.title}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">{pov.justifyValue.metrics?.map((m: string, i: number) => (<div key={i} className={`p-8 md:p-12 bg-black/50 rounded-[3rem] border border-zinc-800 hover:border-green-500/40 shadow-xl flex items-center gap-6 ${i === 2 ? 'md:col-span-2' : ''}`}><TrendingUp className="text-green-500 w-8 h-8 shrink-0 opacity-50" /><p className="text-2xl md:text-4xl font-black text-white tracking-tight italic">{m}</p></div>))}</div>
           </div>
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-28 rounded-[2rem] shadow-2xl relative flex flex-col justify-center">
              <h4 className="text-purple-500 font-black text-xs md:text-lg uppercase tracking-[0.3em] mb-12 flex items-center gap-4"><div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div> Phase 05: Quantify the Win</h4>
              <h5 className="text-3xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">ROI & Realization</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">{roiItems && roiItems.length > 0 ? (roiItems.map((item: any, i: number) => (<div key={i} className={`bg-zinc-800/50 border-l-4 ${activePov === 'executive' ? 'border-purple-500' : 'border-zinc-500'} p-12 rounded-r-[2rem] flex flex-col justify-between`}><div><h6 className={`${activePov === 'executive' ? 'text-purple-400' : 'text-zinc-400'} font-black text-sm uppercase tracking-[0.2em] mb-6`}>{item.label}</h6><div className="flex flex-wrap items-center gap-4 mb-8 font-mono text-2xl text-white">{item.formula.map((part: string, idx: number) => (<span key={idx} className={['×', '÷', '+', '-', 'vs', 'to', '→'].includes(part) ? "text-zinc-500 font-bold" : "bg-black/40 px-3 py-1 rounded-lg border border-zinc-700"}>{part}</span>))}</div></div><p className="text-lg text-zinc-400 leading-relaxed font-light border-t border-zinc-700/50 pt-4 mt-auto">{item.desc}</p></div>))) : (<div className="col-span-2 text-center text-zinc-500 italic py-20 bg-black/20 rounded-3xl">ROI Calculation data unavailable.</div>)}</div>
           </div>

           {/* SECONDARY POV SWITCHER AT BOTTOM */}
           <div className="flex flex-col items-center gap-8 pt-10 border-t border-zinc-800/50">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Switch Perspective</span>
              <PovSwitcher />
           </div>
        </div>
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-8 no-print justify-center"><button onClick={handlePrevDriver} className="px-14 py-8 bg-zinc-900 border border-zinc-800 text-white rounded-full font-black uppercase italic hover:bg-zinc-800 transition-all shadow-2xl flex items-center gap-4"><ChevronLeft size={16} /> Prev</button><button onClick={handleNextDriver} className="px-16 py-8 bg-blackline-yellow text-black rounded-full font-black uppercase italic hover:scale-105 transition-all shadow-2xl border-4 border-black flex items-center gap-4">Next <ChevronRight size={16} /></button></div>
      </div>
    );
  }

  if (viewMode === 'letsgo_bva') {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-16">
           <div className="flex justify-between items-center mb-16"><button onClick={() => setViewMode('grid')} className="flex items-center gap-2 text-gray-300 hover:text-white uppercase tracking-wider text-xs"><ArrowLeft size={16} /> Back</button><button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full"><X size={24} /></button></div>
           <div className="text-center mb-20"><h2 className="text-8xl font-black text-white italic tracking-tighter uppercase mb-6">#LETSGO <span className="text-blackline-yellow">GET</span></h2><p className="text-2xl text-zinc-200 uppercase tracking-tighter italic">Strategic Next Steps for 2026</p></div>
           <div className="space-y-12"><PhaseCard step="01" title="Align to and execute golden engagement" label="Strategic Methodology" color="blackline-yellow" desc="Ensure we pivot from technical features to strategic certainty at every turn of the deal cycle." /><PhaseCard step="02" title="Work with management to flag top pursuits" label="Resource Allocation" color="blue-500" desc="Flag top pursuits for 2026 so the presales and value engineering team can start working immediately." /><PhaseCard step="03" title="Engage in follow up enablement in Q1" label="Continuous Mastery" color="green-500" desc="Deep-dive sessions focusing on specific industry narratives arrive in Q1." /></div>
           <div className="max-w-2xl mx-auto mt-24 p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem] text-center"><button onClick={onClose} className="px-12 py-6 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 uppercase tracking-tighter italic border-4 border-black">Return to Analysis Suite</button></div>
        </div>
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
  <div className="bg-zinc-900 border border-zinc-800 p-14 rounded-[3.5rem] flex flex-col hover:border-zinc-500 shadow-xl group min-h-[450px]">
     <div className={`w-16 h-16 rounded-[1.2rem] bg-${color}/20 text-${color} flex items-center justify-center mb-8 font-black text-3xl group-hover:scale-110 transition-transform shadow-lg shrink-0`}>{step}</div>
     <h4 className="text-3xl font-black uppercase text-white mb-1 tracking-widest italic">{title}</h4>
     <p className={`text-${color} text-xs font-black uppercase tracking-[0.3em] mb-4`}>{subtitle}</p>
     <div className="mb-8 py-2 px-4 bg-black/40 rounded-lg border border-zinc-800 inline-block w-fit"><span className="text-sm font-mono text-zinc-200 flex items-center gap-2">{formula}</span></div>
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
