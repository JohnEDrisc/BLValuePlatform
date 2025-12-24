
import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { parsePivotPrompt } from '../services/geminiService';
import { DealContext } from '../types';
import { RubiksCube } from './Icons';

interface PivotPanelProps {
  currentContext: DealContext;
  onPivot: (newContext: Partial<DealContext> & { problem?: string }) => void;
}

export const PivotPanel: React.FC<PivotPanelProps> = ({ currentContext, onPivot }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastPivot, setLastPivot] = useState<string | null>(null);

  const handlePivot = async () => {
    if (!prompt.trim()) return;

    setIsProcessing(true);
    setLastPivot(null);

    try {
      const result = await parsePivotPrompt(prompt);
      onPivot(result);
      setLastPivot("Context updated successfully.");
      setPrompt(''); // Clear after success
    } catch (e) {
      console.error(e);
      setLastPivot("Failed to pivot context.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 text-white p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 mb-2 text-white">
          <RubiksCube size={24} className="text-blackline-yellow" /> Strategic Lens
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Re-orient the AI's strategic perspective. Describe a new deal scenario, industry shift, or competitive threat to instantly pivot the analysis.
        </p>
      </div>

      <div className="flex-grow space-y-6">
        {/* Active Context Card */}
        <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Active Context</h4>
          
          <div className="flex justify-between items-center">
             <span className="text-sm text-gray-400">Industry</span>
             <span className="text-sm font-bold text-white">{currentContext.industry || 'Generic'}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-sm text-gray-400">Revenue</span>
             <span className="text-sm font-bold text-white">
                {currentContext.annualRevenue 
                  ? `$${(currentContext.annualRevenue / 1000000000).toFixed(1)}B` 
                  : 'N/A'}
             </span>
          </div>
          <div className="flex flex-col gap-1 pt-2 border-t border-zinc-800 mt-2">
             <span className="text-xs text-gray-500">Current Opportunity</span>
             <span className="text-xs font-bold text-blackline-yellow truncate">
               {currentContext.opportunityName || 'None'}
             </span>
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
           <label className="text-sm font-bold text-white">Natural Language Pivot</label>
           <textarea 
             className="w-full h-32 bg-black border border-zinc-700 rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-blackline-yellow outline-none resize-none placeholder-zinc-600"
             placeholder='e.g. "Pivot to a manufacturing CAO concerned about inventory variance and audit fees."'
             value={prompt}
             onChange={(e) => setPrompt(e.target.value)}
             onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   handlePivot();
                }
             }}
           />
           
           <button 
             onClick={handlePivot}
             disabled={isProcessing || !prompt.trim()}
             className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-blackline-yellow disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
           >
             {isProcessing ? <RubiksCube size={16} className="animate-spin"/> : <RubiksCube size={16} />}
             {isProcessing ? 'Pivoting...' : 'Pivot Now'}
           </button>
        </div>

        {/* Feedback */}
        {lastPivot && (
           <div className={`p-3 rounded-lg flex items-center gap-2 text-sm font-bold ${lastPivot.includes('success') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {lastPivot.includes('success') ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {lastPivot}
           </div>
        )}

        {/* Suggestions */}
        <div className="pt-4 border-t border-zinc-800">
           <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Try asking...</p>
           <div className="space-y-2">
              <button onClick={() => setPrompt("Pivot to Healthcare CFO worried about regulatory fines")} className="w-full text-left text-xs text-gray-400 hover:text-blackline-yellow hover:bg-zinc-800 p-2 rounded transition-colors truncate">
                 "Pivot to Healthcare CFO worried about fines"
              </button>
              <button onClick={() => setPrompt("Retail company $10B revenue, focus on high turnover and peak cycle burnout")} className="w-full text-left text-xs text-gray-400 hover:text-blackline-yellow hover:bg-zinc-800 p-2 rounded transition-colors truncate">
                 "Retail co. $10B revenue, focus on burnout"
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};
