import React, { useState, useEffect } from 'react';
import { UIStrings, DealContext, DEAL_STAGES, DealStage } from '../types';
import * as Icons from 'lucide-react';
import { ArrowRight, CheckCircle, UploadCloud, Briefcase, Users, FileText, Mail, GraduationCap, ArrowLeft, Target, BookOpen, ArrowUpRight, Video, Sparkles } from 'lucide-react';

interface PlatformHubProps {
  t: UIStrings;
  dealContext?: DealContext;
  onSetDealContext?: (ctx: DealContext) => void;
}

export const PlatformHub: React.FC<PlatformHubProps> = ({ t, dealContext, onSetDealContext }) => {
  const [videoStep, setVideoStep] = useState<'input' | 'processing' | 'result'>('input');
  const [videoType, setVideoType] = useState<'deal' | 'internal'>('deal');
  
  // Video Analysis State
  const [selectedStage, setSelectedStage] = useState<DealStage>('Vision Lock');
  
  // Local edit state for deal context in video section
  const [localOppName, setLocalOppName] = useState('');
  const [localOppId, setLocalOppId] = useState('');

  useEffect(() => {
    if (dealContext?.stage) {
      setSelectedStage(dealContext.stage);
    }
    setLocalOppName(dealContext?.opportunityName || '');
    setLocalOppId(dealContext?.opportunityId || '');
  }, [dealContext]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [videoStep]);

  const handleContextUpdate = () => {
     if (onSetDealContext) {
        onSetDealContext({
           ...dealContext,
           opportunityName: localOppName,
           opportunityId: localOppId,
           stage: selectedStage
        });
     }
  };

  useEffect(() => {
    if (videoStep === 'processing') {
      const timer = setTimeout(() => {
        setVideoStep('result');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [videoStep]);

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-20 animate-fade-in px-4 md:px-0">
      
      {/* Header */}
      <div className="mb-12 text-center relative">
        <h2 className="text-5xl font-extrabold text-white tracking-tighter mb-4 italic uppercase">
          {t.hub_title || "Video Coaching & Intelligence"}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
          {t.hub_subtitle || "Analyze deal performance and get coaching tips from AI call intelligence."}
        </p>
      </div>

      {/* MAIN VIDEO COACH INTERFACE */}
      <div className="animate-fade-in-up delay-100">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
           {videoStep === 'input' && (
              <div className="p-8 md:p-12">
                 {/* Deal Context Header */}
                 <div className="mb-10 p-8 bg-black/60 border border-zinc-800 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Target size={120} />
                    </div>
                    <h4 className="text-blackline-yellow font-bold uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
                       <Target size={16} /> Current Deal Context
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Active Opportunity Name</label>
                          <input 
                            type="text" 
                            value={localOppName}
                            onChange={(e) => setLocalOppName(e.target.value)}
                            onBlur={handleContextUpdate}
                            placeholder="e.g. Acme Corp Deal"
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blackline-yellow outline-none transition-all"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Opportunity ID</label>
                          <input 
                            type="text" 
                            value={localOppId}
                            onChange={(e) => setLocalOppId(e.target.value)}
                            onBlur={handleContextUpdate}
                            placeholder="e.g. OPP-12345"
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-4 text-white font-mono focus:ring-2 focus:ring-blackline-yellow outline-none transition-all"
                          />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Deal Stage</label>
                          <select 
                             value={selectedStage}
                             onChange={(e) => { setSelectedStage(e.target.value as DealStage); handleContextUpdate(); }}
                             className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-blackline-yellow outline-none transition-all appearance-none"
                          >
                             {DEAL_STAGES.map(s => (
                                <option key={s} value={s}>{s}</option>
                             ))}
                          </select>
                       </div>
                    </div>
                 </div>

                 <div className="text-center max-w-2xl mx-auto space-y-10">
                    <div 
                      onClick={() => { setVideoType('deal'); setVideoStep('processing'); }}
                      className="border-2 border-dashed border-zinc-700 hover:border-blackline-yellow/50 hover:bg-zinc-800/50 rounded-3xl p-16 transition-all cursor-pointer group shadow-inner"
                    >
                        <div className="w-20 h-20 bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-xl group-hover:bg-blackline-yellow group-hover:text-black">
                           <UploadCloud size={40} className="transition-colors" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Upload Call Recording</h4>
                        <p className="text-gray-500 font-medium">Drag and drop MP4, MP3, or WAV files (Max 500MB)</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                       <div className="h-px bg-zinc-800 flex-grow"></div>
                       <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Integrations</span>
                       <div className="h-px bg-zinc-800 flex-grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <button onClick={() => { setVideoType('deal'); setVideoStep('processing'); }} className="group px-8 py-6 bg-white text-black text-lg font-black rounded-2xl hover:bg-blackline-yellow transition-all flex items-center justify-center gap-3 shadow-2xl uppercase tracking-tighter italic">
                          <Briefcase size={24} /> Review Deal Strategy
                       </button>
                       <button onClick={() => { setVideoType('internal'); setVideoStep('processing'); }} className="group px-8 py-6 bg-zinc-800 text-white text-lg font-black rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 shadow-2xl uppercase tracking-tighter italic">
                          <Users size={24} /> Get Internal Coaching
                       </button>
                    </div>

                    <p className="text-xs text-gray-500 font-medium">AI analysis will automatically reference current Opportunity Context and industry benchmarks.</p>
                 </div>
              </div>
           )}

           {videoStep === 'processing' && (
              <div className="p-32 text-center">
                  <div className="w-24 h-24 border-4 border-zinc-800 border-t-blackline-yellow rounded-full animate-spin mx-auto mb-10"></div>
                  <h3 className="text-3xl font-black text-white mb-3 uppercase italic tracking-tighter">Analyzing Conversation...</h3>
                  <p className="text-gray-500 text-lg font-medium">Context: <strong>{dealContext?.opportunityName || "New Opportunity"}</strong> ({selectedStage})</p>
                  <p className="text-sm text-zinc-600 mt-4 animate-pulse">Running semantic analysis and objection extraction...</p>
              </div>
           )}

           {videoStep === 'result' && (
              <div className="p-0 flex flex-col lg:flex-row h-[700px] lg:h-[650px] animate-fade-in">
                 {/* Sidebar / Transcript Summary */}
                 <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-black/30 p-8 overflow-y-auto">
                    <button onClick={() => setVideoStep('input')} className="text-[10px] font-black text-zinc-500 hover:text-white mb-8 flex items-center gap-2 transition-colors uppercase tracking-[0.2em] bg-zinc-900 px-3 py-2 rounded-lg w-fit"><ArrowLeft size={14}/> New Analysis</button>
                    
                    <h4 className="text-sm font-black text-white mb-6 flex items-center gap-3 uppercase tracking-widest"><FileText size={18} className="text-blue-400"/> Key Insights Summary</h4>
                    
                    <div className="mb-8 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Analysis Context</span>
                       <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-black rounded text-[10px] font-bold text-white border border-zinc-700">{selectedStage}</span>
                          <span className="px-2 py-1 bg-black rounded text-[10px] font-bold text-blue-400 border border-blue-900/30">CFO Present</span>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                          <span className="text-blue-400 font-black text-[10px] block mb-2 uppercase">Time 02:14</span>
                          <p className="text-sm text-gray-300 leading-relaxed font-medium">Client mentions budget freeze concern for Q3 due to internal reallocation projects.</p>
                       </div>
                       <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                          <span className="text-green-500 font-black text-[10px] block mb-2 uppercase">Time 05:30</span>
                          <p className="text-sm text-gray-300 leading-relaxed font-medium">Strong positive reaction to "Trust Premium" data point regarding audit fee reduction.</p>
                       </div>
                       <div className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                          <span className="text-red-400 font-black text-[10px] block mb-2 uppercase">Time 12:45</span>
                          <p className="text-sm text-gray-300 leading-relaxed font-medium">Direct competitor mention: <strong>Trintech</strong>. Client asked about feature parity on transaction matching.</p>
                       </div>
                    </div>
                 </div>
                 
                 {/* Main Analysis */}
                 <div className="w-full lg:w-2/3 p-10 overflow-y-auto bg-zinc-900/50">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blackline-yellow/20 text-blackline-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                              <Sparkles size={14} /> AI {videoType === 'deal' ? 'Strategic Analysis' : 'Internal Coaching'}
                           </div>
                           <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">Call Intelligence</h3>
                        </div>
                        <div className="text-right bg-black/40 p-4 rounded-2xl border border-zinc-800">
                           <div className="text-5xl font-black text-green-500 tracking-tighter italic">82<span className="text-lg opacity-50 text-white">/100</span></div>
                           <div className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1">Sentiment Score</div>
                        </div>
                    </div>

                    {videoType === 'deal' ? (
                       <div className="space-y-10 animate-fade-in">
                          <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800 relative group">
                             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <CheckCircle size={64} className="text-green-500" />
                             </div>
                             <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
                                <Target size={20} className="text-blackline-yellow"/> Recommended Pursuit Plan
                             </h4>
                             <ul className="space-y-6">
                                <li className="flex gap-4">
                                   <span className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 text-green-500 font-bold">1</span>
                                   <p className="text-gray-300 font-medium">Send the <strong>"Trust Premium"</strong> healthcare benchmark deck. Highlight the 10-15% valuation impact mentioned at 05:30 to maintain CFO momentum.</p>
                                </li>
                                <li className="flex gap-4">
                                   <span className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 text-green-500 font-bold">2</span>
                                   <p className="text-gray-300 font-medium">Schedule technical deep dive specifically on <strong>"Transaction Matching"</strong>. Use the "Trintech Displace" talk track to win the feature battle.</p>
                                </li>
                                <li className="flex gap-4">
                                   <span className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center shrink-0 text-green-500 font-bold">3</span>
                                   <p className="text-gray-300 font-medium">Confirm the <strong>Mutual Action Plan</strong> dates discussed at the end of the call. This is critical to locking the vision before the Q3 freeze.</p>
                                </li>
                             </ul>
                          </div>

                           <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800">
                             <div className="flex justify-between items-center mb-6">
                                <h4 className="text-lg font-black text-white flex items-center gap-3 uppercase italic tracking-tighter">
                                   <Mail size={20} className="text-blue-400"/> AI Draft: Execution Follow-up
                                </h4>
                                <button className="text-[10px] font-black text-blue-400 hover:text-white uppercase tracking-widest transition-colors">Copy Text</button>
                             </div>
                             <div className="bg-zinc-950 p-6 rounded-2xl text-sm text-gray-400 font-medium leading-relaxed border border-zinc-800/50">
                                Subject: Recap: {dealContext?.opportunityName || "BlackLine"} Transformation - Strategic Certainty<br/><br/>
                                Hi [Name],<br/><br/>
                                It was excellent connecting today. I specifically noted your team's focus on <strong>audit integrity</strong> and the potential for a <strong>valuation premium</strong>. Based on our discussion about the <strong>{selectedStage}</strong> phase, I've attached the relevant healthcare benchmarks we discussed...
                             </div>
                          </div>
                          
                          <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800">
                             <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-tighter">
                                <BookOpen size={20} className="text-purple-400"/> Strategic Proof Points
                             </h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {/* EXXONMOBIL CARD ADDED HERE */}
                                 <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-blackline-yellow/50 transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                       <span className="font-black text-white text-sm uppercase italic tracking-tighter">ExxonMobil</span>
                                       <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-blackline-yellow"/>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                       "We recently did a large implementation of a software platform called <strong>BlackLine</strong> that we use in the accounting space, and it's literally enabled us to save tens of thousands of hours of what was very manually intensive work because we can now automate it."
                                    </p>
                                    <div className="flex gap-2">
                                       <span className="text-[10px] font-black text-blackline-yellow uppercase tracking-widest bg-black px-2 py-1 rounded">Process Efficiency</span>
                                       <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest bg-black px-2 py-1 rounded">CFO Quote</span>
                                    </div>
                                 </div>
                                 {/* END EXXONMOBIL CARD */}

                                 <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                       <span className="font-black text-white text-sm uppercase italic tracking-tighter">MedTech Innovations</span>
                                       <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-green-500"/>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4 line-clamp-2">"Reduced DSO by 12 days, unlocking $4.5M in cash."</p>
                                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-black px-2 py-1 rounded">Working Capital</span>
                                 </div>
                             </div>
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-8 animate-fade-in">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
                                <h5 className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Objection Handling</h5>
                                <div className="text-2xl font-black text-white italic uppercase tracking-tighter">High Performance</div>
                                <p className="text-sm text-gray-400 mt-2 font-medium">Successfully handled the 'Budget Freeze' objection by pivoting to value release.</p>
                             </div>
                             <div className="bg-black/40 p-6 rounded-2xl border border-zinc-800">
                                <h5 className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Value Articulation</h5>
                                <div className="text-2xl font-black text-yellow-500 italic uppercase tracking-tighter">Needs Refinement</div>
                                <p className="text-sm text-gray-400 mt-2 font-medium">Missed the opportunity to bridge 'Transaction Matching' to 'Operational Resilience'.</p> </div> </div> <div className="bg-black/40 p-8 rounded-3xl border border-zinc-800 relative group"> <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"> <GraduationCap size={64} className="text-purple-400" /> </div> <h4 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-tighter"> <GraduationCap size={20} className="text-purple-400"/> AI Coaching Suggestion </h4> <p className="text-lg text-gray-300 leading-relaxed font-light italic"> "You spent 12 minutes of the call discussing <strong>Account Reconciliation</strong> features. In the <strong>{selectedStage}</strong> stage, the goal is to validate the <strong>Business Case</strong>. Shift your focus to the $2M potential P&L impact to secure executive buy-in faster." </p> </div> </div> )} </div> </div> </div> ); };
