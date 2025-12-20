import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, BarChart2, Calculator, Users, Layers, Zap, Trophy, ArrowRight, X, HelpCircle, Info, Video, Sparkles } from 'lucide-react';
import { VisualNav } from './components/VisualNav';
import { ValueCalculator } from './components/ValueCalculator';
import { AnalysisResults } from './components/AnalysisResults';
import { CustomerBenchmarks } from './components/CustomerBenchmarks';
import { PlatformHub } from './components/PlatformHub';
import { OutsideInGenerator } from './components/OutsideInGenerator';
import { SkoExplainer } from './components/SkoExplainer';
import { Tooltip } from './components/Tooltip';
import { RightRail } from './components/RightRail';
import { generateValueAnalysis } from './services/geminiService';
import { AnalysisResult, DealContext } from './types';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from './constants';

// Custom Rubik's Cube Icon for Pivot
export const RubiksCube = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
    <line x1="3" y1="16.5" x2="12" y2="12" />
    <line x1="21" y1="16.5" x2="12" y2="12" />
    <line x1="12" y1="7" x2="12" y2="2" />
    <line x1="7.5" y1="4.5" x2="16.5" y2="9.5" />
    <line x1="7.5" y1="19.5" x2="16.5" y2="14.5" />
  </svg>
);

function App() {
  // Initial landing state
  const [activeTab, setActiveTab] = useState<'discovery' | 'outside_in' | 'calculator' | 'benchmarks' | 'hub' | 'sko'>('sko');
  const [showDiscoveryMenu, setShowDiscoveryMenu] = useState(false);
  const [query, setQuery] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Panel Control (Controlled from Header or Rail)
  const [activePanel, setActivePanel] = useState<'chat' | 'pivot' | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  // Deal Context
  const [dealContext, setDealContext] = useState<DealContext>({});

  // Language State
  const [currentLang, setCurrentLang] = useState('EN');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Safe Translation Logic
  const t = { ...UI_STRINGS['EN'], ...(UI_STRINGS[currentLang] || {}) };

  // Scroll to top whenever tab changes or search state changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab, hasSearched, showDiscoveryMenu]);

  // Function to return to the root landing page (6 buttons)
  const goHome = () => {
    setActiveTab('discovery'); 
    setShowDiscoveryMenu(false);
    setHasSearched(false);
    setResult(null);
    setQuery('');
    setShowGuidance(false);
    setActivePanel(null);
  };

  const handleSearch = (searchQuery: string = query, lang: string = currentLang) => {
    if (!searchQuery.trim()) return;
    
    // Reset States
    setHasSearched(true);
    setQuery(searchQuery);
    setIsLoading(true);

    // Fetch Text Analysis with Language Context
    generateValueAnalysis(searchQuery, lang).then((data) => {
      setResult(data);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  };
  
  const handleBackToDiscovery = () => {
      setResult(null);
      setHasSearched(false);
      setQuery('');
      setActiveTab('discovery');
      setShowDiscoveryMenu(true);
  };

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangMenuOpen(false);
    
    if (hasSearched && query && activeTab === 'discovery') {
      handleSearch(query, langCode);
    }
  };

  const getContextString = () => {
    if (activeTab === 'discovery') {
      if (hasSearched && query) return `Value Analysis results for "${query}".`;
      return "Main Discovery / Home Page.";
    }
    if (activeTab === 'outside_in') return "Outside-In Value Generator tool.";
    if (activeTab === 'calculator') return "ROI and Business Value Calculator.";
    if (activeTab === 'benchmarks') return "Customer Benchmarks Database.";
    if (activeTab === 'hub') return "AI Video Coaching and call intelligence resources.";
    if (activeTab === 'sko') return "SKO 26 #LETSGO GET Explainer hub.";
    return "BlackLine Value Engineering Tool";
  };

  const handlePivot = (newContext: Partial<DealContext> & { problem?: string }) => {
    setDealContext(prev => ({ ...prev, ...newContext }));

    if (activeTab === 'discovery') {
      let pivotQuery = query || "Financial Close Transformation";
      const pivotParts = [];
      if (newContext.persona) pivotParts.push(`${newContext.persona}`);
      if (newContext.industry) pivotParts.push(`${newContext.industry}`);
      if (newContext.problem) pivotParts.push(`Solving for ${newContext.problem}`);

      if (pivotParts.length > 0) {
        pivotQuery = pivotParts.join(', ');
        handleSearch(pivotQuery);
      }
    }
  };

  // Hero is shown when on discovery tab AND not in the midst of a multi-select search or results view
  const showHero = activeTab === 'discovery' && !hasSearched && !showDiscoveryMenu;

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-blackline-yellow selection:text-black">
      
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md text-white py-4 border-b border-zinc-800 sticky top-0 z-50 pr-[60px]">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={goHome}>
            <div className="flex items-center justify-center w-10 h-10 bg-blackline-yellow rounded-sm group-hover:bg-white transition-colors duration-300">
              <span className="text-black font-extrabold text-2xl tracking-tighter">BL</span>
            </div>
            <div className="h-8 w-px bg-zinc-800"></div>
            <h1 className="text-lg font-medium tracking-wide text-gray-200 group-hover:text-white transition-colors">
              {t.subtitle} <span className="font-bold text-white">{t.subtitle_bold}</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            {dealContext.opportunityName && (
               <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 animate-fade-in">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Active:</span>
                  <span className="text-xs font-bold text-white max-w-[150px] truncate">{dealContext.opportunityName}</span>
               </div>
            )}

            {/* Top Rail Tools */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* HELP BUTTON - MORE OBVIOUS */}
              <button 
                onClick={() => setShowGuidance(!showGuidance)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 border ${showGuidance ? 'bg-blackline-yellow border-blackline-yellow text-black scale-105 shadow-[0_0_15px_rgba(249,183,52,0.4)]' : 'bg-zinc-900/50 border-zinc-800 text-gray-300 hover:text-white hover:bg-zinc-800'}`}
                title="Get Help & Navigation"
              >
                <HelpCircle size={18} className={!showGuidance ? "text-blackline-yellow animate-pulse" : ""} />
                <span className="text-[10px] font-black uppercase tracking-widest">Help</span>
              </button>

              <button 
                onClick={() => setActivePanel(activePanel === 'pivot' ? null : 'pivot')}
                className={`p-2 rounded-xl transition-all duration-300 border ${activePanel === 'pivot' ? 'bg-zinc-100 border-white text-black scale-105 shadow-lg' : 'bg-zinc-900/50 border-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-800'}`}
                title="Pivot Context"
              >
                <RubiksCube size={20} />
              </button>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-blackline-yellow transition-colors py-2 font-medium"
              >
                <Globe size={18} />
                <span className="text-xs font-bold hidden sm:inline">{currentLang}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-900 rounded-lg shadow-xl py-2 z-50 border border-zinc-800 animate-fade-in">
                    <div className="px-4 py-2 border-b border-zinc-800 mb-2">
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Select Region</p>
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-zinc-800 transition-colors ${lang.code === currentLang ? 'text-blackline-yellow font-bold bg-zinc-800/50' : 'text-gray-300'}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pt-12 pb-20 relative pr-[60px]">
        {!hasSearched && (activeTab === 'discovery' || activeTab === 'sko') && (
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blackline-yellow/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        )}

        {/* Global Help Guidance Toast */}
        {showGuidance && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 animate-fade-in-down">
            <div className="bg-blackline-yellow text-black p-5 rounded-2xl shadow-2xl border border-white/20 flex gap-4 ring-4 ring-black/10">
              <div className="bg-black/10 p-2.5 rounded-full h-fit flex-shrink-0">
                <Info size={24} />
              </div>
              <div className="flex-grow">
                <p className="font-black text-base mb-1 uppercase tracking-tight italic">System Overview</p>
                <p className="text-sm font-semibold opacity-95 leading-relaxed">
                  Welcome to the Sales Enablement Hub. Use <strong>Value Narratives</strong> to master talking points, or <strong>Video Coaching</strong> to refine your pitch. The <strong>Rubik's Cube icon</strong> (Pivot) allows you to re-configure the AI context for any industry or deal size.
                </p>
              </div>
              <button onClick={() => setShowGuidance(false)} className="p-2 hover:bg-black/10 rounded-full h-fit transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Hero Section - The Main Hub */}
        <div className={`transition-all duration-700 ease-in-out ${!showHero ? 'hidden' : 'translate-y-0 opacity-100'}`}>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-sm">
              {t.hero_title} <span className="text-blackline-yellow">{t.hero_title_accent}</span>
            </h2>
            <p className="text-2xl text-gray-300 font-normal max-w-2xl mx-auto leading-relaxed text-left md:text-center">
              {t.hero_desc}
            </p>
            
            <div className="flex flex-col items-center mt-10 mb-8 gap-4">
                 
                 {/* Main Focused SKO Button */}
                 <div className="w-full max-w-md">
                    <button 
                      onClick={() => { setActiveTab('sko'); setShowDiscoveryMenu(false); }}
                      className="w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl text-xl font-bold transition-all bg-zinc-900 border border-zinc-700 text-white hover:border-blackline-yellow hover:text-blackline-yellow active:scale-95 group shadow-xl"
                    >
                      <Trophy size={24} className="text-blackline-yellow" /> 
                      <span>{t.tab_sko}</span>
                      <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                    {/* Value Narratives */}
                    <button 
                      onClick={() => { setActiveTab('discovery'); setShowDiscoveryMenu(true); }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 shadow-md"
                    >
                      <BarChart2 size={20} /> {t.tab_discovery}
                    </button>
                    {/* Outside-In */}
                    <button 
                      onClick={() => { setActiveTab('outside_in'); setShowDiscoveryMenu(false); }}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-lg font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800 shadow-md"
                    >
                      <Zap size={20} /> {t.tab_outside_in}
                    </button>
                 </div>

                 <div className="flex flex-wrap justify-center gap-3 w-full max-w-2xl">
                    <button 
                      onClick={() => { setActiveTab('calculator'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Calculator size={16} /> {t.tab_calculator}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('benchmarks'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Users size={16} /> {t.tab_benchmarks}
                    </button>
                    <button 
                      onClick={() => { setActiveTab('hub'); setShowDiscoveryMenu(false); }}
                      className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-zinc-900 text-gray-300 hover:text-white hover:bg-zinc-800 border border-zinc-800`}
                    >
                      <Video size={16} /> {t.tab_hub}
                    </button>
                 </div>
              </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'sko' && (
           <SkoExplainer onClose={goHome} t={t} />
        )}
        
        {activeTab === 'discovery' && (
          <>
            {!hasSearched && showDiscoveryMenu && (
              <div className="animate-fade-in-up delay-200">
                <div className="max-w-[1000px] mx-auto flex justify-between items-center mb-6 px-6">
                  <div className="flex flex-col">
                    <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase italic tracking-tighter">
                      <BarChart2 size={28} className="text-blackline-yellow" /> {t.tab_discovery}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Multi-Contextual Enablement</p>
                  </div>
                  <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all group">
                    <X size={24} className="group-hover:scale-110" />
                  </button>
                </div>
                
                {/* Explanatory Header for Browse - UPDATED FOR EDUCATION FOCUS */}
                <div className="max-w-[1000px] mx-auto mb-10 px-6">
                   <div className="bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                         <BarChart2 size={120} className="text-blackline-yellow" />
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Sparkles size={20} className="text-blackline-yellow" /> Strategic Enablement Brief
                      </h4>
                      <p className="text-lg text-gray-300 font-light leading-relaxed max-w-3xl">
                        Master the <strong>Strategic Value Drivers</strong> and explore tailored <strong>Talk Tracks</strong> for different executive personas and industry contexts. Select items below to generate an educational brief designed to help you articulate impact with confidence.
                      </p>
                   </div>
                </div>

                <VisualNav onSelect={(q) => handleSearch(q)} t={t} />
                {showGuidance && (
                  <div className="mt-8 animate-fade-in text-center">
                    <Tooltip text={t.tooltip_text} />
                  </div>
                )}
              </div>
            )}

            {isLoading && hasSearched && (
              <div className="flex flex-col items-center justify-center py-32 animate-fade-in">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-zinc-800 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blackline-yellow border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-10 tracking-tight">{t.loading_title}</h3>
                <p className="text-gray-300 mt-2 font-medium text-lg">{t.loading_desc}</p>
              </div>
            )}

            {!isLoading && result && (
              <div className="animate-fade-in">
                 <div className="max-w-[1400px] mx-auto flex justify-between items-center mb-6 px-6 no-print">
                   <div className="flex items-center gap-3">
                     <BarChart2 size={20} className="text-blackline-yellow" />
                     <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                       Generated Enablement Brief
                     </h3>
                   </div>
                   <button onClick={handleBackToDiscovery} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                     <X size={24} />
                   </button>
                 </div>
                 <AnalysisResults 
                   data={result} 
                   query={query}
                   onBack={handleBackToDiscovery}
                   onNavigateToCalculator={() => setActiveTab('calculator')}
                   t={t}
                 />
              </div>
            )}
          </>
        )}

        {activeTab === 'outside_in' && (
          <>
            <div className="max-w-[900px] mx-auto flex justify-between items-center px-4 mb-4">
               <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                 <Zap size={20} className="text-blackline-yellow" /> Outside-In Generator
               </h3>
               <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                  <X size={24} />
               </button>
            </div>
            <OutsideInGenerator 
              t={t} 
              onSetDealContext={setDealContext} 
              dealContext={dealContext}
            />
          </>
        )}

        {activeTab === 'calculator' && (
           <>
             <div className="max-w-[1000px] mx-auto flex justify-between items-center px-4 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                  <Calculator size={20} className="text-blackline-yellow" /> {t.tab_calculator}
                </h3>
                <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                   <X size={24} />
                </button>
             </div>
             <ValueCalculator t={t} dealContext={dealContext} onSetDealContext={setDealContext} />
           </>
        )}

        {activeTab === 'benchmarks' && (
          <>
            <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                  <Users size={20} className="text-blackline-yellow" /> {t.tab_benchmarks}
                </h3>
                <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                   <X size={24} />
                </button>
            </div>
            <CustomerBenchmarks t={t} />
          </>
        )}

        {activeTab === 'hub' && (
          <>
            <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 uppercase italic tracking-tighter">
                  <Video size={20} className="text-blackline-yellow" /> {t.tab_hub}
                </h3>
                <button onClick={goHome} className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-zinc-800 text-gray-500 hover:text-white transition-all">
                   <X size={24} />
                </button>
            </div>
            <PlatformHub t={t} dealContext={dealContext} onSetDealContext={setDealContext} />
          </>
        )}

      </main>

      <RightRail 
        contextString={getContextString()}
        dealContext={dealContext}
        onPivot={handlePivot}
        activePanelProp={activePanel}
        onPanelChange={(p) => setActivePanel(p)}
      />

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-10 mt-auto pr-[60px] no-print">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 opacity-70">
             <div className="w-6 h-6 bg-blackline-yellow rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-xs">BL</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 font-medium">{t.footer_rights}</p>
          <p className="mt-2 text-xs text-zinc-500 font-mono uppercase tracking-widest">{t.footer_internal}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
