import React, { useState, useEffect, useMemo } from 'react';
import { SKO_DATA as GLOBAL_SKO_DATA } from '../constants'; 
import { UIStrings, SkoDriverDetail } from '../types';
import { 
  ArrowLeft, 
  Zap, 
  TrendingUp, // Used for the new logo arrow
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

// ... (Interfaces and CONSTANTS remain the same)

// ... (Helper functions remain the same)

export const SkoExplainer: React.FC<SkoExplainerProps> = ({ onClose, t }) => {
  // ... (State and effects remain the same)

  if (viewMode === 'landing') {
    return (
      <div className="min-h-[85vh] flex flex-col animate-fade-in relative px-4 md:px-0 bg-black">
         <button onClick={onClose} className="absolute top-4 right-4 md:top-0 md:right-0 p-4 md:p-8 text-gray-400 hover:text-white transition-colors z-50"><X size={28} /></button>
         
         {/* v4 Update 1 (JR): Simplified header to match official SKO 2026 logo style */}
         <div className="text-center py-16 md:py-28 flex flex-col items-center justify-center">
            <div className="inline-flex items-start gap-2 md:gap-4 mb-6">
               <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter text-white italic leading-none">
                 #LetsGoGet
               </h1>
               {/* Using TrendingUp as the upward arrow icon proxy, styled yellow */}
               <TrendingUp className="text-blackline-yellow w-12 h-12 md:w-24 md:h-24 shrink-0 mt-2 md:mt-4" strokeWidth={3} />
            </div>
            <p className="text-sm md:text-xl text-zinc-400 font-black uppercase tracking-[0.5em] pl-4 border-l-4 border-blackline-yellow">
              BlackLine SKO 2026
            </p>
         </div>
         {/* End v4 header update */}

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full pb-16 md:pb-24 px-4 md:px-6">
             {/* ... (Navigation cards remain the same) ... */}
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

  // ... (Rest of the component views remain the same as v3)
  if (viewMode === 'executive_commentary') { return ( /* ... v3 code ... */ ); }
  if (viewMode === 'grid') { return ( /* ... v3 code ... */ ); }
  if (viewMode === 'persona_explain' && activeDriver) { return ( /* ... v3 code ... */ ); }
  if (viewMode === 'framework_explain' && activeDriver) { return ( /* ... v3 code ... */ ); }
  if (viewMode === 'detail' && activeDriver) { return ( /* ... v3 code ... */ ); }
  
  if (viewMode === 'letsgo_bva') {
    return (
      <div className="min-h-screen bg-black text-white animate-fade-in pb-32">
        <div className="max-w-5xl mx-auto px-6 pt-16">
           <div className="flex justify-between items-center mb-16"><button onClick={() => setViewMode('grid')} className="flex items-center gap-2 text-gray-300 hover:text-white uppercase tracking-wider text-xs"><ArrowLeft size={16} /> Back</button><button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full"><X size={24} /></button></div>
           
           {/* v4 Update 2 (JR): Updated the "Next Steps" header to also match the simplified official logo style */}
           <div className="text-center mb-20 flex flex-col items-center">
              <div className="inline-flex items-start gap-2 mb-4">
                 <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">#LetsGoGet</h2>
                 <TrendingUp className="text-blackline-yellow w-10 h-10 md:w-16 md:h-16 shrink-0 mt-2" strokeWidth={3} />
              </div>
              <p className="text-xl md:text-2xl text-zinc-400 uppercase tracking-widest italic font-bold">Strategic Next Steps for 2026</p>
           </div>
           {/* End v4 header update */}

           <div className="space-y-12"><PhaseCard step="01" title="Align to and execute golden engagement" label="Strategic Methodology" color="blackline-yellow" desc="Ensure we pivot from technical features to strategic certainty at every turn of the deal cycle." /><PhaseCard step="02" title="Work with management to flag top pursuits" label="Resource Allocation" color="blue-500" desc="Flag top pursuits for 2026 so the presales and value engineering team can start working immediately." /><PhaseCard step="03" title="Engage in follow up enablement in Q1" label="Continuous Mastery" color="green-500" desc="Deep-dive sessions focusing on specific industry narratives arrive in Q1." /></div>
           <div className="max-w-2xl mx-auto mt-24 p-12 bg-zinc-900 border border-zinc-800 rounded-[3rem] text-center"><button onClick={onClose} className="px-12 py-6 bg-blackline-yellow text-black text-xl font-black rounded-full hover:scale-105 uppercase tracking-tighter italic border-4 border-black">Return to Analysis Suite</button></div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white"><h1 className="text-2xl font-bold mb-4">Content Not Found</h1><button onClick={onClose} className="px-6 py-2 bg-zinc-800 rounded-lg">Return to Home</button></div>;
};

// ... (Sub-components remain the same)
