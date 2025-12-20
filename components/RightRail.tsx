import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { AiAssistant } from './AiAssistant';
import { PivotPanel } from './PivotPanel';
import { DealContext } from '../types';
import { RubiksCube } from '../App';

interface RightRailProps {
  contextString: string;
  dealContext: DealContext;
  onPivot: (newContext: Partial<DealContext> & { problem?: string }) => void;
  activePanelProp?: 'chat' | 'pivot' | null;
  onPanelChange?: (panel: 'chat' | 'pivot' | null) => void;
}

type RailTab = 'chat' | 'pivot' | null;

export const RightRail: React.FC<RightRailProps> = ({ 
  contextString, 
  dealContext, 
  onPivot,
  activePanelProp,
  onPanelChange
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<RailTab>(null);

  // Sync internal state if prop is provided
  useEffect(() => {
    if (activePanelProp !== undefined) {
      setInternalActiveTab(activePanelProp);
    }
  }, [activePanelProp]);

  const toggleTab = (tab: RailTab) => {
    const next = internalActiveTab === tab ? null : tab;
    if (onPanelChange) onPanelChange(next);
    else setInternalActiveTab(next);
  };

  const closePanel = () => {
    if (onPanelChange) onPanelChange(null);
    else setInternalActiveTab(null);
  };

  const activeTab = activePanelProp !== undefined ? activePanelProp : internalActiveTab;

  return (
    <>
      {/* 1. THE RAIL (Fixed Sidebar) */}
      <div className="fixed top-0 right-0 h-full w-[60px] bg-black border-l border-zinc-800 z-50 flex flex-col items-center py-6 gap-6 pt-24 no-print">
         
         {/* Toggle Pivot */}
         <button 
           onClick={() => toggleTab('pivot')}
           className={`p-3 rounded-xl transition-all duration-200 group relative
             ${activeTab === 'pivot' ? 'bg-blackline-yellow text-black shadow-[0_0_15px_rgba(249,183,52,0.4)]' : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'}`}
         >
           <RubiksCube size={20} className={activeTab === 'pivot' ? 'animate-spin-once' : ''} />
           
           {/* Tooltip */}
           <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity hidden md:block">
             Pivot Context
           </div>
         </button>

         {/* Toggle Chat */}
         <button 
           onClick={() => toggleTab('chat')}
           className={`p-3 rounded-xl transition-all duration-200 group relative
             ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800'}`}
         >
           <MessageCircle size={20} />
           
           {/* Tooltip */}
           <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity hidden md:block">
             AI Assistant
           </div>
         </button>

      </div>

      {/* 2. THE PANEL (Slide-out) */}
      <div 
        className={`fixed top-0 right-0 h-full bg-zinc-900 border-l border-zinc-800 z-[60] transition-transform duration-300 ease-in-out shadow-2xl no-print
          w-full md:w-[400px] md:right-[60px]
          ${activeTab ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header (Shared) */}
        <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-black/20">
           <span className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2">
             {activeTab === 'chat' && <><MessageCircle size={16} className="text-blue-500" /> Value Assistant</>}
             {activeTab === 'pivot' && <><RubiksCube size={16} className="text-blackline-yellow" /> Pivot Tool</>}
           </span>
           <button onClick={closePanel} className="text-gray-500 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors">
             <ChevronRight size={20} />
           </button>
        </div>

        {/* Content Area */}
        <div className="h-[calc(100%-64px)] relative bg-zinc-900">
           <div className={`absolute inset-0 transition-all duration-300 ${activeTab === 'chat' ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-10 pointer-events-none'}`}>
             <AiAssistant 
               context={contextString} 
               embedded={true} 
               isOpenProp={true} 
             />
           </div>

           <div className={`absolute inset-0 transition-all duration-300 ${activeTab === 'pivot' ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-10 pointer-events-none'}`}>
             <PivotPanel 
               currentContext={dealContext}
               onPivot={onPivot}
             />
           </div>
        </div>
      </div>

      {/* Overlay */}
      {activeTab && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:z-30" onClick={closePanel} />
      )}
    </>
  );
};
