
import React, { useState, useEffect } from 'react';
import { SKO_DATA } from '../constants';
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
  ChevronDown
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

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'grid' | 'persona_explain' | 'framework_explain' | 'detail' | 'video' | 'letsgo_bva'>('landing');
  const [activeDriverId, setActiveDriverId] = useState<string | null>(null);
  const [activePov, setActivePov] = useState<'executive' | 'operational'>('executive');

  const activeDriver = SKO_DATA.find(d => d.id === activeDriverId);

  // Scroll to top when view mode or narrative changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [viewMode, activeDriverId, activePov]);

  const handleDriverSelect = (id: string) => {
    setActivePov('executive'); // Always start on executive
    setActiveDriverId(id);
    setViewMode('detail');
  };

  const handleNextDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = SKO_DATA.findIndex(d => d.id === activeDriverId);
    const nextIndex = (currentIndex + 1) % SKO_DATA.length;
    setActivePov('executive'); // Always start on executive
    setActiveDriverId(SKO_DATA[nextIndex].id);
  };

  const handlePrevDriver = () => {
    if (!activeDriverId) return;
    const currentIndex = SKO_DATA.findIndex(d => d.id === activeDriverId);
    const prevIndex = (currentIndex - 1 + SKO_DATA.length) % SKO_DATA.length;
    setActivePov('executive'); // Always start on executive
    setActiveDriverId(SKO_DATA[prevIndex].id);
  };

  const plImpactDrivers = SKO_DATA.filter(d => ['process', 'working_cap'].includes(d.id));
  const accelerationDrivers = SKO_DATA.filter(d => ['innovation', 'talent', 'ma', 'compliance', 'decision'].includes(d.id));
  const valueDrivers = SKO_DATA.filter(d => ['trust', 'ai_ops'].includes(d.id));

  // --- LANDING VIEW ---
  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-0 right-0 p-8 text-gray-400 hover:text-white transition-colors z-50">
           <X size={32} />
         </button>
         
         <div className="text-center py-16 md:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blackline-yellow/20 border border-blackline-yellow/50 text-blackline-yellow text-xs font-bold uppercase tracking-wider mb-8 animate-pulse">
               <Rocket size={14} /> SKO 26 Sales Playbook
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-8 leading-[0.85]">
              #LETSGO <span className="text-blackline-yellow">GET</span>
            </h1>
            <p className="text-2xl md:text-3xl text-zinc-200 font-light max-w-2xl mx-auto px-6 mb-12">
               The definitive playbook for pivoting from <span className="text-white font-bold">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
            </p>
            
            <div className="flex justify-center gap-4 no-print">
               <button onClick={() => setViewMode('grid')} className="px-8 py-4 bg-white text-black font-black rounded-full hover:bg-blackline-yellow transition-all flex items-center gap-3 uppercase tracking-tighter italic shadow-2xl">
                  <LayoutGrid size={20} /> Explore Drivers
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full pb-24 px-6">
             <div onClick={() => setViewMode('video')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blackline-yellow/50 transition-all duration-500 h-[350px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-blackline-yellow group-hover:text-black group-hover:border-blackline-yellow transition-all">
                      <Play size={32} fill="currentColor" className="ml-1" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">Executive Commentary</h3>
                </div>
             </div>
             <div onClick={() => setViewMode('grid')} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-500 h-[350px] md:h-[450px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-8 text-center">
                   <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:bg-blue-500 group-hover:text-black group-hover:border-blue-500 transition-all">
                      <LayoutGrid size={32} />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase italic">The Framework</h3>
                </div>
             </div>
         </div>
      </div>
    );
  }

  // --- VIDEO VIEW (VERTICAL ORIENTED) ---
  if (viewMode === 'video') {
    return (
      <div className="min-h-screen bg-black flex flex-col animate-fade-in relative pb-32">
         <div className="flex justify-between items-center px-8 py-6">
            <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
               <ArrowLeft size={16} /> Back
            </button>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors">
               <X size={24} />
            </button>
         </div>
         
         <div className="max-w-4xl mx-auto w-full px-6 flex flex-col gap-12 pt-8">
            <div className="text-center mb-6">
               <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Executive Commentary</h2>
               <p className="text-gray-300 font-medium uppercase tracking-widest text-xs">Voices of Value & Vision</p>
            </div>

            <div className="flex flex-col gap-12">
               {/* Exxon Section First */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blackline-yellow/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-gradient-to-r from-red-600 via-blue-600 to-red-600"></div>
                  <div className="p-10 flex-grow">
                     <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <Quote size={120} className="text-white" />
                     </div>
                     <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-white rounded-xl shadow-lg flex items-center justify-center">
                              <span className="text-black font-black text-xl tracking-tighter uppercase italic">Exxon</span>
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">Customer Voice</h4>
                              <p className="text-blackline-yellow text-[10px] font-bold uppercase tracking-[0.2em] mt-1">ExxonMobil Corporation</p>
                           </div>
                        </div>
                     </div>
                     <p className="text-xl md:text-3xl text-gray-100 leading-relaxed font-light italic mb-10 relative px-2">
                        <span className="text-blackline-yellow font-serif text-5xl absolute -left-8 -top-4 opacity-50">"</span>
                        We recently did a larger implementation of a software platform called <strong className="text-white font-bold">BlackLine</strong> that we use in the accounting space, and it's <strong>literally enabled us to save tens of thousands of hours</strong>... we can get both more efficient and more effective.
                        <span className="text-blackline-yellow font-serif text-5xl absolute -bottom-10 opacity-50">"</span>
                     </p>
                  </div>
                  <div className="p-10 pt-0 mt-auto border-t border-zinc-800/50 bg-black/20">
                     <div className="flex items-center gap-4 pt-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-zinc-900 rounded-xl flex items-center justify-center font-black text-white border border-zinc-600">KM</div>
                        <div>
                           <p className="text-white font-black text-base tracking-tight">Kathryn Mikells</p>
                           <p className="text-gray-300 text-[10px] font-bold uppercase tracking-widest">Chief Financial Officer, ExxonMobil</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Video Section Second */}
               <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl transition-all hover:border-blue-500/30 flex flex-col text-left">
                  <div className="h-2 w-full bg-blackline-yellow"></div>
                  <div className="p-10 flex-grow relative overflow-hidden">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 pointer-events-none"></div>
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-800">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-blackline-yellow rounded-xl shadow-lg flex items-center justify-center text-black">
                                 <Video size={24} />
                              </div>
                              <div>
                                 <h4 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">Strategic Vision</h4>
                                 <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Organizational Leadership</p>
                              </div>
                           </div>
                        </div>
                        
                        <div className="aspect-video bg-black/60 rounded-2xl border border-zinc-700 mb-8 flex flex-col items-center justify-center group/vid cursor-pointer">
                           <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4 border border-white/20 group-hover/vid:bg-blackline-yellow group-hover/vid:text-black transition-all">
                              <Play size={32} fill="currentColor" className="ml-1" />
                           </div>
                           <span className="text-[12px] font-black uppercase tracking-widest text-gray-400 group-hover/vid:text-white transition-colors">Watch Strategy Briefing</span>
                        </div>

                        <p className="text-xl text-gray-200 leading-relaxed font-light italic mb-6">
                           The transition from manual financial operations to strategic value-creation is the single largest opportunity for the modern CFO.
                        </p>
                     </div>
                  </div>
                  <div className="p-10 pt-0 mt-auto border-t border-zinc-800/50 bg-black/20">
                     <div className="flex items-center gap-4 pt-6">
                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center font-black text-gray-400 border border-zinc-700">POV</div>
                        <div>
                           <p className="text-white font-black text-base tracking-tight">Executive Leadership</p>
                           <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Internal Strategic Commentary</p>
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
      <div className="w-full max-w-[1400px] mx-auto pb-32 animate-fade-in px-6 pt-10">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="text-left">
               <button onClick={() => setViewMode('landing')} className="flex items-center gap-2 mb-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft size={16} /> Back to Menu
               </button>
               <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 uppercase italic">
                 Value Drivers <span className="text-zinc-600">Framework</span>
               </h2>
            </div>
         </div>

         <div className="space-y-24">
            <GridSection title="P&L Bottom Line Impact" subtitle="Directly influencing profitability" drivers={plImpactDrivers} onSelect={handleDriverSelect} centered={true} />
            <div className="space-y-10">
               <div className="flex flex-col items-center text-center gap-2">
                  <h3 className="text-3xl font-black text-white uppercase tracking-[0.3em] flex items-center gap-4 italic"><div className="h-1 w-12 bg-blackline-yellow shrink-0"></div>Acceleration & Resilience<div className="h-1 w-12 bg-blackline-yellow shrink-0"></div></h3>
                  <p className="text-xl font-bold text-zinc-200 uppercase tracking-widest">Driving organizational speed and risk mitigation</p>
               </div>
               <div className="flex flex-wrap justify-center gap-10">
                  {accelerationDrivers.map((driver) => <DriverCard key={driver.id} driver={driver} onSelect={handleDriverSelect} />)}
               </div>
            </div>
            <GridSection title="Enhancing Enterprise Value" subtitle="Boosting valuation foundations" drivers={valueDrivers} onSelect={handleDriverSelect} centered={true} />
         </div>

         <div className="mt-32 text-center pb-20">
            <button 
               onClick={() => {
                  setActivePov('executive');
                  setActiveDriverId(SKO_DATA[0].id);
                  setViewMode('persona_explain');
               }}
               className="px-16 py-8 bg-blackline-yellow text-black text-2xl font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-4 mx-auto uppercase italic tracking-tighter border-4 border-black"
            >
               <Sparkles size={32} /> Start Explainer Deep Dive
            </button>
         </div>
      </div>
    );
  }

  // --- PERSONA EXPLAIN VIEW ---
  if (viewMode === 'persona_explain' && activeDriver) {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in py-20 px-6">
        <div className="max-w-7xl mx-auto w-full">
           <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-[0.2em] mb-10">
                 <Users size={14} /> Persona Alignment
              </div>
              <h2 className="text-6xl md:text-9xl font-black text-white uppercase italic tracking-tighter mb-10 leading-[0.8]">
                 Meet the <span className="text-blackline-yellow">Stakeholders</span>
              </h2>
              <p className="text-2xl md:text-4xl text-zinc-200 font-light max-w-5xl mx-auto leading-relaxed">
                 Effective value selling mirrors the unique <span className="text-white italic font-bold">aspirations</span> and <span className="text-white italic font-bold underline decoration-purple-500/50 underline-offset-8">nightmares</span> of the entire office of the CFO.
              </p>
           </div>

           <div className="space-y-24">
              <div>
                 <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-12 flex items-center gap-6">
                    Strategic Executive Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <SimplePersonaCard 
                      role="CEO" 
                      icon={Target} 
                      nightmare="Competitive irrelevance." 
                      aspiration="Commanding top-tier market valuation through high-integrity operations and absolute financial certainty." 
                    />
                    <SimplePersonaCard 
                      role="CFO" 
                      icon={TrendingUp} 
                      nightmare="Board surprises." 
                      aspiration="Leading a real-time strategic engine for growth, agile capital allocation, and total finance efficiency." 
                    />
                    <SimplePersonaCard 
                      role="CAO" 
                      icon={ShieldCheck} 
                      nightmare="Public restatements." 
                      aspiration="Establishing verifiable integrity and global compliance through automated controls and audit readiness." 
                    />
                    <SimplePersonaCard 
                      role="CIO" 
                      icon={Cpu} 
                      nightmare="High-risk legacy debt." 
                      aspiration="Architecting a secure, AI-ready data foundation that eliminates legacy debt and scales with the business." 
                    />
                 </div>
              </div>
              <div>
                 <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.6em] mb-12 flex items-center gap-6">
                    Tactical Operational Tier <div className="h-px bg-zinc-800 flex-grow"></div>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <SimplePersonaCard 
                      role="Accounting Mgr" 
                      icon={Briefcase} 
                      nightmare="Peak cycle burnout." 
                      aspiration="Leading a high-performance team by eliminating peak-cycle burnout and building a legacy of excellence." 
                    />
                    <SimplePersonaCard 
                      role="Senior Accountant" 
                      icon={User} 
                      nightmare="Manual data cycles." 
                      aspiration="Escaping manual ticking and tying to become a strategic partner driving value through data insights." 
                    />
                    <SimplePersonaCard 
                      role="SSC Owner" 
                      icon={Activity} 
                      nightmare="Fragmented entities." 
                      aspiration="Achieving massive operational scale without headcount growth through standardized global automation." 
                    />
                 </div>
              </div>
           </div>

           <div className="flex justify-center gap-8 mt-32 pb-20">
              <button onClick={() => setViewMode('grid')} className="px-12 py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Map
              </button>
              <button onClick={() => setViewMode('framework_explain')} className="px-16 py-6 bg-blackline-yellow text-black text-lg font-black rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-4 uppercase tracking-tighter italic">
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
      <div className="min-h-screen bg-black text-white animate-fade-in flex flex-col items-center justify-center py-24 px-6">
        <div className="max-w-7xl w-full text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] mb-14">
              <HelpCircle size={14} /> Methodology Briefing
           </div>
           <h2 className="text-7xl md:text-[10rem] font-black text-white uppercase italic tracking-tighter mb-12 leading-tight">
              The Teaching <span className="text-blackline-yellow">System</span>
           </h2>
           <p className="text-2xl md:text-4xl text-zinc-200 font-light mb-24 leading-relaxed max-w-5xl mx-auto">
              Master the pivot from <span className="text-white font-bold italic underline decoration-blackline-yellow">feature-led discovery</span> to <span className="text-white font-bold italic">strategic certainty</span>.
           </p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24 text-left">
              <LargeFrameworkBox 
                step="1" 
                color="red-500" 
                title="Create Value" 
                subtitle="Establish the Strategic Gap"
                formula='Create Value → The Problem ("Why change?")'
                desc={"Move the conversation from technical features to corporate objectives.\nDefine the macro-level pains that make the status quo unsustainable for executive leadership."} 
              />
              <LargeFrameworkBox 
                step="2" 
                color="blue-500" 
                title="Capture Value" 
                subtitle="Expose the Quantified Reality"
                formula='Capture Value → The Questions ("Why now / Why us?")'
                desc={"Execute high-gain discovery to uncover the hidden operational costs of inertia.\nTransform vague organizational friction into specific, validated metrics of risk and waste."} 
              />
              <LargeFrameworkBox 
                step="3" 
                color="yellow-500" 
                title="Deliver Value" 
                subtitle="Map Outcomes to Platform"
                formula='Deliver Value → The Capabilities ("How do we do it?")'
                desc={"Directly align BlackLine platform capabilities to the specific business outcomes identified.\nProve how our unique technology eliminates the pains defined in Phase 1."} 
              />
              <LargeFrameworkBox 
                step="4" 
                color="green-500" 
                title="Justify Value" 
                subtitle="Build the Economic Case"
                formula='Justify Value → The Business Case ("So what?")'
                desc={"Construct a CFO-ready business case.\nUse enterprise-grade benchmarks and ROI modeling to justify the investment as a mission-critical strategic requirement."} 
              />
           </div>

           <div className="flex justify-center gap-8">
              <button onClick={() => setViewMode('persona_explain')} className="px-12 py-6 bg-zinc-900 text-white text-lg font-black rounded-full hover:bg-zinc-800 transition-all uppercase tracking-tighter italic border border-zinc-700">
                 Back to Personas
              </button>
              <button onClick={() => { setActivePov('executive'); setViewMode('detail'); }} className="px-20 py-8 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 transition-all shadow-xl flex items-center gap-4 uppercase tracking-tighter italic">
                 Start Driver Tour <ArrowRight size={32} />
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

    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-40 scale-[0.75] origin-top overflow-visible">
        {/* Navigation Header */}
        <div className="fixed top-0 left-0 w-full bg-black/95 backdrop-blur-xl z-50 border-b border-zinc-800 px-10 py-6 flex justify-between items-center no-print">
           <div className="flex items-center gap-8">
              <button onClick={() => setViewMode('grid')} className="text-gray-300 hover:text-white p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-zinc-800 border border-zinc-800 flex items-center gap-3 font-black uppercase text-xs tracking-widest">
                 <LogOut size={20} /> Escape Driver
              </button>
              <button onClick={() => setViewMode('letsgo_bva')} className="text-blackline-yellow p-4 bg-zinc-900 rounded-2xl transition-all hover:bg-blackline-yellow hover:text-black border border-blackline-yellow/30 flex items-center gap-3 font-black uppercase text-xs tracking-widest">
                 Next Steps <ArrowRight size={20} />
              </button>
              <span className="text-sm font-black text-blackline-yellow uppercase tracking-[0.3em] px-4 border-l border-zinc-800">{activeDriver.title}</span>
           </div>
           <div className="flex items-center gap-6">
              <button onClick={handlePrevDriver} className="p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronLeft size={24}/></button>
              <button onClick={handleNextDriver} className="p-4 hover:bg-zinc-800 rounded-2xl text-gray-300 border border-zinc-800"><ChevronRight size={24}/></button>
              <button onClick={onClose} className="p-4 text-gray-400 hover:text-white ml-4"><X size={24} /></button>
           </div>
        </div>

        {/* Hero Section */}
        <div className="relative pt-32 pb-24 px-10">
           <div className="max-w-6xl mx-auto relative z-10 text-center">
              <div className="inline-flex items-center justify-center p-10 bg-blackline-yellow rounded-[2.5rem] text-black mb-14 shadow-2xl border-8 border-black">
                 <IconComponent size={84} strokeWidth={1} />
              </div>
              <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-10 leading-[0.8] italic uppercase">{activeDriver.title}</h1>
              <div className="inline-block px-14 py-6 border-2 border-zinc-700 rounded-full bg-black/60 mb-14 backdrop-blur-xl">
                 <span className="text-4xl font-black text-green-400 tracking-tighter italic uppercase">{activeDriver.heroMetric}</span>
              </div>
              
              {/* TOP TOGGLE */}
              <div className="flex justify-center mb-24">
                 <div className="bg-zinc-900 p-2 rounded-3xl inline-flex border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)]">
                    <button onClick={() => setActivePov('executive')} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Executive Narrative</button>
                    <button onClick={() => setActivePov('operational')} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Operational Narrative</button>
                 </div>
              </div>
              
              <div className="animate-bounce-slow text-zinc-500 flex flex-col items-center gap-2">
                 <span className="text-[10px] font-black uppercase tracking-widest">Scroll to Explore Narrative</span>
                 <ChevronDown size={20} />
              </div>
           </div>
        </div>

        {/* Vertical Focused Content Stack */}
        <div className="max-w-6xl mx-auto px-10 space-y-32 pb-20">
           
           {/* Phase 01: Create */}
           <div className="bg-zinc-900 border border-zinc-800 p-20 md:p-28 rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Layout size={400} /></div>
              <h4 className="text-red-500 font-black text-lg uppercase tracking-[0.5em] mb-12 flex items-center gap-6">
                 <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> Phase 01: Create Value
              </h4>
              <h5 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.createValue.title}</h5>
              <div className="mb-10 py-3 px-6 bg-black/40 rounded-xl border border-red-500/20 inline-block w-fit">
                 <span className="text-xl font-mono text-zinc-300">The Problem ("Why change?")</span>
              </div>
              <div className="space-y-12 mb-16">
                 {pov.createValue.pains.map((p, i) => (
                    <div key={i} className="flex gap-8 items-start text-zinc-200 text-3xl leading-relaxed">
                       <span className="text-red-500 font-black text-5xl mt-1">•</span>
                       <p className="font-light">{p}</p>
                    </div>
                 ))}
              </div>
              <div className="pt-12 border-t border-zinc-800/50">
                 <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">Strategic Focus Point</p>
                 <p className="text-3xl text-white font-medium italic leading-relaxed">"{pov.createValue.focus}"</p>
              </div>
           </div>

           {/* Phase 02: Capture */}
           <div className="bg-zinc-900 border border-zinc-800 p-20 md:p-28 rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Search size={400} /></div>
              <h4 className="text-blue-500 font-black text-lg uppercase tracking-[0.5em] mb-12 flex items-center gap-6">
                 <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div> Phase 02: Capture Value
              </h4>
              <h5 className="text-5xl md:text-8xl font-black text-white mb-12 uppercase italic tracking-tighter leading-[0.9]">{pov.captureValue.title}</h5>
              <div className="mb-10 py-3 px-6 bg-black/40 rounded-xl border border-blue-500/20 inline-block w-fit">
                 <span className="text-xl font-mono text-zinc-300">The Questions ("Why now / Why us?")</span>
              </div>
              <div className="space-y-12 mb-16">
                 {pov.captureValue.questions.map((q, i) => (
                    <div key={i} className="bg-black/30 border-l-8 border-blue-500/50 p-12 rounded-r-3xl hover:bg-black/50 transition-colors">
                       <p className="text-4xl text-zinc-100 font-medium italic leading-relaxed">"{q}"</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* Phase 03: Deliver */}
           <div className="bg-zinc-900 border border-zinc-800 p-20 md:p-28 rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><Zap size={400} /></div>
              <h4 className="text-blackline-yellow font-black text-lg uppercase tracking-[0.5em] mb-12 flex items-center gap-6">
                 <div className="w-3 h-3 bg-blackline-yellow rounded-full animate-pulse"></div> Phase 03: Deliver Value
              </h4>
              <h5 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.deliverValue.title}</h5>
              <div className="mb-10 py-3 px-6 bg-black/40 rounded-xl border border-blackline-yellow/20 inline-block w-fit">
                 <span className="text-xl font-mono text-zinc-300">The Capabilities ("How do we do it?")</span>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
                 <div>
                    <span className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-10">Platform Activation</span>
                    <div className="flex flex-wrap gap-6">
                       {pov.deliverValue.capabilities.map(c => (
                          <span key={c} className="px-8 py-4 bg-black rounded-2xl border border-zinc-800 text-xl font-bold text-white shadow-lg">{c}</span>
                       ))}
                    </div>
                 </div>
                 <div>
                    <span className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] block mb-10">Validated Proof Points</span>
                    <div className="space-y-8">
                       {pov.deliverValue.proofPoints.map((p, i) => (
                          <div key={i} className="flex items-center gap-8 text-3xl font-black text-green-400 italic tracking-tighter uppercase leading-[0.9]">
                             <CheckCircle2 size={40} className="shrink-0" /> <span>{p}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Phase 04: Justify */}
           <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-20 md:p-28 rounded-[4rem] shadow-2xl relative overflow-hidden group min-h-[700px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity"><TrendingUp size={400} /></div>
              <h4 className="text-green-500 font-black text-lg uppercase tracking-[0.5em] mb-12 flex items-center gap-6">
                 <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div> Phase 04: Justify Value
              </h4>
              <h5 className="text-5xl md:text-8xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">{pov.justifyValue.title}</h5>
              <div className="mb-10 py-3 px-6 bg-black/40 rounded-xl border border-green-500/20 inline-block w-fit">
                 <span className="text-xl font-mono text-zinc-300">The Business Case ("So what?")</span>
              </div>
              {/* Force a 2x2 Grid for exactly 4 boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                 {pov.justifyValue.metrics.slice(0, 4).map((m, i) => (
                    <div key={i} className="p-12 bg-black/50 rounded-[3rem] border border-zinc-800 hover:border-green-500/40 transition-all shadow-xl group/metric">
                       <p className="text-4xl font-black text-white tracking-tight leading-[1.1] group-hover/metric:text-green-400 transition-colors italic">{m}</p>
                    </div>
                 ))}
              </div>
           </div>

        </div>

        {/* BOTTOM POV SWITCHER */}
        <div className="max-w-6xl mx-auto px-10 pb-40">
           <div className="flex flex-col items-center">
              <div className="h-px bg-zinc-800 w-full mb-20 opacity-50"></div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Switch Perspective</p>
              <div className="bg-zinc-900 p-2 rounded-3xl inline-flex border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,1)] scale-110">
                 <button onClick={() => setActivePov('executive')} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'executive' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Executive Narrative</button>
                 <button onClick={() => setActivePov('operational')} className={`px-12 py-6 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${activePov === 'operational' ? 'bg-blackline-yellow text-black shadow-2xl scale-105' : 'text-zinc-400 hover:text-zinc-200'}`}>Operational Narrative</button>
              </div>
           </div>
        </div>

        {/* Global Floating Controls */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex gap-8 no-print">
            <button onClick={handlePrevDriver} className="flex items-center gap-6 px-14 py-8 bg-zinc-900 border border-zinc-800 text-white rounded-full font-black uppercase tracking-tighter italic hover:bg-zinc-800 transition-all shadow-2xl text-sm"><ChevronLeft size={32} /> Previous Driver</button>
            <button onClick={handleNextDriver} className="flex items-center gap-6 px-16 py-8 bg-blackline-yellow text-black rounded-full font-black uppercase tracking-tighter italic hover:scale-105 transition-all shadow-2xl border-4 border-black text-sm">Next Driver <ChevronRight size={32} /></button>
        </div>
      </div>
    );
  }

  // --- NEXT STEPS VIEW ---
  if (viewMode === 'letsgo_bva') {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-16">
           <div className="flex justify-between items-center mb-16">
              <button onClick={() => setViewMode('grid')} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-bold uppercase tracking-wider text-xs">
                 <ArrowLeft size={16} /> Back to Framework
              </button>
              <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-gray-500 hover:text-white transition-colors">
                 <X size={24} />
              </button>
           </div>
           <div className="text-center mb-20">
              <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase mb-6">#LETSGO <span className="text-blackline-yellow">GET</span></h2>
              <p className="text-2xl text-zinc-200 font-light max-w-2xl mx-auto uppercase tracking-tighter italic">Strategic Next Steps for 2026</p>
           </div>
           <div className="space-y-12">
              <PhaseCard step="01" title="Align to and execute golden engagement" label="Strategic Methodology" color="blackline-yellow" desc="Ensure we pivot from technical features to strategic certainty at every turn of the deal cycle." />
              <PhaseCard step="02" title="Work with management to flag top pursuits" label="Resource Allocation" color="blue-500" desc="Flag top pursuits for 2026 so the presales and value engineering team can start working immediately." />
              <PhaseCard step="03" title="Engage in follow up enablement in Q1" label="Continuous Mastery" color="green-500" desc="Deep-dive sessions focusing on specific industry narratives arrive in Q1." />
           </div>
           <div className="mt-24 p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem] text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10"><Trophy size={160} /></div>
              <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter">Mission Ready?</h3>
              <p className="text-zinc-200 text-xl mb-10 max-w-2xl mx-auto">Talk tracks mastered. Now go get the value.</p>
              <button onClick={onClose} className="px-12 py-6 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 shadow-2xl uppercase tracking-tighter italic border-4 border-black">Return to Analysis Suite</button>
           </div>
        </div>
      </div>
    );
  }

  return null;
};

// --- HELPER COMPONENTS ---

const SimplePersonaCard: React.FC<{ role: string, icon: any, nightmare: string, aspiration: string }> = ({ role, icon: Icon, nightmare, aspiration }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] hover:border-zinc-500 transition-all flex flex-col h-full group shadow-xl">
     <div className="flex items-center gap-4 md:gap-6 mb-8">
        <div className="p-4 bg-black rounded-2xl border border-zinc-800 group-hover:bg-blackline-yellow group-hover:text-black transition-all shrink-0">
           <Icon size={36} />
        </div>
        <h4 className="text-white font-black text-xl md:text-2xl uppercase tracking-wider leading-tight">{role}</h4>
     </div>
     <div className="space-y-8 flex-grow">
        <div className="space-y-3">
           <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <Stars size={16} /> Aspiration
           </p>
           <p className="text-base md:text-lg text-zinc-100 leading-relaxed font-bold">"{aspiration}"</p>
        </div>
        <div className="space-y-3">
           <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] flex items-center gap-3">
              <Ghost size={16} /> Nightmare
           </p>
           {/* CONTENT: Improved contrast for Nightmare Scenario */}
           <p className="text-base md:text-lg text-zinc-100 leading-relaxed font-bold italic">"{nightmare}"</p>
        </div>
     </div>
  </div>
);

const LargeFrameworkBox: React.FC<{ step: string, color: string, title: string, subtitle: string, formula: string, desc: string }> = ({ step, color, title, subtitle, formula, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-12 md:p-14 rounded-[3.5rem] flex flex-col hover:border-zinc-500 transition-all shadow-xl group min-h-[450px]">
     <div className={`w-16 h-16 rounded-[1.2rem] bg-${color}/20 text-${color} flex items-center justify-center mb-8 font-black text-3xl group-hover:scale-110 transition-transform shadow-lg shrink-0`}>{step}</div>
     <h4 className="text-3xl font-black uppercase text-white mb-1 tracking-widest italic">{title}</h4>
     <p className={`text-${color} text-xs font-black uppercase tracking-[0.3em] mb-4`}>{subtitle}</p>
     
     <div className="mb-8 py-2 px-4 bg-black/40 rounded-lg border border-zinc-800 inline-block w-fit">
        <span className="text-sm font-mono text-zinc-200 flex items-center gap-2">
           {formula}
        </span>
     </div>

     {/* CONTENT: Improved contrast for descriptions */}
     <p className="text-xl md:text-2xl text-zinc-100 leading-relaxed font-light whitespace-pre-line">{desc}</p>
  </div>
);

const DriverCard: React.FC<{ driver: SkoDriverDetail, onSelect: (id: string) => void }> = ({ driver, onSelect }) => {
   // @ts-ignore
   const IconComponent = Icons[driver.icon] || Zap;
   return (
      <div className="group relative h-[450px] w-full md:w-[calc(50%-2rem)] lg:w-[calc(30%-2rem)] min-w-[320px] rounded-[2.5rem] overflow-hidden border border-zinc-800 transition-all duration-500 hover:-translate-y-2 shadow-2xl bg-zinc-900">
         <div className="absolute inset-0 z-0">
            <img src={DRIVER_IMAGES[driver.id] || DRIVER_IMAGES.process} alt={driver.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
         </div>
         <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-left">
            <div className="mb-auto">
               <div className="w-16 h-16 bg-zinc-900/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-zinc-700 group-hover:border-blackline-yellow transition-colors">
                  <IconComponent size={32} strokeWidth={1.5} />
               </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-3 group-hover:text-blackline-yellow transition-colors leading-tight uppercase italic tracking-tighter h-16 flex items-end">{driver.title}</h3>
            {/* CONTENT: Improved size and contrast for driver summaries */}
            <p className="text-zinc-100 text-base leading-relaxed mb-8 font-medium line-clamp-3">{driver.summary}</p>
            
            <button 
               onClick={() => onSelect(driver.id)}
               className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blackline-yellow hover:text-black hover:border-blackline-yellow transition-all flex items-center justify-center gap-2"
            >
               <HelpCircle size={16} /> Explain Driver
            </button>

            {driver.outcomeTargetId && (
               <div className="mt-4 mb-4 inline-flex items-center gap-1.5 py-1 text-zinc-300 text-[10px] font-bold uppercase tracking-widest italic border-t border-zinc-800/50 w-full pt-4">
                  <ArrowRight size={10} /> Enables {SKO_DATA.find(d => d.id === driver.outcomeTargetId)?.title}
               </div>
            )}
         </div>
      </div>
   );
};

const GridSection: React.FC<{ title: string, subtitle: string, drivers: SkoDriverDetail[], onSelect: (id: string) => void, centered: boolean }> = ({ title, subtitle, drivers, onSelect, centered }) => (
  <div className="space-y-12">
     <div className="flex flex-col items-center text-center gap-2">
        <h3 className="text-3xl font-black text-white uppercase tracking-[0.4em] flex items-center gap-6 italic"><div className="h-1 w-16 bg-blackline-yellow shrink-0"></div>{title}<div className="h-1 w-16 bg-blackline-yellow shrink-0"></div></h3>
        <p className="text-xl font-bold text-zinc-200 uppercase tracking-widest">{subtitle}</p>
     </div>
     <div className={`flex flex-wrap ${centered ? 'justify-center' : 'justify-start'} gap-10`}>
        {drivers.map((driver) => <DriverCard key={driver.id} driver={driver} onSelect={onSelect} />)}
     </div>
  </div>
);

const PhaseCard: React.FC<{ step: string, title: string, label: string, color: string, desc: string }> = ({ step, title, label, color, desc }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[2rem] relative overflow-hidden group hover:border-zinc-700 transition-all text-left">
     <div className={`absolute top-0 left-0 w-2 h-full bg-${color}`}></div>
     <div className="text-8xl font-black opacity-[0.03] absolute top-2 right-6 pointer-events-none group-hover:opacity-[0.07]">{step}</div>
     <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter max-w-2xl">{title}</h3>
     <p className={`text-${color} text-xs font-black uppercase tracking-[0.2em] mb-6`}>{label}</p>
     <div className="h-px bg-zinc-800 w-full mb-6"></div>
     {/* CONTENT: Improved contrast for Phase Card descriptions */}
     <p className="text-zinc-100 leading-relaxed text-lg font-medium">{desc}</p>
  </div>
);
